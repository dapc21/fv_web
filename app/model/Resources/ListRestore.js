Ext.define('LoadPrincipal.model.Resources.ListRestore', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type: 'string'},
		{name : 'login', type: 'string'},
		{name : 'email', type: 'string'},
		{name : 'name', mapping:'customAttributes.nombre', type: 'string'},
		{name : 'lastname', mapping:'customAttributes.apellido', type: 'string'},
		{name : 'deleted_at'},
		{name : 'status', type: 'string'}
	],
    idProperty : '_id'
});