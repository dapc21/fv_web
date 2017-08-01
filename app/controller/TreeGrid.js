Ext.define('LoadPrincipal.controller.' + controller, {
    extend: 'LoadPrincipal.controller.Core',
    models: [
//        controller + '.ListCombo',
//        controller + '.List'
    ],
    stores: [
//        controller + '.ListCombo',
//        controller + '.List'
    ],
    views:  [
//        controller + '.ConnectorList',
//         'Generics.WindowCreate'
    ],
    refs: [],
    init: function() {
        var win;
         var win2;
        /**
         * call index view
         */
        this.render(moduleConfig.template);
//        this.postInit();
        /**
         * Load files system basic
         */
        this.loadSystem("menu");
        this.addListButtons();
        this.addTreeButtons();
        /**
         * Listeners
         */
        this.multiSearch();
        this.control(
            {
                /**
                 * Show te contextmenu
                 */
                'AliasTreeGridList': {
                    itemcontextmenu: this.listContextualMenu,
                },
                'AliasTreeGridtree': {
                    itemcontextmenu: this.treeContextualMenu,
                    itemclick: this.alert
                },
                
                
                /**
                 * Clear filters
                 */
                'AliasTreeGridFilter button[action=clearFilters]': {
                    click: this.clearFilters
                },
                'AliasTreeGridFilter button[action=clearFilter]': {
                    click: this.clearFilter
                },
                'AliasTreeGridList button[action=clearFilter]': {
                    click: this.clearFilter
                },
                /**
                 * Filters
                 */
                '#listSearchKeyword': {
                    keyup: this.multiSearch
                },
                
                /**
                 * Buttons
                 */
                'menuitem[action=TreeGridContextualTreeAddChild]': {
                    click: this.addNode
                },
                'AliasTreeGridWindow button[action=WindowCancelButton]': {
                    click: this.onFormCancel
                },
                
                
                
                /**
                 * Excel
                 */
                'AliasTreeGridList button[action=exportXls]': {
                    click: this.exportxls
                },
                'AliasTreeGridList button[action=TreeGridListCreate]': {
                    click: this.exportxls
                }
            }
        );
    },
    addNode: function(button){
        var aTree = Ext.getCmp(AppGlobals.treeId);
        var node = aTree.getSelectionModel().getSelection();
        var depth = node[0].data.depth;
        if(depth < 3){
            if(depth <= 1){
                moduleConfig.form.items = moduleConfig.form.child1;
                testerObj.storeRule({'form':moduleConfig.form.child1});
            }else if(depth == 2){
                moduleConfig.form.items = moduleConfig.form.child2;
                testerObj.storeRule({'form':moduleConfig.form.child2});
            }
            this.openModalWindow(button);
            
            console.log(node[0].data)
            Ext.getCmp(controller + 'FormParent').setValue(node[0].data.text)
        }else{
            Ext.MessageBox.show({
                title: 'Restricción de nodos',
                msg:  'Límite de profundidad de árbol alcanzado<br/><br/>',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },
    
    multiSearch: function () {
        /**
         * Get Store
         */
//        var store = this.getTreeGridListStore();
//
//        /**
//         * field search
//         */
//        var name = '';
//        var action = '';
//        var section = '';
//        var start = '';
//        var end = '';
//        /**
//         * Json filter
//         */
//        var jsonObj = new Object();
//        jsonObj.func = moduleConfig.serviceTreeGridList;
//        jsonObj.filter = [];
//        
//        if (name !='') {
//            jsonObj.filter.push(
//                    {
//                        field: 'id_user',
//                        comparison: 'eq',
//                        value: name
//                    }
//            );
//        }
//        if (action > 0) {
//            jsonObj.filter.push(
//                    {
//                        field: 'id_audit_action',
//                        comparison: 'eq',
//                        value: action
//                    }
//            );
//        }
//        if (section > 0) {
//            jsonObj.filter.push(
//                    {
//                        field: 'id_audit_section',
//                        comparison: 'eq',
//                        value: section
//                    }
//            );
//        }
//        
//        if (start !='' && start >0) {
//            jsonObj.filter.push(
//                    {
//                        field: 'created_at',
//                        comparison: 'gte',
//                        value: Ext.Date.format(start, 'Y-m-d')
//                    }
//            );
//        }
//        if (end !='' && end >0) {
//            jsonObj.filter.push(
//                    {
//                        field: 'created_at',
//                        comparison: 'lte',
//                        value: Ext.Date.format(end, 'Y-m-d')+ ' 23:59:59'
//                    }
//            );
//        }
//        
//
//        jsonObj.resp = 'web';
//        jsonObj.limit = moduleConfig.listPageSize;
//        jsonObj.sort = [
//            {
//                property: 'id_audit',
//                direction: 'desc'
//            }
//        ];
//        jsonObj.relations = ["user","auditsection","auditaction"];
//        moduleConfig.exportFilter = jsonObj;
//        Ext.Ajax.abort(store.proxy.activeRequest);
//        store.proxy.extraParams = {
//            values: Ext.JSON.encode(jsonObj)
//        };
//
//        var o = {start: "0", page: "1"};
//        store.loadPage(1);
    },
    
    openModalWindowLocal: function(button){
        console.log('mapatal')
        alert('ingresa al controller principal');
//        var obj = this;
//        this.loadScript('app/controller/TreeGrid.js',function(){
//            
//            obj.loadComponent('TreeGrid')
//        })
        
    }
    
});