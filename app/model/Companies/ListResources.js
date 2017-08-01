Ext.define('LoadPrincipal.model.Companies.ListResources', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type: 'string'},
		{name : 'name', type: 'string'},
		{name : 'limit', type: 'string'},
		{name : 'id_icon', type: 'string'},
		{name : 'routingTool', type: 'string'},
		{name : 'IconType', mapping : 'icon.type', type : 'auto'},
		{name : 'IconName', mapping : 'icon.name', type : 'auto'},
		{name : 'IconNormal', mapping : 'icon.normal', type : 'auto'},
		{name : 'IconEvent', mapping : 'icon.event', type : 'auto'},
		{name : 'Devices', mapping : 'deviceDefinitions', type : 'auto'},
		{name : 'Attributes', mapping : 'customAttributes', type : 'auto'},
		{name : 'Resources', mapping : 'resourceDefinitions', type : 'auto'},
	],
    idProperty : '_id'
});