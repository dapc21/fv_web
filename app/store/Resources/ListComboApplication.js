Ext.define('LoadPrincipal.store.Resources.ListComboApplication', {
    extend     : 'Ext.data.Store',
    pageSize   : 10,
    model      : 'LoadPrincipal.model.Resources.ListComboApplication',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'ajax',
        useDefaultXhrHeader : false,
        method              : 'GET',
        url                 : moduleConfig.services.urlComboApplication,
        reader : {
            type          : 'json',
            root          : 'data',
            totalProperty : 'pagination.total'
        }
    },
    sorters   : [{
        property  : 'name',
        direction : 'ASC'
    }]
});