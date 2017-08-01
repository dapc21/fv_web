Ext.define('LoadPrincipal.store.PlanningTracking.SearchAddress', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.PlanningTracking.SearchAddress',
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
