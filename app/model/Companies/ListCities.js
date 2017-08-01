Ext.define('LoadPrincipal.model.Companies.ListCities', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type: 'string'},
		{name : 'name', type: 'string'},
		{name : 'geonameid', type: 'string'},
		{name : 'asciiname', type: 'string'},
		{name : 'latitude', type: 'string'},
		{name : 'longitude', type: 'string'},
		{name : 'ISO', type: 'string'},
		{name : 'timezone', type: 'string'}
	],
    idProperty : '_id'
});