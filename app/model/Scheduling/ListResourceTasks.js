/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.Scheduling.ListResourceTasks', {
    extend: 'Ext.data.Model',
    fields: [
      {name: '_id', mapping: '_id', type: 'string'},
      {name: 'groups', mapping: 'resource.groups', type: 'auto'},
      {name: 'deviceData',    type: 'auto'},
      {name: 'devices', type: 'auto'},
      {name: 'tasks', type: 'auto'},
      {name: 'rawShape', type: 'auto'},
      {name: 'heading'},
      {name: 'speed'},
      {name: 'updateTime'},
      {name: 'latitude'},
      {name: 'longitude'},
      {name: 'address'},
      {name: 'login', mapping: 'resourceInstance.login', type: 'string'},
      {name: 'resourceId', mapping: 'resourceInstance._id', type: 'string'},
      {name: 'resourceInstance', mapping: 'resourceInstance', type:'auto'},
    ],
    idProperty: '_id'
});
