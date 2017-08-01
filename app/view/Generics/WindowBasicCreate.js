/**
 * Generic Window Basic
 * 
 * @xtype Ext.window.Window
 * @requires 
 * @author Daniel Peña
 */
Ext.define('LoadPrincipal.view.Generics.WindowBasicCreate', {
    extend      : 'Ext.window.Window',
    requires    : [
        //
    ],
    id          : AppGlobals.windowBasicId,
    title       : 'Crear/Editar',
    alias       : 'widget.' + AppGlobals.windowBasicAlias,
    modal       : true,
    width       : (moduleConfig.WindowBasic.width)?moduleConfig.WindowBasic.width:'70%',
    height      : (moduleConfig.WindowBasic.height)?moduleConfig.WindowBasic.height:'70%',
    minWidth    : (moduleConfig.WindowBasic.width)?moduleConfig.WindowBasic.width:'70%',
    minHeight   : (moduleConfig.WindowBasic.height)?moduleConfig.WindowBasic.height:'70%',
    layout      : 'fit',
    resizable   : (moduleConfig.WindowBasic.resizable)?true:false,
    draggable   : false,
    closeAction : 'destroy',
    autoScroll  : true,
    autoDestroy : true
});