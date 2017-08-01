Ext.define('LoadPrincipal.store.Companies.ListLicensesItemselector', {
    extend     : 'Ext.data.Store',
    pageSize   : 10,
    model      : 'LoadPrincipal.model.Companies.ListLicensesItemselector',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'rest',
        method              : 'GET',
        useDefaultXhrHeader : false,
        url                 : moduleConfig.services.listLicensesUrl,
        //extraParams         : {
        //    token : document.getElementById("token").value
        //},
        reader              : {
            type            : 'json',
            root            : 'data[0].licenses',
            totalProperty   : 'pagination.total',
        }
    },
    sorters    : [{
        property  : '_id',
        direction : 'DESC'
    }]
});