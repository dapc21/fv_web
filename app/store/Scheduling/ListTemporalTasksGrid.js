Ext.define('LoadPrincipal.store.Scheduling.ListTemporalTasksGrid', {
    extend     : 'Ext.data.Store',
    pageSize   : 200,//moduleConfig.grid.pageSize,
    model      : 'LoadPrincipal.model.Scheduling.ListTemporalTasksGrid',
    autoLoad   : true,
    remoteSort : false,
	  proxy: {
		    type   : 'rest',
		    url    : moduleConfig.services.urlTemporalTasks,
    		reader : {
    			type : 'json',
    			root : 'data',
          totalProperty   : 'pagination.total',
    		},
	},
  sorters    : [{
      property  : 'arrival_time',
      direction : 'ASC'
  }]
});
