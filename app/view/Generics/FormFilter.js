Ext.define('LoadPrincipal.view.Generics.FormFilter', {
    extend         : 'Ext.form.Panel',
    alias          : 'widget.' + AppGlobals.filterAlias,
    id             : AppGlobals.filterId,
    frame          : false,
    autoScroll     : true,
    margin         : '5 5 5 5',
    height         : '100%',
    border         : false,
    fieldDefaults  : {
        labelAlign : 'top',
        msgTarget  : 'under'
    },
    listener       : {
        'collapse' : function () {
            //alert("handler collap")
        }
    },
    initComponent: function () {
        this.items = moduleConfig.filterForm;
        this.buttons = [
            {
                text   : 'Limpiar Filtros',
                id     : 'clearFilters',
                action : 'clearFilters',
                style:{
                    background: '#1fbad6',
                    border: '1px solid #fff',  
                },
            }
        ];
        this.callParent(arguments);
    }
});