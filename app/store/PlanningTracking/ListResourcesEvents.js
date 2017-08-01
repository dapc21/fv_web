Ext.define('LoadPrincipal.store.PlanningTracking.ListResourcesEvents', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.PlanningTracking.ListResourcesEvents',
    autoLoad   : false,
    remoteSort : false,
	  proxy: {
		    type   : 'rest',
		    url    : moduleConfig.services.listResourcesEventsUrl,

    		reader : {
    			type : 'json',
    			root : 'data',
          totalProperty   : 'pagination.total',

    		}
	},
  sorters    : [{
      property  : 'updateTime',
      direction : 'DESC'
  }]
});
