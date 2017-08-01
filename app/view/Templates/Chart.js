Ext.define('LoadPrincipal.view.Templates.Chart', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.ChartAlias,
    requires: [
//        'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.Chart',
//        'LoadPrincipal.view.Generics.WindowCreate'
    ],
    id: AppGlobals.ChartId,
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
                title: moduleConfig.chart.title,
                width: '100%',
                items: [
                    {
                        xtype: AppGlobals.chartAlias                    
                    }
                ]
            }

        ];
        this.dockedItems = [
            {
                dock: 'bottom',
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        store: this.store,
                        displayInfo: true,
                        displayMsg: 'Registros {0} - {1} de {2}',
                        emptyMsg: 'No hay información',
                        items: moduleConfig.chart.bottomButtons
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});