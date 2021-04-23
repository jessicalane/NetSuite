/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/currentRecord', 'N/ui/dialog'], function(currentRecord, dialog) {

    function saveRecord(context) {
        
        var rec = currentRecord.get();
        var sendWP = rec.getValue('custentity_send_welcome_packet');
        var buyer = rec.getValue('custentitynfg_buyer_list');

        if (sendWP && !buyer) {
            dialog.alert({
                title: 'No Buyer Selected',
                message: 'A Buyer is required on this record to send a Vendor Welcome Packet. Please select a Buyer or un-check the Send Vendor Welcome Packet checkbox.'
            });
            return false;
        } else {
            return true;
        }

    }


    return {
        saveRecord: saveRecord
    }
});
