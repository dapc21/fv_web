Ext.define('LoadPrincipal.store.ResourceTracking.ListHistory', {
    extend     : 'Ext.data.Store',
    pageSize   : -1,
    model      : 'LoadPrincipal.model.ResourceTracking.ListHistory',
    autoLoad   : false,
    remoteSort : false,
	proxy: {
		type   : 'rest',
		url    : moduleConfig.services.listHistoryUrl,
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
				   },			   
			   ]
		   })
	   },		
	},
  sorters    : [{
      property  : '_id',
      direction : 'ASC'
  }]
});
