Ext.define('LoadPrincipal.model.Resources.ListComboResources', {
    extend     : 'Ext.data.Model',
    fields     : [
		{name : '_id', type : 'string'},
		{name : 'login', type : 'string'},
		{name : 'email', type : 'string'},
		{name : 'Attributes', mapping : 'customAttributes', type : 'auto'}
	],
    idProperty : '_id'
});