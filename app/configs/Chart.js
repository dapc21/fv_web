/**
 * 
 * @cfg moduleConfig
 * @type Object moduleConfig
 * Contains the general configuration of the module, service urls grid,map,forms configuration and field, etc
 */
var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'Chart';
moduleConfig.lateralPanel = 'right';
moduleConfig.serviceUrl = 'temptable.php';
moduleConfig.serviceUploadImage = 'files/upload';
moduleConfig.serviceUploadPath = 'resource/station/';

moduleConfig.services = new Object();
moduleConfig.services.url = 'temptable.php';
moduleConfig.services.urlCombo = 'columnas.php';
moduleConfig.services.mapList = controller.toLowerCase() + '@index';
moduleConfig.services.auditUpdate = controller.toLowerCase() + '@update';
moduleConfig.services.auditStore = controller.toLowerCase() + '@store';
moduleConfig.services.auditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.services.export = controller.toLowerCase() + '@excel';

moduleConfig.exportFilter = '';
moduleConfig.tmpId = 0;
moduleConfig.formTpl = '';
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
