Ext.define('LoadPrincipal.model.Companies.ListResourcesRelatedResource', {
    extend     : 'Ext.data.Model',
    fields     : [
		{name : 'id_resourceDefinition', type : 'string'},
		{name : 'name', type : 'string'},
		{name : 'Attributes', mapping : 'customAttributes', type : 'auto'}
	]
});