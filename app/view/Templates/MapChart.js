Ext.define('LoadPrincipal.view.Templates.MapChart', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.MapChartAlias,
    requires: [
        'LoadPrincipal.view.Generics.Chart',
        'LoadPrincipal.view.Generics.Map',
//        'LoadPrincipal.view.Generics.WindowCreate'
    ],
    id: AppGlobals.MapChartId,
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
                    }                    
                ]
            }

        ];

        this.callParent(arguments);
    }
});