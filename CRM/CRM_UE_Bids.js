/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/record', 'N/ui/serverWidget'], function(record, serverWidget) {

    function beforeLoad(context) {
        var rec = context.newRecord;
        var sub = rec.getSublist({
            sublistId: 'item'
        });
        var column = sub.getSublistField({
            id: 'amount'
        });
        column.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.HIDDEN
        })
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
