Ext.define('LoadPrincipal.store.Companies.ListFilterCountries', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listCountriesPageSize,
    model      : 'LoadPrincipal.model.Companies.ListCountries',
    autoLoad   : true,
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