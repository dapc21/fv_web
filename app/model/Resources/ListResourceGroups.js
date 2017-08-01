Ext.define('LoadPrincipal.model.Resources.ListResourceGroups', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : 'id_resourceGroups', type : 'string'},
		{name : 'id_resourceDefinition', type : 'string'},
		{name : 'resourceGroups', type : 'string'}
	],
    idProperty : 'id_resourceGroups'
});