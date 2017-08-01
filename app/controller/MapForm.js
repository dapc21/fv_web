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
//        this.loadSystem("menu");
//        this.addListButtons();
        this.addMapButtons();
        /**
         * Listeners
         */
//        this.multiSearch();
        this.control(
            {
                /**
                 * Show te contextmenu
                 */
//                '#IdMapFormMap': {
//                    aftermapmove: this.alert
//                },
                '#MapFormListDelete': {
                    click: this.testingMap
                },
                
                
                
            }
        );
    },
    testingMap: function(){
        var map = Ext.getCmp(AppGlobals.mapId)
//        map.map.panTo(new OpenLayers.LonLat(-8245896.5752931,515376.39934128));
//        map.map.zoomTo(12);
        map.map.setCenter(new OpenLayers.LonLat(-8245796.5752931,515386.39934128),12);
        var vectors = new OpenLayers.Layer.Vector("Points");

        point = new OpenLayers.Geometry.Point(-8245820.5752931,515381.39934128);
        vectors.addFeatures([new OpenLayers.Feature.Vector(point)]);
        point = new OpenLayers.Geometry.Point(-8244891.5752871,515376.39934135);
        vectors.addFeatures([new OpenLayers.Feature.Vector(point)]);
        
        
        
        
        var points = [
            new OpenLayers.Geometry.Point(-8244891.5752871,514371.39934135),
            new OpenLayers.Geometry.Point(-8244891.5752871,515376.39934135),
            new OpenLayers.Geometry.Point(-8245896.5752871,515376.39934135),
            new OpenLayers.Geometry.Point(-8245896.5752871,514371.39934135)
        ];
        var ring = new OpenLayers.Geometry.LinearRing(points);
        var polygon = new OpenLayers.Geometry.Polygon([ring]);
        // create some attributes for the feature
        var attributes = {name: "Polígono", bar: "foo"};

        var feature = new OpenLayers.Feature.Vector(polygon, attributes);
        var selected_polygon_style = {
            strokeWidth: 1,
            strokeColor: '#ff0000',
            fillColor: '#fff',
            fillOpacity: 0.5
            // add more styling key/value pairs as your need
        };

        feature.style = selected_polygon_style;
        var layer = new OpenLayers.Layer.Vector("Polygon");
        layer.addFeatures([feature]);
//        vectors.addFeatures(feature);
        
        map.map.addLayers([ vectors,layer]);
//        Ext.each(map.map.layers,function(lay,index){
//            if(lay.features){
//                var point2 = []
//                var point3 = []
//                var vectors2 = new OpenLayers.Layer.Vector(lay.name);
//                Ext.each(lay.features,function(feature,indexFeature){
//                    console.log(feature.geometry.CLASS_NAME);
//                    if(feature.geometry.CLASS_NAME == 'OpenLayers.Geometry.Point'){
//                        console.log(feature.geometry.getVertices())
//                        Ext.each(feature.geometry.getVertices(),function(point,index){
//                            point2.push(new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(point.x,point.y)));
//                        });
//
//                        vectors2.addFeatures(point2);
//                    }else if(feature.geometry.CLASS_NAME == 'OpenLayers.Geometry.Polygon'){
//                        Ext.each(feature.geometry.getVertices(),function(point,index){
//                            point3.push(new OpenLayers.Geometry.Point(point.x,point.y));
//                        });
//                         var ring = new OpenLayers.Geometry.LinearRing(point3);
//                        var polygon = new OpenLayers.Geometry.Polygon([ring]);
//                        // create some attributes for the feature
//                        var attributes = {name: "Polígono", bar: "foo"};
//
//                        var feature = new OpenLayers.Feature.Vector(polygon, attributes);
//                        var selected_polygon_style = {
//                            strokeWidth: 1,
//                            strokeColor: '#ff0000',
//                            fillColor: '#fff',
//                            fillOpacity: 0.5
//                            // add more styling key/value pairs as your need
//                        };
//
//                        feature.style = selected_polygon_style;
//                        vectors2.addFeatures(feature);
//                    }
//                    map.map.addLayers([ vectors2]);
//                });
//            }
//        });
    }
    
});