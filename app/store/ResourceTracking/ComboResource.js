Ext.define('LoadPrincipal.store.ResourceTracking.ComboResource', {
    extend     : 'Ext.data.Store',
  //  pageSize   : moduleConfig.grid.pageSize,
    model      : 'LoadPrincipal.model.ResourceTracking.ComboResource',
    autoLoad   : true,
    remoteSort : false,
	proxy: {
		type   : 'rest',
		url    : moduleConfig.services.comboResourceUrl,
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
