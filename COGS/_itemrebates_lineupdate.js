/**
 *@NApiVersion 2.x
 *@NScriptType ScheduledScript
 *@CreatedBy Jessica Lane 2020
 */
define(['N/search', 'N/record'], 

/**
 * 
 * @param {search} search 
 * @param {record} record
 */

function(search, record) {

    function execute(context) {
        
        var recordSearch = search.create({
            type: 'transaction',
            filters: [
                ['type', 'anyof', 'SalesOrd', 'RtnAuth'], 
                'AND', 
                ['lastmodifieddate', 'on', 'today'],
                'AND',
                ['custrecord_rb_so_sales_order.internalid', 'noneof', '@NONE@'],
                'AND',
                ['formulanumeric: case when {custrecord_rb_so_sales_order.custrecord_rb_so_item} = {item} then 1 else 0 end', 'equalto', '1'],
                'AND',
                ['mainline', 'is', 'F']
            ],
            columns: [
                search.createColumn({
                    name: 'internalid',
                    label: 'Internal ID'
                }),
                search.createColumn({
                    name: 'custrecord_rb_so_quantity',
                    join: 'CUSTRECORD_RB_SO_SALES_ORDER',
                    label: 'Quantity'
                }),
                search.createColumn({
                    name: 'custrecord_rb_so_cmdy_cmrl_diff_less_noi',
                    join: 'CUSTRECORD_RB_SO_SALES_ORDER',
                    label: 'Rate'
                }),
                search.createColumn({
                    name: 'type',
                    label: 'Type'
                }), 
                search.createColumn({
                    name: 'linesequencenumber',
                    label: 'Line Sequence Number'
                }),
                search.createColumn({
                    name: 'custrecord_rb_so_noi_rate',
                    join: 'CUSTRECORD_RB_SO_SALES_ORDER',
                    label: 'NOI Rate'
                })
            ]
        });


        recordSearch.run().each(function(result) {

            
            var diffRate = result.getValue({
                name: 'custrecord_rb_so_cmdy_cmrl_diff_less_noi',
                join: 'CUSTRECORD_RB_SO_SALES_ORDER'
            });

            var noiRate = result.getValue({
                name: 'custrecord_rb_so_noi_rate',
                join: 'CUSTRECORD_RB_SO_SALES_ORDER'
            });

            var quantity = result.getValue({
                name: 'custrecord_rb_so_quantity',
                join: 'CUSTRECORD_RB_SO_SALES_ORDER'
            });

            var type = result.recordType;


            var id = result.getValue({
                name: 'internalid'
            });

            var lineSequenceNumber = result.getValue({
                name: 'line'
            });

            var diffRateLine = (diffRate * quantity).toFixed(2);
            var noiRateLine = (noiRate * quantity).toFixed(2);


            var objRecord = record.load({
                type: type,
                id: id
            });

            var lineCount = objRecord.getLineCount('item');

            for (var i = 0; i < lineCount; i++) {
                objRecord.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cmdycmrldiffrateline',
                    line: lineSequenceNumber - 1,
                    value: diffRateLine
                });

                objRecord.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_noirebateline',
                    line: lineSequenceNumber - 1,
                    value: noiRateLine
                });

            }

            objRecord.save();

            return true;
        });

    }

    return {
        execute: execute
    }
});
