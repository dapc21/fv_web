
Ext.define('LoadPrincipal.store.FileProcessor.ListInserted', {
    extend: 'Ext.data.Store',
    pageSize: moduleConfig.listPageSize,
    model: 'LoadPrincipal.model.FileProcessor.ListInserted',
    autoLoad: false ,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        method: 'GET',
        useDefaultXhrHeader: false,
        url: moduleConfig.services.listInsertedUrl,
//        extraParams: {
//            values: JSON.stringify(jsonObj)
//        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'data.total'
        }
    }
   , sorters: [{
        property: 'id_audit',
        direction: 'DESC'
    }]
});