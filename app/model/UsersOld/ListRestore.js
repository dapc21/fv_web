Ext.define('LoadPrincipal.model.UsersOld.ListRestore', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type: 'string'},
		{name : 'login', type: 'string'},
		{name : 'name', type: 'string'},
		{name : 'lastName', type: 'string'},
		{name : 'email', type: 'string'},
		{name : 'deleted_at'},
		{name : 'status', type: 'string'}
	],
    idProperty : '_id'
});