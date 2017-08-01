Ext.define('LoadPrincipal.store.UsersOld.ListRestore', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.UsersOld.ListRestore',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'rest',
        method              : 'GET',
        useDefaultXhrHeader : false,
        url                 : moduleConfig.services.listUrl,
        extraParams         : {
            filters : Ext.JSON.encode({
                "and":[{
                    "field"      : "deleted_at",
                    "comparison" : "isnotnull"
                }]
            }),
        },
        reader              : {
            type            : 'json',
            root            : 'data',
            totalProperty   : 'pagination.total',
        }
    },
    sorters    : [{
        property  : 'deleted_at',
        direction : 'DESC'
    }]
});