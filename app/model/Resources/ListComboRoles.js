Ext.define('LoadPrincipal.model.Resources.ListComboRoles', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type : 'string'},
		{name : 'name', type : 'string'},
		{name : 'applicationId', mapping : 'application.id_application', type : 'string'},
		{name : 'applicationName', mapping : 'application.name', type : 'string'}
	],
    idProperty : '_id'
});