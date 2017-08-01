var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'grid';
moduleConfig.lateralPanel = 'right';

moduleConfig.services = new Object();
moduleConfig.services.url = strURL +'/companies';
moduleConfig.services.urlCombo = '';
moduleConfig.services.urlComboApplications = strURL +'/applications';
moduleConfig.services.urlComboDeviceType = strURL +'/devicedefinitions';
moduleConfig.services.urlComboTelematicAttribute = strURL +'/resourcetemplates?relations=["deviceDefinitions"]';
moduleConfig.services.urlComboRelatedResource = strURL +'/resourcedefinitions';
moduleConfig.services.listUrl = strURL +'/companies?relations=["country","city"]';
moduleConfig.listPageSize = 15;
moduleConfig.services.urlResources = strURL +'/resourcedefinitions';
moduleConfig.services.listResourcesUrl = strURL +'/resourcedefinitions?relations=["deviceDefinitions","icon"]';
moduleConfig.listResourcesPageSize = 15;
moduleConfig.services.listLicensesUrl = strURL +'/companies';
moduleConfig.services.urlItemselectorApplications = strURL +'/applications';
moduleConfig.listLicensesPageSize = 15;
moduleConfig.services.urlDevices = strURL +'/deviceinstances';
moduleConfig.services.urlComboDevicesType = strURL +'/devicedefinitions';
moduleConfig.services.listDevicesUrl = strURL +'/deviceinstances?relations=["deviceDefinitions"]';
moduleConfig.listDevicesPageSize = 15;
moduleConfig.services.listCountriesUrl = strURL +'/countries';
moduleConfig.listCountriesPageSize = 25;
moduleConfig.services.listCitiesUrl = strURL +'/cities';
moduleConfig.listCitiesPageSize = 25;
moduleConfig.services.urlComboIcons = strURL +'/icons?filters={"and":[{"field":"type","comparison":"eq","value":"resourceDefinitions"}]}';
moduleConfig.listIconsPageSize = 15;
moduleConfig.exportFilter = '';
//URL Exportar Excel
moduleConfig.exportExcel = {};
moduleConfig.exportExcel.urlCompanies = strURL + '/companies/excel';
moduleConfig.exportExcel.urlCompaniesDevices = strURL + '/deviceinstances/excel';
moduleConfig.exportExcel.urlCompaniesResources = strURL + '/resourcedefinitions/excel';


moduleConfig.filterForm = new Object();
moduleConfig.filterTitle = translatecompanies.filter.title;
moduleConfig.filterForm = [
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype           : 'textfield',
                fieldLabel      : translatecompanies.filter.fieldLabel.nit,
                id              : controller + 'FilterNit',
                emptyText       : translatecompanies.filter.emptyText.nit,
                columnWidth     : 0.95,
                enableKeyEvents : true,
                allowBlank      : true,
                margin          : '20 0 0 0',
                width           : '60%'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por NIT',
                fieldName      : controller + 'FilterNit',
                margin         : '46 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter',
                style          : {
                    background : '#1fbad6',
                    border     : '1px solid #1fbad6'  
                }
            }
        ]
    }
    ,
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'combobox',
                fieldLabel     : translatecompanies.filter.fieldLabel.country,
                id             : controller + 'FilterCountry',
                name           : 'filterCountry',
                emptyText      : translatecompanies.filter.emptyText.country,
                typeAhead      : true,
                forceSelection : true,
                columnWidth    : 0.95,
                displayField   : 'country',
                valueField     : '_id',
                minChars       : 0,
                anchor         :'100%',
                pageSize       : true,
                margin         : '20 0 0 0',
                labelWidth     : '100%',
                triggerAction  : 'all',
                editable       : true,
                queryMode      : 'remote',
                enableKeyEvents: true,
                //selectOnFocus  : true,
                store          : controller + '.ListFilterCountries',
                scope          : this,
                listeners      : {
                    select : function (combo, record, index) {
                        combo.store.removeFilter();
                        combo.store.proxy.extraParams = {};
                        var comboCities = Ext.getCmp(controller + 'FilterCity');
                        var iso = record[0].data.ISO;
                        comboCities.clearValue();
                        comboCities.reset();
                        comboCities.store.removeFilter();
                        comboCities.store.proxy.extraParams = {
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
                    }
                    ,
                    keyup : function (string) {
                        var value = this.getRawValue();
                        if(value.length > 0) {
                            this.store.clearFilter();
                            this.store.pageSize = 10000;
                            this.store.proxy.extraParams = {
                                limit : -1, 
                                page  : 1
                            };
                            this.store.filter('country', value, true, false);
                        } else {
                            this.store.removeFilter();
                            this.store.pageSize = moduleConfig.listCountriesPageSize;
                            this.store.proxy.extraParams = {};
                        }
                    }
                }
            }
            ,
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por país',
                fieldName      : controller + 'FilterCountry',
                margin         : '46 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter',
                style          : {
                    background : '#1fbad6',
                    border     : '1px solid #1fbad6'  
                },
                listeners      : {
                    click : function () {
                        var comboCountries = Ext.getCmp(controller + 'FilterCountry');
                        comboCountries.clearValue();
                        comboCountries.reset();
                        comboCountries.store.removeFilter();
                        comboCountries.store.pageSize = moduleConfig.listCountriesPageSize;
                        comboCountries.store.proxy.extraParams = {};
                        comboCountries.store.load();
                        var comboCities = Ext.getCmp(controller + 'FilterCity');
                        comboCities.clearValue();
                        comboCities.reset();
                        comboCities.store.removeFilter();
                        comboCities.store.proxy.extraParams = {};
                        comboCities.store.load();
                        comboCities.disable();
                    }
                }
            }
        ]
    }
    ,
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'combo',
                fieldLabel     : translatecompanies.filter.fieldLabel.city,
                id             : controller + 'FilterCity',
                name           : 'filterCity',
                emptyText      : translatecompanies.filter.emptyText.city,
                typeAhead      : true,
                forceSelection : true,
                columnWidth    : 0.95,
                displayField   : 'asciiname',
                valueField     : '_id',
                minChars       : 0,
                anchor         :'100%',
                pageSize       : true,
                margin         : '20 0 0 0',
                labelWidth     : '100%',
                triggerAction  : 'all',
                editable       : true,
                queryMode      : 'remote',
                enableKeyEvents: true,
                disabled       : true,
                scope          : this,
                store          : controller + '.ListFilterCities',
                listeners      : {
                    select : function (combo, record, index) {
                        var comboCountry = Ext.getCmp(controller + 'FilterCountry');
                        var valueCountry = comboCountry.getValue();
                        var recordCountry = comboCountry.findRecordByValue(valueCountry);
                        var iso = recordCountry.data.ISO;
                        combo.store.removeFilter();
                        combo.store.proxy.extraParams = {
                            filters : Ext.JSON.encode({
                                "and":[{
                                    "field"      : "ISO",
                                    "comparison" : "eq",
                                    "value"      : iso
                                }]
                            })
                        };
                    }
                    ,
                    keyup : function (string) {
                        var value = this.getRawValue();
                        var comboCountry = Ext.getCmp(controller + 'FilterCountry');
                        var valueCountry = comboCountry.getValue();
                        var recordCountry = comboCountry.findRecordByValue(valueCountry);
                        var iso = recordCountry.data.ISO;
                        if(value.length > 0) {
                            this.store.clearFilter();
                            this.store.pageSize = 10000;
                            this.store.proxy.extraParams = {
                                limit   : -1, 
                                page    : 1,
                                filters : Ext.JSON.encode({
                                    "and":[{
                                        "field"      : "ISO",
                                        "comparison" : "eq",
                                        "value"      : iso
                                    }]
                                })
                            };
                            this.store.filter('asciiname', value, true, false);
                        } else {
                            this.store.removeFilter();
                            this.store.pageSize = moduleConfig.listCitiesPageSize;
                            this.store.proxy.extraParams = {
                                filters : Ext.JSON.encode({
                                    "and":[{
                                        "field"      : "ISO",
                                        "comparison" : "eq",
                                        "value"      : iso
                                    }]
                                })
                            };
                        }
                    }
                }
            }
            ,
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por ciudad',
                fieldName      : controller + 'FilterCity',
                margin         : '46 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter',
                style          : {
                    background : '#1fbad6',
                    border     : '1px solid #1fbad6'  
                },
                listeners      : {
                    click : function () {
                        var comboCountry = Ext.getCmp(controller + 'FilterCountry');
                        var valueCountry = comboCountry.getValue();
                        var recordCountry = comboCountry.findRecordByValue(valueCountry);
                        var iso = recordCountry.data.ISO;
                        var comboCities = Ext.getCmp(controller + 'FilterCity');
                        comboCities.reset();
                        comboCities.store.removeFilter();
                        comboCities.store.pageSize = moduleConfig.listCitiesPageSize;
                        comboCities.store.proxy.extraParams = {
                            filters : Ext.JSON.encode({
                                "and":[{
                                    "field"      : "ISO",
                                    "comparison" : "eq",
                                    "value"      : iso
                                }]
                            })
                        };
                    }
                }
            }
        ]
    }
    ,
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype           : 'textfield',
                fieldLabel      : translatecompanies.filter.fieldLabel.address,
                id              : controller + 'FilterAddress',
                emptyText       : translatecompanies.filter.emptyText.address,
                columnWidth     : 0.95,
                enableKeyEvents : true,
                allowBlank      : true,
                margin          : '20 0 0 0',
                width           : '60%'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por dirección',
                fieldName      : controller + 'FilterAddress',
                margin         : '46 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter',
                style          : {
                    background : '#1fbad6',
                    border     : '1px solid #1fbad6'  
                }
            }
        ]
    }
    ,
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype           : 'textfield',
                fieldLabel      : translatecompanies.filter.fieldLabel.agent,
                id              : controller + 'FilterAgent',
                emptyText       : translatecompanies.filter.emptyText.agent,
                columnWidth     : 0.95,
                enableKeyEvents : true,
                allowBlank      : true,
                margin          : '20 0 0 0',
                width           : '60%'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por representante',
                fieldName      : controller + 'FilterAgent',
                margin         : '46 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter',
                style          : {
                    background : '#1fbad6',
                    border     : '1px solid #1fbad6'  
                }
            }
        ]
    }
    ,
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'combo',
                fieldLabel     : translatecompanies.filter.fieldLabel.status,
                id             : controller + 'FilterStatus',
                loadingText    : translatecompanies.filter.loadingText,
                emptyText      : translatecompanies.filter.emptyText.status,
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.95,
                displayField   : 'name',
                valueField     : 'status',
                minChars       : 0,
                anchor         :'100%',
                pageSize       : 10,
                margin         : '20 0 0 0',
                labelWidth     : '100%',
                triggerAction  : 'all',
                editable       : false,
                store          : Ext.create('Ext.data.Store', {
                    fields         : ['status', 'name'],
                    data           : [
                        {"status" : "active",   "name" : translate.global.statusActive},
                        {"status" : "inactive", "name" : translate.global.statusInactive}
                    ]
                }),
                queryMode    : 'local'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por estado',
                fieldName      : controller + 'FilterStatus',
                margin         : '46 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter',
                style          : {
                    background : '#1fbad6',
                    border     : '1px solid #1fbad6'  
                }
            }
        ]
    }
    
];
//esta window debe estar declarada
//obligatoriamente
moduleConfig.window = new Object();

moduleConfig.grid = new Object();
moduleConfig.grid.title = translatecompanies.list.title;
moduleConfig.grid.searchField = true;
moduleConfig.grid.searchTitle = translatecompanies.list.searchPlaceholder;
moduleConfig.grid.searchId = 'listSearchKeyword';
moduleConfig.grid.pageSize = 15;
moduleConfig.grid.topButtons = [];
moduleConfig.grid.contextualMenu = [
    {
        text    : translatecompanies.resources.titleWindow,
        id      : controller + 'ContextualResources',
        submenu : false,
        iconCls : 'codensa-menu'
    }
    ,
    {
        text    : translatecompanies.licenses.titleWindow,
        id      : controller + 'ContextualLicenses',
        submenu : false,
        iconCls : 'codensa-menu'
    }
    ,
    {
        text    : translatecompanies.devices.titleWindow,
        id      : controller + 'ContextualDevices',
        submenu : false,
        iconCls : 'codensa-menu'
    }
    ,
    {
        text    : translatecompanies.checktasks.module,
        id      : controller + 'ContextualModulePlanningTracking',
        submenu : false,
        iconCls : 'png-fa-desktop'
    }
    ,
    {
        text    : translatecompanies.checkresources.module,
        id      : controller + 'ContextualModuleResourceTracking',
        submenu : false,
        iconCls : 'png-fa-map-marker'
    }
    ,
    {
        text    : translatecompanies.resources.module,
        id      : controller + 'ContextualModuleResources',
        submenu : false,
        iconCls : 'png-fa-truck'
    }
    ,
    {
        text    : translatecompanies.users.module,
        id      : controller + 'ContextualModuleUsers',
        submenu : false,
        iconCls : 'png-fa-users'
    }
    ,
    {
        text    : translatecompanies.forms.module,
        id      : controller + 'ContextualModuleForms',
        submenu : false,
        iconCls : 'png-fa-wpforms'
    }
    ,
    {
        text    : translatecompanies.programresources.module,
        id      : controller + 'ContextualModuleScheduling',
        submenu : false,
        iconCls : 'png-fa-calendar'
    }
    ,
    {
        text    : translatecompanies.records.module,
        id      : controller + 'ContextualModuleRegisters',
        submenu : false,
        iconCls : 'png-fa-sticky-note-o'
    },
    {
        text    : translatecompanies.tasks.module,
        id      : controller + 'ContextualModuleTasks',
        submenu : false,
        iconCls : 'png-fa-list'
    },
];
moduleConfig.grid.tooltip = true;
moduleConfig.grid.tooltipField = 'name';
moduleConfig.grid.checkbox = 'checkboxmodel';
moduleConfig.grid.checkboxIndex = 0;
moduleConfig.grid.idField = '_id';
moduleConfig.grid.columns = [
    {
        text      : translatecompanies.list.id,
        dataIndex : '_id',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.list.name,
        dataIndex : 'name',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.list.nit,
        dataIndex : 'nit',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.list.phone,
        dataIndex : 'phone',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.list.address,
        dataIndex : 'address',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.list.city,
        dataIndex : 'city',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.list.country,
        dataIndex : 'country',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    },
    {
        text   : translatecompanies.list.agent,
        hidden : true,
        columns: [
            {
                text      : translatecompanies.list.person_name,
                dataIndex : 'legalRepresentativeName',
                flex      : 1,
                align     : 'left',
                hidden    : true,
                sortable  : true
            }
            ,
            {
                text      : translatecompanies.list.person_lastname,
                dataIndex : 'legalRepresentativeLastName',
                flex      : 1,
                align     : 'left',
                hidden    : true,
                sortable  : true
            }
            ,
            {
                text      : translatecompanies.list.person_document,
                dataIndex : 'legalRepresentativeId',
                flex      : 1,
                align     : 'left',
                hidden    : true,
                sortable  : true
            }
            ,
            {
                text      : translatecompanies.list.person_phone,
                dataIndex : 'legalRepresentativePhone',
                flex      : 1,
                align     : 'left',
                hidden    : true,
                sortable  : true
            }
        ]
    }
    ,
    {
        text      : translatecompanies.list.status,
        dataIndex : 'status',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
];
moduleConfig.grid.pagingToolbarItems = [
    {
        text: translate.global.export,
        enableToggle: true,
        defaultAlign: 'right',
        action: 'exportXls',
        cls : 'x-btn-default-small',
        style:{
            background: '#1fbad6',
            border: '1px solid #fff',  
        },
    }
]

//-----------------------------------------------------------------------
// Ventana con Formulario Embebido de Crear/Editar Empresas (windowForm)
//-----------------------------------------------------------------------
moduleConfig.groupIdCompanies = controller + 'Module';
moduleConfig.titleWindowCompanies = translate.global.create+' '+translatecompanies.moduleTitle;
moduleConfig.widthWindowCompanies = '70%';
moduleConfig.heightWindowCompanies = '65%';
moduleConfig.resizableWindowCompanies = false;
moduleConfig.toolbarCompanies = [];
moduleConfig.itemsFormCompanies = [
    {
        xtype : 'hiddenfield',
        id    : controller + 'FormId',
        name  : '_id',
        value : ''
    }
    ,
    {
        xtype : 'hiddenfield',
        id    : controller + 'FormStatus',
        name  : 'status',
        value : 'active'
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translatecompanies.form.fieldSetCompany,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '0 5 0 5',
            items       : [
                {
                    xtype             : 'textfield',
                    fieldLabel        : translatecompanies.form.nit,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormNit',
                    name              : 'nit',
                    emptyText         : translatecompanies.form.nit.emptyText,
                    allowBlank        : false,
                    flex              : 1,
                    margin            : '0 10 0 10',
                    vtype             : 'numeric',
                    minLengthText     : translatecompanies.form.nit.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translatecompanies.form.name,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormName',
                    name              : 'name',
                    emptyText         : translatecompanies.form.name.emptyText,
                    allowBlank        : false,
                    flex              : 3,
                    margin            : '0 10 0 10',
                    //vtype             : 'alphanumeric',
                    minLengthText     : translatecompanies.form.name.nameError
                }
            ]
        }
        ,
        {
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'textfield',
                    fieldLabel        : translatecompanies.form.phone,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPhone',
                    name              : 'phone',
                    emptyText         : translatecompanies.form.phone.emptyText,
                    allowBlank        : false,
                    flex              : 1,
                    margin            : '0 10 0 10',
                    vtype             : 'numeric',
                    minLengthText     : translatecompanies.form.phone.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translatecompanies.form.address,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormAddress',
                    name              : 'address',
                    emptyText         : translatecompanies.form.address.emptyText,
                    allowBlank        : false,
                    flex              : 3,
                    margin            : '0 10 0 10',
                    vtype             : 'specialchars',
                    minLengthText     : translatecompanies.form.address.nameError
                }
            ]
        }
        ,
        {
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'combo',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'combobox',
                    fieldLabel        : translatecompanies.form.country,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormCountry',
                    name              : 'country',
                    emptyText         : translatecompanies.form.country.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '0 10 10 10',
                    typeAhead         : true,
                    forceSelection    : true,
                    displayField      : 'country',
                    valueField        : '_id',
                    minChars          : 0,
                    labelWidth        : '100%',
                    pageSize          : true,
                    triggerAction     : 'all',
                    loadMask          : false,
                    editable          : true,
                    queryMode         : 'remote',
                    enableKeyEvents   : true,
                    store             : controller + '.ListCountries',
                    scope             : this,
                    listeners         : {
                        select : function (combo, record, index) {
                            combo.store.removeFilter();
                            combo.store.proxy.extraParams = {};
                            var comboCities = Ext.getCmp(controller + 'FormCity');
                            var iso = record[0].data.ISO;
                            comboCities.clearValue();
                            comboCities.reset();
                            comboCities.store.removeFilter();
                            comboCities.store.proxy.extraParams = {
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
                        }
                        ,
                        keyup : function (string) {
                            var value = this.getRawValue();
                            if(value.length > 0) {
                                this.store.clearFilter();
                                this.store.pageSize = 10000;
                                this.store.proxy.extraParams = {
                                    limit : -1, 
                                    page  : 1
                                };
                                this.store.filter('country', value, true, false);
                            } else {
                                this.store.removeFilter();
                                this.store.pageSize = moduleConfig.listCountriesPageSize;
                                this.store.proxy.extraParams = {};
                            }
                        }
                    }
                }
                ,
                {
                    xtype             : 'combobox',
                    fieldLabel        : translatecompanies.form.city,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormCity',
                    name              : 'city',
                    emptyText         : translatecompanies.form.city.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '0 10 10 10',
                    typeAhead         : true,
                    forceSelection    : true,
                    displayField      : 'asciiname',
                    valueField        : '_id',
                    minChars          : 0,
                    pageSize          : true,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    loadMask          : false,
                    editable          : true,
                    queryMode         : 'remote',
                    enableKeyEvents   : true,
                    disabled          : true,
                    store             : controller + '.ListCities',
                    listeners         : {
                        select : function (combo, record, index) {
                            var comboCountry = Ext.getCmp(controller + 'FormCountry');
                            var valueCountry = comboCountry.getValue();
                            var recordCountry = comboCountry.store.findRecord('country', valueCountry);
                            var iso = recordCountry.data.ISO;
                            combo.store.removeFilter();
                            combo.store.proxy.extraParams = {
                                filters : Ext.JSON.encode({
                                    "and":[{
                                        "field"      : "ISO",
                                        "comparison" : "eq",
                                        "value"      : iso
                                    }]
                                })
                            };
                        }
                        ,
                        keyup : function (string) {
                            var value = this.getRawValue();
                            var comboCountry = Ext.getCmp(controller + 'FormCountry');
                            var valueCountry = comboCountry.getValue();
                            var recordCountry = comboCountry.store.findRecord('country', valueCountry);
                            var iso = recordCountry.data.ISO;
                            if(value.length > 0) {
                                this.store.clearFilter();
                                this.store.pageSize = 10000;
                                this.store.proxy.extraParams = {
                                    limit   : -1, 
                                    page    : 1,
                                    filters : Ext.JSON.encode({
                                        "and":[{
                                            "field"      : "ISO",
                                            "comparison" : "eq",
                                            "value"      : iso
                                        }]
                                    })
                                };
                                this.store.filter('asciiname', value, true, false);
                            } else {
                                this.store.removeFilter();
                                this.store.pageSize = moduleConfig.listCitiesPageSize;
                                this.store.proxy.extraParams = {
                                    filters : Ext.JSON.encode({
                                        "and":[{
                                            "field"      : "ISO",
                                            "comparison" : "eq",
                                            "value"      : iso
                                        }]
                                    })
                                };
                            }
                        }
                    }
                }
            ]
        }
        ]
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translatecompanies.form.fieldSetAgent,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '0 5 0 5',
            items       : [
                {
                    xtype             : 'textfield',
                    fieldLabel        : translatecompanies.form.personName,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonName',
                    name              : 'legalRepresentativeName',
                    emptyText         : translatecompanies.form.personName.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '0 10 0 10',
                    vtype             : 'alphabetic',
                    minLengthText     : translatecompanies.form.personName.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translatecompanies.form.personLastname,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonLastname',
                    name              : 'legalRepresentativeLastName',
                    emptyText         : translatecompanies.form.personLastname.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '0 10 0 10',
                    vtype             : 'alphabetic',
                    minLengthText     : translatecompanies.form.personLastname.nameError
                }
            ]
        }
        ,
        {
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'textfield',
                    fieldLabel        : translatecompanies.form.personDocument,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonDocument',
                    name              : 'legalRepresentativeId',
                    emptyText         : translatecompanies.form.personDocument.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '0 10 10 10',
                    vtype             : 'alphanumeric',
                    minLengthText     : translatecompanies.form.personDocument.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translatecompanies.form.personPhone,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonPhone',
                    name              : 'legalRepresentativePhone',
                    emptyText         : translatecompanies.form.personPhone.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '0 10 10 10',
                    vtype             : 'numeric',
                    minLengthText     : translatecompanies.form.personPhone.nameError
                }
            ]
        }
        ]
    }
];
moduleConfig.bottomButtonsCompanies = [
    {
        text      : translate.global.cancel,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsCancelButton',
        action    : controller + 'WindowsCancelButton'
    },
    {
        text      : translate.global.save,
        iconCls   : 'ok-button',
        cls       : 'blue-cyan',
        id        : controller + 'WindowsSaveButton',
        action    : controller + 'WindowsSaveButton',
        scope     : this,
        formBind  : true
    } 
];

//-----------------------------------------------------------------------
// Ventana con Grid Embebido de Módulo de Licencias (windowGrid)
//-----------------------------------------------------------------------
moduleConfig.groupIdLicenses = controller + 'Licenses';
moduleConfig.titleWindowLicenses = translatecompanies.licenses.titleWindow;
moduleConfig.widthWindowLicenses = '80%';
moduleConfig.heightWindowLicenses = '80%';
moduleConfig.resizableWindowLicenses = false;
//Toolbar Licencias (search textfield and buttons)
moduleConfig.toolbarLicenses = [
//    {
//        xtype           : 'textfield',
//        id              : 'searchKeywordLicenses',
//        emptyText       : translatecompanies.licenses.emptyText,
//        width           : '30%',
//        enableKeyEvents : true,
//        columnWidth     : 1
//    }
//    ,
//    {
//        xtype          : 'button',
//        iconCls        : 'cancel-button',
//        tooltip        : translatecompanies.licenses.tooltipButton,
//        fieldName      : 'clearFilterLicenses',
//        cls            : 'x-btn-default-small',
//        action         : 'clearFilterLicenses'
//    }
//    ,
    '->'
    ,
    {
        text    : translate.global.create,
        id      : controller + 'CreateLicenses',
        action  : controller + 'CreateLicenses',
        iconCls : 'add-button',
        cls     : 'blue-cyan',
        submenu : false
    }
    ,
    {
        text    : translate.global.delete,
        id      : controller + 'DeleteLicenses',
        action  : controller + 'DeleteLicenses',
        iconCls : 'remove-button',
        submenu : false
    }
];
//Store Licencias
moduleConfig.storeLicenses = controller + '.ListLicenses';
//Columnas del GridPanel Licencias
moduleConfig.columnsLicenses = [
    {
        text      : translatecompanies.licenses.list.id,
        dataIndex : '_id',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.licenses.list.id_application,
        dataIndex : 'id_application',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.licenses.list.application,
        dataIndex : 'Application',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.licenses.list.usersnumber,
        dataIndex : 'maxUsers',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.licenses.list.resourcesnumber,
        dataIndex : 'maxResources',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.licenses.list.modules,
        dataIndex : 'Modules',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view) {
            var longitud = record.data['Modules'].length;
            var output = '';
            if (longitud > 0){
                for (var i=0; i < longitud; ++i){
                    if(i == (longitud)-1){
                        output += value[i].name+".";
                    }
                    else{
                        output += value[i].name+", ";
                    }
                }
            }
            return output;
        }
    }
];
moduleConfig.pluginsLicenses = [{
    ptype      : 'rowexpander',
    rowBodyTpl : new Ext.XTemplate(
    '<p><center><h4 class="header-rowexpander"><b>'+translatecompanies.licenses.list.modules+'</b></h4></center><hr class="line-rowexpander"> {Modules:this.formatModules}</p>',
    {
        formatModules: function(value, metaData, record, rowIndex, colIndex, store, view) {
            var longitud = value.length;
            var output = '';
            if (longitud > 0){
                for (var i=0; i < longitud; ++i){
                    output += "<span class='list-rowexpander'><b>"+(i+1)+". "+value[i].name+".</b></span><br>";
                }
            } else output = "<span class='no-records-rowexpander'><b>"+translate.global.emptyMsg+".</b></span><br>";
            return output;
        }
    })
}];
//MenuItem en GridPanel Recursos
moduleConfig.menuItemLicenses = [
    {
        text    : translate.global.edit,
        action  : controller + 'ContextualEditLicenses',
        submenu : false,
        iconCls : 'edit-menu'
    }
    ,
    {
        text    : translate.global.delete,
        action  : controller + 'ContextualDeleteLicenses',
        submenu : false,
        iconCls : 'delete-menu'
    }
];
//Bottom Buttons del GridPanel Licencias
moduleConfig.bottomButtonsLicenses = [
    {
        text      : translate.global.closeWindow,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsCloseLicenses',
        action    : controller + 'WindowsCloseLicenses'
    }
];


//-----------------------------------------------------------------------
// Ventana con Formulario Embebido de Crear/Editar Licencias (windowForm)
//-----------------------------------------------------------------------
moduleConfig.groupIdCreateLicenses = controller + 'CreateLicenses';
moduleConfig.titleWindowCreateLicenses = translate.global.create+' '+translatecompanies.licenses.titleModule;
moduleConfig.widthWindowCreateLicenses = '45%';
moduleConfig.heightWindowCreateLicenses = '75%';
moduleConfig.resizableWindowCreateLicenses = false;
moduleConfig.toolbarCreateLicenses = [];
moduleConfig.itemsFormCreateLicenses = [
    {
        xtype : 'hiddenfield',
        id    : controller + 'CreateLicensesFormId',
        name  : '_id',
        value : ''
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translatecompanies.licenses.form.fieldSetLicense,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'container',
            layout      : 'hbox',
            margin      : '0 5 0 5',
            items       : [
                {
                    xtype          : 'combo',
                    fieldLabel     : translatecompanies.licenses.form.application,
                    afterLabelTextTpl : AppGlobals.required,
                    id             : controller + 'CreateLicensesFormApplication',
                    action         : controller + 'CreateLicensesFormApplication',
                    name           : 'application',
                    loadingText    : 'loading...',
                    emptyText      : translatecompanies.licenses.form.applicationEmptyText,
                    typeAhead      : false,
                    forceSelection : false,
                    allowBlank     : false,
                    flex           : 4,
                    displayField   : 'name',
                    valueField     : '_id',
                    minChars       : 0,
                    margin         : '0 10 10 10',
                    pageSize       : 10,
                    labelWidth     : '100%',
                    triggerAction  : 'all',
                    editable       : false,
                    store          : 'Applications.ListCombo'
                }
            ]
        }
//        ,
//        {
//            xtype       : 'container',
//            layout      : 'hbox',
//            margin      : '5 5 5 5',
//            items       : [
//                {
//                    xtype             : 'numberfield',
//                    fieldLabel        : translatecompanies.licenses.form.usersnumber,
//                    afterLabelTextTpl : AppGlobals.required,
//                    id                : controller + 'CreateLicensesFormNumberUsers',
//                    name              : 'number_users',
//                    minValue          : 1,
//                    emptyText         : translatecompanies.licenses.form.usersnumberEmptyText,
//                    allowBlank        : false,
//                    flex              : 2,
//                    labelWidth        : '100%',
//                    margin            : '10 10 10 10',
//                    vtype             : 'numeric',
//                    minLengthText     : translatecompanies.licenses.form.usersnumberNameError
//                }
//                ,
//                {
//                    xtype             : 'numberfield',
//                    fieldLabel        : translatecompanies.licenses.form.resourcesnumber,
//                    afterLabelTextTpl : AppGlobals.required,
//                    id                : controller + 'CreateLicensesFormNumberResources',
//                    name              : 'number_resources',
//                    minValue          : 1,
//                    emptyText         : translatecompanies.licenses.form.resourcesnumberEmptyText,
//                    allowBlank        : false,
//                    flex              : 2,
//                    labelWidth        : '100%',
//                    margin            : '10 10 10 10',
//                    vtype             : 'numeric',
//                    minLengthText     : translatecompanies.licenses.form.resourcesnumberNameError
//                }
//            ]
//        }
        ]
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translatecompanies.licenses.form.fieldSetModule,
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'container',
            layout      : 'hbox',
            margin      : '0 5 5 5',
            items       : [
                {
                    xtype        : 'itemselector',
                    id           : controller + 'CreateLicensesFormModules',
                    name         : 'modules',
                    anchor       : '100%',
                    labelWidth   : '100%',
                    width        : 630,
                    height       : 250,
                    store        : 'Applications.ListItemselector',
                    margin       : '10 10 10 10',
                    displayField : 'name',
                    valueField   : 'name',
                    value        : [],
                    allowBlank   : false,
                    multiSelect  : true,
                    deferInitialRefresh : true,
                    droppable    : false,
                    draggable    : false,
                    buttons      : ['add', 'remove'],
                    fromTitle    : translatecompanies.licenses.form.modulesfromTitle,
                    toTitle      : translatecompanies.licenses.form.modulestoTitle
                }
            ]
        }
        ]
    }
];
moduleConfig.bottomButtonsCreateLicenses = [
    {
        text      : translate.global.cancel,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsCreateLicensesCancelButton',
        action    : controller + 'WindowsCreateLicensesCancelButton'
    },
    {
        text      : translate.global.save,
        iconCls   : 'ok-button',
        cls       : 'blue-cyan',
        id        : controller + 'WindowsCreateLicensesSaveButton',
        action    : controller + 'WindowsCreateLicensesSaveButton',
        scope     : this,
        formBind  : true
    } 
];


//-----------------------------------------------------------------------
// Ventana con Grid Embebido de Módulo de Recursos (windowGrid)
//-----------------------------------------------------------------------
moduleConfig.groupIdResources = controller + 'Resources';
moduleConfig.titleWindowResources = translatecompanies.resources.titleWindow;
moduleConfig.widthWindowResources = '50%';
moduleConfig.heightWindowResources = '80%';
moduleConfig.resizableWindowResources = false;
//Toolbar Recursos (search textfield and buttons)
moduleConfig.toolbarResources = [
    {
        xtype           : 'textfield',
        id              : 'searchKeywordResources',
        emptyText       : translatecompanies.resources.emptyText,
        width           : '30%',
        enableKeyEvents : true,
        columnWidth     : 1
    }
    ,
    {
        xtype          : 'button',
        iconCls        : 'cancel-button',
        tooltip        : translatecompanies.resources.tooltipButton,
        fieldName      : 'clearFilterResources',
        cls            : 'x-btn-default-small',
        action         : 'clearFilterResources'   
    }
    ,
    '->'
    ,
    {
        text    : translate.global.create,
        id      : controller + 'CreateResources',
        action  : controller + 'CreateResources',
        iconCls : 'add-button',
        cls     : 'blue-cyan',
        submenu : false,
        items   : []
    }
    ,
    {
        text    : translate.global.delete,
        id      : controller + 'DeleteResources',
        action  : controller + 'DeleteResources',
        iconCls : 'remove-button',
        submenu : false,
        items   : []
    }
];
moduleConfig.storeResources = controller + '.ListResources';
//Columnas del GridPanel Recursos
moduleConfig.columnsResources = [
    {
        text      : translatecompanies.resources.list.id,
        dataIndex : '_id',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.resources.list.name,
        dataIndex : 'name',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.resources.list.limit,
        dataIndex : 'limit',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.resources.list.icon,
        dataIndex : 'id_icon',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.resources.list.routingTool,
        dataIndex : 'routingTool',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.resources.list.devicetype,
        dataIndex : 'Devices',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view) {
            return value;
        }
    }
    ,
    {
        text      : translatecompanies.resources.list.attributes,
        dataIndex : 'Attributes',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view) {
            return value;
        }
    }
    ,
    {
        text      : translatecompanies.resources.list.relatedresources,
        dataIndex : 'Resources',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view) {
            return value;
        }
    }
    ,
    {
        text      : translatecompanies.resources.list.icon,
        dataIndex : 'IconNormal',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view) {
            return value;
        }
    }
];
moduleConfig.pluginsResources = [{
    ptype      : 'rowexpander',
    rowBodyTpl : new Ext.XTemplate(
    '<p><center><h4 class="header-rowexpander"><b>'+translatecompanies.resources.list.devicetype+'</b></h4></center><hr class="line-rowexpander"> {Devices:this.formatDevicesResources}</p>',
    '<p><center><h4 class="header-rowexpander"><b>'+translatecompanies.resources.list.attributes+'</b></h4></center><hr class="line-rowexpander"> {Attributes:this.formatAttributes}</p>',
    '<p><center><h4 class="header-rowexpander"><b>'+translatecompanies.resources.list.relatedresources+'</b></h4></center><hr class="line-rowexpander"> {Resources:this.formatRelatedResources}</p>',
    '<p><center><h4 class="header-rowexpander"><b>'+translatecompanies.resources.list.icon+'</b></h4></center><hr class="line-rowexpander"> {IconNormal:this.formatIconsResources}</p>',
    {
        formatDevicesResources : function(value, metaData, record, rowIndex, colIndex, store, view) {
            var longitud = value.length;
            var output = '';
            if (longitud > 0){
                for (var i=0; i < longitud; ++i){
                    output += "<span class='list-rowexpander'><b>"+(i+1)+". "+value[i].name+".</b></span><br>";
                }
            } else output = "<span class='no-records-rowexpander'><b>"+translate.global.emptyMsg+".</b></span><br>";
            return output;
        }
    },
    {
        formatAttributes : function(value, metaData, record, rowIndex, colIndex, store, view) {
            var longitud = value.length;
            var output = '';
            if (longitud > 0){
                for (var i=0; i < longitud; ++i){
                    output += "<span class='list-rowexpander'><b>"+(i+1)+". "+value[i].fieldLabel+".</b></span><br>";
                }
            } else output = "<span class='no-records-rowexpander'><b>"+translate.global.emptyMsg+".</b></span><br>";
            return output;
        }
    },
    {
        formatRelatedResources : function(value, metaData, record, rowIndex, colIndex, store, view) {
            var longitud = value.length;
            var output = '';
            if (longitud > 0){
                for (var i=0; i < longitud; ++i){
                    output += "<span class='list-rowexpander'><b>"+(i+1)+". "+value[i].name+".</b></span><br>";
                }
            } else output = "<span class='no-records-rowexpander'><b>"+translate.global.emptyMsg+".</b></span><br>";
            return output;
        }
    },
    {
        formatIconsResources : function(value, metaData, record, rowIndex, colIndex, store, view) {
            var output = '';
            if (value != null){
                if (value != ''){
					var ruta = objController.urlIconNormal({normal:value});
                    output = '<img src="'+ruta+'" align="left" height="32" width="32">';
                } else output = "<span class='no-records-rowexpander'><b>"+translate.global.emptyMsg+".</b></span><br>";
            } else output = "<span class='no-records-rowexpander'><b>"+translate.global.emptyMsg+".</b></span><br>";
            return output;
        }
    })
}];
//MenuItem en GridPanel Recursos
moduleConfig.menuItemResources = [
    {
        text    : translate.global.edit,
        action  : controller + 'ContextualEditResources',
        submenu : false,
        iconCls : 'edit-menu'
    }
    ,
    {
        text    : translate.global.delete,
        action  : controller + 'ContextualDeleteResources',
        submenu : false,
        iconCls : 'delete-menu'
    }
];
//Bottom Buttons del GridPanel Recursos
moduleConfig.bottomButtonsResources = [
    {
        text      : translate.global.closeWindow,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsCloseResources',
        action    : controller + 'WindowsCloseResources'
    }
];
moduleConfig.toolbarButtonsResources = [
    {
        text: translate.global.export,
        enableToggle: true,
        defaultAlign: 'right',
        action: 'exportXls',
        cls : 'x-btn-default-small',
        style:{
            background: '#1fbad6',
            border: '1px solid #fff',  
        },
    }
];

//------------------------------------------------------------------------------
// Ventana con Formulario y Grid Embebido de Crear/Editar Recursos (windowGrid)
//------------------------------------------------------------------------------
moduleConfig.groupIdCreateResources = controller + 'CreateResources';
moduleConfig.titleWindowCreateResources = translatecompanies.resources.form.titleWindow;
moduleConfig.widthWindowCreateResources = '45%';
moduleConfig.heightWindowCreateResources = '75%';
moduleConfig.resizableWindowCreateResources = false;
moduleConfig.toolbarCreateResources = [];
/****************************************
* Devices Definitions en Crear Recursos
****************************************/
moduleConfig.toolbarGridDevicesDefinitions = [
    '->',
    {
        text      : translatecompanies.resources.form.addDeviceButton,
        id        : controller + 'AddDevicesCreateResources',
        action    : controller + 'AddDevicesCreateResources',
        iconCls   : 'add-button',
        cls       : 'x-btn-default-small'
    }
    ,
    {
        text      : translatecompanies.resources.form.deleteDeviceButton,
        id        : controller + 'RemoveDevicesCreateResources',
        action    : controller + 'RemoveDevicesCreateResources',
        iconCls   : 'remove-button',
        cls       : 'x-btn-default-small'
    }
];
moduleConfig.storeDevicesDefinitions = controller+'.ListResourcesDeviceType';
moduleConfig.columnsDevicesDefinitions = [
    {
        text      : translatecompanies.resources.form.listIdDevice,
        dataIndex : 'id_deviceDefinition',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.resources.form.listNameDevice,
        dataIndex : 'deviceDefinitionName',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    , 
    {
        xtype     : 'checkcolumn',
        text      : 'AllowBlank',
        dataIndex : 'allowBlank',
        hidden    : true,
        sortable  : false,
        flex      : 1
    }
    , 
    {
        xtype     : 'checkcolumn',
        text      : 'Mandatory',
        dataIndex : 'mandatory',
        hidden    : true,
        sortable  : false,
        flex      : 1
    }
    , 
    {
        xtype         : 'checkcolumn',
        text          : translatecompanies.resources.form.listRequiredAttribute,
        dataIndex     : 'renderAllowBlank',
        hidden        : false,
        sortable      : true,
        flex          : 1,
        listeners : {
            beforecheckchange : function(checkcolumn, rowIndex, checked, eOpts) {
                var record = Ext.getCmp('DevicesDefinitionsGrid').getView().getRecord(rowIndex);
                if (record.get('mandatory') == false) {
                    record.beginEdit();
                    if(checked == true) {
                        record.set('allowBlank',false);
                    } else {
                        record.set('allowBlank',true);
                    }
                    record.endEdit();
                    return true;
                }
                return false;
            }
        }
    }
];
moduleConfig.menuItemDevicesDefinitions = [
    {
        text    : translate.global.delete,
        action  : controller + 'ContextualDeleteDevicesDefinitionsCreateResources',
        submenu : false,
        iconCls : 'delete-menu'
    }
];
/***************************************
* Customs Attributes en Crear Recursos
***************************************/
moduleConfig.toolbarGridCustomsAttributes = [
    '->',
    {
        text      : translatecompanies.resources.form.addAttributeButton,
        id        : controller + 'AddAttributesCreateResources',
        action    : controller + 'AddAttributesCreateResources',
        iconCls   : 'add-button',
        cls       : 'x-btn-default-small'
    }
    ,
    {
        text      : translatecompanies.resources.form.deleteAttributeButton,
        id        : controller + 'RemoveAttributesCreateResources',
        action    : controller + 'RemoveAttributesCreateResources',
        iconCls   : 'remove-button',
        cls       : 'x-btn-default-small'
    }
];
moduleConfig.storeCustomsAttributes = controller+'.ListResourcesTelematicAttribute';
moduleConfig.columnsCustomsAttributes = [
    {
        text      : translatecompanies.resources.form.listIdAttribute,
        dataIndex : '_id',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.resources.form.listTemplateAttribute,
        dataIndex : 'name',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.resources.form.listNameAttribute,
        dataIndex : 'fieldLabel',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true,
        editor : {
            xtype      : 'textfield',
            allowBlank : false
        }
    }
    ,
    {
        text      : translatecompanies.resources.form.listAttributeType,
        dataIndex : 'xtype',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true,
        editor    : new Ext.form.field.ComboBox({
            typeAhead     : true,
            triggerAction : 'all',
            editable      : false,
            store         : [
                ['datefield','datefield'],
                ['textfield','textfield'],
                ['timefield','timefield'],
                ['numberfield','numberfield']
            ]
        })
    }
    , 
    {
        xtype         : 'checkcolumn',
        text          : 'AllowBlank',
        dataIndex     : 'allowBlank',
        hidden        : true,
        sortable      : false,
        flex          : 1
    }
    , 
    {
        xtype         : 'checkcolumn',
        text          : 'Mandatory',
        dataIndex     : 'mandatory',
        hidden        : true,
        sortable      : false,
        flex          : 1
    }
    , 
    {
        xtype         : 'checkcolumn',
        text          : translatecompanies.resources.form.listRequiredAttribute,
        dataIndex     : 'renderAllowBlank',
        hidden        : false,
        sortable      : true,
        flex          : 1,
        listeners : {
            beforecheckchange : function(checkcolumn, rowIndex, checked, eOpts) {
                var record = Ext.getCmp('CustomsAttributesGrid').getView().getRecord(rowIndex);
                if (record.get('mandatory') == false) {
                    record.beginEdit();
                    if(checked == true) {
                        record.set('allowBlank',false);
                    } else {
                        record.set('allowBlank',true);
                    }
                    record.endEdit();
                    return true;
                }
                return false;
            }
        }
    }
];
moduleConfig.menuItemCustomsAttributes = [
    {
        text    : translate.global.delete,
        action  : controller + 'ContextualDeleteCustomsAttributesCreateResources',
        submenu : false,
        iconCls : 'delete-menu'
    }
];
/****************************************
* Related Resources en Crear Recursos
****************************************/
moduleConfig.toolbarGridRelatedResources = [
    '->',
    {
        text      : translatecompanies.resources.form.addRelatedResourceButton,
        id        : controller + 'AddRelatedResourcesCreateResources',
        action    : controller + 'AddRelatedResourcesCreateResources',
        iconCls   : 'add-button',
        cls       : 'x-btn-default-small'
    }
    ,
    {
        text      : translatecompanies.resources.form.deleteRelatedResourceButton,
        id        : controller + 'RemoveRelatedResourcesCreateResources',
        action    : controller + 'RemoveRelatedResourcesCreateResources',
        iconCls   : 'remove-button',
        cls       : 'x-btn-default-small'
    }
];
moduleConfig.storeRelatedResources = controller+'.ListResourcesRelatedResource';
moduleConfig.columnsRelatedResources = [
    {
        text      : translatecompanies.resources.form.listIdRelatedResource,
        dataIndex : 'id_resourceDefinition',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.resources.form.listNameRelatedResource,
        dataIndex : 'name',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : 'CustomsAttributes',
        dataIndex : 'Attributes',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true,
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            return value;
        }
    }
];
moduleConfig.menuItemRelatedResources = [
    {
        text    : translate.global.edit,
        action  : controller + 'ContextualEditRelatedResourcesCreateResources',
        submenu : false,
        iconCls : 'edit-menu'
    }
    ,
    {
        text    : translate.global.delete,
        action  : controller + 'ContextualDeleteRelatedResourcesCreateResources',
        submenu : false,
        iconCls : 'delete-menu'
    }
];
//Items del Formulario Crear Recursos
moduleConfig.itemsFormCreateResources = [
    {
        xtype : 'hiddenfield',
        id    : controller + 'CreateResourcesFormId',
        name  : '_id',
        value : ''
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translatecompanies.resources.form.fieldSetResource,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '0 5 0 5',
            items       : [
                {
                    xtype             : 'textfield',
                    fieldLabel        : translatecompanies.resources.form.name ,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'CreateResourcesName',
                    name              : 'name',
                    emptyText         : translatecompanies.resources.form.nameEmptyText,
                    allowBlank        : false,
                    flex              : 4,
                    margin            : '0 10 0 10',
                    labelWidth        : '100%',
                    vtype             : 'alphanumeric',
                    minLengthText     : translatecompanies.resources.form.nameNameError
                }
            ]
        }
        ,
        {
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '0 5 0 5',
            items       : [
                {
                    xtype             : 'numberfield',
                    fieldLabel        : translatecompanies.resources.form.limit,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'CreateResourcesFormLimit',
                    name              : 'limit',
                    minValue          : 1,
                    emptyText         : translatecompanies.resources.form.limitEmptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '0 10 0 10',
                    labelWidth        : '100%',
                    vtype             : 'numeric',
                    minLengthText     : translatecompanies.resources.form.limitNameError,
                }
                ,
                {
                    xtype             : 'combo',
                    fieldLabel        : translatecompanies.resources.form.template,
                    //afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'CreateResourcesFormTemplate',
                    name              : 'template',
                    loadingText       : 'loading...',
                    emptyText         : translatecompanies.resources.form.templateEmptyText,
                    typeAhead         : false,
                    forceSelection    : false,
                    allowBlank        : true,
                    flex              : 2,
                    displayField      : 'name',
                    valueField        : '_id',
                    minChars          : 0,
                    margin            : '0 10 0 10',
                    pageSize          : 15,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    disabled          : true,
                    editable          : false,
                    store             : controller+'.ListResourcesComboTelematicAttribute'
                }
            ]
        }
        ,
        {
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'combo',
                    fieldLabel        : translatecompanies.resources.form.icon,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'CreateResourcesFormIcon',
                    name              : 'icon',
                    loadingText       : 'loading...',
                    emptyText         : translatecompanies.resources.form.iconEmptyText,
                    typeAhead         : false,
                    forceSelection    : false,
                    allowBlank        : false,
                    flex              : 2,
                    displayField      : 'name',
                    valueField        : '_id',
                    minChars          : 0,
                    margin            : '0 10 10 10',
                    pageSize          : 15,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    disabled          : false,
                    editable          : false,
                    store             : controller+'.ListResourcesComboIcons',
                    listConfig        : {
                        loadingText   : translate.global.searching,
                        emptyText     : translate.global.emptyMsg,
                        getInnerTpl   : function() {
							var ruta = objController.urlIconNormal({normal:''});
                            return '<tpl for="."><div class="x-combo-list-item" ><div class="combo-icon" >{name} <img src="'+ruta+'{normal}" align="left" height="32" width="32">&nbsp;&nbsp;</div></div></tpl>';
                        }
                    }
                }
                ,
                {
                    xtype          : 'combo',
                    fieldLabel     : translatecompanies.resources.form.routingTool,
                    id             : controller + 'CreateResourcesFormRoutingTool',
                    name           : 'routingTool',
                    emptyText      : translatecompanies.resources.form.routingToolEmptyText,
                    typeAhead      : false,
                    forceSelection : false,
                    allowBlank     : false,
                    flex           : 2,
                    displayField   : 'routingTool',
                    valueField     : '_id',
                    minChars       : 0,
                    flex           : 2,
                    margin         : '0 10 10 10',
                    pageSize       : 15,
                    labelWidth     : '100%',
                    triggerAction  : 'all',
                    editable       : false,
                    queryMode      : 'local',
                    store          : Ext.create('Ext.data.Store', {
                        fields         : ['_id', 'routingTool'],
                        data           : [
                            {"_id" : "Google maps-d", "routingTool" : "Google maps - automovil"},
                            {"_id" : "Google maps-w", "routingTool" : "Google maps - a pie"},
                            {"_id" : "Waze", "routingTool" : "Waze"}
                        ]
                    })
                }
            ]
        }
        ]
    }
    ,
    /**
    *************************************************************
    * GridPanel 'Atributos' incrustado en el formulario
    * NOTA: Las propiedades definidas con el objeto
    * moduleConfig deben estar definidas por encima de este
    * array moduleConfig.itemsFormCreateResources
    *************************************************************
    **/
    {
        xtype       : 'fieldset',
        title       : translatecompanies.resources.form.fieldSetCustomsAttributes,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'gridpanel',
            id          : 'CustomsAttributesGrid',
            border      : false,
            columns     : (moduleConfig.columnsCustomsAttributes) ? moduleConfig.columnsCustomsAttributes : [{text : 'No components created in the toolbar', width : '100%'}],
            store       : (moduleConfig.storeCustomsAttributes) ? moduleConfig.storeCustomsAttributes : '',
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit : 1
                })
            ],
            loadMask    : true,
            height      : '100%',
            minHeight   : '100%',
            multiSelect : true,
            selType     : 'checkboxmodel',
            selModel    : {
                checkOnly      : false,
                injectCheckbox : 0,
                onHeaderClick : function (headerCt, header, e) {
                    var store = Ext.data.StoreManager.lookup(controller+'.ListResourcesTelematicAttribute');
                    var a=0;
                    if (header.isCheckerHd) {
                        e.stopEvent();
                        var isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
                        this.preventFocus = true;
                        if (isChecked) {
                            this.deselectAll(true);
                        } else {
                            store.each(function(record) {
                                if (record.data['mandatory'] == false) {
                                    Ext.getCmp('CustomsAttributesGrid').getSelectionModel().select(a, true, false);
                                }
                                a++;
                            });
                            this.toggleUiHeader(true);
                        }
                    }
                }
            },
            viewConfig  : {
                forceFit            : true,
                enableTextSelection : true,
                markDirty           : false,
                getRowClass : function(record, rowIndex, rowParams, store) {
                    return record.get('mandatory') ? 'x-item-disabled' : '';
                }
            },
            listeners: {
                itemcontextmenu : function (record, item, index, e, eOpts) {
                    var record = Ext.getCmp(this.id).getSelectionModel().getSelection()[0];
                    eOpts.stopEvent();
                    var xy = eOpts.getXY();
                    if (record != undefined) {
                        if (record.data['mandatory'] == false) {
                            new Ext.menu.Menu({
                                items : (moduleConfig.menuItemCustomsAttributes) ? moduleConfig.menuItemCustomsAttributes : []
                            }).showAt(xy);
                        }
                    }
                }
                ,
                validateedit : function (plugin, e) {
                    var store = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttribute');
                    var exist = 0;
                    var pos = 0;
                    var str = e.value;
                    var newStr = str.replace(/^\s+/g,'').replace(/\s+$/g,'');

                    if(store.getCount() > 1) {
                        store.each(function(record) {
                            if (record.data['fieldLabel'] == newStr) {
                                exist = 1;
                                pos = this.store.indexOf(record);
                            }
                        });
                    }

                    if(exist == 1) {
                        if(e.rowIdx != pos) {
                            Ext.MessageBox.show({
                                title   : 'Error',
                                msg     : translatecompanies.resources.form.MsgErrorValueExist,
                                buttons : Ext.MessageBox.OK,
                                icon    : Ext.MessageBox.ERROR
                            });
                            return false;
                        }
                    }
                }
                ,
                edit : function (plugin, e) {
                    var str = e.value;
                    var newStr = str.replace(/^\s+/g,'').replace(/\s+$/g,'');
                    e.record.data[e.field] = newStr;
                    e.record.commit();
                }
                ,
                beforeedit : function(plugin, e) {
                    if (e.record.data['mandatory'] == true) return false;
                }
                ,
                beforeselect : function(selModel, record, index){
                    if(record.get('mandatory') == true) return false; 
                }
            },
            dockedItems : [
            {
                xtype      : 'toolbar',
                border     : false,
                items      : (moduleConfig.toolbarGridCustomsAttributes) ? moduleConfig.toolbarGridCustomsAttributes : []
            }
//            ,
//            {
//                xtype       : 'pagingtoolbar',
//                border      : false,
//                store       : (moduleConfig.storeCustomsAttributes) ? moduleConfig.storeCustomsAttributes : '',
//                dock        : 'bottom',
//                displayInfo : true,
//                displayMsg  : translate.global.displayMsg,
//                emptyMsg    : translate.global.emptyMsg
//            }
            ]
        }]
    }
    ,
    /**
    ****************************************************************
    * GridPanel 'Tipo de Dispositivos' incrustado en el formulario
    * NOTA: Las propiedades definidas con el objeto
    * moduleConfig deben estar definidas por encima de este
    * array moduleConfig.itemsFormCreateResources
    ****************************************************************
    **/
    {
        xtype       : 'fieldset',
        title       : translatecompanies.resources.form.fieldSetDevicesDefinitions,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'gridpanel',
            id          : 'DevicesDefinitionsGrid',
            border      : false,
            columns     : (moduleConfig.columnsDevicesDefinitions) ? moduleConfig.columnsDevicesDefinitions : [{text : 'No components created in the toolbar', width : '100%'}],
            store       : (moduleConfig.storeDevicesDefinitions) ? moduleConfig.storeDevicesDefinitions : '',
            loadMask    : true,
            height      : '100%',
            minHeight   : '100%',
            multiSelect : true,
            selType     : 'checkboxmodel',
            selModel    : {
                checkOnly      : false,
                injectCheckbox : 0,
                onHeaderClick : function (headerCt, header, e) {
                    var store = Ext.data.StoreManager.lookup(controller+'.ListResourcesDeviceType');
                    var a=0;
                    if (header.isCheckerHd) {
                        e.stopEvent();
                        var isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
                        this.preventFocus = true;
                        if (isChecked) {
                            this.deselectAll(true);
                        } else {
                            store.each(function(record) {console.log(record);
                                if (record.data['mandatory'] == false) {
                                    Ext.getCmp('DevicesDefinitionsGrid').getSelectionModel().select(a, true, false);
                                }
                                a++;
                            });
                            this.toggleUiHeader(true);
                        }
                    }
                }
            },
            viewConfig  : {
                forceFit            : true,
                enableTextSelection : true,
                markDirty           : false,
                getRowClass : function(record, rowIndex, rowParams, store) {
                    return record.get('mandatory') ? 'x-item-disabled' : '';
                }
            },
            listeners: {
                itemcontextmenu : function (record, item, index, e, eOpts) {
                    var record = Ext.getCmp(this.id).getSelectionModel().getSelection()[0];
                    eOpts.stopEvent();
                    var xy = eOpts.getXY();
                    if (record != undefined) {
                        if (record.data['mandatory'] == false) {
                            new Ext.menu.Menu({
                                items : (moduleConfig.menuItemDevicesDefinitions) ? moduleConfig.menuItemDevicesDefinitions : []
                            }).showAt(xy);
                        }
                    }
                }
                ,
                beforeselect : function(selModel, record, index){console.log(record);
                    if(record.get('mandatory') == true) return false; 
                }
            },
            dockedItems : [
            {
                xtype      : 'toolbar',
                border     : false,
                items      : (moduleConfig.toolbarGridDevicesDefinitions) ? moduleConfig.toolbarGridDevicesDefinitions : []
            }
//            ,
//            {
//                xtype       : 'pagingtoolbar',
//                border      : false,
//                store       : (moduleConfig.storeDevicesDefinitions) ? moduleConfig.storeDevicesDefinitions : '',
//                dock        : 'bottom',
//                displayInfo : true,
//                displayMsg  : translate.global.displayMsg,
//                emptyMsg    : translate.global.emptyMsg
//            }
            ]
        }]
    }
    ,
    /**
    ****************************************************************
    * GridPanel 'Recursos Relacionados' incrustado en el formulario
    * NOTA: Las propiedades definidas con el objeto
    * moduleConfig deben estar definidas por encima de este
    * array moduleConfig.itemsFormCreateResources
    ****************************************************************
    **/
    {
        xtype       : 'fieldset',
        title       : translatecompanies.resources.form.fieldSetRelatedResources,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'gridpanel',
            id          : 'RelatedResourcesGrid',
            border      : false,
            columns     : (moduleConfig.columnsRelatedResources) ? moduleConfig.columnsRelatedResources : [{text : 'No components created in the toolbar', width : '100%'}],
            store       : (moduleConfig.storeRelatedResources) ? moduleConfig.storeRelatedResources : '',
            loadMask    : true,
            height      : '100%',
            minHeight   : '100%',
            multiSelect : true,
            selType     : 'checkboxmodel',
            selModel    : {
                checkOnly      : false,
                injectCheckbox : 0
            },
            viewConfig  : {
                forceFit            : true,
                enableTextSelection : true
            },
            listeners: {
                itemcontextmenu : function (record, item, index, e, eOpts) {
                    eOpts.stopEvent();
                    var xy = eOpts.getXY();
                    new Ext.menu.Menu({
                        items : (moduleConfig.menuItemRelatedResources) ? moduleConfig.menuItemRelatedResources : []
                    }).showAt(xy);
                }
            },
            dockedItems : [
            {
                xtype      : 'toolbar',
                border     : false,
                items      : (moduleConfig.toolbarGridRelatedResources) ? moduleConfig.toolbarGridRelatedResources : []
            }
//            ,
//            {
//                xtype       : 'pagingtoolbar',
//                border      : false,
//                store       : (moduleConfig.storeRelatedResources) ? moduleConfig.storeRelatedResources : '',
//                dock        : 'bottom',
//                displayInfo : true,
//                displayMsg  : translate.global.displayMsg,
//                emptyMsg    : translate.global.emptyMsg
//            }
            ]
        }]
    }
];
//Bottom Buttons de la Ventana Crear Recursos
moduleConfig.bottomButtonsCreateResources = [
    {
        text      : translate.global.cancel,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsCreateResourcesCancelButton',
        action    : controller + 'WindowsCreateResourcesCancelButton'
    }
    ,
    {
        text      : translate.global.save,
        iconCls   : 'ok-button',
        cls       : 'blue-cyan',
        id        : controller + 'WindowsCreateResourcesSaveButton',
        action    : controller + 'WindowsCreateResourcesSaveButton'
    }
];

//-------------------------------------------------------------------------------------------
// Ventana con Formulario Embebido de Agregar/Editar Atributos @ Crear Recursos (windowForm)
//-------------------------------------------------------------------------------------------
moduleConfig.groupIdAddAttributesCreateResources = controller + 'AddAttributesCreateResources';
moduleConfig.titleWindowAddAttributesCreateResources = translatecompanies.resources.attributes.form.titleWindow;
moduleConfig.widthWindowAddAttributesCreateResources = '35%';
moduleConfig.heightWindowAddAttributesCreateResources = '40%';
moduleConfig.resizableWindowAddAttributesCreateResources = false;
moduleConfig.toolbarAddAttributesCreateResources = [];
moduleConfig.itemsFormAddAttributesCreateResources = [
    {
        xtype : 'hiddenfield',
        id    : controller + 'AddAttributesCreateResourcesFormId',
        name  : '_id',
        value : ''
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translatecompanies.resources.attributes.form.fieldSetAttribute,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'container',
            layout      : 'hbox',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'combo',
                    fieldLabel        : translatecompanies.resources.attributes.form.attributeTemplate,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'AddAttributesCreateResourcesFormAttributeTemplate',
                    name              : 'template',
                    loadingText       : 'loading...',
                    emptyText         : translatecompanies.resources.attributes.form.attributeTemplateEmptyText,
                    typeAhead         : false,
                    forceSelection    : true,
                    allowBlank        : false,
                    flex              : 4,
                    displayField      : 'name',
                    valueField        : '_id',
                    minChars          : 0,
                    margin            : '10 10 10 10',
                    pageSize          : 10,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    editable          : false,
                    store             : controller+'.ListResourcesComboTelematicAttribute'
                }
            ]
        }
        ]
    }
];
moduleConfig.bottomButtonsAddAttributesCreateResources = [
    {
        text      : translate.global.cancel,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsAddAttributesCreateResourcesCancelButton',
        action    : controller + 'WindowsAddAttributesCreateResourcesCancelButton'
    },
    {
        text      : translate.global.add,
        iconCls   : 'ok-button',
        id        : controller + 'WindowsAddAttributesCreateResourcesSaveButton',
        action    : controller + 'WindowsAddAttributesCreateResourcesSaveButton',
        scope     : this,
        formBind  : true
    } 
];

//-------------------------------------------------------------------------------------------
// Ventana con Formulario Embebido de Agregar/Editar Dispositivos @ Crear Recursos (windowForm)
//-------------------------------------------------------------------------------------------
moduleConfig.groupIdAddDevicesCreateResources = controller + 'AddDevicesCreateResources';
moduleConfig.titleWindowAddDevicesCreateResources = translatecompanies.resources.devices.form.titleWindow;
moduleConfig.widthWindowAddDevicesCreateResources = '30%';
moduleConfig.heightWindowAddDevicesCreateResources = '35%';
moduleConfig.resizableWindowAddDevicesCreateResources = false;
moduleConfig.toolbarAddDevicesCreateResources = [];
moduleConfig.itemsFormAddDevicesCreateResources = [
    {
        xtype : 'hiddenfield',
        id    : controller + 'AddDevicesCreateResourcesFormId',
        name  : '_id',
        value : ''
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translatecompanies.resources.devices.form.fieldSetDevice,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'container',
            layout      : 'hbox',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'combo',
                    fieldLabel        : translatecompanies.resources.devices.form.deviceType,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'AddDevicesCreateResourcesFormApplication',
                    name              : 'name',
                    loadingText       : 'loading...',
                    emptyText         : translatecompanies.resources.devices.form.deviceTypeEmptyText,
                    typeAhead         : false,
                    forceSelection    : true,
                    allowBlank        : false,
                    flex              : 4,
                    displayField      : 'name',
                    valueField        : '_id',
                    minChars          : 0,
                    margin            : '10 10 10 10',
                    pageSize          : 10,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    editable          : false,
                    store             : controller+'.ListResourcesComboDeviceType'
                }
            ]
        }
        ]
    }
];
moduleConfig.bottomButtonsAddDevicesCreateResources = [
    {
        text      : translate.global.cancel,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsAddDevicesCreateResourcesCancelButton',
        action    : controller + 'WindowsAddDevicesCreateResourcesCancelButton'
    },
    {
        text      : translate.global.add,
        iconCls   : 'ok-button',
        cls       : 'blue-cyan',
        id        : controller + 'WindowsAddDevicesCreateResourcesSaveButton',
        action    : controller + 'WindowsAddDevicesCreateResourcesSaveButton',
        scope     : this,
        formBind  : true
    } 
];


//-------------------------------------------------------------------------------------------------------
// Ventana con Formulario Embebido de Agregar/Editar Recursos relacionados @ Crear Recursos (windowForm)
//-------------------------------------------------------------------------------------------------------
moduleConfig.groupIdAddRelatedResourcesCreateResources = controller + 'AddRelatedResourcesCreateResources';
moduleConfig.titleWindowAddRelatedResourcesCreateResources = translatecompanies.resources.relatedResources.form.titleWindow;
moduleConfig.widthWindowAddRelatedResourcesCreateResources = '40%';
moduleConfig.heightWindowAddRelatedResourcesCreateResources = '60%';
moduleConfig.resizableWindowAddRelatedResourcesCreateResources = false;
moduleConfig.toolbarAddRelatedResourcesCreateResources = [];
moduleConfig.itemsFormAddRelatedResourcesCreateResources = [
    {
        xtype : 'hiddenfield',
        id    : controller + 'AddRelatedResourcesCreateResourcesFormId',
        name  : '_id',
        value : ''
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translatecompanies.resources.relatedResources.form.fieldSetRelatedResource,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'container',
            layout      : 'hbox',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'combo',
                    fieldLabel        : translatecompanies.resources.relatedResources.form.Resource,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'AddRelatedResourcesCreateResourcesFormResource',
                    name              : 'name',
                    loadingText       : 'loading...',
                    emptyText         : translatecompanies.resources.relatedResources.form.ResourceEmptyText,
                    typeAhead         : false,
                    forceSelection    : true,
                    allowBlank        : false,
                    flex              : 4,
                    displayField      : 'name',
                    valueField        : '_id',
                    minChars          : 0,
                    margin            : '10 10 10 10',
                    pageSize          : 10,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    editable          : false,
                    disabled          : true,
                    store             : controller+'.ListResourcesComboRelatedResource',
                    listeners         : {
                        afterRender : function(combo) {
                            var record = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection()[0];
                            var id_company = record.get(moduleConfig.grid.idField);
                            var store = combo.getStore();
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
                                            "field"      : "isSystem",
                                            "comparison" : "eq",
                                            "value"      : false
                                        }
                                    ]
                                })
                            };
                        }
                    }
                }
            ]
        }
        /*,
        {
            xtype       : 'container',
            layout      : 'hbox',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'combo',
                    fieldLabel        : translatecompanies.resources.relatedResources.form.Template,
                    id                : controller + 'AddRelatedResourcesCreateResourcesFormTemplate',
                    name              : 'template',
                    loadingText       : 'loading...',
                    emptyText         : translatecompanies.resources.relatedResources.form.TemplateEmptyText,
                    typeAhead         : false,
                    forceSelection    : true,
                    allowBlank        : true,
                    flex              : 4,
                    displayField      : 'name',
                    valueField        : '_id',
                    minChars          : 0,
                    margin            : '10 10 10 10',
                    pageSize          : 10,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    editable          : false,
                    store             : controller+'.ListResourcesComboTelematicAttribute'
                }
            ]
        }*/
        ]
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translatecompanies.resources.relatedResources.form.fieldSetRelatedAttributes,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'gridpanel',
            id          : 'CustomsAttributesRelatedResourcesGrid',
            border      : false,
            columns     : 
            [
                {
                    text      : translatecompanies.resources.form.listIdAttribute,
                    dataIndex : '_id',
                    flex      : 1,
                    align     : 'left',
                    hidden    : true,
                    sortable  : true
                }
                ,
                {
                    text      : translatecompanies.resources.form.listTemplateAttribute,
                    dataIndex : 'name',
                    flex      : 1,
                    align     : 'left',
                    hidden    : true,
                    sortable  : true
                }
                ,
                {
                    text      : translatecompanies.resources.form.listNameAttribute,
                    dataIndex : 'fieldLabel',
                    flex      : 1,
                    align     : 'left',
                    hidden    : false,
                    sortable  : true,
                    editor : {
                        xtype      : 'textfield',
                        allowBlank : false
                    }
                }
                ,
                {
                    text      : translatecompanies.resources.form.listAttributeType,
                    dataIndex : 'xtype',
                    flex      : 1,
                    align     : 'left',
                    hidden    : false,
                    sortable  : true,
                    editor    : new Ext.form.field.ComboBox({
                        typeAhead     : true,
                        triggerAction : 'all',
                        editable      : false,
                        store         : [
                            ['datefield','datefield'],
                            ['textfield','textfield'],
                            ['timefield','timefield'],
                            ['numberfield','numberfield']
                        ]
                    })
                }
                , 
                {
                    xtype         : 'checkcolumn',
                    text          : 'AllowBlank',
                    dataIndex     : 'allowBlank',
                    hidden        : true,
                    sortable      : false,
                    flex          : 1
                }
                , 
                {
                    xtype         : 'checkcolumn',
                    text          : 'Mandatory',
                    dataIndex     : 'mandatory',
                    hidden        : true,
                    sortable      : false,
                    flex          : 1
                }
                , 
                {
                    xtype         : 'checkcolumn',
                    text          : translatecompanies.resources.form.listRequiredAttribute,
                    dataIndex     : 'renderAllowBlank',
                    hidden        : false,
                    sortable      : true,
                    flex          : 1,
                    listeners : {
                        beforecheckchange : function(checkcolumn, rowIndex, checked, eOpts) {
                            var record = Ext.getCmp('CustomsAttributesRelatedResourcesGrid').getView().getRecord(rowIndex);
                            if (record.get('mandatory') == false) {
                                record.beginEdit();
                                if(checked == true) {
                                    record.set('allowBlank',false);
                                } else {
                                    record.set('allowBlank',true);
                                }
                                record.endEdit();
                                return true;
                            }
                            return false;
                        }
                    }
                }
            ],
            store       : controller+'.ListResourcesTelematicAttributeRelatedResources',
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit : 1
                })
            ],
            loadMask    : true,
            height      : '100%',
            minHeight   : '100%',
            multiSelect : true,
            selType     : 'checkboxmodel',
            selModel    : {
                checkOnly      : false,
                injectCheckbox : 0,
                onHeaderClick : function (headerCt, header, e) {
                    var store = Ext.data.StoreManager.lookup(controller+'.ListResourcesTelematicAttributeRelatedResources');
                    var a=0;
                    if (header.isCheckerHd) {
                        e.stopEvent();
                        var isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
                        this.preventFocus = true;
                        if (isChecked) {
                            this.deselectAll(true);
                        } else {
                            store.each(function(record) {
                                if (record.data['mandatory'] == false) {
                                    Ext.getCmp('CustomsAttributesRelatedResourcesGrid').getSelectionModel().select(a, true, false);
                                }
                                a++;
                            });
                            this.toggleUiHeader(true);
                        }
                    }
                }
            },
            viewConfig  : {
                forceFit            : true,
                enableTextSelection : true,
                markDirty           : false,
                getRowClass : function(record, rowIndex, rowParams, store) {
                    return record.get('mandatory') ? 'x-item-disabled' : '';
                }
            },
            listeners: {
                itemcontextmenu : function (record, item, index, e, eOpts) {
                    var record = Ext.getCmp(this.id).getSelectionModel().getSelection()[0];
                    eOpts.stopEvent();
                    var xy = eOpts.getXY();
                    if (record != undefined) {
                        if (record.data['mandatory'] == false) {
                            new Ext.menu.Menu({
                                items : [
                                    {
                                        text    : translate.global.delete,
                                        action  : controller + 'ContextualDeleteRelatedResourcesAddAttributesCreateResources',
                                        submenu : false,
                                        iconCls : 'delete-menu'
                                    }
                                ]
                            }).showAt(xy);
                        }
                    }
                }
                ,
                validateedit : function (plugin, e) {
                    var store = Ext.StoreMgr.lookup(controller + '.ListResourcesTelematicAttributeRelatedResources');
                    var exist = 0;
                    var pos = 0;
                    var str = e.value;
                    var newStr = str.replace(/^\s+/g,'').replace(/\s+$/g,'');

                    if(store.getCount() > 1) {
                        store.each(function(record) {
                            if (record.data['fieldLabel'] == newStr) {
                                exist = 1;
                                pos = this.store.indexOf(record);
                            }
                        });
                    }

                    if(exist == 1) {
                        if(e.rowIdx != pos) {
                            Ext.MessageBox.show({
                                title   : 'Error',
                                msg     : translatecompanies.resources.form.MsgErrorValueExist,
                                buttons : Ext.MessageBox.OK,
                                icon    : Ext.MessageBox.ERROR
                            });
                            return false;
                        }
                    }
                }
                ,
                edit : function (plugin, e) {
                    var str = e.value;
                    var newStr = str.replace(/^\s+/g,'').replace(/\s+$/g,'');
                    e.record.data[e.field] = newStr;
                    e.record.commit();
                }
                ,
                beforeedit : function(plugin,e) {
                    if (e.record.data['mandatory'] == true) return false;
                }
                ,
                beforeselect : function(selModel, record, index){
                    if(record.get('mandatory') == true) return false; 
                }
            },
            dockedItems : [{
                xtype      : 'toolbar',
                border     : false,
                items      : 
                [
                    '->',
                    {
                        text      : translatecompanies.resources.relatedResources.form.addAttributeButton,
                        id        : controller + 'RelatedResourcesAddAttributesCreateResources',
                        action    : controller + 'RelatedResourcesAddAttributesCreateResources',
                        iconCls   : 'add-button',
                        cls       : 'x-btn-default-small'
                    }
                    ,
                    {
                        text      : translatecompanies.resources.relatedResources.form.deleteAttributeButton,
                        id        : controller + 'RelatedResourcesRemoveAttributesCreateResources',
                        action    : controller + 'RelatedResourcesRemoveAttributesCreateResources',
                        iconCls   : 'remove-button',
                        cls       : 'x-btn-default-small'
                    }
                ]
            }
//            ,
//            {
//                xtype       : 'pagingtoolbar',
//                border      : false,
//                store       : '',
//                dock        : 'bottom',
//                displayInfo : true,
//                displayMsg  : translate.global.displayMsg,
//                emptyMsg    : translate.global.emptyMsg
//            }
            ]
        }]
    }
];
moduleConfig.bottomButtonsAddRelatedResourcesCreateResources = [
    {
        text      : translate.global.cancel,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsAddRelatedResourcesCreateResourcesCancelButton',
        action    : controller + 'WindowsAddRelatedResourcesCreateResourcesCancelButton'
    },
    {
        text      : translate.global.add,
        iconCls   : 'ok-button',
        cls       : 'blue-cyan',
        id        : controller + 'WindowsAddRelatedResourcesCreateResourcesSaveButton',
        action    : controller + 'WindowsAddRelatedResourcesCreateResourcesSaveButton',
        scope     : this,
        formBind  : true
    } 
];


//-----------------------------------------------------------------------
// Ventana con Grid Embebido de Módulo de Dispositivos (windowGrid)
//-----------------------------------------------------------------------
moduleConfig.groupIdDevices = controller + 'Devices';
moduleConfig.titleWindowDevices = translatecompanies.devices.titleWindow;
moduleConfig.widthWindowDevices = '85%';
moduleConfig.heightWindowDevices = '80%';
moduleConfig.resizableWindowDevices = false;
//Toolbar Recursos (search textfield and buttons)
moduleConfig.toolbarDevices = [
    {
        xtype           : 'textfield',
        id              : 'searchKeywordDevices',
        emptyText       : translatecompanies.devices.emptyText,
        flex            : 1,
        enableKeyEvents : true,
        columnWidth     : 1
    }
    ,
    {
        xtype          : 'button',
        iconCls        : 'cancel-button',
        tooltip        : translatecompanies.devices.tooltipButton,
        fieldName      : 'searchKeywordDevices',
        cls            : 'x-btn-default-small',
        action         : 'clearFilterDevices'   
    }
    ,
    {
        xtype          : 'combo',
        id             : 'searchKeywordDeviceType',
        emptyText      : translatecompanies.devices.deviceTypeEmptyText,
        typeAhead      : false,
        forceSelection : true,
        columnWidth    : 0.95,
        displayField   : 'name',
        valueField     : '_id',
        minChars       : 0,
        flex           : 1,
        pageSize       : 10,
        triggerAction  : 'all',
        editable       : false,
        store          : Ext.create('Ext.data.Store', {
            pageSize   : 10,
            model      : Ext.define('LoadPrincipal.model.Companies.ListComboDevicesType', {
                extend     : 'Ext.data.Model',
                fields     : [
                    {name : '_id', type: 'string'},
                    {name : 'name', type: 'string'}
                ],
                idProperty : '_id'
            }),
            autoLoad   : false,
            remoteSort : true,
            proxy      : {
                type                : 'ajax',
                useDefaultXhrHeader : false,
                method              : 'GET',
                url                 : moduleConfig.services.urlComboDevicesType,
                reader : {
                    type          : 'json',
                    root          : 'data',
                    totalProperty : 'pagination.total'
                }
            },
            sorters    : [{
                property  : 'name',
                direction : 'DESC'
            }]
        }),
        queryMode      : 'remote'
    },
    {
        xtype          : 'button',
        iconCls        : 'cancel-button',
        tooltip        : translatecompanies.devices.deviceTypeTooltipButton,
        fieldName      : 'searchKeywordDeviceType',
        cls            : 'x-btn-default-small',
        action         : 'clearFilterDeviceType'
    }
    ,
    {
        xtype          : 'combo',
        id             : 'searchKeywordStatus',
        emptyText      : translatecompanies.devices.statusEmptyText,
        typeAhead      : false,
        forceSelection : true,
        columnWidth    : 0.95,
        displayField   : 'name',
        valueField     : 'status',
        minChars       : 0,
        flex           : 1,
        pageSize       : 10,
        triggerAction  : 'all',
        editable       : false,
        store          : Ext.create('Ext.data.Store', {
            fields         : ['status', 'name'],
            data           : [
                {"status" : "active", "name" : translate.global.statusActive},
                {"status" : "inactive", "name" : translate.global.statusInactive}
            ]
        }),
        queryMode      : 'local'
    }
    ,
    {
        xtype          : 'button',
        iconCls        : 'cancel-button',
        tooltip        : translatecompanies.devices.statusTooltipButton,
        fieldName      : 'searchKeywordStatus',
        cls            : 'x-btn-default-small',
        action         : 'clearFilterStatus'
    }
    ,
    '->'
    ,
    {
        text    : translate.global.create,
        id      : controller + 'CreateDevices',
        action  : controller + 'CreateDevices',
        iconCls : 'add-button',
        cls     : 'blue-cyan',
        submenu : false,
        items   : []
    }
    ,
    {
        text    : translate.global.delete,
        id      : controller + 'DeleteDevices',
        action  : controller + 'DeleteDevices',
        iconCls : 'remove-button',
        submenu : false,
        items   : []
    }
    ,
    {
        text    : translate.global.changeStatus,
        id      : controller + 'StatusDevices',
        action  : controller + 'StatusDevices',
        menu    : {
            items:[
            {
                text    : translate.global.active,
                id      : controller + 'ActiveDevices',
                action  : controller + 'ActiveDevices',
                iconCls : 'unlock-menu',
                submenu : false
            },
            {
                text    : translate.global.lock,
                id      : controller + 'LockDevices',
                action  : controller + 'LockDevices',
                iconCls : 'lock-menu',
                submenu : false
            }
            ]
        }
    }
];
moduleConfig.storeDevices = controller + '.ListDevices';
//Columnas del GridPanel Recursos
moduleConfig.columnsDevices = [
    {
        text      : translatecompanies.devices.list.id,
        dataIndex : '_id',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.devices.list.id_deviceDefinition,
        dataIndex : 'id_deviceDefinition',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.devices.list.serial,
        dataIndex : 'serial',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.devices.list.type,
        dataIndex : 'name',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.devices.list.status,
        dataIndex : 'status',
        flex      : 1,
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translatecompanies.devices.list.attributes,
        dataIndex : 'Attributes',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true,
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            var k = Object.keys(value);
            var longitud = k.length;
            var n = 1;
            var result = '';
            if (longitud > 0){
                for (var i in value) {
                    if(n == longitud){
                        result += i + " = " + value[i] + ".";
                    }
                    else{
                        result += i + " = " + value[i] + ", ";
                    }
                    n++;
                }
            }
            return result;
        }
    }
    ,
    {
        text      : 'Object '+translatecompanies.devices.list.attributes,
        dataIndex : 'objectAttributes',
        flex      : 1,
        align     : 'left',
        hidden    : true,
        sortable  : true,
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            return value;
        }
    }
];
moduleConfig.pluginsDevices = [{
    ptype      : 'rowexpander',
    rowBodyTpl : new Ext.XTemplate(
    '<p><center><h4 class="header-rowexpander"><b>'+translatecompanies.devices.list.attributes+'</b></h4></center><hr class="line-rowexpander"> {Attributes:this.formatAttributes}</p>',
    {
        formatAttributes: function(value, metaData, record, rowIndex, colIndex, store, view) {
            var k = Object.keys(value);
            var longitud = k.length;
            var output = '';
            if (longitud > 0){
                for (var i in value) {
                    output += "<span class='list-rowexpander'><b>"+(i)+": "+value[i]+".</b></span><br>";
                }
            } else output = "<span class='no-records-rowexpander'><b>"+translate.global.emptyMsg+".</b></span><br>";
            return output;
        }
    })
}];
//MenuItem en GridPanel Recursos
moduleConfig.menuItemDevices = [
    {
        text    : translate.global.edit,
        action  : controller + 'ContextualEditDevices',
        submenu : false,
        iconCls : 'edit-menu'
    }
    ,
    {
        text    : translate.global.delete,
        action  : controller + 'ContextualDeleteDevices',
        submenu : false,
        iconCls : 'delete-menu'
    }
    ,
    {
        text    : translate.global.changeStatus,
        action  : controller + 'ContextualStatusDevices',
        menu    : {
            items:[
            {
                text    : translate.global.active,
                action  : controller + 'ContextualActivateDevices',
                iconCls : 'unlock-menu',
                submenu : false
            },
            {
                text    : translate.global.lock,
                action  : controller + 'ContextualLockDevices',
                iconCls : 'lock-menu',
                submenu : false
            }
            ]
        }
    }
];
//Bottom Buttons del GridPanel Recursos
moduleConfig.bottomButtonsDevices = [
    {
        text      : translate.global.closeWindow,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsCloseDevices',
        action    : controller + 'WindowsCloseDevices'
    }
];
moduleConfig.toolbarButtonsDevices = [
    {
        text: translate.global.export,
        enableToggle: true,
        defaultAlign: 'right',
        action: 'exportXls',
        cls : 'x-btn-default-small',
        style:{
            background: '#1fbad6',
            border: '1px solid #fff',  
        },
    }
];

//---------------------------------------------------------------------------------
// Ventana con Formulario y Grid Embebido de Crear/Editar Dispositivos (windowForm)
//---------------------------------------------------------------------------------
moduleConfig.groupIdCreateDevices = controller + 'CreateDevices';
moduleConfig.titleWindowCreateDevices = translatecompanies.devices.form.titleWindow;
moduleConfig.widthWindowCreateDevices = '30%';
moduleConfig.heightWindowCreateDevices = '60%';
moduleConfig.resizableWindowCreateDevices = false;
moduleConfig.toolbarCreateDevices = [];
//Items del Formulario Crear Dispositivos
moduleConfig.itemsFormCreateDevices = [
    {
        xtype : 'hiddenfield',
        id    : controller + 'CreateDevicesFormId',
        name  : '_id',
        value : ''
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translatecompanies.devices.form.fieldSetDevice,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'combo',
                    fieldLabel        : translatecompanies.devices.form.deviceType,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'CreateDevicesFormDeviceType',
                    name              : 'deviceType',
                    loadingText       : 'loading...',
                    emptyText         : translatecompanies.devices.form.deviceTypeEmptyText,
                    typeAhead         : false,
                    forceSelection    : true,
                    allowBlank        : false,
                    flex              : 4,
                    displayField      : 'name',
                    valueField        : '_id',
                    minChars          : 0,
                    pageSize          : 10,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    editable          : false,
                    disabled          : true,
                    store             : controller+'.ListResourcesComboDeviceType'
                }
            ]
        }
        ,
        {
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'textfield',
                    fieldLabel        : translatecompanies.devices.form.serial ,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'CreateDevicesFormSerial',
                    name              : 'serial',
                    emptyText         : translatecompanies.devices.form.serialEmptyText,
                    allowBlank        : false,
                    flex              : 4,
                    labelWidth        : '100%',
                    vtype             : 'alphanumeric',
                    minLengthText     : translatecompanies.devices.form.serialNameError
                }
            ]
        }
        ]
    }
];
//Bottom Buttons de la Ventana Crear Dispositivos
moduleConfig.bottomButtonsCreateDevices = [
    {
        text      : translate.global.cancel,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsCreateDevicesCancelButton',
        action    : controller + 'WindowsCreateDevicesCancelButton'
    }
    ,
    {
        text      : translate.global.save,
        iconCls   : 'ok-button',
        cls       : 'blue-cyan',
        id        : controller + 'WindowsCreateDevicesSaveButton',
        action    : controller + 'WindowsCreateDevicesSaveButton'
    }
];