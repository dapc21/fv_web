Ext.define('LoadPrincipal.model.' + controller + '.ListRegisters', 
{
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', mapping: '_id', type: 'string'},
		{name: 'arrival_time',  type: 'auto'},
		{name: 'created_at',  type: 'auto'},
		{name: 'dataMovil',  type: 'auto'},
		{name: 'dataWeb',  type: 'auto'},
		{name: 'id_company',  type: 'auto'},
        {name: 'id_form', type: 'auto'},
		{name: 'id_formType', type: 'auto'},
		{name: 'id_resourceInstance', type: 'auto'},
		{name: 'id_task', type: 'auto'},
		{name: 'id_user_create', type: 'auto'},
		{name: 'id_user_update', type: 'auto'},
		{name: 'localId', type: 'auto'},
		{name: 'login', type: 'auto'},
		{name: 'resourceInstance', type: 'auto'},
		{name: 'task', type: 'auto'},
		{name: 'updated_at', type: 'auto'},
    ],
    idProperty: '_id'
});
