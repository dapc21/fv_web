//var jsonObj = new Object();
//jsonObj.func = moduleConfig.serviceAuditList;
//jsonObj.resp = 'web';
//jsonObj.limit = moduleConfig.listPageSize;
//jsonObj.filter = [];
//jsonObj.sort = [
//    {
//        property: 'id_audit',
//        direction: 'desc'
//    }
//];
//jsonObj.relations = ["user","auditsection","auditaction"];    
//moduleConfig.exportFilter = jsonObj;

Ext.define('LoadPrincipal.store.FileProcessor.ListComboModule', {
    extend: 'Ext.data.Store',
    pageSize: '10',
    model: 'LoadPrincipal.model.FileProcessor.ListComboModule',
    autoLoad: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        useDefaultXhrHeader: false,
        method: 'GET',
        url: moduleConfig.services.moduleComboUrl,
//        extraParams: {
//            values: JSON.stringify(jsonObj)
//        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'pagination.total'
        }
    }
   , sorters: [{
        property: 'id_object',
        direction: 'DESC'
    }]
});