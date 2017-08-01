var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'grid';
moduleConfig.lateralPanel = 'left';
moduleConfig.listPageSize = 10;
moduleConfig.exportFilter = '';

moduleConfig.services = new Object();
moduleConfig.services.url = strURL + '/registers';
moduleConfig.services.listTasksUrl = strURL + '/registers?relations=["task","resourceInstance"]';
moduleConfig.services.comboFormTypes = strURL + '/forms';
moduleConfig.services.urlExport = strURL + '/registers/excel';

moduleConfig.filterForm = new Object();
moduleConfig.filterTitle = translateinformation.filter.title;
moduleConfig.filterForm = [
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype           : 'textfield',
                fieldLabel      : 'Login',
                id              : controller + 'FilterLogin',
                emptyText       : 'Ingrese el Login..',
                columnWidth     : 0.95,
                enableKeyEvents : true,
                allowBlank      : true,
                margin          : '20 0 0 0',
                width           : '60%'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por Login',
                fieldName      : controller + 'FilterLogin',
                margin         : '46 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'datefield',
                fieldLabel     : 'Fecha Inicio',
                id             : controller + 'FilterDateStart',
                emptyText      : 'Ingrese la fecha de inicio...',
				editable: false,
				//format: 'Y-m-d H:i:s',
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.94,
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por fecha de inicio',
                fieldName      : controller + 'FilterDateStart',
                margin         : '27 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'datefield',
                fieldLabel     : 'Fecha Fin',
                id             : controller + 'FilterDateFinish',
				editable: false,
				//format: 'Y-m-d H:i:s',
                emptyText      : 'Ingrese la fecha fin...',
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.95,
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por fecha fin',
                fieldName      : controller + 'FilterDateFinish',
                margin         : '27 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'combo',
                fieldLabel     : 'Estado',
                id             : controller + 'FilterEstado',
                loadingText    : translateinformation.filter.loadingText,
                emptyText      : 'Ingrese el Estado...',
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.95,
                displayField   : 'name',
                valueField     : 'estado',
                minChars       : 0,
                anchor         :'100%',
                pageSize       : 10,
               // margin         : '20 0 0 0',
                labelWidth     : '100%',
                triggerAction  : 'all',
                editable       : false,
                store          : Ext.create('Ext.data.Store', {
                    fields         : ['estado', 'name'],
                    data           : [
                        {"estado" : "PENDIENTE",   "name" : 'Pendiente'},
                        {"estado" : "CHECKIN", "name" : 'Checkin'},
						{"estado" : "CHECKOUT CON FORMULARIO", "name" : 'Checkout con Formulario'},
						{"estado" : "CHECKOUT SIN FORMULARIO", "name" : 'Checkout sin Formulario'}
                    ]
                }),
                queryMode    : 'local'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por estado',
                fieldName      : controller + 'FilterEstado',
                margin         : '27 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    },
    {
        xtype  : 'container',
        flex   : 1,
        layout : 'column',
        items  : [
            {
                xtype          : 'combo',
                fieldLabel     : 'Tipo',
                id             : controller + 'FilterType',
                loadingText    : translateinformation.filter.loadingText,
                emptyText      : 'Ingrese el Tipo...',
                typeAhead      : false,
                forceSelection : true,
                columnWidth    : 0.95,
                displayField   : 'name',
                valueField     : 'type',
                minChars       : 0,
                anchor         :'100%',
                pageSize       : 10,
               // margin         : '20 0 0 0',
                labelWidth     : '100%',
                triggerAction  : 'all',
                editable       : false,
                store          : Ext.create('Ext.data.Store', {
                    fields         : ['type', 'name'],
                    data           : [
                        {"type" : "start",   "name" : 'Inicio'},
                        {"type" : "end", "name" : 'Fin'},
						{"type" : "pickup", "name" : 'Recogida'},
						{"type" : "dropoff", "name" : 'Entrega'},
                        {"type" : "stop", "name" : 'Parada'}
                    ]
                }),
                queryMode    : 'local'
            },
            {
                xtype          : 'button',
                iconCls        : 'cancel-button',
                tooltip        : 'Elimina el filtro por tipo',
                fieldName      : controller + 'FilterType',
                margin         : '27 6 6 3',
                cls            : 'x-btn-default-small',
                action         : 'clearFilter'
            }
        ]
    }     
];

//esta window debe estar declarada
//obligatoriamente
moduleConfig.window = new Object();

moduleConfig.grid = new Object();
moduleConfig.grid.title = 'Consulta de Información';
moduleConfig.grid.searchField = true;
moduleConfig.grid.searchTitle = 'Busque por Nombre...';
moduleConfig.grid.searchId = 'listSearchKeyword';
moduleConfig.grid.pageSize = 15;
moduleConfig.grid.topCombos = [
    {
        xtype          : 'combo',
        fieldLabel     : 'Tipos de Formularios',
        labelWidth     : 140,
        name           : 'id_ptodespacho',
        id             : controller + 'FormTypes',
        loadingText    : 'Buscando...',
        displayField   : 'name',
        valueField     : '_id',
        typeAhead      : false,
        forceSelection : false,
        //allowBlank     : false,
        minChars       : 0,
        pageSize       : 10,
        editable       : false,
        store:  controller + '.ComboListFormTypes',
        matchFieldWidth: false,
        /*queryParam: 'filters',
        listeners:{
                'beforequery': function( queryEvent, eOpts )
                {
                var objFilters = {
                        'and':[
                            {
                                'field':'nombre',
                                'comparison':'lk',
                                'value': queryEvent.query
                            },
                            {
                                'field':'deleted_at',
                                'comparison':'isnull'
                            }
                        ]
                    };

                    queryEvent.query = Ext.encode(objFilters);
                }
        }*/
    }
];
moduleConfig.grid.listPlugins = [
   {
        //ptype: 'rowexpander',
        ptype: 'datarowexpander',
        pluginId: 'idPluginRowExpander',
        expandOnDblClick: false,
        expandOnEnter: false,
        //selectRowOnExpand: true,
        //Mejorar - https://fiddle.sencha.com/#fiddle/6g1
        //gridConfig: {
        //    colSpan: 3,
        //},
        //columnConfig: [],
        rowBodyTpl : new Ext.XTemplate(
            '{[this.rowExpanderData(values)]}',
            {
                //Obtiene los datos de acuerdo al tipo
                getData: function(type, data, allData, extraData)
                {
                    //console.log('All:', arguments);
                    var result = 'N/A'

                    if(!Ext.isEmpty(data))
                    {
                        switch (type) {
                            case 'textfield':
                                result = data;
                                break;
                            case 'textareafield':
                                result = data;
                                break;
                            case 'fieldcontainer':
                                result = data;
                                break;
                            case 'combobox':
                                result = data;
                                break;
                            case 'fieldcontainer':
                                result = data;
                                break;
                            case 'numberfield':
                                result = data;
                                break;
                            case 'timefield':
                                result = data;
                                break;
							case 'orderfield':
                            case 'gridfield':
                                result = Ext.JSON.encode(extraData) + Ext.JSON.encode(data);
                                var resultTable = '<table style="width:100%; border: 1px solid #1894ab;font-size: 13px"><tr style="background: #1894ab;color: #fff">';
                                var columnsName = [];
                                //console.log('gridfield:', result);
                                //Agrego los headers
                                for(var i=0; i<extraData.length; ++i)
                                {
                                    var columnName = extraData[i];
                                    for (var key in columnName) 
                                    {
                                        if (columnName.hasOwnProperty(key)) {
                                            var element = columnName[key];
                                            columnsName.push(key);
                                            resultTable += '<th>' + element + '</th>';
                                        }
                                    }
                                }
                                resultTable += '</tr>'; 

                                //Iteramos por fila
                                for (var key in data) 
                                {
                                    if (data.hasOwnProperty(key)) 
                                    {
                                        var element = data[key];
                                        resultTable += '<tr>';
                                        for(var i=0; i<columnsName.length; ++i)
                                        {
                                            var valTD = element[columnsName[i]] || 'N/A';
                                            resultTable += '<td>' + valTD + '</td>';
                                        }
                                        resultTable += '<tr>';
                                    }
                                }
                                //Agrego la data

                                resultTable += '</table>'; 

                                /*resultTable = ['<table style="width:100%; border: 1px solid #000;"><tbody>',
                                '<tr><th>Modalidad</th><th>Calificación</th><th>Entidad</th><th>Tipo deudor</th><th>Fecha inicio</th><th>Fecha de erminación</th><th>Valor inicial</th><th>Saldo obligatorio</th><th>Valor cuota mensual</th><th>Utilizando en la micro empresa</th><th>Date</th><th>Time</th></tr>',
                                '<tr><td>dgjdlkgjs dlkgjls</td><td>2016-8-21 ghgh</td><td>10:47 ghghghgfgh</td><td>Todo bien vale </td><td>2016-8-21 fgdfgdfgdfg</td><td>10:47 vbxshdhsdsdg sdgsdg</td><td>n</td><td>2016-8-21 fdgdgsdgdsgs dgsddgsdgs dgsgsd gsdgsdgsd fgsgsdg sdgsdg sg</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td></tr>',
                                '<tr><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td></tr>',
                                '<tr><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td><td>n</td><td>2016-8-21</td><td>10:47</td></tr>',
                                '<tr></tr></tbody></table>'];*/
                                result = resultTable;
                                break;
                            case 'datefield':
                                result = data;
                                break;
                            case 'filefield':
                                result = data;
                                break;
                            case 'photofield':
                            case 'signaturefield':
                            case 'qrcodefield':
                            case 'barcodefield':
                                result = '<a href="' + data + '"  target="_black" class="tooltip-tasks" style="font-size: 14px;">Ver Foto <span class="tooltiptext-tasks" style="border: 1px solid #000; background-color: #fff;    margin-left: 4em;margin-top: -2.5em;"><img src="' + data + '" height="50px"></span></a>';
                                break;
                            case 'labelfield':
                                result = data;
                                break;
                        }
                    }
                    return result;
                },
                rowExpanderData: function(values)
                {	
					//console.log('Se ejecuta - PC');
                    return objController.rowExpanderData(this, values);
                },
            }
        ),
    }
];
moduleConfig.grid.topButtons = [];
moduleConfig.grid.contextualMenu = [
    {
        text    : translateinformation.resources.titleWindow,
        id      : controller + 'ContextualResources',
        submenu : false,
        iconCls : 'codensa-menu'
    }
    ,
    {
        text    : translateinformation.licenses.titleWindow,
        id      : controller + 'ContextualLicenses',
        submenu : false,
        iconCls : 'codensa-menu'
    }
    ,
    {
        text    : translateinformation.devices.titleWindow,
        id      : controller + 'ContextualDevices',
        submenu : false,
        iconCls : 'codensa-menu'
    }
];
moduleConfig.grid.tooltip = true;
moduleConfig.grid.tooltipField = 'name';
moduleConfig.grid.checkbox = 'checkboxmodel';
moduleConfig.grid.checkboxIndex = 0;
moduleConfig.grid.idField = '_id';
moduleConfig.grid.columns = [];
moduleConfig.grid.columnsBase = [
    {
        text      : translateinformation.list.id,
        dataIndex : '_id',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true
    },
    {
        text      : 'Nombre',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.raw.task)? 'N/A' : record.raw.task.name;	
			return val;
		}
    },
	{
        text      : 'Login',
        dataIndex : 'login',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.raw.resourceInstance)? 'N/A' : record.raw.resourceInstance.login;	
			return val;
		}
    },
	{
        text      : 'Inicio Programado',
        dataIndex : 'arrival_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.raw.task)? 'N/A' : record.raw.task.arrival_time;	
            return val;
        }
    },
	{
        text      : 'Fin Programado',
        dataIndex : 'finish_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.raw.task)? 'N/A' : record.raw.task.finish_time;
            return val;	
        }
    },
	{
        text      : 'Dirección',
        dataIndex : 'location_name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.raw.task)? 'N/A' : record.raw.task.address;
            return val;	
        }
    },
    {
        text      : 'Checkin',
        dataIndex : 'task.checkin.date',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = (Ext.isEmpty(record.raw.task) || Ext.isEmpty(record.raw.task.checkin))? 'N/A' : record.raw.task.checkin.date;
            return val;	
        }
    },
    {
        text      : 'Checkout',
        dataIndex : 'task.checkout.date',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        autoSizeColumn: true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = (Ext.isEmpty(record.raw.task) || Ext.isEmpty(record.raw.task.checkout))? 'N/A' : record.raw.task.checkout.date;
            return val;	
        }
    }
];
moduleConfig.grid.pagingToolbarItems = [
    {
        text: translate.global.export,
        enableToggle: true,
        defaultAlign: 'right',
        action: 'exportXls',
        cls : 'x-btn-default-small',
        toggleHandler: function (btn, pressed) {

        },
        style:{
            background: '#1fbad6',
            border: '1px solid #fff',  
        },
    }
];
moduleConfig.grid.columnsProspectos = [
    {
        text      : translateinformation.list.id,
        dataIndex : '_id',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true
    },
    {
        text      : 'Nombre',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
    },
	{
        text      : 'Login',
        dataIndex : 'login',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			console.log();
			val = Ext.isEmpty(record.data.resource)? 'N/A' : record.data.resource.login;
			
			return val;
		}
    },
	{
        text      : 'Inicio Programado',
        dataIndex : 'arrival_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.arrival_time)? 'N/A' : record.data.arrival_time;
			
			return val;
		}
    },
	{
        text      : 'Fin Programado',
        dataIndex : 'finish_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.finish_time)? 'N/A' : record.data.finish_time;
			
			return val;
		}
    },
	{
        text      : 'Dirección',
        dataIndex : 'location_name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.location)? 'N/A' : record.data.location.name;
			
			return val;
		}
    },
    /*{
        text      : 'ID',
        dataIndex : 'name',
        width     : '20%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1;
			
			return val;
		}
    },*/
    {
        text      : 'Nombre Comercial',
        dataIndex : 'nit',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2;
			
			return val;
		}
    }
    ,
    {
        text      : 'Razón Social',
        dataIndex : 'phone',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3;
			
			return val;
		}
    }
    ,
    {
        text      : 'Estatus',
        dataIndex : 'address',
        width     : '20%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4;
			
			return val;
		}
    }
    ,
    /*{
        text      : 'Frecuencia de Visita',
        dataIndex : 'city',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c5;
			
			return val;
		}
    }
    ,*/
    /*{
        text      : 'Días de Visita',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c6;
			
			return val;
		}
    },*/
	{
        text      : 'RFC',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c7;
			
			return val;
		}
    },
	{
        text      : 'Fecha de Ingreso',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c8;
			
			return val;
		}
    },
	{
        text      : 'Contacto',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c9;
			
			return val;
		}
    },
	{
        text      : 'Teléfono',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c10;
			
			return val;
		}
    },
	{
        text      : 'Móvil',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c11;
			
			return val;
		}
    },
	{
        text      : 'Mail',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c12;
			
			return val;
		}
    },
	/*{
        text      : 'Segmentación Universal',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c13;
			
			return val;
		}
    },
	{
        text      : 'Ruta',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c14;
			
			return val;
		}
    },*/
	{
        text      : 'Código Postal',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c15;
			
			return val;
		}
    },
	{
        text      : 'Estado',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c16;
			
			return val;
		}
    },
	{
        text      : 'Delegacion',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c17;
			
			return val;
		}
    },
	/*{
        text      : 'Colonia',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c18;
			
			return val;
		}
    },
	{
        text      : 'Segmentación Propia',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c19;
			
			return val;
		}
    },*/
	{
        text      : 'Localización del Cliente',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c20[0] + ', ' +  record.data.register.dataWeb.c20[1];
			
			return val;
		}
    },
	{
        text      : 'Fecha Checkin',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c21;
			
			return val;
		}
    },
	{
        text      : 'Localización Checkin',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c22 + ', ' + record.data.register.dataWeb.c23;
			
			return val;
		}
    },
	{
        text      : 'Fecha Checkout',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c24;
			
			return val;
		}
    },
	{
        text      : 'Localización Checkout',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c25 + ', ' + record.data.register.dataWeb.c26;
			
			return val;
		}
    },
	{
        text      : 'Motivo',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c27;
			
			return val;
		}
    },
	{
        text      : 'Formlario Completo',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c28=='false'? 'No' : 'Si';
			
			return val;
		}
    },
	{
        text      : 'Vende categoria',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c29;
			
			return val;
		}
    },
	{
        text      : 'Vende Camel',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c30;
			
			return val;
		}
    },
	{
        text      : 'Vende Winston',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c31;
			
			return val;
		}
    },
	{
        text      : 'Paquetes abiertos por dia',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c32;
			
			return val;
		}
    },
	{
        text      : 'Mueble aereo',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c33;
			
			return val;
		}
    },
	{
        text      : 'Puertas de frio',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c34;
			
			return val;
		}
    },
	{
        text      : 'Cerca a punto de afluencia',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c35;
			
			return val;
		}
    },
	{
        text      : 'Imagen cerrado',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
		{	
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c36;
			
			if(Ext.isEmpty(val))
				val = '<a href="' + val + '" target="_black">Ver Imagen</a>';
			else
				val = 'N/A';

			return val;
		}
    },
];

moduleConfig.grid.columnsPreventa = [
    {
        text      : translateinformation.list.id,
        dataIndex : '_id',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true
    },
    {
        text      : 'Nombre',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
    },
	{
        text      : 'Login',
        dataIndex : 'login',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.resource)? 'N/A' : record.data.resource.login;
			
			return val;
		}
    },
	{
        text      : 'Inicio Programado',
        dataIndex : 'arrival_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.arrival_time)? 'N/A' : record.data.arrival_time;
			
			return val;
		}
    },
	{
        text      : 'Fin Programado',
        dataIndex : 'finish_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.finish_time)? 'N/A' : record.data.finish_time;
			
			return val;
		}
    },
	{
        text      : 'Dirección',
        dataIndex : 'location_name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.location)? 'N/A' : record.data.location.name;
			
			return val;
		}
    },
    {
        text      : 'Nombre Comercial',
        dataIndex : 'name',
        width     : '20%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1;
			
			return val;
		}
    },
    {
        text      : 'Fecha de Ingreso',
        dataIndex : 'date',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2;
			
			return val;
		}
    }
    ,
    {
        text      : 'Contacto',
        dataIndex : 'contact',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3;
			
			return val;
		}
    }
    ,
    {
        text      : 'Teléfono',
        dataIndex : 'telephone',
        width     : '20%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4;
			
			return val;
		}
    }
    ,
    {
        text      : 'Móvil',
        dataIndex : 'mobile',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c5;
			
			return val;
		}
    }
    ,
    {
        text      : 'Código Postal',
        dataIndex : 'zp',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c6;
			
			return val;
		}
    },
	{
        text      : 'Estado',
        dataIndex : 'status',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c7;
			
			return val;
		}
    },
	{
        text      : 'Delegacion',
        dataIndex : 'delegacion',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c8;
			
			return val;
		}
    },
	{
        text      : 'Frecuencia de visita',
        dataIndex : 'frecuencia',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c9;
			
			return val;
		}
    },
	{
        text      : 'Días de entrega',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c10;
			
			return val;
		}
    },
	{
        text      : 'Días de entrega',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
		{	
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c11;
			
			return val;
		}
    },
	{
        text      : 'Horario de entrega',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c12;
			
			return val;
		}
    },
	{
        text      : 'Folio',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c13;
			
			return val;
		}
    },
	{
        text      : 'Pedido',
        dataIndex : 'country',
        width     : 250,
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c41;
			
			return val;
		}
    },
	{
        text      : 'Cancelar pedido',
        dataIndex : 'country',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c44;
			
			return val;
		}
    },
];

moduleConfig.grid.columnsAgrarioVinculacion = [
{         text      : translateinformation.list.id,         dataIndex : '_id',         width     : '10%',         align     : 'left',         hidden    : true,         sortable  : true     },
{         text      : 'Nombre',         dataIndex : 'name',         width     : '10%',         align     : 'left',         hidden    : false,         sortable  : true,     },
{         text      : 'Login',         dataIndex : 'login',         width     : '10%',         align     : 'left',         hidden    : false,         sortable  : true, 		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){ 			console.log(); 			val = Ext.isEmpty(record.data.resource)? 'N/A' : record.data.resource.login; 			 			return val; 		}     },
{         text      : 'Inicio Programado',         dataIndex : 'arrival_time',         width     : '10%',         align     : 'left',         hidden    : false,         sortable  : true, 		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){ 			 			val = Ext.isEmpty(record.data.arrival_time)? 'N/A' : record.data.arrival_time; 			 			return val; 		}     },
{         text      : 'Fin Programado',         dataIndex : 'finish_time',         width     : '10%',         align     : 'left',         hidden    : false,         sortable  : true, 		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){ 			 			val = Ext.isEmpty(record.data.finish_time)? 'N/A' : record.data.finish_time; 			 			return val; 		}     }, 	
{         text      : 'Dirección',         dataIndex : 'location_name',         width     : '10%',         align     : 'left',         hidden    : false,         sortable  : true, 		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){ 			 			val = Ext.isEmpty(record.data.location)? 'N/A' : record.data.location.name; 			 			return val; 		}     },
{ text : 'Nombre de la oficina', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c101;  return val; } },
{ text : 'Código de la oficina', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c102;  return val; } },
{ text : 'Objetivo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c103;  return val; } },
{ text : 'Tipo de Persona', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c104;  return val; } },
{ text : 'Producto Solicitado', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c105;  return val; } },
{ text : 'Vinculo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c106;  return val; } },
{ text : 'Tipo de identificación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c201;  return val; } },
{ text : 'Número', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c202;  return val; } },
{ text : 'Fecha de expedición', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c203;  return val; } },
{ text : 'Lugar de expedición', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c204;  return val; } },
{ text : 'Nombres', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c205;  return val; } },
{ text : 'Primer apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c206;  return val; } },
{ text : 'Segundo apellido (o de casada)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c207;  return val; } },
{ text : 'Fecha de nacimiento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c208;  return val; } },
{ text : 'País de nacimiento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c209;  return val; } },
{ text : 'Depto. de nacimiento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c210;  return val; } },
{ text : 'Ciudad de nacimiento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c211;  return val; } },
{ text : 'Profesión', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c212;  return val; } },
{ text : 'Nivel de estudios', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c213;  return val; } },
{ text : 'Estado civil', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c214;  return val; } },
{ text : 'Sexo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c215;  return val; } },
{ text : 'Ocupación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c216;  return val; } },
{ text : 'Código CIIU', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c217;  return val; } },
{ text : 'Descripción de la actividad económica', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c218;  return val; } },
{ text : 'Maneja recursos públicos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c219;  return val; } },
{ text : 'Fecha checkin', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c21;  return val; } },
{ text : 'Longitude checkin', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c22;  return val; } },
{ text : 'Longitude checkin', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c23;  return val; } },
{ text : 'Fecha checkout', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c24;  return val; } },
{ text : 'Latitude checkout', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c25;  return val; } },
{ text : 'Longitude checkout', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c26;  return val; } },
{ text : 'errorReason', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c27;  return val; } },
{ text : 'Nombre de la empresa', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c301;  return val; } },
{ text : 'Cargo actual', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c302;  return val; } },
{ text : 'Salario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c303;  return val; } },
{ text : 'Nombre de la empresa', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c401;  return val; } },
{ text : 'NIT', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c402;  return val; } },
{ text : 'Fecha de constitución', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c403;  return val; } },
{ text : 'Código CIIU', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c404;  return val; } },
{ text : 'Descripción de la actividad económica', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c405;  return val; } },
{ text : 'Oficial', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c501;  return val; } },
{ text : 'Particular', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c502;  return val; } },
{ text : 'Tipo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c601;  return val; } },
{ text : 'Nombres', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c602;  return val; } },
{ text : 'Primer apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c603;  return val; } },
{ text : 'Segundo apellido (o de casada)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c604;  return val; } },
{ text : 'Tipo de identificación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c605;  return val; } },
{ text : 'Número', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c606;  return val; } },
{ text : 'Dirección', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c607;  return val; } },
{ text : 'Teléfono', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c608;  return val; } },
{ text : 'Dirección residencia', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c701;  return val; } },
{ text : 'Barrio / Vereda', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c702;  return val; } },
{ text : 'Municipio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c703;  return val; } },
{ text : 'Departamento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c704;  return val; } },
{ text : 'Teléfono fijo (indicativo y número)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c705;  return val; } },
{ text : 'Celular', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c706;  return val; } },
{ text : 'Dirección electrónica', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c707;  return val; } },
{ text : 'Dirección (comercial, oficina u otra)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c708;  return val; } },
{ text : 'Barrio / Vereda', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c709;  return val; } },
{ text : 'Municipio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c710;  return val; } },
{ text : 'Dirección correspondencia', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c711;  return val; } },
{ text : 'Departamento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c712;  return val; } },
{ text : 'Teléfono fijo (indicativo y número)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c713;  return val; } },
{ text : 'Celular', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c714;  return val; } },
{ text : 'Fax', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c715;  return val; } },
{ text : 'Con corte a', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c801;  return val; } },
{ text : 'Ingresos básicos mensuales', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c802;  return val; } },
{ text : 'Otros ingresos mensuales', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c803;  return val; } },
{ text : 'Total ingresos mensuales', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c804;  return val; } },
{ text : 'Total activos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c805;  return val; } },
{ text : 'Total pasivos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c806;  return val; } },
{ text : 'Total patrimonio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c807;  return val; } },
{ text : 'Total egresos mensuales', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c808;  return val; } },
{ text : 'Depende económicamente de un tercero', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c809;  return val; } },
{ text : 'Descripción otros ingresos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c810;  return val; } },
{ text : 'Persona jurídica', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c811;  return val; } },
{ text : 'Persona natural régimen fiscal', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c812;  return val; } },
{ text : 'Persona natural sujeto a retención', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c813;  return val; } },
{ text : 'Maneja operaciones en Moneda Extranjera?', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c901;  return val; } },
{ text : 'Tipo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c902;  return val; } },
{ text : 'Entidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c903;  return val; } },
{ text : 'Monto', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c904;  return val; } },
{ text : 'Moneda', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c905;  return val; } },
{ text : 'Identificación del Producto', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c906;  return val; } },
{ text : 'Tipo de Producto', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c907;  return val; } },
{ text : 'Ciudad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c908;  return val; } },
{ text : 'País', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c909;  return val; } },
{ text : 'Nombres y apellidos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1001;  return val; } },
{ text : 'No. identificación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1002;  return val; } },
{ text : 'Valor de la participación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1003;  return val; } },
{ text : 'Porcentaje de la participación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1004;  return val; } },
{ text : 'Nombres y apellidos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1005;  return val; } },
{ text : 'No. identificación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1006;  return val; } },
{ text : 'Valor de la participación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1007;  return val; } },
{ text : 'Porcentaje de la participación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1008;  return val; } },
{ text : '(Financiera) Entidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1101;  return val; } },
{ text : '((Financiera) Clase o tipo de Producto', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1102;  return val; } },
{ text : '(Financiera) No. Producto', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1103;  return val; } },
{ text : '(Financiera) Sucursal', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1104;  return val; } },
{ text : '(Financiera) Ciudad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1105;  return val; } },
{ text : '(Comercial) Nombre del establecimiento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1106;  return val; } },
{ text : '(Comercial) Vínculo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1107;  return val; } },
{ text : '(Comercial) Municipio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1108;  return val; } },
{ text : '(Comercial) Departamento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1109;  return val; } },
{ text : '(Comercial) Ind. y teléfono', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1110;  return val; } },
{ text : '1. Nombres', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1111;  return val; } },
{ text : '1. Primer apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1112;  return val; } },
{ text : '1. Segundo apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1113;  return val; } },
{ text : '1. Nexo con el cliente', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1114;  return val; } },
{ text : '1. Dirección', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1115;  return val; } },
{ text : '1. Teléfono fijo (indicativo y número)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1116;  return val; } },
{ text : '1. Celular (indicativo y número)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1117;  return val; } },
{ text : '1. Otro (indicativo y número)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1118;  return val; } },
{ text : '2. Nombres', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1119;  return val; } },
{ text : '2. Primer apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1120;  return val; } },
{ text : '2. Segundo apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1121;  return val; } },
{ text : '2. Nexo con el cliente', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1122;  return val; } },
{ text : '2. Dirección', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1123;  return val; } },
{ text : '2. Teléfono fijo (indicativo y número)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1124;  return val; } },
{ text : '2. Celular (indicativo y número)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1125;  return val; } },
{ text : '2. Otro (indicativo y número)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1126;  return val; } },
{ text : 'Firme aqui', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1201;  return val; } },
{ text : 'Cargar foto', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1202;  return val; } },
{ text : 'Captura Coordenadas', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1203;  return val; } },
];

moduleConfig.grid.columnsAgrarioCredito = [
{         text      : translateinformation.list.id,         dataIndex : '_id',         width     : '10%',         align     : 'left',         hidden    : true,         sortable  : true     },
{         text      : 'Nombre',         dataIndex : 'name',         width     : '10%',         align     : 'left',         hidden    : false,         sortable  : true,     },
{         text      : 'Login',         dataIndex : 'login',         width     : '10%',         align     : 'left',         hidden    : false,         sortable  : true, 		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){ 			console.log(); 			val = Ext.isEmpty(record.data.resource)? 'N/A' : record.data.resource.login; 			 			return val; 		}     },
{         text      : 'Inicio Programado',         dataIndex : 'arrival_time',         width     : '10%',         align     : 'left',         hidden    : false,         sortable  : true, 		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){ 			 			val = Ext.isEmpty(record.data.arrival_time)? 'N/A' : record.data.arrival_time; 			 			return val; 		}     },
{         text      : 'Fin Programado',         dataIndex : 'finish_time',         width     : '10%',         align     : 'left',         hidden    : false,         sortable  : true, 		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){ 			 			val = Ext.isEmpty(record.data.finish_time)? 'N/A' : record.data.finish_time; 			 			return val; 		}     }, 	
{         text      : 'Dirección',         dataIndex : 'location_name',         width     : '10%',         align     : 'left',         hidden    : false,         sortable  : true, 		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){ 			 			val = Ext.isEmpty(record.data.location)? 'N/A' : record.data.location.name; 			 			return val; 		}     },
{ text : 'Nombres', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c101;  return val; } },
{ text : 'Primer apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c102;  return val; } },
{ text : 'Segundo apellido (o de casada)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c103;  return val; } },
{ text : 'Número de identificación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c104;  return val; } },
{ text : 'Oficina', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c105;  return val; } },
{ text : 'Regional', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c106;  return val; } },
{ text : 'Número de cliente', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c107;  return val; } },
{ text : 'Edad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c108;  return val; } },
{ text : 'Personas a cargo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c201;  return val; } },
{ text : 'No. de Hijos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c202;  return val; } },
{ text : 'Hijos estudian', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c203;  return val; } },
{ text : 'Vínculo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c204;  return val; } },
{ text : 'Tipo de Cliente', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c205;  return val; } },
{ text : 'Trámite NO', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c206;  return val; } },
{ text : 'Opcion', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c207;  return val; } },
{ text : 'Posee finca raíz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c208;  return val; } },
{ text : 'Tipo de Vivienda', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c209;  return val; } },
{ text : 'Tipo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c210;  return val; } },
{ text : 'Nombres', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c301;  return val; } },
{ text : 'Primer apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c302;  return val; } },
{ text : 'Segundo apellido (o de casada)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c303;  return val; } },
{ text : 'Tipo de Actividad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c304;  return val; } },
{ text : 'Total Ingresos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c305;  return val; } },
{ text : 'Tipo de Solicitud', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c401;  return val; } },
{ text : '(Solicitud cliente) Valor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c402;  return val; } },
{ text : '(Solicitud cliente) Plazo en meses', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c403;  return val; } },
{ text : '(Solicitud cliente) Valor en cuota', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c404;  return val; } },
{ text : '(Solicitud cliente) Día de pago:', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c405;  return val; } },
{ text : '(Propuesta asesor) Valor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c501;  return val; } },
{ text : '(Propuesta asesor) Plazo en meses', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c502;  return val; } },
{ text : '(Propuesta asesor) Valor en cuota', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c503;  return val; } },
{ text : '(Propuesta asesor) Garantía', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c504;  return val; } },
{ text : 'Microseguro', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c505;  return val; } },
{ text : 'Producto', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c506;  return val; } },
{ text : 'Valor a descontar', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c507;  return val; } },
{ text : 'Ingresos básicos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c601;  return val; } },
{ text : 'Otros ingresos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c602;  return val; } },
{ text : 'Gastos familiares', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c603;  return val; } },
{ text : 'Otros gastos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c604;  return val; } },
{ text : 'Blance Fecha Corte', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c605;  return val; } },
{ text : '(Activos) Caja y Bancos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c701;  return val; } },
{ text : '(Activos) Propiedades urbanas y rurales', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c702;  return val; } },
{ text : '(Activos) Otros Activos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c703;  return val; } },
{ text : '(Pasivos) Cuentas por pagar', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c704;  return val; } },
{ text : '(Pasivos) Obligaciones financieras', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c705;  return val; } },
{ text : '(Pasivos) Otros pasivos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c706;  return val; } },
{ text : 'Tipo de Inmueble', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c801;  return val; } },
{ text : 'Matrícula inmobiliaria', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c802;  return val; } },
{ text : 'No. Escritura / No. Documento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c803;  return val; } },
{ text : 'Ciudad / Vereda', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c804;  return val; } },
{ text : 'Hipoteca', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c805;  return val; } },
{ text : '(Hipoteca) Entidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c806;  return val; } },
{ text : '(Hipoteca) Valor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c807;  return val; } },
{ text : 'Valor comercial', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c808;  return val; } },
{ text : 'Fecha último avalúo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c809;  return val; } },
{ text : 'Dirección', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c901;  return val; } },
{ text : 'Municipio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c902;  return val; } },
{ text : 'Departamento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c903;  return val; } },
{ text : 'Vehículo - Marca', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c904;  return val; } },
{ text : 'Placa - Modelo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c905;  return val; } },
{ text : 'Prenda a favor de', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c906;  return val; } },
{ text : 'Valor de la deuda', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c907;  return val; } },
{ text : 'Valor comercial', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c908;  return val; } },
{ text : '1. Modalidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1001;  return val; } },
{ text : '1. Calificación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1002;  return val; } },
{ text : '1. Entidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1003;  return val; } },
{ text : '1. Tipo deudor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1004;  return val; } },
{ text : '1. Fecha de inicio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1005;  return val; } },
{ text : '1. Fecha de terminación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1006;  return val; } },
{ text : '1. Valor inicial', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1007;  return val; } },
{ text : '1. Saldo obligación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1008;  return val; } },
{ text : '1. Valor cuota mensual', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1009;  return val; } },
{ text : '1. Utilizado en la microempresa', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1010;  return val; } },
{ text : '2. Modalidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1101;  return val; } },
{ text : '2. Calificación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1102;  return val; } },
{ text : '2. Entidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1103;  return val; } },
{ text : '2. Tipo deudor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1104;  return val; } },
{ text : '2. Fecha de inicio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1105;  return val; } },
{ text : '2. Fecha de terminación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1106;  return val; } },
{ text : '2. Valor inicial', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1107;  return val; } },
{ text : '2. Saldo obligación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1108;  return val; } },
{ text : '2. Valor cuota mensual', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1109;  return val; } },
{ text : '2. Utilizado en la microempresa', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1110;  return val; } },
{ text : '3. Modalidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1201;  return val; } },
{ text : '3. Calificación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1202;  return val; } },
{ text : '3. Entidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1203;  return val; } },
{ text : '3. Tipo deudor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1204;  return val; } },
{ text : '3. Fecha de inicio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1205;  return val; } },
{ text : '3. Fecha de terminación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1206;  return val; } },
{ text : '3. Valor inicial', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1207;  return val; } },
{ text : '3. Saldo obligación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1208;  return val; } },
{ text : '3. Valor cuota mensual', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1209;  return val; } },
{ text : '3. Utilizado en la microempresa', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1210;  return val; } },
{ text : 'Fecha consulta', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1301;  return val; } },
{ text : 'Fecha corte', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1302;  return val; } },
{ text : 'Comportamiento financiero', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1303;  return val; } },
{ text : 'Comportamiento sector real', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1304;  return val; } },
{ text : 'Observaciones:', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1305;  return val; } },
{ text : 'Resultado precisión', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1306;  return val; } },
{ text : 'Motivo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1307;  return val; } },
{ text : 'Comportamiento de pago último microcrédito Banco Agrario, últimas 6 cuotas canceladas (en días).', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1308;  return val; } },
{ text : 'Promedio días de mora últimos seis meses (en días)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1401;  return val; } },
{ text : 'Altura máxima total de mora (en días)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1402;  return val; } },
{ text : 'No. de Cuotas pactadas', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1403;  return val; } },
{ text : 'No. de Cuotas pagadas', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1404;  return val; } },
{ text : 'No. de Cuotas pendientes por pagar', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1405;  return val; } },
{ text : '% de Tiempo transcurrido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1406;  return val; } },
{ text : 'Descripción actividad (destino financiado)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1501;  return val; } },
{ text : 'No. Empleados remunerados', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1502;  return val; } },
{ text : 'No. Empreados NO Remunerados', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1503;  return val; } },
{ text : 'Afiliado Seguro Social', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1504;  return val; } },
{ text : 'Tipo de local', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1505;  return val; } },
{ text : 'Tiempo Total en la actividad (meses)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1506;  return val; } },
{ text : 'Tiempo como Independiente en la Actividad (meses)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1507;  return val; } },
{ text : 'Tiempo total de la actividad en sitio actual (meses)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1508;  return val; } },
{ text : 'Lleva registro de compras o ventas', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1509;  return val; } },
{ text : 'Verificación: Puntualidad servicios públicos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1510;  return val; } },
{ text : 'Verificación: recibos pago cualquier préstamo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1511;  return val; } },
{ text : '1. (ACTIVOS FIJOS) Cant.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1601;  return val; } },
{ text : '1. (ACTIVOS FIJOS) Descripción', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1602;  return val; } },
{ text : '1. (ACTIVOS FIJOS) Valor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1603;  return val; } },
{ text : '2. (ACTIVOS FIJOS) Cant.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1604;  return val; } },
{ text : '2. (ACTIVOS FIJOS) Descripción', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1605;  return val; } },
{ text : '2. (ACTIVOS FIJOS) Valor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1606;  return val; } },
{ text : '3. (ACTIVOS FIJOS) Cant.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1607;  return val; } },
{ text : '3. (ACTIVOS FIJOS) Descripción', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1608;  return val; } },
{ text : '3. (ACTIVOS FIJOS) Valor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1609;  return val; } },
{ text : '1. (MERCANCÍAS) Cant', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1701;  return val; } },
{ text : '1. (MERCANCÍAS) Und. Medida', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1702;  return val; } },
{ text : '1. (MERCANCÍAS) Descripcion', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1703;  return val; } },
{ text : '1. (MERCANCÍAS) Costo unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1704;  return val; } },
{ text : '1. (MERCANCÍAS) Costo total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1705;  return val; } },
{ text : '2. (MERCANCÍAS) Cant', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1706;  return val; } },
{ text : '2. (MERCANCÍAS) Und. Medida', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1707;  return val; } },
{ text : '2. (MERCANCÍAS) Descripción', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1708;  return val; } },
{ text : '2. (MERCANCÍAS) Costo unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1709;  return val; } },
{ text : '2. (MERCANCÍAS) Costo total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1710;  return val; } },
{ text : 'Fecha corte', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1801;  return val; } },
{ text : '(ACTIVOS) Caja y Bancos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1802;  return val; } },
{ text : '(ACTIVOS) Cuentas por cobrar', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1803;  return val; } },
{ text : '(ACTIVOS) Inventarios', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1804;  return val; } },
{ text : '(ACTIVOS) Otros activos corto plazo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1805;  return val; } },
{ text : '(ACTIVOS) Terrenos y Edificios', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1806;  return val; } },
{ text : '(ACTIVOS) Maqu. y Equipo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1807;  return val; } },
{ text : '(ACTIVOS) Vehículos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1808;  return val; } },
{ text : '(ACTIVOS) Otros activos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1809;  return val; } },
{ text : '(PASIVOS) Proveedores', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1810;  return val; } },
{ text : '(PASIVOS) Cuentas por pagar', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1811;  return val; } },
{ text : '(PASIVOS) Préstamos bancarios', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1812;  return val; } },
{ text : '(PASIVOS) Préstamos Banco Agrario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1813;  return val; } },
{ text : '(PASIVOS) Obligaciones bancarias LP', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1814;  return val; } },
{ text : '(PASIVOS) PASIVOS LARGO PLAZO', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1815;  return val; } },
{ text : '(RAZONES FINANCIERAS) Capital de Trabajo - Acti. Corrie. - Pas. Corrie.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1901;  return val; } },
{ text : '(RAZONES FINANCIERAS) Rotación C x C - (Rotación C x C / Total ingresos) x 30', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1902;  return val; } },
{ text : '(RAZONES FINANCIERAS) Rotación de Inventarios - (Inventario / Costo de vtas) x 30', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1903;  return val; } },
{ text : '(RAZONES FINANCIERAS) Endeudamiento Futuro - Pasivo Total + préstamo) / Activo total x 100', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1904;  return val; } },
{ text : '1. Producto', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2001;  return val; } },
{ text : '1. Unds.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2002;  return val; } },
{ text : '1. Cant.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2003;  return val; } },
{ text : '1. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2004;  return val; } },
{ text : '1. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2005;  return val; } },
{ text : '1. Precio de venta', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2006;  return val; } },
{ text : '1. Venta total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2007;  return val; } },
{ text : '1. Utilidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2008;  return val; } },
{ text : '1. M de C', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2009;  return val; } },
{ text : '2. Producto', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2101;  return val; } },
{ text : '2. Unds.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2102;  return val; } },
{ text : '2. Cant.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2103;  return val; } },
{ text : '2. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2104;  return val; } },
{ text : '2. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2105;  return val; } },
{ text : '2. Precio de venta', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2106;  return val; } },
{ text : '2. Venta total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2107;  return val; } },
{ text : '2. Utilidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2108;  return val; } },
{ text : '2. M de C', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2109;  return val; } },
{ text : '3. Producto', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2201;  return val; } },
{ text : '3. Unds.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2202;  return val; } },
{ text : '3. Cant.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2203;  return val; } },
{ text : '3. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2204;  return val; } },
{ text : '3. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2205;  return val; } },
{ text : '3. Precio de venta', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2206;  return val; } },
{ text : '3. Venta total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2207;  return val; } },
{ text : '3. Utilidad', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2208;  return val; } },
{ text : '3. M de C', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2209;  return val; } },
{ text : 'Ventas diarias (Lunes)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2301;  return val; } },
{ text : 'Ventas diarias (Martes)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2302;  return val; } },
{ text : 'Ventas diarias (Miercoles)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2303;  return val; } },
{ text : 'Ventas diarias (Jueves)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2304;  return val; } },
{ text : 'Ventas diarias (Sabado)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2305;  return val; } },
{ text : 'Ventas diarias (Domingo)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2306;  return val; } },
{ text : 'Ventas semanales', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2307;  return val; } },
{ text : 'Ventas mes', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2308;  return val; } },
{ text : '1. Cantidad a costear', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2401;  return val; } },
{ text : '1. Producto o Servicio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2402;  return val; } },
{ text : '1. I. Insumos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2403;  return val; } },
{ text : '1. I. Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2404;  return val; } },
{ text : '1. I. Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2405;  return val; } },
{ text : '1. I. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2406;  return val; } },
{ text : '1. I. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2407;  return val; } },
{ text : '1. I. Insumos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2408;  return val; } },
{ text : '1. I. Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2409;  return val; } },
{ text : '1. II. Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2501;  return val; } },
{ text : '1. II. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2502;  return val; } },
{ text : '1. II. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2503;  return val; } },
{ text : '1. III. Insumos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2601;  return val; } },
{ text : '1. III. Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2602;  return val; } },
{ text : '1. III. Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2603;  return val; } },
{ text : '1. III. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2604;  return val; } },
{ text : '1. III. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2605;  return val; } },
{ text : '1. (MANO DE OBRA DIRECTA) Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2701;  return val; } },
{ text : '1. (MANO DE OBRA DIRECTA) Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2702;  return val; } },
{ text : '1. (MANO DE OBRA DIRECTA) Costo unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2703;  return val; } },
{ text : '1. (MANO DE OBRA DIRECTA) Costo total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2704;  return val; } },
{ text : '1. COSTO DEL PRODUCTO O SERVICIO', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2705;  return val; } },
{ text : '1. COSTO UNITARIO:', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2706;  return val; } },
{ text : '2. Cantidad a costear:', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2801;  return val; } },
{ text : '2. Producto o Servicio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2802;  return val; } },
{ text : '2. I. Insumos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2803;  return val; } },
{ text : '2. I. Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2804;  return val; } },
{ text : '2. I. Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2805;  return val; } },
{ text : '2. I. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2806;  return val; } },
{ text : '2. I. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2807;  return val; } },
{ text : '2. I. Insumos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2808;  return val; } },
{ text : '2. I. Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2809;  return val; } },
{ text : '2. II. Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2901;  return val; } },
{ text : '2. II. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2902;  return val; } },
{ text : '2. II. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c2903;  return val; } },
{ text : '2. III. Insumos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3001;  return val; } },
{ text : '2. III. Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3002;  return val; } },
{ text : '2. III. Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3003;  return val; } },
{ text : '2. III. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3004;  return val; } },
{ text : '2. III. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3005;  return val; } },
{ text : '2. (MANO DE OBRA DIRECTA) Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3101;  return val; } },
{ text : '2. (MANO DE OBRA DIRECTA) Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3102;  return val; } },
{ text : '2. (MANO DE OBRA DIRECTA) Costo unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3103;  return val; } },
{ text : '2. (MANO DE OBRA DIRECTA) Costo total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3104;  return val; } },
{ text : '2. COSTO DEL PRODUCTO O SERVICIO', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3105;  return val; } },
{ text : '2. COSTO UNITARIO:', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3106;  return val; } },
{ text : '3. Cantidad a costear:', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3201;  return val; } },
{ text : '3. Producto o Servicio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3202;  return val; } },
{ text : '3. I. Insumos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3203;  return val; } },
{ text : '3. I. Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3204;  return val; } },
{ text : '3. I. Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3205;  return val; } },
{ text : '3. I. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3206;  return val; } },
{ text : '3. I. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3207;  return val; } },
{ text : '3. I. Insumos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3208;  return val; } },
{ text : '3. I. Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3209;  return val; } },
{ text : '3. II. Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3301;  return val; } },
{ text : '3. II. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3302;  return val; } },
{ text : '3. II. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3303;  return val; } },
{ text : '3. III. Insumos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3404;  return val; } },
{ text : '3. III. Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3405;  return val; } },
{ text : '3. III. Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3406;  return val; } },
{ text : '3. III. Costo Unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3407;  return val; } },
{ text : '3. III. Costo Total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3408;  return val; } },
{ text : '3. (MANO DE OBRA DIRECTA) Und. Med.', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3501;  return val; } },
{ text : '3. (MANO DE OBRA DIRECTA) Cant. Utilz', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3502;  return val; } },
{ text : '3. (MANO DE OBRA DIRECTA) Costo unitario', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3503;  return val; } },
{ text : '3. (MANO DE OBRA DIRECTA) Costo total', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3504;  return val; } },
{ text : '3. COSTO DEL PRODUCTO O SERVICIO', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3505;  return val; } },
{ text : '3. COSTO UNITARIO:', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3506;  return val; } },
{ text : '1. (COMPRAS MENSUALES) Proveedor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3601;  return val; } },
{ text : '1. (COMPRAS MENSUALES) Frecuencia', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3602;  return val; } },
{ text : '1. (COMPRAS MENSUALES) Valor compra', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3603;  return val; } },
{ text : '1. (COMPRAS MENSUALES) Total mes', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3604;  return val; } },
{ text : '2. (COMPRAS MENSUALES) Proveedor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3605;  return val; } },
{ text : '2. (COMPRAS MENSUALES) Frecuencia', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3606;  return val; } },
{ text : '2. (COMPRAS MENSUALES) Valor compra', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3607;  return val; } },
{ text : '2. (COMPRAS MENSUALES) Total mes', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3608;  return val; } },
{ text : '3. (COMPRAS MENSUALES) Proveedor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3609;  return val; } },
{ text : '3. (COMPRAS MENSUALES) Frecuencia', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3610;  return val; } },
{ text : '3. (COMPRAS MENSUALES) Valor compra', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3611;  return val; } },
{ text : '3. (COMPRAS MENSUALES) Total mes', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3612;  return val; } },
{ text : '(GASTOS MENSUALES DEL NEGOCIO) Sueldos y Prestaciones', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3701;  return val; } },
{ text : '(GASTOS MENSUALES DEL NEGOCIO)  Arriendos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3702;  return val; } },
{ text : '(GASTOS MENSUALES DEL NEGOCIO)  Servicios', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3703;  return val; } },
{ text : '(GASTOS MENSUALES DEL NEGOCIO)  Transporte', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3704;  return val; } },
{ text : '(GASTOS MENSUALES DEL NEGOCIO)  Cuota crédito', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3705;  return val; } },
{ text : '(GASTOS MENSUALES DEL NEGOCIO)  Impuestos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3706;  return val; } },
{ text : '(GASTOS MENSUALES FAMILIARES) Alimentación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3707;  return val; } },
{ text : '(GASTOS MENSUALES FAMILIARES) Arriendos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3708;  return val; } },
{ text : '(GASTOS MENSUALES FAMILIARES) Servicios', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3709;  return val; } },
{ text : '(GASTOS MENSUALES FAMILIARES) Transporte', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3710;  return val; } },
{ text : '(GASTOS MENSUALES FAMILIARES) Educación', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3711;  return val; } },
{ text : '(GASTOS MENSUALES FAMILIARES) Salud', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3712;  return val; } },
{ text : '(MICROEMPRESA) Ventas de contado', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3801;  return val; } },
{ text : '(MICROEMPRESA) Ventas a crédito', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3802;  return val; } },
{ text : '(MICROEMPRESA) TOTAL INGRESOS', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3803;  return val; } },
{ text : '(MICROEMPRESA) Costo de ventas', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3804;  return val; } },
{ text : '(MICROEMPRESA) Gastos generales del negocio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3805;  return val; } },
{ text : '(MICROEMPRESA) TOTAL DE EGRESOS', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3806;  return val; } },
{ text : '(MICROEMPRESA) (A) UTILIDAD OPERACIONAL ', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3807;  return val; } },
{ text : '(MICROEMPRESA) (A + B - C) DISPONIBLE', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3808;  return val; } },
{ text : '(INGRESOS Y EGRESOS FUERA MICROEMPRESA) Pensiones y Salarios', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3901;  return val; } },
{ text : '(INGRESOS Y EGRESOS FUERA MICROEMPRESA) Arriendos', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3902;  return val; } },
{ text : '(INGRESOS Y EGRESOS FUERA MICROEMPRESA) Otros', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3903;  return val; } },
{ text : '(INGRESOS Y EGRESOS FUERA MICROEMPRESA) (B) TOTAL OTROS INGRESOS', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3904;  return val; } },
{ text : '(INGRESOS Y EGRESOS FUERA MICROEMPRESA) Gastos familiares', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3905;  return val; } },
{ text : '(INGRESOS Y EGRESOS FUERA MICROEMPRESA) Cuotas de crédito flia', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3906;  return val; } },
{ text : '(INGRESOS Y EGRESOS FUERA MICROEMPRESA) (C) TOTAL DE EGRESOS', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3907;  return val; } },
{ text : '(INGRESOS Y EGRESOS FUERA MICROEMPRESA) CAPACIDAD DE PAGO COMO SOLICITANTE', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3908;  return val; } },
{ text : 'Fecha visita', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4001;  return val; } },
{ text : 'Justificacion', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4002;  return val; } },
{ text : 'Nombre de quien ingresa la información', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4003;  return val; } },
{ text : 'Nombre', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4004;  return val; } },
{ text : 'Firma del Asesor', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4005;  return val; } },
{ text : 'Código del asesor:', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4006;  return val; } },
{ text : '(PERSONALES) Nombres', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4101;  return val; } },
{ text : '(PERSONALES) Primer apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4102;  return val; } },
{ text : '(PERSONALES) Segundo apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4103;  return val; } },
{ text : '(PERSONALES) Nexo con el cliente', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4104;  return val; } },
{ text : '(PERSONALES) Dirección residencia', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4105;  return val; } },
{ text : '(PERSONALES) Municipio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4106;  return val; } },
{ text : '(PERSONALES) Barrio / Vereda', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4107;  return val; } },
{ text : '(PERSONALES) Departamento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4108;  return val; } },
{ text : '(PERSONALES) Indicativo y No. telefónico de residencia', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4109;  return val; } },
{ text : '(PERSONALES) Indicativo y No. Telefónico Laboral', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4110;  return val; } },
{ text : '(PERSONALES) Celular (prefijo y número)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4111;  return val; } },
{ text : '(FAMILIARES) Nombres', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4201;  return val; } },
{ text : '(FAMILIARES) Primer apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4202;  return val; } },
{ text : '(FAMILIARES) Segundo apellido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4203;  return val; } },
{ text : '(FAMILIARES) Nexo con el cliente', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4204;  return val; } },
{ text : '(FAMILIARES) Dirección residencia', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4205;  return val; } },
{ text : '(FAMILIARES) Municipio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4206;  return val; } },
{ text : '(FAMILIARES) Barrio / Vereda', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4207;  return val; } },
{ text : '(FAMILIARES) Departamento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4208;  return val; } },
{ text : '(FAMILIARES) Indicativo y No. telefónico de residencia', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4209;  return val; } },
{ text : '(FAMILIARES) Indicativo y No. Telefónico Laboral', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4210;  return val; } },
{ text : '(PERSONALES) Celular (prefijo y número)', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4112;  return val; } },
{ text : '1.(PROVEEDORES) Nombre del establecimiento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4301;  return val; } },
{ text : '1.(PROVEEDORES) Vínculo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4302;  return val; } },
{ text : '1.(PROVEEDORES) Municipio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4303;  return val; } },
{ text : '1.(PROVEEDORES) Departamento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4304;  return val; } },
{ text : '1.(PROVEEDORES) Ind. y teléfono', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4305;  return val; } },
{ text : '2.(PROVEEDORES) Nombre del establecimiento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4306;  return val; } },
{ text : '2.(PROVEEDORES) Vínculo', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4307;  return val; } },
{ text : '2.(PROVEEDORES) Municipio', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4308;  return val; } },
{ text : '2.(PROVEEDORES) Departamento', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4309;  return val; } },
{ text : '2.(PROVEEDORES) Ind. y teléfono', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4310;  return val; } },
{ text : ' Autorización Cobro de Comisión MIPYME y FNG', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4401;  return val; } },
{ text : 'Certificacion', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4402;  return val; } },
{ text : 'Autorizacion debido', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4403;  return val; } },
{ text : 'Tipo de Cuenta', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4404;  return val; } },
{ text : 'Numero', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4405;  return val; } },
{ text : 'Firma', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4506;  return val; } },
{ text : 'Foto', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4507;  return val; } },
{ text : 'Captura coordenadas', dataIndex : 'country', width : '10%', align : 'left', hidden    : false, sortable  : true, renderer  : function(value, metaData, record, rowIndex,colIndex, store, view){  var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c4508;  return val; } },
];


moduleConfig.grid.columnsDistriCarga = [
    {
        text      : translateinformation.list.id,
        dataIndex : '_id',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true
    },
    {
        text      : 'Nombre',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
    },
	{
        text      : 'Login',
        dataIndex : 'login',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.resource)? 'N/A' : record.data.resource.login;
			
			return val;
		}
    },
	{
        text      : 'Inicio Programado',
        dataIndex : 'arrival_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.arrival_time)? 'N/A' : record.data.arrival_time;
			
			return val;
		}
    },
	{
        text      : 'Fin Programado',
        dataIndex : 'finish_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.finish_time)? 'N/A' : record.data.finish_time;
			
			return val;
		}
    },
	{
        text      : 'Dirección',
        dataIndex : 'location_name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.location)? 'N/A' : record.data.location.name;
			
			return val;
		}
    },
    {
        text      : 'Login',
        dataIndex : 'login',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1101;
			return val;
		}
    },
    {
        text      : 'Nombres',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1102;
			return val;
		}
    },
    {
        text      : 'Apellidos',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1103;
			return val;
		}
    },
    {
        text      : 'Documento',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1104;
			return val;
		}
    },
    {
        text      : 'Fecha de Ingreso',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1105;
			return val;
		}
    },
	{
        text      : 'Fecha checkin',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c21;
			return val;
		}
    },
    {
        text      : 'Latitude checkin',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c22;
			return val;
		}
    },
    {
        text      : 'Longitude checkin',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c23;
			return val;
		}
    },
    {
        text      : 'Fecha checkout',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c24;
			return val;
		}
    },
    {
        text      : 'Latitude checkout',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c25;
			return val;
		}
    },
    {
        text      : 'Longitude checkout',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c26;
			return val;
		}
    },
    {
        text      : 'Razon checkout sin formulario',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c27;
			return val;
		}
    },
    {
        text      : 'Inventario cargado',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1201_web;
			return val;
		}
    },
];

moduleConfig.grid.columnsDistriEntrega = [
    {
        text      : translateinformation.list.id,
        dataIndex : '_id',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true
    },
    {
        text      : 'Nombre',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
    },
	{
        text      : 'Login',
        dataIndex : 'login',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.resource)? 'N/A' : record.data.resource.login;
			
			return val;
		}
    },
	{
        text      : 'Inicio Programado',
        dataIndex : 'arrival_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.arrival_time)? 'N/A' : record.data.arrival_time;
			
			return val;
		}
    },
	{
        text      : 'Fin Programado',
        dataIndex : 'finish_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.finish_time)? 'N/A' : record.data.finish_time;
			
			return val;
		}
    },
	{
        text      : 'Dirección',
        dataIndex : 'location_name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.location)? 'N/A' : record.data.location.name;
			
			return val;
		}
    },
    {
        text      : 'Nombre Comercial',
        dataIndex : 'login',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c101;
			return val;
		}
    },
    {
        text      : 'RFC',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c102;
			return val;
		}
    },
    {
        text      : 'Direccion',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c103;
			return val;
		}
    },
    {
        text      : 'Codigo Postal',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c104;
			return val;
		}
    },
    {
        text      : 'Estado',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c105;
			return val;
		}
    },
	{
        text      : 'Delegacion',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c106;
			return val;
		}
    },
    {
        text      : 'Captura Coordenadas',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c107;
			return val;
		}
    },
    {
        text      : 'Fecha de Ingreso',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c108;
			return val;
		}
    },
    {
        text      : 'Fecha checkin',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c21;
			return val;
		}
    },
    {
        text      : 'Latitude checkin',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c22;
			return val;
		}
    },
    {
        text      : 'Longitude checkin',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c23;
			return val;
		}
    },
    {
        text      : 'Fecha checkout',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c24;
			return val;
		}
    },
    {
        text      : 'Latitude checkout',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c25;
			return val;
		}
    },
    {
        text      : 'Longitude checkout',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c26;
			return val;
		}
    },
    {
        text      : 'Razon checkout sin formulario',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c27;
			return val;
		}
    },
    {
        text      : 'Inventario cargado',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c1201_web;
			return val;
		}
    },
    {
        text      : 'Folio',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c204;
			return val;
		}
    },
    {
        text      : 'Contacto',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c205;
			return val;
		}
    },
    {
        text      : 'Telefono',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c206;
			return val;
		}
    },
    {
        text      : 'Movil',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c207;
			return val;
		}
    },
    {
        text      : 'Firma',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c208;
			return val;
		}
    },
];

moduleConfig.grid.columnsDistriDevolucion = [
    {
        text      : translateinformation.list.id,
        dataIndex : '_id',
        width     : '10%',
        align     : 'left',
        hidden    : true,
        sortable  : true
    },
    {
        text      : 'Nombre',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
    },
	{
        text      : 'Login',
        dataIndex : 'login',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.resource)? 'N/A' : record.data.resource.login;
			
			return val;
		}
    },
	{
        text      : 'Inicio Programado',
        dataIndex : 'arrival_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.arrival_time)? 'N/A' : record.data.arrival_time;
			
			return val;
		}
    },
	{
        text      : 'Fin Programado',
        dataIndex : 'finish_time',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.finish_time)? 'N/A' : record.data.finish_time;
			
			return val;
		}
    },
	{
        text      : 'Dirección',
        dataIndex : 'location_name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view){
			
			var val = Ext.isEmpty(record.data.location)? 'N/A' : record.data.location.name;
			
			return val;
		}
    },
    {
        text      : 'Nombre Comercial',
        dataIndex : 'login',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
		renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
			var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3101;
			return val;
		}
    },
    {
        text      : 'RFC',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3102;
			return val;
		}
    },
    {
        text      : 'Direccion',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3103;
			return val;
		}
    },
    {
        text      : 'Codigo Postal',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3104;
			return val;
		}
    },
    {
        text      : 'Estado',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3105;
			return val;
		}
    },
	{
        text      : 'Delegacion',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3106;
			return val;
		}
    },
    {
        text      : 'Captura Coordenadas',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3107;
			return val;
		}
    },
    {
        text      : 'Fecha de Ingreso',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3108;
			return val;
		}
    },
    {
        text      : 'Fecha checkin',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c21;
			return val;
		}
    },
    {
        text      : 'Latitude checkin',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c22;
			return val;
		}
    },
    {
        text      : 'Longitude checkin',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c23;
			return val;
		}
    },
    {
        text      : 'Fecha checkout',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c24;
			return val;
		}
    },
    {
        text      : 'Latitude checkout',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c25;
			return val;
		}
    },
    {
        text      : 'Longitude checkout',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c26;
			return val;
		}
    },
    {
        text      : 'Razon checkout sin formulario',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c27;
			return val;
		}
    },
    {
        text      : 'Inventario devuelto',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3201_web;
			return val;
		}
    },
    {
        text      : 'Folio',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3204;
			return val;
		}
    },
    {
        text      : 'Contacto',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3205;
			return val;
		}
    },
    {
        text      : 'Telefono',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3206;
			return val;
		}
    },
    {
        text      : 'Movil',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3207;
			return val;
		}
    },
    {
        text      : 'Firma',
        dataIndex : 'name',
        width     : '10%',
        align     : 'left',
        hidden    : false,
        sortable  : true,
        renderer  : function(value, metaData, record, rowIndex, colIndex, store, view)
        {
            var val = Ext.isEmpty(record.data.register)? 'N/A' : record.data.register.dataWeb.c3208;
			return val;
		}
    },
];
//-----------------------------------------------------------------------
// Ventana con Formulario Embebido de Crear/Editar Empresas (windowForm)
//-----------------------------------------------------------------------
moduleConfig.groupIdCompanies = controller + 'Module';
moduleConfig.titleWindowCompanies = translate.global.create+' '+translateinformation.moduleTitle;
moduleConfig.widthWindowCompanies = '80%';
moduleConfig.heightWindowCompanies = '80%';
moduleConfig.resizableWindowCompanies = false;
moduleConfig.toolbarCompanies = [];
moduleConfig.itemsFormCompanies = [
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
        xtype       : 'fieldset',
        title       : translateinformation.form.fieldSetCompany,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.nit,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormNit',
                    name              : 'nit',
                    emptyText         : translateinformation.form.nit.emptyText,
                    allowBlank        : false,
                    flex              : 1,
                    margin            : '10 10 10 10',
                    vtype             : 'numeric',
                    minLengthText     : translateinformation.form.nit.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.name,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormName',
                    name              : 'name',
                    emptyText         : translateinformation.form.name.emptyText,
                    allowBlank        : false,
                    flex              : 3,
                    margin            : '10 10 10 10',
                    //vtype             : 'alphanumeric',
                    minLengthText     : translateinformation.form.name.nameError
                }
            ]
        }
        ,
        {
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.phone,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPhone',
                    name              : 'phone',
                    emptyText         : translateinformation.form.phone.emptyText,
                    allowBlank        : false,
                    flex              : 1,
                    margin            : '10 10 10 10',
                    vtype             : 'numeric',
                    minLengthText     : translateinformation.form.phone.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.address,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormAddress',
                    name              : 'address',
                    emptyText         : translateinformation.form.address.emptyText,
                    allowBlank        : false,
                    flex              : 3,
                    margin            : '10 10 10 10',
                    vtype             : 'specialchars',
                    minLengthText     : translateinformation.form.address.nameError
                }
            ]
        }
        ,
        {
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'combo',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'combobox',
                    fieldLabel        : translateinformation.form.country,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormCountry',
                    name              : 'country',
                    emptyText         : translateinformation.form.country.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    typeAhead         : false,
                    forceSelection    : true,
                    displayField      : 'country',
                    valueField        : '_id',
                    minChars          : 0,
                    pageSize          : 10,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    editable          : false,
                    store             : Ext.create('Ext.data.Store', {
                    fields            : ['_id', 'country'],
                    data              : [
                        {"_id" : "Colombia",   "country" : "Colombia"},
                        {"_id" : "Venezuela", "country" : "Venezuela"}
                    ]
                    }),
                    queryMode    : 'local'
                }
                ,
                {
                    xtype             : 'combobox',
                    fieldLabel        : translateinformation.form.city,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormCity',
                    name              : 'city',
                    emptyText         : translateinformation.form.city.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    typeAhead         : false,
                    forceSelection    : true,
                    displayField      : 'city',
                    valueField        : '_id',
                    minChars          : 0,
                    pageSize          : 10,
                    labelWidth        : '100%',
                    triggerAction     : 'all',
                    editable          : false,
                    store             : Ext.create('Ext.data.Store', {
                        fields         : ['_id', 'city'],
                        data           : [
                            {"_id" : "Bogota",   "city" : "Bogotá"},
                            {"_id" : "Caracas", "city" : "Caracas"}
                        ]
                    }),
                    queryMode    : 'local'
                }
            ]
        }
        ]
    }
    ,
    {
        xtype       : 'fieldset',
        title       : translateinformation.form.fieldSetAgent,
        defaultType : 'textfield',
        layout      : 'anchor',
        defaults    : {
            anchor  : '100%'
        },
        items: [{
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.personName,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonName',
                    name              : 'person_name',
                    emptyText         : translateinformation.form.personName.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    vtype             : 'alphabetic',
                    minLengthText     : translateinformation.form.personName.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.personLastname,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonLastname',
                    name              : 'person_lastname',
                    emptyText         : translateinformation.form.personLastname.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    vtype             : 'alphabetic',
                    minLengthText     : translateinformation.form.personLastname.nameError
                }
            ]
        }
        ,
        {
            xtype       : 'container',
            layout      : 'hbox',
            defaultType : 'textfield',
            margin      : '5 5 5 5',
            items       : [
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.personDocument,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonDocument',
                    name              : 'person_document',
                    emptyText         : translateinformation.form.personDocument.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    vtype             : 'alphanumeric',
                    minLengthText     : translateinformation.form.personDocument.nameError
                }
                ,
                {
                    xtype             : 'textfield',
                    fieldLabel        : translateinformation.form.personPhone,
                    afterLabelTextTpl : AppGlobals.required,
                    id                : controller + 'FormPersonPhone',
                    name              : 'person_phone',
                    emptyText         : translateinformation.form.personPhone.emptyText,
                    allowBlank        : false,
                    flex              : 2,
                    margin            : '10 10 10 10',
                    vtype             : 'numeric',
                    minLengthText     : translateinformation.form.personPhone.nameError
                }
            ]
        }
        ]
    }
];
moduleConfig.bottomButtonsCompanies = [
    {
        text      : translate.global.cancel,
        iconCls   : 'cancel-button',
        id        : controller + 'WindowsCancelButton',
        action    : controller + 'WindowsCancelButton'
    },
    {
        text      : translate.global.save,
        iconCls   : 'ok-button',
        id        : controller + 'WindowsSaveButton',
        action    : controller + 'WindowsSaveButton',
        scope     : this,
        formBind  : true
    } 
];