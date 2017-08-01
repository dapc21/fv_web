/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.Scheduling.ListTemporalVisit', {
    extend: 'Ext.data.Model',
    fields: [
        { name: '_id', mapping: '_id', type: 'string'},
        { name: 'error'},
		{ name: 'name', mapping: 'name'},
		{ name: 'code', mapping: 'code'},
		{ name: 'dropoff', mapping: 'dropoff'},
		{ name: 'id_company', mapping: 'id_company'},
		{ name: 'id_process', mapping: 'id_process'},
		{ name: 'loadAmount', mapping: 'loadAmount'},
		{ name: 'numberLine', mapping: 'numberLine'},
		{ name: 'pickup', mapping: 'pickup'},
		{ name: 'status', mapping: 'status'},
		{ name: 'priority', mapping: 'priority'},
		{ name: 'distance', mapping: 'distance'},
    ],
    idProperty: '_id'
});
