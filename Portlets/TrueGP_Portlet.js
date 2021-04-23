/**
 *@NApiVersion 2.x
 *@NScriptType Portlet
 */
define(['N/search',], function(search) {

    function render(params) {
        var portlet = params.portlet;
        portlet.title = 'True GP';

        var vendor = params.entity;


        portlet.addColumn({
            id: 'column1',
            label: '2020',
            type: 'text',
            align: 'RIGHT'
        });

        portlet.addColumn({
            id: 'column2',
            label: '2019',
            type: 'text',
            align: 'RIGHT'
        });

        portlet.addColumn({
            id: 'column3',
            label: '2018',
            type: 'text',
            align: 'RIGHT'
        });

        portlet.addColumn({
            id: 'column4',
            label: '2017',
            type: 'text',
            align: 'RIGHT'
        });

        var trueGPSearch = search.create({
            type: 'transaction',
            filters: [
                ['type','anyof','SalesOrd','RtnAuth'], 
                'AND', 
                ['status','anyof','RtnAuth:A','RtnAuth:B','RtnAuth:D','RtnAuth:E','RtnAuth:F','RtnAuth:G','RtnAuth:H','SalesOrd:G','SalesOrd:H'], 
                'AND', 
                ['mainline','is','F'], 
                'AND', 
                ['item.type','anyof','InvtPart'], 
                'AND', 
                ['name','noneof','137216','1665','39884','16996'], 
                'AND', 
                ['quantity','notequalto','0'], 
                'AND', 
                ['item','noneof','7865','7866','7867','7869','8641'], 
                'AND', 
                ['amount','notequalto','0.00'],
                'AND',
                ['item.othervendor', 'anyof', vendor]
            ],
            columns: [
                search.createColumn({
                   name: 'formulacurrency1',
                   summary: 'SUM',
                   formula: 'nvl((case when to_char({custbody_nfg_eligibility_date}, \'YYYY\') = \'2020\' then {custcol_true_gross_profit} else 0 end), 0)',
                   label: '2020'
                }),
                search.createColumn({
                   name: 'formulacurrency2',
                   summary: 'SUM',
                   formula: 'nvl((case when to_char({custbody_nfg_eligibility_date}, \'YYYY\') = \'2019\' then {custcol_true_gross_profit} else 0 end), 0)',
                   label: '2019'
                }),
                search.createColumn({
                   name: 'formulacurrency3',
                   summary: 'SUM',
                   formula: 'nvl((case when to_char({custbody_nfg_eligibility_date}, \'YYYY\') = \'2018\' then {custcol_true_gross_profit} else 0 end), 0)',
                   label: '2018'
                }),
                search.createColumn({
                   name: 'formulacurrency4',
                   summary: 'SUM',
                   formula: 'nvl((case when to_char({custbody_nfg_eligibility_date}, \'YYYY\') = \'2017\' then {custcol_true_gross_profit} else 0 end), 0)',
                   label: '2017'
                })
             ]
        });

        var results = trueGPSearch.run();

        results.each(function(result) {

            var twentyTwenty = result.getValue({
                name: 'formulacurrency1',
                summary: 'SUM',
                formula: 'nvl((case when to_char({custbody_nfg_eligibility_date}, \'YYYY\') = \'2020\' then {custcol_true_gross_profit} else 0 end), 0)'
            });
            var twentyNineteen = result.getValue({
                name: 'formulacurrency2',
                summary: 'SUM',
                formula: 'nvl((case when to_char({custbody_nfg_eligibility_date}, \'YYYY\') = \'2019\' then {custcol_true_gross_profit} else 0 end), 0)'
            });

            var twentyEighteen = result.getValue({
                name: 'formulacurrency3',
                summary: 'SUM',
                formula: 'nvl((case when to_char({custbody_nfg_eligibility_date}, \'YYYY\') = \'2019\' then {custcol_true_gross_profit} else 0 end), 0)'
            });
            var twentySeventeen = result.getValue({
                name: 'formulacurrency4',
                summary: 'SUM',
                formula: 'nvl((case when to_char({custbody_nfg_eligibility_date}, \'YYYY\') = \'2019\' then {custcol_true_gross_profit} else 0 end), 0)'
            });

            if (twentyTwenty == 0 || twentyTwenty == 0.00 || twentyTwenty == '0.00' || twentyTwenty == null || !twentyTwenty) {
                var display2020 = '$0';
            } else {
                var display2020 = ('$').concat(parseInt(twentyTwenty).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
            }

            if (twentyNineteen == 0 || twentyNineteen == 0.00 || twentyNineteen == '0.00' || twentyNineteen == null || !twentyNineteen) {
                var display2019 = '$0';
            } else {
                var display2019 = ('$').concat(parseInt(twentyNineteen).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
            }

            if (twentyEighteen == 0 || twentyEighteen == 0.00 || twentyEighteen == '0.00' || twentyEighteen == null || !twentyEighteen) {
                var display2018 = '$0';
            } else {
                var display2018 = ('$').concat(parseInt(twentyEighteen).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
            }
            
            if (twentySeventeen == 0 || twentySeventeen == 0.00 || twentySeventeen == '0.00' || twentySeventeen == null || !twentySeventeen) {
                var display2017 = '$0';
            } else {
                var display2017 = ('$').concat(parseInt(twentyNineteen).toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
            }


            portlet.addRow({
                column1: display2020,
                column2: display2019,
                column3: display2018,
                column4: display2017
            });
            return true;


        });


    }

    return {
        render: render
    }
});
