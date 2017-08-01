Ext.define('LoadPrincipal.model.Resources.ListComboApplication', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type : 'string'},
		{name : 'name', type : 'string'},
		{name : 'Modules', mapping : 'modules', type : 'string'}
	],
    idProperty : '_id'
});