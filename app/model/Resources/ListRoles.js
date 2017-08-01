Ext.define('LoadPrincipal.model.Resources.ListRoles', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : 'id_role', type : 'string'},
		{name : 'roleName', type : 'string'},
		{name : 'applicationName', type : 'string'}
	],
    idProperty : 'id_role'
});