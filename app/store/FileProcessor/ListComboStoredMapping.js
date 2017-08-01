Ext.define('LoadPrincipal.store.FileProcessor.ListComboStoredMapping', {
    extend: 'Ext.data.Store',
    pageSize: '10',
    model: 'LoadPrincipal.model.FileProcessor.ListComboStoredMapping',
    autoLoad: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        useDefaultXhrHeader: false,
        method: 'GET',
        url: moduleConfig.services.storedMappingComboUrl,
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