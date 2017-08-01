var panel = 'west';
switch (moduleConfig.lateralPanel) {
    case 'right':
        panel = 'east';
        break;
    case 'bottom':
        panel = 'south';
        break;
    case 'top':
        panel = 'north';
        break;
}

var items = [
    {
        title       : moduleConfig.filterTitle,
        region      : 'west',
        id          : 'filterPanel',
        collapsible : true,
        margins     : '0 5 0 0',
        xtype       : 'panel',
        layout      : 'fit',
        border      : false,
        width       : '25%',
        items       : [
            {
                xtype: AppGlobals.filterAlias
            }
        ],
        listeners   : {
            'beforerender' : function(panel)
            {
                if(controller == 'Companies') {
                    Ext.ComponentQuery.query('#filterPanel')[0].collapse();
                } /*else {
                    Ext.ComponentQuery.query('#filterPanel')[0].expand();
                }*/
            }
        }
    },
    {
        region      : 'center',
        xtype       : 'panel',
        layout      : 'fit',
        border      : false,
        width       : '75%',
        items       : [
            {
                xtype: AppGlobals.listAlias
            }
        ]
    }
];
var collapse = (typeof(moduleConfig.formPanel) != 'undefined' && moduleConfig.formPanel.frozen == true)?false:true;
if(typeof(moduleConfig.formPanel) != 'undefined' && moduleConfig.formPanel.render){
    items.push(
        {
            region       : panel,
            xtype        : 'panel',
            id           : 'idLateralPanel',
            layout       : 'fit',
            border       : true,
            animCollapse : false,
            floatable    : true,
            frame        : false,
            collapsible  : true,
            collapsed    : collapse,
            width        : '100%',
            title        : moduleConfig.formPanel.title,
            items        : [
                {
                    xtype  : moduleConfig.formPanel.alias
                },
                {
                    xtype  : moduleConfig.formPanel.hiddenPanelAlias,
                    hidden : true
                }
            ]
        }
    );
}
Ext.define('LoadPrincipal.view.Templates.Grid', 
{
    extend   : 'Ext.form.Panel',
    alias    : 'widget.' + AppGlobals.gridAlias,
    requires : [
        'LoadPrincipal.view.Generics.List',
        'LoadPrincipal.view.Generics.FormFilter',        
        'LoadPrincipal.view.Generics.WindowCreate'
    ],
    id     : AppGlobals.gridId,
    border : false,
    frame  : false,
    layout : 'border',
    initComponent: function () 
    {
        this.items = items;

        this.callParent(arguments);
    }
});