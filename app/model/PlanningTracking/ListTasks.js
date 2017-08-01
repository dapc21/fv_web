Ext.define('LoadPrincipal.model.PlanningTracking.ListTasks', 
{
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', type: 'auto'},
        {name: 'address', type: 'auto'},
        {name: 'arrival_time', type: 'auto'},
        {name: 'finish_time', type: 'auto'},
        {name: 'code', type: 'auto'},
        {name: 'duration', type: 'auto'},
        {name: 'id_resourceInstance', type: 'auto'},
        {name: 'loadAmount', type: 'auto'},
        {name: 'location', type: 'auto'},
        {name: 'name', type: 'auto'},
        {name: 'priority', type: 'auto'},
        //{name: 'resourceInstance', type: 'auto'},
        {name: 'status', type: 'auto'},
        {name: 'type', type: 'auto'},
        {name: 'checkin', type: 'auto'},
        {name: 'checkout', type: 'auto'},
    ],
    idProperty: '_id'
});
