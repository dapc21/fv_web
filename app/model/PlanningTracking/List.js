/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.PlanningTracking.List', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', mapping: '_id', type: 'string'},
        {name: 'groups', mapping: 'resourceInstance.groups', type: 'auto'},
        {name: 'deviceData',    type: 'auto'},
        {name: 'devices', type: 'auto'},
        {name: 'route', type: 'auto'},
        {
            name: 'tasks', 
            type: 'auto',
            convert: function(value, record)
            {
                var result = [];

                if(!Ext.isEmpty(record.data.route) && !Ext.isEmpty(record.data.route.tasks)){
                    result = record.data.route.tasks;
                }

                return result;
            }
        },
        {
            name: 'rawShape', 
            type: 'auto',
            convert: function(value, record)
            {
                var result = null;

                if(!Ext.isEmpty(record.data.route) && !Ext.isEmpty(record.data.route.rawShape)){
                    result = record.data.route.rawShape;
                }

                return result;
            }
        },
        {name: 'heading'},
        {name: 'speed'},
        {name: 'updateTime'},
        {name: 'latitude'},
        {name: 'longitude'},
        {name: 'address'},
        {name: 'login', mapping: 'resourceInstance.login', type: 'string'},
        {name: 'resourceId', mapping: 'resourceInstance._id', type: 'string'},
        /*{name: 'group_name',type: 'string',
            convert:function(val,record){
                var grupos = '';
                for (var i = 0; i < record.data.groups.length; i++) {
                    if(i==0){
                        grupos += record.data.groups[i].name
                    }else{
                        grupos += ',' + record.data.groups[i].name
                    }
                }
                return grupos
            }
        },*/
        /*{name: 'location_time',type: 'string',
            convert:function(val, record){
                return record.data.address+'<br>'+
                record.data.updateTime;
            }
        }*/
    ],
    idProperty: '_id'
});
