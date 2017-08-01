Ext.define('LoadPrincipal.store.Forms.ListSection', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.Forms.ListSection',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'rest',
        method              : 'GET',
        useDefaultXhrHeader : false,
        url                 : moduleConfig.services.urlListSection,
        reader              : {
            type            : 'json',
            root            : 'data',
            totalProperty   : 'pagination.total',
        }
    },
    sorters    : [{
        property  : '_id',
        direction : 'DESC'
    }]
});