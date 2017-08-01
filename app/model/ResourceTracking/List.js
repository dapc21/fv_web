/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate
 * data use convert() function
 *
 */
Ext.define('LoadPrincipal.model.ResourceTracking.List', {
    extend: 'Ext.data.Model',
    fields: [
      {name: '_id', type: 'auto' },
      {name: 'deviceData',      type: 'auto'},
      {name: 'resourceInstance',        type: 'auto'},
      {name: 'latitude',        type: 'float'},
      {name: 'longitude',       type: 'float'},
      {name: 'address',         type: 'string'},
      {name: 'odometer',        type: 'int'},
      {name: 'distance',        type: 'int'},
      {name: 'totalDistance',   type: 'int'},
      {name: 'login',           type: 'string',  mapping: 'resourceInstance.login' },
      {name: 'resourceId',      type: 'string',  mapping: 'resourceInstance._id' },
      {name: 'updateTime',      type: 'string',  mapping:'updateTime'},
      {name: 'speed',           type: 'int',     mapping:'speed'},
      {name: 'Ecumonitor',      type: 'int',     mapping:'deviceData.Ecumonitor.RPM'},
      {name: 'Probe',           type: 'int',     mapping:'deviceData.Probe.levelGasTank'},
      {name: 'GPS',             type: 'string',  mapping:'deviceData.GPS.ignitionStatus'},
      {name: 'status',          type: 'string',  mapping:'resourceInstance.customStatus'},
      {name: 'PassangerSensor', type: 'string',  mapping:'deviceData.PassangerSensor.status' },
      {name: 'Trailer',         type: 'string',  mapping:'deviceData.Trailer.status'},
      {name: 'PanicButton',     type: 'string',  mapping:'deviceData.PanicButton.status'},
      {
        name: 'isGPRS',          
        type: 'string',
        convert:function(val, record)
        {
            return (!Ext.isEmpty(val) && val)? 'GSM' : 'Satellite';
        }
      },
      {name: 'heading', type: 'string',
          convert:function(val,record){
              if(val>=0 && val<45){
                return 'Norte';
              } else if (val>=45 && val<90){
                return 'Noreste';
              } else if (val>=90 && val<135){
                return 'Este';
              } else if (val>=135 && val<180){
                return 'Sureste';
              } else if (val>=180 && val<225){
                return 'Sur';
              } else if (val>=225 && val<270){
                return 'Suroeste';
              } else if (val>=270 && val<315){
                return 'Oeste'
              } else if (val>=315 && val<360){
                return 'Noroeste'
              }
          }
      }
    ],
    idProperty: '_id'
});
