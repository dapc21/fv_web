Ext.define('LoadPrincipal.store.Scheduling.ComboResourcesType', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.Scheduling.ComboResourcesType',
    autoLoad   : true,
    remoteSort : false,
	  proxy: {
		    type   : 'rest',
		    url    : moduleConfig.services.comboDeviceTypeUrl,
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
              {
                field: 'isSystem',
                comparison: 'eq',
                value: false,
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
