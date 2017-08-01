Ext.define('LoadPrincipal.store.ResourceTracking.List', {
    extend     : 'Ext.data.Store',
  //  pageSize   : moduleConfig.grid.pageSize,
    model      : 'LoadPrincipal.model.ResourceTracking.List',
    autoLoad   : true,
    remoteSort : true,
	proxy: {
		type   : 'rest',
		url    : moduleConfig.services.listResourceUrl,
		reader : {
			type : 'json',
			root : 'data',
			totalProperty   : 'pagination.total',
		},
		extraParams: {
		   filters: Ext.JSON.encode({
			 'and':[
				   {
					   field: 'resourceInstance.id_company',
					   comparison: 'eq',
					   value: window.localStorage.getItem('id_company')
				   }				   
			   ]
		   })
	   },		
	}
});
