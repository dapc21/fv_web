/**
 * 
 * @cfg moduleConfig
 * @type Object moduleConfig
 * Contains the general configuration of the module, service urls grid,map,forms configuration and field, etc
 */
var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'grid';
moduleConfig.lateralPanel = 'right';
moduleConfig.serviceUrl = 'temptable.php';
moduleConfig.serviceUploadImage = 'files/upload';
moduleConfig.serviceUploadPath = 'resource/station/';
moduleConfig.serviceStationStatusList = controller.toLowerCase() + 'status@index';
moduleConfig.serviceStationList = controller.toLowerCase() + '@index';
moduleConfig.serviceTransformerType = 'transftype@index';
moduleConfig.serviceZoneList = 'stationzone@index';
moduleConfig.serviceUpdate = controller.toLowerCase() + '@update';
moduleConfig.serviceUpdateSchedule = 'schedulestation@update';
moduleConfig.serviceStore = controller.toLowerCase() + '@store';
moduleConfig.serviceStoreSchedule = 'schedulestation@store';
moduleConfig.serviceDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.serviceDestroySchedule = 'schedulestation@destroy';
moduleConfig.serviceExport = controller.toLowerCase() + '@excel';
moduleConfig.exportFilter = '';
moduleConfig.tmpId = 0;
moduleConfig.formTpl = '';

moduleConfig.services = new Object();
moduleConfig.services.url = 'temptable.php';
moduleConfig.services.urlCombo = 'columnas.php';
moduleConfig.services.mapList = controller.toLowerCase() + '@index';
moduleConfig.services.auditUpdate = controller.toLowerCase() + '@update';
moduleConfig.services.auditStore = controller.toLowerCase() + '@store';
moduleConfig.services.auditDestroy = controller.toLowerCase() + '@destroy';
moduleConfig.services.export = controller.toLowerCase() + '@excel';

moduleConfig.grid = new Object();
moduleConfig.grid.title = 'Estaciones';
moduleConfig.grid.searchField = true;
moduleConfig.grid.searchTitle = 'Búsqueda';
moduleConfig.grid.searchId = 'listSearchKeyword';
moduleConfig.grid.pageSize = 15;
moduleConfig.grid.topButtons = [];
moduleConfig.grid.contextualMenu = [];
moduleConfig.grid.tooltip = true;
moduleConfig.grid.tooltipField = 'name';
moduleConfig.grid.checkboxIndex = 0;
moduleConfig.grid.idField = 'id_station',
moduleConfig.grid.columns = [
    {
        text: 'Nombre',
        dataIndex: 'name',
        width: '20%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Direcci\xf3n Ip',
        dataIndex: 'ip_address',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Direcci\xf3n Ip respaldo',
        dataIndex: 'ip_address_backup',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Estado',
        dataIndex: 'stationstatus.status',
        width: '10%',
        align: 'left',
        sortable: false
    },
    {
        text: 'Im\xe1gen',
        dataIndex: 'image',
        width: '10%',
        align: 'center',
        sortable: false
    },
    {
        text: 'Transformador',
        dataIndex: 'transftype.name',
        width: '10%',
        align: 'left',
        sortable: false
    },
    {
        text: 'Direcci\xf3n',
        dataIndex: 'address',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Barrio',
        dataIndex: 'neighbourhood',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Localidad',
        dataIndex: 'district',
        width: '10%',
        align: 'left',
        sortable: true
    },
    {
        text: 'Zona',
        dataIndex: 'stationzone.zone',
        width: '10%',
        align: 'left',
        sortable: false
    },
    {
        text: 'Raz\xf3n social',
        dataIndex: 'business_name_owner',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Representante legal',
        dataIndex: 'name_owner',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Contacto',
        dataIndex: 'name_contact',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Identificaci\xf3n',
        dataIndex: 'rut_owner',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'NIT',
        dataIndex: 'nit_owner',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Tel\xe9fono contacto',
        dataIndex: 'telephone_contact',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Celular contacto',
        dataIndex: 'celular_contact',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Email contacto',
        dataIndex: 'email_contact',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Nombre',
        dataIndex: 'name_administrator',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Apellidos',
        dataIndex: 'last_name_administrator',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Tel\xe9fono administrador',
        dataIndex: 'telephone_administrator',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Celular administrador',
        dataIndex: 'celular_administrator',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Email administrador',
        dataIndex: 'email_administrator',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Nombre',
        dataIndex: 'name_responsible',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Apellidos',
        dataIndex: 'last_name_responsible',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Tel\xe9fono codensa',
        dataIndex: 'telephone_responsible',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Celular codensa',
        dataIndex: 'celular_responsible',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    },
    {
        text: 'Email codensa',
        dataIndex: 'email_responsible',
        width: '15%',
        align: 'left',
        hidden: true,
        sortable: true
    }
];
moduleConfig.filterForm = new Object();
moduleConfig.filterTitle = translate.station.filterTitle,
moduleConfig.filterForm = [
    {
        xtype: 'container',
        flex: 1,
        layout: 'column',
        items: [
            {
                xtype: 'combo',
                fieldLabel: 'Estado',
                id: controller + 'FilterStatus',
                loadingText: 'Buscando...',
                emptyText: 'Selecciona estado',
                typeAhead: false,
                forceSelection: true,
                columnWidth: 0.99,
                displayField: 'status',
                valueField: 'id_station_status',
                minChars: 0,
                width: '99%',
                labelWidth: '50%',
//                store: 'Station.StatusList'
            },
            {
                xtype: 'button',
                iconCls: 'cancel-button',
                tooltip: 'Elimina el filtro por estado',
                fieldName: controller + 'FilterStatus',
                margin: '20 6 6 3',
                cls: 'x-btn-default-small',
                action: 'clearFilter'
            }
        ]
    },
    {
        xtype: 'container',
        flex: 1,
        layout: 'column',
        items: [
            {
                xtype: 'combo',
                fieldLabel: 'Tipo transformador',
                id: controller + 'FilterTransformator',
                loadingText: 'Buscando...',
                emptyText: 'Selecciona tipo de transformador',
                typeAhead: false,
                forceSelection: true,
                columnWidth: 0.99,
                displayField: 'name',
                valueField: 'id_transformator_type',
                width: '99%',
                labelWidth: '50%',
                pageSize: 10,
                matchFieldWidth: false,
                listConfig: {
                    width: 330
                },
//                store: 'Station.TransformerType'
            },
            {
                xtype: 'button',
                iconCls: 'cancel-button',
                tooltip: 'Elimina el filtro por tipo de transformador',
                margin: '20 6 6 3',
                fieldName: controller + 'FilterTransformator',
                cls: 'x-btn-default-small',
                action: 'clearFilter'
            }
        ]
    },
    {
        xtype: 'container',
        flex: 1,
        layout: 'column',
        items: [
            {
                xtype: 'combo',
                fieldLabel: 'Zona',
                id: controller + 'FilterZone',
                loadingText: 'Buscando...',
                emptyText: 'Selecciona zona',
                typeAhead: false,
                forceSelection: true,
                columnWidth: 0.99,
                displayField: 'zone',
                valueField: 'id_station_zone',
                width: '99%',
                labelWidth: '50%',
                pageSize: 10,
                matchFieldWidth: false,
                listConfig: {
                    width: 330
                },
//                store: 'Config.ListZone'
            },
            {
                xtype: 'button',
                iconCls: 'cancel-button',
                tooltip: 'Elimina el filtro por zona',
                fieldName: controller + 'FilterZone',
                margin: '20 6 6 3',
                cls: 'x-btn-default-small',
                action: 'clearFilter'
            }
        ]
    },
    {
        xtype: 'container',
        flex: 1,
        layout: 'column',
        items: [
            {
                xtype: 'combo',
                fieldLabel: 'Tipo de propietario',
                id: controller + 'FilterOwnerType',
                loadingText: 'Buscando...',
                emptyText: 'Selecciona tipo de propietario',
                typeAhead: false,
                forceSelection: true,
                displayField: 'type',
                valueField: 'id',
                columnWidth: 0.99,
                minChars: 0,
                width: '99%',
                labelWidth: '50%',
//                store: 'General.ClientType'
            },
            {
                xtype: 'button',
                iconCls: 'cancel-button',
                tooltip: 'Elimina el filtro por tipo de propietario',
                fieldName: controller + 'FilterOwnerType',
                margin: '20 6 6 3',
                cls: 'x-btn-default-small',
                action: 'clearFilter'
            }
        ]
    },
    {
        xtype: 'container',
        flex: 1,
        layout: 'column',
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Representante legal - Raz\xf3n social',
                id: controller + 'FilterLegal',
                emptyText: 'Representante o raz\xf3n social',
                columnWidth: 0.99,
                enableKeyEvents: true,
                allowBlank: true,
                width: '60%'
            },
            {
                xtype: 'button',
                iconCls: 'cancel-button',
                tooltip: 'Elimina el filtro por representante legal o raz\xf3n social',
                fieldName: controller + 'FilterLegal',
                margin: '20 6 6 3',
                cls: 'x-btn-default-small',
                action: 'clearFilter'
            }
        ]
    },
    {
        xtype: 'container',
        flex: 1,
        layout: 'column',
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'NIT - Documento',
                id: controller + 'FilterIdentification',
                emptyText: 'Nit o documento de identidad',
                columnWidth: 0.99,
                enableKeyEvents: true,
                allowBlank: true,
                vtype: 'numeric',
                width: '60%'
            },
            {
                xtype: 'button',
                iconCls: 'cancel-button',
                tooltip: 'Elimina el filtro por nit o documento',
                fieldName: controller + 'FilterIdentification',
                margin: '20 6 6 3',
                cls: 'x-btn-default-small',
                action: 'clearFilter'
            }
        ]
    },
    {
        xtype: 'container',
        flex: 1,
        layout: 'column',
        items: [
            {
                xtype: 'textfield',
                fieldLabel: 'Correos asociados',
                id: controller + 'FilterMail',
                emptyText: 'Correos electr\xf3nicos asociados',
                columnWidth: 0.99,
                enableKeyEvents: true,
                allowBlank: true,
                width: '60%'
            },
            {
                xtype: 'button',
                iconCls: 'cancel-button',
                tooltip: 'Elimina el filtro por correos',
                fieldName: controller + 'FilterMail',
                margin: '20 6 6 3',
                cls: 'x-btn-default-small',
                action: 'clearFilter'
            }
        ]
    },
    {
        xtype: 'container',
        flex: 1,
        layout: 'column',
        items: [
            {
                xtype: 'checkboxgroup',
                fieldLabel: 'D\xedas de funcionamiento',
                name: controller + 'FilterDays',
                id: controller + 'FilterDays',
                columns: 2,
                columnWidth: 0.99,
                width: '99%',
                vertical: true,
                items: [
                    {boxLabel: 'Lun-Vie', name: 'FormView', inputValue: '1'},
                    {boxLabel: 'Sab', name: 'FormView', inputValue: '2'},
                    {boxLabel: 'Dom', name: 'FormView', inputValue: '3'},
                    {boxLabel: 'Fest', name: 'FormView', inputValue: '4'},
                ]

            }
        ]
    },
    {
        xtype: 'container',
        flex: 1,
        layout: 'column',
        items: [
            {
                xtype: 'timefield',
                fieldLabel: 'Horario',
                name: controller + 'FilterTime',
                id: controller + 'FilterTime',
                emptyText: 'Hora de funcionamimento',
                columnWidth: 0.99,
                minValue: '3:00 AM',
                maxValue: '11:00 PM',
                format: 'H:i',
                increment: 30,
                width: '33%'
            },
            {
                xtype: 'button',
                iconCls: 'cancel-button',
                tooltip: 'Elimina el filtro por horario',
                fieldName: controller + 'FilterTime',
                margin: '20 6 6 3',
                cls: 'x-btn-default-small',
                action: 'clearFilter'
            }
        ]
    }
]
moduleConfig.form = new Object();
moduleConfig.formTitle = 'Estaci\xf3n'
moduleConfig.formBase = [];
moduleConfig.form = [
    {
        xtype: 'hiddenfield',
        name: controller + 'FormId',
        id: controller + 'FormId',
        value: '0'
    },
    {
        xtype: 'hiddenfield',
        name: controller + 'FormImageName',
        id: controller + 'FormImageName',
        value: 'endesa_logo.jpg'
    },
    {
        xtype: 'container',
        layout: 'column',
        items: [
            {
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                columnWidth: 0.70,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Nombre de la estaci\xf3n',
                        afterLabelTextTpl: AppGlobals.required,
                        name: controller + 'FormName',
                        id: controller + 'FormName',
                        emptyText: 'Nombre de la estaci\xf3n',
                        allowBlank: false,
                        width: 400,
                        minLength: 3,
                        vtype: 'alphanumeric',
                        minLengthText: 'El campo nombre estaci\xf3n debe contener 3 caracteres como m\xednimo.'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Direcci\xf3n',
                        name: controller + 'FormAddress',
                        id: controller + 'FormAddress',
                        emptyText: 'Direcci\xf3n',
                        afterLabelTextTpl: AppGlobals.required,
                        allowBlank: false,
                        width: 400,
                        minLength: 3,
                        vtype: 'specialchars',
                        minLengthText: 'El campo direcci\xf3n debe contener 3 caracteres como m\xednimo.'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Direcci\xf3n IP',
                        afterLabelTextTpl: AppGlobals.required,
                        name: controller + 'FormIp',
                        id: controller + 'FormIp',
                        emptyText: 'Direcci\xf3n IP',
                        allowBlank: false,
                        hidden: false,
                        minLength: 8,
                        vtype: 'ip',
                        minLengthText: 'El campo ip debe contener 8 caracteres como m\xednimo.',
                        width: 400
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Direcci\xf3n IP respaldo',
                        afterLabelTextTpl: AppGlobals.required,
                        name: controller + 'FormIp2',
                        id: controller + 'FormIp2',
                        emptyText: 'Direcci\xf3n IP respaldo',
                        allowBlank: false,
                        hidden: false,
                        minLength: 8,
                        vtype: 'ip',
                        minLengthText: 'El campo ip debe contener 8 caracteres como m\xednimo.',
                        width: 400
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Zona',
                        afterLabelTextTpl: AppGlobals.required,
                        id: controller + 'FormZone',
                        loadingText: 'Buscando...',
                        emptyText: 'Selecciona la zona',
                        typeAhead: false,
                        forceSelection: true,
                        pageSize: 15,
                        displayField: 'zone',
                        valueField: 'id_station_zone',
                        allowBlank: false,
                        minChars: 0,
                        width: 400,
                        store: 'Config.ListZone'
                    }

                ]
            },
            {
                xtype: 'container',
                flex: 1,
                border: false,
                layout: 'anchor',
                margin: '10 10 10 10',
                columnWidth: 0.30,
                items: [
                    {
                        xtype: 'panel',
                        anchor: '100%',
                        id: controller + 'FormImage',
                        height: 130,
                        width: 130,
                        html: '<img src="images/endesa_logo.jpg" height="130" width="100%" align="center">'
                    },
                    {
                        xtype: 'form',
                        anchor: '100%',
                        id: controller + 'FormUpload',
                        border: false,
                        fieldDefaults: {
                            labelAlign: 'top',
                        },
                        items: [
                            {
                                xtype: 'filefield',
                                id: 'ImageUploadForm',
                                name: 'ImageUploadForm',
                                fieldLabel: '<b>Imagen de la estaci\xf3n</b>',
                                anchor: '98%',
                                buttonText: 'Seleccione una imagen',
                                buttonOnly: true,
                                clearOnSubmit: true
                            },
                            {
                                xtype: 'button',
                                text: 'Remover la imagen',
                                align: 'center',
                                id: 'ShopRemoveImage',
                                action: 'ShopRemoveImage'
                            }
                        ]
                    }
                ]
            }

        ]
    },
    {
        xtype: 'container',
        layout: 'column',
        items: [
            {
                xtype: 'container',
                flex: 1,
                layout: 'fit',
                columnWidth: 1,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Barrio',
                        name: controller + 'FormNeighbourhood',
                        id: controller + 'FormNeighbourhood',
                        emptyText: 'Barrio',
                        allowBlank: true,
                        hidden: false,
                        minLength: 3,
                        width: 600,
                        vtype: 'alphanumeric',
                        minLengthText: 'El campo barrio debe contener 3 caracteres como m\xednimo.'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Localidad',
                        name: controller + 'FormDistrict',
                        id: controller + 'FormDistrict',
                        emptyText: 'Localidad',
                        allowBlank: true,
                        width: 600,
                        hidden: false,
                        minLength: 3,
                        vtype: 'alphanumeric',
                        minLengthText: 'El campo localidad debe contener 3 caracteres como m\xednimo.'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Latitud',
                        name: controller + 'FormLat',
                        id: controller + 'FormLat',
                        emptyText: 'Latitud',
                        allowBlank: false,
                        width: 600,
                        hidden: false,
                        minLength: 2,
                        vtype: 'numeric',
                        afterLabelTextTpl: AppGlobals.required,
                        minLengthText: 'El campo latitud debe contener 2 caracteres como m\xednimo.'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Longitud',
                        name: controller + 'FormLon',
                        id: controller + 'FormLon',
                        emptyText: 'Longitud',
                        allowBlank: false,
                        width: 600,
                        hidden: false,
                        minLength: 2,
                        vtype: 'numeric',
                        afterLabelTextTpl: AppGlobals.required,
                        minLengthText: 'El campo longitud debe contener 2 caracteres como m\xednimo.'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Centro de distribuci\xf3n',
                        name: controller + 'FormDistribution',
                        id: controller + 'FormDistribution',
                        emptyText: 'Centro de distribuci\xf3n',
                        allowBlank: false,
                        afterLabelTextTpl: AppGlobals.required,
                        width: 600,
                        hidden: false,
                        minLength: 3,
                        vtype: 'alphanumeric',
                        minLengthText: 'El campo centro de distribuci\xf3n debe contener 3 caracteres como m\xednimo.'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Relaci\xf3n de transformaci\xf3n',
                        name: controller + 'FormVoltage',
                        id: controller + 'FormVoltage',
                        emptyText: 'Relaci\xf3n de transformaci\xd3n',
                        width: 600,
                        hidden: false,
                        afterLabelTextTpl: AppGlobals.required,
                        allowBlank: false,
                        minLength: 3,
                        vtype: 'specialchars',
                        minLengthText: 'El campo voltaje debe contener 3 caracteres como m\xednimo.'
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Tipo transformador',
                        id: controller + 'FormTransformator',
                        loadingText: 'Buscando...',
                        emptyText: 'Selecciona tipo de transformador',
                        typeAhead: false,
                        width: 600,
                        displayField: 'name',
                        valueField: 'id_transformator_type',
                        minChars: 0,
                        pageSize: 10,
                        afterLabelTextTpl: AppGlobals.required,
                        allowBlank: false,
                        labelWidth: '50%',
                        store: 'Station.TransformerType'
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Tipo tecnolog\xeda',
                        id: controller + 'FormTech',
                        loadingText: 'Buscando...',
                        emptyText: 'Selecciona tipo de tecnolog\xeda',
                        typeAhead: false,
                        width: 600,
                        displayField: 'type',
                        valueField: 'id',
                        afterLabelTextTpl: AppGlobals.required,
                        allowBlank: false,
                        minChars: 0,
                        labelWidth: '50%',
                        store: 'Station.TechType'
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Tipo de ubicaci\xf3n',
                        id: controller + 'FormLocationType',
                        afterLabelTextTpl: AppGlobals.required,
                        loadingText: 'Buscando...',
                        typeAhead: false,
                        allowBlank: false,
                        emptyText: 'Selecciona tipo de ubicaci\xf3n',
                        width: 600,
                        displayField: 'type',
                        valueField: 'id',
                        minChars: 0,
                        labelWidth: '50%',
                        store: 'Station.ListComboUbication'
                    }

                ]
            }
        ]
    },
    {xtype: 'label', html: '&nbsp;', columnWidth: 1},
],
        moduleConfig.formAdmin = [
            {
                xtype: 'hiddenfield',
                name: controller + 'FormId',
                id: controller + 'FormId',
                value: '0'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Nombre',
                name: controller + 'FormName',
                id: controller + 'FormName',
                emptyText: 'Nombre',
                columnWidth: 0.48,
                afterLabelTextTpl: AppGlobals.required,
                allowBlank: false,
                width: '99%',
                minLength: 3,
                minLengthText: 'El campo nombre debe contener 3 caracteres como m\xednimo.'
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 0.04},
            {
                xtype: 'textfield',
                fieldLabel: 'Apellidos',
                name: controller + 'FormLastName',
                id: controller + 'FormLastName',
                emptyText: 'Apellidos',
                columnWidth: 0.48,
                afterLabelTextTpl: AppGlobals.required,
                allowBlank: false,
                width: '99%',
                minLength: 3,
                minLengthText: 'El campo apellido debe contener 3 caracteres como m\xednimo.'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Correo',
                name: controller + 'FormEmail',
                id: controller + 'FormEmail',
                emptyText: 'correo@dominio.com',
                columnWidth: 0.99,
                afterLabelTextTpl: AppGlobals.required,
                allowBlank: false,
                width: '99%',
                vtype: 'email'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Tel\xe9fono contacto',
                name: controller + 'FormTelephone',
                id: controller + 'FormTelephone',
                emptyText: 'Tel\xe9fono',
                columnWidth: 0.48,
                allowBlank: true,
                vtype: 'numeric',
                width: '99%'
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 0.04},
            {
                xtype: 'textfield',
                fieldLabel: 'Celular contacto',
                name: controller + 'FormCellphone',
                id: controller + 'FormCellphone',
                emptyText: 'Celular',
                columnWidth: 0.48,
                allowBlank: true,
                vtype: 'numeric',
                width: '99%'
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 1}
        ],
        moduleConfig.formOwner = [
            {
                xtype: 'hiddenfield',
                name: controller + 'FormId',
                id: controller + 'FormId',
                value: '0'
            },
            {
                xtype: 'combo',
                fieldLabel: 'Tipo de Propietario',
                id: controller + 'FormOwnerType',
                loadingText: 'Buscando...',
                emptyText: 'Selecciona tipo de propietario',
                typeAhead: false,
                displayField: 'type',
                valueField: 'id',
                columnWidth: 0.99,
                minChars: 0,
                width: '99%',
                afterLabelTextTpl: AppGlobals.required,
                labelWidth: '50%',
                store: 'General.ClientType'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Representante Legal',
                name: controller + 'FormSocialName',
                id: controller + 'FormSocialName',
                emptyText: 'Representante legal',
                allowBlank: true,
                columnWidth: 0.99,
                afterLabelTextTpl: AppGlobals.required,
                width: '99%',
                hidden: true,
                minLength: 3,
                minLengthText: 'El campo nombre debe contener 3 caracteres como m\xednimo.'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Raz\xf3n social',
                name: controller + 'FormBusinessName',
                id: controller + 'FormBusinessName',
                emptyText: 'Raz\xf3n social',
                allowBlank: true,
                columnWidth: 0.99,
                afterLabelTextTpl: AppGlobals.required,
                width: '99%',
                hidden: true,
                minLength: 3,
                minLengthText: 'El campo nombre debe contener 3 caracteres como m\xednimo.'
            },
            {
                xtype: 'numberfield',
                fieldLabel: 'NIT',
                name: controller + 'FormNit',
                id: controller + 'FormNit',
                emptyText: 'NIT',
                columnWidth: 0.99,
                allowBlank: true,
                afterLabelTextTpl: AppGlobals.required,
                width: '99%',
                hidden: true,
                minLength: 3,
                minLengthText: 'El campo identificacion es muy corto.'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Nombre',
                name: controller + 'FormName',
                id: controller + 'FormName',
                emptyText: 'Nombre contacto',
                columnWidth: 0.99,
                afterLabelTextTpl: AppGlobals.required,
                allowBlank: false,
                width: '99%',
                minLength: 3,
                minLengthText: 'El campo nombre debe contener 3 caracteres como m\xednimo.'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Identificaci\xf3n',
                name: controller + 'FormIdentification',
                id: controller + 'FormIdentification',
                emptyText: 'Identificaci\xf3n',
                columnWidth: 0.99,
                afterLabelTextTpl: AppGlobals.required,
                allowBlank: true,
                width: '99%',
                minLength: 3,
                vtype: 'numeric',
                minLengthText: 'El campo identificaci\xf3n es muy corto.'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Correo electr\xf3nico',
                name: controller + 'FormEmail',
                id: controller + 'FormEmail',
                emptyText: 'correo@dominio.com',
                columnWidth: 0.99,
                allowBlank: true,
                width: '99%',
                vtype: 'email'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Tel\xe9fono contacto',
                name: controller + 'FormTelephone',
                id: controller + 'FormTelephone',
                emptyText: 'Tel\xe9fono',
                columnWidth: 0.48,
                allowBlank: true,
                width: '99%'
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 0.04},
            {
                xtype: 'textfield',
                fieldLabel: 'Celular contacto',
                name: controller + 'FormCellphone',
                id: controller + 'FormCellphone',
                emptyText: 'Celular',
                columnWidth: 0.48,
                allowBlank: true,
                vtype: 'numeric',
                width: '99%'
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 1}
        ],
        moduleConfig.formSchedule = [
            {
                xtype: 'hiddenfield',
                name: controller + 'FormId',
                id: controller + 'FormId',
                value: '0'
            },
            {
                xtype: 'container',
                layout: 'column',
                columnWidth: 0.99,
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        text: 'Horario',
                        width: '33%'
                    },
                    {
                        xtype: 'label',
                        text: 'Hora de inicio',
                        width: '33%'
                    },
                    {
                        xtype: 'label',
                        text: 'Hora de cierre',
                        width: '33%'
                    }
                ]
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 1},
            {
                xtype: 'fieldcontainer',
                labelStyle: 'font-weight:bold;padding:0;',
                columnWidth: 0.99,
                layout: 'hbox',
                fieldDefaults: {
                    labelAlign: 'top'
                },
                items: [{
                        xtype: 'hiddenfield',
                        name: 'ScheduleWeekId',
                        id: 'ScheduleWeekId',
                        value: '0'
                    },
                    {
                        xtype: 'checkboxgroup',
                        columns: 1,
                        id: 'CheckAllWeek',
                        width: '25%',
                        items: [
                            {boxLabel: 'Lunes a Viernes', name: 'CheckAllWeekData', inputValue: '1'}
                        ]
                    },
                    {
                        xtype: 'timefield',
                        id: 'ScheduleWeekHourStart',
                        disabled: true,
                        fieldLabel: '<b>Hora</b>',
                        minValue: '01',
                        maxValue: '12',
                        format: 'i',
                        increment: 1,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'label',
                        text: ':',
                        margin: '20 10 0 10'
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleWeekMinutesStart',
                        disabled: true,
                        fieldLabel: '<b>Minutos</b>',
                        minValue: '00',
                        maxValue: '59',
                        format: 'i',
                        increment: 5,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'radiogroup',
                        columns: 1,
                        allowBlank: false,
                        id: 'ScheduleWeekFormatTimeStart',
                        items: [{
                                xtype: 'radiofield',
                                boxLabel: 'AM',
                                name: 'ScheduleWeekFormatTimeStartData',
                                inputValue: 'AM'
                            }, {
                                xtype: 'radiofield',
                                boxLabel: 'PM',
                                name: 'ScheduleWeekFormatTimeStartData',
                                inputValue: 'PM',
                                checked: true
                            }]
                    }, {
                        xtype: 'label',
                        html: '&nbsp;',
                        width: 60
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleWeekHourEnd',
                        disabled: true,
                        fieldLabel: '<b>Hora</b>',
                        minValue: '01',
                        maxValue: '12',
                        format: 'i',
                        increment: 1,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'label',
                        text: ':',
                        margin: '20 10 0 10'
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleWeekMinutesEnd',
                        disabled: true,
                        fieldLabel: '<b>Minutos</b>',
                        minValue: '00',
                        maxValue: '59',
                        format: 'i',
                        increment: 5,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'radiogroup',
                        columns: 1,
                        allowBlank: false,
                        id: 'ScheduleWeekFormatTimeEnd',
                        items: [{
                                xtype: 'radiofield',
                                boxLabel: 'AM',
                                name: 'ScheduleWeekFormatTimeEndData',
                                inputValue: 'AM'
                            }, {
                                xtype: 'radiofield',
                                boxLabel: 'PM',
                                name: 'ScheduleWeekFormatTimeEndData',
                                inputValue: 'PM',
                                checked: true
                            }]
                    }]
            }, {
                xtype: 'label',
                html: '&nbsp;',
                columnWidth: 1
            }, {
                xtype: 'fieldcontainer',
                labelStyle: 'font-weight:bold;padding:0;',
                columnWidth: 0.99,
                layout: 'hbox',
                fieldDefaults: {
                    labelAlign: 'top'
                },
                items: [{
                        xtype: 'hiddenfield',
                        name: 'ScheduleSaturdayId',
                        id: 'ScheduleSaturdayId',
                        value: '0'
                    },
                    {
                        xtype: 'checkboxgroup',
                        columns: 1,
                        id: 'CheckAllSaturday',
                        width: '25%',
                        items: [
                            {boxLabel: 'S\u00e1bados', name: 'CheckAllSaturdayData', inputValue: '1'}
                        ]
                    },
                    {
                        xtype: 'timefield',
                        id: 'ScheduleSaturdayHourStart',
                        fieldLabel: '<b>Hora</b>',
                        disabled: true,
                        minValue: '01',
                        maxValue: '12',
                        format: 'i',
                        increment: 1,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'label',
                        text: ':',
                        margin: '20 10 0 10'
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleSaturdayMinutesStart',
                        fieldLabel: '<b>Minutos</b>',
                        disabled: true,
                        minValue: '00',
                        maxValue: '59',
                        format: 'i',
                        increment: 5,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'radiogroup',
                        columns: 1,
                        allowBlank: false,
                        id: 'ScheduleSaturdayFormatTimeStart',
                        items: [{
                                xtype: 'radiofield',
                                boxLabel: 'AM',
                                name: 'ScheduleSaturdayFormatTimeStartData',
                                inputValue: 'AM'
                            }, {
                                xtype: 'radiofield',
                                boxLabel: 'PM',
                                name: 'ScheduleSaturdayFormatTimeStartData',
                                inputValue: 'PM',
                                checked: true
                            }]
                    }, {
                        xtype: 'label',
                        html: '&nbsp;',
                        width: 60
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleSaturdayHourEnd',
                        disabled: true,
                        fieldLabel: '<b>Hora</b>',
                        minValue: '01',
                        maxValue: '12',
                        format: 'i',
                        increment: 1,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'label',
                        text: ':',
                        margin: '20 10 0 10'
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleSaturdayMinutesEnd',
                        fieldLabel: '<b>Minutos</b>',
                        disabled: true,
                        minValue: '00',
                        maxValue: '59',
                        format: 'i',
                        increment: 5,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'radiogroup',
                        columns: 1,
                        allowBlank: false,
                        id: 'ScheduleSaturdayFormatTimeEnd',
                        items: [{
                                xtype: 'radiofield',
                                boxLabel: 'AM',
                                name: 'ScheduleSaturdayFormatTimeEndData',
                                inputValue: 'AM'
                            }, {
                                xtype: 'radiofield',
                                boxLabel: 'PM',
                                name: 'ScheduleSaturdayFormatTimeEndData',
                                inputValue: 'PM',
                                checked: true
                            }]
                    }]
            }, {
                xtype: 'label',
                html: '&nbsp;',
                columnWidth: 1
            }, {
                xtype: 'fieldcontainer',
                labelStyle: 'font-weight:bold;padding:0;',
                columnWidth: 0.99,
                layout: 'hbox',
                fieldDefaults: {
                    labelAlign: 'top'
                },
                items: [{
                        xtype: 'hiddenfield',
                        name: 'ScheduleSundayId',
                        id: 'ScheduleSundayId',
                        value: '0'
                    },
                    {
                        xtype: 'checkboxgroup',
                        columns: 1,
                        id: 'CheckAllSunday',
                        width: '25%',
                        items: [
                            {boxLabel: 'Domingos', name: 'CheckAllSundayData', inputValue: '1'}
                        ]
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleSundayHourStart',
                        fieldLabel: '<b>Hora</b>',
                        disabled: true,
                        minValue: '01',
                        maxValue: '12',
                        format: 'i',
                        increment: 1,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'label',
                        text: ':',
                        margin: '20 10 0 10'
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleSundayMinutesStart',
                        fieldLabel: '<b>Minutos</b>',
                        disabled: true,
                        minValue: '00',
                        maxValue: '59',
                        format: 'i',
                        increment: 5,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'radiogroup',
                        columns: 1,
                        allowBlank: false,
                        id: 'ScheduleSundayFormatTimeStart',
                        items: [{
                                xtype: 'radiofield',
                                boxLabel: 'AM',
                                name: 'ScheduleSundayFormatTimeStartData',
                                inputValue: 'AM'
                            }, {
                                xtype: 'radiofield',
                                boxLabel: 'PM',
                                name: 'ScheduleSundayFormatTimeStartData',
                                inputValue: 'PM',
                                checked: true
                            }]
                    }, {
                        xtype: 'label',
                        html: '&nbsp;',
                        width: 60
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleSundayHourEnd',
                        fieldLabel: '<b>Hora</b>',
                        disabled: true,
                        minValue: '01',
                        maxValue: '12',
                        format: 'i',
                        increment: 1,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'label',
                        text: ':',
                        margin: '20 10 0 10'
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleSundayMinutesEnd',
                        fieldLabel: '<b>Minutos</b>',
                        disabled: true,
                        minValue: '00',
                        maxValue: '59',
                        format: 'i',
                        increment: 5,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'radiogroup',
                        columns: 1,
                        allowBlank: false,
                        id: 'ScheduleSundayFormatTimeEnd',
                        items: [{
                                xtype: 'radiofield',
                                boxLabel: 'AM',
                                name: 'ScheduleSundayFormatTimeEndData',
                                inputValue: 'AM'
                            }, {
                                xtype: 'radiofield',
                                boxLabel: 'PM',
                                name: 'ScheduleSundayFormatTimeEndData',
                                inputValue: 'PM',
                                checked: true
                            }]
                    }]
            }, {
                xtype: 'label',
                html: '&nbsp;',
                columnWidth: 1
            }, {
                xtype: 'fieldcontainer',
                labelStyle: 'font-weight:bold;padding:0;',
                columnWidth: 0.99,
                layout: 'hbox',
                fieldDefaults: {
                    labelAlign: 'top'
                },
                items: [{
                        xtype: 'hiddenfield',
                        name: 'ScheduleHollidayId',
                        id: 'ScheduleHollidayId',
                        value: '0'
                    },
                    {
                        xtype: 'checkboxgroup',
                        columns: 1,
                        id: 'CheckAllHolliday',
                        width: '25%',
                        items: [
                            {boxLabel: 'Festivos', name: 'CheckAllHollidayData', inputValue: '1'}
                        ]
                    },
                    {
                        xtype: 'timefield',
                        id: 'ScheduleHollidayHourStart',
                        fieldLabel: '<b>Hora</b>',
                        disabled: true,
                        minValue: '01',
                        maxValue: '12',
                        format: 'i',
                        increment: 1,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'label',
                        text: ':',
                        margin: '20 10 0 10'
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleHollidayMinutesStart',
                        fieldLabel: '<b>Minutos</b>',
                        disabled: true,
                        minValue: '00',
                        maxValue: '59',
                        format: 'i',
                        increment: 5,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'radiogroup',
                        columns: 1,
                        allowBlank: false,
                        id: 'ScheduleHollidayFormatTimeStart',
                        items: [{
                                xtype: 'radiofield',
                                boxLabel: 'AM',
                                name: 'ScheduleHollidayFormatTimeStartData',
                                inputValue: 'AM'
                            }, {
                                xtype: 'radiofield',
                                boxLabel: 'PM',
                                name: 'ScheduleHollidayFormatTimeStartData',
                                inputValue: 'PM',
                                checked: true
                            }]
                    }, {
                        xtype: 'label',
                        html: '&nbsp;',
                        width: 60
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleHollidayHourEnd',
                        fieldLabel: '<b>Hora</b>',
                        disabled: true,
                        minValue: '01',
                        maxValue: '12',
                        format: 'i',
                        increment: 1,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'label',
                        text: ':',
                        margin: '20 10 0 10'
                    }, {
                        xtype: 'timefield',
                        id: 'ScheduleHollidayMinutesEnd',
                        fieldLabel: '<b>Minutos</b>',
                        disabled: true,
                        minValue: '00',
                        maxValue: '59',
                        format: 'i',
                        increment: 5,
                        editable: false,
                        width: 60
                    }, {
                        xtype: 'radiogroup',
                        columns: 1,
                        allowBlank: false,
                        id: 'ScheduleHollidayFormatTimeEnd',
                        items: [{
                                xtype: 'radiofield',
                                boxLabel: 'AM',
                                name: 'ScheduleHollidayFormatTimeEndData',
                                inputValue: 'AM'
                            }, {
                                xtype: 'radiofield',
                                boxLabel: 'PM',
                                name: 'ScheduleHollidayFormatTimeEndData',
                                inputValue: 'PM',
                                checked: true
                            }]
                    }]
            },
            {xtype: 'label', html: '&nbsp;', columnWidth: 1}
        ]