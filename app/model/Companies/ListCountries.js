Ext.define('LoadPrincipal.model.Companies.ListCountries', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type: 'string'},
		{name : 'country', type: 'string'},
		{name : 'ISO', type: 'string'},
		{name : 'ISO3', type: 'string'},
		{name : 'ISONumeric', type: 'string'},
		{name : 'fips', type: 'string'},
		{name : 'capital', type: 'string'},
		{name : 'area', type: 'string'},
		{name : 'population', type: 'string'},
		{name : 'continent', type: 'string'},
		{name : 'tld', type: 'string'},
		{name : 'currencyCode', type: 'string'},
		{name : 'currencyName', type: 'string'},
		{name : 'phone', type: 'string'}
	],
    idProperty : '_id'
});