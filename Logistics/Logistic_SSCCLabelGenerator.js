/**
 *@NApiVersion 2.0
 *@NScriptType ScheduledScript
 */
define(['N/render', 'N/runtime'], function(render, runtime) {

    function execute(context) {
        
        //TODO: Outside of this script, create the PDF/HTML template for SO printing.
        //TODO: Setup the email specifications.
        //TODO: Create consolidated PDF file of all the shipping labels.

        const currentScript = runtime.getCurrentScript();
        const soIDs = []
        
        let xmlString = "<?xml version=\"1.0\"?>\n<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n";
        
        xmlString += "<pdfset>"

        let orders = 


    }

    return {
        execute: execute
    }
});
