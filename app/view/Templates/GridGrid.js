Ext.define('LoadPrincipal.view.Templates.GridGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.GridGridAlias,
    requires: [
      //  'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.ListMulti'//,
//        'LoadPrincipal.view.Generics.Map',
//        'LoadPrincipal.view.Generics.WindowCreate'
    ],
    id: AppGlobals.GridGridId,
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
                        xtype: AppGlobals.listAlias+0
                    }
                ]
            },
            {
                region: 'west',
                xtype: 'panel',
                layout: 'fit',
                border: false,
                animCollapse: false,
                floatable: true,
                collapsible: false,
                resizable: true,
                collapsed: false,
                width: '50%',
                items: [
                    {
                        xtype: AppGlobals.listAlias +'1'
                    }
                ]
            }

        ];

        this.callParent(arguments);
    }
});
