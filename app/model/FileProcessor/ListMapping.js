Ext.define('LoadPrincipal.model.FileProcessor.ListMapping', {
    extend: 'Ext.data.Model',
    fields: ['id_column', 'sql_name', 'label_name','label_type','size','is_unique','is_mandatory','default'],
         idProperty: 'id_column'
});