Ext.define('LoadPrincipal.store.Scheduling.ListResource', {
    extend     : 'Ext.data.Store',
  //  pageSize   : moduleConfig.grid.pageSize,
    model      : 'LoadPrincipal.model.Scheduling.ListResource',
    autoLoad   : true,
    remoteSort : false,
	  proxy: {
		    type   : 'rest',
		    url    : moduleConfig.services.listResourceUrl,

    		reader : {
    			type : 'json',
    			root : 'data',
          totalProperty   : 'pagination.total',
    		}
	},
  sorters    : [{
      property  : '_id',
      direction : 'DESC'
  }]
});
