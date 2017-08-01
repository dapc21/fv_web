/**
 * Form section
 */
//Ext.ns('LoadPrincipal.view.globalVars');
Ext.define('LoadPrincipal.view.Generics.Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+AppGlobals.formAlias,
    id: AppGlobals.formId,
    border: false,
    frame: false,
    autoScroll: true,
    bodyPadding: 10,
    fieldDefaults: {
        labelWidth: 50,
        labelAlign: 'top',
        msgTarget: 'under'
    },
    requires: [
    ],
    layout: {
        type: 'vbox',
        align: "center",
        defaultMargins: "2px"
    },
    initComponent: function() {
        var win = this;

        this.items = [
            {
                xtype: 'fieldset',
                title: moduleConfig.form.title,
                collapsible: false,
                collapsed: false,
                id: 'messageFormFieldsetPush',
                defaultType: 'textfield',
                bodyPadding: 15,
                border: (moduleConfig.form.border === false)?false:true,
                width: '99%',
                fieldDefaults: {
                    labelWidth: '50%'
                },
                layout: {
                    type: 'column',
                    align: "center",
                    defaultMargins: "7px"
                },
                items: moduleConfig.form.items
            }
        ];
        this.buttons = moduleConfig.form.bottomButtons;
        this.callParent(arguments);
    }
});
