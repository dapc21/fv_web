
Ext.define('LoadPrincipal.store.FileProcessor.List', {
    extend: 'Ext.data.Store',
    pageSize: moduleConfig.listPageSize,
    model: 'LoadPrincipal.model.FileProcessor.List',
    autoLoad: false ,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        method: 'GET',
        useDefaultXhrHeader: false,
        url: moduleConfig.services.listUrl,
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