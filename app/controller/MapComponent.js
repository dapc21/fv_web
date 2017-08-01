Ext.define('LoadPrincipal.controller.MapComponent', {
    extend: 'LoadPrincipal.controller.Map',
    models: [
       
    ],
    stores: [
       
    ],
    views:  [

    ],
    refs: [],
    init: function() {
        
        this.control(
            {
                /**
                 * Show te contextmenu
                 */
                'AliasMapList': {
                    itemmouseenter: this.generateTooltips,
                    itemcontextmenu: this.listContextualRestrictedMenu,
                    itemclick: this.restrictTopButtons
                },               
            }
        );
        
    },
    getStoredTable: function(){
        Ext.Ajax.request({
            url: 'getStoredTable.php',
            success: function (responseObject) {               
                var texto = responseObject.responseText;
                var table = eval('(' + texto + ')');
                if(table.tablename!='false'){
                    Ext.getCmp('map').setDisabled(false);
                    moduleConfig.layer = table.tablename;
                }
            }
        });
    },
    
    testFunc: function(button){
        console.log('mapatal')
        alert('ingresa a componente')
        this.openModalWindowLocal()
//        var obj = this;
//        this.loadScript('app/controller/Map.js',function(){
//            
//            obj.loadComponent('Map')
//        })
        
    }
    
});