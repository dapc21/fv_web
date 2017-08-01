var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'blue';
moduleConfig.template = 'TreeGrid';
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

moduleConfig.window = new Object();
moduleConfig.window.resizable = false;
moduleConfig.window.height = '40%';
moduleConfig.window.width = '70%';
moduleConfig.window.bottomButtons = [];

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
moduleConfig.tree = new Object();
moduleConfig.tree.title = 'Favoritos';
moduleConfig.tree.searchField = true;
moduleConfig.tree.searchTitle = 'Búsqueda';
moduleConfig.tree.searchId = 'treeSearchKeyword';
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
        dataIndex: 'size',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Direcci\xf3n ',
        dataIndex: 'permissions',
        width: '10%',
        align: 'left',
        sortable: true
    },
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
        text: 'Compañia',
        dataIndex: 'company',
        width: '20%',
        align: 'left',
        sortable: true
    },
    {
        text: 'price $$',
        dataIndex: 'price',
        width: '15%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Change',
        dataIndex: 'change',
        width: '20%',
        align: 'left',
        sortable: true
    },
    {
        text: 'PCT',
        dataIndex: 'pctChange',
        width: '20%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Last',
        dataIndex: 'lastChange',
        width: '18%',
        align: 'left',
        sortable: true
    }
];

moduleConfig.form = new Object();
moduleConfig.form.title = 'Nodo de árbol';
moduleConfig.form.topButtons = [];
moduleConfig.form.bottomButtons = [
    {
        text: 'Cancelar',
        id: 'WindosCancelButton',
        action: 'WindowCancelButton',

    }
];
moduleConfig.form.contextualMenu = [];
moduleConfig.form.items = [];
moduleConfig.form.child1 = [
    {
        xtype: 'hiddenfield',
        name: controller + 'FormId',
        id: controller + 'FormId',
        value: '0'
    },
    {
        xtype: 'displayfield',
        fieldLabel: 'Padre',
        name: controller + 'FormParent',
        id: controller + 'FormParent',
        columnWidth: 0.99,
        emptyText: 'Marca',
        allowBlank: false,
        afterLabelTextTpl: AppGlobals.required,
        width: '99%',
        hidden: false,
        minLength: 3,
        vtype: 'alphabetic',
        minLengthText: 'El campo nombre marca debe contener 3 caracteres como m\xednimo.'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Nombre',
        name: controller + 'FormName',
        id: controller + 'FormNAme',
        columnWidth: 0.99,
        emptyText: 'Nombre',
        allowBlank: false,
        afterLabelTextTpl: AppGlobals.required,
        width: '99%',
        hidden: false,
        minLength: 3,
        vtype: 'specialchars',
        minLengthText: 'El campo referencia marca debe contener 3 caracteres como m\xednimo.'
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 0.05},
    
];
moduleConfig.form.child2 = [
    {
        xtype: 'hiddenfield',
        name: controller + 'FormId',
        id: controller + 'FormId',
        value: '0'
    },
    {
        xtype: 'displayfield',
        fieldLabel: 'Padre',
        name: controller + 'FormParent',
        id: controller + 'FormParent',
        columnWidth: 0.99,
        emptyText: 'Marca',
        allowBlank: false,
        afterLabelTextTpl: AppGlobals.required,
        width: '99%',
        hidden: false,
        minLength: 3,
        vtype: 'alphabetic',
        minLengthText: 'El campo nombre marca debe contener 3 caracteres como m\xednimo.'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Nombre',
        name: controller + 'FormName',
        id: controller + 'FormNAme',
        columnWidth: 0.99,
        emptyText: 'Nombre',
        allowBlank: false,
        afterLabelTextTpl: AppGlobals.required,
        width: '99%',
        hidden: false,
        minLength: 3,
        vtype: 'specialchars',
        minLengthText: 'El campo referencia marca debe contener 3 caracteres como m\xednimo.'
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 0.05},
    
    {
        xtype: 'textfield',
        fieldLabel: 'Propiedad',
        id: controller + 'FormProperty',
        name: controller + 'FormProperty',
        columnWidth: 0.99,
        minChars: 0,
        width: '99%',
        labelWidth: '50%',
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
];