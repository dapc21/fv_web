var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'blue';
moduleConfig.template = 'MapForm';
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
moduleConfig.map.baseLayer.url = 'http://ows.terrestris.de/osm/service?';
moduleConfig.map.baseLayer.name = 'Capa principal';

moduleConfig.map.extraLayers = [];
//moduleConfig.map.extraLayers[0] = new Object;
//moduleConfig.map.extraLayers[0].url = 'http://190.85.84.228/geoserver/tlcsa_capas/wms?LAYERS=tlcsa_capas%3Avista_vehiculo_tlcsa&STYLES=vehiculos_reload&FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&CQL_FILTER=(zona%20like%20%27%25%2C864071%2C%25%27%20)&_OLSALT=0.16134086236622303&SRS=EPSG%3A900913&BBOX=-8246745.8594609,516582.43477385,-8245534.8102941,517506.84508453&WIDTH=1014&HEIGHT=774';
//moduleConfig.map.extraLayers[0].name = 'Tlcsa1';
//moduleConfig.map.extraLayers[1] = new Object;
//moduleConfig.map.extraLayers[1].url = 'http://190.85.84.228/geoserver/tlcsa_capas/wms?LAYERS=tlcsa_capas%3Avista_vehiculo_tlcsa&STYLES=vehiculos_reload&FORMAT=image%2Fpng&TRANSPARENT=true&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&CQL_FILTER=(zona%20like%20%27%25%2C864071%2C%25%27%20)&_OLSALT=0.16134086236622303&SRS=EPSG%3A900913&BBOX=-8246745.8594609,516582.43477385,-8245534.8102941,517506.84508453&WIDTH=1014&HEIGHT=774';
//moduleConfig.map.extraLayers[1].name = 'Tlcsa2';


moduleConfig.map.controls = new Object();
moduleConfig.map.controls.panPanel = true;
moduleConfig.map.controls.mousePosition = true;
moduleConfig.map.controls.zoomPanel = true;
moduleConfig.map.controls.navigation = true;
moduleConfig.map.controls.layerSwitcher = true;


moduleConfig.form = new Object();
moduleConfig.form.title = 'Estaciones';
moduleConfig.form.topButtons = [];
moduleConfig.form.bottomButtons = [];
moduleConfig.form.contextualMenu = [];
moduleConfig.form.items = [
    {
        xtype: 'hiddenfield',
        name: controller + 'FormId',
        id: controller + 'FormId',
        value: '0'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Nombre marca',
        name: controller + 'FormName',
        id: controller + 'FormName',
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
        fieldLabel: 'Referencia',
        name: controller + 'FormRef',
        id: controller + 'FormRef',
        columnWidth: 0.47,
        emptyText: 'Referencia',
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
        xtype: 'combo',
        fieldLabel: 'Tipo de carga',
        id: controller + 'FormCharge',
        loadingText: 'Buscando...',
        emptyText: 'Selecciona tipo de carga',
        typeAhead: false,
        forceSelection: true,
        columnWidth: 0.47,
        displayField: 'type',
        valueField: 'id',
        allowBlank: false,
        minChars: 0,
        width: '99%',
        afterLabelTextTpl: AppGlobals.required,
        labelWidth: '50%',
//        store: 'Station.TechType'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Referencia',
        name: controller + 'FormRef1',
        id: controller + 'FormRef1',
        columnWidth: 0.47,
        emptyText: 'Referencia',
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
        xtype: 'combo',
        fieldLabel: 'Tipo de carga',
        id: controller + 'FormCharge1',
        loadingText: 'Buscando...',
        emptyText: 'Selecciona tipo de carga',
        typeAhead: false,
        forceSelection: true,
        columnWidth: 0.47,
        displayField: 'type',
        valueField: 'id',
        allowBlank: false,
        minChars: 0,
        width: '99%',
        afterLabelTextTpl: AppGlobals.required,
        labelWidth: '50%',
//        store: 'Station.TechType'
    },
    {
        xtype: 'combo',
        fieldLabel: 'Conector',
        id: controller + 'FormConnector',
        columnWidth: 0.99,
        typeAhead: false,
        forceSelection: true,
        displayField: 'name',
        emptyText: 'Selecciona un tipo de conector',
        valueField: 'id_connector_type',
        minChars: 0,
        pageSize: 10,
        width: '99%',
        labelWidth: '50%',
//        store: 'Config.ListConnectors'
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
];