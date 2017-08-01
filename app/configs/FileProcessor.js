var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'Tabs';
moduleConfig.lateralPanel = 'left';
moduleConfig.services = new Object();
moduleConfig.services.url = 'temptable.php';
moduleConfig.services.listUrl = 'http://192.168.1.160/processor/public/objects/id/columns';
moduleConfig.services.listProcessUrl = 'http://192.168.1.100/processor/public/processes';
moduleConfig.services.listInsertedUrl = 'http://192.168.1.100/processor/public/processes/id/new';
moduleConfig.services.listDuplicatedUrl = 'http://192.168.1.100/processor/public/processes/id/duplicated';
moduleConfig.services.listDuplicatedActionUrl = 'http://192.168.1.100/processor/public/registers/id';
moduleConfig.services.listErrorUrl = 'http://192.168.1.100/processor/public/processes/id/error';
moduleConfig.services.listCommitUrl = 'http://192.168.1.100/processor/public/processes/id/commit';
moduleConfig.services.listRollbackUrl = 'http://192.168.1.100/processor/public/processes/id/rollback';
moduleConfig.services.moduleComboUrl = 'http://192.168.1.100/processor/public/objects';
moduleConfig.services.storedMappingComboUrl = 'http://192.168.1.100/processor/public/maps';
moduleConfig.services.storedMappingDetailUrl = 'http://192.168.1.100/processor/public/maps/id/details';
moduleConfig.services.fileTypeComboUrl = 'server/FileProcessor/file_type.php';
moduleConfig.services.encodingComboUrl = 'server/FileProcessor/encoding.php';
moduleConfig.services.separatorComboUrl = 'server/FileProcessor/separator.php';
moduleConfig.services.mapList = controller.toLowerCase() + '@index';
moduleConfig.services.auditUpdate = controller.toLowerCase() + '@update';
moduleConfig.services.auditStore = controller.toLowerCase() + '@store';
moduleConfig.services.auditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.services.export = controller.toLowerCase() + '@excel';
moduleConfig.exportFilter = '';
moduleConfig.listPageSize = 10;
moduleConfig.tmpId = 0;
moduleConfig.layer = '';

moduleConfig.tabs = new Object;
moduleConfig.tabs.bottomButtons = [
    {
        text: 'Procesar',
        action: controller + 'Process',
        id: controller + 'Process',
        iconCls: 'add-button',
        hidden: true,
        submenu: false,
        items: []
    },
    {
        text: 'Commit',
        action: controller + 'Commit',
        id: controller + 'Commit',
        iconCls: 'add-button',
        idProcess: 0,
        hidden: true,
        submenu: false,
        items: []
    },
    {
        text: 'Rollback',
        action: controller + 'Rollback',
        id: controller + 'Rollback',
        iconCls: 'add-button',
        idProcess: 0,
        hidden: true,
        submenu: false,
        items: []
    },
    {
        text: 'Anterior',
        id: controller + 'PrevTab',
        action: controller + 'PrevTab',
        iconCls: 'add-button',
        submenu: false,
        hidden: true,
        items: []
    },
    {
        text: 'Siguiente',
        action: controller + 'NextTab',
        id: controller + 'NextTab',
        iconCls: 'add-button',
        disabled: true,
        submenu: false,
        items: []
    },
];
moduleConfig.tab = [];
moduleConfig.tab[0] = new Object;
moduleConfig.tab[0].alias = AppGlobals.formAlias+'2';;
moduleConfig.tab[0].name = 'Módulo';
moduleConfig.tab[0].id = controller + 'Module';
moduleConfig.tab[0].image = '';
moduleConfig.tab[1] = new Object;
moduleConfig.tab[1].alias = AppGlobals.formAlias;
moduleConfig.tab[1].name = 'Config';
moduleConfig.tab[1].id = controller + 'Config';
moduleConfig.tab[1].image = '';
moduleConfig.tab[1].disabled = true;
moduleConfig.tab[2] = new Object;
moduleConfig.tab[2].alias = AppGlobals.formAlias+'1';
moduleConfig.tab[2].name = 'Seleccionar Archivo';
moduleConfig.tab[2].id = controller + 'SelectFile';
moduleConfig.tab[2].image = '';
moduleConfig.tab[2].disabled = true;
moduleConfig.tab[3] = new Object;
moduleConfig.tab[3].alias = AppGlobals.formAlias+'3';
moduleConfig.tab[3].name = 'Mapeo Información';
moduleConfig.tab[3].id = controller + 'Mapping';
moduleConfig.tab[3].image = '';
moduleConfig.tab[3].disabled = true;
moduleConfig.tab[4] = new Object;
moduleConfig.tab[4].alias = AppGlobals.listAlias+'2';
moduleConfig.tab[4].name = 'Cola de Progreso';
moduleConfig.tab[4].id = controller + 'Progress';
moduleConfig.tab[4].image = '';
//moduleConfig.tab[4].disabled = true;
moduleConfig.tab[5] = new Object;
moduleConfig.tab[5].alias = AppGlobals.tabsAlias+'Multi';
moduleConfig.tab[5].name = 'Resultados';
moduleConfig.tab[5].id = controller + 'Results';
moduleConfig.tab[5].image = '';
//moduleConfig.tab[5].disabled = true;

moduleConfig.subform = [];

/**
 * Tab 1 items
 */

moduleConfig.subform[2] = new Object();
moduleConfig.subform[2].items = [
    {
        xtype: 'combobox',
        id: controller + 'FormModule',
        name: controller + 'FormModule',
//        anchor: '100%',
        columnWidth: 0.39,
        fieldLabel: 'Seleccione el módulo',
        store: controller + '.ListComboModule',
        loadingText: 'Buscando...',
        emptyText: 'Selecciona estado',
        typeAhead: true,
        forceSelection: true,
        displayField: 'name',
        valueField: 'id_object',
        allowBlank: false
    },

    {xtype: 'label', html: '&nbsp;', columnWidth: 1},       
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
    {
        xtype: 'panel',
        columnWidth: 0.99,
        height: 400,
        layout: 'fit',
        items:  [
            {
                xtype: AppGlobals.listAlias
            }
        ]            
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
moduleConfig.grid.idField = 'id_column',
moduleConfig.grid.columns = [
    {
        text: 'Nombre Campo',
        dataIndex: 'sql_name',
        width: '23%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Tipo de dato',
        dataIndex: 'label_type',
        width: '15%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Longitud',
        dataIndex: 'size',
        width: '15%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Índice único',
        dataIndex: 'is_unique',
        width: '15%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Requerido',
        dataIndex: 'is_mandatory',
        width: '15%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Valor por defecto',
        dataIndex: 'default',
        width: '15%',
        align: 'left',
        sortable: true
    }
];

/**
 * 
 * End tab 1
 */

/**
 * 
 * Tab 2 Items
 */

moduleConfig.form = new Object();
moduleConfig.form.title = '';
moduleConfig.form.border = false;


moduleConfig.form.csv = [
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
    {
        xtype: 'combobox',
        fieldLabel: 'Separador',
        id: controller + 'FormSeparator',
        name: controller + 'FormSeparator',
        columnWidth: 0.99,
        store: controller + '.ListComboSeparator',
        loadingText: 'Buscando...',
        emptyText: 'Selecciona estado',
        typeAhead: true,
        forceSelection: true,
        displayField: 'type',
        valueField: 'id',
        disabled: true,
        allowBlank: false
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
    {
        xtype: 'combobox',
        fieldLabel: 'Codificación',
        id: controller + 'FormEncode',
        name: controller + 'FormEncode',
        columnWidth: 0.99,
        store: controller + '.ListComboEncoding',
        loadingText: 'Buscando...',
        emptyText: 'Selecciona estado',
        typeAhead: true,
        forceSelection: true,
        displayField: 'type',
        valueField: 'id',
        disabled: true,
        allowBlank: false
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
];

moduleConfig.form.items = [
    {xtype: 'label', html: '&nbsp;', columnWidth: 0.2},
    {
        xtype: 'combobox',
        fieldLabel: 'Tipo de Archivo',
        id: controller + 'FormFiletype',
        name: controller + 'FormFiletype',
        columnWidth: 0.6,
        store: controller + '.ListComboFileType',
        loadingText: 'Buscando...',
        emptyText: 'Selecciona estado',
        typeAhead: true,
        forceSelection: true,
        displayField: 'type',
        valueField: 'id',
        allowBlank: false
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 0.2},
    {xtype: 'label', html: '&nbsp;', columnWidth: 0.21},
    {
        xtype: 'fieldset',
        title: 'Propiedades por tipo de archivo',
        id: controller + 'FilterFileFieldset',
        name: controller + 'FilterFileFieldset',
        value: 'Operadores, Supervisores, Consultores, Estadistas',
        columnWidth: 0.58,
        layout: 'column',
        items: moduleConfig.form.csv
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 0.19},
    {xtype: 'label', html: '&nbsp;', columnWidth: 0.70},
    {
        xtype: 'checkboxfield',
        fieldLabel: 'Tiene cabeceras',
        id: controller + 'FormHasHeaders',
        name: controller + 'FormHasHeaders',
        inputValue: '1',
        labelAlign: 'right',
        value: 'valor',
        columnWidth: 0.25,
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 0.2},
    {xtype: 'label', html: '&nbsp;', columnWidth: 0.35},
    {
        xtype: 'numberfield',
        fieldLabel: 'Fila con  el primer dato',
        id: controller + 'FormFirstData',
        name: controller + 'FormFirstData',
        columnWidth: 0.25,
        labelAlign: 'right',
        labelWidth: '90%',
        allowBlank: false,
        minValue: 1,
        value: 1,
        width: '10',
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 0.2}
    
];


/**
 * End tab 2
 */


/**
 * Tab 3 items
 */


moduleConfig.subform[0] = moduleConfig.form.items ;
moduleConfig.subform[1] = new Object();
moduleConfig.subform[1].items = [
    
    {
        xtype: 'container',
//        flex: 1,
        border: false,
//        layout: 'anchor',
//        margin: '10 10 10 10',
        columnWidth: 0.30,
        items: [            
            {
                xtype: 'form',
                anchor: '100%',
                id: controller + 'FormUpload',
                border: false,
                fieldDefaults: {
                    labelAlign: 'top',
                },
                items: [
                    {
                        xtype: 'filefield',
                        id: 'file',
                        name:  'file',
                        fieldLabel: '<b>Selecciona un archivo</b>',
                        anchor: '98%',
                        buttonText: 'Subir archivo',
                        buttonOnly: true,
                        clearOnSubmit: true
                    }
                ]
            }
        ]
    },
    {
        xtype: 'panel',
//        flex: 1,
        border: false,
        layout: 'anchor',
        margin: '10 10 10 10',
        columnWidth: 0.99,
        items: [
            {
                xtype: 'itemselector',
                id: controller + 'FormDuplicityRules',
                name: controller + 'FormDuplicityRules',
                anchor: '100%',
                fieldLabel: 'Reglas de duplicidad',
                buttons: ['add', 'remove'],
//                imagePath: '../ux/images/',
                store: controller + '.List',
                loadingText: 'Buscando...',
                emptyText: 'Selecciona estado',
                typeAhead: true,
                forceSelection: true,
                displayField: 'sql_name',
                valueField: 'id_column',
//                value: ['3', '4', '6'],
                allowBlank: false,
//                msgTarget: '  side',
                fromTitle: 'Campos Disponibles',
                toTitle: 'Campos Seleccionados'
            },

            
        ]
    }
];

/**
 * End tab 3
 */

/**
 * Tab 4 items
 */
moduleConfig.subform[3] = new Object();
moduleConfig.subform[3].items = [
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
    {
        xtype: 'combobox',
        columnWidth: 0.4,
        id: controller + 'FormStoresMappings',
        name: controller + 'FormStoresMappings',
        filedLabel: 'Mapeos guardados',
//        value: 's',
        width: '99%',
        displayField: 'name',
        valueField: 'id_map',
        store: controller + '.ListComboStoredMapping',
        
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
    {
        xtype: 'container',
        columnWidth: 0.99,
        layout: 'column',
        items:[
            {xtype: 'label', html: '&nbsp;', columnWidth: 0.04},
            {
                xtype: 'displayfield',
                columnWidth: 0.20,
                id: controller + '1',
                name: controller + '1',
                filedLabel: 'Cabecera',
                value: 'Cabecera',
                width: '99%',
                labelAlign: 'left',
                labelWidth: '50%',
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 0.04},
            {
                xtype: 'displayfield',
                columnWidth: 0.20,
                id: controller + '2',
                name: controller + '2',
                filedLabel: 'Valor del archivo',
                value: 'Valor del archivo',
                width: '99%',
                labelAlign: 'left',
                labelWidth: '50%',
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 0.04},
            {
                xtype: 'displayfield',
                columnWidth: 0.20,
                id: controller + '3',
                name: controller + '3',
                filedLabel: 'Valor del módulo',
                value: 'Valor del módulo',
                width: '99%',
                labelAlign: 'left',
                labelWidth: '50%',
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 0.04},
            {
                xtype: 'displayfield',
                columnWidth: 0.20,
                id: controller + '4',
                name: controller + '4',
                filedLabel: 'Custom Value',
                value: 'Custom Value',
                width: '99%',
                labelAlign: 'left',
                labelWidth: '50%',
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 0.04},
            {xtype: 'label', html: '&nbsp;', columnWidth: 1}
        ]
    },
    {
        xtype: 'container',
        columnWidth: 0.99,
        id: controller + 'DynamicMap',
        layout: 'column',
        items:[
        ]
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
    {
        xtype: 'container',
        columnWidth: 0.99,
        layout: 'column',
        items:[
            {xtype: 'label', html: '&nbsp;', columnWidth: 0.60},
            {
                xtype: 'checkboxfield',
                fieldLabel: 'Guardar Mapeo',
                id: controller + 'FormSaveMapping',
                name: controller + 'FormSaveMapping',
                inputValue: '1',
                defaultAlign: 'left',
                labelAlign: 'left',
                labelWidth: 100,
                columnWidth: 0.15
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 0.01},
            {
                xtype: 'textfield',
                columnWidth: 0.20,
                id: controller + 'FormMappingName',
                name: controller + 'FormMappingName',
                emptyText: 'Nombre del mapeo',
                filedLabel: 'Custom Value',
                value: '',
                width: '99%',
                labelAlign: 'left',
                labelWidth: '50%',
            },
        ]
    }
   
    
    
];

moduleConfig.subgrid = [];
moduleConfig.subgrid[2] = new Object();
moduleConfig.subgrid[2].title = 'Procesos de carga en curso';
moduleConfig.subgrid[2].searchField = false;
moduleConfig.subgrid[2].searchTitle = 'Búsqueda';
moduleConfig.subgrid[2].searchId = 'listSearchKeyword';
moduleConfig.subgrid[2].pageSize = 15;
moduleConfig.subgrid[2].store = controller + '.ListProcess';
moduleConfig.subgrid[2].topButtons = [];
moduleConfig.subgrid[2].contextualMenu = [];
moduleConfig.subgrid[2].tooltip = true;
moduleConfig.subgrid[2].tooltipField = 'name';
moduleConfig.subgrid[2].checkboxIndex = 0;
moduleConfig.subgrid[2].idField = 'id_station',
moduleConfig.subgrid[2].columns = [
    {
        text: 'Proceso',
        dataIndex: 'file.name',
        width: '20%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Módulo',
        dataIndex: 'object.name',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Nuevas',
        dataIndex: 'new',
        width: '6%',
        align: 'center',
        sortable: true
    },
    {
        text: 'Duplicados',
        dataIndex: 'duplicated',
        width: '6%',
        align: 'center',
        sortable: false
    },
    {
        text: 'Erroneos',
        dataIndex: 'errors',
        width: '6%',
        align: 'center',
        sortable: false
    },
    {
        text: 'Estado',
        dataIndex: 'status',
        width: '10%',
        align: 'center',
        sortable: false
    },
    {
        text: 'Progreso',
        dataIndex: 'processed',
        width: '6%',
        align: 'center',
        sortable: false
    },
    {
        text: 'Total',
        dataIndex: 'total',
        width: '6%',
        align: 'center',
        sortable: false
    },
    {
        text: 'Actualización',
        dataIndex: 'updated_at',
        width: '20%',
        align: 'center',
        sortable: false
    },
    {
        xtype: 'actioncolumn',
        text: 'Acciones',
        dataIndex: 'acciones',
        width: '10%',
        sortable: false,
        menuDisabled: true,
        items: [
            {
                xtype: 'button',
                icon: 'images/icon/full_text.gif',
                action: 'viewResults',
                tooltip: 'Ver Resultados',
                scope: this,
                handler: function(grid, rowIndex, colIndex, item, e, record, row) {
                    Ext.getCmp('IdFileProcessorList2').addEvents('itemresults');
                    Ext.getCmp('IdFileProcessorList2').fireEvent('itemresults', grid, rowIndex, colIndex,item, e, record, row);
                },
                getClass: function(v, meta, rec) {          
                    if(rec.data.status == "PROCESANDO") {
                        return 'x-hide-display';
                    }
                }
            }
        ]
    }
];

/**
 * End tab 4
 */

/**
 * Tab 5 items
 */



moduleConfig.subtab = [];
moduleConfig.subtab[0] = new Object;
moduleConfig.subtab[0].alias = AppGlobals.listAlias+'1';;
moduleConfig.subtab[0].name = 'Guardadas';
moduleConfig.subtab[0].image = '';
moduleConfig.subtab[1] = new Object;
moduleConfig.subtab[1].alias = AppGlobals.listAlias + '3';
moduleConfig.subtab[1].name = 'Duplicadas';
moduleConfig.subtab[1].image = '';
//moduleConfig.subtab[1].disabled = true;
moduleConfig.subtab[2] = new Object;
moduleConfig.subtab[2].alias = AppGlobals.listAlias+'4';
moduleConfig.subtab[2].name = 'Erroneas';
moduleConfig.subtab[2].image = '';
//moduleConfig.subtab[2].disabled = true;


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
moduleConfig.subgrid[1] = new Object();
moduleConfig.subgrid[1].title = 'Guardados';
moduleConfig.subgrid[1].searchField = true;
moduleConfig.subgrid[1].searchTitle = 'Búsqueda';
moduleConfig.subgrid[1].searchId = 'listSearchKeyword';
moduleConfig.subgrid[1].pageSize = 15;
moduleConfig.subgrid[1].store = controller + '.ListInserted';
moduleConfig.subgrid[1].topButtons = [];
moduleConfig.subgrid[1].contextualMenu = [];
moduleConfig.subgrid[1].tooltip = true;
moduleConfig.subgrid[1].tooltipField = 'name';
moduleConfig.subgrid[1].checkboxIndex = 0;
moduleConfig.subgrid[1].idField = 'id_station',
moduleConfig.subgrid[1].columns = [
    {
        text: 'Columnas',
        dataIndex: 'login',
        width: '20%',
        align: 'left',
        sortable: true
    }
];
moduleConfig.subgrid[3] = new Object();
moduleConfig.subgrid[3].title = 'Duplicados';
moduleConfig.subgrid[3].searchField = true;
moduleConfig.subgrid[3].searchTitle = 'Búsqueda';
moduleConfig.subgrid[3].searchId = 'listSearchKeyword';
moduleConfig.subgrid[3].pageSize = 15;
moduleConfig.subgrid[3].store = controller + '.ListDuplicated';
moduleConfig.subgrid[3].topButtons = [];
moduleConfig.subgrid[3].contextualMenu = [];
moduleConfig.subgrid[3].tooltip = true;
moduleConfig.subgrid[3].tooltipField = 'name';
moduleConfig.subgrid[3].checkboxIndex = 0;
moduleConfig.subgrid[3].idField = 'id_station',
moduleConfig.subgrid[3].columns = [
    {
        text: 'Columnas',
        dataIndex: 'login',
        width: '20%',
        align: 'left',
        sortable: true
    }
];
moduleConfig.subgrid[4] = new Object();
moduleConfig.subgrid[4].title = 'Erroneos';
moduleConfig.subgrid[4].searchField = true;
moduleConfig.subgrid[4].searchTitle = 'Búsqueda';
moduleConfig.subgrid[4].searchId = 'listSearchKeyword';
moduleConfig.subgrid[4].pageSize = 15;
moduleConfig.subgrid[4].store = controller + '.ListError';
moduleConfig.subgrid[4].topButtons = [];
moduleConfig.subgrid[4].contextualMenu = [];
moduleConfig.subgrid[4].tooltip = true;
moduleConfig.subgrid[4].tooltipField = 'name';
moduleConfig.subgrid[4].checkboxIndex = 0;
moduleConfig.subgrid[4].idField = 'id_station',
moduleConfig.subgrid[4].columns = [
    {
        text: 'Nombre',
        dataIndex: 'index',
        width: '20%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Fila',
        dataIndex: 'row',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Error',
        dataIndex: 'error',
        width: '10%',
        align: 'left',
        sortable: true
    }
];