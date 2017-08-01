/**
 * Generic grid form to be filled according data in the moduleConfig object
 * 
 * @xtype Ext.grid.Panel
 * @requires LoadPrincipal.views.Templates.Grid
 */
var store = Ext.create('Ext.data.TreeStore', {
     proxy: {
        type: 'ajax',
        dataType: 'json',
        url: 'server/dummy/tree-get-nodes.php',
        extraParams: {
            path: 'extjs'
        }
    },
    root: {
        text: 'Ext JS',
        id: 'src',
        expanded: true
    },
    folderSort: true,
    sorters: [{
        property: 'text',
        direction: 'ASC'
    }]
//    root: {
//        text: 'Root',
//        expanded: true,
//        children: [
//            {
//                id: 'Child1',
//                text: 'Child 1',
//                leaf: true
//            },
//            {
//                id: 'Child2',
//                text: 'Child 2',
//                expand: true,
//                children: [
//                    {
//                        id: 'Child2-1',
//                        text: 'SubChild 1',
//                        leaf: true
//                    },
//                ]
//            },            
//            {
//                id: 'Child3',
//                text: 'Child 3',
//                expand: true,
//                children: [
//                    {
//                        id: 'Child3-1',
//                        text: 'SubChild 1',
//                        leaf: true
//                    },
//                ]
//            },            
//            {
//                id: 'Child4',
//                text: 'Child 4',
//                expand: true,
//                children: [
//                    {
//                        id: 'Child4-1',
//                        text: 'SubChild 1',
//                        expand: true,
//                        children: [
//                            {
//                                id: 'Child4-2',
//                                text: 'SubChild 11',
//                                leaf: true
//                            },
//                        ]
//                    },
//                ]
//            },            
//            {
//                id: 'Child5',
//                text: 'Child 5',
//                expand: true,
//                children: [
//                    {
//                        id: 'Child5-1',
//                        text: 'SubChild 1',
//                        leaf: true
//                    },
//                ]
//            },            
//        ]
//    }
});
Ext.define('LoadPrincipal.view.Generics.Tree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.' + AppGlobals.treeAlias,
    id: AppGlobals.treeId,
    xtype: 'tree-reorder',
//    store: controller + '.List',
    store: store,
    layout: 'fit',
    loadMask: true,
    height: '100%',
    multiSelect: true,
//    selType: 'checkboxmodel',
//    selModel: {
//        checkOnly: false,
//        injectCheckbox: moduleConfig.tree.checkboxIndex
//    },
    margin: '0, 5, 0, 5',
    title: moduleConfig.tree.title,
    viewConfig: {
        forceFit: true,
        enableTextSelection: true
    },
    /**
     * To specific the columns and docked items, plese verify de config file
     * 
     */
    initComponent: function () {
        Ext.apply(this, {
            store: new Ext.data.TreeStore({
                proxy: {
                    type: 'ajax',
                    url: 'server/dummy/tree-get-nodes.php',
                    extraParams: {
                        values: 'extjs'
                    }
                },
                root: {
                    text: 'Ext JS',
                    id: 'src',
                    expanded: true
                },
                folderSort: true,
                sorters: [{
                    property: 'text',
                    direction: 'ASC'
                }]
            }),
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    containerScroll: true
                }
            },
        });
        this.columns = moduleConfig.tree.columns;
        this.callParent();
    },
    
});