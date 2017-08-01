Ext.define('LoadPrincipal.store.PlanningTracking.ListAllResources', {
    extend     : 'Ext.data.Store',
    pageSize   : 50,
	//pageSize: moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.PlanningTracking.List',
    autoLoad   : true,
    remoteSort : false,
	  proxy: {
		type   : 'rest',
		url    : moduleConfig.services.listTasksUrl,
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
	},
	sorters    : [{
      property  : '_id',
      direction : 'DESC'
  }]
});
