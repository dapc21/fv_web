
Ext.define('LoadPrincipal.store.FileProcessor.ListDuplicated', {
    extend: 'Ext.data.Store',
    pageSize: moduleConfig.listPageSize,
    model: 'LoadPrincipal.model.FileProcessor.ListDuplicated',
    autoLoad: false ,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        method: 'GET',
        useDefaultXhrHeader: false,
        url: moduleConfig.services.listDuplicatedUrl,
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