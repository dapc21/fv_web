Ext.define('LoadPrincipal.store.Forms.List', {
    extend     : 'Ext.data.Store',
    pageSize   : moduleConfig.listPageSize,
    model      : 'LoadPrincipal.model.Forms.List',
    autoLoad   : true,
    remoteSort : true,
    proxy      : {
        type                : 'rest',
        method              : 'GET',
        useDefaultXhrHeader : false,
        url                 : moduleConfig.services.url,
        reader              : {
            type            : 'json',
            root            : 'data',
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
		   })
	   },		
    },
    sorters    : [{
        property  : '_id',
        direction : 'DESC'
    }]
});