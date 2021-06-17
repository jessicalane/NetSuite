/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@CreatedBy Jessica Lane | 2021
 */

define(['N/currentRecord'], function(currentRecord) {

    // function pageInit(context) {


    // }

    // function saveRecord(context) {
        
    // }

    // function validateField(context) {
        
    // }

    // function fieldChanged(context) {

        
    // }

    // function postSourcing(context) {
        
    // }

    // function lineInit(context) {

    // }

    // function validateDelete(context) {
        
    // }

    // function validateInsert(context) {
        
    // }

    function validateLine(context) {

        const rec = context.currentRecord;
        let form = rec.getValue('customform');

        if (form != '182') {return;}

        if (context.sublistId === 'item') {
            rec.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'amount',
                value: 0,
                ignoreFieldChange: true
            });

            return true;
        }

    }

    // function sublistChanged(context) {

    // }

    return {
        //pageInit: pageInit,
        // saveRecord: saveRecord,
        // validateField: validateField,
        //fieldChanged: fieldChanged,
        // postSourcing: postSourcing,
        // lineInit: lineInit,
        // validateDelete: validateDelete,
        // validateInsert: validateInsert,
        validateLine: validateLine
        //sublistChanged: sublistChanged
    }
});
