Ext.define('LoadPrincipal.model.Companies.ListResourcesComboRelatedResource', {
    extend     : 'Ext.data.Model',
    fields     : [
		{name : '_id', type: 'string'},
		{name : 'id_company', type: 'string'},
		{name : 'name', type: 'string'},
		{name : 'limit', type: 'string'},
		{name : 'Attributes', mapping : 'customAttributes', type : 'auto'},
		{name : 'Devices', mapping : 'deviceDefinitions', type : 'auto'}
	],
    idProperty : '_id'
});