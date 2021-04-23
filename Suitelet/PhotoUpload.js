/**
 *@NApiVersion 2.0
 *@NScriptType Suitelet
 */
define(['N/ui/serverWidget', 'N/search'], function(serverWidget, search) {

    function onRequest(context) {
        if (context.request.method == 'GET') {
            var form = serverWidget.createForm({
                title: 'Photo Upload'
            });

            var items = form.addField({
                id: 'custpage_item',
                type: serverWidget.FieldType.MULTISELECT,
                label: 'Item'
            });

            form.setScript('customscript_addphotosclientscript');

            var button = form.addButton({
                id: 'custpage_button',
                label: 'Submit',
                functionName: 'addPhotos()''
            });



            // var category = form.addField({
            //     id: 'custpage_itemcategory',
            //     type: serverWidget.FieldType.SELECT,
            //     label: 'Item Category'
            // });

            // form.addField({
            //     id: 'custpage_web'
            // })

            var itemSearch = search.create({
                type: 'item',
                filters: [
                    ['isinactive', 'is', 'F'],
                    'AND',
                    ['isonline', 'is', 'T'],
                    'AND',
                    ['type', 'anyof', 'InvtPart'],
                    'AND',
                    ['imageurl', 'isempty', '']
                ],
                columns: [
                    search.createColumn({name: 'itemid'}),
                    search.createColumn({name: 'salesdescription'})
                ]
            }).run().each(function(result) {
                var itemName = result.getValue({name: 'itemid'});
                var itemDescription = result.getValue({name: 'salesdescription'});
                var prettyItem = itemName + ' ' + itemDescription;

                items.addSelectOption({
                    value: prettyItem,
                    text: prettyItem
                })

                return true;
            })

            // field.layoutType = serverWidget.FieldLayoutType.NORMAL;
            // field.updateBreakType({
            //     breakType: serverWidget.FieldBreakType.STARTCOL
            // });
            context.response.writePage(form);
        } else {

        }


    }

    

    return {
        onRequest: onRequest
    }
});
