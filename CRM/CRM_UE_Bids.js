/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/record', 'N/ui/serverWidget', 'N/search'], function(record, serverWidget, search) {

    function beforeLoad(context) {
        var rec = context.newRecord;
        var form = rec.getValue('customform');

        if (form != '182') {return;}
        
        //Disable Amount column so Sales team cannot edit.
        context.form.getSublist('item').getField('amount').updateDisplayType({displayType: serverWidget.FieldDisplayType.DISABLED});

        rec.setValue({
            fieldId: 'entitystatus',
            value: '31'
        });

    }

    function beforeSubmit(context) {

        var rec = context.newRecord;
        var form = rec.getValue('customform');
        var customer = rec.getValue('entity');
        var annualRev;

        //Exit script if form is not the NFG Bid Form.
        if (form != '182') {return;}


        //Search for the customer's annual revenue (last 12 months) and put value in the Annual Customer Revenue field.
        search.create({
            type: 'salesorder',
            filters: [
                ['type', 'anyof', 'SalesOrd'],
                'AND',
                ['custbody_nfg_eligibility_date', 'onorafter', 'yearsago1'],
                'AND',
                ['mainline', 'is', 'T'], 
                'AND',
                ['customermain.internalid', 'anyof', customer]
            ],
            columns: [
                search.createColumn({
                    name: 'amount',
                    summary: 'SUM'
                })
            ]
        }).run().each(function(result) {
            annualRev = result.getValue({
                name: 'amount',
                summary: 'SUM'
            });

            
        });

        rec.setValue({
            fieldId: 'custbody_annualcustomerrev',
            value: annualRev
        });



    }

    // function afterSubmit(context) {
        
    // }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit
        // afterSubmit: afterSubmit
    }
});
