/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/search', 'N/record'], function(search, record) {


    function beforeSubmit(context) {
        var rec = context.newRecord;

        if (context.type == context.UserEventType.DELETE) {return;}

        //TODO search customer record to see if SSCC Labels are needed
        
        //TODO If SSCC labels are needed, generate SSCC. Store last number in a Last Used Number custom record (SSCC Serial Reference field).

    }

    return {
        beforeSubmit: beforeSubmit
    }
});
