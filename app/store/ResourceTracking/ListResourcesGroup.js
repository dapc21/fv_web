Ext.define('LoadPrincipal.store.ResourceTracking.ListResourcesGroup', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.ResourceTracking.ListResourcesGroup',
    autoLoad   : true,
    remoteSort : false,
	proxy: {
		type   : 'rest',
		url    : moduleConfig.services.listResourcesGroupUrl,
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
