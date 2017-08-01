Ext.define('LoadPrincipal.store.Scheduling.ListConfigureStatusProperties', {
    extend     : 'Ext.data.Store',
    pageSize   : 50,
    model      : 'LoadPrincipal.model.Scheduling.ListConfigureStatusProperties',
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
