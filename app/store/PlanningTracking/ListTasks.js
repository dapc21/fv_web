Ext.define('LoadPrincipal.store.PlanningTracking.ListTasks', {
    extend     : 'Ext.data.Store',
    pageSize   : 200,//moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.PlanningTracking.ListTasks',
    autoLoad   : true,
    remoteSort : true,
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
				   }			   
			   ]
		   }),
		   //relations: Ext.JSON.encode(["resourceInstance"]),
	   },		
	},
  sorters    : [{
      property  : 'arrival_time',
      direction : 'ASC'
  }]
});
