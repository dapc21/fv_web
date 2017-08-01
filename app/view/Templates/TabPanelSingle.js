/**
 * Dynamic Template Tab panel Single
 * 
 * @xtype Ext.form.Panel
 * @requires 
 * @author Daniel Peña
 */

var itemsTabs = [];

if(typeof(moduleConfig.tab) != 'undefined'){
    var tabs = moduleConfig.tab;
    var len = tabs.length;
    if(len > 0) {
        Ext.each(tabs, function(value, index) {
            itemsTabs.push(
                {
                    title       : value.name,
                    closable    : false,
                    layout      : 'border',
                    disabled    : value.disabled,
                    items       : value.items
                }
            );
        });
    }

}

Ext.define('LoadPrincipal.view.Templates.TabPanelSingle', {
    extend   : 'Ext.form.Panel',
    alias    : 'widget.' + AppGlobals.TabPanelSingleAlias,
    requires : [],
    id       : AppGlobals.TabPanelSingleId,
    border   : false,
    frame    : false,
    layout   : 'border',
    initComponent : function () {
        this.items = [
            {
                region      : 'center',
                xtype       : 'tabpanel',
                layout      : 'fit',
                border      : false,
                width       : '75%',
                activeTab   : 0,
                plain       : true,
                defaults    : {
                    bodyPadding : 10
                },
                items       : itemsTabs
            }
        ];
        this.callParent(arguments);
    }
});