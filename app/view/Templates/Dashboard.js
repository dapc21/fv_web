Ext.define('LoadPrincipal.view.' + AppGlobals.templates + '.Dashboard', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.DashboardAlias,
    requires: [
        'LoadPrincipal.view.Generics.Dashboard',
        'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.Form'
    ],
    id: AppGlobals.DashboardId,
    border: false,
    frame: false,
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
                title: moduleConfig.dashboard.title,
                items: [
                    {
                        xtype: AppGlobals.dashboardAlias
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
                width: '30%',
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