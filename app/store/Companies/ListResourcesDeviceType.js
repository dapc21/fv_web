Ext.define('LoadPrincipal.store.Companies.ListResourcesDeviceType', {
    extend     : 'Ext.data.Store',
    pageSize   : 50,
    model      : 'LoadPrincipal.model.Companies.ListResourcesDeviceType',
    autoLoad   : false,
    remoteSort : false,
    proxy      : {
        type                : 'memory',
        reader : {
            type          : 'json',
            root          : 'data'
        }
    },
    sorters   : [{
        property  : 'name',
        direction : 'ASC'
    }]
});