/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/search', 'N/record'], function(search, record) {

    //TODO Rework to put at the item level. Divide if multiple.


    function beforeSubmit(context) {
        var rec = context.newRecord;
        var customer = rec.getValue('entity');

        if (context.type == context.UserEventType.DELETE) {return;}
        if (context.type == context.UserEventType.CREATE) {return;}



        var customerLookUp = search.lookupFields({
            type: search.Type.CUSTOMER,
            id: customer,
            columns: ['custentity_sscclabelsneeded']
        });

        if (customerLookUp.custentity_sscclabelsneeded == true) {

            var lines = rec.getLineCount('item');
            var pallets = rec.getValue('custbody_total_pallets_rounded');

            for (i = 0; i < lines; i++){
                var ssccLine = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_sscclabels',
                    line: i
                });

                if (!ssccLine) {
                    
                    var sscc = generateSSCC();
                    
                }
            }

        }
   
    }

    function generateSSCC(number) {
        
        var extDigit = '0';
        var compPrefix = '185043000';
        var serialRef = getSerialRef();

        var checkDigitRef = Number(extDigit + compPrefix + serialRef);

        var checkDigit = checkDigit(checkDigitRef);



        return extDigit + compPrefix + serialRef + checkDigit;

    }

    function getSerialRef() {
        return '1234'
    }

    function checkDigit(checkDigitRef) {

        var num = checkDigitRef;
        var numberArray = [...num+''].map(n=>+n);

        for (i = 0; i < numberArray.length; i ++) {
            if (i % 2 == 0) {
                //TODO expand this out more
                numberArray[i] * 3;
            } else {
                numberArray[i];
            }
        }

    }


    return {
        beforeSubmit: beforeSubmit
    };
});
