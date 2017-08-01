Ext.define('LoadPrincipal.model.FileProcessor.ListProcess', {
    extend: 'Ext.data.Model',
    fields: ['id_process', 'file.name', 'object.name','object.id_object','status','new','duplicated','errors','total','created_at','updated_at',
        {
            name: 'processed',
            convert: function(value, record) {
                
                return value ;
            }
        }
    
    ],
         idProperty: 'id_process'
});