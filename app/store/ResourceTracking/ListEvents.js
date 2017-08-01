Ext.define('LoadPrincipal.store.ResourceTracking.ListEvents', {
    extend     : 'Ext.data.Store',
  //  pageSize   : moduleConfig.grid.pageSize,
    model      : 'LoadPrincipal.model.ResourceTracking.ListEvents',
    autoLoad   : true,
    remoteSort : false,
	proxy: {
		type   : 'rest',
		url    : moduleConfig.services.listResourcesEventsUrl,
		reader : {
			type : 'json',
			root : 'data',
			totalProperty   : 'pagination.total',
		},
		extraParams: {
		   filters: Ext.JSON.encode({
			 'and':[
				   {
					   field: 'id_company',
					   comparison: 'eq',
					   value: window.localStorage.getItem('id_company')
				   }				   
			   ]
		   })
	   },		
	},
  sorters    : [{
      property  : '_id',
      direction : 'DESC'
  }]
});
