Ext.define('LoadPrincipal.view.Templates.MapGridPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.MapGridPanelAlias,
    requires: [
        'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.Map',
    ],
    id: AppGlobals.MapGridPanelId,
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
                layout: 'border',
                border: false,
                width: '100%',
                items: [
                    {
                        xtype: AppGlobals.mapAlias,
                        region: 'center',
                        border: true,
                    },
                    {
                        xtype: 'panel',
                        region: 'south',
                        height: 300,
                        collapsible: true,
                        collapsed: true
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
                width: '40%',
                height: 300,
                items: [
                    {
                        xtype: AppGlobals.listAlias,
                        width: '100%'
                    }
                ]
            }/*,
            {
                region: 'south',
                xtype: 'panel',
                layout: 'fit',
                border: false,
                animCollapse: false,
                floatable: true,
                collapsible: false,
                resizable: true,
                collapsed: false,
                //width: '50%',
                height: 300,
                items: [
                    {
                        xtype: AppGlobals.listAlias+'1'
                    }
                ]
            }*/

        ];

        this.callParent(arguments);
    }
});
