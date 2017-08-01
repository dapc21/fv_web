Ext.define('LoadPrincipal.controller.' + controller, {
    extend: 'LoadPrincipal.controller.Core',
    models: [
//        controller + '.ListCombo',
//        controller + '.List'
    ],
    stores: [
//        controller + '.ListCombo',
//        controller + '.List'
    ],
    views:  [
//        controller + '.ConnectorList',
//         'Generics.Form'
    ],
    refs: [{
        ref      : controller + 'Form',
        selector : AppGlobals.formAlias
    }],
    init: function() {

        Ext.apply(Ext.form.field.VTypes, {
            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },
            passwordText: translaterestorepassword.formPassword.passwordText
        });

        this.render(moduleConfig.template);
        /**
         * Listeners
         */
        this.control(
            {
                'AliasRestorePasswordFormPanel button[action=RestorePasswordFormPanelClearButton]' : {
                    click : this.clearData
                }
                ,
               'AliasRestorePasswordFormPanel button[action=RestorePasswordFormPanelSaveButton]' : {
                    click : this.sendData
                }
            }
        );
    }
    ,
    clearData : function(){
        this.getRestorePasswordForm().getForm().reset();
    }
    ,
    sendData : function(){
        console.log('Enviar Datos');
        var password = Ext.getCmp(controller + 'FormPanelPasswordConfirm').getValue();
        var token = '364c6d0f2c0c525'; //CAMBIAR ESTE VALOR POR TOKEN REAL
        Ext.Ajax.request({
            url    : moduleConfig.services.url+'/resetpassword/'+token,
            type     : 'rest',
            dataType : 'json',
            method   : 'PUT',
            scope    : this,
            params   : Ext.JSON.encode({'password' : password}),
            success  : function(response){
                Ext.MessageBox.show({
                    title   : translaterestorepassword.panelTitle,
                    msg     : translaterestorepassword.formPassword.MsgSuccess,
                    buttons : Ext.MessageBox.OK,
                    icon    : Ext.MessageBox.INFO
                });
            },
            failure  : function(response) {
                Ext.MessageBox.show({
                    title   : translaterestorepassword.panelTitle,
                    msg     : translaterestorepassword.formPassword.MsgError,
                    buttons : Ext.MessageBox.OK,
                    icon    : Ext.MessageBox.ERROR
                });
            }
        });
    }
});