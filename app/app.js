//get query string
var qs = document.getElementById("identificador_js").src.match(/\w+=\w+/g);

//array to store variables
var _GET= {};

var t,i = qs.length;
while (i--) {

     //t[0] param name and t[1] value
     t = qs[i].split("=");

     //opc 1: like PHP
     _GET[t[0]] = t[1];

    //opc: vars with same name using eval
    eval('var '+t[0]+'="'+t[1]+'";');
}
//get external param from _GET['controller'] or controller

//Lista de Colores Generales
var arrListColor = [
    '933ec5',
    '006df0',
    '92dc5a',
    'd80027',
    '128e4d',
    'ff8a22',
    '5ec8bd',
    'a8a8a8',
    '9d7050',
    'f34648',
];
//Color botones
var strColorBoton = '1fbad6';

//Tipo de Actividades/Tareas
var globalIconsTypes = [
    'dropoff',
    'pickup',
    'stop',
    'inifin', //Indica el Inicio y el Fin
];
//Tipos de Actividades/Tareas
var globalIconsStatus = [
    'pendiente',
    'checkin',
    'checkoutConFormulario',
    'checkoutSinFormulario'
];
//Tipos de Colores para los markers
var globalIconsColors = [
    'blue',
    'violet',
    'green',
    'red',
    'black',
    'gray',
    'yellow',
    'AB',
];
var globalIconDefault = {
    event:'/images/icon/markers/resources/truckG.png',
    name:'default',
    normal:'/images/icon/markers/resources/truckG.png',
    type:'default'
};

var globalMapCenter = {
    proj: 'EPSG:4326',
    lat: 4.710989,
    lng: -74.072092,
};

if(!Ext.isEmpty(window.localStorage.getItem('map')))
{
    globalMapCenter = Ext.decode(window.localStorage.getItem('map'));
}


//Configuración de los paths (https://github.com/geoext/geoext2)
Ext.Loader.setConfig(
    {
        enabled: true,
        paths: {
                GeoExt: 'js/geoext/src/GeoExt',
                Ext:  'js/ext-4.2.1/src',
                'Ext.ux': 'js/ext-4.2.1/examples/ux',
            }
	}
);

Ext.require([
    'Ext.selection.CellModel',
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.form.*',
    'Ext.ux.CheckColumn',
    'Ext.ux.layout.Center',
//    'Ext.panel.Panel',
//    'Ext.view.View',
//    'Ext.layout.container.Fit',
//    'Ext.toolbar.Paging',
//    'Ext.ux.form.SearchField',
//    'Ext.ux.DataTip',
//    'Ext.ux.Spotlight',
//    'Ext.selection.CheckboxModel',
    'Ext.ux.form.MultiSelect',
    'Ext.ux.form.ItemSelector',
//    'Ext.ux.grid.FiltersFeature',
//    'Ext.tab.*',
//    'Ext.window.*',
//    'Ext.tip.*',
//    'Ext.layout.container.Border',
//    'Ext.Action'
//
'com.datatraffic.plugins.DataRowExpander',
]);
Ext.define('AppGlobals', {
    singleton: true,
    filterAlias: 'Alias'+controller+'Filter',
    filterId: 'Alias'+controller+'Filter',
    listAlias: 'Alias'+controller+'List',
    listId: 'Id'+controller+'List',
    dashboardAlias: 'Alias'+controller+'Dashboard',
    dashboardId: 'Id'+controller+'Dashboard',
    tabsAlias: 'Alias'+controller+'tabs',
    tabsId: 'Id'+controller+'tabs',
    treeAlias: 'Alias'+controller+'tree',
    treeId: 'Id'+controller+'tree',
    mapAlias: 'Alias'+controller+'Map',
    mapId: 'Id'+controller+'Map',
    chartAlias: 'Alias'+controller+'Chart',
    chartId: 'Id'+controller+'Chart',
    formAlias: 'Alias'+controller+'Form',
    formId: 'Id'+controller+'Form',
    windowAlias: 'Alias'+controller+'Window',
    windowId: 'Id'+controller+'Window',
    windowBasicAlias: 'Alias'+controller+'WindowBasic',
    windowBasicId: 'Id'+controller+'WindowBasic',
    templates: 'Templates',
    gridAlias: 'Alias'+controller+'Grid',
    gridId: 'Id'+controller+'Grid',
    TabPanelAlias: 'Alias'+controller+'TabPanel',
    TabPanelId: 'Id'+controller+'TabPanel',
    TabPanelSingleAlias: 'Alias'+controller+'TabPanelSingle',
    TabPanelSingleId: 'Id'+controller+'TabPanelSingle',
    FormPanelAlias: 'Alias'+controller+'FormPanel',
    FormPanelId: 'Id'+controller+'FormPanel',
    FormMapListAlias: 'Alias'+controller+'FormMapList',
    FormMapListId: 'Id'+controller+'FormMapList',
    DashboardAlias: 'Alias'+controller+'DashboardTpl',
    DashboardId: 'Id'+controller+'DashboardTpl',
    TabsAlias: 'Alias'+controller+'TabsTpl',
    TabsId: 'Id'+controller+'TabsTpl',
    TreeAlias: 'Alias'+controller+'TreeTpl',
    TreeId: 'Id'+controller+'TreeTpl',
    TreeGridAlias: 'Alias'+controller+'TreeGridTpl',
    TreeGridId: 'Id'+controller+'TreeGridTpl',
    MapAlias: 'Alias'+controller+'MapTpl',
    MapId: 'Id'+controller+'MapTpl',
    GridGridAlias: 'Alias'+controller+'GridGridTpl',
    GridGridId: 'Id'+controller+'GridGridTpl',
    MapGridAlias: 'Alias'+controller+'MapGridTpl',
    MapGridId: 'Id'+controller+'MapGridTpl',
    MapFormAlias: 'Alias'+controller+'MapFormTpl',
    MapFormId: 'Id'+controller+'MapFormTpl',
    MapFormListAlias: 'Alias'+controller+'MapFormListTpl',
    MapFormListId: 'Id'+controller+'MapFormListTpl',
    MapChartAlias: 'Alias'+controller+'MapChartTpl',
    MapChartId: 'Id'+controller+'MapChartTpl',
    MapChartListAlias: 'Alias'+controller+'MapChartListTpl',
    MapChartListId: 'Id'+controller+'MapChartListTpl',
    ChartAlias: 'Alias'+controller+'ChartTpl',
    ChartId: 'Id'+controller+'ChartTpl',
    ChartListAlias: 'Alias'+controller+'ChartListTpl',
    ChartListId: 'Id'+controller+'ChartListTpl',
    //TabsAlias: 'Alias'+controller+'TabsTpl',
    //TabsId: 'Id'+controller+'TabsTpl',
    //TreeAlias: 'Alias'+controller+'TreeTpl',
    //TreeId: 'Id'+controller+'TreeTpl',
    //TreeGridAlias: 'Alias'+controller+'TreeGridTpl',
    //TreeGridId: 'Id'+controller+'TreeGridTpl',
    //MapAlias: 'Alias'+controller+'MapTpl',
    //MapId: 'Id'+controller+'MapTpl',
    //GridGridAlias: 'Alias'+controller+'GridGridTpl',
    //GridGridId: 'Id'+controller+'GridGridTpl',
    //MapGridAlias: 'Alias'+controller+'MapGridTpl',
    //MapGridId: 'Id'+controller+'MapGridTpl',
    //MapFormAlias: 'Alias'+controller+'MapFormTpl',
    //MapFormId: 'Id'+controller+'MapFormTpl',
    //MapFormListAlias: 'Alias'+controller+'MapFormListTpl',
    //MapFormListId: 'Id'+controller+'MapFormListTpl',
    //MapChartAlias: 'Alias'+controller+'MapChartTpl',
    //MapChartId: 'Id'+controller+'MapChartTpl',
    //MapChartListAlias: 'Alias'+controller+'MapChartListTpl',
    //MapChartListId: 'Id'+controller+'MapChartListTpl',
    MapMultiGridAlias: 'Alias'+controller+'MapMultiGridTpl',
    MapMultiGridId: 'Id'+controller+'MapMultiGridTpl',
    MapGridPanelAlias: 'Alias'+controller+'MapGridPanelTpl',
    MapGridPanelId: 'Id'+controller+'MapGridPanelTpl',
    //ChartAlias: 'Alias'+controller+'ChartTpl',
    //ChartId: 'Id'+controller+'ChartTpl',
    //ChartListAlias: 'Alias'+controller+'ChartListTpl',
    //ChartListId: 'Id'+controller+'ChartListTpl',
    FormGridGridAlias: 'Alias'+controller+'FormGridGridTpl',
    FormGridGridId: 'Id'+controller+'FormGridGridTpl',
//    menu: 'Config|Breach|Client|Vehicle|Brand|ChargeUnit|Station|User|Message|Audit|login/logout',
//    menuLang: 'Configuraciones|Infracciones|Clientes|Vehiculos|Marcas|UnidadesCarga|Estaciones|Usuarios|Comunicados|Auditoria|Salir',
    menu: 'Config|Client|Vehicle|Brand|ChargeUnit|Station|User|login/logout',
    menuLang: 'Configuraciones|Clientes|Vehiculos|Marcas|Unidades_de_Carga|Estaciones|Usuarios|Salir',
    required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
});
var testerObj;
Ext.application({
    requires: [
        'Ext.container.Viewport',
        'LoadPrincipal.lib.Form.Field.VTypes',
    ],
    name: 'LoadPrincipal',
    controllers: [controller],
    views: ['globalVars'],
    appFolder: 'app/',
    launch: function() 
    {
        Ext.Ajax.useDefaultXhrHeader = false;
        Ext.Ajax.cors = true;
//        Ext.Ajax.defaultHeaders = {
//            'X-Session-Token' : 'kfhfOO1k2nQy48BTvODPsDMkvinRK3hoMBQnGaSO4sL91Hjm',
//            'X-OS' : 'android',
//            'X-imei' : 'XCVSDF2343'
//        };
        Ext.History.init();
        Ext.create('LoadPrincipal.lib.Form.Field.VTypes').init();
//        Ext.create('LoadPrincipal.lib.Form.LocalStorage').init();
//        Ext.getDoc().on('keypress', function(event) {
//            console.log(event)
//            if (event.getCharCode() === event.BACKSPACE) {
//                event.stopEvent();
//                console.log('you stopped the refresh event');
//            }
//        });
        var filecss=document.createElement("link");
        filecss.setAttribute("rel", "stylesheet");
        filecss.setAttribute("type", "text/css");
        filecss.setAttribute("href", 'css/'+ moduleConfig.theme+'.css');

        if (typeof filecss!="undefined"){
                document.getElementsByTagName("head")[0].appendChild(filecss);
        }

        /*var fileJS = document.createElement('script');
        fileJS.setAttribute('type', 'text/javascript');
        fileJS.setAttribute('src', 'js/streetviewpanel/script/gxp.js');
        document.getElementsByTagName("head")[0].appendChild(fileJS);*/
        //<script type="text/javascript" src="js/streetviewpanel/script/gxp.js"></script>	

        //Propiedades Utils
        //Limpia los elementos que coincidan con el deleteValue
        Array.prototype.clean = function(deleteValue)
        {
            console.log('Agregando propiedad clean a los arrays');
            for (var i = 0; i < this.length; i++) {
                if (this[i] == deleteValue) {
                    this.splice(i, 1);
                    i--;
                }
            }
            return this;
        };

        //Ver lo que se cargó y en qué orden
        //console.log('Todo lo cargado:', Ext.Loader.history);
    }
});



function changePageMenu(strPage)
{
	console.log('Redirect -> ' + strPage);
	
	strURL = decodeURIComponent(window.location.href.toString().split('?')[0]);
	strPage = decodeURIComponent('?m=' + strPage);
	
	//Eliminamos el token de autenticación
	if(strPage == 'Login')
		window.localStorage.removeItem('token');
	
	window.location.replace(strURL + strPage);
}
