Ext.define('LoadPrincipal.store.Applications.ListCombo', {
    extend     : 'Ext.data.Store',
    pageSize   : 10,
    model      : 'LoadPrincipal.model.Applications.ListCombo',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type                : 'ajax',
        useDefaultXhrHeader : false,
        method              : 'GET',
        url                 : moduleConfig.services.urlComboApplications,
        //extraParams         : {
        //    token : document.getElementById("token").value
        //},
        reader : {
            type          : 'json',
            root          : 'data',
            totalProperty : 'pagination.total'
        }
    },
    sorters   : [{
        property  : 'name',
        direction : 'ASC'
    }]
});