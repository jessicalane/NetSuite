/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/record', 'N/ui/serverWidget', 'N/search'], function(record, serverWidget, search) {

    function beforeLoad(context) {
        var rec = context.newRecord;
        var form = rec.getValue('customform');
        var customer = rec.getValue('entity');
        var perf = rec.getField('custbody_performanceclausedetails');

        if (form != '182') {return;}
        
        //Hide Amount Column
        context.form.getSublist('item').getField('amount').updateDisplayType({displayType: serverWidget.FieldDisplayType.DISABLED});
        context.form.getField('custbody_performanceclausedetails').updateDisplayType({displayType: serverWidget.FieldDisplayType.HIDDEN});
        context.form.getField('custbody_deliverypenaltydetails').updateDisplayType({displayType: serverWidget.FieldDisplayType.HIDDEN});


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
