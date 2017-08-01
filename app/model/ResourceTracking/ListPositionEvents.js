/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.ResourceTracking.ListPositionEvents', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'description', type: 'string'},
        {name: 'eventCategory', },
        {name: 'eventType', type: 'string'}
    ]
});
