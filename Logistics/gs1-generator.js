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

        var customerLookUp = search.lookupFields({
            type: search.Type.CUSTOMER,
            id: customer,
            columns: ['custentity_sscclabelsneeded']
        });


        if (customerLookUp.custentity_sscclabelsneeded == true) {

            var pallets = rec.getValue('custbody_total_pallets_rounded');

            var ssccSerialLookUp = search.lookupFields({
                type: 'customrecord_script_lookups',
                id: 5, //5 is the internalid of sscc serial
                columns: ['custrecord_fft_field']
            });

            if (pallets == 1) {

                var lastSerial = ssccSerialLookUp.custrecord_fft_field;
                var newSerial = (Number(lastSerial) + 1).toString().padStart(7, '0');
                log.debug('lastSerial1', lastSerial);
                log.debug('newSerial1', newSerial);

                rec.setValue({
                    fieldId: 'custbody_gs1128numbers',
                    value: newSerial
                });
                log.debug('lastSerial2', lastSerial);
                log.debug('newSerial2', newSerial);

                var ssccSerialLoad = record.load({
                    type: 'customrecord_script_lookups',
                    id: 5,
                    isDynamic: true
                });
                log.debug('lastSerial3', lastSerial);
                log.debug('newSerial3', newSerial);

                ssccSerialLoad.setValue({
                    fieldId: 'custrecord_fft_field',
                    value: newSerial
                });
                log.debug('lastSerial4', lastSerial);
                log.debug('newSerial4', newSerial);

                ssccSerialLoad.save();
                log.debug('lastSerial5', lastSerial);
                log.debug('newSerial5', newSerial);

            }



        }



            // if (result.getValue('custentity_sscclabelsneeded') == true) {

            //     search.create({
            //         type: 'customrecord_script_lookups',
            //         filters: [
            //             ['internalid', 'anyof', '5']
            //         ],
            //         columns: [
            //             search.createColumn({'custrecord_fft_field'})
            //         ]
            //     }).run().each(function(result) {

            //         var ssccLastSerial = result.getValue('custrecord_fft_field');
            //         //TODO Generate Check Digit
            //         var checkDigit = '4'

            //         //TODO create GS1 per # of pallets
            //         var pallets = rec.getValue('custbody_total_pallets_rounded');

            //         if (pallets == 1) {
            //             rec.setValue({
            //                 fieldId: 'custbody_gs1128numbers',
            //                 value: '(00)0185043000' + ssccLastSerial + checkDigit
            //             })
            //         } 
            //         // else {

            //         // }

            //         var ssccNewSerial = (Number(ssccLastSerial) + 1).toString().padStart(7, '0');

            //         var scriptLookup = record.load({
            //             type: 'customrecord_script_lookups',
            //             id: 5,
            //             isDynamic: true
            //         });

            //         scriptLookup.setValue({
            //             name: 'custrecord_fft_field',
            //             value: ssccNewSerial
            //         });

            //         scriptLookup.save();


            //     })
            // }
        // })
        

    }

    return {
        beforeSubmit: beforeSubmit
    };
});
