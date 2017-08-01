
Ext.define('LoadPrincipal.store.Core', {
    extend: 'Ext.data.Store',
    pageSize: moduleConfig.listPageSize,
    model: 'LoadPrincipal.model.FormBuilder.List',
    autoLoad: false ,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        method: 'POST',
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