/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/record', 'N/ui/serverWidget'], function(record, serverWidget) {

    function beforeLoad(context) {
        var rec = context.newRecord;
        context.form.getSublist('item').getField('amount').updateDisplayType({displayType: serverWidget.FieldDisplayType.DISABLED});


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
