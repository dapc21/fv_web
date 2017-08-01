var objController = null;

Ext.define('LoadPrincipal.controller.' + controller, {
    extend : 'LoadPrincipal.controller.Core',
    models : [
        controller + '.List',
        controller + '.ListSection'
    ],
    stores : [
        controller + '.List',
        controller + '.ListSection'
    ],
    views  : [],
    refs  : [],
    init  : function() 
    {
        objController = this;
        
        var winForm, winSection, fb, fbWindow;
        /**
        * get current token
        */
        var token = this.token();
        if(token) {
            Ext.Ajax.useDefaultXhrHeader = true;
            Ext.Ajax.cors = true;
            Ext.Ajax.defaultHeaders = {
                'Authorization' : 'Bearer ' + token
            };
        }

        this.render(moduleConfig.template);

        this.control(
            {
                /**
                * Show te contextmenu
                **/
                'AliasFormsList' : {
                    itemmouseenter  : this.generateTooltips,
                    itemcontextmenu : this.listContextualMenu,
                    itemclick       : this.itemClick
                }
                ,
                /* Búscar Formulario (textfield) */
                '#FormsSearchForm' : {
                    keyup : this.multiSearch
                }
                ,
                /* Borrar/Limpiar filtro Formulario */
                '#FormsClearSearchForm' : {
                    click : this.clearFilterForm
                }
                ,
                /* Buscar por Estado/Status (combobox) */
                '#FormsSearchStatusForm' : {
                    select : this.multiSearch
                }
                ,
                /* Borrar/Limpiar filtro por Estado/Status */
                '#FormsClearSearchStatusForm' : {
                    click : this.clearFilterStatus
                }
                ,
                /* Ventana Crear Formulario */
                '#FormsCreate' : {
                    click : this.createForm
                }
                ,
                /* Cerrar/Cancelar Ventana Crear Formulario */
                '#FormsWindowsCancelButton' : {
                    click : this.cancelCreateEditForm
                }
                ,
                /* Crear/Editar Formulario (Enviar Datos) */
                '#FormsWindowsSaveButton' : {
                    click : this.sendDataForm
                }
                ,
                /* Eliminar Formulario(s) */
                '#FormsDelete' : {
                    click : this.deleteForm
                }
                ,
                /* Cambiar Estados: Activar Formulario(s) */
                '#FormsActive' : {
                    click : this.activateForm
                }
                ,
                /* Cambiar Estados: Desactivar Formulario(s) */
                '#FormsInactive' : {
                    click : this.deactivateForm
                }
                ,
                /**
                * Contextual Menu
                **/
                /* Ventana Editar Formulario */
                'menuitem[action=FormsContextualEdit]' : {
                    click : this.editForm
                }
                ,
                /* Eliminar Formulario */
                'menuitem[action=FormsContextualDelete]' : {
                    click : this.deleteForm
                }
                ,
                /* Activar Formulario */
                'menuitem[action=FormsContextualActive]' : {
                    click : this.activateForm
                }
                ,
                /* Desactivar Formulario */
                'menuitem[action=FormsContextualInactive]' : {
                    click : this.deactivateForm
                }
                ,
                /**
                * Secciones del Formulario
                **/
                /* Ventana Crear Secciones */
                '#FormsCreateSection' : {
                    click : this.createSection
                }
                ,
                /* Cerrar/Cancelar Ventana Crear Secciones */
                '#FormsWindowsCancelButtonSection' : {
                    click : this.cancelCreateEditSection
                }
                ,
                /* Crear/Editar Secciones (Enviar Datos) */
                '#FormsWindowsSaveButtonSection' : {
                    click : this.sendDataSection
                }
                ,
                /* Eliminar Secciones */
                '#FormsDeleteSection' : {
                    click : this.deleteSection
                }
                ,
                /* Cambiar Estados: Activar Secciones */
                '#FormsActiveSection' : {
                    click : this.activateSection
                }
                ,
                /* Cambiar Estados: Desactivar Secciones */
                '#FormsInactiveSection' : {
                    click : this.deactivateSection
                }
                ,
                /**
                * Contextual Menu Secciones
                **/
                /* Ventana Editar Secciones */
                'menuitem[action=FormsContextualEditSection]' : {
                    click : this.editSection
                }
                ,
                /* Eliminar Secciones */
                'menuitem[action=FormsContextualDeleteSection]' : {
                    click : this.deleteSection
                }
                ,
                /* Activar Secciones */
                'menuitem[action=FormsContextualActiveSection]' : {
                    click : this.activateSection
                }
                ,
                /* Desactivar Secciones */
                'menuitem[action=FormsContextualInactiveSection]' : {
                    click : this.deactivateSection
                }
                ,
                '#FormsGridSection' : {
                    itemclick : this.loadSection
                }

            }
        );
    }
    ,
    multiSearch : function() {
        var grid = Ext.getCmp(controller+'Grid');
        var store = grid.getStore();
        var jsonSearch = new Object();
        var jsonOr = new Object();
        var searchKeyword = Ext.getCmp(controller + 'SearchForm').getValue();
        var status = Ext.getCmp(controller + 'SearchStatusForm').getValue();
        jsonSearch.and = [];

        if (status != null) {
            jsonSearch.and.push(
                {
                    field      : 'status',
                    comparison : 'eq',
                    value      : status
                }
            );
        }

        if (searchKeyword !='') {
            jsonOr.or = [];

            jsonOr.or.push(
                {
                    field      : 'name',
                    comparison : 'lk',
                    value      : searchKeyword
                }
                ,
                { 
                    field      : 'status',
                    comparison : 'lk',
                    value      : searchKeyword
                }
            );
            jsonSearch.and.push(jsonOr);
        }
        Ext.Ajax.abort(store.proxy.activeRequest);
        /* si el array jsonSearch.and está vacío*/
        if ( jsonSearch.and.length < 1) {
            store.proxy.extraParams = {};
        } else { /* sino, posee al menos un criterio*/
            store.proxy.extraParams = {
                filters : Ext.JSON.encode(jsonSearch)
            };
        }
        store.loadPage(1);
    }
    ,
    clearFilterForm : function() {
        Ext.getCmp(controller + 'SearchForm').setValue('');
        this.multiSearch();
    }
    ,
    clearFilterStatus : function() {
        Ext.getCmp(controller + 'SearchStatusForm').setValue('');
        this.multiSearch();
    }
    ,
    createForm : function() {
        var m = moduleConfig;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winForm = this.newWindowForm(m.groupIdForms, m.titleWindowForms, m.widthWindowForms, m.heightWindowForms, m.resizableWindowForms, m.toolbarForms, m.itemsFormForms, m.bottomButtonsForms);
        winForm.show();
    }
    ,
    cancelCreateEditForm : function() {
        winForm.destroy();
    }
    ,
    sendDataForm : function() {
        var form = Ext.getCmp(moduleConfig.groupIdForms+'Form').getForm();
        var id = form.findField("_id").getValue();
        var id_company = window.localStorage.getItem('id_company');
        var selModel = Ext.getCmp(controller+'Grid').getSelectionModel();
        var storeForm = Ext.data.StoreManager.lookup(controller+'.List');

        /* El formulario tiene los campos llenos */
        if (form.isValid()) {

            /* Si el valor del ID del form es vacío se almacena por 1ra vez */
            if (id == '') {
                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                Ext.Ajax.request({
                    url      : moduleConfig.services.url,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'POST',
                    scope    : this,
                    params   : Ext.JSON.encode({
                        'name'        : form.findField("name").getValue(),
                        'description' : form.findField("description").getValue(),
                        'id_company'  : id_company,
                        'status'      : 'active'
                    }),
                    success  : function(response){
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.create+' '+translateforms.moduleTitle,
                            msg     : translateforms.MsgSuccessCreate,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        selModel.clearSelections();
                        storeForm.reload();
                        winForm.destroy();
                    },
                    failure  : function(response) {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.create+' '+translateforms.moduleTitle,
                            msg     : translateforms.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });
            } else {
                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                Ext.Ajax.request({
                    url      : moduleConfig.services.url+'/'+id,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'PUT',
                    scope    : this,
                    params   : Ext.JSON.encode({
                        'name'        : form.findField("name").getValue(),
                        'description' : form.findField("description").getValue(),
                        'id_company'  : id_company,
                        'status'      : 'active'
                    }),
                    success  : function(response){
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translateforms.moduleTitle,
                            msg     : translateforms.MsgSuccessEdit,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        selModel.clearSelections();
                        storeForm.reload();
                        winForm.destroy();
                    },
                    failure  : function(response) {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translateforms.moduleTitle,
                            msg     : translateforms.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        }
    }
    ,
    deleteForm : function() {
        var storeForm = Ext.data.StoreManager.lookup(controller+'.List');
        var selModel = Ext.getCmp(controller+'Grid').getSelectionModel();
        var selectedRecords = selModel.getSelection();
        var numberSelRecords = selModel.getCount();
        var msgSuccess = (numberSelRecords > 1) ? translateforms.MsgSuccessDeletePlural : translateforms.MsgSuccessDelete;

        if(selectedRecords.length > 0) {

            Ext.Msg.confirm(translateforms.confirmTitle, translateforms.confirmDelete, function(btn) {

                if (btn === 'yes') {

                    for (var i = 0, len = selectedRecords.length; i < len; i++) {

                        var record = selectedRecords[i];
                        var id = record.get('_id');
                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

                        Ext.Ajax.request({
                            url      : moduleConfig.services.url+'/'+id,
                            method   : 'DELETE',
                            scope    : this,
                            type     : 'rest',
                            dataType : 'json',
                            success  : function(response) {
                                if (i == len) {
                                    msgWait.hide();
                                    Ext.MessageBox.show({
                                        title   : translate.global.delete+' '+translateforms.moduleTitle,
                                        msg     : msgSuccess,
                                        buttons : Ext.MessageBox.OK,
                                        icon    : Ext.MessageBox.INFO
                                    });
                                    selModel.clearSelections();
                                    storeForm.reload();
                                }
                            },
                            failure  : function(response) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.delete+' '+translateforms.moduleTitle,
                                    msg     : translateforms.MsgError,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.ERROR
                                });
                            }
                        });
                    }
                }

            });
        }
    }
    ,
    activateForm : function() {
        var storeForm = Ext.data.StoreManager.lookup(controller+'.List');
        var selModel = Ext.getCmp(controller+'Grid').getSelectionModel();
        var selectedRecords = selModel.getSelection();
        var numberSelRecords = selModel.getCount();
        var msgSuccess = (numberSelRecords > 1) ? translateforms.MsgSuccessActivatePlural : translateforms.MsgSuccessActivate;

        if(selectedRecords.length > 0){

            Ext.Msg.confirm(translateforms.confirmTitle, translateforms.confirmActivate, function(btn) {

                if (btn === 'yes') {

                    for (var i = 0, len = selectedRecords.length; i < len; i++) {

                        var record = selectedRecords[i];
                        var id = record.get('_id');
                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

                        Ext.Ajax.request({
                            url    : moduleConfig.services.url+'/'+id,
                            type     : 'rest',
                            dataType : 'json',
                            method   : 'PUT',
                            scope    : this,
                            params   : Ext.JSON.encode({'status' : 'active'}),
                            success  : function(response) {
                                if (i == len) {
                                    msgWait.hide();
                                    Ext.MessageBox.show({
                                        title   : translate.global.active+' '+translateforms.moduleTitle,
                                        msg     : msgSuccess,
                                        buttons : Ext.MessageBox.OK,
                                        icon    : Ext.MessageBox.INFO
                                    });
                                    selModel.clearSelections();
                                    storeForm.reload();
                                }
                            },
                            failure  : function(response) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.active+' '+translateforms.moduleTitle,
                                    msg     : translateforms.MsgError,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.ERROR
                                });
                            }
                        });

                    }

                }

            });

        }
    }
    ,
    deactivateForm : function() {
        var storeForm = Ext.data.StoreManager.lookup(controller+'.List');
        var selModel = Ext.getCmp(controller+'Grid').getSelectionModel();
        var selectedRecords = selModel.getSelection();
        var numberSelRecords = selModel.getCount();
        var msgSuccess = (numberSelRecords > 1) ? translateforms.MsgSuccessDeactivatePlural : translateforms.MsgSuccessDeactivate;

        if(selectedRecords.length > 0){

            Ext.Msg.confirm(translateforms.confirmTitle, translateforms.confirmDeactivate, function(btn) {

                if (btn === 'yes') {

                    for (var i = 0, len = selectedRecords.length; i < len; i++) {

                        var record = selectedRecords[i];
                        var id = record.get('_id');
                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

                        Ext.Ajax.request({
                            url    : moduleConfig.services.url+'/'+id,
                            type     : 'rest',
                            dataType : 'json',
                            method   : 'PUT',
                            scope    : this,
                            params   : Ext.JSON.encode({'status' : 'inactive'}),
                            success  : function(response) {
                                if (i == len) {
                                    msgWait.hide();
                                    Ext.MessageBox.show({
                                        title   : translate.global.inactive+' '+translateforms.moduleTitle,
                                        msg     : msgSuccess,
                                        buttons : Ext.MessageBox.OK,
                                        icon    : Ext.MessageBox.INFO
                                    });
                                    selModel.clearSelections();
                                    storeForm.reload();
                                }
                            },
                            failure  : function(response) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.inactive+' '+translateforms.moduleTitle,
                                    msg     : translateforms.MsgError,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.ERROR
                                });
                            }
                        });

                    }

                }

            });

        }
    }
    ,
    editForm : function() {
        var selModel = Ext.getCmp(controller+'Grid').getSelectionModel();
        var selectedRecords = selModel.getSelection();
        var record = selectedRecords[0];
        var m = moduleConfig;
        m.titleWindowForms = translate.global.edit+' '+translateforms.moduleTitle;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winForm = this.newWindowForm(m.groupIdForms, m.titleWindowForms, m.widthWindowForms, m.heightWindowForms, m.resizableWindowForms, m.toolbarForms, m.itemsFormForms, m.bottomButtonsForms);
        winForm.show();
        Ext.getCmp(moduleConfig.groupIdForms+'Form').getForm().setValues(record.getData());
    }
    ,
    createSection : function() {
        var m = moduleConfig;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winSection = this.newWindowForm(m.groupIdSection, m.titleWindowSection, m.widthWindowSection, m.heightWindowSection, m.resizableWindowSection, m.toolbarSection, m.itemsFormSection, m.bottomButtonsSection);
        winSection.show();
    }
    ,
    cancelCreateEditSection : function() {
        winSection.destroy();
    }
    ,
    sendDataSection : function() {
        var form = Ext.getCmp(moduleConfig.groupIdSection+'Form').getForm();
        var id = form.findField("_id").getValue();
        var selModel = Ext.getCmp(controller+'GridSection').getSelectionModel();
        var selModelForm = Ext.getCmp(controller+'Grid').getSelectionModel();
        var selectedRecords = selModelForm.getSelection();
        var record = selectedRecords[0];
        var storeSection = Ext.data.StoreManager.lookup(controller+'.ListSection');
        var id_form = record.get('_id');
        
        /* El formulario tiene los campos llenos */
        if (form.isValid()) {

            /* Si el valor del ID de la sección del form es vacío se almacena por 1ra vez */
            if (id == '') {
                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                Ext.Ajax.request({
                    url      : moduleConfig.services.urlListSection,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'POST',
                    scope    : this,
                    params   : Ext.JSON.encode({
                        'name'      : form.findField("name").getValue(),
                        'id_form'   : id_form,
                        'status'    : 'active',
                        'questions' :[]
                    }),
                    success  : function(response){
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.create+' '+translateforms.section.moduleTitle,
                            msg     : translateforms.section.MsgSuccessCreate,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        selModel.clearSelections();
                        storeSection.reload();
                        winSection.destroy();
                    },
                    failure  : function(response) {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.create+' '+translateforms.section.moduleTitle,
                            msg     : translateforms.section.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });
            } else {
                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                Ext.Ajax.request({
                    url      : moduleConfig.services.urlListSection+'/'+id,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'PUT',
                    scope    : this,
                    params   : Ext.JSON.encode({
                        'name'      : form.findField("name").getValue(),
                        'id_form'   : id_form,
                        'status'    : 'active'
                    }),
                    success  : function(response){
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translateforms.section.moduleTitle,
                            msg     : translateforms.section.MsgSuccessEdit,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        selModel.clearSelections();
                        storeSection.reload();
                        winSection.destroy();
                    },
                    failure  : function(response) {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translateforms.section.moduleTitle,
                            msg     : translateforms.section.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        }
    }
    ,
    deleteSection : function() {
        var storeSection = Ext.data.StoreManager.lookup(controller+'.ListSection');
        var selModel = Ext.getCmp(controller+'GridSection').getSelectionModel();
        var selectedRecords = selModel.getSelection();
        var numberSelRecords = selModel.getCount();
        var msgSuccess = (numberSelRecords > 1) ? translateforms.section.MsgSuccessDeletePlural : translateforms.section.MsgSuccessDelete;

        if(selectedRecords.length > 0) {

            Ext.Msg.confirm(translateforms.section.confirmTitle, translateforms.section.confirmDelete, function(btn) {

                if (btn === 'yes') {

                    for (var i = 0, len = selectedRecords.length; i < len; i++) {

                        var record = selectedRecords[i];
                        var id = record.get('_id');
                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

                        Ext.Ajax.request({
                            url      : moduleConfig.services.urlListSection+'/'+id,
                            method   : 'DELETE',
                            scope    : this,
                            type     : 'rest',
                            dataType : 'json',
                            success  : function(response) {
                                if (i == len) {
                                    msgWait.hide();
                                    Ext.MessageBox.show({
                                        title   : translate.global.delete+' '+translateforms.section.moduleTitle,
                                        msg     : msgSuccess,
                                        buttons : Ext.MessageBox.OK,
                                        icon    : Ext.MessageBox.INFO
                                    });
                                    selModel.clearSelections();
                                    storeSection.reload();
                                    new Formbuilder({
                                        selector      : '.fb-main',
                                        sections      : 1,
                                        bootstrapData : []
                                    });
                                }
                            },
                            failure  : function(response) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.delete+' '+translateforms.section.moduleTitle,
                                    msg     : translateforms.section.MsgError,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.ERROR
                                });
                            }
                        });
                    }
                }

            });
        }
    }
    ,
    activateSection : function() {
        var storeSection = Ext.data.StoreManager.lookup(controller+'.ListSection');
        var selModel = Ext.getCmp(controller+'GridSection').getSelectionModel();
        var selectedRecords = selModel.getSelection();
        var numberSelRecords = selModel.getCount();
        var msgSuccess = (numberSelRecords > 1) ? translateforms.section.MsgSuccessActivatePlural : translateforms.section.MsgSuccessActivate;

        if(selectedRecords.length > 0){

            Ext.Msg.confirm(translateforms.section.confirmTitle, translateforms.section.confirmActivate, function(btn) {

                if (btn === 'yes') {

                    for (var i = 0, len = selectedRecords.length; i < len; i++) {

                        var record = selectedRecords[i];
                        var id = record.get('_id');
                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

                        Ext.Ajax.request({
                            url    : moduleConfig.services.urlListSection+'/'+id,
                            type     : 'rest',
                            dataType : 'json',
                            method   : 'PUT',
                            scope    : this,
                            params   : Ext.JSON.encode({'status' : 'active'}),
                            success  : function(response) {
                                if (i == len) {
                                    msgWait.hide();
                                    Ext.MessageBox.show({
                                        title   : translate.global.active+' '+translateforms.section.moduleTitle,
                                        msg     : msgSuccess,
                                        buttons : Ext.MessageBox.OK,
                                        icon    : Ext.MessageBox.INFO
                                    });
                                    selModel.clearSelections();
                                    storeSection.reload();
                                }
                            },
                            failure  : function(response) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.active+' '+translateforms.section.moduleTitle,
                                    msg     : translateforms.MsgError,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.ERROR
                                });
                            }
                        });

                    }

                }

            });

        }
    }
    ,
    deactivateSection : function() {
        var storeSection = Ext.data.StoreManager.lookup(controller+'.ListSection');
        var selModel = Ext.getCmp(controller+'GridSection').getSelectionModel();
        var selectedRecords = selModel.getSelection();
        var numberSelRecords = selModel.getCount();
        var msgSuccess = (numberSelRecords > 1) ? translateforms.section.MsgSuccessDeactivatePlural : translateforms.section.MsgSuccessDeactivate;

        if(selectedRecords.length > 0){

            Ext.Msg.confirm(translateforms.section.confirmTitle, translateforms.section.confirmDeactivate, function(btn) {

                if (btn === 'yes') {

                    for (var i = 0, len = selectedRecords.length; i < len; i++) {

                        var record = selectedRecords[i];
                        var id = record.get('_id');
                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

                        Ext.Ajax.request({
                            url    : moduleConfig.services.urlListSection+'/'+id,
                            type     : 'rest',
                            dataType : 'json',
                            method   : 'PUT',
                            scope    : this,
                            params   : Ext.JSON.encode({'status' : 'inactive'}),
                            success  : function(response) {
                                if (i == len) {
                                    msgWait.hide();
                                    Ext.MessageBox.show({
                                        title   : translate.global.inactive+' '+translateforms.section.moduleTitle,
                                        msg     : msgSuccess,
                                        buttons : Ext.MessageBox.OK,
                                        icon    : Ext.MessageBox.INFO
                                    });
                                    selModel.clearSelections();
                                    storeSection.reload();
                                }
                            },
                            failure  : function(response) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.inactive+' '+translateforms.section.moduleTitle,
                                    msg     : translateforms.MsgError,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.ERROR
                                });
                            }
                        });

                    }

                }

            });

        }
    }
    ,
    editSection : function() {
        var selModel = Ext.getCmp(controller+'GridSection').getSelectionModel();
        var selectedRecords = selModel.getSelection();
        var record = selectedRecords[0];
        var m = moduleConfig;
        m.titleWindowSection = translate.global.edit+' '+translateforms.section.moduleTitle;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winSection = this.newWindowForm(m.groupIdSection, m.titleWindowSection, m.widthWindowSection, m.heightWindowSection, m.resizableWindowSection, m.toolbarSection, m.itemsFormSection, m.bottomButtonsSection);
        winSection.show();
        Ext.getCmp(moduleConfig.groupIdSection+'Form').getForm().setValues(record.getData());
    }
    ,
    loadSection : function(thisObj, record, item, index, e, eOpts) {
        var id = record.data._id;
        var name = record.data.name;
        var id_form = record.data.id_form;
        var questions = record.data.questions;
        var me = this;
        var parentQuestions = [];
        var childrenQuestions = [];

        //Ciclo object para filtrar padres e hijos
        for (var a in questions) {
            if(questions[a].id_parent) {
                childrenQuestions.push(questions[a]);
            }
            else {
                parentQuestions.push(questions[a]); 
            }
        }

        fb = new Formbuilder({
            selector      : '.fb-main',
            editOnAdd     : true,
            sections      : 1,
            bootstrapData : parentQuestions
        });
        //Renderiza el contenido de hijos en el "questions" padre.
        me.renderChildrenInParent(parentQuestions, childrenQuestions);
    }
    ,
    renderChildrenInParent : function(parentQuestions, childrenQuestions) {
        if (parentQuestions.length > 0) {
            for (var x=0;  x < parentQuestions.length; x++) {
                $('#contentGridfield-'+parentQuestions[x].cid).html('');
                if (childrenQuestions.length > 0) {
                    for (var y=0;  y < childrenQuestions.length; y++) {
                        if (parentQuestions[x].cid == childrenQuestions[y].id_parent) {
                            $('#contentGridfield-'+parentQuestions[x].cid).append('<div id='+childrenQuestions[y].cid+'>'+childrenQuestions[y].configuration.fieldLabel+' - '+childrenQuestions[y].xtype+'</div>');
                        }
                    }
                }
            }
        }
    }

});