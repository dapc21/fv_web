Ext.define('LoadPrincipal.view.Templates.MapFormList', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.MapFormListAlias,
    requires: [
        'LoadPrincipal.view.Generics.Form',
        'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.Map',
//        'LoadPrincipal.view.Generics.WindowCreate'
    ],
    id: AppGlobals.MapFormListId,
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
                layout: 'column',
                border: false,
                animCollapse: false,
                floatable: true,
                collapsible: false,
                resizable: true,
                collapsed: false,
                autoScroll: true,
                title: moduleConfig.form.title,
                width: '50%',
                items: [
                    {
                        columnWidth: 1,
                        layout: 'fit',
                        height: 250,
                        autoScroll: true,
                        xtype: AppGlobals.formAlias
                    },
                    {
                        xtype: 'panel',
                        columnWidth: 1,
                        layout: 'fit',
                        height: 290,
                        items: [
                            {
                                xtype: AppGlobals.listAlias,
                                height: '100%',
                            }
                        ]
                    }
                ]
            }

        ];

        this.callParent(arguments);
    }
});