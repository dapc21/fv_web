Ext.define('LoadPrincipal.model.Resources.ListComboDevices', {
    extend     : 'Ext.data.Model',
    fields     : [
		{name : '_id', type: 'string'},
		{name : 'serial', type: 'string'},
		{name : 'Attributes', mapping:'customAttributes',type : 'auto'},
	],
    idProperty : '_id'
});