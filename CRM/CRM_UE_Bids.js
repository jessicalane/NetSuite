/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane | 2021
 */
define(['N/record', 'N/ui/serverWidget', 'N/search'], function(record, serverWidget, search) {

    function beforeLoad(context) {
        var rec = context.newRecord;
        var form = rec.getValue('customform');

        if (form != '182') {return;}
        
        //Disable Amount column so Sales team cannot edit.
        var itemSublist = context.form.getSublist('item');
        itemSublist.getField('amount').updateDisplayType({displayType: serverWidget.FieldDisplayType.DISABLED});
        itemSublist.getField('custcol_primarybuyer').updateDisplayType({displayType: serverWidget.FieldDisplayType.DISABLED});
        itemSublist.getField('custcol_secondarybuyer').updateDisplayType({displayType: serverWidget.FieldDisplayType.DISABLED});
        itemSublist.getField('custcol_alternatebuyer').updateDisplayType({displayType: serverWidget.FieldDisplayType.DISABLED});

    }

    function beforeSubmit(context) {

        var rec = context.newRecord;
        var form = rec.getValue('customform');
        var customer = rec.getValue('entity');
        var annualRev;

        //Exit script if form is not the NFG Bid Form.
        if (form != '182') {return;}


        //Search for the customer's annual revenue (last 12 months) and put value in the Annual Customer Revenue field.
        search.create({
            type: 'salesorder',
            filters: [
                ['type', 'anyof', 'SalesOrd'],
                'AND',
                ['custbody_nfg_eligibility_date', 'onorafter', 'yearsago1'],
                'AND',
                ['mainline', 'is', 'T'], 
                'AND',
                ['customermain.internalid', 'anyof', customer]
            ],
            columns: [
                search.createColumn({
                    name: 'amount',
                    summary: 'SUM'
                })
            ]
        }).run().each(function(result) {
            annualRev = result.getValue({
                name: 'amount',
                summary: 'SUM'
            });
            
        });

        if (annualRev > 0) {
            rec.setValue({
                fieldId: 'custbody_annualcustomerrev',
                value: annualRev
            });
        } else {
            rec.setValue({
                fieldId: 'custbody_annualcustomerrev',
                value: 0
            })
        }
        


        //Set the Opportunity Status (native field) to 'Bid.' Put into beforeSubmit so that tied 'Probability' native field will set to correct value.
        rec.setValue({
            fieldId: 'entitystatus',
            value: '31'
        });




    }

    // function afterSubmit(context) {
        
    // }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit
        // afterSubmit: afterSubmit
    }
});
