Ext.define('LoadPrincipal.store.ResourceTracking.SearchAddress', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.ResourceTracking.SearchAddress',
    remoteSort : false,
	  proxy: {
		    type   : 'rest',
		    url    : moduleConfig.services.urlAddressGeocoding,

    		reader : {
    			type : 'json',
    			root : 'data',
          totalProperty   : 'pagination.total',

    		}
	}
});
