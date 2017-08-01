var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'MapMultiGrid';
/*
moduleConfig.template =[];
moduleConfig.template[0] = '';
moduleConfig.template[1] = 'MapMultiGrid';
moduleConfig.template[2] = 'MapGridPanel';*/

moduleConfig.services = new Object();
moduleConfig.services.listResourceUrl = strURL + '/tracking/actual';
moduleConfig.services.listResourcesGroupUrl = strURL + '/resourcegroups';
moduleConfig.services.listDeviceTypeUrl = strURL +'/resourcedefinitions?relations=["deviceDefinitions"]';
moduleConfig.services.listResourcesEventsUrl = strURL + '/tracking/events';
moduleConfig.services.listHistoryUrl = strURL + '/tracking/history';
moduleConfig.services.comboResourceUrl = strURL + '/resourceinstances';
moduleConfig.services.urlAddressGeocoding = strURL + '/addresses/validate';
moduleConfig.services.urlExport = strURL + '/tracking/actual/excel/resourceracking';
moduleConfig.services.urlExportHistory = strURL + '/tracking/history';

moduleConfig.submap = [];
moduleConfig.submap[0] = new Object();
moduleConfig.submap[0].title = translateresourcetracking.module.map;
moduleConfig.submap[0].searchId = 'mapSearchAddress';
moduleConfig.submap[0].topButtons = [
    {
        text: 'Street View',
        id: controller + 'StreetView',
        action: controller + 'StreetView',
        enableToggle: true,
        tooltip: 'Activar el Google Street View',
        iconCls   : 'button-streetview',
    }
];

moduleConfig.submap[0].toolbarField = [{
  xtype           : 'combo',
  store           : controller + '.SearchAddress',
  queryParam      : 'address',
  //fieldLabel      : translateresourcetracking.filter.addressLabel,
  enableKeyEvents : true,
  displayField    : 'name',
  id              : controller + 'SearchAddress',
  labelWidth      : 120,
  minLength       : 5,
  hideTrigger     : true,
  queryDelay      : 1000,
  emptyText       : translateresourcetracking.filter.addressEmptyText,
  minLengthText   : translateresourcetracking.filter.addressError,
  mapIndex        : 0,
  listConfig: {
      loadingText: 'Buscando...',
      emptyText: 'No se encontro una direccion.',
      getInnerTpl: function() {
          return '<span><br />{name}</span>';
      }
  }
}];
moduleConfig.submap[0].bottomButtons = [];
moduleConfig.submap[0].closable = false;

moduleConfig.submap[0].baseLayer = new Object();
moduleConfig.submap[0].baseLayer.url= 'http://ows.terrestris.de/osm/service?';
moduleConfig.submap[0].baseLayer.name = 'Capa principal';

moduleConfig.submap[0].controls = new Object();
moduleConfig.submap[0].controls.panPanel = true;
moduleConfig.submap[0].controls.mousePosition = true;
moduleConfig.submap[0].controls.zoomPanel = true;
moduleConfig.submap[0].controls.navigation = true;
moduleConfig.submap[0].controls.layerSwitcher = true;

moduleConfig.submap[0].taskInterval = 30000;

moduleConfig.icons = new Object();
moduleConfig.icons.event = 'images/icon/markers/location_error.png';
moduleConfig.icons.location = 'images/icon/markers/location_history.png';
moduleConfig.icons.resource = 'images/icon/markers/resources/truckG.png';
moduleConfig.icons.resourceWithEvent = 'images/icon/markers/error.png';


/*
* Map History
*/

moduleConfig.submap[1] = new Object();
moduleConfig.submap[1].title = translateresourcetracking.module.map;
moduleConfig.submap[1].searchId = 'mapSearchAddress';
moduleConfig.submap[1].topButtons = [
    {
        text: 'Street View',
        id: controller + 'StreetView1',
        action: controller + 'StreetView1',
        enableToggle: true,
        tooltip: 'Activar el Google Street View',
        iconCls   : 'button-streetview',
    }
];
moduleConfig.submap[1].toolbarField = [{
  xtype           : 'combo',
  store           : controller + '.SearchAddress',
  queryParam      : 'address',
  //fieldLabel      : translateresourcetracking.filter.addressLabel,
  enableKeyEvents : true,
  displayField    : 'name',
  id              : controller + 'HistorySearchAddress',
  labelWidth      : 120,
  minLength       : 5,
  hideTrigger     : true,
  queryDelay      : 1000,
  emptyText       : translateresourcetracking.filter.addressEmptyText,
  minLengthText   : translateresourcetracking.filter.addressError,
  mapIndex        : 1,
  listConfig: {
      loadingText: 'Buscando...',
      emptyText: 'No se encontro una direccion.',
      getInnerTpl: function() {
          return '<span><br />{name}</span>';
      }
  }
}];
moduleConfig.submap[1].bottomButtons = [];
moduleConfig.submap[1].closable = false;

moduleConfig.submap[1].baseLayer = new Object();
moduleConfig.submap[1].baseLayer.url= 'http://ows.terrestris.de/osm/service?';
moduleConfig.submap[1].baseLayer.name = 'Capa principal';

moduleConfig.submap[1].controls = new Object();
moduleConfig.submap[1].controls.panPanel = true;
moduleConfig.submap[1].controls.mousePosition = true;
moduleConfig.submap[1].controls.zoomPanel = true;
moduleConfig.submap[1].controls.navigation = true;
moduleConfig.submap[1].controls.layerSwitcher = true;


moduleConfig.subgrid = [];

/*
*   Grid Recursos
*/

moduleConfig.subgrid[0] = new Object();
moduleConfig.subgrid[0].title = translateresourcetracking.resource.list;
moduleConfig.subgrid[0].searchField = true;
moduleConfig.subgrid[0].searchTitle = translateresourcetracking.resource.searchTitle;
moduleConfig.subgrid[0].searchId = 'listResourceSearchKeyword';
moduleConfig.subgrid[0].pageSize = 15;
moduleConfig.subgrid[0].topButtons = [];

moduleConfig.subgrid[0].filterToolbar = [
    {
        xtype: 'container',
        width: '35%',
        layout:{
            type: 'hbox',
            align: 'middle',

        },
        items:[
            {
                xtype          : 'combo',
                fieldLabel     : translateresourcetracking.filter.resourceType,
                id             : controller + 'FilterResourceType',
                displayField   : 'name',
                valueField     : '_id',
                triggerAction  : 'all',
                editable       : false,
                multiSelect    : true,
                store          : 'ResourceTracking.ListResourcesType',
                width: '88%',
                labelWidth: 80,
                margin: '0 5 0 0',
            },
            {
                xtype     : 'button',
                iconCls   : 'cancel-button',
                tooltip   : 'Elimina el filtro por el texto ingresado.',
                fieldName : controller + 'FilterResourceType',
                cls       : 'x-btn-default-small',
                action    : 'clearFilter',
            },
        ]
    },
    {
        xtype: 'container',
        width: '35%',
        layout:{
            type: 'hbox',
            align: 'middle',

        },
        items:[
            {
                xtype          : 'combo',
                fieldLabel     : translateresourcetracking.filter.group,
                id             : controller + 'FilterResourceGroup',
                displayField   : 'name',
                valueField     : '_id',
                triggerAction  : 'all',
                editable       : false,
                multiSelect    : true,
                store          : 'ResourceTracking.ListResourcesGroup',
                width: '88%',
                labelWidth: 50,
                margin: '0 5 0 0',
            },
            {
                xtype     : 'button',
                iconCls   : 'cancel-button',
                tooltip   : 'Elimina el filtro por el texto ingresado.',
                fieldName : controller + 'FilterResourceGroup',
                cls       : 'x-btn-default-small',
                action    : 'clearFilter'
            }
        ]
    }
];

moduleConfig.subgrid[0].secondTopButtons = [
    {
        xtype   : 'button',
        iconCls   : 'button-details',
        text    : translateresourcetracking.resource.detailFilterText,
        id      : controller + 'ResourceDetailList',
        action  : controller + 'ResourceDetailList',
        scale  : 'small',
        style:{
            background: '#'+ strColorBoton,
            border: '1px solid #fff',  
        },
    },
    {
        xtype   : 'button',
        iconCls   : 'button-messages',
        text    : translateresourcetracking.resource.messagegFilterText,
        id      : controller + 'ResourceMessageList',
        action  : controller + 'ResourceMessageList',
        scale  : 'small',
        style:{
            background: '#'+ strColorBoton,
            border: '1px solid #fff',  
        },
    },
    {
        xtype   : 'button',
        iconCls   : 'button-history',
        text    : translateresourcetracking.resource.historyFilterText,
        id      : controller + 'ResourceHistoryList',
        action  : controller + 'ResourceHistoryList',
        scale  : 'small',
        style:{
            background: '#'+ strColorBoton,
            border: '1px solid #fff',  
        },
    },
];
moduleConfig.subgrid[0].secondFilterToolbar = [];

moduleConfig.subgrid[0].contextualMenu = [];
moduleConfig.subgrid[0].tooltip = true;
moduleConfig.subgrid[0].tooltipField = 'name';
moduleConfig.subgrid[0].checkboxIndex = 0;
moduleConfig.subgrid[0].store =  controller + '.List';
moduleConfig.subgrid[0].checkbox = true;
moduleConfig.subgrid[0].columns = [
    {
        text      : translateresourcetracking.resource.columns.movil,
        dataIndex : 'isGPRS',
        //width     : '20%',
        locked    : true,
        width     : 60,
        align     : 'left',
        sortable  : true,
        renderer  : function(value,metaData,record ,rowIndex,colIndex,store,view)
        {
          var images = '<img style="height:16px;" src="images/icon/markers/resources/truckG.png">';
          if(record.data.hasEvent)
          {
            images = '<img style="height:16px;" src="'+moduleConfig.icons.resourceWithEvent+'">'
          }
          else
          {
            images = '<img style="height:16px;" src="'+moduleConfig.icons.resource+'">'
          }

          if(value)
          {
            return images+'<img style="height:15px;" src="images/icon/gsm-16.png">';
          }
          else
          {
            return images+'<img style="height:15px;" src="images/icon/satellite-16.png">';
          }
        }
    },
    {
        text      : translateresourcetracking.resource.columns.login,
        dataIndex : 'login',
        //width     : '20%',
        locked    : true,
        width     : 100,
        align     : 'left',
        sortable  : true,
        doSort    : function(state){
            var ds = this.up('tablepanel').store;
            ds.sort({
                property: 'resource.login',
                direction: state
            });
        }
    },
    {
        text      : translateresourcetracking.resource.columns.updateTime,
        dataIndex : 'updateTime',
        width     : 170,
        locked    : true,
        align     : 'left',
        sortable  : true
    },
    {
        text      : translateresourcetracking.resource.columns.address,
        dataIndex : 'address',
        width     : 400,
        align     : 'left',
        sortable  : true
    },
    {
        text      : translateresourcetracking.resource.columns.speed,
        dataIndex : 'speed',
        width     : 80,
        align     : 'left',
        sortable  : true
    },
    {
        text      : translateresourcetracking.resource.columns.rpm,
        dataIndex : 'Ecumonitor',
        width     : 70,
        align     : 'left',
        sortable  : true,
        hidden      : true
    },
    {
        text      : translateresourcetracking.resource.columns.levelGasTank,
        dataIndex : 'Probe',
        width     : 100,
        align     : 'left',
        sortable  : true,
        hidden      : true
    },
    {
        text      : translateresourcetracking.resource.columns.motor,
        dataIndex : 'GPS',
        width     : 100,
        align     : 'left',
        sortable  : true,
        hidden      : true
    },
    {
        text      : translateresourcetracking.resource.columns.status,
        dataIndex : 'status',
        width     : 100,
        align     : 'left',
        sortable  : true,
        hidden      : true
    },
    {
        text      : translateresourcetracking.resource.columns.person,
        dataIndex : 'PassangerSensor',
        width     : 100,
        align     : 'left',
        sortable  : true,
        hidden      : true
    },
    {
        text      : translateresourcetracking.resource.columns.trailer,
        dataIndex : 'Trailer',
        width     : 100,
        align     : 'left',
        sortable  : true,
        hidden       : true
    },
    {
        text      : translateresourcetracking.resource.columns.panic,
        dataIndex : 'PanicButton',
        width     : 100,
        align     : 'left',
        sortable  : true,
        hidden      : true
    },
    {
        text      : 'SIM',
        dataIndex : 'SIM',
        width     : 100,
        align     : 'left',
        sortable  : true,
        hidden      : true
    }
];

moduleConfig.subgrid[0].pagingToolbarItems = [
    {
        xtype: 'button',
        id: controller + 'ExportFile',
        text: translateresourcetracking.resource.exportButton,
        style:{
            background: '#1fbad6',
            border: '1px solid #fff',  
        },
    }
];

/*
*   Grid Eventos
*/

moduleConfig.subgrid[1] = new Object();
moduleConfig.subgrid[1].title = translateresourcetracking.events.title;
moduleConfig.subgrid[1].searchField = true;
moduleConfig.subgrid[1].searchTitle = translateresourcetracking.events.searchTitle;
moduleConfig.subgrid[1].searchId = 'listSearchKeyword';
moduleConfig.subgrid[1].pageSize = 15;
moduleConfig.subgrid[1].topButtons = [];
moduleConfig.subgrid[1].contextualMenu = [];
moduleConfig.subgrid[1].tooltip = true;
moduleConfig.subgrid[1].tooltipField = 'name';
moduleConfig.subgrid[1].checkboxIndex = 0;
moduleConfig.subgrid[1].idField = '_id',
moduleConfig.subgrid[1].store =  controller + '.ListEvents';

/*moduleConfig.subgrid[1].filterToolbar = [{

    xtype          : 'combo',
    fieldLabel     : 'Grupos',
    labelWidth     :  50,
    id             : controller + 'EventsFilterCategoryResourceGroup',
    displayField   : 'name',
    valueField     : '_id',
    triggerAction  : 'all',
    editable       : false,
    multiSelect    : true,
    store          : 'ResourceTracking.ListResourcesGroup'
}];*/

moduleConfig.subgrid[1].columns = [
  {
    text      : translateresourcetracking.events.list.resource,
    dataIndex : 'resourceName'
  },
  {
    text      : translateresourcetracking.events.list.task,
    dataIndex : 'taskName'
  },
  {
    text      : translateresourcetracking.events.list.category,
    dataIndex : 'eventCategory'
  },
  {
    text      : translateresourcetracking.events.list.type,
    dataIndex : 'eventType'
  },
  {
    text      : translateresourcetracking.events.list.msg,
    dataIndex : 'message',
    width     : '20%'
  },
  {
    xtype     : 'datecolumn',
    width     : '30%',
    text      : translateresourcetracking.events.list.updateTime,
    dataIndex : 'updateTime',
    format    : 'd/m/Y H:i'
  }
];

moduleConfig.subgrid[1].pagingToolbarItems = [
    {
        xtype: 'container',
        width: '35%',
        layout:{
            type: 'hbox'
        },
        items:[
            {
                xtype          : 'combo',
                //fieldLabel     : 'Evento:',//,
                id             : controller + 'FilterResourceTypeEvent',
                displayField   : 'name',
                valueField     : '_id',
                triggerAction  : 'all',
                editable       : false,
                multiSelect    : true,
                store          : 'ResourceTracking.ListResourcesType',
                width: '84%',
                labelWidth: 44,
                margin: '0 5 0 0',
                emptyText: translateresourcetracking.events.list.type,
            },
            {
                xtype     : 'button',
                iconCls   : 'cancel-button',
                tooltip   : 'Elimina el filtro por el texto ingresado.',
                fieldName : controller + 'FilterResourceTypeEvent',
                cls       : 'x-btn-default-small',
                action    : 'clearFilter',
                margin: '1 0 0 0',
            },
        ]
    },
];

/*
*   Modulo Historial
*/

/*
*   Grid Posicion
*/

moduleConfig.subgrid[2] = new Object();
//moduleConfig.subgrid[2].title = translateresourcetracking.positions.title;
moduleConfig.subgrid[2].pageSize = 1000;
moduleConfig.subgrid[2].contextualMenu = [];
moduleConfig.subgrid[2].topButtons = [];
moduleConfig.subgrid[2].idField = '_id';
moduleConfig.subgrid[2].store =  controller + '.ListHistory';
moduleConfig.subgrid[2].pagingToolbar = false;

moduleConfig.subgrid[2].filterToolbar = [{
    xtype          : 'datefield',
    fieldLabel     : translateresourcetracking.filter.date,
    labelWidth     :  50,
    labelAlign     : 'top',
    id             : controller + 'ResourceHistoryFilterDate',
    value          : new Date()

},{

    xtype          : 'combo',
    fieldLabel     : translateresourcetracking.filter.group,
    labelWidth     :  50,
    labelAlign     : 'top',
    id             : controller + 'ResourceHistoryFilterResourceGroup',
    displayField   : 'name',
    valueField     : '_id',
    triggerAction  : 'all',
    editable       : false,
    multiSelect    : true,
    store          : 'ResourceTracking.ListResourcesGroup'
},{
    xtype          : 'combo',
    fieldLabel     : translateresourcetracking.filter.resource,
    labelWidth     :  50,
    labelAlign     : 'top',
    id             : controller + 'ResourceHistoryFilterResource',
    displayField   : 'login',
    valueField     : '_id',
    triggerAction  : 'all',
    editable       : false,
    store          : 'ResourceTracking.ComboResource'
}];

moduleConfig.subgrid[2].secondTopButtons = [
    {
      xtype   : 'button',
      iconCls : 'button-search',
      text    : translateresourcetracking.positions.searchButton,
      id      : controller + 'ResourceHistorySearch',
      action  : controller + 'ResourceHistorySearch',
      style:{
            background: '#1fbad6',
            border: '1px solid #fff',  
        },
},{
      xtype   : 'button',
      iconCls : 'button-download',
      text    : translateresourcetracking.positions.exportButton,
      id      : controller + 'ResourceHistoryExport',
      action  : controller + 'ResourceHistoryExport'
},
'->',
{
      xtype   : 'button',
      iconCls : 'button-back',
      text    : translateresourcetracking.positions.backButton,
      id      : controller + 'ResourceHistoryBack',
      action  : controller + 'ResourceHistoryBack'
}
];

moduleConfig.subgrid[2].columns = [
    {
        xtype: 'rownumberer',
        text      : 'Nro',
        width:'10%',
        align: 'center',
    },
    {
        xtype     : 'datecolumn',
        width     : '30%',
        text      : translateresourcetracking.filter.date,
        dataIndex : 'updateTime',
        align: 'center',
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            return [
                Ext.Date.format(value, 'd/m/Y H:i:s'),
                '</br>',
                record.data.address
            ].join('');
        }
    },
    {
        text      : translateresourcetracking.positions.columns.levelGasTank,
        dataIndex : 'levelGasTank',
        align: 'center',
    },
    {
        text      : translateresourcetracking.positions.columns.odometer,
        dataIndex : 'odometer',
        align: 'center',
    },
    {
        text      : translateresourcetracking.positions.columns.speed,
        dataIndex : 'speed'
        ,align: 'center',
    },
    {
        text      : translateresourcetracking.positions.columns.rpm,
        dataIndex : 'rpm'
        ,align: 'center',
    }
];

/**
* Grid Detalle Posicion
**/

moduleConfig.subgrid[3] = new Object();
//moduleConfig.subgrid[3].title = 'Eventos';
moduleConfig.subgrid[3].pageSize = 1000;
moduleConfig.subgrid[3].contextualMenu = [];
moduleConfig.subgrid[3].topButtons = [];
moduleConfig.subgrid[3].tooltip = true;
moduleConfig.subgrid[3].store =  controller + '.ListPositionEvents';

moduleConfig.subgrid[3].columns = [
  {
    text      : translateresourcetracking.events.title,
    dataIndex : 'description',
    width     : '100%'
  }
];

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