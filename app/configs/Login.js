var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'FormPanel';
moduleConfig.lateralPanel = 'left';

moduleConfig.services = new Object();
moduleConfig.services.url = strURL + '/login';
moduleConfig.services.urlRecovery = strURL + 'resourceinstances/recoverypassword';
moduleConfig.services.urlCombo = '';

moduleConfig.form = new Object();
moduleConfig.form.topButtons = [];
moduleConfig.form.bottomButtons = []
moduleConfig.form.contextualMenu = [];
//moduleConfig.form.anchor = '30%';
//moduleConfig.form.panelMarginTop = 'margin:0 auto;margin-top:80px';
moduleConfig.form.items = [
    {
        xtype             : 'textfield',
        fieldLabel        : translatelogin.formLogin.login,
        afterLabelTextTpl : AppGlobals.required,
        id                : controller + 'FormPanelEmail',
        name              : 'email',
        emptyText         : translatelogin.formLogin.loginEmptyText,
        allowBlank        : false,
        columnWidth       : 0.99,
        margin            : '10 10 10 10',
        //vtype             : 'email'
    },
    {
        xtype             : 'textfield',
        fieldLabel        : translatelogin.formLogin.password,
        afterLabelTextTpl : AppGlobals.required,
        id                : 'idLoginFormPanelPassword',
        name              : 'password',
        emptyText         : translatelogin.formLogin.passwordEmptyText,
        allowBlank        : false,
        columnWidth       : 0.99,
        margin            : '10 10 10 10',
        inputType         : 'password',
        enableKeyEvents: true,
    },
    {
        xtype: 'button',
        id:'idLoginButtonSession',
        columnWidth       : 0.99,
        margin            : '10 10 10 10',
        scale  : 'medium',
        text: translatelogin.formLogin.sendData,
        style:{
            background: '#' + strColorBoton,
            border: '1px solid #fff',  
        }
    },
    {
        xtype: 'checkboxfield',
        id:'idLoginCheckbox',
        columnWidth       : 0.99,
        margin            : '0 10 10 10',
        boxLabel  : 'Recordar credenciales',
        name      : 'topping',
        inputValue: true,
    },
    {
        xtype: 'label',
        id: 'idLoginFormRecoveryPassword',
        columnWidth       : 0.99,
        margin            : '0 10 20 10',
        html: '<a href="#" onclick="objController.onViewRecoveryPassword();">¿Recuperar Contraseña?</a>'
    },
    {
        xtype: 'button',
        id:'idLoginButtonRecovery',
        columnWidth       : 0.99,
        margin            : '10 10 10 10',
        hidden: true,
        scale  : 'medium',
        text: translatelogin.formLogin.recovery,
        style:{
            background: '#' + strColorBoton,
            border: '1px solid #fff',  
        }
    },
    {
        xtype: 'button',
        id:'idLoginButtonRecoveryBack',
        columnWidth       : 0.99,
        margin            : '10 10 20 10',
        hidden: true,
        scale  : 'medium',
        text: translatelogin.formLogin.recoveryBack,
        style:{
            background: '#474941',
            border: '1px solid #fff',  
        }
    },
    {
        xtype: 'label',
        id: 'idLoginFormRecoveryMsg',
        columnWidth       : 0.99,
        margin            : '20 10 10 10',
        text: translatelogin.formLogin.recoverySendMail,
        hidden: true,
    },
    {
        xtype: 'button',
        id:'idLoginButtonRecoveryBackMsg',
        columnWidth       : 0.99,
        margin            : '10 10 20 10',
        hidden: true,
        scale  : 'medium',
        text: translatelogin.formLogin.recoveryBack,
        style:{
            background: '#474941',
            border: '1px solid #fff',  
        }
    },
];