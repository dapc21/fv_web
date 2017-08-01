Ext.define('LoadPrincipal.store.Scheduling.SearchAddress', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.Scheduling.SearchAddress',
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
