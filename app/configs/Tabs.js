var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'Tabs';
moduleConfig.lateralPanel = 'left';
moduleConfig.services = new Object();
moduleConfig.services.url = 'temptable.php';
moduleConfig.services.urlCombo = 'columnas.php';
moduleConfig.services.mapList = controller.toLowerCase() + '@index';
moduleConfig.services.auditUpdate = controller.toLowerCase() + '@update';
moduleConfig.services.auditStore = controller.toLowerCase() + '@store';
moduleConfig.services.auditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.services.export = controller.toLowerCase() + '@excel';
moduleConfig.exportFilter = '';
moduleConfig.listPageSize = 10;
moduleConfig.tmpId = 0;
moduleConfig.layer = '';

moduleConfig.tab = [];
moduleConfig.tab[0] = new Object;
moduleConfig.tab[0].alias = AppGlobals.listAlias;
moduleConfig.tab[0].name = 'Tab1';
moduleConfig.tab[0].image = 'search.fw';
moduleConfig.tab[1] = new Object;
moduleConfig.tab[1].alias = AppGlobals.listAlias+'1';
moduleConfig.tab[1].name = 'tab 2';
moduleConfig.tab[1].image = 'stats.fw';
moduleConfig.tab[2] = new Object;
moduleConfig.tab[2].alias = AppGlobals.listAlias+'2';
moduleConfig.tab[2].name = 'TaB 3';
moduleConfig.tab[2].image = 'devices.fw';



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
moduleConfig.subgrid = [];
moduleConfig.subgrid[1] = new Object();
moduleConfig.subgrid[1].title = 'Favoritos';
moduleConfig.subgrid[1].searchField = true;
moduleConfig.subgrid[1].searchTitle = 'Búsqueda';
moduleConfig.subgrid[1].searchId = 'listSearchKeyword';
moduleConfig.subgrid[1].pageSize = 15;
moduleConfig.subgrid[1].topButtons = [];
moduleConfig.subgrid[1].contextualMenu = [];
moduleConfig.subgrid[1].tooltip = true;
moduleConfig.subgrid[1].tooltipField = 'name';
moduleConfig.subgrid[1].checkboxIndex = 0;
moduleConfig.subgrid[1].idField = 'id_station',
moduleConfig.subgrid[1].columns = [
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
    }    
];
moduleConfig.subgrid[0] = new Object();
moduleConfig.subgrid[0].title = 'Favoritos';
moduleConfig.subgrid[0].searchField = true;
moduleConfig.subgrid[0].searchTitle = 'Búsqueda';
moduleConfig.subgrid[0].searchId = 'listSearchKeyword';
moduleConfig.subgrid[0].pageSize = 15;
moduleConfig.subgrid[0].topButtons = [];
moduleConfig.subgrid[0].contextualMenu = [];
moduleConfig.subgrid[0].tooltip = true;
moduleConfig.subgrid[0].tooltipField = 'name';
moduleConfig.subgrid[0].checkboxIndex = 0;
moduleConfig.subgrid[0].idField = 'id_station',
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
    },
       
];
moduleConfig.subgrid[2] = new Object();
moduleConfig.subgrid[2].title = 'Favoritos';
moduleConfig.subgrid[2].searchField = true;
moduleConfig.subgrid[2].searchTitle = 'Búsqueda';
moduleConfig.subgrid[2].searchId = 'listSearchKeyword';
moduleConfig.subgrid[2].pageSize = 15;
moduleConfig.subgrid[2].topButtons = [];
moduleConfig.subgrid[2].contextualMenu = [];
moduleConfig.subgrid[2].tooltip = true;
moduleConfig.subgrid[2].tooltipField = 'name';
moduleConfig.subgrid[2].checkboxIndex = 0;
moduleConfig.subgrid[2].idField = 'id_station',
moduleConfig.subgrid[2].columns = [
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
    }    
];