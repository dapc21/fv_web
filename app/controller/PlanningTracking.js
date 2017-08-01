var objController = null;

//Control Click (http://dev.openlayers.org/examples/click.html)
OpenLayers.Control.Click = OpenLayers.Class(
    OpenLayers.Control, 
    {                
        defaultHandlerOptions: {
            'single': true,
            'double': false,
            'pixelTolerance': 0,
            'stopSingle': false,
            'stopDouble': false
        },

        initialize: function(options) 
        {
            this.handlerOptions = OpenLayers.Util.extend(
                {}, this.defaultHandlerOptions
            );
            OpenLayers.Control.prototype.initialize.apply(
                this, 
                arguments
            ); 
            this.handler = new OpenLayers.Handler.Click(
                this, 
                {
                    'click': objController.openWindowStreetView
                }, 
                this.handlerOptions
            );
        }, 
    }
);

Ext.define('LoadPrincipal.controller.' + controller, {
    extend  : 'LoadPrincipal.controller.Core',
    models  : [
        controller + '.List',
        controller + '.ListTasks',
        controller + '.ListResourcesGroup',
        controller + '.ListResourcesType',
        controller + '.ListResourcesEvents',
        controller + '.ListRegisters',
        controller + '.SearchAddress',
        controller + '.SearchTasks',
    ],
    stores  : [
       controller + '.List',
       controller + '.ListTasks',
       controller + '.ListResourcesGroup',
       controller + '.ListResourcesType',
       controller + '.ListResourcesEvents',
       controller + '.ListAllResources',
       controller + '.ListRegisters',
       controller + '.SearchAddress',
       controller + '.SearchTasks',
    ],
    views   :  [],
    refs    : [],
    
    //INICIO - Atributos propios
    arrColor : arrListColor,
    mapTask: new Ext.util.TaskRunner().newTask({
  	    run: function()
            {
                console.info('TaskRunner - Recargando la información');

                var nowTimeUpdate = parseInt(Ext.Date.format(new Date(), 'time'));
                var waitTimeUpdate = nowTimeUpdate - objController.timeUpdate;

                console.info('TaskRunner - Tiempo recarga: ' +  waitTimeUpdate/1000 + 's - Ventana: ' + moduleConfig.map.taskInterval/1000 + 's');

                //Refrescamos sólo si paso el tiempo de refresco configurado
                if( waitTimeUpdate >= moduleConfig.map.taskInterval)
                {
                    Ext.data.StoreManager.lookup('PlanningTracking.ListAllResources').load();
                    Ext.data.StoreManager.lookup('PlanningTracking.List').load();
                }
            },
        interval : moduleConfig.map.taskInterval
    }),
    testCarga: 0,
    arrTestCarga:[],
    objSelectResource: {},
    bUseStreetView: false,
    timeUpdate: parseInt(Ext.Date.format(new Date(), 'time')),
    //FIN - Atributos propios
    
    init    : function() 
    {
        var winTaskDetail;
        objController = this;
        
        //Manejo del Token
        var token = this.token();
        if(token){
            Ext.Ajax.useDefaultXhrHeader = true;
            Ext.Ajax.cors = true;
            Ext.Ajax.defaultHeaders = {
                'Authorization': 'Bearer ' + token
            };
        }

        //Cargamos los iconos utilizados en el mapa y grids
        this.onLoadMapIcons(moduleConfig.map.icons);
        //Creamos la columnas del grid según recurso
        this.createColumns();
        //Renderizamos el template
        this.render(moduleConfig.template);
        //Agregamos los botones del mapa
        this.addMapButtons();
        //Carga las tareas y datos iniciales
        this.onLoadTasks();
        //Eventos al cargar los stores
        this.getPlanningTrackingListStore().addListener('beforeload', function(){(objController.testCarga = Ext.Date.format(new Date(), 'time'));}, this);
        this.getPlanningTrackingListStore().addListener('load', this.onStoreLoad, this);
        this.getPlanningTrackingListAllResourcesStore().addListener('load', this.onAllResourceLoad, this);
        
        //Carga las estadísticas de las tareas
        this.getPlanningTrackingListStore().addListener('metachange', this.metaDataResourceAll, this);
        
        //Agregamos valores por defectos pasados por url
        if(!Ext.isEmpty(urlGET))
        {
            if(!Ext.isEmpty(urlGET['login']))
            {
                Ext.getCmp('PlanningTrackingFilterResourceLogin').setValue(urlGET['login']);
            }
            this.multiSearch();
        }

        //Listeners
        this.control(
            {
                'AliasPlanningTrackingList' : {
                    select    : this.onResourceSelect,
                    deselect  : this.onResourceDeSelect,
                },
                'AliasPlanningTrackingList button[action=PlanningTrackingListCreate]': {
                  click: this.openWindowCreateTask
                },
                'AliasPlanningTrackingList button[action=PlanningTrackingResourceEventList]': {
                  click: this.openWindowResourceEvents
                },
                
                ////Exportar los archivos excel
                'AliasPlanningTrackingList button[action=exportXls]':{
                    click: this.exportXlsGridFirst
                },
                'AliasPlanningTrackingList0 button[action=exportXls]':{
                    click: this.exportXlsGridSecond
                },

                '#PlanningTrackingCreateTaskWindow':{
                  close: this.deleteSearchs
                },
                '#PlanningTrackingWindowsSaveCreateTaskButton': {
                  click: this.saveCreateTask
                },
                '#PlanningTrackingWindowsSaveCreateTaskValidateAddressButton': {
                  click: this.validateAddress
                },
                '#PlanningTrackingWindowsSaveCreateTaskAcceptAddressButton': {
                  click: this.acceptAddress
                },
                /*
                * Buscador Mapa
                */
                '#PlanningTrackingSearchAddress': {
                  select: this.searchSelect
                },
                /**
                 * Filters
                 */
                'AliasPlanningTrackingFilter button[action=clearFilters]':{
                    click : this.clearFilter
                },
                '#PlanningTrackingFilterResourceFecha':{
                    change: this.multiSearch
                },				
                '#PlanningTrackingFilterResourceLogin'  : {
                    keyup : this.multiSearch
                },
                '#PlanningTrackingFilterResourceLoginClear':{
                    click: this.clearFilterField
                },
                '#PlanningTrackingFilterResourceCode'  : {
                    keyup : this.multiSearch
                },
                '#PlanningTrackingFilterResourceCodeClear'  : {
                    click : this.clearFilterField
                },
                '#PlanningTrackingFilterTaskName'  : {
                    select : this.multiSearch
                },
                '#PlanningTrackingFilterTaskNameClear'  : {
                    click : this.clearFilterField
                },
                '#PlanningTrackingFilterTaskStatus':{
                    change : this.multiSearch
                },
                '#PlanningTrackingFilterTaskStatusClear':{
                    click : this.clearFilterField
                },
                '#PlanningTrackingFilterResourceType':{
                    change : this.multiSearch,
					select:  this.setResourceDefinitionInResourceGroupCombo
                },
                '#PlanningTrackingClearFilterResourceType':{
                    click : this.unSetResourceDefinitionInResourceGroupCombo
                },
                '#PlanningTrackingFilterResourceGroup':{
                    change : this.multiSearch
                },
                '#PlanningTrackingFilterResourceGroupClear':{
                    click : this.clearFilterField
                },
                '#PlanningTrackingStreetView': {
                    click: this.onStreetView
                },

                ////Grid 2
                '#PlanningTrackingBackToFirstGrid':{
                    click: this.onBackToFirstGrid
                },
                '#PlanningTrackingGridSecondResource':{
                    change: this.updateStoreSecondGrid
                },
                'AliasPlanningTrackingList0':{
                    itemclick: this.onItemCickGridSecond,
                    itemcontextmenu: this.onContextualMenuGridSecond
                },
            }
        );
    },
    //Agrega los botones al mapa (se sobre escribe la función)
    addMapButtons: function(suffix)
    {
        console.log('Agregamos los botones al mapa.');

        suffix = (Ext.isEmpty(suffix)) ? '' : suffix;
        
        var map = Ext.getCmp(AppGlobals.mapId+suffix);
        var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });
        
        //Style the sketch fancy
        var sketchSymbolizers = {
            "Point": {
                pointRadius: 4,
                graphicName: "square",
                fillColor: "white",
                fillOpacity: 1,
                strokeWidth: 1,
                strokeOpacity: 1,
                strokeColor: "#333333"
            },
            "Line": {
                strokeWidth: 3,
                strokeOpacity: 1,
                strokeColor: "#666666",
                strokeDashstyle: "dash"
            },
            "Polygon": {
                strokeWidth: 2,
                strokeOpacity: 1,
                strokeColor: "#666666",
                fillColor: "#848484",
                fillOpacity: 0.3
            }
        };
        var style = new OpenLayers.Style();
        style.addRules([
            new OpenLayers.Rule({symbolizer: sketchSymbolizers})
        ]);
        var styleMap = new OpenLayers.StyleMap({"default": style});

        function handleMeasurements(event) {
                var geometry = event.geometry;
                var units = event.units;
                var order = event.order;
                var measure = event.measure;
                var element = document.getElementById('output');
                var out = "";
                
                if(order == 1) {
                    out += translate.global.map.mesure + measure.toFixed(3) + " " + units;
                } else {
                    out += translate.global.map.mesure + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
                }

                map.setTitle(moduleConfig.map.title);
                map.setTitle(map.title+' '+out);
        };
        var ctrl, toolbarItems = [], action, actions = {};
        var layers = map.map.layers;

        // ZoomToMaxExtent control, a "button" control
        action = Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map.map,
            text: translate.global.map.maxExtent,
            tooltip: translate.global.map.maxExtentTooltip
        });
        actions["max_extent"] = action;

        //Navigation control and DrawFeature controls
        action = Ext.create('GeoExt.Action', 
            {   
                id: 'idControlNav',
                //text: translate.global.map.navigate,
                control: new OpenLayers.Control.Navigation(),
                map: map.map,
                // button options
                toggleGroup: "draw",
                allowDepress: false,
                pressed: true,
                tooltip: translate.global.map.navigateTooltip,
                iconCls   : 'button-navegar',
                // check item options
                group: "draw",
                checked: true
            });
        actions["nav"] = action;
        //toolbarItems.push(Ext.create('Ext.button.Button', action));

        action = Ext.create('GeoExt.Action', {
            //text: translate.global.map.mesureArea,
            control:  new OpenLayers.Control.Measure(
                OpenLayers.Handler.Polygon, {
                    persist: true,
                    handlerOptions: {
                        layerOptions: {
                            styleMap: styleMap
                        }
                    }

                }
            ),
            map: map.map,
            // button options
            toggleGroup: "draw",
            allowDepress: false,
            tooltip: translate.global.map.mesureAreaTooltip,
            iconCls   : 'button-area',
            // check item options
            group: "draw"
        });

        actions["draw_poly"] = action;
        action.control.events.on({
            "measure": handleMeasurements,
            "measurepartial": handleMeasurements
        });

        action = Ext.create('GeoExt.Action', {
            //text: translate.global.map.mesureDistance,
            control: new OpenLayers.Control.Measure(
                OpenLayers.Handler.Path, {
                    persist: true,
                    handlerOptions: {
                        layerOptions: {
                            styleMap: styleMap
                        }
                    }
                }
            ),
            map: map.map,
            // button options
            toggleGroup: "draw",
            allowDepress: false,
            tooltip: translate.global.map.mesureDistanceTooltip,
            iconCls   : 'button-distance',
            // check item options
            group: "draw"
        });
        actions["draw_line"] = action;
        action.control.events.on({
            "measure": handleMeasurements,
            "measurepartial": handleMeasurements
        });

        // SelectFeature control, a "toggle" control
        action = Ext.create('GeoExt.Action', {
            text: translate.global.map.selectFeature,
            control: new OpenLayers.Control.SelectFeature(layers, {
                type: OpenLayers.Control.TYPE_TOGGLE,
                hover: true
            }),
            map: map.map,
            // button options
            enableToggle: true,
            tooltip: translate.global.map.selectFeatureTooltip
        });
        actions["select"] = action;
        
        //Navigation history - two "button" controls
        ctrl = new OpenLayers.Control.NavigationHistory();
        map.map.addControl(ctrl);

        action = Ext.create('GeoExt.Action', {
            text: translate.global.map.previous,
            control: ctrl.previous,
            disabled: true,
            tooltip: translate.global.map.previousTooltip
        });
        actions["previous"] = action;

        action = Ext.create('GeoExt.Action', {
            text: translate.global.map.next,
            control: ctrl.next,
            disabled: true,
            tooltip: translate.global.map.nextTooltip
        });
        actions["next"] = action;
        
        //Los items apartes
        /*toolbarItems.push(Ext.create('Ext.button.Button',  actions["max_extent"]));*/
        toolbar.add(Ext.create('Ext.button.Button',  actions["max_extent"]));
        toolbar.add("-");
        toolbar.add(Ext.create('Ext.button.Button',  actions["nav"]));
        toolbar.add(Ext.create('Ext.button.Button',  actions["select"]));
        toolbar.add("-");
        toolbar.add(Ext.create('Ext.button.Button',  actions["draw_poly"]));
        toolbar.add(Ext.create('Ext.button.Button',  actions["draw_line"]));
        toolbar.add("-");
        toolbar.add(Ext.create('Ext.button.Button',  actions["previous"]));
        toolbar.add(Ext.create('Ext.button.Button',  actions["next"]));
        toolbar.add('->');

        //////////////// FIN ToolbarItems

        if(typeof moduleConfig.map.toolbarField != 'undefined'){
          $.each(moduleConfig.map.toolbarField, function(index, value) {
              toolbar.add(value);
          });
        }

        var buttons = moduleConfig.map.topButtons;
        $.each(moduleConfig.map.topButtons, function(index, value) {
            var subitem = [];
            if (value.submenu == true) {
                $.each(value.items, function(subindex, subvalue) {
                    subitem[subindex] = new Ext.menu.Item({
                        text: subvalue.text,
                        value: subvalue.action,
                        action: subvalue.action,
                        id: subvalue.action+suffix,
                        iconCls: subvalue.iconCls,

                    });
                });
                var item = new Ext.button.Button({
                    text: value.text,
                    value: value.action,
                    action: value.action,
                    id: value.action+suffix,
                    iconCls: value.iconCls,
                    menu: {
                        items: subitem
                    },
                    handler: function(item) {
                        //alert("baasic")
                    }
                });
            } else {
                var item = new Ext.button.Button({
                    text: value.text,
                    value: value.action,
                    action: value.action,
                    id: value.action+suffix,
                    iconCls: value.iconCls,
                    handler: function(item) {
                        //alert("baasic")
                    }
                });
            }
            toolbar.add(item);
        });

        map.addDocked(toolbar);
    },
    //Imprime el mapa actual
    printMap: function(button)
    {
        console.log('Imprimiendo el mapa.');
        
        var list = Ext.ComponentQuery.query('AliasPlanningTrackingList')[0];
        var records = [];
        
        if(list.isVisible())
        {
            var selModel = list.getSelectionModel();
        
            if(selModel.hasSelection())
            {
                records = selModel.getSelection();

                if(records.length != 1)
                {
                    Ext.MessageBox.show({
                        title   : 'Imprimir Ruta',
                        msg     : 'Debe seleccionar un sólo recurso, para imprimir su ruta',
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.ERROR
                    });
                    return;
                }
            }
            else
            {
                Ext.MessageBox.show({
                    title   : 'Imprimir Ruta',
                    msg     : 'Debe seleccionar un recurso, para imprimir su ruta',
                    buttons : Ext.MessageBox.OK,
                    icon    : Ext.MessageBox.ERROR
                });
                return;
            }
        }
        else
        {
            list = Ext.ComponentQuery.query('AliasPlanningTrackingList0')[0];
            store = list.getStore();
            
            //Obtenemos la tareas
            var arrTasks = [];
            store.each(function(rec) {
                    arrTasks.push(rec.data);
            });

            //Obtenemos el login y la línea
            var comboResource = Ext.getCmp('PlanningTrackingGridSecondResource');
            var getRecordResource = comboResource.getStore().getById(comboResource.getValue());
            records.push({
                data:{
                    login: getRecordResource.data.login,
                    tasks: [arrTasks],
                    rawShape: getRecordResource.data.rawShape
                }
            });
            //console.log('records:', records);
        }

        for (var i = 0; i < records.length; i++) 
        {
            var record = records[i];
            var login = record.data.login;
            console.log('Record a imprimir: ', record);
            var printTplAll = new Ext.XTemplate([
            '<body style=" background-size: cover;" background="./images/fondos/pattern.png">',
                '<div style="width:720px; margin:0 auto; background-color:#fff; border-radius:5px">',
                    '<div style="color:#474941; font-size:25; font-family: Open Sans, sans-serif; padding:15px">',
                        '<img src="./images/icon/fv.png" width="30px"> FieldVision ',
                        '<img style="float:right;cursor: pointer;padding-right:20px;padding-top: 5px;" src="./images/icon/buttons/imprimirB.png" width="25px" onclick="window.print()">', 
                    '</div> ',
                    
                    '<div align="center">',
                        '<img id="idImageMapPrint" style="border: 1px solid #ddd; border-radius: 4px;padding: 5px;" ',
                        'src="https://maps.googleapis.com/maps/api/staticmap?',
                        'size=640x640',
                        '&maptype=roadmap',
                        '<tpl for="tasks">',
                            '<tpl for=".">',
                                '&markers=color:blue%7Clabel:{[this.getLabel(values)]}%7C{location.lat},{location.lng}',
                            '</tpl>',
                        '</tpl>',
                        '&key=AIzaSyBlSAPU17rA1Z00TI8vnOS-1az5lcvgPMU">',
                    '</div>',

                    '<div id="textbox" style="width:90%; margin: 0 auto;">',
                        '<p style="float: left;color:#474941;font-family: Open Sans, sans-serif;">Recurso: {login}</p>',
                        '<p style="float: right;color:#474941;font-family: Open Sans, sans-serif;">Fecha: ' +  Ext.Date.format(Ext.getCmp(controller + 'FilterResourceFecha').getValue(), 'Y-m-d') + '</p>',
                    '</div>',

                    '<center>',
                        '<br>',

                        '<table>',
                        '<tbody>',
                            '<tr>',
                                '<th>#</th>',
                                '<th>'+translateplanningtracking.print.type+'</th>',
                                '<th>'+translateplanningtracking.print.loadAmount+'</th>',
                                '<th>'+translateplanningtracking.filter.fieldLabel.status+'</th>',
                                '<th>'+translateplanningtracking.form.name+'</th>',
                                '<th>'+translateplanningtracking.form.address+'</th>',
                                '<th>'+translateplanningtracking.print.start+'</th>',
                                '<th>'+translateplanningtracking.print.end+'</th>',
                                '<th>'+translateplanningtracking.print.duration+'</th>',
                            '</tr>',
                            '<tpl for="tasks">',
                                '<tpl for=".">',
                                    '<tr>',
                                        '<td>{[this.getLabel(values)]}</td>',
                                        '<td>{type}</td>',
                                        '<td>{loadAmount}</td>',
                                        '<td>{status}</td>',
                                        '<td>{name}</td>',
                                        '<td>{address}</td>',
                                        '<td>{[this.splitHour(values.arrival_time)]}</td>',
                                        '<td>{[this.splitHour(values.finish_time)]}</td>',
                                        '<td>{duration}</td>',
                                    '</tr>',
                                '</tpl>',
                            '</tpl>',
                        '</tbody>',
                        '</table>',
                            '<p style="color:#474941;font-size:10;font-family: Open Sans, sans-serif;">Fecha de generacion: ' + Ext.Date.format(new Date(), 'Y-m-d H:i:s') + ' Usuario: ' + (window.localStorage.getItem('login') || 'N/A') + '</p>',
                            '<p style="padding-right:15px;float:right;color:#474941;font-size:8;font-family: Open Sans, sans-serif;">POWERED BY DATATRAFFIC SAS 2016</p>',
                            '<br><br>',
                    '</center>',

                '</div>',
                '</body>'].join(''),
                {
                    //Se queda sólo con la Hora
                    splitHour: function(hour)
                    {
                        var result = hour;
                        var arrHours = hour.split(' ');

                        if(arrHours.length>1)
                        {
                            result = arrHours[1];

                            var arrHourDes = result.split(':');

                            result = arrHourDes[0] + ':' + arrHourDes[1];
                        }

                        return result;
                    },
                    //Obtener el label
                    getLabel: function(values)
                    {
                        var strLabelPermitidos = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        var index = values.sequence || 0;
                        return strLabelPermitidos[(index) % strLabelPermitidos.length];
                    }
                });

            //Le pasamos toda la data al tpl
            var htmlFragment = printTplAll.apply(record.data);

            //Armanos la nueva ventana que nos servirá para imprimir
            var myWindow = window.open('', 'Imprimir Ruta del recurso: ' + login, '');
            var myCss = [
                '@media print {',
                        'table { table-layout: fixed;font-size:smaller;border-collapse: collapse; width: 90%;color: #474941;font-family: Open Sans, sans-serif; }th, td { word-wrap:break-word;text-align: left; padding: 8px; } tr:nth-child(even){background-color: #f2f2f2!important;-webkit-print-color-adjust: exact; } th {background-color: #1fbad6; !important;-webkit-print-color-adjust: exact; color: white;}',
                '}',
                'table { table-layout: fixed;font-size:smaller;border-collapse: collapse; width: 90%;color: #474941;font-family: Open Sans, sans-serif; }th, td { word-wrap:break-word;text-align: left; padding: 8px; } tr:nth-child(even) {background-color: #f2f2f2} tr:nth-child(odd) {background-color: #fff}th {background-color: #1fbad6; color: white;}'
            ].join('');
            var myStyle = myWindow.document.createElement('style');
            myStyle.type = 'text/css';
            if (myStyle.styleSheet)
            {
                myStyle.styleSheet.cssText = myCss;
            } 
            else 
            {
                myStyle.appendChild(myWindow.document.createTextNode(myCss));
            }

            myWindow.document.write('<html><head><title>Imprimir Ruta | Recurso: '+ login + ' | Usuario: ' + (window.localStorage.getItem('login') || 'N/A') + '</title>');
            
            var head = myWindow.document.head || myWindow.document.getElementsByTagName('head')[0];
            head.appendChild(myStyle);
            myWindow.document.write('</head><body >');
            myWindow.document.write(htmlFragment);
            myWindow.document.write('</body></html>');

            //Agregamos el path del mapa si exite y el tamaño del mapa lo permite
            var imgMapPrint = myWindow.document.getElementById('idImageMapPrint');
            if(!Ext.isEmpty(imgMapPrint) && !Ext.isEmpty(record.data.rawShape) )
            {
                var pathMap = '&path=weight:5%7Ccolor:0x1fbad6%7Cenc:' + record.data.rawShape;
                if((imgMapPrint.src.length + pathMap.length) < 8192)
                {
                    imgMapPrint.src += pathMap;
                }
            }
        }
    },
    //Muestra una ventana emergente para mostrar el Street View de Google
    onStreetView: function(thisButton, e, eOpts)
    {
        console.log('Click in street view');

        this.bUseStreetView = !this.bUseStreetView;
    },
    //Abre una ventana para mostrar el Google Street View
    openWindowStreetView: function(event)
    {
        console.log('Abriendo el Windows de Google Street View');
        
        var mapPanel = null;

        if(objController.bUseStreetView)
        {
            var mapPanel = Ext.getCmp(AppGlobals.mapId);
        }

        if(!Ext.isEmpty(mapPanel))
        {
            var proj = new OpenLayers.Projection("EPSG:4326");
            var lonlat = mapPanel.map.getLonLatFromPixel(event.xy);

            //Cambiar projeción
            lonlat.transform(mapPanel.map.getProjectionObject(), proj);
            //console.log('Google lonlat:', lonlat);

            var m = moduleConfig;

            //Cerramos el anterior si está abierto
            var winAnterior = Ext.getCmp(m.PopUpStreetViewgroupId + 'Window');
            if(!Ext.isEmpty(winAnterior)){
                winAnterior.destroy();
            }

            //Creamos la nueva ventana
            var popUpStreetView = objController.newWindowPopUp(
                m.PopUpStreetViewgroupId, 
                m.PopUpStreetViewTitleWindow + ' (' + lonlat.lon + ', ' + lonlat.lat + ')',
                m.PopUpStreetViewWidthWindow, 
                m.PopUpStreetViewHeightWindow, 
                m.PopUpStreetViewResizableWindow, 
                m.PopUpStreetViewModalWindow,
                m.PopUpStreetViewDraggableWindow
            );
            
            //Agregamos un label con el iframe
            popUpStreetView.add(
                {
                    xtype : 'label',
                    margin: '0 0 0 0',
                    padding: '0 0 0 0',
                    html: [
                        '<iframe src="', 
                        'js/GoogleStreetViewPanel/google-streetview-panel.html?',
                        'lon=' + lonlat.lon + '&lat=' + lonlat.lat,
                        '" height="100%" width="100%" frameborder=0></iframe>'
                    ].join('')
                }
            );

            //Eventos
            popUpStreetView.on(
                {
                    beforehide: function( thisButton, eOpts )
                    {
                        console.log('Cerrando la Ventana PopUp');
                    },
                }
            );

            //Desplegamos la ventana    
            popUpStreetView.show();

            //Aliniamos respecto a un elemento
            //popUpStreetView.alignTo(AppGlobals.listId, 'c-tr', [-150, 0]);
        }
    },
    //
    addPaginButtonsAndFilter: function()
    {
        var list = Ext.getCmp(AppGlobals.listId);
        list.down('paging')

        suffix = (suffix == undefined) ? '' : suffix ;
        var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });
        if(moduleConfig.grid.searchField === true){
            toolbar.add(
                {
                    xtype: 'textfield',
                    id: moduleConfig.grid.searchId + suffix,
                    emptyText: moduleConfig.grid.searchTitle,
                    enableKeyEvents: true,
                    margin: '5 5 5 5',
                    width: (moduleConfig.grid.searchWidth)?moduleConfig.grid.searchWidth:'50%',
                    columnWidth: 1
                },{
                    xtype: 'button',
                    iconCls: 'cancel-button',
                    tooltip: translateplanningtracking.filter.tooltipButton,
                    fieldName: moduleConfig.grid.searchId + suffix,
                    cls: 'x-btn-default-small',
                    action: 'clearFilter'
                }
            );
        }

        /*
          Agregar filtros multiSelect
        */
        var combos = moduleConfig.grid.pagingToolbarItems;
        $.each(moduleConfig.grid.pagingToolbarItems, function(index, value) {
          toolbar.add(value);
        });

        toolbar.add('->')
        var buttons = moduleConfig.grid.topButtons;
        $.each(moduleConfig.grid.topButtons, function(index, value) {
            var subitem = [];
            if (value.submenu == true) {
                $.each(value.items, function(subindex, subvalue) {
                    subitem[subindex] = new Ext.menu.Item({
                        text    : subvalue.text,
                        value   : subvalue.action,
                        action  : subvalue.action,
                        id      : subvalue.action+suffix,
                        iconCls : subvalue.iconCls,

                    });
                });
                var item = new Ext.button.Button({
                    text    : value.text,
                    value   : value.action,
                    action  : value.action,
                    id      : value.action+suffix,
                    iconCls : value.iconCls,
                    menu    : {
                        items: subitem
                    },
                    handler: function(item) {
                    }
                });
            } else {
                var item = new Ext.button.Button({
                    text    : value.text,
                    value   : value.action,
                    action  : value.action,
                    id      : value.action+suffix,
                    iconCls : value.iconCls,
                    handler : function(item) {
                    }
                });
            }
            toolbar.add(item);
        });
        if(suffix && suffix!=""){
            Ext.getCmp(AppGlobals.listId+suffix).addDocked(toolbar);
        }else{
            Ext.getCmp(AppGlobals.listId).addDocked(toolbar);
        }
    },
    //Agrega todos los recursos
    onAllResourceLoad: function(store, records, successful, eOpts)
    {
        console.log('Cargando todos los recursos - INICIO');

        //Pintando todos los recursos en el mapa
        var map = Ext.getCmp(AppGlobals.mapId);
        var proj = new OpenLayers.Projection("EPSG:4326");
        var color = '#000';
        var strColorStyle  = '#${color}';
        var myStyle =  new OpenLayers.StyleMap({
            'default' :{
                strokeColor   :  strColorStyle,
                strokeOpacity : 0.9,
                strokeWidth   : 10
            },
            'select' :{
                strokeColor   :  strColorStyle,
                strokeOpacity : 0.9,
                strokeWidth   : 10
            }
        });

        myStyle.styles['default'].addRules([

            new OpenLayers.Rule({
                maxScaleDenominator: 15000,
                minScaleDenominator: 0,
                symbolizer: {
                        strokeColor   :  strColorStyle,
                        strokeOpacity : 0.9,
                        strokeWidth   : 10
                    }
                }),
            new OpenLayers.Rule({
                maxScaleDenominator: 100000,
                minScaleDenominator: 15001,
                symbolizer: {
                        strokeColor   : strColorStyle,
                        strokeOpacity : 0.9,
                        strokeWidth   : 5
                    }
                }),
            new OpenLayers.Rule({
                maxScaleDenominator: 500000,
                minScaleDenominator: 100001,
                symbolizer: {
                        strokeColor   :  strColorStyle,
                        strokeOpacity : 0.9,
                        strokeWidth   : 2
                    }
                }),
            new OpenLayers.Rule({
                minScaleDenominator: 500001,
                symbolizer: {
                        strokeColor   :  strColorStyle,
                        strokeOpacity : 0.9,
                        strokeWidth   : 1
                    }
                })

            ]);
         
         //Creacion de Marcadores
         if(!Ext.isEmpty(records))
         {
             for (var i = 0; i < records.length; i++) 
             {
                //console.log('All data records[i]:', records[i]);
                var recordResource = records[i];
                var objStatistics = !Ext.isEmpty(recordResource.data.route)? (recordResource.data.route.statistics || null) : null;
                var iconResource = objController.urlIconNormal(recordResource.raw['icon']);
                
                //Estilo de la linea
                color = this.getLineColor(i);
                
                //Obtenemos o creamos la capa
                var lineLayer = map.map.getLayersByName(recordResource.data.login);
                if(Ext.isEmpty(lineLayer))
                {
                    lineLayer = new OpenLayers.Layer.Vector(
                     records[i].data.login, 
                        {
                            nameLayer: 'layerLogin',
                            styleMap: myStyle,
                        }
                    );
                    map.map.addLayers([lineLayer]);
                }
                else
                {
                    lineLayer = lineLayer.pop();
                }
                
                //Eliminamos el recurso
                var resourceRemove = lineLayer.getFeaturesByAttribute('markerType', 'resource');
                lineLayer.removeFeatures(resourceRemove);
                  
                //Creamos la imagen del recurso
                 var feature = new OpenLayers.Feature.Vector(
                     new OpenLayers.Geometry.Point(recordResource.data.longitude, recordResource.data.latitude ).transform(proj, map.map.getProjectionObject()),
                     {
                         address      : recordResource.data.address,
                         deviceData   : recordResource.data.deviceData,
                         heading      : recordResource.data.heading,
                         latitude     : recordResource.data.latitude,
                         levelGasTank : recordResource.data.levelGasTank,
                         login        : recordResource.data.login,
                         longitude    : recordResource.data.longitude,
                         motor        : recordResource.data.motor,
                         odometer     : recordResource.data.odometer,
                         panic        : recordResource.data.panic,
                         person       : recordResource.data.passanger,
                         resourceId   : recordResource.data.resourceId,
                         rpm          : recordResource.data.rpm,
                         speed        : recordResource.data.speed,
                         status       : recordResource.data.status,
                         trailer      : recordResource.data.trailer,
                         updateTime   : recordResource.data.updateTime,
                         statistics: objStatistics,
                         markerType   : 'resource'
                      },
                     {
                        //http://dev.openlayers.org/docs/files/OpenLayers/Feature/Vector-js.html#OpenLayers.Feature.Vector.style
                        label: recordResource.data.login,
                        labelAlign: 'cm',
                        labelYOffset: -20,
                        fontWeight: 'bold',
                        externalGraphic: iconResource, 
                        graphicHeight: 25, 
                        graphicWidth: 25, 
                     }
                 );
                //Agrego la caracteristica a la capa
                lineLayer.addFeatures(feature);
             }

             //Cargamos los controles
             var controls = map.map.getControlsBy('nameLayerControl', 'controlLogin');
             if(Ext.isEmpty(controls))
             {
                 var linesLayers = map.map.getLayersBy('nameLayer', 'layerLogin');
                 //console.log('linesLayers:', linesLayers);
                 var controlAll = new OpenLayers.Control.SelectFeature(  
                    linesLayers, 
                    { 
                        nameLayerControl: 'controlLogin',
                        onSelect: objController.createPopup, 
                        onUnselect: objController.destroyPopup 
                    }
                );
                map.map.addControl(controlAll);
                controlAll.activate();
             }
         }
         console.log('Cargando todos los recursos - FIN');
    },
    //MetaData Resource All (http://docs.sencha.com/extjs/4.2.1/#!/api/Ext.data.reader.Json)
    metaDataResourceAll: function(thisStore, metaData, eOpts)
    {
        //INICIO - Administramos las estadisticas
        var objStadistics = metaData.statistics;
        var summary = [
          '<table style="margin-top:0px;font-size: smaller;">',
            '<tr>',
              '<td><b>Estado de Tareas:</b></td>',
              '<td><b>P:</b>' + objStadistics.totalPending + '</td>',
              '<td><b>C:</b>'+ objStadistics.totalCancelled + '</td>',
              '<td><b>CI:</b>'+ objStadistics.totalCheckin + '</td>',
              '<td><b>COF:</b>' + objStadistics.totalCheckoutWithForm + '</td>',
              '<td><b>COS:</b>' + objStadistics.totalCheckoutWithoutForm + '</td>',
              '<td><b>A:</b>' + objStadistics.totalApproved + '</td>',
            '</tr>',
            '<tr>',
            '</tr>',
          '</table>'
        ].join('');

        //Actualizamos el label donde se muestra el resumen Total
        Ext.getCmp(controller + 'SummaryLabel').update(summary);
        //FIN - Administramos las estadisticas
    },
    searchSelect: function(combo,record)
    {
        var map = Ext.getCmp(AppGlobals.mapId);
        map.search.clean(null);
        if(map.search.length>-1){
            for (var i = 0; i < map.search.length; i++) {
                map.map.removeLayer(map.search[i]);
                map.search[i] = null;
            }
        }

        var proj = new OpenLayers.Projection("EPSG:4326");
        var searchLayer = new OpenLayers.Layer.Vector('Busqueda');

        var searchFeature = new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point( record[0].data.lng, record[0].data.lat).transform(proj, map.map.getProjectionObject()),
            {
                 name    : record[0].data.name
             },
            {externalGraphic  : 'images/icon/blackfilter.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
        );
        searchLayer.addFeatures([searchFeature]);
        map.map.addLayers([searchLayer]);

        var controls = {
            selector: new OpenLayers.Control.SelectFeature(searchLayer, { onSelect: createPopup, onUnselect: destroyPopup })
        };

        function createPopup(feature) {
            console.info(feature);
                feature.popup = new OpenLayers.Popup.FramedCloud("pop",
                    feature.geometry.getBounds().getCenterLonLat(),
                    null,
                    feature.attributes.name,
                    null,
                    true,
                    function() { controls['selector'].unselectAll(); }
                );
                //feature.popup.closeOnMove = true;
                map.map.addPopup(feature.popup);
        }

        function destroyPopup(feature) {
            feature.popup.destroy();
            feature.popup = null;
        }


        map.map.addControl(controls['selector']);
        controls['selector'].activate();

        var point = new OpenLayers.LonLat(record[0].data.lng,record[0].data.lat);
        point.transform(proj, map.map.getProjectionObject());
        map.map.setCenter(point,16);

        map.search.push(searchLayer);
    },
    openWindowResourceEvents: function()
    {
      console.info('abrio ventana de eventos');

      var list = Ext.ComponentQuery.query('AliasPlanningTrackingList')[0];
      var selModel = list.getSelectionModel();
      if(selModel.hasSelection() && selModel.getCount() == 1){
          var record = selModel.getSelection()[0];
          var resourceId = record.data.resourceId;
          var m = moduleConfig;
          winForm = this.newWindowGrid(m.groupIdResourceEvents, m.titleWindowResourceEvents, m.widthWindowResourceEvents, m.heightWindowResourceEvents, m.resizableWindowResourceEvents, m.toolbarResourceEvents, m.storeResourceEvents, m.columnsResourceEvents,m.menuItemResourceEvents,m.bottomButtonsResourceEvents);

          var store = Ext.data.StoreManager.lookup("PlanningTracking.ListResourcesEvents");

          var jsonSearch = new Object();
          var and = [];

          //Búsquedas AND...
          if (resourceId != undefined) {
            and.push(
              {
                  field      : 'resourceInstance._id',
                  comparison : 'eq',
                  value      : resourceId
              }
            );

          }

          jsonSearch.and = and;

          store.proxy.extraParams = {};

          store.proxy.extraParams = {
              filters : Ext.JSON.encode(jsonSearch)
          };
          store.loadPage(1);

          winForm.show();

      } else {
        Ext.MessageBox.show({
            title   : 'Eventos',
            msg     : 'Debe seleccionar un recurso, para ver sus eventos',
            buttons : Ext.MessageBox.OK,
            icon    : Ext.MessageBox.ERROR
        });
      }



    },
    deleteSearchs: function(win)
    {
      var map = Ext.getCmp(AppGlobals.mapId);
      if(map.search.length>-1){
          for (var i = 0; i < map.search.length; i++) {
              map.map.removeLayer(map.search[i]);
              map.search[i] = null;
          }
      }
    },
    acceptAddress: function(button)
    {
      var win = Ext.getCmp(moduleConfig.groupIdCreateTask+'Window');
      var locationInWindow = win.location;
      var locationHiddenField = Ext.getCmp('PlanningTrackingFormLocation');
      locationHiddenField.setValue(locationInWindow);
      button.hide();
      var addressStatus = Ext.getCmp('PlanningTrackingWindowsSaveCreateTaskAddressEstatusDisplay');
      addressStatus.setValue(translateplanningtracking.form.addressValid);
      addressStatus.show();
    },
    validateAddress: function(button)
    {
        var form = Ext.getCmp(moduleConfig.groupIdCreateTask+'Form').getForm();
        var address = form.findField("address").getValue();
        if(address != ''){
          var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
          Ext.Ajax.request({
              url      : moduleConfig.services.urlAddressGeocoding,
              type     : 'rest',
              dataType : 'json',
              method   : 'GET',
              scope    : this,
              params   : {'address':address},
              success  : function(response){
                msgWait.hide();
                var map = Ext.getCmp(AppGlobals.mapId);
                if(map.search.length>-1){
                    for (var i = 0; i < map.search.length; i++) {
                        map.map.removeLayer(map.search[i]);
                        map.search[i] = null;
                    }
                }
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if(!jsonResponse.error){
                  var acceptButton = Ext.getCmp('PlanningTrackingWindowsSaveCreateTaskAcceptAddressButton');
                  var addressStatus = Ext.getCmp('PlanningTrackingWindowsSaveCreateTaskAddressEstatusDisplay');
                  addressStatus.hide();
                  acceptButton.show();

                  var win = Ext.getCmp(moduleConfig.groupIdCreateTask+'Window');
                  win.location = Ext.JSON.encode(jsonResponse.data[0]);


                  var proj = new OpenLayers.Projection("EPSG:4326");
                  var searchLayer = new OpenLayers.Layer.Vector('Busqueda');

                  var searchFeature = new OpenLayers.Feature.Vector(
                      new OpenLayers.Geometry.Point( jsonResponse.data[0].lng, jsonResponse.data[0].lat).transform(proj, map.map.getProjectionObject()),
                      {
                           name    : jsonResponse.data[0].name
                       },
                      {externalGraphic  : 'images/icon/blackfilter.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
                  );
                  searchLayer.addFeatures([searchFeature]);
                  map.map.addLayers([searchLayer]);

                  var controls = {
                      selector: new OpenLayers.Control.SelectFeature(searchLayer, { onSelect: createPopup, onUnselect: destroyPopup })
                  };

                  function createPopup(feature) {
                      console.info(feature);
                          feature.popup = new OpenLayers.Popup.FramedCloud("pop",
                              feature.geometry.getBounds().getCenterLonLat(),
                              null,
                              feature.attributes.name,
                              null,
                              true,
                              function() { controls['selector'].unselectAll(); }
                          );
                          //feature.popup.closeOnMove = true;
                          map.map.addPopup(feature.popup);
                  }

                  function destroyPopup(feature) {
                      feature.popup.destroy();
                      feature.popup = null;
                  }


                  map.map.addControl(controls['selector']);
                  controls['selector'].activate();

                  var point = new OpenLayers.LonLat(jsonResponse.data[0].lng,jsonResponse.data[0].lat);
                  point.transform(proj, map.map.getProjectionObject());
                  map.map.setCenter(point,16);

                  map.search.push(searchLayer);
                }else{
                  Ext.MessageBox.show({
                      title   : translateplanningtracking.window.MsgErrorValidateAddressFirstTitle,
                      msg     : jsonResponse.msg,
                      buttons : Ext.MessageBox.OK,
                      icon    : Ext.MessageBox.ERROR
                  });
                }

              },
              failure  : function(response) {
                  var res = response.responseText;
                  msgWait.hide();
                  Ext.MessageBox.show({
                      title   : translate.global.create+' '+translateplanningtracking.task,
                      msg     : translateplanningtracking.window.MsgError,
                      buttons : Ext.MessageBox.OK,
                      icon    : Ext.MessageBox.ERROR
                  });
              }
          });
        }else{
          Ext.MessageBox.show({
              title   : translateplanningtracking.window.MsgErrorValidateAddressFirstTitle,
              msg     : translateplanningtracking.window.MsgErrorAddressIsEmpty,
              buttons : Ext.MessageBox.OK,
              icon    : Ext.MessageBox.ERROR
          });
        }

    },
    saveCreateTask: function(button)
    {
      //var form = button.up().up().down('form').getForm();
      var form = Ext.getCmp(moduleConfig.groupIdCreateTask+'Form').getForm();

      /* El formulario tiene los campos llenos */
      if (form.isValid()) {
            var location = form.findField("location").getValue();
        if(location!=''){
            var type = form.findField("type").getValue();
            var name = form.findField("name").getValue();

            var start = form.findField("start").getSubmitValue();
            var end = form.findField("end").getSubmitValue();
            var loadAmount = form.findField("loadAmount").getValue();
            var duration = form.findField("duration").getValue();
            var customerName = form.findField("customerName").getValue();

            var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
            var jsonLocation = Ext.JSON.decode(location);
            var data = {
                'type'        : type,
                'loadAmount'  : loadAmount,
                'name'        : name,
                "location"    : {
                  "locationName": jsonLocation.name,
                  "lat": jsonLocation.lat,
                  "lng": jsonLocation.lng
                },
                'start'       : start,
                'end'         : end,
                'duration'    : duration,
                'customerName': customerName
            }

            Ext.Ajax.request({
                url      : moduleConfig.services.urlTask,
                type     : 'rest',
                dataType : 'json',
                method   : 'POST',
                scope    : this,
                params   : Ext.JSON.encode(data),
                success  : function(response){
                    var res = response.responseText;
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title   : translate.global.create+' '+translateplanningtracking.task,
                        msg     : translateplanningtracking.form.MsgSuccessCreate,
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.INFO
                    });
                    Ext.data.StoreManager.lookup("PlanningTracking.List").reload();
                    winForm.destroy();
                    var map = Ext.getCmp(AppGlobals.mapId);
                    if(map.search.length>-1){
                         for (var i = 0; i < map.search.length; i++) {
                             map.map.removeLayer(map.search[i]);
                             map.search[i] = null;
                         }
                     }
                },
                failure  : function(response) {
                    var res = response.responseText;
                    msgWait.hide();
                    Ext.MessageBox.show({
                        title   : translate.global.create+' '+translateplanningtracking.task,
                        msg     : translateplanningtracking.window.MsgError,
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.ERROR
                    });
                }
            });
        }else {
          Ext.MessageBox.show({
              title   : translate.global.create+' '+translateplanningtracking.task,
              msg     : translateplanningtracking.window.MsgErrorValidateAddressFirst,
              buttons : Ext.MessageBox.OK,
              icon    : Ext.MessageBox.ERROR
          });
        }

      }
    },
    openWindowCreateTask: function()
    {
        return;
        var m = moduleConfig;
        winForm = this.newWindowForm(m.groupIdCreateTask, m.titleWindowCreateTask, m.widthWindowCreateTask, m.heightWindowCreateTask, m.resizableWindowCreateTask, m.toolbarCreateTask, m.itemsFormCreateTask, m.bottomButtonsCreateTask,m.modalWindowCreateTask, m.draggableWindowCreateTask);

        winForm.show();
        winForm.setX(800);
    },
    /**
     * Override
     * Generate a toolbar in Generic grid and push diferenti kind of buttons and menus from moduleConfig object
     * @param {String} suffix
     */
    addListButtons: function(suffix)
    {
        suffix = (suffix == undefined) ? '' : suffix ;
      var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });
        if(moduleConfig.grid.searchField === true){
            toolbar.add(
                {
                    xtype: 'textfield',
                    id: moduleConfig.grid.searchId + suffix,
                    emptyText: moduleConfig.grid.searchTitle,
                    enableKeyEvents: true,
                    margin: '5 5 5 5',
                    width: (moduleConfig.grid.searchWidth)?moduleConfig.grid.searchWidth:'50%',
                    columnWidth: 1
                },{
                    xtype: 'button',
                    iconCls: 'cancel-button',
                    tooltip: translateplanningtracking.filter.tooltipButton,
                    fieldName: moduleConfig.grid.searchId + suffix,
                    cls: 'x-btn-default-small',
                    action: 'clearFilter'
                }
            );
        }

        /*
          Agregar filtros multiSelect
        */
        var combos = moduleConfig.grid.filterToolbar;
        $.each(moduleConfig.grid.filterToolbar, function(index, value) {
          toolbar.add(value);
        });

        toolbar.add('->')
        var buttons = moduleConfig.grid.topButtons;
        $.each(moduleConfig.grid.topButtons, function(index, value) {
            var subitem = [];
            if (value.submenu == true) {
                $.each(value.items, function(subindex, subvalue) {
                    subitem[subindex] = new Ext.menu.Item({
                        text    : subvalue.text,
                        value   : subvalue.action,
                        action  : subvalue.action,
                        id      : subvalue.action+suffix,
                        iconCls : subvalue.iconCls,

                    });
                });
                var item = new Ext.button.Button({
                    text    : value.text,
                    value   : value.action,
                    action  : value.action,
                    id      : value.action+suffix,
                    iconCls : value.iconCls,
                    menu    : {
                        items: subitem
                    },
                    handler: function(item) {
                    }
                });
            } else {
                var item = new Ext.button.Button({
                    text    : value.text,
                    value   : value.action,
                    action  : value.action,
                    id      : value.action+suffix,
                    iconCls : value.iconCls,
                    handler : function(item) {
                    }
                });
            }
            toolbar.add(item);
        });
        if(suffix && suffix!=""){
            Ext.getCmp(AppGlobals.listId+suffix).addDocked(toolbar);
        }else{
            Ext.getCmp(AppGlobals.listId).addDocked(toolbar);
        }
    },
    //Carga las tareas
    onStoreLoad: function(store, records, successful, eOpts )
    {

        var iniTime = Ext.Date.format(new Date(), 'time');
        var initAcumulado = (Number(iniTime) - Number(objController.testCarga))/1000;

        if(objController.arrTestCarga.length==5)
        {
            objController.arrTestCarga = [];
        }
        objController.arrTestCarga.push(initAcumulado);
        console.log('Tiempocarga de datos -> ', initAcumulado + ' Seg', objController.arrTestCarga); 
        console.info('INICIO - Cargando las Tareas -> ' + iniTime);

        //Refrescar sólo si se terminado el tiempo de recarga
        objController.timeUpdate = iniTime;

        if(successful)
        {
            var grid = Ext.ComponentQuery.query('AliasPlanningTrackingList')[0];
            var selModel = grid.getSelectionModel();
            var objSelectResourceOld = JSON.parse(JSON.stringify(this.objSelectResource));
            this.objSelectResource = {};
            
            if(selModel.hasSelection())
            {
                var recordsSelect = selModel.getSelection();
                var i = -1;
                
                //Los registros actuales
                for(i = 0; i< records.length; ++i)
                {
                    var recordActual = records[i];
                    var j = -1;

                    //Buscamos entre los seleccionados
                    for(j = 0; j < recordsSelect.length; ++j)
                    {
                        var recordOld = recordsSelect[j];
                        
                        if(recordOld.internalId == recordActual.internalId)
                        {
                            break;
                        }
                    }

                    if( j != -1 && j != recordsSelect.length)
                    {
                        //Eliminamos de los seleccionados
                        recordsSelect.splice(j, 1);

                        //Repintamos
                        this.onResourceDeSelect(grid, recordActual, recordActual.index);
                        this.onResourceSelect(grid, recordActual, recordActual.index);

                        //Para nuestro control interno de los seleccionados
                        this.objSelectResource[recordActual.data.login] = recordActual.data.login;
                    }
                }
            }

            //Borrar la data vieja que se quedó seleccionada
            for (var idLogin in objSelectResourceOld) 
            {
                if (objSelectResourceOld.hasOwnProperty(idLogin)) 
                {
                    var strLogin = objSelectResourceOld[idLogin];
                    
                    if(Ext.isEmpty(this.objSelectResource[strLogin]))
                    {
                        this.mapRemoveFeaturesById(strLogin);
                    }
                }
            }
        }
    },
    //Obtiene el color de la línea
    getLineColor: function(rowIndex)
    {
	     return this.arrColor[rowIndex % this.arrColor.length];
    },
    //DesSelecciona una fila eliminando el recurso seleccionado
    onResourceDeSelect: function(grid, record, index, eotps)
    {
        console.info('Recurso eliminado: '+ record.data.login + ' - Index: ', index);
        
        var strIdLogin = record.data.login;
        
        //Quitamos en recurso seleccionado, en nuestro control interno 
        if(!Ext.isEmpty(this.objSelectResource[strIdLogin]))
        {
            delete this.objSelectResource[strIdLogin];
        }

        this.mapRemoveFeaturesById(strIdLogin);
    },
    //Pinta las tareas de un recurso seleccionado
    onResourceSelect: function(grid, record, index, eOpts)
    {
        console.info('Recurso agregado: '+ record.data.login + ' - Index: ', index);

        var map = Ext.getCmp(AppGlobals.mapId);
        var color = this.getLineColor(index);
        var proj = new OpenLayers.Projection("EPSG:4326");
        var lineLayer = map.map.getLayersByName(record.data.login);
        var allFeatures = [];

        //Buscamos la capa del recurso seleccionado
        if(Ext.isEmpty(lineLayer))
        {
            alert('Error no se encontró la capa.');
            return;
        }
    
        lineLayer = lineLayer.pop();

        //Agregamos el componente en nuestro control interno
        this.objSelectResource[record.data.login] = record.data.login;

        //Pintamos las rutas si tiene datos
        if(!Ext.isEmpty(record.data.rawShape))
        {
            var formatDataLine = new OpenLayers.Format.EncodedPolyline({geometryType:'linestring'});
            var feature = formatDataLine.read(record.data.rawShape);
           
            feature.geometry.transform(proj, map.map.getProjectionObject());
            feature.data.color = color;
            feature.attributes.color = color;
            feature.attributes.line = record.data.login;
            feature.data.line = record.data.login;
            lineLayer.addFeatures(feature);
        }

        //Creacion de Marcadores de Tareas
        for (var i = 0; i < record.data.tasks.length; i++) 
        {			
            //console.info('Tarea: ', record.data.tasks[i]);
            var groupTasks = record.data.tasks[i];
            var objTask = null;

            for(var j = 0; j < groupTasks.length; ++j)
            {
                objTask = groupTasks[j];

                //Agregamos la caracteristica a la capa
                var feature = new OpenLayers.Feature.Vector(
                    new OpenLayers.Geometry.Point( objTask.location.lng, objTask.location.lat ).transform(proj, map.map.getProjectionObject()),
                    {
                        id          : objTask._id,
                        _id         : objTask._id,
                        code        : objTask.code,
                        name        : objTask.name,
                        loadAmount  : objTask.loadAmount,
                        address     : objTask.address,
                        duration    : objTask.duration,
                        resourceInstance    : record.data.login,
                        type        : objTask.type,
                        status      : objTask.status,
                        lat         : objTask.location.lat,
                        lng         : objTask.location.lng,
                        forms: objTask.forms,
                        allData: objTask, //Es mejor pasar toda la data
                        markerType  : 'task'
                    },
                    { 
                        pointRadius: 18,
                        fontColor: '#FFF',
                        fontOpacity: 0.8,
                        fontSize: '9px',
                        label: '' + (objTask['sequence']===0? 0 :(objTask['sequence'] || -1)),//ii + '-' + (j + 1),//(++i),//( i + 1 ),
                        labelAlign: 'lb',
                        labelOutlineWidth: 4,
                        labelOutlineColor: '#' + color,
                        labelYOffset: 15,
                        labelXOffset: 8, 
                        externalGraphic: objController.getIconTask(objTask.type, objTask.status), 
                        graphicHeight: 25, 
                        graphicWidth: 21, 
                    }
                );
                allFeatures.push(feature);
            }
        }
        //Agregamos todas las caractetistica a la capa
        lineLayer.addFeatures(allFeatures);
        
        //Hacemos zoom out para ver todo en conjunto
        map.map.zoomToExtent(lineLayer.getDataExtent());
    },
    //Quita las caracteristicas de una capa
    mapRemoveFeaturesById: function(strId)
    {
        var map = Ext.getCmp(AppGlobals.mapId);
        var lineLayer = map.map.getLayersByName(strId);
        var featuresRemove = null;

        //Buscamos la capa del recurso seleccionado
        if(Ext.isEmpty(lineLayer))
        {
            alert('Error no se encontró la capa.');
            return;
        }
        
        lineLayer = lineLayer.pop();
        
        //Eliminamos los markers
        featuresRemove = lineLayer.getFeaturesByAttribute('markerType', 'task');
        lineLayer.removeFeatures(featuresRemove);
        
        //Eliminamos el path
        featuresRemove = lineLayer.getFeaturesByAttribute('line', strId);
        lineLayer.removeFeatures(featuresRemove);
    },
    //Creamos las columas dinámicamente según las horas
    createColumns: function()
    {
        console.log('Creando las columnas de horas.');
        
        var columns = moduleConfig.grid.columns;

      for (var i = moduleConfig.grid.hoursColumnStart; i < moduleConfig.grid.hoursColumnEnd; i++) 
      {    
          columns.push({
              xtype     : 'templatecolumn',
              dataIndex : 'tasks',
              text      : ((i<10)? '0' : '') + i + ':00',
              hour      : i,
              autoSizeColumn: true,
              tpl       :  new Ext.XTemplate([
                '<tpl for="tasks[' + i + ']">',
                    
                    //"<tpl if='this.isOnHour(arrival_time,"+i+")'>",
                        '<a id={[this.getLinkId(values)]} href="" class="tooltip-tasks">',
                            '<img class="gridtaskIcon" src={[this.getIcon(values)]} />',
                            '<span class="topNumberTask" style="{[this.getBorderColorStyle(values)]}">{[this.getSequence(values)]}</span>',
                            '<span class="tooltiptext-tasks">',
                                '{name}<br/>',
                                '{address}<br/>',
                                translateplanningtracking.marker.loadAmount+':{loadAmount} '+translateplanningtracking.marker.duration+':{duration}',
                            '</span>',
                        '</a>',
                        //'{% if (xindex == 1) break; %}',
                    //'</tpl>',
                    
                '</tpl>',
                //'{[this.allData(values.tasks[' + i + '])]}',
                ].join(''),
              {
                //
                getSequence(values)
                {
                    return (values['sequence']===0? 0 :(values['sequence'] || -1));
                },
                //Verificamos si es la hora para desplegar icono
                isOnHour: function(arrival_time, hour)
                {
                    var bResult = false;

                    if(!Ext.isEmpty(arrival_time)){
                        var arrivalTimeHour = parseInt(arrival_time.substring(11, 13));
                        bResult = (arrivalTimeHour == hour);
                    }

                    return bResult;
                },
                //
                getLinkId: function(values) 
                {
                    //console.log('En getLinkId - This:', this);
                    var linkId = Ext.id() + '||' + values._id + '||' + values.location.lat + '||' + values.location.lng;
                    
                    Ext.Function.defer(this.addOnClickForTask, 1000, this, [linkId, values]);
                    
                    return linkId;
                },
                //
                addOnClickForTask: function(id) 
                {   
                    //console.log('Hice Click - Arguments', arguments);
                    var htmlElement = Ext.get(id);

                    if(Ext.isEmpty(htmlElement))
                    {
                        return;
                    }

                    //Click Izquierdo
                    Ext.get(id).on('click', this.centerMapToTask);
                    //Click Derecho
                    Ext.get(id).on('contextmenu', this.onDisplayContextualMenu, arguments[1]);
                },
                //
                centerMapToTask : function(eventObj, htmlElementObj)
                {
                    console.info('Centrando el mapa según tarea.');
                    
                    eventObj.stopEvent();
                    
                    var map = Ext.getCmp(AppGlobals.mapId)
                    var valueStr = this.id.split("||");
                    var proj = new OpenLayers.Projection("EPSG:4326");
                    var point = new OpenLayers.LonLat(valueStr[3], valueStr[2]);

                    point.transform(proj, map.map.getProjectionObject());
                    map.map.setCenter(point, 16);
                },
                //Despliega un menú contextual para la tarea seleccionada
                onDisplayContextualMenu: function(objEvent, objHtmlElement, obj)
                {
                    objEvent.preventDefault(); //Cancela los otros eventos
                    
                    console.log('Click Derecho. Argumentos: ', arguments, ' Valores pasados por Scope: ', this);

                    var allDataTask = this;
                    var items = [
                            {
                                text: 'Ver Información',
                                iconCls: 'edit',
                                handler: function()
                                {
                                    //Con el Grid usamos el Id para obtener el login
                                    var grid = Ext.getCmp(AppGlobals.listId);
                                    var record = grid.getStore().findRecord('resourceId', allDataTask.id_resourceInstance);
                                    
                                    if(!Ext.isEmpty(record))
                                    {

                                        var map = Ext.getCmp(AppGlobals.mapId);
                                        var layer = map.map.getLayersByName(record.data.login);
                                        
                                        if(!Ext.isEmpty(layer))
                                        {
                                            layer = layer.pop();
                                            var task = layer.getFeaturesByAttribute('id', allDataTask._id);

                                            if(!Ext.isEmpty(task))
                                            {
                                                task = task.pop();
                                                
                                                objController.createPopup(task);
                                            }
                                        }
                                    }
                                }
                            },
                            {
                                text: 'Ver registros',
                                iconCls: 'edit',
                                handler: function()
                                {
                                    objController.popUpViewRegistersGrid(allDataTask);
                                }
                            }
                        ];
                    //Agregamos el cancelar si está pendiente
                    /*if(allDataTask.status == 'PENDIENTE')
                    {
                        items.push({
                            text: 'Cancelar tarea',
                            iconCls: 'edit',
                            handler: function()
                            {
                                objController.popUpCancelTask(allDataTask);                            
                            }
                        });
                    }*/
                    var contextMenu = new Ext.menu.Menu({
                        fixed: true,
                        x: objHtmlElement.x + 30,
                        y: objHtmlElement.y,
                        items: items
                    });

                    contextMenu.show();
                },
                //Obtenemos el iconos a mostrar
                getIcon: function(values)
                {
                    return objController.getIconTask(values.type, values.status);
                },
                //Obenemos el estilo para el border (http://stackoverflow.com/questions/13426875/text-border-using-css-border-around-text)
                getBorderColorStyle: function(values)
                {
                    var color = '#0ff';
                    var grid = Ext.getCmp(AppGlobals.listId);
                    var record = grid.getStore().findRecord('resourceId', values.id_resourceInstance);
                    
                    if(!Ext.isEmpty(record) && !Ext.isEmpty(record.data.color)){
                        color = '#' + record.data.color;
                    }

                    var borderColorStyle = [
                        'text-shadow: ',
                        '2px 0 0 ' + color,
                        ', -2px 0 0 ' + color,
                        ', 0 2px 0 ' + color,
                        ', 0 -2px 0 ' + color,
                        ', 1px 1px ' + color,
                        ', -1px -1px 0 ' + color,
                        ', 1px -1px 0 ' + color,
                        ', -1px 1px 0 ' + color
                    ];
                    
                    return borderColorStyle.join('');
                },
                /*allData(values)
                {
                    return '<a id="ext-gen2877||57f47ef6e13823786d756bbd||19.397654||-99.197582" href="" class="tooltip-tasks"><img class="gridtaskIcon" src="images/icon/markers/status/stop/pendiente_blue.png"><span class="topNumberTask" style="text-shadow: 2px 0 0 #d80027, -2px 0 0 #d80027, 0 2px 0 #d80027, 0 -2px 0 #d80027, 1px 1px #d80027, -1px -1px 0 #d80027, 1px -1px 0 #d80027, -1px 1px 0 #d80027">5</span><span class="tooltiptext-tasks">1995-ABARROTES SAN CARLOS<br>CALLE JILGUERO 0<br>Carga: :0 Duración: :</span></a>';
                },*/
              }
            )
          });
      }

      //grid.reconfigure(null,columns); //No sé porqué no se utiliza
    },
    //Carga las tareas y datos iniciales
    onLoadTasks: function(e)
    {
        //Reiniciamos los valores
        var map = Ext.getCmp(AppGlobals.mapId);
        map.search = [];

        //Activando el control click en el mapa
        var click = new OpenLayers.Control.Click();
        map.map.addControl(click);
        click.activate();
        
        //Activando la Recarga Automática
        this.mapTask.start();
    },
    /**
    * Search criteria @ PlanningTracking Store
    */
    multiSearch: function (combo, record, index, eOpts)
    {
        console.info(eOpts)
        /**
        * Get Store
        */
        var store = Ext.data.StoreManager.lookup("PlanningTracking.List");
        var searchKeyword = Ext.getCmp(controller + 'FilterResourceLogin').getValue();
        var resourceType = Ext.getCmp(controller + 'FilterResourceType').getValue();
        var resourceGroup = Ext.getCmp(controller + 'FilterResourceGroup').getValue();
        var taskStatus = Ext.getCmp(controller + 'FilterTaskStatus').getValue();
        var dateTask = Ext.getCmp(controller + 'FilterResourceFecha').getValue();
        var codeTask = Ext.getCmp(controller + 'FilterResourceCode').getValue();
        var nameTask = Ext.getCmp(controller + 'FilterTaskName').getValue();

        //Cambiar el titulo del panel principal de filtro
        var panelFiltersPather = Ext.getCmp(AppGlobals.filterId + 'pather');
        var headerFilter =  panelFiltersPather.getHeader();
        var strHeaderTitle = headerFilter.title;

        if(!Ext.isEmpty(searchKeyword) || !Ext.isEmpty(resourceType) || !Ext.isEmpty(resourceGroup) || !Ext.isEmpty(taskStatus)){
            headerFilter.setTitle(strHeaderTitle.split(' ')[0] + ' (Activo)');
            //panelFiltersPather.doLayout();
        }else{
            headerFilter.setTitle(strHeaderTitle.split(' ')[0]);
            //panelFiltersPather.doLayout();
        }

        //Json filter
        var jsonSearch = new Object();
        var jsonGroupOr = new Object();
        var jsonResourceTypeOr = new Object();
        var jsonResourceGroupOr = new Object();
        var jsonTaskStatusOr = new Object();

        var and = [];
		
		//Id company
		and.push(
			{
				field      : 'resourceInstance.id_company',
				comparison : 'eq',
				value      : window.localStorage.getItem('id_company')
			}
		);		

        //Recurso Login
        if (!Ext.isEmpty(searchKeyword)) 
        {
            and.push(
                {
                    field      : 'resourceInstance.login',
                    comparison : 'lk',
                    value      : searchKeyword
                }
            );
        }

        //Fecha
        if (!Ext.isEmpty(dateTask)) {
            and.push(
                {
                    field      : 'route.date',
                    comparison : 'eq',
                    value      : Ext.Date.format(dateTask, 'Y-m-d H:i:s')
                }
            );
        }

        //Nombre de la tarea/Ids
        if (!Ext.isEmpty(nameTask)) 
        {
            and.push(
                {
                    field      : 'route.tasks._id',
                    comparison : 'in',
                    value      : nameTask
                }
            );
        }

        //Nro Guia - Code de la tarea
        if (!Ext.isEmpty(codeTask)) 
        {
            and.push(
                {
                    field      : 'route.tasks.code',
                    comparison : 'lk',
                    value      : codeTask
                }
            );
        }

        //Estados de las tareas
        if(!Ext.isEmpty(taskStatus))
        {
            jsonTaskStatusOr = {
                field      : 'route.tasks.status',
                comparison : 'in',
                value      : taskStatus
            };
            and.push(jsonTaskStatusOr);
        }

        //Grupos de los recursos
		if (!Ext.isEmpty(resourceGroup)) 
        {
            jsonResourceGroupOr =
            {
                field      : 'resourceInstance.resourceGroups',
                comparison : 'in',
                value      : resourceGroup
            };		  
            and.push(jsonResourceGroupOr);
		}
		
        //Tipos de recursos
		if (!Ext.isEmpty(resourceType)) 
        {
            jsonResourceTypeOr =
            {
                field      : 'resourceInstance.id_resourceDefinition',
                comparison : 'in',
                value      : resourceType
            };		  
            and.push(jsonResourceTypeOr);
		}

        if(!Ext.isEmpty(and))
        {
            jsonSearch.and = and;
        }

        //
        console.info(jsonSearch);
        
        Ext.Ajax.abort(store.proxy.activeRequest);

        store.proxy.extraParams = {
            filters : Ext.JSON.encode(jsonSearch)
        };

        store.loadPage(1);

        //Actualizar las fechas en el combo del grid 2 -- OJO con los mapas no se pintan revisar bien
        var list2 = Ext.ComponentQuery.query('AliasPlanningTrackingList0')[0];
        if(list2.isVisible())
        {
            var comboResource = Ext.getCmp(controller + 'GridSecondResource');
            var storeComboResource = comboResource.getStore();
            var filtersStoreComboResource = Ext.JSON.decode(storeComboResource.proxy.extraParams.filters);
            var fechaFilter =  Ext.getCmp(controller + 'FilterResourceFecha').getValue();

            //Debemos filtrar los recursos
            //console.log('storeComboResource.proxy.extraParams:', storeComboResource.proxy.extraParams);
            filtersStoreComboResource.and = [
                {
                    field: 'resourceInstance.id_company',
                    comparison: 'eq',
                    value: window.localStorage.getItem('id_company')
                },
                {
                    field:'route.date',
                    comparison:'eq',
                    value: Ext.Date.format(fechaFilter, 'Y-m-d H:i:s')
                },
            ];

            storeComboResource.proxy.extraParams.filters = Ext.JSON.encode(filtersStoreComboResource);
            
            storeComboResource.load(function(records, operation, success) 
                {
                    var comboResourceValue = comboResource.getValue();
                    objController.updateStoreSecondGrid(comboResource, comboResourceValue, comboResourceValue, null);      
                }
            );
        }
    },
    //Limpia los filtros - Función que se sobre escribe del core
    clearFilter: function()
    {
        console.log('Limpiando Filtros');
        
        //Limpiamos todos los filtros
        Ext.getCmp(AppGlobals.filterId).getForm().reset();

        //Colocamos la hora del día actual
        Ext.getCmp(controller + 'FilterResourceFecha').setValue(new Date());
        
        //Realizamos la Busqueda con los filtros limpios
        this.multiSearch();
    },
    //Limpia un sólo filtro
    clearFilterField: function(thisButton, eEvent, eOpts)
    {
        //console.log('Limpia el filtro del boton: ', thisButton);
        
        var field = Ext.getCmp(thisButton.fieldName);

        if(!Ext.isEmpty(field)){
            field.reset();
        }

        this.multiSearch();
    },
    //
	setResourceDefinitionInResourceGroupCombo: function ( combo, records, eOpts ) 
    {
		var filters = {
			 'and':[
				   {
					   field: 'id_company',
					   comparison: 'eq',
					   value: window.localStorage.getItem('id_company')
				   },
			   ]

		};	
		
		var ids = [];
		for (var i = 0; i < records.length; i++) {
			ids[i] = records[i].data._id;
		}		
		if(ids.length > 0) {
			filters.and.push({field: 'id_resourceDefinition',comparison: 'in',value: ids});
		}
		
		var resourceGroupStore = Ext.getCmp(controller + 'FilterResourceGroup').getStore();
		resourceGroupStore.proxy.extraParams = {filters : Ext.JSON.encode(filters)};
		resourceGroupStore.reload();
	},
    //	
	unSetResourceDefinitionInResourceGroupCombo: function (button) 
    {
		console.log('unSetResourceDefinitionInResourceGroupCombo');
		var filters = {
			 'and':[
				   {
					   field: 'id_company',
					   comparison: 'eq',
					   value: window.localStorage.getItem('id_company')
				   },
			   ]
		};	
		
		var resourceGroupStore = Ext.getCmp(controller + 'FilterResourceGroup').getStore();
		resourceGroupStore.proxy.extraParams = {filters : Ext.JSON.encode(filters)};
		resourceGroupStore.reload();

        this.clearFilterField(button);
	},
    //Centra en el recurso
    onCenterMap:function(lat, lng)
    {
        console.log('Centrando en el recurso.', lat, lng);

        //eventObj.stopEvent(); //Ojo con los eventos
                    
        var map = Ext.getCmp(AppGlobals.mapId)
        var proj = new OpenLayers.Projection('EPSG:4326');
        var point = new OpenLayers.LonLat(lng, lat);

        point.transform(proj, map.map.getProjectionObject());
        map.map.setCenter(point, 16);
    },
    //Lanza un contextual menú para el recurso seleccionado
    resourceContextMenu: function(objHTML)
    {
        var event = window.event;
        var strLogin = objHTML.id || '';

        //Paramos el evento
        if(!Ext.isEmpty(event.preventDefault))
            event.preventDefault();
        if(!Ext.isEmpty(event.stopPropagation))
            event.stopPropagation();
        
        //Creamos el contextual menú
        var contextMenu = new Ext.menu.Menu({
            fixed: true,
            x: event.clientX - event.offsetX + 26,
            y: event.clientY - event.offsetY,
            items: [
                {
                    text: 'Imprimir',
                    iconCls: 'edit',
                    handler: function()
                    {
                        objController.printMap(null);
                    }
                },
                {
                    text: 'Ir a Monitoreo de Recursos',
                    iconCls: 'edit',
                    handler: function()
                    {
                        var objGET = {
                            login: strLogin
                        };

                        //Nos vamos a la página Monitoreo de Recursos con el id seleccionado
                        objController.redirectPage('ResourceTracking', objGET);
                    }
                },
                {
                    text: 'Ver Detalle del Recurso',
                    handler: function()
                    {
                        //alert('En desarrollo');
                        var map = Ext.getCmp(AppGlobals.mapId);
                        var layer = map.map.getLayersByName(strLogin);

                         if(!Ext.isEmpty(layer))
                        {
                            layer = layer.pop();
                            var resource = layer.getFeaturesByAttribute('markerType', 'resource');

                            if(!Ext.isEmpty(resource))
                            {
                                resource = resource.pop();
                                
                                objController.createPopup(resource);
                            }
                        }
                    }
                },
                {
                    text: 'Ver tabla de tareas',
                    handler: function()
                    {
                        //Ocultamos el grid principal
                        var firstGrid = Ext.getCmp(AppGlobals.listId);
                        firstGrid.hide();
                        
                        //Desplegamos el otro grid
                        var secondGrid = Ext.getCmp(AppGlobals.listId + 0);
                        secondGrid.show();
                        
                        //La barra del paginado
                        var grid2DockBottom = Ext.getCmp('idDockBottom' + AppGlobals.listId + 0);

                        //Eliminamos lo viejo
                        grid2DockBottom.remove(AppGlobals.listId + 0 + 'PagingToolbar',true);
                        grid2DockBottom.doLayout();

                        //Agregamos los componentes nuevos
                        var buttonsNew =  Ext.getCmp(controller + 'BackToFirstGrid');
                        if(Ext.isEmpty(buttonsNew))
                        {
                            grid2DockBottom.add({
                                xtype:'toolbar',
                                ui: 'footer',
                                items: moduleConfig.subgrid[0].pagingToolbarItems
                            });
                            grid2DockBottom.doLayout();
                        }

                        //Asignamos el recurso y filtramos
                        var comboResource = Ext.getCmp(controller + 'GridSecondResource');
                        var storeComboResource = comboResource.getStore();
                        var filtersStoreComboResource = Ext.JSON.decode(storeComboResource.proxy.extraParams.filters);
                        var idLogin = objHTML.name || '';
                        var fechaFilter =  Ext.getCmp(controller + 'FilterResourceFecha').getValue();

                        //Debemos filtrar los recursos
                        //console.log('storeComboResource.proxy.extraParams:', storeComboResource.proxy.extraParams);
                        filtersStoreComboResource.and = [
                            {
                                field: 'resourceInstance.id_company',
                                comparison: 'eq',
                                value: window.localStorage.getItem('id_company')
                            },
                            {
                                field:'route.date',
                                comparison:'eq',
                                value: Ext.Date.format(fechaFilter, 'Y-m-d H:i:s')
                            },
                        ];

                        storeComboResource.proxy.extraParams.filters = Ext.JSON.encode(filtersStoreComboResource);
                        
                        storeComboResource.load(function(records, operation, success) 
                            {
                                comboResource.setValue(idLogin);      
                            }
                        );
                    }
                },
            ]
        });

        contextMenu.show();
    },
    //Abre una ventana para ver el registro especifico de una tarea
    openWindowRegistersOfTask: function(thisButton, event, record)
    {
        var winViewForm = this.newWindow(
            moduleConfig.ViewFormRecordGroupId,
            moduleConfig.ViewFormRecordTitleWindow,
            moduleConfig.ViewFormRecordWidthWindow,
            moduleConfig.ViewFormRecordHeightWindow,
            moduleConfig.ViewFormRecordResizableWindow,
            moduleConfig.ViewFormRecordModalWindow,
            moduleConfig.ViewFormRecordDraggableWindow
        );

        winViewForm.add({
            xtype:'label',
            id: moduleConfig.ViewFormRecordGroupId + 'label',
            tpl: new Ext.XTemplate(
                [
                    '<tpl foreach=".">',
                        '<div class="panel-body" style="margin: 10px; border: 1px solid #adadad;border-radius: 10px;">',
                            '<span style="font-weight: bold;color: #1894ab;">',
                                '{$}',
                            ':</span> ',
                            '<span style="color: #1ba7c0;">',
                                //'{.}',
                                '{[this.getValue(values)]}',
                            '</span>',
                        '</div>',
                    '</tpl>'
                ].join(''),
                {
                    //Obtiene el valor
                    getValue: function(value)
                    {
                        //console.log('En registro, valor:', value, ' - typeof: ', typeof value);
                        var strTypeValue = typeof value;
                        var result = value;

                        switch (strTypeValue) 
                        {
                            case 'object':
                                var resultTable = '<table style="width:100%; border: 1px solid #1894ab;font-size: 13px"><tr style="background: #1894ab;color: #fff">####PC####</tr>';
                                var columnsName = {};

                                //Agrego las filas de datos
                                for(var i=0; i<value.length; ++i)
                                {
                                    var row = value[i];
                                    resultTable += '<tr>';
                                    for (var key in row) 
                                    {
                                        if (row.hasOwnProperty(key)) 
                                        {
                                            var element = row[key];

                                            //Agrego la columna si no está
                                            if(Ext.isEmpty(columnsName[key]))
                                            {
                                                columnsName[key] = key;
                                            }
                                            
                                            resultTable += '<td>' + element + '</td>';
                                        }
                                    }
                                    resultTable += '</tr>'; 
                                }
                                
                                //Agrego la fils de titulos
                                var strRowColums = '';
                                for (var key in columnsName) 
                                {
                                    if (columnsName.hasOwnProperty(key)) 
                                    {
                                        var element = columnsName[key]; 
                                        strRowColums += '<th>' + element + '</th>';
                                    }
                                }

                                resultTable += '</table>'; 

                                result = resultTable.replace('####PC####', strRowColums);
                                break;
                        }

                        return result;
                    }
                }
            )
        });
        
        //console.log('record.data.dataElastic:', record.data.dataElastic);
        Ext.getCmp(moduleConfig.ViewFormRecordGroupId + 'label').update((record.data.dataElastic || {"Vacio":"Es vacio."}));

        winViewForm.show();
    },
    //// Funciones propias de las tareas
    //Funcion que define el icono a utilizar en el marcador del mapa
    getIconTask: function (typeTask,  statusTask)
    {
        //Manejo de Estado Inicio/Fin
        if(typeTask.toLowerCase()=='start' || typeTask.toLowerCase()=='end'){
            typeTask = 'inifin';
        }

        var strResultIcon = moduleConfig.map.icons.default;
        var strIndexIcon = objController.utilStrLowerCamelCase(typeTask) + '_' + objController.utilStrLowerCamelCase(statusTask);
        
        //Estandar propiedad icons: {type}_{status} -- lowerCamelCase
        if(!Ext.isEmpty(moduleConfig.map.icons[strIndexIcon])){
            strResultIcon = moduleConfig.map.icons[strIndexIcon];
        }

        return strResultIcon;
    },
    //XTemplate PopUp Tarea
    xTemplatePopUpTask:function()
    {
        var taskMarkerTemplate = new Ext.XTemplate(
            [
                '<div class="markerContent">',
                    '<center>',
                        '<h2 style="color: #fff; background-color:#1fbad6;padding:5px; margin: 0;"> {name} </h2>',
                    '</center>',
                    '<hr style="color: #1fbad6;">',
                    '<center>',
                        '<table align="center" style="margin-top:0px;font-size: smaller;width:100% "">',
                            '<tr><td><b>'+ 'Hora Inicio:' +'</b></td><td>{allData.arrival_time}</td></tr>',
                            '<tpl if="!Ext.isEmpty(allData.checkin)">',
                                '<tr><td><b>'+ 'Hora Checkin:' +'</b></td><td>{allData.checkin.date}</td></tr>',
                            '</tpl>',
                            '<tpl if="!Ext.isEmpty(allData.checkout)">',
                                '<tr><td><b>'+ 'Hora Checkout:' +'</b></td><td>{allData.checkout.date}</td></tr>',
                            '</tpl>',
                            '<tr><td><b>'+ translateplanningtracking.marker.code +'</b></td><td>{code}</td></tr>',
                            '<tr><td><b>'+ translateplanningtracking.marker.name +'</b></td><td >{name}</td></tr>',
                            '<tr><td><b>'+ translateplanningtracking.marker.status +'</b></td><td>{status}</td></tr>',
                            '<tr><td><b>'+ translateplanningtracking.marker.loadAmount +'</b></td><td>{loadAmount}</td></tr>',
                            '<tr><td><b>'+ translateplanningtracking.marker.address +'</b></td><td>{address}</td></tr>',
                            '<tr><td><b>'+ translateplanningtracking.marker.duration +'</b></td><td>{duration}</td></tr>',
                            '<tr><td><b>'+ translateplanningtracking.marker.type +'</b></td><td>{type}</td></tr>',
                            '<tr><td><b>'+ translateplanningtracking.marker.resourceInstance.login +'</b></td><td>{resourceInstance}</td></tr>',
                        '</table>',
                        '<button id={[this.getViewFormButtonId(values)]} style="background-color: #1fbad6;border: 1px solid #adadad;color: white;padding: 3px 8px;text-align: center;text-decoration: none;display: inline-block;font-size: 12px; margin: 2px 1px;cursor: pointer;" >',
                            translateplanningtracking.popup.viewRecord,
                        '</button>',
                        //Boton para abrir ventana Ver Detalle
                        '<button id={[this.getDetailButtonId(values)]} style="background-color: #1fbad6;border: 1px solid #adadad;color: white;padding: 3px 8px;text-align: center;text-decoration: none;display: inline-block;font-size: 12px; margin: 2px 1px;cursor: pointer;" >',
                            translateplanningtracking.popup.detailButton,
                        '</button>',
                        '&nbsp;',
                        //Boton para Cancelar Tarea
                        '<tpl if="status == \'PENDIENTE\'">',
                            '<button id={[this.getCancelButtonId(values)]} style="background-color: #474941; border: 1px solid #adadad;color: white;padding: 3px 8px;text-align: center;text-decoration: none;display: inline-block;font-size: 12px; margin: 2px 1px;cursor: pointer;">',
                                translateplanningtracking.popup.cancelButton,
                            '</button>',
                        '</tpl>',
                    '</center>',
                '</div>',
          ].join(''),
          {
            //
            getViewFormButtonId: function(values)
            {
                var linkId = Ext.id() + '||' + values.id + '||' + values.resource + '||record';
                
                Ext.Function.defer(this.addOnClickForViewForm, 500, this, [linkId, values]);
                
                return linkId;
            },
            //
            getDetailButtonId: function(values)
            {
                var linkId = Ext.id() + '||' + values.id + '||' + values.resource + '||Detail';
                
                Ext.Function.defer(this.addOnClickForViewDetail, 500, this, [linkId, values]);
                
                return linkId;
            },
            //
            getCancelButtonId: function(values)
            {
                var linkId = Ext.id() + '||' + values.id + '||' + values.resource + '||' + values.lat + '||'+ values.lng +'||Cancel';
                
                //Ext.Function.defer(this.addOnClickForCancel, 500, this, [linkId]);
                
                return linkId;
            },
            //
            addOnClickForViewForm: function(id, values) 
            {
                Ext.get(id).on('click', this.openFormWindow, values);
                console.log('id for viewDetail -- ' + id);
            },
            //
            addOnClickForViewDetail: function(id, values) 
            {
                Ext.get(id).on('click', this.openDetailWindow, values);
                console.log('id for viewDetail -- ' + id);
            },
            //
            addOnClickForCancel: function(id) 
            {
                Ext.get(id).on('click', this.cancelTask);
                console.log('id for viewDetail -- ' + id);
            },
            //
            openFormWindow : function(eventObj, htmlElementObj)
            {
                eventObj.stopEvent();
                
                console.info('Abrir Ventana de Formulario');
                
                objController.popUpViewRegistersGrid(this);
            },
            //
            openDetailWindow : function(eventObj, htmlElementObj)
            {
                console.info('Abrir Ventana de Detalle');
                
                eventObj.stopEvent();
                
                var task = this;
                console.log('THIS:', task);

                objController.popUpViewDetailTask(task, this);
            },
            //Cancela una tarea
            cancelTask : function(eventObj, htmlElementObj)
            {
                eventObj.stopEvent();

                console.info('Abrir Ventana de Detalle');
                
                var task = this;

                objController.popUpCancelTask(task);
                
            }
          }
        );

        return taskMarkerTemplate;
    },
    //Ver detalle de tareas Historico de Estados
    popUpViewDetailTask: function(task, scope)
    {
        var m = moduleConfig;
        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

        Ext.Ajax.request({
            url    : moduleConfig.services.listResourcesEventsUrl,
            type     : 'rest',
            dataType : 'json',
            method   : 'GET',
            scope    : scope,
            params:{
                filters: Ext.JSON.encode({
                    and:[
                        {
                            field: 'task._id',
                            comparison: 'eq',
                            value: task._id //'57dc5a2ee1382375a6552c23'
                        },
                        {
                            field: 'code',
                            comparison: 'in',
                            value: ['EVCHECKIN', 'EVCHECKOUTWITHOUTFORM', 'EVCHECKOTWITHFORM']
                        },
                        {
                            field: 'eventType',
                            comparison: 'in',
                            value: ['CHECKOUT', 'CHECKIN']
                        },
                    ]
                }),
                sort:Ext.JSON.encode([
                    {
                        property: 'updateTime',
                        direction: 'ASC'
                    }
                ])
            },
            success  : function(response)
            {
                var jsonResponse = Ext.JSON.decode(response.responseText)
                
                msgWait.hide();
                
                var winTaskDetail = objController.newWindow(
                    m.groupIdTaskDetail, 
                    m.titleWindowTaskDetail, 
                    m.widthWindowTaskDetail, 
                    m.heightWindowTaskDetail, 
                    m.resizableWindowTaskDetail
                );
                
                var labelTPL = new Ext.XTemplate(
                    [
                        '<center>',
                            '<h2 style="color: #fff; background-color:#1fbad6;padding:5px;margin:0;font-size: 20px;"> Detalle Tarea </h2>',
                            '<table style="margin:5px;">',
                            '<tpl if="!Ext.isEmpty(values.events)">',
	                            '<tr>',
		                            '<td align="center">',
		                                '<img src="{[this.getIconStatus({task:{type:values.events[0].task.type, status:"PENDIENTE"}})]}">',
		                            '</td>',
		                            '<td style="color: #adadad;font-size: 14px;">',
		                                '<center></center>',
		                            '</td>',
	                            '</tr>',
                            '</tpl>',
                                '<tpl for="events">',
	                                '<tr>',
		                                '<td align="center">',
		                                    '<img height="40%" src="images/icon/arrowDoble.png">',
		                                '</td>',
		                                '<td style="color: #474941;font-size: 14px;">',
		                                    '<center>{[this.getDescription(values.description)]}</center>',
		                                '</td>',
	                                '</tr>',
                                    '<tr>',
                                        '<td align="center">',
                                            '<img src="{[this.getIconStatus(values)]}">',
                                        '</td>',
                                        '<td style="color: #adadad;font-size: 14px;">',
                                            '<center>{[this.getHour(values.updateTime)]}</center>',
                                        '</td>',
                                    '</tr>',
                                    '<tpl if="xcount != xindex">',
                                        
                                    '</tpl>',                                    
                                '</tpl>',
                                '<tpl if="events.length == 0">',
                                        'No se ha realizado ninguna acci&oacute;n sobre esta tarea.',
                                '</tpl>',
                            '</table>',
                        '</center>'
                    ].join(''),
                    {
                        getHour: function(updateTime)
                        {   
                            var arrUpdateTime = updateTime.split(' ');
                            return arrUpdateTime[0] + '<br/>' + arrUpdateTime[1];
                        },
                        getIconStatus: function(values)
                        {   
                        	console.log( JSON.stringify(values) );
                            return objController.getIconTask(values.task.type, values.task.status);
                        },
                        getDescription: function(description)
                        {   
                            //var arrDescription = description.split(' ');
                            //return arrUpdateTime[0] + '<br/>' + arrUpdateTime[1];
                            return description;
                        },
                    }
                );
                                
                winTaskDetail.add({
                    id: 'idPlanningTrackingLabelViewDetail',
                    xtype: 'label',
                    tpl: labelTPL,
                });

                //Cargamos los datos el label
                var labelText = Ext.getCmp('idPlanningTrackingLabelViewDetail');
                labelText.update({events:jsonResponse.data});     

                //Desplegamos la ventana
                winTaskDetail.show();
            },
            failure  : function(response) 
            {
                msgWait.hide();
                Ext.MessageBox.show({
                    title   : translateplanningtracking.window.title,
                    msg     : translateplanningtracking.window.MsgError,
                    buttons : Ext.MessageBox.OK,
                    icon    : Ext.MessageBox.ERROR
                });
            }
        });
    },
    //Ver los registros
    popUpViewRegistersGrid: function(task)
    {
        var m = moduleConfig;
        var winGrid = objController.newWindowSimpleGrid(
            m.ViewFormsgroupId,
            m.ViewFormsTitleWindow,
            m.ViewFormsWidthWindow,
            m.ViewFormsHeightWindow,
            m.ViewFormsResizableWindow,
            m.ViewFormsStore, 
            m.ViewFormsColumns, 
            m.ViewFormsMenuItem, 
            [],
            m.ViewFormsModalWindow,
            m.ViewFormsDraggableWindow
        );

        //Actualizamos el store de los registros para esa tarea
        var store = Ext.data.StoreManager.lookup('PlanningTracking.ListRegisters');
        var filters = Ext.JSON.decode(store.proxy.extraParams.filters);

        filters.and = [
            {
                field: 'id_company',
                comparison: 'eq',
                value: window.localStorage.getItem('id_company')
            },
            {
                field: 'id_task',
                comparison: 'eq',
                value: task._id
            }
        ];
        
        //console.log('Filtros Store ListRegisters:', filters);
        store.proxy.extraParams.filters = Ext.JSON.encode(filters);
        store.loadPage(1);

        winGrid.show();
    },
    //Cancela una tarea
    popUpCancelTask: function(task)
    {
        var m = moduleConfig;
        
        if(task.status != 'PENDIENTE')
        {
            Ext.MessageBox.show({
                title   : 'Error',
                msg     : 'Sólo se puede cancelar una tarea en estado PENDIENTE',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
            return;
        }

        Ext.Msg.confirm(
            translateplanningtracking.confirmTitle, translateplanningtracking.confirmCancel, 
            function(btn) 
            {
                if (btn === 'yes') {
                    var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                    Ext.Ajax.request({
                        url    : moduleConfig.services.urlTask + '/' + task._id + '/cancel',
                        type     : 'rest',
                        dataType : 'json',
                        method   : 'PUT',
                        scope    : this,
                        success  : function(response)
                        {
                            msgWait.hide();
                            Ext.MessageBox.show({
                                title   : translateplanningtracking.confirmTitle+' '+translateplanningtracking.task,
                                msg     : translateplanningtracking.popup.MsgSuccessCancel,
                                buttons : Ext.MessageBox.OK,
                                icon    : Ext.MessageBox.WARNING
                            });
                            var resourcesSelected = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
                            Ext.getCmp(AppGlobals.listId).getSelectionModel().deselectAll();
                            Ext.data.StoreManager.lookup("PlanningTracking.List").load();
                            Ext.getCmp(AppGlobals.listId).getSelectionModel().select(resourcesSelected);
                        },
                        failure  : function(response) {
                            msgWait.hide();
                            Ext.MessageBox.show({
                                title   : translate.global.active+' '+translateplanningtracking.task,
                                msg     : translateplanningtracking.window.MsgError,
                                buttons : Ext.MessageBox.OK,
                                icon    : Ext.MessageBox.ERROR
                            });
                        }
                    });
                }
            }
        );
    },
	//XTemplate PopUp Recurso
    xTemplatePopUpResourse: function(objStatistics)
    {
        var pending = objStatistics.totalPending || 0; 
        var cancelled = objStatistics.totalCancelled ||0; 
        var delivering = objStatistics.totalCheckin || 0; 
        var delivered = objStatistics.totalCheckoutWithForm || 0; 
        var deliveredWithError = objStatistics.totalCheckoutWithoutForm || 0; 
        var approved = objStatistics.totalApproved || 0;

        var resourceMarkerTemplate = new Ext.XTemplate(
            [
                '<div class="markerContent">',
                    '<center>',
                        '<h2 style="color: #fff; background-color:#1fbad6;padding:5px;margin: 0;">{login}</h2>',
                    '</center>',
                    '<hr style="color: #1fbad6;">',
                    '<center>',
                        '<b>' + translateplanningtracking.marker.resourceInstance.updateTime + '</b>: {updateTime}',
                    '</center>',
                    '<center>',
                        '<b>' + translateplanningtracking.marker.resourceInstance.address + '</b>: {address}',
                    '</center>',
                    '<hr style="color: #1fbad6;">',
                    '<center>',
                        '<h4 style="color: #1fbad6;"">ESTADO DE TAREAS</h4>',
                        '<table align="center" style="margin-top:0px;font-size: smaller;width:100%"">',
                            '<tr><td><b>'+translateplanningtracking.filter.combobox.status.PENDING+':</b></td><td>' + pending + '</td></tr>',
                            '<tr><td><b>'+translateplanningtracking.filter.combobox.status.CANCELLED+':</b></td><td >' + cancelled + '</td></tr>',
                            '<tr><td><b>'+translateplanningtracking.filter.combobox.status.DELIVERING+':</b></td><td>' + delivering + '</td></tr>',
                            '<tr><td><b>'+translateplanningtracking.filter.combobox.status.DELIVERED+':</b></td><td>' + delivered + '</td></tr>',
                            '<tr><td><b>'+translateplanningtracking.filter.combobox.status.DELIVEREDWITHERROR+':</b></td><td>' + deliveredWithError + '</td></tr>',
                            '<tr><td><b>'+translateplanningtracking.filter.combobox.status.APPROVED+':</b></td><td>' + approved + '</td></tr>',
                        '</table>',
                    '</center>',
                '</div>',
            ].join('')
        );

        return resourceMarkerTemplate;
    },
    //Crea el PopUp - Ventana
    createPopup: function (feature) 
    {
        console.info('Creando el PopUp - Caracteristica: ', feature);
        
        //Verificamos que la caracteristica no sea una línea
        var typeFeature = null;
        if(!Ext.isEmpty(feature) && 
            !Ext.isEmpty(typeFeature = feature.geometry.id) && 
            typeFeature.search('LineString') > -1)
        {
            console.log('Saliendo del PopUp');
            return;
        }

        //Si exite alguno lo Eliminamos
        objController.destroyPopup(null, null);

        //Valores comunes
        var markerType = 'task';
        var allData = {};
        var strTitleName = 'Sin Titulo';
        var objStatistics = {};

        //En caso que exita el feature
        if(!Ext.isEmpty(feature))
        {
            //
            if(Ext.isEmpty(feature.geometry.id))
            {
                return;
            }

            markerType = feature.attributes.markerType;
            allData = feature.data;

            //Los casos cuando sean recursos
            if(markerType != 'task')
            {
                //Se debe llenar los totales y actualizar el título
                //strTitleName = allData.login;
                //Datos de estadística
                objStatistics = feature.data.statistics;

                strTitleName = translateplanningtracking.marker.resourceInstance.login;
            }
            else
            //Los casos cuando sean tareas
            {
                //strTitleName = allData.name;
                strTitleName = translateplanningtracking.task;
            }
        }

        console.log('CreatePopUp - Toda la Info:', allData);
        var m = moduleConfig;
        var popUpTask = objController.newWindowPopUp(
            m.PopUpTaskgroupId, 
            strTitleName,
            m.PopUpTaskWidthWindow, 
            m.PopUpTaskHeightWindow, 
            m.PopUpTaskResizableWindow, 
            m.PopUpTaskModalWindow,
            m.PopUpTaskDraggableWindow
        );
        
        //Label con el template
        var templatePopUp = (markerType == 'task')? 
                                objController.xTemplatePopUpTask() : 
                                objController.xTemplatePopUpResourse(objStatistics);
        popUpTask.add({
            xtype : 'label',
            data: allData,
            tpl: templatePopUp,
        });

        //Eventos
        popUpTask.on(
            {
                beforehide: function( thisButton, eOpts )
                {
                    console.log('Cerrando la Ventana PopUp');
                    
                    var map = Ext.getCmp(AppGlobals.mapId);
                    var controls = map.map.getControlsBy('nameLayerControl', 'controlLogin');

                    if(!Ext.isEmpty(controls))
                    {
                        controls = controls.pop();
                        controls.unselectAll();
                    }
                },
            }
        );

        //Desplegamos la ventana    
        popUpTask.show();
        
        //La alineamos a la parte superior izquierda del mapa
        popUpTask.alignTo(AppGlobals.mapId, 'tr-tr', [0, 36]);
    },
    //Destruye el PopUp - Ventana
    destroyPopup: function (feature, data)
    {   
        var win = Ext.getCmp(controller + 'PopUpTaskWindow');
        
        if(!Ext.isEmpty(win)){
            win.destroy();
        }
    },
    ////Grid 2
    //Volver al primer grid
    onBackToFirstGrid: function(thisButton, e, eOpts)
    {
        //Ocultamos el grid Segundario
        var secondGrid = Ext.getCmp(AppGlobals.listId + 0);
        secondGrid.hide();

        //Desplegamos el primer grid
        var firstGrid = Ext.getCmp(AppGlobals.listId);
        firstGrid.show();

        //Des Seleccionamos todos los datos
        firstGrid.getSelectionModel().deselectAll();

        //Reseteamos el combo
        Ext.getCmp(controller + 'GridSecondResource').reset();
    },
    //Actualiza el store al cambiar de valor el combo de recursos
    updateStoreSecondGrid: function( thisCombo, newValue, oldValue, eOpts )
    {
        //var comboResource = Ext.getCmp(controller + 'GridSecondResource');
        //var idResource = comboResource.getValue();
        var idResource = newValue;
        var recordResource = thisCombo.getStore().getById(idResource);
        var secondStore = Ext.getCmp(AppGlobals.listId + 0).getStore();
        var filters = Ext.JSON.decode(secondStore.proxy.extraParams.filters);
        var fechaFilter =  Ext.getCmp(controller + 'FilterResourceFecha').getValue();
        var fechaFilter2 =  Ext.Date.add(fechaFilter, Ext.Date.DAY, 1);
        var resourceId = '';
        
        if(!Ext.isEmpty(recordResource))
        {
            resourceId = recordResource.data.resourceId;
        }

        //Actualizamos el parametro y enviamos
        filters.and = [
            {
                field: 'id_company',
                comparison: 'eq',
                value: window.localStorage.getItem('id_company')
            },
            {
                field: 'id_resourceInstance',
                comparison: 'eq',
                value: resourceId
            },
            {
                field:'arrival_time',
                comparison:'gte',
                value: Ext.Date.format(fechaFilter, 'Y-m-d H:i:s')
            },
            {
                field:'arrival_time',
                comparison:'lt',
                value: Ext.Date.format( fechaFilter2, 'Y-m-d H:i:s' )
            },
        ];
        secondStore.proxy.extraParams.filters = Ext.JSON.encode(filters);

        
        secondStore.load(
            function(records, operation, success) 
            {
                //Agregar las estadisticas
                var objStadistics = {
                    totalPending: 0,
                    totalCancelled:0,
                    totalCheckin: 0,
                    totalCheckoutWithForm:0,
                    totalCheckoutWithoutForm:0,
                    totalApproved:0
                };

                //Recorremos los registros
                if(success)
                {
                    for(var i = 0; i<records.length; ++i)
                    {
                        var objRecordData = records[i].data;

                        switch (objRecordData.status) {
                            case 'PENDIENTE':
                                objStadistics.totalPending++;
                                break;
                            case 'CANCELADA':
                                objStadistics.totalCancelled++;
                                break;
                            case 'CHECKIN':
                                objStadistics.totalCheckin++;
                                break;
                            case 'CHECKOUT CON FORMULARIO':
                                objStadistics.totalCheckoutWithForm++;
                                break;
                            case 'CHECKOUT SIN FORMULARIO':
                                objStadistics.totalCheckoutWithoutForm++;
                                break;
                            default:
                                objStadistics.totalApproved++;
                        }
                    }
                }

                //Agregamos las estadisticas
                var summary = [
                '<table style="margin-top:0px;font-size: smaller;">',
                    '<tr>',
                    '<td><b>Estado de Tareas:</b></td>',
                    '<td><b>P:</b>' + objStadistics.totalPending + '</td>',
                    '<td><b>C:</b>'+ objStadistics.totalCancelled + '</td>',
                    '<td><b>CI:</b>'+ objStadistics.totalCheckin + '</td>',
                    '<td><b>COF:</b>' + objStadistics.totalCheckoutWithForm + '</td>',
                    '<td><b>COS:</b>' + objStadistics.totalCheckoutWithoutForm + '</td>',
                    '<td><b>A:</b>' + objStadistics.totalApproved + '</td>',
                    '</tr>',
                    '<tr>',
                    '</tr>',
                '</table>'
                ].join('');

                //Actualizamos el label donde se muestra el resumen Total
                Ext.getCmp(controller + 'SummaryLabelSecondGrid').update(summary);

                //Deseleccionamos todo
                if(!Ext.isEmpty(oldValue))
                {
                    var recordResourceOld = thisCombo.getStore().getById(oldValue);
                    objController.onResourceDeSelect(null, recordResourceOld, recordResourceOld.index, null);
                }
                console.log('recordResource:', recordResource);
                //Seleccionamos el nuevo recurso
                objController.onResourceSelect(null, recordResource, recordResource.index, null);
            }
        );
    },
    //Seleccionamos una tarea del segundo grid
    onItemCickGridSecond: function(thisGrid, record, item, index, e, eOpts)
    {
        //Centro el mapa de acuerdo a la tarea
        var recordData = record.data;
        var map = Ext.getCmp(AppGlobals.mapId)
        var proj = new OpenLayers.Projection("EPSG:4326");
        var point = new OpenLayers.LonLat(recordData.location.lng, recordData.location.lat);

        point.transform(proj, map.map.getProjectionObject());
        map.map.setCenter(point, 16);
    },
    //Desplegamos el menú contextual del segundo grid
    onContextualMenuGridSecond: function (thisGrid, record, item, index, e, eOpts)
    {
        e.stopEvent();
        
        var position = e.getXY();
        var items = [
                { 
                    text: 'Ver detalle', 
                    handler: function() 
                    {
                        //console.log('record.data:', record.data);
                        objController.popUpViewDetailTask(record.data, record.data);
                    } 
                },
                { 
                    text: 'Ver Registro', 
                    handler: function() 
                    {
                        //alert("Ver Registro");
                        objController.popUpViewRegistersGrid(record.data);
                    } 
                },  
            ];
        //Si es estado es pendiente se puede cancelar la tarea
        if(record.data.status == 'PENDIENTE')
        {
            items.push({ 
                    text: 'Cancelar Tarea', 
                    handler: function() 
                    {
                        //alert("Cancelar Tarea");
                        objController.popUpCancelTask(record.data);
                    } 
                });
        }
        
        var menu_grid = new Ext.menu.Menu({
            items: items 
        });
        
        menu_grid.showAt(position);
    },
    ////INICIO - Exportar archivos
    //Permite exportar los datos a un arxhivo xls del grid 1
    exportXlsGridFirst: function(thisButton, e, eOpts)
    {
		console.log('Exportando el archivo');
		
		var objStore = this.getPlanningTrackingListStore();
		var strURLExport = moduleConfig.services.urlExportGrid1;

        this.onExportFile(objStore, strURLExport);
    },
    //Permite exportar los datos a un arxhivo xls del grid 2
    exportXlsGridSecond: function(thisButton, e, eOpts)
    {
		console.log('Exportando el archivo');
		
		var objStore = this.getPlanningTrackingListTasksStore();
		var strURLExport = moduleConfig.services.urlExportGrid2;

        this.onExportFile(objStore, strURLExport);
    },
    ////FIN - Exportar archivos
});
