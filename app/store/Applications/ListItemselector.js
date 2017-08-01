Ext.define('LoadPrincipal.store.Applications.ListItemselector', {
    extend     : 'Ext.data.Store',
    pageSize   : 10,
    model      : 'LoadPrincipal.model.Applications.ListItemselector',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'ajax',
        useDefaultXhrHeader : false,
        method              : 'GET',
        url                 : moduleConfig.services.urlItemselectorApplications,
        //extraParams         : {
        //    token : document.getElementById("token").value
        //},
        reader : {
            type          : 'json',
            root          : 'data[0].modules',
            totalProperty : 'pagination.total'
        }
    },
    sorters   : [{
        property  : '_id',
        direction : 'ASC'
    }]
});