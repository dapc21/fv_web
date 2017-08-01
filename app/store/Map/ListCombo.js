var jsonObj = new Object();
jsonObj.func = moduleConfig.serviceAuditList;
jsonObj.resp = 'web';
jsonObj.limit = moduleConfig.listPageSize;
jsonObj.filter = [];
jsonObj.sort = [
    {
        property: 'id_audit',
        direction: 'desc'
    }
];
jsonObj.relations = ["user","auditsection","auditaction"];    
moduleConfig.exportFilter = jsonObj;

Ext.define('LoadPrincipal.store.Map.ListCombo', {
    extend: 'Ext.data.Store',
    pageSize: moduleConfig.listPageSize,
    model: 'LoadPrincipal.model.Map.ListCombo',
    autoLoad: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        actionMethods: 'POST',
        url: moduleConfig.serviceUrlCombo,
        extraParams: {
            values: JSON.stringify(jsonObj)
        },
        reader: {
            type: 'json',
            root: 'data',
//            totalProperty: 'data.total'
        }
    }
   , sorters: [{
        property: 'id_audit',
        direction: 'DESC'
    }]
});