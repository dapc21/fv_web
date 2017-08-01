var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'blue';
moduleConfig.template = 'Tree';
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


moduleConfig.tree = new Object();
moduleConfig.tree.title = 'Favoritos';
moduleConfig.tree.searchField = true;
moduleConfig.tree.searchTitle = 'Búsqueda';
moduleConfig.tree.searchId = 'listSearchKeyword';
moduleConfig.tree.pageSize = 15;
moduleConfig.tree.topButtons = [];
moduleConfig.tree.contextualMenu = [];
moduleConfig.tree.tooltip = true;
moduleConfig.tree.tooltipField = 'name';
moduleConfig.tree.checkboxIndex = 0;
moduleConfig.tree.idField = 'id_station',
moduleConfig.tree.columns = [
    {
        xtype: 'treecolumn', //this is so we know which column will show the tree
        text: 'Task',
        sortable: true,
        flex: 2,
        width: '10%',
        dataIndex: 'text'
    },
    {
        text: 'Nombre',
        dataIndex: 'ip_address',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Nombre',
        dataIndex: 'ip_address',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Nombre',
        dataIndex: 'ip_address',
        width: '10%',
        align: 'left',
        sortable: true
    }
];