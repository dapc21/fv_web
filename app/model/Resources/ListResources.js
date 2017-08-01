Ext.define('LoadPrincipal.model.Resources.ListResources', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : 'id_resourceInstance', type : 'string'},
		{name : 'login', type: 'string'},
		{name : 'nameResource', type: 'string'},
		{name : 'Attributes', mapping:'customAttributes',type : 'auto'},
		{name : 'objectAttributes', mapping:'customAttributes',type : 'auto'}
	],
    idProperty : 'id_resourceInstance'
});