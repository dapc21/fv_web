Ext.define('LoadPrincipal.view.' + AppGlobals.templates + '.TreeGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.TreeGridAlias,
    requires: [
        'LoadPrincipal.view.Generics.Tree',
        'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.WindowCreate'
    ],
    id: AppGlobals.TreeGridId,
    border: false,
    frame: false,
    layout: 'border',
    plain: true,
    initComponent: function () {
        this.items = [
//            
            {
                region: 'center',
                xtype: 'panel',
                layout: 'fit',
                border: false,
                width: '100%',
//                title: moduleConfig.dashboard.title,
                items: [
                    {
                        xtype: AppGlobals.treeAlias                        
                    }
                ]
            },
            {
                region: 'east',
                xtype: 'panel',
                layout: 'fit',
                border: false,
                width: '50%',
//                title: moduleConfig.dashboard.title,
                items: [
                    {
                        xtype: AppGlobals.listAlias                        
                    }
                ]
            }

        ];

        this.callParent(arguments);
    }
});