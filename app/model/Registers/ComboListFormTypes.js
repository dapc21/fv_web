Ext.define('LoadPrincipal.model.' + controller + '.ComboListFormTypes', 
{
    extend: 'Ext.data.Model',
    fields: [
        {name: '_id', mapping: '_id', type: 'string'},
		{name: 'name',  type: 'auto'},
		{name: 'sections',  type: 'auto'},
    ],
    idProperty: '_id'
});
