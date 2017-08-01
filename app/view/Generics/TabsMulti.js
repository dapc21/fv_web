var itemssub = [];
var tabPosition = 'left';
var tabButtons = [];
if(typeof(moduleConfig.subtabPosition) != 'undefined'){tabPosition = moduleConfig.subtabPosition}
if(typeof(moduleConfig.buttonButtons) != 'undefined'){tabButtons = moduleConfig.buttonButtons}
Ext.each(moduleConfig.subtab,function(value,index){
    var status = (value.disabled == true)? true : false;
    itemssub.push(
           {
                region: 'center',
                xtype: 'panel',
//                glyph: 53,
                layout: 'fit',
                border: false,
                disabled: status,
                width: '100%',
                title: value.name,
                items: [
                    {
                        xtype: value.alias
                    }
                ]
            }
    );
});
Ext.define('LoadPrincipal.view.Generics.TabsMulti', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.' + AppGlobals.tabsAlias + 'Multi',
    requires: [
//        'LoadPrincipal.view.Generics.List',
//        'LoadPrincipal.view.Generics.ListMulti',
//        'LoadPrincipal.view.Generics.FormMulti',
//        'LoadPrincipal.view.Generics.Form'
    ],
    id: AppGlobals.tabsId + 'Multi',
    border: false,
    frame: false,
    layout: 'border',
    tabPosition: tabPosition,
    plain: true,
    width: 1300,
    height: '100%',
    initComponent: function () {
        this.items = itemssub;
        this.buttons = tabButtons;

        this.callParent(arguments);
    }
});