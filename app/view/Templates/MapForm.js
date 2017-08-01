Ext.define('LoadPrincipal.view.Templates.MapForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.MapFormAlias,
    requires: [
        'LoadPrincipal.view.Generics.Form',
        'LoadPrincipal.view.Generics.Map',
//        'LoadPrincipal.view.Generics.WindowCreate'
    ],
    id: AppGlobals.MapFormId,
    border: false,
    frame: false,
//    title: 'Mapa grilla',
    layout: 'border',
    initComponent: function () {
        
        this.items = [
//            
            {
                region: 'center',
                xtype: 'panel',
                layout: 'fit',
                border: false,
                width: '100%',
                items: [
                    {
                        xtype: AppGlobals.mapAlias
                    }                    
                ]
            },
            {
                region: 'east',
                xtype: 'panel',
                layout: 'fit',
                border: false,
                animCollapse: false,
                floatable: true,
                collapsible: false,
                resizable: true,
                collapsed: false,
                title: moduleConfig.form.title,
                width: '50%',
                items: [
                    {
                        xtype: AppGlobals.formAlias
                    }
                ]
            }

        ];

        this.callParent(arguments);
    }
});