Ext.define('LoadPrincipal.model.Companies.ListDevices', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type: 'string'},
		{name : 'id_deviceDefinition', type : 'string'},
		{name : 'serial', type: 'string'},
		{name : 'name', type: 'string'},
		{name : 'status',type : 'string'},
		{name : 'Attributes', mapping:'customAttributes',type : 'auto'},
		{name : 'objectAttributes', mapping:'customAttributes',type : 'auto'}
	],
    idProperty : '_id'
});