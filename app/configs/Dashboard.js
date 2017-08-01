var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'blue';
moduleConfig.template = 'Dashboard';
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

moduleConfig.dashboard = new Object();
moduleConfig.dashboard.title = 'SalesUp';
moduleConfig.dashboard.topButtons = [];
moduleConfig.dashboard.bottomButtons = [];


moduleConfig.dashboard.tab = [];
moduleConfig.dashboard.tab[0] = new Object;
moduleConfig.dashboard.tab[0].url = '?m=MapChart';
moduleConfig.dashboard.tab[0].name = 'Mapa Gráfico';
moduleConfig.dashboard.tab[0].image = 'search.fw';
moduleConfig.dashboard.tab[1] = new Object;
moduleConfig.dashboard.tab[1].url = '?m=MapForm';
moduleConfig.dashboard.tab[1].name = 'Mapa Formulario';
moduleConfig.dashboard.tab[1].image = 'stats.fw';
moduleConfig.dashboard.tab[2] = new Object;
moduleConfig.dashboard.tab[2].url = '?m=MapChartList';
moduleConfig.dashboard.tab[2].name = 'Mapa Gráfico Lista';
moduleConfig.dashboard.tab[2].image = 'devices.fw';
moduleConfig.dashboard.tab[3] = new Object;
moduleConfig.dashboard.tab[3].url = '?m=Chart';
moduleConfig.dashboard.tab[3].name = 'Gráffico';
moduleConfig.dashboard.tab[3].image = 'devices.fw';
moduleConfig.dashboard.tab[4] = new Object;
moduleConfig.dashboard.tab[4].url = '?m=Map';
moduleConfig.dashboard.tab[4].name = 'Mapa';
moduleConfig.dashboard.tab[4].image = 'search.fw';
moduleConfig.dashboard.tab[5] = new Object;
moduleConfig.dashboard.tab[5].url = '?m=Station';
moduleConfig.dashboard.tab[5].name = 'Lista';
moduleConfig.dashboard.tab[5].image = 'stats.fw';


moduleConfig.dashboard.resume = new Object();
moduleConfig.dashboard.resume.lastLogin = '';
moduleConfig.dashboard.resume.notifiations = true;
moduleConfig.dashboard.resume.profile = true;
moduleConfig.dashboard.resume.groups = true;

moduleConfig.form = new Object();
moduleConfig.form.title = 'Resumen';


moduleConfig.form.items = [
    {
        xtype: 'displayfield',
        fieldLabel: 'Last login',
        id: controller + 'FilterStatus',
        name: controller + 'FilterStatus',
        value: '2015-08-12 17:55',
        width: '99%',
        labelAlign: 'left',
        labelWidth: '50%',
    },
    {
        xtype: 'displayfield',
        fieldLabel: 'Grupos',
        id: controller + 'FilterStatus1',
        name: controller + 'FilterStatus1',
        value: 'Operadores, Supervisores, Consultores, Estadistas',
        width: '99%',
        labelAlign: 'left',
        labelWidth: '50%',
    },
    {
        xtype: 'displayfield',
        fieldLabel: 'Ultimas notificaciones',
        id: controller + 'FilterStatus2',
        name: controller + 'FilterStatus2',
        value: '25',
        width: '99%',
        labelAlign: 'left',
        labelWidth: '50%',
    },
    {
        xtype: 'displayfield',
        fieldLabel: 'Perfil',
        id: controller + 'FilterStatus3',
        name: controller + 'FilterStatus3',
        value: 'Supervisor norte',
        width: '99%',
        labelAlign: 'left',
        labelWidth: '50%',
    }    
    
];
moduleConfig.grid = new Object();
moduleConfig.grid.title = 'Favoritos';
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
    }
];