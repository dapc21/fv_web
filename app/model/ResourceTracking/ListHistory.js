/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.ResourceTracking.ListHistory', {
    extend: 'Ext.data.Model',
    fields: [
      {name: '_id', mapping: '_id', type: 'string'},
    //  {name: 'deviceData', type: 'auto'},
      {name: 'events', type:'auto'},
    //  {name: 'resourceName', mapping: 'resource.serial', type: 'string'},
    //  {name: 'resourceId', mapping: 'resource._id', type: 'string'},
      {name: 'login', mapping: 'resourceLogin.login'},
      {name: 'heading', type:'int'},
      {name: 'hasEvents', mapping: 'hasEvents', type: 'boolean'},
      {name: 'address', mapping: 'address', type:'string'},
      {name: 'updateTime', mapping: 'updateTime', type: 'date'},
      {name: 'speed', mapping: 'speed', type: 'int'},
      {name: 'odometer', mapping: 'odometer', type: 'int'},
      {name: 'latitude'},
      {name: 'longitude'},
      {name: 'rpm',           type: 'int',     mapping:'deviceData.Ecumonitor.RPM'},
      {name: 'levelGasTank',  type: 'int',     mapping:'deviceData.Probe.levelGasTank'}
    ],
    idProperty: '_id'
});
