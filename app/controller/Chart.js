/**
 * 
 * @author John Jimenez
 * @class LoadPrincipal.controller.Chart
 * @extends LoadPrincipal.controller.Core
 * Class to manage the Chart module events
 * 
 */

Ext.define('LoadPrincipal.controller.' + controller, {
    extend: 'LoadPrincipal.controller.Core',
	models: [
//        controller + '.ListCombo',
//        controller + '.List'
    ],
    stores: [
//        controller + '.ListCombo',
//        controller + '.List'
    ],
    views:  [
			//AppGlobals.templates + '.' + moduleConfig.template[0].toUpperCase() + moduleConfig.template.slice(1),
//        controller + '.ConnectorList',
//         'Generics.WindowCreate'
			'Templates.Chart'
    ],
    refs: [],
    /**
     * @description Main function in the controller, handle de events listeners in to the form
     * 
     */
    init: function() {
        console.log('chart controller init')
//        var win;
//        var win2;
        /**
         * call index view
         */
        this.render(moduleConfig.template);
//        this.postInit();
        /**
         * Load files system basic
         */
//        this.loadSystem("menu");
//        this.addListButtons();
        /**
         * Listeners
         */
//        this.multiSearch();
        /**
         *  Control handle events of all forms, then execute a local func
         */
        this.control(
			{
                
                /**
                 * Excel
                 */
                'AliasChartList button[action=exportXls]': {
                    click: this.exportxls
                }
            }
        );
        
    },
   
    
});