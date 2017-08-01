Ext.define('LoadPrincipal.store.FileProcessor.ListComboEncoding', {
    extend: 'Ext.data.Store',
    pageSize: '10',
    model: 'LoadPrincipal.model.FileProcessor.ListComboEncoding',
    autoLoad: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        useDefaultXhrHeader: false,
        method: 'GET',
        url: moduleConfig.services.encodingComboUrl,
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