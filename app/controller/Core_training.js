Ext.Ajax.on('requestcomplete', function (conn, responseObject) {
    var json_respuesta = responseObject.responseText;
    try {
        var datarecibido =  Ext.JSON.decode(json_respuesta);
        if (datarecibido.error === true && datarecibido.msg == 'SESION NO VALIDA') {
            window.open("login/login.php", "_parent");
        }
        if (datarecibido.error === true && datarecibido.msg == 'No tiene privilegios.') {
            window.open("login/logout.php", "_parent");
        }
        if (datarecibido.error === true && datarecibido.msg != 'SESION NO VALIDA') {
            Ext.MessageBox.show({
                title: 'Informaci\xf3n',
                msg: "Atenci\xf3n: " + datarecibido.msg+'<br/><br/>',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
        }
    } catch (e){
        Ext.MessageBox.show({
            title: 'Informaci\xf3n',
            msg: 'La respuesta no es un JSON v\xe1lido<br/><br/>',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
    }
});
$(document).not("#AliasTrainingFilter").click(function() {
    Ext.getCmp(AppGlobals.filterId).hide();
});
Ext.Ajax.on('requestexception', function (conn, responseObject) {
    var msg ='';
    switch(responseObject.status){
        case 401:
            msg = 'No se ha autorizado el servicio';
            break;
        case 404:
            msg = 'No se ha encontrado el servicio';
            break;
        case 500:
            msg = 'Fallo interno del servidor';
            break;
    }
    if(!responseObject.aborted && responseObject.aborted != 0 && msg !=''){
        $.loader('close');
        Ext.MessageBox.show({
            title: 'Error en el servidor',
            msg:  msg + '<br>Contacta al administrador del sistema<br/><br/>',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
        return false;
    }
});
/**
 * @class LoadPrincipal.controller.Core
 * Is a generic class, contains a lot of functions to be used in modules, every class must be extended of this
 * @author John Jimenez
 * @date last modification 16-07-2015
 */

Ext.define('LoadPrincipal.controller.Core', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
    ],
    require: [
    ],
    views: [
        AppGlobals.templates + '.' + moduleConfig.template[0].toUpperCase() + moduleConfig.template.slice(1),
//        AppGlobals.templates + '.Grid',
//        AppGlobals.templates + '.Chart'
    ],
    refs: [
//        {ref: 'Generics.List', selector: 'Generics.List'}
    ],
    init: function () {
    },
    postInit: function () {
        var list = AppGlobals.listAlias;
        this.control({
            list: {
                itemcontextmenu: this.listContextualMenu
            }
        });
    },
    /**
     * Provides a basic viewport to be rendered and include it a specÃ­fic template
     * @param {String} template
     *
     */
    render: function (template) {
        moduleConfig.commponents='';
        var viewAlias = AppGlobals[template +'Alias'];
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                    layout: {
                        type: 'border'
                    },
                    items: [
                        {
                            region: 'north', // center region is required, no width/height specified
                            xtype: 'panel',
                            layout: 'fit',
                            border: false,
                            width: '100%',
                            height: 40,
                            html: '<div id="connectionAlert" class="alert alert-danger fade alert-dismissable text-center">            <p><b>Atención</b>, se ha perdido la conexión con el servidor en breve se realizará un nuevo intento.</p>      </div>',
                            contentEl: 'content',
                        },
                        {
                            region: 'center', // center region is required, no width/height specified
                            xtype: 'panel',
                            layout: 'fit',
                            border: false,
                            width: '100%',
                            autoHeight: true,
                            margin: '5 5 5 5',
                            items: [
                                {
//                                    xtype: 'AliasAuditFormCenter'
                                    xtype: viewAlias
                                }
                            ]
                        }


                    ]

                }
            ]
        });
    },
    loadSystem: function (menuFile) {
//        $("#content").html('<div class="scroller-inner">                        <!-- Top Navigation -->                        <div class="content clearfix">                            <div class="block block-40 clearfix">                                <p><a href="#" id="trigger" class="menu-trigger">Movilidad ElÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ctrica CODENSA</a></p>                            </div>                        </div>                    </div><!-- /scroller-inner -->');
//
//        $('#content').show(0);

    },
    /**
     * Generate a toolbar in Generic grid and push diferenti kind of buttons and menus from moduleConfig object
     * @param {String} suffix
     */
    addListButtons: function(suffix){
      suffix = (suffix == undefined) ? '' : suffix ;
      var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });
        if(moduleConfig.grid.searchField === true){
            toolbar.add(
                {
                    xtype: 'textfield',
                    id: moduleConfig.grid.searchId + suffix,
                    emptyText: moduleConfig.grid.searchTitle,
                    enableKeyEvents: true,
                    margin: '5 5 5 5',
                    width: '50%',
                    columnWidth: 1
                },
//                {
//                    xtype: 'form',
//                    id: AppGlobals.filterId,
//                    floating: true,
//                    hidden: true,
//                    emptyText: moduleConfig.grid.searchTitle,
//                    enableKeyEvents: true,
//                    margin: '25 5 5 5',
//                    padding: '5 5 5 5',
//                    width: '47.5%',
//                    title: 'Filtros Avanzados',
////                    height: '100%',
////                    layout: 'column',
//                    cls: 'filter-panel',
//                    align: 'left',
//                    items: moduleConfig.filterForm,
//                    buttons : moduleConfig.filterButtons,
//                    tools: [{
//                        id: 'close',
//                        handler: function(e, toolEl, panel, tc){
//                            Ext.getCmp(AppGlobals.filterId).hide({type: 'slide', direction: 'down'});
//                            LoadPrincipal.view.globalVars.someVar.hide();
//                            Ext.getCmp('advancedFilter').toggle = true;
//                        }
//                    }],
//                    columnWidth: 1
//                },
//                {
//                    xtype: 'button',
//                    iconCls: 'advanced-button',
//                    cls: 'advanced-filter',
//                    tooltip: 'Expandir los filtros avanzados.',
//                    fieldName: moduleConfig.grid.searchId + suffix,
//                    margin: '0 0 0 -10',
//                    toggle: true,
//                    id: 'advancedFilter',
//                    action: 'advancedFilter'
//                },
                {
                    xtype: 'button',
                    iconCls: 'cancel-button',
                    tooltip: 'Elimina el filtro por el texto ingresado.',
                    fieldName: moduleConfig.grid.searchId + suffix,
//                    clearAllFilters: true,
//                    margin: '20 6 6 3',
                    cls: 'x-btn-default-small',
                    action: 'clearFilter'
                }
            );
        }
        toolbar.add('->')
        var buttons = moduleConfig.grid.topButtons;
        $.each(moduleConfig.grid.topButtons, function(index, value) {
            var subitem = [];
            if (value.submenu == true) {
                $.each(value.items, function(subindex, subvalue) {
                    subitem[subindex] = new Ext.menu.Item({
                        text: subvalue.text,
                        value: subvalue.action,
                        action: subvalue.action,
                        id: subvalue.action+suffix,
                        iconCls: subvalue.iconCls,

                    });
                });
                var item = new Ext.button.Button({
                    text: value.text,
                    value: value.action,
                    action: value.action,
                    id: value.action+suffix,
                    iconCls: value.iconCls,
                    menu: {
                        items: subitem
                    },
                    handler: function(item) {
//                        alert("baasic")
                    }
                });
            } else {
                var item = new Ext.button.Button({
                    text: value.text,
                    value: value.action,
                    action: value.action,
                    id: value.action+suffix,
                    iconCls: value.iconCls,
                    handler: function(item) {
//                        alert("baasic")
                    }
                });
            }
            toolbar.add(item);
        });
        if(suffix && suffix!=""){
            Ext.getCmp(AppGlobals.listId+suffix).addDocked(toolbar);
        }else{
            Ext.getCmp(AppGlobals.listId).addDocked(toolbar);
        }
    },
    /**
     * Generate a toolbar in Generic grid and push diferenti kind of buttons and menus from moduleConfig object
     * @param {String} suffix
     */
    addListSubButtons: function(idList, suffix){
      suffix = (suffix == undefined) ? '' : suffix ;
      var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });
        if(moduleConfig.subgrid[idList].searchField === true){
            if(typeof(moduleConfig.subgrid[idList].customeSearch)!== 'undefined' && moduleConfig.subgrid[idList].customeSearch === true){
                toolbar.add(moduleConfig.subgrid[idList].customeSearchFields);
            }else{
                toolbar.add(
                    {
                        xtype: 'textfield',
                        id: moduleConfig.subgrid[idList].searchId + suffix,
                        emptyText: moduleConfig.subgrid[idList].searchTitle,
                        enableKeyEvents: true,
//                        margin: '5 5 5 5',
                        width: '50%',
                        columnWidth: 1
                    },

                    {
                        xtype: 'button',
                        iconCls: 'cancel-button',
                        tooltip: 'Elimina el filtro por el texto ingresado.',
                        fieldName: moduleConfig.subgrid[idList].searchId + suffix,
//                        margin: '20 6 6 3',
                        cls: 'x-btn-default-small',
                        action: 'clearFilter'
                    }
                );
            }
        }
        toolbar.add('->')
        var buttons = moduleConfig.subgrid[idList].topButtons;
        $.each(moduleConfig.subgrid[idList].topButtons, function(index, value) {
            var subitem = [];
            if (value.submenu == true) {
                $.each(value.items, function(subindex, subvalue) {
                    subitem[subindex] = new Ext.menu.Item({
                        text: subvalue.text,
                        value: subvalue.action,
                        action: subvalue.action,
                        id: subvalue.action+suffix,
                        iconCls: subvalue.iconCls,

                    });
                });
                var item = new Ext.button.Button({
                    text: value.text,
                    value: value.action,
                    action: value.action,
                    id: value.action+suffix,
                    iconCls: value.iconCls,
                    menu: {
                        items: subitem
                    },
                    handler: function(item) {
//                        alert("baasic")
                    }
                });
            } else {
                var item = new Ext.button.Button({
                    text: value.text,
                    value: value.action,
                    action: value.action,
                    id: value.action+suffix,
                    iconCls: value.iconCls,
                    handler: function(item) {
//                        alert("baasic")
                    }
                });
            }
            toolbar.add(item);
        });
        if(suffix && suffix!=""){
            Ext.getCmp(AppGlobals.listId + idList +suffix).addDocked(toolbar);
        }else{
            Ext.getCmp(AppGlobals.listId + idList).addDocked(toolbar);
        }
    },
    /**
     * Hide or show the filters panel
     * @param {type} button
     * @param {type} pressed
     * @returns {undefined}
     */
    onBlurFilters: function(button, pressed) {
        Ext.getCmp(AppGlobals.filterId).hide();
        Ext.getCmp('advancedFilter').toggle = true;
    },
    onButtonPress: function(button, pressed) {
        if(button.toggle){
            Ext.getCmp(AppGlobals.filterId).show({type: 'slide', direction: 'up'});
            Ext.getCmp(AppGlobals.filterId).setY(Ext.getCmp('advancedFilter').getY(),{
                easing: 'easeIn'
            });
//            Ext.getCmp('advancedFilter').setIconCls('advanced-close-button');
            LoadPrincipal.view.globalVars.someVar.show(AppGlobals.filterId);
            button.toggle = false;
        }else{
            Ext.getCmp(AppGlobals.filterId).hide();
            Ext.getCmp('advancedFilter').setIconCls('advanced-button');
//            LoadPrincipal.view.globalVars.someVar.hide();
            button.toggle = true;
        }
    },
    /**
     * Generate a toolbar in Generic tree and push diferenti kind of buttons and menus from moduleConfig object
     * @param {String} suffix
     */

    addTreeButtons: function(suffix){
      suffix = (suffix == undefined) ? '' : suffix ;
      var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });
        if(moduleConfig.tree.searchField === true){
            toolbar.add(
                {
                    xtype: 'textfield',
                    id: moduleConfig.tree.searchId + suffix,
                    emptyText: moduleConfig.tree.searchTitle,
                    enableKeyEvents: true,
                    margin: '5 5 5 5',
                    width: '50%',
                    columnWidth: 1
                },
                {
                    xtype: 'button',
                    iconCls: 'cancel-button',
                    tooltip: 'Elimina el filtro por el texto ingresado.',
                    fieldName: moduleConfig.tree.searchId + suffix,
                    margin: '20 6 6 3',
                    cls: 'x-btn-default-small',
                    action: 'clearFilter'
                }
            );
        }
        toolbar.add('->')
        var buttons = moduleConfig.tree.topButtons;
        $.each(moduleConfig.tree.topButtons, function(index, value) {
            var subitem = [];
            if (value.submenu == true) {
                $.each(value.items, function(subindex, subvalue) {
                    subitem[subindex] = new Ext.menu.Item({
                        text: subvalue.text,
                        value: subvalue.action,
                        action: subvalue.action,
                        id: subvalue.action+suffix,
                        iconCls: subvalue.iconCls,

                    });
                });
                var item = new Ext.button.Button({
                    text: value.text,
                    value: value.action,
                    action: value.action,
                    id: value.action+suffix,
                    iconCls: value.iconCls,
                    menu: {
                        items: subitem
                    },
                    handler: function(item) {
//                        alert("baasic")
                    }
                });
            } else {
                var item = new Ext.button.Button({
                    text: value.text,
                    value: value.action,
                    action: value.action,
                    id: value.action+suffix,
                    iconCls: value.iconCls,
                    handler: function(item) {
//                        alert("baasic")
                    }
                });
            }
            toolbar.add(item);
        });
        if(suffix && suffix!=""){
            Ext.getCmp(AppGlobals.treeId+suffix).addDocked(toolbar);
        }else{
            Ext.getCmp(AppGlobals.treeId).addDocked(toolbar);
        }
    },
    /**
     * Generate a toolbar in Generic map and push diferent kind of buttons and menus from moduleConfig object
     * @param {String} suffix
     */
    addMapButtons: function(suffix){
      suffix = (suffix == undefined) ? '' : suffix ;
      var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });
        toolbar.add();

        var buttons = moduleConfig.map.topButtons;
        $.each(moduleConfig.map.topButtons, function(index, value) {
            var subitem = [];
            if (value.submenu == true) {
                $.each(value.items, function(subindex, subvalue) {
                    subitem[subindex] = new Ext.menu.Item({
                        text: subvalue.text,
                        value: subvalue.action,
                        action: subvalue.action,
                        id: subvalue.action+suffix,
                        iconCls: subvalue.iconCls,

                    });
                });
                var item = new Ext.button.Button({
                    text: value.text,
                    value: value.action,
                    action: value.action,
                    id: value.action+suffix,
                    iconCls: value.iconCls,
                    menu: {
                        items: subitem
                    },
                    handler: function(item) {
//                        alert("baasic")
                    }
                });
            } else {
                var item = new Ext.button.Button({
                    text: value.text,
                    value: value.action,
                    action: value.action,
                    id: value.action+suffix,
                    iconCls: value.iconCls,
                    handler: function(item) {
//                        alert("baasic")
                    }
                });
            }
            toolbar.add(item);
        });
        if(suffix && suffix!=""){
            Ext.getCmp(AppGlobals.mapId+suffix).addDocked(toolbar);
        }else{
            Ext.getCmp(AppGlobals.mapId).addDocked(toolbar);
        }
    },
    /**
     * Defines a generic contextual menu in grid, set options from moduleConfig object
     *
     * @param {String} view
     * @param {Object} rec
     * @param {Object} node
     * @param {String} index
     * @param {Object} e
     * @param {String} restricted
     * @returns {Boolean}
     */
    treeContextualMenu: function (view, rec, node, index, e, restricted) {
        this.contextualMenu('tree',null,view, rec, node, index, e, restricted)
    },
    /**
     * Defines a generic contextual menu in grid, set options from moduleConfig object
     *
     * @param {String} view
     * @param {Object} rec
     * @param {Object} node
     * @param {String} index
     * @param {Object} e
     * @param {String} restricted
     * @returns {Boolean}
     */
    listContextualMenu: function (view, rec, node, index, e, restricted) {
        this.contextualMenu('grid',null,view, rec, node, index, e, restricted)
    },
    /**
     * Defines a generic contextual menu in grid, set options from moduleConfig object
     *
     * @param {String} view
     * @param {Object} rec
     * @param {Object} node
     * @param {String} index
     * @param {Object} e
     * @param {String} restricted
     * @returns {Boolean}
     */
    contextualMenu: function (type, configIdx, view, rec, node, index, e, restricted) {
        e.stopEvent();
        if(configIdx !== null){
            var base = moduleConfig[type][configIdx]
        }else{
            var base = moduleConfig[type]
        }
        var grid = view;
        var selectedRecords = grid.getSelectionModel().getSelection();
        var multipleRecords = false;

        if (selectedRecords.length > 1) {
            multipleRecords = true;
        }
        if (selectedRecords.length == 1) {
            var record = selectedRecords[0];
            moduleConfig.tmpId = record.get(base.idField);

        }
        var menu;
        menu = Ext.create('Ext.menu.Menu');
        $.each(base.contextualMenu, function (index, value) {
            var subitem = [];
            var optionDisabled = false;
            if (multipleRecords === true) {
                if (typeof value.allowMassive !== "undefined" && value.allowMassive === true) {
                    optionDisabled = false;
                } else {
                    optionDisabled = true;
                }
            }
            if(typeof restricted != "undefined" && $.inArray(value.id,restricted)>-1){
                optionDisabled = true;
            }
            if (value.submenu === true) {
                $.each(value.items, function (subindex, subvalue) {
                    if(typeof restricted != "undefined"  && $.inArray(subvalue.id,restricted)>-1){
                        optionDisabled = true;
                    }
                    subitem[subindex] = new Ext.menu.Item({
                        text: subvalue.text,
                        value: subvalue.id,
                        action: subvalue.id,
//                        id: subvalue.id,
                        iconCls: subvalue.iconCls,
                        disabled: optionDisabled,
                        handler: function (item) {
                            //                    alert("baasic")
                        }
                    });
                });
                var item = new Ext.menu.Item({
                    text: value.text,
                    value: value.id,
                    action: value.id,
                    iconCls: value.iconCls,
//                    id: value.id,
                    menu: {
                        items: subitem
                    },
                    handler: function (item) {
                        //                alert("baasic")
                    }
                });
            } else {
                var item = new Ext.menu.Item({
                    text: value.text,
                    value: value.id,
                    action: value.id,
//                    id: value.id,
                    iconCls: value.iconCls,
                    disabled: optionDisabled,
                    handler: function (item) {

                    }
                });
            }
            menu.add(item);
        });
        if (!Object.keys) {
            Object.keys = function (obj) {
                var arr = [],
                    key;
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        arr.push(key);
                    }
                }
                return arr;
            };
        }
        if(Object.keys(base.contextualMenu).length>0){
            menu.showAt(e.getXY());
        }
        return false;
    },
    /**
     * Generate tooltip accordin field in store
     */
    generateTooltips: function (thisObj, eOpts) {
        if (moduleConfig.grid.tooltip) {
            var grid = Ext.getCmp(AppGlobals.listId);
            var view = grid.getView();
            view.tip = Ext.create('Ext.tip.ToolTip', {
                target: view.el,
                delegate: view.itemSelector,
                trackMouse: true,
                renderTo: Ext.getBody(),
                listeners: {
                    beforeshow: function updateTipBody(tip) {
                        tip.update("<b>Descripci\xf3n:</b><p></p>" + view.getRecord(tip.triggerElement).get(moduleConfig.grid.tooltipField));
                    }
                }
            });
        }
    },
    /**
     * function to open basic window form
     *
     */
    openModalWindow: function (button) {
//        testerObj.storeRule({'target':'window','action':'open'});
        var win = Ext.widget(AppGlobals.windowAlias);
//        Ext.getCmp(AppGlobals.windowId).show();
        win.show();
        LoadPrincipal.view.globalVars.someVar.show(AppGlobals.windowId);
    },
    openModalSubwindow: function (id) {
//        testerObj.storeRule({'target':'window','action':'open'});
        var win = Ext.widget(AppGlobals.windowAlias + id);
//        Ext.getCmp(AppGlobals.windowId).show();
        win.show();
        LoadPrincipal.view.globalVars.someVar.show(AppGlobals.windowId + id);
    },
    /**
     * function to close window and reset form data
     */
    onFormCancel: function (button) {

        /**
         * Reset form Create Shop
         */
        var form = Ext.getCmp(AppGlobals.formId).getForm();
        form.reset();

        /**
         * Close window and hide Spotlight
         */
        LoadPrincipal.view.globalVars.someVar.hide();
        Ext.getCmp(AppGlobals.windowId).close()


    },
    /**
     * on window destroy action ... remove Spotlight
     */
    onWindowDestroy: function (e, opt) {
        LoadPrincipal.view.globalVars.someVar.hide();
    },
    /**
     * Erase the value in the field specified in the button.fieldName param,
     * if button.stores exists delete its filters,
     * if button.extraFieldsNames exists erase its value,
     * call multisearch function
     * @param {Object} button objeto presionado
     */
    clearFilter: function (button) {
        Ext.getCmp(button.fieldName).setValue('');
        if(button.clearAllFilters === true){
            this.clearFilters();
            this.onBlurFilters();
        }
        this.multiSearch();
        if(button.stores && button.stores!='' && button.stores !='null'){
            Ext.each(button.stores, function(storeName, index) {
                var store = Ext.getStore(storeName);
                var proxy = store.getProxy();
                var values = Ext.JSON.decode(proxy.extraParams.values);
                values.filter=[];
                store.proxy.extraParams = {
                    values: JSON.stringify(values)
                };
                store.reload();
            });
        }
        if(button.extrafieldsNames && button.extrafieldsNames!='' && button.extrafieldsNames !='null'){
            Ext.each(button.extrafieldsNames, function(extraName, index) {
                Ext.getCmp(extraName).setValue('');
            });
        }
    },
    /**
     * Clear all filters on the filter zone and calls multiSearch function
     * @returns {undefined}
     */
    clearFilters: function () {
        var form = Ext.getCmp(AppGlobals.filterId).getForm();
        form.reset();
        this.multiSearch();
    },
    /**
     * Generic function to save or edit data with specific json
     * @param {String} json decoded with service calling
     * @param {String} action create or update
     * @param {String} messageModule message complement
     * @param {Object} store store to be reloaded on success
     * @returns {Object}
     */
    doStore: function (json, action, messageModule, store) {
        $.loader({
            className:"blue-with-image",
            content:''
        });
        Ext.Ajax.request({
            url: moduleConfig.serviceUrl,
            method: 'POST',
            dataType: 'json',
            params: {
                values: Ext.JSON.encode(json)
            },
            success: function (responseObject) {
                $.loader('close');
//                    Ext.MessageBox.hide();
                var json_respuesta = responseObject.responseText;
                /**
                 * Valida registro del usuario
                 */

                var datarecibido =  Ext.JSON.decode(json_respuesta);
                if (datarecibido.error == false && datarecibido.msg == "OK") {
                    if (action == "create") {
                        Ext.getCmp(controller + 'FormId').setValue(datarecibido.data.reference)//establece el id insertado...
                        Ext.MessageBox.show({
                            title: 'Informaci\xf3n',
                            height: 150,
                            msg: 'Se registr\xf3 exitosamente <br/>' + messageModule+'<br/><br/>',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    } else {
                        Ext.MessageBox.show({
                            title: 'Informaci\xf3n',
                            msg: 'Se actualiz\xf3 exitosamente <br/>' + messageModule+'<br/><br/>',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO
                        });

                    }
                    LoadPrincipal.view.globalVars.someVar.hide();
                    Ext.getCmp(AppGlobals.windowId).close();
                }
                /**
                 * Refrescando store
                 */
                if(store && typeof store != undefined && store != '')store.reload();
            }
        });

    },
    /**
     *
     * @param {String} json decoded of service calling
     * @param {String} message to render when success depends fullMSg
     * @param {Object} store to be reloaded when success
     * @param {String} fullMsg bool to activate full message or show a standard message
     *  Generic function to make a http request via ajax with a specific json
     * @returns {Object}
     */
    doRequest: function (json, message, store, fullMsg) {
        var msg = (typeof fullMsg == 'undefined')?'Se han '+message+' los registros seleccionados<br/><br/>':message+'<br/><br/>';
        $.loader({
            className:"blue-with-image",
            content:''
        });
        Ext.Ajax.request({
            url: moduleConfig.serviceUrl,
            method: 'POST',
            dataType: 'json',
            params: {
                values: Ext.JSON.encode(json)
            },
            success: function (responseObject) {
                $.loader('close');
                //                    Ext.MessageBox.hide();
                var json_respuesta = responseObject.responseText;
                /**
                 * Valida registro del usuario
                 */

                var datarecibido =  Ext.JSON.decode(json_respuesta);
                if (datarecibido.error == false) {
                    moduleConfig.tmpId = 0;
                    Ext.MessageBox.show({
                        title: 'Informaci\xf3n',
                        msg: msg,
                        height: "150",
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }
                /**
                 * Refrescando store
                 */
                if(store && typeof store != undefined && store != '')store.reload();

            }
        });
    },
    /**
     *
     * @param {Object} queryPlan
     * @param (Object} eOpts
     * Function to every combobox field, autofill function on combobox typing and clear on beforequery
     * @returns {Object}
     */
    autofill: function (queryPlan, eOpts) {
        var valorquery = queryPlan.query;
        var store = queryPlan.combo.getStore();
        var proxy = store.getProxy();
        var values = Ext.JSON.decode(proxy.extraParams.values);
        if(valorquery!=''){
            if(values.filter){
                var pusheable = true;
                Ext.each(values.filter, function(value,index){
                    if(value.field == queryPlan.combo.displayField){
                        pusheable = false;
                        value.value = valorquery;
                    }

                    if(value.field == queryPlan.combo.valueField){
                        values.filter.splice(index,1);
                    }

                });
                if(pusheable){
                    values.filter.push(
                        {
                            "field":queryPlan.combo.displayField,
                            "value":valorquery,
                            "operation": "OR",
                            "comparison":"lk"
                        }
                    );
                }
            }else{
                if(valorquery!=''){
                    values.filter = [
                        {
                            "field":queryPlan.combo.displayField,
                            "value":valorquery,
                            "operation": "OR",
                            "comparison":"lk"
                        }
                    ];
                }

            }
            if(queryPlan.combo.searchables && queryPlan.combo.searchables!='' && queryPlan.combo.searchables !='null'){
                Ext.each(queryPlan.combo.searchables,function(val,index){
                    var pusheable = true;
                    Ext.each(values.filter, function(value,indexes){
                        if(value.field == val){
                            pusheable = false;
                            value.value = valorquery;
                        }
                    });
                    if(pusheable){
                        if(values.filter){
                            values.filter.push(
                                {
                                    "field":val,
                                    "value":valorquery,
                                    "operation": "OR",
                                    "comparison":"lk"
                                }
                            );
                        }
                    }
                });
            }
        }else{
//            if(queryPlan.combo.escapeBeforequeryFilter != "undefined" && queryPlan.combo.escapeBeforequeryFilter !==true){
//                values.filter =[];
//            }
//            if(queryPlan.combo.escapeBeforequeryFilter === true){
                Ext.each(values.filter, function(value,index){
                    if(typeof value == "object"){
                        if(value.field == queryPlan.combo.valueField){
                            values.filter[index].value ="";
                        }
                        if(value.field == queryPlan.combo.displayField){
                            values.filter[index].value ="";
                        }
                        if(queryPlan.combo.searchables && queryPlan.combo.searchables!='' && queryPlan.combo.searchables !='null'){
                            Ext.each(queryPlan.combo.searchables,function(val,idx){
                                if(value.field == val){
                                    values.filter[index].value ="";
                                }
                            });
                        }
                        if(queryPlan.combo.clearables && queryPlan.combo.clearables!='' && queryPlan.combo.clearables !='null'){
                            Ext.each(queryPlan.combo.clearables,function(val,idx){
                                if(value.field == val){
                                    values.filter[index].value ="";
                                }
                            });
                        }
                    }
                });
//            }
        }
        Ext.Ajax.abort(store.proxy.activeRequest);
        delete store.proxy.activeRequest;
        store.proxy.extraParams = {
            values: JSON.stringify(values)
        };
        if(!valorquery!=''){
            store.loadPage(1)
        }
    },
    /**
     * Function to dynamic call export xls service
     * @returns {Function}
     */
    exportxls: function () {
        var jsonObj = moduleConfig.exportFilter;
        jsonObj.func = moduleConfig.serviceExport;
        jsonObj.resp = 'excel';
        location.href = moduleConfig.serviceUrl+'?values='+JSON.stringify(jsonObj);
    },
    /**
     * Push new script tag to head
     * @param {string} url to push
     * @param {Function} callback
     */
    loadScript: function(url, callback){

        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState){  //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                        script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  //Others
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    },
    /**
     * Function to create component from diferent controller
     */
    loadComponent: function(name){
        moduleConfig.commponents = name;

        Ext.require(
            'app/controller.'+ name,     // this auto-loads all dependencies
            function(){
                // ... as soon as this class
                //    and all its dependencies have loaded...
                var controller = Ext.create('LoadPrincipal.app.controller.'+ name);  // create an instance
                controller.init();                                   // launch init() method
            }
        );
        var controller = Ext.create('app.controller.'+ name);  // create an instance
                controller.init();
        //at this point your controller .js file should be already loaded into the DOM
//        var c = this.getController(name); //controller will be created automatically by name in this getter
        //perform the same initialization steps as it would have during normal ExtJs process
//        c.init(this);
//        c.onLaunch(this);
    },
    message : function(title,msgText,type){
        if(typeof(type)=="undefined"){
            type = 'INFO';
        }
        Ext.MessageBox.show({
            title: title,
            msg: msgText + '<br/><br/>',
            height: "150",
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox[type]
        });
    },
    alert: function(){
        this.message('Mensaje de Verificación','Éste es un mensaje de prueba')
    },
    multiSearch : function(){

    }
});
