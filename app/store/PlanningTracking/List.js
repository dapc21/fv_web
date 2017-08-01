Ext.define('LoadPrincipal.store.PlanningTracking.List', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.PlanningTracking.List',
    autoLoad   : true,
    remoteSort : true,
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
		   }),
	   },		
	},
  sorters    : [{
      property  : 'updateTime',
      direction : 'DESC'
  }]
});
