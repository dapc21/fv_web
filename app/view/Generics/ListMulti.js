/**
 * Generic grid form to be filled according data in the moduleConfig object
 *
 * @xtype Ext.grid.Panel
 * @requires LoadPrincipal.views.Templates.Grid
 */
if(typeof(moduleConfig.subgrid) != 'undefined'){
    Ext.each(moduleConfig.subgrid,function(value,genericIndex,values){
        var suffixName = (genericIndex > 0)? genericIndex : '' ;
        Ext.define('LoadPrincipal.view.Generics.ListMulti' + suffixName, {
            extend: 'Ext.grid.Panel',
            alias: 'widget.' + AppGlobals.listAlias + genericIndex,
            id: AppGlobals.listId + genericIndex,
        //    store: controller + '.List',
            store: value.store,
            layout: 'fit',
            loadMask: true,
            height: '100%',
            multiSelect: true,
            selType: (moduleConfig.subgrid[genericIndex].checkbox)?'checkboxmodel':'rowmodel',
            selModel: {
                checkOnly: false,
                injectCheckbox: moduleConfig.subgrid[genericIndex].checkboxIndex
            },
            margin: '0, 5, 0, 5',
            title: moduleConfig.subgrid[genericIndex].title,
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
            /**
             * To specific the columns and docked items, plese verify de config file
             *
             */
            initComponent: function () {
                this.columns = moduleConfig.subgrid[genericIndex].columns;
                if((typeof moduleConfig.subgrid[genericIndex].pagingToolbar == 'undefined') ? true : moduleConfig.subgrid[genericIndex].pagingToolbar){
                    this.pagingToolbarItems = moduleConfig.subgrid[genericIndex].pagingToolbarItems;
                    this.dockedItems = [
                        {
                            dock: 'bottom',
                            id: 'idDockBottom' + AppGlobals.listId + genericIndex ,
                            items: [
                                {
                                    xtype: 'pagingtoolbar',
                                    id: AppGlobals.listId + genericIndex + 'PagingToolbar',
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
    });
}
