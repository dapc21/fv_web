var moduleConfig = new Object();
moduleConfig.appName = 'application';
moduleConfig.theme = 'gray';
moduleConfig.template = 'TabPanel';
moduleConfig.listPageSize = 10;
moduleConfig.exportFilter = '';

var storageIdCompany = window.localStorage.getItem('id_company');
moduleConfig.services = new Object();
moduleConfig.services.urlLoadModule = strURL +'/resourcedefinitions?filters={"and":[{"field":"isSystem","comparison":"eq","value":true},{"field":"id_company","comparison":"eq","value":"'+storageIdCompany+'"}]}';
moduleConfig.services.url = strURL +'/resourceinstances';
moduleConfig.services.urlCombo = '';
moduleConfig.services.listGroupUrl = strURL +'/resourcegroups';
moduleConfig.services.urlComboRoles = strURL +'/roles';
moduleConfig.services.urlComboApplication = strURL +'/applications';
moduleConfig.services.urlComboResourcesGroup = strURL +'/resourcegroups';
moduleConfig.services.urlComboDevicesType = strURL +'/devicedefinitions';
moduleConfig.services.urlComboDevices = strURL +'/deviceinstances';
moduleConfig.services.urlComboResourcesType = strURL +'/resourcedefinitions?filters={"and":[{"field":"isSystem","comparison":"eq","value":true},{"field":"id_company","comparison":"eq","value":"'+storageIdCompany+'"}]}';
moduleConfig.services.urlComboResources = strURL +'/resourceinstances';
moduleConfig.services.urlExport = strURL + '/resourceinstances/excel';

/** NOTA: La configuracion de grids y formularios se encuentran en el controlador. **/