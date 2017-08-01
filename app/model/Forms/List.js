Ext.define('LoadPrincipal.model.Forms.List', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type: 'string'},
		{name : 'name', type: 'string'},
		{name : 'description', type: 'string'},
		{name : 'status', type: 'string'}
	],
    idProperty : '_id'
});