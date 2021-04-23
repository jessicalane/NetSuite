/**
 *@NApiVersion 2.x
 *@NScriptType WorkflowActionScript
 */
define(['N/currentRecord'], function(currentRecord) {

    function onAction(scriptContext) {
        
        var rec = currentRecord.get();
        var id = rec.id;
        var customer = rec.getValue('entity');
        var tranId = rec.getText('tranid');
        var file = render.transaction({
            entityid: id,
            printMode: render.PrintMode.HTML,
            inCustLocale: true
        });


        //TODO Set these variables
        var emailRecipients = customer.getValue('custentity_inv_email_recip_1');
        var emailSubject = 'NFG Invoice ' + tranId;
        var emailBody = '';
        var pdfTitle = tranId;
        var extension = '.pdf';

        var fileName = pdfTitle.concat(extension);
        
        file.setName(fileName);

        email.send({
            author: 'rwalker@nationalfoodgroup.com',
            recipients: emailRecipients,
            subject: emailSubject,
            body: emailBody,
            attachments: file
        });

    }

    return {
        onAction: onAction
    }
});
