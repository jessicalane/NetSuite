/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/search', 'N/record'], function(search, record) {


    function beforeSubmit(context) {
        var rec = context.newRecord;
        var customer = rec.getValue('entity');

        if (context.type == context.UserEventType.DELETE) {return;}

        search.create({
            type: 'customer',
            filters: [
                ['internalid', 'anyof', customer]
            ],
            columns: [
                search.createColumn({name: 'custentity_sscclabelsneeded', label: 'SSCC Labels Needed'})
            ]
        }).run().each(function (result) {
            //TODO If SSCC labels are needed, generate SSCC. Store last number in a Last Used Number custom record (SSCC Serial Reference field).

        })
        

    }

    return {
        beforeSubmit: beforeSubmit
    }
});
