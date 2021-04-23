/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane
 */
define(['N/record', 'N/search', 'N/log'], function(record, search, log) {

    function afterSubmit(context) {
        log.debug('starting', 'starting');
        
        //when a contact is created or update, search the act-on default custom records to see if data matches for url updates

        if (context.type === 'delete') {return;}

        try {

            var contact = context.newRecord;
            var contactId = contact.id;
            var company = contact.getValue('company');
            var salesRep = contact.getValue('custentity_contact_sales_rep');

            search.create({
                type: 'customer',
                filters: [
                    ['internalid', 'anyof', company]
                ],
                columns: [
                    search.createColumn({name: 'pricelevel'}),
                    search.createColumn({name: 'custentity_division', label: 'Segment'}),
                    search.createColumn({name: 'phone', join: 'salesRep'}),
                    search.createColumn({name: 'fax', join: 'salesRep'}),
                    search.createColumn({name: 'custentity_nfg_marketing_price_level', label: 'Marketing Price Level'}),
                    search.createColumn({name: 'entityid', join: 'parentCustomer'})
                ]
            }).run().each(function(result) {

                var pricelevel = result.getText({name: 'pricelevel'});
                var segment = result.getText({name: 'custentity_division'});
                var repPhone = result.getValue({name: 'phone', join: 'salesRep'});
                var repFax = result.getValue({name: 'fax', join: 'salesRep'});
                var marketingPriceLevel = result.getText({name: 'custentity_nfg_marketing_price_level'});
                var parent = result.getValue({name: 'entityid', join: 'parentCustomer'});

                record.submitFields({
                    type: record.Type.CONTACT,
                    id: contactId,
                    values: {
                        'custentity_pricelevel_custom': pricelevel,
                        'custentity_division_contact': segment,
                        'custentity_sales_rep_phonec': repPhone,
                        'custentity_sales_rep_faxc': repFax,
                        'custentity_marketingpricelevel': marketingPriceLevel,
                        'custentity_parentcustomer_text_field': parent
                    },
                    options: {
                        enableSourcing: false,
                        ignoreMandatoryFields: true
                    }
                });

                return true;
            });

            search.create({
                type: 'employee',
                filters: [
                    ['internalid', 'anyof', salesRep]
                ],
                columns: [
                    search.createColumn({
                        name: 'formulatext',
                        formula: '{image}'
                    })
                ]
            }).run().each(function(result) {
                //check this url path compared to production to see if it was updated when there were problems earlier this year.
                var imageURL = result.getValue('formulatext') ? 'https://3450792.app.netsuite.com' + result.getValue('formulatext') : 'https://3450792.app.netsuite.com/core/media/media.nl?id=1384600&c=3450792&h=9900498dd8f66bbb9564';

                record.submitFields({
                    type: record.Type.CONTACT,
                    id: contactId,
                    values: {
                        'custentity_image_url_pathc': imageURL
                    },
                    options: {
                        enableSourcing: false,
                        ignoreMandatoryFields: true
                    }
                })
                
                return true;
            });

            //This section does not work on create because the price level is not established until aftersubmit.
            //Potential solution: load and save if context is create??
            //Other potential solution: save the variables from the customer record as global variables

            var conPriceLevel = contact.getValue('custentity_pricelevel_custom');

            search.create({
                type: 'customrecord_actondefaults',
                filters: [
                    ['custrecord_acton_pricelevel', 'anyof', conPriceLevel],
                    'AND',
                    ['custrecord_acton_name', 'anyof', salesRep]
                ],
                columns: [
                    search.createColumn({name: 'custrecord_acton_pricelevel', summary: 'MAX'}),
                    search.createColumn({name: 'custrecord_acton_dynamicsamplepage', summary: 'MAX'})
                ]
            }).run().each(function(result) {
                var dynamicURL = result.getValue({name: 'custrecord_acton_dynamicsamplepage', summary: 'MAX'});

                record.submitFields({
                    type: record.Type.CONTACT,
                    id: contactId,
                    values: {
                        'custentity_dynamic_sample_page': dynamicURL
                    },
                    options: {
                        enableSourcing: false,
                        ignoreMandatoryFields: true
                    }
                });
                
                return true;
            })



        } catch (error) {
            log.debug({
                title: 'Act-On Defaults Failure', 
                details: error
            });
        }

    }

    return {
        afterSubmit: afterSubmit
    }
});