Ext.define('LoadPrincipal.model.Station2.List', {
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
            	 convert: function(value, record){
                        return "<img src='"+moduleConfig.serviceUploadPath+value+"' width=50/>";
            	 }
        }
    ],
         idProperty: 'id_station'
});