/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 *@CreatedBy Jessica Lane 2020
 */
define(['N/currentRecord', 'N/search', 'N/ui/dialog'], 

/**
 * 
 * @param {currentRecord} currentRecord 
 * @param {search} search 
 * @param {dialog} dialog
 */

function(currentRecord, search, dialog) {

    function pageInit(context) {
        
        var contextRecord = context.currentRecord;
      
        //Make Special Services Other textbox hidden when page is loading
        if (context.mode == 'create') {
            contextRecord.getField({
                fieldId: 'custbody_nfg_specservicesother'
            }).isDisplay = false;
        }
        
        var customer = contextRecord.getValue('entity');

        if (customer) {

            var addressId = contextRecord.getValue('shipaddresslist');

            log.debug('Context', 'pageInit');

            var customerId = contextRecord.getValue('entity');
            if (addressId) {
                var columns = [
                    search.createColumn({
                        name: 'custrecord_hand_unload_delivery',
                        join: 'Address'
                    }),
                    search.createColumn({
                        name: 'custrecord_driver_unload',
                        join: 'Address'
                    }),
                    search.createColumn({
                        name: 'custrecord_lift_gate',
                        join: 'Address'
                    }),
                    search.createColumn({
                        name: 'custrecord_pallet_jack',
                        join: 'Address'
                    }),
                    search.createColumn({
                        name: 'custrecord_tailgating',
                        join: 'Address'
                    }),
                    search.createColumn({
                        name: 'custrecord_short_truck',
                        join: 'Address'
                    }),
                    search.createColumn({
                        name: 'custrecord_straight_truck',
                        join: 'Address'
                    }),
                    search.createColumn({
                        name: 'custrecord_48_trailer',
                        join: 'Address'
                    }),
                    search.createColumn({
                        name: 'custrecord_specific_date',
                        join: 'Address'
                    }),
            

                ];

                var filters = [
                    ['internalid', 'anyof', customerId],
                    'AND',
                    ['formulanumeric: {address.addressinternalid}', 'equalto', addressId]
                ];

                var specServSearch = search.create({
                    type: search.Type.CUSTOMER,
                    columns: columns,
                    filters: filters
                });

                var results = specServSearch.run().getRange({
                    start: 0,
                    end: 1
                });

                var arr = [];

                for (i in results) {
                    var handUnload = results[i].getValue({
                        name: 'custrecord_hand_unload_delivery',
                        join: 'Address'
                    });

                    var driverUnload = results[i].getValue({
                        name: 'custrecord_driver_unload',
                        join: 'Address'
                    });

                    var liftGate = results[i].getValue({
                        name: 'custrecord_lift_gate',
                        join: 'Address'
                    });

                    var palletJack = results[i].getValue({
                        name: 'custrecord_pallet_jack',
                        join: 'Address'
                    });

                    var tailgating = results[i].getValue({
                        name: 'custrecord_tailgating',
                        join: 'Address'
                    });

                    var shortTruck = results[i].getValue({
                        name: 'custrecord_short_truck',
                        join: 'Address'
                    });

                    var straightTruck = results[i].getValue({
                        name: 'custrecord_straight_truck',
                        join: 'Address'
                    });

                    var fortyEightTrailer = results[i].getValue({
                        name: 'custrecord_48_trailer',
                        join: 'Address'
                    });

                    var specificDate = results[i].getValue({
                        name: 'custrecord_specific_date',
                        join: 'Address'
                    });

                    if (results.length > 0) {
                        if (handUnload == true) {
                            arr.push(1);
                        }
                        if (driverUnload == true) {
                            arr.push(2);
                        }                    
                        if (liftGate == true) {
                            arr.push(3);
                        }                    
                        if (palletJack == true) {
                            arr.push(4);
                        }                    
                        if (tailgating == true) {
                            arr.push(5);
                        }                    
                        if (shortTruck == true) {
                            arr.push(6);
                        }                    
                        if (straightTruck == true) {
                            arr.push(7);
                        }                    
                        if (fortyEightTrailer == true) {
                            arr.push(8);
                        }                    
                        if (specificDate == true){
                            arr.push(10)
                        }
                    }
                    
                    contextRecord.setValue({
                        fieldId: 'custbody_specialservices',
                        value: arr
                    });

                    log.debug('special services', contextRecord.getValue('custbody_specialservices'));

                    if (arr.includes('10')) {
                        contextRecord.getField({
                            fieldId: 'custbody_nfg_specservicesother'
                        }).isDisplay = true;
                    }

                }
            }
        } 

        

    }

    function postSourcing(context) {
        
        var contextRecord = context.currentRecord;
        
        if (context.fieldId == 'shipaddresslist') {

            log.debug('Context', 'postSourcing');

            var customerId = contextRecord.getValue('entity');
            var addressId = contextRecord.getValue('shipaddresslist');

            //Column order should match InternalID order of the Special Services list
            var columns = [
                search.createColumn({
                    name: 'custrecord_hand_unload_delivery',
                    join: 'Address'
                }),
                search.createColumn({
                    name: 'custrecord_driver_unload',
                    join: 'Address'
                }),
                search.createColumn({
                    name: 'custrecord_lift_gate',
                    join: 'Address'
                }),
                search.createColumn({
                    name: 'custrecord_pallet_jack',
                    join: 'Address'
                }),
                search.createColumn({
                    name: 'custrecord_tailgating',
                    join: 'Address'
                }),
                search.createColumn({
                    name: 'custrecord_short_truck',
                    join: 'Address'
                }),
                search.createColumn({
                    name: 'custrecord_straight_truck',
                    join: 'Address'
                }),
                search.createColumn({
                    name: 'custrecord_48_trailer',
                    join: 'Address'
                }),
                search.createColumn({
                    name: 'custrecord_specific_date',
                    join: 'Address'
                }),
         

            ];

            var filters = [
                ['internalid', 'anyof', customerId],
                'AND',
                ['formulanumeric: {address.addressinternalid}', 'equalto', addressId]
            ];

            var specServSearch = search.create({
                type: search.Type.CUSTOMER,
                columns: columns,
                filters: filters
            });

            var results = specServSearch.run().getRange({
                start: 0,
                end: 1
            });

            var arr = [];

            for (i in results) {
                var handUnload = results[i].getValue({
                    name: 'custrecord_hand_unload_delivery',
                    join: 'Address'
                });

                var driverUnload = results[i].getValue({
                    name: 'custrecord_driver_unload',
                    join: 'Address'
                });

                var liftGate = results[i].getValue({
                    name: 'custrecord_lift_gate',
                    join: 'Address'
                });

                var palletJack = results[i].getValue({
                    name: 'custrecord_pallet_jack',
                    join: 'Address'
                });

                var tailgating = results[i].getValue({
                    name: 'custrecord_tailgating',
                    join: 'Address'
                });

                var shortTruck = results[i].getValue({
                    name: 'custrecord_short_truck',
                    join: 'Address'
                });

                var straightTruck = results[i].getValue({
                    name: 'custrecord_straight_truck',
                    join: 'Address'
                });

                var fortyEightTrailer = results[i].getValue({
                    name: 'custrecord_48_trailer',
                    join: 'Address'
                });

                var specificDate = results[i].getValue({
                    name: 'custrecord_specific_date',
                    join: 'Address'
                });

                if (results.length > 0) {
                    if (handUnload == true) {
                        arr.push(1);
                    }
                    if (driverUnload == true) {
                        arr.push(2);
                    }                    
                    if (liftGate == true) {
                        arr.push(3);
                    }                    
                    if (palletJack == true) {
                        arr.push(4);
                    }                    
                    if (tailgating == true) {
                        arr.push(5);
                    }                    
                    if (shortTruck == true) {
                        arr.push(6);
                    }                    
                    if (straightTruck == true) {
                        arr.push(7);
                    }                    
                    if (fortyEightTrailer == true) {
                        arr.push(8);
                    }                    
                    if (specificDate == true){
                        arr.push(10);
                    }
                }
                
                contextRecord.setValue({
                    fieldId: 'custbody_specialservices',
                    value: arr
                });

            }

        }

    }

    function fieldChanged (context) {
        
        var contextRecord = context.currentRecord;

        if (context.fieldId == 'custbody_specialservices') {

            var specServValue = contextRecord.getValue('custbody_specialservices');
            log.debug('spec services grab after change', specServValue);

            if (specServValue.includes('10')) {
                contextRecord.getField('custbody_nfg_specservicesother').isDisplay = true;
            } else {
                contextRecord.getField('custbody_nfg_specservicesother').isDisplay = false;
            }
        }
    }

    function validateLine(context) {
        var rec = context.currentRecord;
        var entity = rec.getValue('entity');


        var today = new Date();
        // var month = today.getMonth()+1;
        // var day = today.getDate();
        // var year = today.getFullYear();

        // log.debug('today:1', today);

        // today = month + '/' + day + '/' + year;
        // log.debug('today:2', today);

        var exempt;
        var expDate;

        if (entity) {
            search.create({
                type: 'customer',
                filters: [
                    ['internalid', 'anyof', entity]
                ],
                columns: [
                    search.createColumn({
                        name: 'custentity_sales_tax_exemption_cert',
                        label: 'Sales Tax Exemption Cert'
                    }),
                    search.createColumn({
                        name: 'custentity_taxexemptcertexpdate', 
                        label: 'Tax Exempt Expiration Date'
                    })
                ]
            }).run().each(function(result) {
                exempt = result.getValue({
                    name: 'custentity_sales_tax_exemption_cert'
                });

                expDate = result.getValue({
                    name: 'custentity_taxexemptcertexpdate'
                });

                expDate = new Date(expDate);

            });
        };



        if (context.sublistId == 'item'){

            var item = rec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item'
            });

            var category = '';

            search.create({
                type: 'item',
                filters: [
                    ['internalid', 'anyof', item]
                ],
                columns: [
                    search.createColumn({
                        name: 'custitem_item_category',
                        label: 'Item Category'
                    })
                ]
            }).run().each(function(result) {
                category = result.getValue({
                    name: 'custitem_item_category'
                });
                
            });



            if (category == '22') {
                if (exempt) {
                    if (expDate) {
                        if (expDate > today) {
                            return true;
                        } else {
                            dialog.alert({
                                title: 'Expired Tax Cert',
                                message: 'The tax exemption certificate for this customer has expired. Non-food items can only be sold to current non-taxable customers.'
                            });
                            return false;
                        }
                    } else {
                        dialog.alert({
                            title: 'No Tax Cert Expiration',
                            message: 'No tax exemption certificate expiration date has been set for this customer. Non-food items can only be sold to current non-taxable customers.'
                        });
                        return false;
                    }
                } else {
                    dialog.alert({
                        title: 'No tax exemption found.',
                        message: 'No tax exemption certificate has been assigned to this customer. Non-food items can only be sold to current non-taxable customers.'
                    });
                    return false;
                }
            } else {
                return true;  
            }
            
        } else {
            return true;
        }
    }


    return {
        pageInit: pageInit,
        postSourcing: postSourcing,
        fieldChanged: fieldChanged,
        validateLine: validateLine
    }
});
