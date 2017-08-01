Ext.define('LoadPrincipal.model.UsersOld.List', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type: 'string'},
		{name : 'login', type: 'string'},
		{name : 'name', type: 'string'},
		{name : 'lastName', type: 'string'},
		{name : 'email', type: 'string'},
		{name : 'updated_at'},
		{name : 'RoleApp', mapping:'roles'},
		{name : 'status', type: 'string'},
		{name : 'IdRoles', mapping:'roles'},
		{name : 'Roles', mapping:'roles'},
		{name : 'Applications', mapping:'roles'}
	],
    idProperty : '_id'
});