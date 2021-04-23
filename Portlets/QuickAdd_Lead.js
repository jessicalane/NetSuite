/**
 *@NApiVersion 2.0
 *@NScriptType Portlet
 *@CreatedBy Jessica Lane, 2020
 */
define(['N/ui/serverWidget', 'N/search'], function(serverWidget, search) {

    function render(params) {
        var portlet = params.portlet;
        portlet.title = 'Quick Add: New Lead';
        
        //Add Fields
        portlet.addField({
            id: 'custpage_name',
            type: serverWidget.FieldType.TEXT,
            label: 'Company Name'
        });

        var category = portlet.addField({
            id: 'custpage_category',
            type: serverWidget.FieldType.SELECT,
            label: 'Category'
        });

            //adds blank option at top
            category.addSelectOption({
                value: 0,
                text: ''
            });

        var segment = portlet.addField({
            id: 'custpage_segment',
            type: serverWidget.FieldType.SELECT,
            label: 'Segment',
            source: 'custentity_division'
        });

            //adds blank option at top
            segment.addSelectOption({
                value: 0,
                text: ''
            });

        portlet.addField({
            id: 'custpage_email',
            type: serverWidget.FieldType.EMAIL,
            label: 'Email'
        });
        portlet.addField({
            id: 'custpage_phone',
            type: serverWidget.FieldType.PHONE,
            label: 'Phone'
        });
        //needs search
        var priceLevel = portlet.addField({
            id: 'custpage_pricelevel',
            type: serverWidget.FieldType.SELECT,
            label: 'Price Level'
        });

            //add blank option at top
            priceLevel.addSelectOption({
                value: 0,
                text: ''
            });

        var salesTeam = portlet.addField({
            id: 'custpage_salesteam',
            type: serverWidget.FieldType.SELECT,
            label: 'Sales Team'
        });

            //adds blank option at top
            salesTeam.addSelectOption({
                value: 0,
                text: ''
            })

        portlet.setSubmitButton({
            url: 'https://3450792.app.netsuite.com/app/common/entity/custjob.nl?stage=lead&whence=',
            label: 'Submit',
            target: '_top'
        })



        //Finding values for select/multi-select fields
        var salesTeamValues = search.create({
            type: 'entitygroup',
            filters: [
                ['grouptype', 'anyof', 'Employee'],
                'AND',
                ['isinactive', 'is', 'F'],
                'AND',
                ['isdynamic', 'is', 'F']
            ],
            columns: [
                search.createColumn({name: 'groupname', label: 'Name'})
            ]
        }).run().each(function(result) {
            var team = result.getValue({name: 'groupname'});
            salesTeam.addSelectOption({
                 value: team,
                 text: team
             });
            return true;
        });

        var categoryValues = search.create({
            type: 'customer',
            filters: [
                ['category', 'noneof', '@NONE@']
            ],
            columns: [
                search.createColumn({
                    name: 'category',
                    summary: 'GROUP'
                })
            ]
        }).run().each(function(result) {
            var custCategory = result.getText({name: 'category', summary: 'GROUP'});
            category.addSelectOption({
                value: custCategory,
                text: custCategory
            });
            return true;
        });

        var segmentValues = search.create({
            type: 'customer',
            filters: [
                ['custentity_division', 'noneof', '@NONE@']
            ],
            columns: [
                search.createColumn({
                    name: 'custentity_division',
                    summary: 'GROUP'
                })
            ]
        }).run().each(function(result) {
            var custSegment = result.getText({name: 'custentity_division', summary: 'GROUP'});
            segment.addSelectOption({
                value: custSegment,
                text: custSegment
            })
            return true;
        });

        // var priceLevelValues = search.create({
        //     type: ,
        //     filters: ,
        //     columns: 
        // }).run().each(function(result) {
            
        //     return true;
        // });



    }

    return {
        render: render
    }
});
