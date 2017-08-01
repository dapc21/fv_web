var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'FormPanel';
moduleConfig.lateralPanel = 'left';

moduleConfig.services = new Object();
moduleConfig.services.url = strURL +'/users';
moduleConfig.services.urlCombo = '';

moduleConfig.form = new Object();
moduleConfig.form.title = translaterestorepassword.panelTitle;
moduleConfig.form.topButtons = [];
moduleConfig.form.bottomButtons = []
moduleConfig.form.contextualMenu = [];
moduleConfig.form.anchor = '30%';
moduleConfig.form.panelMarginTop = 'margin:0 auto;margin-top:80px';
moduleConfig.form.items = [
    {
        xtype : 'hiddenfield',
        id    : controller + 'FormPanelId',
        name  : controller + 'FormPanelId',
        value : '0'
    }
    ,
    {
        xtype             : 'textfield',
        fieldLabel        : translaterestorepassword.formPassword.password,
        afterLabelTextTpl : AppGlobals.required,
        id                : controller + 'FormPanelPassword',
        name              : controller + 'FormPanelPassword',
        emptyText         : translaterestorepassword.formPassword.passwordEmptyText,
        allowBlank        : false,
        columnWidth       : 0.99,
        margin            : '10 10 10 10',
        inputType         : 'password',
        listeners         : {
            change : function(field) {
                var confirmField = field.up('form').down('[name=RestorePasswordFormPanelPasswordConfirm]');
                confirmField.validate();
            }
        }
    }
    ,
    {
        xtype             : 'textfield',
        fieldLabel        : translaterestorepassword.formPassword.passwordConfirm,
        afterLabelTextTpl : AppGlobals.required,
        id                : controller + 'FormPanelPasswordConfirm',
        name              : controller + 'FormPanelPasswordConfirm',
        emptyText         : translaterestorepassword.formPassword.passwordConfirmEmptyText,
        allowBlank        : false,
        columnWidth       : 0.99,
        margin            : '10 10 10 10',
        initialPassField  : controller + 'FormPanelPassword',
        inputType         : 'password',
        vtype             : 'password'
    }
];