Ext.define('LoadPrincipal.store.Scheduling.ListStartEnd', {
    extend     : 'Ext.data.Store',
    pageSize   : 5, //Por defecto Ext coloca 25
    model      : 'LoadPrincipal.model.Scheduling.ListStartEnd',
    autoLoad   : true,
    remoteSort : false,
    groupField: 'id_resourceDefinition',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    },
    sorters    : [{
        property  : 'id_resourceDefinition',
        direction : 'DESC'
    }]
});
