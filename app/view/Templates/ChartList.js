Ext.define('LoadPrincipal.view.Templates.ChartList', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.ChartListAlias,
    requires: [
        'LoadPrincipal.view.Generics.Chart',
        'LoadPrincipal.view.Generics.List',
//        'LoadPrincipal.view.Generics.WindowCreate'
    ],
    id: AppGlobals.ChartListId,
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
                layout: 'column',
                border: false,
                animCollapse: false,
                floatable: true,
                collapsible: false,
                resizable: true,
                collapsed: false,
                autoScroll: true,
                title: moduleConfig.chart.title,
                width: '50%',
                items: [
                    {
                        columnWidth: 1,
                        layout: 'fit',
                        height: 250,
                        autoScroll: true,
                        xtype: AppGlobals.chartAlias 
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