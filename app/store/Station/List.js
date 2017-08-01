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
/**
 * The store make generics server callings according the provided params,  all record fills specific controls
 * like grids, trees, combobo
 * @param (String) jsonObj this is a json and contains all query options (filters, limits, fields, etc)
 */   
Ext.define('LoadPrincipal.store.Station.List', {
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