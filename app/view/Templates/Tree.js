Ext.define('LoadPrincipal.view.' + AppGlobals.templates + '.Tree', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.TreeAlias,
    requires: [
//        'LoadPrincipal.view.Generics.Dashboard',
        'LoadPrincipal.view.Generics.Tree',
//        'LoadPrincipal.view.Generics.List',
    ],
    id: AppGlobals.TreeId,
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
                title: moduleConfig.tree.title,
                items: [
                    {
                        xtype: AppGlobals.treeAlias                        
                    }
                ]
            }

        ];

        this.callParent(arguments);
    }
});