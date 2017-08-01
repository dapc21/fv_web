var buttons = [];

if(typeof(moduleConfig.window.bottomButtons) != 'undefined'){
    buttons = moduleConfig.window.bottomButtons;
}

Ext.define('LoadPrincipal.view.Generics.WindowCreate', {
    extend      : 'Ext.window.Window',
    requires    : [
        'LoadPrincipal.view.Generics.Form'
    ],
    id          : AppGlobals.windowId,
    title       : 'Crear/Modificar',
    alias       : 'widget.' + AppGlobals.windowAlias,
    modal       : true,
    width       : (moduleConfig.window.width)?moduleConfig.window.width:'70%',
    height      : (moduleConfig.window.height)?moduleConfig.window.height:'70%',
    minWidth    : (moduleConfig.window.width)?moduleConfig.window.width:'70%',
    minHeight   : (moduleConfig.window.height)?moduleConfig.window.height:'70%',
    layout      : 'fit',
    resizable   : (moduleConfig.window.resizable)?true:false,
    draggable   : false,
    closeAction : 'destroy',
    autoDestroy : true,
    initComponent : function() {
        var win = this;
        this.items = [
            {
                region : 'center',
                xtype  : 'panel',
                layout : 'fit',
                height : '80%',
                items  : [
                    {
                        xtype: AppGlobals.formAlias
                    }
                ]
            }
        ];
        this.buttons = buttons;
        this.callParent();
    }
});