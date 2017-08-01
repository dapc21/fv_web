Ext.define('LoadPrincipal.view.Templates.MapGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.MapGridAlias,
    requires: [
        'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.ListMulti',
        'LoadPrincipal.view.Generics.Map',
        'LoadPrincipal.view.Generics.FormFilter',
        'Ext.ux.ColumnAutoWidthPlugin'
//        'LoadPrincipal.view.Generics.WindowCreate'
    ],
    id: AppGlobals.MapGridId,
    border: false,
    frame: false,
//    title: 'Mapa grilla',
    layout: 'border',
    initComponent: function () {

      if(moduleConfig.lateralPanel == 'right') {
          panel = 'east';
      }else if(moduleConfig.lateralPanel == 'bottom') {
          panel = 'south';
      }else if(moduleConfig.lateralPanel == 'top') {
          panel = 'north';
      }else if(moduleConfig.lateralPanel == 'left') {
          panel = 'west';
      }else{
          panel = 'west';
      }

        this.items = [
//
            {
                region: 'center',
                xtype: 'panel',
                layout: 'fit',
                border: false,
                width: '100%',
                split: true,
                height: '50%',
                items: [
                    
                    {
                region        : panel,
                xtype         : 'panel',
                layout        : 'border',
                border        : false,
                split         : true,
                collapsible   : true,
                collapseMode  : 'mini',
                width         : '50%',
                height        : '50%',
                hideCollapseTool: true,
                preventHeader: true ,
                items : [
                    {
                        xtype: AppGlobals.mapAlias,
                        region: 'center',
                    },
                    {
                        title       : moduleConfig.filterTitle,
                        id: AppGlobals.filterId + 'pather',
                        titleCollapse: true,
                        //headerPosition: 'left',
                        collapseFirst: false,
                        region      : 'east',
                        collapsible : true,
                        margins     : '0 0 0 0',
                        xtype       : 'panel',
                        layout      : 'fit',
                        border      : false,
                        width       : '25%',
                        collapsed   : true,
                        //cls: 'mainPageAzulPanel',
                        items       : [
                            {
                                xtype: AppGlobals.filterAlias
                            }
                        ]
                    }
                ]
            }
                ]
            },
            {
                region        : 'south',
                xtype         : 'panel',
                layout        : 'border',
                border        : false,
                split         : true,
                collapsible   : true,
                collapseMode  : 'mini',
                width         : '50%',
                height        : '50%',
                hideCollapseTool: true,
                preventHeader: true ,
                items : [
                    {
                        xtype: AppGlobals.listAlias,
                        title: '',
                        cls: 'tracking-grid',
                        region: 'center',
                        stateful: true,
                        stateId: 'PlanningTrackingResourceGrid',
                    },
                    {
                        xtype: AppGlobals.listAlias + 0,
                        region:'south',
                        hidden:true,
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
