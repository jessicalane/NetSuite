/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 */
define(['N/search', 'N/record'], function(search, record) {

    function beforeLoad(context) {
        var rec = context.newRecord;
        var uniqueId = rec.getValue('custrecord_unique_id');
        var lineId = uniqueId.split('-')[1];
        var opportunity = rec.getValue('custrecord_bid_opportunity');

        log.debug('opportunity', opportunity);

        // search.create({
        //     type: 'transaction',
        //     filters: [
        //         ['type', 'anyof', 'Opprtnty'],
        //         'AND',
        //         ['internalid', 'anyof', opportunity],
        //         'AND',
        //         ['mainline', 'is', 'F'],
        //         'AND',
        //         ['lineuniquekey', 'equalto', lineId]
        //     ],
        //     columns: [
        //         'custcol_productsize', //Product Size
        //         'custcol_pack_size', //Pack Size
        //         'custcol_targetpricepoint', //Target Price Point
        //         'custcol_productgrade', //Grade
        //         'custcol_countryoforigin', //Country of Origin
        //         'custcol_datingguidelinesrestrictions', //Dating Guidelines/Restrictions
        //         'custcol_shelfliferequirements', //Shelf Life Requirements
        //         'custcol_nutritionalrequirements', //Nutritional Requirements
        //         'custcol_religiousrequirements', //Religious Requirements
        //         'custcol_labelingrequirements', //Labeling Requirements
        //         'custcol_vendoroptions' //Vendor Options
        //     ]
        // }).run().each(function(result) {

        // })
        // .run().each(function(result) {
        //     rec.setValue({
        //         fieldId: 'custrecord_productsize',
        //         value: result.getValue('custcol_productsize')
        //     });
            
        // });
        
    }

    // function beforeSubmit(context) {
        
    // }

    // function afterSubmit(context) {
        
    // }

    return {
        beforeLoad: beforeLoad
        // beforeSubmit: beforeSubmit,
        // afterSubmit: afterSubmit
    }
});
