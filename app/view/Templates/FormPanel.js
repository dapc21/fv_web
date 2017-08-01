/**
 * Generic and Template form panel
 * 
 * @xtype Ext.form.Panel
 * @requires LoadPrincipal.views.Generics.Form
 * @author Daniel Peña
 */
Ext.define('LoadPrincipal.view.Templates.FormPanel', {
    extend   : 'Ext.form.Panel',
    alias    : 'widget.' + AppGlobals.FormPanelAlias,
    id       : AppGlobals.FormPanelId,
    requires : ['LoadPrincipal.view.Generics.Form'],
    title    : moduleConfig.form.title,
    fieldDefaults  : {
        labelAlign : 'top',
        msgTarget  : 'side'
    },
    defaults : {
        border : false,
        xtype  : 'panel',
        flex   : 1,
        anchor : (moduleConfig.form.anchor)?moduleConfig.form.anchor:'0%',
        layout : 'anchor'
    },
    items     : [
        {
            xtype : AppGlobals.formAlias,
            style : (moduleConfig.form.panelMarginTop)?moduleConfig.form.panelMarginTop:'margin:0 auto;margin-top:0px'
        }
    ],
    initComponent: function () 
    {
        this.callParent(arguments);
    }
});