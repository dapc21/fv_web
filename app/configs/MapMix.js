var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'blue';
moduleConfig.template = 'MapGrid';
moduleConfig.lateralPanel = 'left';
moduleConfig.serviceUrl = 'temptable.php';
moduleConfig.serviceUrlCombo = 'columnas.php';
moduleConfig.serviceMapList = controller.toLowerCase() + '@index';
moduleConfig.serviceAuditUpdate = controller.toLowerCase() + '@update';
moduleConfig.serviceAuditStore = controller.toLowerCase() + '@store';
moduleConfig.serviceAuditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.serviceExport = controller.toLowerCase() + '@excel';
moduleConfig.exportFilter = '';

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


moduleConfig.grid = new Object();
moduleConfig.grid.title = 'Estaciones';
moduleConfig.grid.searchField = true;
moduleConfig.grid.searchTitle = 'Búsqueda';
moduleConfig.grid.searchId = 'listSearchKeyword';
moduleConfig.grid.pageSize = 15;
moduleConfig.grid.topButtons = [];
moduleConfig.grid.contextualMenu = [];
moduleConfig.grid.tooltip = true;
moduleConfig.grid.tooltipField = 'name';
moduleConfig.grid.checkboxIndex = 0;
moduleConfig.grid.idField = 'id_station',
moduleConfig.grid.columns = [
    {
        text: 'Nombre',
        dataIndex: 'name',
        width: '20%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Direcci\xf3n Ip',
        dataIndex: 'ip_address',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Direcci\xf3n Ip respaldo',
        dataIndex: 'ip_address_backup',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Estado',
        dataIndex: 'stationstatus.status',
        width: '10%',
        align: 'left',
        sortable: false
    },
    {
        text: 'Im\xe1gen',
        dataIndex: 'image',
        width: '10%',
        align: 'center',
        sortable: false
    },
    {
        text: 'Transformador',
        dataIndex: 'transftype.name',
        width: '10%',
        align: 'left',
        sortable: false
    },
    {
        text: 'Direcci\xf3n',
        dataIndex: 'address',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Barrio',
        dataIndex: 'neighbourhood',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Localidad',
        dataIndex: 'district',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Zona',
        dataIndex: 'stationzone.zone',
        width: '10%',
        align: 'left',
        sortable: false
    },
    {
        text: 'Raz\xf3n social',
        dataIndex: 'business_name_owner',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Representante legal',
        dataIndex: 'name_owner',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Contacto',
        dataIndex: 'name_contact',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Identificaci\xf3n',
        dataIndex: 'rut_owner',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'NIT',
        dataIndex: 'nit_owner',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Tel\xe9fono contacto',
        dataIndex: 'telephone_contact',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Celular contacto',
        dataIndex: 'celular_contact',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Email contacto',
        dataIndex: 'email_contact',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Nombre',
        dataIndex: 'name_administrator',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Apellidos',
        dataIndex: 'last_name_administrator',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Tel\xe9fono administrador',
        dataIndex: 'telephone_administrator',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Celular administrador',
        dataIndex: 'celular_administrator',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Email administrador',
        dataIndex: 'email_administrator',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Nombre',
        dataIndex: 'name_responsible',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Apellidos',
        dataIndex: 'last_name_responsible',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Tel\xe9fono codensa',
        dataIndex: 'telephone_responsible',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Celular codensa',
        dataIndex: 'celular_responsible',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Email codensa',
        dataIndex: 'email_responsible',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    }
];