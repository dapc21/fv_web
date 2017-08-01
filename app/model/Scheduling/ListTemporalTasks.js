/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.Scheduling.ListTemporalTasks', {
    extend: 'Ext.data.Model',
    fields: [
      {name: '_id', mapping: '_id', type: 'string'},
      {name: 'address', type: 'auto'},
      {name: 'name', type: 'auto'},
      {name: 'priority', type: 'auto'},
      {name: 'msgStatus',    type: 'auto'},
    ],
    idProperty: '_id'
});
