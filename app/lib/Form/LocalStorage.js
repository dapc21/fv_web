
Ext.namespace('Validator.lib.Form.LocalStorage'); 
Ext.define('LoadPrincipal.lib.Form.LocalStorage', {
    extend: 'Ext.app.Controller',
    json: '',
    init: function () {
        testerObj = this;
        
//        this.testConnection();
       
        this.restoreData();
        this.restoreLists();
        this.storeHandler();
        this.control(
            {
                'textfield': {
                    change: this.storeData
                },
                'radiofield': {
                    change: this.storeData
                },
                'checkboxfield': {
                    change: this.storeData
                },
                'displayfield': {
                    change: this.storeData
                },
                'gx_mappanel':{
                    aftermapmove: this.storeMapData,
                    beforefeatureadded: this.alert2
                },
                'tabpanel': {
                    tabchange: this.storeTabs
                },
                'window': {
                    show: this.storeWindow
                }
            }
        );
    },
    
    alert2: function(geoExtObj,openLayersObj){
      console.log(geoExtObj);
      console.log(openLayersObj.getCenter().lon);
      console.log(openLayersObj.getCenter().lat);
      console.log(openLayersObj.getZoom());
    },
    testConnection: function(){
        var task = {
            run: this.sendRequest,
            interval: 1000 //5 seconds
        };
        var runner = new Ext.util.TaskRunner();
        runner.start(task);
    },
    sendRequest: function(){
        var obj = this;
        Ext.Ajax.request({
          url: "http://192.168.1.160/processor/public/objects",
          method: 'GET',
          context: document.body,
          failure: function(jqXHR, exception) {
              testerObj.toggleConnectionAlert('failure');
              Ext.getBody().query('.field, .button').forEach(function(c){c.setDisabled(true);});
            
          },
          success: function(){
              testerObj.toggleConnectionAlert('success');
          }
        });
    },
    toggleConnectionAlert: function(action){
        if(action === "failure"){
            $('#connectionAlert').removeClass('fade');            
        }else{
            $('#connectionAlert').addClass('fade');            
        }
    },
    storeData: function(obj,event){
        var value = obj.getValue();
        var id = obj.getId();
        var url = document.URL;
        var json = (testerObj.json);
        var currentUrl = url.split("?");
        var storedUrl = json.url.split("?");
        if(String(currentUrl[1])===String(storedUrl[1])){
            json.url=url;
            json.formData.fields[id]= value;
            testerObj.json = json;
            testerObj.setLocalStorage(testerObj.json);
        }
    },
    storeMapData: function(geoExtObj,openLayersObj){
        var url = document.URL;
        var json = (testerObj.json);
        var currentUrl = url.split("?");
        var storedUrl = json.url.split("?");
        if(String(currentUrl[1])===String(storedUrl[1])){
            json.url=url;
            json.formData.map['zoom']= openLayersObj.getZoom();
            json.formData.map['lon']= openLayersObj.getCenter().lon;
            json.formData.map['lat']= openLayersObj.getCenter().lat;
//            if(typeof (json.formData.map.points) === 'undefined'){
                json.formData.map.points = {};
                json.formData.map.points.layer = [];
//            }
//            if(typeof (json.formData.map.polygon) === 'undefined'){
                json.formData.map.polygon = {};
                json.formData.map.polygon.layer = [];
//            }
            Ext.each(geoExtObj.map.layers,function(lay,index){
                if(lay.features){
                    var insert = true;
                    var point3 = [];
                    var layerPointObj = {};
                    var layerPolygonObj = {};
                    Ext.each(json.formData.map.points.layer,function(storedLayer,indexStored){
                        if(lay.id == storedLayer.id){
                            insert = false;
                        }
                    });
                    Ext.each(json.formData.map.polygon.layer,function(storedLayer,indexStored){
                        if(lay.id == storedLayer.id){
                            insert = false;
                        }
                    });
                    if(insert){
                        Ext.each(lay.features,function(feature,indexFeature){
                            if(feature.geometry.CLASS_NAME === 'OpenLayers.Geometry.Point'){
                                if(! layerPointObj.coordinates){
                                    layerPointObj.coordinates = [];
                                }
                                layerPointObj.id = lay.id;
                                layerPointObj.name = lay.name;
                                Ext.each(feature.geometry.getVertices(),function(point,index){
                                    console.log(point.x)
                                    layerPointObj.coordinates.push({x:point.x,y:point.y});
                                });
                            }else if(feature.geometry.CLASS_NAME === 'OpenLayers.Geometry.Polygon'){
                                layerPolygonObj.coordinates = [];
                                layerPolygonObj.id = lay.id;
                                layerPolygonObj.name = lay.name;
                                Ext.each(feature.geometry.getVertices(),function(point,index){
                                    layerPolygonObj.coordinates.push({x:point.x,y:point.y});
                                });
                            }
                        });
                        if(Object.keys(layerPointObj).length > 0){
                            json.formData.map.points.layer.push(layerPointObj);
                        }
                        if(Object.keys(layerPolygonObj).length > 0){
                            json.formData.map.polygon.layer.push(layerPolygonObj);
                        }
                    }
                }
            });
            testerObj.json = json;
            testerObj.setLocalStorage(testerObj.json);
        }
    },
    storeRule: function(rules){
        var url = document.URL;
        var json = (testerObj.json);
        var currentUrl = url.split("?");
        var storedUrl = json.url.split("?");
        if(String(currentUrl[1])===String(storedUrl[1])){
            for(var index in rules) { 
                json.formData.rules[index] = rules[index];
            };
            testerObj.json = json;
            testerObj.setLocalStorage(testerObj.json);
        }
    },
    pushRule: function(key,rules){
        var url = document.URL;
        var json = (testerObj.json);
        var currentUrl = url.split("?");
        var storedUrl = json.url.split("?");
        if(String(currentUrl[1])===String(storedUrl[1])){
            if(json.formData.rules[key]){
                json.formData.rules[key].push(rules) ;                
            }else{
                json.formData.rules[key] = [rules];               
            }
            testerObj.json = json;
            testerObj.setLocalStorage(testerObj.json);
        }
    },
    setJson: function(){
        this.json = {
            token: 1,
            url: document.URL,
            formData: {
                action: '',
                status: '',
                rules: {},
                map: {},
                fields: {}
            },
            stores: {}
        };
        this.setLocalStorage(this.json);
    },
    clearLocalStorage: function(){
        if(typeof(Storage) !== "undefined") {
            localStorage.setItem("formJson", "");                
        } else {
            console.log('Sorry! No Web Storage support..');
        }
    },
    setLocalStorage: function(json){
        if(typeof(Storage) !== "undefined") {
            localStorage.setItem("formJson", Ext.JSON.encode(json));                
        } else {
            console.log('Sorry! No Web Storage support..');
        }
    },
    getLocalStorage: function(){
        if(typeof(Storage) !== "undefined") {
            if(localStorage.getItem('formJson') !== ""){
                this.json = Ext.JSON.decode(localStorage.getItem("formJson"));
            }else{
                this.setJson();
            }
        } else {
            console.log('Sorry! No Web Storage support..');
        }
    },
    restoreData: function (){
        this.getLocalStorage();
        var currentUrl = document.URL.split("?");
        var storedUrl = '';
        if(testerObj.json !== null){
            storedUrl = testerObj.json.url.split("?");
        }
        if(String(currentUrl[1]) === String(storedUrl[1])){
            testerObj.actionsHandler();
            testerObj.restoreMapData();
//            Ext.each(this.json.formData.fields, function(field,index){
            setTimeout(function() {
                for(var index in testerObj.json.formData.fields) { 
//                    console.log(index);
//                    console.log(testerObj.json.formData.fields[index]);
//                    Ext.getCmp(index).setValue(testerObj.json.formData.fields[index]);
                };
            },500);
        }else{
            this.clearLocalStorage();
            this.setJson();
        }
    },
    restoreMapData: function (){
        if(testerObj.json.formData.map.lon && testerObj.json.formData.map.lat && testerObj.json.formData.map.zoom){
            var lon = testerObj.json.formData.map.lon;
            var lat = testerObj.json.formData.map.lat;
            var zoom = testerObj.json.formData.map.zoom;
            var map = Ext.getCmp(AppGlobals.mapId);
            map.map.setCenter(new OpenLayers.LonLat(lon,lat),zoom);
        }
        if(testerObj.json.formData.map.points){
            if(testerObj.json.formData.map.points.layer.length > 0){
                Ext.each(testerObj.json.formData.map.points.layer,function(layer,indexLayer){
                    var point2 = [];
                    var vectors2 = new OpenLayers.Layer.Vector(layer.name);
                    Ext.each(layer.coordinates,function(point,indexFeature){
                            point2.push(new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(point.x,point.y)));
                    });
                    vectors2.addFeatures(point2);
                    map.map.addLayers([ vectors2]);
                });
            }
        }
        if(testerObj.json.formData.map.polygon){
            if(testerObj.json.formData.map.polygon.layer.length > 0){
                Ext.each(testerObj.json.formData.map.polygon.layer,function(layer,indexLayer){
                    var point3 = [];
                    var vectors2 = new OpenLayers.Layer.Vector(layer.name);
                    Ext.each(layer.coordinates,function(point,indexFeature){
                            point3.push(new OpenLayers.Geometry.Point(point.x,point.y));
                    });
                    var ring = new OpenLayers.Geometry.LinearRing(point3);
                    var polygon = new OpenLayers.Geometry.Polygon([ring]);
                    // create some attributes for the feature
                    var attributes = {name: "PolÃ­gono", bar: "foo"};

                    var feature = new OpenLayers.Feature.Vector(polygon, attributes);
                    var selected_polygon_style = {
                        strokeWidth: 1,
                        strokeColor: '#ff0000',
                        fillColor: '#fff',
                        fillOpacity: 0.5
                        // add more styling key/value pairs as your need
                    };

                    feature.style = selected_polygon_style;
                    vectors2.addFeatures(feature);
                    map.map.addLayers([ vectors2]);
                });
            }
        }
    },
    actionsHandler: function(){
        switch(this.json.formData.rules.action){
            case 'open':
                if(this.json.formData.rules.form){
                    moduleConfig.form.items = this.json.formData.rules.form;
                }
//                var win = Ext.widget(AppGlobals.windowAlias);
//        //        Ext.getCmp(AppGlobals.windowId).show();        
//                win.show();
//                LoadPrincipal.view.globalVars.someVar.show(AppGlobals.windowId);
                break;
            case 'setCurrent':
                Ext.each(this.json.formData.rules.setActive,function(value,index){
//                    var aTab = Ext.getCmp(value);
//                    aTab.setDisabled(false);
                });
//                var tabs = Ext.getCmp(AppGlobals.tabsId);
//                var tab = Ext.getCmp(this.json.formData.rules.tab);
//                tabs.setActiveTab(tab);
                break;
            default:
                break;
        }
    },
    storeTabs: function(thisObj,newCard, oldCard, eOpts){
        this.storeRule({'target':'tabs',action:'setCurrent',tab:newCard.id});
        this.pushRule('setActive',newCard.id);
    },
    storeWindow: function(){
        testerObj.storeRule({'target':'window','action':'open'});
    },
    storeHandler: function(){
        Ext.util.Observable.observeClass(Ext.data.Store, {
            beforeload: function(store, operation, options){
                var id =  store.storeId;
                var page = operation.page;
                var limit = operation.limit;
                var property = operation.sorters[0].property;
                var direction = operation.sorters[0].direction;
                var url = document.URL;
                var json = (testerObj.json);
                var currentUrl = url.split("?");
                var storedUrl = json.url.split("?");
                if(String(currentUrl[1])===String(storedUrl[1])){
                    json.stores[id]= {
                        page: page,
                        limit: limit,
                        sortProperty: property,
                        sortDirection: direction
                    };
                    testerObj.json = json;
                    testerObj.setLocalStorage(testerObj.json);
                }
            }
        });
    },
    restoreLists: function(){
        if(Object.keys(testerObj.json.stores).length > 0){
            for( i in testerObj.json.stores){
                var store = Ext.getStore(i);
                
//                store.sort([{
//                        property : testerObj.json.stores[i].sortProperty+'test',
//                        direction: testerObj.json.stores[i].sortDirection+'test'
//                }]);
                store.load({
                    page: testerObj.json.stores[i].page,
                    limit : testerObj.json.stores[i].limit,
//                    sorters: [{field : testerObj.json.stores[i].sortProperty ,direction: testerObj.json.stores[i].sortDirection}]
                    sorters: []
                });
                
            }
        }
    }
//    rulesHandler: function(){
//        switch(this.json.formData.rules.target){
//            case 'window':
//                this.actionsHandler();
//                break;
//            case 'tabs':
//                this.actionsHandler();
//                break;
//            default:
//                break;
//        }
//    }
});

