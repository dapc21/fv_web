
if(typeof(moduleConfig.subwindow) != 'undefined'){
    Ext.each(moduleConfig.subwindow,function(value,genericIndex){
        var suffixName = (genericIndex > 0)? genericIndex : '' ;
        var buttons = [];

        if(typeof(value.bottomButtons) != 'undefined'){
            buttons = value.bottomButtons;
        }
        Ext.define('LoadPrincipal.view.Generics.WindowCreateMulti' + suffixName, {
            extend: 'Ext.window.Window',
            alias: 'widget.' + AppGlobals.windowAlias + genericIndex,
            requires: ['LoadPrincipal.view.Generics.Form'],
            id: AppGlobals.windowId + genericIndex,
            title: 'Crear / Modificar',
            plain: true,
            frame: true,
            closable: true,
            resizable: (value.resizable)?true:false,
            collapsed: false,
            draggable: false,
            closeAction: 'destroy',
            width: (value.width)?value.width:'70%',
            height: (value.height)?value.height:'70%',
            bodyStyle: 'padding: 5px;',
            layout: 'border',
            initComponent: function() {
                var win = this;
                this.items = [
                    {
                        region: 'center',
                        xtype: 'panel',
                        layout: 'fit',
                        height: '80%',
                        items: [
                            {
                                xtype: value.formAlias
                            }
                        ]
                    }
                ];
                this.buttons = buttons;
                this.callParent();
            }
        });
    });
    
}