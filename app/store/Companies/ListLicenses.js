Ext.define('LoadPrincipal.store.Companies.ListLicenses', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listLicensesPageSize,
    model      : 'LoadPrincipal.model.Companies.ListLicenses',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'rest',
        method              : 'GET',
        useDefaultXhrHeader : false,
        //url                 : moduleConfig.services.listLicensesUrl,
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