Ext.define('LoadPrincipal.store.Scheduling.ListResourceTasksCombo', {
    extend     : 'Ext.data.Store',
    pageSize   : 200,//moduleConfig.grid.pageSize,
    model      : 'LoadPrincipal.model.Scheduling.ListResourceTasks',
    autoLoad   : true,
    remoteSort : false,
	  proxy: {
		    type   : 'rest',
		    url    : moduleConfig.services.listResourceTasksUrl,
    		reader : {
    			type : 'json',
    			root : 'data',
          totalProperty   : 'pagination.total',
    		},
        extraParams: {
            filters: Ext.JSON.encode({
              'and':[
                    {
                        field      : 'resourceInstance.id_company',
                        comparison : 'eq',
                        value      : window.localStorage.getItem('id_company')
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
