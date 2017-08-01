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
    extend: 'LoadPrincipal.controller.Core',
    models: [
        controller + '.List',
        controller + '.ListEvents',
        controller + '.ListResourcesGroup',
        controller + '.ListResourcesType',
        controller + '.ListHistory',
        controller + '.ComboResource',
        controller + '.ListPositionEvents',
        controller + '.SearchAddress'
    ],
    stores: [
        controller + '.List',
        controller + '.ListEvents',
        controller + '.ListResourcesGroup',
        controller + '.ListResourcesType',
        controller + '.ListHistory',
        controller + '.ComboResource',
        controller + '.ListPositionEvents',
        controller + '.SearchAddress',
        controller + '.ListAllResources'
    ],
    views: [],
    refs: [],
    //INICIO - Atributos propios
    bUseStreetView: false,
    bUseStreetView1: false,
    //FIN - Atributos propios
    init: function() 
    {
        objController = this;

        //Get current token
        var token = this.token();
        if(token){
            Ext.Ajax.useDefaultXhrHeader = true;
            Ext.Ajax.cors = true;
            Ext.Ajax.defaultHeaders = {
                'Authorization': 'Bearer ' + token
            };
        }

        //Call index view
        this.render(moduleConfig.template);

        this.getResourceTrackingListHistoryStore().addListener('load', this.onStoreLoad, this);
        this.getResourceTrackingListAllResourcesStore().addListener('load', this.onActualLoad, this);
        this.getResourceTrackingListEventsStore().addListener('load', this.onEventsLoad, this);
        
        
        //Load files system basic
        this.onLoadMap();
        this.addListSubButtons(0);
        this.addSecondListSubButtons(0);
        this.addListSubButtons(2);
        this.addSecondListSubButtons(2);

        this.addMapSubButtons(0);
        this.addMapSubButtons(1);

        //Agregamos el control click al mapa 0 y 1    
        var mapPanel = Ext.getCmp(AppGlobals.mapId + 0);
        var mapPanel1 = Ext.getCmp(AppGlobals.mapId + 1);
        var click = new OpenLayers.Control.Click();
        var click1 = new OpenLayers.Control.Click();
        mapPanel.map.addControl(click);
        mapPanel1.map.addControl(click1);
        click.activate();
        click1.activate();
        
        //Agregamos valores por defectos pasados por url
        if(!Ext.isEmpty(urlGET))
        {
            if(!Ext.isEmpty(urlGET['login']))
            {
                Ext.getCmp('listResourceSearchKeyword').setValue(urlGET['login']);
            }
            this.multiSearch();
        }
        
        //Listeners
        this.control({
            //
          'AliasResourceTrackingList0' : {
              select    : this.onResourceSelect,
              deselect  : this.onResourceDeSelect,
              itemcontextmenu : function(thisGrid, record, item, index, event, eOpts)
              { 
                    event.stopEvent();

                    var xy = event.getXY();                         
                    new Ext.menu.Menu({
                        items : [{
                            text : 'Ir a Monitoreo de Tareas',
                            handler: function()
                            {
                                var objGET = {
                                    login: record.data.login
                                };
                                //console.log('record:', record); return;
                                objController.redirectPage('PlanningTracking', objGET);
                            }
                        }]
                    }).showAt(xy) 
              },
          },

          //Exportar Archivo
          '#ResourceTrackingExportFile':{
              click: this.onExportFile
          },
          //Exportar historico de recorridos
          '#ResourceTrackingResourceHistoryExport':{ 
              click: this.onExportFileResourceHistory
          },
          /** Filters **/
          '#listResourceSearchKeyword'  : {
              keyup : this.multiSearch,
          },
          'AliasResourceTrackingList0 button[action=clearFilter]':{
              click : this.clearFilter
          },
          'AliasResourceTrackingList0 combo[id=ResourceTrackingFilterResourceType]':{
              change : this.onResourceTypeChange
          },
          'AliasResourceTrackingList0 combo[id=ResourceTrackingFilterResourceGroup]':{
              change : this.multiSearch
          },
          '#ResourceTrackingResourceHistoryList': {
              click : this.onHistoryButtonClick
          },
          '#ResourceTrackingResourceDetailList': {
              click : this.onDetailButtonClick
          },
          /*'#ResourceTrackingResourceSTList': {
              click : this.openPlanningTracking
          },*/
          '#ResourceTrackingResourceHistoryBack': {
              click : this.onHistoryBackButtonClick
          },
          '#ResourceTrackingResourceHistorySearch': {
              click : this.onHistorySearchButtonClick
          },
          'AliasResourceTrackingList2':{
              select : this.onPositionListSelect
          },
          '#ResourceTrackingResourceHistoryFilterResourceGroup':{
              change : this.onResourceHistoryResourceGroupSelect
          },
          '#ResourceTrackingStreetView': {
              click: this.onStreetView
          },
          '#ResourceTrackingStreetView1': {
              click: this.onStreetView1
          },
          'AliasResourceTrackingList1': {
              select : this.onEventSelect
          },
          /*
          * Buscador Mapa
          */
          '#ResourceTrackingSearchAddress': {
            select: this.searchSelect
          },
          '#ResourceTrackingHistorySearchAddress': {
            select: this.searchSelect
          },
          '#ResourceTrackingDetail0ShowAllButton': {
            click: this.onShowAllButtonClick
          }
        });
    },
    onResourceTypeChange: function(combo, newValue, oldValue, eOpts)
    {
        console.info('Cambiar Grid');
        console.info(newValue);



        var columnsToShow = [];
        for (var i = 0; i < newValue.length; i++) {

          var record = combo.getStore().getAt(combo.getStore().find("_id",newValue[i]));
          columnsToShow.push(record.raw);
          console.info(record);
        }

        //Se deben cargar las columnas de todos los resourcedefinitions

        //Se deben traer los primeros


        var grid = Ext.getCmp(AppGlobals.listId+'0');
        var columns = grid.columns;

        //Ocultar columnas
        var columnsToHide = columns.slice(5, columns.length);
        for (var i = 0; i < columnsToHide.length; i++) {
          columnsToHide[i].hide();
        }

        for (var i = 0; i < columns.length; i++) {
          for (var j = 0; j < columnsToShow.length; j++) {
            for (var h = 0; h < columnsToShow[j].deviceDefinitions.length; h++) {
              if(columns[i].dataIndex == columnsToShow[j].deviceDefinitions[h].javaClass ){
                columns[i].show();
                break;
              }
            }
          }

        }

        this.multiSearch();
    },
    onShowAllButtonClick: function(button){
      button.up('panel').hide();
    },
    onDetailButtonClick: function()
    {
        console.info('ver detalle recurso');

        var resourcesModel = Ext.getCmp(AppGlobals.listId+0).getSelectionModel();
        
        if(resourcesModel.hasSelection())
        {
            if(resourcesModel.hasSelection() && resourcesModel.getCount() == 1)
            {
                //Cambiando la vista
                var record = resourcesModel.getSelection()[0];
                var resourceId = record.data.resourceId;

                var detailPanel = Ext.getCmp(AppGlobals.MapMultiGridId + 'Detail0');
                
                detailPanel.show();

                var detailTpl = detailPanel.tpl;
                detailTpl.overwrite(detailPanel.body, record.data);

            } 
            else 
            {
                Ext.MessageBox.show({
                    title   : 'Ver Detalle',
                    msg     : 'Debe seleccionar solo un recurso, para ver sus informacion',
                    buttons : Ext.MessageBox.OK,
                    icon    : Ext.MessageBox.ERROR
                });
            }
        } 
        else 
        {
            Ext.MessageBox.show({
                title   : 'Ver Detalle',
                msg     : 'Debe seleccionar un recurso, para ver sus informacion',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
        }

    },
    openPlanningTracking: function(){
      var url = decodeURIComponent(window.location.href.toString().split('?')[0]);
      var mod = decodeURIComponent('?m=PlanningTracking');
      window.location.replace(url+mod);
    },
    onLoadMap: function(){
      var mapActual = Ext.getCmp(AppGlobals.mapId+0);
      var mapHistory = Ext.getCmp(AppGlobals.mapId+1);
      mapActual.actual = [];
      mapActual.search = [];
      mapActual.selectFeatureControl = [];
      mapHistory.history = [];
      mapHistory.search = [];
      mapHistory.selectFeatureControl = [];
      this.mapTask.start();
    //  document.getElementsByClassName('olControlMousePosition')[0].style.bottom='20px';

    },
    mapTask: new Ext.util.TaskRunner().newTask({
  	    run: function(){
            console.info('positions');
            var store = Ext.data.StoreManager.lookup("ResourceTracking.ListAllResources");
            store.load(/*{
              params:{
              view=["latitude","longitude","customAttributes.nombres"]
            }*/);
        },
        interval : moduleConfig.submap[0].taskInterval
    }),
    searchSelect: function(combo,record){

        var map = Ext.getCmp(AppGlobals.mapId+combo.mapIndex);
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
    onEventSelect: function(grid,record){
      console.info('evento seleccionado');
      var login = record.data.resourceName;

      var store = Ext.data.StoreManager.lookup("ResourceTracking.ListAllResources");
      var resourceWithEvent = store.findRecord('login', login);

      var map = Ext.getCmp(AppGlobals.mapId+0);
      var proj = new OpenLayers.Projection("EPSG:4326");

      var point = new OpenLayers.LonLat(resourceWithEvent.data.longitude,resourceWithEvent.data.latitude);
      point.transform(proj, map.map.getProjectionObject());
      map.map.setCenter(point,16);

    },
    onEventsLoad: function(store, records){
      
      var list = Ext.getCmp('IdResourceTrackingList1');
      var totalCount = store. getTotalCount();
      var title = [
          '<div class="rt-le-container">',
            '<div class="rt-le-title">',
            translateresourcetracking.events.title,
            '</div>',
            '<div class="rt-le-summary">',
            translateresourcetracking.events.titleSummary,
            ' ',
            totalCount,
            '</div>',
          '</div>'
      ].join("")
      list.setTitle(title);

    },
    //Muestra una ventana emergente para mostrar el Street View de Google
    onStreetView: function(thisButton, e, eOpts)
    {
        console.log('Click in street view 0');

        this.bUseStreetView = !this.bUseStreetView;
    },
    //Muestra una ventana emergente para mostrar el Street View de Google
    onStreetView1: function(thisButton, e, eOpts)
    {
        console.log('Click in street view 1');

        this.bUseStreetView1 = !this.bUseStreetView1;
    },
    //Abre una ventana para mostrar el Google Street View
    openWindowStreetView: function(event)
    {
        console.log('Abriendo el Windows de Google Street View');
        
        var viewport = Ext.ComponentQuery.query('viewport')[0];
        var extComponentActive = viewport.down(AppGlobals.MapMultiGridAlias).getLayout().getActiveItem();
        var mapPanel = null;

        if(objController.bUseStreetView)
        {
            var mapPanel = extComponentActive.query('#' + AppGlobals.mapId + 0 );
        }

        if(Ext.isEmpty(mapPanel) &&  objController.bUseStreetView1)
        {
            var mapPanel = extComponentActive.query('#' + AppGlobals.mapId + 1 );
        }

        if(!Ext.isEmpty(mapPanel))
        {
            mapPanel = mapPanel[0];
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
    onResourceHistoryResourceGroupSelect: function(){
      console.info('grupo seleccionado');

      var resourceGroup = Ext.getCmp(controller + 'ResourceHistoryFilterResourceGroup').getValue();
      var store = Ext.data.StoreManager.lookup("ResourceTracking.ComboResource");

      var jsonSearch = new Object();
      var and = [];
      //Búsquedas AND...
      if (resourceGroup.length>0) {
        and.push(
          {
              field      : 'resourceGroups',
              comparison : 'in',
              value      : resourceGroup
          }
        );
      }

      jsonSearch.and = and;

      store.proxy.extraParams = {};

      store.proxy.extraParams = {
          filters : Ext.JSON.encode(jsonSearch)
      };
      store.loadPage(1);
    },
    //
    onPositionListSelect: function(grid, record, index, eOpts)
    {
        var eventsStore = Ext.data.StoreManager.lookup("ResourceTracking.ListPositionEvents");
        eventsStore.removeAll();

        var map = Ext.getCmp(AppGlobals.mapId+1);
        var proj = new OpenLayers.Projection("EPSG:4326");

        if(record.data.events.length>0){
          eventsStore.loadData(record.data.events);
        }

        var proj = new OpenLayers.Projection("EPSG:4326");
        var point = new OpenLayers.LonLat(record.data.longitude, record.data.latitude);
        point.transform(proj, map.map.getProjectionObject());
        map.map.setCenter(point,16);

        //Ubicacion: address

        var detail = Ext.getCmp(AppGlobals.MapMultiGridId + 'Detail1');
        var detailTpl = detail.tpl;
        var data = {
          updateTime: Ext.Date.format(record.data.updateTime, 'd/m/Y H:i:s'),
          login: record.data.login,
          heading: record.data.heading,
          speed: record.data.speed,
          odometer: record.data.odometer,
          rpm:record.data.rpm,
          levelGasTank: record.data.levelGasTank,
          address: record.data.address

        };
        detailTpl.overwrite(detail.body, data);
    },
    //Cargando el historial por recurso
    onStoreLoad: function(store, records, successful, eOpts)
    {
        console.info('Cargando el historial por recurso.');

        var nameCapaHistory = 'Historial';
        var eventsStore = Ext.data.StoreManager.lookup("ResourceTracking.ListPositionEvents");
        var map = Ext.getCmp(AppGlobals.mapId+1);
        var proj = new OpenLayers.Projection("EPSG:4326");
        var arrLinesLayers = map.map.getLayersByName(nameCapaHistory);
        var lineLayer = null;

        //Creamos o buscamos la capa
        if(!Ext.isEmpty(arrLinesLayers))
        {
            console.log('arrLinesLayers:', arrLinesLayers);
            
            lineLayer = arrLinesLayers[0];
            //Debemos limpiar las caracteristicas
            lineLayer.removeAllFeatures();
        }
        else
        {
            lineLayer = new OpenLayers.Layer.Vector(nameCapaHistory);
        }

        //Cargamos los puntos históricos
        if(!Ext.isEmpty(records))
        {
            //Creacion de Marcadores de Tareas
            for (var i = 0; i < records.length; i++) 
            {
                var feature = new OpenLayers.Feature.Vector(
                    new OpenLayers.Geometry.Point( records[i].data.longitude, records[i].data.latitude ).transform(proj, map.map.getProjectionObject()),
                    {
                        updateTime: records[i].data.updateTime,
                      login         : records[i].data.login,
                      heading       : records[i].data.heading,
                      speed         : records[i].data.speed,
                      odometer      : records[i].data.odometer,
                      rpm           : records[i].data.rpm,
                      levelGasTank  : records[i].data.levelGasTank,
                      address       : records[i].data.address,
                      events        : records[i].data.events,
                      _id: records[i].data._id,
                      index_row: i,
                     },
                    {
                        pointRadius: 18, 
                        externalGraphic: (records[i].data.hasEvents) ? moduleConfig.icons.event : moduleConfig.icons.location,
                        label: ''+(i+1),
                        labelOutlineWidth: 1,
                        fontColor: "#000000",
                        fontOpacity: 0.8,
                        fontSize: "9px",
                        labelYOffset: 5
                    }
                );

              lineLayer.addFeatures(feature);
            }

            //Si no existía ninguna capa se agrega
            if(Ext.isEmpty(arrLinesLayers)){
                map.map.addLayers([lineLayer]);
            }else{
                //Si existia la capa removemos el control
                var arrHistoriesControls = map.map.getControlsBy('name', 'historial_control');
                var historyControl = null;

                if(!Ext.isEmpty(historyControl = arrHistoriesControls[0])){
                    map.map.removeControl(historyControl);
                }
            }

            //Cargamos los recursos
            //this.loadResourceInMap(map);

            var controls = {
                selector: new OpenLayers.Control.SelectFeature(
                    lineLayer, 
                    {   
                        name: 'historial_control', 
                        onSelect: createPopup, 
                        onUnselect: destroyPopup 
                    }
                )
            };

            function createPopup(feature)
            {
                console.info('Caracteristica: ', feature);

                var detail = Ext.getCmp(AppGlobals.MapMultiGridId + 'Detail1');
                var detailTpl = detail.tpl;
                var data = {
                  updateTime    : Ext.Date.format(feature.attributes.updateTime, 'd/m/Y H:i:s'),
                  login         : feature.attributes.login,
                  heading       : feature.attributes.heading,
                  speed         : feature.attributes.speed,
                  odometer      : feature.attributes.odometer,
                  rpm           : feature.attributes.rpm,
                  levelGasTank  : feature.attributes.levelGasTank,
                  address       : feature.attributes.address
                };
                var grid = Ext.getCmp(AppGlobals.listId+'2');
                
                //Seleccionamos la fila en el grid
                grid.getSelectionModel().select(feature.attributes.index_row, false, true);
                grid.getView().getNode(feature.attributes.index_row).focus();
                
                //Cargamos los detalles de la información
                detailTpl.overwrite(detail.body, data);

                //Cargamos los eventos
                if(feature.attributes.events.length>0){
                  eventsStore.loadData(feature.attributes.events);
                }
            }

            function destroyPopup(feature)
            {
                eventsStore.removeAll();
            }

            map.map.addControl(controls['selector']);
            controls['selector'].activate();

            //Agregando en memoria los layers.
            map.history.push(lineLayer);

            map.map.zoomToExtent(lineLayer.getDataExtent());
        }
    },
    //
    mapClean : function(){
        //Agregar selector para aplicar evento select en las rutas.
        Array.prototype.clean = function(deleteValue) {
          for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
              this.splice(i, 1);
              i--;
            }
          }
          return this;
        };

        map.actual.clean(null);
        if(map.selectControl){
          map.selectControl.deactivate();
          map.map.removeControl(map.selectControl);
        }


        for (var i = 0; i < map.map.popups.length; i++) {
          map.map.removePopup(map.map.popups[i]);
        }
        //Elimnar capa anterior
        for (var i = 0; i < map.actual.length; i++) {
            map.map.removeLayer(map.actual[i]);
            map.actual[i] = null;
        }
    },
    //
    onActualLoad: function(store, records, successful, eOpts, idMapa)
    {
      console.info('pintando en el mapa ActualLoad, idMapa: ' + idMapa);
      //console.log('arguments:', arguments);

      if(Ext.isEmpty(idMapa))
      {
          var idMapa = 0;
      }

      var map = Ext.getCmp(AppGlobals.mapId + idMapa);

      map.actual.clean(null);
      
      //Elimnar capa anterior
      for (var i = 0; i < map.actual.length; i++) {
          map.map.removeLayer(map.actual[i]);
          map.actual[i] = null;
      }
      //Creacion de Layer
      var lineLayer = new OpenLayers.Layer.Vector('Actual');
      var proj = new OpenLayers.Projection("EPSG:4326");

      //Creacion de Marcadores
      if(records!=null){
          for (var i = 0; i < records.length; i++) {
              var latitude,longitude;

              var feature = new OpenLayers.Feature.Vector(
                  new OpenLayers.Geometry.Point( records[i].data.longitude, records[i].data.latitude ).transform(proj, map.map.getProjectionObject()),
                  {
                      address      : records[i].data.address,
                      deviceData   : records[i].data.deviceData,
                      heading      : records[i].data.heading,
                      latitude     : records[i].data.latitude,
                      levelGasTank : records[i].data.levelGasTank,
                      login        : records[i].data.login,
                      longitude    : records[i].data.longitude,
                      motor        : records[i].data.motor,
                      odometer     : records[i].data.odometer,
                      panic        : records[i].data.panic,
                      person       : records[i].data.passanger,
                      resourceId   : records[i].data.resourceId,
                      rpm          : records[i].data.rpm,
                      speed        : records[i].data.speed,
                      status       : records[i].data.status,
                      trailer      : records[i].data.trailer,
                      updateTime   : records[i].data.updateTime,
                      markerType   : 'resource'
                   },
                  {
                      label: records[i].data.login,
                      fontColor:(records[i].data.motor == 'ON' ? 'green' : 'red'), 
                      labelAlign: 'rt',
                      fontWeight: 'bold',
                      labelXOffset:20, 
                      labelYOffset:-5, 
                      externalGraphic  : (records[i].data.hasEvent ? moduleConfig.icons.resourceWithEvent: moduleConfig.icons.resource), 
                      graphicHeight: 25, 
                      graphicWidth: 25, 
                      graphicXOffset:-12, 
                      graphicYOffset:-25  
                }
              );

            lineLayer.addFeatures(feature);
          }

          map.map.addLayers([lineLayer]);

          // agregando en memoria los layers para mantenerlos en memoria.
          map.actual.push(lineLayer);

          // Template del contenido del popup de la tarea.
          var taskMarkerTemplate = new Ext.XTemplate([
              '<div class="markerContent">\
                <center>\
                    <h2 style="color: #fff; background-color:#1fbad6;padding:5px;margin:0;">{login}</h2>\
                    <hr style="color: #0056b2;">\
                    <table style="color:#474941;">\
                        <tr>\
                            <td><b>Último reporte</b>:</td>\
                            <td>{updateTime}</td>\
                        </tr>\
                        <tr>\
                            <td><b>Ubicación</b>:</td>\
                            <td>{address}</td>\
                        </tr>\
                    </table>\
                </center>\
                <hr style="color: #0056b2;">\
                <table style="width:100%;color:#474941;">\
                    <tbody>\
                        <tr>\
                            <td><b>Motor</b>: {motor}</td>\
                            <td><b>Vel (Km/h)</b>: {speed}</td>\
                            <td><b>RPM</b>: {rpm}</td>\
                        </tr>\
                        <tr>\
                            <td><b>Combustible</b>: {levelGasTank}</td>\
                            <td><b>Estado</b>: {status}</td>\
                            <td><b>Pasajero</b>: {person}</td>\
                        </tr>\
                        <tr>\
                            <td><b>Remolque</b>: <p>{trailer}</p></td>\
                            <td><p><b>Pánico</b>: {panic}</p></td>\
                        </tr>\
                    </tbody>\
                </table>\
                </div>'].join('')
            );

          function createPopup(feature) {
              console.info(feature);
              //if(feature.attributes.markerType == 'task'){
                  feature.popup = new OpenLayers.Popup("chicken",
                      feature.geometry.getBounds().getCenterLonLat(),
                      new OpenLayers.Size(250,200),
                      taskMarkerTemplate.apply(feature.attributes),
                      null,
                      true,
                      function() { map.selectControl.unselectAll(); }
                  );
                  //feature.popup.closeOnMove = true;
                  map.map.addPopup(feature.popup);
              //}
          }

          function destroyPopup(feature) {
              feature.popup.destroy();
              feature.popup = null;
          }
          if(map.selectControl){

            for (var i = 0; i < map.map.popups.length; i++) {
              map.map.removePopup(map.map.popups[i]);
            }
            map.selectControl.layers.clean(null);
            map.selectControl.deactivate();
            map.map.removeControl(map.selectControl);
          }
          map.selectControl = new OpenLayers.Control.SelectFeature(  
              map.actual, 
              { 
                  onSelect: createPopup, 
                  onUnselect: destroyPopup,
                  //clickout:function(){ console.log('Click en mapa:', arguments);} 
            });
          map.map.addControl(map.selectControl);
          map.selectControl.activate();

          map.selectFeatureControl.push(map.selectControl);

      }
    },
    //Busca el historial de acuerdo a un recurso
    onHistorySearchButtonClick: function()
    {
        var resourceId = Ext.getCmp(controller + 'ResourceHistoryFilterResource').getValue();
        var date = Ext.getCmp(controller + 'ResourceHistoryFilterDate').getValue();
        var resourceGroup = Ext.getCmp(controller + 'ResourceHistoryFilterResourceGroup').getValue();
        var store = Ext.data.StoreManager.lookup("ResourceTracking.ListHistory");

        var jsonSearch = new Object();
        var and = [];

        //Agregamos las fechas
        and.push(
            {
                field: 'resourceInstance.id_company',
                comparison: 'eq',
                value: window.localStorage.getItem('id_company')
            },
             {
                field: 'isVisible',
                comparison: 'eq',
                value: true
            },	
          {
              field      : 'updateTime',
              comparison : 'gt',
              value      : Ext.Date.format(date, 'Y-m-d H:i:s')
          },
          {
              field      : 'updateTime',
              comparison : 'lt',
              value      : Ext.Date.format(Ext.Date.add(date, Ext.Date.DAY,1), 'Y-m-d H:i:s')
          }
        );

        //Agregamos el id del recurso
        if (!Ext.isEmpty(resourceId)) {
          and.push(
            {
                field      : 'resourceInstance._id',
                comparison : 'eq',
                value      : resourceId
            }
          );
        }

        jsonSearch.and = and;

        //Actualizamos el filtro de búsqueda
        store.proxy.extraParams = {
            filters : Ext.JSON.encode(jsonSearch)
        };

        //Cargamos la primera página
        store.loadPage(1);
    },
    //
    onHistoryBackButtonClick: function()
    {

      var resourceId = Ext.getCmp(controller + 'ResourceHistoryFilterResource').clearValue();
      var date = Ext.getCmp(controller + 'ResourceHistoryFilterDate').initValue();
      var resourceGroup = Ext.getCmp(controller + 'ResourceHistoryFilterResourceGroup').clearValue();


      console.info('historial....');
      var viewport = Ext.ComponentQuery.query('viewport')[0];
      viewport.down(AppGlobals.MapMultiGridAlias).getLayout().setActiveItem(0);

      var map = Ext.getCmp(AppGlobals.mapId+1);
      console.info('Historial eliminado: ');

      for (var i = 0; i < map.history.length; i++) {
          map.map.removeLayer(map.history[i]);
          map.history[i] = null;
      }

      var eventsStore = Ext.data.StoreManager.lookup("ResourceTracking.ListPositionEvents");
      eventsStore.removeAll();

      var historyStore = Ext.data.StoreManager.lookup("ResourceTracking.ListHistory");
      historyStore.removeAll();


    },
    //Revisamos el historial
    onHistoryButtonClick: function()
    {
        console.info('Activando el historial');

        var viewport = Ext.ComponentQuery.query('viewport')[0];
        var historyModule = viewport.down(AppGlobals.MapMultiGridAlias).getLayout().setActiveItem(1);
        
        //Cargamos los recursos en historial
        //this.loadResourceInMap();

        //Verificamos que hayan seleccionado alguno en motitoreo de recursos
        var resourcesModel = Ext.getCmp(AppGlobals.listId+0).getSelectionModel();
        
        //Cargamos el historial seleccionado
        if(resourcesModel.hasSelection() && resourcesModel.getCount() == 1)
        {
            //Precargamos los recursos en el combo de recursos
            var store = Ext.getCmp(controller + 'ResourceHistoryFilterResource').getStore();
            store.load();

            var record = resourcesModel.getSelection()[0];
            Ext.getCmp(controller + 'ResourceHistoryFilterResource').setValue(record.data.resourceId);
            Ext.getCmp(controller + 'ResourceHistoryFilterDate').setValue(new Date());
            
            objController.onHistorySearchButtonClick();
        }
    },
    onResourceDeSelect: function(grid,record,index, eOpts){
      console.info('se deselecciono');
      var store = Ext.data.StoreManager.lookup("ResourceTracking.ListEvents");

      var resources = grid.getSelection();
      /**
      * Json filter
      */
      var jsonSearch = new Object();
      var jsonResourcesOr = new Object();

      var or = []
      if (resources.length >0 ) {

          for (var i = 0; i < resources.length; i++) {

            or.push(
                {
                    field      : 'resourceInstance._id',
                    comparison : 'eq',
                    value      : resources[i].data.resourceId
                }
            );
          }
      }


      if(or.length >0 ){
        jsonSearch.or = or;
      }
      console.info(jsonSearch);
      Ext.Ajax.abort(store.proxy.activeRequest);

      store.proxy.extraParams = {};

      store.proxy.extraParams = {
          filters : Ext.JSON.encode(jsonSearch)
      };
      store.loadPage(1);
    },
    onResourceSelect: function(grid,record,index, eOpts){
      console.info('se selecciono');

      var map = Ext.getCmp(AppGlobals.mapId+0);
      var proj = new OpenLayers.Projection("EPSG:4326");

      var store = Ext.data.StoreManager.lookup("ResourceTracking.ListEvents");

      var resources = grid.getSelection();
      /**
      * Json filter
      */
      var jsonSearch = new Object();
      var jsonResourcesOr = new Object();

      var or = []
      if (resources.length >0 ) {

          for (var i = 0; i < resources.length; i++) {

            or.push(
                {
                    field      : 'resourceInstance._id',
                    comparison : 'eq',
                    value      : resources[i].data.resourceId
                }
            );
          }
      }


      if(or.length >0 ){
        jsonSearch.or = or;
      }
      console.info(jsonSearch);
      Ext.Ajax.abort(store.proxy.activeRequest);

      store.proxy.extraParams = {};

      store.proxy.extraParams = {
          filters : Ext.JSON.encode(jsonSearch)
      };
      store.loadPage(1);

      var proj = new OpenLayers.Projection("EPSG:4326");
      var point = new OpenLayers.LonLat(record.data.longitude,record.data.latitude);
      point.transform(proj, map.map.getProjectionObject());
      map.map.setCenter(point,16);

    },

    /**
    * Search criteria @ ResourceTracking Store
    */
    multiSearch: function () 
    {
        console.log('Ejecutando el Buscar Multiple');
        /**
        * Get Store
        */
        var store = Ext.data.StoreManager.lookup("ResourceTracking.List");
        var searchKeyword = Ext.getCmp('listResourceSearchKeyword').getValue();
        var resourceType = Ext.getCmp(controller + 'FilterResourceType').getValue();
        var resourceGroup = Ext.getCmp(controller + 'FilterResourceGroup').getValue();


        /**
        * Json filter
        */
        var jsonSearch = new Object();
        var jsonGroupOr = new Object();
        var jsonResourceTypeOr = new Object();
        var jsonResourceGroupOr = new Object();

        var and = [];

		//Id company
		and.push(
			{
				field      : 'resourceInstance.id_company',
				comparison : 'eq',
				value      : window.localStorage.getItem('id_company')
			}
		);	
		
        //Búsquedas AND...
        if (searchKeyword !='') {
          and.push(
            {
                field      : 'resourceInstance.login',
                comparison : 'lk',
                value      : searchKeyword
            }
          );

        }

		if (resourceGroup.length >0 ) {
			if(resourceGroup[0] != ""){
				jsonResourceGroupOr =
				{
				field      : 'resourceInstance.resourceGroups',
				comparison : 'in',
				value      : resourceGroup
				};		  
				and.push(jsonResourceGroupOr);
			}
		}
		
		if (resourceType.length >0 ) {
			if(resourceType[0] != ""){
				jsonResourceTypeOr =
				{
				field      : 'resourceInstance.id_resourceDefinition',
				comparison : 'in',
				value      : resourceType
				};		  
				and.push(jsonResourceTypeOr);
			}
		}

        if(and.length >0 ){
          jsonSearch.and = and;
        }
        console.info(jsonSearch);
        Ext.Ajax.abort(store.proxy.activeRequest);

        store.proxy.extraParams = {};

        store.proxy.extraParams = {
            filters : Ext.JSON.encode(jsonSearch)
        };
        store.loadPage(1);
    },
    /**
     * Override
     * Generate a toolbar in Generic grid and push diferenti kind of buttons and menus from moduleConfig object
     * @param {String} suffix
     */
    addListSubButtons: function(idList, suffix)
    {
        suffix = (suffix == undefined) ? '' : suffix ;

        var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });

        if(moduleConfig.subgrid[idList].searchField === true){
            if(typeof(moduleConfig.subgrid[idList].customeSearch)!== 'undefined' && moduleConfig.subgrid[idList].customeSearch === true)
            {
                toolbar.add(moduleConfig.subgrid[idList].customeSearchFields);
            }
            else
            {
                toolbar.add(
                    {
                        xtype: 'container',
                        width: '30%',
                        layout:{
                            type: 'hbox'
                        },
                        items:[
                            {
                                xtype: 'textfield',
                                id: moduleConfig.subgrid[idList].searchId + suffix,
                                emptyText: moduleConfig.subgrid[idList].searchTitle,
                                enableKeyEvents: true,
                                margin: '0 5 0 0',
                                width: '86%',
                            },
                            {
                                xtype: 'button',
                                iconCls: 'cancel-button',
                                tooltip: 'Elimina el filtro por el texto ingresado.',
                                fieldName: moduleConfig.subgrid[idList].searchId + suffix,
                                cls: 'x-btn-default-small',
                                action: 'clearFilter'
                            }
                        ]
                    }
                );
            }
        }
        
        //Agregar filtros multiSelect
        if(typeof(moduleConfig.subgrid[idList].filterToolbar) != 'undefined')
        {
            $.each(
                moduleConfig.subgrid[idList].filterToolbar, 
                function(index, value) 
                {
                    toolbar.add(value);
                }
            );
        }

        toolbar.add('->');

        var buttons = moduleConfig.subgrid[idList].topButtons;
        $.each(moduleConfig.subgrid[idList].topButtons, function(index, value) {
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

                    }
                });
            } else {
                var confButton = {
                    text: value.text,
                    value: value.action,
                    action: value.action,
                    id: value.action+suffix,
                    iconCls: value.iconCls,
                    handler: function(item) {
//                        alert("baasic")
                    }
                };

                if(!Ext.isEmpty(value.enableToggle))
                    confButton['enableToggle'] = value.enableToggle;

                if(!Ext.isEmpty(value.tooltip))
                    confButton['tooltip'] = value.tooltip;

                var item = new Ext.button.Button(confButton);
            }
            toolbar.add(item);
        });
        if(suffix && suffix!=""){
            Ext.getCmp(AppGlobals.listId + idList +suffix).addDocked(toolbar);
        }else{
            Ext.getCmp(AppGlobals.listId + idList).addDocked(toolbar);
        }
    },
    /**
     * Override
     * Generate a toolbar in Generic grid and push diferenti kind of buttons and menus from moduleConfig object
     * @param {String} suffix
     */
    addSecondListSubButtons: function(idList, suffix)
    {
      suffix = (suffix == undefined) ? '' : suffix ;
      var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });
        /*
          Agregar filtros multiSelect
        */
        if(typeof(moduleConfig.subgrid[idList].secondFilterToolbar) != 'undefined'){
          $.each(moduleConfig.subgrid[idList].secondFilterToolbar, function(index, value) {
            toolbar.add(value);
          });
        }

        var buttons = moduleConfig.subgrid[idList].secondTopButtons;
        $.each(moduleConfig.subgrid[idList].secondTopButtons, function(index, value) {
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
                    }
                });
            } else {
                var configButton = null;
                var item = null;
                if(value == '->'){
                    item = value;
                }else{
                    var configButton = {
                        text: value.text,
                        value: value.action,
                        action: value.action,
                        id: value.action+suffix,
                        iconCls: value.iconCls,
                        handler: function(item) 
                        {
                            //alert("baasic")
                        }
                    };

                    if(!Ext.isEmpty(value.cls)){
                        configButton['cls'] = value.cls;
                    }
                    
                    if(!Ext.isEmpty(value.style)){
                        configButton['style'] = value.style;
                    }

                    item = new Ext.button.Button(configButton);
                }

                
            }
            toolbar.add(item);
        });
        if(suffix && suffix!=""){
            Ext.getCmp(AppGlobals.listId + idList +suffix).addDocked(toolbar);
        }else{
            Ext.getCmp(AppGlobals.listId + idList).addDocked(toolbar);
        }
    },
    //Carga los recursos dado un mapa, store y layer
    loadResourceInMap: function(objMap, objStore)
    {
        console.log('Cargando los recursos.');
        
        var bHasNotMap = Ext.isEmpty(objMap);
        
        if(bHasNotMap){
            var objMap = Ext.getCmp(AppGlobals.mapId+1);
        }

        if(Ext.isEmpty(objStore)){
            var gridAllResources = Ext.getCmp(AppGlobals.listId+'0');
            var objStore = gridAllResources.getStore();
        }

        var objLayer = new OpenLayers.Layer.Vector('HistorialRecursos');
        var records = objStore.data.items;
        var proj = new OpenLayers.Projection("EPSG:4326");
        //console.log('records Recursos:', records);

        for (var i = 0; i < records.length; i++)
        {
            var feature = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point( records[i].data.longitude, records[i].data.latitude ).transform(proj, objMap.map.getProjectionObject()),
                {
                    address      : records[i].data.address,
                    deviceData   : records[i].data.deviceData,
                    heading      : records[i].data.heading,
                    latitude     : records[i].data.latitude,
                    levelGasTank : records[i].data.levelGasTank,
                    login        : records[i].data.login,
                    longitude    : records[i].data.longitude,
                    motor        : records[i].data.motor,
                    odometer     : records[i].data.odometer,
                    panic        : records[i].data.panic,
                    person       : records[i].data.passanger,
                    resourceId   : records[i].data.resourceId,
                    rpm          : records[i].data.rpm,
                    speed        : records[i].data.speed,
                    status       : records[i].data.status,
                    trailer      : records[i].data.trailer,
                    updateTime   : records[i].data.updateTime,
                    markerType   : 'resource'
                },
                {
                    label: records[i].data.login,
                    fontColor:(records[i].data.motor == 'ON' ? 'green' : 'red'), 
                    labelAlign: 'rt',
                    fontWeight: 'bold',
                    labelXOffset:20, 
                    labelYOffset:-5, 
                    externalGraphic  : (records[i].data.hasEvent ? moduleConfig.icons.resourceWithEvent: moduleConfig.icons.resource), 
                    graphicHeight: 25, 
                    graphicWidth: 25, 
                    graphicXOffset:-12, 
                    graphicYOffset:-25  
            }
            );
            objLayer.addFeatures(feature);
        }

        //Si no me pasan el mapa y la capa cargo la capa
        objMap.map.addLayers([objLayer]);

        //Hacemos un zoom para ver todos los recursos
        if(bHasNotMap){
            objMap.map.zoomToExtent(objLayer.getDataExtent());
        }
    },
    //Agrega los botones al mapa
    addMapSubButtons: function(mapId, suffix)
    {
        suffix = Ext.isEmpty(suffix)? '' : suffix;
        var map = Ext.getCmp(AppGlobals.mapId + mapId + suffix);
        var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });

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

        function handleMeasurements(event)
        {
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

               map.setTitle(moduleConfig.submap[mapId].title);
               map.setTitle(map.title+' '+out);
        }

        var ctrl, toolbarItems = [], action, actions = {};
        var layers = map.map.layers;

        //ZoomToMaxExtent control
        action = Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map.map,
            text: translate.global.map.maxExtent,
            tooltip: translate.global.map.maxExtentTooltip
        });
        actions["max_extent"] = action;

        // Navigation control and DrawFeature controls
        // in the same toggle group
        action = Ext.create('GeoExt.Action', {
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

        // Navigation history - two "button" controls
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

        // Reuse the GeoExt.Action objects created above
        // as menu items
        toolbarItems.push({
            text: "Opciones del Mapa",
            menu: Ext.create('Ext.menu.Menu', {
                items: [
                    // ZoomToMaxExtent
                    Ext.create('Ext.button.Button', actions["max_extent"]),
                    // Nav
                    //Ext.create('Ext.menu.CheckItem', actions["nav"]),
                    // Draw poly
                    //Ext.create('Ext.menu.CheckItem', actions["draw_poly"]),
                    // Draw line
                    //Ext.create('Ext.menu.CheckItem', actions["draw_line"]),
                    // Select control
                    Ext.create('Ext.menu.CheckItem', actions["select"]),
                    // Navigation history control
                    Ext.create('Ext.button.Button', actions["previous"]),
                    Ext.create('Ext.button.Button', actions["next"])
                ]
            }),
            handler: function(item, e)
            {
                map.setTitle(moduleConfig.submap[mapId].title);
            }
        });
        toolbarItems.push(Ext.create('Ext.button.Button', actions["nav"]));
        toolbarItems.push(Ext.create('Ext.button.Button', actions["draw_poly"]));
        toolbarItems.push(Ext.create('Ext.button.Button', actions["draw_line"]));

        toolbar.add(toolbarItems);
        toolbar.add('->');

        //////////////// FIN ToolbarItems

        if(typeof moduleConfig.submap[mapId].toolbarField != 'undefined'){
          $.each(moduleConfig.submap[mapId].toolbarField, function(index, value) {
              toolbar.add(value);
          });
        }


        var buttons = moduleConfig.submap[mapId].topButtons;
        $.each(
            moduleConfig.submap[mapId].topButtons, 
            function(index, value) 
            {
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
    //                        alert("baasic")
                        }
                    });
                } else {
                    var confButton = {
                        text: value.text,
                        value: value.action,
                        action: value.action,
                        id: value.action + suffix,
                        iconCls: value.iconCls,
                        //handler: function(item) {}
                    };

                    if(!Ext.isEmpty(value.enableToggle))
                        confButton['enableToggle'] = value.enableToggle;

                    if(!Ext.isEmpty(value.tooltip))
                        confButton['tooltip'] = value.tooltip;
                    
                    var item = new Ext.button.Button(confButton);
                }
                toolbar.add(item);
            });
        map.addDocked(toolbar);
    },
    //Exporta la información en un excel
	onExportFile: function()
	{
		console.log('Exportando el archivo.');
		
		var objStore = this.getResourceTrackingListStore();
		var strURLExport =  moduleConfig.services.urlExport;

        this.callParent([objStore, strURLExport]);
	},
    //Exporta la información de los históricos en un excel
    onExportFileResourceHistory: function()
	{
		console.log('Exportando el archivo de histórico.');
		
		var objStore = this.getResourceTrackingListHistoryStore();
		var strURLExport =  moduleConfig.services.urlExportHistory;

        this.callParent([objStore, strURLExport]);
	},
});
