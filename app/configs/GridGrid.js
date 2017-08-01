var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'blue';
moduleConfig.template = 'GridGrid';
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



moduleConfig.subgrid = [];
moduleConfig.subgrid[0] = new Object();
moduleConfig.subgrid[0].title = 'Segundo Grid';
moduleConfig.subgrid[0].searchField = true;
moduleConfig.subgrid[0].searchTitle = 'Búsqueda';
moduleConfig.subgrid[0].searchId = 'listSearchKeyword';
moduleConfig.subgrid[0].pageSize = 15;
moduleConfig.subgrid[0].topButtons = [];
moduleConfig.subgrid[0].contextualMenu = [];
moduleConfig.subgrid[0].tooltip = true;
moduleConfig.subgrid[0].tooltipField = 'name';
moduleConfig.subgrid[0].checkboxIndex = 0;
moduleConfig.subgrid[0].idField = 'id_station';
moduleConfig.subgrid[0].columns = [
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
    }
];
moduleConfig.subgrid[0].store =  'ResourceTracking.List';


moduleConfig.subgrid[1] = new Object();
moduleConfig.subgrid[1].title = 'Estaciones';
moduleConfig.subgrid[1].searchField = true;
moduleConfig.subgrid[1].searchTitle = 'Búsqueda';
moduleConfig.subgrid[1].searchId = 'listSearchKeyword';
moduleConfig.subgrid[1].pageSize = 15;
moduleConfig.subgrid[1].topButtons = [];
moduleConfig.subgrid[1].contextualMenu = [];
moduleConfig.subgrid[1].tooltip = true;
moduleConfig.subgrid[1].tooltipField = 'name';
moduleConfig.subgrid[1].checkboxIndex = 0;
moduleConfig.subgrid[1].idField = 'id_station';
moduleConfig.subgrid[1].columns = [
    {
        text: 'Nombre1',
        dataIndex: 'name1',
        width: '20%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Direcci\xf3n Ip1',
        dataIndex: 'ip_address1',
        width: '10%',
        align: 'left',
        sortable: true
    }
];
moduleConfig.subgrid[1].store =  'ResourceTracking.List';;
