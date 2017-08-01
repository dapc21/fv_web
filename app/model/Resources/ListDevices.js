Ext.define('LoadPrincipal.model.Resources.ListDevices', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : 'id_deviceDefinition', type : 'string'},
		{name : 'device', type : 'string'},
		{name : 'serial', type: 'string'},
		{name : 'Attributes', mapping:'customAttributes',type : 'auto'},
		{name : 'objectAttributes', mapping:'customAttributes',type : 'auto'}
	],
    idProperty : 'id_deviceDefinition'
});