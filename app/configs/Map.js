var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'blue';
moduleConfig.template = 'Map';
moduleConfig.lateralPanel = 'left';
moduleConfig.serviceUrl = 'temptable.php';
moduleConfig.serviceUrlCombo = 'columnas.php';
moduleConfig.serviceMapList = controller.toLowerCase() + '@index';
moduleConfig.serviceAuditUpdate = controller.toLowerCase() + '@update';
moduleConfig.serviceAuditStore = controller.toLowerCase() + '@store';
moduleConfig.serviceAuditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.serviceExport = controller.toLowerCase() + '@excel';
moduleConfig.exportFilter = '';
moduleConfig.listPageSize = 10;
moduleConfig.tmpId = 0;
moduleConfig.layer = '';

moduleConfig.services = new Object();
moduleConfig.services.url = 'temptable.php';
moduleConfig.services.urlCombo = 'columnas.php';
moduleConfig.services.mapList = controller.toLowerCase() + '@index';
moduleConfig.services.auditUpdate = controller.toLowerCase() + '@update';
moduleConfig.services.auditStore = controller.toLowerCase() + '@store';
moduleConfig.services.auditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.services.export = controller.toLowerCase() + '@excel';

moduleConfig.map = new Object();
moduleConfig.map.title = 'Mapa de pruebas';
moduleConfig.map.topButtons = [];
moduleConfig.map.bottomButtons = [];

moduleConfig.map.baseLayer = new Object();
moduleConfig.map.baseLayer.url= 'http://ows.terrestris.de/osm/service?';
moduleConfig.map.baseLayer.name = 'Capa principal';

moduleConfig.map.extraLayers = [];
moduleConfig.map.extraLayers[0] = new Object;
moduleConfig.map.extraLayers[0].url = 'http://190.85.84.228/geoserver/tlcsa_capas/wms?LAYERS=tlcsa_capas%3Avista_vehiculo_tlcsa&STYLES=vehiculos_reload&FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&CQL_FILTER=(zona%20like%20%27%25%2C864071%2C%25%27%20)&_OLSALT=0.16134086236622303&SRS=EPSG%3A900913&BBOX=-8246745.8594609,516582.43477385,-8245534.8102941,517506.84508453&WIDTH=1014&HEIGHT=774';
moduleConfig.map.extraLayers[0].name = 'Tlcsa1';
moduleConfig.map.extraLayers[1] = new Object;
moduleConfig.map.extraLayers[1].url = 'http://190.85.84.228/geoserver/tlcsa_capas/wms?LAYERS=tlcsa_capas%3Avista_vehiculo_tlcsa&STYLES=vehiculos_reload&FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&CQL_FILTER=(zona%20like%20%27%25%2C864071%2C%25%27%20)&_OLSALT=0.16134086236622303&SRS=EPSG%3A900913&BBOX=-8246745.8594609,516582.43477385,-8245534.8102941,517506.84508453&WIDTH=1014&HEIGHT=774';
moduleConfig.map.extraLayers[1].name = 'Tlcsa2';


moduleConfig.map.controls = new Object();
moduleConfig.map.controls.panPanel = true;
moduleConfig.map.controls.mousePosition = true;
moduleConfig.map.controls.zoomPanel = true;
moduleConfig.map.controls.navigation = true;
moduleConfig.map.controls.layerSwitcher = true;
