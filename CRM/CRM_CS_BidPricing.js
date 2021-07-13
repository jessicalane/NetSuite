/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
define(['N/currentRecord', 'N/search'], function(currentRecord, search) {

    function pageInit(context) {

        var rec = context.currentRecord;
        var opportunity = rec.getValue('custrecord_bid_opportunity');
        var uniqueId = rec.getValue('custrecord_unique_id');
        var lineId = uniqueId.split('-')[1];
        var vendor = rec.getValue('custrecord_bidvendor');

        //If the record is new, then it will pull the values and set them on the Bid Pricing record.
        if (!vendor) {

            search.create({
                type: 'transaction',
                filters: [
                    ['type', 'anyof', 'Opprtnty'],
                    'AND',
                    ['internalid', 'anyof', opportunity],
                    'AND',
                    ['mainline', 'is', 'F'],
                    'AND',
                    ['lineuniquekey', 'equalto', lineId]
                ],
                columns: [
                    'custcol_productsize', //Product Size
                    'custcol_pack_size', //Pack Size
                    'custcol_targetpricepoint', //Target Price Point
                    'custcol_productgrade', //Grade
                    'custcol_countryoforigin', //Country of Origin
                    'custcol_datingguidelinesrestrictions', //Dating Guidelines/Restrictions
                    'custcol_shelfliferequirements', //Shelf Life Requirements
                    'custcol_nutritionalrequirements', //Nutritional Requirements
                    'custcol_religiousrequirements', //Religious Requirements
                    'custcol_labelingrequirements', //Labeling Requirements
                    'custcol_vendoroptions' //Vendor Options
                ]
            }).run().each(function(result) {

                //Get each value
                var prodSize = result.getValue('custcol_productsize');
                var packSize = result.getValue('custcol_pack_size');
                var targetPrice = result.getValue('custcol_targetpricepoint');
                var grade = result.getValue('custcol_productgrade');
                var countryOrig = result.getValue('custcol_countryoforigin');
                var volume = result.getValue('custcol_volume');
                var datingGuide = result.getValue('custcol_datingguidelinesrestrictions');
                var shelfLife = result.getValue('custcol_shelfliferequirements');
                var nutritional = result.getValue('custcol_nutritionalrequirements');
                var religious = result.getValue('custcol_religiousrequirements');
                var labels = result.getValue('custcol_labelingrequirements');
                var vendorOptions = result.getValue('custcol_vendoroptions');
                
                //Set each value
                rec.setValue('custrecord_productsize', prodSize);
                rec.setValue('custrecord_pack', packSize);
                rec.setValue('custrecord_targetpricepoint', targetPrice);
                rec.setValue('custrecord_grade', grade);
                rec.setValue('custrecord_countryoforigin', countryOrig);
                rec.setValue('custrecord_volume', volume);
                rec.setValue('custrecord_datingguidelinesrestrictions', datingGuide);
                rec.setValue('custrecord_shelfliferequirements', shelfLife);
                rec.setValue('custrecord_nutritionalrequirements', nutritional);
                rec.setValue('custrecord_religiousrequirements', religious);
                rec.setValue('labelrequirements', labels);
                rec.setValue('custrecord_vendoroptions', vendorOptions);
            });

        }
        
          
        

    }

    // function saveRecord(context) {
        
    // }

    // function validateField(context) {
        
    // }

    // function fieldChanged(context) {
        
    // }

    // function postSourcing(context) {
        
    //     var rec = context.currentRecord;

    //     if (context.fieldId == 'custrecord_bid_opportunity') {
    //         log.debug('postSourcing', 'triggered');
    //     }

    // }

    // function lineInit(context) {
        
    // }

    // function validateDelete(context) {
        
    // }

    // function validateInsert(context) {
        
    // }

    // function validateLine(context) {
        
    // }

    // function sublistChanged(context) {
        
    // }

    return {
        pageInit: pageInit
        // saveRecord: saveRecord,
        // validateField: validateField,
        // fieldChanged: fieldChanged,
        //postSourcing: postSourcing,
        // lineInit: lineInit,
        // validateDelete: validateDelete,
        // validateInsert: validateInsert,
        // validateLine: validateLine,
        // sublistChanged: sublistChanged
    }
});
