Ext.define('LoadPrincipal.store.Scheduling.ListTemporalVisit', {
    extend     : 'Ext.data.Store',
    pageSize   : 14,//moduleConfig.grid.pageSize,
    model      : 'LoadPrincipal.model.Scheduling.ListTemporalVisit',
    autoLoad   : true,
    remoteSort : true,
	  proxy: {
		    type   : 'rest',
		    url    : moduleConfig.services.listTemporalVisitUrl,
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
                        value: '57b31172e1382309213e1b50'
                    },
                    {
                        field: 'id_company',
                        comparison: 'isnull',
                    }
                ]
            })
        },
	  },

  sorters    : [{
      property  : 'numberLine',
      direction : 'ASC'
  }]
});
