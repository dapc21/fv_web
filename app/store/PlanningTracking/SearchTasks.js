Ext.define('LoadPrincipal.store.PlanningTracking.SearchTasks', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.PlanningTracking.SearchTasks',
    autoLoad   : true,
    remoteSort : false,
	proxy: {
		type   : 'rest',
		url    : moduleConfig.services.urlTask,
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
				   },			   
			   ]
		   })
	   },		
	},
	sorters    : [{
	  property  : '_id',
	  direction : 'DESC'
	}]
});
