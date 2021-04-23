/**
 *@NApiVersion 2.1
 *@NScriptType Portlet
 */


define(['N/search'], function(search) {

    function render(params) {

        var portlet = params.portlet;
        portlet.title = 'Back in Stock';

        portlet.addColumn({
            id: 'id1',
            label: 'label1',
            type: 'text',
            align: 'RIGHT'
        });


        
        var poItemSearch = search.create({
            type: 'itemreceipt',
            filters: [
                ['type', 'anyof', 'ItemRcpt'],
                'AND',
                ['trandate' 'onorafter', 'daysago7'],
                'AND',
                ['mainline', 'is', 'F']
            ],
            columns: [
                search.createColumn({
                    name: 'item',
                    label: 'Item'
                }),
                search.createColumn({
                    name: 'internalid',
                    join: 'item',
                    label: 'Internal ID'
                })
            ]
        });

        poItemSearch.run().each(function(result) {
            var item = 
        })



    }

    return {
        render: render
    }
});
