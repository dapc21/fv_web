var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'grid';
moduleConfig.lateralPanel = 'right';

moduleConfig.services = new Object();
moduleConfig.services.url = strURL +'/users';
moduleConfig.services.urlCombo = '';
moduleConfig.services.urlComboApplications = strURL +'/applications';
moduleConfig.services.urlComboRoles = strURL +'/roles';
moduleConfig.services.listUrl = strURL +'/users?relations=["roles"]';
moduleConfig.listPageSize = 10;
moduleConfig.exportFilter = '';

moduleConfig.filterForm = new Object();
moduleConfig.filterTitle = translateusers.filter.title;
moduleConfig.filterForm = [
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'combo',
                fieldLabel     : translateusers.filter.fieldLabel.application,
                id             : controller + 'FilterApplication',
                loadingText    : translateusers.filter.loadingText,
                emptyText      : translateusers.filter.emptyText.application,
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.95,
                displayField   : 'name',
                valueField     : '_id',
                minChars       : 0,
                anchor         :'100%',
                pageSize       : 10,
                margin         : '20 0 0 0',
                labelWidth     : '100%',
                triggerAction  : 'all',
                editable       : false,
                store          : 'Applications.ListCombo'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por aplicación',
                fieldName      : controller + 'FilterApplication',
                margin         : '46 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    }
    ,
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'combo',
                fieldLabel     : translateusers.filter.fieldLabel.role,
                id             : controller + 'FilterRol',
                loadingText    : translateusers.filter.loadingText,
                emptyText      : translateusers.filter.emptyText.role,
                queryMode      : 'remote',
                //disabled       : true,
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.95,
                displayField   : 'name',
                valueField     : '_id',
                minChars       : 0,
                anchor         :'100%',
                pageSize       : 10,
                margin         : '20 0 0 0',
                labelWidth     : '100%',
                triggerAction  : 'all',
                editable       : false, 
                store          : 'Roles.ListCombo'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por rol',
                fieldName      : controller + 'FilterRol',
                margin         : '46 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    }
    ,
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'combo',
                fieldLabel     : translateusers.filter.fieldLabel.status,
                id             : controller + 'FilterStatus',
                loadingText    : translateusers.filter.loadingText,
                emptyText      : translateusers.filter.emptyText.status,
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.95,
                displayField   : 'name',
                valueField     : 'status',
                minChars       : 0,
                anchor         :'100%',
                pageSize       : 10,
                margin         : '20 0 0 0',
                labelWidth     : '100%',
                triggerAction  : 'all',
                editable       : false,
                store          : Ext.create('Ext.data.Store', {
                    fields         : ['status', 'name'],
                    data           : [
                        {"status" : "active",   "name" : translate.global.statusActive},
                        {"status" : "suspended", "name" : translate.global.statusSuspend}
                    ]
                }),
                queryMode    : 'local'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por estado',
                fieldName      : controller + 'FilterStatus',
                margin         : '46 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    }
];

moduleConfig.grid = new Object();
moduleConfig.grid.title = translateusers.list.title;
moduleConfig.grid.searchField = true;
moduleConfig.grid.searchTitle = translateusers.list.searchPlaceholder;
moduleConfig.grid.searchId = 'listSearchKeyword';
moduleConfig.grid.pageSize = 15;
moduleConfig.grid.topButtons = [
    {
        text    : translate.global.restore,
        action  : controller + 'ListRestore',
        iconCls : 'user-button'
    }
];
moduleConfig.grid.contextualMenu = [];
moduleConfig.grid.tooltip = true;
moduleConfig.grid.tooltipField = 'email';
moduleConfig.grid.checkbox = 'checkboxmodel';
moduleConfig.grid.checkboxIndex = 0;
moduleConfig.grid.idField = '_id';
moduleConfig.grid.columns = [
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
        width     : '15%',
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translateusers.list.lastname,
        dataIndex : 'lastName',
        width     : '15%',
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translateusers.list.email,
        dataIndex : 'email',
        width     : '18%',
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translateusers.list.lastlogin,
        dataIndex : 'updated_at',
        width     : '11%',
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translateusers.list.role+'/'+translateusers.list.application,
        dataIndex : 'RoleApp',
        width     : '20%',
        align     : 'left',
        sortable  : true,
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            var data = record.data;
            var rolApp = data.RoleApp;
            var output = '';
            for (var i=0; i < rolApp.length; ++i){
                if(i == (rolApp.length)-1){
                    output += rolApp[i]["roleName"]+"/"+rolApp[i]["applicationName"]+".";
                }
                else{
                    output += rolApp[i]["roleName"]+"/"+rolApp[i]["applicationName"]+", ";
                }
            }
            return output ;
        }
    }
    ,
    {
        text      : translateusers.list.status,
        dataIndex : 'status',
        width     : '8%',
        align     : 'left',
        hidden    : false,
        sortable  : true
    }
    ,
    {
        text      : translateusers.list.id_role,
        dataIndex : 'IdRoles',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true,
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            var data = record.data;
            var idRoles = data.IdRoles;
            var output = [];
            for (var i=0; i < idRoles.length; ++i){
                output.push(idRoles[i]["id_role"]);
            }
            return output;
        }
    }
    ,
    {
        text      : translateusers.list.role,
        dataIndex : 'Roles',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true,
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            var data = record.data;
            var roles = data.Roles;
            var output = [];
            for (var i=0; i < roles.length; ++i){
                output.push(roles[i]["roleName"]);
            }
            return output;
        }
    }
    ,
    {
        text      : translateusers.list.application,
        dataIndex : 'Applications',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true,
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            var data = record.data;
            var apps = data.Applications;
            var output = [];
            for (var i=0; i < apps.length; ++i){
                output.push(apps[i]["applicationName"]);
            }
            return output;
        }
    }
];

moduleConfig.window = new Object();
moduleConfig.window.resizable = false;
moduleConfig.window.height = '75%';
moduleConfig.window.width = '80%';
moduleConfig.window.bottomButtons = [];

moduleConfig.form = new Object();
moduleConfig.form.id = controller + 'Form',
moduleConfig.form.title = translateusers.title;
moduleConfig.form.border = false;
moduleConfig.form.items = [
    {
        xtype : 'hiddenfield',
        id    : controller + 'FormId',
        name  : '_id',
        value : ''
    }
    ,
    {
        xtype : 'hiddenfield',
        id    : controller + 'FormStatus',
        name  : 'status',
        value : 'active'
    }
    ,
    {
        xtype             : 'textfield',
        fieldLabel        : translateusers.form.user,
        afterLabelTextTpl : AppGlobals.required,
        id                : controller + 'FormUser',
        name              : 'login',
        emptyText         : translateusers.form.user.emptyText,
        allowBlank        : false,
        columnWidth       : 0.5,
        margin            : '10 10 10 10',
        vtype             : 'alphanumeric',
        minLengthText     : translateusers.form.user.nameError
    }
    ,
    {
        xtype             : 'textfield',
        fieldLabel        : translateusers.form.email,
        afterLabelTextTpl : AppGlobals.required,
        id                : controller + 'FormEmail',
        name              : 'email',
        emptyText         : translateusers.form.email.emptyText,
        allowBlank        : false,
        columnWidth       : 0.5,
        margin            : '10 10 10 10',
        vtype             : 'email',
        minLengthText     : translateusers.form.email.nameError
    }
    ,
    {
        xtype             : 'textfield',
        fieldLabel        : translateusers.form.fistname,
        afterLabelTextTpl : AppGlobals.required,
        id                : controller + 'FormFirstname',
        name              : 'name',
        emptyText         : translateusers.form.fistname.emptyText,
        allowBlank        : false,
        columnWidth       : 0.5,
        margin            : '10 10 10 10',
        vtype             : 'alphabetic',
        minLengthText     : translateusers.form.fistname.nameError
    }
    ,
    {
        xtype             : 'textfield',
        fieldLabel        : translateusers.form.lastname,
        afterLabelTextTpl : AppGlobals.required,
        id                : controller + 'FormLastname',
        name              : 'lastname',
        emptyText         : translateusers.form.lastname.emptyText,
        allowBlank        : false,
        columnWidth       : 0.5,
        margin            : '10 10 10 10',
        vtype             : 'alphabetic',
        minLengthText     : translateusers.form.lastname.nameError
    }
    ,
    {
        columnWidth : 0.99,
        xtype       : 'gridpanel',
        id          : controller + 'GridRol',
        border      : false,
        columns     : [
            {
                text      : 'ID Aplicación',
                dataIndex : 'id_application',
                hidden    : true,
                flex      : 1
            }
            ,
            {
                text      : 'Aplicación',
                dataIndex : 'applicationName',
                flex      : 1
            }
            ,
            {
                text      : 'ID Rol',
                dataIndex : 'id_role',
                hidden    : true,
                flex      : 1
            }
            ,
            {
                text      : 'Rol',
                dataIndex : 'roleName',
                flex      : 1
            }
        ],
        store       : Ext.create('Ext.data.ArrayStore', {
            id     : controller + 'StoreRolApp',
            fields : ['id_application','applicationName','id_role','roleName']
        }),
        selModel    : Ext.create('Ext.selection.CheckboxModel', {
            mode          : 'SIMPLE',
            hidden        : true,
            onHeaderClick : function(headerCt, header, e) {                   
                if (header.isCheckerHd) {
                    e.stopEvent();
                    var isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
                    if (isChecked) {                            
                        this.deselectAll(true);
                        Ext.getCmp('removeRolApp').disable();
                    } else {
                        this.selectAll(true);
                        Ext.getCmp('removeRolApp').enable();
                    }
                }                    
            },
            listeners : {
                selectionchange: function(sm, selections) {
                    if(selections.length === 0) {
                        Ext.getCmp('removeRolApp').disable();
                    } else {
                        Ext.getCmp('removeRolApp').enable();
                    }
                }
            }

        })
        ,
        listeners : {
            itemcontextmenu : function(record, item, index, e, eOpts){
                eOpts.stopEvent();
                var xy = eOpts.getXY();

                new Ext.menu.Menu({
                    items : [{
                        text    : 'Eliminar',
                        handler : function() {
                            var grid = Ext.getCmp(controller + 'GridRol');
                            var store = Ext.StoreMgr.lookup(controller + 'StoreRolApp');
                            var selectedRecords = grid.getSelectionModel().getSelection();
                            if (selectedRecords.length > 0) {
                                store.remove(selectedRecords[0]);
                            }
                        }
                    }]
                }).showAt(xy);
            }
        }
        ,
        dockedItems : [{
            xtype      : 'toolbar',
            border     : false,
            items      : ['->',
            {
                id       : 'addRolApp',
                text     : 'Agregar Rol/Aplicación',
                cls      : 'x-btn-default-small'
            },'-',{
                id       : 'removeRolApp',
                text     : 'Eliminar Rol/Aplicación',
                cls      : 'x-btn-default-small',
                disabled : true
            }]
        }]

    }
];
moduleConfig.form.bottomButtons = [
    {
        text      : 'Cancelar',
        iconCls   : 'cancel-button',
        id        : 'WindowsCancelButton',
        action    : 'WindowsCancelButton'
    },
    {
        text      : 'Guardar',
        iconCls   : 'ok-button',
        id        : 'WindowsSaveButton',
        action    : 'WindowsSaveButton',
        formBind  : true,
    } 
]
