/**
 * Dynamic Template Tab panel
 * 
 * @xtype Ext.form.Panel
 * @requires 
 * @author Daniel Peña
 */

moduleConfig.itemsTabs = '';
Ext.define('LoadPrincipal.view.Templates.TabPanel', {
    extend   : 'Ext.form.Panel',
    alias    : 'widget.' + AppGlobals.TabPanelAlias,
    requires : [],
    id       : AppGlobals.TabPanelId,
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
                items       : moduleConfig.itemsTabs
            }
        ];
        this.callParent(arguments);
    }
});