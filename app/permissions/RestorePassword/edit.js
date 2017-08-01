moduleConfig.form.bottomButtons.push(
    {
        text      : translaterestorepassword.formPassword.clearData,
        iconCls   : 'cancel-button',
        id        : controller + 'FormPanelClearButton',
        action    : controller + 'FormPanelClearButton'
    }
    ,
	{
        text      : translaterestorepassword.formPassword.sendData,
        iconCls   : 'ok-button',
        id        : controller + 'FormPanelSaveButton',
        action    : controller + 'FormPanelSaveButton',
        formBind  : true
    }
);