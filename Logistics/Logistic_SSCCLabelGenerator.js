/**
 *@NApiVersion 2.1
 *@NScriptType ScheduledScript
 */
define(['N/render', 'N/record'], function(render, record) {

    function execute(context) {
        
        //TODO: Outside of this script, create the PDF/HTML template for SO printing.
        //TODO: Setup the email specifications.
        //TODO: Create consolidated PDF file of all the shipping labels.

        // const currentScript = runtime.getCurrentScript();
        let renderer = render.create();
        const soIDs = [4140569, 4140469, 4140369];
        
        let xmlString = '<?xml version="1.0"?><!DOCTYPE pdf PUBLIC "-//big.faceless.org//report" "report-1.1.dtd">';
        
        xmlString += '<pdfset>';

        for (i = 0; i < soIDs.length; i++) {
            let salesOrder = record.load({
                type: record.Type.SALES_ORDER,
                id: soIDs[i]
            });

            renderer.addRecord({
                templateName: 'record' + i,
                record: salesOrder
            });

            //TODO fix this xmlString to prevent errors. Use multiple xmlString+= for easy fixing later.

            xmlString += '<pdf><head>';
            xmlString += '<style> + * {font-family: NotoSans, sans-serif;}'
                            



            //xmlString += '<pdf>\n<head>\n<style type=\"text/css\">\n* {\nfont-family: NotoSans, sans-serif;\ntext-align: left;\nfont-size: 10pt;\n}\ntable, td {\nborder: 1px solid black;\n}\ntable {\npage-break-inside:avoid;\nalign: right;\ntable-layout: fixed;\nwidth: 4in;\nheight: 6in;\nborder-collapse: collapse;\n}\ntr {\nwidth: 100%;\n}\ntd {\npadding: 4px 6px;\n}\ntd p {\n}\n.po {\nfont-weight: bold;\nfont-size: 15pt;\n}\n</style>\n</head>\n<body padding=\"0.5in 0.5in 0.5in 0.5in\" size=\"Letter\">\n<#list record.custbody_gs1128numbers?split(\"-\") as code>\n<table>\n<tr>\n<td>\n<p>From:</p>\n<p>NATIONAL FOOD GROUP<br />${record.custbody_copy_loc_address}</p>\n</td>\n<td>\n<p>To:</p>\n<p>${record.shipaddress}</p>\n</td>\n</tr>\n<tr>\n<td>\n<p>Ship to Postal Code:</p>\n</td>\n<td></td>\n</tr>\n<tr>\n<td colspan=\"2\">\n<p class=\"po\">PO#: ${record.otherrefnum}</p>\n</td>\n</tr>\n<tr>\n<td colspan=\"2\"></td>\n</tr>\n<tr>\n<td colspan=\"2\">\n<p>GS1 UCC-128 (SSCC)</p>\n<p align=\"center\">${code}</p>\n<barcode codetype=\"code128\" value=\"${code}\" />\n</td>\n</tr>\n</table>\n</#list>\n</body>\n</pdf>'
            //xmlString += '<pdf>\n<head></head><body><p>Jessica</p></body></pdf>'
        }

        xmlString += '</pdfset>';

        log.debug('xmlString', xmlString)

        let pdfFile = render.xmlToPdf({
            xmlString: xmlString
        });

        pdfFile.folder = 25229211;
        pdfFile.name = 'pdf-test';
        pdfFile.save();


        // pdfFile.setName('test.pdf');
        // pdfFile.setFolder(25229210);
        // pdfFile.save();

    }

    return {
        execute: execute
    }
});
