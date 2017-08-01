Ext.define('LoadPrincipal.model.Scheduling.SearchTasks', 
{
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', mapping: '_id', type: 'string'},
        {name: 'name', type:'string'}

    ],
    idProperty: '_id'
});
