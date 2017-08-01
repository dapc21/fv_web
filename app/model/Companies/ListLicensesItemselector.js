Ext.define('LoadPrincipal.model.Companies.ListLicensesItemselector', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', mapping :'application._id', type: 'string'},
		{name : 'name', mapping :'application.modules', type : 'auto'}
	],
    idProperty : '_id'
});