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
        }).run().each(function(result) {
            //TODO If SSCC labels are needed, generate SSCC. Store last number in a Last Used Number custom record (SSCC Serial Reference field).
            if (result.getValue('custentity_sscclabelsneeded') == true) {

                //TODO create search to find last number used for SSCC Serial Reference.
                search.create({
                    type: 'customrecord_lastnumberused',
                    filters: [],
                    columns: [
                        search.createColumn({name: 'internalid', summary: 'MAX'}),
                        //is following data necessary?
                        search.createColumn({name: 'custrecord_ssccserialreference', summary: 'MAX'})
                    ]
                }).run().each(function(result) {
                    var lastNumberID = result.getValue('internalid');

                    var lastNumber = record.load({
                        type: 'customrecord_lastnumberused',
                        id: lastNumberID,
                        isDynamic: true
                    });

                    var ssccLastNumber = lastNumber.getValue('custrecord_ssccserailreference');
                    var ssccNewNumber = (Number(ssccLastNumber) + 1).toString().padStart(7, '0');
                })
            }
        })
        

    }

    return {
        beforeSubmit: beforeSubmit
    }
});
