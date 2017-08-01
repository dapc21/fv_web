Ext.define('LoadPrincipal.store.Companies.ListCountries', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listCountriesPageSize,
    model      : 'LoadPrincipal.model.Companies.ListCountries',
    autoLoad   : false,
    remoteSort : true,
    proxy      : {
        type                : 'rest',
        method              : 'GET',
        useDefaultXhrHeader : false,
        url                 : moduleConfig.services.listCountriesUrl,
        reader              : {
            type            : 'json',
            root            : 'data',
            totalProperty   : 'pagination.total',
        }
    },
    sorters    : [{
        property  : 'country',
        direction : 'ASC'
    }]
});