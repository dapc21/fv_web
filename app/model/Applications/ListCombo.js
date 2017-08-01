Ext.define('LoadPrincipal.model.Applications.ListCombo', {
    extend     : 'Ext.data.Model',
    fields     : [
		{name : '_id', type: 'string'},
		{name : 'name', type: 'string'},
		{name : 'Modules', mapping : 'modules', type : 'auto'}
	],
    idProperty : '_id'
});