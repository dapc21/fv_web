Ext.define('LoadPrincipal.store.UsersOld.List', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.UsersOld.List',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type                : 'rest',
        method              : 'GET',
        useDefaultXhrHeader : false,
        url                 : moduleConfig.services.listUrl,
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