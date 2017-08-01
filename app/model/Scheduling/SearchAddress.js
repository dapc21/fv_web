/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.Scheduling.SearchAddress', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'lat',  type: 'float'},
        {name: 'lng',  type: 'float'}

    ],
    idProperty: 'name'
});
