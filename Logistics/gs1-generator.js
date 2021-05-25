/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/search', 'N/record'], function(search, record) {

    //TODO lIST: only trigger upon proper SO Stage change;

    function beforeSubmit(context) {
        var rec = context.newRecord;
        var customer = rec.getValue('entity');
        var stage = rec.getValue('custbody_sostage');
        var readyToSend = rec.getValue('custbody_ready_to_send_warehouse_edi');

        if (context.type == context.UserEventType.DELETE) {return;}
        if (context.type == context.UserEventType.CREATE) {return;}

        var customerLookUp = search.lookupFields({
            type: search.Type.CUSTOMER,
            id: customer,
            columns: ['custentity_sscclabelsneeded']
        });

        if (customerLookUp.custentity_sscclabelsneeded == true && (stage == '4' || stage = '3' || stage = '6' || readyToSend)) {

            ssccLabels(rec);

        }
   
    }

    function ssccLabels(rec) {

        var lines = rec.getLineCount('item');
        var pallets = rec.getValue('custbody_total_pallets_rounded');

        for (i = 0; i < lines; i++){
            var ssccLine = rec.getSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_sscclabels',
                line: i
            });

            if (!ssccLine) {

                let seqArray = [];
                let ssccArray = [];

                for (j = 0; j < pallets; j++){
                    
                    var sscc = generateSSCC();

                    ssccArray.push(sscc);

                }

                if (lines >= pallets) {

                    let order = Array.from({length:pallets}, (a,index) => index);

                    while (order.length < lines) {
                        order = order.concat(order);
                    }

                    for (k = 0; k < lines; k++) {
                        seqArray.push(order[k]);
                    }

                    for (l = 0; l < lines; l++) {
                        rec.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_sscclabels',
                            line: l,
                            value: ssccArray[seqArray[l]]
                        });
                    }


                } else {

                    let order = Array.from({length:lines}, (a,index) => index);

                    while (order.length < pallets) {
                        order = order.concat(order);
                    }

                    for (k = 0; k < pallets; k++) {
                        seqArray.push(order[k]);
                    }

                    for (l = 0; l < pallets; l++) {

                        var currSSCC = rec.getSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_sscclabels',
                            line: order[l]
                        });

                        if (currSSCC) {
                            var ssccVal = currSSCC + ', ' + ssccArray[l];
                        } else {
                            var ssccVal = ssccArray[l]
                        }

                        rec.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_sscclabels',
                            line: order[l],
                            value: ssccVal
                        });

                    }

                }
                
                break;
                
            }
        }
    }

    function generateSSCC() {

        //TODO: Use pallets variable to only run sscc generation x # of pallets. Store the values in an array. Push that array back to the beforeSubmit. Assign to lines as needed.
        
        //TODO: Make the extDigit part of the custom record so that it will cycle through to 9, then alert team to get a new compPrefix;
        var appIdentifier = '00'
        var extDigit = '0';

        //TODO: Make the compPrefix part of the custom record for future updates.
        var compPrefix = '185043000';
        var serialRef = getSerialRef();

        var checkDigitRef = extDigit + compPrefix + serialRef;

        var checkDigit = checkDigitCreator(checkDigitRef);

        return appIdentifier + extDigit + compPrefix + serialRef + checkDigit;

    }

    function getSerialRef() {
        
        var lastSerialRefLookup = search.lookupFields({
            type: 'customrecord_script_lookups',
            id: 5,
            columns: ['custrecord_fft_field']
        });

        var lastSerial = lastSerialRefLookup.custrecord_fft_field;
        var newSerial = (Number(lastSerial) + 1).toString().padStart(7, '0');

        record.load({
            type: 'customrecord_script_lookups',
            id: 5,
            isDynamic: true
        }).setValue({
            fieldId: 'custrecord_fft_field',
            value: newSerial
        }).save();
        
        return lastSerial;
    }

    function checkDigitCreator(checkDigitRef) {

        //Instructions for manually calculating a check digit can be found here: https://www.gs1.org/services/how-calculate-check-digit-manually
        //Recreated into script below.

        var num = checkDigitRef;
        var numberArray = [...num+''].map(n=>+n);
        var sumArray = [];

        for (i = 0; i < numberArray.length; i ++) {
            if (i % 2 == 0) {

                var val = numberArray[i] * 3;
                sumArray.push(val);

            } else {
                var val = numberArray[i];
                sumArray.push(val);
            }
        }

        var checkDigitSum = sumArray.reduce((a, b) => a + b, 0);
        var rounded = Math.ceil(checkDigitSum / 10) * 10;

        return rounded - checkDigitSum;

    }


    return {
        beforeSubmit: beforeSubmit
    };
});
