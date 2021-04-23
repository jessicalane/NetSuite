/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 *@Author Jack Arens | National Food Group
 */
define(['N/record','N/search','N/log'],
    function (record,search,log){
        function updateActOn(context){
            // if(context.type === 'delete'){return;}
            try{
                /*Start Build Sales Rep and Price Level Objects*/
                var salesRepList = {
                    rep1  : {name:'Anthony George',id:14},
                    rep2  : {name:'Dan Moss',id:163711},
                    rep3  : {name:'Erin Kopp',id:139319},
                    rep4  : {name:'Jan Mouch',id:148620},
                    rep5  : {name:'John Murphy',id:31},
                    rep6  : {name:'Meghan Huballah',id:33},
                    rep7  : {name:'Diane Decker',id:142424},
                    rep8  : {name:'Michael Kupfer Jr.',id:36},
                    rep9  : {name:'Michele McGowan',id:183813},
                    rep10 : {name:'Nick Goetz',id:30},
                    rep11 : {name:'Shayna Pham',id:29},
                    rep12 : {name:'Tara Sharpe',id:32},
                    rep13 : {name:'Dave Roman',id:62},
                    rep14 : {name:'Jennifer Klein',id:50},
                    rep15 : {name:'Jon Kabel',id:18},
                    rep16 : {name:'Krista Lipari',id:51},
                    rep17 : {name:'AJ Fleet',id:162353},
                    rep18 : {name:'Troy Tivy',id:19},
                    rep19 : {name:'Tracey Smith',id:229933},
                    rep20 : {name:'Matt Kazmer',id:163710},
                    rep21 : {name:'Maureen Bunney',id:155120},
                    rep22 : {name:'Jessica Underhill',id:160056},
                    rep23 : {name:'Michael Schacht',id:163430}
                };
                var priceLevelList = {
                    pric1:  {name:'**Corrections West Base Price (-)',id:'3'},
                    pric2:  {name:'*East +12%',id:'11'},
                    pric3:  {name:'**Corrections East Base Price',id:'55'},
                    pric4:  {name:'*West +10% (+)',id:'62'},
                    pric5:  {name:'K-12 Pricing - NGoetz - Base',id:'70'},
                    pric6:  {name:'K-12 Pricing - JMurphy - OK Distribution',id:'71'},
                    pric7:  {name:'K-12 Pricing - JMurphy - IN Distribution',id:'72'},
                    pric8:  {name:'K-12 Pricing - JMurphy - Direct',id:'73'},
                    pric9:  {name:'K-12 Pricing - MHuballah',id:'74'},
                    pric10: {name:'K-12 Pricing - MKupfer',id:'75'},
                    pric11: {name:'K-12 Pricing - DRoman',id:'78'},
                    pric12: {name:'K-12 Pricing - TSharpe',id:'79'},
                    pric13: {name:'K-12 Pricing - EGeraghty - NM',id:'82'},
                    pric14: {name:'K-12 Pricing - EGeraghty - Base',id:'83'},
                    pric15: {name:'K-12 Pricing - SPham - KY_VA',id:'84'},
                    pric16: {name:'K-12 Pricing - Jmouch - Base',id:'85'},
                    pric17: {name:'K-12 Pricing - SPham - OR_ID',id:'86'},
                    pric18: {name:'K-12 Pricing - Jmouch - UT',id:'87'},
                    pric19: {name:'K-12 Pricing - DMoss - NY',id:'93'},
                    pric20: {name:'K-12 Pricing - DMoss',id:'94'},
                    pric21: {name:'K-12 Pricing - NGoetz - MO',id:'95'},
                    pric22: {name:'K-12 Pricing - MMcGowan - Base',id:'97'},
                    pric23: {name:'K-12 Pricing - MMcGowan - IL',id:'98'},
                    pric24: {name:'K-12 Pricing - DDecker - East',id:'100'},
                    pric25: {name:'K-12 Pricing - DDecker - West',id:'101'},
                    pric26: {name:'K-12 Pricing - MHuballah - FL',id:'102'},
                    pric27: {name:'K-12 Pricing - JMurphy - WI',id:'104'},
                    pric28: {name:'K-12 Pricing - DDecker - MD DC',id:'105'},
                    pric29: {name:'K-12 Pricing - MMcGowan - FL',id:'106'},
                    pric30: {name:'K-12 Pricing - TSmith - East',id:'107'},
                    pric31: {name:'K-12 Pricing - TSmith – CT',id:'108'},
                    pric32: {name:'K-12 Pricing - DDecker - AK',id:'110'},
                    pric33: {name:'K-12 Pricing - Central',id:'112'},
                    pric34: {name:'K-12 Pricing - Central (Transfer Order)',id:'113'},
                    pric35: {name:'K-12 Pricing - East',id:'111'},
                    pric36: {name:'K-12 Pricing - West',id:'114'}
                };
                /*End Build Sales Rep and Price Level Objects*/
                /*Start Load Contact and Customer Records*/
                //var getContactRecord = context.newRecord;
                //var getCustomerRecord = getContactRecord.getValue('company');
                var contactRecord = record.load({
                    type:  getContactRecord.type,
                    id:    getContactRecord.id});
                if(getCustomerRecord){
                    var customerRecord = record.load({
                        type:  'customer',
                        id:    getCustomerRecord});
                    /*End Load Contact and Customer Records*/
                    /*Start Load Contact and Customer Details*/
                    // var urlPath = '';
                    // var orderguidelink = '';
                    // var dynamicSampleUrl = '';
                    // var relationshipSpecialistUrlPath = '';
                    // var salesRepFirstName,salesRepLastName,salesRepEmail,salesRepPhone,salesRepFax,relationshipSpecialistlastName,relationshipSpecialistfirstName,relationshipSpecialistPhone,relationshipSpecialistFax,relationshipSpecialistEmail;
                    var buyingGroup = customerRecord.getValue('custentity_buying_group_detail');
                    //var priceLevel = customerRecord.getValue('pricelevel');
                    //var parent = customerRecord.getText('parent');
                    var commodityDistributor = customerRecord.getText('custentity_commodity_distributor');
                    var commercialDistributor = customerRecord.getText('custentity_commercial_distributor');
                    //var marketingPriceLevel = customerRecord.getValue('custentity_nfg_marketing_price_level');
                    var salesRep = customerRecord.getValue('salesrep');
                    var relationshipSpecialist = customerRecord.getValue('custentity_relationship_specialist');
                    //var custentity_division = customerRecord.getText('custentity_division');
                    //var custentity_pricelevel_custom = customerRecord.getValue('custentity_pricelevel_custom');
                    //var custentity_marketingpricelevel = customerRecord.getValue('custentity_marketingpricelevel');
                    if(salesRep){
                        var salesRepLookUp = search.create({
                            type: "employee",
                            filters: [
                                ["internalidnumber","equalto",salesRep]
                            ],
                            columns: [
                                "firstname",
                                "lastname",
                                "phone",
                                "fax",
                                "email",
                                search.createColumn({
                                    name: "formulatext",
                                    formula: "{image}"
                                })
                            ]
                        });
                        salesRepLookUp.run().each(function(result){
                            urlPath       = result.getValue('formulatext') ? 'https://3450792.app.netsuite.com' + result.getValue('formulatext') : 'https://3450792.app.netsuite.com/core/media/media.nl?id=1384600&c=3450792&h=9900498dd8f66bbb9564';
                            //salesRepPhone     = result.getValue('phone');
                            //salesRepFax       = result.getValue('fax');
                            salesRepEmail     = result.getValue('email');
                            salesRepFirstName = result.getValue('firstname');
                            salesRepLastName  = result.getValue('lastname');
                            return true;
                        });
                        if(relationshipSpecialist){
                            var relationshipSpecialistLookUp = search.create({
                                type: "employee",
                                filters: [
                                    ["internalidnumber","equalto",relationshipSpecialist]
                                ],
                                columns: [
                                    "firstname",
                                    "lastname",
                                    "email",
                                    "phone",
                                    "fax",
                                    search.createColumn({
                                        name: "formulatext",
                                        formula: "{image}"
                                    })
                                ]
                            });
                            relationshipSpecialistLookUp.run().each(function(result){
                                relationshipSpecialistUrlPath   = result.getValue('formulatext') ? 'https://3450792.app.netsuite.com' + result.getValue('formulatext') : 'https://3450792.app.netsuite.com/core/media/media.nl?id=1384600&c=3450792&h=9900498dd8f66bbb9564';
                                relationshipSpecialistlastName  = result.getValue('lastname');
                                relationshipSpecialistfirstName = result.getValue('firstname');
                                relationshipSpecialistPhone     = result.getValue('phone');
                                relationshipSpecialistFax       = result.getValue('fax');
                                relationshipSpecialistEmail     = result.getValue('email');
                                return true;
                            });
                        }
                        /*End Load Contact and Customer Details*/
                        /*Start Match Sales Rep and Price Level to Order Guides*/
                        switch(salesRep+'|'+priceLevel){
                            case(salesRepList.rep2.id+'|'+priceLevelList.pric33.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385253&c=3450792&h=6a69ed4c3afab96cc9ff&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-0068/t/page/fm/0';
                                break;
                            case(salesRepList.rep2.id+'|'+priceLevelList.pric34.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385256&c=3450792&h=83d1a5125777ef4559a0&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-0068/t/page/fm/0';
                                break;
                            case(salesRepList.rep2.id+'|'+priceLevelList.pric35.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385255&c=3450792&h=ee3cc5707f36b694c0a2&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-0068/t/page/fm/0';
                                break;
                            case(salesRepList.rep2.id+'|'+priceLevelList.pric36.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385257&c=3450792&h=a21abf0ac1c842d0ea82&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-0068/t/page/fm/0';
                                break;
                            case(salesRepList.rep13.id+'|'+priceLevelList.pric35.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385259&c=3450792&h=89cda6ffffbd54851c00&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-005a/t/page/fm/0';
                                break;
                            case(salesRepList.rep13.id+'|'+priceLevelList.pric36.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385260&c=3450792&h=8eb178ba80bff050a5b5&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-005a/t/page/fm/0';
                                break;
                            case(salesRepList.rep7.id+'|'+priceLevelList.pric35.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385250&c=3450792&h=b67c6f5649996cfc8ace&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-0069/t/page/fm/0';
                                break;
                            case(salesRepList.rep7.id+'|'+priceLevelList.pric36.id):
                                var customerState = customerRecord.getText('shipstate');
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-0069/t/page/fm/0';
                                switch (customerState) {
                                    case 'AK':
                                        orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385251&c=3450792&h=6b6b9728a38ec741c8ca&_xt=.bin';
                                        break;
                                    default:
                                        orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385252&c=3450792&h=8441f14f51f8a390e96a&_xt=.bin';
                                }
                                break;
                            case(salesRepList.rep4.id+'|'+priceLevelList.pric36.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385361&c=3450792&h=bdb9f19fc38c756b9ef3&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-006a/t/page/fm/0';
                                break;
                            case(salesRepList.rep5.id+'|'+priceLevelList.pric33.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385463&c=3450792&h=a466bfbcc5008f37db38&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-006b/t/page/fm/0';
                                break;
                            case(salesRepList.rep20.id+'|'+priceLevelList.pric33.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385464&c=3450792&h=7f444f15be16294531b9&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-0095/t/page/fm/0';
                                break;
                            case(salesRepList.rep20.id+'|'+priceLevelList.pric35.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385465&c=3450792&h=a56b1616c5c67b30d64f&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-0095/t/page/fm/0';
                                break;
                            case(salesRepList.rep20.id+'|'+priceLevelList.pric36.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385466&c=3450792&h=feb0470d64ca967fb3b0&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-0095/t/page/fm/0';
                                break;
                            case(salesRepList.rep9.id+'|'+priceLevelList.pric33.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385470&c=3450792&h=e79289eaea4fa1a53bab&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-006c/t/page/fm/0';
                                break;
                            case(salesRepList.rep9.id+'|'+priceLevelList.pric35.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385471&c=3450792&h=2ead277935f81655d0fc&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-006c/t/page/fm/0';
                                break;
                            case(salesRepList.rep8.id+'|'+priceLevelList.pric33.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385469&c=3450792&h=2a5bb50c8c4832092d6d&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-006d/t/page/fm/0';
                                break;
                            case(salesRepList.rep8.id+'|'+priceLevelList.pric35.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385468&c=3450792&h=ee680ed4ae33598d55e2&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-006d/t/page/fm/0';
                                break;
                            case(salesRepList.rep10.id+'|'+priceLevelList.pric33.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385473&c=3450792&h=37599ddaee649fcbf763&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-005b/t/page/fm/0';
                                break;
                            case(salesRepList.rep10.id+'|'+priceLevelList.pric34.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385474&c=3450792&h=ef8e45716180c23023c0&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-005b/t/page/fm/0';
                                break;
                            case(salesRepList.rep10.id+'|'+priceLevelList.pric36.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385475&c=3450792&h=6e034bdbb29731336c07&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-005b/t/page/fm/0';
                                break;
                            case(salesRepList.rep11.id+'|'+priceLevelList.pric33.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385477&c=3450792&h=d4f3b20038fbd81d8b48&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-006e/t/page/fm/0';
                                break;
                            case(salesRepList.rep11.id+'|'+priceLevelList.pric35.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385478&c=3450792&h=80cd19f7d1d9eec64da1&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-006e/t/page/fm/0';
                                break;
                            case(salesRepList.rep11.id+'|'+priceLevelList.pric36.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385580&c=3450792&h=8c8ebb6bef8387ad47e6&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-006e/t/page/fm/0';
                                break;
                            case(salesRepList.rep19.id+'|'+priceLevelList.pric34.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385583&c=3450792&h=3187ddbca25f7059b118&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-006f/t/page/fm/0';
                                break;
                            case(salesRepList.rep19.id+'|'+priceLevelList.pric35.id):
                                orderguidelink = 'https://3450792.app.netsuite.com/core/media/media.nl?id=17385582&c=3450792&h=cb544468c07db64c7b1d&_xt=.bin';
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-006f/t/page/fm/0';
                                break;
                            default: orderguidelink = '';
                        }
                        /*End Match Sales Rep and Price Level to Order Guides*/
                        //Just Dynamic Catch
                        switch(salesRep){
                            case(salesRepList.rep21.id):
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-00b8/t/page/fm/0';
                                break;
                            case(salesRepList.rep22.id):
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-00b6/t/page/fm/0';
                                break;
                            case(salesRepList.rep23.id):
                                dynamicSampleUrl = 'https://info.nationalfoodgroup.com/acton/fs/blocks/showLandingPage/a/20649/p/p-00b7/t/page/fm/0';
                                break;
                            default:
                        }
                    }//End if Sales Rep
                    /*Start Set Contact Field Values*/
                    relationshipSpecialistEmail      = relationshipSpecialistEmail ? relationshipSpecialistEmail : salesRepEmail;
                    relationshipSpecialistfirstName  = relationshipSpecialistfirstName ? relationshipSpecialistfirstName : salesRepFirstName;
                    relationshipSpecialistlastName   = relationshipSpecialistlastName ? relationshipSpecialistlastName : salesRepLastName;
                    //contactRecord.setValue({fieldId: 'custentity_division_contact',value: custentity_division});
                    // contactRecord.setValue({fieldId: 'custentity_pricelevel_custom',value: custentity_pricelevel_custom});
                    contactRecord.setValue({fieldId: 'custentity_image_url_pathc',value: urlPath});
                    //contactRecord.setValue({fieldId: 'custentity_sales_rep_phonec',value: salesRepPhone});
                    //contactRecord.setValue({fieldId: 'custentity_sales_rep_faxc',value: salesRepFax});
                    contactRecord.setValue({fieldId: 'custentity_commercial_distributor_c',value: commercialDistributor});
                    contactRecord.setValue({fieldId: 'custentity_commodity_distributor_c',value: commodityDistributor});
                    contactRecord.setValue({fieldId: 'custentity_orderguidelinkacton',value: orderguidelink});
                    contactRecord.setValue({fieldId: 'custentity_dynamic_sample_page',value: dynamicSampleUrl});
                    //contactRecord.setValue({fieldId: 'custentity_marketingpricelevel',value: custentity_marketingpricelevel });
                    //contactRecord.setValue({fieldId: 'custentity_parentcustomer_text_field',value: parent});
                    contactRecord.setValue({fieldId: 'custentityrelationship_specialist_email',value: relationshipSpecialistEmail});
                    contactRecord.setValue({fieldId: 'custentityrelationship_specialist_name',value: relationshipSpecialistfirstName + ' ' + relationshipSpecialistlastName});
                    if(relationshipSpecialist){
                        contactRecord.setValue({fieldId: 'custentityrelationship_specialist_url',value: relationshipSpecialistUrlPath});
                        contactRecord.setValue({fieldId: 'custentityrelationship_specialist_phone',value: relationshipSpecialistPhone});
                        contactRecord.setValue({fieldId: 'custentityrelationship_specialist_fax',value: relationshipSpecialistFax});
                    }
                    /*End Set Contact Field Values*/
                    /*Start Save Contact Record*/
                    var recordId = contactRecord.save({
                        enableSourcing : false,
                        ignoreMandatoryFields : false});
                    /*End Save Contact Record*/
                }// End if getCustomerRecord
            // }catch(e){
            //     log.debug({title:'Update Failure: ', details:e});
            // }
        }//End Function
        return {
            afterSubmit: updateActOn
        };
    });