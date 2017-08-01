Ext.define('LoadPrincipal.model.Companies.ListResourcesComboIcons', {
    extend     : 'Ext.data.Model',
    fields     : [
		{name : '_id', type : 'string'},
		{name : 'type', type : 'string'},
		{name : 'name', type : 'string'},
		{name : 'normal', type : 'string'},
		{name : 'event', type : 'string'}
	],
    idProperty : '_id'
});