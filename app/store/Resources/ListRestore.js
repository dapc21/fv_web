Ext.define('LoadPrincipal.store.Resources.ListRestore', {
    extend     : 'Ext.data.Store',
    pageSize   : 15,
    model      : 'LoadPrincipal.model.Resources.ListRestore',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'rest',
        method              : 'GET',
        useDefaultXhrHeader : false,
        url                 : moduleConfig.services.url,
        /*extraParams         : {
            filters : Ext.JSON.encode({
                "and":[{
                    "field"      : "deleted_at",
                    "comparison" : "isnotnull"
                }]
            }),
        },*/
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