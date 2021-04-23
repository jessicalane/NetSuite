/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 */
define(['N/record', 'N/search'], function(record, search) {

    function beforeSubmit(context) {
        //TODO: stop erroring out when there is not photo in the field. this script is currently undeployed.

        var rec = context.newRecord;
        var caseLabel = rec.getValue('custitem_case_label');
        var caseImage = rec.getValue('custitem_case_image');
        var caseImage2 = rec.getValue('custitem_additional_case_image2');
        var caseLabelNutr = rec.getValue('custitem_case_label_nutritional');

        log.debug('case label value', caseLabel);

        if (caseLabel) {

            search.create({
                type: 'file',
                filters: [
                    ['internalid', 'anyof', caseLabel]
                ],
                columns: [
                    search.createColumn({name: 'modified'})
                ]
            }).run().each(function(result) {
                var date = new Date(result.getValue({name: 'modified'}));
                rec.setValue({
                    fieldId: 'custitem_caselabelts',
                    value: date
                });

            });
        }

        if (caseImage) {

            search.create({
                type: 'file',
                filters: [
                    ['internalid', 'anyof', caseImage]
                ],
                columns: [
                    search.createColumn({name: 'modified'})
                ]
            }).run().each(function(result) {
                var date = new Date(result.getValue({name: 'modified'}));
                rec.setValue({
                    fieldId: 'custitem_caseimagetimestamp',
                    value: date
                });

            });
        }

        if (caseImage2) {

            search.create({
                type: 'file',
                filters: [
                    ['internalid', 'anyof', caseImage2]
                ],
                columns: [
                    search.createColumn({name: 'modified'})
                ]
            }).run().each(function(result) {
                var date = new Date(result.getValue({name: 'modified'}));
                rec.setValue({
                    fieldId: 'custitem_additionalcaseimagets',
                    value: date
                });

            });
        }

        if (caseLabelNutr) {

            search.create({
                type: 'file',
                filters: [
                    ['internalid', 'anyof', caseLabelNutr]
                ],
                columns: [
                    search.createColumn({name: 'modified'})
                ]
            }).run().each(function(result) {
                var date = new Date(result.getValue({name: 'modified'}));
                rec.setValue({
                    fieldId: 'custitem_caselabelnutritionalts',
                    value: date
                });

            });
        }
    }

    return {
        beforeSubmit: beforeSubmit
    }
});
