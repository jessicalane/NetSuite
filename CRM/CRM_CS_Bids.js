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

    function fieldChanged(context) {

        const rec = context.currentRecord;
        let form = rec.getValue('customform');

        if (form != '182') {return;}

        //TODO Change this to a workflow?? Or remove hidden from UE script and put disabled into pageInit(on create) in this script.
        if (context.fieldId == 'custbody_performanceclause') {
            let perf = rec.getValue('custbody_performanceclause');

            if (perf == '1') {
                log.debug('test', rec.getField('custbody_performanceclausedetails').isDisabled);
            }
            
        }
        
    }

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
        
        // var rec = context.currentRecord;
        // var form = rec.getValue('customform');

        // if (form != '182') {return;}

        // if (context.sublistId === 'item') {
        //     log.debug('entering sublist', 'entering sublist')
        //     rec.setCurrentSublistValue({
        //         sublistId: 'item',
        //         fieldId: 'amount',
        //         value: 0,
        //         ignoreFieldchange: true
        //     });
        //     rec.commitLine({
        //         sublistId: 'item'
        //     });
        // }

    // }

    return {
        //pageInit: pageInit,
        // saveRecord: saveRecord,
        // validateField: validateField,
        fieldChanged: fieldChanged,
        // postSourcing: postSourcing,
        // lineInit: lineInit,
        // validateDelete: validateDelete,
        // validateInsert: validateInsert,
        validateLine: validateLine
        //sublistChanged: sublistChanged
    }
});
