
function generateData(n) {
    var data = [],
            p = (Math.random() * 11) + 1,
            i;
    for (i = 0; i < (n || 12); i++) {
        data.push({
            name: Ext.Date.monthNames[i],
            data1: Math.floor(Math.max((Math.random() * 100), 20)),
            data2: Math.floor(Math.max((Math.random() * 100), 20)),
            data3: Math.floor(Math.max((Math.random() * 100), 20)),
            data4: Math.floor(Math.max((Math.random() * 100), 20)),
            data5: Math.floor(Math.max((Math.random() * 100), 20)),
            data6: Math.floor(Math.max((Math.random() * 100), 20)),
            data7: Math.floor(Math.max((Math.random() * 100), 20)),
            data8: Math.floor(Math.max((Math.random() * 100), 20)),
            data9: Math.floor(Math.max((Math.random() * 100), 20))
        });
    }
    return data;
}
function generateDataNegative(n) {
    var data = [],
            p = (Math.random() * 11) + 1,
            i;
    for (i = 0; i < (n || 12); i++) {
        data.push({
            name: Ext.Date.monthNames[i],
            data1: Math.floor(((Math.random() - 0.5) * 100)),
            data2: Math.floor(((Math.random() - 0.5) * 100)),
            data3: Math.floor(((Math.random() - 0.5) * 100)),
            data4: Math.floor(((Math.random() - 0.5) * 100)),
            data5: Math.floor(((Math.random() - 0.5) * 100)),
            data6: Math.floor(((Math.random() - 0.5) * 100)),
            data7: Math.floor(((Math.random() - 0.5) * 100)),
            data8: Math.floor(((Math.random() - 0.5) * 100)),
            data9: Math.floor(((Math.random() - 0.5) * 100))
        });
    }
    return data;
}

var store1 = new Ext.data.JsonStore({
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateData()
});
var storeNegatives = new Ext.data.JsonStore({
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateDataNegative()
});
var store3 = new Ext.data.JsonStore({
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateData()
});
var store4 = new Ext.data.JsonStore({
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateData()
});
var store5 = new Ext.data.JsonStore({
    fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
    data: generateData()
});

var axesCfg = []

if(moduleConfig.chart.axes === true){
    var xOdd = {};
    var yOdd = {};
    if(moduleConfig.chart.axesXOdd === true){
        xOdd = {//cuadricula... configurable
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 1
                }
            };
    }
    if(moduleConfig.chart.axesYOdd === true){
        yOdd = {//cuadricula... configurable
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 1
                }
            };
    }
    axesCfg.push(
        {
            type: 'Numeric',
            position: moduleConfig.chart.axesYLinePos, //configurable
            fields: moduleConfig.chart.axesYFields,
            title: moduleConfig.chart.yTitle, //configurable
            grid: moduleConfig.chart.axesYGrid,
            grid: xOdd,
            label: {
                renderer: function(v) {
                    return moduleConfig.chart.yLabelPreffix + v + moduleConfig.chart.yLabelSuffix;
                }
            },
            //grid: true,
            minimum: 0,
            adjustMinimumByMajorUnit: 0
        }, {
            type: 'Category',
            position: moduleConfig.chart.axesXLinePos,
            fields: moduleConfig.chart.axesXFields,
            title: moduleConfig.chart.xTitle,
            grid: moduleConfig.chart.axesXGrid,
            grid: yOdd,
            label: {
                rotate: {
                    degrees: 315
                },
                renderer: function(v) {
                    if (v.length > moduleConfig.chart.xLabelLength) {
                        return v.substring(0, moduleConfig.chart.xLabelLength) + '...';
                    } else {
                        return v;
                    }
                }
            }
        }   
    )
}

Ext.define('LoadPrincipal.view.Generics.Chart', {
    extend: 'Ext.chart.Chart',
    alias: 'widget.' + AppGlobals.chartAlias,
    id: AppGlobals.chartId,
    layout: 'fit',
    height: '100%',
    margin: '0, 5, 0, 5',
    animate: true,
    theme: 'Category1',
    title: 'Charts example', //configurable
    store: store1,
    legend: {
        position: 'top' //configurable
    },
    
    title: moduleConfig.listTitle,
    initComponent: function() {
        this.dockedItems = [
            {
                dock: 'bottom',
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        store: this.store,
                        displayInfo: true,
                        displayMsg: 'Registros {0} - {1} de {2}',
                        emptyMsg: 'No hay información',
                        items: moduleConfig.chart.bottomButtons
                    }
                ]
            }
        ];
        this.callParent();
    },
    axes: axesCfg,    
    series: moduleConfig.chart.series
//            [
//        {
//            type: 'column',
//            highlight: {
//                size: 7,
//                radius: 7
//            },
//            fill: false, 
//            axis: 'left',
//            xField: 'name',
//            yField: 'data1',
//            markerCfg: {
//                type: 'cross',
//                size: 4,
//                radius: 4,
//                'stroke-width': 0
//            },
//            style: {
//                fill: "#000",
//                stroke: "#555"
//            },
//            tips: {
//                trackMouse: true,
//                style: 'background: #e3e3e3',
//                height: 40,
//                width: 200,
//                renderer: function(storeItem, item) {     
//                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get(item.series.yField));
//                }
//            }
//        },
//        {
//            type: 'scatter',
//            highlight: {
//                size: 7,
//                radius: 7
//            },
//            fill: true, 
//            axis: 'left',
//            xField: 'name',
//            yField: 'data2',
//            markerCfg: {
//                type: 'cross',
//                size: 4,
//                radius: 4,
//                'stroke-width': 0
//            },
//            style: {
//                fill: "#f00",
//                stroke: "#f00"
//            },
//            tips: {
//                trackMouse: true,
//                style: 'background: #e3e3e3',
//                height: 40,
//                width: 200,
//                renderer: function(storeItem, item) {     
//                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get(item.series.yField));
//                }
//            }
//        },
//        {
//            type: 'line',
//            highlight: {
//                size: 7,
//                radius: 7
//            },
//            fill: true, 
//            axis: 'left',
//            xField: 'name',
//            yField: 'data3',
//            markerCfg: {
//                type: 'cross',
//                size: 4,
//                radius: 4,
//                'stroke-width': 0
//            },
//            style: {
//                fill: "#f00",
//                stroke: "#f00"
//            },
//            tips: {
//                trackMouse: true,
//                style: 'background: #e3e3e3',
//                height: 40,
//                width: 200,
//                renderer: function(storeItem, item) {     
//                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get(item.series.yField));
//                }
//            }
//        },
//        {
//            type: 'area',
//            highlight: true,
//            axis: 'left',
//            xField: 'name',
//            yField: ['data1','data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
//            style: {
//                opacity: 0.93
//            },
//            
//        },
//        {
//            type: 'pie',
//            donut: 35,
//            field: 'data1',
//            showInLegend: true,
//            highlight: {
//                segment: {
//                    margin: 20
//                }
//            },
//            label: {
//                field: 'name',
//                display: 'rotate',
//                contrast: true,
//                font: '18px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'
//            },
//            animate: true
//        }
//    ]

});