/**
 *@NApiVersion 2.1
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane
 */
define(['N/record', 'N/search'], function(record, search) {

    function beforeSubmit(context) {

    if (context.type == context.UserEventType.DELETE) {return;}

        log.debug('triggered', 'triggered beforesubmit');
        //Variables used throughout
        var oldRec = context.oldRecord;
        var rec = context.newRecord;
        var id = rec.id;
        var entity = rec.getValue('entity');
        var form = rec.getValue('customform');

        if (form == '182') {return;}

        var lineCount = rec.getLineCount({
            sublistId: 'item'
        });
        var probability = rec.getValue('probability');
        var bidEndDate = rec.getValue('custbody_bidenddate');
        var status = rec.getValue('entitystatus');
        var today = new Date();

        var netWtDry = 0;
        var netWtFrozen = 0;
        var grossWtDry = 0;
        var grossWtFrozen = 0;
        var whFee = 0;
        

        var estFreight = rec.getValue('custbody_actual_freight');
       

        if (lineCount > 0 || oldRec != rec) {

            //Variable only sets to 0 with items so that it can be overwritten if no items listed.
            var projTotal = 0;
            var gp = 0;

            for (i = 0; i < lineCount; i++) {
                var loss = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_linelossreason',
                    line: i
                });

                var temp = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_storage_temp_class',
                    line: i
                });

                var qty = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i
                });

                var netWtItem = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_net_wt',
                    line: i
                });

                var grossWtItem = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_gross_weight',
                    line: i
                });

                var costOverride = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_estcostopp',
                    line: i
                });

                var costEstimateRate = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'costestimaterate',
                    line: i
                })

                if (loss) {

                } else {

                    if (costOverride > 0) {

                        rec.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'costestimaterate',
                            line: i,
                            value: costOverride
                        });


                        var itemEstCost = costOverride * qty;

                    } 
                    
                    else {
                        rec.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_estcostopp',
                            line: i,
                            value: costEstimateRate
                        });

                        var itemEstCost = rec.getSublistValue({
                            sublistId: 'item',
                            fieldId: 'costestimate',
                            line: i
                        });

    
                    }
    
                    var amount = rec.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'amount',
                        line: i
                    });


                    

                    gp += (amount - itemEstCost);



                    projTotal += amount



                    if (temp == 1) {

                        var dryFree = rec.getValue('custbody_wh_fee_per_lb_dry');

                        netWtDry += qty * netWtItem;

                        grossWtDry += qty * grossWtItem;

                        whFee += (qty * netWtItem) * dryFree;


                    } else {
                        var frozenFee = rec.getValue('custbody_wh_fee_per_lb');
                        
                        netWtFrozen += qty * netWtItem;

                        grossWtFrozen += qty * grossWtItem;

                        whFee += (qty * netWtItem) * frozenFee;
                    }

                    
                }

                

                rec.setValue({
                    fieldId: 'custbody_warehouse_fee',
                    value: whFee
                });

                rec.setValue({
                    fieldId: 'custbody_total_net_weight',
                    value: netWtDry + netWtFrozen
                });

                rec.setValue({
                    fieldId: 'custbody_total_weight',
                    value: grossWtDry + grossWtFrozen
                });

                rec.setValue({
                    fieldId: 'projectedtotal',
                    value: projTotal
                });


            }


                if (entity) {
                    var rateSearch = search.create({
                        type: 'customer',
                        columns: [
                            search.createColumn({
                                name: 'custentity_va_discount',
                                label: 'VA Disc'
                            })
                        ],
                        filters: [
                            ['internalid', 'anyof', entity]
                        ]
                    });

                    var rateSearchResults = rateSearch.run().getRange({
                        start: 0,
                        end: 1
                    });

                    for (i in rateSearchResults) {
                        var vaRate = rateSearchResults[i].getValue({
                            name: 'custentity_va_discount'
                        });

                        var vaTotal = vaRate * projTotal;

                        rec.setValue({
                            fieldId: 'custbody_va_adjust',
                            value: vaTotal
                        });
                    }

                }

                var actualGP = gp - estFreight - vaTotal - whFee;
          		
          if (actualGP <= 0 || projTotal <= 0) {
            var gpPercentage = 0;
          } else {
                var gpPercentage = ((actualGP / projTotal) * 100).toFixed(2);
          }

                rec.setValue({
                    fieldId: 'custbody_oppestgrossprofit',
                    value: actualGP
                });

                rec.setValue({
                    fieldId: 'custbody_estweightgp',
                    value: (actualGP * probability)/100
                });

                rec.setValue({
                    fieldId: 'custbody_oppgrossprofitpercentage',
                    value: gpPercentage
                });


                
        }

        if (status == 13) {


            if (bidEndDate) {

                
                if (id) {

                    for (j = 0; j < lineCount; j++) {

                        var lineLoss = rec.getSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_linelossreason',
                            line: j
                        });

                        var lineQty = rec.getSublistValue({
                            sublistId: 'item',
                            fieldId: 'quantity',
                            line: j
                        });

                        var lineItem = rec.getSublistValue({
                            sublistId: 'item',
                            fieldId: 'item',
                            line: j
                        });

                        var closedLineSearch = search.create({
                            type: 'salesorder',
                            filters: [
                                ['type', 'anyof', 'SalesOrd'],
                                'AND',
                                ['mainline', 'is', 'F'],
                                'AND',
                                ['opportunity.internalid', 'anyof', id],
                                'AND',
                                ['item.internalid', 'anyof', lineItem]
                            ],
                            columns: [
                                search.createColumn({name: 'item', summary: 'GROUP'}),
                                search.createColumn({name: 'quantity', summary: 'SUM'})
                            ]
                        });

                        var closedLineSearchResults = closedLineSearch.run().getRange({
                            start: 0,
                            end: 1
                        });

                        for (i in closedLineSearchResults) {
                            var qtySold = closedLineSearchResults[i].getValue({
                                name: 'quantity',
                                summary: 'SUM'
                            });

                            lineQty -= qtySold;
                            
                        }

                        if (!lineLoss) {

                            rec.setSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_qtyremaining',
                                line: j,
                                value: lineQty

                            });
                        } else {
                            rec.setSublistValue({
                                sublistId: 'item',
                                fieldId: 'custcol_qtyremaining',
                                line: j,
                                value: null

                            });
                        }


                        var remainingRate = rec.getSublistValue({
                            sublistId: 'item',
                            fieldId: 'rate',
                            line: j
                        });

                        var lineQtyRemaining = rec.getSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_qtyremaining',
                            line: j
                        });

                        var lineRateRemaining = rec.getSublistValue({
                            sublistId: 'item',
                            fieldId: 'costestimaterate',
                            line: j
                        });

                        var remainingLineGP = (lineQtyRemaining * remainingRate) - (lineQtyRemaining * lineRateRemaining);
                        var remainingLineRev = (lineQtyRemaining * remainingRate);

                        rec.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_gpremaining',
                            line: j,
                            value: remainingLineGP
                        });

                        rec.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_pipelineweightedgp',
                            line: j,
                            value: (probability * remainingLineGP)/100
                        });

                        rec.setSublistValue({
                            sublistId: 'item',
                            fieldId: 'custcol_revremaining',
                            line: j,
                            value: remainingLineRev
                        });

                    }



                    var closedTotalSearch = search.create({
                        type: 'opportunity',
                        filters: [
                            ['order.type', 'anyof', 'SalesOrd'],
                            'AND',
                            ['order.mainline', 'is', 'T'],
                            'AND',
                            ['internalid', 'anyof', id]
                        ],
                        columns: [
                            search.createColumn({
                                name: 'amount',
                                join: 'order',
                                summary: 'SUM',
                                sort: search.Sort.ASC
                            })
                        ]
                    });
    
                    var closedTotalResults = closedTotalSearch.run().getRange({
                        start: 0,
                        end: 1
                    });
    
                    for (i in closedTotalResults) {
                        var closedTotal = closedTotalResults[i].getValue({
                            name: 'amount',
                            join: 'order',
                            summary: 'SUM'
                        });

                        var projRemaining = projTotal - closedTotal;

                        rec.setValue({
                            fieldId: 'custbody_bidprojectedremaining',
                            value: projRemaining
                        });

                        rec.setValue({
                            fieldId: 'custbody_bidremaininggp',
                            value: (gpPercentage/100) * projRemaining
                        })


                    }

                }

            }
                        

        } else {

          if (status == 26) {
            rec.setValue({
              fieldId: 'custbody_oppestgrossprofit',
              value: 0
            });
          }
            rec.setValue({
                fieldId: 'custbody_bidprojectedremaining',
                value: null
            });

            rec.setValue({
                fieldId: 'custbody_bidremaininggp',
                value: null
            });

            for (k = 0; k < lineCount; k++) {

                var lineLoss = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_linelossreason',
                    line: k
                });

                var noBidQty = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: k
                });

                var noBidRate = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'costestimaterate',
                    line: k
                });

                var noBidQty = rec.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: k
                });

                var noBidAmount = rec.getSublistValue({
                    sublistId: 'item', 
                    fieldId: 'amount', 
                    line: k
                })

                if (!lineLoss){
                    
                    rec.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_gpremaining',
                        line: k,
                        value: noBidAmount - (noBidRate * noBidQty)
                    });

                    rec.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_revremaining',
                        line: k,
                        value: noBidAmount
                    });

                    rec.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_pipelineweightedgp',
                        line: k,
                        value: (probability * (noBidAmount - (noBidRate * noBidQty))) / 100
                    });

                    rec.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_qtyremaining',
                        line: k,
                        value: noBidQty
                    });

                } else {

                    rec.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_gpremaining',
                        line: k,
                        value: null
                    });

                    rec.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_pipelineweightedgp',
                        line: k,
                        value: null
                    });

                    rec.setSublistValue({
                        sublistId: 'item',
                        fieldId: 'custcol_qtyremaining',
                        line: k,
                        value: null
                    });
                }
            }
        }



    }

    function afterSubmit(context) {

      if (context.type == context.UserEventType.DELETE) {return;}

        var rec = context.newRecord;
        var id = rec.id;
        var status = rec.getValue('entitystatus');
        var today = new Date();
        var bidEndDate = rec.getValue('custbody_bidenddate');
        var expClose = rec.getValue('expectedclosedate');
        var bidRemainingGP = rec.getValue('custbody_bidremaininggp');
        var bidProjRemaining = rec.getValue('custbody_bidprojectedremaining');
        var estGP = rec.getValue('custbody_oppestgrossprofit');
        var weightedGP = rec.getValue('custbody_estweightgp');
        var projTotal = rec.getValue('projectedtotal');
        var probability = rec.getValue('probability');
        var weightedTotal = rec.getValue('weightedtotal');
        var form = rec.getValue('customform');

        if (form == "182") {return;}

        log.debug('triggered', 'triggered aftersubmit')

        var recLoad = record.load({
            type: record.Type.OPPORTUNITY,
            id: id,
            isDynamic: true
        });

        
        if (status == 24 || status == 26) {
            //if opp is Closed Lost - set reporting fields all to null

            recLoad.setValue({fieldId: 'custbody_pipelinegptotal', value: null});
            recLoad.setValue({fieldId: 'custbody_pipelineweightedgp', value: null});
            recLoad.setValue({fieldId: 'custbody_pipelinerevenue', value: null});
            recLoad.setValue({fieldId: 'custbody_pipelineeligible', value: false});
            recLoad.setValue({fieldId: 'custbody_pipelineclosedate', value: null});
            recLoad.setValue({fieldId: 'custbody_pipelineweightedrevenue', value: null});

        } else if (status == 13) {
            //if opp is Closed Won

            if (bidEndDate) {
                
                if (bidEndDate > today) {

                    recLoad.setValue({fieldId: 'custbody_pipelinegptotal', value: bidRemainingGP});
                    recLoad.setValue({fieldId: 'custbody_pipelineweightedgp', value: (bidRemainingGP * probability)/100});
                    recLoad.setValue({fieldId: 'custbody_pipelinerevenue', value: bidProjRemaining});
                    recLoad.setValue({fieldId: 'custbody_pipelineeligible', value: true});
                    recLoad.setValue({fieldId: 'custbody_pipelineclosedate', value: bidEndDate});
                    recLoad.setValue({fieldId: 'custbody_pipelineweightedrevenue', value: (bidProjRemaining * probability)/100});

                } else {
                    //if bid won but the end date has passed, $ and date data gets sent to these fields but the eligibility checkbox is unchecked.

                    recLoad.setValue({fieldId: 'custbody_pipelinegptotal', value: estGP});
                    recLoad.setValue({fieldId: 'custbody_pipelineweightedgp', value: weightedGP});
                    recLoad.setValue({fieldId: 'custbody_pipelinerevenue', value: projTotal});
                    recLoad.setValue({fieldId: 'custbody_pipelineeligible', value: false});
                    recLoad.setValue({fieldId: 'custbody_pipelineclosedate', value: expClose});
                    recLoad.setValue({fieldId: 'custbody_pipelineweightedrevenue', value: weightedTotal});

                }

            } else {

                //if bid end date is empty but it was won, $ and date data gets set but eligibility checkbox is unchecked

                recLoad.setValue({fieldId: 'custbody_pipelinegptotal', value: estGP});
                recLoad.setValue({fieldId: 'custbody_pipelineweightedgp', value: weightedGP});
                recLoad.setValue({fieldId: 'custbody_pipelinerevenue', value: projTotal});
                recLoad.setValue({fieldId: 'custbody_pipelineeligible', value: false});
                recLoad.setValue({fieldId: 'custbody_pipelineclosedate', value: expClose});
                recLoad.setValue({fieldId: 'custbody_pipelineweightedrevenue', value: weightedTotal});
            
            }

        } else {
            //if opp is not closed and does not have a bid end date filled out

            recLoad.setValue({fieldId: 'custbody_pipelinegptotal', value: estGP});
            recLoad.setValue({fieldId: 'custbody_pipelineweightedgp', value: weightedGP});
            recLoad.setValue({fieldId: 'custbody_pipelinerevenue', value: projTotal});
            recLoad.setValue({fieldId: 'custbody_pipelineeligible', value: true});
            recLoad.setValue({fieldId: 'custbody_pipelineclosedate', value: expClose});
            recLoad.setValue({fieldId: 'custbody_pipelineweightedrevenue', value: weightedTotal});

        }

        recLoad.save();

    }

    return {
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    }
});
