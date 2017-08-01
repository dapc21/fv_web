Ext.define('LoadPrincipal.store.Companies.ListCities', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listCitiesPageSize,
    model      : 'LoadPrincipal.model.Companies.ListCities',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'rest',
        method              : 'GET',
        useDefaultXhrHeader : false,
        url                 : moduleConfig.services.listCitiesUrl,
        reader              : {
            type            : 'json',
            root            : 'data',
            totalProperty   : 'pagination.total',
        }
    },
    sorters    : [{
        property  : 'asciiname',
        direction : 'ASC'
    }]
});