/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 */
define(['N/search', 'N/record', 'N/task'], function(search, record, task) {

    function afterSubmit(context) {
        
        if (context == 'delete') {return;}

        //TODO do not update records if the oldrecord=newrecord  

        try {
            
            var rec = context.newRecord;

            var mrTask = task.create({
                taskType: task.TaskType.MAP_REDUCE,
                scriptId: 'customscript_nfg_mr_acton_contact_update',
                params: {
                    'custscript_acton_defaults': actOnDefaults
                }
            });
            mrTask.submit();

            var actOnDefaults = {
                salesRep: rec.getValue('custrecord_acton_name'),
                segment: rec.getValue('custrecord_acton_segment'),
                priceLevel: rec.getValue('custrecord_acton_pricelevel'),
                customerCategory: rec.getValue('custrecord_acton_customercategory'),
                dynamicSample: rec.getText('custrecord_acton_dynamicsamplepage'),
                learnMore: rec.getText('custrecord_acton_learnmorepage'),
                orderGuide: rec.getText('custrecord_acton_orderguideurl')
            };

            
            //TODO: set urls to blank if no value is on the act on defaults record

            

        } catch (error) {
            log.debug('Error', error)
        }        

    }

    return {

        afterSubmit: afterSubmit
    }
});
