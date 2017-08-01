Ext.define('LoadPrincipal.store.FileProcessor.ListComboSeparator', {
    extend: 'Ext.data.Store',
    pageSize: '10',
    model: 'LoadPrincipal.model.FileProcessor.ListComboSeparator',
    autoLoad: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        useDefaultXhrHeader: false,
        method: 'GET',
        url: moduleConfig.services.separatorComboUrl,
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