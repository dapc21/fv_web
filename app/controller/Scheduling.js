var objController = null;

//Manejo del ProgressBar
var objStatusPGBar = {
    intTimeSeg: 5,
    intFunctionSetInterval: null, 
};
var winProgressBar = null;


Ext.define('LoadPrincipal.controller.' + controller, {
    extend: 'LoadPrincipal.controller.Core',
    models: [
        controller + '.ListResource',
        controller + '.ComboResourcesType',
        controller + '.ComboResourcesGroup',
        controller + '.ComboForms',
        controller + '.ListConfigureStatusProperties',
        controller + '.ListTemporalVisit',
        controller + '.SearchAddress',
        controller + '.ListResourceTasks',
        controller + '.ListTemporalTasks',
        controller + '.ListTemporalTasksGrid',
        controller + '.ListStartEnd',
        controller + '.SearchTasks',
    ],
    stores: [
        controller + '.ListResource',
        controller + '.ComboResourcesType',
        controller + '.ComboResourcesGroup',
        controller + '.ComboForms',
        controller + '.ListConfigureStatusProperties',
        controller + '.ListTemporalVisit',
        controller + '.SearchAddress',
        controller + '.ListResourceTasks',
        controller + '.ListResourceTasksCombo',
        controller + '.ListTemporalTasks',
        controller + '.ListTemporalTasksGrid',
        controller + '.ListStartEnd',
        controller + '.SearchTasks',
        controller + '.SearchResources',
    ],
    views: [
    ],
    refs: [],

    //INICIO - Atributos propios
    arrResourcesExcluded: [],
    bDeleteResourcesExcluded: true,
    objFormatLoad:{
        delimiter: ",",
		enclosure: "\"",
		encoding: "UTF-8",
		formatHour: "hh:mm:ss",
		formatDate: "YYYY-MM-DD"
    },
    objPlanning:{
        minVehicule: 2,
		minVisitsPerVehicle: 10,
		traffic: "normal",
		shortestDistance: false,
		balance: false
    },
    idSubEstados: 0,
    queueStatusConfigure: [
        {
            id: 'PENDIENTE',
            status: 'PENDIENTE',
            reasons: []
        },
        {
            id: 'CHECKIN',
            status: 'CHECKIN',
            reasons: []
        },
        {
            id: 'CHECKOUT CON FORMULARIO',
            status: 'CHECKOUT CON FORMULARIO',
            reasons: []
        },
        {
            id: 'CHECKOUT SIN FORMULARIO',
            status: 'CHECKOUT SIN FORMULARIO',
            reasons: []
        },
        {
            id: 'CHECKOUT PENDIENTE',
            status: 'CHECKOUT PENDIENTE',
            reasons: []
        },
    ],
    bDeleteConfigure: true,
    strLoadFileError: '',
    idReference: '',
    arrColor: arrListColor,
    windowTabConf: null,
    maskSecondScreen: null,
    maskFirstScreen: null,
    //FIN - Atributos propios
    
    init: function () 
    {
        //Controlador como variable global
        objController = this;

        //get current token
        var token = this.token();
        if (token) {
            Ext.Ajax.useDefaultXhrHeader = true;
            Ext.Ajax.cors = true;
            Ext.Ajax.defaultHeaders = {
                'Authorization': 'Bearer ' + token
            };
        }
        
        //Cargamos los iconos utilizados en el mapa y grids
        this.onLoadMapIcons(moduleConfig.map.icons);

        //call index view
        this.createColumns();
        this.render(moduleConfig.template);
        this.mapReady();
        this.addListSubButtons(0);

        //Prueba de la otra vista
        //var viewport = Ext.ComponentQuery.query('viewport')[0];
        //var programmingModule = viewport.down(AppGlobals.FormGridGridAlias).getLayout().setActiveItem(1); 

        //Agrregando la configuracion del mapa 1
        this.onLoadTaskConfig();
        //Impresion de los datos en el store
        this.getSchedulingListResourceTasksStore().addListener('load', this.onResourceTasksStoreLoad, this);
        
        //Nos movemos al paso que nos quedamos (Se puede colocar ProgressBar)
        objController.loadActualStep();
        
        //Cargamos el loading del grid de la primera pantalla
        var mapPanel1 = Ext.getCmp('idSchedulingView0');
        this.maskFirstScreen = new Ext.LoadMask(
            mapPanel1.getEl(), 
            {
                msg: [
                    '<div class="x-btn x-unselectable x-btn-default-small" onclick="objController.onReload()" style="color:#fff;">',
                        'Cancelar Proceso',
                    '</div>'
                ].join(''),
            }
        );
        //Cargamos el loading del mapa de la segunda pantalla
        var mapPanel1 = Ext.getCmp(AppGlobals.mapId + 1);
        this.maskSecondScreen = new Ext.LoadMask(
            mapPanel1.getEl(), 
            {
                msg: [
                    '<div class="x-btn x-unselectable x-btn-default-small" onclick="objController.onReload()" style="color:#fff;">',
                        'Cancelar Proceso',
                    '</div>'
                ].join(''),
            }
        );
        
        //Deshabilitamos los botones de abajo
        Ext.getCmp('idSchedulingViewButton0').getEl().mask();

        //Listeners 
        this.control(
            {
                ////Manipulación del formulario de carga

                //Filtrar recursos a programar por Tipo y filtra el combo de Grupos de Recuros (combo multiselect)
                '#SchedulingResourceType': {
                    change: this.onResourceTypesSelect
                },
                //Filtramos por grupo seleccionado
                '#SchedulingResourceGroup': {
                    change: this.onResourceGroupsSelect
                },

                ////Configurar los datos extras de la carga de archivo 

                //Abre ventana de configuracion
                '#SchedulingConfigure': {
                    click: this.onOpenConfig
                },
                //Evento antes de cerrar la ventana de Configuración
                '#SchedulingConfigureWindow':{
                    beforehide: function(){
                        this.onCloseConfigureSchedule();
                    }
                },
                //Cancela la Configuración
                '#SchedulingConfigureClose':{
                    click: function () { Ext.getCmp('SchedulingConfigureWindow').destroy(); }
                },
                //Guarda la configuración
                '#SchedulingConfigureSave':{
                    click: this.onConfigureSave
                },
                //Agregar SubEstados/Razones al grid Embebido
                '#SchedulingConfigureAddStatusProperties': {
                    click: this.addConfigureStatusProperties
                },
                //Cancela SubEstados/Razones al grid Embebido
                '#SchedulingConfigureCancelStatusProperties': {
                    click: this.cancelConfigureStatusProperties
                },
                //Cambio entre tipo de estados en configuración
                '#SchedulingConfigureStatus':{
                    change: this.onChangeStatusConfigure
                },
                //Borrar SubEstados al grid Embebido
                '#SchedulingDismissErrorsAndProgramming': {
                    click: this.onDismissErrorsAndProgrammingClick
                },
                //Cancela la programación
                '#SchedulingDismissErrorsAndProgrammingCancel':{
                    click: this.onCancelProgrammingClick
                },
                //Permite bajar un archivo con los errores generados en la carga
                '#SchedulingLoadFileError':{
                    click: this.onDownloadErrorFile
                },
                //Pto IniFin - Valida una dirección
                '#IniEndPointFormAddressValid':{
                    click: this.onValidAddress
                },
                //Pto IniFin - Cancela/Reset el formulario de edición
                '#IniEndPointFormCancel':{
                    click: this.onIniEndPointFormCancel
                },
                //Pto IniFin - Guarda un item en el formulario
                '#IniEndPointFormSave':{
                    click: this.onIniEndPointFormSave
                },
                //Pto IniFin - Edita/Elimina
                '#IniEndPointGrid actioncolumn':{
                    itemclick :
                        function(column, action, grid, rowIndex, colIndex, record, node)
                        {
                           switch (action){
                                case 'edit':
                                    this.onIniEndPointEditActionColumn(column, grid, rowIndex, colIndex, record, node);
                                    break;
                                case 'delete':
                                    this.onIniEndPointDeleteActionColumn(column, grid, rowIndex, colIndex, record, node);
                                    break;
                            }
                        }
                },

                ////Actualización de la direccion Inicial/Final de una fila

                //Carga las direciones de pickup y dropoff en el mapa y campos de validacion de Dirección
                'AliasSchedulingList0': {
                    select: this.onTemporalVisitClick
                },
                // Coloca el marcador de la direccion de inicio en el mapa de validacion
                '#startAddressValid': {
                    click: function (){this.onValidateAddress('startAddress');}
                },
                // Coloca el marcador de la direccion de fin en el mapa de validacion
                '#endAddressValid': {
                     click: function (){this.onValidateAddress('endAddress');}
                },
                //Actualiza la direccion pickup y dropoff de la tarea
                '#updateAddress': {
                    click: this.onUpdateAddress
                },
                //Muestra todos los inicio y fin  de una pag en una capa del mapa
                '#idSchedulingViewAllPointsButton':{
                    toggle: this.addAllElementMapUpdateAddress
                },

                //// Procesamiento del archivo cargado
                
                //Procesa la carga del archivo
                '#IdSchedulingForm0LoadFile': {
                    click: this.onLoadFile
                },

                ////Editar Recursos a programar

                //Abre Ventana de recursos a programar con los valores de los filtros
                '#SchedulingEditResourcesToSchedule': {
                    click: this.onEditResourcesToSchedule
                },
                //Eventos de la ventana editar recursos
                '#SchedulingResourcesToScheduleWindow': {
                    beforehide: function () {
                        this.onCloseEditResourcesToSchedule();
                    }
                },
                //Cierra la ventana editar recursos
                '#SchedulingResourceToScheduleClose': {
                    click: function () { Ext.getCmp('SchedulingResourcesToScheduleWindow').destroy(); }
                },
                //Guarda la ventana editar recursos
                '#SchedulingResourceToScheduleSave': {
                    click: function () 
                    {
                        objController.bDeleteResourcesExcluded = false;
                        Ext.getCmp('SchedulingResourcesToScheduleWindow').destroy();
                        //Limpiamos por los elementos null
                        objController.arrResourcesExcluded.clean(null);
                        
                        //Actualizamos los recursos a programar
                        var resourceType = Ext.getCmp(controller + 'ResourceType').getValue();
                        var resourceGroup = Ext.getCmp(controller + 'ResourceGroup').getValue();
                        
                        //Mostramos la cantidad de recursos
                        objController.addLengthResources(objController.arrResourcesExcluded, resourceType, resourceGroup);
                    }
                },
                //Búscar Recurso (textfield)
                '#SchedulingResourcesToScheduleFilterSearch': {
                    keyup: this.multiSearch
                },
                //Borrar/Limpiar filtro Recurso (boton)
                '#SchedulingResourcesToScheduleFilterSearchClear': {
                    click: this.clearFilter
                },
                //Muestra los recursos excluidos
                '#SchedulingResourceToScheduleFilterExcludeView': {
                    click: function () { this.managerExcluded(-1) }
                },
                //Muestra los recursos incluidos
                '#SchedulingResourceToScheduleFilterIncludeView': {
                    click: function () { this.managerExcluded(1) }
                },
                //Agrega/incluye los recursos según filtro
                '#SchedulingResourceToScheduleFilterExclude': {
                    click: function () { this.managerExcludedFilter(-1); }
                },
                //Quita/Excluye los recursos según filtro
                '#SchedulingResourceToScheduleFilterInclude': {
                    click: function () { this.managerExcludedFilter(1); }
                },
                //Cambia la pagina en la lista
                '#IdSchedulingList0PagingToolbar':{
                    change: this.onMovePagingList0
                },

                //// Segunda vista

                //Vuelve a cargar el template inicial
                '#SchedulingSecondStepReload': {
                    click: this.onReload
                },
                //Selecciona y deselecciona un elemento de la tarea a programar
                'AliasSchedulingList1' : {
                    select    : this.onResourceTasksSelect,
                    deselect  : this.onResourceTasksDeSelect
                },
                //Abre la ventana para ver las tareas no programadas
                '#SchedulingSecondStepUncheduledTasks':{
                    click: this.onViewTaskNoProgramming
                },
                //Filtra las tareas no programada por Nombre/Código
                '#SchedulingSecondStepSearchTask':{
                    select: this.onFilterTaskSecondStep,                
                },
                //Filtra los recursos
                '#SchedulingSecondStepSearchResource':{
                    select: function()
                    {
                        var combo = Ext.getCmp('SchedulingSecondStepSearchTask');
                        objController.onFilterTaskSecondStep(combo, [], null);
                    }
                },
                //Limpia el filtro de la caja de texto
                '#SchedulingSecondStepSearchTaskClose':{
                    click: function()
                    {
                        var combo = Ext.getCmp('SchedulingSecondStepSearchTask');
                        var comboResource = Ext.getCmp('SchedulingSecondStepSearchResource');
                        comboResource.reset();
                        combo.reset();
                        objController.onFilterTaskSecondStep(combo, [], null);
                    }
                },
                //Acepta y asigna la planificación configurada
                '#SchedulingSecondStepAcceptAndAsign':{
                    click: this.onAcceptAndAsignAll
                },
                ////Segunda pantalla grid 2
                //Vamos del grid 2 al 1
                '#SchedulingBackToFirstGrid':{
                    click: this.onBackToFirstGrid
                },
                //Cambia el combo de recursos
                '#SchedulingGridSecondResource':{
                    change: this.updateStoreSecondGrid
                },
                //Grid 2
                'AliasSchedulingList2':{
                    itemclick: this.onItemCickGridSecond,
                    itemcontextmenu: this.onContextualMenuGridSecond
                },
                
            }
        );
    },
    //Actualiza la direccion
    onUpdateAddress: function () 
    {
        console.log('Acualiza una dirección');

        var list = Ext.getCmp('IdSchedulingList0');
        var selModel = list.getSelectionModel();
        var strDirIni = Ext.getCmp('startAddress').getValue();
        var strDirFin = Ext.getCmp('endAddress').getValue();
        console.log('strDirIni:', strDirIni, 'strDirFin:', strDirFin);
        //verificamos que no sean vacías las direcciones - OJO Preguntar
        if(Ext.isEmpty(strDirIni) && Ext.isEmpty(strDirFin)){
            Ext.MessageBox.show({
                title: 'Error de validación',
                msg: 'Se debe llenar al menos una dirección.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }

        if (selModel.hasSelection() && selModel.getCount() == 1) {
            var map = Ext.getCmp(AppGlobals.mapId + 0);
            var record = selModel.getSelection()[0]
            var formData = {};
            //console.log('map.search',map.search);
            for (var key in map.search) {
                if (map.search.hasOwnProperty(key)) {
                    var layer = map.search[key];

                    //pickup
                    if(layer.name == 'Inicio')
                    {
                        var feature = layer.features[0];
                        var lonlat = new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y);
                        lonlat.transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));

                        formData['pickup.address'] = feature.data.name;
                        formData['pickup.location'] = {
                            lat: lonlat.lat,
                            lng: lonlat.lon,
                        };

                    }
                    else
                        //dropoff
                        if(layer.name == 'Fin'){
                            if(!Ext.isEmpty(strDirFin))
                            {
                                var feature = layer.features[0];
                                var lonlat = new OpenLayers.LonLat(feature.geometry.x, feature.geometry.y);
                                lonlat.transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'));
                                
                                formData['dropoff.address'] = feature.data.name;
                                formData['dropoff.location'] = {
                                    lat: lonlat.lat,
                                    lng: lonlat.lon,
                                };
                            }
                            else
                            {
                                formData['dropoff.address'] = feature.data.name;
                                formData['dropoff.location'] = {
                                    lat: lonlat.lat,
                                    lng: lonlat.lon,
                                };
                            }
                        }
                }
            }

            //Actualizamos la información
            if(!Ext.isEmpty(formData)){

                //Si el order tiene el estatus como NO procesado lo cambiamos a procesado
                if(record.get('status') == 'NOT PROCESSED'){
                    formData['status'] = 'PROCESSED';
                }

                console.log('formData:', formData);

                var strURLSource = moduleConfig.services.listTemporalVisitUrl + '/' + record.internalId;

                Ext.Ajax.request({
                    url: strURLSource,
                    type: 'rest',
                    method: 'PUT',
                    scope: this,
                    headers: { 
                        'Content-Type' : 'application/json' 
                    },
                    params: Ext.JSON.encode(formData),
                    success: function (response) {
                        var respAll = Ext.JSON.decode(response.responseText);
                        if(respAll.error){
                            Ext.MessageBox.show({
                                title: 'Error',
                                msg: respAll.msg,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });
                        }else{
                            Ext.MessageBox.show({
                                title: 'Éxito',
                                msg: respAll.msg,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });

                            Ext.getCmp('startAddress').reset();
                            Ext.getCmp('endAddress').reset();

                            //Actualizamos el store
                            var grid = Ext.getCmp(AppGlobals.listId + '0');
                            var store = grid.getStore();
                            store.reload();

                            //Borramos la capa y el arreglo que guarda las capas
                            for (var key in map.search) {
                                if (map.search.hasOwnProperty(key)) {
                                    var layer = map.search[key];
                                    //Borramos la capa
                                    map.map.removeLayer(layer);
                                    map.search[key] = null;
                                }
                            }

                            //Borramos el arreglo que guarda las capas
                            map.search.clean(null);
                        }
                    },
                    failure: function (response) {
                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: 'No se pudo actualizar el registro',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                });
            }
        }
    },
    //Muestra todos los inicio y fin de una pag en una capa del mapa
    addAllElementMapUpdateAddress: function( thisButton, pressed, eOpts , bNotExpand)
    {
        console.log('Veo o nop todos los elementos en el mapa');

        var map = Ext.getCmp(AppGlobals.mapId + 0);
        var proj = new OpenLayers.Projection("EPSG:4326");
        var startAddress = Ext.getCmp('startAddress');
        var endAddress = Ext.getCmp('endAddress');
        
        //Encontramos el control
        var control = map.map.getControlsBy('name', 'TodosIniFin');
        
        //Encontramos la capa o la creamos
        var layerAll = map.map.getLayersByName('Todos');

        if(Ext.isEmpty(layerAll)){
            layerAll = new OpenLayers.Layer.Vector('Todos');
        }else{
            layerAll = layerAll.pop();
            
            //Borramos todas las features
            layerAll.removeAllFeatures();

            //Desactivamos el control
            if(!Ext.isEmpty(control)){
                control = control.pop();
                control.deactivate();
            }
                
            if(!pressed){
                return;
            }
        }

        //Obtenemos todos los registros
        var storeAllPoints = Ext.getCmp(AppGlobals.listId + '0').getStore();
        var records = storeAllPoints.data.items;
        var arrAllFeatures = [];
        
        for (var i = 0; i < records.length; i++) 
        {
            var record = records[i];
            var dataDropoff = record.data.dropoff; //Fin
            var dataPickup = record.data.pickup; //inicio
            var confIniFin = { 
                pointRadius: 18,
                fontColor: '#FFF',
                fontOpacity: 0.8,
                fontSize: '9px',
                label: '' + record.data.numberLine,
                labelAlign: 'lb',
                labelOutlineWidth: 4,
                labelOutlineColor: '#1fbad6',
                labelYOffset: 15,
                labelXOffset: 8, 
                graphicHeight: 25, 
                graphicWidth: 21,
            };
            confIniFin['externalGraphic'] =  startAddress.img;
            var featureIni = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(dataPickup.location.lng, dataPickup.location.lat).transform(proj, map.map.getProjectionObject()),
                {
                    address: dataPickup.address,
                    index_row: record.data.numberLine -1,
                },
                JSON.parse(JSON.stringify(confIniFin))
            );
            confIniFin['externalGraphic'] =  endAddress.img;
            var featureFin = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(dataDropoff.location.lng, dataDropoff.location.lat).transform(proj, map.map.getProjectionObject()),
                {
                    address: dataDropoff.address,
                    index_row: record.data.numberLine -1,
                },
                confIniFin
            );

            arrAllFeatures.push(featureIni);
            arrAllFeatures.push(featureFin);            
        }

        layerAll.addFeatures(arrAllFeatures);
        map.map.addLayers([layerAll]);

        ////Manejamos los controles

        //Si no existe se crea
        if(Ext.isEmpty(control)){
            control  = new OpenLayers.Control.SelectFeature(  
                layerAll, 
                { 
                    name: 'TodosIniFin',
                    onSelect: function(feature)
                    {
                        var grid = Ext.getCmp(AppGlobals.listId+'0');
                        //Seleccionamos la fila en el grid
                        grid.getSelectionModel().select(feature.attributes.index_row, false, true);
                        grid.getView().getNode(feature.attributes.index_row).focus();
                    },
                }
            );

            //Agregamos el control
            map.map.addControl(control);
        }

        //Activamos el control
        control.activate();
        
        bNotExpand = bNotExpand || false;
        if(!bNotExpand)
            //Hacemos zoom out para ver todo en conjunto
            map.map.zoomToExtent(layerAll.getDataExtent());
    },
    //Valida una dirección button
    onValidateAddress:function(strId)
    {
        console.log('Valida la dirección');

        var textAddress = Ext.getCmp(strId);
        var strURLAddress = moduleConfig.services.urlAddressGeocoding + '?address=' + textAddress.getValue();

        Ext.Ajax.request({
            url: strURLAddress,
            type: 'rest',
            method: 'GET',
            scope: this,
            //params: Ext.JSON.encode(formData),
            success: function (response) {
                var respAll = Ext.JSON.decode(response.responseText);
                
                if(respAll.error){
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: 'No se pudo obtener la dirección',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                    return;
                }
                
                //Agregamos las direcciones iniciales
                var objData = respAll.data[0];

                this.onValidateAddressSelect(textAddress, [{data:objData}], true);
            },
            failure: function (response) {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'No se pudo obtener la dirección',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        });
    },
    //Valida una dirección
    onValidateAddressSelect: function (combo, record, center) 
    {
        var map = Ext.getCmp(AppGlobals.mapId + 0);
        var proj = new OpenLayers.Projection("EPSG:4326");
        var strLayerIniFin = 'Seleccionado';
        var layerIniFin = map.map.getLayersByName(strLayerIniFin);

        //Creamos la capa si aplica
        if(Ext.isEmpty(layerIniFin))
        {
            layerIniFin = new OpenLayers.Layer.Vector(strLayerIniFin);
            
            //Agregamos la capa
            map.map.addLayers([layerIniFin]);
        }
        else
        {
            layerIniFin = layerIniFin.pop();
        }
        console.log('layerIniFin:', layerIniFin);

        //Encontramos la caracteristica a modificar
        var feature = layerIniFin.getFeaturesByAttribute('name', combo.fieldLabel);

        //Eliminamos la caracteristica
        if(!Ext.isEmpty(feature)){
            layerIniFin.removeFeatures(feature);
        }

        if(!Ext.isEmpty(record[0].data.lng) && !Ext.isEmpty(record[0].data.lat))
        {
            feature = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(record[0].data.lng, record[0].data.lat).transform(proj, map.map.getProjectionObject()),
                {
                    name: combo.fieldLabel
                },
                { 
                    pointRadius: 18,
                    fontColor: '#FFF',
                    fontOpacity: 0.8,
                    fontSize: '9px',
                    label: '' + record[0].data.numberLine,
                    labelAlign: 'lb',
                    labelOutlineWidth: 4,
                    labelOutlineColor: '#000',
                    labelYOffset: 15,
                    labelXOffset: 8, 
                    graphicHeight: 25, 
                    graphicWidth: 21,
                    externalGraphic: combo.img,  
                }
            );

            //Agrego las caracteristicas
            layerIniFin.addFeatures([feature]);
        }

        //Ver si se centra o se expande el mapa
        if(center===true) //La variable center puede ser otro tipo de dato
        {
            var point = new OpenLayers.LonLat(record[0].data.lng, record[0].data.lat);
            point.transform(proj, map.map.getProjectionObject());
            map.map.setCenter(point, 10);
        }
        else
        {
            //map.map.zoomToExtent(layerIniFin.getDataExtent());
            objController.applyZoom(map, layerIniFin, true);
        }
    },
    //Agrega la funcion clean a los arreglos y el arreglo search
    mapReady: function () 
    {
        Array.prototype.clean = function (deleteValue) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == deleteValue) {
                    this.splice(i, 1);
                    i--;
                }
            }
            return this;
        };

        var mapValidateAddress = Ext.getCmp(AppGlobals.mapId + 0);
        mapValidateAddress.search = [];
    },
    //Click al grid de orders para editar la dirección 
    onTemporalVisitClick: function ( grid, record, index, eOpts )
    {
        console.log('Click a elemento ' + index);
        console.log('Registro: ',  record);
        
        var objDataStartAddress = record.data.pickup;
        var objDataFinishAddress = record.data.dropoff;
        var startAddress = Ext.getCmp('startAddress');
        var endAddress = Ext.getCmp('endAddress');

        startAddress.setValue(objDataStartAddress.address);
        endAddress.setValue(objDataFinishAddress.address);

        //Agregamos las direcciones iniciales
        var objDataStart = {
            numberLine: record.data.numberLine,
            name: objDataStartAddress.address,
            lat:  objDataStartAddress.location.lat,
            lng:  objDataStartAddress.location.lng,

        };
        var objDataEnd = {
            numberLine: record.data.numberLine,
            name: objDataFinishAddress.address,
            lat:  objDataFinishAddress.location.lat,
            lng:  objDataFinishAddress.location.lng,
        };

        //Quitamos las caracteristicas viejas
        var map = Ext.getCmp(AppGlobals.mapId + 0);
        var strLayerIniFin = 'Seleccionado';
        var layerIniFin = map.map.getLayersByName(strLayerIniFin);

        if(!Ext.isEmpty(layerIniFin))
        {
            layerIniFin = layerIniFin.pop();
            layerIniFin.removeAllFeatures();
        }
        
        if(!Ext.isEmpty(objDataStartAddress))
            this.onValidateAddressSelect(startAddress, [{data:objDataStart}]);

        if(!Ext.isEmpty(objDataFinishAddress))
            this.onValidateAddressSelect(endAddress, [{data:objDataEnd}]);

        //Expandimos la ventana si no está
        Ext.getCmp('idSchedulingEditAddressPanel').expand();
    },
    //Cambia la pagina en la lista
    onMovePagingList0: function( thisPagingToolbar, pageData, eOpts )
    {
        console.log('Cambiando de pagina en el List0');

        var buttonViewAll = Ext.getCmp('idSchedulingViewAllPointsButton');
        
        //Se debe actualizar el todos
        this.addAllElementMapUpdateAddress( buttonViewAll, buttonViewAll.pressed, null, true);

        //Reiniciar el inicio y el fin
        var map = Ext.getCmp(AppGlobals.mapId + 0);
        var strLayerIniFin = 'Seleccionado';
        var layerIniFin = map.map.getLayersByName(strLayerIniFin);

        if(!Ext.isEmpty(layerIniFin))
        {
            layerIniFin = layerIniFin.pop();
            layerIniFin.removeAllFeatures();
        }
    },
    //Procesa el archivo
    onDismissErrorsAndProgrammingClick: function () 
    {
        console.log('Ejecuta la programación');

        if(Ext.isEmpty(objController.idReference)){
            Ext.MessageBox.show({
                title: 'Error de validación',
                msg: 'Debe cargar un archivo primero',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }

        Ext.Msg.confirm(
            'Aviso',
            '¿Deseas ejecutar la programación actual?',
            function (e) {
                if (e == 'yes') 
                {   
                    var urlServiceQuery = moduleConfig.services.schedulingProcesses + '/' + objController.idReference + '/schedule';

                    Ext.Ajax.request({
                        url: urlServiceQuery,
                        type: 'rest',
                        method: 'POST',
                        scope: this,
                        /*params: {
                            filters: filters,
                            limit: limit,
                            view: Ext.JSON.encode(view)
                        },*/
                        success: function (response) {
                            var respAll = Ext.JSON.decode(response.responseText);
                            //console.log(respAll);

                            //Limpiamos el mapa
                            objController.onLoadTaskConfig();

                            objController.manageLed('SchedulingLedPlanning', 'WAITING', 'Planificando');

                            //Preguntamos por el proceso
                            objStatusPGBar.intFunctionSetInterval = setInterval(
                                function(){
                                    //Solicitudes
                                    objController.requestAJAXPlanning(true, null, moduleConfig.services.schedulingProcesses + '/' + objController.idReference);
                                }, 
                                objStatusPGBar.intTimeSeg*1000
                            );

                        },
                        failure: function (response) {
                            Ext.MessageBox.show({
                                title: 'Error',
                                msg: 'No se pudo recuperar los elementos',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });
                        }
                    });
                }
            }
        );
    },
    //Solicitud Ajax Status de la planificación
    requestAJAXPlanning: function(bPrint, objStore, strURL, functionSuccess, functionFailure)
    {
        var strMethod = 'GET';

        //Armamos el JSON
        var objOptionsAJAX = {
            url      : strURL,
            type     : 'rest',
            method   : strMethod,
            scope    : this
        };

        objOptionsAJAX.success = (!Ext.isEmpty(functionSuccess))?
            functionSuccess :
            function (objResponse){
                var respData = Ext.JSON.decode(objResponse.responseText);
                var actualStep = respData.actualStep;
                console.log('Planning actualStep:', actualStep);
                switch (actualStep.status) {
                    case 'STOPPED':
                    case 'PAUSED':
                    case 'ERROR':
                        clearInterval(objStatusPGBar.intFunctionSetInterval);
                        objController.manageLed('SchedulingLedPlanning', 'ERROR', 'ERROR:' + actualStep.msgStatus);
                        
                        break;
                    case 'WAITING':
                    case 'STARTED':
                        //Actualizar la fecha
                        var objDate =new Date();
                        Ext.getCmp('SchedulingUltDate1').setText(Ext.Date.format(objDate, 'Y-m-d H:i:s'));
                        Ext.getCmp('SchedulingUltDate2').setText(Ext.Date.format(objDate, 'Y-m-d H:i:s'));

                        break;
                    case 'SUCCESS':
                        clearInterval(objStatusPGBar.intFunctionSetInterval);

                        //Cerramos el proceso de planificación
                        objController.manageLed('SchedulingLedPlanning', 'SUCCESS', 'Planificación procesada');
                        
                        //Paso de ruteo
                        objController.manageLed('SchedulingLedRouting', 'WAITING', 'Enrutando');
                        objStatusPGBar.intFunctionSetInterval = setInterval(
                            function(){
                                //Solicitudes
                                objController.requestAJAXRouting(true, null, moduleConfig.services.schedulingProcesses + '/' + objController.idReference);
                            }, 
                            objStatusPGBar.intTimeSeg*1000
                        );

                        break; 
                }
                //console.log('respData:', respData);

                //Archivo de errores
                this.strLoadFileError = actualStep.filePathError + '/' + actualStep.fileNameError;
            };

        objOptionsAJAX.failure = (!Ext.isEmpty(functionFailure))?
            functionFailure :
            function (objResponse){
                //Ojo parar el setInteerval
                clearInterval(objStatusPGBar.intFunctionSetInterval);
            };

        //Imprimimos la llamada para debug
        if(bPrint){
            console.log('URL: ' + strURL);
            console.log('Metodo: ' + strMethod);
        }

        //Hacemos la llamada
        Ext.Ajax.request(objOptionsAJAX);
    },
    //Solicitud Ajax Status de la planificación
    requestAJAXRouting: function(bPrint, objStore, strURL, functionSuccess, functionFailure)
    {
        var strMethod = 'GET';

        //Armamos el JSON
        var objOptionsAJAX = {
            url      : strURL,
            type     : 'rest',
            method   : strMethod,
            scope    : this
        };

        objOptionsAJAX.success = (!Ext.isEmpty(functionSuccess))?
            functionSuccess :
            function (objResponse){
                var respData = Ext.JSON.decode(objResponse.responseText);
                var actualStep = respData.actualStep;
                console.log('Routing actualStep:', actualStep);
                //console.log('respData:', respData);
                switch (actualStep.status) {
                    case 'STOPPED':
                    case 'PAUSED':
                    case 'ERROR':
                        clearInterval(objStatusPGBar.intFunctionSetInterval);
                        objController.manageLed('SchedulingLedRouting', 'ERROR', 'ERROR:' + actualStep.msgStatus);
                        
                        break;
                    case 'WAITING':
                    case 'STARTED':
                        //Actualizar la fecha
                        var objDate =new Date();
                        Ext.getCmp('SchedulingUltDate1').setText(Ext.Date.format(objDate, 'Y-m-d H:i:s'));
                        Ext.getCmp('SchedulingUltDate2').setText(Ext.Date.format(objDate, 'Y-m-d H:i:s'));

                        break;
                    case 'SUCCESS':
                        clearInterval(objStatusPGBar.intFunctionSetInterval);
                        objController.manageLed('SchedulingLedRouting', 'SUCCESS', 'Enrutado procesado');
                        
                        var store = Ext.data.StoreManager.lookup(controller + '.ListResourceTasks');
                        store.proxy.extraParams = {
                            filters: Ext.JSON.encode({
                            'and':[
                                    {
                                        field: 'id_process',
                                        comparison: 'eq',
                                        value: objController.idReference
                                    },
                                ]
                            })
                        };
                        var timeRefresh = 5000;
                        //Bloqueamos el grid
                        Ext.getCmp(AppGlobals.listId+1).getEl().mask(/*'','loader-fieldvision'*/);
                        store.loadPage(
                            1, 
                            {
                                scope: this,
                                callback: function(records, operation, success)
                                {
                                    if(store.getTotalCount()==0)
                                    {

                                        setTimeout(
                                            function()
                                            {
                                                console.log('Activando el timeout porque no cargó nada. ' + timeRefresh);
                                                store.loadPage(1,{
                                                    scope: this,
                                                    callback:function()
                                                    {
                                                        Ext.getCmp(AppGlobals.listId+1).getEl().unmask();
                                                    }
                                                });
                                            }, 
                                            timeRefresh
                                        );
                                    }
                                    else
                                    {
                                        Ext.getCmp(AppGlobals.listId+1).getEl().unmask();
                                    }
                                }
                            }
                        );

                        //Actualizamos el store de las tareas no programadas
                        objController.loadStoreTaskNoProgramming();
                        //Actualizamos el Nombre del Boton
                        var storeTaskNoProgramming = Ext.data.StoreManager.lookup(moduleConfig.ViewTaskNoProgrammingStore);
                        storeTaskNoProgramming.load({
                            scope: this,
                            callback: function(records, operation, success) 
                            {
                                Ext.getCmp('SchedulingSecondStepUncheduledTasks').setText( scheduling.form.secondstep.uncheduledTasks + ' (' + storeTaskNoProgramming.getTotalCount() + ')');
                            }
                        });

                        var viewport = Ext.ComponentQuery.query('viewport')[0];
                        var programmingModule = viewport.down(AppGlobals.FormGridGridAlias).getLayout().setActiveItem(1); 
                        
                        //Agregamos la fecha
                        Ext.getCmp(controller + 'Subform1Panel').setTitle(scheduling.form.title + ' (' + respData.targetDate.split(' ')[0] + ')');
                        break; 
                }
                //console.log('respData:', respData);

                //Archivo de errores
                this.strLoadFileError = actualStep.filePathError + '/' + actualStep.fileNameError;
            };

        objOptionsAJAX.failure = (!Ext.isEmpty(functionFailure))?
            functionFailure :
            function (objResponse){
                //Ojo parar el setInteerval
                clearInterval(objStatusPGBar.intFunctionSetInterval);
            };

        //Imprimimos la llamada para debug
        if(bPrint){
            console.log('URL: ' + strURL);
            console.log('Metodo: ' + strMethod);
        }

        //Hacemos la llamada
        Ext.Ajax.request(objOptionsAJAX);
    },
    //Cancela toda la programación
    onCancelProgrammingClick: function()
    {
        console.log('Cancelando la programación');

        Ext.Msg.confirm(
            'Aviso',
            '¿Deseas cancelar la programación actual?',
            function (e) {
                if (e == 'yes') 
                {   
                    if(!Ext.isEmpty(objController.idReference))
                    {
                        objController.onAJAXDeleteProcessAndReset();
                    }
                }
            }
        );
    },
    //Elimina un proceso y recetea todo
    onAJAXDeleteProcessAndReset: function()
    {
        //Deshabilitamos la ventana Principal
        Ext.getCmp(AppGlobals.FormGridGridId).getEl().mask('','loader-fieldvision');

        //Eliminamos el proceso
        Ext.Ajax.request({
            url      : moduleConfig.services.schedulingProcesses + '/' + objController.idReference,
            type     : 'rest',
            dataType : 'json',
            method   : 'DELETE',
            //scope    : this,
            /*headers  : {
                'Content-Type': 'application/json'
            },*/
            //params   : Ext.JSON.encode(objDataForm),
            success  : function(response)
            {
                var obj = Ext.decode(response.responseText);

                //
                objController.onResetViewFirst();
                Ext.getCmp(AppGlobals.formId + '0').getEl().unmask();

                //Reiniciamos los leds
                objController.manageLed('SchedulingLedLoadFile', '-', '-');
                objController.manageLed('SchedulingLedProcessFile', '-', '-');
                objController.manageLed('SchedulingLedPlanning', '-', '-');
                objController.manageLed('SchedulingLedRouting', '-', '-');
                objController.manageLed('SchedulingLedAsingRoute', '-', '-');

                Ext.getCmp(AppGlobals.FormGridGridId).getEl().unmask();

                Ext.getCmp('SchedulingLengthResourcesLabel').setText('');
            },
            failure  : function(response)
            {
                var obj = Ext.decode(response.responseText);
                Ext.getCmp(AppGlobals.FormGridGridId).getEl().unmask();
            }
        });
    },
    //Resetea los valores de la primera vista
    onResetViewFirst: function()
    {
        console.log('Resetea los valores de la primera vista');

        //Formulario principal de carga
        Ext.getCmp(AppGlobals.formId + 0).getForm().reset();

        //Formulario de actualización de dirección Inicio/Fin
        Ext.getCmp('startAddress').reset();
        Ext.getCmp('endAddress').reset();

        //Colocar los filtros en el stores y refrescar el grid
        var grid = Ext.getCmp(AppGlobals.listId + '0');
        var store = grid.getStore();
        
        store.proxy.extraParams = {
            filters: Ext.JSON.encode({
            'and':[
                    {
                        field: 'id_company',
                        comparison: 'eq',
                        value: '57b31172e1382309213e1b50'
                    },
                    {
                        field: 'id_company',
                        comparison: 'isnull',
                    }
                ]
            })
        },
        store.loadPage(1);

        //Resetear el titulo
        Ext.getCmp(controller + 'Subform1Panel').setTitle(scheduling.form.title);
    },
    //Agrega una fila en el grid de subestado de configuración
    addConfigureStatusProperties: function (thisButton, e, eOpts) 
    {
        var store = Ext.StoreMgr.lookup(controller + '.ListConfigureStatusProperties');
        var number = ++this.idSubEstados;
        var typeWeb = Ext.getCmp(controller + 'ConfigureTypeWeb').getValue();
        var typeMovil = Ext.getCmp(controller + 'ConfigureTypeMovil').getValue();
        var TakePhoto = Ext.getCmp(controller + 'ConfigureTakeWithPhoto').getValue();
        var selectStatus = Ext.getCmp(controller + 'ConfigureStatus').getValue();
        var typesDevices = [];

        //Verificamos que tenga seleccionado un estado
        if(Ext.isEmpty(selectStatus)){
           Ext.MessageBox.show({
                    title: 'Error de Validación',
                    msg: 'Debe seleccionar un estado.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            return;
        }

        //Verificamos que se haya seleccionado algún tipo de dispositivo
        if(!typeWeb && !typeMovil){
           Ext.MessageBox.show({
                    title: 'Error de Validación',
                    msg: 'Debe seleccionar al menos un tipo de dispositivo.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            return;
        }

        //Agregamos los tipos de dispositivo al arreglo
        if(typeWeb)
            typesDevices.push('web');
        
        if(typeMovil)
            typesDevices.push('movil');

        //Creamos el modelo en el store
        store.add({
            '_id': number,
            'label': 'Propiedad',
            'type':typesDevices,
            'value': 'Propiedad',
            'withPhoto': TakePhoto
        });

        //Receteamos el formulario
        this.cancelConfigureStatusProperties(null, null, null); 
        
    },
    //Cancela la edición de un subestado de configuración
    cancelConfigureStatusProperties: function(thisButton, e, eOpts) 
    {
         //Receteamos el formulario
        Ext.getCmp(controller + 'ConfigureTypeWeb').setValue(false);
        Ext.getCmp(controller + 'ConfigureTypeMovil').setValue(false);
        Ext.getCmp(controller + 'ConfigureTakeWithPhoto').setValue(false);
    },
    //Cambio entre tipo de estados en configuración
    onChangeStatusConfigure: function(thisButton, newValue, oldValue, eOpts)
    {
        console.log('Cambiando de estado en el select');

        var store = Ext.StoreMgr.lookup(controller + '.ListConfigureStatusProperties');
        var indexStatusNew = -1, indexStatusOld = -1;

        for (var key in this.queueStatusConfigure) 
        {
            var objStatus = this.queueStatusConfigure[key];

            if(objStatus.status == oldValue)
                indexStatusOld = key;

            if(objStatus.status == newValue)
                indexStatusNew = key;
            
            if(indexStatusNew != -1 && indexStatusOld != -1)
                break
        }
        
         if(indexStatusNew != -1){
             if(indexStatusOld != -1){
                this.queueStatusConfigure[indexStatusOld].reasons = store.data.items.slice(0);
                store.removeAll();
             }
             store.loadData(this.queueStatusConfigure[indexStatusNew].reasons);
         }
    },
    //Abre ventana de configuracion
    onOpenConfig: function () 
    {
        var m = moduleConfig;

        if(Ext.isEmpty(this.windowTabConf)){
            this.windowTabConf = this.newWindow(
                m.groupIdConfigure,
                m.titleWindowConfigure,
                m.widthWindowConfigure,
                m.heightWindowConfigure,
                m.resizableWindowConfigure
            );

            //Grid Panel
            this.windowTabConf.add(
                {
                    xtype: 'tabpanel',
                    id: ((m.groupIdConfigure) ? (m.groupIdConfigure + 'Tab') : 'TabWindow'),
                    border: false,
                    items: (m.itemsConfigure) ?
                            m.itemsConfigure :
                            [{ text: 'No components created in the toolbar', width: '100%' }]
                }
            );

            //BottomBar
            this.windowTabConf.addDocked(
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        pack: 'center',
                        type: 'hbox'
                    },
                    items: (m.bottomButtonsConfigure) ? 
                            m.bottomButtonsConfigure : 
                            [{ xtype: 'panel', html: '<center><span>No buttons created in the toolbar</center>' }]
                }
            );
            this.windowTabConf.closeAction = 'hide';
        }

        var windowTab = this.windowTabConf;
        windowTab.doLayout();
        windowTab.show();
        
        var strURLCompanies = moduleConfig.services.urlCompanies + '/' + storageIdCompany;
        
        Ext.Ajax.request({
            url      : strURLCompanies,
            method   : 'GET',
            type     : 'rest',
            dataType : 'json',
            success  : function(response){
                var objData =  Ext.JSON.decode(response.responseText);
                var storePtoIniFin = Ext.getCmp('IniEndPointGrid').getStore();
                var arrAllData = [];

                console.log('objData:', objData);

                //Cargamos el formato de carga del archivo
                var formFile = Ext.getCmp(controller + 'ConfigureFormFormatLoad').getForm();

                if(!Ext.isEmpty(objData.file)){
                    //formFile.setValues(objData.file); //Ojo no funcionó Tocó a mano
                    var items = [];

                    //Archivos con cabeceras
                    var withHeaders = Ext.isEmpty(objData.file.withHeaders)? true : objData.file.withHeaders;
                    Ext.getCmp(controller + 'WithHeaders' + (withHeaders? 'Yes' : 'No') ).setValue(true);

                    //Separador de fila
                    var comboSeparador = Ext.getCmp(controller + 'ConfigureFormFormatLoadSeparator');
                    var storeSeparador = comboSeparador.getStore();
                    comboSeparador.setValue(storeSeparador.findRecord('_id', objData.file.delimiter));

                    //Delimitador de texto
                    var comboDelimiter = Ext.getCmp(controller + 'ConfigureFormFormatLoadDelimiter');
                    var storeDelimiter = comboDelimiter.getStore();
                    comboDelimiter.setValue(storeDelimiter.findRecord('_id', objData.file.enclosure));
                    
                    //Codificación de archivo
                    var comboEncoding = Ext.getCmp(controller + 'ConfigureFormFormatLoadEncoding');
                    var storeEncoding = comboEncoding.getStore();
                    comboEncoding.setValue(storeEncoding.findRecord('_id', objData.file.encoding));

                    //Formato hora
                    var comboHour = Ext.getCmp(controller + 'ConfigureFormFormatLoadHourFormat');
                    var storeHour = comboHour.getStore();
                    comboHour.setValue(storeHour.findRecord('_id', objData.file.formatHour));

                    //Formato Fecha
                    var comboDate = Ext.getCmp(controller + 'ConfigureFormFormatLoadDateFormat');
                    var storeDate = comboDate.getStore();
                    comboDate.setValue(storeDate.findRecord('_id', objData.file.formatDate));
                }

                //Cargamos la planeación
                var formPlanning = Ext.getCmp(controller + 'ConfigureFormPlanning').getForm();

                if(!Ext.isEmpty(objData.planningConfiguration)){
                    //formPlanning.setValues(objData.planningConfiguration); //Ojo no funcionó Tocó a mano
                    var items = [];

                    //Utiliza la minima cantidad de recursos
                    var MinimumResource = Ext.isEmpty(objData.planningConfiguration.minVehicule)? true : objData.planningConfiguration.minVehicule;
                    Ext.getCmp(controller + 'MinimumResource' + (MinimumResource? 'Yes' : 'No') ).setValue(true);

                    //Nro minimo de visitas
                    var comboMinVisitsPerVehicle = Ext.getCmp(controller + 'ConfigureFormPlanningMinVisitsPerVehicle');
                    comboMinVisitsPerVehicle.setValue(objData.planningConfiguration.minVisitsPerVehicle);

                    //Tipo de trafico
                    var comboPlanningTraffic = Ext.getCmp(controller + 'ConfigureFormPlanningTraffic');
                    var storePlanningTraffic = comboPlanningTraffic.getStore();
                    comboPlanningTraffic.setValue(storePlanningTraffic.findRecord('_id', objData.planningConfiguration.traffic));

                    //Distancia corta
                    var ShortDistance = Ext.isEmpty(objData.planningConfiguration.shortestDistance)? true : objData.planningConfiguration.shortestDistance;
                    Ext.getCmp(controller + 'ShortDistance' + (ShortDistance? 'Yes' : 'No') ).setValue(true);

                    //Balanceo de recursos
                    var ResourceBalance = Ext.isEmpty(objData.planningConfiguration.balance)? true : objData.planningConfiguration.balance;
                    Ext.getCmp(controller + 'ResourceBalancer' + (ResourceBalance? 'Yes' : 'No') ).setValue(true);
                }

                //Carga de los estados
                 if(!Ext.isEmpty(objData.statusConfigurations)){
                     
                     //console.log('this.queueStatusConfigure:', objController.queueStatusConfigure);
                     var storeStatus = Ext.StoreMgr.lookup(controller + '.ListConfigureStatusProperties');

                     //Se cambian los reasons según store
                     for (var key in objData.statusConfigurations) {
                         if (objData.statusConfigurations.hasOwnProperty(key)) {
                             //var reasons = [];
                             var status = objData.statusConfigurations[key];
                             storeStatus.removeAll();

                             for (var index = 0; index < status.reasons.length; index++) {
                                 var element = status.reasons[index];
                                 
                                 storeStatus.add(element);
                             }

                             status.reasons = storeStatus.data.items.slice(0);
                         }
                     }

                     objController.queueStatusConfigure = objData.statusConfigurations.slice(0);
                     //console.log('objController.queueStatusConfigure:', objController.queueStatusConfigure);
                 }

                //Cargamos los Puntos de Ini/Fin
                for (var key in objData.startEndLocations) {
                    if (objData.startEndLocations.hasOwnProperty(key)) {
                        var startEndLocation = objData.startEndLocations[key];
                        
                        //Inicio
                        arrAllData.push({
                            _id: startEndLocation._id + '-start',
                            id_resourceDefinition: startEndLocation.id_resourceDefinition,
                            type: 'start',
                            name: startEndLocation.start.name,
                            location: startEndLocation.start.location,
                            address: startEndLocation.start.address,
                        });

                        //Fin
                        arrAllData.push({
                            _id: startEndLocation._id + '-end',
                            id_resourceDefinition: startEndLocation.id_resourceDefinition,
                            type: 'end',
                            name: startEndLocation.end.name,
                            location: startEndLocation.end.location,
                            address: startEndLocation.end.address,
                        });
                    }
                }

                console.log('arrAllData: ', arrAllData);
                storePtoIniFin.loadData(arrAllData);

                //Validación de recursos seleccionados
                //var resources = Ext.getCmp(controller + 'ResourceType').getValue();
                //console.log('---resources: ', resources);
            },
            failure : function(response) {
                Ext.MessageBox.show({
					title   : 'Error',
					msg     : 'No se pudo validar la dirección',
					buttons : Ext.MessageBox.OK,
					icon    : Ext.MessageBox.ERROR
				});
            }
        });

       /* Ext.getCmp(controller + 'ShortDistanceNo').setValue(true);
        Ext.getCmp(controller + 'ResourceBalancerNo').setValue(true);
        Ext.getCmp(controller + 'WithHeadersYes').setValue(true);
        Ext.getCmp(controller + 'MinimumResourceNo').setValue(true);*/
        this.bDeleteResourcesExcluded = true;
    },
    //Acción que se ejecuta antes de cerrar la ventana de configuración
    onCloseConfigureSchedule: function () 
    {
        console.log('Cerrando la venta de edición de configuracion');

        //Reseteamos la configuración por defecto
        if (this.bDeleteConfigure) {
            this.objFormatLoad = {
                delimiter: ",",
                enclosure: "\"",
                encoding: "UTF-8",
                formatHour: "hh:mm:ss",
                formatDate: "YYYY-MM-DD"
            };
            this.objPlanning = {
                minVehicule: 2,
                minVisitsPerVehicle: 10,
                traffic: "normal",
                shortestDistance: false,
                balance: false
            };
            this.queueStatusConfigure = [
                {
                    id: 'PENDIENTE',
                    status: 'PENDIENTE',
                    reasons: []
                },
                {
                    id: 'CHECKIN',
                    status: 'CHECKIN',
                    reasons: []
                },
                {
                    id: 'CHECKOUT CON FORMULARIO',
                    status: 'CHECKOUT CON FORMULARIO',
                    reasons: []
                },
                {
                    id: 'CHECKOUT SIN FORMULARIO',
                    status: 'CHECKOUT SIN FORMULARIO',
                    reasons: []
                },
                {
                    id: 'CHECKOUT PENDIENTE',
                    status: 'CHECKOUT PENDIENTE',
                    reasons: []
                },
            ];
            //Reseteamos el combo de estado
            Ext.getCmp('SchedulingConfigureStatus').reset();
        }
    },
    //Guarda la configuración
    onConfigureSave: function(thisButton, e, eOpts)
    {
        console.log('Guardando la configurciones.');

        ////Configuración del archivo de carga
        var formFormatLoad = Ext.getCmp(controller + 'ConfigureFormFormatLoad').getForm();
        var formFormatLoadData = formFormatLoad.getValues();

        //Formato Separador
        var selectFormatSeparator = Ext.getCmp(controller + 'ConfigureFormFormatLoadSeparator');
        var recordFormatSeparator = selectFormatSeparator.findRecord((selectFormatSeparator.displayField || selectFormatSeparator.valueField), selectFormatSeparator.getValue());
        formFormatLoadData.delimiter = recordFormatSeparator.data._id;

        //Formato calificador de texto
        var selectFormatEnclosure = Ext.getCmp(controller + 'ConfigureFormFormatLoadDelimiter');
        var recordFormatEnclosure = selectFormatEnclosure.findRecord((selectFormatEnclosure.displayField || selectFormatEnclosure.valueField), selectFormatEnclosure.getValue());
        formFormatLoadData.enclosure = recordFormatEnclosure.data._id;

        //Formato Condificación
        var selectFormatEncoding = Ext.getCmp(controller + 'ConfigureFormFormatLoadEncoding');
        var recordFormatEncoding = selectFormatEncoding.findRecord((selectFormatEncoding.displayField || selectFormatEncoding.valueField), selectFormatEncoding.getValue());
        formFormatLoadData.encoding = recordFormatEncoding.data._id;
        
        //Formato Hora
        var selectFormatHour = Ext.getCmp(controller + 'ConfigureFormFormatLoadHourFormat');
        var recordFormatHour = selectFormatHour.findRecord((selectFormatHour.displayField || selectFormatHour.valueField ), selectFormatHour.getValue());
        formFormatLoadData.formatHour = recordFormatHour.data._id;

        //Formato Fecha
        var selectFormatDate = Ext.getCmp(controller + 'ConfigureFormFormatLoadDateFormat');
        var recordFormatDate = selectFormatDate.findRecord((selectFormatDate.displayField || selectFormatDate.valueField), selectFormatDate.getValue());
        formFormatLoadData.formatDate = recordFormatDate.data._id;


        ////Configuración de la planeación
        var formPlanning = Ext.getCmp(controller + 'ConfigureFormPlanning').getForm();
        var formPlanningData = formPlanning.getValues();
        
        ////Configurar los estados
        //El ult estado seleccionado
        var ultStatusSelect = Ext.getCmp('SchedulingConfigureStatus').getValue();
        var statusConfigurations = [];

        for (var key in this.queueStatusConfigure) {
            var objStatus = this.queueStatusConfigure[key];

            if(!Ext.isEmpty(ultStatusSelect) && ultStatusSelect == objStatus.status){
                var store = Ext.StoreMgr.lookup(controller + '.ListConfigureStatusProperties');
                objStatus.reasons = store.data.items.slice(0);
            }

            var arrReasons = [];

            if(!Ext.isEmpty(objStatus.reasons)){
                
                for (var keyQueue in objStatus.reasons) {
                    //console.log('keyQueue: ', typeof keyQueue);
                    if(objStatus.reasons.hasOwnProperty(keyQueue)){
                        var objItem = objStatus.reasons[keyQueue];
                        //console.log('objItem: ', objItem);
                        objItem.data.value = objItem.data.label;
                        arrReasons.push(objItem.data);
                    }
                }
            }

            objStatus.reasons = arrReasons;
            
            if(!Ext.isEmpty(objStatus.created_at)){
                //objStatus['status'] = objStatus.id;
                statusConfigurations.push(objStatus);
            }else{
                if(!Ext.isEmpty(objStatus.status)){
                    statusConfigurations.push({
                        status: objStatus.status,
                        reasons: arrReasons
                    });
                }
            }
        }

        //Configiración de  los Ptos Ini/Fin
        var storePtoIniFin = Ext.getCmp('IniEndPointGrid').getStore();
        var allRecords = storePtoIniFin.data.items;
        var startEndLocations = [];
        
        //Verificamos que todos los tipos de recursos deben tener un ini/fin
        var comboIniEndPointFormResource = Ext.getCmp('IniEndPointFormResource');
        var storeIniEndPointFormResource = Ext.getCmp('IniEndPointFormResource').getStore();

        //console.log('PC: ', storeIniEndPointFormResource.getTotalCount(), allRecords.length);
        /*if((storeIniEndPointFormResource.getTotalCount()*2) != allRecords.length){
            Ext.MessageBox.show({
                title   : 'Error de validación',
                msg     : 'Recuerde que cada recurso debe tener su inicio y fin.',
                buttons : Ext.MessageBox.OK,
                icon    : Ext.MessageBox.ERROR
            });
            return;
        }*/

        for (var index = 0; index < allRecords.length; index++) {
            var record = allRecords[index].data;
            
            //Se crea si no se ha creado se crea
            if(Ext.isEmpty(startEndLocations[record.id_resourceDefinition])){
                startEndLocations[record.id_resourceDefinition] = {
                    id_resourceDefinition: record.id_resourceDefinition,
                };

                //Verificamos si es un id nuevo para no agregar el _id
                if(!record._id.includes('new')){
                    startEndLocations[record.id_resourceDefinition]['_id'] = record._id.split('-')[0];
                }
            }

            var recordLocation = JSON.parse(JSON.stringify(record));
            
            delete recordLocation._id;
            delete recordLocation.id_resourceDefinition;
            delete recordLocation.type;

            startEndLocations[record.id_resourceDefinition][record.type] = recordLocation;
        }

        //Le quitamos los ids de recursos
        var arrStartEndLocations = [];

        for (var key in startEndLocations) {
            if (startEndLocations.hasOwnProperty(key)) {
                arrStartEndLocations.push(startEndLocations[key]);
            }
        }
        console.log('startEndLocations: ', arrStartEndLocations);
        console.log('statusConfigurations: ', statusConfigurations );
        console.log('formFormatLoadData: ', formFormatLoadData);
        console.log('formPlanningData: ', formPlanningData);

        //Colocamos los datos configurados para la carga
        /*this.objFormatLoad = formFormatLoadData;
        this.objPlanning = formPlanningData;
        this.queueStatusConfigure = statusConfigurations;*/

        var strURLCompanies = moduleConfig.services.urlCompanies + '/' + storageIdCompany;
        
        Ext.Ajax.request({
            url      : strURLCompanies,
            method   : 'PUT',
            type     : 'rest',
            dataType : 'json',
            params   : Ext.JSON.encode({
                file: formFormatLoadData,
                planningConfiguration: formPlanningData,
                statusConfigurations: statusConfigurations,
                startEndLocations: arrStartEndLocations,
                synchronize: ['file', 'planningConfiguration', 'statusConfigurations', 'startEndLocations'],
            }),
            headers  : {
                'Content-Type': 'application/json'
            },
            success  : function(response){
                var objResp = Ext.JSON.decode(response.responseText);
                Ext.getCmp('SchedulingConfigureWindow').hide();
                console.log('response:', objResp);
                Ext.MessageBox.show({
					title   : 'El servidor responde',
					msg     : 'Msg:' + objResp.msg,
					buttons : Ext.MessageBox.OK,
					icon    : Ext.MessageBox.INFO
				});
            },
            failure : function(response) {
                Ext.MessageBox.show({
					title   : 'Error',
					msg     : 'No se pudo actualizar la configuración por defecto',
					buttons : Ext.MessageBox.OK,
					icon    : Ext.MessageBox.ERROR
				});
            }
        });

        //Cerramos la ventana
        this.bDeleteResourcesExcluded = false;
        //Ext.getCmp('SchedulingConfigureWindow').hide();
    },
    //Busca un recurso según login en la venta de incluir/excluir recursos
    multiSearch: function () 
    {
        var store = Ext.data.StoreManager.lookup(controller + '.ListResource');

        var resourceType = Ext.getCmp(controller + 'ResourceType').getValue();
        var resourceGroup = Ext.getCmp(controller + 'ResourceGroup').getValue();
        var searchKeyword = Ext.getCmp(controller + 'ResourcesToScheduleFilterSearch').getValue();

        var jsonSearch = new Object();
        var jsonResourceTypeOr = new Object();
        var jsonResourceGroupOr = new Object();
        var and = [];

        //Búsquedas AND...
        if (!Ext.isEmpty(searchKeyword)) {
            var fieldSearchKeyword = 'login';

            and.push(
                {
                    field: fieldSearchKeyword,
                    comparison: 'lk',
                    value: searchKeyword
                }
            );
        }

        //Filtramos los Grupos
        if (!Ext.isEmpty(resourceGroup)) {
            jsonResourceGroupOr.or = [];

            jsonResourceGroupOr.or.push(
                {
                    field: 'resourceGroups',
                    comparison: 'in',
                    value: resourceGroup
                }
            );

            and.push(jsonResourceGroupOr);
        }

        //Filtramos los Tipos de Recursos
        if (!Ext.isEmpty(resourceType)) {
            jsonResourceTypeOr.or = [];
            for (var i = 0; i < resourceType.length; i++) {
                jsonResourceTypeOr.or.push(
                    {
                        field: 'id_resourceDefinition',
                        comparison: 'eq',
                        value: resourceType[i]
                    }
                );
            }
            /*jsonResourceGroupOr.or.push(
                {
                    field: 'id_resourceDefinition',
                    comparison: 'in',
                    value: resourceGroup
                }
            );*/
            and.push(jsonResourceTypeOr);
        }

        jsonSearch.and = and;

        store.proxy.extraParams = {
            filters: Ext.JSON.encode(jsonSearch)
        };

        store.loadPage(1);
    },
    //Agrega los store para manejar el ver de los exluidos/incluidos
    managerExcludedFilter: function (intCase) 
    {
        console.log('Administra los filtros de exluidos/incluidos: ', intCase);

        var store = Ext.data.StoreManager.lookup(controller + '.ListResource');
        var limit = -1;
        var strURLResourceInstance = store.proxy.url;
        var filters = store.proxy.extraParams.filters;
        var view = ['_id'];

        Ext.Ajax.request({
            url: strURLResourceInstance,
            type: 'rest',
            method: 'GET',
            scope: this,
            params: {
                filters: filters,
                limit: limit,
                view: Ext.JSON.encode(view)
            },
            success: function (response) {
                var respAll = Ext.JSON.decode(response.responseText);

                if (respAll.error) {
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: 'No se pudo recuperar los elementos. Msg: ' + respAll.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                } else {
                    var arrAlldata = respAll.data;

                    Ext.Msg.confirm(
                        'Aviso',
                        '¿Deseas ' + ((intCase == -1) ? 'excluir' : 'incluir') + ' los ' + respAll.pagination.total + ' Recursos?',
                        function (e) {
                            if (e == 'yes') {
                                //if (intCase == -1)
                                //    objController.arrResourcesExcluded = [];


                                for (var key in arrAlldata) {
                                    var element = arrAlldata[key];
                                    var posResource = objController.arrResourcesExcluded.indexOf(element._id);

                                    if (intCase == 1 && posResource != -1) {
                                        delete objController.arrResourcesExcluded[posResource];
                                    } else {
                                        if (intCase == -1 && posResource == -1 && !Ext.isEmpty(element._id)) {
                                            objController.arrResourcesExcluded.push(element._id);
                                        }
                                    }
                                }
                                //Recargamos los datos
                                store.reload();
                                console.log('Excluidos: ', objController.arrResourcesExcluded);
                            }
                        }
                    );
                }
            },
            failure: function (response) {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'No se pudo recuperar los elementos',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        });
    },
    //Editar filtro del store para manejar el ver de los exluidos/incluidos
    managerExcluded: function (intCase) 
    {
        console.log('Administra los exluidos/incluidos: ', intCase);

        var store = Ext.data.StoreManager.lookup(controller + '.ListResource');
        var jsonfilters = {};
        var jsonExclude = {};
        var bHasExluded = false;

        if (/*!Ext.isEmpty(this.arrResourcesExcluded) &&*/ (intCase == 1 || intCase == -1)) {
            jsonExclude = {
                field: '_id',
                comparison: (intCase == -1) ? 'in' : 'notin',
                value: this.arrResourcesExcluded
            };
        }

        if (!Ext.isEmpty(store.proxy.extraParams.filters))
            jsonfilters = Ext.JSON.decode(store.proxy.extraParams.filters);

        if (jsonfilters.hasOwnProperty('and') && !Ext.isEmpty(jsonfilters.and)) {
            console.log(jsonfilters);
            for (var key in jsonfilters.and) {
                var element = jsonfilters.and[key];
                console.log('element: ', element);
                if (element.field == '_id') {
                    if (Ext.isEmpty(jsonExclude)) {
                        delete jsonfilters.and[key];
                    } else {
                        jsonfilters.and[key] = jsonExclude;
                    }
                    bHasExluded = true;
                    break;
                }
            }
        }

        if (!bHasExluded) {
            jsonfilters.and.push(jsonExclude);
        }

        store.proxy.extraParams = {
            filters: Ext.JSON.encode(jsonfilters)
        };

        store.reload();
    },
    //Abre una ventana para incluir/excluir los recursos
    onEditResourcesToSchedule: function () 
    {
        var m = moduleConfig;

        winForm = this.newWindowGrid(
            m.groupIdResourcesToSchedule,
            m.titleWindowResourcesToSchedule,
            m.widthWindowResourcesToSchedule,
            m.heightWindowResourcesToSchedule,
            m.resizableWindowResourceEvents,
            m.toolbarResourcesToSchedule,
            m.storeResourcesToSchedule,
            m.columnsResourcesToSchedule,
            m.menuItemResourcesToSchedule,
            m.bottomButtonsResourcesToSchedule
        );

        var store = Ext.data.StoreManager.lookup(m.storeResourcesToSchedule);

        var resourceType = Ext.getCmp(controller + 'ResourceType').getValue();
        var resourceGroup = Ext.getCmp(controller + 'ResourceGroup').getValue();

        var jsonSearch = new Object();
        var jsonResourceTypeOr = new Object();
        var jsonResourceGroupOr = new Object();
        var and = [];

        //Grupos de recursos
        if(!Ext.isEmpty(resourceGroup))
        {
            jsonResourceGroupOr.or = [];
            jsonResourceGroupOr.or.push(
                {
                    field: 'resourceGroups',
                    comparison: 'in',
                    value: resourceGroup
                }
            );
            and.push(jsonResourceGroupOr);
        }

        //Tipos de Recursos
        if(!Ext.isEmpty(resourceType))
        {
            jsonResourceTypeOr.or = [];
            jsonResourceTypeOr.or.push(
                {
                    field: 'id_resourceDefinition',
                    comparison: 'in',
                    value: resourceType
                }
            );
            and.push(jsonResourceTypeOr);
        }

        jsonSearch.and = and;

        store.proxy.extraParams = {
            filters: Ext.JSON.encode(jsonSearch)
        };

        store.loadPage(1);

        winForm.show();

        this.bDeleteResourcesExcluded = true;
    },
    //Acción que se ejecuta antes de cerrar la ventana de Excluir/Incluir Recursos
    onCloseEditResourcesToSchedule: function () 
    {
        console.log('Cerrando los la venta de edición de recursos');

        //Reseteamos los excluyentes
        if (this.bDeleteResourcesExcluded) {
            this.arrResourcesExcluded = [];
        }
    },
    //Filtrar recursos a programar por Tipo y filtra el combo de Grupos de Recuros (combo multiselect)
    onResourceTypesSelect: function () 
    {
        var resourceType = Ext.getCmp(controller + 'ResourceType').getValue();
        var store = Ext.data.StoreManager.lookup("Scheduling.ComboResourcesGroup");

        var jsonSearch = new Object();
        var jsonResourceTypeOr = new Object();
        var and = [];

        and.push({
            field: 'id_company',
            comparison: 'eq',
            value: window.localStorage.getItem('id_company')
        });

        if (!Ext.isEmpty(resourceType)) {
            and.push({
                field: 'id_resourceDefinition',
                comparison: 'in',
                value: resourceType
            });   
        }

        if (and.length > 0) {
            jsonSearch.and = and;
        }

        store.proxy.extraParams = {
            filters: Ext.JSON.encode(jsonSearch)
        };

        store.loadPage(1);

        //Reseteamos los grupos
        Ext.getCmp(controller + 'ResourceGroup').reset();
        //Reseteamos los excluidos
        objController.arrResourcesExcluded = [];
        //Mostramos la cantidad de recursos
        objController.addLengthResources(null, resourceType, null);
    },
    //Filtramos por grupo seleccionado
    onResourceGroupsSelect: function()
    {
        var resourceType = Ext.getCmp(controller + 'ResourceType').getValue();
        var resourceGroup = Ext.getCmp(controller + 'ResourceGroup').getValue();
        
        //Mostramos la cantidad de recursos
        objController.addLengthResources(null, resourceType, resourceGroup);
    },
    //Procesa la carga del archivo
    onLoadFile: function (thisButton, e, eOpts) 
    {
        console.log('Cargando el archivo a procesar');

        var formPanel = Ext.getCmp(AppGlobals.formId + 0);
        var form = null;
        var urlService = moduleConfig.services.schedulingProcesses + '/upload';
        var objController = this;

        if ((form = formPanel.getForm()).isValid()) {

            var formData = form.getValues();

            //En caso que no envien el grupo de recursos, lo debemos enviar vacío
            if(Ext.isEmpty(formData.resourceGroups)){
                formData.resourceGroups = [];
            }

            //Datos del archivo
            //formData.file = this.objFormatLoad;

            //Compañía
            formData.id_company = localStorage.getItem('id_company');

            //Configuración de la planeación
            //formData.planningConfiguration = this.objPlanning;

            //Recursos excluidos
            formData.resourceInstances = this.arrResourcesExcluded;
            //Limpiamos los nulos
            //formData.resourceInstances.clean(null);

            //Configuración de los estados
            //formData.statusConfigurations = this.queueStatusConfigure;

            console.log('Datos form: ', formData);

            //Enciendo el led de carga
            objController.manageLed('SchedulingLedLoadFile', 'WAITING', 'Cargando el archivo');

            form.submit({
                url: urlService + '?token=' + objController.token(),
                method: 'POST',
                //waitMsg: 'Uploading file...',
                params: {
                    data: Ext.JSON.encode(formData)
                },
                success: function (respForm, respAction) {
                    var responseServer = Ext.JSON.decode(respAction.response.responseText);

                    if (!responseServer.error) {
                        var responseData = responseServer.data;
                        objController.idReference = responseData.reference;
                        var urlServiceQuery = moduleConfig.services.schedulingProcesses + '/' + objController.idReference;

                        var objPGB = Ext.create('Ext.ProgressBar', {
                            id: 'idProgressBarLoadFile',
                            text: 'Iniciando el procesamiento...',
                            width: 300,
                            margin: '5 5 5 5'
                        });
                        winProgressBar = Ext.create('Ext.window.Window', {
                            title: 'Procesando el archivo',
                            height: 70,
                            margin: '5 5 5 5',
                            layout: 'fit',
                            closable: false,
                            resizable: false,
                            draggable: false,
                            modal: true,
                            items: [objPGB]
                        });
                        //winProgressBar.show();
                        //console.log('Valor de espera:', objStatusPGBar.intTimeSeg*1000);
                        objStatusPGBar.intFunctionSetInterval = setInterval(
                            function(){
                                //Solicitudes
                                objController.requestAJAXLoadFile(true, null, urlServiceQuery);
                            }, 
                            objStatusPGBar.intTimeSeg*1000
                        );

                        objController.manageLed('SchedulingLedLoadFile', 'SUCCESS', 'Archivo cargado');

                        objController.manageLed('SchedulingLedProcessFile', 'WAITING', 'Procesando el archivo');
                        
                    } else {
                        /*Ext.MessageBox.show({
                            title: 'Error',
                            msg: 'Atenci\xf3n: ' + responseServer.msg + '<br/><br/>',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING
                        });*/
                        objController.manageLed('SchedulingLedLoadFile', 'ERROR', 'Error:' + responseServer.msg);
                    }
                },
                failure: function (respForm, respAction) {
                    console.log('respForm: ', respForm, ' respAction:', respAction);

                    var responseServer = Ext.JSON.decode(respAction.response.responseText);

                    //Ext.Msg.alert('Error', 'Atenci\xf3n: ' + responseServer.msg + '<br/><br/>');
                    
                    objController.manageLed('SchedulingLedLoadFile', 'ERROR', 'Error:' + responseServer.msg);

                },
            });
        }
    },
    //Solicitud Ajax Estado de la carga del archivo
    requestAJAXLoadFile: function(bPrint, objStore, strURL, functionSuccess, functionFailure)
    {
        var strMethod = 'GET';

        //Armamos el JSON
        var objOptionsAJAX = {
            url      : strURL,
            type     : 'rest',
            method   : strMethod,
            scope    : this
        };

        objOptionsAJAX.success = (!Ext.isEmpty(functionSuccess))?
            functionSuccess :
            function (objResponse){
                var respData = Ext.JSON.decode(objResponse.responseText);
                var actualStep = respData.actualStep;
                console.log('VisitStep actualStep:', actualStep);
                switch (actualStep.status) {
                    case 'STOPPED':
                    case 'PAUSED':
                    case 'ERROR':
                        winProgressBar.destroy();
                        clearInterval(objStatusPGBar.intFunctionSetInterval);
                        //alert('Error - ' + actualStep.msgStatus);
                        /*Ext.MessageBox.show({
                            title: 'Error',
                            msg: 'Atenci\xf3n: ' + actualStep.msgStatus+ '<br/><br/>',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING
                        });*/
                        objController.manageLed('SchedulingLedProcessFile', 'ERROR', 'ERROr:' + actualStep.msgStatus);
                        
                        break;
                    case 'WAITING':
                    case 'STARTED':
                        strElementsText = 'Estado: ' + actualStep.status + ' Procesados linea(s) ' + actualStep.totalProcessed + '/' + actualStep.totalLines;
                        //Ext.getCmp('idProgressBarLoadFile').updateProgress(actualStep.totalProcessed/actualStep.totalLines, strElementsText);

                        //Actualizar la fecha
                        var objDate = new Date();
                        Ext.getCmp('SchedulingUltDate1').setText(Ext.Date.format(objDate, 'Y-m-d H:i:s'));
                        Ext.getCmp('SchedulingUltDate2').setText(Ext.Date.format(objDate, 'Y-m-d H:i:s'));

                        break;
                    case 'SUCCESS':
                        //Cancelamos el iterador
                        clearInterval(objStatusPGBar.intFunctionSetInterval);
                        
                        //Cambiamos el estado
                        objController.manageLed('SchedulingLedProcessFile', 'SUCCESS', 'Archivo procesado.');
                        
                        //Reseteamos los valores por default
                        objController.arrResourcesExcluded = [];
                        objController.objFormatLoad = {
                            delimiter: ",",
                            enclosure: "\"",
                            encoding: "UTF-8",
                            formatHour: "hh:mm:ss",
                            formatDate: "YYYY-MM-DD"
                        };
                        objController.objPlanning = {
                            minVehicule: 2,
                            minVisitsPerVehicle: 10,
                            traffic: "normal",
                            shortestDistance: false,
                            balance: false
                        };
                        Ext.getCmp(AppGlobals.formId + 0).getForm().reset();

                        //Cargamos el Grid
                        var grid = Ext.getCmp(AppGlobals.listId + '0');
                        var store = grid.getStore();
                        var filters = {
                            'and':[
                                {
                                    field: 'id_process',
                                    comparison: 'eq',
                                    value: respData._id
                                }
                            ]
                        };

                        store.proxy.extraParams = {
                            filters: Ext.JSON.encode(filters)
                        };

                        store.loadPage(1);
                        //console.log('Store: ', grid.getStore());
                        
                        //Bloqueamos la parte de arriba
                        Ext.getCmp(AppGlobals.formId + '0').getEl().mask();

                        //Actualizamos la cantidad de recursos en el toolbar del grid
                        objController.addLengthResources(respData.resourceInstances, respData.resourceDefinitions, respData.resourceGroups);
                        break; 
                }
                //console.log('respData:', respData);

                //Archivo de errores
                this.strLoadFileError = actualStep.filePathError + '/' + actualStep.fileNameError;
            };

        objOptionsAJAX.failure = (!Ext.isEmpty(functionFailure))?
            functionFailure :
            function (objResponse){
                //Ojo parar el setInteerval
                clearInterval(objStatusPGBar.intFunctionSetInterval);
            };

        //Imprimimos la llamada para debug
        if(bPrint){
            console.log('URL: ' + strURL);
            console.log('Metodo: ' + strMethod);
        }

        //Hacemos la llamada
        Ext.Ajax.request(objOptionsAJAX);
    },
    //Descarga el archivo de errores
    onDownloadErrorFile: function()
    {
        console.log('Descargando el archivo de errores.');

        var form = Ext.create('Ext.form.Panel', {
            standardSubmit: true,
            url: this.strLoadFileError,
            method: 'GET'
        });

        form.submit({
            target: '_blank', // Avoids leaving the page. 
            //params: params
        });

        Ext.defer(function(){
            form.close();
        }, 100);
    },
    //Incluye o excluye los recursos uno a la vez
    onGridResourceCheck: function (objRadio) 
    {
        //console.log('Incluyendo o Excluyendo un recurso');
        //console.log('Radio Name: ', objRadio.name, 'Radio Value: ', objRadio.value);

        var intPos = this.arrResourcesExcluded.indexOf(objRadio.name);

        switch (objRadio.value) {
            case 'exclude':
                //Agrego a expluido si no está
                if (intPos == -1)
                    this.arrResourcesExcluded.push(objRadio.name);
                break;
            case 'include':
                if (intPos != -1)
                    delete this.arrResourcesExcluded[intPos];
                break;
        }

        //console.log('Arreglo de excluidos: ', this.arrResourcesExcluded);
        //Ojo se puede hacer reload del grid
        //var store = Ext.data.StoreManager.lookup(controller + '.ListResource');
    },

    //// Segunda vista
   
    //Vuelve a cargar la vista principal de carga
    onReload: function () 
    {
        Ext.Msg.confirm(
            'Aviso',
            '¿Deseas volver a cargar una nueva programación?</br>*Recuerde que perderá los datos actuales cargados.',
            function (e) {
                if (e == 'yes'){
                    var viewport = Ext.ComponentQuery.query('viewport')[0];
                    var programmingModule = viewport.down(AppGlobals.FormGridGridAlias).getLayout().setActiveItem(0);

                    //Reseteamos los valores para la primera vista
                    Ext.getCmp('SchedulingSecondStepSearchTask').reset();

                    //Eliminamos el proceso y reseteamos el proceso
                    objController.onAJAXDeleteProcessAndReset();
                }
            }
        );
    },
    //Crea las columnas del grid de la planeación
    createColumns: function () 
    {
        console.log('Creando las columnas de las horas dinámicamente.');
        var columns = moduleConfig.subgrid[1].columns;

      for (var i = moduleConfig.subgrid[1].hoursColumnStart; i < moduleConfig.subgrid[1].hoursColumnEnd; i++) 
      {    
          columns.push({
              xtype     : 'templatecolumn',
              dataIndex : 'tasks',
              text      : ((i<10)? '0' : '') + i + ':00',
              hour      : i,
              autoSizeColumn: true,
              tpl       :  new Ext.XTemplate([
                '<tpl for="tasks">',
                    "<tpl if='this.isOnHour(arrival_time,"+i+")'>",
                        '<a id={[this.getLinkId(values)]} href="" class="tooltip-tasks"><img class="gridtaskIcon" src={[this.getIcon(values)]} />',
                            '<span class="topNumberTask" style="{[this.getBorderColorStyle(values)]}">{#}</span>',
                            '<span class="tooltiptext-tasks">',
                                '{name}<br/>',
                                '{address}<br/>',
                                scheduling.marker.loadAmount +':{loadAmount} ',
                                scheduling.marker.duration+':{duration}',
                            '</span>',
                        '</a> ',
                    '</tpl>',
                '</tpl>'].join(''),
              {
                //Verificamos para aumentar el tamaño de la columna
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
                addOnClickForTask: function(id, values) 
                {   
                    //console.log('Hice Click - Arguments', arguments);
                    
                    var objElement = Ext.get(id);
                    
                    //Click Izquierdo
                    objElement.on('click', this.centerMapToTask);
                    //Click Derecho
                    objElement.on('contextmenu', this.onDisplayContextualMenu, values);
                },
                //
                centerMapToTask : function(eventObj, htmlElementObj)
                {
                    console.info('Centrando el mapa según tarea.');
                    
                    eventObj.stopEvent();
                    
                    var map = Ext.getCmp(AppGlobals.mapId+1);
                    var valueStr = this.id.split("||");
                    var proj = new OpenLayers.Projection("EPSG:4326");
                    var point = new OpenLayers.LonLat(valueStr[3], valueStr[2]);

                    point.transform(proj, map.map.getProjectionObject());
                    map.map.setCenter(point, 16);
                },
                //Despliega un menú contextual para la tarea seleccionada
                onDisplayContextualMenu: function(objEvent, objHtmlElement)
                {
                    objEvent.stopEvent();
                    
                    //console.log('Click Derecho. Argumentos: ', arguments, ' Valores pasados por Scope: ', this);

                    var allDataTask = this;
                    
                    var contextMenu = new Ext.menu.Menu({
                        fixed: true,
                        x: objHtmlElement.x + 30,
                        y: objHtmlElement.y,
                        items: [
                            {
                                text: 'Ver informaci&oacute;n',
                                iconCls: 'edit',
                                handler: function()
                                {
                                    //Con el Grid usamos el Id para obtener el login
                                    var grid = Ext.getCmp(AppGlobals.listId+1);
                                    var record = grid.getStore().findRecord('resourceId', allDataTask.id_resourceInstance);
                                    
                                    //Busco el layer
                                    var map = Ext.getCmp(AppGlobals.mapId + 1);
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
                            },
                        ]
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
                    var grid = Ext.getCmp(AppGlobals.listId+1);
                    var record = grid.getStore().findRecord('resourceId', values.id_resourceInstance);
                    
                    if(!Ext.isEmpty(record) && !Ext.isEmpty(record.data.color))
                    {
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
                }
              }
            )
          });
      }
    },
    //Carga el store de resource tasks
    onResourceTasksStoreLoad: function(store, records, successful, eOpts )
    {
        console.log('Cargando el store ListResourceTasks');

        if(successful)
        {
            var grid = Ext.getCmp(AppGlobals.listId + '1');
            var selModel = grid.getSelectionModel();
            
            if(selModel.hasSelection())
            {
                console.info('Mapa recargado en el evento load');
            
                var records = selModel.getSelection();
                for (var i = 0; i < records.length; i++) 
                {
                    this.onResourceTasksDeSelect(grid, records[i], records[i].index);
                    this.onResourceTasksSelect(grid, records[i], records[i].index);
                }
            }

            //// Se reconfigura el tamaño de cada columna
            //Horas máximas de inicio y fin
            /*var hoursColumnStart = moduleConfig.subgrid[1].hoursColumnStart;
            var hoursColumnEnd = moduleConfig.subgrid[1].hoursColumnEnd;
            
            //Iterar sobre los registros
            var hourMax = [];
            for (var i = 0; i < records.length; i++) 
            {
                //Iterar sobre las tareas para contar tareas por horas
                var hourCount = [];
                for (var j = 0; j < records[i].data.tasks.length; j++) 
                {
                    for (var h = hoursColumnStart; h < hoursColumnEnd; h++) 
                    {
                        var arrivalTimeHour = parseInt(records[i].data.tasks[j].arrival_time.substring(11, 13));

                        if(arrivalTimeHour == h)
                        {
                            //Acumulo las horas
                            hourCount[h] = hourCount[h] || 0;
                            hourCount[h]++;

                            //Me quedo con las horas máximas
                            hourMax[h] = hourMax[h] || 0;
                            if(hourCount[h]>hourMax[h])
                            {
                                hourMax[h] = hourCount[h];
                            }

                            break;
                        }
                    }
                }
                hourCount.length = 0;
            }

            //Se cambia el tamaño
            var columns = grid.getView().headerCt.getGridColumns();
            var widthMin = 40;
            for (var i = 2; i < columns.length; i++)
            {
                var hour = columns[i].hour;
                var width = ((isNaN(hourMax[hour]) ? 1 :hourMax[hour]) * widthMin);
                
                columns[i].setWidth( (width == widthMin)? 60 : width);
            }*/
        }
    },
    //Deselecciona los recursos del grid task
    onResourceTasksDeSelect: function(grid, record, index, eotps)
    {
        console.info('Recurso eliminado: ', record);

        var map = Ext.getCmp(AppGlobals.mapId + 1);
        var lineLayer = map.map.getLayersByName(record.data.login);

        //Eliminamos las caracteristicas
        if(!Ext.isEmpty(lineLayer))
        {   
            lineLayer = lineLayer.pop();
            
            //Elimino todas las caracteristicas pero queda la capa activa si no la remuevo
            //lineLayer.removeAllFeatures();

            //Elimino la capa mejor
            map.map.removeLayer(lineLayer);
        }

        //Remuevo el control de esa capa
        var control = map.map.getControlsBy('name', 'popup' + record.data.login);
        if(!Ext.isEmpty(control))
        {
            control = control.pop();
            map.map.removeControl(control);
        }
    },
    //Selecciona los recursos del grid task
    onResourceTasksSelect: function(grid, record, index, eOpts)
    {
        console.info('Recurso agregado: '+ record.data.login);
        
        var map = Ext.getCmp(AppGlobals.mapId + 1);
        var color = this.getLineColor(index);
        var proj = new OpenLayers.Projection("EPSG:4326");
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
        var lineLayer = map.map.getLayersByName(record.data.login);
        var control = map.map.getControlsBy('name', 'popup' + record.data.login);

        //Buscamos la capa, la creamos o la seleccionamos
        if(Ext.isEmpty(lineLayer))
        {
            lineLayer = new OpenLayers.Layer.Vector(
                record.data.login,
                {
                    name: record.data.login,
                     styleMap: myStyle,
                }
            );

            //Agregamos al mapa
            map.map.addLayer(lineLayer);
        }
        else
        {
            lineLayer = lineLayer.pop();
        }

        //Buscamos el control, la creamos o la seleccionamos
        if(Ext.isEmpty(control))
        {
            control = new OpenLayers.Control.SelectFeature(
                lineLayer, 
                { 
                    name: 'popup' + record.data.login,
                    onSelect: objController.createPopup, 
                    onUnselect: objController.destroyPopup, 
                }
            );
            map.map.addControl(control);
        }
        else
        {
            control = control.pop();
        }

        //Activamos el control de las ventanas emergentes
        control.activate();

        //Pintamos las rutas si tiene datos
        if(!Ext.isEmpty(record.data.rawShape))
        {
            var formatDataLine = new OpenLayers.Format.EncodedPolyline({geometryType:'linestring'});
            var feature = formatDataLine.read(record.data.rawShape);
           
            feature.geometry.transform(proj, map.map.getProjectionObject());
            feature.data.color = color;
            feature.attributes.color = color;
            lineLayer.addFeatures(feature);
        }

        var features = [];
        for (var i = 0; i < record.data.tasks.length; i++) 
        {
            //console.info(record.data.tasks[i]);
            features.push( new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point( record.data.tasks[i].location.lng, record.data.tasks[i].location.lat ).transform(proj, map.map.getProjectionObject()),
                {
                    id          : record.data.tasks[i]._id,
                    code        : record.data.tasks[i].code,
                    name        : record.data.tasks[i].name,
                    loadAmount  : record.data.tasks[i].loadAmount,
                    address     : record.data.tasks[i].address,
                    duration    : record.data.tasks[i].duration,
                    resource    : record.data.resourceInstance.login,
                    type        : record.data.tasks[i].type,
                    status      : record.data.tasks[i].status,
                    lat         : record.data.tasks[i].location.lat,
                    lng         : record.data.tasks[i].location.lng,
                    markerType  : 'task'
                },
                { 
                    pointRadius: 18,
                    //fontWeight: 'bold',
                    fontColor: '#FFF',
                    fontOpacity: 0.8,
                    fontSize: '9px',
                    label: '' + ( i + 1 ),
                    labelAlign: 'lb',
                    labelOutlineWidth: 4,
                    labelOutlineColor: '#' + color,
                    labelYOffset: 15,
                    labelXOffset: 8, 
                    externalGraphic: objController.getIconTask(record.data.tasks[i].type, record.data.tasks[i].status), 
                    graphicHeight: 25, 
                    graphicWidth: 21, 
                })
            );
        }

        //Agregamos todas las caracteristicas
        lineLayer.addFeatures(features);
        
        //Mostramos todos los elementos
        this.applyZoom(map, lineLayer, true);
    },
    //Obtiene el color de la línea
    getLineColor: function(rowIndex)
    {
	     return this.arrColor[rowIndex % this.arrColor.length];
    },
    //Agregando la configuración del mapa 1
    onLoadTaskConfig: function()
    {
        console.log('Agregando la configuración del mapa 1');
        
        var map = Ext.getCmp(AppGlobals.mapId + '1');
        
        //Borramos todas las capas si las hay
        if(!Ext.isEmpty(map.routes)){
            for (var index = 0; index < map.routes.length; index++) {
                var layer = map.routes[index];
                layer.destroyFeatures();
                map.map.removeLayer(layer); 
            }
        }

        map.routes = [];
        map.routesName = [];
        map.selectFeatureControl = [];
        map.selectControl = null;

        //Agregando soporte para limpiar un arreglo con un valor específico
        /*Array.prototype.clean = function(deleteValue) 
        {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == deleteValue) {
                    this.splice(i, 1);
                    i--;
                }
            }
            return this;
        };*/
    },
    //Abre una ventana para ver las tareas no programadas
    onViewTaskNoProgramming: function(thisButton, e, eOpts) 
    {
        console.log('Abre la ventana para ver las tareas no programadas.');

        var m = moduleConfig;
        var winGrid = this.newWindowSimpleGrid(
            m.ViewTaskNoProgrammingGroupId,
            m.ViewTaskNoProgrammingTitleWindow,
            m.ViewTaskNoProgrammingWidthWindow,
            m.ViewTaskNoProgrammingHeightWindow,
            m.ViewTaskNoProgrammingResizableWindow,
            m.ViewTaskNoProgrammingStore, 
            m.ViewTaskNoProgrammingColumns, 
            m.ViewTaskNoProgrammingMenuItem, 
            []
        );

        //Actualizamos el store de las tareas no programadas
        objController.loadStoreTaskNoProgramming(true);

        //Desplegamos la ventana
        winGrid.show();
    },
    //Carga el store de las tareas no programadas
    loadStoreTaskNoProgramming: function(bReload)
    {
        console.log('Cargamos el store:' + moduleConfig.ViewTaskNoProgrammingStore);

        //Filtramos el store
        var store = Ext.data.StoreManager.lookup(moduleConfig.ViewTaskNoProgrammingStore);
        var textFilter = Ext.getCmp('SchedulingSecondStepSearchTask').getValue();
        var jsonFilters = {
              'and':[
                    {
                        field: 'id_process',
                        comparison: 'eq',
                        value: objController.idReference
                    },
                    {
                        field: 'status',
                        comparison: 'eq',
                        value: 'NOT SCHEDULED'
                    },
                ]
            };
        
        //Agrego el filtro de la caja de texto
        if(!Ext.isEmpty(textFilter)){
            jsonFilters.and.push({
                field: 'name',
                comparison: 'lk',
                value: textFilter
            });
        }

        store.proxy.extraParams = {
            filters: Ext.JSON.encode(jsonFilters)
        };

        if(!Ext.isEmpty(bReload) && bReload)
            store.loadPage(1);
    },
    //Filtra los recursos 
    onFilterTaskSecondStep: function(thisCombo, records, eOpts)
    {
        console.log('Filtra los recursos ó las tareas no programada por nombre');

        var store = Ext.data.StoreManager.lookup(controller + '.ListResourceTasks');
        var filters = Ext.JSON.decode(store.proxy.extraParams.filters);
        var comboResource = Ext.getCmp('SchedulingSecondStepSearchResource');

        //console.log('filters: ', filters);
        //console.log('newValue: ', records);
        var recordsValues = thisCombo.getValue();
        var resourcesRecordsValues  = comboResource.getValue();
        //console.log('recordsValues:', recordsValues);

        var bHasField = false;
        var intKey = -1;

        for (var key in filters.and) {
            if (filters.and.hasOwnProperty(key)) {
                var subFilter = filters.and[key];
                
                if(!Ext.isEmpty(subFilter.or)){
                    
                    bHasField = true;

                    if(Ext.isEmpty(recordsValues)){
                        intKey = key;
                    }else{
                        for (var key2 in subFilter.or) {
                            if (subFilter.or.hasOwnProperty(key2)) {
                                var subFilterOr = subFilter.or[key2];
                                subFilterOr.value = recordsValues;
                            }
                        }
                    }

                    break;
                }
            }
        }

        //Si es vacío el new value y existe en el filtro lo eliminamos del filtro
        if(intKey != -1){
            delete filters.and[intKey];
            filters.and.clean(null);
        }


        if(!Ext.isEmpty(filters.and) && !bHasField){
            filters.and.push({ 
                or:[
                    {
                        field: 'tasks._id',
                        comparison: 'in',
                        value: recordsValues
                    },
                    {
                        field: 'resourceInstance._id',
                        comparison: 'in',
                        value: resourcesRecordsValues
                    },
                ]
            });
        }

        //Abortamos las otras solicitudes, asignamos y Recargamos
        Ext.Ajax.abort(store.proxy.activeRequest);

        store.proxy.extraParams = {
            filters: Ext.JSON.encode(filters)
        };

        store.loadPage(1);
    },
    //Acepta y asigna la planificación configurada
    onAcceptAndAsignAll: function(thisButton, e, eOpts) 
    {
        console.log('Acepta y Asigna la planificación configurada');

        Ext.Msg.confirm(
            'Aviso',
            '¿Deseas Aceptar y Asignar la Planificación Configurada?',
            function (e) {
                if (e == 'yes'){

                    var urlServiceQuery = moduleConfig.services.schedulingProcesses + '/' + objController.idReference + '/accept';

                    Ext.Ajax.request({
                        url: urlServiceQuery,
                        type: 'rest',
                        method: 'POST',
                        scope: this,
                        /*params: {
                            filters: filters,
                            limit: limit,
                            view: Ext.JSON.encode(view)
                        },*/
                        success: function (response) {
                            var respAll = Ext.JSON.decode(response.responseText);
                            
                            objController.manageLed('SchedulingLedAsingRoute', 'WAITING', 'Asignando');

                            //Preguntamos por el proceso
                            objStatusPGBar.intFunctionSetInterval = setInterval(
                                function(){
                                    //Solicitudes
                                    objController.requestAJAXAsign(true, null, moduleConfig.services.schedulingProcesses + '/' + objController.idReference);
                                }, 
                                objStatusPGBar.intTimeSeg*1000
                            );

                            console.log(respAll);
                            //var programmingModule = viewport.down(AppGlobals.FormGridGridAlias).getLayout().setActiveItem(1); 

                        },
                        failure: function (response) {
                            Ext.MessageBox.show({
                                title: 'Error',
                                msg: 'No se pudo asignar la planificación configurada.',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });
                        }
                    });
                }
            }
        );
    },
     //Solicitud Ajax Status de la planificación
    requestAJAXAsign: function(bPrint, objStore, strURL, functionSuccess, functionFailure)
    {
        var strMethod = 'GET';

        //Armamos el JSON
        var objOptionsAJAX = {
            url      : strURL,
            type     : 'rest',
            method   : strMethod,
            scope    : this
        };

        objOptionsAJAX.success = (!Ext.isEmpty(functionSuccess))?
            functionSuccess :
            function (objResponse){
                var respData = Ext.JSON.decode(objResponse.responseText);
                var actualStep = respData.actualStep;
                console.log('actualStep:', actualStep);
                switch (actualStep.status) {
                    case 'STOPPED':
                    case 'PAUSED':
                    case 'ERROR':
                        clearInterval(objStatusPGBar.intFunctionSetInterval);
                        objController.manageLed('SchedulingLedAsingRoute', 'ERROR', 'ERROR:' + actualStep.msgStatus);

                        setTimeout(
                            function(){
                                    var url = decodeURIComponent(window.location.href.toString().split('?')[0]);
                                    var mod = decodeURIComponent('?m=Scheduling');
                                    window.location.replace(url+mod);
                            },
                            5000
                        );
                        
                        break;
                    case 'WAITING':
                    case 'STARTED':
                        //Actualizar la fecha

                        break;
                    case 'SUCCESS':
                        clearInterval(objStatusPGBar.intFunctionSetInterval);

                        objController.manageLed('SchedulingLedAsingRoute', 'SUCCESS', 'Asignación procesada');

                         Ext.Msg.confirm(
                            'Aviso',
                            'La asignación ha sido exitosa</br></br>¿Deseas ser redirigido a monitoreo de tareas?',
                            function (e) {
                                if (e == 'yes'){
                                    var url = decodeURIComponent(window.location.href.toString().split('?')[0]);
                                    var mod = decodeURIComponent('?m=PlanningTracking');
                                    window.location.replace(url+mod);
                                }else{
                                    var url = decodeURIComponent(window.location.href.toString().split('?')[0]);
                                    var mod = decodeURIComponent('?m=Scheduling');
                                    window.location.replace(url+mod);
                                }
                            });
                        
                        break; 
                }
                //console.log('respData:', respData);

                //Archivo de errores
                this.strLoadFileError = actualStep.filePathError + '/' + actualStep.fileNameError;
            };

        objOptionsAJAX.failure = (!Ext.isEmpty(functionFailure))?
            functionFailure :
            function (objResponse){
                //Ojo parar el setInteerval
                clearInterval(objStatusPGBar.intFunctionSetInterval);
            };

        //Imprimimos la llamada para debug
        if(bPrint){
            console.log('URL: ' + strURL);
            console.log('Metodo: ' + strMethod);
        }

        //Hacemos la llamada
        Ext.Ajax.request(objOptionsAJAX);
    },
    //Administrar LEDs
    manageLed: function(strID, strStatus, strText)
    {
        console.log('Administramos los leds');

        var strIcon = 'icon-ledblue';
        var objLabel = Ext.getCmp(strID);
        var objLabelDate1 = Ext.getCmp('SchedulingUltDate1');
        var objLabelDate2 = Ext.getCmp('SchedulingUltDate2');
        var objDate =new Date();
        var allClass = [
            'icon-ledblue',
            'icon-ledorange',
            'icon-ledred',
            'icon-ledgreen',
        ];

        //Removemos todas las clases conocidas
        for (var index = 0; index < allClass.length; index++) {
            var strClsNow = allClass[index];
            if(objLabel.hasCls(strClsNow)){
                objLabel.removeCls(strClsNow);
            }
        }

        //Elegimos las clases
        switch (strStatus) {
            case 'WAITING':
                strIcon = 'icon-ledorange';
                Ext.getCmp(AppGlobals.formId + '0').getEl().mask();
                Ext.getCmp('idSchedulingView0').getEl().mask('','loader-fieldvision');
                Ext.getCmp('idSchedulingViewButton0').getEl().mask();
                Ext.getCmp(AppGlobals.formId + '1').getEl().mask();
                Ext.getCmp(AppGlobals.mapId+1).getEl().mask();
                Ext.getCmp(AppGlobals.listId+1).getEl().mask();

                //LoadMask
                this.loadMaskAllScreen();

                //loading
                objLabelDate1.addCls('icon-loading');
                objLabelDate2.addCls('icon-loading');
                break;
            case 'ERROR':
                strIcon = 'icon-ledred';
                Ext.getCmp(AppGlobals.formId + '0').getEl().unmask();
                Ext.getCmp('idSchedulingView0').getEl().unmask();
                Ext.getCmp('idSchedulingViewButton0').getEl().unmask();
                Ext.getCmp(AppGlobals.formId + '1').getEl().unmask();
                Ext.getCmp(AppGlobals.mapId+1).getEl().unmask();
                Ext.getCmp(AppGlobals.listId+1).getEl().unmask();

                //loading
                objLabelDate1.removeCls('icon-loading');
                objLabelDate2.removeCls('icon-loading');
            break;
            case 'SUCCESS':
                strIcon = 'icon-ledgreen';
                Ext.getCmp(AppGlobals.formId + '0').getEl().unmask();
                Ext.getCmp('idSchedulingView0').getEl().unmask();
                Ext.getCmp('idSchedulingViewButton0').getEl().unmask();
                Ext.getCmp(AppGlobals.formId + '1').getEl().unmask();
                Ext.getCmp(AppGlobals.mapId+1).getEl().unmask();
                Ext.getCmp(AppGlobals.listId+1).getEl().unmask();

                //loading
                objLabelDate1.removeCls('icon-loading');
                objLabelDate2.removeCls('icon-loading');
            break;
            default:
                strIcon = 'icon-ledblue';
                Ext.getCmp(AppGlobals.formId + '0').getEl().unmask();
                Ext.getCmp('idSchedulingView0').getEl().unmask();
                Ext.getCmp('idSchedulingViewButton0').getEl().unmask();
                Ext.getCmp(AppGlobals.formId + '1').getEl().unmask();
                Ext.getCmp(AppGlobals.mapId+1).getEl().unmask();
                Ext.getCmp(AppGlobals.listId+1).getEl().unmask();

                //loading
                objLabelDate1.removeCls('icon-loading');
                objLabelDate2.removeCls('icon-loading');
                break;
        }

        //Cambio Clases
        objLabel.addCls(strIcon);
        
        //Cambio el texto
        objLabel.setText(strText);

        //Fecha 1
        objLabelDate1.setText(Ext.Date.format(objDate, 'Y-m-d H:i:s'));
        //Fecha 2
        objLabelDate2.setText(Ext.Date.format(objDate, 'Y-m-d H:i:s'));
    },
    //Los loadMasks de las dos pantallas
    loadMaskAllScreen: function()
    {
        //LoadMask Primera Pantalla
        this.maskFirstScreen.show();
        //LoadMask Segunda Pantalla
        this.maskSecondScreen.show();
        //http://stackoverflow.com/questions/2147192/how-to-use-jquery-something-to-select-a-class-in-extjs
        var allLoadMask = Ext.query('#IdSchedulingMap1 .x-mask-msg.x-mask-loading');
        //console.log('Pedro:', allLoadMask);
        for(var i = 0; i<allLoadMask.length; ++i)
        {
            allLoadMask[i].style = 'right: auto; left: 45%; top: 42%; background-color: transparent !important;';
        }
    },
    //Agrega los nuevos puntos con un ícono y elimina todos los puntos viejos
    addPoint: function(strIdMapName, strImgPath, arrObjLocation, reproject)
    {
		var mapView = Ext.getCmp(strIdMapName).map;
		var layer = mapView.getLayersByName('PaintMap')[0];

		layer.removeAllFeatures();

        //console.log('Agregano los puntos:', arrObjLocation);
		for(var i=0; i<arrObjLocation.length; i++) {
			objData = arrObjLocation[i];
            //console.log('objData: ', objData);
			mySpecial = {
				externalGraphic: strImgPath,
				backgroundYOffset: -0,
				graphicZIndex: 10,
				backgroundGraphicZIndex: 11,
				pointRadius: 17
			};
			point = new OpenLayers.Geometry.Point(objData.lng, objData.lat);
            
            if(!reproject)
			    point.transform(mapView.displayProjection, mapView.projection);

			ubicaMapa = new OpenLayers.Feature.Vector(
				point,
				null,
				mySpecial
			);

			layer.addFeatures([ubicaMapa]);

			if(arrObjLocation.length == 1){
				pointCenter = new OpenLayers.LonLat(objData.lng, objData.lat);
                if(!reproject){
                    pointCenter.transform(mapView.displayProjection, mapView.projection);
				    mapView.setCenter(pointCenter, 15);
                }
			}
		}
	},
    //Pto IniFin - Valida una dirección
    onValidAddress: function(thisbutton, eventE, eOpts)
    {
        console.log('Boton Validar la dirección');

        var textAddress = Ext.getCmp('IniEndPointFormAddress');
        var strURLAddress = moduleConfig.services.urlAddressGeocoding + '?address=' + textAddress.getValue();
        
       console.log('URL Address: ' + strURLAddress);

        Ext.Ajax.request({
            url      : strURLAddress,
            method   : 'GET',
            type     : 'rest',
            dataType : 'json',
            async: false,
            success  : function(response){
                objData =  Ext.JSON.decode(response.responseText);

                if(!objData.error){
                    bResult = objData.data[0];

                    console.log('objData.data: ', objData.data);

                    objController.addPoint('IniEndPointMap', './images/icon/markers/3.png', objData.data, false);

                }else{
                    Ext.MessageBox.show({
    					title   : 'Error',
    					msg     : 'No se pudo validar la dirección',
    					buttons : Ext.MessageBox.OK,
    					icon    : Ext.MessageBox.ERROR
    				});
                }
            },
            failure : function(response) {
                Ext.MessageBox.show({
					title   : 'Error',
					msg     : 'No se pudo validar la dirección',
					buttons : Ext.MessageBox.OK,
					icon    : Ext.MessageBox.ERROR
				});
            }
        });
    },
    //Pto IniFin - Cancela/Reset el formulario
    onIniEndPointFormCancel: function(thisbutton, eventE, eOpts)
    {
        console.log('Cancelando la edición/creación de un PtoIniFin');

        var objForm = Ext.getCmp('IniEndPointFormEditCreate').getForm();

        //Reseteamos los datos
        objForm.reset();
        //Editamos el boton
        Ext.getCmp('IniEndPointFormSave').setText('Agregar');
        //Reiniciar la posicion central del mapa
        this.addPoint('IniEndPointMap', './images/icon/markers/3.png', [{lat:4.68042, lng:-74.06097}], false);
        //Habilitamos los combo
        Ext.getCmp('IniEndPointFormTypeAddress').setDisabled(false);
        Ext.getCmp('IniEndPointFormResource').setDisabled(false);
    },
    //Pto IniFin - Guarda un item en el formulario
    onIniEndPointFormSave: function(thisbutton, eventE, eOpts)
    {
        console.log('Guarda la edición/creación de un PtoIniFin');

        var objForm = Ext.getCmp('IniEndPointFormEditCreate').getForm();
        var store = Ext.getCmp('IniEndPointGrid').getStore();

        if(objForm.isValid()){
            var allDataForm = objForm.getValues();
            /*var strURLAddress = moduleConfig.services.urlAddressGeocoding + '?address=' + allDataForm.address;
            
            console.log('Data a editar', allDataForm);
            console.log('URL Address: ' + strURLAddress);

            Ext.Ajax.request({
                url      : strURLAddress,
                method   : 'GET',
                type     : 'rest',
                dataType : 'json',
                async: false,
                success  : function(response){
                    objData =  Ext.JSON.decode(response.responseText);

                    if(!objData.error){
                        bResult = objData.data[0];

                        console.log('objData.data: ', objData.data);

                        objController.addPoint('IniEndPointMap', './images/icon/markers/3.png', objData.data, false);

                    }else{
                        Ext.MessageBox.show({
                            title   : 'Error',
                            msg     : 'No se pudo validar la dirección,</br> por lo tanto no se puede agregar/editar el punto. </br>Por favor codifique una dirección válida y verifiquela',
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                },
                failure : function(response) {
                    Ext.MessageBox.show({
                        title   : 'Error',
                        msg     : 'No se pudo validar la dirección,</br> por lo tanto no se puede agregar/editar el punto. </br>Por favor codifique una dirección válida y verifiquela',
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.ERROR
                    });
                }
            });*/

            //Obtenemos las coordenadas
            var mapView = Ext.getCmp('IniEndPointMap').map;
            var layer = mapView.getLayersByName('PaintMap')[0];
            var features = layer.features[0];
            var location = new OpenLayers.LonLat(features.geometry.x, features.geometry.y);
            
            location.transform(mapView.projection, mapView.displayProjection);
            location['lng'] = location.lon;
            delete location.lon;

            //Editar
            if(!Ext.isEmpty(allDataForm._id)){
                var objRecord = store.findRecord('_id', allDataForm._id);
                console.log('objRecord:', objRecord);
                //Actualizamos todos los datos
                objRecord.set('name', allDataForm.name);
                objRecord.set('address', allDataForm.address);
                objRecord.set('location', location);
                
            }else{
                //Agregar
                var arrRecords = [];
                var allRecords = store.data.items;

                //Obtenemos todos los registros para ese recursos
                for (var key in allRecords) {
                    if (allRecords.hasOwnProperty(key)) {
                        var record = allRecords[key];
                        
                        //Nos quedamos con todos los registros que sean del mismo recurso y tipo
                        if(record.get('id_resourceDefinition') == allDataForm.id_resourceDefinition && record.get('type') == allDataForm.type ){
                            arrRecords.push(record);
                        }
                    }
                }

                if(arrRecords.length >1 ){
                    Ext.MessageBox.show({
                        title   : 'Error',
                        msg     : 'Hay muchos puntos con para ese recurso y tipo de dirección. Recuerde que sólo puede haber uno con esa combinación.',
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox.ERROR
                    });
                }else
                    if(arrRecords.length == 1){
                        
                        Ext.Msg.confirm(
                            'Aviso',
                            'Ya existe un punto con esa combinación Recurso/Tipo. </br> ¿Desea actualizarla?',
                            function (e) {
                                if (e == 'yes') 
                                {   
                                    //Actualizamos todos los datos
                                    arrRecords[0].set('name', allDataForm.name);
                                    arrRecords[0].set('address', allDataForm.address);
                                    arrRecords[0].set('location', location);
                                }
                            }
                        );

                    }else{
                        store.add({
                            _id:  'new' + Ext.Date.format(new Date(), 'time') + '-' + allDataForm.type,
                            id_resourceDefinition: allDataForm.id_resourceDefinition,
                            type: allDataForm.type,
                            name: allDataForm.name,
                            location: location,
                            address: allDataForm.address,
                        });
                    }
            }

            //Reseteamos el formulario
            this.onIniEndPointFormCancel(null, null, null);
        }        
    },
    //Pto IniFin - Editando una columna
    onIniEndPointEditActionColumn: function(column, grid, rowIndex, colIndex, record, node)
    {
        console.log('Editando una columna de PtoIniFin');

        var objForm = Ext.getCmp('IniEndPointFormEditCreate').getForm();
        var allDataForm = record.getData();

        //Cargamos el formulario
        objForm.setValues(allDataForm);
        //Editamos el boton
        Ext.getCmp('IniEndPointFormSave').setText('Editar');
        //Centramos el mapa
        this.addPoint('IniEndPointMap', './images/icon/markers/3.png', [allDataForm.location], false);
        //Deshabilitamos los combo
        Ext.getCmp('IniEndPointFormTypeAddress').setDisabled(true);
        Ext.getCmp('IniEndPointFormResource').setDisabled(true);
    },
    //Pto IniFin - Eliminando una columna
    onIniEndPointDeleteActionColumn: function(column, grid, rowIndex, colIndex, record, node)
    {
        console.log('Eliminando una columna de PtoIniFin');

        Ext.Msg.confirm(
            'Aviso',
            '¿Deseas eliminar el punto seleccionado?',
            function (e) {
                if (e == 'yes') 
                {   
                    grid.getStore().remove(record);

                    //Limpiamos toda la data
                    objController.onIniEndPointFormCancel(null, null, null)
                }
            }
        );
    },
    //Nos movemos al paso en que dejamos el procesamiento
    loadActualStep: function()
    {
        console.log('Nos movemos al paso en que dejamos el procesamiento');

        //var idResourceInstance = window.localStorage.getItem('resourceInstance');
        var sort = [{"property": "updated_at", "direction":"DESC"}];
        var filters = {
            'and':[
                {
                    field: 'id_company',
                    comparison: 'eq',
                    value: window.localStorage.getItem('id_company')
                },
                {
                    "or":
                    [
                        {
                            "field":"actualStep.name",
                            "comparison":"dif", 
                            "value":"TaskGeneratingStep"
                        },
                        {
                            "and":[
                                {
                                    "field":"actualStep.status",
                                    "comparison":"dif", 
                                    "value":"ERROR"
                                }, 
                                {
                                    "field":"actualStep.status",
                                    "comparison":"dif", 
                                    "value":"SUCCESS"
                                }
                            ]
                        }
                    ]
                }
            ]
            
        };
        
        var statusSemaforo = [
            'SchedulingLedLoadFile', 
            'SchedulingLedProcessFile', 
            'SchedulingLedPlanning', 
            'SchedulingLedRouting', 
            'SchedulingLedAsingRoute'
        ];

        Ext.Ajax.request({
            url      : moduleConfig.services.schedulingProcesses,
            type     : 'rest',
            method   : 'GET',
            scope    : this,
            params:{
                filters: Ext.JSON.encode(filters),
                sort: Ext.JSON.encode(sort),
                limit: 1,
            },
            success: function(objResponse)
            {
                var respData = Ext.JSON.decode(objResponse.responseText);

                if(!respData.error)
                {
                    if(Ext.isEmpty(respData.data)){
                        return;
                    }

                    var objProcess = respData.data.pop();
                    console.log('objProcess:', objProcess);
                    //Agregamos la referencia
                    objController.idReference = objProcess._id;

                    var actualStep = objProcess.actualStep;
                    var intActualStep = 0;
                    var urlServiceQuery = moduleConfig.services.schedulingProcesses + '/' + objController.idReference;


                    switch (actualStep.name) {
                        case 'VisitsStep':
                            intActualStep = 1;
                        break;
                        case 'PlanningStep':
                            intActualStep = 2;
                            break;
                        case 'RoutingStep':
                            intActualStep = 3;
                            break;
                        case 'TaskGeneratingStep':
                            intActualStep = 4;
                            break;
                    }

                    var i=0;
                    for(i=0; i< intActualStep; ++i)
                    {
                        objController.manageLed(statusSemaforo[i], 'SUCCESS', 'SUCCESS');
                    }

                    //Tratamos el estado donde quedó
                    objController.manageLed(statusSemaforo[i], actualStep.status, actualStep.status);

                    //
                    console.log('actualStep:', actualStep);

                    switch (statusSemaforo[i]) {
                        case 'SchedulingLedLoadFile':
                            //Nos quedamos preguntando para archivos muy grandes
                            objStatusPGBar.intFunctionSetInterval = setInterval(
                                    function(){
                                        //Solicitudes
                                        objController.requestAJAXLoadFile(true, null, urlServiceQuery);
                                    }, 
                                    objStatusPGBar.intTimeSeg*1000
                                );
                            objController.requestAJAXLoadFile(true, null, urlServiceQuery);
                            break;
                        case 'SchedulingLedProcessFile':
                            //Deshabilitamos el formulario para la carga de los archivos
                            /*Ext.getCmp(AppGlobals.formId + '0').getEl().mask();
                            
                            //Cargamos el Grid
                            var grid = Ext.getCmp(AppGlobals.listId + '0');
                            var store = grid.getStore();
                            var filters = {
                                'and':[
                                    {
                                        field: 'id_process',
                                        comparison: 'eq',
                                        value: objController.idReference
                                    }
                                ]
                            };

                            store.proxy.extraParams = {
                                filters: Ext.JSON.encode(filters)
                            };

                            store.reload();*/

                            //Nos quedamos preguntando para archivos muy grandes
                            objStatusPGBar.intFunctionSetInterval = setInterval(
                                    function(){
                                        //Solicitudes
                                        objController.requestAJAXLoadFile(true, null, urlServiceQuery);
                                    }, 
                                    objStatusPGBar.intTimeSeg*1000
                                );
                            objController.requestAJAXLoadFile(true, null, urlServiceQuery);
                            
                            break;
                        case 'SchedulingLedPlanning':
                            //Nos quedamos preguntando para archivos muy grandes
                            objStatusPGBar.intFunctionSetInterval = setInterval(
                                    function(){
                                        //Solicitudes
                                        objController.requestAJAXPlanning(true, null, urlServiceQuery);
                                    }, 
                                    objStatusPGBar.intTimeSeg*1000
                                );
                            objController.requestAJAXPlanning(true, null, urlServiceQuery);
                            break;
                        case 'SchedulingLedRouting':
                            //Nos quedamos preguntando para archivos muy grandes
                            objStatusPGBar.intFunctionSetInterval = setInterval(
                                    function(){
                                        //Solicitudes
                                        objController.requestAJAXRouting(true, null, urlServiceQuery);
                                    }, 
                                    objStatusPGBar.intTimeSeg*1000
                                );
                            objController.requestAJAXRouting(true, null, urlServiceQuery);     
                            break;
                        case 'SchedulingLedAsingRoute':
                            var viewport = Ext.ComponentQuery.query('viewport')[0];
                            var programmingModule = viewport.down(AppGlobals.FormGridGridAlias).getLayout().setActiveItem(1); 

                            //Nos quedamos preguntando para archivos muy grandes
                            objStatusPGBar.intFunctionSetInterval = setInterval(
                                    function(){
                                        //Solicitudes
                                        objController.requestAJAXAsign(true, null, urlServiceQuery);
                                    }, 
                                    objStatusPGBar.intTimeSeg*1000
                                );
                            objController.requestAJAXAsign(true, null, urlServiceQuery);
                            break;
                    }
                }
                else
                {
                    alert('Ocurrió un error al reiniciar el estado del último proceso inconcluso.');
                }
            },
            failure:function(objResponse)
            {
                alert('Con Problema');
            }
        });
    },
    //Agrega la cantida de recursos en el toolbar del primer Grid
    addLengthResources: function(arrResourcesExcluded, arrResourceType, arrResourceGroup)
    {
        console.log('Agregando la cantidad de recursos en toolbar primer grid.');
        
        var store = Ext.data.StoreManager.lookup(moduleConfig.storeResourcesToSchedule);
        var url = '';
        var filters = {
            and:[
                {
                    field      : 'id_company',
                    comparison : 'eq',
                    value      : window.localStorage.getItem('id_company')
                }
            ]
        };

        //Recursos Excluidos
        if(!Ext.isEmpty(arrResourcesExcluded))
        {
            filters.and.push(
                {
                    field: '_id',
                    comparison: 'notin',
                    value: arrResourcesExcluded
                }
            );
        }

        //Grupos de recursos
        if(!Ext.isEmpty(arrResourceGroup))
        {
            filters.and.push(
                {
                    field: 'resourceGroups',
                    comparison: 'in',
                    value: arrResourceGroup
                }
            );
        }

        //Tipos de Recursos
        if(!Ext.isEmpty(arrResourceType))
        {
            filters.and.push(
                {
                    field: 'id_resourceDefinition',
                    comparison: 'in',
                    value: arrResourceType
                }
            );
        }

        if(!Ext.isEmpty(store.proxy.url))
        {
            url = store.proxy.url;

            Ext.Ajax.request({
                url      : url,
                type     : 'rest',
                method   : 'GET',
                params:{
                    filters: Ext.JSON.encode(filters),
                },
                success: function(objResponse)
                {
                    var respData = Ext.JSON.decode(objResponse.responseText);

                    if(!respData.error)
                    {
                        console.log('respData:', respData);
                        Ext.getCmp('SchedulingLengthResourcesLabel').setText(scheduling.form.LengthResources + ' ' + respData.pagination.total);
                    }
                },
                failure:function(objResponse)
                {
                    //alert('Con Problema');
                }
            });
        }

        
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
                            '<tr><td><b>'+ scheduling.marker.code +'</b></td><td>{code}</td></tr>',
                            '<tr><td><b>'+ scheduling.marker.name +'</b></td><td >{name}</td></tr>',
                            '<tr><td><b>'+ scheduling.marker.status +'</b></td><td>{status}</td></tr>',
                            '<tr><td><b>'+ scheduling.marker.loadAmount +'</b></td><td>{loadAmount}</td></tr>',
                            '<tr><td><b>'+ scheduling.marker.address +'</b></td><td>{address}</td></tr>',
                            '<tr><td><b>'+ scheduling.marker.duration +'</b></td><td>{duration}</td></tr>',
                            '<tr><td><b>'+ scheduling.marker.type +'</b></td><td>{type}</td></tr>',
                            '<tr><td><b>'+ scheduling.marker.resource.login +'</b></td><td>{resource}</td></tr>',
                        '</table>',
                    '</center>',
                '</div>',
          ].join(''),
          {
              //Funciones Propias del XTemplate
          }
        );

        return taskMarkerTemplate;
    },
    //Crea el PopUp - Ventana
    createPopup: function (feature, data) 
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
        var strTitleName = 'Sin Titulo';

        //En caso que exita el feature
        if(!Ext.isEmpty(feature))
        {
            
            markerType = feature.attributes.markerType;
            allData = feature.data;

            //strTitleName = allData.name;
            strTitleName = scheduling.task;
            
        } 

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
        var templatePopUp = objController.xTemplatePopUpTask()
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
                    
                    var map = Ext.getCmp(AppGlobals.mapId+1);
                    var control = map.map.getControlsBy('name', 'popup' + allData.resource);

                    if(!Ext.isEmpty(control))
                    {
                        control = control.pop();
                        control.unselectAll();
                    }
                },
            }
        );

        //Desplegamos la ventana    
        popUpTask.show();

        var strIdGrid = AppGlobals.listId + 1;
        if(!Ext.getCmp(strIdGrid).isVisible())
        {
            strIdGrid = AppGlobals.listId + 2;
        }

        //Aliniamos respecto a un elemento
        popUpTask.alignTo(strIdGrid, 'c-tr', [-150, 0]);
    },
    //Destruye el PopUp - Ventana
    destroyPopup: function (feature, data)
    {   
        var win = Ext.getCmp(controller + 'PopUpTaskWindow');
        
        if(!Ext.isEmpty(win)){
            win.destroy();
        }
    },

    ////Grid 2 en la segunda pantalla
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
                    text: 'Ver tabla de tareas',
                    handler: function()
                    {
                        //Ocultamos el grid principal
                        var firstGrid = Ext.getCmp(AppGlobals.listId + 1);
                        firstGrid.hide();
                        
                        //Desplegamos el otro grid
                        var secondGrid = Ext.getCmp(AppGlobals.listId + 2);
                        secondGrid.show();
                        
                        //La barra del paginado
                        var grid2DockBottom = Ext.getCmp('idDockBottom' + AppGlobals.listId + 2);

                        //Eliminamos lo viejo
                        grid2DockBottom.remove(AppGlobals.listId + 2 + 'PagingToolbar',true);
                        grid2DockBottom.doLayout();

                        //Agregamos los componentes nuevos
                        var buttonsNew =  Ext.getCmp(controller + 'BackToFirstGrid');
                        if(Ext.isEmpty(buttonsNew))
                        {
                            grid2DockBottom.add({
                                xtype:'toolbar',
                                ui: 'footer',
                                items: moduleConfig.subgrid[2].pagingToolbarItems
                            });
                            grid2DockBottom.doLayout();
                        }

                        //Asignamos el recurso y filtramos
                        var comboResource = Ext.getCmp(controller + 'GridSecondResource');
                        var storeComboResource = comboResource.getStore();
                        var storefirstGrid = firstGrid.getStore();
                        var idLogin = objHTML.name || '';

                        //Filtros
                        storeComboResource.proxy.extraParams.filters = storefirstGrid.proxy.extraParams.filters;
                        
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
    //Volver al primer grid
    onBackToFirstGrid: function(thisButton, e, eOpts)
    {
        //Ocultamos el grid Segundario
        var secondGrid = Ext.getCmp(AppGlobals.listId + 2);
        secondGrid.hide();

        //Desplegamos el primer grid
        var firstGrid = Ext.getCmp(AppGlobals.listId + 1);
        firstGrid.show();

        //Des Seleccionamos todos los datos
        firstGrid.getSelectionModel().deselectAll();

        //Reseteamos el combo
        //Ext.getCmp(controller + 'GridSecondResource').reset();
        Ext.getCmp(controller + 'GridSecondResource').setValue('');
    },
    //Actualiza el store al cambiar de valor el combo de recursos
    updateStoreSecondGrid: function( thisCombo, newValue, oldValue, eOpts )
    {
        //Deseleccionamos todo
        if(!Ext.isEmpty(oldValue))
        {
            var recordResourceOld = thisCombo.getStore().getById(oldValue);
            objController.onResourceTasksDeSelect(null, recordResourceOld, recordResourceOld.index, null);
        }

        var recordResource = thisCombo.getStore().getById(newValue);

        if(!Ext.isEmpty(recordResource))
        {
            var secondStore = Ext.getCmp(AppGlobals.listId + 2).getStore();
        
            //console.log('recordResource',recordResource);
            secondStore.proxy.extraParams.filters = Ext.JSON.encode({
                and:[
                    {
                        field: 'id_company',
                        comparison: 'eq',
                        value: window.localStorage.getItem('id_company')
                    },
                    {
                        field: 'id_process',
                        comparison: 'eq',
                        value: this.idReference
                    },
                    {
                        field: 'id_resourceInstance',
                        comparison: 'eq',
                        value: recordResource.data.resourceInstance._id
                    }
                ]
            })

            secondStore.load(
                function(records, operation, success) 
                {
                    //Agregar las estadisticas
                    /*var objStadistics = {
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
                    Ext.getCmp(controller + 'SummaryLabelSecondGrid').update(summary);*/

                    //Seleccionamos el nuevo recurso
                    objController.onResourceTasksSelect(null, recordResource, recordResource.index, null);
                }
            );
        }
        
    },
    //Seleccionamos una tarea del segundo grid
    onItemCickGridSecond: function(thisGrid, record, item, index, e, eOpts)
    {
        //Centro el mapa de acuerdo a la tarea
        var recordData = record.data;
        var map = Ext.getCmp(AppGlobals.mapId + 1)
        var proj = new OpenLayers.Projection("EPSG:4326");
        var point = new OpenLayers.LonLat(recordData.location.lng, recordData.location.lat);

        point.transform(proj, map.map.getProjectionObject());
        map.map.setCenter(point, 16);
    },
    //Desplegamos el menú contextual del segundo grid
    onContextualMenuGridSecond: function (thisGrid, record, item, index, e, eOpts)
    {
        e.stopEvent();
        
        /*var position = e.getXY();
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
        
        menu_grid.showAt(position);*/
    },
});
