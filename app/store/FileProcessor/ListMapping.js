
Ext.define('LoadPrincipal.store.FileProcessor.ListMapping', {
    extend: 'Ext.data.Store',
    pageSize: moduleConfig.listPageSize,
    model: 'LoadPrincipal.model.FileProcessor.ListMapping',
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
    },
    listeners: {
        load: function(store) {
            var model = Ext.create('LoadPrincipal.model.FileProcessor.ListMapping', {
                id_column: 99999,
                label_name: 'OMITIR COLUMNA'
            });
            store.autoSync = false;
            store.insert(0,model);
        }
    }
   , sorters: [{
        property: 'id_audit',
        direction: 'DESC'
    }]
});