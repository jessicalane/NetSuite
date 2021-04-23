/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 *@CreatedBy Jessica Lane 2020
 */
define(['N/record', 'N/search'], 

/**
 * 
 * @param {record} record 
 * @param {search} search 
 */

function(record, search) {


    function afterSubmit(context) {


        var salesOrder = context.newRecord;
        var salesOrderId = salesOrder.id;

        var lines = salesOrder.getLineCount('item');

        for (var i = 0; i < lines; i++) {

            var item = salesOrder.getSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                line: i
            });

            var itemLine = salesOrder.getSublistValue({
                sublistId: 'item',
                fieldId: 'line',
                line: i
            });

            var columns = [
                search.createColumn({
                    name: 'custrecord_rb_so_cmdy_cmrl_diff_less_noi',
                    summary: 'MAX'
                }),
                search.createColumn({
                    name: 'custrecord_rb_so_quantity',
                    summary: 'MAX'
                })
            ];

            var filters = [
                ['formulanumeric: {custrecord_rb_so_sales_order.internalid}', 'equalto', salesOrderId],
                'AND',
                ['custrecord_rb_so_item.internalid', 'anyof', item]
            ];
    
            var diffSearch = search.create({
                type: 'customrecord_rebates_so_store',
                columns: columns,
                filters: filters
            });

            var results = diffSearch.run().getRange({
                start: 0,
                end: 999
            });

            for (var x in results) {
                var diffRate = results[x].getValue({
                    name: 'custrecord_rb_so_cmdy_cmrl_diff_less_noi',
                    summary: 'MAX'
                });

                var quantity = results[x].getValue({
                    name: 'custrecord_rb_so_quantity',
                    summary: 'MAX'
                });

                var difftotal = (diffRate * quantity).toFixed(2);

                salesOrder.setSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cmdydmrl_diffline',
                    line: i,
                    value: difftotal
                });

                log.debug('custcol', salesOrder.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'custcol_cmdydmrl_diffline',
                    line: i,
                    value: difftotal
                }));

            }
        }

        log.debug('record.submitrecord', salesOrder.submitRecord);

    }


    return {
        afterSubmit: afterSubmit
    }
});
