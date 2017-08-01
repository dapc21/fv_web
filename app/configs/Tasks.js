var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'grid';
moduleConfig.lateralPanel = 'left';
moduleConfig.listPageSize = 10;
moduleConfig.exportFilter = '';

moduleConfig.services = new Object();
moduleConfig.services.url = strURL + '/tasks';
moduleConfig.services.listTasksUrl = moduleConfig.services.url + '?relations=["resourceInstance", "registers"]';
moduleConfig.services.listRegistersUrl = strURL + '/registers?relations=["form","task","resourceInstance"]';
moduleConfig.services.comboFormTypes = strURL + '/forms';
moduleConfig.services.urlExport = strURL + '/tasks/excel';

moduleConfig.filterForm = new Object();
moduleConfig.filterTitle = translateinformation.filter.title;
moduleConfig.filterForm = [
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype           : 'textfield',
                fieldLabel      : 'Login',
                id              : controller + 'FilterLogin',
                emptyText       : 'Ingrese el Login..',
                columnWidth     : 0.95,
                enableKeyEvents : true,
                allowBlank      : true,
                margin          : '20 0 0 0',
                width           : '60%'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por Login',
                fieldName      : controller + 'FilterLogin',
                margin         : '46 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'datefield',
                fieldLabel     : 'Fecha Inicio',
                id             : controller + 'FilterDateStart',
                emptyText      : 'Ingrese la fecha de inicio...',
				editable: false,
				//format: 'Y-m-d H:i:s',
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.94,
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por fecha de inicio',
                fieldName      : controller + 'FilterDateStart',
                margin         : '27 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'datefield',
                fieldLabel     : 'Fecha Fin',
                id             : controller + 'FilterDateFinish',
				editable: false,
				//format: 'Y-m-d H:i:s',
                emptyText      : 'Ingrese la fecha fin...',
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.95,
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por fecha fin',
                fieldName      : controller + 'FilterDateFinish',
                margin         : '27 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'combo',
                fieldLabel     : 'Estado',
                id             : controller + 'FilterEstado',
                loadingText    : translateinformation.filter.loadingText,
                emptyText      : 'Ingrese el Estado...',
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.95,
                displayField   : 'name',
                valueField     : 'estado',
                minChars       : 0,
                anchor         :'100%',
                pageSize       : 10,
               // margin         : '20 0 0 0',
                labelWidth     : '100%',
                triggerAction  : 'all',
                editable       : false,
                store          : Ext.create('Ext.data.Store', {
                    fields         : ['estado', 'name'],
                    data           : [
                        {"estado" : "PENDIENTE",   "name" : 'Pendiente'},
                        {"estado" : "CHECKIN", "name" : 'Checkin'},
						{"estado" : "CHECKOUT CON FORMULARIO", "name" : 'Checkout con Formulario'},
						{"estado" : "CHECKOUT SIN FORMULARIO", "name" : 'Checkout sin Formulario'}
                    ]
                }),
                queryMode    : 'local'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por estado',
                fieldName      : controller + 'FilterEstado',
                margin         : '27 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'combo',
                fieldLabel     : 'Tipo',
                id             : controller + 'FilterType',
                loadingText    : translateinformation.filter.loadingText,
                emptyText      : 'Ingrese el Tipo...',
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.95,
                displayField   : 'name',
                valueField     : 'type',
                minChars       : 0,
                anchor         :'100%',
                pageSize       : 10,
               // margin         : '20 0 0 0',
                labelWidth     : '100%',
                triggerAction  : 'all',
                editable       : false,
                store          : Ext.create('Ext.data.Store', {
                    fields         : ['type', 'name'],
                    data           : [
                        {"type" : "start",   "name" : 'Inicio'},
                        {"type" : "end", "name" : 'Fin'},
						{"type" : "pickup", "name" : 'Recogida'},
						{"type" : "dropoff", "name" : 'Entrega'},
                        {"type" : "stop", "name" : 'Parada'}
                    ]
                }),
                queryMode    : 'local'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por tipo',
                fieldName      : controller + 'FilterType',
                margin         : '27 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'combo',
                fieldLabel     : 'Tipo Formulario',
                id             : controller + 'FilterTypeForm',
                name           : 'id_form',
                loadingText    : translateinformation.filter.loadingText,
                emptyText      : 'Ingrese el Tipo de Formulario...',
                columnWidth    : 0.95,
                displayField   : 'name',
                valueField     : '_id',
                anchor         :'100%',  
               // margin         : '20 0 0 0',
                labelWidth     : '100%',
                typeAhead      : false,
                forceSelection : false,
                minChars       : 0,
                pageSize       : 10,
                editable       : false,
                store:  controller + '.ComboListFormTypes',
                matchFieldWidth: false,
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por tipo de formulario',
                fieldName      : controller + 'FilterTypeForm',
                margin         : '27 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    },   
];

//esta window debe estar declarada
//obligatoriamente
moduleConfig.window = new Object();

moduleConfig.grid = new Object();
moduleConfig.grid.title = 'Tareas';
moduleConfig.grid.searchField = true;
moduleConfig.grid.searchTitle = 'Busque por Nombre/Codigo/Direcci&oacute;n...';
moduleConfig.grid.searchId = 'listSearchKeyword';
moduleConfig.grid.pageSize = 15;
moduleConfig.grid.topCombos = [];
moduleConfig.grid.listPlugins = [];
moduleConfig.grid.topButtons = [];
moduleConfig.grid.contextualMenu = [
    {
        text    : translateinformation.resources.titleWindow,
        id      : controller + 'ContextualResources',
        submenu : false,
        iconCls : 'codensa-menu'
    }
    ,
    {
        text    : translateinformation.licenses.titleWindow,
        id      : controller + 'ContextualLicenses',
        submenu : false,
        iconCls : 'codensa-menu'
    }
    ,
    {
        text    : translateinformation.devices.titleWindow,
        id      : controller + 'ContextualDevices',
        submenu : false,
        iconCls : 'codensa-menu'
    }
];
moduleConfig.grid.tooltip = true;
moduleConfig.grid.tooltipField = 'name';
moduleConfig.grid.checkbox = 'checkboxmodel';
moduleConfig.grid.checkboxIndex = 0;
moduleConfig.grid.idField = '_id';
moduleConfig.grid.columns = [
    {
        text      : translateinformation.list.id,
        dataIndex : '_id',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true
    },
    {
        text      : 'C&oacute;digo',
        dataIndex : 'code',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
    },
    {
        text      : 'Login',
        dataIndex : 'login',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.data.resourceInstance)? 'N/A' : record.data.resourceInstance.login;	
			return val;
		}
    },
    {
        text      : 'Estado',
        dataIndex : 'status',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
    },
    {
        text      : 'Nombre',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
    },
	
	{
        text      : 'Inicio Programado',
        dataIndex : 'arrival_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
    },
	{
        text      : 'Fin Programado',
        dataIndex : 'finish_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
    },
        {
        text      : 'Tipo',
        dataIndex : 'type',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
    },
	{
        text      : 'Dirección',
        dataIndex : 'address',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
    },
    {
        text      : 'Checkin',
        dataIndex : 'checkin.date',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = (Ext.isEmpty(record.raw.checkin))? 'N/A' : record.raw.checkin.date;
            return val;	
        }
    },
    {
        text      : 'Checkout',
        dataIndex : 'checkout.date',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = (Ext.isEmpty(record.raw.checkout))? 'N/A' : record.raw.checkout.date;
            return val;	
        }
    }
];
moduleConfig.grid.columnsBase = [
    {
        text      : translateinformation.list.id,
        dataIndex : '_id',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true
    },
    {
        text      : 'Nombre',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.raw.task)? 'N/A' : record.raw.task.name;	
			return val;
		}
    },
	{
        text      : 'Login',
        dataIndex : 'login',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.raw.resourceInstance)? 'N/A' : record.raw.resourceInstance.login;	
			return val;
		}
    },
	{
        text      : 'Inicio Programado',
        dataIndex : 'arrival_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.raw.task)? 'N/A' : record.raw.task.arrival_time;	
            return val;
        }
    },
	{
        text      : 'Fin Programado',
        dataIndex : 'finish_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.raw.task)? 'N/A' : record.raw.task.finish_time;
            return val;	
        }
    },
	{
        text      : 'Dirección',
        dataIndex : 'location_name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.raw.task)? 'N/A' : record.raw.task.address;
            return val;	
        }
    },
    {
        text      : 'Checkin',
        dataIndex : 'task.checkin.date',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = (Ext.isEmpty(record.raw.task) || Ext.isEmpty(record.raw.task.checkin))? 'N/A' : record.raw.task.checkin.date;
            return val;	
        }
    },
    {
        text      : 'Checkout',
        dataIndex : 'task.checkout.date',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = (Ext.isEmpty(record.raw.task) || Ext.isEmpty(record.raw.task.checkout))? 'N/A' : record.raw.task.checkout.date;
            return val;	
        }
    }
];
moduleConfig.grid.pagingToolbarItems = [
    {
        text: translate.global.export,
        enableToggle: true,
        defaultAlign: 'right',
        action: 'exportXls',
        cls : 'x-btn-default-small',
        toggleHandler: function (btn, pressed) {

        },
        style:{
            background: '#1fbad6',
            border: '1px solid #fff',  
        },
    }
];

//-----------------------------------------------------------------------
// Ventana con Formulario Embebido de Crear/Editar Empresas (windowForm)
//-----------------------------------------------------------------------
moduleConfig.groupIdCompanies = controller + 'Module';
moduleConfig.titleWindowCompanies = translate.global.create+' '+translateinformation.moduleTitle;
moduleConfig.widthWindowCompanies = '80%';
moduleConfig.heightWindowCompanies = '80%';
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
        title       : translateinformation.form.fieldSetCompany,
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
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.nit,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormNit',
                    name              : 'nit',
                    emptyText         : translateinformation.form.nit.emptyText,
                    allowBlank        : false,
                    flex              : 1,
                    margin            : '10 10 10 10',
                    vtype             : 'numeric',
                    minLengthText     : translateinformation.form.nit.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.name,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormName',
                    name              : 'name',
                    emptyText         : translateinformation.form.name.emptyText,
                    allowBlank        : false,
                    flex              : 3,
                    margin            : '10 10 10 10',
                    //vtype             : 'alphanumeric',
                    minLengthText     : translateinformation.form.name.nameError
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
                    fieldLabel        : translateinformation.form.phone,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPhone',
                    name              : 'phone',
                    emptyText         : translateinformation.form.phone.emptyText,
                    allowBlank        : false,
                    flex              : 1,
                    margin            : '10 10 10 10',
                    vtype             : 'numeric',
                    minLengthText     : translateinformation.form.phone.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.address,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormAddress',
                    name              : 'address',
                    emptyText         : translateinformation.form.address.emptyText,
                    allowBlank        : false,
                    flex              : 3,
                    margin            : '10 10 10 10',
                    vtype             : 'specialchars',
                    minLengthText     : translateinformation.form.address.nameError
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
                    fieldLabel        : translateinformation.form.country,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormCountry',
                    name              : 'country',
                    emptyText         : translateinformation.form.country.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    typeAhead         : false,
                    forceSelection    : true,
                    displayField      : 'country',
                    valueField        : '_id',
                    minChars          : 0,
                    pageSize          : 10,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    editable          : false,
                    store             : Ext.create('Ext.data.Store', {
                    fields            : ['_id', 'country'],
                    data              : [
                        {"_id" : "Colombia",   "country" : "Colombia"},
                        {"_id" : "Venezuela", "country" : "Venezuela"}
                    ]
                    }),
                    queryMode    : 'local'
                }
                ,
                {
                    xtype             : 'combobox',
                    fieldLabel        : translateinformation.form.city,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormCity',
                    name              : 'city',
                    emptyText         : translateinformation.form.city.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    typeAhead         : false,
                    forceSelection    : true,
                    displayField      : 'city',
                    valueField        : '_id',
                    minChars          : 0,
                    pageSize          : 10,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    editable          : false,
                    store             : Ext.create('Ext.data.Store', {
                        fields         : ['_id', 'city'],
                        data           : [
                            {"_id" : "Bogota",   "city" : "Bogotá"},
                            {"_id" : "Caracas", "city" : "Caracas"}
                        ]
                    }),
                    queryMode    : 'local'
                }
            ]
        }
        ]
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translateinformation.form.fieldSetAgent,
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
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.personName,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonName',
                    name              : 'person_name',
                    emptyText         : translateinformation.form.personName.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    vtype             : 'alphabetic',
                    minLengthText     : translateinformation.form.personName.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.personLastname,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonLastname',
                    name              : 'person_lastname',
                    emptyText         : translateinformation.form.personLastname.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    vtype             : 'alphabetic',
                    minLengthText     : translateinformation.form.personLastname.nameError
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
                    fieldLabel        : translateinformation.form.personDocument,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonDocument',
                    name              : 'person_document',
                    emptyText         : translateinformation.form.personDocument.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    vtype             : 'alphanumeric',
                    minLengthText     : translateinformation.form.personDocument.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.personPhone,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonPhone',
                    name              : 'person_phone',
                    emptyText         : translateinformation.form.personPhone.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    vtype             : 'numeric',
                    minLengthText     : translateinformation.form.personPhone.nameError
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
        id        : controller + 'WindowsSaveButton',
        action    : controller + 'WindowsSaveButton',
        scope     : this,
        formBind  : true
    } 
];

////INICIO - Ver registros
moduleConfig.ViewRegistersGroupId         = controller + 'ViewRegisters';
moduleConfig.ViewRegistersTitleWindow     = 'Registros';
moduleConfig.ViewRegistersWidthWindow     = '80%';
moduleConfig.ViewRegistersHeightWindow    = '65%';
moduleConfig.ViewRegistersResizableWindow = false;
moduleConfig.ViewRegistersModalWindow     = true;
moduleConfig.ViewRegistersDraggableWindow = false;
moduleConfig.ViewRegistersStore           = controller + '.ListRegisters';
moduleConfig.ViewRegistersModalWindow = true; 
moduleConfig.ViewRegistersDraggableWindow = false;
moduleConfig.ViewRegistersMenuItem        = [];
moduleConfig.ViewRegistersColumns         = [
  {
        text      : translateinformation.list.id,
        dataIndex : '_id',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true
    },
    {
        text      : 'Formulario',
        dataIndex : 'form.name',
        width     : '30%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        //autoSizeColumn: true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.raw.form)? 'N/A' : record.raw.form.name;	
			return val;
		}
    },
	{
        text      : 'Estadísticas',
        dataIndex : '',
        width     : '29.4%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        //autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var sectionsStatus = Ext.isEmpty(record.raw.dataMovil)? 'N/A' : Ext.JSON.decode(record.raw.dataMovil.sectionsStatus);
            var val = 'N/A';
            
            if(!Ext.isEmpty(sectionsStatus))
            {
                val = '<u>' + sectionsStatus.length + ' Secciones</u></br>';
                for(var i = 0; i<sectionsStatus.length; ++i)
                {
                    val += 'Sección ' + (i+1) + ': ' + sectionsStatus[i] + ' incompleto(s)</br>';
                }
            }	
			return val;
		}
    },
	{
        text      : 'Creación',
        dataIndex : 'created_at',
        width     : '18%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        //autoSizeColumn: true,
    },
	{
        text      : 'Actualización',
        dataIndex : 'updated_at',
        width     : '18%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        //autoSizeColumn: true,
    },
];
moduleConfig.ViewRegistersPlugins = [
   {
        //ptype: 'rowexpander',
        ptype: 'datarowexpander',
        pluginId: 'idPluginRowExpander',
        expandOnDblClick: false,
        expandOnEnter: false,
        //selectRowOnExpand: true,
        //Mejorar - https://fiddle.sencha.com/#fiddle/6g1
        //gridConfig: {
        //    colSpan: 3,
        //},
        //columnConfig: [],
        rowBodyTpl : new Ext.XTemplate(
            '{[this.rowExpanderData(values)]}',
            {
                //Obtiene los datos de acuerdo al tipo
                getData: function(type, data, allData, extraData)
                {
                    //console.log('All:', arguments);
                    var result = 'N/A'

                    if(!Ext.isEmpty(data))
                    {
                        switch (type) {
                            case 'textfield':
                                result = data;
                                break;
                            case 'textareafield':
                                result = data;
                                break;
                            case 'fieldcontainer':
                                result = data;
                                break;
                            case 'combobox':
                                result = data;
                                break;
                            case 'fieldcontainer':
                                result = data;
                                break;
                            case 'numberfield':
                                result = data;
                                break;
                            case 'timefield':
                                result = data;
                                break;
							case 'orderfield':
                            case 'gridfield':
                                result = Ext.JSON.encode(extraData) + Ext.JSON.encode(data);
                                var resultTable = '<table style="width:100%; border: 1px solid #1894ab;font-size: 13px"><tr style="background: #1894ab;color: #fff">';
                                var columnsName = [];
                                //console.log('gridfield:', result);
                                //Agrego los headers
                                for(var i=0; i<extraData.length; ++i)
                                {
                                    var columnName = extraData[i];
                                    for (var key in columnName) 
                                    {
                                        if (columnName.hasOwnProperty(key)) {
                                            var element = columnName[key];
                                            columnsName.push(key);
                                            resultTable += '<th>' + element + '</th>';
                                        }
                                    }
                                }
                                resultTable += '</tr>'; 

                                //Iteramos por fila
                                for (var key in data) 
                                {
                                    if (data.hasOwnProperty(key)) 
                                    {
                                        var element = data[key];
                                        resultTable += '<tr>';
                                        for(var i=0; i<columnsName.length; ++i)
                                        {
                                            var valTD = element[columnsName[i]] || 'N/A';
                                            resultTable += '<td>' + valTD + '</td>';
                                        }
                                        resultTable += '<tr>';
                                    }
                                }
                                //Agrego la data

                                resultTable += '</table>'; 

                                /*resultTable = ['<table style="width:100%; border: 1px solid #000;"><tbody>',
                                '<tr><th>Modalidad</th><th>Calificación</th><th>Entidad</th><th>Tipo deudor</th><th>Fecha inicio</th><th>Fecha de erminación</th><th>Valor inicial</th><th>Saldo obligatorio</th><th>Valor cuota mensual</th><th>Utilizando en la micro empresa</th><th>Date</th><th>Time</th></tr>',
                                '<tr><td>dgjdlkgjs dlkgjls</td><td>2016-8-21 ghgh</td><td>10:47 ghghghgfgh</td><td>Todo bien vale </td><td>2016-8-21 fgdfgdfgdfg</td><td>10:47 vbxshdhsdsdg sdgsdg</td><td>n</td><td>2016-8-21 fdgdgsdgdsgs dgsddgsdgs dgsgsd gsdgsdgsd fgsgsdg sdgsdg sg</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td></tr>',
                                '<tr><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td></tr>',
                                '<tr><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td></tr>',
                                '<tr></tr></tbody></table>'];*/
                                result = resultTable;
                                break;
                            case 'datefield':
                                result = data;
                                break;
                            case 'filefield':
                                result = data;
                                break;
                            case 'photofield':
                            case 'signaturefield':
                            case 'qrcodefield':
                            case 'barcodefield':
                                result = '<a href="' + data + '"  target="_black" class="tooltip-tasks" style="font-size: 14px;">Ver Foto <span class="tooltiptext-tasks" style="border: 1px solid #000; background-color: #fff;    margin-left: 4em;margin-top: -2.5em;"><img src="' + data + '" height="50px"></span></a>';
                                break;
                            case 'labelfield':
                                result = data;
                                break;
                        }
                    }
                    return result;
                },
                rowExpanderData: function(values)
                {
                    return objController.rowExpanderData(this, values);
                },
            }
        ),
    }
];
moduleConfig.itemsPagingToolbar = [
    {
        xtype: 'button',
        text: 'Exportar',
        id: controller + 'ExportRegistersGrid',
        style:{
            background: '#1fbad6',
            border: '1px solid #fff',  
        },

    },
    {
        xtype          : 'combo',
        fieldLabel     : 'Formularios',
        labelWidth     : 80,
        name           : 'id_form',
        id             : controller + 'FormTypes',
        loadingText    : 'Buscando...',
        displayField   : 'name',
        valueField     : '_id',
        typeAhead      : false,
        forceSelection : false,
        minChars       : 0,
        pageSize       : 10,
        editable       : false,
        store:  controller + '.ComboListFormTypes',
        matchFieldWidth: false,
    }
];
moduleConfig.ViewRegistersTopToolbar = [];
////FIN - Ver registros
