Ext.define('LoadPrincipal.store.Companies.ListDevices', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listDevicesPageSize,
    model      : 'LoadPrincipal.model.Companies.ListDevices',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'rest',
        method              : 'GET',
        useDefaultXhrHeader : false,
        url                 : moduleConfig.services.listDevicesUrl,
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