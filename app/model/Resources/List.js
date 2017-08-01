Ext.define('LoadPrincipal.model.Resources.List', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type: 'string'},
		{name : 'name', type: 'string'}
	],
    idProperty : '_id'
});