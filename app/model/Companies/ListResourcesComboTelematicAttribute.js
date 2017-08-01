Ext.define('LoadPrincipal.model.Companies.ListResourcesComboTelematicAttribute', {
    extend     : 'Ext.data.Model',
    fields     : [
		{name : '_id', type : 'string'},
		{name : 'name', type : 'string'},
		{name : 'Attributes', mapping : 'customAttributes', type : 'auto'},
		{name : 'Devices', mapping : 'deviceDefinitions', type : 'auto'}
	],
    idProperty : '_id'
});