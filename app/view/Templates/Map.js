Ext.define('LoadPrincipal.view.' + AppGlobals.templates + '.Map', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.MapAlias,
    requires: [
//        'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.Map',
        'LoadPrincipal.view.Generics.WindowCreate'
    ],
    id: AppGlobals.MapId,
    border: false,
    frame: false,
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
                        xtype: AppGlobals.mapAlias
                    }
                ]
            }

        ];

        this.callParent(arguments);
    }
});