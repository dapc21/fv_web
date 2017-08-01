Ext.define('LoadPrincipal.controller.' + controller, {
    extend: 'LoadPrincipal.controller.Core',
    models: [
//        controller + '.ListCombo',
//        controller + '.List'
    ],
    stores: [
//        controller + '.ListCombo',
//        controller + '.List'
    ],
    views:  [
//        controller + '.ConnectorList',
//         'Generics.WindowCreate'
    ],
    refs: [],
    init: function() {
        var win;
         var win2;
        /**
         * call index view
         */
        this.render(moduleConfig.template);
//        this.postInit();
        /**
         * Load files system basic
         */
        this.loadSystem("menu");
//        this.addDashboardButtons();
        /**
         * Listeners
         */
        this.multiSearch();
        this.control(
            {
                /**
                 * Show te contextmenu
                 */
                'AliasDashboardList': {
                    itemmouseenter: this.generateTooltips,
                    itemcontextmenu: this.listContextualRestrictedMenu,
                    itemclick: this.restrictTopButtons
                },
                
                
                /**
                 * Clear filters
                 */
                'AliasDashboardFilter button[action=clearFilters]': {
                    click: this.clearFilters
                },
                'AliasDashboardFilter button[action=clearFilter]': {
                    click: this.clearFilter
                },
                'AliasDashboardList button[action=clearFilter]': {
                    click: this.clearFilter
                },
                /**
                 * Filters
                 */
                '#listSearchKeyword': {
                    keyup: this.multiSearch
                },
                'AliasDashboardFilter combo[id=DashboardFilterName]': {
                    beforequery: this.autofill,
                    select: this.multiSearch
                },
                'AliasDashboardFilter combo[id=DashboardFilterAction]': {
                    beforequery: this.autofill,
                    select: this.multiSearch
                },
                'AliasDashboardFilter combo[id=columnas2]': {
                    select: this.columnSelect
                },
                'AliasDashboardFilter numberfield[id=value1]': {
                    keyup: this.validateValue1
                },
                'AliasDashboardFilter numberfield[id=valueRange1]': {
                    keyup: this.validateRange
                },
                'AliasDashboardFilter numberfield[id=valueRange2]': {
                    keyup: this.validateRange
                },
                'AliasDashboardFilter checkbox[id=allEstratos]': {
                    change: this.validateAllEstratos
                },
                '#allEstratos': {
                    check: this.allEstratos
                },
                '#enviar': {
                    click: this.store
                },
                '#eliminar': {
                    click: this.deleteItem
                },
                '#build': {
                    click: this.sendData
                },
                '#map': {
                    click: this.biuldDashboard
                },
                
                'AliasDashboardFilter combo[id=DashboardFilterSection]': {
                    beforequery: this.autofill,
                    select: this.multiSearch
                },
                'AliasDashboardFilter datefield[id=DashboardFilterStart]': {
                    change: this.SelectFilterDateStart
                },
                'AliasDashboardFilter datefield[id=DashboardFilterEnd]': {
                    change: this.SelectFilterDateEnd
                },
                'AliasDashboardFilter checkbox[id=DashboardFilterDeleted]': {
                    change: this.sortUsers
                },
                
                
                /**
                 * Excel
                 */
                'AliasDashboardList button[action=exportXls]': {
                    click: this.exportxls
                },
                'AliasDashboardList button[action=DashboardListCreate]': {
                    click: this.exportxls
                }
            }
        );
        this.getStoredTable();
    },
    getStoredTable: function(){
        Ext.Ajax.request({
            url: 'getStoredTable.php',
            success: function (responseObject) {               
                var texto = responseObject.responseText;
                var table = eval('(' + texto + ')');
                if(table.tablename!='false'){
                    Ext.getCmp('map').setDisabled(false);
                    moduleConfig.layer = table.tablename;
                }
            }
        });
    },
    /**
    * Filter advaced date start
    */
   SelectFilterDateStart:function(field,value,eOpts){
   	Ext.getCmp(controller + 'FilterEnd').setValue("");
	Ext.getCmp(controller + 'FilterEnd').setMinValue();
	Ext.getCmp(controller + 'FilterEnd').setMaxValue();
   	var formatdatedaily=Ext.Date.format(value, "Y-m-d");
   	var sumarDias=parseInt(31);
   	var fecha= new Date(formatdatedaily);
   	fecha.setDate(fecha.getDate()+sumarDias);

   	var anio=fecha.getFullYear();
   	var mes= fecha.getMonth()+1;
   	var dia= fecha.getDate();

   	  if(mes.toString().length<2){
   	    mes="0".concat(mes);        
   	  }    

   	  if(dia.toString().length<2){
   	    dia="0".concat(dia);        
   	  }
   	var dateend = anio+"-"+mes+"-"+dia;
   	var dateformat = Ext.Date.parse(dateend,"Y-m-d");
   	var dateformatend = Ext.Date.format(dateformat, "Y-m-d");
   	
   	Ext.getCmp(controller + 'FilterEnd').setMinValue(formatdatedaily);
   	Ext.getCmp(controller + 'FilterEnd').setMaxValue(dateformatend);
   	Ext.getCmp(controller + 'FilterEnd').setValue(dateformatend);
   	
   	Ext.MessageBox.show({
           title: 'Detalles de usuario',
           msg: 'Ahora seleccione una fecha de fin.</br>Recuerde que la fecha de b\u00fasqueda es de m\u00e1ximo 31</br>d\u00edas.</br></br>',
           animCollapse: true,
           buttons: Ext.MessageBox.OK,
           icon: Ext.MessageBox.WARNING
       });
   },
   /**
    * Filter advaced date end
    */
   SelectFilterDateEnd:function(field,value,eOpts){
	   	var datestart=Ext.getCmp(controller + 'FilterStart').getValue();
	   	if(datestart==""||datestart==null||datestart=="null"){
	   		Ext.MessageBox.show({
	               title: 'Atenci\xf3n',
	               msg: 'Seleccione primero una fecha de inicio</br></br>',
	               animCollapse: true,
	               buttons: Ext.MessageBox.OK,
	               icon: Ext.MessageBox.WARNING
	           });
	   		Ext.getCmp(controller + 'FilterEnd').setValue("");
	   		Ext.getCmp(controller + 'FilterEnd').setMinValue();
	   		Ext.getCmp(controller + 'FilterEnd').setMaxValue();
	       	return false;
	   	}
	   	
	   	 this.multiSearch();
    },
    validateFilterDate: function ( thisObj, newValue, oldValue, eOpts ){
        var start = Ext.getCmp(controller + 'FilterStart').getValue();
        var end = Ext.getCmp(controller + 'FilterEnd').getValue();
        if(end < start){
            Ext.MessageBox.show({
                title: 'Informaci\xf3n',
                msg: "La fecha de inicio debe ser menor que la fecha final.",
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            thisObj.setValue(oldValue);
            return false;
        }else{
            this.multiSearch();
        }
        
    },
    filterStation: function(){
        var store = this.getStationListStore();
        store.clearFilter();
        // use filterBy() to create a customized filter
        store.filter([
            {property :'stationstatus.id_station_status',value:/(1|2)$/}
//            {property :'stationstatus.id_station_status',value:'2'}
        ])
//        store.filterBy(function (record) {
         // if the key matches either Benz or BMW then return that record
//         console.log(record.get('stationstatus.id_station_status') == 1)
//         if (record.get('stationstatus.id_station_status') == 1 || record.get('stationstatus.id_station_status') == 2){
//             console.log(record.get('stationstatus.id_station_status'))
//             return record;
//         }
//        });
//        var proxy =  storeConn.getProxy();
//        var values = Ext.JSON.decode(proxy.extraParams.values);
//        values.filter = [
//            {
//                field:'stationstatus.id_station_status',
//                comparison: 'eq',
//                operation: 'OR',
//                value: '1'
//            },
//            {
//                field:'stationstatus.id_station_status',
//                comparison: 'eq',
//                operation: 'OR',
//                value: '2'
//            }
//        ];
//         storeConn.proxy.extraParams = {
//            values: Ext.JSON.encode(values)
//        };
//         storeConn.reload();  
    },
    
    multiSearch: function () {
        /**
         * Get Store
         */
//        var store = this.getDashboardListStore();
//
//        /**
//         * field search
//         */
//        var name = '';
//        var action = '';
//        var section = '';
//        var start = '';
//        var end = '';
//        /**
//         * Json filter
//         */
//        var jsonObj = new Object();
//        jsonObj.func = moduleConfig.serviceDashboardList;
//        jsonObj.filter = [];
//        
//        if (name !='') {
//            jsonObj.filter.push(
//                    {
//                        field: 'id_user',
//                        comparison: 'eq',
//                        value: name
//                    }
//            );
//        }
//        if (action > 0) {
//            jsonObj.filter.push(
//                    {
//                        field: 'id_audit_action',
//                        comparison: 'eq',
//                        value: action
//                    }
//            );
//        }
//        if (section > 0) {
//            jsonObj.filter.push(
//                    {
//                        field: 'id_audit_section',
//                        comparison: 'eq',
//                        value: section
//                    }
//            );
//        }
//        
//        if (start !='' && start >0) {
//            jsonObj.filter.push(
//                    {
//                        field: 'created_at',
//                        comparison: 'gte',
//                        value: Ext.Date.format(start, 'Y-m-d')
//                    }
//            );
//        }
//        if (end !='' && end >0) {
//            jsonObj.filter.push(
//                    {
//                        field: 'created_at',
//                        comparison: 'lte',
//                        value: Ext.Date.format(end, 'Y-m-d')+ ' 23:59:59'
//                    }
//            );
//        }
//        
//
//        jsonObj.resp = 'web';
//        jsonObj.limit = moduleConfig.listPageSize;
//        jsonObj.sort = [
//            {
//                property: 'id_audit',
//                direction: 'desc'
//            }
//        ];
//        jsonObj.relations = ["user","auditsection","auditaction"];
//        moduleConfig.exportFilter = jsonObj;
//        Ext.Ajax.abort(store.proxy.activeRequest);
//        store.proxy.extraParams = {
//            values: Ext.JSON.encode(jsonObj)
//        };
//
//        var o = {start: "0", page: "1"};
//        store.loadPage(1);
    },
    sortUsers: function(thisObj, newValue, oldValue, eOpts){
        var store = this.getUserListStore();
        var jsonObj = new Object();
        jsonObj.func = moduleConfig.serviceUserList;
        jsonObj.filter = [];
        if(newValue ===true){
            jsonObj.filter.push(
                    {
                        field: "deleted_at",
                        comparison: "notnull"
                    }
            );
        }
        jsonObj.resp = 'web';
        jsonObj.limit = moduleConfig.listPageSize;
        jsonObj.sort = [
            {
                property: 'id_user',
                direction: 'desc'
            }
        ];
        moduleConfig.exportFilter = jsonObj;
        Ext.Ajax.abort(store.proxy.activeRequest);
        store.proxy.extraParams = {
            values: Ext.JSON.encode(jsonObj)
        };

        store.reload(); 
    },
    columnSelect: function(){
        var column_name = Ext.getCmp("columnas2").getRawValue();
        var win;
        if(column_name == 'estrato'){
            Ext.getCmp('value1').setDisabled(false);
            Ext.getCmp('valueRange1').setDisabled(false);;
            Ext.getCmp('valueRange2').setDisabled(false);
            Ext.getCmp('allEstratos').setDisabled(false);
//            if(!win){
//                win = new Ext.Window({
//                    applyTo:'hello-win',
//                    layout:'column',
//                    width:550,
//                    height:200,
//                    title: 'Estrato Selection',
//                    closeAction:'destroy',
//                    plain: true,
//                    
//                    items:[
//                             
//                            
//                    ],
//
//                    buttons: [{
//                        text:'Submit',
//                        id: 'submit',
//                        disabled:true,
//                        handler: function(){
//                            if(Ext.getCmp('value1').isValid() && Ext.getCmp('valueRange1').isValid() && Ext.getCmp('valueRange2').isValid()){
//                                if(Ext.getCmp('allEstratos').checked == true ||Ext.getCmp('value1').getValue()!=""||(Ext.getCmp('valueRange1').getValue()!="" && Ext.getCmp('valueRange2').getValue()!="")
//                                ){
//                                    var value;
//                                    if(Ext.getCmp('allEstratos').checked == true){
//                                        value = "all";                                                            
//                                    }else if(Ext.getCmp('value1').getValue()!= null && Ext.getCmp('value1').getValue()!=""){
//                                        value = Ext.getCmp('value1').getValue();
//                                    }else{
//                                        value = Ext.getCmp('valueRange1').getValue()+','+Ext.getCmp('valueRange2').getValue();
//                                    }
//                                    Ext.getCmp('hiddenEstrato').setValue(value);
//                                    Ext.getCmp('labelEstrato').setText(value);
//                                    Ext.getCmp('value1').setValue("");
//                                    Ext.getCmp('valueRange1').setValue("");
//                                    Ext.getCmp('valueRange2').setValue("");
//                                    Ext.getCmp('value1').setDisabled(false);
//                                    Ext.getCmp('valueRange1').setDisabled(false);;
//                                    Ext.getCmp('valueRange2').setDisabled(false);
//                                    Ext.getCmp('submit').setDisabled(true);
//                                    Ext.getCmp('enviar').fireEvent('click',Ext.getCmp('enviar'));
//                                    win.destroy();
//                                }else{
//                                    Ext.MessageBox.show({
//                                        title: 'Alert',
//                                        msg: 'Incomplete data',
//                                        buttons: Ext.MessageBox.OK,
//                                        icon: Ext.MessageBox.ERROR
//                                    });
//                                }
//                            }else{
//                                Ext.MessageBox.show({
//                                    title: 'Alert',
//                                    msg: 'Verify data',
//                                    buttons: Ext.MessageBox.OK,
//                                    icon: Ext.MessageBox.ERROR
//                                });
//                            }
//                        }
//                    },{
//                        text: 'Close',
//                        handler: function(){
//                            Ext.getCmp('columnas2').setValue('')
//                            win.destroy();                            
//                        }
//                    }]
//                });
//            }
//            win.show(this);
        }
    },
    allEstratos: function(){
        var check = Ext.getCmp('allEstratos');
        console.log(check)
        if(checked){
            Ext.getCmp('value1').setValue('');
            Ext.getCmp('valueRange1').setValue('');;
            Ext.getCmp('valueRange2').setValue('');
            Ext.getCmp('value1').setDisabled(true);
            Ext.getCmp('valueRange1').setDisabled(true);;
            Ext.getCmp('valueRange2').setDisabled(true);
            Ext.getCmp('submit').setDisabled(false);
        }else{
            Ext.getCmp('value1').setDisabled(false);
            Ext.getCmp('valueRange1').setDisabled(false);;
            Ext.getCmp('valueRange2').setDisabled(false);
            Ext.getCmp('submit').setDisabled(true);                                                
        }
    },
    sendData: function(button){
        var obj =  this;
        var store = Ext.getCmp(AppGlobals.listId).getStore();
        var text ='(\'{';
        var extraVal = '';
        var func = '';
        var comma = '';
        if(store.getCount()>1){
            Ext.each(store.data.items,function(value,index){
                var columnName=value.data.column_name;
                if(value.data.reversion=='True'){
                    columnName = value.data.column_name.replace("r_","inv_");
                }
                if(value.data.estrato !="---" && value.data.estrato !="all"){
                    if(isNaN(value.data.estrato)){
                        text += comma+"{"+columnName+","+value.data.value+"}";
                        extraVal += ':: character varying[],\'estrato\' ::character varying,\'{'+value.data.estrato+'}\'';
                        func = 'dt_profile2';
                    }else{
                        text += comma+"{"+columnName+","+value.data.value+"}";                                            
                        extraVal += ':: character varying[],\'estrato\' ::character varying,'+value.data.estrato
                        func = 'dt_profile1';
                    }
                }else{
                    text += comma+"{"+columnName+","+value.data.value+"}";
                    if(func =='')func = 'dt_profile';
                }
                comma = ',';
            });
            text += "}\'"+extraVal+')';
            Ext.Msg.confirm('Confirm', '\xbfDo you want to execute "'+func+text+'"?<br/><br/>', 
            function(btn) {
                if (btn === 'yes') {
                    var msg = Ext.MessageBox.wait('Searching...');
                    Ext.Ajax.request({
                        url: 'guardarTempTable.php/'+func+text,
                        method: 'state',
                        timeout: 300000,
                        params: {
                            func: func,
                            text: text
                        },
                        success: function (responseObject) {
                            msg.hide();
                            Ext.getCmp('map').setDisabled(false);
                            var texto = responseObject.responseText;
                            var data = eval('(' + texto + ')');
                            if (data.success == false) {
                                Ext.MessageBox.show({
                                    title: 'Error',
                                    msg: data.message+"<br/><br/>",
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }

                            else {
                                Ext.Msg.confirm('Sucess', data.message+' <br/>Build map?', 
                                function(btn) {
                                    Ext.Ajax.request({
                                        url: 'publishTable.php?layer='+data.data,
                                        method: 'state',
                                        timeout: 300000,
                                        params: {
                                            func: func,
                                            text: text
                                        },
                                        success: function (responseObject) {
                                            msg.hide();
                                            var texto = responseObject.responseText;
                                            var data2 = eval('(' + texto + ')');
                                            if(data2.layer=='null'){
                                                Ext.MessageBox.show({
                                                    title: 'Error',
                                                    msg: 'Can not publish the table '+data.data+'<br/><br/>',
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.ERROR
                                                });
                                            }else{
                                                moduleConfig.layer = data2.layer;
                                                obj.biuldDashboard();
                                            }
                                        }
                                    });
                                });
                            }
                        }
                    });
                }
            });
        }else{
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'You need at least 2 registers to start the analisys.<br/><br/>',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },
    biuldDashboard: function(){
        var layer = moduleConfig.layer;
        var win2;
        OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
                defaultHandlerOptions: {
                    'single': true,
                    'double': false,
                    'pixelTolerance': 0,
                    'stopSingle': false,
                    'stopDouble': false
                },

                initialize: function(options) {
                    this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaultHandlerOptions
                    );
                    OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                    ); 
                    this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click': this.trigger
                        }, this.handlerOptions
                    );
                }, 

                trigger: function(e) {
                    //A click happened!
                    new OpenLayers.Control.WMSGetFeatureInfo({
                        url: 'http://192.168.1.108:7070/geoserver/pruebaWK3/wms', 
                        title: 'Identify features by clicking',
                        layers: ['pruebaWK3:'+layer],
                        queryVisible: true
                    })
                    
//                    var lonlat = map.getLonLatFromViewPortPx(e.xy)
//                    
//                    lonlat.transform(
//                      new OpenLayers.Projection("EPSG:900913"), 
//                      new OpenLayers.Projection("EPSG:4326")
//                    );
//                    
//                    alert("You clicked near " + lonlat.lat + " N, " +
//                                              + lonlat.lon + " E");
                }

            });
        var map = new OpenLayers.Dashboard({
                controls: [
                            new OpenLayers.Control.MousePosition(),
                            new OpenLayers.Control.PanPanel(),
                            new OpenLayers.Control.ZoomPanel(),
                            new OpenLayers.Control.Navigation(),
                            new OpenLayers.Control.LayerSwitcher()],
                    tranitionEffect:'resize',
                    numZoomLevels:16,
                    projection: new OpenLayers.Projection("EPSG:900913"),
                    displayProjection: new OpenLayers.Projection("EPSG:4326"),
                    units: 'm',
                    allOverlays: false
            });
            var format = new OpenLayers.Format.CQL();
            var wms = new OpenLayers.Layer.WMS("Analysis",
                                "http://192.168.1.108:7070/geoserver/wms", 
                                {
    //                            layers: ['Bogota:limiteb','georeferenciacion5:mallavial_cundinamarca5'],
                                layers: ['pruebaWK3:bogota','pruebaWK3:'+layer],
                                tiled: 'true',
                                styles: ['point','prueba'],
//                                cql_filter: 'f_score>400',
                                transparent: false,
                                format: "image/png"
                                }, {transitionEffect: 'resize', ratio: 1,opacity: 0.5,isBaseLayer:false}

            );
//            var wms2 = new OpenLayers.Layer.WMS("Bogota",
//                                "http://192.168.1.108:7070/geoserver/pruebaWK3/wms", 
//                                {
//    //                            layers: ['Bogota:limiteb','georeferenciacion5:mallavial_cundinamarca5'],
//                                layers: ['pruebaWK3:bogota'],
//                                tiled: 'true',
//                                styles: 'polygon',
//                                transparent: false,
//                                format: "image/png"
//                                }, {transitionEffect: 'resize', ratio: 1,opacity: 0.5,isBaseLayer:false}
//
//            );

            var publico = new OpenLayers.Layer.WMS(
                "OpenStreetDashboard WMS",
                "http://ows.terrestris.de/osm/service?",
                {layers: 'OSM-WMS'},{transitionEffect: 'resize', opacity: 0.5, ratio: 1,isBaseLayer: true});
            map.addLayers([wms,publico]);;

            var click = new OpenLayers.Control.Click();
                map.addControl(click);
                click.activate();
                
            mappanel = Ext.create('GeoExt.panel.Dashboard', {
//                title: 'Panel Principal',
                stateId: 'mappanel',
                height: 605,
                dockedItems: [
                    {
                        dock: 'bottom',
                        layout: 'column',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Close Dashboard',                        
                                columnWidth: 0.45,
                                id: 'closeDashboard',
                                handler: function () {
                                    Ext.getCmp('mapPanel').hide()
                                    Ext.getCmp(AppGlobals.filterId).show()
                                    Ext.getCmp('filterWrapper').setWidth(500);
                                    Ext.getCmp('mapPanel').remove(mappanel)
                                }
                            },                   
                            {xype:'label',columWidth:0.2,html:'&nbsp;'},
                            {
                                xtype: 'button',
                                text: 'Manual Filter',
                                columnWidth: 0.25,
                                id: 'filterDashboard',
                                handler: function () {
                                    var arrayfil1={filter: null,cql_filter: null,featureId: null};	
                                    arrayfil1["cql_filter"]="INCLUDE;INTERSECTS(collectGeometries(geom), querySingle('pruebaWK3:bogota', 'geom','estrato=3'))";
                                    var arrayfil2={filter: null,cql_filter: null,featureId: null};	
                                    arrayfil2["cql_filter"]="r_h_20_24 = 6";
//                                    map.getLayersByName('Bogota')[0].mergeNewParams(arrayfil2);
//                                    map.getLayersByName('Bogota')[0].redraw(true);
                                    map.getLayersByName('Analysis')[0].mergeNewParams(arrayfil1);
                                    map.getLayersByName('Analysis')[0].redraw(true);
                                }
                            },                         
                            {
                                xtype: 'button',
                                text: 'Remove Filter',
                                columnWidth: 0.25,
                                id: 'removeFilterDashboard',
                                handler: function () {
                                    var arrayfil={filter: null,cql_filter: null,featureId: null};	
                                    map.getLayersByName('Analysis')[0].mergeNewParams(arrayfil);
                                    map.getLayersByName('Analysis')[0].redraw(true);
//                                    map.getLayersByName('Bogota')[0].mergeNewParams(arrayfil);
//                                    map.getLayersByName('Bogota')[0].redraw(true);
                                }
                            }                            
                        ]
                    }
                ],
                map: map,
                center: '-8245896.5752931,515376.39934128',
//                center: '-7407326,462476',
                zoom: 12
    //            stateful: true
            });
            
           
            Ext.getCmp(AppGlobals.filterId).hide()
            Ext.getCmp('filterWrapper').setWidth(850);
            Ext.getCmp('mapPanel').add(mappanel)
            Ext.getCmp('mapPanel').show()
//            if(!win2){
//                win2 = new Ext.Window({
//                    applyTo:'hello-win',
//                    layout:'fit',
//                    width:800,
//                    height:600,
//                    closeAction:'hide',
//                    plain: true,
//
//                    items:[mappanel]
//                });
//            }
//            win2.show();
    },
    validateValue1: function(){
        if(Ext.getCmp('value1').getValue()=="" || Ext.getCmp('value1').getValue()==null){
            Ext.getCmp('allEstratos').setDisabled(false);
            Ext.getCmp('valueRange1').setDisabled(false);
            Ext.getCmp('valueRange2').setDisabled(false);
        }else{
            Ext.getCmp('allEstratos').setDisabled(true);
            Ext.getCmp('valueRange1').setDisabled(true);
            Ext.getCmp('valueRange2').setDisabled(true);
        }
    },
    validateRange: function(){
        if((Ext.getCmp('valueRange1').getValue()=="" || Ext.getCmp('valueRange1').getValue()==null)&&(Ext.getCmp('valueRange2').getValue()=="" || Ext.getCmp('valueRange2').getValue()==null)){
            Ext.getCmp('allEstratos').setDisabled(false);
            Ext.getCmp('value1').setDisabled(false);
        }else{
            Ext.getCmp('allEstratos').setDisabled(true);
            Ext.getCmp('value1').setDisabled(true);
        }
    },
    validateAllEstratos: function(cb, checked){
        if(checked){
            Ext.getCmp('value1').setValue('');
            Ext.getCmp('valueRange1').setValue('');;
            Ext.getCmp('valueRange2').setValue('');
            Ext.getCmp('value1').setDisabled(true);
            Ext.getCmp('valueRange1').setDisabled(true);;
            Ext.getCmp('valueRange2').setDisabled(true);
        }else{
            Ext.getCmp('value1').setDisabled(false);
            Ext.getCmp('valueRange1').setDisabled(false);;
            Ext.getCmp('valueRange2').setDisabled(false);
        }
    },
    store: function(){
        if(Ext.getCmp('value1').isValid() && Ext.getCmp('valueRange1').isValid() && Ext.getCmp('valueRange2').isValid() && Ext.getCmp('value').isValid() && Ext.getCmp('columnas2').isValid()){
            if(
                Ext.getCmp('allEstratos').checked == true ||
                (Ext.getCmp('value1').getValue()!="" && Ext.getCmp('value1').getValue()!=null)||
                (Ext.getCmp('valueRange1').getValue()!="" && Ext.getCmp('valueRange2').getValue()!="" && Ext.getCmp('valueRange1').getValue()!=null && Ext.getCmp('valueRange2').getValue()!=null)
            ){
                var value;
                if(Ext.getCmp('allEstratos').checked == true){
                    value = "all";                                                            
                }else if(Ext.getCmp('value1').getValue()!= null && Ext.getCmp('value1').getValue()!=""){
                    value = Ext.getCmp('value1').getValue();
                }else{
                    value = Ext.getCmp('valueRange1').getValue()+','+Ext.getCmp('valueRange2').getValue();
                }
                Ext.getCmp('hiddenEstrato').setValue(value);
//                Ext.getCmp('labelEstrato').setText(value);
//                Ext.getCmp('value1').setValue("");
                Ext.getCmp('valueRange1').setValue("");
                Ext.getCmp('valueRange2').setValue("");
                Ext.getCmp('value1').setDisabled(true);
                Ext.getCmp('valueRange1').setDisabled(true);;
                Ext.getCmp('valueRange2').setDisabled(true);
//                Ext.getCmp('submit').setDisabled(true);
//                Ext.getCmp('enviar').fireEvent('click',Ext.getCmp('enviar'));
//                win.destroy();
            }else{
                Ext.MessageBox.show({
                    title: 'Alert',
                    msg: 'Incomplete data',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        
        
            var column_name = Ext.getCmp("columnas2").getRawValue();
            var reversion = Ext.getCmp("rev").checked;
            var value = Ext.getCmp("value").getValue();
            var estrato = Ext.getCmp("hiddenEstrato").getValue();

            Ext.Ajax.request({
                url: 'guardarTempTable.php',
                params: {
                    column_name: column_name,
                    reversion: reversion,
                    estrato: estrato,
                    value: value
                },
                success: function (responseObject) {
                    var texto = responseObject.responseText;
                    var data = eval('(' + texto + ')');
                    if (data.success == false) {
                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: data.message,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                    else {
                        Ext.MessageBox.show({
                            title: 'Success',
                            msg: data.message,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                        Ext.getCmp(AppGlobals.listId).getStore().reload();
                        Ext.getCmp('columnas2').getStore().reload();
                        Ext.getCmp('columnas2').setValue("");
                        Ext.getCmp('rev').setValue("");
                        Ext.getCmp('value').setValue('');
                        Ext.getCmp('hiddenEstrato').setValue("---");
                    }
                }
            });
        }else{
            Ext.MessageBox.show({
                title: 'Alert',
                msg: 'Verify data',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },
    deleteItem: function(){
        var selected = Ext.getCmp(AppGlobals.listId).getSelectionModel();
                                
        var selectedRecords = selected.getSelection();
        if(selected.getSelection().length>0){
            Ext.Msg.confirm('Confirm', '\xbfDo you want to delete the selected data?', 
            function(btn) {
                if (btn === 'yes') {
                    var items=[];
                    var record = "";
                    for (var i = 0, len = selectedRecords.length; i < len; i++) {

                        record = selectedRecords[i];
                        items.push(record.get(moduleConfig.idField));
                    }
                    Ext.Ajax.request({
                        url: 'guardarTempTable.php/'+JSON.stringify(items),
                        method: 'delete',
                        params: {
                            items: "{"+JSON.stringify(items)+"}"
                        },
                        success: function (responseObject) {
                            var texto = responseObject.responseText;
                            var data = eval('(' + texto + ')');
                            if (data.success == false) {
                                Ext.MessageBox.show({
                                    title: 'Error',
                                    msg: data.message,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }

                            else {
                                Ext.MessageBox.show({
                                    title: 'Success',
                                    msg: data.message,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.INFO
                                });
                                Ext.getCmp(AppGlobals.listId).getStore().reload();
                                Ext.getCmp('columnas2').getStore().reload();
                            }
                        }
                    });
                }
            });
        }
    },
    openModalWindowLocal: function(button){
        console.log('mapatal')
        alert('ingresa al controller principal');
//        var obj = this;
//        this.loadScript('app/controller/Dashboard.js',function(){
//            
//            obj.loadComponent('Dashboard')
//        })
        
    }
    
});