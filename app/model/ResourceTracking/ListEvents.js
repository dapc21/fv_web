/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.ResourceTracking.ListEvents', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', mapping: '_id', type: 'string'},
        {name: 'resourceName', mapping: 'resource.login'},
        {name: 'taskName', mapping: 'task.name'},
        {name: 'eventCategory', type: 'string'},
        {name: 'eventType', type: 'string'},
        {name: 'message', type: 'string'},
        {name: 'updateTime', type:'date'}
      /*  "resource" : {
                "_id" : "57100a5f1dd2f56978c48a3a",
                "placa" : "HOA521"
        },
        "task" : {
                "_id" : "572bf270c740cde2218b45a6",
                "name" : "TAREA 32"
        },
        "eventCategory" : "Planning",
        "eventType" : "checkin",
        "message" : "Se hizo checkin",
        "updatetime" : ISODate("2016-03-29T20:23:26.847Z")*/

    ],
    idProperty: '_id'
});
