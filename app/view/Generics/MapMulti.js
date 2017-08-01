if(typeof(moduleConfig.submap) != 'undefined'){
    Ext.each(moduleConfig.submap,function(value,genericIndex,values){
        var suffixName = (genericIndex > 0)? genericIndex : '' ;

    var controls = [];
    if(moduleConfig.submap[genericIndex].controls.mousePosition){
        controls.push(new OpenLayers.Control.MousePosition())
    }
    if(moduleConfig.submap[genericIndex].controls.panPanel){
        controls.push(new OpenLayers.Control.PanPanel())
    }
    if(moduleConfig.submap[genericIndex].controls.zoomPanel){
        controls.push(new OpenLayers.Control.ZoomPanel())
    }
    if(moduleConfig.submap[genericIndex].controls.navigation){
        controls.push(new OpenLayers.Control.Navigation({
            mouseWheelOptions : {
                interval: 10, //{Integer} In order to increase server performance, an interval (in milliseconds) can be set to reduce the number of up/down events called.
                maxDelta: 1, //{Integer} Maximum delta to collect before breaking from the current interval.
                delta: 1, //{Integer} When interval is set, delta collects the mousewheel z-deltas of the events that occur within the interval.
                cumulative:false, //{Boolean} When interval is set: true to collect all the mousewheel z-deltas, false to only record the delta direction (positive or negative)
            }
        }))
    }
    if(moduleConfig.submap[genericIndex].controls.layerSwitcher){
        controls.push(new OpenLayers.Control.LayerSwitcher())
    }

    var map = new OpenLayers.Map({
        controls: controls,
        tranitionEffect: 'resize',
        numZoomLevels: 18,
        projection: new OpenLayers.Projection("EPSG:900913"),
        displayProjection: new OpenLayers.Projection("EPSG:4326"),
        units: 'm',
        allOverlays: false
    });
    var layers = [];
    var format = new OpenLayers.Format.CQL();
    var base = new OpenLayers.Layer.WMS(
            moduleConfig.submap[genericIndex].baseLayer.name,
            moduleConfig.submap[genericIndex].baseLayer.url,
    {layers: 'OSM-WMS'}, {transitionEffect: 'resize', opacity: 0.5, ratio: 1, isBaseLayer: true});

    /*var googleBaseLayer = new OpenLayers.Layer.Google("Google",
      {
        'sphericalMercator':true,
        type: google.maps.MapTypeId.HYBRID,
        'maxExtent': new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34)
      }
    )*/

    

    var gmap = new OpenLayers.Layer.Google(
        "Google Streets", // the default
        { numZoomLevels: 20, visibility: false,isBaseLayer: true}
    );

    map.addLayers([gmap]);

    Ext.each(moduleConfig.submap[genericIndex].extraLayers, function(layer, index) {
        var extraLayer = new OpenLayers.Layer.WMS(
            layer.name,
            layer.url,
        {layers: 'OSM-WMS'}, {transitionEffect: 'resize', opacity: 1, ratio: 1, isBaseLayer: false});
        map.addLayers([extraLayer]);
    });

    //        var click = new OpenLayers.Control.Click();
    //        map.addControl(click);
    //        click.activate();

        //// INICIO - Centrar el mapa
        var pointCenter =  new OpenLayers.LonLat(-8245896.5752931, 515376.39934128);

        if(!Ext.isEmpty(globalMapCenter))
        {
            pointCenter =  new OpenLayers.LonLat(globalMapCenter.lng, globalMapCenter.lat);
                
            if(!Ext.isEmpty(globalMapCenter.proj) && globalMapCenter.proj == 'EPSG:4326')
            {
                var proj = new OpenLayers.Projection('EPSG:4326');
                pointCenter.transform(proj, map.getProjectionObject());
            }
        }
        //// FIN - Centrar el mapa

        Ext.define('LoadPrincipal.view.Generics.MapMulti'+ suffixName, 
        {
            extend: 'GeoExt.panel.Map',
            alias: 'widget.' + AppGlobals.mapAlias + genericIndex,

            id: AppGlobals.mapId + genericIndex,
            map: map,
            center: pointCenter,
            zoom: 12,
            stateful: true,
            layout: 'fit',
            height: '100%',
            //margin: '0 5 0 5',
            title: moduleConfig.submap[genericIndex].title,
            dockedItems: [],
            initComponent: function () 
            {
                this.callParent();
            },
        });
  });
}
