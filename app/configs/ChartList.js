var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'ChartList';
moduleConfig.lateralPanel = 'left';
moduleConfig.serviceUrl = 'temptable.php';
moduleConfig.serviceUrlCombo = 'columnas.php';
moduleConfig.serviceMapList = controller.toLowerCase() + '@index';
moduleConfig.serviceAuditUpdate = controller.toLowerCase() + '@update';
moduleConfig.serviceAuditStore = controller.toLowerCase() + '@store';
moduleConfig.serviceAuditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.serviceExport = controller.toLowerCase() + '@excel';

moduleConfig.services = new Object();
moduleConfig.services.url = 'temptable.php';
moduleConfig.services.urlCombo = 'columnas.php';
moduleConfig.services.mapList = controller.toLowerCase() + '@index';
moduleConfig.services.auditUpdate = controller.toLowerCase() + '@update';
moduleConfig.services.auditStore = controller.toLowerCase() + '@store';
moduleConfig.services.auditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.services.export = controller.toLowerCase() + '@excel';

moduleConfig.exportFilter = '';
moduleConfig.map = new Object();
moduleConfig.map.title = 'Mapa de pruebas';
moduleConfig.map.topButtons = [];
moduleConfig.map.bottomButtons = [];

moduleConfig.map.baseLayer = new Object();
moduleConfig.map.baseLayer.url = 'http://ows.terrestris.de/osm/service?';
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


moduleConfig.chart = new Object();
moduleConfig.chart.title = 'Gráficos d prueba';
moduleConfig.chart.searchField = true;
moduleConfig.chart.searchTitle = 'Búsqueda';
moduleConfig.chart.searchId = 'listSearchKeyword';
moduleConfig.chart.pageSize = 15;
moduleConfig.chart.yTitle = 'Porcentaje de funcionamiento';
moduleConfig.chart.yLabelPreffix = 'is: ';
moduleConfig.chart.yLabelSuffix = '%';
moduleConfig.chart.xTitle = 'Meses del año';
moduleConfig.chart.xLabelPreffix = '';
moduleConfig.chart.xLabelSuffix = '';
moduleConfig.chart.xLabelLength = 3;
moduleConfig.chart.topButtons = [];
moduleConfig.chart.bottomButtons = [
    {
        text: 'Exportar config',
        enableToggle: true,
        defaultAlign: 'right',
        action: 'exportXls',
        toggleHandler: function (btn, pressed) {

        }
    }
];

moduleConfig.chart.axes = true;
moduleConfig.chart.axesYGrid = true;
moduleConfig.chart.axesXGrid = true;
moduleConfig.chart.axesYOdd = false;
moduleConfig.chart.axesXOdd = false;
moduleConfig.chart.axesYLinePos = 'left';
moduleConfig.chart.axesXLinePos = 'bottom';
moduleConfig.chart.axesYFields = ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'];
moduleConfig.chart.axesXFields = ['name'];
moduleConfig.chart.series = [
//    {
//            type: 'radar',
//            xField: 'name',
//            yField: 'data1',
//            style: {
//                opacity: 0.4
//            }
//        },{
//            type: 'radar',
//            xField: 'name',
//            yField: 'data2',
//            style: {
//                opacity: 0.4
//            }
//        },{
//            type: 'radar',
//            xField: 'name',
//            yField: 'data3',
//            style: {
//                opacity: 0.4
//            }
//        }
    {
        type: 'area',
        highlight: true,
        axis: 'left',
        xField: 'name',
        yField: ['data1','data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
        style: {
            opacity: 0.93
        },
    }
//        tips: {
//            trackMouse: true,
//            style: 'background: #e3e3e3',
//            height: 40,
//            width: 200,
//            renderer: function(storeItem, item) {     
//                this.setTitle(storeItem.get('name') + ': ' + storeItem.get(item.series.yField));
//            }
//        }
//    },
//    {
//        type: 'pie',
//        donut: 35,
//        field: 'data2',
//        showInLegend: true,
//        highlight: {
//            segment: {
//                margin: 20
//            }
//        },
//        label: {
//            field: 'name',
//            display: 'rotate',
//            contrast: true,
//            font: '18px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'
//        },
//        animate: true
//    }
];

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
    }
];