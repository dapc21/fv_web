Ext.define('LoadPrincipal.controller.' + controller, {
    extend: 'LoadPrincipal.controller.Core',
    models: [
//        controller + '.ListCombo',
        'Roles.ListCombo',
        'Applications.ListCombo',
        controller + '.List',
        controller + '.ListRestore'
    ],
    stores: [
//        controller + '.ListCombo',
        'Roles.ListCombo',
        'Applications.ListCombo', 
        controller + '.List',
        controller + '.ListRestore'
    ],
    views:  [
//        controller + '.ConnectorList',
//         'Generics.WindowCreate'
    ],
    refs: [{
        ref      : controller + 'Form',
        selector : AppGlobals.formAlias
    }],
    init: function() {
		var winForm, winRestore, windowChangePassword;
		/**
		* get current token
		*/
		var token = this.token();
		if(token){
			Ext.Ajax.useDefaultXhrHeader = true;
			Ext.Ajax.cors = true;
		    Ext.Ajax.defaultHeaders = {
		        'Authorization': 'Bearer ' + token
		    };
		}

        this.render(moduleConfig.template);
        //agregar botones en la parte superior del grid
        this.addListButtons();

        this.control(
            {
				/**
				* Show the contextmenu
				**/
                'AliasUsersList' : {
                    itemmouseenter  : this.generateTooltips,
                    itemcontextmenu : this.listContextualMenu,
                    itemclick       : this.itemClick
                }
                ,
                'AliasUsersList button[action=UsersListCreate]' : {
                    click : this.openWindowForm
                }
                ,
                'AliasUsersList button[action=UsersListRestore]' : {
                    click : this.openWindowRestore
                }
                ,
                'AliasUsersList button[action=UsersListDelete]' : {
                    click : this.deleteSelectedItems
                }
                ,
                /**
                 * Contextual Menu
                 */
                'menuitem[action=UsersContextualEdit]' : {
                    click : this.editItem
                }
                ,
                'menuitem[action=UsersContextualDelete]' : {
                    click : this.deleteItem
                }
                ,
                'menuitem[action=UsersContextualActivate]' : {
                    click : this.activateItem
                }
                ,
                'menuitem[action=UsersContextualDeactivate]' : {
                    click : this.deactivateItem
                }
                ,
                'menuitem[action=UsersContextualChangePassword]' : {
                    click : this.changePasswordItem
                }
                ,
                'menuitem[action=UsersContextualResetPassword]' : {
                    click : this.resetPasswordItem
                }
                ,
                /**
                 * Filters
                 */
                '#listSearchKeyword': {
                    keyup: this.multiSearch
                }
                ,
                'AliasUsersFilter combo[id=UsersFilterApplication]' : {
                    select      : this.multiSearch
                }
                ,
                'AliasUsersFilter combo[id=UsersFilterRol]' : {
                    select      : this.multiSearch
                }
                ,
                'AliasUsersFilter combo[id=UsersFilterStatus]' : {
                    select      : this.multiSearch
                }
                ,
                'AliasUsersFilter button[action=clearFilters]' : {
                    click : this.clearFilters
                }
                ,
                'AliasUsersFilter button[action=clearFilter]' : {
                    click : this.clearFilter
                }
                ,
                'AliasUsersList button[action=clearFilter]' : {
                    click : this.clearFilter
                }
				/**
				* Top Buttons (Change Status Active-Inactive)
				*/
                ,
                'menuitem[action=UsersListActive]' : {
                    click : this.activateSelectedItems
                }
                ,
                'menuitem[action=UsersListInactive]' : {
                    click : this.suspendSelectedItems
                }
                ,
				/**
				* Form Buttons
				*/
                '#WindowsCancelButton' : {
                    click : this.closeWindowForm
                }
                ,
                '#WindowsSaveButton' : {
                    click : this.sendDataForm
                }
                ,
                /**
                 * Add-Remove Rol/App Buttons @ Window Create Users
                 */
                '#addRolApp' : {
                    click : this.addRolApp
                }
                ,
                '#removeRolApp' : {
                    click : this.removeRolApp
                }

            }
        );
    }
    ,
	/**
	* Contextual Menu
	*/
	editItem : function(){
		var storeRol = Ext.StoreMgr.lookup(controller + 'StoreRolApp');
		var store = Ext.StoreMgr.lookup(controller + '.List');
		var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
		var record = selectedRecords[0];
		winForm = Ext.create('LoadPrincipal.view.Generics.WindowCreate');
		winForm.setTitle(translate.global.edit+' '+translateusers.moduleTitle);
		this.getUsersForm().getForm().setValues(record.getData());
		winForm.show();
		var data = record.data;
		var idRoles = data.IdRoles;
		for (var i=0; i < idRoles.length; ++i){
			storeRol.add({
				'id_role'         : idRoles[i]["id_role"],
				'applicationName' : idRoles[i]["applicationName"],
				'roleName'        : idRoles[i]["roleName"]
			});
		}
	}
    ,
    deleteItem : function(){
    	var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
        var record = selectedRecords[0];
        var id_user = record.get(moduleConfig.grid.idField);
		Ext.Msg.confirm(translateusers.confirmTitle, translateusers.confirmDelete, function(btn) {
			if (btn === 'yes') {
				var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
				Ext.Ajax.request({
				    url      : moduleConfig.services.url+'/'+id_user,
				    method   : 'DELETE',
				    scope    : this,
					type     : 'rest',
					dataType : 'json',
				    success  : function(response){
				    	msgWait.hide();
						Ext.MessageBox.show({
							title   : translate.global.delete+' '+translateusers.form.user,
							msg     : translateusers.form.MsgSuccessDelete,
							buttons : Ext.MessageBox.OK,
							icon    : Ext.MessageBox.INFO
						});
						Ext.data.StoreManager.lookup("Users.List").reload();
				    },
				    failure  : function(response) {
				    	msgWait.hide();
						Ext.MessageBox.show({
							title   : translate.global.delete+' '+translateusers.form.user,
							msg     : translateusers.form.MsgError,
							buttons : Ext.MessageBox.OK,
							icon    : Ext.MessageBox.ERROR
						});
				    }
				});
			}
		});
	}
	,
    activateItem : function(){
    	var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
        var record = selectedRecords[0];
        var id_user = record.get(moduleConfig.grid.idField);
		var status = record.get('status');

		if(status == 'active') {
			Ext.MessageBox.show({
				title   : 'Atención',
				msg     : 'El usuario ya estaba activo.',
				buttons : Ext.MessageBox.OK,
				icon    : Ext.MessageBox.WARNING
			});
		} else {
			var data = {'status' : 'active'};
			var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
		    Ext.Ajax.request({
		        url    : moduleConfig.services.url+'/'+id_user,
		        type     : 'rest',
		        dataType : 'json',
		        method   : 'PUT',
		        scope    : this,
		        params   : Ext.JSON.encode(data),
		        success  : function(response){
		        	msgWait.hide();
					Ext.MessageBox.show({
						title   : translate.global.active+' '+translateusers.form.user,
						msg     : translateusers.form.MsgSuccessActivate,
						buttons : Ext.MessageBox.OK,
						icon    : Ext.MessageBox.WARNING
					});
					Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
					Ext.data.StoreManager.lookup("Users.List").reload();
		        },
		        failure  : function(response) {
		        	msgWait.hide();
					Ext.MessageBox.show({
						title   : translate.global.active+' '+translateusers.form.user,
						msg     : translateusers.form.MsgError,
						buttons : Ext.MessageBox.OK,
						icon    : Ext.MessageBox.ERROR
					});
		        }
		    });

		}
	}
	,
    deactivateItem : function(){
    	var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
        var record = selectedRecords[0];
        var id_user = record.get(moduleConfig.grid.idField);
		var status = record.get('status');

		if(status == 'suspended') {
			Ext.MessageBox.show({
				title   : 'Atención',
				msg     : 'El usuario ya estaba suspendido.',
				buttons : Ext.MessageBox.OK,
				icon    : Ext.MessageBox.WARNING
			});
		} else {
			var data = {'status' : 'suspended'};
			var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
		    Ext.Ajax.request({
		        url      : moduleConfig.services.url+'/'+id_user,
		        type     : 'rest',
		        dataType : 'json',
		        method   : 'PUT',
		        scope    : this,
		        params   : Ext.JSON.encode(data),
		        success  : function(response){
		        	msgWait.hide();
					Ext.MessageBox.show({
						title   : translate.global.suspend+' '+translateusers.form.user,
						msg     : translateusers.form.MsgSuccessSuspend,
						buttons : Ext.MessageBox.OK,
						icon    : Ext.MessageBox.INFO
					});
					Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
		            Ext.data.StoreManager.lookup("Users.List").reload();
		        },
		        failure  : function(response) {
		        	msgWait.hide();
					Ext.MessageBox.show({
					    title   : translate.global.suspend+' '+translateusers.form.user,
					    msg     : translateusers.form.MsgError,
					    buttons : Ext.MessageBox.OK,
					    icon    : Ext.MessageBox.ERROR
					});
		        }
		    });

		}
	}
	,
	changePasswordItem : function(){

		Ext.apply(Ext.form.field.VTypes, {
		    
		    password: function(val, field) {
		        if (field.initialPassField) {
		            var pwd = field.up('form').down('#' + field.initialPassField);
		            return (val == pwd.getValue());
		        }
		        return true;
		    },

		    passwordText: translateusers.formPassword.passwordText
		});

		windowChangePassword = Ext.create('Ext.window.Window', {
		    title       : 'Cambio de Contraseña',
		    alias       : 'widget.windowChangePassword',
			modal       : true,
			width       : 600,
			height      : 280,
			minWidth    : 600,
			minHeight   : 280,
			layout      : 'fit',
			resizable   : false,
			draggable   : false,
			closeAction : 'destroy',
			autoDestroy : true,
		    items       : {
		        xtype       : 'form',
		        id          : 'ChangePasswordUsers',
				bodyPadding : 20,
				autowidth   : true,
				border      : false,
				frame       : false,
				autoScroll  : true,
				bodyPadding : 10,
				fieldDefaults: {
				    labelWidth: 100,
				    labelAlign: 'top',
				    msgTarget: 'under'
				},
				layout      : 'anchor',
				defaults    : {
				    anchor  : '100%',
				    inputType: 'password'
				},
				defaultType   : 'textfield',
				items         : [{
				    fieldLabel   : translateusers.formPassword.password,
				    id           : 'changePasswordUserPassword',
				    name         : 'changePasswordUserPassword',
				    emptyText    : translateusers.formPassword.password.emptyText,
				    allowBlank   : false,
					listeners    : {
					    change   : function(field) {
					        var confirmField = field.up('form').down('[name=changePasswordUserConfirmPassword]');
					        confirmField.validate();
					    }
					}
				},{
				    fieldLabel       : translateusers.formPassword.passwordConfirm,
				    name             : 'changePasswordUserConfirmPassword',
				    emptyText        : translateusers.formPassword.passwordConfirm.emptyText,
					vtype            : 'password',
					initialPassField : 'changePasswordUserPassword',
				    allowBlank       : false
				}]
		    },
		    buttons     : [
			    {
			        text      : translate.global.cancel,
			        iconCls   : 'cancel-button',
			        id        : 'changePasswordUserCancel',
			        action    : 'changePasswordUserCancel',
					handler   : function() {
			            windowChangePassword.destroy();
			        }
			    },
			    {
			        text      : translate.global.send,
			        iconCls   : 'ok-button',
			        id        : 'changePasswordUserSend',
			        action    : 'changePasswordUserSend',
					handler   : function() {
						var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
						var record = selectedRecords[0];
						var id_user = record.get(moduleConfig.grid.idField);
						var user = record.get('login');
						var firstname = record.get('name');
						var lastname = record.get('lastName');
						var data = {'password' : Ext.getCmp('changePasswordUserPassword').getValue()};
						var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
					    Ext.Ajax.request({
					        url      : moduleConfig.services.url+'/'+id_user+'/changepassword',
					        type     : 'rest',
					        dataType : 'json',
					        method   : 'PUT',
					        scope    : this,
					        params   : Ext.JSON.encode(data),
					        success  : function(response){
					        	msgWait.hide();
								Ext.MessageBox.show({
									title   : 'Cambio de Contraseña',
									msg     : 'La contraseña de '+firstname+' '+lastname+' se ha cambiado.',
									buttons : Ext.MessageBox.OK,
									icon    : Ext.MessageBox.INFO
								});
								Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
					            Ext.data.StoreManager.lookup("Users.List").reload();
					            windowChangePassword.destroy();
					        },
					        failure  : function(response) {
					        	msgWait.hide();
								Ext.MessageBox.show({
								    title   : 'Cambio de Contraseña',
								    msg     : translateusers.form.MsgError,
								    buttons : Ext.MessageBox.OK,
								    icon    : Ext.MessageBox.ERROR
								});  
					        }
					    });
			        }
			    }
			]
		}).show();
    }
    ,
	resetPasswordItem : function(){
    	var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();
        var record = selectedRecords[0];
        var id_user = record.get(moduleConfig.grid.idField);
		var email = record.get('email');
		var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

	    Ext.Ajax.request({
			url      : moduleConfig.services.url+'/resetpassword/'+id_user,
			type     : 'rest',
			dataType : 'json',
			method   : 'POST',
			scope    : this,
			params   : Ext.JSON.encode({'email' : email}),
			success  : function(response){
				msgWait.hide();
				Ext.MessageBox.show({
					title   : 'Reseteo de Contraseña',
					msg     : 'Email enviado a la cuenta del usuario para recuperar la contraseña.',
					buttons : Ext.MessageBox.OK,
					icon    : Ext.MessageBox.INFO
				});
				Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
				Ext.data.StoreManager.lookup("Users.List").reload();
			},
			failure  : function(response) {
				msgWait.hide();
				Ext.MessageBox.show({
					title   : 'Suspender Usuario',
					msg     : translateusers.form.MsgError,
					buttons : Ext.MessageBox.OK,
					icon    : Ext.MessageBox.ERROR
				});
			}
	    });
    }
    ,
	/**
	* Top Buttons Actions
	* Open Window 'Crear/Modificar Usuarios'
	*/
    openWindowForm : function () {
        winForm = Ext.create('LoadPrincipal.view.Generics.WindowCreate');
        winForm.setTitle(translate.global.create+' '+translateusers.moduleTitle);
        winForm.show();
		Ext.StoreMgr.lookup(controller + 'StoreRolApp').clearData();
    }
    ,
	/**
	* Close Window 'Crear/Modificar Usuarios'
	*/
    closeWindowForm : function () {
        Ext.StoreMgr.lookup(controller + 'StoreRolApp').clearData();
        winForm.destroy();
    }
    ,
	/**
	* Top Buttons Actions
	* Open Window 'Restaurar Usuarios'
	*/
    openWindowRestore : function () {
        winRestore = Ext.create('Ext.window.Window', {
		    title       : 'Restaurar',
		    alias       : 'widget.windowUserRestore',
			modal       : true,
			width       : 950,
			height      : 520,
			minWidth    : 950,
			minHeight   : 520,
			layout      : 'fit',
			resizable   : false,
			draggable   : false,
			closeAction : 'destroy',
			autoDestroy : true,
		    items       : {
		        xtype    : 'gridpanel',
		        id       : 'GridDeletedUsers',
		        border   : false,
		        columns  : [
				    {
				        text      : translateusers.list.id,
				        dataIndex : '_id',
				        width     : '10%',
				        align     : 'left',
				        hidden    : true,
				        sortable  : true
				    }
				    ,
				    {
				        text      : translateusers.list.user,
				        dataIndex : 'login',
				        width     : '10%',
				        align     : 'left',
				        hidden    : false,
				        sortable  : true
				    }
				    ,
				    {
				        text      : translateusers.list.fistname,
				        dataIndex : 'name',
				        width     : '20%',
				        align     : 'left',
				        hidden    : false,
				        sortable  : true
				    }
				    ,
				    {
				        text      : translateusers.list.lastname,
				        dataIndex : 'lastName',
				        width     : '20%',
				        align     : 'left',
				        hidden    : false,
				        sortable  : true
				    }
				    ,
				    {
				        text      : translateusers.list.email,
				        dataIndex : 'email',
				        width     : '20%',
				        align     : 'left',
				        hidden    : false,
				        sortable  : true
				    }
				    ,
				    {
				        text      : translateusers.list.deleted,
				        dataIndex : 'deleted_at',
				        width     : '28%',
				        align     : 'left',
				        hidden    : false,
				        sortable  : true
				    }
				    ,
				    {
				        text      : translateusers.list.status,
				        dataIndex : 'status',
				        width     : '15%',
				        align     : 'left',
				        hidden    : true,
				        sortable  : true
				    }
		        ],
		        store    : 'Users.ListRestore',
				selModel : Ext.create('Ext.selection.CheckboxModel', {
		            mode     : 'SIMPLE',
		            hidden   : true,
		            onHeaderClick: function(headerCt, header, e) {                   
		                if (header.isCheckerHd) {
		                    e.stopEvent();
		                    var isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
		                    if (isChecked) {                            
		                        this.deselectAll(true);
		                        Ext.getCmp('WindowsSaveButtonRestore').disable();
		                    } else {
		                        this.selectAll(true);
		                        Ext.getCmp('WindowsSaveButtonRestore').enable();
		                    }
		                }                    
		            }

		        })
		        ,
				listeners: {
					viewready : function(){
						var jsonSearch = new Object();
						jsonSearch.and = [];
				    	var store = Ext.data.StoreManager.lookup('Users.ListRestore');
				    	Ext.getCmp('searchDeletedUsers').setValue('');
						jsonSearch.and.push(
							{
								field      : 'deleted_at',
								comparison : 'isnotnull'
							}
						);
						store.proxy.extraParams = {
							filters : Ext.JSON.encode(jsonSearch)
						};
						store.load();
					}
					,
					selectionchange: function(sm, selections) {
                        if(selections.length === 0) {
                            Ext.getCmp('WindowsSaveButtonRestore').disable();
                        } else {
                            Ext.getCmp('WindowsSaveButtonRestore').enable();
                        }
                    }
                    ,
					itemcontextmenu : function(record, item, index, e, eOpts){
						eOpts.stopEvent();
						var xy = eOpts.getXY();

						new Ext.menu.Menu({
							items : [{
							    text    : 'Restaurar',
							    handler : function() {
							        var id_user = item.data['_id'];
									var data = {'deleted_at' : null};
									var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
								    Ext.Ajax.request({
								        url      : moduleConfig.services.url+'/'+id_user+'/restore',
								        type     : 'rest',
								        dataType : 'json',
								        method   : 'PUT',
								        scope    : this,
								        params   : Ext.JSON.encode(data),
								        success  : function(response){
								        	msgWait.hide();
								        	Ext.data.StoreManager.lookup("Users.ListRestore").reload();
								            Ext.data.StoreManager.lookup("Users.List").reload();
								        },
								        failure  : function(response) {
								        	msgWait.hide();
											Ext.MessageBox.show({
												title   : 'Restaurar Usuario',
												msg     : translateusers.form.MsgError,
												buttons : Ext.MessageBox.OK,
												icon    : Ext.MessageBox.ERROR
											});
								        }
								    });
							    }
							}]
						}).showAt(xy);
					}
				},
		        dockedItems : [{
		            xtype      : 'toolbar',
		            border     : false,
		            items      : [{
		                xtype           : 'textfield',
		                id              : 'searchDeletedUsers',
		                name            : 'searchDeletedUsers',
		                width           : 350,
		                enableKeyEvents : true,
		                emptyText       : 'Buscar usuario...', 
		                listeners       : {
		                    keyup : function (string) {
								var store = Ext.data.StoreManager.lookup('Users.ListRestore');
								var searchKeyword = Ext.getCmp('searchDeletedUsers').getValue();
								var sk = 0;

								var jsonSearch = new Object();
								var jsonOr = new Object();
								jsonSearch.and = [];

								//Búsquedas AND...
								jsonSearch.and.push(
									{
										field      : 'deleted_at',
										comparison : 'isnotnull'
									}
								);

								//Búsquedas OR...
								if (searchKeyword !='') {
									jsonOr.or = [];

									jsonOr.or.push(
										{
											field      : 'login',
											comparison : 'lk',
											value      : searchKeyword
										}
										,
										{  
											field      : 'name',
											comparison : 'lk',
											value      : searchKeyword
										}
										,
										{  
											field      : 'lastName',
											comparison : 'lk',
											value      : searchKeyword
										}
										,
										{  
											field      : 'email',
											comparison : 'lk',
											value      : searchKeyword
										}
									);
									sk = 1;
								}

								if (sk == 1) jsonSearch.and.push(jsonOr);

								Ext.Ajax.abort(store.proxy.activeRequest);
								store.proxy.extraParams = {
									filters : Ext.JSON.encode(jsonSearch)
								};

								var o = {start : "0", page : "1"};
								store.loadPage(1); 
		                    }
		                }

		            },
					{
					    xtype          : 'button',
					    iconCls        : 'cancel-button',
					    tooltip        : 'Elimina el filtro por usuarios',
					    fieldName      : 'searchDeletedUsers',
					    cls            : 'x-btn-default-small',
					    handler : function() {
					    	var jsonSearch = new Object();
							jsonSearch.and = [];
					    	var store = Ext.data.StoreManager.lookup('Users.ListRestore');
					    	Ext.getCmp('searchDeletedUsers').setValue('');
							jsonSearch.and.push(
								{
									field      : 'deleted_at',
									comparison : 'isnotnull'
								}
							);
							store.proxy.extraParams = {
								filters : Ext.JSON.encode(jsonSearch)
							};
					    	store.reload();
					    }
					},'->',{
		                id      : 'exportDeletedUsers',
		                text    : 'Exportar',
		                cls       : 'x-btn-default-small'
		            }]
		        },{
				    xtype       : 'pagingtoolbar',
				    border      : false,
				    id          : 'pagingDeletedUsers',
				    store       : 'Users.ListRestore',
				    dock        : 'bottom',
				    displayInfo : true,
				    displayMsg  : 'Mostrando registros {0} - {1} de {2}',
				    emptyMsg    : 'No hay datos para mostrar'
				}]
		    },
		    buttons : [
			    {
			        text      : 'Cancelar',
			        iconCls   : 'cancel-button',
			        id        : 'WindowsCancelButtonRestore',
			        action    : 'WindowsCancelButtonRestore',
					handler : function() {
			            winRestore.destroy();
			        }
			    },
			    {
			        text      : 'Restaurar',
			        iconCls   : 'ok-button',
			        id        : 'WindowsSaveButtonRestore',
			        action    : 'WindowsSaveButtonRestore',
			        disabled  : true,
					handler : function() {

				    	var selectedRecords = Ext.getCmp('GridDeletedUsers').getSelectionModel().getSelection();

				        if(selectedRecords.length > 0){

				        	Ext.Msg.confirm(translateusers.confirmTitle, translateusers.confirmRestore, function(btn) {

				        		if (btn === 'yes') {

				        			for (var i = 0, len = selectedRecords.length; i < len; i++) {

									var record = selectedRecords[i];
									var id_user = record.get('_id');
									var data = {'deleted_at' : null};
									var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
									Ext.Ajax.request({
									    url      : moduleConfig.services.url+'/'+id_user+'/restore',
									    type     : 'rest',
									    dataType : 'json',
									    method   : 'PUT',
									    scope    : this,
									    params   : Ext.JSON.encode(data),
									    success  : function(response){
									    	msgWait.hide();
									        Ext.data.StoreManager.lookup("Users.List").reload();
									        winRestore.destroy();
									    },
									    failure  : function(response) {
									    	msgWait.hide();
											Ext.MessageBox.show({
											    title   : 'Restaurar Usuario',
											    msg     : translateusers.form.MsgError,
											    buttons : Ext.MessageBox.OK,
											    icon    : Ext.MessageBox.ERROR
											});
									    }
									});

								    }

							    }

						    });

					    }
			        }
			    }
			]
		}).show();

    }
    ,
	/**
	* Top Buttons Actions
	* Activate Selected Items (Change Status Active)
	*/
    activateSelectedItems : function(){

    	var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();

        if(selectedRecords.length > 0){

        	Ext.Msg.confirm(translateusers.confirmTitle, translateusers.confirmActivate, function(btn) {

        		if (btn === 'yes') {

        			for (var i = 0, len = selectedRecords.length; i < len; i++) {

						var record = selectedRecords[i];
						var id_user = record.get(moduleConfig.grid.idField);
						var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

						Ext.Ajax.request({
						    url    : moduleConfig.services.url+'/'+id_user,
						    type     : 'rest',
						    dataType : 'json',
						    method   : 'PUT',
						    scope    : this,
						    params   : Ext.JSON.encode({'status' : 'active'}),
						    success  : function(response){
					            if (i == len) {
					            	msgWait.hide();
								    Ext.MessageBox.show({
								        title   : 'Activar Usuarios',
								        msg     : 'Usuarios activados!',
								        buttons : Ext.MessageBox.OK,
								        icon    : Ext.MessageBox.INFO
								    });
					            }
					            Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
					            Ext.data.StoreManager.lookup("Users.List").reload();
						    },
						    failure  : function(response) {
						    	msgWait.hide();
					            Ext.MessageBox.show({
                                    title   : 'Error',
                                    msg     : translateusers.form.MsgError,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.ERROR
                                });
					    	}
						});

				    }

			    }

		    });

	    }
    }
    ,
	/**
	* Top Buttons Actions
	* Deactivate Selected Items (Change Status Inactive)
	*/
    suspendSelectedItems : function(){

    	var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();

        if(selectedRecords.length > 0){

        	Ext.Msg.confirm(translateusers.confirmTitle, translateusers.confirmSuspend, function(btn) {

        		if (btn === 'yes') {

        			for (var i = 0, len = selectedRecords.length; i < len; i++) {

						var record = selectedRecords[i];
						var id_user = record.get(moduleConfig.grid.idField);
						var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

						Ext.Ajax.request({
						    url    : moduleConfig.services.url+'/'+id_user,
						    type     : 'rest',
						    dataType : 'json',
						    method   : 'PUT',
						    scope    : this,
						    params   : Ext.JSON.encode({'status' : 'suspended'}),
						    success  : function(response){
					            if (i == len) {
					            	msgWait.hide();
								    Ext.MessageBox.show({
								        title   : 'Suspender Usuarios',
								        msg     : 'Usuarios suspendidos!',
								        buttons : Ext.MessageBox.OK,
								        icon    : Ext.MessageBox.INFO
								    });
					            }
					            Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
					            Ext.data.StoreManager.lookup("Users.List").reload();
						    },
						    failure  : function(response) {
						    	msgWait.hide();
					            Ext.MessageBox.show({
                                    title   : 'Error',
                                    msg     : translateusers.form.MsgError,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.ERROR
                                });
					    	}
						});

				    }

			    }

		    });

	    }
    }
    ,
	/**
	* Top Buttons Actions
	* Delete Selected Items
	*/
    deleteSelectedItems : function(){

    	var selectedRecords = Ext.getCmp(AppGlobals.listId).getSelectionModel().getSelection();

        if(selectedRecords.length > 0){

        	Ext.Msg.confirm(translateusers.confirmTitle, translateusers.confirmDelete, function(btn) {

        		if (btn === 'yes') {

        			for (var i = 0, len = selectedRecords.length; i < len; i++) {

						var record = selectedRecords[i];
						var id_user = record.get(moduleConfig.grid.idField);
						var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);

					    Ext.Ajax.request({
					        url      : moduleConfig.services.url+'/'+id_user,
					        method   : 'DELETE',
					        scope    : this,
							type     : 'rest',
							dataType : 'json',
					        success  : function(response){
					            if (i == len) {
					            	msgWait.hide();
								    Ext.MessageBox.show({
								        title   : 'Eliminar Usuarios',
								        msg     : 'Usuarios eliminados!',
								        buttons : Ext.MessageBox.OK,
								        icon    : Ext.MessageBox.INFO
								    });
					            }
					            Ext.getCmp(AppGlobals.listId).getSelectionModel().clearSelections();
					            Ext.data.StoreManager.lookup("Users.List").reload();
					        },
					        failure  : function(response) {
					        	msgWait.hide();
					            Ext.MessageBox.show({
                                    title   : 'Error',
                                    msg     : translateusers.form.MsgError,
                                    buttons : Ext.MessageBox.OK,
                                    icon    : Ext.MessageBox.ERROR
                                });
					        }
					    });

				    }

			    }

		    });

	    }

    }
	,
	/**
	* Select Item @ Users Store
	*/
	itemClick : function(dv, record, item, index, e) {
		var id_user = record.data['_id'];
    }
    ,
	/**
	* Send info 'Crear/Modificar Usuarios'
	*/
    sendDataForm : function () {
		var form = this.getUsersForm().getForm();
		var store = Ext.StoreMgr.lookup(controller + 'StoreRolApp');
		var numRecords = store.getCount();
		var id_user = form.findField("_id").getValue();
		var username = form.findField("login").getValue();
		var email = form.findField("email").getValue();
		var firstname = form.findField("name").getValue();
		var lastname = form.findField("lastname").getValue();
		var roles = [];

		/* El formulario tiene los campos llenos */
		if (form.isValid()) {

			/* El store en el formulario (app/rol) tiene por lo menos un registro */
			if (numRecords >= 1) {

				store.each(function(record) {
					roles.push({
						'id_role'         : record.data['id_role'],
						'applicationName' : record.data['applicationName'],
						'roleName'        : record.data['roleName']
					});
				});

				/* Si el valor del ID del Usuario es vacío almacena por 1ra vez */
				if (id_user == '') {

					var data = {
						'login'      : username,
						'email'      : email,
						'name'       : firstname,
						'lastName'   : lastname,
						'password'   : '',
						'status'     : 'active',
						'id_company' : '',
						'roles'      : roles
					}

					var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
					Ext.Ajax.request({
						url      : moduleConfig.services.url,
						type     : 'rest',
						dataType : 'json',
						method   : 'POST',
						scope    : this,
						params   : Ext.JSON.encode(data),
						success  : function(response){
							var res = response.responseText;
							msgWait.hide();
							Ext.MessageBox.show({
								title   : translate.global.create+' '+translateusers.form.user,
								msg     : translateusers.form.MsgSuccessCreate,
								buttons : Ext.MessageBox.OK,
								icon    : Ext.MessageBox.INFO
							});
							Ext.StoreMgr.lookup(controller + 'StoreRolApp').clearData();
							Ext.data.StoreManager.lookup("Users.List").reload();
							winForm.destroy();
						},
						failure  : function(response) {
							var res = response.responseText;
							msgWait.hide();
							Ext.MessageBox.show({
								title   : translate.global.create+' '+translateusers.form.user,
								msg     : translateusers.form.MsgError,
								buttons : Ext.MessageBox.OK,
								icon    : Ext.MessageBox.ERROR
							});
						}
					});

				} else {

					var data = {
						'login'      : username,
						'email'      : email,
						'name'       : firstname,
						'lastName'   : lastname,
						'status'     : 'active',
						'roles'      : roles,
						'synchronize':['roles']
					}

					var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
					Ext.Ajax.request({
						url      : moduleConfig.services.url+'/'+id_user,
						type     : 'rest',
						dataType : 'json',
						method   : 'PUT',
						scope    : this,
						params   : Ext.JSON.encode(data),
						success  : function(response){
							var res = response.responseText;
							msgWait.hide();
							Ext.MessageBox.show({
								title   : translate.global.edit+' '+translateusers.form.user,
								msg     : translateusers.form.MsgSuccessEdit,
								buttons : Ext.MessageBox.OK,
								icon    : Ext.MessageBox.INFO
							});
							Ext.StoreMgr.lookup(controller + 'StoreRolApp').clearData();
							Ext.data.StoreManager.lookup("Users.List").reload();
							winForm.destroy();
						},
						failure  : function(response) {
							var res = response.responseText;
							msgWait.hide();
							Ext.MessageBox.show({
								title   : translate.global.edit+' '+translateusers.form.user,
								msg     : translateusers.form.MsgError,
								buttons : Ext.MessageBox.OK,
								icon    : Ext.MessageBox.ERROR
							});
						}
					});

				}

			} else{
				Ext.MessageBox.show({
					title        : 'Atención',
					msg          : 'Debe cargar por lo menos una Aplicación-Rol.',
					animCollapse : true,
					buttons      : Ext.MessageBox.OK,
					icon         : Ext.MessageBox.WARNING
				});
			}
		}
    },
	/**
	* Open Window 'Agregar Rol/Aplicación'
	*/
    addRolApp : function(){
    	winAddRolApp = Ext.create('Ext.window.Window', {
		    title       : 'Agregar Rol/Aplicación',
		    alias       : 'widget.windowUserAddRolApp',
			modal       : true,
			width       : 600,
			height      : 300,
			minWidth    : 600,
			minHeight   : 300,
			layout      : 'fit',
			resizable   : false,
			draggable   : false,
			closeAction : 'destroy',
			autoDestroy : true,
		    items       : {
		        xtype       : 'form',
		        id          : controller + 'FormAddRolApp',
		        name        : controller + 'FormAddRolApp',
		        bodyPadding : 20,
				autowidth   : true,
				border      : false,
				layout      : 'anchor',
				defaultType : 'combo',
				defaults    : {
				    anchor  : '100%'
				},
				fieldDefaults  : {
                    labelAlign : 'top',
                    labelWidth : 100,
                    labelStyle : 'font-weight:bold'
                },
				items          : [{
					xtype          : 'combo',
					fieldLabel     : 'Aplicación',
					id             : controller + 'FormApp',
					name           : controller + 'FormApp',
					loadingText    : 'Buscando...',
					emptyText      : 'Seleccione...',
					queryMode      : 'remote',
					editable       : false,
					typeAhead      : false,
					forceSelection : true,
					columnWidth    : 0.95,
					displayField   : 'name',
					valueField     : '_id',
					minChars       : 0,
					width          : '100%',
					pageSize       : 10,
					labelWidth     : '100%',
					store          : 'Applications.ListCombo',
					allowBlank     : false,
					listeners: {
						'select' : function(cmb, rec, idx) {
							var application = cmb.getValue();
							var role = Ext.getCmp(controller + 'FormRol');
							var id = this.value;
							role.clearValue();
							role.store.proxy.extraParams = {
								filters : Ext.JSON.encode({
									"and":[{
										"field"      : "application._id",
										"comparison" : "eq",
										"value"      : id
									}]
								})
							};
							role.store.load();
							role.enable();
						}
					}
				},{
					xtype          : 'combo',
					fieldLabel     : 'Rol',
					id             : controller + 'FormRol',
					name           : controller + 'FormRol',
					loadingText    : 'Buscando...',
					emptyText      : 'Seleccione...',
					queryMode      : 'local',
					editable       : false,
					typeAhead      : false,
					forceSelection : true,
					columnWidth    : 0.95,
					displayField   : 'name',
					valueField     : '_id',
					minChars       : 0,
					width          : '100%',
					pageSize       : 10,
					labelWidth     : '100%',
					store          : 'Roles.ListCombo',
					allowBlank     : false,
					disabled       : true
				}],
				buttons        : [{
					text     : 'Cancelar',
					iconCls  : 'cancel-button',
					handler  : function() {
						winAddRolApp.destroy();
					}
				}, {
					text     : 'Agregar/Editar',
					iconCls  : 'ok-button',
					formBind : true,
				    handler  : function() {
				    	var form = this.up('form').getForm();
						var appId = form.findField(controller + 'FormApp').getValue();
						var appName = form.findField(controller + 'FormApp').getRawValue();
						var rolId  = form.findField(controller + 'FormRol').getValue();
						var rolName  = form.findField(controller + 'FormRol').getRawValue();
						var store = Ext.StoreMgr.lookup(controller + 'StoreRolApp');
						var exist = 0;

						store.each(function(record) {
						    if (record.data['applicationName'] == appName && record.data['roleName'] == rolName) {
						        exist = 1;
						    }
						});

						if (exist == 1) {
							Ext.MessageBox.show({
								title        : 'Atención',
								msg          : 'Ya existe este registro!',
								animCollapse : true,
								buttons      : Ext.MessageBox.OK,
								icon         : Ext.MessageBox.WARNING
							});
						} else {
							store.add({
								id_application  : appId,
								applicationName : appName,
								id_role         : rolId,
								roleName        : rolName
							});
							winAddRolApp.close();
						}

				    }  
				}]
		    }
		}).show();
    },
	/**
	* Close Window 'Agregar Rol/Aplicación'
	*/
    removeRolApp : function(){
    	var grid = Ext.getCmp(controller + 'GridRol');
    	var store = Ext.StoreMgr.lookup(controller + 'StoreRolApp');
    	var selectedRecords = grid.getSelectionModel().getSelection();
		if (selectedRecords.length > 0) {
		    store.remove(selectedRecords);
		}
    }
    ,
	/**
	* Search criteria @ Users Store
	*/
    multiSearch : function () {
        /**
         * Get Store
         */
        var store = this.getUsersListStore();
        /**
         * field search
         */
        var app = Ext.getCmp(controller + 'FilterApplication').getRawValue();
        var rol = Ext.getCmp(controller + 'FilterRol').getValue();
        var status = Ext.getCmp(controller + 'FilterStatus').getValue();
        var searchKeyword = Ext.getCmp('listSearchKeyword').getValue();
        var sk = 0;
        /**
         * Json filter
         */
        var jsonSearch = new Object();
        var jsonOr = new Object();

    	jsonSearch.and = [];

    	//Búsquedas AND...
		jsonSearch.and.push(
            {
                field      : 'deleted_at',
                comparison : 'isnull'
            }
        );

    	if (app != '') {
            jsonSearch.and.push(
                {
                    field      : 'roles.applicationName',
                    comparison : 'eq',
                    value      : app
                }
            );
        }

    	if (rol != null) {
            jsonSearch.and.push(
                {
                    field      : 'roles.id_role',
                    comparison : 'eq',
                    value      : rol
                }
            );
        }

    	if (status != null) {
            jsonSearch.and.push(
                {
                    field      : 'status',
                    comparison : 'eq',
                    value      : status
                }
            );
        }

        //Búsquedas OR...
        if (searchKeyword !='') {
        	jsonOr.or = [];

            jsonOr.or.push(
                {
                    field      : 'login',
                    comparison : 'lk',
                    value      : searchKeyword
                }
                ,
				{  
                    field      : 'name',
                    comparison : 'lk',
                    value      : searchKeyword
				}
				,
				{  
                    field      : 'lastName',
                    comparison : 'lk',
                    value      : searchKeyword
				}
				,
				{  
                    field      : 'email',
                    comparison : 'lk',
                    value      : searchKeyword
				}
            );
            sk = 1;
        }
        
        if (sk == 1) jsonSearch.and.push(jsonOr);

        Ext.Ajax.abort(store.proxy.activeRequest);
        store.proxy.extraParams = {
            filters : Ext.JSON.encode(jsonSearch)
        };

        var o = {start : "0", page : "1"};
        store.loadPage(1);
    }

});