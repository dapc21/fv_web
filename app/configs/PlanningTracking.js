var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'MapGrid';
moduleConfig.lateralPanel = 'bottom';
/*moduleConfig.serviceMapList = controller.toLowerCase() + '@index';
moduleConfig.serviceAuditUpdate = controller.toLowerCase() + '@update';
moduleConfig.serviceAuditStore = controller.toLowerCase() + '@store';
moduleConfig.serviceAuditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.serviceExport = controller.toLowerCase() + '@excel';*/
moduleConfig.exportFilter = '';
moduleConfig.tmpId = 0;
moduleConfig.layer = '';
moduleConfig.listPageSize = 10;

moduleConfig.services = new Object();
moduleConfig.services.listTasksUrl = strURL + '/tracking/actual?relations=["route"]';
moduleConfig.services.listResourcesGroupUrl = strURL + '/resourcegroups';
moduleConfig.services.listDeviceTypeUrl = strURL +'/resourcedefinitions';
moduleConfig.services.urlTask = strURL + '/tasks'
moduleConfig.services.listRegistersUrl = strURL + '/registers';
moduleConfig.services.urlAddressGeocoding = strURL + '/addresses/validate';
moduleConfig.services.listResourcesEventsUrl = strURL + '/tracking/events';
moduleConfig.services.urlExportGrid1 = strURL + 'tracking/actual/excel/planningtracking';
moduleConfig.services.urlExportGrid2 = strURL + '/tasks/excel';


moduleConfig.services.mapList = controller.toLowerCase() + '@index';
moduleConfig.services.auditUpdate = controller.toLowerCase() + '@update';
moduleConfig.services.auditStore = controller.toLowerCase() + '@store';
moduleConfig.services.auditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.services.export = controller.toLowerCase() + '@excel';

moduleConfig.map = new Object();
moduleConfig.map.title = '';//translateplanningtracking.map.title;
moduleConfig.map.searchId = 'mapSearchAddress';
moduleConfig.map.topButtons = [];
moduleConfig.map.bottomButtons = [];
moduleConfig.map.closable = false;
moduleConfig.map.toolbarField = [
    {
        text: 'Street View',
        id: controller + 'StreetView',
        action: controller + 'StreetView',
        enableToggle: true,
        tooltip: 'Activar el Google Street View',
        iconCls   : 'button-streetview',
    },
    {
    xtype           : 'combo',
    store           : controller + '.SearchAddress',
    queryParam      : 'address',
    //fieldLabel      : 'Buscar direccion',
    emptyText: 'Ingrese aquí su dirección',
    enableKeyEvents : true,
    displayField    : 'name',
    id              : controller + 'SearchAddress',
    //labelWidth      : 120,
    minLength       : 5,
    hideTrigger     : true,
    queryDelay      : 1000,
    listConfig: {
        loadingText: 'Buscando...',
        emptyText: 'No se encontro una direccion.',
        getInnerTpl: function() {
            return '<span><br />{name}</span>';
        }
    }
}];


moduleConfig.map.baseLayer = new Object();
moduleConfig.map.baseLayer.url= 'http://ows.terrestris.de/osm/service?';
moduleConfig.map.baseLayer.name = 'Capa principal';

moduleConfig.map.controls = new Object();
moduleConfig.map.controls.panPanel = true;
moduleConfig.map.controls.mousePosition = true;
moduleConfig.map.controls.zoomPanel = true;
moduleConfig.map.controls.navigation = true;
moduleConfig.map.controls.layerSwitcher = true;

//Estandar archivo: {URL Base}/{type}/{status}_{color}.png -- lowerCamelCase
//Estandar propiedad icons: {type}_{status} -- lowerCamelCase
moduleConfig.map.icons = new Object();
moduleConfig.map.icons.urlBase = 'images/icon/markers/status';
moduleConfig.map.icons.default = moduleConfig.map.icons.urlBase + '/default.png';
moduleConfig.map.icons.resource='images/icon/markers/resources/truckG.png';
moduleConfig.map.icons.resources = [
    'images/icon/markers/resource.png',//Persona
    'images/icon/markers/resources/truckG.png', //Camion/Mula
];

moduleConfig.map.taskInterval = 60000;

moduleConfig.filterForm = new Object();
moduleConfig.filterTitle = 'Filtros';
moduleConfig.filterForm = [
    {
      xtype  : 'container',
      flex   : 1,
      layout : 'column',
      margin          : '0 0 0 0',
      items  : [
          {
            xtype: 'datefield',
            fieldLabel: 'Fecha',
            id              : controller + 'FilterResourceFecha',
            name: 'date',
            columnWidth     : 0.94,
            margin          : '10 0 0 0',
            value: new Date(), 
        },
      ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        margin          : '0 0 0 0',
        items  : [
            {
                xtype           : 'textfield',
                id              : controller + 'FilterResourceLogin',
                fieldLabel      : 'Buscar por Recurso',
                enableKeyEvents : true,
                columnWidth     : 0.95,
                margin          : '5 0 0 0',
                width           : '60%'
            },{
                xtype     : 'button',
                iconCls   : 'cancel-button',
                tooltip   : translateplanningtracking.grid.searchTitle,
                fieldName : controller + 'FilterResourceLogin',
                cls       : 'x-btn-default-small',
                action    : 'clearFilter',
                id: controller + 'FilterResourceLoginClear',
                margin         : '31 6 6 3',
            }
        ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        margin          : '0 0 0 0',
        items  : [
            {
                xtype           : 'textfield',
                id              : controller + 'FilterResourceCode',
                fieldLabel      : 'Buscar por Nro Guia',
                //emptyText       : translateplanningtracking.grid.searchTitle,
                enableKeyEvents : true,
                columnWidth     : 0.95,
                margin          : '5 0 0 0',
                width           : '60%'
            },{
                xtype     : 'button',
                iconCls   : 'cancel-button',
                tooltip   : translateplanningtracking.grid.searchTitle,
                fieldName : controller + 'FilterResourceCode',
                cls       : 'x-btn-default-small',
                action    : 'clearFilter',
                id              : controller + 'FilterResourceCodeClear',
                margin         : '31 6 6 3',
            }
        ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        margin          : '0 0 0 0',
        items  : [
            {
                columnWidth     : 0.95,
                margin          : '5 0 0 0',
                width           : '60%',
                xtype          : 'combo',
                fieldLabel     : 'Buscar por Nombre de la Tarea',
                id              : controller + 'FilterTaskName',
                displayField   : 'name',
                valueField     : '_id',
                triggerAction  : 'all',
                editable       : true,
                multiSelect    : true,
                store          : 'PlanningTracking.SearchTasks',
                queryParam: 'filters',
                listeners:{
                     'beforequery': function( queryEvent, eOpts )
                     {
                         //console.log(queryEvent.query);
                         var date = Ext.getCmp(controller + 'FilterResourceFecha').getValue();
                         var dateTomorrow = Ext.Date.add(date, Ext.Date.DAY, 1);
                         var objFilters = Ext.JSON.encode({
                            'and':[
                                {
                                    field: 'id_company',
                                    comparison: 'eq',
                                    value: window.localStorage.getItem('id_company')
                                },
                                {
                                    'field':'name',
                                    'comparison':'lk',
                                    'value': queryEvent.query
                                },
                                {
                                    'field':'arrival_time',
                                    'comparison':'gte',
                                    'value': Ext.Date.format(date, 'Y-m-d H:i:s')
                                },
                                {
                                    'field':'arrival_time',
                                    'comparison':'lt',
                                    'value': Ext.Date.format(dateTomorrow, 'Y-m-d H:i:s')
                                },			   
                            ]
                        });
                        queryEvent.query = objFilters;
                     }
                }
            },
            {
                xtype     : 'button',
                iconCls   : 'cancel-button',
                tooltip   : translateplanningtracking.grid.searchTitle,
                fieldName : controller + 'FilterTaskName',
                cls       : 'x-btn-default-small',
                action    : 'clearFilter',
                id              : controller + 'FilterTaskNameClear',
                margin         : '31 6 6 3',
            }
        ]
    },
  {
      xtype  : 'container',
      flex   : 1,
      layout : 'column',
      items  : [{
            columnWidth     : 0.95,
            margin          : '5 0 0 0',
            width           : '60%',
            xtype         : 'combo',
            fieldLabel    : 'Estado Tareas',
            id            : controller + 'FilterTaskStatus',
            queryMode     : 'local',
            displayField  : 'name',
            valueField    : '_id',
            triggerAction : 'all',
            editable      : false,
            multiSelect   : true,
            store         : Ext.create('Ext.data.Store', {
                fields : ['_id', 'name'],
                data   : [
                    {"_id" : "PENDIENTE",             "name" : translateplanningtracking.filter.combobox.status.PENDING},
                    {"_id" : "CHECKIN",            "name" : translateplanningtracking.filter.combobox.status.DELIVERING},
                    {"_id" : "CHECKOUT CON FORMULARIO",             "name" : translateplanningtracking.filter.combobox.status.DELIVERED},
                    {"_id" : "CHECKOUT SIN FORMULARIO",    "name" : translateplanningtracking.filter.combobox.status.DELIVEREDWITHERROR},
                ]
            })
        },{
          xtype          : 'button',
          iconCls        : 'cancel-button',
          tooltip        : 'Elimina el filtro por Estado de Tarea',
          fieldName      : controller + 'FilterTaskStatus',
          margin         : '31 6 6 3',
          cls            : 'x-btn-default-small',
          id              : controller + 'FilterTaskStatusClear',
          action         : 'clearFilter'
      }]
  },{
      xtype  : 'container',
      flex   : 1,
      layout : 'column',
      items  : [{
        columnWidth     : 0.95,
        margin          : '5 0 0 0',
        width           : '60%',
          xtype          : 'combo',
          fieldLabel     : 'Tipo Recurso',
          id             : controller + 'FilterResourceType',
          displayField   : 'name',
          valueField     : '_id',
          triggerAction  : 'all',
          editable       : false,
          multiSelect    : true,
          store          : 'PlanningTracking.ListResourcesType'
      },{
        xtype          : 'button',
        iconCls        : 'cancel-button',
        tooltip        : 'Elimina el filtro por Tipo Recurso',
        fieldName      : controller + 'FilterResourceType',
        margin         : '31 6 6 3',
        cls            : 'x-btn-default-small',
        action         : 'clearFilter',
        id             : controller + 'ClearFilterResourceType',  
    }]
  },{
      xtype  : 'container',
      flex   : 1,
      layout : 'column',
      items  : [{
        columnWidth     : 0.95,
        margin          : '5 0 0 0',
        width           : '60%',
          xtype          : 'combo',
          fieldLabel     : 'Grupos',
          id             : controller + 'FilterResourceGroup',
          displayField   : 'name',
          valueField     : '_id',
          triggerAction  : 'all',
          editable       : false,
          multiSelect    : true,
          store          : 'PlanningTracking.ListResourcesGroup'
      },{
        xtype          : 'button',
        iconCls        : 'cancel-button',
        tooltip        : 'Elimina el filtro por Grupo de Recurso',
        fieldName      : controller + 'FilterResourceGroup',
        margin         : '31 6 6 3',
        cls            : 'x-btn-default-small',
        action         : 'clearFilter',
        id             : controller + 'FilterResourceGroupClear',
    }]
}]


moduleConfig.grid = new Object();
moduleConfig.grid.title = translateplanningtracking.grid.name;
moduleConfig.grid.searchField = true;
moduleConfig.grid.searchTitle = translateplanningtracking.grid.searchTitle;
moduleConfig.grid.searchId = 'listSearchKeyword';
moduleConfig.grid.searchWidth = '20%';
moduleConfig.grid.pageSize = 5;
moduleConfig.grid.contextualMenu = [];
moduleConfig.grid.topButtons = [];
moduleConfig.grid.tooltip = true;
moduleConfig.grid.tooltipField = 'name';
moduleConfig.grid.checkboxIndex = 0;
moduleConfig.grid.idField = '_id',
moduleConfig.grid.checkbox = true;
moduleConfig.grid.pagingToolbar = true;
moduleConfig.grid.pagingToolbarItems = [
   {
        text: 'Exportar',
        enableToggle: true,
        defaultAlign: 'right',
        action: 'exportXls',
        cls: 'x-btn-default-small',
        style:{
            background: '#1fbad6',
            border: '1px solid #fff',  
        },
        /*toggleHandler: function (btn, pressed) {

        }*/
    },
    {
      xtype: 'label',
      id: controller + 'SummaryLabel'
    },
    {
          xtype   : 'button',
          iconCls : 'ok-button',
          text    : 'Eventos',
          cls     : 'x-btn-default-small',
          id      : controller + 'ResourceEventList',
          action  : controller + 'ResourceEventList'
    },
    {
        text    : 'Crear Tarea',
        action  : controller + 'ListCreate',
        iconCls : 'add-button',
        cls     : 'x-btn-default-small',
        submenu : false,
        items   : [],
        style:{
            background: '#1fbad6',
            border: '1px solid #fff',  
        },
    }
];

moduleConfig.grid.hoursColumnStart = 6;
moduleConfig.grid.hoursColumnEnd = 23;
moduleConfig.grid.columns = [
    {
        text      : translateplanningtracking.model.atributes.resource,
        dataIndex : 'login',
        width     : 100,
        align     : 'left',
        sortable  : true,
        locked    : true,
        doSort    : function(state){
            var ds = this.up('tablepanel').store;
            ds.sort({
                property: 'resource.login',
                direction: state
            });
        },
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            //Manejo de iconos
            //var icon = record.raw.icon || globalIconDefault;
            var strSrcIcon = objController.urlIconNormal(record.raw.icon);

            var color = objController.getLineColor(rowIndex);
            //console.log('Column Record: ', record);
            metaData.tdAttr = "style='color: #" + color + ";'";
            record.data.color = color;
            value = Ext.util.Format.htmlEncode(value);

            
            var strCenterMap = '';
            if(!Ext.isEmpty(record.data.latitude) && !Ext.isEmpty(record.data.longitude))
            {
                strCenterMap = 'onclick="objController.onCenterMap(' + record.data.latitude + ',' + record.data.longitude + ');"';
            }

            var contextualMenu = 'oncontextmenu="objController.resourceContextMenu(this);"';
            return [
                    '<center>',
                        '<a ' + strCenterMap + ' ' + contextualMenu + ' style="cursor:pointer;" id="' + value + '" name="' + record.data._id + '" >',
                            '<img class="gridtaskIconResource" src="' + strSrcIcon + '"><br/>',
                            value + 
                        '</a>',
                    '</center>',
                ].join('');
        }
    },
    {
        text      : translateplanningtracking.model.atributes.location,
        dataIndex : 'updateTime',
        align     : 'left',
        sortable  : true,
        width     : 200,
        locked    : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            return [
                record.data.address,
                '<br>',
                value,
                ].join('');
        },
    },
    {
        text      : 'Estados de Tareas',
        dataIndex : 'route',
        width     : 150,
        align     : 'left',
        sortable  : true,
        locked    : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var summary = 'N/A';
            var objStatistics = (!Ext.isEmpty(value) && !Ext.isEmpty(value.statistics))? value.statistics : {
                totalPending:0,
                totalCancelled:0,
                totalCheckin:0,
                totalCheckoutWithForm:0,
                totalCheckoutWithoutForm:0,
                totalApproved:0
            };
            var map = Ext.getCmp(AppGlobals.mapId);
            var layer = map.map.getLayersByName(record.data.login);
            
            if(!Ext.isEmpty(layer))
            {
                layer = layer.pop();
                var resource = layer.getFeaturesByAttribute('markerType', 'resource');

                if(!Ext.isEmpty(resource))
                {
                    resource = resource.pop();
                    
                    //Actualizamos las características
                    resource.data['statistics'] = objStatistics;
                }
            }

          summary = [
                '<table style="margin-top:0px;font-size: smaller;">',
                    '<tr>',
                        '<td><b>P   :</b>' + objStatistics.totalPending + '</td>',
                        '<td><b>C   :</b>' + objStatistics.totalCancelled + '</td>',
                        '<td><b>CI  :</b>' + objStatistics.totalCheckin + '</td>',
                    '</tr>',
                    '<tr>',
                        '<td><b>COF:</b>' + objStatistics.totalCheckoutWithForm + '</td>',
                        '<td><b>COS:</b>' + objStatistics.totalCheckoutWithoutForm + '</td>',
                        '<td><b>A:</b>' + objStatistics.totalApproved + '</td>',
                    '</tr>',
                    '</table>'
                ].join('');

          return summary;
        }
}];

moduleConfig.grid.filterToolbar = [/*{
      xtype   : 'button',
    //  iconCls : 'ok-button',
      text    : 'Eventos',
      id      : controller + 'ResourceEventList',
      action  : controller + 'ResourceEventList'
}*/];


moduleConfig.groupIdTaskDetail = controller + 'Module';
moduleConfig.titleWindowTaskDetail = translateplanningtracking.window.title;
moduleConfig.widthWindowTaskDetail = 250;
moduleConfig.heightWindowTaskDetail = '50%';
moduleConfig.resizableWindowTaskDetail = false;

////INICIO - PopUps Windows
moduleConfig.PopUpTaskgroupId = controller + 'PopUpTask';
moduleConfig.PopUpTaskTitleWindow = translateplanningtracking.task;
moduleConfig.PopUpTaskWidthWindow = 300;//'35%';
moduleConfig.PopUpTaskHeightWindow = '55%';
moduleConfig.PopUpTaskResizableWindow = false;
moduleConfig.PopUpTaskModalWindow = false;
moduleConfig.PopUpTaskDraggableWindow = true;
moduleConfig.PopUpTaskToolbar = [];
moduleConfig.PopUpTaskItemsForm = [
    {
        xtype: 'container',
        layout:{
            type:'column'
        },
        defaults:{
            columnWidth: 0.99,
            labelWidth        : 120,
            labelAlign        : 'right',
            disabled: true,
        },
        items:[
            {
                xtype             : 'textfield',
                fieldLabel        : translateplanningtracking.marker.code,
                id                : 'PopUpTaskFormCode',
                name              : 'code',
                emptyText         : translateplanningtracking.marker.code,
            }
        ]
    },
];

moduleConfig.PopUpTaskBottomButtons = [
    {
        text      : translateplanningtracking.form.close,
        iconCls   : 'close-button',
        listeners:{
            click: function()
            {
                //Cerramos el PopUpWindow
                Ext.getCmp(controller + 'PopUpTaskWindow').destroy();
            },
        }
    }
];
////FIN - PopUps Windows

//-----------------------------------------------------------------------
// Ventana con Formulario Embebido de Crear Tareas (windowCreateTask)
//-----------------------------------------------------------------------
moduleConfig.groupIdCreateTask = controller + 'CreateTask';
moduleConfig.titleWindowCreateTask = translate.global.create+' '+translateplanningtracking.task;
moduleConfig.widthWindowCreateTask = '35%';
moduleConfig.heightWindowCreateTask = '50%';
moduleConfig.resizableWindowCreateTask = false;
moduleConfig.modalWindowCreateTask = false;
moduleConfig.draggableWindowCreateTask = true;
moduleConfig.toolbarCreateTask = [];
moduleConfig.itemsFormCreateTask = [
    {
        xtype         : 'combo',
        afterLabelTextTpl : AppGlobals.required,
        fieldLabel    : 'Tipo',
        labelWidth    : 70,
        labelAlign    : 'left',
        margin        : '10 10 10 10',
        id            : controller + 'FormType',
        name          : 'type',
        queryMode     : 'local',
        displayField  : 'name',
        valueField    : '_id',
        triggerAction : 'all',
        editable      : false,
        allowBlank    : false,
        store         : Ext.create('Ext.data.Store', {
            fields : ['_id', 'name'],
            data   : [
                {"_id" : "dropoff", "name" : translateplanningtracking.form.type.dropoff},
                {"_id" : "pickup",  "name" : translateplanningtracking.form.type.pickup}
            ]
        })
    },
    {
        xtype             : 'textfield',
        fieldLabel        : translateplanningtracking.form.name,
        labelWidth        : 70,
        afterLabelTextTpl : AppGlobals.required,
        id                : controller + 'FormName',
        name              : 'name',
        emptyText         : translateplanningtracking.form.nameEmptyText,
        allowBlank        : false,
        margin            : '10 10 10 10',
        minLengthText     : translateplanningtracking.form.nameError,
        labelAlign        : 'left'
    },
    {
        xtype       : 'fieldcontainer',
        labelWidth  : 65,
        msgTarget   : 'under',
        labelAlign  : 'left',
        layout      : {
            type            : 'hbox',
            defaultMargins  : {top: 0, right: 5, bottom: 0, left: 5}
        },
        items:[{
            xtype             : 'textfield',
            fieldLabel        : translateplanningtracking.form.address,
            labelWidth        : 75,
            afterLabelTextTpl : AppGlobals.required,
            id                : controller + 'FormAddress',
            name              : 'address',
            emptyText         : translateplanningtracking.form.addressEmptyText,
            allowBlank        : false,
          //  margin            : '10 10 10 10',
            minLengthText     : translateplanningtracking.form.addressError,
            labelAlign        : 'left'
        },
        {
            xtype   : 'button',
            iconCls : 'ok-button',
            text    : translateplanningtracking.form.validateButton,
            id      : controller + 'WindowsSaveCreateTaskValidateAddressButton',
            action  : controller + 'WindowsSaveCreateTaskValidateAddressButton'
        },
        {
            xtype   : 'button',
            iconCls : 'ok-button',
            text    : translateplanningtracking.form.acceptButton,
            hidden  : true,
            id      : controller + 'WindowsSaveCreateTaskAcceptAddressButton',
            action  : controller + 'WindowsSaveCreateTaskAcceptAddressButton'
        },
        {
            xtype : 'displayfield',
            id    : controller + 'WindowsSaveCreateTaskAddressEstatusDisplay',
            value : translateplanningtracking.form.addressNotValid
        },
        {
            xtype : 'hiddenfield',
            name  : 'location',
            value : '',
            id    : controller + 'FormLocation'
        }]
    },
    {
        xtype       : 'fieldcontainer',
        defaultType : 'numberfield',
        margin      : '10 10 10 10',
        fieldLabel  : translateplanningtracking.form.reception,
        labelWidth  : 65,
        msgTarget   : 'under',
        labelAlign  : 'left',
        layout      : {
            type            : 'hbox',
            defaultMargins  : {top: 0, right: 5, bottom: 0, left: 5}
        },
        defaults    : {
            hideLabel : true
        },
        items       : [
            {
                xtype             : 'timefield',
                afterLabelTextTpl : AppGlobals.required,
                id                : controller + 'FormStart',
                name              : 'start',
                allowBlank        : false,
                flex              : 1,
                format            : 'H:i',
                submitFormat      : 'H:i',
                increment         : 1,
                minLengthText     : translateplanningtracking.form.startError
            },
            ,
            {xtype: 'displayfield', value: 'a'},
            {
                xtype             : 'timefield',
                afterLabelTextTpl : AppGlobals.required,
                id                : controller + 'FormEnd',
                name              : 'end',
                allowBlank        : false,
                flex              : 1,
                format            : 'H:i',
                submitFormat      : 'H:i',
                increment         : 1,
                minLengthText     : translateplanningtracking.form.endError
            }
        ]
    },
    {
        xtype       : 'fieldcontainer',
        defaultType : 'numberfield',
        margin      : '10 10 10 10',
        msgTarget   : 'under',
        layout      : {
            type            : 'hbox',
            defaultMargins  : {top: 0, right: 5, bottom: 0, left: 5}
        },
        items       : [
            {
                fieldLabel        : translateplanningtracking.form.loadAmount,
                labelWidth        : 65,
                afterLabelTextTpl : AppGlobals.required,
                id                : controller + 'FormLoadAmount',
                name              : 'loadAmount',
                emptyText         : translateplanningtracking.form.loadAmountEmptyText,
                allowBlank        : false,
                labelAlign        : 'left',
                flex              : 1,
                minValue          : 0,
                value             : 0,
                minLengthText     : translateplanningtracking.form.loadAmountError
            },
            {
                fieldLabel        : translateplanningtracking.form.duration,
                labelWidth        : 70,
                afterLabelTextTpl : AppGlobals.required,
                id                : controller + 'FormDuration',
                name              : 'duration',
                emptyText         : translateplanningtracking.form.durationEmptyText,
                allowBlank        : false,
                labelAlign        : 'left',
                flex              : 1,
                minValue          : 0,
                value             : 0,
                minLengthText     : translateplanningtracking.form.durationError
            }
        ]
    },
    {
        xtype             : 'textfield',
        fieldLabel        : translateplanningtracking.form.receiver,
        labelWidth        : 70,
        afterLabelTextTpl : AppGlobals.required,
        id                : controller + 'FormReceiver',
        name              : 'customerName',
        emptyText         : translateplanningtracking.form.receiverEmptyText,
        allowBlank        : false,
        margin            : '10 10 10 10',
        minLengthText     : translateplanningtracking.form.receiverError,
        labelAlign        : 'left'
    }
];

moduleConfig.bottomButtonsCreateTask = [
    {
        text      : translateplanningtracking.form.scheduleButton,
        iconCls   : 'ok-button',
        id        : controller + 'WindowsSaveCreateTaskButton',
        action    : controller + 'WindowsSaveCreateTaskButton',
        scope     : this,
        formBind  : true
    }
];

/*
* Ventana de Eventos de un Recurso
**/
moduleConfig.groupIdResourceEvents = controller + 'ResourceEvents';
moduleConfig.titleWindowResourceEvents = translateplanningtracking.resourceEvents.events;
moduleConfig.widthWindowResourceEvents = '50%';
moduleConfig.heightWindowResourceEvents = '50%';
moduleConfig.resizableWindowResourceEvents = false;
moduleConfig.modalWindowResourceEvents = true;
moduleConfig.draggableWindowResourceEvents = false;
moduleConfig.toolbarResourceEvents = [];
moduleConfig.storeResourceEvents = controller + '.ListResourcesEvents';
moduleConfig.bottomButtonsResourceEvents = [];
moduleConfig.menuItemResourceEvents = [];
moduleConfig.columnsResourceEvents = [
  {
    text: translateplanningtracking.resourceEvents.list.resource,
    dataIndex: 'resourceName'
  },
  {
    text: translateplanningtracking.resourceEvents.list.task,
    dataIndex: 'taskName'
  },
  {
    text: translateplanningtracking.resourceEvents.list.category,
    dataIndex:'eventCategory'
  },
  {
    text: translateplanningtracking.resourceEvents.list.type,
    dataIndex: 'eventType'
  },
  {
    text: translateplanningtracking.resourceEvents.list.msg,
    dataIndex: 'message'
  },
  {
    text: translateplanningtracking.resourceEvents.list.updateTime,
    dataIndex: 'updateTime'
  }
];

/* Nuevo Grid */
moduleConfig.subgrid = [];
moduleConfig.subgrid[0] = new Object();
moduleConfig.subgrid[0].title = '';
/*moduleConfig.subgrid[0].searchField = false;
moduleConfig.subgrid[0].searchTitle = 'Búsqueda';
moduleConfig.subgrid[0].searchId = 'listSearchKeyword';*/
moduleConfig.subgrid[0].pageSize = 15;
moduleConfig.subgrid[0].topButtons = [];
moduleConfig.subgrid[0].bottomButtons = [];
moduleConfig.subgrid[0].pagingToolbarItems = [
    {
        //columnWidth     : 0.95,
        //margin          : '5 0 0 0',
        labelWidth           : 60,
        xtype          : 'combo',
        fieldLabel     : 'Recurso',
        id             : controller + 'GridSecondResource',
        displayField   : 'login',
        valueField     : '_id',
        triggerAction  : 'all',
        editable       : false,
        multiSelect    : false,
        store          : 'PlanningTracking.ListAllResources'
    },
    {
        xtype        : 'button',
        id : controller + 'ExportFileFirstGrid',
        text         : 'Exportar',
        action: 'exportXls',
        defaultAlign : 'right',
        cls          : 'x-btn-default-small',
        //iconCls : 'button-back',
        style:{
            background: '#1fbad6',
            border: '1px solid #fff',  
        },
    },
    {
        xtype: 'label',
        id: controller + 'SummaryLabelSecondGrid'
    },
    '->',
    {
        xtype        : 'button',
        id : controller + 'BackToFirstGrid',
        text         : 'Volver a Recursos',
        defaultAlign : 'right',
        cls          : 'x-btn-default-small',
        iconCls : 'button-back',
    },
];
moduleConfig.subgrid[0].contextualMenu = [];
moduleConfig.subgrid[0].tooltip = true;
moduleConfig.subgrid[0].tooltipField = 'name';
moduleConfig.subgrid[0].checkboxIndex = 0;
moduleConfig.subgrid[0].idField = '_id';
moduleConfig.subgrid[0].columns = [
    {
        text: 'Nro',
        width: 40,
        xtype: 'rownumberer',
        align: 'center',
    },
    {
        text      : 'Código',
        dataIndex : 'code',
        width     : 120,
        //align     : 'left',
        sortable  : true,
        autoSizeColumn: true,
    },
    {
      text      : 'Tipo',
      dataIndex : 'type',
      width     : 100,
      //align     : 'left',
      sortable  : true,
      autoSizeColumn: true,
    },
    {
      text      : 'Estado',
      dataIndex : 'status',
      width     : 100,
      //align     : 'left',
      sortable  : true,
      autoSizeColumn: true,
    },
    {
      text      : 'Dirección',
      dataIndex : 'address',
      //width     : 100,//'15%',
      maxWidth: 320,//'20%', 
      //align     : 'left',
      sortable  : true,
      autoSizeColumn: true,
      renderer : function(val, meta, rec, rowIndex, colIndex, store)
      {
          meta.tdAttr = 'data-qtip="' + val + '"';
          return val;
      }
    },
    {
      text      : 'Hora Incio',
      dataIndex : 'arrival_time',
      width     : 100,
      //align     : 'left',
      sortable  : true,
      autoSizeColumn: true,
      renderer : function(value)
        {
            var hour = value.split(' ');
            
            if(hour.length>1)
                hour[0] = hour[1];

            return hour[0];
        },
    },
    {
      text      : 'Hora Fin',
      dataIndex : 'finish_time',
      width     : 100,
      //align     : 'left',
      sortable  : true,
      autoSizeColumn: true,
      renderer : function(value)
        {
            var hour = value.split(' ');
            
            if(hour.length>1)
                hour[0] = hour[1];

            return hour[0];
        },
    },
    {
      text      : 'Duración',
      dataIndex : 'duration',
      width     : 100,
      //align     : 'left',
      sortable  : true,
      autoSizeColumn: true,
    },
    {
      text      : 'Peso',
      dataIndex : 'loadAmount',
      width     : 100,
      //align     : 'left',
      sortable  : true,
      autoSizeColumn: true,
    },
    
    {
        text      : 'Hora CheckIn',
        dataIndex : 'checkin.date',
        align     : 'center',
        sortable  : true,
        autoSizeColumn: true,
        renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
        {
            var date = !Ext.isEmpty(record.data.checkin)? record.data.checkin.date || '' : '';
            var hour = date.split(' ');
            
            if(hour.length>1)
                hour[0] = hour[1];

            return hour[0];
        },
    },
    {
        text      : 'Hora CheckOut',
        dataIndex : 'checkout.date',
        align     : 'center',
        sortable  : true,
        autoSizeColumn: true,
        renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
        {
            var date = !Ext.isEmpty(record.data.checkout)? record.data.checkout.date || '' : '';
            var hour = date.split(' ');
            
            if(hour.length>1)
                hour[0] = hour[1];

            return hour[0];
        },
    }
];
moduleConfig.subgrid[0].store =  controller + '.ListTasks';


////INICIO - Ventana de Edicion de Recursos a Programar

moduleConfig.ViewFormsGroupId         = controller + 'ViewForms';
moduleConfig.ViewFormsTitleWindow = 'Registros';
moduleConfig.ViewFormsWidthWindow     = '40%';
moduleConfig.ViewFormsHeightWindow    = '40%';
moduleConfig.ViewFormsResizableWindow = false;
moduleConfig.ViewFormsModalWindow     = true;
moduleConfig.ViewFormsDraggableWindow = false;
moduleConfig.ViewFormsToolbar         = [
];
moduleConfig.ViewFormsStore           = controller + '.ListRegisters';
moduleConfig.ViewFormsBottomButtons   = [
];
moduleConfig.ViewFormsMenuItem        = [
    {
        text: 'Ver Registro',
        handler:function()
        {
            objController.openWindowRegistersOfTask(arguments[0], arguments[1], this.parentMenu.record);
        },
    }
];
moduleConfig.ViewFormsColumns         = [
  {
      text      : 'Fecha',
      width     : '30%',
      dataIndex : 'updated_at'
  },
  {
      text      : 'Formulario',
      width     : '35%',
      dataIndex : 'formName',
        sortable  : false,
      /*renderer  : function(value, metaData, record, rowIndex, colIndex, store, view) 
      {
          var allData =  record.data;
          return allData.data.id_form;
      }*/
  },
  {
      text      : 'Nro de Secciones',
      width     : '17%',
      dataIndex : 'number_sections'
  },
  {
      text      : 'Nro Respuestas sin responder',
      width     : '17%',
      dataIndex : 'answers_not'
  },
];
////FIN - Ventana de Edicion de Recursos a Programar

////INICIO - Ventana que muestra registro específico de una tarea y formulario
moduleConfig.ViewFormRecordGroupId = controller + 'ViewFormRecord';
moduleConfig.ViewFormRecordTitleWindow = 'Registro';
moduleConfig.ViewFormRecordWidthWindow = '50%';
moduleConfig.ViewFormRecordHeightWindow = '70%';
moduleConfig.ViewFormRecordResizableWindow = false; 
moduleConfig.ViewFormRecordModalWindow = true;
moduleConfig.ViewFormRecordDraggableWindow = false;
////FIN - Ventana que muestra registro específico de una tarea y formulario

////INICIO - PopUps Windows Google Street View
moduleConfig.PopUpStreetViewgroupId = controller + 'PopUpStreetView';
moduleConfig.PopUpStreetViewTitleWindow = 'Google Street View';
moduleConfig.PopUpStreetViewWidthWindow = 500;//'35%';
moduleConfig.PopUpStreetViewHeightWindow = 400;//'50%';
moduleConfig.PopUpStreetViewResizableWindow = false;
moduleConfig.PopUpStreetViewModalWindow = false;
moduleConfig.PopUpStreetViewDraggableWindow = true;
moduleConfig.PopUpStreetViewToolbar = [];
moduleConfig.PopUpStreetViewItemsForm = [
    {
        xtype: 'container',
        layout:{
            type:'column'
        },
        defaults:{
            columnWidth: 0.99,
            labelWidth        : 120,
            labelAlign        : 'right',
            disabled: true,
        },
        items:[
            {
                xtype             : 'textfield',
                fieldLabel        : 'translateplanningtracking.marker.code',
                id                : 'PopUpTaskFormCode',
                name              : 'code',
                emptyText         : 'translateplanningtracking.marker.code',
            }
        ]
    },
];

moduleConfig.PopUpStreetViewBottomButtons = [
    {
        text      : 'translateplanningtracking.form.close',
        iconCls   : 'close-button',
        listeners:{
            click: function()
            {
                //Cerramos el PopUpWindow
                Ext.getCmp(moduleConfig.PopUpStreetViewgroupId).destroy();
            },
        }
    }
];
////FIN - PopUps Windows Google Street View