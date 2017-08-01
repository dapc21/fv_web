
Ext.define('LoadPrincipal.store.FileProcessor.ListProcess', {
    extend: 'Ext.data.Store',
    pageSize: moduleConfig.listPageSize,
    model: 'LoadPrincipal.model.FileProcessor.ListProcess',
    autoLoad: true ,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        method: 'GET',
        useDefaultXhrHeader: false,
        url: moduleConfig.services.listProcessUrl,
        extraParams: {
            relations: JSON.stringify(["file","object","map"])
        },
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