./**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/search', 'N/ui/message', 'N/currentRecord'], function(search, message, currentRecord) {

    function pageInit(context) {

        log.debug('started', 'started');

        var rec = context.currentRecord;
        var customer = rec.getValue('entity');
        
        search.create({
            type: 'transaction',
            filters: [
                ['type', 'anyof', 'CustCred', 'CustInvc'],
                'AND',
                ['mainline', 'is', 'T'],
                'AND',
                ['amountremaining', 'notequalto', '0.00'],
                'AND',
                ['custermain.internalid', 'anyof', customer]
            ],
            columns: [
                search.createColumn({name: 'tranid', label: 'Invoice #'}),
                search.createColumn({name: 'amount', label: 'Invoice Amount'}),
                search.createColumn({name: 'amountremaining', label: 'Amount Due'}),
                search.createColumn({name: 'daysoverdue', label: 'Days Overdue'})
            ]
        }).run().each(function(result) {
            var invoice = result.getValue({name: 'tranid'});
            log.debug('invoice', invoice);

            
            return true;
        })



    }

    function fieldChanged(context) {

    }

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged
    }
});
