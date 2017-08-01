Ext.define('LoadPrincipal.model.Companies.ListResourcesDeviceType', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : 'id_deviceDefinition', type: 'string'},
		{name : 'deviceDefinitionName', type: 'string'},
		{name : 'allowBlank', type : 'bool'},
		{name : 'mandatory', type : 'bool'},
		{name : 'renderAllowBlank', type : 'bool',
			convert : function(value, record) {
				return (record.get('allowBlank') === false) ? true : false;
			}
		},
		{name : 'Parents', mapping : 'parents', type : 'auto'},
		{name : 'Children', mapping : 'children', type : 'auto'},
		{name : 'Attributes', mapping : 'customAttributes', type : 'auto'}
	]
});