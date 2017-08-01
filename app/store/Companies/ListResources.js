Ext.define('LoadPrincipal.store.Companies.ListResources', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listResourcesPageSize,
    model      : 'LoadPrincipal.model.Companies.ListResources',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'rest',
        method              : 'GET',
        useDefaultXhrHeader : false,
        url                 : moduleConfig.services.listResourcesUrl,
        //extraParams         : {
        //    token : document.getElementById("token").value
        //},
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