/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/record', 'N/ui/serverWidget', 'N/search'], function(record, serverWidget, search) {

    function beforeLoad(context) {
        var rec = context.newRecord;
        var form = rec.getValue('customform');
        // var customer = rec.getValue('entity');

        if (form != '182') {return;}
        
        //Hide Amount Column
        context.form.getSublist('item').getField('amount').updateDisplayType({displayType: serverWidget.FieldDisplayType.DISABLED});

    }

    function beforeSubmit(context) {

        var rec = context.newRecord;
        log.debug('rec', rec);
        var form = rec.getValue('customform');
        var customer = rec.getValue('entity');
        var annualRev;

        rec.setValue({
            fieldId: 'custbody_annualcustomerrevenue',
            value: '1.50'
        });
        rec.setValue({
            fieldId: 'custbody_termofbid',
            value: 2
        })

        if (form != '182') {return;}

        // search.create({
        //     type: 'salesorder',
        //     filters: [
        //         ['type', 'anyof', 'SalesOrd'],
        //         'AND',
        //         ['custbody_nfg_eligibility_date', 'onorafter', 'yearsago1'],
        //         'AND',
        //         ['mainline', 'is', 'T'], 
        //         'AND',
        //         ['customermain.internalid', 'anyof', customer]
        //     ],
        //     columns: [
        //         search.createColumn({
        //             name: 'amount',
        //             summary: 'SUM'
        //         })
        //     ]
        // }).run().each(function(result) {
        //     annualRev = result.getValue({
        //         name: 'amount',
        //         summary: 'SUM'
        //     });

        //     log.debug('annualRev', annualRev);

            
        // });

        

    }

    // function afterSubmit(context) {
        
    // }

    return {
        //beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit
        // afterSubmit: afterSubmit
    }
});
