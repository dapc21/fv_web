/**
* Takes an encoded URL and and converts it to an object. e.g. Ext.urlDecode("foo=1&bar=2"); would return {foo: 1, bar: 2} or Ext.urlDecode("foo=1&bar=2&bar=3&bar=4", true); would return {foo: 1, bar: [2, 3, 4]}.
* @param {String} string
* @param {Boolean} overwrite (optional) Items of the same name will overwrite previous values instead of creating an an array (Defaults to false).
* @param {Function} normalizer (optional) 
* @return {Object} A literal with members
*/
Ext.urlDecode = function(string, overwrite, normalizer){
 if(!string || !string.length){
   return {};
 }
 var obj = {};
 var pairs = string.split('&');
 var pair, name, value;
 for(var i = 0, len = pairs.length; i < len; i++){
   pair = pairs[i].split('=');
   name = decodeURIComponent(pair[0]);
   if (typeof normalizer == "function"){
     name = normalizer(name);
   }
   value = decodeURIComponent(pair[1]);
   if(overwrite !== true){
     if(typeof obj[name] == "undefined"){
       obj[name] = value;
     }else if(typeof obj[name] == "string"){
       obj[name] = [obj[name]];
       obj[name].push(value);
     }else{
       obj[name].push(value);
     }
   }else{
     obj[name] = value;
   }
 }
 return obj;
}

////Iframe con Google Street View

//Obtenemos la longuitud y la latitud
var strGetParameters = window.location.search.substring(1);
var objParameters = Ext.urlDecode(strGetParameters);
var lon = -122.45, lat = 37.76;

if(!Ext.isEmpty(objParameters)){
	
	if(!Ext.isEmpty(objParameters.lon)){
		lon = objParameters.lon;
	}
	
	if(!Ext.isEmpty(objParameters.lat)){
		lat = objParameters.lat;
	}
}

Ext.onReady(function(){
	new Ext.Viewport({
    layout: 'fit',
    items: [ 
	{
		xtype:'container',	
		renderTo: Ext.getBody(),
		layout: 'fit',
		items:[
			new gxp.GoogleStreetViewPanel({'location':new OpenLayers.LonLat(lon, lat)})
		]
	}]
});
});