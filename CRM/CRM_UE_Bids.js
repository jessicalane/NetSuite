/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/record', 'N/ui/serverWidget', 'N/search'], function(record, serverWidget, search) {

    function beforeLoad(context) {
        var rec = context.newRecord;
        var form = rec.getValue('customform');
        var customer = rec.getValue('entity');

        if (form != '182') {return;}
        
        //Hide Amount Column
        context.form.getSublist('item').getField('amount').updateDisplayType({displayType: serverWidget.FieldDisplayType.DISABLED});

        //Set the dynamic value of the 'Annual Customer Revenue' field
        

        // search.create({
        //     type: 'transaction',
        //     filters: [
        //         ['customermain.internalid', 'anyof', customer],
        //         'AND',
        //         ['custbody_nfg_eligibility_date', 'onorafter', 'yearsago'],
        //         'AND',
        //         ['type', 'anyof', 'SalesOrd', 'RtnAuth']
        //     ],
        //     columns: [
        //         search.createColumn({
        //             name: 'amount',
        //             summary: 'SUM',
        //             label: 'Annual Revenue'
        //         })
        //     ]
        // }).run()

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
