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
