Ext.define('LoadPrincipal.store.Companies.ListResourcesRelatedResource', {
    extend     : 'Ext.data.Store',
    pageSize   : 50,
    model      : 'LoadPrincipal.model.Companies.ListResourcesRelatedResource',
    autoLoad   : false,
    remoteSort : false,
    proxy      : {
        type   : 'memory',
        reader : {
            type : 'json',
            root : 'data'
        }
    },
    sorters   : [{
        property  : 'name',
        direction : 'ASC'
    }]
});