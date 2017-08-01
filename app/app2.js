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

Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'js/ext-4.2.1/examples/ux');
//Ext.require([
//    'Ext.grid.*',
//    'Ext.data.*',
//    'Ext.util.*',
//    'Ext.state.*',
//    'Ext.panel.Panel',
//    'Ext.view.View',
//    'Ext.layout.container.Fit',
//    'Ext.toolbar.Paging',
//    'Ext.ux.form.SearchField',
//    'Ext.ux.DataTip',
//    'Ext.ux.Spotlight',
//    'Ext.selection.CheckboxModel',
//    'Ext.ux.grid.FiltersFeature',
//    'Ext.tab.*',
//    'Ext.window.*',
//    'Ext.tip.*',
//    'Ext.layout.container.Border',
//    'Ext.Action'
//
//]);
Ext.define('AppGlobals', { 
    singleton: true, 
    filterAlias: 'Alias'+controller+'Filter', 
    filterId: 'Alias'+controller+'Filter', 
    listAlias: 'Alias'+controller+'List', 
    listId: 'Id'+controller+'List', 
    formAlias: 'Alias'+controller+'Form', 
    formId: 'Id'+controller+'Form', 
    windowAlias: 'Alias'+controller+'Window', 
    windowId: 'Id'+controller+'Window', 
    templates: 'Templates', 
    gridAlias: 'Alias'+controller+'Grid', 
    gridId: 'Alias'+controller+'Grid', 
//    menu: 'Config|Breach|Client|Vehicle|Brand|ChargeUnit|Station|User|Message|Audit|login/logout',
//    menuLang: 'Configuraciones|Infracciones|Clientes|Vehiculos|Marcas|UnidadesCarga|Estaciones|Usuarios|Comunicados|Auditoria|Salir',
    menu: 'Config|Client|Vehicle|Brand|ChargeUnit|Station|User|login/logout',
    menuLang: 'Configuraciones|Clientes|Vehiculos|Marcas|Unidades_de_Carga|Estaciones|Usuarios|Salir',
    required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',
});
Ext.application({
    requires: [
        'Ext.container.Viewport',
        moduleConfig.appName+'.lib.Form.Field.VTypes',
    ],
    name: moduleConfig.appName,
    controllers: [controller],
    views: ['globalVars'],
    appFolder: 'app',
    launch: function() {
//        moduleConfig.appName
        Ext.namespace('com.myclass.store'); 
        Ext.namespace('com.myclass.model');
        Ext.create(moduleConfig.appName+'.lib.Form.Field.VTypes').init();
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", 'css/'+ moduleConfig.theme+'.css')
        if (typeof fileref!="undefined"){
                document.getElementsByTagName("head")[0].appendChild(fileref)
        }
    }
});