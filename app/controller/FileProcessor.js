var okTab = [];
var headersArray = [];
var dataArray = [];
var mandatoryFields = [];
var mandatoryNames = [];
Ext.define('LoadPrincipal.controller.' + controller, {
    extend: 'LoadPrincipal.controller.Core',
    models: [
        controller + '.ListComboModule',
        controller + '.ListComboStoredMapping',
        controller + '.ListComboFileType',
        controller + '.ListComboEncoding',
        controller + '.ListComboSeparator',
        controller + '.ListProcess',
        controller + '.ListInserted',
        controller + '.ListDuplicated',
        controller + '.ListError',
        controller + '.ListMapping',
        controller + '.List'
    ],
    stores: [
        controller + '.ListComboModule',
        controller + '.ListComboStoredMapping',
        controller + '.ListComboFileType',
        controller + '.ListComboEncoding',
        controller + '.ListComboSeparator',
        controller + '.ListProcess',
        controller + '.ListInserted',
        controller + '.ListDuplicated',
        controller + '.ListError',
        controller + '.ListMapping',
        controller + '.List'
    ],
    views:  [
//        controller + '.ConnectorList',
//         'Generics.WindowCreate'
    ],
    refs: [],
    init: function() {
        var obj = this;
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
//        this.addFileProcessorButtons();
        /**
         * Listeners
         */
        this.multiSearch();
        this.control(
            {
                /**
                 * Show te contextmenu
                 */
                'AliasFileProcessortabs': {
                    tabchange: this.tabChangeValidation
                }
                
                
            }
        );
        
        /**
         * tabs buttons
         */
        this.control(
            {
                /**
                 * Show te contextmenu
                 */
                'AliasFileProcessortabs button[action=FileProcessorNextTab]': {
                    click: this.nextTab
                },
                'AliasFileProcessortabs button[action=FileProcessorPrevTab]': {
                    click: this.prevTab
                },
                'AliasFileProcessortabs button[action=FileProcessorProcess]': {
                    click: this.processFile
                },
                'AliasFileProcessortabs button[action=FileProcessorCommit]': {
                    click: this.commitRows
                },
                'AliasFileProcessortabs button[action=FileProcessorRollback]': {
                    click: this.rollbackRows
                }
                
                
            }
        );
        /**
         * From tab 1
         */
        this.control(
            {
                /**
                 * Show te contextmenu
                 */
                'AliasFileProcessorForm2 combobox[id=FileProcessorFormModule]': {
                    change: this.moduleSelection
                }             
            }
        );
        /**
         * From tab 2
         */
        this.control(
            {
                /**
                 * file type selection, activate file details
                 */
                'AliasFileProcessorForm combobox[id=FileProcessorFormFiletype]': {
                    change: this.fileSelection
                }
            }
        );
        
        /**
         * From tab 3
         */
        this.control(
            {
                /**
                 * file selection
                 */
                'AliasFileProcessorForm1 filefield[id=file]': {
                    change  : this.csvSelection
                }
                            
            }
        );
        /**
         * From tab 4
         */
        this.control(
            {
                /**
                 * file type selection, activate file details
                 */
                'AliasFileProcessorForm3 combobox[id=FileProcessorFormStoresMappings]': {
                    change: this.mappingSelection,
                    beforequery: this.mappingQuery
                }            
            }
        );
        /**
         * From tab 5
         */
        this.control(
            {
                /**
                 * file type selection, activate file details
                 */
                'AliasFileProcessorList2': {
                    itemresults: this.viewResults
                }            
            }
        );
        /**
         * From tab 6
         */
        this.control(
            {
                /**
                 * file type selection, activate file details
                 */
                'AliasFileProcessorList3': {
                    discard: this.discardRow,
                    overwrite: this.overwriteRow
                }            
            }
        );
        this.getStore(controller + '.ListDuplicated').addListener('beforeload',
                this.reconfigureDuplicated,
        this);
        this.getStore(controller + '.ListInserted').addListener('beforeload',
                this.reconfigureInserted,
        this);
    },
    alert: function(){
        alert('ingresa a funcion');
    },
    /**
     * disable next button
     * @param {Object} button
     */
    disableNextButton: function(button){
        this.changeStatusNextButton(true);
    },
    enableNextButton: function(button){
        this.changeStatusNextButton(false);
    },
    changeStatusNextButton: function(status){
        Ext.getCmp(controller + 'NextTab').setDisabled(status);
    },
    /**
     * Sets next tab available and change to it
     * @param {Object} button
     */
    nextTab: function(button){
        var tab = Ext.getCmp(AppGlobals.tabsId);
        var activeTab = tab.getActiveTab();
        var nextTab = activeTab.next('panel');
        if (nextTab) {
            
            nextTab.setDisabled(false);
            tab.setActiveTab(nextTab);
            this.disableNextButton();
            this.tabValidation(nextTab.id);
        }
    },
    
    /**
     * Sets previous tab available and change to it
     * @param {Object} button
     */
    prevTab: function(button){
        var tab = Ext.getCmp(AppGlobals.tabsId);
        var activeTab = tab.getActiveTab();
        var prevTab = activeTab.prev('panel');
        if (prevTab) {
            prevTab.setDisabled(false);
//            this.tabValidation(prevTab.id)
            tab.setActiveTab(prevTab);
        }
    },
    /**
     * Trigger validation from tab change
     * @param {Object} tab
     */
    tabChangeValidation: function (tab){
        this.tabValidation(tab.getActiveTab().id);
    },
    /**
     * Validate form status and specific cases in each tab
     * @param {String} tabId
     */
    tabValidation: function (tabId){
        Ext.getCmp('FileProcessorCommit').hide();
        Ext.getCmp('FileProcessorRollback').hide();
        Ext.getCmp('FileProcessorProcess').hide();
        Ext.getCmp('FileProcessorNextTab').show();
        Ext.getCmp('FileProcessorPrevTab').show();
        switch(tabId){
            case 'FileProcessorModule':
                this.tabNextEnabler('Tab1');
                Ext.getCmp('FileProcessorPrevTab').hide();
                break;
            case 'FileProcessorConfig':
                this.tabPusher('Tab1');
                this.tabNextEnabler('Tab2');
                break;
            case 'FileProcessorSelectFile':
                this.tabPusher('Tab2');
                this.tabNextEnabler('Tab3');
                break;
            case 'FileProcessorMapping':
                this.tabPusher('Tab3');
                Ext.getCmp('FileProcessorProcess').show();
                Ext.getCmp('FileProcessorNextTab').hide();
                Ext.getCmp('FileProcessorPrevTab').hide();
                
                this.tabNextEnabler('Tab4');
                break;
            case 'FileProcessorProgress':
                this.tabPusher('Tab4');
                Ext.getCmp('FileProcessorNextTab').hide();
                Ext.getCmp('FileProcessorPrevTab').hide();
                break;
            case 'FileProcessorResults':
                Ext.getCmp('FileProcessorNextTab').hide();
                Ext.getCmp('FileProcessorPrevTab').hide();
                Ext.getCmp('FileProcessorCommit').show();
                Ext.getCmp('FileProcessorRollback').show();
                break;
            default :
                Ext.getCmp('FileProcessorNextTab').show();
                Ext.getCmp('FileProcessorPrevTab').show();
                break;
        }
    },
    /**
     * Add new tab to okTab array
     * @param {String} tab
     */
    tabPusher: function(tab){
        if(okTab.indexOf(tab) == -1){
            okTab.push(tab);
        }
    },
    /**
     * Evaluate current tab in the okTab array and enable next button
     * @param {String} tab
     */
    tabNextEnabler: function(tab){
        if(okTab.indexOf(tab) > -1){
            this.enableNextButton();
        }else{
            this.disableNextButton();            
        }
    },
    /**
     * Reconfigure the fields table, and enable next button
     */
    moduleSelection: function(){
        var moduleId = Ext.getCmp(controller + 'FormModule').getValue();
        var descStore = Ext.getCmp(AppGlobals.listId).getStore();
        var proxy = descStore.getProxy();
        var preffix = proxy.url.indexOf('objects/') + 8;
        var suffix = proxy.url.indexOf('/columns');
        var newUrl = proxy.url.substring(0,preffix) + moduleId + proxy.url.substring(suffix);
        proxy.url = newUrl;
        descStore.setProxy(proxy);
        descStore.load();
        if(moduleId > 0){
            this.enableNextButton();
        }
        
        Ext.Ajax.request({
            url: newUrl,
            method: 'GET',
            dataType: 'json',
            success: function (responseObject) {
                var jsonResponse = responseObject.responseText;
                var response =  Ext.JSON.decode(jsonResponse);
                if (response.error == false) {
                    var uniques = [];
                    Ext.each(response.data,function(value,index){
                        if(value.is_unique==true){
                            uniques.push(value.id_column);
                        }
                        if(value.is_mandatory==true){
                            mandatoryFields.push(value.id_column);
                            mandatoryNames.push(value.label_name);
                        }
                    });
                    Ext.getCmp(controller + 'FormDuplicityRules').setValue(uniques)
                }

            }
        });
    },
    /**
     * Reconfigure the fields table, and enable next button
     */
    fileSelection: function(){
        var fileType = Ext.getCmp(controller + 'FormFiletype').getValue();
        switch (fileType){
            case 1:
                this.csvSelected();
                break;
            case 2:
                this.message('Alerta','Tipo de archivo no implementado','ERROR');
                break;
            case 3:
                this.message('Alerta','Tipo de archivo no implementado','ERROR');
                break;
        }
    },
    csvSelected: function(){
        Ext.getCmp(controller + 'FormEncode').setDisabled(false);
        Ext.getCmp(controller + 'FormSeparator').setDisabled(false);
        Ext.getCmp(controller + 'FormEncode').setValue(1);
        Ext.getCmp(controller + 'FormSeparator').setValue(1);
        this.enableNextButton();
    },
    reconfigureInserted: function(){
//        this.reconfigureResults('1');
    },
    reconfigureDuplicated: function(){
//        this.reconfigureResults('3');
    },
    reconfigureResults: function(idx){
        var obj = this;
        var objectsStore = this.getFileProcessorListStore();
        var storeModel = [];
        var gridData = [];
        var grid = Ext.getCmp(AppGlobals.listId + idx);
        var store = grid.getStore();
        
        storeModel.push('id');
        objectsStore.each(function(value,index){
            storeModel.push(value.data.sql_name);
            gridData.push({
                dataIndex: value.data.sql_name,
                text: value.data.label_name,
                width: '12%',
                align: 'center',
                sortable: false
            });
            
        });
        gridData.push({
                xtype: 'actioncolumn',
                width: '10%',
                sortable: false,
                menuDisabled: true,
                items: [
                    {
                        icon: 'images/icon/overwrite.gif',
                        tooltip: 'Sobreescribir',
                        scope: this                    
                    },
                    {
                        icon: 'images/icon/delete.png',
                        tooltip: 'Delete Plant',
                        scope: this                    
                    }
                ]});
        store.model.setFields(storeModel);
        grid.reconfigure(store,gridData);
//        return false;
    },
    mappingSelection: function(combo, records, eOpts){
        var objectId = records[0].data.id_object;
        var mappingId = Ext.getCmp(controller + 'FormStoresMappings').getValue();
        
        var mappingStore = this.getFileProcessorListMappingStore();
        var mappingProxy = mappingStore.getProxy();
        var preffix = mappingProxy.url.indexOf('objects/') + 8;
        var suffix = mappingProxy.url.indexOf('/columns');
        var newUrl = mappingProxy.url.substring(0,preffix) + objectId + mappingProxy.url.substring(suffix);
        mappingProxy.url = newUrl;
        mappingStore.setProxy(mappingProxy);
        mappingStore.load();
//        mappingStore.add(new Ext.data.Record({id_column:'---', sql_name:'Omitir Columna'}));
//        mappingStore.add({id_column:'---', sql_name:'Omitir Columna'});
        mappingStore.insert(0,new Ext.create('LoadPrincipal.model.FileProcessor.ListMapping',{
            id_column : '999999999' ,
            sql_name : 'Omitir',
            label_type : 'Omitir',
            size : 'Omitir',
            is_unique : 'Omitir',
            is_mandatory : 'Omitir',
            default : 'Omitir',
            label_name : 'Omitir'
        }));
        
        Ext.Ajax.request({
            url: moduleConfig.services.storedMappingDetailUrl.replace("id",mappingId),
            method: 'GET',
            dataType: 'json',
            success: function (responseObject) {
                var jsonResponse = responseObject.responseText;
                var response =  Ext.JSON.decode(jsonResponse);
                if (response.error == false) {
                    Ext.each(response.data,function(value,index){
                        Ext.getCmp(controller + 'Module' + index).setValue(value.id_column);
                        Ext.getCmp(controller + 'Default' + index).setValue(value.default);
                    });
                }

            }
        });
    },
    mappingQuery: function(queryPlan, eOpts){
        var objectId = Ext.getCmp(controller + 'FormModule').getValue();
        var filter = [
            {
                field:'id_object',
                comparison: 'eq',
                value: objectId
            }
        ];
        var store = queryPlan.combo.getStore();
//        var proxy = store.getProxy();
        store.proxy.extraParams = {
            filters: JSON.stringify(filter)
        };
    },
    mappingByFile: function(){
        var objectId = Ext.getCmp(controller + 'FormModule').getValue();
        
        var mappingStore = this.getFileProcessorListMappingStore();
        var mappingProxy = mappingStore.getProxy();
        var preffix = mappingProxy.url.indexOf('objects/') + 8;
        var suffix = mappingProxy.url.indexOf('/columns');
        var newUrl = mappingProxy.url.substring(0,preffix) + objectId + mappingProxy.url.substring(suffix);
        mappingProxy.url = newUrl;
        mappingStore.setProxy(mappingProxy);
        mappingStore.load();
        Ext.getCmp(controller + 'DynamicMap').removeAll();
        Ext.each(headersArray,function(aHeader,index){
            var headerData = (headersArray[index]!='undefined')?headersArray[index]:'no-data';
            var columnData = (dataArray[index]!='undefined')?dataArray[index]:'no-data';
            Ext.getCmp(controller + 'DynamicMap').add(
                {xtype: 'label', html: '&nbsp;', columnWidth: 1}
            ); 
            Ext.getCmp(controller + 'DynamicMap').add(
                {xtype: 'label', html: '&nbsp;', columnWidth: 0.04}
            ); 
            Ext.getCmp(controller + 'DynamicMap').add(
                {
                    xtype: 'textfield',
                    columnWidth: 0.20,
                    id: controller + 'Header' + index,
                    name: controller + 'Header' + index,
                    filedLabel: '',
                    value: headerData,
                    width: '99%',
                    labelAlign: 'left',
                    labelWidth: '50%'
                }
            );
            Ext.getCmp(controller + 'DynamicMap').add(
                {xtype: 'label', html: '&nbsp;', columnWidth: 0.04}
            ); 
            Ext.getCmp(controller + 'DynamicMap').add(
                {
                    xtype: 'textfield',
                    columnWidth: 0.20,
                    id: controller + 'FileValue' + index,
                    name: controller + 'FileValue' + index,
                    filedLabel: '',
                    value: columnData,
                    width: '99%',
                    labelAlign: 'left',
                    labelWidth: '50%'
                }
            );
            Ext.getCmp(controller + 'DynamicMap').add(
                {xtype: 'label', html: '&nbsp;', columnWidth: 0.04}
            ); 
            Ext.getCmp(controller + 'DynamicMap').add(
                {
                    xtype: 'combobox',
                    columnWidth: 0.20,
                    id: controller + 'Module' + index,
                    name: controller + 'Module' + index,
                    filedLabel: '',
                    value: 99999,
                    width: '99%',
                    displayField: 'label_name',
                    valueField: 'id_column',
                    store: controller + '.ListMapping',
                    labelAlign: 'left',
                    labelWidth: '50%'
                }
            );
            Ext.getCmp(controller + 'DynamicMap').add(
                {xtype: 'label', html: '&nbsp;', columnWidth: 0.04}
            ); 
            Ext.getCmp(controller + 'DynamicMap').add(
                {
                    xtype: 'textfield',
                    columnWidth: 0.20,
                    id: controller + 'Default' + index,
                    name: controller + 'Default' + index,
                    filedLabel: 'Valor por defecto',
                    value: '',
                    width: '99%',
                    labelAlign: 'left',
                    labelWidth: '50%'
                }
            );
        });
    },
    viewResults: function (grid, rowIndex, colIndex,item, e, record, row){
        var objectId = record.data['object.id_object'];
        Ext.getCmp(controller + 'Rollback').idProcess = objectId
        Ext.getCmp(controller + 'Commit').idProcess = objectId
        Ext.Ajax.request({
            url: moduleConfig.services.listUrl.replace("id",objectId),
            method: 'GET',
            dataType: 'json',
//            params: {
//                values: Ext.JSON.encode(json)
//            },
            success: function (responseObject) {
                
                var response = (Ext.JSON.decode(responseObject.responseText));
               
                
                var processId= record.data.id_process;
                var tab = Ext.getCmp(AppGlobals.tabsId);
                tab.setActiveTab('FileProcessorResults');

                var gridInserted = Ext.getCmp(AppGlobals.listId + '1');
                var storeInserted  = gridInserted.getStore();
                var storeModel = [];
                var gridData = [];

                storeModel.push('id_register');
                Ext.each(response.data,function(value,index){
                    storeModel.push(value.sql_name);
                    gridData.push({
                        dataIndex: value.sql_name,
                        text: value.label_name,
                        width: '12%',
                        align: 'center',
                        sortable: false
                    });

                });
                storeInserted.model.setFields(storeModel);
                gridInserted.reconfigure(storeInserted,gridData);
                
                
                var proxy = storeInserted.getProxy();
                var preffix = proxy.url.indexOf('processes/') + 10;
                var suffix = proxy.url.indexOf('/new');
                var newUrl = proxy.url.substring(0,preffix) + processId + proxy.url.substring(suffix);
                proxy.url = newUrl;
                storeInserted.setProxy(proxy);
                storeInserted.load();


                var gridDuplicated = Ext.getCmp(AppGlobals.listId + '3');
                var storeDuplicated = gridDuplicated.getStore();
                var proxy = storeDuplicated.getProxy();
                
                
                var gridDataDuplicated = gridData;
                var storeDataDuplicated = storeModel;
                storeDataDuplicated.push('action');
                gridDataDuplicated.push(
                    {
                        dataIndex: 'action',
                        text: 'ACCION',
                        width: '12%',
                        align: 'center',
                        sortable: false
                    }
                );
                gridDataDuplicated.push(
                    {
                        xtype: 'actioncolumn',
                        width: '10%',
                        sortable: false,
                        menuDisabled: true,
                        items: [
                            {
                                icon: 'images/icon/overwrite.gif',
                                tooltip: 'Sobreescribir',
                                scope: this,
                                handler: function(grid, rowIndex, colIndex, item, e, record, row) {
                                    Ext.getCmp('IdFileProcessorList3').addEvents('overwrite');
                                    Ext.getCmp('IdFileProcessorList3').fireEvent('overwrite', grid, rowIndex, colIndex,item, e, record, row);
                                }
                            },
                            {
                                icon: 'images/icon/delete.png',
                                tooltip: 'Omitir',
                                scope: this,
                                handler: function(grid, rowIndex, colIndex, item, e, record, row) {
                                    Ext.getCmp('IdFileProcessorList3').addEvents('discard');
                                    Ext.getCmp('IdFileProcessorList3').fireEvent('discard', grid, rowIndex, colIndex,item, e, record, row);
                                }
                            }
                        ]
                    }
                );
                storeDuplicated.model.setFields(storeDataDuplicated);
                gridDuplicated.reconfigure(storeDuplicated,gridDataDuplicated);
                
                var preffix = proxy.url.indexOf('processes/') + 10;
                var suffix = proxy.url.indexOf('/duplicated');
                var newUrl = proxy.url.substring(0,preffix) + processId + proxy.url.substring(suffix);
                proxy.url = newUrl;
                storeDuplicated.setProxy(proxy);
                storeDuplicated.load();

                var storeError      = Ext.getCmp(AppGlobals.listId + '4').getStore();
                var proxy = storeError.getProxy();
                var oldProxy = proxy;
                var preffix = proxy.url.indexOf('processes/') + 10;
                var suffix = proxy.url.indexOf('/error');
                var newUrl = proxy.url.substring(0,preffix) + processId + proxy.url.substring(suffix);
                proxy.url = newUrl;
                storeError.setProxy(proxy);
                storeError.load();
                //                    Ext.MessageBox.hide();
                var json_respuesta = responseObject.responseText;
                /**
                 * Valida registro del usuario
                 */

            }
        });
    },
    csvSelection: function(thisObj, value, eOpts,event){
        var obj = this;
        var headerPos       = 0;
        var firstDataPos    = 0;
        var split           = ",";
        split = (Ext.getCmp(controller + 'FormSeparator').getValue()=="comma")?firstData:";";
        var firstData = Ext.getCmp(controller + 'FormFirstData').getValue();
        firstDataPos = (firstData === "null")?firstDataPos:(firstData-1);
//        headerPos = (Ext.getCmp(controller + 'FormHasHeaders').getValue()) ?((firstDataPos>1)?(firstDataPos -1):0):firstDataPos;
        if(Ext.getCmp(controller + 'FormHasHeaders').getValue()){
            if(firstDataPos > 1){
                headerPos = firstDataPos -1;
            }else{
                headerPos = 0;
            }
        }else{
            headerPos = firstDataPos;
        }
        var file = thisObj.getEl().down('input[type=file]').dom.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(event){
            obj.enableNextButton();
//            console.log(event.target.result);
            var rows=event.target.result.split("\n");
            headersArray=rows[headerPos].split(split);
            dataArray=rows[firstDataPos].split(split);
            obj.mappingByFile();
        };
        reader.onerror = function(){
          console.log('On Error Event');
        };
    },
    customDuplicityRules: function(thisObj,eOpts){
        var store = thisObj.getStore();
        console.log(store);
    },
    overwriteRow: function (grid, rowIndex, colIndex,item, e, record, row){
        console.log(record.data.id_register)
        var json = {
            basicinfo:{
                action: 'OVERWRITE'
            }
        };
        Ext.Msg.confirm('Confirmar', 'Desea sobreescribir el registro?<br/><br/>',
            function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: moduleConfig.services.listDuplicatedActionUrl.replace('id',record.data.id_register),
                        method: 'PUT',
                        dataType: 'json',
                        params:{
                            data: JSON.stringify(json)
                        },
                        success: function (responseObject) {
                            var jsonResponse = responseObject.responseText;
                            var response =  Ext.JSON.decode(jsonResponse);
                            if (response.error == false) {
                                Ext.MessageBox.show({
                                    title: 'Informaci\xf3n',
                                    height: 150,
                                    msg: 'Registro guardado para sobreescribir!<br/><br/>',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.INFO
                                });
                            }

                        }
                    });
                }
            }
        );
    },
    discardRow: function (grid, rowIndex, colIndex,item, e, record, row){
        console.log(record.data.id_register)
        var json = {
            basicinfo:{
                action: 'IGNORE'
            }
        };
        Ext.Msg.confirm('Confirmar', 'Desea ignorar el registro?<br/><br/>',
            function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: moduleConfig.services.listDuplicatedActionUrl.replace('id',record.data.id_register),
                        method: 'PUT',
                        dataType: 'json',
                        params:{
                            data: JSON.stringify(json)
                        },      
                        success: function (responseObject) {
                            var jsonResponse = responseObject.responseText;
                            var response =  Ext.JSON.decode(jsonResponse);
                            if (response.error == false) {
                                Ext.MessageBox.show({
                                    title: 'Informaci\xf3n',
                                    height: 150,
                                    msg: 'Registro ignorado!<br/><br/>',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.INFO
                                });
                            }

                        }
                    });
                }
            }
        );
    },
    rollbackRows: function(button){
        var processId = button.idProcess;
        this.transactionRows(button,
                            moduleConfig.services.listRollbackUrl.replace("id",processId),
                            '\xbfDesea deshacer el archivo procesado?',
                            'El proceso ha hecho rollback!');
    },
    commitRows: function(button){
        var processId = button.idProcess;
        this.transactionRows(button,
                            moduleConfig.services.listCommitUrl.replace("id",processId),
                            '\xbfDesea confirmar el archivo procesado?',
                            'El proceso ha hecho commit!');
        
    },
    /**
     * This function send a standard ajax request with confirmation
     * @param {Object} button
     * @param {String} url
     * @param {String} confirmMsg
     * @param {Strinh} successMsg
     */
    transactionRows: function(button,url,confirmMsg,successMsg){
        var processId = button.idProcess;
        
        Ext.Msg.confirm('Confirmar', confirmMsg + '?<br/><br/>',
            function (btn) {
                if (btn === 'yes') {
                    Ext.Ajax.request({
                        url: url,
                        method: 'POST',
                        dataType: 'json',
                        success: function (responseObject) {
                            var jsonResponse = responseObject.responseText;
                            var response =  Ext.JSON.decode(jsonResponse);
                            if (response.error == false) {
                                Ext.MessageBox.show({
                                    title: 'Informaci\xf3n',
                                    height: 150,
                                    msg: successMsg + '<br/><br/>',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.INFO
                                });
                                this.resetForms();
                                var tab = Ext.getCmp(AppGlobals.tabsId);
                                tab.setActiveTab(Ext.getCmp(controller + 'Module'));
                            }

                        }
                    });
                }
            }
        );
    },
    resetForms: function(){
        okTab = [];
        headersArray = [];
        dataArray = [];
        mandatoryFields = [];
        mandatoryNames = [];
        this.disableNextButton();
        Ext.getCmp(controller + 'FormModule').setValue('');
        Ext.getCmp(AppGlobals.listId).getStore().removeAll();
        Ext.getCmp(controller + 'FormDuplicityRules').getStore().removeAll();
        Ext.getCmp(controller + 'FormFiletype').setValue('');
        Ext.getCmp(controller + 'FormSeparator').setValue('');
        Ext.getCmp(controller + 'FormEncode').setValue('');
        Ext.getCmp(controller + 'FormHasHeaders').setValue(false);
        Ext.getCmp(controller + 'FormFirstData').setValue(1);
        Ext.getCmp(controller + 'FormStoresMappings').setValue('');
        
        Ext.getCmp(controller + 'Config').setDisabled(true);
        Ext.getCmp(controller + 'SelectFile').setDisabled(true);
        Ext.getCmp(controller + 'Mapping').setDisabled(true);
        
    },
    processFile: function(button){
        var obj = this;
        var duplicityValues = Ext.getCmp(controller + 'FormDuplicityRules').getValue();
        
        var mapping = Ext.getCmp(controller + 'DynamicMap').items;
        var mappingObj = [];
        var columnsIds = [];
        var countMandatory = [];
        Ext.each(mapping.items,function(value,idx){
           if(value.xtype !== 'label') {
               var id = value.id;
               if(id.indexOf('FileProcessorModule')> -1){
                   if(columnsIds.indexOf(value.value)> -1){
                        obj.message('Información','Una columna se puede seleccionar solo una vez','INFO');
                        return false;                       
                   }else{
                   if(mandatoryFields.indexOf(value.value)> -1){
                        countMandatory.push(value.value);
                   }
                       columnsIds.push(value.value);
                   }
                    var rowIndex = id.substring(id.indexOf('FileProcessorModule') + 19);
                    if(value.value != 99999){
                        mappingObj.push(
                                {
                                    basicinfo: {
                                        index: rowIndex,
                                        id_column: value.value
    //                                   "default": Ext.getCmp(controller + 'Default' + rowIndex).getValue()
                                    }
                                }
                        );
                    }
                }
           }
        });
        if(mappingObj.length ==0){
            this.message('Información','No todas las columnas pueden ser omitidas','INFO');
            return false;
        }
        if(countMandatory.length < mandatoryFields.length){
            var fieldNames = '';
            Ext.each(mandatoryFields,function(value,index){
                if(countMandatory.indexOf(value)==-1){
                    fieldNames += mandatoryNames[index] + '<br/>';
                }
            });
            this.message('Información','No se han mapeado uno o varios campos  requeridos<br/>' + fieldNames,'INFO');
            return false;
        }
        var jsonDuplicity = [];
        Ext.each(duplicityValues,function(value,index){
            jsonDuplicity.push({__id:value});
        });
        var json = {};
        json.basicinfo= {};
        json.basicinfo.id_object = Ext.getCmp(controller + 'FormModule').getValue();
        json.file = [
            {
                configurations: [
                    {
                        basicinfo: {
                            key: 'encoding',
                            value: (Ext.getCmp(controller + 'FormEncode').getValue()==1)?'utf-8':'other'
                        }
                    },
                    {
                        basicinfo: {
                            key: 'separator',
                            value: (Ext.getCmp(controller + 'FormSeparator').getValue()==1)?'comma':'semicolon'
                        }
                    },
                    {
                        basicinfo: {
                            key: 'hasHeaders',
                            value: Ext.getCmp(controller + 'FormHasHeaders').getValue()
                        }
                    },
                    {
                        basicinfo: {
                            key: 'firstData',
                            value: Ext.getCmp(controller + 'FormFirstData').getValue()
                        }
                    }
                ]
            }
        ];
        json.map = [
            {
                basicinfo: {
                    name: Ext.getCmp(controller + 'FormMappingName').getValue(),
                    id_object: Ext.getCmp(controller + 'FormModule').getValue(),
                    is_user_defined : Ext.getCmp(controller + 'FormSaveMapping').getValue()
                },
                details: mappingObj                
            }
        ];
        json.duplicity = jsonDuplicity;
        var formFile = Ext.getCmp(controller + 'FormUpload').getForm();
        if (formFile.isValid()) {

            formFile.submit({
                url: moduleConfig.services.listProcessUrl,
                method: 'POST',
                params: {
                    data: Ext.JSON.encode(json),
                },
                success: function (responseObject) {
                    var jsonResponse = responseObject.responseText;
                    var response =  Ext.JSON.decode(jsonResponse);
                    if (response.error == false) {

                    }

                },
                requestcomplete: function(response){
                    console.log('response')
                }
            });
        }
//        }
    }
    
});