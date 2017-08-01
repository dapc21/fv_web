var jsonObj = new Object();
jsonObj.func = moduleConfig.serviceStationList;
jsonObj.resp = 'web';
jsonObj.limit = moduleConfig.listPageSize;
jsonObj.sort = [
    {
        property:'name',
        direction: 'desc'
    }
];
jsonObj.relations = ["chargeunits","stationstatus","stationzone","transftype","schedulestation"];
moduleConfig.exportFilter = jsonObj;
    
Ext.define('LoadPrincipal.store.Station2.List', {
    extend: 'Ext.data.Store',
    pageSize: moduleConfig.listPageSize,
    model: 'LoadPrincipal.model.Station.List',
    autoLoad: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        actionMethods: 'POST',
        url: moduleConfig.serviceUrl,
        extraParams: {
            values:JSON.stringify(jsonObj)
        },
        reader: {
            type: 'json',
            root: 'data.data',
            totalProperty: 'data.total'
        }
    },
    sorters: [{
        property: 'name',
        direction: 'DESC'
    }]
});