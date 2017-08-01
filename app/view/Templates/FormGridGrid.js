Ext.define('LoadPrincipal.view.Templates.FormGridGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.FormGridGridAlias,
    requires: [
        'LoadPrincipal.view.Generics.ListMulti',
        'LoadPrincipal.view.Generics.FormMulti',
        'LoadPrincipal.view.Generics.MapMulti'
    ],
    id: AppGlobals.FormGridGridId,
    border: false,
    frame: false,
    layout: 'card',
    initComponent: function () {
        this.items = [
          {
            xtype   : 'container',
            layout  : 'vbox',
            margin: '0 0 0 0',
            padding: '0 0 0 0',
            items   : [
              {
                xtype: AppGlobals.formAlias+0,
                width: '100%',
              },
              {
                  xtype   : 'container',
                  width: '100%',
                  margin: '0 0 0 0',
                  padding: '0 0 0 0',
                    layout: {
                        type: 'hbox',
                        padding: '0',
                        align: 'middle'
                    },
                    style:{
                        //border: 'solid 1px #000'
                    },
                    items:[
                        {
                            flex: 1,
                            xtype   : 'container', 
                            margin: '0 0 0 0',
                            padding: '0 0 0 0',
                            layout: {
                                type: 'hbox',
                                padding: '1',
                                align: 'top'
                            },
                            default:{
                                margin: '0 0 0 0',
                                padding: '0 0 0 0',
                            },
                            style:{
                                //border: 'solid 1px #000'
                            },
                            items:[
                                {
                                   //flex: 1,
                                    xtype: 'label',
                                    text: 'Carga de Archivo:',
                                    padding: '0 5 0 0',
                                },
                                {
                                   //flex: 1,
                                   id: 'SchedulingLedLoadFile',
                                    xtype: 'label',
                                    text: '-',
                                    cls: 'icon-ledblue',
                                    padding: '0 0 3 18',
                                    margin: '2 0 0 0',
                                    style:{
                                        fontSize: '10px',
                                    },
                                },
                            ]
                        },
                        {
                            flex: 1,
                            xtype   : 'container', 
                            margin: '0 0 0 0',
                            layout: {
                                type: 'hbox',
                                padding: '1',
                                align: 'top'
                            },
                            default:{
                                margin: '0 0 0 0',
                                padding: '0 0 0 0',
                            },
                            items:[
                                {
                                   //flex: 1,
                                    xtype: 'label',
                                    text: 'Procesamiento de Archivo:',
                                    padding: '0 5 0 0',
                                },
                                {
                                   //flex: 1,
                                   id: 'SchedulingLedProcessFile',
                                    xtype: 'label',
                                    text: '-',
                                    cls: 'icon-ledblue',
                                    padding: '0 0 3 18',
                                    margin: '2 0 0 0',
                                    style:{
                                        fontSize: '10px',
                                    },
                                },
                            ]
                        },
                        {
                            flex: 1,
                            xtype   : 'container', 
                            margin: '0 0 0 0',
                            layout: {
                                type: 'hbox',
                                padding: '1',
                                align: 'top'
                            },
                            default:{
                                margin: '0 0 0 0',
                                padding: '0 0 0 0',
                            },
                            items:[
                                {
                                   //flex: 1,
                                    xtype: 'label',
                                    text: 'Planificando:',
                                    padding: '0 5 0 0',
                                },
                                {
                                   //flex: 1,
                                   id: 'SchedulingLedPlanning',
                                    xtype: 'label',
                                    text: '-',
                                    cls: 'icon-ledblue',
                                    padding: '0 0 3 18',
                                    margin: '2 0 0 0',
                                    style:{
                                        fontSize: '10px',
                                    },
                                },
                            ]
                        },
                       {
                            flex: 1,
                            xtype   : 'container', 
                            margin: '0 0 0 0',
                            layout: {
                                type: 'hbox',
                                padding: '1',
                                align: 'top'
                            },
                            default:{
                                margin: '0 0 0 0',
                                padding: '0 0 0 0',
                            },
                            items:[
                                {
                                   //flex: 1,
                                    xtype: 'label',
                                    text: 'Optimizando Ruta:',
                                    padding: '0 5 0 0',
                                },
                                {
                                   //flex: 1,
                                   id: 'SchedulingLedRouting',
                                    xtype: 'label',
                                    text: '-',
                                    cls: 'icon-ledblue',
                                    padding: '0 0 3 18',
                                    margin: '2 0 0 0',
                                    style:{
                                        fontSize: '10px',
                                    },
                                },
                            ]
                        },

                        {
                            //flex: 1,
                            xtype   : 'container', 
                            margin: '0 0 0 0',
                            layout: {
                                type: 'hbox',
                                padding: '1',
                                align: 'top'
                            },
                            default:{
                                margin: '0 0 0 0',
                                padding: '0 0 0 0',
                            },
                            items:[
                                /*{
                                   //flex: 1,
                                    xtype: 'label',
                                    text: 'Ult.:',
                                    padding: '0 5 0 0',
                                },*/
                                {
                                    id: 'SchedulingUltDate1',
                                   //flex: 1,
                                    xtype: 'label',
                                    text: '- - -',
                                    //cls: 'icon-loading',
                                    padding: '0 0 3 18',
                                    margin: '2 0 0 0',
                                    style:{
                                        fontSize: '10px',
                                    },
                                },
                            ]
                        },
                    ],
              },
              {
                  xtype : 'panel',
                  //layout : 'hbox',
                  layout : 'border',
                  flex  : 2,
                  width: '100%',
                  margin: '0 0 0 0',
                  id: 'idSchedulingView0',
                  items: [
                    {
                        xtype: AppGlobals.listAlias+0,
                        autoScroll: true,
                        cls: 'tracking-grid',
                        region:'center',
                        width: '100%',
                    },
                    {
                      xtype : 'panel',
                      layout : 'vbox',
                      width: '30%',
                      height: '100%',
                      margin: '0 0 0 0',
                      padding: '0 0 0 0',
                      region:'east',
                      title: 'Editar dirección',
                      //titleCollapse: true,
                      collapsible: true,
                      collapsed: true,
                      //hideCollapseTool: true,
                      id: 'idSchedulingEditAddressPanel',
                      listeners:{
                          beforecollapse: function( p, direction, animate, eOpts )
                          {
                              Ext.getCmp(AppGlobals.mapId+0).hide();
                          },
                          beforeexpand: function( p, animate, eOpts )
                          {
                              setTimeout(function(){
                                  Ext.getCmp(AppGlobals.mapId+0).show();
                              }, 100);
                          }
                      },
                      items: [
                          {
                            xtype: AppGlobals.mapAlias+0,
                            flex: 2.8,
                            width: '100%',
                        },
                        {
                            xtype: 'form',
                            flex: 1.2,
                            width: '100%',
                            items: [
                                {
                                    xtype: 'toolbar',
                                    border: 'none',
                                    margin: '0 0 0 0',
                                    padding: '0 0 0 0',
                                    items:
                                    [
                                        {
                                            xtype             : 'textfield',
                                            fieldLabel        : 'Inicio',
                                            afterLabelTextTpl : '',
                                            id              : 'startAddress',
                                            img             : 'images/icon/markers/start.png',
                                            name              : 'direccion_inicio',
                                            emptyText         : 'Dirección Inicial',
                                            //allowBlank        : false,
                                            margin            : '5 5 5 5',
                                            vtype             : 'specialchars',
                                            labelWidth      : 50,
                                            minLengthText     : 5,
                                            width: '80%'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'ok-button',
                                            tooltip: 'Valida la dirección de inicio',
                                            id: 'startAddressValid',
                                            cls: 'x-btn-default-small',
                                        },
                                    ]
                                },
                                {
                                    xtype: 'toolbar',
                                    border: 'none',
                                    margin: '0 0 0 0',
                                    padding: '0 0 0 0',
                                    items:
                                    [
                                        {
                                            xtype             : 'textfield',
                                            fieldLabel        : 'Fin',
                                            afterLabelTextTpl : '',
                                            id              : 'endAddress',
                                            img             : 'images/icon/markers/finish.png',
                                            name              : 'direccion',
                                            emptyText         : 'Dirección Fin',
                                            //allowBlank        : false,
                                            margin            : '5 5 5 5',
                                            vtype             : 'specialchars',
                                            labelWidth      : 50,
                                            minLengthText     : 5,
                                            width: '80%'
                                        },
                                        {
                                            xtype: 'button',
                                            iconCls: 'ok-button',
                                            tooltip: 'Valida la dirección fin',
                                            id: 'endAddressValid',
                                            cls: 'x-btn-default-small',
                                        },
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    text: '*Se guardarán los datos con la última dirección válida según mapa.',
                                    style:{
                                        fontSize: '10px'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    width: '80%',
                                    text: 'Actualizar',
                                    margin: '0 0 0 40',
                                    id: 'updateAddress'
                                }
                            ]
                        }
                      ],
                      tools:[
                          {
                                xtype:'button',
                                id: 'idSchedulingViewAllPointsButton',
                                enableToggle: true,
                                text: 'Ver todos',
                                tooltip: 'Ver todos los puntos',
                                style:{
                                    border: '1px solid #fff',
                                    marginLeft: '4px',
                                },
                            },
                      ]
                    }
                  ]
              },
              {
                  xtype: 'panel',
                  width: '100%',
                  buttonAlign : 'center',
                  id: 'idSchedulingViewButton0',
                  buttons:[
                        {
                            xtype: 'button',
                            text: 'Cancelar',
                            margin: '2 2 2 2',
                            height: 30,
                            width: '50%',
                            id: controller + 'DismissErrorsAndProgrammingCancel',
                        },
                        {
                            xtype: 'button',
                            text: 'Programar e Ignorar Errores',
                            margin: '2 2 2 2',
                            height: 30,
                            width: '50%',
                            id: controller + 'DismissErrorsAndProgramming',
                            style:{
                                background: '#1fbad6 !important',
                                border: '1px solid #fff',  
                            },
                        }
                  ]
              },
            ]

        },  
        {
            xtype   : 'container',
            layout  : 'vbox',
            margin: '0 0 0 0',
            padding: '0 0 0 0',
            id: 'dfdgsdgdsgsdg35353',
            items   : [
                {
                    xtype: AppGlobals.formAlias+1,
                    width: '100%'
                },
                {
                  xtype   : 'container',
                  width: '100%',
                  margin: '0 0 0 0',
                  padding: '0 0 0 0',
                    layout: {
                        type: 'hbox',
                        padding: '0 0 0 0',
                        align: 'middle'
                    },
                    style:{
                        //border: 'solid 1px #000'
                    },
                    items:[
                        {
                            flex: 1,
                            xtype   : 'container', 
                            margin: '0 0 0 0',
                            padding: '0 0 0 0',
                            layout: {
                                type: 'hbox',
                                padding: '1',
                                align: 'top'
                            },
                            default:{
                                margin: '0 0 0 0',
                                padding: '0 0 0 0',
                            },
                            style:{
                                //border: 'solid 1px #000'
                            },
                            items:[
                                {
                                   //flex: 1,
                                    xtype: 'label',
                                    text: 'Asignación de Ruta:',
                                    padding: '0 5 0 0',
                                },
                                {
                                   //flex: 1,
                                   id: 'SchedulingLedAsingRoute',
                                    xtype: 'label',
                                    text: 'Apagado',
                                    cls: 'icon-ledblue',
                                    padding: '0 0 3 18',
                                    margin: '2 0 0 0',
                                    style:{
                                        fontSize: '10px',
                                    },
                                },
                            ]
                        },
                        {
                            //flex: 1,
                            xtype   : 'container', 
                            margin: '0 0 0 0',
                            layout: {
                                type: 'hbox',
                                padding: '1',
                                align: 'top'
                            },
                            default:{
                                margin: '0 0 0 0',
                                padding: '0 0 0 0',
                            },
                            items:[
                                /*{
                                   //flex: 1,
                                    xtype: 'label',
                                    text: 'Ult.:',
                                    padding: '0 5 0 0',
                                },*/
                                {
                                    id: 'SchedulingUltDate2',
                                   //flex: 1,
                                    xtype: 'label',
                                    text: '- - -',
                                    //cls: 'icon-loading',
                                    padding: '0 0 3 18',
                                    margin: '2 0 0 0',
                                    style:{
                                        fontSize: '10px',
                                    },
                                },
                            ]
                        }, 
                    ],
              },
                {
                    xtype: AppGlobals.mapAlias+1,
                    flex: 2.7,
                    width: '100%',
                    height: 222,
                },
                {
                    xtype         : 'panel',
                    layout        : 'border',
                    border        : false,
                    split         : true,
                    collapsible   : true,
                    collapseMode  : 'mini',
                    width         : '100%',
                    hideCollapseTool: true,
                    preventHeader: true ,
                    flex:2,
                    items : [
                        {
                            xtype: AppGlobals.listAlias + 1,
                            cls: 'tracking-grid',
                            region: 'center',
                        },
                        {
                            xtype: AppGlobals.listAlias + 2,
                            cls: 'tracking-grid',
                            region:'south',
                            hidden:true,
                        }
                    ]
                }
            ]
        }];

        this.callParent(arguments);
    }
});
