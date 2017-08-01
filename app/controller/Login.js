var objController = null;

Ext.define('LoadPrincipal.controller.' + controller, {
    extend: 'LoadPrincipal.controller.Core',
    models: [
    ],
    stores: [
    ],
    views:  [
    ],
    refs: [{
        ref      : controller + 'Form',
        selector : AppGlobals.formAlias
    }],
    //
    init: function() 
    {
        //Controlador principal
        objController = this;

        this.render(moduleConfig.template);

        this.control(
            {
                //Al hacer enter intenta autenticar (Habilitar el enableKeyEvents: true en el textfield)
                '#idLoginFormPanelPassword':{
                    keypress: this.onKeyPressEnter,
                },
                //Envía los datos de autenticación
                '#idLoginButtonSession' : {
                    click : this.onSendData,
                },
                //Permite Recuperar Contraseña
                '#idLoginButtonRecovery':{
                    click: this.onRecoveryPassword
                },
                //Regresa a la vista de autenticación
                '#idLoginButtonRecoveryBack':{
                    click: this.onRecoveryPasswordBack
                },
                //Regresa a la vista de autenticación despues del mensaje
                '#idLoginButtonRecoveryBackMsg':{
                   click: this.onRecoveryPasswordBack 
                }
            }
        );
    },
    //Renderiza la página Inicial/Principal
    render:function(strTemplate)
    {
        moduleConfig.commponents = '';

        Ext.create('Ext.container.Viewport', 
        {
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    title: '<div><span "display: inline-block; vertical-align: baseline;"><img src="./images/icon/logo16.png" width:"16"/></span> <span style="display: inline-block; vertical-align: baseline;">Field Vision</span></div>',
                    layout:{
                        type: 'absolute',
                    },
                    items:[
                        {
                            border: true,
                            layout: 'ux.center',
                            x:0,
                            y:0,
                            autoScroll: true,
                            bodyStyle: 'padding:10px 0;',
                            items: [
                                {
                                    width: 400,
                                    items:[
                                        {   
                                            bodyStyle: "background:url(./images/logoFieldVision.png) no-repeat center !important",
                                            height: 180,
                                            align: 'center',
                                        },
                                        {
                                            xtype: 'fieldset',
                                            collapsible: false,
                                            collapsed: false,
                                            defaultType: 'textfield',
                                            border: true,
                                            width: '99%',
                                            fieldDefaults: {
                                                labelAlign: 'top',
                                                msgTarget: 'under',
                                                width: '100%',
                                            },
                                            items: [
                                                {
                                                    xtype:'form',
                                                    id: 'idLoginForm',
                                                    items: moduleConfig.form.items,
                                                    layout: {
                                                        type: 'column',
                                                        align: 'center',
                                                    },
                                                    viewConfig: {
                                                        loadingCls: 'custom-loader'
                                                    },
                                                }
                                            ],
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            html: '© Copyright Datatraffic S.A.S. 2016',
                            x: '1%',
                            y: '96%',
                        }
                    ]
                },
                
            ]
        });
    },
    //Envía la información para autenticar en el server	
    onSendData : function(thisButton, e, eOpts)
    {
        var objFormPanel = Ext.getCmp('idLoginForm');
        var objForm = objFormPanel.getForm();

        if(objForm.isValid())
        {
            //Obtenemos los datos
            var objDataForm = objForm.getValues();

            //Agregamos los datos extras
            objDataForm['device'] = this.getBrowser();
            objDataForm['application'] = 'WEB';

            //Bloqueamos el formulario
            objFormPanel.getEl().mask('', 'loader-fieldvision');

            //Hacemos la llamada AJAX
            Ext.Ajax.request({
                url      : moduleConfig.services.url,
                type     : 'rest',
                dataType : 'json',
                method   : 'POST',
                scope    : this,
                headers  : {
                    'Content-Type': 'application/json'
                },
                params   : Ext.JSON.encode(objDataForm),
                success  : function(response){
                    var obj = Ext.decode(response.responseText);

                    if(!obj.error) 
                    {
                        var token = obj.data.access_token;
                        
                        if(token) 
                        {
                            var info = token.split(".");
                            var payload = Ext.decode(atob(info[1]));
                            var id_company = payload["id_company"];
                            var modules = payload["modules"];
                            var login = payload["login"];
                            var map = payload['map'];
                            
                            this.redirectPage(token, id_company, modules, login, map);
                        } 
                        else 
                        {
                            Ext.MessageBox.show({
                                title   : translatelogin.panelTitle,
                                msg     : 'Token not provided',
                                buttons : Ext.MessageBox.OK,
                                icon    : Ext.MessageBox.WARNING
                            });
                        }
                    }
                    else
                    {
                        Ext.MessageBox.show({
                            title   : 'ERROR',
                            msg     : obj.msg,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });

                        //DesBloqueamos el formulario
                        objFormPanel.getEl().unmask();
                        //Reseteamos el token
                        Ext.getCmp('idLoginFormPanelPassword').reset();
                    }
                },
                failure  : function(response) {
                    var obj = Ext.decode(response.responseText);

                    if(obj.msg == 'general.CREDENTIALS_ERROR') {
                        Ext.MessageBox.show({
                            title   : translatelogin.panelTitle,
                            msg     : translatelogin.formLogin.MsgSuccessError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.WARNING
                        });
                    } else if(obj.msg == 'code.401') {
                        Ext.MessageBox.show({
                            title   : translatelogin.panelTitle,
                            msg     : translatelogin.formLogin.MsgUnauthorized,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.WARNING
                        });
                    } else {
                        Ext.MessageBox.show({
                            title   : translatelogin.panelTitle,
                            msg     : translatelogin.formLogin.MsgError,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }

                    //DesBloqueamos el formulario
                    objFormPanel.getEl().unmask();
                    //Reseteamos el token
                    Ext.getCmp('idLoginFormPanelPassword').reset();
                }
            });
        }
    },
    //Al hacer enter intenta autenticar (http://alvinalexander.com/source-code/software-dev/sencha-extjs-detecting-enter-key-textfield-controller-function)
    onKeyPressEnter:  function(thisTextfield, event, options) 
    {
        if(event.getKey() == event.ENTER) {
            this.onSendData();
        }
    },
    //Rediregue a una página específica
    redirectPage : function(token, id_company, modules, login, map)
    {   
        window.localStorage.setItem('login', login);
        window.localStorage.setItem('id_company', id_company);
        window.localStorage.setItem('user_company', id_company);
        window.localStorage.setItem('token', token);		
		window.localStorage.setItem('modules', Ext.encode(modules));
        window.localStorage.setItem('map', Ext.encode(map));
        
        //LLamamos la misma función pero del CORE
        this.callParent(['PlanningTracking']);
    },
    //Obtiene el navegador con el cual se está accediendo a la página
    getBrowser : function()
    {
        if (Ext.isIE) {
            var ie = 'Internet Explorer';
            if (Ext.isIE6) {
               return ie + ' 6';
            }
            if (Ext.isIE7) {
               return ie + ' 7';
            }
            if (Ext.isIE8) {
               return ie + ' 8';
            }
            if (Ext.isIE9) {
               return ie + ' 9';
            }
            return ie;
        }

        if (Ext.isGecko) {
            var ff = 'Mozilla Firefox';
            if (Ext.isFF3_0) {
               return ff + ' 3.0';
            }
            if (Ext.isFF3_5) {
               return ff + ' 3.5';
            }
            if (Ext.isFF3_6) {
               return ff + ' 3.6';
            }
            if (Ext.isFF4) {
               return ff + ' 4';
            }
            if (Ext.isFF5) {
               return ff + ' 5';
            }
            if (Ext.isFF10) {
               return ff + ' 10';
            }
            return ff;
        }

        if (Ext.isChrome) {
            return 'Google Chrome';
        }

        if (Ext.isSafari) {
            var sf = 'Safari';
            if (Ext.isSafari2) {
               return sf + ' 2';
            }
            if (Ext.isSafari3) {
               return sf + ' 3';
            }
            if (Ext.isSafari4) {
               return sf + ' 4';
            }
            if (Ext.isSafari5) {
               return sf + ' 5';
            }
            return sf;
        }

        if (Ext.isOpera) {
            var op = 'Opera';
            if (Ext.isOpera10_5) {
                return op + ' 10.5';
            }
            return op;
        }
    },
    //Carga la vista para recuperar la contraseña
    onViewRecoveryPassword: function()
    {
        console.log('Carga la vista para recuperar la contraseña');

        //Ocultamos los elementos
        Ext.getCmp('idLoginFormPanelPassword').hide();
        Ext.getCmp('idLoginButtonSession').hide();
        Ext.getCmp('idLoginCheckbox').hide();
        Ext.getCmp('idLoginFormRecoveryPassword').hide();

        //Desplegamos los botones de recuperación
        Ext.getCmp('idLoginButtonRecovery').show();
        Ext.getCmp('idLoginButtonRecoveryBack').show();
    },
    //Permite Recuperar Contraseña
    onRecoveryPassword: function(thisButton, e, eOpts)
    {
        console.log('Se envía recuperar la contraseña.');

        var objFormPanel = Ext.getCmp('idLoginForm');
        var textFieldUser = Ext.getCmp(controller + 'FormPanelEmail');

        if(textFieldUser.isValid()){
            //Obtenemos los datos
            var strUserValue = textFieldUser.getValue();

            //Bloqueamos el formulario
            objFormPanel.getEl().mask();
            //console.log('moduleConfig.services.urlRecovery: ', moduleConfig.services.urlRecovery);
            //Hacemos la llamada AJAX
            Ext.Ajax.request({
                url      : moduleConfig.services.urlRecovery,
                type     : 'rest',
                dataType : 'json',
                method   : 'POST',
                scope    : this,
                headers  : {
                    'Content-Type': 'application/json'
                },
                params   : Ext.JSON.encode({
                    login: strUserValue
                }),
                success  : function(response){
                    //DesBloqueamos el formulario
                    objFormPanel.getEl().unmask();

                    var obj = Ext.decode(response.responseText);

                    if(obj.error)
                    {
                        Ext.MessageBox.show({
                            title   : 'ERROR',
                            msg     : obj.msg,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                    }
                    else
                    {
                        Ext.getCmp('idLoginFormRecoveryMsg').show();
                        Ext.getCmp('idLoginButtonRecoveryBackMsg').show();
                        Ext.getCmp('idLoginButtonRecovery').hide();
                        Ext.getCmp('idLoginButtonRecoveryBack').hide();
                        Ext.getCmp(controller + 'FormPanelEmail').hide();
                    }
                },
                failure  : function(response) {
                    //DesBloqueamos el formulario
                    objFormPanel.getEl().unmask();

                    var obj = Ext.decode(response.responseText);

                    Ext.MessageBox.show({
                            title   : 'ERROR',
                            msg     : obj.msg,
                            buttons : Ext.MessageBox.OK,
                            icon    : Ext.MessageBox.ERROR
                        });
                }
            });
        }
    },
    //Regresa a la vista de autenticación
    onRecoveryPasswordBack: function(thisButton, e, eOpts)
    {
        console.log('Se regresa a la vista de autenticación.');

        //Ocultamos los elementos
        Ext.getCmp(controller + 'FormPanelEmail').show();
        Ext.getCmp('idLoginFormPanelPassword').show();
        Ext.getCmp('idLoginButtonSession').show();
        Ext.getCmp('idLoginCheckbox').show();
        Ext.getCmp('idLoginFormRecoveryPassword').show();

        //Desplegamos los botones de recuperación
        Ext.getCmp('idLoginButtonRecovery').hide();
        Ext.getCmp('idLoginButtonRecoveryBack').hide();
        Ext.getCmp('idLoginFormRecoveryMsg').hide();
        Ext.getCmp('idLoginButtonRecoveryBackMsg').hide();
    },

});
