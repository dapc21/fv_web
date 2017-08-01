Ext.define('LoadPrincipal.model.Companies.ListResourcesComboDeviceType', {
    extend     : 'Ext.data.Model',
    fields     : [
		{name : '_id', type: 'string'},
		{name : 'name', type: 'string'},
		{name : 'Parents', mapping : 'parents', type : 'auto'},
		{name : 'Children', mapping : 'children', type : 'auto'},
		{name : 'Attributes', mapping : 'customAttributes', type : 'auto'}
	],
    idProperty : '_id'
});