Ext.define('LoadPrincipal.store.Companies.ListResourcesComboTelematicAttribute', {
    extend     : 'Ext.data.Store',
    pageSize   : 10,
    model      : 'LoadPrincipal.model.Companies.ListResourcesComboTelematicAttribute',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'ajax',
        useDefaultXhrHeader : false,
        method              : 'GET',
        url                 : moduleConfig.services.urlComboTelematicAttribute,
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