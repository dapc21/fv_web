var objController = null;

Ext.define('LoadPrincipal.controller.' + controller, 
{
    extend  : 'LoadPrincipal.controller.Core',
    models  : [
        controller + '.List',
	    controller + '.ComboListFormTypes',
    ],
    stores  : [
        controller + '.List',
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
		
		//Agregamos el Id por defecto del Tipo de Formulario
		var comboFormTypes = Ext.getCmp('RegistersFormTypes');
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
                   console.log('objRecord:', objRecord);
                   console.log('records:', records);
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

        var objGrid = Ext.getCmp(AppGlobals.listId);
        objGrid.view.on(
            'expandbody', 
            function(rowNode, record, expandRow, eOpts)
            {   
                console.log('Arguments:', arguments);
                //alert('hi peter');
            }
        );
		
        this.control(
            {
                //Exportar Archivo
				'AliasRegistersList button[action=exportXls]':{
					click: this.onExportFile
				},
				
				////Filtrar
				
				//Filtro General
				'#listSearchKeyword':{
					keyup : this.multiSearch
				},
				//Filtro del Login
				'#RegistersFormTypes' : {
                    //change : this.multiSearch,
					change: this.onChangeFormTypes,
                },
				//Filtro del Login
				'AliasRegistersFilter textfield[id=RegistersFilterLogin]' : {
                    keyup : this.multiSearch
                },
				//Filtro de Fecha Inicio
				'AliasRegistersFilter textfield[id=RegistersFilterDateStart]' : {
                    select : this.multiSearch
                },
				//Filtro del Login
				'AliasRegistersFilter textfield[id=RegistersFilterDateFinish]' : {
                    select : this.multiSearch
                },
				'AliasRegistersFilter combo[id=RegistersFilterEstado]' : {
                    select : this.multiSearch
                },
                'AliasRegistersFilter combo[id=RegistersFilterType]' : {
                    change : this.multiSearch
                },
				//Limpia el filtro general del Grid
                'AliasRegistersList button[action=clearFilter]' : {
                    click : this.clearFilter
                },
				//Limpia cada uno de los subfiltros
                'AliasRegistersFilter button[action=clearFilter]' : {
                    click : this.clearFilter
                },
				//Limpia todos los filtros
				'AliasRegistersFilter button[action=clearFilters]' : {
                    click : this.clearFilters
                },
            }
        );
    },
    //Exporta la información en un excel
	onExportFile: function()
	{
		console.log('Exportando el archivo');
		
		var objStore = this.getRegistersListStore();
		var strURLExport =  moduleConfig.services.urlExport;

        this.onExportFileOverride(objStore, strURLExport);
	},
    //Exporta un archivo
    onExportFileOverride: function(store, urlService)
    {
        var params = store.proxy.extraParams;
        params['formType'] = Ext.getCmp(controller + 'FormTypes').getValue();
        console.log('Get Export - Params:', params);
        console.log('Get Export - UrlService:', urlService);

        Ext.Ajax.request({
            url      : urlService,
            method   : 'GET',
            scope    : this,
            params: params,
            success  : function(response) 
            {
                var headersResponse = response.getAllResponseHeaders();

                if(headersResponse['content-type'] != 'application/json')
                {
                    console.log('response:', response);
                    var blob = new Blob(
                        [response.responseText],
                        {
                            type: headersResponse['content-type']
                        }
                    );
                    var objectUrl = URL.createObjectURL(blob);
                    window.open(objectUrl);
                }
                else
                {
                    var objResponse = Ext.JSON.decode(response.responseText);

                    Ext.MessageBox.show({
                        title   : objResponse.error? 'ERROR' : 'RESPUESTA',
                        msg     : objResponse.msg,
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox[objResponse.error? 'ERROR' : 'INFO']
                    });
                    return;
                }
            },
            failure  : function(response) 
            {
                var objResponse = Ext.JSON.decode(response.responseText);

                Ext.MessageBox.show({
                    title   :'ERROR',
                    msg     : objResponse.msg,
                    buttons : Ext.MessageBox.OK,
                    icon    : Ext.MessageBox['ERROR']
                });
            }
        });
    },
	
	
    //Buscar genérico
	multiSearch: function()
    {
		console.log('Buscar Genérico');
		
		var objStore = this.getRegistersListStore();
		var strSearchKeyword = Ext.getCmp('listSearchKeyword').getValue();
		var strLogin = Ext.getCmp(controller + 'FilterLogin').getValue();
        var strDateStart = Ext.getCmp(controller + 'FilterDateStart').getValue();
        var strDateFinish = Ext.getCmp(controller + 'FilterDateFinish').getValue();
        var strEstado = Ext.getCmp(controller + 'FilterEstado').getValue();
        var strType = Ext.getCmp(controller + 'FilterType').getValue();
		var strFormTypes = Ext.getCmp(controller + 'FormTypes').getValue();
		
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

		if (!Ext.isEmpty(strFormTypes))
            jsonSearch.and.push(
                {
                    field      : 'id_form',
                    comparison : 'eq',
                    value      : strFormTypes
                }
            );
			
        if (!Ext.isEmpty(strLogin))
            jsonSearch.and.push(
                {
                    field      : 'login',
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
                    field      : 'arrival_time',
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
                    field      : 'task.type',
                    comparison : 'eq',
                    value      : strType
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
                    field      : 'task.code',
                    comparison : 'lk',
                    value      : strSearchKeyword
                },
                {  
                    field      : 'task.name',
                    comparison : 'lk',
                    value      : strSearchKeyword
                },
                {  
                    field      : 'task.address',
                    comparison : 'lk',
                    value      : strSearchKeyword
                },
                {  
                    field      : 'task.arrival_time',
                    comparison : 'lk',
                    value      : strSearchKeyword
                },
                {  
                    field      : 'task.finish_time',
                    comparison : 'lk',
                    value      : strSearchKeyword
                }
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
	//Cambia la estructura del grid según Tipo de formulario seleccionado
	onChangeFormTypes:function(thisCombo, newValue, oldValue, eOpts)
	{
		console.log('Seleccione el Tipo de Formulario:', newValue);
		
		var strValueKey = thisCombo.valueField || thisCombo.displayField;
        var objRecord = thisCombo.findRecord(strValueKey, newValue);
		
		if(!Ext.isEmpty(objRecord))
        {
            console.log('Registro seleccionado: ', objRecord);

			var objColumn = moduleConfig.grid.columnsBase.slice(0);
			var objGrid = Ext.getCmp(AppGlobals.listId);
            
            //Guardamos el último
            localStorage.setItem('_id_formtypes', objRecord.internalId);
			
            //Configurar la columnas
            var arrSections =  objRecord.raw.sections;
			console.log('arrSections: ', arrSections);
            //Plugin Expandido
            var pluginGrid = objGrid.getPlugin('idPluginRowExpander');
            //console.log('pluginGrid: ', pluginGrid);
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
                            //console.log('objQuestion:', objQuestion);
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
            //pluginGrid.rowBodyTpl.set(allHTML);
			pluginGrid.rowBodyTpl['htmlTemplate'] = allHTML;
			//console.log('pluginGrid.rowBodyTpl:', pluginGrid.rowBodyTpl);
            
			//console.log('objColumn:',  objColumn);
			objGrid.reconfigure(null, objColumn);
		}
		
		this.multiSearch();
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
	//Obtenemos la información a desplegar en una Fila (RowExpander)
    rowExpanderData: function(thisRowExpander, values)
    {
        //console.log('Desde el controlador', values);
        //console.log('Template', thisRowExpander.html);
        var tpl = new Ext.XTemplate([
            thisRowExpander.htmlTemplate,
            {
                getData: thisRowExpander.getData,
            }
        ]);

        //console.log('Aplicado', thisRowExpander.htmlTemplate);
        return tpl.apply(values);
    }, 
});
