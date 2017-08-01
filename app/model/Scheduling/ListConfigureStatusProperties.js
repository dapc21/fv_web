Ext.define('LoadPrincipal.model.Scheduling.ListConfigureStatusProperties', {
    extend     : 'Ext.data.Model',
    fields     : [
		{name : '_id', type: 'string'},
		{name : 'label', type : 'string'},
		{name : 'type', type : 'auto'},
		{name : 'value', type : 'auto'},
		{name : 'withPhoto', type : 'auto'}
	]
});
