Ext.define('LoadPrincipal.view.' + AppGlobals.templates + '.Tabs', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.TabsAlias,
    requires: [
        'LoadPrincipal.view.Generics.Tabs',
        'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.ListMulti',
        'LoadPrincipal.view.Generics.FormMulti',
        'LoadPrincipal.view.Generics.Form',
        'LoadPrincipal.view.Generics.TabsMulti'
    ],
    id: AppGlobals.TabsId,
    border: false,
    frame: false,
    layout: 'border',
    plain: true,
    
    
    initComponent: function () {
        this.items = [
            {
                region: 'center',
                xtype: 'panel',
                layout: 'fit',
                border: false,
                width: '100%',
                items: [
//                    {
//                        xtype: AppGlobals.tabsAlias
//                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});