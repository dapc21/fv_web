/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.PlanningTracking.ListRegisters', {
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', type: 'auto'},
        {name: 'dataMovil', type: 'auto'},
        {name: 'dataWeb', type: 'auto'},
        {name: 'dataElastic', type: 'auto'},
        {name: 'arrival_time', type: 'auto'},
        {name: 'id_company', type: 'auto'},
        {name: 'id_resourceInstance', type: 'auto'},
        {name: 'login', type: 'auto'},
        {name: 'id_task', type: 'auto'},
        {name: 'id_form', type: 'auto'},
        {name: 'formName', mapping : 'form.name'},
        {name: 'localId', type: 'auto'},
        {name: 'updated_at', type: 'auto'},
        {name: 'created_at', type: 'auto'},
        {name: 'id_user_create', type: 'auto'},
        {
            name: 'number_sections',
            type: 'number',
            convert:function(val,record)
            {
                var sectionsStatus = [];

                try {
                    sectionsStatus = Ext.JSON.decode(record.data.dataMovil.sectionsStatus || 'N\A');
                }
                catch(err) {
                   sectionsStatus = [];
                }

                return (sectionsStatus.length==0? 'N/A': sectionsStatus.length);
            }
        },
        {
            name: 'answers_not',
            type: 'number',
            convert:function(val, record)
            {
                var sectionsStatus = null;

                try {
                    sectionsStatus = Ext.JSON.decode(record.data.dataMovil.sectionsStatus || 'N\A');
                }
                catch(err) {
                   sectionsStatus = [];
                }
                
                var cant = 0;
                for(var i = 0; i<sectionsStatus.length; ++i)
                {
                    cant += sectionsStatus[i];
                }

                return (cant==0? 'N/A': cant);
            }
        }
    ],
    idProperty: '_id'
});
