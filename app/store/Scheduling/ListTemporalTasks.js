Ext.define('LoadPrincipal.store.Scheduling.ListTemporalTasks', {
    extend     : 'Ext.data.Store',
  //  pageSize   : moduleConfig.grid.pageSize,
    model      : 'LoadPrincipal.model.Scheduling.ListTemporalTasks',
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
        /*extraParams: {
            filters: Ext.JSON.encode({
              'and':[
                    {
                        field: 'id_process',
                        comparison: 'eq',
                        value: '57ab8ab4e138234fcc610838'
                    },
                ]
            })
        },*/
	},
  sorters    : [{
      property  : '_id',
      direction : 'DESC'
  }]
});
