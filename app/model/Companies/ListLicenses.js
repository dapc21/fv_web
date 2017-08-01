Ext.define('LoadPrincipal.model.Companies.ListLicenses', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', mapping :'_id', type : 'string'},
		{name : 'id_application', mapping :'application._id', type: 'string'},
		{name : 'Application', mapping : 'application.name', type : 'string'},
		{name : 'maxUsers', type : 'string'},
		{name : 'maxResources', type : 'string'},
		{name : 'Modules', mapping :'application.modules', type : 'auto'}
	],
    idProperty : '_id'
});