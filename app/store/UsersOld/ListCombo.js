Ext.define('LoadPrincipal.store.UsersOld.ListCombo', {
    extend     : 'Ext.data.Store',
    pageSize   : 10,
    model      : 'LoadPrincipal.model.UsersOld.ListCombo',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type                : 'ajax',
        useDefaultXhrHeader : false,
        method              : 'GET',
        url                 : moduleConfig.services.fileTypeComboUrl,
        reader : {
            type          : 'json',
            root          : 'data',
            totalProperty : 'total'
        }
    }
   , sorters   : [{
        property  : 'name',
        direction : 'DESC'
    }]
});