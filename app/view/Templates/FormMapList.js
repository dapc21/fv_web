Ext.define('LoadPrincipal.view.Templates.FormMapList', 
{
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.FormMapListAlias,
    requires: [
        'LoadPrincipal.view.Generics.Form',
        'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.Map',
    ],
    id: AppGlobals.FormMapListId,
    border: false,
    frame: false,
    layout: 'border',
    initComponent: function () 
    {    
        this.items = [          
            {
                region: 'center',
                xtype: 'panel',
                layout: 'column',
                border: false,
                width: '100%',
                height: '50%',
                items: [
                    {
                        columnWidth: 1,
                        layout: 'fit',
                        autoScroll: true,
                        height: '100%',
                        xtype: AppGlobals.formAlias
                    },
                    {
                        xtype: 'panel',
                        columnWidth: 1,
                        layout: 'fit',
                        height: '100%',
                        items: [
                            {
                                xtype: AppGlobals.mapAlias,
                            }
                        ]
                    }
                ],
                
            },
            {
                region: 'south',
                xtype: 'panel',
                layout: 'fit',
                border: false,
                width: '100%',
                height: '50%',
                items: [
                    {
                        xtype: AppGlobals.listAlias,
                    },                    
                ]
            }

        ];
        console.log('Cargando el template PC: ', AppGlobals.FormMapListAlias);
        this.callParent(arguments);
    }
});