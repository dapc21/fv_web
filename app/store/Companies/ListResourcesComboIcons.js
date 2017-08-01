Ext.define('LoadPrincipal.store.Companies.ListResourcesComboIcons', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listIconsPageSize,
    model      : 'LoadPrincipal.model.Companies.ListResourcesComboIcons',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type                : 'ajax',
        useDefaultXhrHeader : false,
        method              : 'GET',
        url                 : moduleConfig.services.urlComboIcons,
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