var items = [];
Ext.each(moduleConfig.tab,function(value,index){
    var status = (value.disabled == true)? true : false;
    items.push(
           {
                region: 'center',
                xtype: 'panel',
//                glyph: 53,
                layout: 'fit',
                border: false,
                id: value.id,
                disabled: status,
                width: '100%',
                tabBar: {
                    layout: { pack: 'end' }
                },
                title: value.name,
                items: [
                    {
                        xtype: value.alias
                    }
                ]
            }
    );
});
Ext.define('LoadPrincipal.view.Generics.Tabs', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.' + AppGlobals.tabsAlias,
    requires: [
        'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.ListMulti',
        'LoadPrincipal.view.Generics.FormMulti',
        'LoadPrincipal.view.Generics.Form',
        'LoadPrincipal.view.Generics.TabsMulti'
    ],
    id: AppGlobals.tabsId,
    border: false,
    frame: false,
    layout: 'border',
    plain: true,
    
    
    initComponent: function () {
        this.items = items;
        this.buttons = moduleConfig.tabs.bottomButtons;
        this.callParent(arguments);
    }
});