/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.Scheduling.ListStartEnd', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', mapping: '_id', type: 'string'},
        {name: 'address', type:'string'},
        {name: 'id_resourceDefinition', type:'auto'},
        {name: 'location', type:'auto'},
        {name: 'name', type:'auto'},
        {name: 'type', type:'auto'},
    ],
    idProperty: '_id'
});
