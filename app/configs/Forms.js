var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'TabPanelSingle';
moduleConfig.listPageSize = 10;
moduleConfig.exportFilter = '';


var storageIdCompany = window.localStorage.getItem('id_company');
moduleConfig.services = new Object();
moduleConfig.services.url = strURL +'/forms';
moduleConfig.services.urlListSection = strURL +'/sections';
moduleConfig.services.urlExport = strURL + '/forms/excel';

//--------------------------------------------------------------------------
// Ventana con Formulario Embebido de Crear/Editar Formularios (windowForm)
//--------------------------------------------------------------------------
moduleConfig.groupIdForms = controller + 'Module';
moduleConfig.titleWindowForms = translate.global.create+' '+translateforms.moduleTitle;
moduleConfig.widthWindowForms = '40%';
moduleConfig.heightWindowForms = '42%';
moduleConfig.resizableWindowForms = false;
moduleConfig.toolbarForms = [];
moduleConfig.itemsFormForms = [
	{
		xtype : 'hiddenfield',
		id    : controller + 'FormId',
		name  : '_id',
		value : ''
	}
	,
	{
		xtype       : 'fieldset',
		title       : translateforms.form.fieldSetForm,
		defaultType : 'textfield',
		layout      : 'anchor',
		defaults    : {
			anchor  : '100%'
		},
		items: [
			{
				xtype             : 'textfield',
				fieldLabel        : translateforms.form.name,
				afterLabelTextTpl : AppGlobals.required,
				id                : controller + 'FormName',
				name              : 'name',
				emptyText         : translateforms.form.nameEmptyText,
				allowBlank        : false,
				flex              : 1,
				margin            : '0 10 0 10',
				vtype             : 'alphanumeric',
				minLengthText     : translateforms.form.nameNameError
			}
			,
			{
				xtype             : 'textareafield',
				fieldLabel        : translateforms.form.description,
				afterLabelTextTpl : AppGlobals.required,
				grow              : true,
				id                : controller + 'FormDescription',
				name              : 'description',
				emptyText         : translateforms.form.descriptionEmptyText,
				allowBlank        : false,
				flex              : 3,
				margin            : '0 10 10 10',
				minLengthText     : translateforms.form.descriptionNameError
			}
		]
	}
];
moduleConfig.bottomButtonsForms = [
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

//--------------------------------------------------------------------------
// Ventana con Formulario Embebido de Crear/Editar Secciones (windowForm)
//--------------------------------------------------------------------------
moduleConfig.groupIdSection = controller + 'ModuleSection';
moduleConfig.titleWindowSection = translate.global.create+' '+translateforms.section.moduleTitle;
moduleConfig.widthWindowSection = '30%';
moduleConfig.heightWindowSection = '30%';
moduleConfig.resizableWindowSection = false;
moduleConfig.toolbarSection = [];
moduleConfig.itemsFormSection = [
	{
		xtype : 'hiddenfield',
		id    : controller + 'FormIdSection',
		name  : '_id',
		value : ''
	}
	,
	{
		xtype       : 'fieldset',
		title       : translateforms.formSection.fieldSetSection,
		defaultType : 'textfield',
		layout      : 'anchor',
		defaults    : {
			anchor  : '100%'
		},
		items: [
			{
				xtype             : 'textfield',
				fieldLabel        : translateforms.formSection.name,
				afterLabelTextTpl : AppGlobals.required,
				id                : controller + 'FormNameSection',
				name              : 'name',
				emptyText         : translateforms.formSection.nameEmptyText,
				allowBlank        : false,
				flex              : 1,
				margin            : '0 10 10 10',
				vtype             : 'alphanumeric',
				minLengthText     : translateforms.formSection.nameNameError
			}
		]
	}
];
moduleConfig.bottomButtonsSection = [
    {
        text      : translate.global.cancel,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsCancelButtonSection',
        action    : controller + 'WindowsCancelButtonSection'
    },
    {
        text      : translate.global.save,
        iconCls   : 'ok-button',
        cls       : 'blue-cyan',
        id        : controller + 'WindowsSaveButtonSection',
        action    : controller + 'WindowsSaveButtonSection',
        scope     : this,
        formBind  : true
    } 
];

//Array para pestañas
moduleConfig.tab = [];
//Pestaña 1
moduleConfig.tab[0] = new Object;
moduleConfig.tab[0].id = 'tabForms';
moduleConfig.tab[0].name = translateforms.tabTitle0;
moduleConfig.tab[0].disabled = false;
moduleConfig.tab[0].items = [
    {
        region      : 'center',
        width       : '100%',
        xtype       : 'gridpanel',
        id          : controller+'Grid',
        title       : '',
        store       : controller+'.List',
        loadMask    : true,
        height      : '100%',
        multiSelect : true,
        selType     : 'checkboxmodel',
        selModel    : {
            checkOnly      : false,
            injectCheckbox : 0
        },
        margins     : '0 5 0 5',
        viewConfig  : {
            forceFit            : true,
            enableTextSelection : true
        },
        listeners   : {
			selectionchange: function(sm, selections) {
				var grid = Ext.getCmp(controller+'Grid');
				var tabPanel = grid.up('tabpanel');
				var tabBuild = tabPanel.items.items[1];
				tabBuild.disable();
				new Formbuilder({
				    selector      : '.fb-main',
				    sections      : 1,
				    bootstrapData : []
				});
			}
			,
			itemcontextmenu : function (record, item, index, e, eOpts) {
				eOpts.stopEvent();
				var id = item.data['_id'];
				var xy = eOpts.getXY();
				new Ext.menu.Menu({
					items : [
						{
							text    : translateforms.form.manageSections,
							action  : controller + 'ContextualManageSections',
							iconCls : 'codensa-menu',
							handler        : function() {
								new Formbuilder({
								    selector      : '.fb-main',
								    sections      : 1,
								    bootstrapData : []
								});
								var store = Ext.data.StoreManager.lookup(controller + '.ListSection');
								var grid = Ext.getCmp(controller+'Grid');
								var tabPanel = grid.up('tabpanel');
								var tabBuild = tabPanel.items.items[1];
								tabBuild.enable();
								tabPanel.setActiveTab(1);
								store.clearData();
								store.proxy.url = strURL +'/sections';
								store.proxy.extraParams = {
								    filters : Ext.JSON.encode({
								        "and":[{
								            "field"      : "id_form",
								            "comparison" : "eq",
								            "value"      : id
								        }]
								    })
								};
								store.load();
							}
						}
						,
						{
							text    : translate.global.edit,
							action  : controller + 'ContextualEdit',
							iconCls : 'edit-menu'
						}
						,
						{
							text    : translate.global.delete,
							action  : controller + 'ContextualDelete',
							iconCls : 'delete-menu'
						}
						,
						{
							text    : translate.global.changeStatus,
							menu    : [
								{
								    text    : translate.global.active,
								    action  : controller + 'ContextualActive',
								    iconCls : 'unlock-menu'
								}
								,
								{
								    text    : translate.global.inactive,
								    action  : controller + 'ContextualInactive',
								    iconCls : 'lock-menu'
								}
							]
						}
					]
				}).showAt(xy);
			}
		},
        columns     : [
			{
				text      : 'ID',
				dataIndex : '_id',
				flex      : 1,
				align     : 'left',
				hidden    : true,
				sortable  : true
			}
			,
			{
				text      : translateforms.grid.columnName,
				dataIndex : 'name',
				flex      : 1,
				align     : 'left',
				hidden    : false,
				sortable  : true
			}
			,
			{
				text      : translateforms.grid.columnDescription,
				dataIndex : 'description',
				flex      : 1,
				align     : 'left',
				hidden    : false,
				sortable  : true
			}
			,
			{
				text      : translateforms.grid.columnStatus,
				dataIndex : 'status',
				flex      : 1,
				align     : 'left',
				hidden    : false,
				sortable  : true
			}
		],
        dockedItems : [
            {
                xtype      : 'toolbar',
                border     : false,
                items      : [
					{
						xtype           : 'textfield',
						id              : controller + 'SearchForm',
						name            : controller + 'SearchForm',
						width           : 350,
						enableKeyEvents : true,
						emptyText       : translateforms.grid.emptyText
					}
					,
					{
						xtype          : 'button',
						id             : controller + 'ClearSearchForm',
						iconCls        : 'cancel-button',
						tooltip        : translateforms.grid.tooltipButton,
						fieldName      : controller + 'SearchForm',
						cls            : 'x-btn-default-small'
					}
					,
					{
					    xtype          : 'combo',
					    id             : controller + 'SearchStatusForm',
					    emptyText      : translateforms.grid.statusEmptyText,
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
					    queryMode      : 'local',
					    store          : Ext.create('Ext.data.Store', {
					        fields         : ['status', 'name'],
					        data           : [
					            {"status" : "active", "name" : translate.global.statusActive},
					            {"status" : "inactive", "name" : translate.global.statusInactive}
					        ]
					    })
					}
					,
					{
					    xtype          : 'button',
					    id             : controller + 'ClearSearchStatusForm',
					    iconCls        : 'cancel-button',
					    tooltip        : translateforms.grid.statusTooltipButton,
					    fieldName      : controller + 'SearchStatusForm',
					    cls            : 'x-btn-default-small'
					}
					,
					'->'
					,
					{
						text    : translate.global.create,
						id      : controller + 'Create',
						action  : controller + 'Create',
						iconCls : 'add-button',
						cls     : 'x-btn-default-small blue-cyan'
					}
					,
					{
						text    : translate.global.delete,
						id      : controller + 'Delete',
						action  : controller + 'Delete',
						iconCls : 'remove-button',
						cls     : 'x-btn-default-small'
					}
					,
					{
						text    : translate.global.changeStatus,
						cls     : 'x-btn-default-small',
						menu    : [
							{
							    text    : translate.global.active,
							    id      : controller + 'Active',
							    action  : controller + 'Active',
							    iconCls : 'unlock-menu'
							}
							,
							{
							    text    : translate.global.inactive,
							    id      : controller + 'Inactive',
							    action  : controller + 'Inactive',
							    iconCls : 'lock-menu'
							}
						]
					}
				]
            },
            {
                xtype       : 'pagingtoolbar',
                dock        : 'bottom',
                store       : controller+'.List',
                displayInfo : true,
                displayMsg  : translate.global.displayMsg,
                emptyMsg    : translate.global.emptyMsg,
                items       : [
                    {
                        text         : translate.global.export,
                        enableToggle : true,
                        defaultAlign : 'right',
                        action       : 'exportXls',
                        cls          : 'x-btn-default-small blue-cyan',
                        toggleHandler: function (btn, pressed) 
						{
							console.log('Exportando el archivo');
		
							var objStore = objController['get' + controller + 'ListStore']();
							var strURLExport =  moduleConfig.services.urlExport;

							objController.onExportFile(objStore, strURLExport);
                        }
                    }
                ]
            }
        ]

    }
];

//Pestaña 2
moduleConfig.tab[1] = new Object;
moduleConfig.tab[1].id = 'tabSections';
moduleConfig.tab[1].name = translateforms.tabTitle1;
moduleConfig.tab[1].disabled = true;
moduleConfig.tab[1].items = [
	{
	    title         : translateforms.build.section,
	    region        : 'west',
	    collapsible   : true,
	    margins       : '0 0 0 5',
	    width         : '30%',
	    xtype         : 'panel',
	    id            : controller + 'Section',
	    frame         : false,
	    autoScroll    : true,
	    height        : '100%',
	    border        : false,
	    fieldDefaults : {
	        labelAlign  : 'top',
	        collapsible : true,
	        msgTarget   : 'under'
	    },
	    items          : [
			{
				region      : 'center',
				width       : '100%',
				xtype       : 'gridpanel',
				id          : controller+'GridSection',
				title       : '',
				store       : controller+'.ListSection',
				loadMask    : true,
				height      : '100%',
				multiSelect : true,
				selType     : 'checkboxmodel',
				selModel    : {
					checkOnly      : false,
					injectCheckbox : 0
				},
				margins     : '0 5 0 5',
				viewConfig  : {
					forceFit            : true,
					enableTextSelection : true
				},
				listeners   : {
					itemcontextmenu : function (record, item, index, e, eOpts) {
						eOpts.stopEvent();
						var id = item.data['_id'];
						var xy = eOpts.getXY();
						new Ext.menu.Menu({
							items : [
								{
									text    : translate.global.edit,
									action  : controller + 'ContextualEditSection',
									iconCls : 'edit-menu'
								}
								,
								{
									text    : translate.global.delete,
									action  : controller + 'ContextualDeleteSection',
									iconCls : 'delete-menu'
								}
								,
								{
									text    : translate.global.changeStatus,
									menu    : [
										{
										    text    : translate.global.active,
										    action  : controller + 'ContextualActiveSection',
										    iconCls : 'unlock-menu'
										}
										,
										{
										    text    : translate.global.inactive,
										    action  : controller + 'ContextualInactiveSection',
										    iconCls : 'lock-menu'
										}
									]
								}
							]
						}).showAt(xy);
					}
				},
				columns     : [
					{
						text      : 'ID',
						dataIndex : '_id',
						flex      : 1,
						align     : 'left',
						hidden    : true,
						sortable  : true
					}
					,
					{
						text      : translateforms.gridSection.columnName,
						dataIndex : 'name',
						flex      : 1,
						align     : 'left',
						hidden    : false,
						sortable  : true
					}
					,
					{
						text      : 'ID Form',
						dataIndex : 'id_form',
						flex      : 1,
						align     : 'left',
						hidden    : true,
						sortable  : true
					}
					,
					{
						text      : translateforms.gridSection.columnStatus,
						dataIndex : 'status',
						flex      : 1,
						align     : 'left',
						hidden    : false,
						sortable  : true
					}
					,
					{
						text      : translateforms.gridSection.columnQuestions,
						dataIndex : 'questions',
						flex      : 1,
						align     : 'left',
						hidden    : true,
						sortable  : true
					}
				],
				dockedItems : [
					{
						xtype      : 'toolbar',
						border     : false,
						items      : [
							'->'
							,
							{
								text    : translate.global.create,
								id      : controller + 'CreateSection',
								action  : controller + 'CreateSection',
								iconCls : 'add-button',
								cls     : 'x-btn-default-small blue-cyan'
							}
							,
							{
								text    : translate.global.delete,
								id      : controller + 'DeleteSection',
								action  : controller + 'DeleteSection',
								iconCls : 'remove-button',
								cls     : 'x-btn-default-small'
							}
							,
							{
								text    : translate.global.changeStatus,
								cls     : 'x-btn-default-small',
								menu    : [
									{
										text    : translate.global.active,
										id      : controller + 'ActiveSection',
										action  : controller + 'ActiveSection',
										iconCls : 'unlock-menu'
									}
									,
									{
										text    : translate.global.inactive,
										id      : controller + 'InactiveSection',
										action  : controller + 'InactiveSection',
										iconCls : 'lock-menu'
									}
								]
							}
						]
					},
					{
						xtype       : 'pagingtoolbar',
						dock        : 'bottom',
						store       : controller+'.ListSection',
						displayInfo : true,
						displayMsg  : translate.global.displayMsg,
						emptyMsg    : translate.global.emptyMsg,
						items       : [
							{
								text         : translate.global.export,
								enableToggle : true,
								defaultAlign : 'right',
								action       : 'exportXls',
								cls          : 'x-btn-default-small blue-cyan',
								toggleHandler: function (btn, pressed) 
								{
									alert('Exportar DOS - En desarrollo.');
								}
							}
						]
					}
				]

			}
		]
	}
	,
	{
	    region      : 'center',
	    width       : '70%',
	    xtype       : 'panel',
	    autoScroll  : true,
	    id          : controller + 'BuildSection',
	    action      : controller + 'BuildSection',
	    title       : translateforms.build.panel,
	    margins     : '0 5 0 5',
	    height      : '100%',
	    html        : "<style>  * {    box-sizing: border-box;  }  body {    background-color: #444;    font-family: sans-serif;  }  .fb-main {    background-color: #fff;    border-radius: 5px;    min-height: 600px;  }  input[type=text] {    height: 28px;    margin-bottom: 3px;  }  select {    margin-bottom: 5px;    font-size: 13px; height: 28px;  }  </style><div class='fb-main'></div>",
	}
];