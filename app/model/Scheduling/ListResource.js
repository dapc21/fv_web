/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.Scheduling.ListResource', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', mapping: '_id', type: 'string'},
        {name: 'login', type:'string'},
        {name: 'resourceGroups', type:'auto'},
        {name: 'group',
            convert: function(val,record){
                  var grupos = '';
                  for (var i = 0; i < record.data.resourceGroups.length; i++) {
                      if(i==0){
                          grupos += record.data.resourceGroups[i].name
                      }else{
                          grupos += ',' + record.data.resourceGroups[i].name
                      }
                  }
                  return grupos
            }
        }
    ],
    idProperty: '_id'
});
