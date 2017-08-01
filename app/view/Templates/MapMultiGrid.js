Ext.define('LoadPrincipal.view.Templates.MapMultiGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.MapMultiGridAlias,
    requires: [
        'LoadPrincipal.view.Generics.ListMulti',
        'LoadPrincipal.view.Generics.MapMulti',
    ],
    id: AppGlobals.MapMultiGridId,
    border: false,
    frame: false,
//    title: 'Mapa grilla',
    layout: 'card',
    initComponent: function () {

        this.items = [
          {
            xtype: 'container',
            layout: 'border',
            items:[{
                region: 'center',
                xtype: 'panel',
                layout: 'border',
              //  border: false,
                //width: '100',
            //    resizable: true,
                split: true,
                items: [
                    {
                        xtype: AppGlobals.mapAlias+0,
                        region: 'center'

                    },
                    {
                        xtype: AppGlobals.listAlias+'1',
                        region: 'south',
                        height: 300,
                        collapsible: true,
                        collapsed: true,
                        titleCollapse: true,
                    }
                ]
              },
              {
                  region: 'east',
                  xtype: 'panel',
                  layout: 'vbox',
                  cls: 'tracking-grid',
                  split: true,
                  width: '50%',
                  height: 300,
                  stateful: true,
                  stateId: 'ResourceTrackingResourceGrid',
                  lockable: true,
                  collapsible: true,
                  title: moduleConfig.subgrid[0].title,
                  items: [
                      {
                          xtype: AppGlobals.listAlias+'0',
                          width: '100%',
                          flex:1,
                          title: ''
                      },
                      {
                        xtype: 'panel',
                        id: AppGlobals.MapMultiGridId + 'Detail0',
                        hidden: true,
                        flex:1.5,
                        width:'100%',
                        title: 'Informaci&oacute;n',
                        autoScroll: true,
                        tools: [
                            {
                                xtype: 'button',
                                id:controller + 'Detail0ShowAllButton',
                                action: controller + 'Detail0ShowAllButton',
                                cls       : 'x-btn-default-small',
                                iconCls   : 'cancel-button',
                                tooltip   : 'Mostrar todos',
                                padding: '0 0 0 0',
                                margin: '0 0 0 0'
                            }
                        ],
                        tpl: new Ext.XTemplate([
                            '<table width="100%">',
                                '<tr>',
                                    '<td class="table-td">',
                                        '<div class="tdcont">',       
                                            '<div style="float:left;margin-right:2%;width:49%;border:1px solid #9a9a9a;">',
                                                '<center>',
                                                    '<h2 style="color: #fff; background-color:#1fbad6;padding:5px 5px;margin:0;font-size:15px;font-weight: bold;"> '+translateresourcetracking.resource.detailTitle+' </h2>',
                                                '</center>',
                                                '<hr style="color: #1fbad6;">',
                                                '<center>',
                                                    '<table align="center" style="margin-top:0px;font-size: smaller;width:100%">',
                                                        '<tr><td><b>'+translateresourcetracking.resource.columns.updateTime+':</b></td><td>{updateTime}</td></tr>',
                                                        '<tr><td><b>'+translateresourcetracking.resource.driver+':</b></td><td >{login}</td></tr>',
                                                        '<tr><td><b>'+translateresourcetracking.resource.heading+':</b></td><td>{heading}</td></tr>',
                                                        '<tr><td><b>'+translateresourcetracking.resource.columns.address+':</b></td><td>{address}</td></tr>',
                                                        '<tr><td><b>'+translateresourcetracking.resource.columns.rpm+':</b></td><td>{rpm}</td></tr>',
                                                        '<tr><td><b>'+translateresourcetracking.positions.columns.odometer+':</b></td><td>{odometer}</td></tr>',
                                                        '<tr><td><b>'+translateresourcetracking.resource.columns.person+':</b></td><td>{passanger}</td></tr>',
                                                        '<tr><td><b>'+translateresourcetracking.resource.columns.trailer+':</b></td><td>{trailer}</td></tr>',
                                                        '<tr><td><b>'+translateresourcetracking.resource.columns.levelGasTank+':</b></td><td>{gas}</td></tr>',
                                                    '</table>',
                                                '</center>',
                                            '</div>',
                                            '<div style="float:left;width:49%;border:1px solid #9a9a9a;">',
                                                '<center>',
                                                    '<h2 style="color: #fff; background-color:#1fbad6;padding:5px;margin:0;font-size:15px;font-weight: bold;"> '+translateresourcetracking.resource.statisticTitle+' </h2>',
                                                '</center>',
                                                '<hr style="color: #1fbad6;">',
                                                '<center>',
                                                    '<table align="center" style="margin-top:0px;font-size: smaller;width:100% "">',
                                                        '<tr><td><b>'+translateresourcetracking.resource.maxSpeed+': </b></td><td>0</td></tr>',
                                                        '<tr><td><b>'+translateresourcetracking.resource.averageSpeed+': </b></td><td >0</td></tr>',
                                                        '<tr><td><b>'+translateresourcetracking.resource.distance+': </b></td><td>{totalDistance}</td></tr>',
                                                    '</table>',
                                                '</center>',
                                            '</div>',
                                        '</div>',
                                    '</td>',
                                '</tr>',
                            '</table>'].join(''))
                      }
                  ]
              }]
            },

            //History
            {
              xtype: 'container',
              layout: 'border',
              items:[
                  {
                  region: 'center',
                  xtype: 'panel',
                  layout: 'border',
                  border: false,
                  width: '100%',
                  items: [
                      {
                          xtype: AppGlobals.mapAlias+1,
                          region: 'center'
                      },
                      {
                          xtype: 'panel',
                          region: 'south',
                          height: 200,
                          layout: 'hbox',
                          padding: '5',
                          style:{
                              borderTop:'2px solid #474941',
                          },
                          items:[
                              {
                              xtype: 'panel',
                              id: AppGlobals.MapMultiGridId + 'Detail1',
                              height: '100%',
                              html: 'Selecciona una posición para ver los detalles.',
                              tpl: new Ext.XTemplate([
                                    '<div class="detailPosition" style="position:relative; width: 100%; height: 100%;" ><center>',
                                        '<h2 style="color: #fff; background-color:#1fbad6;padding:5px;margin:0;font-size: 1.06em;">Detalle</h2>',
                                        '<hr style="color: #0056b2;margin: 3 0 3 0;">',
                                        '<table style="color:#474941;font-size:0.96em;padding:0;margin:0;width: 100%;">',
                                            '<tr>',
                                                '<td colspan="2" width="40%"><b>'+translateresourcetracking.filter.date+':</b></td>',
                                                '<td colspan="2" width="60%">{updateTime}</td>',
                                            '</tr>',
                                            '<tr>',
                                                '<td colspan="2" width="40%"><b>'+translateresourcetracking.resource.columns.address+':</b></td>',
                                                '<td colspan="2" width="60%">{address}</td>',
                                            '</tr>',
                                            '<tr>',
                                                '<td colspan="2" width="40%"><b>'+translateresourcetracking.resource.driver+':</b></td>',
                                                '<td colspan="2" width="60%">{login}</td>',
                                            '</tr>',
                                            '<tr>',
                                                '<td colspan="2"><b>'+translateresourcetracking.resource.heading+':</b> {heading}</td>',
                                                '<td colspan="2"><b>'+translateresourcetracking.resource.columns.rpm+':</b> {rpm}</td>',
                                            '</tr>',
                                                '<tr>',
                                                '<td colspan="2"><b>'+translateresourcetracking.resource.columns.speed+':</b> {speed}</td>',
                                                '<td colspan="2"><b>'+translateresourcetracking.resource.columns.levelGasTank+':</b> {levelGasTank}</td>',
                                            '</tr>',
                                            '<tr>',
                                                '<td colspan="2" width="40%"><b>'+translateresourcetracking.positions.columns.odometer+':</b></td>',
                                                '<td colspan="2" width="60%">{odometer}</td>',
                                            '</tr>',
                                        '</table>',
                                    '</center></div>',
                              ].join('')),
                              flex: 1
                          },
                          {
                            xtype: 'panel',
                            flex: 1,
                            height: '100%',
                            layout:'vbox',
                            items: [/*{
                              id: AppGlobals.MapMultiGridId + 'Detail2',
                              html: '<div class="rt-title">Ubicacion:</div>',
                              tpl: new Ext.XTemplate('<tpl><div class="rt-title">Ubicación: {address}</div></tpl>'),
                              width: '100%',
                              flex: 1,
                            },*/{
                              xtype: AppGlobals.listAlias+'3',
                              flex:3,
                              width: '100%',
                              forceFit :true,
                              store: controller + '.ListPositionEvents',
                              columns: [{
                                text: 'Evento',
                                dataIndex: 'description'
                              }]
                            }]
                          }]
                      }
                  ]
                },
                {
                    region: 'east',
                    xtype: 'panel',
                    layout: 'fit',
                    border: false,
                    animCollapse: false,
                    collapsible: true,
                    split: true,
                    width: '50%',
                    height: 300,
                    title: Ext.isEmpty(translateresourcetracking.positions.title)? '' : translateresourcetracking.positions.title,
                    titleCollapse: true,
                    cls: 'tracking-grid',
                    items: [
                        {
                            xtype: AppGlobals.listAlias+'2',
                            width: '100%',
                            stateful: true,
                            stateId: 'ResourceTrackingHistoryPositionGrid',
                            invalidateScrollerOnRefresh: false,
                            viewConfig: {
                                getRowClass: function(record, rowIndex, rowParams, store) 
                                {
                                    var strClass = (!Ext.isEmpty(record) && record.data.hasEvents) ? 
                                    'grid-red' : 
                                    'grid-normal';
                                    
                                    //console.log('Agregando la clase css.', strClass);
                                    
                                    return strClass;
                                    ///this.rowBodyCls;
                                }
                            },
                            features: [
                              /*{
                                  ftype: 'rowbody',
                                  getAdditionalData: function (data, rowIndex, record, rowValues) {
                                      return {
                                          rowBody: record.get("address"),
                                          rowBodyCls: (record.data.hasEvents) ? 'grid-red' : 'grid-normal',
                                          rowBodyColspan: this.view.headerCt.getColumnCount(), 
                                          align: 'center',
                                      };
                                  }
                              },
                              {
                                  ftype: "rowwrap"
                              }*/
                            ]
                        }
                    ]
                }]
              }
            //Queda pendiente agregar el otro template para la vista de historial
        ];

        this.callParent(arguments);
    }
});
