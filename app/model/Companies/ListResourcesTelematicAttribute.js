Ext.define('LoadPrincipal.model.Companies.ListResourcesTelematicAttribute', {
    extend     : 'Ext.data.Model',
    fields     : [
		{name : '_id', type: 'string'},
		{name : 'name', type : 'string'},
		{name : 'xtype', type : 'string'},
		{name : 'fieldLabel', type : 'string'},
		{name : 'allowBlank', type : 'bool'},
		{name : 'mandatory', type : 'bool'},
		{name : 'renderAllowBlank', type : 'bool',
			convert : function(value, record) {
				return (record.get('allowBlank') === false) ? true : false;
			}
		}
	]
});