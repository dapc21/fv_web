var objController = null;
Ext.define('LoadPrincipal.controller.' + controller, {
    extend : 'LoadPrincipal.controller.Core',
    models : [
//        controller + '.ListCombo',
        controller + '.List',
        controller + '.ListResources',
        controller + '.ListLicenses',
        controller + '.ListDevices',
        controller + '.ListResourcesComboDeviceType',
        controller + '.ListResourcesComboTelematicAttribute',
        controller + '.ListResourcesComboRelatedResource',
        controller + '.ListResourcesComboIcons',
        controller + '.ListResourcesDeviceType',
        controller + '.ListResourcesTelematicAttribute',
        controller + '.ListResourcesRelatedResource',
        controller + '.ListCountries',
        controller + '.ListCities',
        'Applications.ListCombo',
        'Applications.ListItemselector'
    ],
    stores : [
//        controller + '.ListCombo',
        controller + '.List',
        controller + '.ListResources',
        controller + '.ListLicenses',
        controller + '.ListDevices',
        controller + '.ListResourcesComboDeviceType',
        controller + '.ListResourcesComboTelematicAttribute',
        controller + '.ListResourcesComboRelatedResource',
        controller + '.ListResourcesComboIcons',
        controller + '.ListResourcesDeviceType',
        controller + '.ListResourcesTelematicAttribute',
        controller + '.ListResourcesRelatedResource',
        controller + '.ListCountries',
        controller + '.ListCities',
        controller + '.ListFilterCountries',
        controller + '.ListFilterCities',
        controller+'.ListResourcesTelematicAttributeRelatedResources',
        'Applications.ListCombo',
        'Applications.ListItemselector'
    ],
    views  :  [
//        controller + '.ConnectorList',
//         'Generics.WindowCreate'
    ],
    refs   : [{
        ref      : controller + 'Form',
        selector : 'Alias'+ controller + 'Form'
    }],
    init : function() {
		objController = this;
		
    	var winForm, winFormResources, winFormLicenses, winFormDevices, winFormCreateLicenses, winFormCreateResources, winFormCreateDevices, winFormAddAttributesCreateResources, winFormAddDevicesCreateResources, winFormAddRelatedResourcesCreateResources, winFormRelatedResourcesAddAttributesCreateResources;
        var editRelatedResources = 0;
        var arrayIds = [], arrayNames = [];
        /**
        * get current token
        */
        var token = this.token();
        if(token) {
            Ext.Ajax.useDefaultXhrHeader = true;
            Ext.Ajax.cors = true;
            Ext.Ajax.defaultHeaders = {
                'Authorization': 'Bearer ' + token
            };
        }
        this.checkCompany();
        this.render(moduleConfig.template);
        //agregar botones en la parte superior del grid
        this.addListButtons();
        this.changeStyleButton();
        this.changeStyleFilterPanel();

        this.control(
            {
				/**
				* Show the contextmenu
				**/
                'AliasCompaniesList' : {
                    itemmouseenter  : this.generateTooltips,
                    itemcontextmenu : this.listContextualMenu,
                    itemclick       : this.itemClick
                }
                ,
                'AliasCompaniesList button[action=CompaniesListCreate]' : {
                    click : this.openWindowForm
                }
                ,
                'AliasCompaniesList button[action=CompaniesListDelete]' : {
                    click : this.deleteSelectedItems
                }
                ,
                //Compañía - Exportar Excel 
                'AliasCompaniesList button[action=exportXls]' : {
                    click: this.onCompanyExport
                },
                //Compañía - Exportar Excel Dispositivos
                '#CompaniesDevicesGrid button[action=exportXls]':{
                    click: this.onCompanyExportDevices
                },
                //Compañía - Exportar Excel Definición de Recursos
                '#CompaniesResourcesGrid button[action=exportXls]':{
                    click: this.onCompanyExportResources
                },
                /**
                * Contextual Menu
                */
                'menuitem[action=CompaniesContextualEdit]' : {
                    click : this.editItem
                }
                ,
                'menuitem[action=CompaniesContextualDelete]' : {
                    click : this.deleteItem
                }
                ,
                'menuitem[action=CompaniesContextualActivate]' : {
                    click : this.activateItem
                }
                ,
                'menuitem[action=CompaniesContextualDeactivate]' : {
                    click : this.deactivateItem
                }
                ,
                'menuitem[action=CompaniesContextualResources]' : {
                    click : this.openWindowResources
                }
                ,
                'menuitem[action=CompaniesContextualLicenses]' : {
                    click : this.openWindowLicenses
                }
                ,
                'menuitem[action=CompaniesContextualDevices]' : {
                    click : this.openWindowDevices
                }
                ,
                'menuitem[action=CompaniesContextualModulePlanningTracking]' : {
                    click : this.redirectModulePlanningTracking
                }
                ,
                'menuitem[action=CompaniesContextualModuleResourceTracking]' : {
                    click : this.redirectModuleResourceTracking
                }
                ,
                'menuitem[action=CompaniesContextualModuleResources]' : {
                    click : this.redirectModuleResources
                }
                ,
                'menuitem[action=CompaniesContextualModuleUsers]' : {
                    click : this.redirectModuleUsers
                }
                ,
                'menuitem[action=CompaniesContextualModuleForms]' : {
                    click : this.redirectModuleForms
                }
                ,
                'menuitem[action=CompaniesContextualModuleScheduling]' : {
                    click : this.redirectModuleScheduling
                }
                ,
                'menuitem[action=CompaniesContextualModuleRegisters]' : {
                    click : this.redirectModuleRegisters
                },
                'menuitem[action=CompaniesContextualModuleTasks]' : {
                    click : this.redirectModuleTasks
                },
                /**
                 * Filters
                 */
                '#listSearchKeyword': {
                    keyup : this.multiSearch
                }
                ,
                'AliasCompaniesFilter textfield[id=CompaniesFilterNit]' : {
                    keyup : this.multiSearch
                }
                ,
                'AliasCompaniesFilter combo[id=CompaniesFilterCountry]' : {
                    select : this.multiSearch
                }
                ,
                'AliasCompaniesFilter combo[id=CompaniesFilterCity]' : {
                    select : this.multiSearch
                }
                ,
                'AliasCompaniesFilter textfield[id=CompaniesFilterAddress]' : {
                    keyup : this.multiSearch
                }
                ,
                'AliasCompaniesFilter textfield[id=CompaniesFilterAgent]' : {
                    keyup : this.multiSearch
                }
                ,
                'AliasCompaniesFilter combo[id=CompaniesFilterStatus]' : {
                    select : this.multiSearch
                }
                ,
                'AliasCompaniesFilter button[action=clearFilters]' : {
                    click : this.clearFilters
                }
                ,
                'AliasCompaniesFilter button[action=clearFilter]' : {
                    click : this.clearFilter
                }
                ,
                'AliasCompaniesList button[action=clearFilter]' : {
                    click : this.clearFilter
                }
				/**
				* Top Buttons (Change Status Active-Inactive)
				*/
                ,
                'menuitem[action=CompaniesListActive]' : {
                    click : this.activateSelectedItems
                }
                ,
                'menuitem[action=CompaniesListInactive]' : {
                    click : this.deactivateSelectedItems
                }
                ,
				/**
				* Form Buttons
				*/
                '#CompaniesWindowsCancelButton' : {
                    click : this.closeWindowForm
                }
                ,
                '#CompaniesWindowsSaveButton' : {
                    click : this.sendDataForm
                }
                ,
                /**
                * Form Create Licenses
                */
                'button[action=CompaniesCreateLicenses]' : {
                    click : this.openWindowCreateLicenses
                }
                ,
                'button[action=CompaniesDeleteLicenses]' : {
                    click : this.deleteSelectedItemsLicenses
                }
                ,
                '#CompaniesWindowsCreateLicensesCancelButton' : {
                    click : this.closeWindowCreateLicenses
                }
                ,
                'menuitem[action=CompaniesContextualEditLicenses]' : {
                    click : this.editItemLicenses
                }
                ,
                'menuitem[action=CompaniesContextualDeleteLicenses]' : {
                    click : this.deleteItemLicenses
                }
                ,
                'combo[id=CompaniesCreateLicensesFormApplication]' : {
                    select : this.loadModulesByIdCreateLicenses
                }
                ,
                '#CompaniesWindowsCreateLicensesSaveButton' : {
                    click : this.sendDataFormCreateLicenses
                }
                ,
                'button[action=clearFilterLicenses]' : {
                    click : this.clearFilterLicenses
                }
                ,
                'textfield[id=searchKeywordLicenses]' : {
                    keyup : this.filterLicenses
                }
                ,
                /**
                * Form Licenses Buttons
                */
                '#CompaniesWindowsCloseLicenses' : {
                    click : this.closeWindowFormLicenses
                }
                ,
                /**
                * Form Resources Buttons
                */
                '#CompaniesWindowsCloseResources' : {
                    click : this.closeWindowFormResources
                }
                ,
                /**
                * Form Create Resources
                */
                'button[action=CompaniesCreateResources]' : {
                    click : this.openWindowCreateResources
                }
                ,
                'button[action=CompaniesDeleteResources]' : {
                    click : this.deleteSelectedItemsResources
                }
                ,
                '#CompaniesWindowsCreateResourcesCancelButton' : {
                    click : this.closeWindowCreateResources
                }
                ,
                'menuitem[action=CompaniesContextualEditResources]' : {
                    click : this.editItemResources
                }
                ,
                'menuitem[action=CompaniesContextualDeleteResources]' : {
                    click : this.deleteItemResources
                }
                ,
                '#CompaniesWindowsCreateResourcesSaveButton' : {
                    click : this.sendDataFormCreateResources
                }
                ,
                'combo[id=CompaniesCreateResourcesFormTemplate]' : {
                   select : this.loadAttributeCreateResources
                }
                ,
                'button[action=clearFilterResources]' : {
                    click : this.clearFilterResources
                }
                ,
                'textfield[id=searchKeywordResources]' : {
                    keyup : this.filterResources
                }
                ,
                /**
                * Form Add Devices Definitions @ Resources
                */
                '#CompaniesAddDevicesCreateResources' : {
                    click : this.openWindowAddDevicesCreateResources
                }
                ,
                '#CompaniesWindowsAddDevicesCreateResourcesCancelButton' : {
                    click : this.closeWindowAddDevicesCreateResources
                }
                ,
                '#CompaniesWindowsAddDevicesCreateResourcesSaveButton' : {
                    click : this.addDevicesCreateResources
                }
                ,
                '#CompaniesRemoveDevicesCreateResources' : {
                    click : this.removeDevicesCreateResources
                }
                ,
                /**
                * Form Add Custom Attributes @ Resources
                */
                '#CompaniesAddAttributesCreateResources' : {
                    click : this.addAttributesCreateResources
                }
                ,
                '#CompaniesRemoveAttributesCreateResources' : {
                    click : this.removeAttributesCreateResources
                }
                ,
                'menuitem[action=CompaniesContextualDeleteDevicesDefinitionsCreateResources]' : {
                    click : this.removeDevicesCreateResources
                }
                ,
                'menuitem[action=CompaniesContextualDeleteCustomsAttributesCreateResources]' : {
                    click : this.removeAttributesCreateResources
                }
                ,
                'menuitem[action=CompaniesContextualDeleteRelatedResourcesCreateResources]' : {
                    click : this.removeRelatedResourcesCreateResources
                }
                ,
                'menuitem[action=CompaniesContextualEditRelatedResourcesCreateResources]' : {
                    click : this.editRelatedResourcesCreateResources
                }
                ,
                /**
                * Form Add Related Resources @ Resources
                */
                '#CompaniesAddRelatedResourcesCreateResources' : {
                    click : this.openWindowAddRelatedResourcesCreateResources
                }
                ,
                '#CompaniesRemoveRelatedResourcesCreateResources' : {
                    click : this.removeRelatedResourcesCreateResources
                }
                ,
                '#CompaniesWindowsAddRelatedResourcesCreateResourcesCancelButton' : {
                    click : this.closeWindowAddRelatedResourcesCreateResources
                }
                ,
                '#CompaniesWindowsAddRelatedResourcesCreateResourcesSaveButton' : {
                    click : this.addRelatedResourcesCreateResources
                }
                ,
                /**
                * Form Add Custom Attributes @ Related Resources
                */
                '#CompaniesRelatedResourcesAddAttributesCreateResources' : {
                    click : this.addAttributesRelatedResourcesCreateResources
                }
                ,
                '#CompaniesRelatedResourcesRemoveAttributesCreateResources' : {
                    click : this.removeAttributesRelatedResourcesCreateResources
                }
                ,
                'combo[id=CompaniesAddRelatedResourcesCreateResourcesFormTemplate]' : {
                   select : this.loadAttributeRelatedResourcesCreateResources
                }
                ,
                'menuitem[action=CompaniesContextualDeleteRelatedResourcesAddAttributesCreateResources]' : {
                    click : this.removeAttributesRelatedResourcesCreateResources
                }
                ,
                /**
                * Module Devices
                * Top Buttons
                */
                'button[action=CompaniesCreateDevices]' : {
                    click : this.openWindowCreateDevices
                }
                ,
                '#CompaniesWindowsCloseDevices' : {
                    click : this.closeWindowFormDevices
                }
                ,
                'button[action=CompaniesDeleteDevices]' : {
                    click : this.deleteSelectedItemsDevices
                }
                ,
                'menuitem[action=CompaniesActiveDevices]' : {
                    click : this.activateSelectedItemsDevices
                }
                ,
                'menuitem[action=CompaniesLockDevices]' : {
                    click : this.lockSelectedItemsDevices
                }
                /**
                * Contextual Menu
                */
                ,
                'menuitem[action=CompaniesContextualEditDevices]' : {
                    click : this.editItemDevices
                }
                ,
                'menuitem[action=CompaniesContextualDeleteDevices]' : {
                    click : this.deleteItemDevices
                }
                ,
                'menuitem[action=CompaniesContextualActivateDevices]' : {
                    click : this.activateItemDevices
                }
                ,
                'menuitem[action=CompaniesContextualLockDevices]' : {
                    click : this.lockItemDevices
                }
                ,
                /**
                * Form Create Devices
                * Top Buttons
                */
                'combo[id=CompaniesCreateDevicesFormDeviceType]' : {
                   select : this.loadAttributeCreateDevices
                }
                ,
                '#CompaniesWindowsCreateDevicesSaveButton' : {
                    click : this.sendDataFormCreateDevices
                }
                ,
                '#CompaniesWindowsCreateDevicesCancelButton' : {
                    click : this.closeWindowCreateDevices
                }
                ,
                'button[action=clearFilterDevices]' : {
                    click : this.clearFilterDevices
                }
                ,
                'button[action=clearFilterDeviceType]' : {
                    click : this.clearFilterDeviceType
                }
                ,
                'button[action=clearFilterStatus]' : {
                    click : this.clearFilterStatus
                }
                ,
                'textfield[id=searchKeywordDevices]' : {
                    keyup : this.filterDevices
                }
                ,
                'combo[id=searchKeywordDeviceType]' : {
                    select : this.filterDevices
                }
                ,
                'combo[id=searchKeywordStatus]' : {
                    select : this.filterDevices
                }

            }
        );
    }
    ,
	/**
	* Contextual Menu
	*/
	editItem : function() {
        var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
        var record = selectedRecords[0];
        var m = moduleConfig;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winForm = this.newWindowForm(m.groupIdCompanies, m.titleWindowCompanies, m.widthWindowCompanies, m.heightWindowCompanies, m.resizableWindowCompanies, m.toolbarCompanies, m.itemsFormCompanies, m.bottomButtonsCompanies);
        winForm.show();
        var maskCombo = new Ext.LoadMask(Ext.getCmp(controller+'ModuleWindow').el, {
            useMsg : true,
            msg    : translate.global.MsgGetData
        });
        maskCombo.show();
        Ext.getCmp(moduleConfig.groupIdCompanies+'Form').getForm().setValues(record.getData());
        var recordFields = record.getData();
        this.loadAndSetComboCountryAndCity(recordFields.country, recordFields.city, maskCombo);
	}
    ,
    loadAndSetComboCountryAndCity: function(country, city, maskCombo){
        var comboCountry = Ext.getCmp(controller + 'FormCountry');
        var comboCities = Ext.getCmp(controller + 'FormCity');
        comboCountry.clearValue();
        comboCountry.reset();
        comboCountry.store.clearFilter();
        comboCountry.store.pageSize = 10000;
        comboCountry.store.load({
            limit : -1,
            page  : 1,
            callback: function () {
                comboCountry.setRawValue(country);
                var recordCountry = comboCountry.store.findRecord('country', country);
                var iso = recordCountry.data.ISO;
                comboCities.clearValue();
                comboCities.reset();
                comboCities.store.clearFilter();
                comboCities.store.pageSize = 10000;
                comboCities.store.proxy.extraParams = {
                    limit : -1,
                    page  : 1,
                    filters : Ext.JSON.encode({
                        "and":[{
                            "field"      : "ISO",
                            "comparison" : "eq",
                            "value"      : iso
                        }]
                    })
                };
                comboCities.store.load();
                comboCities.enable();
                comboCities.setRawValue(city);
                maskCombo.destroy();
            }
        });
    },
    deleteItem : function() {
        var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
        var record = selectedRecords[0];
        var id_company = record.get(moduleConfig.grid.idField);

        Ext.Msg.confirm(translatecompanies.confirmTitle, translatecompanies.confirmDelete, function(btn) {
            if (btn === 'yes') {
                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                Ext.Ajax.request({
                    url      : moduleConfig.services.url+'/'+id_company,
                    method   : 'DELETE',
                    scope    : this,
                    type     : 'rest',
                    dataType : 'json',
                    success  : function(response) {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.delete+' '+translatecompanies.form.company,
                            msg     : translatecompanies.form.MsgSuccessDelete,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        Ext.data.StoreManager.lookup("Companies.List").reload();
                    },
                    failure  : function(response) {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.delete+' '+translatecompanies.form.company,
                            msg     : translatecompanies.form.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
	}
	,
    activateItem : function() {
        var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
        var record = selectedRecords[0];
        var id_company = record.get(moduleConfig.grid.idField);
        var status = record.get('status');

        if(status == 'active') {
            Ext.MessageBox.show({
                title   : translate.global.active+' '+translatecompanies.form.company,
                msg     : translatecompanies.form.MsgStatusActive,
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.WARNING
            });
        } else {
            var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
            Ext.Ajax.request({
                url    : moduleConfig.services.url+'/'+id_company,
                type     : 'rest',
                dataType : 'json',
                method   : 'PUT',
                scope    : this,
                params   : Ext.JSON.encode({'status' : 'active'}),
                success  : function(response) {
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title   : translate.global.active+' '+translatecompanies.form.company,
                        msg     : translatecompanies.form.MsgSuccessActivate,
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.INFO
                    });
                    Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
                    Ext.data.StoreManager.lookup("Companies.List").reload();
                },
                failure  : function(response) {
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title   : translate.global.active+' '+translatecompanies.form.company,
                        msg     : translatecompanies.form.MsgError,
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.ERROR
                    });
                }
            });

        }
	}
	,
    deactivateItem : function() {
        var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
        var record = selectedRecords[0];
        var id_company = record.get(moduleConfig.grid.idField);
        var status = record.get('status');

        if(status == 'inactive') {
            Ext.MessageBox.show({
                title   : translate.global.inactive+' '+translatecompanies.form.company,
                msg     : translatecompanies.form.MsgStatusInactive,
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.WARNING
            });
        } else {
            var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
            Ext.Ajax.request({
                url    : moduleConfig.services.url+'/'+id_company,
                type     : 'rest',
                dataType : 'json',
                method   : 'PUT',
                scope    : this,
                params   : Ext.JSON.encode({'status' : 'inactive'}),
                success  : function(response) {
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title   : translate.global.inactive+' '+translatecompanies.form.company,
                        msg     : translatecompanies.form.MsgSuccessDeactivate,
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.INFO
                    });
                    Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
                    Ext.data.StoreManager.lookup("Companies.List").reload();
                },
                failure  : function(response) {
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title   : translate.global.inactive+' '+translatecompanies.form.company,
                        msg     : translatecompanies.form.MsgError,
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.ERROR
                    });
                }
            });

        }
	}
    ,
	/**
	* Top Buttons Actions
	* Open Window 'Crear Empresas'
	*/
    openWindowForm : function () {
        var m = moduleConfig;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winForm = this.newWindowForm(m.groupIdCompanies, m.titleWindowCompanies, m.widthWindowCompanies, m.heightWindowCompanies, m.resizableWindowCompanies, m.toolbarCompanies, m.itemsFormCompanies, m.bottomButtonsCompanies);
        winForm.show();
    }
    ,
	/**
	* Close Window 'Crear/Modificar Empresas'
	*/
    closeWindowForm : function () {
        winForm.destroy();
    }
    ,
	/**
	* Top Buttons Actions
	* Activate Selected Items (Change Status Inactive)
	*/
    activateSelectedItems : function() {

        var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();

        if(selectedRecords.length > 0){

            Ext.Msg.confirm(translatecompanies.confirmTitle, translatecompanies.confirmActivate, function(btn) {

            if (btn === 'yes') {

                for (var i = 0, len = selectedRecords.length; i < len; i++) {

                    var record = selectedRecords[i];
                    var id_company = record.get(moduleConfig.grid.idField);
                    var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

                    Ext.Ajax.request({
                        url    : moduleConfig.services.url+'/'+id_company,
                        type     : 'rest',
                        dataType : 'json',
                        method   : 'PUT',
                        scope    : this,
                        params   : Ext.JSON.encode({'status' : 'active'}),
                        success  : function(response) {
                            if (i == len) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.active+' '+translatecompanies.form.companies,
                                    msg     : translatecompanies.form.MsgSuccessActivatePlural,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.INFO
                                });
                            }
                            Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
                            Ext.data.StoreManager.lookup("Companies.List").reload();
                        },
                        failure  : function(response) {
                            msgWait.hide();
                            Ext.MessageBox.show({
                                title   : 'Error',
                                msg     : translatecompanies.form.MsgError,
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
	/**
	* Top Buttons Actions
	* Deactivate Selected Items (Change Status Inactive)
	*/
    deactivateSelectedItems : function() {

        var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();

        if(selectedRecords.length > 0){

            Ext.Msg.confirm(translatecompanies.confirmTitle, translatecompanies.confirmDeactivate, function(btn) {

            if (btn === 'yes') {

                for (var i = 0, len = selectedRecords.length; i < len; i++) {

                    var record = selectedRecords[i];
                    var id_company = record.get(moduleConfig.grid.idField);
                    var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

                    Ext.Ajax.request({
                        url    : moduleConfig.services.url+'/'+id_company,
                        type     : 'rest',
                        dataType : 'json',
                        method   : 'PUT',
                        scope    : this,
                        params   : Ext.JSON.encode({'status' : 'inactive'}),
                        success  : function(response) {
                            if (i == len) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.inactive+' '+translatecompanies.form.companies,
                                    msg     : translatecompanies.form.MsgSuccessDeactivatePlural,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.INFO
                                });
                            }
                            Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
                            Ext.data.StoreManager.lookup("Companies.List").reload();
                        },
                        failure  : function(response) {
                            msgWait.hide();
                            Ext.MessageBox.show({
                                title   : 'Error',
                                msg     : translatecompanies.form.MsgError,
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
	/**
	* Top Buttons Actions
	* Delete Selected Items
	*/
    deleteSelectedItems : function() {

        var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();

        if(selectedRecords.length > 0){

            Ext.Msg.confirm(translatecompanies.confirmTitle, translatecompanies.confirmDelete, function(btn) {

            if (btn === 'yes') {

                for (var i = 0, len = selectedRecords.length; i < len; i++) {

                    var record = selectedRecords[i];
                    var id_company = record.get(moduleConfig.grid.idField);
                    var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

                    Ext.Ajax.request({
                        url    : moduleConfig.services.url+'/'+id_company,
                        type     : 'rest',
                        dataType : 'json',
                        method   : 'DELETE',
                        scope    : this,
                        success  : function(response) {
                            if (i == len) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.delete+' '+translatecompanies.form.companies,
                                    msg     : translatecompanies.form.MsgSuccessDeletePlural,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.INFO
                                });
                            }
                            Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
                            Ext.data.StoreManager.lookup("Companies.List").reload();
                        },
                        failure  : function(response) {
                            msgWait.hide();
                            Ext.MessageBox.show({
                                title   : 'Error',
                                msg     : translatecompanies.form.MsgError,
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
	/**
	* Select Item @ Users Store
	*/
	itemClick : function(dv, record, item, index, e) {
		//
    }
    ,
	/**
	* Send info 'Crear/Modificar Empresas'
	*/
    sendDataForm : function () {
        var form = Ext.getCmp(moduleConfig.groupIdCompanies+'Form').getForm();
        var id_company = form.findField("_id").getValue();

        /* El formulario tiene los campos llenos */
        if (form.isValid()) {

            /* Si el valor del ID de la Empresa es vacío almacena por 1ra vez */
            if (id_company == '') {
                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                Ext.Ajax.request({
                    url      : moduleConfig.services.url,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'POST',
                    scope    : this,
                    params   : Ext.JSON.encode({
                        'nit'                         : form.findField("nit").getValue(),
                        'name'                        : form.findField("name").getValue(),
                        'phone'                       : form.findField("phone").getValue(),
                        'address'                     : form.findField("address").getValue(),
                        'id_country'                  : form.findField("country").getValue(),
                        'id_city'                     : form.findField("city").getValue(),
                        'legalRepresentativeId'       : form.findField("legalRepresentativeId").getValue(),
                        'legalRepresentativeName'     : form.findField("legalRepresentativeName").getValue(),
                        'legalRepresentativeLastName' : form.findField("legalRepresentativeLastName").getValue(),
                        'legalRepresentativePhone'    : form.findField("legalRepresentativePhone").getValue(),
                        'status'                      : 'active'
                    }),
                    success  : function(response){
                        var res = response.responseText;
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.create+' '+translatecompanies.form.company,
                            msg     : translatecompanies.form.MsgSuccessCreate,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
                        Ext.data.StoreManager.lookup(controller+".List").reload();
                        winForm.destroy();
                    },
                    failure  : function(response) {
                        var res = response.responseText;
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.create+' '+translatecompanies.form.company,
                            msg     : translatecompanies.form.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });
            } else {
                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                Ext.Ajax.request({
                    url      : moduleConfig.services.url+'/'+id_company,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'PUT',
                    scope    : this,
                    params   : Ext.JSON.encode({
                        'nit'                         : form.findField("nit").getValue(),
                        'name'                        : form.findField("name").getValue(),
                        'phone'                       : form.findField("phone").getValue(),
                        'address'                     : form.findField("address").getValue(),
                        'id_country'                  : form.findField("country").getValue(),
                        'id_city'                     : form.findField("city").getValue(),
                        'legalRepresentativeId'       : form.findField("legalRepresentativeId").getValue(),
                        'legalRepresentativeName'     : form.findField("legalRepresentativeName").getValue(),
                        'legalRepresentativeLastName' : form.findField("legalRepresentativeLastName").getValue(),
                        'legalRepresentativePhone'    : form.findField("legalRepresentativePhone").getValue(),
                        'status'                      : 'active'
                    }),
                    success  : function(response){
                        var res = response.responseText;
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translatecompanies.form.company,
                            msg     : translatecompanies.form.MsgSuccessEdit,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
                        Ext.data.StoreManager.lookup(controller+".List").reload();
                        winForm.destroy();
                    },
                    failure  : function(response) {
                        var res = response.responseText;
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translatecompanies.form.company,
                            msg     : translatecompanies.form.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        }
    }
    ,
    /**
    * Search criteria @ Companies Store
    */
    multiSearch : function () {
        /**
        * Get Store
        */
        var store = Ext.data.StoreManager.lookup("Companies.List");
        /**
        * search fields
        */
        var nit = Ext.getCmp(controller + 'FilterNit').getValue();
        var country = Ext.getCmp(controller + 'FilterCountry').getValue();
        var city = Ext.getCmp(controller + 'FilterCity').getValue();
        var address = Ext.getCmp(controller + 'FilterAddress').getValue();
        var agent = Ext.getCmp(controller + 'FilterAgent').getValue();
        var status = Ext.getCmp(controller + 'FilterStatus').getValue();
        var searchKeyword = Ext.getCmp('listSearchKeyword').getValue();
        /**
        * Json filter
        */
        var jsonSearch = new Object();
        var jsonOr = new Object();
        var jsonOrAgent = new Object();

        jsonSearch.and = [];

        if (nit != '') {
            jsonSearch.and.push(
                {
                    field      : 'nit',
                    comparison : 'lk',
                    value      : nit
                }
            );
        }

        if (country != null && country != '') {
            jsonSearch.and.push(
                {
                    field      : 'id_country',
                    comparison : 'eq',
                    value      : country
                }
            );
        }

        if (city != null && city != '') {
            jsonSearch.and.push(
                {
                    field      : 'id_city',
                    comparison : 'eq',
                    value      : city
                }
            );
        }

        if (address != '') {
            jsonSearch.and.push(
                {
                    field      : 'address',
                    comparison : 'lk',
                    value      : address
                }
            );
        }

        //Búsqueda OR... (agent @ advanced filters)
        if (agent != '') {
            jsonOrAgent.or = [
                {
                    field      : 'legalRepresentativeName',
                    comparison : 'lk',
                    value      : agent
                }
                ,
                {
                    field      : 'legalRepresentativeLastName',
                    comparison : 'lk',
                    value      : agent
                }
                ,
                {
                    field      : 'legalRepresentativeId',
                    comparison : 'lk',
                    value      : agent
                }
                ,
                {
                    field      : 'legalRepresentativePhone',
                    comparison : 'lk',
                    value      : agent
                }
            ];
            jsonSearch.and.push(jsonOrAgent);
        }

        if (status != null) {
            jsonSearch.and.push(
                {
                    field      : 'status',
                    comparison : 'eq',
                    value      : status
                }
            );
        }

        //Búsqueda OR... (top searchfield)
        if (searchKeyword !='') {
            jsonOr.or = [
                {
                    field      : 'name',
                    comparison : 'lk',
                    value      : searchKeyword
                }
                ,
                {
                    field      : 'phone',
                    comparison : 'lk',
                    value      : searchKeyword
                }
            ];
            jsonSearch.and.push(jsonOr);
        }

        Ext.Ajax.abort(store.proxy.activeRequest);
        store.proxy.extraParams = {
            filters : Ext.JSON.encode(jsonSearch)
        };
        store.loadPage(1);
    }
    ,
/**********************************************
************** Module Licenses ****************
***********************************************/
    loadStoreByIdLicenses : function (id, storeId) {
        var store = Ext.data.StoreManager.lookup(storeId);
        store.clearData();
        store.proxy.url = strURL +'/companies/'+id+'/licenses';
        store.proxy.extraParams = {
            filters : Ext.JSON.encode({
                "and":[{
                    "field"      : "id_company",
                    "comparison" : "eq",
                    "value"      : id
                }]
            })
        };
        store.load();
    }
    ,
    openWindowLicenses : function() {
        var m = moduleConfig;
        /** newWindowGrid(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, store, columns, menuItem, bottomButtons) **/
        winFormLicenses = this.newWindowGrid(m.groupIdLicenses, m.titleWindowLicenses, m.widthWindowLicenses, m.heightWindowLicenses, m.resizableWindowLicenses, m.toolbarLicenses, m.storeLicenses, m.columnsLicenses, m.menuItemLicenses, m.bottomButtonsLicenses, m.pluginsLicenses);
        winFormLicenses.show();
        var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
        var record = selectedRecords[0];
        var id_company = record.get(m.grid.idField);
        this.loadStoreByIdLicenses(id_company, m.storeLicenses);
    }
    ,
    closeWindowFormLicenses : function () {
        winFormLicenses.destroy();
    }
    ,
    /**
    * Open Window 'Crear/Modificar Licencias'
    */
    openWindowCreateLicenses : function() {
        var m = moduleConfig;
        Ext.getCmp(m.groupIdLicenses+'Grid').getSelectionModel().deselectAll();
        m.titleWindowCreateLicenses = translate.global.create+' '+translatecompanies.licenses.titleModule;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winFormCreateLicenses = this.newWindowForm(m.groupIdCreateLicenses, m.titleWindowCreateLicenses, m.widthWindowCreateLicenses, m.heightWindowCreateLicenses, m.resizableWindowCreateLicenses, m.toolbarCreateLicenses, m.itemsFormCreateLicenses, m.bottomButtonsCreateLicenses);
        winFormCreateLicenses.show();
        var fromStore = Ext.getCmp(controller + 'CreateLicensesFormModules').fromField.boundList.getStore();
        var toStore = Ext.getCmp(controller + 'CreateLicensesFormModules').toField.boundList.getStore();
        fromStore.removeAll();
        toStore.removeAll();
    }
    ,
    editItemLicenses : function() {
        var m = moduleConfig;
        m.titleWindowCreateLicenses = translate.global.edit+' '+translatecompanies.licenses.titleModule;
        var record = Ext.getCmp(m.groupIdLicenses+'Grid').getSelectionModel().getSelection()[0];
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winFormCreateLicenses = this.newWindowForm(m.groupIdCreateLicenses, m.titleWindowCreateLicenses, m.widthWindowCreateLicenses, m.heightWindowCreateLicenses, m.resizableWindowCreateLicenses, m.toolbarCreateLicenses, m.itemsFormCreateLicenses, m.bottomButtonsCreateLicenses);
        Ext.getCmp(controller + 'CreateLicensesFormApplication').setDisabled(true);
        winFormCreateLicenses.show();

        var id = record.get('_id');
        var id_app = record.get('id_application');
        var app = record.get('Application');
        var nUsers = record.get('maxUsers');
        var nResources = record.get('maxResources');
        var allSelected = record.get('Modules');

        //Cargo todos los campos excepto Modulos (tiene otro trato)
        Ext.getCmp(controller + 'CreateLicensesFormId').setValue(id);
        Ext.getCmp(controller + 'CreateLicensesFormApplication').setValue(id_app);
        Ext.getCmp(controller + 'CreateLicensesFormApplication').setRawValue(app);
        /** Valores (NumberUsers/NumberResources) removidos a peticion de Sergio Sinuco**/
        //Ext.getCmp(controller + 'CreateLicensesFormNumberUsers').setValue(nUsers);
        //Ext.getCmp(controller + 'CreateLicensesFormNumberResources').setValue(nResources);
        //Itemselector
        var itemSelector = Ext.getCmp(controller + 'CreateLicensesFormModules');
        var fromStore = itemSelector.fromField.boundList.getStore();
        var toStore = itemSelector.toField.boundList.getStore();
        //Combo Aplicaciones
        var comboApp = Ext.getCmp(controller + 'CreateLicensesFormApplication');
        var recordCombo = comboApp.findRecord();
        var allModules = recordCombo.get('Modules');
        //Variables para Módulos
        var modules = [];
        var available = [];
        var selected = [];
        var cont = 0;

        if (allModules.length > 0) {

            for (var i=0; i < allModules.length; ++i)
            {
                modules.push(allModules[i].name);
            }

            for (var j=0; j < allSelected.length; j++)
            {
                selected.push(allSelected[j].name);
            }

            var diff = Ext.Array.difference(modules, selected);

            for (var k=0; k < diff.length; k++)
            {
                available.push({'name' : diff[k]});
            }

            fromStore.removeAll();
            fromStore.add(available);
            toStore.removeAll();
            toStore.add(allSelected);
            fromStore.resumeEvents();
            itemSelector.fromField.boundList.refresh();
            toStore.resumeEvents();
            itemSelector.toField.boundList.refresh();
            itemSelector.syncValue();
        }
    }
    ,
    /**
    * Close Window 'Crear/Modificar Licencias'
    */
    closeWindowCreateLicenses : function () {
        winFormCreateLicenses.destroy();
    }
    ,
    deleteItemLicenses : function() {

        var rec = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = rec.get(moduleConfig.grid.idField);

        var selectedRecords = Ext.getCmp(moduleConfig.groupIdLicenses+'Grid').getSelectionModel().getSelection();

        if(selectedRecords.length > 0){

            Ext.Msg.confirm(translatecompanies.confirmTitle, translatecompanies.licenses.confirmDelete, function(btn) {

                if (btn === 'yes') {
                    for (var j = 0, len = selectedRecords.length; j < len; j++) {
                        var record = selectedRecords[j];
                        var id = record.get('_id');
                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                        Ext.Ajax.request({
                            url      : moduleConfig.services.url+'/'+id_company+'/licenses/'+id,
                            type     : 'rest',
                            dataType : 'json',
                            method   : 'DELETE',
                            scope    : this,
                            success  : function(response){
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.delete+' '+translatecompanies.licenses.titleModule,
                                    msg     : translatecompanies.licenses.form.MsgSuccessDelete,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.INFO
                                });
                                Ext.data.StoreManager.lookup(controller+".ListLicenses").reload();
                            },
                            failure  : function(response) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.delete+' '+translatecompanies.licenses.titleModule,
                                    msg     : translatecompanies.form.MsgError,
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
    /**
    * Send info 'Crear/Modificar Licencias de Empresas'
    */
    sendDataFormCreateLicenses : function () {
        var form = Ext.getCmp(moduleConfig.groupIdCreateLicenses+'Form').getForm();
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        /* El formulario tiene los campos llenos */
        if (form.isValid()) {
            var store = Ext.data.StoreManager.lookup(controller+".ListLicenses");
            var exist = 0;
            var id = form.findField("_id").getValue();
            var id_application = form.findField("application").getValue();
            var application = form.findField("application").getRawValue();
            //var number_users = form.findField("number_users").getValue();
            //var number_resources = form.findField("number_resources").getValue();
            var module = form.findField("modules").getValue();
            var modules = [];
            var title = '';
            var msg = '';

            store.each(function(record) {
                if (record.data['id_application'] == id_application) {
                    exist = 1;
                }
            });

            for (var i=0; i < module.length; ++i){
                modules.push({
                    'name' : module[i]
                });
            }

            var licenses = {
                //'maxUsers'     : number_users, /** removido a petición de Sergio Sinuco **/
                //'maxResources' : number_resources, /** removido a petición de Sergio Sinuco **/
                'application'  : {
                    '_id'            : id_application,
                    'id_application' : id_application,
                    'name'           : application,
                    'modules'        : modules
                }
            };
            /* Si el valor del ID de la Licencia es vacío almacena por 1ra vez */
            if (id == '') {

                if (exist == 1) {
                    Ext.MessageBox.show({
                        title        : translate.global.create+' '+translatecompanies.licenses.titleModule,
                        msg          : translatecompanies.licenses.form.MsgErrorExist,
                        animCollapse : true,
                        buttons      : Ext.MessageBox.OK,
                        icon         : Ext.MessageBox.WARNING
                    });
                } else {
                    var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                    Ext.Ajax.request({
                        url      : moduleConfig.services.url+'/'+id_company+'/licenses',
                        type     : 'rest',
                        dataType : 'json',
                        method   : 'POST',
                        scope    : this,
                        params   : Ext.JSON.encode(licenses),
                        success  : function(response){
                            var res = response.responseText;
                            msgWait.hide();
                            Ext.MessageBox.show({
                                title   : translate.global.create+' '+translatecompanies.licenses.titleModule,
                                msg     : translatecompanies.licenses.form.MsgSuccessCreate,
                                buttons : Ext.MessageBox.OK,
                                icon    : Ext.MessageBox.INFO
                            });
                            Ext.getCmp(controller+'LicensesGrid').getSelectionModel().clearSelections();
                            Ext.data.StoreManager.lookup(controller+".ListLicenses").reload();
                            winFormCreateLicenses.destroy();
                        },
                        failure  : function(response) {
                            var res = response.responseText;
                            msgWait.hide();
                            Ext.MessageBox.show({
                                title   : translate.global.create+' '+translatecompanies.licenses.titleModule,
                                msg     : translatecompanies.form.MsgError,
                                buttons : Ext.MessageBox.OK,
                                icon    : Ext.MessageBox.ERROR
                            });
                        }
                    });
                }

            } else { /* Sino la Licencia existía y va a ser editada */
                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                //licenses['synchronize']=['modules'];
                console.log(licenses);
                Ext.Ajax.request({
                    url      : moduleConfig.services.url+'/'+id_company+'/licenses/'+id,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'PUT',
                    scope    : this,
                    params   : Ext.JSON.encode(licenses),
                    success  : function(response){
                        var res = response.responseText;
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translatecompanies.licenses.titleModule,
                            msg     : translatecompanies.licenses.form.MsgSuccessEdit,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        Ext.getCmp(controller+'LicensesGrid').getSelectionModel().clearSelections();
                        Ext.data.StoreManager.lookup(controller+".ListLicenses").reload();
                        winFormCreateLicenses.destroy();
                    },
                    failure  : function(response) {
                        var res = response.responseText;
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translatecompanies.licenses.titleModule,
                            msg     : translatecompanies.form.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        }
    }
    ,
    /**
    * Load Modules @ Form 'Crear/Modificar Licencias'
    */
    loadModulesByIdCreateLicenses : function (combo, record, index) {
        var modules = record[0].get('Modules');
        if(modules.length > 0) {
            var itemSelector = Ext.getCmp(controller + 'CreateLicensesFormModules');
            var fromStore = itemSelector.fromField.boundList.getStore();
            var toStore = itemSelector.toField.boundList.getStore();
            fromStore.removeAll();
            toStore.removeAll();

            for (var i=0; i < modules.length; i++)
            {
                fromStore.add({
                    'name' : modules[i].name
                });
            }
            fromStore.resumeEvents();
            itemSelector.fromField.boundList.refresh();
            toStore.resumeEvents();
            itemSelector.toField.boundList.refresh();
            itemSelector.syncValue();
        }
    }
    ,
    /**
    * Top Buttons Actions
    * Delete Selected Items
    */
    deleteSelectedItemsLicenses : function() {
        this.deleteItemLicenses();
    }
    ,
    filterLicenses : function() {
        var jsonSearch = new Object();
        var jsonOr = new Object();
        var store = Ext.data.StoreManager.lookup(controller+'.ListLicenses');
        var searchKeyword = Ext.getCmp('searchKeywordLicenses').getValue();
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        jsonSearch.and = [];
        jsonSearch.and.push(
            {
                field      : 'id_company',
                comparison : 'eq',
                value      : id_company
            }
        );
        if (searchKeyword !='') {
            jsonOr.or = [];

            jsonOr.or.push(
                {
                    field      : 'application.name',
                    comparison : 'lk',
                    value      : searchKeyword
                }
                ,
                {
                    field      : 'maxUsers',
                    comparison : 'lk',
                    value      : searchKeyword
                }
                ,
                {
                    field      : 'maxResources',
                    comparison : 'lk',
                    value      : searchKeyword
                }
            );
            jsonSearch.and.push(jsonOr);
        }
        Ext.Ajax.abort(store.proxy.activeRequest);
        store.proxy.extraParams = {
            filters : Ext.JSON.encode(jsonSearch)
        };
        store.reload();
    }
    ,
    clearFilterLicenses : function() {
        Ext.getCmp('searchKeywordLicenses').setValue('');
        var store = Ext.data.StoreManager.lookup(controller+'.ListLicenses');
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        store.clearData();
        store.proxy.extraParams = {
            filters : Ext.JSON.encode({
                "and":[{
                    "field"      : "id_company",
                    "comparison" : "eq",
                    "value"      : id_company
                }]
            })
        };
        store.load();
    }
    ,
/**********************************************
************** Module Resources ***************
***********************************************/
    loadStoreByIdResources : function (id, storeId) {
        var store = Ext.data.StoreManager.lookup(storeId);
        store.clearData();
        store.proxy.extraParams = {
            filters : Ext.JSON.encode({
                "and":[
                {
                    "field"      : "id_company",
                    "comparison" : "eq",
                    "value"      : id
                }
                ,
                {
                    "field"      : "isSystem",
                    "comparison" : "eq",
                    "value"      : false
                }
                ]
            })
        };
        store.load();
    }
    ,
    openWindowResources : function() 
    {
        var m = moduleConfig;
        /** newWindowGrid(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, store, columns, menuItem, bottomButtons) **/
        winFormResources = this.newWindowGrid(
            m.groupIdResources, 
            m.titleWindowResources, 
            m.widthWindowResources, 
            m.heightWindowResources, 
            m.resizableWindowResources, 
            m.toolbarResources, 
            m.storeResources, 
            m.columnsResources, 
            m.menuItemResources, 
            m.bottomButtonsResources, 
            m.pluginsResources,
            m.toolbarButtonsResources
        );

        winFormResources.show();

        var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
        var record = selectedRecords[0];
        var id_company = record.get(m.grid.idField);
        
        this.loadStoreByIdResources(id_company, m.storeResources);
    }
    ,
    closeWindowFormResources : function() {
        //Ext.StoreMgr.lookup(controller + 'StoreRolApp').clearData();
        winFormResources.destroy();
    }
    ,
    /**
    * Open Window 'Crear/Modificar Recursos'
    */
    openWindowCreateResources : function() {
        var m = moduleConfig;
        Ext.getCmp(m.groupIdResources+'Grid').getSelectionModel().deselectAll();
        m.titleWindowCreateResources = translate.global.create+' '+translatecompanies.resources.titleModule;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winFormCreateResources = this.newWindowForm(m.groupIdCreateResources, m.titleWindowCreateResources, m.widthWindowCreateResources, m.heightWindowCreateResources, m.resizableWindowCreateResources, m.toolbarCreateResources, m.itemsFormCreateResources, m.bottomButtonsCreateResources);
        winFormCreateResources.show();
        Ext.getCmp(controller + 'CreateResourcesFormTemplate').enable();
        var storeAttributes = Ext.data.StoreManager.lookup(controller+'.ListResourcesTelematicAttribute');
        var storeDevices = Ext.data.StoreManager.lookup(controller+'.ListResourcesDeviceType');
        var storeResources = Ext.data.StoreManager.lookup(controller+'.ListResourcesRelatedResource');
        storeAttributes.removeAll();
        storeDevices.removeAll();
        storeResources.removeAll();
    }
    ,
    /**
    * Close Window 'Crear/Modificar Recursos'
    */
    closeWindowCreateResources : function() {
        var storeAttributes = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttribute');
        var storeDevices = Ext.StoreMgr.lookup(controller + '.ListResourcesDeviceType');
        var storeResources = Ext.StoreMgr.lookup(controller + '.ListResourcesRelatedResource');
        storeAttributes.removeAll(); //clear values store attributes
        storeDevices.removeAll(); //clear values store devices
        storeResources.removeAll(); //clear values store resources
        winFormCreateResources.destroy();
    }
    ,
    /**
    * Edit Resources
    */
    editItemResources : function() {
        var m = moduleConfig;
        m.titleWindowCreateResources = translate.global.edit+' '+translatecompanies.resources.titleModule;
        var record = Ext.getCmp(m.groupIdResources+'Grid').getSelectionModel().getSelection()[0];
        /** newWindowFormGrid(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, toolbarGrid, store, columns, menuitem, bottomButtons) **/
        winFormCreateResources = this.newWindowForm(m.groupIdCreateResources, m.titleWindowCreateResources, m.widthWindowCreateResources, m.heightWindowCreateResources, m.resizableWindowCreateResources, m.toolbarCreateResources, m.itemsFormCreateResources, m.bottomButtonsCreateResources);
        winFormCreateResources.show();
        Ext.getCmp(controller + 'CreateResourcesFormTemplate').disable();

        var id = record.get('_id');
        var name = record.get('name');
        var limit = record.get('limit');
        var icon = record.get('id_icon');
        var routingTool = record.get('routingTool');
        var devices = record.get('Devices');
        var attributes = record.get('Attributes');
        var resources = record.get('Resources');
        var storeAttributes = Ext.data.StoreManager.lookup(controller+'.ListResourcesTelematicAttribute');
        var storeDevices = Ext.data.StoreManager.lookup(controller+'.ListResourcesDeviceType');
        var storeResources = Ext.data.StoreManager.lookup(controller+'.ListResourcesRelatedResource');

        Ext.getCmp(controller + 'CreateResourcesFormId').setValue(id);
        Ext.getCmp(controller + 'CreateResourcesName').setValue(name);
        Ext.getCmp(controller + 'CreateResourcesFormLimit').setValue(limit);
        Ext.getCmp(controller + 'CreateResourcesFormIcon').setValue(icon);
        Ext.getCmp(controller + 'CreateResourcesFormRoutingTool').setValue(routingTool);

        storeAttributes.removeAll();
        storeDevices.removeAll();
        storeResources.removeAll();

        Ext.each(attributes, function(value, key) {
            storeAttributes.add({
                'xtype'      : value.xtype,
                'fieldLabel' : value.fieldLabel,
                'allowBlank' : value.allowBlank,
                'mandatory'  : value.mandatory
            });
        });

        Ext.each(devices, function(value, key) {
            storeDevices.add({
                'id_deviceDefinition'  : value.id_deviceDefinition,
                'deviceDefinitionName' : value.deviceDefinitionName,
                'allowBlank'           : value.allowBlank,
                'mandatory'            : value.mandatory
            });
        });

        Ext.each(resources, function(value, key) {
            storeResources.add({
                'id_resourceDefinition' : value.id_resourceDefinition,
                'name'                  : value.name,
                'Attributes'            : value.customAttributes
            });
        });
    }
    ,
    /**
    * Top Buttons Actions
    * Delete Selected Resources Items
    */
    deleteSelectedItemsResources : function() {
        this.deleteItemResources();
    }
    ,
    /**
    * Menuitem Resources Actions
    * Delete Selected Resources Items
    */
    deleteItemResources : function() {

        var selectedRecords = Ext.getCmp(moduleConfig.groupIdResources+'Grid').getSelectionModel().getSelection();

        if(selectedRecords.length > 0){

            Ext.Msg.confirm(translatecompanies.confirmTitle, translatecompanies.resources.confirmDelete, function(btn) {

                if (btn === 'yes') {
                    for (var j = 0, len = selectedRecords.length; j < len; j++) {
                        var record = selectedRecords[j];
                        var id = record.get('_id');
                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                        Ext.Ajax.request({
                            url      : moduleConfig.services.urlResources+'/'+id,
                            type     : 'rest',
                            dataType : 'json',
                            method   : 'DELETE',
                            scope    : this,
                            success  : function(response){
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.delete+' '+translatecompanies.resources.titleModule,
                                    msg     : translatecompanies.resources.form.MsgSuccessDelete,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.INFO
                                });
                                Ext.data.StoreManager.lookup(controller+".ListResources").reload();
                            },
                            failure  : function(response) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.delete+' '+translatecompanies.resources.titleModule,
                                    msg     : translatecompanies.form.MsgError,
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
    /**
    * Send info 'Crear/Modificar Recursos de Empresas'
    */
    sendDataFormCreateResources : function () {
        var form = Ext.getCmp(moduleConfig.groupIdCreateResources+'Form').getForm();
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        /* El formulario tiene los campos llenos */
        if (form.isValid()) {
            var store = Ext.data.StoreManager.lookup(controller+".ListResources");
            var exist = 0;
            var id = form.findField("_id").getValue();
            var name = form.findField("name").getValue();
            var limit = form.findField("limit").getValue();
            var icon = form.findField("icon").getValue();
            var routingTool = form.findField("routingTool").getValue();
            var storeAttributes = Ext.data.StoreManager.lookup(controller+'.ListResourcesTelematicAttribute');
            var customAttributes = [];
            var storeDevices = Ext.data.StoreManager.lookup(controller+'.ListResourcesDeviceType');
            var deviceDefinitions = [];
            var storeResources = Ext.data.StoreManager.lookup(controller+'.ListResourcesRelatedResource');
            var resourceDefinitions = [];

            store.each(function(record) {
                if (record.data['_id'] == id) {
                    exist = 1;
                }
            });

            storeAttributes.each(function(record) {
                customAttributes.push({
                    'xtype'      : record.data['xtype'],
                    'fieldLabel' : record.data['fieldLabel'],
                    'allowBlank' : record.data['allowBlank'],
                    'mandatory'  : record.data['mandatory']
                });
            });

            storeDevices.each(function(record) {
                deviceDefinitions.push({
                    'id_deviceDefinition'  : record.data['id_deviceDefinition'],
                    'deviceDefinitionName' : record.data['deviceDefinitionName'],
                    'allowBlank'           : record.data['allowBlank'],
                    'mandatory'            : record.data['mandatory']
                });
            });

            storeResources.each(function(record) {
                var attributes = [];
                var attribs = record.data['Attributes'];
                Ext.each(attribs, function(value, key) {
                    attributes.push({
                        'xtype'      : value.xtype,
                        'fieldLabel' : value.fieldLabel,
                        'allowBlank' : value.allowBlank,
                        'mandatory'  : value.mandatory
                    });
                });
                resourceDefinitions.push({
                    'id_resourceDefinition' : record.data['id_resourceDefinition'],
                    'name'                  : record.data['name'],
                    'customAttributes'      : attributes
                });
            });

            /* Si el valor del ID del Recurso es vacío almacena por 1ra vez */
            if (id == '') {

                var resources = {
                    'id_company'          : id_company,
                    'name'                : name,
                    'limit'               : limit,
                    'id_icon'             : icon,
                    'routingTool'         : routingTool,
                    'customAttributes'    : customAttributes,
                    'deviceDefinitions'   : deviceDefinitions,
                    'resourceDefinitions' : resourceDefinitions,
                    'isSystem'            : false
                };

                if (exist == 1) {
                    Ext.MessageBox.show({
                        title        : translate.global.create+' '+translatecompanies.resources.titleModule,
                        msg          : translatecompanies.resources.form.MsgErrorExist,
                        animCollapse : true,
                        buttons      : Ext.MessageBox.OK,
                        icon         : Ext.MessageBox.WARNING
                    });
                } else {
                    var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                    Ext.Ajax.request({
                        url      : moduleConfig.services.urlResources,
                        type     : 'rest',
                        dataType : 'json',
                        method   : 'POST',
                        scope    : this,
                        params   : Ext.JSON.encode(resources),
                        success  : function(response){
                            var res = response.responseText;
                            msgWait.hide();
                            Ext.MessageBox.show({
                                title   : translate.global.create+' '+translatecompanies.resources.titleModule,
                                msg     : translatecompanies.resources.form.MsgSuccessCreate,
                                buttons : Ext.MessageBox.OK,
                                icon    : Ext.MessageBox.INFO
                            });
                            Ext.getCmp(controller+'ResourcesGrid').getSelectionModel().clearSelections();
                            Ext.data.StoreManager.lookup(controller+".ListResources").reload();
                            winFormCreateResources.destroy();
                        },
                        failure  : function(response) {
                            var res = response.responseText;
                            msgWait.hide();
                            Ext.MessageBox.show({
                                title   : translate.global.create+' '+translatecompanies.resources.titleModule,
                                msg     : translatecompanies.form.MsgError,
                                buttons : Ext.MessageBox.OK,
                                icon    : Ext.MessageBox.ERROR
                            });
                        }
                    });
                }

            } else { /* Sino el Recurso existía y va a ser editado */
                var resources = {
                    'id_company'          : id_company,
                    'name'                : name,
                    'limit'               : limit,
                    'id_icon'             : icon,
                    'routingTool'         : routingTool,
                    'customAttributes'    : customAttributes,
                    'deviceDefinitions'   : deviceDefinitions,
                    'resourceDefinitions' : resourceDefinitions,
                    'isSystem'            : false,
                    'synchronize':['customAttributes', 'deviceDefinitions', 'resourceDefinitions']
                };

                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                Ext.Ajax.request({
                    url      : moduleConfig.services.urlResources+'/'+id,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'PUT',
                    scope    : this,
                    params   : Ext.JSON.encode(resources),
                    success  : function(response){
                        var res = response.responseText;
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translatecompanies.resources.titleModule,
                            msg     : translatecompanies.resources.form.MsgSuccessEdit,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        Ext.getCmp(controller+'ResourcesGrid').getSelectionModel().clearSelections();
                        Ext.data.StoreManager.lookup(controller+".ListResources").reload();
                        winFormCreateResources.destroy();
                    },
                    failure  : function(response) {
                        var res = response.responseText;
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translatecompanies.resources.titleModule,
                            msg     : translatecompanies.form.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        }
    }
    ,
    filterResources : function() {
        var jsonSearch = new Object();
        var jsonOr = new Object();
        var store = Ext.data.StoreManager.lookup(controller+'.ListResources');
        var searchKeyword = Ext.getCmp('searchKeywordResources').getValue();
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        jsonSearch.and = [];
        jsonSearch.and.push(
            {
                field      : 'id_company',
                comparison : 'eq',
                value      : id_company
            }
            ,
            {
                field      : 'isSystem',
                comparison : 'eq',
                value      : false
            }
        );
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
                    field      : 'limit',
                    comparison : 'lk',
                    value      : searchKeyword
                }
            );
            jsonSearch.and.push(jsonOr);
        }
        Ext.Ajax.abort(store.proxy.activeRequest);
        store.proxy.extraParams = {
            filters : Ext.JSON.encode(jsonSearch)
        };
        store.reload();
    }
    ,
    clearFilterResources : function(){
        Ext.getCmp('searchKeywordResources').setValue('');
        var store = Ext.data.StoreManager.lookup(controller+'.ListResources');
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        store.clearData();
        store.proxy.extraParams = {
            filters : Ext.JSON.encode({
                "and":[
                    {
                        "field"      : "id_company",
                        "comparison" : "eq",
                        "value"      : id_company
                    }
                    ,
                    {
                        field      : 'isSystem',
                        comparison : 'eq',
                        value      : false
                    }
                ]
            })
        };
        store.load();
    }
    ,
    /**
    * Open Window 'Agregar Dispositivos en Recursos'
    */
    openWindowAddDevicesCreateResources : function() {
        var m = moduleConfig;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winFormAddDevicesCreateResources = this.newWindowForm(m.groupIdAddDevicesCreateResources, m.titleWindowAddDevicesCreateResources, m.widthWindowAddDevicesCreateResources, m.heightWindowAddDevicesCreateResources, m.resizableWindowAddDevicesCreateResources, m.toolbarAddDevicesCreateResources, m.itemsFormAddDevicesCreateResources, m.bottomButtonsAddDevicesCreateResources);
        winFormAddDevicesCreateResources.show();
    }
    ,
    /**
    * Close Window 'Agregar Dispositivos en Recursos'
    */
    closeWindowAddDevicesCreateResources : function() {
        winFormAddDevicesCreateResources.destroy();
    }
    ,
    /**
    * 'Agregar Dispositivos en Recursos'
    */
    addDevicesCreateResources : function() {
        var form = Ext.getCmp(moduleConfig.groupIdAddDevicesCreateResources+'Form').getForm();

        if (form.isValid()) {
            var store = Ext.StoreMgr.lookup(controller + '.ListResourcesDeviceType');
            var exist = 0;
            var deviceId = form.findField(controller + 'AddDevicesCreateResourcesFormApplication').getValue();
            var deviceName = form.findField(controller + 'AddDevicesCreateResourcesFormApplication').getRawValue();

            store.each(function(record) {
                if (record.data['deviceDefinitionName'] == deviceName) {
                    exist = 1;
                }
            });

            if (exist == 1) {
                Ext.MessageBox.show({
                    title        : translatecompanies.resources.devices.form.titleWindow,
                    msg          : translatecompanies.recordExist,
                    animCollapse : true,
                    buttons      : Ext.MessageBox.OK,
                    icon         : Ext.MessageBox.WARNING
                });
            } else {
                store.add({
                    'id_deviceDefinition'  : deviceId,
                    'deviceDefinitionName' : deviceName,
                    'allowBlank'           : true,
                    'mandatory'            : false
                });
                winFormAddDevicesCreateResources.destroy();
            }

        } else {
            Ext.MessageBox.show({
                title        : translatecompanies.resources.devices.form.titleWindow,
                msg          : translatecompanies.resources.devices.form.MsgErrorIsValid,
                animCollapse : true,
                buttons      : Ext.MessageBox.OK,
                icon         : Ext.MessageBox.WARNING
            });
        }
    }
    ,
    /**
    * 'Remover Dispositivos en Recursos'
    */
    removeDevicesCreateResources : function() {
        var grid = Ext.getCmp('DevicesDefinitionsGrid');
        var store = Ext.StoreMgr.lookup(controller + '.ListResourcesDeviceType');
        var selectedRecords = grid.getSelectionModel().getSelection();
        if (selectedRecords.length > 0) {
            store.remove(selectedRecords);
        }
    }
    ,
    /**
    * Load Attributes and Devices @ Form 'Crear/Modificar Recursos'
    */
    loadAttributeCreateResources : function (combo, record, index) {
        var attributes = record[0].get('Attributes');
        var devices = record[0].get('Devices');
        if(attributes.length > 0) {
            var storeAttributes = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttribute');
            var storeDevices = Ext.StoreMgr.lookup(controller + '.ListResourcesDeviceType');
            var exist = 0;
            var comboTemplate = Ext.getCmp(controller + 'CreateResourcesFormTemplate');
            var _id = comboTemplate.getValue();
            var name = comboTemplate.getRawValue();

            storeAttributes.each(function(record) {
                if (record.data['_id'] == _id || record.data['name'] == name) {
                    exist = 1;
                }
            });

            if (exist == 1) {
                Ext.MessageBox.show({
                    title        : translatecompanies.resources.attributes.form.titleWindow,
                    msg          : translatecompanies.recordExist,
                    animCollapse : true,
                    buttons      : Ext.MessageBox.OK,
                    icon         : Ext.MessageBox.WARNING
                });
            } else {
                storeAttributes.removeAll();
                for (var i=0; i < attributes.length; i++) {
                    storeAttributes.add({
                        '_id'        : _id,
                        'name'       : name,
                        'xtype'      : attributes[i].xtype,
                        'fieldLabel' : attributes[i].fieldLabel,
                        'allowBlank' : attributes[i].allowBlank,
                        'mandatory'  : attributes[i].mandatory
                    });
                }

                if(devices.length > 0) {
                    storeDevices.removeAll();
                    for (var j=0; j < devices.length; j++) {
                        storeDevices.add({
                            'id_deviceDefinition'  : devices[j].id_deviceDefinition,
                            'deviceDefinitionName' : devices[j].deviceDefinitionName,
                            'allowBlank'           : devices[j].allowBlank,
                            'mandatory'            : devices[j].mandatory
                        });
                    }
                }
            }
        }
    }
    ,
    /**
    * Verify and Generate Text Default for field (fieldLabel)
    */
    generateTextDefault : function(string, store) {
        var exist = 0;
        store.each(function(record) {
            if (record.data['fieldLabel'] == string) {
                exist = 1;
            }
        });
        if(exist == 1) {
            var arrayString = string.split(" ");
            var num = arrayString[2];
            num = num*1;
            num++;
            var newString = 'Text Default '+num;
            return this.generateTextDefault(newString, store);
        }
        return string;
    }
    ,
    /**
    * 'Agregar Atributos en Recursos'
    */
    addAttributesCreateResources : function() {
        var store = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttribute');
        var number = Math.floor((Math.random() * 1000000000) + 1);
        var n = 1;
        var string = 'Text Default '+n;
        var textDefault = this.generateTextDefault(string, store);

        store.add({
            '_id'        : number,
            'name'       : 'Personalized',
            'xtype'      : 'textfield',
            'fieldLabel' : textDefault,
            'allowBlank' : true,
            'mandatory'  : false
        });
    }
    ,
    /**
    * 'Remover Atributos en Recursos'
    */
    removeAttributesCreateResources : function() {
        var grid = Ext.getCmp('CustomsAttributesGrid');
        var store = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttribute');
        var selectedRecords = grid.getSelectionModel().getSelection();
        var comboTemplate = Ext.getCmp(controller + 'CreateResourcesFormTemplate');
        var exist = 0;

        if (selectedRecords.length > 0) {
            store.remove(selectedRecords);
        }

        store.each(function(record) {
            if (record.data['_id'] == comboTemplate.getValue()) {
                exist = 1;
            }
        });

        if (exist == 0) {
            Ext.getCmp(controller + 'CreateResourcesFormTemplate').reset();
        }
    }
    ,
    /**
    * Open Window 'Agregar Recursos Relacionados en Recursos'
    */
    openWindowAddRelatedResourcesCreateResources : function() {
        var m = moduleConfig;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winFormAddRelatedResourcesCreateResources = this.newWindowForm(m.groupIdAddRelatedResourcesCreateResources, m.titleWindowAddRelatedResourcesCreateResources, m.widthWindowAddRelatedResourcesCreateResources, m.heightWindowAddRelatedResourcesCreateResources, m.resizableWindowAddRelatedResourcesCreateResources, m.toolbarAddRelatedResourcesCreateResources, m.itemsFormAddRelatedResourcesCreateResources, m.bottomButtonsAddRelatedResourcesCreateResources);
        winFormAddRelatedResourcesCreateResources.show();
        var storeAttributes = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttributeRelatedResources');
        storeAttributes.removeAll(); //clear values store attributes
        Ext.getCmp(controller + 'AddRelatedResourcesCreateResourcesFormResource').enable();
        editRelatedResources = 0;
    }
    ,
    /**
    * Close Window 'Agregar Dispositivos en Recursos'
    */
    closeWindowAddRelatedResourcesCreateResources : function () {
        var storeAttributes = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttributeRelatedResources');
        storeAttributes.removeAll(); //clear values store attributes
        winFormAddRelatedResourcesCreateResources.destroy();
    }
    ,
    /**
    * 'Agregar Recursos Relacionados en Recursos'
    */
    addRelatedResourcesCreateResources : function() {
        var form = Ext.getCmp(moduleConfig.groupIdAddRelatedResourcesCreateResources+'Form').getForm();

        if (form.isValid()) {
            var store = Ext.StoreMgr.lookup(controller + '.ListResourcesRelatedResource');
            var storeAttributes = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttributeRelatedResources');
            var exist = 0;
            var resourceId = form.findField(controller + 'AddRelatedResourcesCreateResourcesFormResource').getValue();
            var resourceName = form.findField(controller + 'AddRelatedResourcesCreateResourcesFormResource').getRawValue();

            if(editRelatedResources == 1) {
                store.each(function(record) {
                    if (record.data['name'] == resourceName) {
                        store.remove(record);
                    }
                });
            } else {
                store.each(function(record) {
                    if (record.data['name'] == resourceName) {
                        exist = 1;
                    }
                });
            }

            if (exist == 1) {
                Ext.MessageBox.show({
                    title        : translatecompanies.resources.relatedResources.form.titleWindow,
                    msg          : translatecompanies.recordExist,
                    animCollapse : true,
                    buttons      : Ext.MessageBox.OK,
                    icon         : Ext.MessageBox.WARNING
                });
            } else {
                var customAttributes=[]
                storeAttributes.each(function(record) {
                    customAttributes.push({
                        'xtype'            : record.data['xtype'],
                        'fieldLabel'       : record.data['fieldLabel'],
                        'allowBlank'       : record.data['allowBlank'],
                        'mandatory'        : record.data['mandatory'],
                        'renderAllowBlank' : record.data['renderAllowBlank']
                    });
                });
                store.add({
                    'id_resourceDefinition' : resourceId,
                    'name'                  : resourceName,
                    'Attributes'            : customAttributes
                });
                winFormAddRelatedResourcesCreateResources.destroy();
            }

        }
    }
    ,
    /**
    * 'Agregar Atributos en Agregar Recursos Relacionados @ Recursos'
    */
    addAttributesRelatedResourcesCreateResources : function() {
        var store = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttributeRelatedResources');
        var number = Math.floor((Math.random() * 1000000000) + 1);
        var n = 1;
        var string = 'Text Default '+n;
        var textDefault = this.generateTextDefault(string, store);

        store.add({
            '_id'        : number,
            'name'       : 'Personalized',
            'xtype'      : 'textfield',
            'fieldLabel' : textDefault,
            'allowBlank' : true,
            'mandatory'  : false
        });
    }
    ,
    /**
    * 'Remover Atributos en Agregar Recursos Relacionados @ Recursos'
    */
    removeAttributesRelatedResourcesCreateResources : function() {
        var grid = Ext.getCmp('CustomsAttributesRelatedResourcesGrid');
        var store = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttributeRelatedResources');
        var selectedRecords = grid.getSelectionModel().getSelection();
        var comboTemplate = Ext.getCmp(controller + 'AddRelatedResourcesCreateResourcesFormTemplate');
        var exist = 0;

        if (selectedRecords.length > 0) {
            store.remove(selectedRecords);
        }

        store.each(function(record) {
            if (record.data['_id'] == comboTemplate.getValue()) {
                exist = 1;
            }
        });

        if (exist == 0) {
            Ext.getCmp(controller + 'AddRelatedResourcesCreateResourcesFormTemplate').reset();
        }
    }
    ,
    /**
    * Load Attributes en Form Related Resources @ 'Crear/Modificar Recursos'
    */
    loadAttributeRelatedResourcesCreateResources : function (combo, record, index) {
        var attributes = record[0].get('Attributes');

        if(attributes.length > 0) {
            var storeAttributes = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttributeRelatedResources');
            var exist = 0;
            var comboTemplate = Ext.getCmp(controller + 'AddRelatedResourcesCreateResourcesFormTemplate');
            var _id = comboTemplate.getValue();
            var name = comboTemplate.getRawValue();

            storeAttributes.each(function(record) {
                if (record.data['_id'] == _id || record.data['name'] == name) {
                    exist = 1;
                }
            });

            if (exist == 1) {
                Ext.MessageBox.show({
                    title        : translatecompanies.resources.attributes.form.titleWindow,
                    msg          : translatecompanies.recordExist,
                    animCollapse : true,
                    buttons      : Ext.MessageBox.OK,
                    icon         : Ext.MessageBox.WARNING
                });
            } else {
                storeAttributes.removeAll();
                for (var i=0; i < attributes.length; i++) {
                    storeAttributes.add({
                        '_id'        : _id,
                        'name'       : name,
                        'xtype'      : attributes[i].xtype,
                        'fieldLabel' : attributes[i].fieldLabel
                    });
                }

            }
        }
    }
    ,
    /**
    * 'Remover Recursos Relacionados en Recursos'
    */
    removeRelatedResourcesCreateResources : function() {
        var grid = Ext.getCmp('RelatedResourcesGrid');
        var store = Ext.StoreMgr.lookup(controller + '.ListResourcesRelatedResource');
        var selectedRecords = grid.getSelectionModel().getSelection();

        if (selectedRecords.length > 0) {
            store.remove(selectedRecords);
        }
    }
    ,
    /**
    * 'Editar Recursos Relacionados en Recursos'
    */
    editRelatedResourcesCreateResources : function() {
        var m = moduleConfig;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winFormAddRelatedResourcesCreateResources = this.newWindowForm(m.groupIdAddRelatedResourcesCreateResources, m.titleWindowAddRelatedResourcesCreateResources, m.widthWindowAddRelatedResourcesCreateResources, m.heightWindowAddRelatedResourcesCreateResources, m.resizableWindowAddRelatedResourcesCreateResources, m.toolbarAddRelatedResourcesCreateResources, m.itemsFormAddRelatedResourcesCreateResources, m.bottomButtonsAddRelatedResourcesCreateResources);
        winFormAddRelatedResourcesCreateResources.show();
        var storeAttributes = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttributeRelatedResources');
        storeAttributes.removeAll(); //clear values store attributes
        var grid = Ext.getCmp('RelatedResourcesGrid');
        var store = Ext.StoreMgr.lookup(controller + '.ListResourcesRelatedResource');
        var selectedRecords = grid.getSelectionModel().getSelection();
        var comboResourceType = Ext.getCmp(controller + 'AddRelatedResourcesCreateResourcesFormResource');
        editRelatedResources = 1;

        if (selectedRecords.length > 0) {
            var recordRelatedResources = selectedRecords[0];
            var attribs = recordRelatedResources.get('Attributes');
            var _id = recordRelatedResources.get('id_resourceDefinition');
            var name = recordRelatedResources.get('name');
            var attributes = [];

            Ext.each(attribs, function(value, key) {
                storeAttributes.add({
                    '_id'        : _id,
                    'name'       : name,
                    'xtype'      : value.xtype,
                    'fieldLabel' : value.fieldLabel,
                    'allowBlank' : value.allowBlank,
                    'mandatory'  : value.mandatory
                });
            });
            comboResourceType.setValue(_id);
            comboResourceType.setRawValue(name);
        }
    }
    ,
/**********************************************
*************** Module Devices ****************
***********************************************/
    loadStoreByIdDevices : function (id, storeId) {
        var store = Ext.data.StoreManager.lookup(storeId);
        store.clearData();
        store.proxy.extraParams = {
            filters : Ext.JSON.encode({
                "and":[{
                    "field"      : "id_company",
                    "comparison" : "eq",
                    "value"      : id
                }]
            })
        };
        store.load();
    }
    ,
    openWindowDevices : function() 
    {
        var m = moduleConfig;
        /** newWindowGrid(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, store, columns, menuItem, bottomButtons) **/
        winFormDevices = this.newWindowGrid(
            m.groupIdDevices, 
            m.titleWindowDevices, 
            m.widthWindowDevices, 
            m.heightWindowDevices, 
            m.resizableWindowDevices, 
            m.toolbarDevices, 
            m.storeDevices, 
            m.columnsDevices, 
            m.menuItemDevices, 
            m.bottomButtonsDevices, 
            m.pluginsDevices,
            m.toolbarButtonsDevices
        );

        winFormDevices.show();
        
        Ext.data.StoreManager.lookup(controller+'.ListResourcesComboDeviceType').load();
        
        var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
        var record = selectedRecords[0];
        var id_company = record.get(m.grid.idField);
        this.loadStoreByIdDevices(id_company, m.storeDevices);
    }
    ,
    closeWindowFormDevices : function() {
        winFormDevices.destroy();
    }
    ,
    /**
    * Top Buttons Actions
    * Delete Selected Devices Items
    */
    deleteSelectedItemsDevices : function() {
        this.deleteItemDevices();
    }
    ,
    /**
    * Menuitem Devices Actions
    * Delete Selected Devices Items
    */
    deleteItemDevices : function() {

        var selectedRecords = Ext.getCmp(moduleConfig.groupIdDevices+'Grid').getSelectionModel().getSelection();

        if(selectedRecords.length > 0){

            Ext.Msg.confirm(translatecompanies.confirmTitle, translatecompanies.devices.confirmDelete, function(btn) {

                if (btn === 'yes') {
                    for (var i = 0, len = selectedRecords.length; i < len; i++) {
                        var record = selectedRecords[i];
                        var id = record.get('_id');
                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                        Ext.Ajax.request({
                            url      : moduleConfig.services.urlDevices+'/'+id,
                            type     : 'rest',
                            dataType : 'json',
                            method   : 'DELETE',
                            scope    : this,
                            success  : function(response){
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.delete+' '+translatecompanies.devices.titleModule,
                                    msg     : translatecompanies.devices.form.MsgSuccessDelete,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.INFO
                                });
                                Ext.data.StoreManager.lookup(controller+".ListDevices").reload();
                            },
                            failure  : function(response) {
                                msgWait.hide();
                                Ext.MessageBox.show({
                                    title   : translate.global.delete+' '+translatecompanies.devices.titleModule,
                                    msg     : translatecompanies.form.MsgError,
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
    /**
    * Top Buttons Actions
    * Activate Selected Devices Items
    */
    activateSelectedItemsDevices : function() {
        this.activateItemDevices();
    }
    ,
    /**
    * Menuitem Devices Actions
    * Activate Selected Devices Items
    */
    activateItemDevices : function() {

        var selectedRecords = Ext.getCmp(moduleConfig.groupIdDevices+'Grid').getSelectionModel().getSelection();

        if(selectedRecords.length > 0){

            for (var i = 0, len = selectedRecords.length; i < len; i++) {
                var record = selectedRecords[i];
                var id = record.get('_id');
                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                Ext.Ajax.request({
                    url      : moduleConfig.services.urlDevices+'/'+id,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'PUT',
                    scope    : this,
                    params   : Ext.JSON.encode({'status' : 'active'}),
                    success  : function(response){
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.activate+' '+translatecompanies.devices.titleModule,
                            msg     : translatecompanies.devices.form.MsgSuccessActivate,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        Ext.data.StoreManager.lookup(controller+".ListDevices").reload();
                    },
                    failure  : function(response) {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.activate+' '+translatecompanies.devices.titleModule,
                            msg     : translatecompanies.form.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });

            }

        }

    }
    ,
    /**
    * Top Buttons Actions
    * Lock Selected Devices Items
    */
    lockSelectedItemsDevices : function() {
        this.lockItemDevices();
    }
    ,
    /**
    * Menuitem Devices Actions
    * Lock Selected Devices Items
    */
    lockItemDevices : function() {

        var selectedRecords = Ext.getCmp(moduleConfig.groupIdDevices+'Grid').getSelectionModel().getSelection();

        if(selectedRecords.length > 0){

            for (var i = 0, len = selectedRecords.length; i < len; i++) {
                var record = selectedRecords[i];
                var id = record.get('_id');
                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                Ext.Ajax.request({
                    url      : moduleConfig.services.urlDevices+'/'+id,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'PUT',
                    scope    : this,
                    params   : Ext.JSON.encode({'status' : 'inactive'}),
                    success  : function(response){
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.lock+' '+translatecompanies.devices.titleModule,
                            msg     : translatecompanies.devices.form.MsgSuccessLock,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        Ext.data.StoreManager.lookup(controller+".ListDevices").reload();
                    },
                    failure  : function(response) {
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.lock+' '+translatecompanies.devices.titleModule,
                            msg     : translatecompanies.form.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });

            }

        }

    }
    ,
    /**
    * Open Window 'Crear/Modificar Dispositivos'
    */
    openWindowCreateDevices : function() {
        var m = moduleConfig;
        Ext.getCmp(m.groupIdDevices+'Grid').getSelectionModel().deselectAll();
        m.titleWindowCreateDevices = translate.global.create+' '+translatecompanies.devices.titleModule;
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winFormCreateDevices = this.newWindowForm(m.groupIdCreateDevices, m.titleWindowCreateDevices, m.widthWindowCreateDevices, m.heightWindowCreateDevices, m.resizableWindowCreateDevices, m.toolbarCreateDevices, m.itemsFormCreateDevices, m.bottomButtonsCreateDevices);
        winFormCreateDevices.show();
        Ext.getCmp(controller + 'CreateDevicesFormDeviceType').enable();
    }
    ,
    /**
    * Load Attributes @ Form 'Crear/Modificar Dispositivos'
    */
    loadAttributeCreateDevices : function (combo, record, index) {
        var attributes = record[0].get('Attributes');
        var interface = this.createTemplateForDevices(attributes);
        if (!interface) {
            Ext.MessageBox.show({
                title   : 'Error',
                msg     : translatecompanies.form.MsgErrorInterface,
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
            winFormCreateDevices.destroy();
        }
    }
    ,
    /**
    * Create Template for Devices @ Form 'Crear/Modificar Dispositivos'
    */
    createTemplateForDevices : function (attributes) {
        if(attributes.length > 0) {
            var form = Ext.getCmp(moduleConfig.groupIdCreateDevices+'Form');
            var itemsForm = [];
            var id = '', name = '';
            arrayIds = [], arrayNames = [];

            if(Ext.getCmp(controller + 'CreateDevicesFieldSetDeviceAttributes')) {
                form.remove(Ext.getCmp(controller + 'CreateDevicesFieldSetDeviceAttributes'));
                form.doLayout();
            }
            for (var i=0; i < attributes.length; i++) {
                id = this.convertIdAttributeCreateDevices(attributes[i].fieldLabel);
                name = this.convertNameAttributeCreateDevices(attributes[i].fieldLabel);
                itemsForm.push({
                    xtype       : 'container',
                    layout      : 'hbox',
                    defaultType : 'textfield',
                    margin      : '5 5 5 5',
                    items       : [{
                        xtype             : attributes[i].xtype,
                        fieldLabel        : attributes[i].fieldLabel,
                        afterLabelTextTpl : AppGlobals.required,
                        id                : id,
                        name              : name,
                        emptyText         : attributes[i].fieldLabel+'...',
                        allowBlank        : false,
                        flex              : 4
                    }]
                });
                arrayIds.push(id);
                arrayNames.push(name);
            }

            form.add({
                xtype       : 'fieldset',
                title       : translatecompanies.devices.form.fieldSetDeviceAttributes,
                id          : controller + 'CreateDevicesFieldSetDeviceAttributes',
                name        : controller + 'CreateDevicesFieldSetDeviceAttributes',
                layout      : 'anchor',
                defaults    : {
                    anchor  : '100%'
                },
                items       : itemsForm
            });
            form.doLayout();
            return true;
        }
        return false;
    }
    ,
    /**
    * Convert name attribute @ loadAttributeCreateDevices function
    */
    convertNameAttributeCreateDevices : function (string) {
        var cadena = string.toLowerCase();
        var origin = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
        var normal = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuuNnCc";
        var newString = '';
        var nameFm = '';
        arrayCadena = cadena.split(" ");
        for(var x=0; x < arrayCadena.length ; x++) {
            if (x > 0) {
                newString = arrayCadena[x].substr(0,1).toUpperCase()+arrayCadena[x].substr(1,arrayCadena[x].length).toLowerCase();
            }
            else {
                newString = arrayCadena[x].toLowerCase();
            }
            for (var y=0; y < origin.length; y++) {
                newString = newString.replace(origin.charAt(y), normal.charAt(y));
            }
            nameFm = nameFm + newString;
        }

        return nameFm;
    }
    ,
    /**
    * Convert ID attribute @ loadAttributeCreateDevices function
    */
    convertIdAttributeCreateDevices : function (string) {
        var arrayCadena;
        var newString = "", cadena = "";
        var longitud;
        arrayCadena = string.split(" ");
        longitud = arrayCadena.length;
        for(var i=0; i < longitud ; i++){
            newString = newString + this.ucFirst(arrayCadena[i]);
        }
        cadena = controller + this.normalizeString(newString);
        return cadena;
    }
    ,
    /**
    * Remove tildes , accents, ñ
    */
    normalizeString : function (string) {
        var origin = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
        var normal = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuuNnCc";
        for (var i=0; i<origin.length; i++) {
            string = string.replace(origin.charAt(i), normal.charAt(i));
        }
        return string;
    }
    ,
    /**
    * Capital Letter for the first character of a word
    */
    ucFirst : function (string) {
        return string.substr(0,1).toUpperCase()+string.substr(1,string.length).toLowerCase();
    }
    ,
    editItemDevices : function() {
        var m = moduleConfig;
        m.titleWindowCreateDevices = translate.global.edit+' '+translatecompanies.devices.titleModule;
        var record = Ext.getCmp(m.groupIdDevices+'Grid').getSelectionModel().getSelection()[0];
        /** newWindowForm(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons) **/
        winFormCreateDevices = this.newWindowForm(m.groupIdCreateDevices, m.titleWindowCreateDevices, m.widthWindowCreateDevices, m.heightWindowCreateDevices, m.resizableWindowCreateDevices, m.toolbarCreateDevices, m.itemsFormCreateDevices, m.bottomButtonsCreateDevices);
        winFormCreateDevices.show();
        Ext.getCmp(controller + 'CreateDevicesFormDeviceType').disable();

        var id = record.get('_id');
        var id_deviceDefinition = record.get('id_deviceDefinition');
        var serial = record.get('serial');
        var name = record.get('name');
        var attr = record.get('objectAttributes');

        //Cargo todos los campos (no dinámicos)
        Ext.getCmp(controller + 'CreateDevicesFormId').setValue(id);
        Ext.getCmp(controller + 'CreateDevicesFormDeviceType').setValue(id_deviceDefinition);
        Ext.getCmp(controller + 'CreateDevicesFormDeviceType').setRawValue(name);
        Ext.getCmp(controller + 'CreateDevicesFormSerial').setValue(serial);

        var comboDevices = Ext.getCmp(controller+'CreateDevicesFormDeviceType');
        var v = comboDevices.getValue();
        var recordDevices = comboDevices.findRecordByValue(id_deviceDefinition);
        var attributes = recordDevices.get('Attributes');
        //Se crea la interfaz dinámica
        var interface = this.createTemplateForDevices(attributes);
        /* Si no se crea la interfaz envio un mensaje de error */
        if (!interface) {
            Ext.MessageBox.show({
                title   : 'Error',
                msg     : translatecompanies.form.MsgErrorInterface,
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
            winFormCreateDevices.destroy();
        } else {/* Sino cargo los valores dinámicos */
            var form = Ext.getCmp(moduleConfig.groupIdCreateDevices+'Form').getForm();
            for (var i in attr) {
                var field = form.findField(i);
                if (field.xtype == 'datefield') {
                    field.setValue(new Date(attr[i]));
                } else {
                    field.setValue(attr[i]);
                }
            }
        }
    }
    ,
    /**
    * Send info 'Crear/Modificar Dispositivos de Empresas'
    */
    sendDataFormCreateDevices : function () {
        var form = Ext.getCmp(moduleConfig.groupIdCreateDevices+'Form').getForm();
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);

        /* El formulario tiene los campos llenos */
        if (form.isValid()) {
            var id = form.findField("_id").getValue();
            var id_deviceDefinition = form.findField("deviceType").getValue();
            var serial = form.findField("serial").getValue();
            var name = form.findField("deviceType").getRawValue();
            var customAttributes = {};

            for (var k=0; k < arrayNames.length; k++) {
                var ids = arrayIds[k];
                var names = arrayNames[k];
                customAttributes[names] = Ext.getCmp(ids).getValue();
            }

            var devices = {
                'id_company'           : id_company,
                'id_deviceDefinition'  : id_deviceDefinition,
                'serial'               : serial,
                'name'                 : name,
                'status'               : 'active',
                'customAttributes'     : customAttributes
            };

            /* Si el valor del ID del Recurso es vacío almacena por 1ra vez */
            if (id == '') {
                var storeDevices = Ext.StoreMgr.lookup(controller + '.ListDevices');
                //var exist = 0;
                var comboDevices = Ext.getCmp(controller + 'CreateDevicesFormDeviceType');
                var idCombo = comboDevices.getValue();
                var nameCombo = comboDevices.getRawValue();

                //storeDevices.each(function(record) {
                //    if (record.data['_id'] == idCombo || record.data['name'] == nameCombo) {
                //        exist = 1;
                //    }
                //});

                //if (exist == 1) {
                //    Ext.MessageBox.show({
                //        title        : translate.global.create+' '+translatecompanies.devices.titleModule,
                //        msg          : translatecompanies.recordExist,
                //        animCollapse : true,
                //        buttons      : Ext.MessageBox.OK,
                //        icon         : Ext.MessageBox.WARNING
                //    });
                //}
                //else  {
                    var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                    Ext.Ajax.request({
                        url      : moduleConfig.services.urlDevices,
                        type     : 'rest',
                        dataType : 'json',
                        method   : 'POST',
                        scope    : this,
                        params   : Ext.JSON.encode(devices),
                        success  : function(response){
                            var res = response.responseText;
                            msgWait.hide();
                            Ext.MessageBox.show({
                                title   : translate.global.create+' '+translatecompanies.devices.titleModule,
                                msg     : translatecompanies.devices.form.MsgSuccessCreate,
                                buttons : Ext.MessageBox.OK,
                                icon    : Ext.MessageBox.INFO
                            });
                            Ext.getCmp(controller+'DevicesGrid').getSelectionModel().clearSelections();
                            Ext.data.StoreManager.lookup(controller+".ListDevices").reload();
                            winFormCreateDevices.destroy();
                        },
                        failure  : function(response) {
                            var res = response.responseText;
                            msgWait.hide();
                            Ext.MessageBox.show({
                                title   : translate.global.create+' '+translatecompanies.devices.titleModule,
                                msg     : translatecompanies.form.MsgError,
                                buttons : Ext.MessageBox.OK,
                                icon    : Ext.MessageBox.ERROR
                            });
                        }
                    });
                //}

            } else {

                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                Ext.Ajax.request({
                    url      : moduleConfig.services.urlDevices+'/'+id,
                    type     : 'rest',
                    dataType : 'json',
                    method   : 'PUT',
                    scope    : this,
                    params   : Ext.JSON.encode(devices),
                    success  : function(response){
                        var res = response.responseText;
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translatecompanies.devices.titleModule,
                            msg     : translatecompanies.devices.form.MsgSuccessEdit,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.INFO
                        });
                        Ext.getCmp(controller+'DevicesGrid').getSelectionModel().clearSelections();
                        Ext.data.StoreManager.lookup(controller+".ListDevices").reload();
                        winFormCreateDevices.destroy();
                    },
                    failure  : function(response) {
                        var res = response.responseText;
                        msgWait.hide();
                        Ext.MessageBox.show({
                            title   : translate.global.edit+' '+translatecompanies.devices.titleModule,
                            msg     : translatecompanies.form.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                });

            }
        }

    }
    ,
    /**
    * Close Window 'Crear/Modificar Dispositivos'
    */
    closeWindowCreateDevices : function() {
        winFormCreateDevices.destroy();
    }
    ,
    filterDevices : function() {
        var jsonSearch = new Object();
        var jsonOr = new Object();
        var store = Ext.data.StoreManager.lookup(controller+'.ListDevices');
        var searchKeyword = Ext.getCmp('searchKeywordDevices').getValue();
        var deviceType = Ext.getCmp('searchKeywordDeviceType').getValue();
        var status = Ext.getCmp('searchKeywordStatus').getValue();
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);

        jsonSearch.and = [];
        jsonSearch.and.push(
            {
                field      : 'id_company',
                comparison : 'eq',
                value      : id_company
            }
        );
        if (deviceType != null) {
            jsonSearch.and.push(
                {
                    field      : 'id_deviceDefinition',
                    comparison : 'eq',
                    value      : deviceType
                }
            );
        }
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
                    field      : 'serial',
                    comparison : 'lk',
                    value      : searchKeyword
                }
                ,
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
                ,
                {
                    field      : 'Attributes',
                    comparison : 'lk',
                    value      : searchKeyword
                }
            );
            jsonSearch.and.push(jsonOr);
        }
        Ext.Ajax.abort(store.proxy.activeRequest);
        store.proxy.extraParams = {
            filters : Ext.JSON.encode(jsonSearch)
        };
        store.loadPage(1);
    }
    ,
    clearFilterDevices : function() {
        Ext.getCmp('searchKeywordDevices').setValue('');
        var store = Ext.data.StoreManager.lookup(controller+'.ListDevices');
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        store.clearData();
        this.filterDevices();
    }
    ,
    clearFilterDeviceType : function() {
        Ext.getCmp('searchKeywordDeviceType').setValue('');
        var store = Ext.data.StoreManager.lookup(controller+'.ListDevices');
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        store.clearData();
        this.filterDevices();
    }
    ,
    clearFilterStatus : function() {
        Ext.getCmp('searchKeywordStatus').setValue('');
        var store = Ext.data.StoreManager.lookup(controller+'.ListDevices');
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        store.clearData();
        this.filterDevices();
    }
    ,
    redirectModulePlanningTracking : function() {
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        window.localStorage.setItem('id_company', id_company);
        /**window.location.replace(window.location.href.toString().split('?')[0]+'?m=PlanningTracking');**/
        window.location.href = window.location.href.toString().split('?')[0]+'?m=PlanningTracking';
    }
    ,
    redirectModuleResourceTracking : function() {
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        window.localStorage.setItem('id_company', id_company);
        /**window.location.replace(window.location.href.toString().split('?')[0]+'?m=ResourceTracking');**/
        window.location.href = window.location.href.toString().split('?')[0]+'?m=ResourceTracking';
    }
    ,
    redirectModuleUsers : function() {
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        window.localStorage.setItem('id_company', id_company);
        /**window.location.replace(window.location.href.toString().split('?')[0]+'?m=Users');**/
        window.location.href = window.location.href.toString().split('?')[0]+'?m=Users';
    }
    ,
    redirectModuleResources : function() {
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        window.localStorage.setItem('id_company', id_company);
        /**window.location.replace(window.location.href.toString().split('?')[0]+'?m=Resources');**/
        window.location.href = window.location.href.toString().split('?')[0]+'?m=Resources';
    }
    ,
    redirectModuleForms : function() {
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        window.localStorage.setItem('id_company', id_company);
        /**window.location.replace(window.location.href.toString().split('?')[0]+'?m=Forms');**/
        window.location.href = window.location.href.toString().split('?')[0]+'?m=Forms';
    }
    ,
    redirectModuleRegisters : function() 
    {
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        window.localStorage.setItem('id_company', id_company);

        //Función del core
        this.redirectPage('Registers');
    },
    redirectModuleTasks : function() 
    {
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        window.localStorage.setItem('id_company', id_company);

        //Función del core
        this.redirectPage('Tasks');
    },
    redirectModuleScheduling : function() {
        var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
        var id_company = record.get(moduleConfig.grid.idField);
        window.localStorage.setItem('id_company', id_company);
        /**window.location.replace(window.location.href.toString().split('?')[0]+'?m=Scheduling');**/
        window.location.href = window.location.href.toString().split('?')[0]+'?m=Scheduling';
    }
    ,
    checkCompany : function() {
        user_company = window.localStorage.getItem('user_company');
        id_company = window.localStorage.getItem('id_company');
        if(id_company != user_company) {
            window.localStorage.setItem('id_company', user_company);
        }
    }
    ,
    changeStyleButton : function() {
        Ext.getCmp(controller+'ListCreate').addClass('blue-cyan');
    }
    ,
    changeStyleFilterPanel : function() {
        var filterPanel = Ext.getCmp('filterPanel');
        var header = filterPanel.getHeader();
        header.addClass('blue-cyan');
        Ext.getCmp('filterPanel-placeholder').addClass('blue-cyan');
    },
    ////Exportar Excel
    //Exportar compañías
    onCompanyExport: function(thisButton, e, eOpts)
    {
        var store = this['get' + controller + 'ListStore']();
        var urlService = moduleConfig.exportExcel.urlCompanies;

        this.onExportFile(store, urlService);
    },
    //Exportar compañías - Dispositivos
    onCompanyExportDevices: function(thisButton, e, eOpts)
    {
        var store = this['get' + controller + 'ListDevicesStore']();
        var urlService = moduleConfig.exportExcel.urlCompaniesDevices;

        this.onExportFile(store, urlService);
    },
    //Exportar compañías - Definiciones de Recursos
    onCompanyExportResources: function(thisButton, e, eOpts)
    {
        var store = this['get' + controller + 'ListResourcesStore']();
        var urlService = moduleConfig.exportExcel.urlCompaniesResources;

        this.onExportFile(store, urlService);
    },
});
