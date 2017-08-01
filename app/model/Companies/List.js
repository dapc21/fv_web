Ext.define('LoadPrincipal.model.Companies.List', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type: 'string'},
		{name : 'name', type: 'string'},
		{name : 'nit', type: 'string'},
		{name : 'address', type: 'string'},
		{name : 'country', mapping: 'country.country',  type: 'string'},
		{name : 'city', mapping: 'city.asciiname',  type: 'string'},
		{name : 'phone', type: 'string'},
		{name : 'legalRepresentativeId', type: 'string'},
		{name : 'legalRepresentativeName', type: 'string'},
		{name : 'legalRepresentativeLastName', type: 'string'},
		{name : 'legalRepresentativePhone', type: 'string'},
		{name : 'status', type: 'string'}
	],
    idProperty : '_id'
});