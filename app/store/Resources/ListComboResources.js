Ext.define('LoadPrincipal.store.Resources.ListComboResources', {
    extend     : 'Ext.data.Store',
    pageSize   : 10,
    model      : 'LoadPrincipal.model.Resources.ListComboResources',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'ajax',
        useDefaultXhrHeader : false,
        method              : 'GET',
        url                 : moduleConfig.services.urlComboResources,
        reader : {
            type          : 'json',
            root          : 'data',
            totalProperty : 'pagination.total'
        }
    },
    sorters   : [{
        property  : 'login',
        direction : 'ASC'
    }]
});