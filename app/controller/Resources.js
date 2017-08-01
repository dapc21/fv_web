var objController = null;

Ext.define('LoadPrincipal.controller.' + controller, {
    extend: 'LoadPrincipal.controller.Core',
    models: [
        controller + '.List',
        controller + '.ListComboDevices',
        controller + '.ListComboResources',
        controller + '.ListComboApplication',
        controller + '.ListComboRoles',
        controller + '.ListRoles',
        controller + '.ListResources',
        controller + '.ListDevices',
        controller + '.ListResourceGroups',
        controller + '.ListRestore'
    ],
    stores: [
        controller + '.List',
        controller + '.ListComboDevices',
        controller + '.ListComboResources',
        controller + '.ListComboApplication',
        controller + '.ListComboRoles',
        controller + '.ListRoles',
        controller + '.ListResources',
        controller + '.ListDevices',
        controller + '.ListResourceGroups',
        controller + '.ListRestore'
    ],
    views: [],
    refs: [],
    init: function() 
    {
        objController = this;
        
        //Obtiene el token
        var token = this.token();
        if(token){
            Ext.Ajax.useDefaultXhrHeader = true;
            Ext.Ajax.cors = true;
            Ext.Ajax.defaultHeaders = {
                'Authorization' : 'Bearer ' + token
            };
        }

        Ext.apply(
            Ext.form.field.VTypes, 
            {
                password: function(val, field) 
                {
                    if (field.initialPassField) {
                        var pwd = field.up('form').down('#' + field.initialPassField);
                        return (val == pwd.getValue());
                    }
                    return true;
                },
                passwordText: 'Contraseñas no coinciden'
            }
        );
        
        //Hacemos la petición que nos traerá la estructura
        this.getInterface();

        this.control(
            {
                 //Show te contextmenu
                'AliasResourcesList': {
                    itemmouseenter  : this.generateTooltips,
                    itemcontextmenu : this.listContextualMenu,
                    itemclick       : this.itemClick
                }
            }
        );
    },
    /**
    ******************************************************************
    * getInterface
    * Realiza la consulta por Método GET para traer los datos
    * que crearán las pestañas mediante el método loadTabPanel
    ******************************************************************
    **/
    getInterface: function() 
    {
        var token = window.localStorage.getItem('token');
        if(token){
            Ext.Ajax.useDefaultXhrHeader = true;
            Ext.Ajax.cors = true;
            Ext.Ajax.defaultHeaders = {
                'Authorization': 'Bearer ' + token
            };
            Ext.Ajax.request({
                url      : moduleConfig.services.urlLoadModule,
                type     : 'rest',
                dataType : 'json',
                method   : 'GET',
                scope    : this,
                headers: {
                    'Access-Control-Allow-Headers' : 'x-requested-with'
                },
                success  : function(response){
                    var texto = response.responseText;
                    var result = eval('(' + texto + ')');
                    var data = result.data;

                    if (data.length > 0) {
                        moduleConfig.tab = [];
                        for(var i=0; i < data.length; i++) {
                            /******************************************************************
                            *************************** Get Group Id **************************
                            ******************************************************************/
                            var arrayCadena;
                            var newString = "", moduleName = "";
                            var long;
                            var originString = data[i].name;
                            arrayCadena = originString.split(" ");
                            long = arrayCadena.length;
                            for(var k=0; k < long; k++){
                                var ucFirst = arrayCadena[k].substr(0,1).toUpperCase()+arrayCadena[k].substr(1,arrayCadena[k].length).toLowerCase();
                                newString = newString + ucFirst;
                            }
                            var origin = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
                            var normal = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuuNnCc";
                            for (var l=0; l < origin.length; l++) {
                                moduleName = newString.replace(origin.charAt(l), normal.charAt(l));
                            }
                            var groupId = controller + moduleName;
                            var devDefinitions = data[i].deviceDefinitions;
                            var resDefinitions = data[i].resourceDefinitions;
                            var attributes = data[i].customAttributes;
                            var filterForm = [];
                            var moduleForm = [];
                            var fields = [];
                            var columns = [];
                            /******************************************************************
                            ******************** Estructura Dinámica **************************
                            ******************************************************************/
                            moduleConfig.tab[i] = new Object;
                            moduleConfig.tab[i].id = groupId;
                            moduleConfig.tab[i].moduleName = moduleName;
                            moduleConfig.tab[i].name = data[i].name;
                            moduleConfig.tab[i].isSystem = data[i].isSystem;
                            moduleConfig.tab[i].deviceDefinitions = data[i].deviceDefinitions;
                            moduleConfig.tab[i].resourceDefinitions = data[i].resourceDefinitions;
                            /******************************************************************
                            ********************** Filtros de Combos **************************
                            ******************************************************************/
                            //Dispositivos
                            var filterAndDevDef = '';
                            var filterOrDevDef = '';
                            if (devDefinitions.length > 0) {
                                for (var dvDef=0; dvDef < devDefinitions.length; dvDef++) {

                                    if (dvDef == (devDefinitions.length-1)) {
                                        filterOrDevDef += '{"field" : "_id","comparison" : "eq","value" : "'+devDefinitions[dvDef].id_deviceDefinition+'"}';
                                    } else {
                                        filterOrDevDef += '{"field" : "_id","comparison" : "eq","value" : "'+devDefinitions[dvDef].id_deviceDefinition+'"},';
                                    }
                                }
                                filterAndDevDef = '?filters={"and":[{"or":['+filterOrDevDef+']}]}';
                            } else  {
                                filterAndDevDef = '?filters={"and":[{"or":[{"field" : "","comparison" : "eq","value" : ""}]}]}';
                            }

                            //Recursos
                            var dataStoreResourcesType = [];
                            if (resDefinitions.length > 0) {
                                for (var rsDef=0; rsDef < resDefinitions.length; rsDef++) {
                                    dataStoreResourcesType.push(
                                    {
                                        "_id"        : resDefinitions[rsDef].id_resourceDefinition,
                                        "name"       : resDefinitions[rsDef].name,
                                        "Attributes" : resDefinitions[rsDef].customAttributes
                                    }
                                    );
                                }
                            }
                            /******************************************************************/

                            filterForm.push({
                                xtype  : 'container',
                                flex   : 1,
                                layout : 'column',
                                items  : [
                                    {
                                        xtype           : 'textfield',
                                        fieldLabel      : translateresources.form.fieldLogin,
                                        labelAlign      : 'top',
                                        msgTarget       : 'under',
                                        id              : groupId + 'FilterLogin',
                                        emptyText       : translateresources.form.fieldLogin+'...',
                                        columnWidth     : 0.95,
                                        enableKeyEvents : true,
                                        allowBlank      : true,
                                        margin          : '20 0 0 0',
                                        width           : '60%',
                                        listeners       : {
                                            keyup : function (string) {
                                                var tabPanel = this.up('tabpanel');
                                                var activeItem = tabPanel.getActiveTab();
                                                var activeIndex = tabPanel.items.indexOf(activeItem);
                                                var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                                var store = grid.getStore();
                                                var jsonSearch = new Object();
                                                var jsonOr = new Object();
                                                var login = this.value;
                                                var email = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterEmail').getValue();
                                                var status = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterStatus').getValue();
                                                var searchKeyword = Ext.getCmp('search'+moduleConfig.tab[activeIndex].id).getValue();
                                                jsonSearch.and = [];

                                                jsonSearch.and.push({
                                                    field      : 'id_resourceDefinition',
                                                    comparison : 'eq',
                                                    value      : data[activeIndex]._id
                                                });

                                                if (email != '') {
                                                    jsonSearch.and.push(
                                                        {
                                                            field      : 'email',
                                                            comparison : 'lk',
                                                            value      : email
                                                        }
                                                    );
                                                }

                                                if (login != '') {
                                                    jsonSearch.and.push(
                                                        {
                                                            field      : 'login',
                                                            comparison : 'lk',
                                                            value      : login
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

                                                if (searchKeyword !='') {
                                                    jsonOr.or = [{
                                                        field      : 'login',
                                                        comparison : 'lk',
                                                        value      : searchKeyword
                                                    },{
                                                        field      : 'email',
                                                        comparison : 'lk',
                                                        value      : searchKeyword
                                                    },{
                                                        field      : 'status',
                                                        comparison : 'eq',
                                                        value      : searchKeyword
                                                    }];
                                                    jsonSearch.and.push(jsonOr);
                                                }
                                                Ext.Ajax.abort(store.proxy.activeRequest);
                                                store.proxy.extraParams = {
                                                    filters : Ext.JSON.encode(jsonSearch)
                                                };
                                                store.loadPage(1);
                                            }
                                        }
                                    },
                                    {
                                        xtype          : 'button',
                                        iconCls        : 'cancel-button',
                                        tooltip        : translateresources.filter.tooltipButton,
                                        fieldName      : groupId + 'FilterLogin',
                                        margin         : '46 6 6 3',
                                        cls            : 'x-btn-default-small blue-cyan',
                                        handler        : function() {
                                            var tabPanel = this.up('tabpanel');
                                            var activeItem = tabPanel.getActiveTab();
                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                            Ext.getCmp(moduleConfig.tab[activeIndex].id + 'FilterLogin').setValue('');
                                            var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                            var store = grid.getStore();
                                            var jsonSearch = new Object();
                                            var jsonOr = new Object();
                                            var login = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterLogin').getValue();
                                            var email = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterEmail').getValue();
                                            var status = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterStatus').getValue();
                                            var searchKeyword = Ext.getCmp('search'+moduleConfig.tab[activeIndex].id).getValue();
                                            jsonSearch.and = [];

                                            jsonSearch.and.push({
                                                field      : 'id_resourceDefinition',
                                                comparison : 'eq',
                                                value      : data[activeIndex]._id
                                            });

                                            if (email != '') {
                                                jsonSearch.and.push(
                                                    {
                                                        field      : 'email',
                                                        comparison : 'lk',
                                                        value      : email
                                                    }
                                                );
                                            }

                                            if (login != '') {
                                                jsonSearch.and.push(
                                                    {
                                                        field      : 'login',
                                                        comparison : 'lk',
                                                        value      : login
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

                                            if (searchKeyword !='') {
                                                jsonOr.or = [{
                                                    field      : 'login',
                                                    comparison : 'lk',
                                                    value      : searchKeyword
                                                },{
                                                    field      : 'email',
                                                    comparison : 'lk',
                                                    value      : searchKeyword
                                                },{
                                                    field      : 'status',
                                                    comparison : 'eq',
                                                    value      : searchKeyword
                                                }];
                                                jsonSearch.and.push(jsonOr);
                                            }
                                            Ext.Ajax.abort(store.proxy.activeRequest);
                                            store.proxy.extraParams = {
                                                filters : Ext.JSON.encode(jsonSearch)
                                            };
                                            store.loadPage(1);
                                        }
                                    }
                                ]
                            },{
                                xtype  : 'container',
                                flex   : 1,
                                layout : 'column',
                                items  : [
                                    {
                                        xtype           : 'textfield',
                                        fieldLabel      : translateresources.form.fieldEmail,
                                        labelAlign      : 'top',
                                        msgTarget       : 'under',
                                        id              : groupId + 'FilterEmail',
                                        emptyText       : translateresources.form.fieldEmail+'...',
                                        columnWidth     : 0.95,
                                        enableKeyEvents : true,
                                        allowBlank      : true,
                                        margin          : '20 0 0 0',
                                        width           : '60%',
                                        listeners       : {
                                            keyup : function (string) {
                                                var tabPanel = this.up('tabpanel');
                                                var activeItem = tabPanel.getActiveTab();
                                                var activeIndex = tabPanel.items.indexOf(activeItem);
                                                var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                                var store = grid.getStore();
                                                var jsonSearch = new Object();
                                                var jsonOr = new Object();
                                                var login = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterLogin').getValue();
                                                var email = this.value;
                                                var status = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterStatus').getValue();
                                                var searchKeyword = Ext.getCmp('search'+moduleConfig.tab[activeIndex].id).getValue();
                                                jsonSearch.and = [];

                                                jsonSearch.and.push({
                                                    field      : 'id_resourceDefinition',
                                                    comparison : 'eq',
                                                    value      : data[activeIndex]._id
                                                });

                                                if (email != '') {
                                                    jsonSearch.and.push(
                                                        {
                                                            field      : 'email',
                                                            comparison : 'lk',
                                                            value      : email
                                                        }
                                                    );
                                                }

                                                if (login != '') {
                                                    jsonSearch.and.push(
                                                        {
                                                            field      : 'login',
                                                            comparison : 'lk',
                                                            value      : login
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

                                                if (searchKeyword !='') {
                                                    jsonOr.or = [{
                                                        field      : 'login',
                                                        comparison : 'lk',
                                                        value      : searchKeyword
                                                    },{
                                                        field      : 'email',
                                                        comparison : 'lk',
                                                        value      : searchKeyword
                                                    },{
                                                        field      : 'status',
                                                        comparison : 'eq',
                                                        value      : searchKeyword
                                                    }];
                                                    jsonSearch.and.push(jsonOr);
                                                }
                                                Ext.Ajax.abort(store.proxy.activeRequest);
                                                store.proxy.extraParams = {
                                                    filters : Ext.JSON.encode(jsonSearch)
                                                };
                                                store.loadPage(1);
                                            }
                                        }
                                    },
                                    {
                                        xtype          : 'button',
                                        iconCls        : 'cancel-button',
                                        tooltip        : translateresources.filter.tooltipButton,
                                        fieldName      : groupId + 'FilterEmail',
                                        margin         : '46 6 6 3',
                                        cls            : 'x-btn-default-small blue-cyan',
                                        handler        : function() {
                                            var tabPanel = this.up('tabpanel');
                                            var activeItem = tabPanel.getActiveTab();
                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                            Ext.getCmp(moduleConfig.tab[activeIndex].id + 'FilterEmail').setValue('');
                                            var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                            var store = grid.getStore();
                                            var jsonSearch = new Object();
                                            var jsonOr = new Object();
                                            var login = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterLogin').getValue();
                                            var email = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterEmail').getValue();
                                            var status = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterStatus').getValue();
                                            var searchKeyword = Ext.getCmp('search'+moduleConfig.tab[activeIndex].id).getValue();
                                            jsonSearch.and = [];

                                            jsonSearch.and.push({
                                                field      : 'id_resourceDefinition',
                                                comparison : 'eq',
                                                value      : data[activeIndex]._id
                                            });

                                            if (email != '') {
                                                jsonSearch.and.push(
                                                    {
                                                        field      : 'email',
                                                        comparison : 'lk',
                                                        value      : email
                                                    }
                                                );
                                            }

                                            if (login != '') {
                                                jsonSearch.and.push(
                                                    {
                                                        field      : 'login',
                                                        comparison : 'lk',
                                                        value      : login
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

                                            if (searchKeyword !='') {
                                                jsonOr.or = [{
                                                    field      : 'login',
                                                    comparison : 'lk',
                                                    value      : searchKeyword
                                                },{
                                                    field      : 'email',
                                                    comparison : 'lk',
                                                    value      : searchKeyword
                                                },{
                                                    field      : 'status',
                                                    comparison : 'eq',
                                                    value      : searchKeyword
                                                }];
                                                jsonSearch.and.push(jsonOr);
                                            }
                                            Ext.Ajax.abort(store.proxy.activeRequest);
                                            store.proxy.extraParams = {
                                                filters : Ext.JSON.encode(jsonSearch)
                                            };
                                            store.loadPage(1);
                                        }
                                    }
                                ]
                            },{
                                xtype  : 'container',
                                flex   : 1,
                                layout : 'column',
                                items  : [
                                    {
                                        xtype          : 'combo',
                                        fieldLabel     : translateresources.form.fieldStatus,
                                        labelAlign     : 'top',
                                        msgTarget      : 'under',
                                        id             : groupId + 'FilterStatus',
                                        emptyText      : translateresources.form.fieldStatus+'...',
                                        columnWidth    : 0.95,
                                        typeAhead      : false,
                                        forceSelection : true,
                                        displayField   : 'name',
                                        valueField     : 'status',
                                        minChars       : 0,
                                        anchor         :'100%',
                                        pageSize       : 10,
                                        labelWidth     : '100%',
                                        triggerAction  : 'all',
                                        editable       : false,
                                        allowBlank     : true,
                                        margin         : '20 0 0 0',
                                        width          : '60%',
                                        queryMode      : 'local',
                                        store          : Ext.create('Ext.data.Store', {
                                            fields         : ['status', 'name'],
                                            data           : [
                                                {"status" : "active",   "name" : translate.global.statusActive},
                                                {"status" : "inactive", "name" : translate.global.statusInactive}
                                            ]
                                        }),
                                        listeners      : {
                                            select : function (string) {
                                                var tabPanel = this.up('tabpanel');
                                                var activeItem = tabPanel.getActiveTab();
                                                var activeIndex = tabPanel.items.indexOf(activeItem);
                                                var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                                var store = grid.getStore();
                                                var jsonSearch = new Object();
                                                var jsonOr = new Object();
                                                var login = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterLogin').getValue();
                                                var email = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterEmail').getValue();
                                                var status = this.value;
                                                var searchKeyword = Ext.getCmp('search'+moduleConfig.tab[activeIndex].id).getValue();
                                                jsonSearch.and = [];

                                                jsonSearch.and.push({
                                                    field      : 'id_resourceDefinition',
                                                    comparison : 'eq',
                                                    value      : data[activeIndex]._id
                                                });

                                                if (email != '') {
                                                    jsonSearch.and.push(
                                                        {
                                                            field      : 'email',
                                                            comparison : 'lk',
                                                            value      : email
                                                        }
                                                    );
                                                }

                                                if (login != '') {
                                                    jsonSearch.and.push(
                                                        {
                                                            field      : 'login',
                                                            comparison : 'lk',
                                                            value      : login
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

                                                if (searchKeyword !='') {
                                                    jsonOr.or = [{
                                                        field      : 'login',
                                                        comparison : 'lk',
                                                        value      : searchKeyword
                                                    },{
                                                        field      : 'email',
                                                        comparison : 'lk',
                                                        value      : searchKeyword
                                                    },{
                                                        field      : 'status',
                                                        comparison : 'eq',
                                                        value      : searchKeyword
                                                    }];
                                                    jsonSearch.and.push(jsonOr);
                                                }
                                                Ext.Ajax.abort(store.proxy.activeRequest);
                                                store.proxy.extraParams = {
                                                    filters : Ext.JSON.encode(jsonSearch)
                                                };
                                                store.loadPage(1);
                                            }
                                        }
                                    },
                                    {
                                        xtype          : 'button',
                                        iconCls        : 'cancel-button',
                                        tooltip        : translateresources.filter.tooltipButton,
                                        fieldName      : groupId + 'FilterStatus',
                                        margin         : '46 6 6 3',
                                        cls            : 'x-btn-default-small blue-cyan',
                                        handler        : function() {
                                            var tabPanel = this.up('tabpanel');
                                            var activeItem = tabPanel.getActiveTab();
                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                            Ext.getCmp(moduleConfig.tab[activeIndex].id + 'FilterStatus').setValue('');
                                            var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                            var store = grid.getStore();
                                            var jsonSearch = new Object();
                                            var jsonOr = new Object();
                                            var login = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterLogin').getValue();
                                            var email = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterEmail').getValue();
                                            var status = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterStatus').getValue();
                                            var searchKeyword = Ext.getCmp('search'+moduleConfig.tab[activeIndex].id).getValue();
                                            jsonSearch.and = [];

                                            jsonSearch.and.push({
                                                field      : 'id_resourceDefinition',
                                                comparison : 'eq',
                                                value      : data[activeIndex]._id
                                            });

                                            if (email != '') {
                                                jsonSearch.and.push(
                                                    {
                                                        field      : 'email',
                                                        comparison : 'lk',
                                                        value      : email
                                                    }
                                                );
                                            }

                                            if (login != '') {
                                                jsonSearch.and.push(
                                                    {
                                                        field      : 'login',
                                                        comparison : 'lk',
                                                        value      : login
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

                                            if (searchKeyword !='') {
                                                jsonOr.or = [{
                                                    field      : 'login',
                                                    comparison : 'lk',
                                                    value      : searchKeyword
                                                },{
                                                    field      : 'email',
                                                    comparison : 'lk',
                                                    value      : searchKeyword
                                                },{
                                                    field      : 'status',
                                                    comparison : 'eq',
                                                    value      : searchKeyword
                                                }];
                                                jsonSearch.and.push(jsonOr);
                                            }
                                            Ext.Ajax.abort(store.proxy.activeRequest);
                                            store.proxy.extraParams = {
                                                filters : Ext.JSON.encode(jsonSearch)
                                            };
                                            store.loadPage(1);
                                        }
                                    }
                                ]
                            });

                            for (var g=0; g < attributes.length; g++) {
                                var nStr = '';
                                var nStr2 = '';
                                var fieldName = '';
                                var origCad = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
                                var normCad = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuuNnCc";
                                var string = '';
                                var fieldNameCustomAttributes = '';
                                string = attributes[g].fieldLabel;
                                arrCad = string.split(" ");
                                for(var x=0; x < arrCad.length ; x++) {
                                    if (x > 0) {
                                        nStr = arrCad[x].substr(0,1).toUpperCase()+arrCad[x].substr(1,arrCad[x].length).toLowerCase();
                                    }
                                    else {
                                        nStr = arrCad[x].toLowerCase();
                                    }

                                    var ucF = arrCad[x].substr(0,1).toUpperCase()+arrCad[x].substr(1,arrCad[x].length).toLowerCase();
                                    nStr2 = nStr2 + ucF;

                                    for (var y=0; y < origCad.length; y++) {
                                        nStr = nStr.replace(origCad.charAt(y), normCad.charAt(y));
                                        fieldName = nStr2.replace(origCad.charAt(y), normCad.charAt(y));
                                    }
                                    fieldNameCustomAttributes = fieldNameCustomAttributes + nStr;
                                }

                                filterForm.push({
                                    xtype  : 'container',
                                    flex   : 1,
                                    layout : 'column',
                                    items  : [
                                        {
                                            xtype           : 'textfield',
                                            fieldLabel      : attributes[g].fieldLabel,
                                            labelAlign      : 'top',
                                            msgTarget       : 'under',
                                            id              : groupId + 'Filter' + fieldName,
                                            name            : fieldNameCustomAttributes,
                                            emptyText       : attributes[g].fieldLabel+'...',
                                            columnWidth     : 0.95,
                                            enableKeyEvents : true,
                                            allowBlank      : true,
                                            margin          : '20 0 0 0',
                                            width           : '60%',
                                            listeners       : {
                                                keyup : function (string) {
                                                    var tabPanel = this.up('tabpanel');
                                                    var activeItem = tabPanel.getActiveTab();
                                                    var activeIndex = tabPanel.items.indexOf(activeItem);
                                                    var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                                    var store = grid.getStore();
                                                    var jsonSearch = new Object();
                                                    var jsonOr = new Object();
                                                    var login = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterLogin').getValue();
                                                    var email = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterEmail').getValue();
                                                    var status = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterStatus').getValue();
                                                    var dynamicField = this.value;
                                                    var searchKeyword = Ext.getCmp('search'+moduleConfig.tab[activeIndex].id).getValue();
                                                    jsonSearch.and = [];

                                                    jsonSearch.and.push({
                                                        field      : 'id_resourceDefinition',
                                                        comparison : 'eq',
                                                        value      : data[activeIndex]._id
                                                    });

                                                    if (email != '') {
                                                        jsonSearch.and.push(
                                                            {
                                                                field      : 'email',
                                                                comparison : 'lk',
                                                                value      : email
                                                            }
                                                        );
                                                    }

                                                    if (login != '') {
                                                        jsonSearch.and.push(
                                                            {
                                                                field      : 'login',
                                                                comparison : 'lk',
                                                                value      : login
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

                                                    if (dynamicField != '') {
                                                        jsonSearch.and.push(
                                                            {
                                                                field      : 'customAttributes.'+this.name,
                                                                comparison : 'lk',
                                                                value      : dynamicField
                                                            }
                                                        );
                                                    }

                                                    if (searchKeyword !='') {
                                                        jsonOr.or = [{
                                                            field      : 'login',
                                                            comparison : 'lk',
                                                            value      : searchKeyword
                                                        },{
                                                            field      : 'email',
                                                            comparison : 'lk',
                                                            value      : searchKeyword
                                                        },{
                                                            field      : 'status',
                                                            comparison : 'eq',
                                                            value      : searchKeyword
                                                        }];
                                                        jsonSearch.and.push(jsonOr);
                                                    }
                                                    Ext.Ajax.abort(store.proxy.activeRequest);
                                                    store.proxy.extraParams = {
                                                        filters : Ext.JSON.encode(jsonSearch)
                                                    };
                                                    store.loadPage(1);
                                                }
                                            }
                                        },
                                        {
                                            xtype          : 'button',
                                            iconCls        : 'cancel-button',
                                            tooltip        : translateresources.filter.tooltipButton,
                                            fieldName      : groupId + 'Filter' + fieldName,
                                            margin         : '46 6 6 3',
                                            cls            : 'x-btn-default-small blue-cyan',
                                            listeners      : {
                                                click      : function() {
                                                    var tabPanel = this.up('tabpanel');
                                                    var activeItem = tabPanel.getActiveTab();
                                                    var activeIndex = tabPanel.items.indexOf(activeItem);

                                                    Ext.getCmp(this.fieldName).setValue('');
                                                    var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                                    var store = grid.getStore();
                                                    var jsonSearch = new Object();
                                                    var jsonOr = new Object();
                                                    var login = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterLogin').getValue();
                                                    var email = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterEmail').getValue();
                                                    var status = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterStatus').getValue();
                                                    var dynamicField = Ext.getCmp(this.fieldName).getValue();
                                                    var searchKeyword = Ext.getCmp('search'+moduleConfig.tab[activeIndex].id).getValue();
                                                    jsonSearch.and = [];

                                                    jsonSearch.and.push({
                                                        field      : 'id_resourceDefinition',
                                                        comparison : 'eq',
                                                        value      : data[activeIndex]._id
                                                    });

                                                    if (email != '') {
                                                        jsonSearch.and.push(
                                                            {
                                                                field      : 'email',
                                                                comparison : 'lk',
                                                                value      : email
                                                            }
                                                        );
                                                    }

                                                    if (login != '') {
                                                        jsonSearch.and.push(
                                                            {
                                                                field      : 'login',
                                                                comparison : 'lk',
                                                                value      : login
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

                                                    if (dynamicField != '') {
                                                        jsonSearch.and.push(
                                                            {
                                                                field      : 'customAttributes.'+fieldName,
                                                                comparison : 'lk',
                                                                value      : dynamicField
                                                            }
                                                        );
                                                    }

                                                    if (searchKeyword !='') {
                                                        jsonOr.or = [{
                                                            field      : 'login',
                                                            comparison : 'lk',
                                                            value      : searchKeyword
                                                        },{
                                                            field      : 'email',
                                                            comparison : 'lk',
                                                            value      : searchKeyword
                                                        },{
                                                            field      : 'status',
                                                            comparison : 'eq',
                                                            value      : searchKeyword
                                                        }];
                                                        jsonSearch.and.push(jsonOr);
                                                    }
                                                    Ext.Ajax.abort(store.proxy.activeRequest);
                                                    store.proxy.extraParams = {
                                                        filters : Ext.JSON.encode(jsonSearch)
                                                    };
                                                    store.loadPage(1);
                                                }
                                            }
                                        }
                                    ]
                                });
								
								var newItem = {
                                    xtype             : attributes[g].xtype,
                                    fieldLabel        : attributes[g].fieldLabel,
                                    afterLabelTextTpl : AppGlobals.required,
                                    labelAlign        : 'top',
                                    msgTarget         : 'side',
                                    width             : '100%',
                                    labelWidth        : 100,
                                    id                : groupId + 'Form' + fieldName,
                                    name              : fieldNameCustomAttributes,
                                    emptyText         : attributes[g].fieldLabel+'...',
                                    allowBlank        : false,
                                    flex              : 4,
                                    margin            : '0 10 0 10'
                                };
								
								if(newItem.xtype == 'timefield'){
									newItem.format = 'H:i';
									newItem.submitFormat = 'H:i';
								}
								
                                moduleForm.push(newItem);
                            }

                            moduleConfig.tab[i].rolesForm = [
                                {
                                    xtype       : 'fieldset',
                                    title       : translateresources.formRoles.fieldset,
                                    defaultType : 'textfield',
                                    layout      : 'anchor',
                                    defaults    : {
                                        anchor  : '100%'
                                    },
                                    items: [
                                    {
                                        xtype       : 'container',
                                        layout      : 'hbox',
                                        margin      : '5 5 5 5',
                                        items       : [
                                            {
                                                xtype             : 'combo',
                                                fieldLabel        : translateresources.formRoles.fieldLabelApplication,
                                                afterLabelTextTpl : AppGlobals.required,
                                                id                : groupId + 'FormApplication',
                                                name              : 'application',
                                                loadingText       : 'loading...',
                                                emptyText         : translateresources.formRoles.emptyTextApplication,
                                                typeAhead         : false,
                                                forceSelection    : true,
                                                allowBlank        : false,
                                                flex              : 4,
                                                displayField      : 'name',
                                                valueField        : '_id',
                                                minChars          : 0,
                                                margin            : '10 10 10 10',
                                                pageSize          : 10,
                                                labelWidth        : '100%',
                                                triggerAction     : 'all',
                                                editable          : false,
                                                store             : 'Resources.ListComboApplication',
                                                listeners         : {
                                                    select : function (combo, record, index) {
                                                        var form = this.up('form').getForm();
                                                        var comboRole = form.findField('role');
                                                        var id_role = record[0].get('name');
                                                        comboRole.clearValue();
                                                        comboRole.reset();
                                                        comboRole.store.proxy.extraParams = {
                                                            filters : Ext.JSON.encode({
                                                                "and":[{
                                                                    "field"      : "application.name",
                                                                    "comparison" : "eq",
                                                                    "value"      : id_role
                                                                }]
                                                            })
                                                        };
                                                        comboRole.store.load();
                                                        comboRole.enable();
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                    ,
                                    {
                                        xtype       : 'container',
                                        layout      : 'hbox',
                                        margin      : '5 5 5 5',
                                        items       : [
                                            {
                                                xtype             : 'combo',
                                                fieldLabel        : translateresources.formRoles.fieldLabelRole,
                                                afterLabelTextTpl : AppGlobals.required,
                                                id                : groupId + 'FormRole',
                                                name              : 'role',
                                                loadingText       : 'loading...',
                                                emptyText         : translateresources.formRoles.emptyTextRole,
                                                typeAhead         : false,
                                                forceSelection    : true,
                                                allowBlank        : false,
                                                flex              : 4,
                                                displayField      : 'name',
                                                valueField        : '_id',
                                                minChars          : 0,
                                                margin            : '10 10 10 10',
                                                pageSize          : 10,
                                                labelWidth        : '100%',
                                                triggerAction     : 'all',
                                                editable          : false,
                                                disabled          : true,
                                                store             : 'Resources.ListComboRoles'
                                            }
                                        ]
                                    }
                                    ]
                                }
                            ];

                            moduleConfig.tab[i].gridRolesForm = [
                                {
                                    xtype       : 'gridpanel',
                                    id          : groupId+'GridRoles',
                                    border      : false,
                                    columns     : [
                                        {
                                            text      : 'ID',
                                            dataIndex : 'id_role',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : true,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.form.gridRolesColumnRoleName,
                                            dataIndex : 'roleName',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.form.gridRolesColumnApplicationName,
                                            dataIndex : 'applicationName',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true
                                        }
                                    ],
                                    store       : controller+'.ListRoles',
                                    loadMask    : true,
                                    autoHeight  : true,
                                    multiSelect : true,
                                    selType     : 'checkboxmodel',
                                    selModel    : {
                                        checkOnly      : false,
                                        injectCheckbox : 0
                                    },
                                    viewConfig  : {
                                        forceFit            : true,
                                        enableTextSelection : true
                                    },
                                    listeners: {
                                        itemcontextmenu : function (record, item, index, e, eOpts) {
                                            eOpts.stopEvent();
                                            var xy = eOpts.getXY();
                                            new Ext.menu.Menu({
                                                items : [
                                                    {
                                                        text    : translate.global.delete,
                                                        iconCls : 'delete-menu',
                                                        handler : function() {
                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                            var tabPanel = grid.up('tabpanel');
                                                            var activeItem = tabPanel.getActiveTab();
                                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                                            var gridRoles = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridRoles');
                                                            var storeRoles = gridRoles.getStore();
                                                            var selectedRecords = gridRoles.getSelectionModel().getSelection();

                                                            if (selectedRecords.length > 0) {
                                                                storeRoles.remove(selectedRecords);
                                                            }
                                                        }
                                                    }
                                                ]
                                            }).showAt(xy);
                                        }
                                    },
                                    dockedItems : [
                                        {
                                            xtype  : 'toolbar',
                                            flex   : 1,
                                            dock   : 'top',
                                            ui     : 'footer',
                                            layout : {
                                                pack : 'end',
                                                type : 'hbox'
                                            }
                                            ,
                                            items : [
                                                '->'
                                                ,
                                                {
                                                    text    : translate.global.assign,
                                                    id      : 'AssignRoles'+groupId,
                                                    action  : 'AssignRoles'+groupId,
                                                    iconCls : 'add-button',
                                                    cls     : 'x-btn-default-small',
                                                    handler : function() {
                                                        var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                        var tabPanel = grid.up('tabpanel');
                                                        var activeItem = tabPanel.getActiveTab();
                                                        var activeIndex = tabPanel.items.indexOf(activeItem);

                                                        var windowAssignRoles = Ext.create('Ext.window.Window', {
                                                            title       : translate.global.assign+' '+translateresources.form.roles,
                                                            id          : 'windowAssignRoles'+moduleConfig.tab[activeIndex].id,
                                                            modal       : true,
                                                            width       : '40%',
                                                            height      : '70%',
                                                            minWidth    : '40%',
                                                            minHeight   : '70%',
                                                            layout      : 'fit',
                                                            resizable   : false,
                                                            draggable   : false,
                                                            closeAction : 'destroy',
                                                            autoDestroy : true
                                                        });
                                                        windowAssignRoles.add(
                                                            {
                                                                xtype          : 'form',
                                                                id             : 'FormAssignRoles'+moduleConfig.tab[activeIndex].id,
                                                                frame          : false,
                                                                autoScroll     : true,
                                                                autoHeight     : true,
                                                                bodyPadding    : 5,
                                                                fieldDefaults  : {
                                                                    labelAlign : 'top',
                                                                    msgTarget  : 'side'
                                                                },
                                                                items          : moduleConfig.tab[activeIndex].rolesForm
                                                            }
                                                        );
                                                        windowAssignRoles.addDocked(
                                                        {
                                                            xtype  : 'toolbar',
                                                            flex   : 1,
                                                            dock   : 'bottom',
                                                            ui     : 'footer',
                                                            layout : {
                                                                pack   : 'end',
                                                                type   : 'hbox'
                                                            }
                                                            ,
                                                            items : [
                                                                {
                                                                    text      : translate.global.cancel,
                                                                    iconCls   : 'cancel-button',
                                                                    id        : 'cancelButtonAssignRoles'+moduleConfig.tab[activeIndex].id,
                                                                    handler   : function() {
                                                                        var win = this.up('window');
                                                                        win.destroy();
                                                                    }
                                                                },
                                                                {
                                                                    text      : translate.global.add,
                                                                    iconCls   : 'ok-button',
                                                                    id        : 'addButtonAssignRoles'+moduleConfig.tab[activeIndex].id,
                                                                    handler   : function() {
                                                                        var win = this.up('window');
                                                                        var form = win.down('form').getForm();
                                                                        if (form.isValid()) {
                                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                                            var tabPanel = grid.up('tabpanel');
                                                                            var activeItem = tabPanel.getActiveTab();
                                                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                                                            var storeRoles = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridRoles').getStore();
                                                                            var id_role = form.findField("role").getValue();
                                                                            var roleName = form.findField("role").getRawValue();
                                                                            var applicationName = form.findField("application").getRawValue();
                                                                            var exist = 0;

                                                                            storeRoles.each(function(record) {
                                                                                if ( (record.data['roleName'] == roleName) && (record.data['applicationName'] == applicationName) ) {
                                                                                    exist = 1;
                                                                                }
                                                                            });

                                                                            if (exist == 1) {
                                                                                Ext.MessageBox.show({
                                                                                    title        : translate.global.assign+' '+translateresources.form.roles,
                                                                                    msg          : translateresources.recordExist,
                                                                                    animCollapse : true,
                                                                                    buttons      : Ext.MessageBox.OK,
                                                                                    icon         : Ext.MessageBox.WARNING
                                                                                });
                                                                            } else {
                                                                                storeRoles.add({
                                                                                    'id_role'               : id_role,
                                                                                    'roleName'              : roleName,
                                                                                    'applicationName'       : applicationName
                                                                                });
                                                                                win.destroy();
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        );
                                                        windowAssignRoles.show();
                                                    }
                                                }
                                                ,
                                                {
                                                    text    : translate.global.delete,
                                                    id      : 'DeleteRoles'+groupId,
                                                    action  : 'DeleteRoles'+groupId,
                                                    iconCls : 'remove-button',
                                                    cls     : 'x-btn-default-small',
                                                    handler : function() {
                                                        var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                        var tabPanel = grid.up('tabpanel');
                                                        var activeItem = tabPanel.getActiveTab();
                                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                                        var gridRoles = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridRoles');
                                                        var storeRoles = gridRoles.getStore();
                                                        var selectedRecords = gridRoles.getSelectionModel().getSelection();

                                                        if (selectedRecords.length > 0) {
                                                            storeRoles.remove(selectedRecords);
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ];

                            moduleConfig.tab[i].filterDevices = filterAndDevDef;
                            moduleConfig.tab[i].devicesForm = [
                                {
                                    xtype       : 'fieldset',
                                    title       : translateresources.formDevices.fieldset,
                                    defaultType : 'textfield',
                                    layout      : 'anchor',
                                    defaults    : {
                                        anchor  : '100%'
                                    },
                                    items: [{
                                        xtype       : 'container',
                                        layout      : 'hbox',
                                        margin      : '5 5 5 5',
                                        items       : [
                                            {
                                                xtype             : 'combo',
                                                fieldLabel        : translateresources.formDevices.fieldLabelDeviceType,
                                                afterLabelTextTpl : AppGlobals.required,
                                                id                : groupId + 'FormDeviceType',
                                                name              : 'devicetype',
                                                loadingText       : 'loading...',
                                                emptyText         : translateresources.formDevices.emptyTextDeviceType,
                                                typeAhead         : false,
                                                forceSelection    : true,
                                                allowBlank        : false,
                                                flex              : 4,
                                                displayField      : 'name',
                                                valueField        : '_id',
                                                minChars          : 0,
                                                margin            : '10 10 10 10',
                                                pageSize          : 10,
                                                labelWidth        : '100%',
                                                triggerAction     : 'all',
                                                editable          : false,
                                                disabled          : false,
                                                store             : Ext.create('Ext.data.Store', {
                                                    pageSize   : 10,
                                                    model      : Ext.define('LoadPrincipal.model.Resources.ListComboDevicesType', {
                                                        extend     : 'Ext.data.Model',
                                                        fields     : [
                                                            {name : '_id', mapping: '_id', type: 'string'},
                                                            {name : 'name', mapping: 'name', type: 'string'}
                                                        ],
                                                        idProperty : '_id'
                                                    }),
                                                    autoLoad   : false,
                                                    remoteSort : true,
                                                    proxy      : {
                                                        type                : 'ajax',
                                                        useDefaultXhrHeader : false,
                                                        method              : 'GET',
                                                        url                 : moduleConfig.services.urlComboDevicesType+moduleConfig.tab[i].filterDevices,
                                                        reader : {
                                                            type          : 'json',
                                                            root          : 'data',
                                                            totalProperty : 'pagination.total'
                                                        }
                                                    },
                                                    sorters    : [{
                                                        property  : 'name',
                                                        direction : 'DESC'
                                                    }]
                                                }),
                                                listeners         : {
                                                    select : function (combo, record, index) {
                                                        var form = this.up('form').getForm();
                                                        var comboDeviceType = form.findField('device');
                                                        var id = this.value;
                                                        comboDeviceType.clearValue();
                                                        comboDeviceType.reset();
                                                        comboDeviceType.store.proxy.extraParams = {
                                                            filters : Ext.JSON.encode({
                                                                "and":[
                                                                    {
                                                                        "field"      : "id_deviceDefinition",
                                                                        "comparison" : "eq",
                                                                        "value"      : id
                                                                    }
                                                                    ,
                                                                    {
                                                                        "field"      : "isUsed",
                                                                        "comparison" : "eq",
                                                                        "value"      : false
                                                                    }
                                                                    ,
                                                                    {
                                                                        "field"      : "id_company",
                                                                        "comparison" : "eq",
                                                                        "value"      : storageIdCompany
                                                                    }
                                                                ]
                                                            })
                                                        };
                                                        comboDeviceType.store.load();
                                                        comboDeviceType.enable();
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                    ,
                                    {
                                        xtype       : 'container',
                                        layout      : 'hbox',
                                        margin      : '5 5 5 5',
                                        items       : [
                                            {
                                                xtype             : 'combo',
                                                fieldLabel        : translateresources.formDevices.fieldLabelDevice,
                                                afterLabelTextTpl : AppGlobals.required,
                                                id                : groupId + 'FormDevice',
                                                name              : 'device',
                                                loadingText       : 'loading...',
                                                emptyText         : translateresources.formDevices.emptyTextDevice,
                                                typeAhead         : false,
                                                forceSelection    : true,
                                                allowBlank        : false,
                                                flex              : 4,
                                                displayField      : 'serial',
                                                valueField        : '_id',
                                                minChars          : 0,
                                                margin            : '10 10 10 10',
                                                pageSize          : 10,
                                                labelWidth        : '100%',
                                                triggerAction     : 'all',
                                                editable          : false,
                                                disabled          : true,
                                                store             : 'Resources.ListComboDevices'
                                            }
                                        ]
                                    }
                                    ]
                                }
                            ];

                            moduleConfig.tab[i].gridDevicesForm = [
                                {
                                    xtype       : 'gridpanel',
                                    id          : groupId+'GridDevices',
                                    border      : false,
                                    columns     : [
                                        {
                                            text      : 'ID',
                                            dataIndex : 'id_deviceDefinition',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : true,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : 'Device',
                                            dataIndex : 'device',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : true,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.form.gridDevicesColumnSerial,
                                            dataIndex : 'serial',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.form.gridDevicesColumnAttributes,
                                            dataIndex : 'Attributes',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var k = Object.keys(value);
                                                var longitud = k.length;
                                                var n = 1;
                                                var result = '';
                                                if (longitud > 0){
                                                    for (var i in value) {
                                                        if(n == longitud){
                                                            result += i + " = " + value[i] + ".";
                                                        }
                                                        else{
                                                            result += i + " = " + value[i] + ", ";
                                                        }
                                                        n++;
                                                    }
                                                }
                                                return result;
                                            }
                                        }
                                        ,
                                        {
                                            text      : 'Object '+translateresources.form.gridDevicesColumnAttributes,
                                            dataIndex : 'objectAttributes',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : true,
                                            sortable  : true
                                        }
                                    ],
                                    store       : controller+'.ListDevices',
                                    loadMask    : true,
                                    autoHeight  : true,
                                    multiSelect : true,
                                    selType     : 'checkboxmodel',
                                    selModel    : {
                                        checkOnly      : false,
                                        injectCheckbox : 0
                                    },
                                    viewConfig  : {
                                        forceFit            : true,
                                        enableTextSelection : true
                                    },
                                    listeners: {
                                        itemcontextmenu : function (record, item, index, e, eOpts) {
                                            eOpts.stopEvent();
                                            var xy = eOpts.getXY();
                                            new Ext.menu.Menu({
                                                items : [
                                                    {
                                                        text    : translate.global.edit,
                                                        iconCls : 'edit-menu',
                                                        handler : function() {

                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                            var tabPanel = grid.up('tabpanel');
                                                            var activeItem = tabPanel.getActiveTab();
                                                            var activeIndex = tabPanel.items.indexOf(activeItem);

                                                            var windowEditDevices = Ext.create('Ext.window.Window', {
                                                                title       : translate.global.edit+' '+translateresources.form.devices,
                                                                id          : 'windowEditDevices'+moduleConfig.tab[activeIndex].id,
                                                                modal       : true,
                                                                width       : '40%',
                                                                height      : '70%',
                                                                minWidth    : '40%',
                                                                minHeight   : '70%',
                                                                layout      : 'fit',
                                                                resizable   : false,
                                                                draggable   : false,
                                                                closeAction : 'destroy',
                                                                autoDestroy : true
                                                            });
                                                            windowEditDevices.add(
                                                                {
                                                                    xtype          : 'form',
                                                                    id             : 'FormEditDevices'+moduleConfig.tab[activeIndex].id,
                                                                    frame          : false,
                                                                    autoScroll     : true,
                                                                    autoHeight     : true,
                                                                    bodyPadding    : 5,
                                                                    fieldDefaults  : {
                                                                        labelAlign : 'top',
                                                                        msgTarget  : 'side'
                                                                    },
                                                                    items          : moduleConfig.tab[activeIndex].devicesForm
                                                                }
                                                            );
                                                            windowEditDevices.addDocked(
                                                            {
                                                                xtype  : 'toolbar',
                                                                flex   : 1,
                                                                dock   : 'bottom',
                                                                ui     : 'footer',
                                                                layout : {
                                                                    pack   : 'end',
                                                                    type   : 'hbox'
                                                                }
                                                                ,
                                                                items : [
                                                                    {
                                                                        text      : translate.global.cancel,
                                                                        iconCls   : 'cancel-button',
                                                                        id        : 'cancelButtonEditDevices'+moduleConfig.tab[activeIndex].id,
                                                                        handler   : function() {
                                                                            var win = this.up('window');
                                                                            win.destroy();
                                                                        }
                                                                    },
                                                                    {
                                                                        text      : translate.global.add,
                                                                        iconCls   : 'ok-button',
                                                                        id        : 'addButtonEditDevices'+moduleConfig.tab[activeIndex].id,
                                                                        handler   : function() {
                                                                            var win = this.up('window');
                                                                            var form = win.down('form').getForm();
                                                                            if (form.isValid()) {
                                                                                var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                                                var tabPanel = grid.up('tabpanel');
                                                                                var activeItem = tabPanel.getActiveTab();
                                                                                var activeIndex = tabPanel.items.indexOf(activeItem);
                                                                                var storeDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridDevices').getStore();
                                                                                var device = form.findField("devicetype").getValue();
                                                                                var id_deviceDefinition = form.findField("device").getValue();
                                                                                var serial = form.findField("device").getRawValue();
                                                                                var comboDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FormDevice');
                                                                                var v = comboDevices.getValue();
                                                                                var record = comboDevices.findRecord(comboDevices.valueField || comboDevices.displayField, v);
                                                                                var customAttributes = record.get('Attributes');

                                                                                storeDevices.each(function(record) {
                                                                                    if (record.data['device'] == device) {
                                                                                        storeDevices.remove(record);
                                                                                    }
                                                                                });

                                                                                storeDevices.add({
                                                                                    'id_deviceDefinition' : id_deviceDefinition,
                                                                                    'device'              : device,
                                                                                    'serial'              : serial,
                                                                                    'Attributes'          : customAttributes,
                                                                                    'objectAttributes'    : customAttributes
                                                                                });
                                                                                win.destroy();

                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                            );
                                                            windowEditDevices.show();
                                                            var gridDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridDevices');
                                                            var storeDevices = gridDevices.getStore();
                                                            var selectedRecords = gridDevices.getSelectionModel().getSelection();
                                                            Ext.getCmp(moduleConfig.tab[activeIndex].id+'FormDeviceType').store.load();
                                                            Ext.getCmp(moduleConfig.tab[activeIndex].id+'FormDevice').store.load();
                                                            if (selectedRecords.length > 0) {
                                                                var recordDevices = selectedRecords[0];
                                                                var id_deviceDefinition = recordDevices.get('id_deviceDefinition');
                                                                var serial = recordDevices.get('serial');
                                                                var device = recordDevices.get('device');
                                                                var comboDeviceType = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FormDeviceType');
                                                                var comboDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FormDevice');
                                                                comboDeviceType.disable();
                                                                comboDevices.enable();
                                                                comboDevices.setValue(id_deviceDefinition);
                                                                comboDeviceType.setValue(device);
                                                            }
                                                        }
                                                    }
                                                    ,
                                                    {
                                                        text    : translate.global.delete,
                                                        iconCls : 'delete-menu',
                                                        handler : function() {
                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                            var tabPanel = grid.up('tabpanel');
                                                            var activeItem = tabPanel.getActiveTab();
                                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                                            var gridDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridDevices');
                                                            var storeDevices = gridDevices.getStore();
                                                            var selectedRecords = gridDevices.getSelectionModel().getSelection();

                                                            if (selectedRecords.length > 0) {
                                                                storeDevices.remove(selectedRecords);
                                                            }
                                                        }
                                                    }
                                                ]
                                            }).showAt(xy);
                                        }
                                    },
                                    dockedItems : [
                                        {
                                            xtype  : 'toolbar',
                                            flex   : 1,
                                            dock   : 'top',
                                            ui     : 'footer',
                                            layout : {
                                                pack : 'end',
                                                type : 'hbox'
                                            }
                                            ,
                                            items : [
                                                '->'
                                                ,
                                                {
                                                    text    : translate.global.assign,
                                                    id      : 'AssignDevices'+groupId,
                                                    action  : 'AssignDevices'+groupId,
                                                    iconCls : 'add-button',
                                                    cls     : 'x-btn-default-small',
                                                    handler : function() {
                                                        var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                        var tabPanel = grid.up('tabpanel');
                                                        var activeItem = tabPanel.getActiveTab();
                                                        var activeIndex = tabPanel.items.indexOf(activeItem);

                                                        var windowAssignDevices = Ext.create('Ext.window.Window', {
                                                            title       : translate.global.assign+' '+translateresources.form.devices,
                                                            id          : 'windowAssignDevices'+moduleConfig.tab[activeIndex].id,
                                                            modal       : true,
                                                            width       : '40%',
                                                            height      : '70%',
                                                            minWidth    : '40%',
                                                            minHeight   : '70%',
                                                            layout      : 'fit',
                                                            resizable   : false,
                                                            draggable   : false,
                                                            closeAction : 'destroy',
                                                            autoDestroy : true
                                                        });
                                                        windowAssignDevices.add(
                                                            {
                                                                xtype          : 'form',
                                                                id             : 'FormAssignDevices'+moduleConfig.tab[activeIndex].id,
                                                                frame          : false,
                                                                autoScroll     : true,
                                                                autoHeight     : true,
                                                                bodyPadding    : 5,
                                                                fieldDefaults  : {
                                                                    labelAlign : 'top',
                                                                    msgTarget  : 'side'
                                                                },
                                                                items          : moduleConfig.tab[activeIndex].devicesForm
                                                            }
                                                        );
                                                        windowAssignDevices.addDocked(
                                                        {
                                                            xtype  : 'toolbar',
                                                            flex   : 1,
                                                            dock   : 'bottom',
                                                            ui     : 'footer',
                                                            layout : {
                                                                pack   : 'end',
                                                                type   : 'hbox'
                                                            }
                                                            ,
                                                            items : [
                                                                {
                                                                    text      : translate.global.cancel,
                                                                    iconCls   : 'cancel-button',
                                                                    id        : 'cancelButtonAssignDevices'+moduleConfig.tab[activeIndex].id,
                                                                    handler   : function() {
                                                                        var win = this.up('window');
                                                                        win.destroy();
                                                                    }
                                                                },
                                                                {
                                                                    text      : translate.global.add,
                                                                    iconCls   : 'ok-button',
                                                                    id        : 'addButtonAssignDevices'+moduleConfig.tab[activeIndex].id,
                                                                    handler   : function() {
                                                                        var win = this.up('window');
                                                                        var form = win.down('form').getForm();
                                                                        if (form.isValid()) {
                                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                                            var tabPanel = grid.up('tabpanel');
                                                                            var activeItem = tabPanel.getActiveTab();
                                                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                                                            var storeDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridDevices').getStore();
                                                                            var device = form.findField("devicetype").getValue();
                                                                            var id_deviceDefinition = form.findField("device").getValue();
                                                                            var serial = form.findField("device").getRawValue();
                                                                            var comboDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FormDevice');
                                                                            var v = comboDevices.getValue();
                                                                            var record = comboDevices.findRecord(comboDevices.valueField || comboDevices.displayField, v);
                                                                            var customAttributes = record.get('Attributes');
                                                                            var exist = 0;

                                                                            storeDevices.each(function(record) {
                                                                                if (record.data['device'] == device) {
                                                                                    exist = 1;
                                                                                }
                                                                            });

                                                                            if (exist == 1) {
                                                                                Ext.MessageBox.show({
                                                                                    title        : translate.global.assign+' '+translateresources.form.devices,
                                                                                    msg          : translateresources.form.gridDevicesRecordExist,
                                                                                    animCollapse : true,
                                                                                    buttons      : Ext.MessageBox.OK,
                                                                                    icon         : Ext.MessageBox.WARNING
                                                                                });
                                                                            } else {
                                                                                storeDevices.add({
                                                                                    'id_deviceDefinition' : id_deviceDefinition,
                                                                                    'device'              : device,
                                                                                    'serial'              : serial,
                                                                                    'Attributes'          : customAttributes,
                                                                                    'objectAttributes'    : customAttributes
                                                                                });
                                                                                win.destroy();
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        );
                                                        windowAssignDevices.show();
                                                    }
                                                }
                                                ,
                                                {
                                                    text    : translate.global.delete,
                                                    id      : 'DeleteDevices'+groupId,
                                                    action  : 'DeleteDevices'+groupId,
                                                    iconCls : 'remove-button',
                                                    cls     : 'x-btn-default-small',
                                                    handler : function() {
                                                        var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                        var tabPanel = grid.up('tabpanel');
                                                        var activeItem = tabPanel.getActiveTab();
                                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                                        var gridDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridDevices');
                                                        var storeDevices = gridDevices.getStore();
                                                        var selectedRecords = gridDevices.getSelectionModel().getSelection();

                                                        if (selectedRecords.length > 0) {
                                                            storeDevices.remove(selectedRecords);
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ];

                            moduleConfig.tab[i].filterResources = '?filters={"and":[{"or":[{"field" : "_id","comparison" : "eq","value" : "'+data[i]._id+'"}]}]}';
                            moduleConfig.tab[i].relatedResourcesForm = [
                                {
                                    xtype       : 'fieldset',
                                    title       : translateresources.formResources.fieldset,
                                    defaultType : 'textfield',
                                    layout      : 'anchor',
                                    defaults    : {
                                        anchor  : '100%'
                                    },
                                    items: [{
                                        xtype       : 'container',
                                        layout      : 'hbox',
                                        margin      : '5 5 5 5',
                                        items       : [
                                            {
                                                xtype             : 'combo',
                                                fieldLabel        : translateresources.formResources.fieldLabelResourceType,
                                                afterLabelTextTpl : AppGlobals.required,
                                                id                : groupId + 'FormResourceType',
                                                name              : 'resourcetype',
                                                emptyText         : translateresources.formResources.emptyTextResourceType,
                                                typeAhead         : false,
                                                forceSelection    : true,
                                                allowBlank        : false,
                                                flex              : 4,
                                                displayField      : 'name',
                                                valueField        : '_id',
                                                minChars          : 0,
                                                labelWidth        : '100%',
                                                triggerAction     : 'all',
                                                editable          : false,
                                                disabled          : false,
                                                store             : Ext.create('Ext.data.Store', {
                                                    fields : ['_id', 'name', 'Attributes'],
                                                    data   : dataStoreResourcesType
                                                }),
                                                queryMode         : 'local',
                                                listeners         : {
                                                    select : function (combo, record, index) {
                                                        var fm = this.up('form');
                                                        var form = fm.getForm();
                                                        var attributes = record[0].get('Attributes');
                                                        var comboResourceType = form.findField('resource');
                                                        var id = record[0].get('_id');
                                                        comboResourceType.clearValue();
                                                        comboResourceType.reset();
                                                        comboResourceType.store.proxy.extraParams = {
                                                            filters : Ext.JSON.encode({
                                                                "and":[{
                                                                    "field"      : "id_resourceDefinition",
                                                                    "comparison" : "eq",
                                                                    "value"      : id
                                                                }]
                                                            })
                                                        };
                                                        comboResourceType.store.load();
                                                        comboResourceType.enable();
                                                        if(attributes.length > 0) {
                                                            var itemsFm = [];
                                                            if(Ext.getCmp('FieldSetAttributes')) { 
                                                                fm.remove(Ext.getCmp('FieldSetAttributes'));
                                                                fm.doLayout();
                                                            }
                                                            for (var xx=0; xx < attributes.length; xx++) {
                                                                var newString = '';
                                                                var string = '';
                                                                var nameFm = '';
                                                                string = attributes[xx].fieldLabel;
                                                                arrayCadena = string.split(" ");
                                                                for(var x=0; x < arrayCadena.length ; x++) {
                                                                    if (x > 0) {
                                                                        newString = arrayCadena[x].substr(0,1).toUpperCase()+arrayCadena[x].substr(1,arrayCadena[x].length).toLowerCase();
                                                                    }
                                                                    else {
                                                                        newString = arrayCadena[x].toLowerCase();
                                                                    }
                                                                    for (var y=0; y < origin.length; y++) {
                                                                        newString = newString.replace(origin.charAt(y), normal.charAt(y));
                                                                    }
                                                                    nameFm = nameFm + newString;
                                                                }

                                                                itemsFm.push({
                                                                    xtype       : 'container',
                                                                    layout      : 'hbox',
                                                                    defaultType : 'textfield',
                                                                    margin      : '5 5 5 5',
                                                                    items       : [{
                                                                        xtype             : attributes[xx].xtype,
                                                                        fieldLabel        : attributes[xx].fieldLabel,
                                                                        afterLabelTextTpl : AppGlobals.required,
                                                                        id                : nameFm,
                                                                        name              : nameFm,
                                                                        emptyText         : attributes[xx].fieldLabel+'...',
                                                                        allowBlank        : false,
                                                                        flex              : 4
                                                                    }]
                                                                });
                                                            }
                                                            fm.add({
                                                                xtype       : 'fieldset',
                                                                title       : translateresources.formResources.fieldsetAttributes,
                                                                id          : 'FieldSetAttributes',
                                                                name        : 'FieldSetAttributes',
                                                                layout      : 'anchor',
                                                                defaults    : {
                                                                    anchor  : '100%'
                                                                },
                                                                items       : itemsFm
                                                            });
                                                            fm.doLayout();
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                    ,
                                    {
                                        xtype       : 'container',
                                        layout      : 'hbox',
                                        margin      : '5 5 5 5',
                                        items       : [
                                            {
                                                xtype             : 'combo',
                                                fieldLabel        : translateresources.formResources.fieldLabelResource,
                                                afterLabelTextTpl : AppGlobals.required,
                                                id                : groupId + 'FormResource',
                                                name              : 'resource',
                                                loadingText       : 'loading...',
                                                emptyText         : translateresources.formResources.emptyTextResource,
                                                typeAhead         : false,
                                                forceSelection    : true,
                                                allowBlank        : false,
                                                flex              : 4,
                                                displayField      : 'login',
                                                valueField        : '_id',
                                                minChars          : 0,
                                                pageSize          : 10,
                                                labelWidth        : '100%',
                                                triggerAction     : 'all',
                                                editable          : false,
                                                disabled          : true,
                                                store             : 'Resources.ListComboResources'
                                            }
                                        ]
                                    }
                                    ]
                                }
                            ];

                            moduleConfig.tab[i].gridResourcesForm = [
                                {
                                    xtype       : 'gridpanel',
                                    id          : groupId+'GridResources',
                                    border      : false,
                                    columns     : [
                                        {
                                            text      : 'ID Resource Instance',
                                            dataIndex : 'id_resourceInstance',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : true,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.form.gridResourcesColumnLogin,
                                            dataIndex : 'login',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.form.gridResourcesGroupColumnName,
                                            dataIndex : 'nameResource',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : true,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.form.gridDevicesColumnAttributes,
                                            dataIndex : 'Attributes',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true,
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var k = Object.keys(value);
                                                var longitud = k.length;
                                                var n = 1;
                                                var result = '';
                                                if (longitud > 0){
                                                    for (var i in value) {
                                                        if(n == longitud){
                                                            result += i + " = " + value[i] + ".";
                                                        }
                                                        else{
                                                            result += i + " = " + value[i] + ", ";
                                                        }
                                                        n++;
                                                    }
                                                }
                                                return result;
                                            }
                                        }
                                        ,
                                        {
                                            text      : 'Object '+translateresources.form.gridDevicesColumnAttributes,
                                            dataIndex : 'objectAttributes',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : true,
                                            sortable  : true
                                        }
                                    ],
                                    store       : controller+'.ListResources',
                                    loadMask    : true,
                                    autoHeight  : true,
                                    multiSelect : true,
                                    selType     : 'checkboxmodel',
                                    selModel    : {
                                        checkOnly      : false,
                                        injectCheckbox : 0
                                    },
                                    viewConfig  : {
                                        forceFit            : true,
                                        enableTextSelection : true
                                    },
                                    listeners: {
                                        itemcontextmenu : function (record, item, index, e, eOpts) {
                                            eOpts.stopEvent();
                                            var xy = eOpts.getXY();
                                            new Ext.menu.Menu({
                                                items : [
                                                    {
                                                        text    : translate.global.edit,
                                                        iconCls : 'edit-menu',
                                                        handler : function() {
                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                            var tabPanel = grid.up('tabpanel');
                                                            var activeItem = tabPanel.getActiveTab();
                                                            var activeIndex = tabPanel.items.indexOf(activeItem);

                                                            var windowEditResources = Ext.create('Ext.window.Window', {
                                                                title       : translate.global.edit+' '+translateresources.form.resources,
                                                                id          : 'windowEditResources'+moduleConfig.tab[activeIndex].id,
                                                                modal       : true,
                                                                width       : '40%',
                                                                height      : '70%',
                                                                minWidth    : '40%',
                                                                minHeight   : '70%',
                                                                layout      : 'fit',
                                                                resizable   : false,
                                                                draggable   : false,
                                                                closeAction : 'destroy',
                                                                autoDestroy : true
                                                            });
                                                            windowEditResources.add(
                                                                {
                                                                    xtype          : 'form',
                                                                    id             : 'FormEditResources'+moduleConfig.tab[activeIndex].id,
                                                                    frame          : false,
                                                                    autoScroll     : true,
                                                                    autoHeight     : true,
                                                                    bodyPadding    : 5,
                                                                    fieldDefaults  : {
                                                                        labelAlign : 'top',
                                                                        msgTarget  : 'side'
                                                                    },
                                                                    items          : moduleConfig.tab[activeIndex].relatedResourcesForm
                                                                }
                                                            );

                                                            windowEditResources.addDocked(
                                                            {
                                                                xtype  : 'toolbar',
                                                                flex   : 1,
                                                                dock   : 'bottom',
                                                                ui     : 'footer',
                                                                layout : {
                                                                    pack   : 'end',
                                                                    type   : 'hbox'
                                                                }
                                                                ,
                                                                items : [
                                                                    {
                                                                        text      : translate.global.cancel,
                                                                        iconCls   : 'cancel-button',
                                                                        id        : 'cancelButtonEditResources'+moduleConfig.tab[activeIndex].id,
                                                                        handler   : function() {
                                                                            var win = this.up('window');
                                                                            win.destroy();
                                                                        }
                                                                    },
                                                                    {
                                                                        text      : translate.global.add,
                                                                        iconCls   : 'ok-button',
                                                                        id        : 'addButtonEditResources'+moduleConfig.tab[activeIndex].id,
                                                                        handler   : function() {
                                                                            var win = this.up('window');
                                                                            var form = win.down('form').getForm();
                                                                            if (form.isValid()) {
                                                                                var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                                                var tabPanel = grid.up('tabpanel');
                                                                                var activeItem = tabPanel.getActiveTab();
                                                                                var activeIndex = tabPanel.items.indexOf(activeItem);
                                                                                var gridResources = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResources');
                                                                                var storeResources = gridResources.getStore();
                                                                                var selectedRecords = gridResources.getSelectionModel().getSelection()[0];
                                                                                var id_resourceInstance = form.findField("resource").getValue();
                                                                                var login = form.findField("resource").getRawValue();
                                                                                var nameResource = form.findField("resourcetype").getRawValue();
                                                                                var attributes = form.getValues();
                                                                                var customAttributes = {};
                                                                                var cont = 0;

                                                                                storeResources.each(function(record) {
                                                                                    if (record.data['nameResource'] == nameResource) {
                                                                                        storeResources.remove(record);
                                                                                    }
                                                                                });

                                                                                for (var name in attributes) {
                                                                                    if(cont >= 1) {
                                                                                        customAttributes[name] = attributes[name];
                                                                                    }
                                                                                    cont++;
                                                                                }
                                                                                storeResources.add({
                                                                                    'id_resourceInstance' : id_resourceInstance,
                                                                                    'nameResource'        : nameResource,
                                                                                    'login'               : login,
                                                                                    'Attributes'          : customAttributes,
                                                                                    'objectAttributes'    : customAttributes
                                                                                });
                                                                                win.destroy();
                                                                            }
                                                                        }
                                                                    }
                                                                ]
                                                            }
                                                            );
                                                            windowEditResources.show();
                                                            var fm = windowEditResources.down('form');
                                                            var gridResources = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResources');
                                                            var storeResources = gridResources.getStore();
                                                            var selectedRecords = gridResources.getSelectionModel().getSelection();
                                                            var comboResourceType = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FormResourceType');
                                                            var comboResource = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FormResource');

                                                            if (selectedRecords.length > 0) {
                                                                var recordResources = selectedRecords[0];
                                                                var id_resourceInstance = recordResources.get('id_resourceInstance');
                                                                var nameResource = recordResources.get('nameResource');
                                                                var login = recordResources.get('login');
                                                                var attributes = recordResources.get('Attributes');
                                                                var k = Object.keys(attributes);
                                                                var longitud = k.length;

                                                                comboResourceType.disable();
                                                                comboResource.enable();
                                                                comboResourceType.setValue(id_resourceInstance);
                                                                comboResourceType.setRawValue(nameResource);
                                                                comboResource.setRawValue(login);

                                                                var resDefinitions = moduleConfig.tab[activeIndex].resourceDefinitions;
                                                                for (var s=0;s<resDefinitions.length;s++) {
                                                                    if(resDefinitions[s].name == nameResource) {
                                                                        var customAttributes = resDefinitions[s].customAttributes;
                                                                    }
                                                                }

                                                                if(longitud > 0) {
                                                                    var itemsFm = [];
                                                                    var cont = 0;
                                                                    for (var name in attributes) {
                                                                        itemsFm.push({
                                                                            xtype       : 'container',
                                                                            layout      : 'hbox',
                                                                            defaultType : 'textfield',
                                                                            margin      : '5 5 5 5',
                                                                            items       : [{
                                                                                xtype             : customAttributes[cont].xtype,
                                                                                fieldLabel        : customAttributes[cont].fieldLabel,
                                                                                afterLabelTextTpl : AppGlobals.required,
                                                                                id                : name,
                                                                                name              : name,
                                                                                emptyText         : customAttributes[cont].fieldLabel+'...',
                                                                                allowBlank        : false,
                                                                                flex              : 4,
                                                                                value             : attributes[name]
                                                                            }]
                                                                        });
                                                                        cont++;
                                                                    }
                                                                    fm.add({
                                                                        xtype       : 'fieldset',
                                                                        title       : translateresources.formResources.fieldsetAttributes,
                                                                        id          : 'FieldSetAttributes',
                                                                        name        : 'FieldSetAttributes',
                                                                        layout      : 'anchor',
                                                                        defaults    : {
                                                                            anchor  : '100%'
                                                                        },
                                                                        items       : itemsFm
                                                                    });
                                                                }
                                                            }

                                                        }
                                                    }
                                                    ,
                                                    {
                                                        text    : translate.global.delete,
                                                        iconCls : 'delete-menu',
                                                        handler : function() {
                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                            var tabPanel = grid.up('tabpanel');
                                                            var activeItem = tabPanel.getActiveTab();
                                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                                            var gridResources = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResources');
                                                            var storeResources = gridResources.getStore();
                                                            var selectedRecords = gridResources.getSelectionModel().getSelection();

                                                            if (selectedRecords.length > 0) {
                                                                storeResources.remove(selectedRecords);
                                                            }
                                                        }
                                                    }
                                                ]
                                            }).showAt(xy);
                                        }
                                    },
                                    dockedItems : [
                                        {
                                            xtype  : 'toolbar',
                                            flex   : 1,
                                            dock   : 'top',
                                            ui     : 'footer',
                                            layout : {
                                                pack : 'end',
                                                type : 'hbox'
                                            }
                                            ,
                                            items : [
                                                '->'
                                                ,
                                                {
                                                    text    : translate.global.associate,
                                                    id      : 'AssociateResources'+groupId,
                                                    action  : 'AssociateResources'+groupId,
                                                    iconCls : 'add-button',
                                                    cls     : 'x-btn-default-small',
                                                    handler : function() {
                                                        var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                        var tabPanel = grid.up('tabpanel');
                                                        var activeItem = tabPanel.getActiveTab();
                                                        var activeIndex = tabPanel.items.indexOf(activeItem);

                                                        var windowAssociateResources = Ext.create('Ext.window.Window', {
                                                            title       : translate.global.associate+' '+translateresources.form.resources,
                                                            id          : 'windowAssociateResources'+moduleConfig.tab[activeIndex].id,
                                                            modal       : true,
                                                            width       : '40%',
                                                            height      : '70%',
                                                            minWidth    : '40%',
                                                            minHeight   : '70%',
                                                            layout      : 'fit',
                                                            resizable   : false,
                                                            draggable   : false,
                                                            closeAction : 'destroy',
                                                            autoDestroy : true
                                                        });
                                                        windowAssociateResources.add(
                                                            {
                                                                xtype          : 'form',
                                                                id             : 'FormAssociateResources'+moduleConfig.tab[activeIndex].id,
                                                                frame          : false,
                                                                autoScroll     : true,
                                                                autoHeight     : true,
                                                                bodyPadding    : 5,
                                                                fieldDefaults  : {
                                                                    labelAlign : 'top',
                                                                    msgTarget  : 'side'
                                                                },
                                                                items          : moduleConfig.tab[activeIndex].relatedResourcesForm
                                                            }
                                                        );

                                                        windowAssociateResources.addDocked(
                                                        {
                                                            xtype  : 'toolbar',
                                                            flex   : 1,
                                                            dock   : 'bottom',
                                                            ui     : 'footer',
                                                            layout : {
                                                                pack   : 'end',
                                                                type   : 'hbox'
                                                            }
                                                            ,
                                                            items : [
                                                                {
                                                                    text      : translate.global.cancel,
                                                                    iconCls   : 'cancel-button',
                                                                    id        : 'cancelButtonAssociateResources'+moduleConfig.tab[activeIndex].id,
                                                                    handler   : function() {
                                                                        var win = this.up('window');
                                                                        win.destroy();
                                                                    }
                                                                },
                                                                {
                                                                    text      : translate.global.add,
                                                                    iconCls   : 'ok-button',
                                                                    id        : 'addButtonAssociateResources'+moduleConfig.tab[activeIndex].id,
                                                                    handler   : function() {
                                                                        var win = this.up('window');
                                                                        var form = win.down('form').getForm();
                                                                        if (form.isValid()) {
                                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                                            var tabPanel = grid.up('tabpanel');
                                                                            var activeItem = tabPanel.getActiveTab();
                                                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                                                            var storeResources = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResources').getStore();
                                                                            var id_resourceInstance = form.findField("resource").getValue();
                                                                            var login = form.findField("resource").getRawValue();
                                                                            var nameResource = form.findField("resourcetype").getRawValue();
                                                                            var attributes = form.getValues();
                                                                            var customAttributes = {};
                                                                            var cont = 0;
                                                                            var exist = 0;

                                                                            storeResources.each(function(record) {
                                                                                if (record.data['login'] == login) {
                                                                                    exist = 1;
                                                                                }
                                                                            });

                                                                            if (exist == 1) {
                                                                                Ext.MessageBox.show({
                                                                                    title        : translate.global.associate+' '+translateresources.form.resources,
                                                                                    msg          : translateresources.recordExist,
                                                                                    animCollapse : true,
                                                                                    buttons      : Ext.MessageBox.OK,
                                                                                    icon         : Ext.MessageBox.WARNING
                                                                                });
                                                                            } else {
                                                                                for (var name in attributes) {
                                                                                    if(cont >= 2) {
                                                                                        customAttributes[name] = attributes[name];
                                                                                    }
                                                                                    cont++;
                                                                                }
                                                                                storeResources.add({
                                                                                    'id_resourceInstance' : id_resourceInstance,
                                                                                    'login'               : login,
                                                                                    'nameResource'        : nameResource,
                                                                                    'Attributes'          : customAttributes,
                                                                                    'objectAttributes'    : customAttributes
                                                                                });
                                                                                win.destroy();
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        );
                                                        windowAssociateResources.show();
                                                    }
                                                }
                                                ,
                                                {
                                                    text    : translate.global.delete,
                                                    id      : 'DeleteResources'+groupId,
                                                    action  : 'DeleteResources'+groupId,
                                                    iconCls : 'remove-button',
                                                    cls     : 'x-btn-default-small',
                                                    handler : function() {
                                                        var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                        var tabPanel = grid.up('tabpanel');
                                                        var activeItem = tabPanel.getActiveTab();
                                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                                        var gridResources = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResources');
                                                        var storeResources = gridResources.getStore();
                                                        var selectedRecords = gridResources.getSelectionModel().getSelection();

                                                        if (selectedRecords.length > 0) {
                                                            storeResources.remove(selectedRecords);
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ];

                            moduleConfig.tab[i].filterResourcesGroup = '?filters={"and":[{"or":[{"field" : "id_resourceDefinition","comparison" : "eq","value" : "'+data[i]._id+'"}]}]}';
                            moduleConfig.tab[i].resourcesGroupForm = [
                                {
                                    xtype       : 'fieldset',
                                    title       : translateresources.formResorcesGroup.fieldset,
                                    defaultType : 'textfield',
                                    layout      : 'anchor',
                                    defaults    : {
                                        anchor  : '100%'
                                    },
                                    items: [{
                                        xtype       : 'container',
                                        layout      : 'hbox',
                                        margin      : '5 5 5 5',
                                        items       : [
                                            {
                                                xtype             : 'combo',
                                                fieldLabel        : translateresources.formResorcesGroup.fieldLabelGroup,
                                                afterLabelTextTpl : AppGlobals.required,
                                                id                : groupId + 'FormGroup',
                                                name              : 'resourceGroups',
                                                loadingText       : 'loading...',
                                                emptyText         : translateresources.formResorcesGroup.emptyTextGroup,
                                                typeAhead         : false,
                                                forceSelection    : true,
                                                allowBlank        : false,
                                                flex              : 4,
                                                displayField      : 'name',
                                                valueField        : '_id',
                                                minChars          : 0,
                                                margin            : '10 10 10 10',
                                                pageSize          : 10,
                                                labelWidth        : '100%',
                                                triggerAction     : 'all',
                                                editable          : false,
                                                store             : Ext.create('Ext.data.Store', {
                                                    pageSize   : 10,
                                                    model      : Ext.define('LoadPrincipal.model.Resources.ListComboResourcesGroup', {
                                                        extend     : 'Ext.data.Model',
                                                        fields     : [
                                                            {name : '_id', type: 'string'},
                                                            {name : 'name', type: 'string'}
                                                        ],
                                                        idProperty : '_id'
                                                    }),
                                                    autoLoad   : false,
                                                    remoteSort : true,
                                                    proxy      : {
                                                        type                : 'ajax',
                                                        useDefaultXhrHeader : false,
                                                        method              : 'GET',
                                                        url                 : moduleConfig.services.urlComboResourcesGroup+moduleConfig.tab[i].filterResourcesGroup,
                                                        reader : {
                                                            type          : 'json',
                                                            root          : 'data',
                                                            totalProperty : 'pagination.total'
                                                        },                                              
                                                    },
                                                    sorters    : [{
                                                        property  : 'name',
                                                        direction : 'DESC'
                                                    }]
                                                })
                                            }
                                        ]
                                    }
                                    ]
                                }
                            ];

                            moduleConfig.tab[i].gridResourcesGroupForm = [
                                {
                                    xtype       : 'gridpanel',
                                    id          : groupId+'GridResourceGroups',
                                    border      : false,
                                    columns     : [
                                        {
                                            text      : 'ID',
                                            dataIndex : 'id_resourceGroups',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : true,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.form.gridResourcesGroupColumnName,
                                            dataIndex : 'resourceGroups',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true
                                        }
                                    ],
                                    store       : controller + '.ListResourceGroups',
                                    loadMask    : true,
                                    autoHeight  : true,
                                    multiSelect : true,
                                    selType     : 'checkboxmodel',
                                    selModel    : {
                                        checkOnly      : false,
                                        injectCheckbox : 0
                                    },
                                    viewConfig  : {
                                        forceFit            : true,
                                        enableTextSelection : true
                                    },
                                    listeners: {
                                        itemcontextmenu : function (record, item, index, e, eOpts) {
                                            eOpts.stopEvent();
                                            var xy = eOpts.getXY();
                                            new Ext.menu.Menu({
                                                items : [
                                                    {
                                                        text    : translate.global.delete,
                                                        iconCls : 'delete-menu',
                                                        handler : function() {
                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                            var tabPanel = grid.up('tabpanel');
                                                            var activeItem = tabPanel.getActiveTab();
                                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                                            var gridResourceGroups = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResourceGroups');
                                                            var storeResourceGroups = gridResourceGroups.getStore();
                                                            var selectedRecords = gridResourceGroups.getSelectionModel().getSelection();

                                                            if (selectedRecords.length > 0) {
                                                                storeResourceGroups.remove(selectedRecords);
                                                            }
                                                        }
                                                    }
                                                ]
                                            }).showAt(xy);
                                        }
                                    },
                                    dockedItems : [
                                        {
                                            xtype  : 'toolbar',
                                            flex   : 1,
                                            dock   : 'top',
                                            ui     : 'footer',
                                            layout : {
                                                pack : 'end',
                                                type : 'hbox'
                                            }
                                            ,
                                            items : [
                                                '->'
                                                ,
                                                {
                                                    text    : translate.global.assign,
                                                    id      : 'AssignResourcesGroup'+groupId,
                                                    action  : 'AssignResourcesGroup'+groupId,
                                                    iconCls : 'add-button',
                                                    cls     : 'x-btn-default-small',
                                                    handler : function() {
                                                        var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                        var tabPanel = grid.up('tabpanel');
                                                        var activeItem = tabPanel.getActiveTab();
                                                        var activeIndex = tabPanel.items.indexOf(activeItem);

                                                        var windowAssignResourcesGroup = Ext.create('Ext.window.Window', {
                                                            title       : translate.global.assign+' '+translateresources.form.resourcesgroup,
                                                            id          : 'windowAssociateResourcesGroup'+moduleConfig.tab[activeIndex].id,
                                                            modal       : true,
                                                            width       : '35%',
                                                            height      : '40%',
                                                            minWidth    : '35%',
                                                            minHeight   : '40%',
                                                            layout      : 'fit',
                                                            resizable   : false,
                                                            draggable   : false,
                                                            closeAction : 'destroy',
                                                            autoDestroy : true
                                                        });
                                                        windowAssignResourcesGroup.add(
                                                            {
                                                                xtype          : 'form',
                                                                id             : 'FormAssociateResourcesGroup'+moduleConfig.tab[activeIndex].id,
                                                                frame          : false,
                                                                autoScroll     : true,
                                                                autoHeight     : true,
                                                                bodyPadding    : 5,
                                                                fieldDefaults  : {
                                                                    labelAlign : 'top',
                                                                    msgTarget  : 'side'
                                                                },
                                                                items          : moduleConfig.tab[activeIndex].resourcesGroupForm
                                                            }
                                                        );
                                                        windowAssignResourcesGroup.addDocked(
                                                        {
                                                            xtype  : 'toolbar',
                                                            flex   : 1,
                                                            dock   : 'bottom',
                                                            ui     : 'footer',
                                                            layout : {
                                                                pack   : 'end',
                                                                type   : 'hbox'
                                                            }
                                                            ,
                                                            items : [
                                                                {
                                                                    text      : translate.global.cancel,
                                                                    iconCls   : 'cancel-button',
                                                                    id        : 'cancelButtonAssignResourcesGroup'+moduleConfig.tab[activeIndex].id,
                                                                    handler   : function() {
                                                                        var win = this.up('window');
                                                                        win.destroy();
                                                                    }
                                                                },
                                                                {
                                                                    text      : translate.global.add,
                                                                    iconCls   : 'ok-button',
                                                                    id        : 'addButtonAssignResourcesGroup'+moduleConfig.tab[activeIndex].id,
                                                                    handler   : function() {
                                                                        var win = this.up('window');
                                                                        var form = win.down('form').getForm();
                                                                        if (form.isValid()) {
                                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                                            var tabPanel = grid.up('tabpanel');
                                                                            var activeItem = tabPanel.getActiveTab();
                                                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                                                            var storeResourceGroups = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResourceGroups').getStore();
                                                                            var id_resourceGroups = form.findField("resourceGroups").getValue();
                                                                            var resourceGroups = form.findField("resourceGroups").getRawValue();
                                                                            var exist = 0;

                                                                            storeResourceGroups.each(function(record) {
                                                                                if (record.data['resourceGroups'] == resourceGroups) {
                                                                                    exist = 1;
                                                                                }
                                                                            });

                                                                            if (exist == 1) {
                                                                                Ext.MessageBox.show({
                                                                                    title        : translate.global.assign+' '+translateresources.form.resourcesgroup,
                                                                                    msg          : translateresources.recordExist,
                                                                                    animCollapse : true,
                                                                                    buttons      : Ext.MessageBox.OK,
                                                                                    icon         : Ext.MessageBox.WARNING
                                                                                });
                                                                            } else {
                                                                                storeResourceGroups.add({
                                                                                    'id_resourceGroups' : id_resourceGroups,
                                                                                    'resourceGroups'    : resourceGroups
                                                                                });
                                                                                win.destroy();
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                        );
                                                        windowAssignResourcesGroup.show();
                                                    }
                                                }
                                                ,
                                                {
                                                    text    : translate.global.delete,
                                                    id      : 'DeleteResourcesGroup'+groupId,
                                                    action  : 'DeleteResourcesGroup'+groupId,
                                                    iconCls : 'remove-button',
                                                    cls     : 'x-btn-default-small',
                                                    handler : function() {
                                                        var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                        var tabPanel = grid.up('tabpanel');
                                                        var activeItem = tabPanel.getActiveTab();
                                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                                        var gridResourceGroups = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResourceGroups');
                                                        var storeResourceGroups = gridResourceGroups.getStore();
                                                        var selectedRecords = gridResourceGroups.getSelectionModel().getSelection();

                                                        if (selectedRecords.length > 0) {
                                                            storeResourceGroups.remove(selectedRecords);
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ];

                            /* condición para ocultar/mostrar fieldset y gridpanel de definición de dispositivos */
                            if (devDefinitions.length > 0) {
                                moduleConfig.tab[i].devicesFieldset = {
                                    xtype       : 'fieldset',
                                    title       : translateresources.form.gridDevicesFieldset,
                                    layout      : 'anchor',
                                    defaults    : {
                                        anchor  : '100%'
                                    },
                                    items       : moduleConfig.tab[i].gridDevicesForm
                                }
                            } else {
                                moduleConfig.tab[i].devicesFieldset = {
                                    xtype       : 'fieldset',
                                    hidden      : true,
                                    title       : translateresources.form.gridDevicesFieldset,
                                    layout      : 'anchor',
                                    defaults    : {
                                        anchor  : '100%'
                                    },
                                    items       : moduleConfig.tab[i].gridDevicesForm
                                }
                            }

                            /* condición para ocultar/mostrar fieldset y gridpanel de recursos asociados */
                            if (resDefinitions.length > 0) {
                                moduleConfig.tab[i].resourcesFieldset = {
                                    xtype       : 'fieldset',
                                    title       : translateresources.form.gridResourcesFieldset,
                                    layout      : 'anchor',
                                    defaults    : {
                                        anchor  : '100%'
                                    },
                                    items       : moduleConfig.tab[i].gridResourcesForm
                                }
                            } else {
                                moduleConfig.tab[i].resourcesFieldset = {
                                    xtype       : 'fieldset',
                                    hidden      : true,
                                    title       : translateresources.form.gridResourcesFieldset,
                                    layout      : 'anchor',
                                    defaults    : {
                                        anchor  : '100%'
                                    },
                                    items       : moduleConfig.tab[i].gridResourcesForm
                                }
                            }

                            moduleConfig.tab[i].form = [
                                {
                                    xtype          : 'form',
                                    id             : groupId + 'Form',
                                    frame          : false,
                                    autoScroll     : true,
                                    autoHeight     : true,
                                    bodyPadding    : 5,
                                    fieldDefaults  : {
                                        labelAlign : 'top',
                                        msgTarget  : 'side'
                                    },
                                    items          : [
                                        {
                                            xtype : 'hiddenfield',
                                            id    : groupId + 'FormId',
                                            name  : '_id',
                                            value : ''
                                        }
                                        ,
                                        {
                                            xtype : 'hiddenfield',
                                            id    : groupId + 'FormIdResourceDefinition',
                                            name  : 'id_resourceDefinition',
                                            value : data[i]._id
                                        }
                                        ,
                                        {
                                            xtype : 'hiddenfield',
                                            id    : groupId + 'FormDevicesDefinitions',
                                            name  : 'devicesDefinitions',
                                            value : data[i].devicesDefinitions
                                        }
                                        ,
                                        {
                                            xtype       : 'fieldset',
                                            title       : 'Datos de Sesión',
                                            defaultType : 'textfield',
                                            layout      : 'anchor',
                                            defaults    : {
                                                anchor  : '100%'
                                            },
                                            items: [{
                                                xtype       : 'container',
                                                layout      : 'vbox',
                                                defaultType : 'textfield',
                                                margin      : '0 5 0 5',
                                                items       : [
                                                    {
                                                        xtype             : 'textfield',
                                                        fieldLabel        : 'Login',
                                                        afterLabelTextTpl : AppGlobals.required,
                                                        labelAlign        : 'top',
                                                        msgTarget         : 'side',
                                                        width             : '100%',
                                                        labelWidth        : 100,
                                                        id                : groupId + 'FormLogin',
                                                        name              : 'login',
                                                        emptyText         : 'Login...',
                                                        allowBlank        : false,
                                                        flex              : 4,
                                                        margin            : '0 10 0 10'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype       : 'container',
                                                layout      : 'vbox',
                                                defaultType : 'textfield',
                                                margin      : '5 5 5 5',
                                                items       : [
                                                    {
                                                        xtype             : 'textfield',
                                                        fieldLabel        : 'Email',
                                                        afterLabelTextTpl : AppGlobals.required,
                                                        labelAlign        : 'top',
                                                        msgTarget         : 'side',
                                                        width             : '100%',
                                                        labelWidth        : 100,
                                                        id                : groupId + 'FormEmail',
                                                        name              : 'email',
                                                        emptyText         : 'Email...',
                                                        allowBlank        : false,
                                                        flex              : 4,
                                                        margin            : '0 10 0 10',
                                                        vtype             : 'email'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype       : 'container',
                                                layout      : 'vbox',
                                                defaultType : 'textfield',
                                                margin      : '5 5 5 5',
                                                items       : [
                                                    {
                                                        xtype             : 'textfield',
                                                        fieldLabel        : 'Password',
                                                        afterLabelTextTpl : AppGlobals.required,
                                                        width             : '100%',
                                                        labelWidth        : 100,
                                                        id                : 'FormPassword',
                                                        name              : 'password',
                                                        emptyText         : 'Password...',
                                                        allowBlank        : false,
                                                        flex              : 4,
                                                        margin            : '0 10 0 10',
                                                        inputType         : 'password',
                                                        hidden            : false,
                                                        listeners         : {
                                                            change : function(field) {
                                                                var confirmField = field.up('form').down('[name=passwordConfirm]');
                                                                confirmField.validate();
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                            ,
                                            {
                                                xtype       : 'container',
                                                layout      : 'vbox',
                                                defaultType : 'textfield',
                                                margin      : '5 5 5 5',
                                                items       : [
                                                    {
                                                        xtype             : 'textfield',
                                                        fieldLabel        : 'Confirmar Password',
                                                        afterLabelTextTpl : AppGlobals.required,
                                                        width             : '100%',
                                                        labelWidth        : 100,
                                                        id                : 'FormPasswordConfirm',
                                                        name              : 'passwordConfirm',
                                                        emptyText         : 'Confirmar Password...',
                                                        allowBlank        : false,
                                                        hidden            : false,
                                                        flex              : 4,
                                                        margin            : '0 10 10 10',
                                                        initialPassField  : 'FormPassword',
                                                        inputType         : 'password',
                                                        vtype             : 'password'
                                                    }
                                                ]
                                            }]
                                        }
                                        ,
                                        {
                                            xtype       : 'fieldset',
                                            title       : translateresources.form.gridRolesFieldset,
                                            layout      : 'anchor',
                                            defaults    : {
                                                anchor  : '100%'
                                            },
                                            items       : moduleConfig.tab[i].gridRolesForm
                                        }
                                        ,
                                        {
                                            xtype       : 'fieldset',
                                            title       : 'Datos de '+data[i].name,
                                            defaultType : 'textfield',
                                            layout      : 'anchor',
                                            defaults    : {
                                                anchor  : '100%'
                                            },
                                            items: [{
                                                xtype       : 'container',
                                                layout      : 'vbox',
                                                defaultType : 'textfield',
                                                margin      : '0 5 10 5',
                                                items       : moduleForm
                                            }]
                                        }
                                        ,
                                        moduleConfig.tab[i].devicesFieldset
                                        ,
                                        moduleConfig.tab[i].resourcesFieldset
                                        ,
                                        {
                                            xtype       : 'fieldset',
                                            title       : translateresources.form.gridResourcesGroupFieldset,
                                            layout      : 'anchor',
                                            defaults    : {
                                                anchor  : '100%'
                                            },
                                            items       : moduleConfig.tab[i].gridResourcesGroupForm
                                        }
                                    ]
                                }
                            ];
                            //Definimos el modelo de Groups
                            Ext.define(moduleName+'Group', {
                                extend     : 'Ext.data.Model',
                                fields     : [ 
                                    {name : '_id', type : 'string'},
                                    {name : 'id_resourceDefinition', type : 'string'},
                                    {name : 'name', type : 'string'}
                                ],
                                idProperty : '_id'
                            });
                            moduleConfig.tab[i].gridPanelGroup = new Object();
                            moduleConfig.tab[i].gridPanelGroup.id = groupId+'GridGroup';
                            moduleConfig.tab[i].gridPanelGroup.title = translateresources.group.grid.title;
                            moduleConfig.tab[i].gridPanelGroup.store = Ext.create('Ext.data.Store', {
                                pageSize   : 20,
                                model      : moduleName+'Group',
                                autoLoad   : true,
                                remoteSort : true,
                                proxy      : {
                                    type                : 'rest',
                                    method              : 'GET',
                                    useDefaultXhrHeader : false,
                                    url                 : moduleConfig.services.listGroupUrl,
                                    reader              : {
                                        type            : 'json',
                                        root            : 'data',
                                        totalProperty   : 'pagination.total',
                                    },
                                    extraParams: {
                                       filters: Ext.JSON.encode({
                                         'and':[
                                               {
                                                   field: 'id_company',
                                                   comparison: 'eq',
                                                   value: window.localStorage.getItem('id_company')
                                               },
                                               {
                                                   field: 'id_resourceDefinition',
                                                   comparison: 'eq',
                                                   value: data[i]._id
                                               }                                           
                                           ]
                                       })
                                   },                           
                                },
                                sorters    : [{
                                    property  : '_id',
                                    direction : 'DESC'
                                }]
                            });
                            moduleConfig.tab[i].gridPanelGroup.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                                clicksToMoveEditor : 1,
                                autoCancel         : false
                            });
                            moduleConfig.tab[i].gridPanelGroup.selType = 'checkboxmodel';
                            moduleConfig.tab[i].gridPanelGroup.checkboxIndex = 0;
                            moduleConfig.tab[i].gridPanelGroup.listeners = {
                                selectionchange : function(sm, selections) {
                                    var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                    var tabPanel = grid.up('tabpanel');
                                    var activeItem = tabPanel.getActiveTab();
                                    var activeIndex = tabPanel.items.indexOf(activeItem);
                                    var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                    var store = grid.getStore();
                                    var jsonSearch = new Object();
                                    var jsonOr = new Object();
                                    jsonSearch.and = [];
                                    var gridGroup = Ext.getCmp(moduleConfig.tab[activeIndex].id+'GridGroup');
                                    var storeGroup = gridGroup.getStore();

                                    jsonSearch.and.push(
                                        {
                                            field      : 'id_resourceDefinition',
                                            comparison : 'eq',
                                            value      : data[activeIndex]._id
                                        }
                                        ,
                                        {
                                            field      : 'id_company',
                                            comparison : 'eq',
                                            value      : storageIdCompany
                                        }
                                    );
                                    if (selections.length > 0) {
                                        if(selections[0].get('_id') != ""){
                                            jsonOr.or = [];
                                            for (var i = 0; i < selections.length; i++) {
                                                var record = selections[i];
                                                jsonOr.or.push(
                                                    {
                                                        field      : 'resourceGroups',
                                                        comparison : 'in',
                                                        value      : record.get('_id')
                                                    }
                                                );
                                            }
                                            jsonSearch.and.push(jsonOr);
                                            Ext.Ajax.abort(store.proxy.activeRequest);
                                            store.proxy.extraParams = {
                                                filters : Ext.JSON.encode(jsonSearch)
                                            };
                                        }
                                    } else {
                                        store.proxy.extraParams = {};
                                    }
                                    store.loadPage(1);
                                }
                                ,
                                itemcontextmenu : function (record, item, index, e, eOpts) {
                                    eOpts.stopEvent();
                                    var xy = eOpts.getXY();
                                    new Ext.menu.Menu({
                                        items : [
                                            {
                                                text    : translate.global.delete,
                                                iconCls : 'delete-menu',
                                                handler : function() {
                                                    var tabPanel = record.up('tabpanel');
                                                    var activeItem = tabPanel.getActiveTab();
                                                    var activeIndex = tabPanel.items.indexOf(activeItem);
                                                    var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'GridGroup');
                                                    var store = grid.getStore();
                                                    var selectedRecords = grid.getSelectionModel().getSelection();

                                                    if(selectedRecords.length > 0){

                                                        Ext.Msg.confirm(translateresources.confirmTitle, translateresources.confirmDelete, function(btn) {

                                                            if (btn === 'yes') {
                                                                for (var i = 0, len = selectedRecords.length; i < len; i++) {
                                                                    var record = selectedRecords[i];
                                                                    var id = record.get('_id');
                                                                    if (id != '') {
                                                                        Ext.Ajax.request({
                                                                            url      : moduleConfig.services.listGroupUrl+'/'+id,
                                                                            type     : 'rest',
                                                                            dataType : 'json',
                                                                            method   : 'DELETE',
                                                                            scope    : this,
                                                                            success  : function(response){
                                                                                store.reload();
                                                                            },
                                                                            failure  : function(response) {
                                                                                Ext.MessageBox.show({
                                                                                    title   : translate.global.delete+' '+translateresources.moduleTitle,
                                                                                    msg     : translateresources.MsgError,
                                                                                    buttons : Ext.MessageBox.OK,
                                                                                    icon    : Ext.MessageBox.ERROR
                                                                                });
                                                                            }
                                                                        });
                                                                    }

                                                                }
                                                            }

                                                        });
                                                    }
                                                }
                                            }
                                        ]
                                    }).showAt(xy);
                                }
                                ,
                                validateedit : function (editor, e, eOpts) {
                                    var newModel = e.record.copy();
                                    newModel.set(e.newValues);

                                    var errors = newModel.validate();
                                    if(!errors.isValid()){
                                      editor.editor.form.markInvalid(errors);
                                      return false;
                                    }
                                }
                                ,
                                edit : function (editor, e) {
                                    var id = e.record.data['_id'];
                                    var str = e.record.data['name'];
                                    var newStr = str.replace(/^\s+/g,'').replace(/\s+$/g,'');
                                    var tabPanel = this.up('tabpanel');
                                    var activeItem = tabPanel.getActiveTab();
                                    var activeIndex = tabPanel.items.indexOf(activeItem);
                                    var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'GridGroup');
                                    var store = grid.getStore();

                                    if(id == '') {
                                        Ext.Ajax.request({
                                            url      : moduleConfig.services.listGroupUrl,
                                            type     : 'rest',
                                            dataType : 'json',
                                            method   : 'POST',
                                            scope    : this,
                                            params   : Ext.JSON.encode({
                                                'id_resourceDefinition' : data[activeIndex]._id,
                                                'name'                  : newStr,
                                                'description'           : newStr,
                                                'id_company'            : window.localStorage.getItem('id_company'),
                                            }),
                                            success  : function(response){
                                                store.reload();
                                            },
                                            failure  : function(response) {
                                                Ext.MessageBox.show({
                                                    title   : translateresources.title,
                                                    msg     : translateresources.MsgError,
                                                    buttons : Ext.MessageBox.OK,
                                                    icon    : Ext.MessageBox.ERROR
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        Ext.Ajax.request({
                                            url      : moduleConfig.services.listGroupUrl+'/'+id,
                                            type     : 'rest',
                                            dataType : 'json',
                                            method   : 'PUT',
                                            scope    : this,
                                            params   : Ext.JSON.encode({
                                                'name'        : newStr,
                                                'description' : newStr,
                                                'id_company'  : window.localStorage.getItem('id_company'),
                                            }),
                                            success  : function(response){
                                                store.reload();
                                            },
                                            failure  : function(response) {
                                                Ext.MessageBox.show({
                                                    title   : translateresources.title,
                                                    msg     : translateresources.MsgError,
                                                    buttons : Ext.MessageBox.OK,
                                                    icon    : Ext.MessageBox.ERROR
                                                });
                                            }
                                        });
                                    }

                                }
                            }
                            moduleConfig.tab[i].gridPanelGroup.columns = [
                                {
                                    text      : 'ID',
                                    dataIndex : '_id',
                                    flex      : 1,
                                    align     : 'left',
                                    hidden    : true,
                                    sortable  : true
                                }
                                ,
                                {
                                    text      : 'ID Resource Definition',
                                    dataIndex : 'id_resourceDefinition',
                                    flex      : 1,
                                    align     : 'left',
                                    hidden    : true,
                                    sortable  : true
                                }
                                ,
                                {
                                    text      : translateresources.group.grid.name,
                                    dataIndex : 'name',
                                    flex      : 1,
                                    align     : 'left',
                                    hidden    : false,
                                    sortable  : true,
                                    editor    : {
                                        xtype         : 'textfield',
                                        allowBlank    : false,
                                        selectOnFocus : true
                                    }
                                }
                            ];
                            moduleConfig.tab[i].gridPanelGroup.toolbarItems = [
                                '->'
                                ,
                                {
                                    text    : translate.global.create,
                                    iconCls : 'add-button',
                                    cls     : 'x-btn-default-small blue-cyan',
                                    items   : [],
                                    handler : function() {
                                        var tabPanel = this.up('tabpanel');
                                        var activeItem = tabPanel.getActiveTab();
                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                        var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'GridGroup');
                                        var store = grid.getStore();
                                        var groupModel = Ext.create(moduleConfig.tab[activeIndex].moduleName+'Group');
                                        groupModel.set("_id", "");
                                        groupModel.set("id_resourceDefinition", "");
                                        groupModel.set("name", "New Group");
                                        store.insert(0, groupModel);
                                        moduleConfig.tab[activeIndex].gridPanelGroup.rowEditing.startEdit(0, 0);
                                    }
                                }
                                ,
                                {
                                    text    : translate.global.delete,
                                    iconCls : 'remove-button',
                                    cls     : 'x-btn-default-small',
                                    items   : [],
                                    handler : function() {
                                        var tabPanel = this.up('tabpanel');
                                        var activeItem = tabPanel.getActiveTab();
                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                        var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'GridGroup');
                                        var store = grid.getStore();
                                        var selectedRecords = grid.getSelectionModel().getSelection();

                                        if(selectedRecords.length > 0){

                                            Ext.Msg.confirm(translateresources.confirmTitle, translateresources.confirmDelete, function(btn) {

                                                if (btn === 'yes') {
                                                    for (var i = 0, len = selectedRecords.length; i < len; i++) {
                                                        var record = selectedRecords[i];
                                                        var id = record.get('_id');
                                                        if (id != '') {
                                                            Ext.Ajax.request({
                                                                url      : moduleConfig.services.listGroupUrl+'/'+id,
                                                                type     : 'rest',
                                                                dataType : 'json',
                                                                method   : 'DELETE',
                                                                scope    : this,
                                                                success  : function(response){
                                                                    store.reload();
                                                                },
                                                                failure  : function(response) {
                                                                    Ext.MessageBox.show({
                                                                        title   : translate.global.delete+' '+translateresources.moduleTitle,
                                                                        msg     : translateresources.MsgError,
                                                                        buttons : Ext.MessageBox.OK,
                                                                        icon    : Ext.MessageBox.ERROR
                                                                    });
                                                                }
                                                            });
                                                        }

                                                    }
                                                }

                                            });
                                        }
                                    }
                                }
                            ];

                            //Panel de Filtros
                            moduleConfig.tab[i].filterPanel= new Object();
                            moduleConfig.tab[i].filterPanel.title = translateresources.filter.title;
                            moduleConfig.tab[i].filterPanel.id = groupId+'FilterForm';
                            moduleConfig.tab[i].filterPanel.form = filterForm;
                            moduleConfig.tab[i].filterPanel.buttons = [
                                {
                                    text    : translate.global.clearFilters,
                                    id      : 'clearFilters'+groupId,
                                    cls     : 'blue-cyan',
                                    handler : function() {
                                        var tabPanel = this.up('tabpanel');
                                        var activeItem = tabPanel.getActiveTab();
                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                        var form = Ext.getCmp(moduleConfig.tab[activeIndex].id+'FilterForm').getForm();
                                        var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                        var store = grid.getStore();
                                        form.reset();
                                        store.proxy.extraParams = {};
                                        store.loadPage(1);
                                    }
                                }
                            ]

                            moduleConfig.tab[i].formChangePassword = [
                                {
                                    xtype          : 'form',
                                    id             : groupId + 'FormChangePassword',
                                    frame          : false,
                                    autoScroll     : true,
                                    autoHeight     : true,
                                    bodyPadding    : 5,
                                    fieldDefaults  : {
                                        labelAlign : 'top',
                                        msgTarget  : 'side'
                                    },
                                    items          : [
                                        {
                                            xtype       : 'fieldset',
                                            title       : 'Datos del Cambio de Contraseña',
                                            defaultType : 'textfield',
                                            layout      : 'anchor',
                                            defaults    : {
                                                anchor  : '100%'
                                            },
                                            items: [{
                                                xtype       : 'container',
                                                layout      : 'vbox',
                                                defaultType : 'textfield',
                                                margin      : '5 5 5 5',
                                                items       : [
                                                    {
                                                        xtype             : 'textfield',
                                                        fieldLabel        : 'Password',
                                                        afterLabelTextTpl : AppGlobals.required,
                                                        width             : '100%',
                                                        labelWidth        : 100,
                                                        id                : 'FormPassword',
                                                        name              : 'password',
                                                        emptyText         : 'Password...',
                                                        allowBlank        : false,
                                                        flex              : 4,
                                                        margin            : '10 10 10 10',
                                                        inputType         : 'password',
                                                        hidden            : false,
                                                        listeners         : {
                                                            change : function(field) {
                                                                var confirmField = field.up('form').down('[name=passwordConfirm]');
                                                                confirmField.validate();
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                            ,
                                            {
                                                xtype       : 'container',
                                                layout      : 'vbox',
                                                defaultType : 'textfield',
                                                margin      : '5 5 5 5',
                                                items       : [
                                                    {
                                                        xtype             : 'textfield',
                                                        fieldLabel        : 'Confirmar Password',
                                                        afterLabelTextTpl : AppGlobals.required,
                                                        width             : '100%',
                                                        labelWidth        : 100,
                                                        id                : 'FormPasswordConfirm',
                                                        name              : 'passwordConfirm',
                                                        emptyText         : 'Confirmar Password...',
                                                        allowBlank        : false,
                                                        hidden            : false,
                                                        flex              : 4,
                                                        margin            : '10 10 10 10',
                                                        initialPassField  : 'FormPassword',
                                                        inputType         : 'password',
                                                        vtype             : 'password'
                                                    }
                                                ]
                                            }]
                                        }
                                    ]
                                }
                            ];

                            moduleConfig.tab[i].gridRestoreResourceslistUrl = strURL +'/resourceinstances?filters={"and":[{"field":"id_resourceDefinition","comparison":"eq","value":"'+data[i]._id+'"},{"field":"id_company","comparison":"eq","value":"'+storageIdCompany+'"},{"field":"deleted_at","comparison":"isnotnull"}]}';
                            moduleConfig.tab[i].storeRestoreResources = Ext.create('Ext.data.Store', {
                                pageSize   : 10,
                                storeId    : groupId+'StoreRestore',
                                model      : Ext.define('LoadPrincipal.model.Resources.ListRestore', {
                                    extend     : 'Ext.data.Model',
                                    fields     : [
                                        {name : '_id', type: 'string'},
                                        {name : 'login', type: 'string'},
                                        {name : 'email', type: 'string'},
                                        {name : 'name', mapping:'customAttributes.nombre', type: 'string'},
                                        {name : 'lastname', mapping:'customAttributes.apellido', type: 'string'},
                                        {name : 'deleted_at'},
                                        {name : 'status', type: 'string'}
                                    ],
                                    idProperty : '_id'
                                }),
                                autoLoad   : false,
                                remoteSort : true,
                                proxy      : {
                                    type                : 'rest',
                                    useDefaultXhrHeader : false,
                                    method              : 'GET',
                                    url                 : moduleConfig.tab[i].gridRestoreResourceslistUrl,
                                    reader : {
                                        type          : 'json',
                                        root          : 'data',
                                        totalProperty : 'pagination.total'
                                    }
                                },
                                sorters    : [{
                                    property  : '_id',
                                    direction : 'DESC'
                                }]
                            });
                            moduleConfig.tab[i].formRestoreResources = [
                                {
                                    width       : '100%',
                                    xtype       : 'gridpanel',
                                    id          : groupId+'GridRestore',
                                    store       : moduleConfig.tab[i].storeRestoreResources,
                                    loadMask    : true,
                                    height      : '100%',
                                    multiSelect : true,
                                    selType     : 'checkboxmodel',
                                    selModel    : {
                                        checkOnly      : false,
                                        injectCheckbox : 0
                                    },
                                    margins     : '0 5 0 5',
                                    viewConfig  : {
                                        forceFit            : true,
                                        enableTextSelection : true
                                    },
                                    listeners   : {
                                        itemcontextmenu : function (record, item, index, e, eOpts) {
                                            eOpts.stopEvent();
                                            var id = item.data['_id'];
                                            var xy = eOpts.getXY();
                                            new Ext.menu.Menu({
                                                items : [
                                                    {
                                                        text    : translate.global.restore,
                                                        iconCls : 'edit-menu',
                                                        handler : function() {
                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                            var store = grid.getStore();
                                                            var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                                                            Ext.Ajax.request({
                                                                url      : moduleConfig.services.url+'/'+id+'/restore',
                                                                type     : 'rest',
                                                                dataType : 'json',
                                                                method   : 'PUT',
                                                                scope    : this,
                                                                params   : Ext.JSON.encode({'deleted_at' : null}),
                                                                success  : function(response){
                                                                    msgWait.hide();
                                                                    Ext.data.StoreManager.lookup(moduleConfig.tab[activeIndex].id+'StoreRestore').reload();
                                                                    store.reload();
                                                                },
                                                                failure  : function(response) {
                                                                    msgWait.hide();
                                                                    Ext.MessageBox.show({
                                                                        title   : translate.global.restore+' '+translateresources.moduleTitle,
                                                                        msg     : translateresources.MsgError,
                                                                        buttons : Ext.MessageBox.OK,
                                                                        icon    : Ext.MessageBox.ERROR
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    }
                                                ]
                                            });
                                        }
                                    }
                                    ,
                                    columns     : [
                                        {
                                            text      : 'ID',
                                            dataIndex : '_id',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : true,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.grid.columnLogin,
                                            dataIndex : 'login',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.grid.columnEmail,
                                            dataIndex : 'email',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.grid.columnFirstname,
                                            dataIndex : 'name',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.grid.columnLastname,
                                            dataIndex : 'lastName',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.grid.columnDeletedAt,
                                            dataIndex : 'deleted_at',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : false,
                                            sortable  : true
                                        }
                                        ,
                                        {
                                            text      : translateresources.grid.columnStatus,
                                            dataIndex : 'status',
                                            flex      : 1,
                                            align     : 'left',
                                            hidden    : true,
                                            sortable  : true
                                        }
                                    ],
                                    dockedItems : [
                                        {
                                            xtype      : 'toolbar',
                                            border     : false,
                                            items      : [
                                                {
                                                    xtype           : 'textfield',
                                                    id              : 'searchRestore'+groupId,
                                                    name            : 'searchRestore'+groupId,
                                                    width           : 350,
                                                    enableKeyEvents : true,
                                                    emptyText       : translateresources.grid.emptyText, 
                                                    listeners       : {
                                                        keyup : function (string) {
                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                            var tabPanel = grid.up('tabpanel');
                                                            var activeItem = tabPanel.getActiveTab();
                                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                                            var store = Ext.data.StoreManager.lookup(moduleConfig.tab[activeIndex].id+'StoreRestore');
                                                            var jsonSearch = new Object();
                                                            var jsonOr = new Object();
                                                            var searchKeyword = Ext.getCmp('searchRestore'+moduleConfig.tab[activeIndex].id).getValue();
                                                            jsonSearch.and = [];

                                                            jsonSearch.and.push({
                                                                field      : 'id_resourceDefinition',
                                                                comparison : 'eq',
                                                                value      : data[activeIndex]._id
                                                            }
                                                            ,
                                                            {
                                                                field      : 'id_company',
                                                                comparison : 'eq',
                                                                value      : storageIdCompany
                                                            }
                                                            ,
                                                            {
                                                                field      : 'deleted_at',
                                                                comparison : 'isnotnull'
                                                            }
                                                            );

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
                                                                        field      : 'email',
                                                                        comparison : 'lk',
                                                                        value      : searchKeyword
                                                                    }
                                                                );
                                                                jsonSearch.and.push(jsonOr);
                                                            }
                                                            Ext.Ajax.abort(store.proxy.activeRequest);
                                                            store.proxy.extraParams = {
                                                                filters : Ext.JSON.encode(jsonSearch)
                                                            };
                                                            store.loadPage(1);
                                                        }
                                                    }

                                                }
                                                ,
                                                {
                                                    xtype          : 'button',
                                                    iconCls        : 'cancel-button',
                                                    tooltip        : translateresources.grid.tooltipButton,
                                                    fieldName      : 'searchRestore'+groupId,
                                                    cls            : 'x-btn-default-small',
                                                    handler        : function() {
                                                        var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                        var tabPanel = grid.up('tabpanel');
                                                        var activeItem = tabPanel.getActiveTab();
                                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                                        Ext.getCmp('searchRestore'+moduleConfig.tab[activeIndex].id).setValue('');
                                                        var store = Ext.data.StoreManager.lookup(moduleConfig.tab[activeIndex].id+'StoreRestore');
                                                        store.proxy.extraParams = {};
                                                        store.loadPage(1);
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype       : 'pagingtoolbar',
                                            dock        : 'bottom',
                                            store       : moduleConfig.tab[i].storeRestoreResources,
                                            displayInfo : true,
                                            displayMsg  : translate.global.displayMsg,
                                            emptyMsg    : translate.global.emptyMsg,
                                            items       : [
                                                /*{
                                                    text         : translate.global.export,
                                                    enableToggle : true,
                                                    defaultAlign : 'right',
                                                    action       : 'exportXls',
                                                    cls          : 'x-btn-default-small',
                                                    toggleHandler: function (btn, pressed) 
                                                    {
                                                        alert('Exportar UNO');
                                                    }
                                                }*/
                                            ]
                                        }
                                    ]

                                }
                            ];

                            //GridPanel
                            moduleConfig.tab[i].gridPanel = new Object();
                            moduleConfig.tab[i].gridPanel.id = groupId+'Grid';
                            moduleConfig.tab[i].gridPanel.title = data[i].name;
                            moduleConfig.tab[i].gridPanel.toolbarItems = [
                                {
                                    xtype           : 'textfield',
                                    id              : 'search'+groupId,
                                    name            : 'search'+groupId,
                                    width           : 350,
                                    enableKeyEvents : true,
                                    emptyText       : translateresources.grid.emptyText, 
                                    listeners       : {
                                        keyup : function (string) {
                                            var tabPanel = this.up('tabpanel');
                                            var activeItem = tabPanel.getActiveTab();
                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                            var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                            var store = grid.getStore();
                                            var jsonSearch = new Object();
                                            var jsonOr = new Object();
                                            var searchKeyword = Ext.getCmp('search'+moduleConfig.tab[activeIndex].id).getValue();
                                            jsonSearch.and = [];

                                            jsonSearch.and.push({
                                                field      : 'id_resourceDefinition',
                                                comparison : 'eq',
                                                value      : data[activeIndex]._id
                                            });

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
                                                        field      : 'email',
                                                        comparison : 'lk',
                                                        value      : searchKeyword
                                                    }
                                                );
                                                jsonSearch.and.push(jsonOr);
                                            }
                                            Ext.Ajax.abort(store.proxy.activeRequest);
                                            store.proxy.extraParams = {
                                                filters : Ext.JSON.encode(jsonSearch)
                                            };
                                            store.loadPage(1);
                                        }
                                    }

                                }
                                ,
                                {
                                    xtype          : 'button',
                                    iconCls        : 'cancel-button',
                                    tooltip        : translateresources.grid.tooltipButton,
                                    fieldName      : 'search'+groupId,
                                    cls            : 'x-btn-default-small',
                                    handler        : function() {
                                        var tabPanel = this.up('tabpanel');
                                        var activeItem = tabPanel.getActiveTab();
                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                        Ext.getCmp('search'+moduleConfig.tab[activeIndex].id).setValue('');
                                        var grid = Ext.getCmp(moduleConfig.tab[activeIndex].id+'Grid');
                                        var store = grid.getStore();
                                        store.proxy.extraParams = {};
                                        store.loadPage(1);
                                    }
                                }
                                ,
                                '->'
                                ,
                                {
                                    text    : translate.global.create,
                                    id      : 'Create'+groupId,
                                    action  : 'Create'+groupId,
                                    iconCls : 'add-button',
                                    cls     : 'x-btn-default-small blue-cyan',
                                    submenu : false,
                                    items   : [],
                                    handler : function() {
                                        var tabPanel = this.up('tabpanel');
                                        var activeItem = tabPanel.getActiveTab();
                                        var activeIndex = tabPanel.items.indexOf(activeItem);

                                        var windowCreateResources = Ext.create('Ext.window.Window', {
                                            title       : translate.global.create+' '+data[activeIndex].name,
                                            id          : 'windowCreate'+moduleConfig.tab[activeIndex].id,
                                            modal       : true,
                                            width       : '50%',
                                            height      : '70%',
                                            minWidth    : '50%',
                                            minHeight   : '70%',
                                            layout      : 'fit',
                                            resizable   : false,
                                            draggable   : false,
                                            closeAction : 'destroy',
                                            autoDestroy : true,
                                            items       : moduleConfig.tab[activeIndex].form
                                        });
                                        windowCreateResources.addDocked(
                                        {
                                            xtype  : 'toolbar',
                                            flex   : 1,
                                            dock   : 'bottom',
                                            ui     : 'footer',
                                            layout : {
                                                pack : 'end',
                                                type : 'hbox'
                                            }
                                            ,
                                            items : [
                                                {
                                                    text      : translate.global.cancel,
                                                    iconCls   : 'cancel-button',
                                                    id        : 'cancelButton'+moduleConfig.tab[activeIndex].id,
                                                    handler   : function() {
                                                        var win = this.up('window');
                                                        win.destroy();
                                                    }
                                                },
                                                {
                                                    text      : translate.global.save,
                                                    iconCls   : 'ok-button',
                                                    cls       : 'blue-cyan',
                                                    id        : 'saveButton'+moduleConfig.tab[activeIndex].id,
                                                    handler   : function() {
                                                        var win = this.up('window');
                                                        var form = win.down('form').getForm();

                                                        if (form.isValid()) {
                                                            var id_resource = form.findField("id_resourceDefinition").getValue();
                                                            var login = form.findField("login").getValue();
                                                            var email = form.findField("email").getValue();
                                                            var password = form.findField("password").getValue();
                                                            var deviceInstances = [];
                                                            var resourceInstances = [];
                                                            var resourceGroups = [];
                                                            var roles = [];
                                                            var attributes = form.getValues();
                                                            var customAttributes = {};
                                                            var cont = 0;
                                                            for (var name in attributes) {
                                                                if(cont >= 7) {
                                                                    customAttributes[name] = attributes[name];
                                                                }
                                                                cont++;
                                                            }

                                                            var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                            var tabPanel = grid.up('tabpanel');
                                                            var activeItem = tabPanel.getActiveTab();
                                                            var activeIndex = tabPanel.items.indexOf(activeItem);
                                                            var gridRoles = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridRoles');
                                                            var storeRoles = gridRoles.getStore();
                                                            var gridDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridDevices');
                                                            var storeDevices = gridDevices.getStore();
                                                            var gridResources = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResources');
                                                            var storeResources = gridResources.getStore();
                                                            var gridResourceGroups = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResourceGroups');
                                                            var storeResourceGroups = gridResourceGroups.getStore();
                                                            var numRoles = storeRoles.getCount();
                                                            var numDevices = storeDevices.getCount();
                                                            var numResources = storeResources.getCount();
                                                            var numResourceGroups = storeResourceGroups.getCount();

                                                            if(numRoles > 0) {
                                                                storeRoles.each(function(record) {
                                                                    roles.push({
                                                                        'applicationName' : record.data['applicationName'],
                                                                        'roleName'        : record.data['roleName'],
                                                                        'id_role'         : record.data['id_role']
                                                                    });
                                                                });
                                                            }

                                                            if(numDevices > 0) {
                                                                storeDevices.each(function(record) {
                                                                    deviceInstances.push(record.data['id_deviceDefinition']);
                                                                });
                                                            }

                                                            if(numResources > 0) {
                                                                storeResources.each(function(record) {
                                                                    resourceInstances.push({
                                                                        'id_resourceInstance' : record.data['id_resourceInstance'],
                                                                        'nameResource'        : record.data['nameResource'],
                                                                        'login'               : record.data['login'],
                                                                        'customAttributes'    : record.data['objectAttributes']
                                                                    });
                                                                });
                                                            }

                                                            if(numResourceGroups > 0) {
                                                                storeResourceGroups.each(function(record) {
                                                                    resourceGroups.push(record.data['id_resourceGroups']);
                                                                });
                                                            }

                                                            if(storeRoles.getCount()  > 0) {

                                                                var resources = {
                                                                    'id_resourceDefinition' : id_resource,
                                                                    'id_company'            : storageIdCompany,
                                                                    'login'                 : login,
                                                                    'email'                 : email,
                                                                    'password'              : password,
                                                                    'deviceInstances'       : deviceInstances,
                                                                    'resourceInstances'     : resourceInstances,
                                                                    'resourceGroups'        : resourceGroups,
                                                                    'customAttributes'      : customAttributes,
                                                                    'roles'                 : roles,
                                                                    'status'                : 'active'
                                                                };
                                                                var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                                                                Ext.Ajax.request({
                                                                    url      : moduleConfig.services.url,
                                                                    type     : 'rest',
                                                                    dataType : 'json',
                                                                    method   : 'POST',
                                                                    scope    : this,
                                                                    params   : Ext.JSON.encode(resources),
                                                                    success  : function(response){
                                                                        var res = response.responseText;
                                                                        msgWait.hide();
                                                                        Ext.MessageBox.show({
                                                                            title   : translate.global.create+' '+translateresources.moduleTitle,
                                                                            msg     : translateresources.form.MsgSuccessCreate,
                                                                            buttons : Ext.MessageBox.OK,
                                                                            icon    : Ext.MessageBox.INFO
                                                                        });
                                                                        Ext.getCmp(moduleConfig.tab[activeIndex].gridPanel.id).getSelectionModel().clearSelections();
                                                                        Ext.data.StoreManager.lookup(moduleConfig.tab[activeIndex].gridPanel.store).reload();
                                                                        win.destroy();
                                                                    },
                                                                    failure  : function(response) {
                                                                        var res = response.responseText;
                                                                        msgWait.hide();
                                                                        Ext.MessageBox.show({
                                                                            title   : translate.global.create+' '+translateresources.moduleTitle,
                                                                            msg     : translateresources.form.MsgError,
                                                                            buttons : Ext.MessageBox.OK,
                                                                            icon    : Ext.MessageBox.ERROR
                                                                        });
                                                                    }
                                                                });
                                                            } else {
                                                                Ext.MessageBox.show({
                                                                    title        : translate.global.create+' '+translateresources.moduleTitle,
                                                                    msg          : translateresources.form.gridRolesMsgErrorIsValid,
                                                                    animCollapse : true,
                                                                    buttons      : Ext.MessageBox.OK,
                                                                    icon         : Ext.MessageBox.WARNING
                                                                });
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                        );
                                        windowCreateResources.show();
                                        //Limpiamos los stores
                                        var storeRoles = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridRoles').getStore();
                                        var storeDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridDevices').getStore();
                                        var storeResources = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResources').getStore();
                                        var storeResourceGroups = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResourceGroups').getStore();
                                        storeRoles.removeAll();
                                        storeDevices.removeAll();
                                        storeResources.removeAll();
                                        storeResourceGroups.removeAll();
                                    }
                                }
                                ,
                                {
                                    text    : translate.global.delete,
                                    id      : 'Delete'+groupId,
                                    action  : 'Delete'+groupId,
                                    iconCls : 'remove-button',
                                    cls     : 'x-btn-default-small',
                                    submenu : false,
                                    items   : [],
                                    handler : function() {
                                        var tabPanel = this.up('tabpanel');
                                        var activeItem = tabPanel.getActiveTab();
                                        var activeIndex = tabPanel.items.indexOf(activeItem);

                                        var selectedRecords = Ext.getCmp(moduleConfig.tab[activeIndex].gridPanel.id).getSelectionModel().getSelection();

                                        if(selectedRecords.length > 0){

                                            Ext.Msg.confirm(translateresources.confirmTitle, translateresources.confirmDelete, function(btn) {

                                                if (btn === 'yes') {
                                                    for (var i = 0, len = selectedRecords.length; i < len; i++) {
                                                        var record = selectedRecords[i];
                                                        var id = record.get('_id');
                                                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                                                        Ext.Ajax.request({
                                                            url      : moduleConfig.services.url+'/'+id,
                                                            type     : 'rest',
                                                            dataType : 'json',
                                                            method   : 'DELETE',
                                                            scope    : this,
                                                            success  : function(response){
                                                                msgWait.hide();
                                                                Ext.MessageBox.show({
                                                                    title   : translate.global.delete+' '+translateresources.moduleTitle,
                                                                    msg     : translateresources.form.MsgSuccessDeletePlural,
                                                                    buttons : Ext.MessageBox.OK,
                                                                    icon    : Ext.MessageBox.INFO
                                                                });
                                                                Ext.data.StoreManager.lookup(moduleConfig.tab[activeIndex].gridPanel.store).reload();
                                                            },
                                                            failure  : function(response) {
                                                                msgWait.hide();
                                                                Ext.MessageBox.show({
                                                                    title   : translate.global.delete+' '+translateresources.moduleTitle,
                                                                    msg     : translateresources.form.MsgError,
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
                                ,
                                {
                                    text    : translate.global.restore,
                                    id      : 'Restore'+groupId,
                                    action  : 'Restore'+groupId,
                                    iconCls : 'user-button',
                                    cls     : 'x-btn-default-small',
                                    handler : function() {
                                        var tabPanel = this.up('tabpanel');
                                        var activeItem = tabPanel.getActiveTab();
                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                        var storeRestoreResources = Ext.data.StoreManager.lookup(moduleConfig.tab[activeIndex].id+'StoreRestore');

                                        var windowRestoreResources = Ext.create('Ext.window.Window', {
                                            title       : translate.global.restore+' '+data[activeIndex].name,
                                            id          : 'windowRestore'+moduleConfig.tab[activeIndex].id,
                                            modal       : true,
                                            width       : '50%',
                                            height      : '70%',
                                            minWidth    : '50%',
                                            minHeight   : '70%',
                                            layout      : 'fit',
                                            resizable   : false,
                                            draggable   : false,
                                            closeAction : 'destroy',
                                            autoDestroy : true,
                                            items       : moduleConfig.tab[activeIndex].formRestoreResources
                                        });
                                        windowRestoreResources.addDocked(
                                        {
                                            xtype  : 'toolbar',
                                            flex   : 1,
                                            dock   : 'bottom',
                                            ui     : 'footer',
                                            layout : {
                                                pack : 'end',
                                                type : 'hbox'
                                            }
                                            ,
                                            items : [
                                                {
                                                    text      : translate.global.cancel,
                                                    iconCls   : 'cancel-button',
                                                    id        : 'cancelButton'+moduleConfig.tab[activeIndex].id,
                                                    handler   : function() {
                                                        var win = this.up('window');
                                                        win.destroy();
                                                    }
                                                },
                                                {
                                                    text      : translate.global.restore,
                                                    iconCls   : 'ok-button',
                                                    id        : 'restoreButton'+moduleConfig.tab[activeIndex].id,
                                                    handler   : function() {
                                                        var win = this.up('window');
                                                        var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                        var tabPanel = grid.up('tabpanel');
                                                        var activeItem = tabPanel.getActiveTab();
                                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                                        var gridRestore = Ext.getCmp(moduleConfig.tab[activeIndex].id+'GridRestore');
                                                        var selectedRecords = gridRestore.getSelectionModel().getSelection();

                                                        if(selectedRecords.length > 0){

                                                            Ext.Msg.confirm(translateresources.confirmTitle, translateresources.confirmRestore, function(btn) {

                                                                if (btn === 'yes') {

                                                                    for (var i = 0, len = selectedRecords.length; i < len; i++) {

                                                                        var record = selectedRecords[i];
                                                                        var id = record.get('_id');
                                                                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                                                                        Ext.Ajax.request({
                                                                            url      : moduleConfig.services.url+'/'+id+'/restore',
                                                                            type     : 'rest',
                                                                            dataType : 'json',
                                                                            method   : 'PUT',
                                                                            scope    : this,
                                                                            params   : Ext.JSON.encode({'deleted_at' : null}),
                                                                            success  : function(response){
                                                                                msgWait.hide();
                                                                                Ext.data.StoreManager.lookup(moduleConfig.tab[activeIndex].id+'StoreRestore').reload();
                                                                                store.reload();
                                                                                win.destroy();
                                                                            },
                                                                            failure  : function(response) {
                                                                                msgWait.hide();
                                                                                Ext.MessageBox.show({
                                                                                    title   : translate.global.restore+' '+translateresources.moduleTitle,
                                                                                    msg     : translateresources.MsgError,
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
                                        });
                                        windowRestoreResources.show();
                                        storeRestoreResources.load();
                                    }
                                }
                            ];

                            fields.push({
                                name : '_id',
                                type : 'string'
                            },
                            {
                                name : 'id_resourceDefinition',
                                type : 'string'
                            },
                            {
                                name : 'login',
                                type : 'string'
                            },
                            {
                                name : 'email',
                                type : 'string'
                            },
                            {
                                name : 'status',
                                type : 'string'
                            },
                            {
                                name    : 'Roles',
                                mapping : 'roles',
                                type    : 'auto'
                            },
                            {
                                name    : 'DeviceInstances',
                                mapping : 'deviceInstances',
                                type    : 'auto'
                            },
                            {
                                name    : 'ResourceInstances',
                                mapping : 'resourceInstances',
                                type    : 'auto'
                            },
                            {
                                name    : 'ResourceGroups',
                                mapping : 'resourceGroups',
                                type    : 'auto'
                            });

                            columns.push({
                                text      : 'ID',
                                dataIndex : '_id',
                                align     : 'left',
                                hidden    : true,
                                sortable  : true
                            },
                            {
                                text      : 'ID Resource',
                                dataIndex : 'id_resourceDefinition',
                                align     : 'left',
                                hidden    : true,
                                sortable  : true
                            },
                            {
                                text      : translateresources.grid.columnLogin,
                                dataIndex : 'login',
                                flex      : 1,
                                align     : 'left',
                                hidden    : false,
                                sortable  : true
                            },
                            {
                                text      : translateresources.grid.columnEmail,
                                dataIndex : 'email',
                                flex      : 1,
                                align     : 'left',
                                hidden    : false,
                                sortable  : true
                            },
                            {
                                text      : translateresources.grid.columnStatus,
                                dataIndex : 'status',
                                flex      : 1,
                                align     : 'left',
                                hidden    : false,
                                sortable  : true
                            },
                            {
                                text      : translateresources.grid.columnRoles,
                                dataIndex : 'Roles',
                                flex      : 1,
                                align     : 'left',
                                hidden    : false,
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
                            },
                            {
                                text      : 'Device Instances',
                                dataIndex : 'DeviceInstances',
                                flex      : 1,
                                align     : 'left',
                                hidden    : true,
                                sortable  : true
                            },
                            {
                                text      : 'Resource Instances',
                                dataIndex : 'ResourceInstances',
                                flex      : 1,
                                align     : 'left',
                                hidden    : true,
                                sortable  : true
                            },
                            {
                                text      : 'Resource Groups',
                                dataIndex : 'ResourceGroups',
                                flex      : 1,
                                align     : 'left',
                                hidden    : true,
                                sortable  : true
                            });

                            for (k=0; k < attributes.length; k++) {
                                //generamos dinámicamente ids para fields (model) y dataindex (columns@grid)
                                var newStr = '';
                                var originCad = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
                                var normalCad = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuuNnCc";
                                var origString = '';
                                var fieldId = '';
                                origString = attributes[k].fieldLabel;
                                arrString = origString.split(" ");
                                for(var x=0; x < arrString.length ; x++) {
                                    if (x > 0) {
                                        newStr = arrString[x].substr(0,1).toUpperCase()+arrString[x].substr(1,arrString[x].length).toLowerCase();
                                    }
                                    else {
                                        newStr = arrString[x].toLowerCase();
                                    }

                                    for (var m=0; m < originCad.length; m++) {
                                        newStr = newStr.replace(originCad.charAt(m), normalCad.charAt(m));
                                    }
                                    fieldId = fieldId + newStr;
                                }

                                fields.push({
                                    name    : fieldId,
                                    mapping : 'customAttributes.'+fieldId,
                                    type    : 'auto'
                                });

                                columns.push({
                                    text      : attributes[k].fieldLabel,
                                    dataIndex : fieldId,
                                    flex      : 1,
                                    align     : 'left',
                                    hidden    : false,
                                    sortable  : true
                                });
                            }

                            //Definimos el modelo
                            Ext.define(moduleName, {
                                extend     : 'Ext.data.Model',
                                fields     : fields,
                                idProperty : '_id'
                            });

                            moduleConfig.tab[i].gridPanel.listUrl = strURL +'/resourceinstances?filters={"and":[{"field":"id_resourceDefinition","comparison":"eq","value":"'+data[i]._id+'"},{"field":"id_company","comparison":"eq","value":"'+storageIdCompany+'"}]}';
                            //Definimos el Store
                            moduleConfig.tab[i].gridPanel.store = Ext.create('Ext.data.Store', {
                                pageSize   : 15,
                                model      : moduleName,
                                storeId    : 'store'+moduleConfig.tab[i].id,
                                autoLoad   : false,
                                remoteSort : true,
                                proxy      : {
                                    type                : 'rest',
                                    method              : 'GET',
                                    useDefaultXhrHeader : false,
                                    url                 : moduleConfig.tab[i].gridPanel.listUrl,
                                    reader              : {
                                        type            : 'json',
                                        root            : 'data',
                                        totalProperty   : 'pagination.total',
                                    }
                                },
                                sorters    : [{
                                    property  : '_id',
                                    direction : 'DESC'
                                }]
                            });
                            moduleConfig.tab[i].gridPanel.store.clearData();
                            moduleConfig.tab[i].gridPanel.store.load();
                            moduleConfig.tab[i].gridPanel.columns = columns;
                            moduleConfig.tab[i].gridPanel.selType = 'checkboxmodel';
                            moduleConfig.tab[i].gridPanel.checkboxIndex = 0;
                            moduleConfig.tab[i].gridPanel.listeners = {
                                itemcontextmenu : function (record, item, index, e, eOpts) {
                                    eOpts.stopEvent();
                                    var id = item.data['_id'];
                                    var email = item.data['email'];
                                    var xy = eOpts.getXY();
                                    new Ext.menu.Menu({
                                        items : [
                                            {
                                                text    : translate.global.edit,
                                                iconCls : 'edit-menu',
                                                handler : function() {
                                                    var tabPanel = record.up('tabpanel');
                                                    var activeItem = tabPanel.getActiveTab();
                                                    var activeIndex = tabPanel.items.indexOf(activeItem);

                                                    var windowEditResources = Ext.create('Ext.window.Window', {
                                                        title       : translate.global.edit+' '+data[activeIndex].name,
                                                        id          : 'windowEdit'+moduleConfig.tab[activeIndex].id,
                                                        modal       : true,
                                                        width       : '50%',
                                                        height      : '70%',
                                                        minWidth    : '50%',
                                                        minHeight   : '70%',
                                                        layout      : 'fit',
                                                        resizable   : false,
                                                        draggable   : false,
                                                        closeAction : 'destroy',
                                                        autoDestroy : true,
                                                        items       : moduleConfig.tab[activeIndex].form
                                                    });
                                                    windowEditResources.addDocked(
                                                    {
                                                        xtype  : 'toolbar',
                                                        flex   : 1,
                                                        dock   : 'bottom',
                                                        ui     : 'footer',
                                                        layout : {
                                                        pack : 'end',
                                                        type : 'hbox'
                                                        }
                                                        ,
                                                        items : [
                                                            {
                                                                text      : translate.global.cancel,
                                                                iconCls   : 'cancel-button',
                                                                id        : 'cancelButton'+moduleConfig.tab[activeIndex].id,
                                                                handler   : function() {
                                                                    var win = this.up('window');
                                                                    win.destroy();
                                                                }
                                                            },
                                                            {
                                                                text      : translate.global.save,
                                                                iconCls   : 'ok-button',
                                                                id        : 'saveButton'+moduleConfig.tab[activeIndex].id,
                                                                handler   : function() {
                                                                    var win = this.up('window');
                                                                    var form = win.down('form').getForm();

                                                                    if (form.isValid()) {
                                                                        var id = form.findField("_id").getValue();
                                                                        var id_resource = form.findField("id_resourceDefinition").getValue();
                                                                        var login = form.findField("login").getValue();
                                                                        var email = form.findField("email").getValue();
                                                                        var deviceInstances = [];
                                                                        var resourceInstances = [];
                                                                        var resourceGroups = [];
                                                                        var roles = [];
                                                                        var attributes = form.getValues();
                                                                        var customAttributes = {};
                                                                        var cont = 0;
                                                                        for (var name in attributes) {
                                                                            if(cont >= 7) {
                                                                                customAttributes[name] = attributes[name];
                                                                            }
                                                                            cont++;
                                                                        }

                                                                        var grid = Ext.getCmp(AppGlobals.TabPanelId).down('grid');
                                                                        var tabPanel = grid.up('tabpanel');
                                                                        var activeItem = tabPanel.getActiveTab();
                                                                        var activeIndex = tabPanel.items.indexOf(activeItem);
                                                                        var gridRoles = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridRoles');
                                                                        var storeRoles = gridRoles.getStore();
                                                                        var gridDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridDevices');
                                                                        var storeDevices = gridDevices.getStore();
                                                                        var gridResources = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResources');
                                                                        var storeResources = gridResources.getStore();
                                                                        var gridResourceGroups = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResourceGroups');
                                                                        var storeResourceGroups = gridResourceGroups.getStore();
                                                                        var numRoles = storeRoles.getCount();
                                                                        var numDevices = storeDevices.getCount();
                                                                        var numResources = storeResources.getCount();
                                                                        var numResourceGroups = storeResourceGroups.getCount();

                                                                        if(numRoles > 0) {
                                                                            storeRoles.each(function(record) {
                                                                                roles.push({
                                                                                    'applicationName' : record.data['applicationName'],
                                                                                    'roleName'        : record.data['roleName'],
                                                                                    'id_role'         : record.data['id_role']
                                                                                });
                                                                            });
                                                                        }

                                                                        if(numDevices > 0) {
                                                                            storeDevices.each(function(record) {
                                                                                deviceInstances.push(record.data['id_deviceDefinition']);
                                                                            });
                                                                        }

                                                                        if(numResources > 0) {
                                                                            storeResources.each(function(record) {
                                                                                resourceInstances.push({
                                                                                    'id_resourceInstance' : record.data['id_resourceInstance'],
                                                                                    'nameResource'        : record.data['nameResource'],
                                                                                    'login'               : record.data['login'],
                                                                                    'customAttributes'    : record.data['objectAttributes']
                                                                                });
                                                                            });
                                                                        }

                                                                        if(numResourceGroups > 0) {
                                                                            storeResourceGroups.each(function(record) {
                                                                                resourceGroups.push(record.data['id_resourceGroups']);
                                                                            });
                                                                        }

                                                                        if(storeRoles.getCount()  > 0) {
                                                                            var resources = {
                                                                                'id_company'            : storageIdCompany,
                                                                                'login'                 : login,
                                                                                'email'                 : email,
                                                                                'deviceInstances'       : deviceInstances,
                                                                                'resourceInstances'     : resourceInstances,
                                                                                'resourceGroups'        : resourceGroups,
                                                                                'customAttributes'      : customAttributes,
                                                                                'roles'                 : roles,
                                                                                'status'                : 'active',
                                                                                'synchronize'           : ['deviceInstances', 'resourceInstances', 'resourceGroups', 'roles']
                                                                            };
                                                                            var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                                                                            Ext.Ajax.request({
                                                                                url      : moduleConfig.services.url+'/'+id,
                                                                                type     : 'rest',
                                                                                dataType : 'json',
                                                                                method   : 'PUT',
                                                                                scope    : this,
                                                                                params   : Ext.JSON.encode(resources),
                                                                                success  : function(response){
                                                                                    var res = response.responseText;
                                                                                    msgWait.hide();
                                                                                    Ext.MessageBox.show({
                                                                                        title   : translate.global.edit+' '+translateresources.moduleTitle,
                                                                                        msg     : translateresources.form.MsgSuccessEdit,
                                                                                        buttons : Ext.MessageBox.OK,
                                                                                        icon    : Ext.MessageBox.INFO
                                                                                    });
                                                                                    Ext.getCmp(moduleConfig.tab[activeIndex].gridPanel.id).getSelectionModel().clearSelections();
                                                                                    Ext.data.StoreManager.lookup(moduleConfig.tab[activeIndex].gridPanel.store).reload();
                                                                                    win.destroy();
                                                                                },
                                                                                failure  : function(response) {
                                                                                    var res = response.responseText;
                                                                                    msgWait.hide();
                                                                                    Ext.MessageBox.show({
                                                                                        title   : translate.global.edit+' '+translateresources.moduleTitle,
                                                                                        msg     : translateresources.form.MsgError,
                                                                                        buttons : Ext.MessageBox.OK,
                                                                                        icon    : Ext.MessageBox.ERROR
                                                                                    });
                                                                                }
                                                                            });
                                                                        } else {
                                                                            Ext.MessageBox.show({
                                                                                title        : translate.global.edit+' '+translateresources.moduleTitle,
                                                                                msg          : translateresources.form.gridRolesMsgErrorIsValid,
                                                                                animCollapse : true,
                                                                                buttons      : Ext.MessageBox.OK,
                                                                                icon         : Ext.MessageBox.WARNING
                                                                            });
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                    );
                                                    windowEditResources.show();
                                                    var form = windowEditResources.down('form').getForm();
                                                    var grid = record.up('grid');
                                                    var store = grid.getStore();
                                                    var selectedRecords = grid.getSelectionModel().getSelection();
                                                    var rec = selectedRecords[0];
                                                    var objectData = rec.getData();
                                                    var roles = objectData.Roles;
                                                    var deviceInstances = objectData.DeviceInstances;
                                                    var resourceInstances = objectData.ResourceInstances;
                                                    var resourceGroups = objectData.ResourceGroups;
                                                    var pass = form.findField('password');
                                                    var confirmPass = form.findField('passwordConfirm');
                                                    pass.allowBlank = true;
                                                    pass.hide();
                                                    confirmPass.allowBlank = true;
                                                    confirmPass.hide();

                                                    form.setValues(objectData);
                                                    var gridRoles = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridRoles');
                                                    var storeRoles = gridRoles.getStore();
                                                    var gridDevices = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridDevices');
                                                    var storeDevices = gridDevices.getStore();
                                                    var gridResources = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResources');
                                                    var storeResources = gridResources.getStore();
                                                    var gridResourceGroups = Ext.getCmp(moduleConfig.tab[activeIndex].id + 'GridResourceGroups');
                                                    var storeResourceGroups = gridResourceGroups.getStore();
                                                    storeRoles.removeAll();
                                                    if (roles.length > 0) {
                                                        storeRoles.add(roles);
                                                    }

                                                    storeDevices.removeAll();
                                                    if (deviceInstances.length > 0) {
                                                        for (var cDI = 0; cDI < deviceInstances.length; cDI++) {
                                                            var _idDI = deviceInstances[cDI];
                                                            Ext.Ajax.request({
                                                                url      : strURL +'/deviceinstances/'+_idDI,
                                                                type     : 'rest',
                                                                dataType : 'json',
                                                                method   : 'GET',
                                                                scope    : this,
                                                                headers  : {
                                                                    'Access-Control-Allow-Headers' : 'x-requested-with'
                                                                },
                                                                success  : function(response){
                                                                    var texto = response.responseText;
                                                                    var result = eval('(' + texto + ')');
                                                                    storeDevices.add({
                                                                        'id_deviceDefinition' : result._id,
                                                                        'device'              : result.id_deviceDefinition,
                                                                        'serial'              : result.serial,
                                                                        'Attributes'          : result.customAttributes,
                                                                        'objectAttributes'    : result.customAttributes
                                                                    });
                                                                },
                                                                failure : function(response) {
                                                                    console.log(response);
                                                                }
                                                            });

                                                        }
                                                    }
                                                    storeResources.removeAll();
                                                    if (resourceInstances.length > 0) {
                                                        for (var cRI = 0; cRI < resourceInstances.length; cRI++) {
                                                            storeResources.add({
                                                                'id_resourceInstance' : resourceInstances[cRI].id_resourceInstance,
                                                                'nameResource'        : resourceInstances[cRI].nameResource,
                                                                'login'               : resourceInstances[cRI].login,
                                                                'Attributes'          : resourceInstances[cRI].customAttributes,
                                                                'objectAttributes'    : resourceInstances[cRI].customAttributes
                                                            });
                                                        }
                                                    }
                                                    storeResourceGroups.removeAll();
                                                    if (resourceGroups.length > 0) {
                                                        for (var cRG = 0; cRG < resourceGroups.length; cRG++) {
                                                            var _idRG = resourceGroups[cRG];
                                                            Ext.Ajax.request({
                                                                url      : strURL +'/resourcegroups/'+_idRG,
                                                                type     : 'rest',
                                                                dataType : 'json',
                                                                method   : 'GET',
                                                                scope    : this,
                                                                headers  : {
                                                                    'Access-Control-Allow-Headers' : 'x-requested-with'
                                                                },
                                                                success  : function(response){
                                                                    var texto = response.responseText;
                                                                    var result = eval('(' + texto + ')');
                                                                    storeResourceGroups.add({
                                                                        'id_resourceGroups' : result._id,
                                                                        'resourceGroups'    : result.name
                                                                    });
                                                                },
                                                                failure : function(response) {
                                                                    console.log(response);
                                                                }
                                                            });

                                                        }
                                                    }
                                                }
                                            }
                                            ,
                                            {
                                                text    : translate.global.delete,
                                                iconCls : 'delete-menu',
                                                handler : function() {
                                                    Ext.Msg.confirm(translateresources.confirmTitle, translateresources.confirmDelete, function(btn) {

                                                        if (btn === 'yes') {
                                                            var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                                                            Ext.Ajax.request({
                                                                url      : moduleConfig.services.url+'/'+id,
                                                                type     : 'rest',
                                                                dataType : 'json',
                                                                method   : 'DELETE',
                                                                scope    : this,
                                                                success  : function(response) {
                                                                    msgWait.hide();
                                                                    Ext.MessageBox.show({
                                                                        title   : translate.global.delete+' '+translateresources.moduleTitle,
                                                                        msg     : translateresources.form.MsgSuccessDelete,
                                                                        buttons : Ext.MessageBox.OK,
                                                                        icon    : Ext.MessageBox.INFO
                                                                    });
                                                                    var grid = record.up('grid');
                                                                    grid.store.reload();
                                                                },
                                                                failure  : function(response) {
                                                                    msgWait.hide();
                                                                    Ext.MessageBox.show({
                                                                        title   : translate.global.delete+' '+translateresources.moduleTitle,
                                                                        msg     : translateresources.form.MsgError,
                                                                        buttons : Ext.MessageBox.OK,
                                                                        icon    : Ext.MessageBox.ERROR
                                                                    });
                                                                }
                                                            });
                                                        }

                                                    });
                                                }
                                            }
                                            ,
                                            {
                                                text    : translateresources.grid.menuItemChangePassword,
                                                iconCls : 'key-menu',
                                                handler : function() {
                                                    var tabPanel = record.up('tabpanel');
                                                    var activeItem = tabPanel.getActiveTab();
                                                    var activeIndex = tabPanel.items.indexOf(activeItem);

                                                    var windowChangePasswordResources = Ext.create('Ext.window.Window', {
                                                        title       : translateresources.grid.menuItemChangePassword,
                                                        id          : 'windowChangePassword'+moduleConfig.tab[activeIndex].id,
                                                        modal       : true,
                                                        width       : '50%',
                                                        height      : '70%',
                                                        minWidth    : '50%',
                                                        minHeight   : '70%',
                                                        layout      : 'fit',
                                                        resizable   : false,
                                                        draggable   : false,
                                                        closeAction : 'destroy',
                                                        autoDestroy : true,
                                                        items       : moduleConfig.tab[activeIndex].formChangePassword
                                                    });
                                                    windowChangePasswordResources.addDocked(
                                                    {
                                                        xtype  : 'toolbar',
                                                        flex   : 1,
                                                        dock   : 'bottom',
                                                        ui     : 'footer',
                                                        layout : {
                                                        pack : 'end',
                                                        type : 'hbox'
                                                        }
                                                        ,
                                                        items : [
                                                            {
                                                                text      : translate.global.cancel,
                                                                iconCls   : 'cancel-button',
                                                                id        : 'cancelButtonChangePassword'+moduleConfig.tab[activeIndex].id,
                                                                handler   : function() {
                                                                    var win = this.up('window');
                                                                    win.destroy();
                                                                }
                                                            },
                                                            {
                                                                text      : translate.global.send,
                                                                iconCls   : 'ok-button',
                                                                id        : 'saveButtonChangePassword'+moduleConfig.tab[activeIndex].id,
                                                                handler   : function() {
                                                                    var win = this.up('window');
                                                                    var form = win.down('form').getForm();
                                                                    if (form.isValid()) {
                                                                        var password = Ext.getCmp('FormPasswordConfirm').getValue();
                                                                        var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                                                                        Ext.Ajax.request({
                                                                            url      : moduleConfig.services.url+'/'+id+'/changepassword',
                                                                            type     : 'rest',
                                                                            dataType : 'json',
                                                                            method   : 'PUT',
                                                                            scope    : this,
                                                                            params   : Ext.JSON.encode({'password' : password}),
                                                                            success  : function(response) {
                                                                                msgWait.hide();
                                                                                Ext.MessageBox.show({
                                                                                    title   : translateresources.grid.menuItemChangePassword,
                                                                                    msg     : translateresources.form.MsgSuccessChangePassword,
                                                                                    buttons : Ext.MessageBox.OK,
                                                                                    icon    : Ext.MessageBox.INFO
                                                                                });
                                                                                var grid = record.up('grid');
                                                                                grid.store.reload();
                                                                                win.destroy();
                                                                            },
                                                                            failure  : function(response) {
                                                                                msgWait.hide();
                                                                                Ext.MessageBox.show({
                                                                                    title   : translateresources.grid.menuItemChangePassword,
                                                                                    msg     : translateresources.form.MsgError,
                                                                                    buttons : Ext.MessageBox.OK,
                                                                                    icon    : Ext.MessageBox.ERROR
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            }
                                                        ]
                                                    }
                                                    );
                                                    windowChangePasswordResources.show();
                                                }
                                            }
                                            ,
                                            {
                                                text    : translateresources.grid.menuItemResetPassword,
                                                iconCls : 'key-menu',
                                                handler : function() {
                                                    var msgWait = Ext.MessageBox.wait(translate.global.MsgSendData);
                                                    Ext.Ajax.request({
                                                        url      : moduleConfig.services.url+'/'+id+'/resetpassword',
                                                        type     : 'rest',
                                                        dataType : 'json',
                                                        method   : 'POST',
                                                        scope    : this,
                                                        params   : Ext.JSON.encode({'email' : email}),
                                                        success  : function(response) {
                                                            msgWait.hide();
                                                            Ext.MessageBox.show({
                                                                title   : translateresources.grid.menuItemResetPassword,
                                                                msg     : translateresources.form.MsgSuccessResetPassword,
                                                                buttons : Ext.MessageBox.OK,
                                                                icon    : Ext.MessageBox.INFO
                                                            });
                                                            var grid = record.up('grid');
                                                            grid.store.reload();
                                                        },
                                                        failure  : function(response) {
                                                            msgWait.hide();
                                                            Ext.MessageBox.show({
                                                                title   : translateresources.grid.menuItemResetPassword,
                                                                msg     : translateresources.form.MsgError,
                                                                buttons : Ext.MessageBox.OK,
                                                                icon    : Ext.MessageBox.ERROR
                                                            });
                                                        }
                                                    });
                                                }
                                            }
                                        ]
                                    }).showAt(xy);
                                }
                            };
                            /******************************************************************
                            ******************** Fin Estructura Dinámica **********************
                            ******************************************************************/
                        }

                    }
                    /** Llenamos las pestañas con los resultados: Array moduleConfig.tab **/
                    this.loadTabPanel(moduleConfig.tab);
                },
                failure : function(response) {
                    var texto = response.responseText;
                    var result = eval('(' + texto + ')');
                    var msgResult = result.msg;

                    if(msgResult == 'Token has expired') {
                        window.localStorage.removeItem('token');
                        window.location.replace(window.location.href.toString().split('?')[0]+'?m=Login');
                    }
                }
            });
        }
        else {
            window.localStorage.removeItem('token');
            window.location.replace(window.location.href.toString().split('?')[0]+'?m=Login');
        }

    },
    /**
    ******************************************************************
    * loadTabPanel
    * Crea las pestañas mediante el método Ext.each que serán 
    * asignadas al template
    ******************************************************************
    **/
    loadTabPanel: function(tabs) 
    {
        var itemsTabs = [];
        var len = tabs.length;
        if(len > 0) {
            Ext.each(tabs, function(value, index) {
                itemsTabs.push(
                    {
                        title       : value.name,
                        closable    : false,
                        layout      : 'border',
                        items       : [
                            {
                                title         : value.filterPanel.title,
                                region        : 'west',
                                collapsible   : true,
                                margins       : '0 0 0 5',
                                width         : '20%',
                                xtype         : 'form',
                                id            : value.filterPanel.id,
                                frame         : false,
                                autoScroll    : true,
                                height        : '100%',
                                border        : false,
                                fieldDefaults : {
                                    labelAlign  : 'top',
                                    collapsible : true,
                                    msgTarget   : 'under'
                                },
                                items          : value.filterPanel.form,
                                buttons        : value.filterPanel.buttons,
                                listeners      : {
                                    'beforerender' : function(panel){
                                        panel.collapse();
                                    }
                                    ,
                                    'afterrender' : function(panel){
                                        var id = panel.id;
                                        var filterPanel = Ext.getCmp(id);
                                        var header = filterPanel.getHeader();
                                        header.addClass('blue-cyan');
                                        Ext.getCmp(id+'-placeholder').addClass('blue-cyan');
                                    }
                                }
                            },
                            {
                                region      : 'center',
                                width       : '55%',
                                xtype       : 'gridpanel',
                                id          : value.gridPanel.id,
                                title       : value.gridPanel.title,
                                store       : value.gridPanel.store,
                                loadMask    : true,
                                height      : '100%',
                                multiSelect : true,
                                selType     : value.gridPanel.selType,
                                selModel    : {
                                    checkOnly      : false,
                                    injectCheckbox : value.gridPanel.checkboxIndex
                                },
                                margins     : '0 5 0 5',
                                viewConfig  : {
                                    forceFit            : true,
                                    enableTextSelection : true
                                },
                                listeners   : value.gridPanel.listeners,
                                columns     : value.gridPanel.columns,
                                dockedItems : [
                                    {
                                        xtype      : 'toolbar',
                                        border     : false,
                                        items      : value.gridPanel.toolbarItems
                                    },
                                    {
                                        xtype       : 'pagingtoolbar',
                                        dock        : 'bottom',
                                        store       : value.gridPanel.store,
                                        displayInfo : true,
                                        displayMsg  : translate.global.displayMsg,
                                        emptyMsg    : translate.global.emptyMsg,
                                        items       : [
                                            {
                                                text         : translate.global.export,
                                                enableToggle : true,
                                                defaultAlign : 'right',
                                                action       : 'exportXls',
                                                cls          : 'x-btn-default-small blue-cyan',
                                                toggleHandler: function (btn, pressed) 
                                                {
                                                    console.log('Generando archivo de excel - exportar');
                                                    //console.log(value.gridPanel.store);
                                                    var objStore = value.gridPanel.store;
                                                    var strURLExport =  moduleConfig.services.urlExport;

                                                    objController.onExportFile(objStore, strURLExport);
                                                }
                                            }
                                        ]
                                    }
                                ]

                            }
                            ,
                            {
                                region      : 'east',
                                width       : '25%',
                                xtype       : 'gridpanel',
                                id          : value.gridPanelGroup.id,
                                title       : value.gridPanelGroup.title,
                                store       : value.gridPanelGroup.store,
                                plugins     : [value.gridPanelGroup.rowEditing],
                                loadMask    : true,
                                height      : '100%',
                                multiSelect : true,
                                selType     : value.gridPanelGroup.selType,
                                selModel    : {
                                    checkOnly      : false,
                                    injectCheckbox : value.gridPanelGroup.checkboxIndex
                                },
                                margins     : '0 5 0 5',
                                viewConfig  : {
                                    forceFit            : true,
                                    enableTextSelection : true
                                },
                                listeners   : value.gridPanelGroup.listeners,
                                columns     : value.gridPanelGroup.columns,
                                dockedItems : [
                                    {
                                        xtype      : 'toolbar',
                                        border     : false,
                                        items      : value.gridPanelGroup.toolbarItems
                                    },
                                    {
                                        xtype       : 'pagingtoolbar',
                                        dock        : 'bottom',
                                        store       : value.gridPanelGroup.store,
                                        displayInfo : true,
                                        displayMsg  : translate.global.displayMsg,
                                        emptyMsg    : translate.global.emptyMsg
                                    }
                                ]

                            }
                        ]
                    }
                );
            });
        }
        /** Cargamos los valores asignados **/
        this.renderTabPanel(itemsTabs);
    },
    /**
    ******************************************************************
    * renderTabPanel
    * Asigna las pestañas al valor de moduleConfig.itemsTabs para
    * inmediatamente renderizar mediante el método render de Core.js
    ******************************************************************
    **/
    renderTabPanel : function(itemsTabs) 
    {
        moduleConfig.itemsTabs = itemsTabs;
        this.render(moduleConfig.template);
    }

});