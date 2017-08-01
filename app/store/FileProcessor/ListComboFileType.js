Ext.define('LoadPrincipal.store.FileProcessor.ListComboFileType', {
    extend: 'Ext.data.Store',
    pageSize: '10',
    model: 'LoadPrincipal.model.FileProcessor.ListComboFileType',
    autoLoad: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        useDefaultXhrHeader: false,
        method: 'GET',
        url: moduleConfig.services.fileTypeComboUrl,
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
   , sorters: [{
        property: 'id',
        direction: 'DESC'
    }]
});