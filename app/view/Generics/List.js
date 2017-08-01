if(Ext.isEmpty(moduleConfig.grid.listPlugins))
{
    moduleConfig.grid.listPlugins = [];
}

Ext.define('LoadPrincipal.view.Generics.List', 
{
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + AppGlobals.listAlias,
    id: AppGlobals.listId,
    store: controller + '.List',
    layout: 'fit',
    loadMask: true,
    height: '100%',
    multiSelect: true,
    selType: (moduleConfig.grid.checkbox)?'checkboxmodel':'rowmodel',
    selModel: {
        checkOnly: false,
        injectCheckbox: moduleConfig.grid.checkboxIndex
    },
    //margin: '0 5 0 5',
    title: moduleConfig.grid.title,
    viewConfig: {
        forceFit: true,
        enableTextSelection: true,
        listeners: 
        {
            refresh: function(dataview) 
            {
                var columns = dataview.panel.columnManager.getColumns();

                Ext.each(
                    columns, 
                    function(column, index) 
                    {
                        if (column.autoSizeColumn === true)
                        {   
                            try {
                                column.autoSize();    
                            } catch (error) {
                                //console.log('Error:', error);
                            }
                        }
                    }
                );
            }
        }
    },
    //Agregamos los plugins
    plugins: moduleConfig.grid.listPlugins,
    /**
     * To specific the columns and docked items, plese verify de config file
     *
     */
    initComponent: function () 
    {
        
        
        this.columns = moduleConfig.grid.columns;

        if((typeof moduleConfig.grid.pagingToolbar == 'undefined') ? true : moduleConfig.grid.pagingToolbar){
          this.pagingToolbarItems = moduleConfig.grid.pagingToolbarItems;
          this.dockedItems = [
              {
                  dock: 'bottom',
                  items: [
                      {
                          xtype: 'pagingtoolbar',
                          store: this.store,
                          displayInfo: true,
                          displayMsg: 'Registros {0} - {1} de {2}',
                          emptyMsg: 'No hay información',
                          items: this.pagingToolbarItems
                      }
                  ]
              }
          ];
        }

        
        this.callParent(arguments);
    }
});
