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
                    log.debug('sscc', sscc);
                    
                }
            }

        }
   
    }

    function generateSSCC(number) {
        
        //TODO: Make the extDigit part of the custom record so that it will cycle through to 9, then alert team to get a new compPrefix;
        var extDigit = '0';
        var compPrefix = '185043000';
        var serialRef = getSerialRef();
        log.debug('serialRef', serialRef);

        var checkDigitRef = extDigit + compPrefix + serialRef;
        log.debug('checkdigitref', checkDigitRef)

        var checkDigit = checkDigitCreator(checkDigitRef);

        return extDigit + compPrefix + serialRef + checkDigit;

    }

    function getSerialRef() {
        return '1234567'
    }

    function checkDigitCreator(checkDigitRef) {

        //Instructions for manually calculating a check digit can be found here: https://www.gs1.org/services/how-calculate-check-digit-manually
        //Recreated into script below.

        var num = checkDigitRef;
        var numberArray = [...num+''].map(n=>+n);
        var sumArray = [];

        log.debug('num', num);
        log.debug('numberArray', numberArray);

        for (i = 0; i < numberArray.length; i ++) {
            if (i % 2 == 0) {

                var val = numberArray[i] * 3;
                sumArray.push(val);

            } else {
                var val = numberArray[i];
                sumArray.push(val);
            }
        }

        var checkDigitSum = sumArray.reduce((a,b) => a+b, 0);
        log.debug('checkdigitsum', checkDigitSum);
        var rounded = Math.ceil(checkDigitSum/10)*10;
        log.debug('rounded', rounded);

        log.debug('return', rounded - checkDigitSum)

        return rounded - checkDigitSum;


    }


    return {
        beforeSubmit: beforeSubmit
    };
});
