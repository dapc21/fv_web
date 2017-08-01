/**
 * The model contain a specific mapping and data transformation to stores requesting for services, to manipulate 
 * data use convert() function
 * 
 */
Ext.define('LoadPrincipal.model.MapMix.List', {
    extend: 'Ext.data.Model',
    fields: [
        'id_station', 
        'ip_address', 
        'ip_address_backup', 
        'name', 
        'address', 
        'transftype.name', 
        'district', 
        'neighbourhood', 
        'stationzone.zone',
        'stationstatus.status',
        'stationstatus.id_station_status',
        'distribution_center',
        'business_name_owner',
        'name_owner',
        'name_contact',
        'rut_owner',
        'nit_owner',
        'telephone_contact',
        'celular_contact',
        'email_contact',
        'business_name_owner',
        'name_administrator',
        'last_name_administrator',
        'telephone_administrator',
        'celular_administrator',
        'email_administrator',
        'name_responsible',
        'last_name_responsible',
        'telephone_responsible',
        'celular_responsible',
        'email_responsible',
        {name: 'image', type: 'string',
                /**
                 * Convert the current value according a evaluation
                 * @param {String} value
                 * @param {Array} record
                 * @returns {String}
                 */
            	 convert: function(value, record){
                        return "<img src='"+moduleConfig.serviceUploadPath+value+"' width=50/>";
            	 }
        }
    ],
         idProperty: 'id_station'
});