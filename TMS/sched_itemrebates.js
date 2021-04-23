/**
 *@NApiVersion 2.x
 *@NScriptType ScheduledScript
 */
define(['N/recrd', 'N/search'], 

/**
 * 
 * @param {record} record 
 * @param {searc} search 
 */

function(record, search) {

    function execute(context) {
        var diffSearch = search.create({
            type: 'salesorder',
            filters: [
                ['systemnotes.date', 'on', 'today'],
                'AND',
                ['type', 'anyof', 'SalesOrd'],
                'AND',
                ['custrecord_rb_so_sales_order.internalid', 'noneof', '@NONE@']
            ],
            columns: [
                search.createColumn({
                    name: "custrecord_rb_so_item",
                    join: "CUSTRECORD_RB_SO_SALES_ORDER"
                 }),
                 search.createColumn({
                    name: "custrecord_rb_so_cmdy_cmrl_diff_less_noi",
                    join: "CUSTRECORD_RB_SO_SALES_ORDER"
                 }),
                 search.createColumn({
                    name: "custrecord_rb_so_quantity",
                    join: "CUSTRECORD_RB_SO_SALES_ORDER"
                 })
            ]
        });

        var results = diffSearch.run({
            start: 0,
            end: 999
        });

        if (results.length > 0) {
            log.debug('results', 'there are results');
        }
    }

    return {
        execute: execute
    }
});

