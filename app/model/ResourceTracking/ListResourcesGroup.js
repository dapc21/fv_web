/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.ResourceTracking.ListResourcesGroup', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', mapping: '_id', type: 'string'},
        {name: 'id_company', type:'string'},
        {name: 'name', type:'string'}

    ],
    idProperty: '_id'
});
