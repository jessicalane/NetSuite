/**
 *@NApiVersion 2.x
 *@NScriptType Portlet
 */
define([], function() {

    function render(params) {
        params.portlet.title = 'COGS/Rev Calculation Reference';
        var content = '<img src="https://3450792.app.netsuite.com/core/media/media.nl?id=25658638&c=3450792&h=7ee4c8ecc1671380648c" />';
        params.portlet.html = content;
    }

    return {
        render: render
    }
});
