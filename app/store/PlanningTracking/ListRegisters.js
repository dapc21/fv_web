Ext.define('LoadPrincipal.store.PlanningTracking.ListRegisters', {
    extend     : 'Ext.data.Store',
	//pageSize   : moduleConfig.grid.pageSize,
    model      : 'LoadPrincipal.model.PlanningTracking.ListRegisters',
    autoLoad   : true,
    remoteSort : true,
	proxy: {
		type   : 'rest',
		url    : moduleConfig.services.listRegistersUrl,
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
		   }),
		   relations: Ext.JSON.encode(['form']),
	   },		
	}
});
