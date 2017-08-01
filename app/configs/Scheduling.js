var moduleConfig = new Object();
moduleConfig.appName = 'application';
//moduleConfig.listPageSize = 3;
moduleConfig.theme = 'gray';
moduleConfig.template = 'FormGridGrid';
moduleConfig.lateralPanel = 'left';
moduleConfig.serviceUrl = 'temptable.php'; 
moduleConfig.serviceUrlCombo = 'columnas.php';
moduleConfig.serviceMapList = controller.toLowerCase() + '@index';
moduleConfig.serviceAuditUpdate = controller.toLowerCase() + '@update';
moduleConfig.serviceAuditStore = controller.toLowerCase() + '@store';
moduleConfig.serviceAuditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.serviceExport = controller.toLowerCase() + '@excel';
moduleConfig.exportFilter = '';

//Colores generales
moduleConfig.arrColor = arrListColor;

//Servicios
var storageIdCompany = window.localStorage.getItem('id_company');
moduleConfig.services = new Object();
moduleConfig.services.listResourceUrl = strURL + '/resourceinstances?relations=["resourceGroups"]';
moduleConfig.services.comboDeviceTypeUrl = strURL +'/resourcedefinitions';
moduleConfig.services.comboDeviceGroupUrl = strURL +'/resourcegroups';
moduleConfig.services.comboFormUrl = strURL +'/forms';
moduleConfig.services.listTemporalVisitUrl = strURL + '/scheduling/temporalorders';
moduleConfig.services.urlAddressGeocoding = strURL + '/addresses/validate';
moduleConfig.services.listResourceTasksUrl = strURL + '/scheduling/temporalroutes';
moduleConfig.services.schedulingProcesses = strURL + '/scheduling/processes';
moduleConfig.services.urlTemporalTasks = strURL + '/scheduling/temporaltasks';
moduleConfig.services.urlCompanies = strURL + '/companies';

//Iconos para el mapa
moduleConfig.map = {};
moduleConfig.map.icons = {};
moduleConfig.map.icons.dropoffPendiente='images/icon/markers/1.png';
moduleConfig.map.icons.dropoffEntregando='images/icon/markers/2.png';
moduleConfig.map.icons.dropoffEntregaExitosa='images/icon/markers/3.png';
moduleConfig.map.icons.dropoffEntregaFallida='images/icon/markers/4.png';
moduleConfig.map.icons.pickupPendiente='images/icon/markers/1.png';
moduleConfig.map.icons.pickupEntregando='images/icon/markers/2.png';
moduleConfig.map.icons.pickupEntregaExitosa='images/icon/markers/3.png';
moduleConfig.map.icons.pickupEntregaFallida='images/icon/markers/4.png';
moduleConfig.map.icons.inicioPendiente='images/icon/markers/1.png';
moduleConfig.map.icons.inicioEntregando='images/icon/markers/2.png';
moduleConfig.map.icons.inicioEntregaExitosa='images/icon/markers/3.png';
moduleConfig.map.icons.inicioEntregaFallida='images/icon/markers/4.png';
moduleConfig.map.icons.finPendiente='images/icon/markers/1.png';
moduleConfig.map.icons.finEntregando='images/icon/markers/2.png';
moduleConfig.map.icons.finEntregaExitosa='images/icon/markers/3.png';
moduleConfig.map.icons.finEntregaFallida='images/icon/markers/4.png';
moduleConfig.map.icons.resource='images/icon/markers/resource.png';

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


/*
* Formulario inicial de Programacion.
*/

moduleConfig.subform = [];
moduleConfig.subform[0] = new Object();
moduleConfig.subform[0].title = '';//scheduling.form.title;
moduleConfig.subform[0].border = false;
moduleConfig.subform[0].bodyPadding = 2;
moduleConfig.subform[0].bottomButtons = [];
moduleConfig.subform[0].items = [
  {
        xtype      : 'container',
        margin: '0 0 0 0',
        padding: '0 0 0 0',
        columnWidth: 1,
        items : [
            {    
                xtype: 'panel',
                title: scheduling.form.title,
                layout: 'fit',
                border: true,
                tools: [
                    {
                        xtype     : 'button',
                        //text      : scheduling.form.configureButton,
                        margin    : '0 0 0 0',
                        padding    : '0 0 0 0',
                        iconCls   : 'icon-confg',
                        scale     : 'small',
                        id        : controller + 'Configure',
                        iconAlign : 'top',
                        tooltip: 'Configurar Carga',
                    },
                ],
                items:[
                    {
                        xtype:'toolbar',
                        ui: 'footer',
                        //defaultButtonUI: 'footer',
                        flex:1,
                        defaults:{
                            msgTarget   : 'side',
                        },
                        items:[
                            {
                                xtype       : 'datefield',
                                name        : 'targetDate',
                                fieldLabel  : scheduling.form.targetDate,
                                labelWidth  : 50,
                                labelAlign  : 'left',
                                width       : 170,
                                //msgTarget   : 'side',
                                margin      : '5 10 0 0',
                                value: Ext.Date.add(new Date(), Ext.Date.DAY, 1),
                                minValue: new Date(),//Ext.Date.add(new Date(), Ext.Date.DAY, 1),
                                allowBlank  : false,
                                submitFormat: 'Y-m-d H:i:s',
                            },
                            {
                                xtype       : 'filefield',
                                name        : 'file',
                                //fieldLabel  : scheduling.form.file,
                                labelWidth  : 50,
                                labelAlign  : 'left',
                                width       : 230,
                                //msgTarget   : 'side',
                                margin      : '5 10 0 0',
                                allowBlank  : false,
                                buttonText  : scheduling.form.file,
                                regex: /^.*\.(csv|CSV)$/,
                                regexText: 'Sólo archivos CSV permitidos',
                                buttonConfig:{
                                    style:{
                                        background: '#1fbad6 !important',
                                        border: '1px solid #fff',  
                                    },
                                },
                            },
                            '-',
                            {
                                xtype        : 'combo',
                                fieldLabel   : scheduling.form.resourceType,
                                labelWidth   :  70,
                                labelAlign   : 'left',
                                width        : 180,
                                margin       : '0 17 0 0',
                                allowBlank  : false,
                                id           : controller + 'ResourceType',
                                displayField : 'name',
                                valueField   : '_id',
                                editable     : false,
                                multiSelect  : true,
                                store        : controller + '.ComboResourcesType',
                                name         : 'resourceDefinitions',
                            },
                            {
                                xtype        : 'combo',
                                fieldLabel   : scheduling.form.resourceGroup,
                                labelWidth   :  90,
                                labelAlign   : 'left',
                                width        : 180,
                                margin       : '0 17 0 0',
                                //allowBlank  : false,
                                id           : controller + 'ResourceGroup',
                                displayField : 'name',
                                valueField   : '_id',
                                editable     : false,
                                multiSelect  : true,
                                store        : controller + '.ComboResourcesGroup',
                                name         : 'resourceGroups',
                            },
                            {
                                xtype        : 'combo',
                                fieldLabel   : scheduling.form.resourceForm,
                                labelWidth   :  70,
                                labelAlign   : 'left',
                                width        : 200,
                                margin       : '0 17 0 0',
                                allowBlank  : false,
                                cls          : '',
                                id           : controller + 'Form',
                                displayField : 'name',
                                valueField   : '_id',
                                editable     : false,
                                multiSelect  : true,
                                store        : controller + '.ComboForms',
                                name         : 'forms',
                            },
                            {
                                xtype  : 'button',
                                //text   : scheduling.form.resourceEdit,
                                //width  : 100,
                                id     : controller + 'EditResourcesToSchedule',
                                margin : '5 10 0 0',
                                scale  : 'medium',
                                iconCls   : 'icon-excluir',
                                tooltip: 'Incluir/Excluir Recursos',
                                style:{
                                    background: '#1fbad6',
                                    border: '1px solid #fff',  
                                }
                            },
                            '-',
                            //'->',
                            {
                                xtype  : 'button',
                                text   : scheduling.form.upload,
                                id     : 'IdSchedulingForm0LoadFile',
                                margin : '5 10 0 0',
                                scale  : 'large',
                                width: '10%',
                                style:{
                                    background: '#1fbad6',
                                    border: '1px solid #fff',  
                                },
                            },
                        ]
                    },
                ]                
            }
        ]
    },
];

/*
* Formulario inicial de Programacion.
*/

/*
* Inicia Ventana de Edicion de Recursos a Programar
*/

moduleConfig.groupIdResourcesToSchedule         = controller + 'ResourcesToSchedule';
moduleConfig.titleWindowResourcesToSchedule     = scheduling.form.resourceSelect.title;
moduleConfig.widthWindowResourcesToSchedule     = '50%';
moduleConfig.heightWindowResourcesToSchedule    = '50%';
moduleConfig.resizableWindowResourcesToSchedule = false;
moduleConfig.modalWindowResourcesToSchedule     = true;
moduleConfig.draggableWindowResourcesToSchedule = false;
moduleConfig.toolbarResourcesToSchedule         = [
    {
        xtype : 'label',
        text  : scheduling.form.resourceSelect.search,
        align   : 'left',
        width: 40,
    },{
        xtype           : 'textfield',
        id              : controller + 'ResourcesToScheduleFilterSearch',
        emptyText       : scheduling.form.resourceSelect.searchEmpty,
        enableKeyEvents : true,
        margin          : '5 5 5 5',
        width           : '30%',
        columnWidth     : 1,
    },{
        xtype     : 'button',
        iconCls   : 'cancel-button',
        tooltip   : scheduling.form.resourceSelect.searchCancelTooltip,
        fieldName : controller + 'ResourcesToScheduleFilterSearch',
        id        : controller + 'ResourcesToScheduleFilterSearchClear',
        cls       : 'x-btn-default-small',
        action    : 'clearFilter',
    },{
        text : scheduling.form.resourceSelect.excludeView, 
        id   : controller + 'ResourceToScheduleFilterExcludeView',
        //enableToggle: true
    },{
        text : scheduling.form.resourceSelect.includeView,
        id   : controller + 'ResourceToScheduleFilterIncludeView',
        //enableToggle: true
    },{
        text : scheduling.form.resourceSelect.exclude,
        id   : controller + 'ResourceToScheduleFilterExclude'
    },{
        text : scheduling.form.resourceSelect.include,
        id   : controller + 'ResourceToScheduleFilterInclude'
    }
];

moduleConfig.storeResourcesToSchedule           = controller + '.ListResource';
moduleConfig.bottomButtonsResourcesToSchedule   = [
    {
        text : scheduling.form.resourceSelect.close,
        id   : controller + 'ResourceToScheduleClose'
    },
    {
        text : scheduling.form.resourceSelect.save,
        id   : controller + 'ResourceToScheduleSave'
    }
];
moduleConfig.menuItemResourcesToSchedule        = [];
moduleConfig.columnsResourcesToSchedule         = [
  {
      text      : scheduling.form.resourceSelect.columns.name,
      width     : '18%',
      dataIndex : 'login'
  },
  {
      text      : scheduling.form.resourceSelect.columns.group,
      width     : '49%',
      dataIndex : 'group'
  },
  {
      text      : scheduling.form.resourceSelect.columns.status,
      width     : '28%',
      dataIndex : '_id',
      sortable  : false,
      renderer  : function(value, metaData, record, rowIndex, colIndex, store, view) 
      {
          var bResourceExcluded = objController.arrResourcesExcluded.indexOf(value) != -1;
          var radios = [
              "<input type='radio' onclick='objController.onGridResourceCheck(this);' name = "+record.data._id+" value = 'exclude' " + (bResourceExcluded ? "checked='checked'" : "") + ">Excluye<br>",
              "<input type='radio' onclick='objController.onGridResourceCheck(this);' name = "+record.data._id+" value = 'include' " + (!bResourceExcluded ? "checked='checked'" : "") + ">Incluye<br>",
          ].join('');
          
          return radios;
      }
  }
];
/*
* Finaliza Ventana de Edicion de Recursos a Programar
*/


/*
* Inicia Ventana Ver Tareas No Programadas
*/

moduleConfig.ViewTaskNoProgrammingGroupId         = controller + 'ViewTaskNoProgramming';
moduleConfig.ViewTaskNoProgrammingTitleWindow     = 'Tareas NO Programadas';//scheduling.form.resourceSelect.title;
moduleConfig.ViewTaskNoProgrammingWidthWindow     = '50%';
moduleConfig.ViewTaskNoProgrammingHeightWindow    = '50%';
moduleConfig.ViewTaskNoProgrammingResizableWindow = false;
moduleConfig.ViewTaskNoProgrammingModalWindow     = true;
moduleConfig.ViewTaskNoProgrammingDraggableWindow = false;
moduleConfig.ViewTaskNoProgrammingStore           = controller + '.ListTemporalTasks';
moduleConfig.ViewTaskNoProgrammingMenuItem        = [];
moduleConfig.ViewTaskNoProgrammingColumns         = [
  {
      text      : 'Nombre',//scheduling.form.resourceSelect.columns.name,
      width     : '20%',
      dataIndex : 'name'
  },
  {
      text      : 'Prioridad',//scheduling.form.resourceSelect.columns.group,
      width     : '20%',
      dataIndex : 'priority'
  },
  {
      text      : 'Dirección',//scheduling.form.resourceSelect.columns.status,
      width     : '30%',
      dataIndex : 'address',
      sortable  : false,
      /*renderer  : function(value, metaData, record, rowIndex, colIndex, store, view) 
      {
          var bResourceExcluded = objController.arrResourcesExcluded.indexOf(value) != -1;
          var radios = [
              "<input type='radio' onclick='objController.onGridResourceCheck(this);' name = "+record.data._id+" value = 'exclude' " + (bResourceExcluded ? "checked='checked'" : "") + ">Excluye<br>",
              "<input type='radio' onclick='objController.onGridResourceCheck(this);' name = "+record.data._id+" value = 'include' " + (!bResourceExcluded ? "checked='checked'" : "") + ">Incluye<br>",
          ].join('');
          
          return radios;
      }*/
  },
  {
      text      : 'Restricciones',//scheduling.form.resourceSelect.columns.group,
      width     : '30%',
      dataIndex : 'msgStatus'
  }
];
/*
* Finaliza Ventana Ver Tareas No Programadas
*/

/*
* Inicia Lista de Visitas Temporales
*/
moduleConfig.subgrid = [];
moduleConfig.subgrid[0] = new Object();
moduleConfig.subgrid[0].title = '';
moduleConfig.subgrid[0].searchField = false;
moduleConfig.subgrid[0].searchTitle = 'Búsqueda';
moduleConfig.subgrid[0].searchId = 'listSearchKeyword';
moduleConfig.subgrid[0].pageSize = 15;
moduleConfig.subgrid[0].topButtons = [];
moduleConfig.subgrid[0].bottomButtons = [];
moduleConfig.subgrid[0].pagingToolbarItems = [{
     xtype        : 'button',
     id : controller + 'LoadFileError',
     text         : 'Descargar Errores',
     defaultAlign : 'right',
     action       : 'exportXls',
     cls          : 'x-btn-default-small'
},{
    xtype  : 'button',
    id     : controller + 'DownloadExample',  
    text   : scheduling.form.downloadExample,
    defaultAlign : 'right',
    action       : 'exportExample',
    cls          : 'x-btn-default-small',
    style:{
        background: '#1fbad6 !important',
        border: '1px solid #fff',  
    },
},
    {
        xtype: 'label',
        id: controller + 'LengthResourcesLabel',
        //text: 'Cantidad de Recursos:'
    },
];
moduleConfig.subgrid[0].contextualMenu = [];
moduleConfig.subgrid[0].tooltip = true;
moduleConfig.subgrid[0].tooltipField = 'name';
moduleConfig.subgrid[0].checkboxIndex = 0;
moduleConfig.subgrid[0].idField = '_id';
moduleConfig.subgrid[0].columns = [
    {
      dataIndex : 'numberLine',
      width :'40',
      text  : '#',
      align: 'center',
    },
    {
        text      : scheduling.listTemporalTask.columns.error,
        dataIndex : 'error',
        width     : 60,
        align     : 'left',
        sortable  : true,
        renderer : function(val){
            if(val){
              return 'SI';
            }
            return 'NO';
        }
    },
    {
        text      : scheduling.listTemporalTask.columns.visit,
        dataIndex : 'name',
        width     : 100,
        align     : 'left',
        sortable  : true
    },
    {
        text      : scheduling.listTemporalTask.columns.loadAmount,
        dataIndex : 'loadAmount',
        width     : 80,
        align     : 'left',
        sortable  : true
    },
    {
        text      : scheduling.listTemporalTask.columns.priority,
        dataIndex : 'priority',
        width     : 80,
        align     : 'left',
        sortable  : true
    },
    {
      text      : scheduling.listTemporalTask.columns.distance,
      width     : 70,
      dataIndex : 'distance',
      align     : 'left',
      sortable  : true
    },
    {
      text      : scheduling.listTemporalTask.columns.restriction,
      width     : 70,
      dataIndex : 'restriction',
      align     : 'left',
      sortable  : true
    },
    {
      text      : scheduling.listTemporalTask.columns.trackId,
      width     : 70,
      dataIndex : 'code',
      align     : 'left',
      sortable  : true
    },
    {
        text: 'Recogida',
        columns: [
            {
                text: scheduling.listTemporalTask.columns.address,
                dataIndex : 'pickup.address',
                width     : 70,
                align     : 'left',
                sortable  : true,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
                {
                    var objData = record.data;
                    
                    return objData.pickup.address;
                }
            },
            {
                text: scheduling.listTemporalTask.columns.address_fixed,
                dataIndex : 'pickup.address_fixed',
                width     : 70,
                align     : 'left',
                sortable  : true,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
                {
                    var objData = record.data;
                    
                    return objData.pickup.address_fixed;
                }
            },
            {
                text: scheduling.listTemporalTask.columns.duration,
				dataIndex : 'pickup.duration',
                width     : 70,
                align     : 'left',
                sortable  : true,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
                {
                    var objData = record.data;                    
                    return objData.pickup.duration;
                }
            },  
            {
                text: scheduling.listTemporalTask.columns.startHour,
				dataIndex : 'pickup.start',
                width     : 70,
                align     : 'left',
                sortable  : true,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
                {
                    var objData = record.data;                    
                    return objData.pickup.start;
                }
            },
            {
                text: scheduling.listTemporalTask.columns.endHour,
				dataIndex : 'pickup.end',
                width     : 70,
                align     : 'left',
                sortable  : true,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
                {
                    var objData = record.data;                    
                    return objData.pickup.end;
                }
            },  
        ]
    },
    {
        text: 'Entrega',
        columns: [
            {
                text: scheduling.listTemporalTask.columns.address,
                dataIndex : 'dropoff.address',
                width     : 70,
                align     : 'left',
                sortable  : true,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
                {
                    var objData = record.data;
                    return objData.dropoff.address;
                }
            },
            {
                text: scheduling.listTemporalTask.columns.address_fixed,
                dataIndex : 'dropoff.address_fixed',
                width     : 70,
                align     : 'left',
                sortable  : true,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
                {
                    var objData = record.data;
                    return objData.dropoff.address_fixed;
                }
            },
            {
                text: scheduling.listTemporalTask.columns.duration,
				dataIndex : 'dropoff.duration',
                width     : 70,
                align     : 'left',
                sortable  : true,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
                {
                    var objData = record.data;                    
                    return objData.dropoff.duration;
                }
            },  
            {
                text: scheduling.listTemporalTask.columns.startHour,
				dataIndex : 'dropoff.start',
                width     : 70,
                align     : 'left',
                sortable  : true,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
                {
                    var objData = record.data;                    
                    return objData.dropoff.start;
                }
            },
            {
                text: scheduling.listTemporalTask.columns.endHour,
				dataIndex : 'dropoff.end',
                width     : 70,
                align     : 'left',
                sortable  : true,
                renderer : function(value, metaData, record, rowIndex, colIndex, store, view) 
                {
                    var objData = record.data;                    
                    return objData.dropoff.end;
                }
            },  
        ]
    },
    {
      text      : scheduling.listTemporalTask.columns.general,
      width     : 70,
      align     : 'left',
      sortable  : true
    }
];
moduleConfig.subgrid[0].store =  controller + '.ListTemporalVisit';

/*
* Finaliza Lista de Visitas Temporales
*/

/*
* Inicia Ventana de Configuracion
*/
moduleConfig.groupIdConfigure         = controller + 'Configure';
moduleConfig.titleWindowConfigure     = scheduling.form.configure.title;
moduleConfig.widthWindowConfigure     = '50%';
moduleConfig.heightWindowConfigure    = '86%';
moduleConfig.resizableWindowConfigure = false;
moduleConfig.bottomButtonsConfigure   = [
    {
        text : scheduling.form.configure.close,
        id   : controller + 'ConfigureClose'
    },
    {
        text : scheduling.form.configure.save,
        id   : controller + 'ConfigureSave',
        formBind: true
    }
];

moduleConfig.storeConfigureStatusProperties = controller+'.ListConfigureStatusProperties';

//// MAPA TAB
var mapTabScheduling = new OpenLayers.Map({
    tranitionEffect: 'resize',
    numZoomLevels: 18,
    projection: new OpenLayers.Projection("EPSG:900913"),
    displayProjection: new OpenLayers.Projection("EPSG:4326"),
    units: 'm',
    allOverlays: false
});

mapTabScheduling.addControl(
    new OpenLayers.Control.MousePosition({
        prefix: 'Coords: ',
        separator: ' | ',
        numDigits: 2,
        emptyString: 'Mouse not over map'
    })
);

var objLayerBase1 = new OpenLayers.Layer.Google(
    "GoogleMap",
    {
        numZoomLevels: 20,
        visibility: false,
        isBaseLayer: true
    }
);

var objLayerPaint1 = new OpenLayers.Layer.Vector('PaintMap');

mapTabScheduling.addLayers([objLayerBase1, objLayerPaint1]);

mapTabScheduling.events.register(
    'move',
    mapTabScheduling,
    function()
    {
        var objPoint = mapTabScheduling.getCenter();
        objPoint['lng'] = objPoint.lon;
        //console.log('Inicial:', objPoint);
        //Movemos el punto en el mapa
        objController.addPoint('IniEndPointMap', './images/icon/markers/3.png', [objPoint], true);
    }
);
//// FIN MAPA TAB

moduleConfig.itemsConfigure = [
    {
        tabConfig : {
            title   : scheduling.form.configure.tabs.format.title,
            tooltip : scheduling.form.configure.tabs.format.tooltip
        },
        title   : scheduling.form.configure.tabs.format.title,
        id: controller + 'ConfigureFormFormatLoad',
        xtype   : 'form',
        width   : '100%',
        height  : '100%',
        layout  :'anchor',
        items   : [
            {
                xtype       : 'fieldcontainer',
                fieldLabel  : scheduling.form.configure.tabs.planning.withHeaders,
                defaultType : 'radiofield',
                allowBlank : false,
                layout      : 'hbox',
                items       : [
                    {
                        boxLabel  : scheduling.yes,
                        name      : 'withHeaders',
                        inputValue: true,
                        id        : controller + 'WithHeadersYes'
                    }, {
                        boxLabel  : scheduling.no,
                        name      : 'withHeaders',
                        inputValue: false,
                        id        : controller + 'WithHeadersNo'
                    }
                ],
            },
            {
                xtype         : 'combo',
                fieldLabel    : scheduling.form.configure.tabs.format.separator,
                id: controller + 'ConfigureFormFormatLoadSeparator',
                width         : 300,
                labelWidth: 100,
                labelAlign: 'left',
                valuedField   : '_id',
                displayField  : 'name',
                name: 'delimiter',
                allowBlank:  false,
                queryMode: 'local',
                value: 'Coma',
                store         : Ext.create('Ext.data.Store', {
                    fields : ['_id', 'name'],
                    data   : [
                        {"_id" : "\t",  "name" : 'Tabulador'},
                        {"_id" : ",",  "name" : 'Coma'},
                        {"_id" : ";", "name" : 'Punto y coma'},
                        {"_id" : " ",  "name" : 'Espacio'}
                    ]
                })
            },
            {
                xtype         : 'combo',
                fieldLabel    : scheduling.form.configure.tabs.format.textDelimiter,
                id: controller + 'ConfigureFormFormatLoadDelimiter',
                width         : 300,
                valuedField   : '_id',
                displayField  : 'name',
                name: 'enclosure',
                allowBlank:  false,
                queryMode: 'local',
                value: 'Comillas Dobles ("")',
                store         : Ext.create('Ext.data.Store', {
                    fields : ['_id', 'name'],
                    data   : [
                        {"_id" : '"',   "name" : 'Comillas Dobles ("")'},
                        {"_id" : "'",   "name" : "Comillas Simples ('')"}
                    ]
                })
            },
            {
                xtype         : 'combo',
                fieldLabel    : scheduling.form.configure.tabs.format.encoding,
                id: controller + 'ConfigureFormFormatLoadEncoding',
                width         : 300,
                valuedField   : '_id',
                displayField  : 'name',
                name: 'encoding',
                allowBlank:  false,
                queryMode: 'local',
                value: 'Unicode UTF-8',
                store         : Ext.create('Ext.data.Store', {
                    fields : ['_id', 'name'],
                    data   : [
                        {"_id" : "UTF-8",        "name" : 'Unicode UTF-8'},
                        {"_id" : "Windows-1252", "name" : 'Europa occidental (Windows-1252/WinLatin 1)'}
                    ]
                })
            },
            {
                xtype        : 'combo',
                fieldLabel   : scheduling.form.configure.tabs.format.hourFormat,
                id: controller + 'ConfigureFormFormatLoadHourFormat',
                width        : 300,
                valuedField  : '_id',
                displayField : 'name',
                name: 'formatHour',
                allowBlank:  false,
                value: '21:30',
                queryMode: 'local',
                store        : Ext.create('Ext.data.Store', {
                    fields : ['_id', 'name'],
                    data   : [
                        {"_id" : "hh:mm",          "name" : '21:30'},
                        {"_id" : "hh:mm:ss",       "name" : '21:30:15'},
                        {"_id" : "hh:mm am/pm",    "name" : '11:37 AM/PM'},
                        {"_id" : "hh:mm:ss am/pm", "name" : "11:37:12 AM/PM"}
                    ]
                })

            },
            {
                xtype        : 'combo',
                fieldLabel   : scheduling.form.configure.tabs.format.dateFormat,
                id: controller + 'ConfigureFormFormatLoadDateFormat',
                width        : 300,
                valuedField  : '_id',
                displayField : 'name',
                name: 'formatDate',
                allowBlank:  false,
                value: "YYYY-MM-DD",
                queryMode: 'local',
                store        : Ext.create('Ext.data.Store', {
                    fields : ['_id', 'name'],
                    data   : [
                        {"_id" : "YYYY-MM-DD",          "name" : 'YYYY-MM-DD'},
                    ]
                })

            }
        ]
    }, 
    {
        tabConfig : {
            title   : scheduling.form.configure.tabs.planning.title,
            tooltip : scheduling.form.configure.tabs.planning.tooltip
        },
        xtype  : 'form',
        id: controller + 'ConfigureFormPlanning',
        width  : '100%',
        height : '100%',
        layout : 'anchor',
        items  : [
        {
            xtype       : 'fieldcontainer',
            fieldLabel  : scheduling.form.configure.tabs.planning.minimumResource,
            defaultType : 'radiofield',
            allowBlank : false,
            layout      : 'hbox',
            items       : [
                {
                    boxLabel  : scheduling.yes,
                    name      : 'minVehicule',
                    inputValue: true,
                    id        : controller + 'MinimumResourceYes'
                }, {
                    boxLabel  : scheduling.no,
                    name      : 'minVehicule',
                    inputValue: false,
                    id        : controller + 'MinimumResourceNo'
                }
            ],
        },{
            xtype       : 'numberfield',
            fieldLabel  : scheduling.form.configure.tabs.planning.minimumVisits,
            id: controller + 'ConfigureFormPlanningMinVisitsPerVehicle',
            name: 'minVisitsPerVehicle',
            allowBlank:  false,
            value: 10,
        },{
            xtype         : 'combo',
            fieldLabel    : scheduling.form.configure.tabs.planning.traffic,
            id: controller + 'ConfigureFormPlanningTraffic',
            name: 'traffic',
            allowBlank:  false,
            value: 'Normal',
            displayField  : 'name',
            valueField    : '_id',
            store         : Ext.create('Ext.data.Store', {
                fields : ['_id', 'name'],
                data   : [
                    {_id: 'normal', name: 'Rápido'},
                    {_id: 'slow', name: 'Normal'},
                    {_id: 'very slow', name: 'Lento'},

                ]
            })
        },{
            xtype       : 'fieldcontainer',
            fieldLabel  : scheduling.form.configure.tabs.planning.shortDistance,
            defaultType : 'radiofield',
            allowBlank : false,
            layout      : 'hbox',
            items       : [
                {
                    boxLabel  : scheduling.yes,
                    name      : 'shortestDistance',
                    inputValue: true,
                    id        : controller + 'ShortDistanceYes'
                }, {
                    boxLabel  : scheduling.no,
                    name      : 'shortestDistance',
                    inputValue: false,
                    id        : controller + 'ShortDistanceNo'
                }
            ]
        },{
            xtype       : 'fieldcontainer',
            fieldLabel  : scheduling.form.configure.tabs.planning.resourceBalancer,
            defaultType : 'radiofield',
            layout      : 'hbox',
            items: [
                {
                    boxLabel  : scheduling.yes,
                    name      : 'balance',
                    inputValue: true,
                    id        : controller + 'ResourceBalancerYes'
                }, {
                    boxLabel  : scheduling.no,
                    name      : 'balance',
                    inputValue: false,
                    id        : controller + 'ResourceBalancerNo'
                }
            ]
        }]
    },
    {
      tabConfig : {
          title   : scheduling.form.configure.tabs.states.title,
          tooltip : scheduling.form.configure.tabs.states.tooltip
      },
      xtype  : 'form',
      width  : '100%',
      height : '100%',
      layout :'anchor',
      items: [
        {
            xtype        : 'combo',
            fieldLabel   : scheduling.form.configure.tabs.states.status,
            labelWidth   :  70,
            labelAlign   : 'left',
            width        : 200,
            //margin          : '0 17 0 0',
            id           : controller + 'ConfigureStatus',
            displayField : 'name',
            valueField   : '_id',
            store        : Ext.create('Ext.data.Store', {
                fields : ['_id', 'name'],
                data   : [
                    {"_id" : "PENDIENTE",         "name" : 'Pendiente'},
                    {"_id" : "CHECKIN",         "name" : 'CheckIn'},
                    {"_id" : "CHECKOUT CON FORMULARIO",          "name" : 'Checkout con Formulario'},
                    {"_id" : "CHECKOUT SIN FORMULARIO",   "name" : 'Checkout sin Formulario'},
                    {"_id" : "CHECKOUT PENDIENTE", "name" : 'Checkout Pendiente'},
                ]
            })
        },
        {
            xtype       : 'fieldset',
            columnWidth : 0.5,
            title       : scheduling.form.configure.tabs.states.properties,
            collapsible : false,
            defaults    : {anchor: '100%'},
            layout      : 'anchor',
            items       : [
            {
                xtype       : 'checkbox',
                id: controller + 'ConfigureTakeWithPhoto',
                fieldLabel  : scheduling.form.configure.tabs.states.takePhoto,
                labelWidth  : 100,
                name        : 'withPhoto'
            },
            {
                xtype       : 'fieldset',
                columnWidth : 0.5,
                title       : 'Tipos de Dispositivos',
                collapsible : false,
                defaults    : {anchor: '100%'},
                layout      : 'anchor',
                items:[
                    {
                        xtype       : 'checkbox',
                        id: controller + 'ConfigureTypeWeb',
                        fieldLabel  : 'WEB',
                        labelWidth  : 50,
                        name        : 'web'
                    },
                    {
                        xtype       : 'checkbox',
                        id: controller + 'ConfigureTypeMovil',
                        fieldLabel  : scheduling.form.configure.tabs.states.mobile,
                        labelWidth  : 50,
                        name        : 'movil'
                    },
                ],
            },
            {
                xtype   : 'button',
                text    : translate.global.cancel,
                anchor  : '30%',
                id      : moduleConfig.groupIdConfigure + 'CancelStatusProperties',
                action  : moduleConfig.groupIdConfigure + 'CancelStatusProperties',
                iconCls : 'close-button',
                margin : '5 5 5 5',
            },
            {
                xtype   : 'button',
                text    : translate.global.add,
                anchor  : '30%',
                id      : moduleConfig.groupIdConfigure + 'AddStatusProperties',
                action  : moduleConfig.groupIdConfigure + 'AddStatusProperties',
                iconCls : 'add-button',
                margin : '5 5 5 5',
            },
            {
                xtype   : 'grid',
              //  anchor      : '100% 20%',
                height  : 200,
                id      : moduleConfig.groupIdConfigure + 'PropertiesGrid',
                store   : (moduleConfig.storeConfigureStatusProperties) ? moduleConfig.storeConfigureStatusProperties : '',
                plugins : [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit : 1
                    })
                ],
                border  : false,
                columns : [{
                    text      : scheduling.form.configure.tabs.states.substatus,
                    dataIndex : 'label',
                    width: '25%',
                    //flex      : 1,
                    editor    : {
                        xtype      : 'textfield',
                        allowBlank : false
                    }
                },{
                    text      : scheduling.form.configure.tabs.states.types,
                    dataIndex : 'type',
                    width: '20%',
                    //flex      : 1,
                    renderer: function(value,metaData,record,rowIndex,colIndex,store,view) 
                    {    
                        return value.join(', ');
                    }
                },{
                    text      : scheduling.form.configure.tabs.states.takePhoto,//scheduling.form.configure.tabs.states.action,
                    //substatus : 'substatus',
                    dataIndex: 'withPhoto',
                    width: '20%',
                    renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {
                        /*var radios = [
                            scheduling.form.configure.tabs.states.takePhoto+": "+scheduling.yes+"<input type='radio' name = "+record.data._id+" value = true " + (value ? "checked='checked'" : "") + ">"+
                            scheduling.no+"<input type='radio' name = "+record.data._id+" value = false " + (value ? "checked='checked'" : "") + ">"
                        ].join('');
                        return radios;*/
                        return value? 'Si' : 'No';
                    }
                },{
                    width : 70,
                    xtype : 'actioncolumn',
                    text  : scheduling.form.configure.tabs.states.options,
                    items : [{
                        icon    : 'images/icon/delete.png',
                        tooltip : translate.global.delete,
                        handler: function(grid, rowIndex, colIndex) 
                        {
                            var rec = grid.getStore().getAt(rowIndex);
                            grid.getStore().removeAt(rowIndex);
                        }
                    }]
                }]
            }]
        }
      ]
    },
    {
      tabConfig : {
          title   : scheduling.form.configure.tabs.IniEndPoint.title,
          tooltip : scheduling.form.configure.tabs.IniEndPoint.tooltip
      },
      xtype  : 'panel',
      width  : '100%',
      height : '100%',
      layout: 'border',
      items: [
            {
                width: '100%',
                height: '60%',
                region: 'center',
                id: controller + 'IniEndPointTab',
                layout: {
                    type: 'hbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: 
                [
                    {
                        flex:1,
                        xtype: 'form',
                        id: 'IniEndPointFormEditCreate',
                        defaults:{
                            labelWidth : 100,
                            margin            : '5 5 5 5',
                            msgTarget: 'under',
                            layout: 'anchor',
                        },
                        layout: {
                            type: 'vbox',
                            align : 'stretch',
                            defaultMargins: "2px"
                        },
                        buttonAlign : 'center',
                        items:
                        [
                            {
                                xtype : 'hiddenfield',
                                id    : 'IniEndPointFormId',
                                name  : '_id',
                                value : ''
                            },
                            {
                                xtype             : 'textfield',
                                fieldLabel        : 'Nombre',
                                afterLabelTextTpl : '',
                                id                : 'IniEndPointFormName',
                                name              : 'name',
                                emptyText         : 'Nombre',
                                allowBlank        : false,
                                //width: '100%',
                                //vtype             : 'alphanum',
                                minLengthText     : 5
                            },
                            {
                                xtype: 'toolbar',
                                border: false, 
                                layout: 'hbox',
                                padding: '0 0 0 0',
                                ui: 'footer',
                                items:
                                [
                                    {
                                        xtype             : 'textfield',
                                        fieldLabel        : 'Dirección',
                                        labelWidth : 100,
                                        afterLabelTextTpl : '',
                                        id                : 'IniEndPointFormAddress',
                                        name              : 'address',
                                        emptyText         : 'Dirección',
                                        allowBlank        : false,
                                        //vtype             : 'alphanum',
                                        minLengthText     : 5
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'ok-button',
                                        tooltip: 'Valida la dirección',
                                        id: 'IniEndPointFormAddressValid',
                                        cls: 'x-btn-default-small',
                                    },
                                ]
                            },
                            {
                                xtype          : 'combo',
                                fieldLabel     : 'Tipo Dirección',
                                id             : 'IniEndPointFormTypeAddress',
                                loadingText    : 'Buscando...',
                                emptyText      : 'Tipo de Dirección',
                                typeAhead      : false,
                                forceSelection : true,
                                displayField   : 'name',
                                valueField     : 'id',
                                minChars       : 0,
                                pageSize       : 10,
                                matchFieldWidth: false,
                                triggerAction  : 'all',
                                editable       : false,
                                allowBlank        : false,
                                name: 'type',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['id', 'name'],
                                    data : [
                                        {'id':'start', 'name':'Inicio'},
                                        {'id':'end', 'name':'Fin'},
                                    ]
                                }),
                                listeners: {
                                }
                            },
                            {
                                xtype          : 'combo',
                                fieldLabel     : 'Recurso',
                                id             : 'IniEndPointFormResource',
                                loadingText    : 'Buscando...',
                                emptyText      : 'Tipo de Recurso',
                                typeAhead      : false,
                                forceSelection : true,
                                displayField   : 'name',
                                valueField     : '_id',
                                minChars       : 0,
                                pageSize       : 10,
                                matchFieldWidth: false,
                                triggerAction  : 'all',
                                editable       : false,
                                allowBlank        : false,
                                store          : 'Scheduling.ComboResourcesType',
                                name: 'id_resourceDefinition',
                                listeners: {
                                }
                            },
                            {
                                layout: {
                                    align: 'middle',
                                    pack: 'center',
                                    type: 'hbox'
                                },
                                defaults:{
                                    margin: '5 5 5 5',
                                },
                                items:[
                                    {
                                        xtype: 'button',
                                        id: 'IniEndPointFormCancel',
                                        text: 'Cancelar'
                                    },
                                    {
                                        xtype: 'button',
                                        id: 'IniEndPointFormSave',
                                        text: 'Guardar'
                                    }
                                ]
                            }
                        ], 
                    },
                    {
                        flex:1,
                        items:
                        [
                            {
                                xtype: 'gx_mappanel',
                                id: 'IniEndPointMap',
                                map: mapTabScheduling,
                                center: '-8245896.5752931,515376.39934128',
                                zoom: 12,
                                stateful: true,
                                layout: 'fit',
                                height: 230,
                                margin: '5 5 5 5',
                            }
                        ]
                    },
                ]
            },
            {
                
                xtype: 'panel',
                region: 'south',
                layout: 'fit',
                width: '100%',
                height: '40%',
                border: false,
                items: [
                    {
                        xtype: 'grid',
                        id: 'IniEndPointGrid',
                        store: 'Scheduling.ListStartEnd',
                        columns: [
                            {
                                text      : '_id',
                                dataIndex : '_id',
                                width     : '10%',
                                align     : 'left',
                                hidden    : true,
                                sortable  : true
                            },
                            {
                                text      : 'Recurso',
                                dataIndex : 'id_resourceDefinition',
                                align     : 'left',
                                hidden    : false,
                                sortable  : true,
                                width     : '15%',
                                renderer: function(value, metaData, record)
                                {
                                    var thisCombo = Ext.getCmp('IniEndPointFormResource');
                                    var strValueKey = thisCombo.valueField || thisCombo.displayField;
                                    var objRecord = thisCombo.findRecord(strValueKey, value);

                                    if(!Ext.isEmpty(objRecord)){
                                        value = objRecord.data.name;
                                    }
                                    return value;
                                }
                            },
                            {
                                text      : 'Nombre',
                                dataIndex : 'name',
                                align     : 'left',
                                hidden    : false,
                                sortable  : true,
                                width     : '18%',
                            },
                            {
                                text      : 'Dirección',
                                dataIndex : 'address',
                                align     : 'left',
                                hidden    : false,
                                sortable  : true,
                                width     : '34%',
                            },
                            {
                                text      : 'Tipo',
                                dataIndex : 'type',
                                align     : 'left',
                                hidden    : false,
                                sortable  : true,
                                width     : '15%',
                                renderer: function(value, metaData, record)
                                {
                                    return 'start' == value? 'Inicio' : 'Fin';
                                }
                            },
                            {
                                text: 'Acci&oacute;n',
                                xtype:'actioncolumn',
                                width: '15%',
                                sortable: false,
                                align: 'center',
                                items: [
                                    {
                                        icon: './images/icon/edit.png',
                                        id: 'idActionColumnPtosDespachoEdit',
                                        cls: 'x-btn-default-small',
                                        tooltip: 'Editar',
                                        handler  : function(grid, rowIndex, colIndex, node, e, record, rowNode) {
                                            var action = 'edit';
                                            this.fireEvent('itemclick', this, action, grid, rowIndex, colIndex, record, node);
                                        }
                                    },
                                    {
                                        icon: './images/icon/delete.png',
                                        id:'idActionColumnPtosDespachoDelete',
                                        tooltip: 'Eliminar',
                                        handler  : function(grid, rowIndex, colIndex, node, e, record, rowNode) {
                                            var action = 'delete';
                                            this.fireEvent('itemclick', this, action, grid, rowIndex, colIndex, record, node);
                                        }
                                    }
                                ]
                            },
                        ],
                    },                    
                ],
                /*dockedItems: [
                    {
                        dock: 'bottom',
                        items: [
                            {
                                xtype: 'pagingtoolbar',
                                store: 'Scheduling.ListStartEnd',
                                displayInfo: true,
                                displayMsg: 'Registros {0} - {1} de {2}',
                                emptyMsg: 'No hay información',
                            }
                        ]
                    }
                ],*/
            }
        ]
    },
];

/*
* Finaliza Ventana de Configuracion
*/

/*
* Inicia Mapa Modificacion de Direccion
*/
moduleConfig.submap = [];
moduleConfig.submap[0] = new Object();
moduleConfig.submap[0].title = '';
moduleConfig.submap[0].searchId = 'mapSearchAddress';
moduleConfig.submap[0].topButtons = [{
  text: 'Street View',
  id: controller + 'StreetView'
}];
moduleConfig.submap[0].toolbarField = [];
moduleConfig.submap[0].bottomButtons = [];
moduleConfig.submap[0].closable = false;

moduleConfig.submap[0].baseLayer = new Object();
moduleConfig.submap[0].baseLayer.url= 'http://ows.terrestris.de/osm/service?';
moduleConfig.submap[0].baseLayer.name = scheduling.map.layerName;

moduleConfig.submap[0].controls = new Object();
moduleConfig.submap[0].controls.panPanel = true;
moduleConfig.submap[0].controls.mousePosition = true;
moduleConfig.submap[0].controls.zoomPanel = true;
moduleConfig.submap[0].controls.navigation = true;
moduleConfig.submap[0].controls.layerSwitcher = true;

/*
* Finaliza Mapa Modificacion de Direccion
*/

/*
* Inicia Mapa de Planificacion 2
*/
moduleConfig.submap[1] = new Object();
moduleConfig.submap[1].title = '';
moduleConfig.submap[1].searchId = 'mapSearchAddress';
moduleConfig.submap[1].topButtons = [];
moduleConfig.submap[1].toolbarField = [];
moduleConfig.submap[1].bottomButtons = [];
moduleConfig.submap[1].closable = false;

moduleConfig.submap[1].baseLayer = new Object();
moduleConfig.submap[1].baseLayer.url= 'http://ows.terrestris.de/osm/service?';
moduleConfig.submap[1].baseLayer.name = scheduling.map.layerName;

moduleConfig.submap[1].controls = new Object();
moduleConfig.submap[1].controls.panPanel = true;
moduleConfig.submap[1].controls.mousePosition = true;
moduleConfig.submap[1].controls.zoomPanel = true;
moduleConfig.submap[1].controls.navigation = true;
moduleConfig.submap[1].controls.layerSwitcher = true;
/*
* Fin de Mapa de Planificacion 2
*/


moduleConfig.subform[1] = new Object();
moduleConfig.subform[1].border = false;
moduleConfig.subform[1].bottomButtons = [];
moduleConfig.subform[1].items = [
    {
        xtype:'panel',
        title: scheduling.form.title,
        id: controller + 'Subform1Panel',
        margin: '0 0 0 0',
        padding: '0 0 0 0',
        columnWidth: 1,
        layout: {
            type           : 'column',
            align          : "center",
        },
        items:[
            {
                xtype: 'toolbar',
                margin: '0 0 0 0',
                padding: '0 0 0 0',
                columnWidth: 1,
                ui: 'footer',
                layout     : {
                    type : 'hbox',
                },
                defaults:{
                    labelWidth : 90,
                    msgTarget  : 'side',
                    labelAlign : 'left',
                    margin: '5 5 5 5',
                },
                items:[
                    {
                        margin          : '5 0 0 0',
                        xtype          : 'combo',
                        fieldLabel     : scheduling.form.secondstep.searchTask,
                        id              : controller + 'SecondStepSearchTask',
                        emptyText: 'Nombre o Código',
                        displayField   : 'name',
                        valueField     : '_id',
                        triggerAction  : 'all',
                        editable       : true,
                        multiSelect    : true,
                        store          : controller + '.SearchTasks',
                        queryParam: 'filters',
                        listeners:
                        {
                            'beforequery': function( queryEvent, eOpts )
                            {
                                console.log(queryEvent.query);
 
                                var objFilters = Ext.JSON.encode({
                                    'and':[
                                        {
                                            field: 'id_company',
                                            comparison: 'eq',
                                            value: window.localStorage.getItem('id_company')
                                        },
                                        {
                                            field: 'id_process',
                                            comparison: 'eq',
                                            value: objController.idReference
                                        },
                                        {
                                            or:[
                                                {
                                                    'field':'name',
                                                    'comparison':'lk',
                                                    'value': queryEvent.query
                                                },
                                                {
                                                    'field':'code',
                                                    'comparison':'lk',
                                                    'value': queryEvent.query
                                                },	
                                            ]
                                        }
                                       	   
                                    ]
                                });
                                queryEvent.query = objFilters;
                            }
                        }
                    },
                    {
                        margin          : '5 0 0 5',
                        xtype          : 'combo',
                        //fieldLabel     : scheduling.form.secondstep.searchTask,
                        id              : controller + 'SecondStepSearchResource',
                        emptyText: 'Recurso',
                        displayField   : 'login',
                        valueField     : '_id',
                        triggerAction  : 'all',
                        editable       : true,
                        multiSelect    : true,
                        store          : controller + '.SearchResources',
                        queryParam: 'filters',
                        listeners:
                        {
                            'beforequery': function( queryEvent, eOpts )
                            {
                                console.log(queryEvent.query);
 
                                var objFilters = Ext.JSON.encode({
                                    'and':[
                                        {
                                            field: 'id_company',
                                            comparison: 'eq',
                                            value: window.localStorage.getItem('id_company')
                                        },
                                        {
                                            or:[
                                                {
                                                    'field':'login',
                                                    'comparison':'lk',
                                                    'value': queryEvent.query
                                                },
                                                {
                                                    'field':'email',
                                                    'comparison':'lk',
                                                    'value': queryEvent.query
                                                },	
                                            ]
                                        }
                                    ]
                                });
                                queryEvent.query = objFilters;
                            }
                        }
                    },
                    {
                        xtype     : 'button',
                        iconCls   : 'cancel-button',
                        tooltip   : scheduling.form.resourceSelect.searchCancelTooltip,
                        fieldName : controller + 'SecondStepSearchTask',
                        id        : controller + 'SecondStepSearchTaskClose',
                        cls       : 'x-btn-default-small',
                    },
                    /*{
                        xtype  : 'button',
                        text   : 'Ctrl-z',
                        id     : controller + 'SecondStepCtrlZ',
                    },
                    {
                        xtype  : 'button',
                        text   : 'Ctrl-y',
                        id     : controller + 'SecondStepCtrlY',
                    },*/
                    {
                        xtype  : 'button',
                        text   : scheduling.form.secondstep.uncheduledTasks,
                        id     : controller + 'SecondStepUncheduledTasks',
                    },
                    {
                        xtype  : 'button',
                        id     : controller + 'SecondStepReload',
                        text   : scheduling.form.secondstep.reload,
                    },
                    '->',
                    {
                        xtype  : 'button',
                        id     : controller + 'SecondStepAcceptAndAsign',
                        text   : scheduling.form.secondstep.acceptAndAsign,
                        style:{
                            background: '#1fbad6 !important',
                            border: '1px solid #fff',  
                        },
                    },
                ]
            },
        ]
    }
];



moduleConfig.subgrid[1] = new Object();
moduleConfig.subgrid[1].title = '';
moduleConfig.subgrid[1].searchField = true;
moduleConfig.subgrid[1].searchTitle = scheduling.form.secondstep.search;
moduleConfig.subgrid[1].searchId = 'listSearchKeyword';
moduleConfig.subgrid[1].pageSize = 15;
moduleConfig.subgrid[1].topButtons = [];
moduleConfig.subgrid[1].contextualMenu = [];
moduleConfig.subgrid[1].tooltip = true;
moduleConfig.subgrid[1].tooltipField = 'name';
moduleConfig.subgrid[1].checkboxIndex = 0;
moduleConfig.subgrid[1].checkbox = true;
moduleConfig.subgrid[1].idField = '_id';
moduleConfig.subgrid[1].hoursColumnStart = 7;
moduleConfig.subgrid[1].hoursColumnEnd = 18;
moduleConfig.subgrid[1].columns = [
    {
        text      : scheduling.form.secondstep.resource,
        dataIndex : 'login',
        width     : 100,
        align     : 'left',
        sortable  : true,
        locked    : true,
        doSort    : function(state)
        {
            var ds = this.up('tablepanel').store;
            ds.sort({
                property: 'resourceinstances.login',
                direction: state
            });
        },
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var color = objController.getLineColor(rowIndex);
            metaData.tdAttr = "style='color: #" + color + ";'";
            record.data.color = color;
            value = Ext.util.Format.htmlEncode(value);
            
            var contextualMenu = 'oncontextmenu="objController.resourceContextMenu(this);"';
            var strCenterMap = '';

            return [
                    '<center>',
                        '<a ' + strCenterMap + ' ' + contextualMenu + ' style="cursor:pointer;" id="' + value + '" name="' + record.data._id + '" >',
                            '<img class="gridtaskIconResource" src="' + moduleConfig.map.icons.resource + '"><br/>',
                            value + 
                        '</a>',
                    '</center>',
                ].join('');
        }
    }
];
moduleConfig.subgrid[1].store =  controller + '.ListResourceTasks'
moduleConfig.subgrid[1].pagingToolbar = true;
moduleConfig.subgrid[1].pagingToolbarItems = [
    {
        xtype  : 'button',
        id     : controller + 'GridDownloadPlanning',
        text   : 'Descargar Planificación',
        style:{
            background: '#1fbad6 !important',
            border: '1px solid #fff',  
        },
    },
];

////INICIO - PopUps Windows
moduleConfig.PopUpTaskgroupId = controller + 'PopUpTask';
moduleConfig.PopUpTaskTitleWindow = 'Tarea';
moduleConfig.PopUpTaskWidthWindow = 300;
moduleConfig.PopUpTaskHeightWindow = '50%';
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
                fieldLabel        : 'translateplanningtracking.marker.code',
                id                : 'PopUpTaskFormCode',
                name              : 'code',
                emptyText         : 'translateplanningtracking.marker.code',
            }
        ]
    },
];

moduleConfig.PopUpTaskBottomButtons = [
    {
        text      : 'translateplanningtracking.form.close',
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

//// INICIO - Grid de Tareas
moduleConfig.subgrid[2] = new Object();
moduleConfig.subgrid[2].title = '';
moduleConfig.subgrid[2].pageSize = 15;
moduleConfig.subgrid[2].topButtons = [];
moduleConfig.subgrid[2].bottomButtons = [];
moduleConfig.subgrid[2].pagingToolbarItems = [
    {
        labelWidth           : 60,
        xtype          : 'combo',
        fieldLabel     : 'Recurso',
        id             : controller + 'GridSecondResource',
        displayField   : 'login',
        valueField     : '_id',
        triggerAction  : 'all',
        editable       : false,
        multiSelect    : false,
        store          : controller + '.ListResourceTasksCombo'
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
moduleConfig.subgrid[2].contextualMenu = [];
moduleConfig.subgrid[2].tooltip = true;
moduleConfig.subgrid[2].tooltipField = 'name';
moduleConfig.subgrid[2].checkboxIndex = 0;
moduleConfig.subgrid[2].idField = '_id';
moduleConfig.subgrid[2].columns = [
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
    
    /*{
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
    }*/
];
moduleConfig.subgrid[2].store =  controller + '.ListTemporalTasksGrid';
//// FIN - Grid de tareas