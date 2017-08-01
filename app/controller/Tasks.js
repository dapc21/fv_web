var objController = null;

Ext.define('LoadPrincipal.controller.' + controller, 
{
    extend  : 'LoadPrincipal.controller.Core',
    models  : [
        controller + '.List',
        controller + '.ListRegisters',
	    controller + '.ComboListFormTypes',
    ],
    stores  : [
        controller + '.List',
        controller + '.ListRegisters',
	    controller + '.ComboListFormTypes',
    ],
    views   :  [],
    refs    : [],
    init    : function() 
	{	
        objController = this;
		//Manejo del Token
        var token = this.token();
        if(token){
            Ext.Ajax.useDefaultXhrHeader = true;
            Ext.Ajax.cors = true;
            Ext.Ajax.defaultHeaders = {
                'Authorization': 'Bearer ' + token
            };
        }

		//Desplegamos la vista
        this.render(moduleConfig.template);
		
		//Botones en la Grid
        this.addListButtons();

        //Listeners cargar el store
        //this['get' + controller + 'ListRegistersStore']().addListener('load', this.onListRegistersLoad, this);
		
        this.control(
            {
                //Contextual Menú 
				'AliasTasksList':{
					itemcontextmenu: this.onContextualMenu
				},
                //Exportar Archivo
				'AliasTasksList button[action=exportXls]':{
					click: this.onExportFile
				},
				//Filtro por Formulario
				'#TasksFormTypes' : {
					change: this.onChangeFormTypes,
                },
				////Filtrar
				
				//Filtro General
				'#listSearchKeyword':{
					keyup : this.multiSearch
				},
				//Filtro del Login
				'AliasTasksFilter textfield[id=TasksFilterLogin]' : {
                    keyup : this.multiSearch
                },
				//Filtro de Fecha Inicio
				'AliasTasksFilter textfield[id=TasksFilterDateStart]' : {
                    select : this.multiSearch
                },
				//Filtro del Fecha Fin
				'AliasTasksFilter textfield[id=TasksFilterDateFinish]' : {
                    select : this.multiSearch
                },
                //Filtro de Estado
				'AliasTasksFilter combo[id=TasksFilterEstado]' : {
                    select : this.multiSearch
                },
                //Filtro de Tipo de tarea
                'AliasTasksFilter combo[id=TasksFilterType]' : {
                    change : this.multiSearch
                },
                //Filtro de Tipo de tarea
                'AliasTasksFilter combo[id=TasksFilterTypeForm]' : {
                    change : this.multiSearch
                },
				//Limpia el filtro general del Grid
                'AliasTasksList button[action=clearFilter]' : {
                    click : this.clearFilter
                },
				//Limpia cada uno de los subfiltros
                'AliasTasksFilter button[action=clearFilter]' : {
                    click : this.clearFilter
                },
				//Limpia todos los filtros
				'AliasTasksFilter button[action=clearFilters]' : {
                    click : this.clearFilters
                },
            }
        );
    },
    //Exporta la información en un excel
	onExportFile: function()
	{
		console.log('Exportando el archivo');
		
		var objStore = this.getTasksListStore();
		var strURLExport =  moduleConfig.services.urlExport;

        this.callParent([objStore, strURLExport]);
	},
    //Buscar genérico
	multiSearch: function()
    {
		console.log('Buscar Genérico');
		
		var objStore = /*this.getRegistersListStore();*/this['get' + controller + 'ListStore']();
		var strSearchKeyword = Ext.getCmp('listSearchKeyword').getValue();
		var strLogin = Ext.getCmp(controller + 'FilterLogin').getValue();
        var strDateStart = Ext.getCmp(controller + 'FilterDateStart').getValue();
        var strDateFinish = Ext.getCmp(controller + 'FilterDateFinish').getValue();
        var strEstado = Ext.getCmp(controller + 'FilterEstado').getValue();
        var strType = Ext.getCmp(controller + 'FilterType').getValue();
        var strTypeForm = Ext.getCmp(controller + 'FilterTypeForm').getValue();
		
		strDateStart = Ext.isEmpty(strDateStart)? null : Ext.Date.format(strDateStart, 'Y-m-d H:i:s');
		strDateFinish = Ext.isEmpty(strDateFinish)? null : Ext.Date.format(strDateFinish, 'Y-m-d H:i:s');
		
		var jsonSearch = new Object();
        var jsonOr = new Object();
        var jsonOrAgent = new Object();

        jsonSearch.and = [];

        //Búsquedas AND...
        /*jsonSearch.and.push(
            {
                field      : 'deleted_at',
                comparison : 'isnull'
            }
        );*/

        //Filtro Compañía
        jsonSearch.and.push(
            {
                field: 'id_company',
                comparison: 'eq',
                value: window.localStorage.getItem('id_company')
            }
        );
			
        if (!Ext.isEmpty(strLogin))
            jsonSearch.and.push(
                {
                    field      : 'resourceInstance.login',
                    comparison : 'lk',
                    value      : strLogin
                }
            );

        if (!Ext.isEmpty(strDateStart))
            jsonSearch.and.push(
                {
                    field      : 'arrival_time',
                    comparison : 'gte',
                    value      : strDateStart
                }
            );

		if (!Ext.isEmpty(strDateFinish))
            jsonSearch.and.push(
                {
                    field      : 'finish_time',
                    comparison : 'lte',
                    value      : strDateFinish
                }
            );
		
        if (!Ext.isEmpty(strEstado))
            jsonSearch.and.push(
                {
                    field      : 'status',
                    comparison : 'eq',
                    value      : strEstado
                }
            );
        
        if (!Ext.isEmpty(strType))
            jsonSearch.and.push(
                {
                    field      : 'type',
                    comparison : 'eq',
                    value      : strType
                }
            );
        
        if (!Ext.isEmpty(strTypeForm))
            jsonSearch.and.push(
                {
                    field      : 'forms.id_form',
                    comparison : 'eq',
                    value      : strTypeForm
                }
            );
        //Búsqueda OR... (top searchfield)
        if (!Ext.isEmpty(strSearchKeyword)) {
            jsonOr.or = [
                {
                    field      : 'resourceInstance.login',
                    comparison : 'lk',
                    value      : strSearchKeyword
                },
                {
                    field      : 'resourceInstance.email',
                    comparison : 'lk',
                    value      : strSearchKeyword
                },
                {  
                    field      : 'code',
                    comparison : 'lk',
                    value      : strSearchKeyword
                },
                {  
                    field      : 'name',
                    comparison : 'lk',
                    value      : strSearchKeyword
                },
                {  
                    field      : 'address',
                    comparison : 'lk',
                    value      : strSearchKeyword
                },
                {  
                    field      : 'type',
                    comparison : 'lk',
                    value      : strSearchKeyword
                },
                /*{  
                    field      : 'arrival_time',
                    comparison : 'lk',
                    value      : strSearchKeyword
                },
                {  
                    field      : 'finish_time',
                    comparison : 'lk',
                    value      : strSearchKeyword
                }*/
            ];
            jsonSearch.and.push(jsonOr);
        }

        Ext.Ajax.abort(objStore.proxy.activeRequest);
		
		jsonSearch = Ext.isEmpty(jsonSearch.and)? {} : {'and': jsonSearch.and};
		
        objStore.proxy.extraParams = {
            filters : Ext.JSON.encode(jsonSearch)
        };
		
        objStore.loadPage(1);
		
	},
    //Contextual Menú
    onContextualMenu: function(thisGrid, record, item, index, e, eOpt)
    {
        e.stopEvent();
        //console.log('record:', record);
        var gridMenu = Ext.create('Ext.menu.Menu', 
        {    
            items: [
                {                                
                    text: 'Ver Registros',
                    handler: function()
                    {   
                        //console.log('Abre la ventana para ver las tareas no programadas.');
                        var m = moduleConfig;
                        var winGrid = objController.newWindowSimpleGrid(
                            m.ViewRegistersGroupId,
                            m.ViewRegistersTitleWindow,
                            m.ViewRegistersWidthWindow,
                            m.ViewRegistersHeightWindow,
                            m.ViewRegistersResizableWindow,
                            m.ViewRegistersStore, 
                            m.ViewRegistersColumns, 
                            m.ViewRegistersMenuItem, 
                            m.ViewRegistersPlugins,
                            m.ViewRegistersModalWindow,
                            m.ViewRegistersDraggableWindow,
                            m.ViewRegistersTopToolbar,
                            m.itemsPagingToolbar 
                        );

                        localStorage.setItem('_id_task', record.internalId);
                        
                        //Desplegamos la ventana
                        winGrid.show();

                        //Agregamos el Id por defecto del Tipo de Formulario
                        var comboFormTypes = Ext.getCmp(controller + 'FormTypes');
                        var objStoreFormTypes = comboFormTypes.getStore();
                        
                        objStoreFormTypes.load({
                            scope   : this,
                            callback: function(records, operation, success)
                            {
                                //Seteamos por defecto el último Tipo de Formulario
                                if(!Ext.isEmpty(localStorage._id_formtypes))
                                {
                                    var strValueKey = comboFormTypes.valueField || comboFormTypes.displayField;
                                    var objRecord = comboFormTypes.findRecord(strValueKey, localStorage._id_formtypes);

                                    if(objRecord)
                                    {
                                        comboFormTypes.setValue(localStorage._id_formtypes);
                                    }
                                    else
                                    {
                                        delete localStorage._id_formtypes;
                                    }
                                }
                                
                                if(Ext.isEmpty(localStorage._id_formtypes))
                                {
                                    if(!Ext.isEmpty(records[0]))
                                    {
                                        comboFormTypes.setValue(records[0].internalId);
                                        localStorage.setItem('_id_formtypes', records[0].internalId);
                                    }
                                }
                            }
                        });

                        /*var objGrid = Ext.getCmp(m.ViewRegistersGroupId + 'Grid');
                        objGrid.view.on(
                            'expandbody', 
                            function(rowNode, record, expandRow, eOpts)
                            {   
                                console.log('Arguments:', arguments);
                                //alert('hi peter');
                            }
                        );*/
                    }        
                },
            ]
        });

        gridMenu.showAt(e.getXY()); 
    },
    //Carga el store de ListRegisters
    /*onListRegistersLoad: function(thisStore, records, successful, eOpts)
    {
        console.log('arguments:', arguments);
    },*/
    //Cambia la estructura del grid según Tipo de formulario seleccionado
	onChangeFormTypes:function(thisCombo, newValue, oldValue, eOpts)
	{
		console.log('Seleccione el Tipo de Formulario:', newValue);
		
		var strValueKey = thisCombo.valueField || thisCombo.displayField;
        var objRecord = thisCombo.findRecord(strValueKey, newValue);
		
		if(!Ext.isEmpty(objRecord))
        {
            console.log('Registro seleccionado: ', objRecord);
            
            //Guardamos el último
            localStorage.setItem('_id_formtypes', objRecord.internalId);
			
            var objColumn = moduleConfig.ViewRegistersColumns.slice(0);
            var objGrid = Ext.getCmp(moduleConfig.ViewRegistersGroupId + 'Grid');
            
            //Configurar la columnas
            var arrSections =  objRecord.raw.sections;

            //Plugin Expandido
            var pluginGrid = objGrid.getPlugin('idPluginRowExpander');
            
            var allHTML = '';

            for (var index in arrSections) 
            {
                if (arrSections.hasOwnProperty(index)) 
                {
                    var objSection = arrSections[index];
                    var arrQuestions = objSection.questions;
                    var htmlQuestion = '';
                    var objHtmlHierarchyQuestions = {};
                    var objHierarchyQuestions = {};

                    for (var qindex in arrQuestions) 
                    {
                        if (arrQuestions.hasOwnProperty(qindex)) 
                        {
                            var objQuestion = arrQuestions[qindex];
                            
                            if(!Ext.isEmpty(objQuestion.id_parent))
                            {
                                var obj = {};

                                obj[objQuestion.cid] = objQuestion.configuration.fieldLabel;

                                if(Ext.isEmpty(objHierarchyQuestions[objQuestion.id_parent]))
                                {
                                    
                                    objHierarchyQuestions[objQuestion.id_parent] = [obj];
                                }
                                else
                                {
                                    objHierarchyQuestions[objQuestion.id_parent].push(obj);
                                }
                            }
                            else
                            {
                                objHtmlHierarchyQuestions[objQuestion.cid] = [
                                    '<div class="panel-body" style="margin: 10px; border: 1px solid #adadad;border-radius: 10px;"><span style="font-weight: bold;color: #1894ab;">' + objQuestion.configuration.fieldLabel + ':</span> <span style="color: #1ba7c0;">{[this.getData("' + objQuestion.xtype + '", values.dataWeb.' + objQuestion.cid + ', values)]}</span></div>',
                                ].join('');
                            }
                        }
                    }
                    //console.log('objHtmlHierarchyQuestions:', objHtmlHierarchyQuestions);
                    //console.log('objHierarchyQuestions:', objHierarchyQuestions);

                    for (var hindex in objHierarchyQuestions) 
                    {
                        if (objHierarchyQuestions.hasOwnProperty(hindex)) 
                        {
                            objHtmlHierarchyQuestions[hindex] = objHtmlHierarchyQuestions[hindex].replace('values)', 'values, ' + Ext.JSON.encode(objHierarchyQuestions[hindex]) + ')');
                        }
                    }

                    for (var hindex in objHtmlHierarchyQuestions)
                    {
                        if (objHtmlHierarchyQuestions.hasOwnProperty(hindex)) 
                        {
                            htmlQuestion += objHtmlHierarchyQuestions[hindex];
                        }
                    }
                    
                    allHTML += [
                        '<div class="panel panel-default" style="font-family: Open Sans, sans-serif;">',
                            '<div class="panel-heading" style="background-color:#1fbad6;">',
                                '<h4 class="panel-title" style="color: #fff;padding:5px;">',
                                    '<a data-toggle="collapse" class="registers-expand" href="#{_id}panelSectionCollapse_' + index + '" onclick="var event = arguments[0] || window.event; objController.expandSection(this, event)"> ' + objSection.name + '</a>',
                                '</h4>',
                            '</div>',
                            '<div id="{_id}panelSectionCollapse_' + index + '" class="panel-collapse collapse">',
                                htmlQuestion,
                            '</div>',
                        '</div>',
                    ].join('');
                }
            }
            //console.log('allHTML:', allHTML);
            //Actualizamos el tpl
            pluginGrid.rowBodyTpl.set(allHTML);
            
            //console.log('objColumn:',  objColumn);
			//objGrid.reconfigure(null, objColumn);
		}
		
		this.multiSearchSubGrid();
	},
    //Expande/Cierra una sección dentro del grid
    expandSection:function(aHtml, event)
    {
        //console.log('Expand/Collapse:', arguments);

        event.stopPropagation();
        
        var idSectionBody = aHtml.href.split('#')[1];

        if(aHtml.className  == 'registers-expand')
        {
            aHtml.className  = 'registers-collapse';
        }
        else
        {
            aHtml.className  = 'registers-expand';
        }

        var domElement = Ext.get(idSectionBody);
        if(domElement.hasCls('in'))
        {
            domElement.removeCls('in');
        }
        else
        {
            domElement.addCls('in');
        }
    },
    //
    multiSearchSubGrid: function()
    {
        var idForm = localStorage._id_formtypes;
        var idTask = localStorage._id_task;
        var storeListRegisters = Ext.getCmp(moduleConfig.ViewRegistersGroupId + 'Grid').getStore();
        
        storeListRegisters.proxy.extraParams.filters = Ext.JSON.encode({
            'and':[
                {
                    field: 'id_company',
                    comparison: 'eq',
                    value: window.localStorage.getItem('id_company')
                },
                {
                    field: 'id_task',
                    comparison: 'eq',
                    value: idTask
                },
                {
                    field: 'id_form',
                    comparison: 'eq',
                    value: idForm
                },			   
            ]
        });

        storeListRegisters.load();
    },
    //Obtenemos la información a desplegar en una Fila (RowExpander)
    rowExpanderData: function(thisRowExpander, values)
    {
        console.log('Desde el controlador', values);
        console.log('Template', thisRowExpander.html);
        var tpl = new Ext.XTemplate([
            thisRowExpander.html,
            {
                getData: thisRowExpander.getData,
            }
        ]);

        console.log('Aplicado', thisRowExpander.html);
        return tpl.apply(values);
    } 
});
