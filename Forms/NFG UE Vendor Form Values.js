/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/record', 'N/runtime', 'N/search'], function(record, runtime, search) {

    function beforeSubmit(context) {

        if (context.type == context.UserEventType.DELETE) {
            return;
        }

        var rec = context.newRecord;
        var userId = runtime.getCurrentUser().id;


        search.create({
            type: 'employee',
            filters: [
                ['internalid', 'anyof', userId]
            ],
            columns: [
                search.createColumn('custentity_isbuyer')
            ]
        }).run().each(function(result) {

            var isBuyer = result.getValue('custentity_isbuyer');
            log.debug('isBuyer', isBuyer);
            log.debug('new date', new Date());

            if (isBuyer === true) {
                rec.setValue({
                    fieldId: 'custentity_lastmodifiedbypurchasing',
                    value: new Date()
                });
            }
            return true;
        })


    }


    return {
        beforeSubmit: beforeSubmit
    }
});
