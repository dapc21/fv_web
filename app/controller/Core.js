Ext.Ajax.on('requestcomplete', function (conn, responseObject) 
{
    var json_respuesta = responseObject.responseText;
    
    try {
        var datarecibido =  Ext.JSON.decode(json_respuesta);
        if (datarecibido.error === true && datarecibido.msg == 'SESION NO VALIDA') {
            window.open("login/login.php", "_parent");
        }
        if (datarecibido.error === true && datarecibido.msg == 'No tiene privilegios.') {
            window.open("login/logout.php", "_parent");
        }
        if (datarecibido.error === true && datarecibido.msg == 'Token has expired') {
            window.localStorage.removeItem('id_company');
            window.localStorage.removeItem('token');
            window.location.replace(window.location.href.toString().split('?')[0]+'?m=Login');
        }
        if (datarecibido.error === true && datarecibido.msg == 'token_absent') {
            window.localStorage.removeItem('id_company');
            window.localStorage.removeItem('token');
            window.location.replace(window.location.href.toString().split('?')[0]+'?m=Login');
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
        var headersResponse = responseObject.getAllResponseHeaders(); 
        //console.log('CORE - headersResponse: ', headersResponse);
        if(Ext.isEmpty(headersResponse['content-disposition']))
        {
            Ext.MessageBox.show({
                title: 'Informaci\xf3n',
                msg: 'La respuesta no es un JSON v\xe1lido<br/><br/>',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
        }
        
    }
});

Ext.Ajax.on('requestexception', function (conn, responseObject) {
    var msg ='';
    switch(responseObject.status){
        case 400:
            //window.localStorage.removeItem('id_company');
            //window.localStorage.removeItem('token');
            //window.location.replace(window.location.href.toString().split('?')[0]+'?m=Login');
            break;
        case 401:
            if(!Ext.isEmpty(window.localStorage.getItem('token'))){
                msg = 'No se ha autorizado el servicio';
                window.localStorage.removeItem('id_company');
                window.localStorage.removeItem('token');
                window.location.replace(window.location.href.toString().split('?')[0]+'?m=Login');
            }
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
 function test(){
   var modules = moduleConfig.template.slice(1)
   for (var i = 0; i < modules.length; i++) {
     modules[i] = AppGlobals.templates + '.' + modules[i]
   }
   console.info(modules);
   return modules;
 }
Ext.define('LoadPrincipal.controller.Core', {
    extend: 'Ext.app.Controller',
    models: [
    ],
    stores: [
    ],
    require: [
    ],
    views: [
      //  test()
        AppGlobals.templates + '.' + moduleConfig.template[0].toUpperCase() + moduleConfig.template.slice(1),
		'MenuHTML'		
//        AppGlobals.templates + '.Grid',
//        AppGlobals.templates + '.Chart'
    ],
    refs: [
//        {ref: 'Generics.List', selector: 'Generics.List'}
    ],
    //INICIO - Atributos Propios
    moduleDefault: 'Login',
    //FIN - Atributos Propios
    init: function () 
    {
        //Carga genérica
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
    render: function (template) 
    {
        console.log('Template cargado: ', template);

        moduleConfig.commponents='';

        var viewAlias = AppGlobals[template +'Alias'];

        Ext.create('Ext.container.Viewport', {
            layout : 'fit',
            items  : [
                {
                    layout : {
                        type : 'border'
                    },
                    items: [
                        {
                            region     : 'center',
                            xtype      : 'panel',
                            layout     : 'fit',
                            border     : false,
                            width      : '100%',
                            autoHeight : true,
                            //margin     : '5 5 5 5', //Ojo afecta a todos los layouts, creo que es mejor que se maneje aparte
                            items      : [
                                {
                                    xtype : viewAlias
                                }
                            ]
                        },
						{
							region:'west',
							width: 61,
							xtype: 'AliasMenuHTML'
						}
                    ]
                }
            ]
        });
    },
    token : function()
    {
        return ( this.getToken() != undefined ) ? this.getToken() : this.getLogin();
    },
    getToken : function()
    {
        var token = '';
        token = window.localStorage.getItem('token');
        return token;
    }
    ,
    setToken : function(token){
        window.localStorage.setItem('token', token);
    }
    ,
    clearToken : function(){
        window.localStorage.removeItem('token');
    }
    ,
    getLogin : function(){
        var login = '';
        login = window.location.replace(window.location.href.toString().split('?')[0]+'?m=Login');
        return login;
    }
    ,
    loadSystem: function (menuFile) {
//        $("#content").html('<div class="scroller-inner">                        <!-- Top Navigation -->                        <div class="content clearfix">                            <div class="block block-40 clearfix">                                <p><a href="#" id="trigger" class="menu-trigger">Movilidad ElÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¾ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¾Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©ctrica CODENSA</a></p>                            </div>                        </div>                    </div><!-- /scroller-inner -->');
//
//        $('#content').show(0);

    }
    ,
    newWindow : function (groupId, titleWindow, widthWindow, heightWindow, resizableWindow, modalWindow, draggableWindow) {
		console.log('newWindow');
        var newWindow = new Ext.Window({
            id          : (groupId) ? groupId + 'Window': 'idWindow',
            title       : (titleWindow) ? titleWindow : 'Title Window',
            modal       : (typeof modalWindow == 'undefined') ? true : modalWindow,
            width       : (widthWindow) ? widthWindow : '70%',
            height      : (heightWindow) ? heightWindow : '70%',
            minWidth    : (widthWindow) ? widthWindow : '70%',
            minHeight   : (heightWindow) ? heightWindow : '70%',
            layout      : 'fit',
            resizable   : (resizableWindow) ? resizableWindow : false,
            draggable   : (draggableWindow) ? draggableWindow : false,
            closeAction : 'destroy',
            autoScroll  : true,
            autoDestroy : true
        });
        return newWindow;
    },
    //Ventana especial para el PopUp en PlanningTracking
    newWindowPopUp: function (groupId, titleWindow, widthWindow, heightWindow, resizableWindow, modalWindow, draggableWindow) 
    {
		console.log('newWindowPopUp');

        var objConfig = {
            id          : (groupId) ? groupId + 'Window': 'idWindow',
            title       : (titleWindow) ? titleWindow : 'Title Window',
            modal       : (typeof modalWindow == 'undefined') ? true : modalWindow,
            width       : (widthWindow) ? widthWindow : '70%',
            height      : (heightWindow) ? heightWindow : '70%',
            minWidth    : (widthWindow) ? widthWindow : '70%',
            minHeight   : (heightWindow) ? heightWindow : '70%',
            layout      : 'fit',
            resizable   : (resizableWindow) ? resizableWindow : false,
            draggable   : (draggableWindow) ? draggableWindow : false,
            closeAction : 'destroy',
            autoScroll  : true,
            autoDestroy : true,
        };

        return new Ext.Window(objConfig);
    },
    newWindowForm : function (groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, bottomButtons,modalWindow,draggableWindow) 
    {
        var windowForm = this.newWindow(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, modalWindow, draggableWindow);
        if(groupId) var widget = 'widget.Alias' + groupId;
        
        //Toolbar
        if(!Ext.isEmpty(toolbar)){
            windowForm.addDocked(
                {
                    xtype  : 'toolbar',
                    flex   : 1,
                    dock   : 'top',
                    ui     : 'footer',
                    layout : {
                        pack : 'end',
                        type : 'hbox'
                    }
                    ,
                    items : (toolbar) ? toolbar : []
                }
            );
        }
        
        //Form Panel
        windowForm.add(
            {
                xtype          : 'form',
                alias          : (groupId) ? widget : 'widget.FormWindow',
                id             : (groupId) ? groupId + 'Form' : 'FormWindow',
                frame          : false,
                autoScroll     : true,
                autoHeight     : true,
                bodyPadding    : 5,
                fieldDefaults  : {
                    labelAlign : 'top',
                    msgTarget  : 'side'
                },
                items          : (itemsForm) ? itemsForm : [{xtype : 'panel', html : '<center><span>No form created</center>'}]
            }
        );
        //BottomBar
        windowForm.addDocked(
            {
                xtype  : 'toolbar',
                flex   : 1,
                dock   : 'bottom',
                ui     : 'footer',
                layout : {
                    pack : 'end',
                    type : 'hbox'
                }
                ,
                items : (bottomButtons) ? bottomButtons : [{xtype : 'panel', html : '<center><span>No buttons created in the toolbar</center>'}]
            }
        );
        windowForm.doLayout();
        return windowForm;
    }
    ,
    newWindowGrid : function (groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, store, columns, menuItem, bottomButtons, plugins, toolbarButtons) 
    {
        toolbarButtons = toolbarButtons || [];

        var windowGrid = this.newWindow(groupId, titleWindow, widthWindow, heightWindow, resizableWindow);
        //Toolbar
        windowGrid.addDocked(
            {
                xtype  : 'toolbar',
                flex   : 1,
                dock   : 'top',
                ui     : 'footer',
                layout : {
                    pack : 'end',
                    type : 'hbox'
                }
                ,
                items : (toolbar) ? toolbar : [{xtype : 'panel', html : '<center><span>No components created in the toolbar</center>'}]
            }
        );
        
        //Grid Panel
        windowGrid.add(
            {
                xtype       : 'gridpanel',
                id          : (groupId) ? groupId + 'Grid' : 'GridWindow',
                border      : false,
                columns     : (columns) ? columns : [{text : 'No components created in the toolbar',width : '100%'}],
                store       : (store) ? store : '',
                loadMask    : true,
                autoHeight  : true,
                multiSelect : true,
                selType     : 'checkboxmodel',
                selModel    : {
                    checkOnly      : false,
                    injectCheckbox : 0
                },
                viewConfig  : {
                    forceFit            : true,
                    enableTextSelection : true,
                    listeners : {
                        refresh : function(gridview){
                            var visibleColumns = gridview.getGridColumns();
                            var lengthColumns = visibleColumns.length;
                            $('.x-grid-cell-rowbody').attr('colspan', lengthColumns);
                        }
                    }
                },
                plugins     : (plugins) ? plugins : [],
                listeners   : {
                    itemcontextmenu : function (record, item, index, e, eOpts) {
                        eOpts.stopEvent();
                        var xy = eOpts.getXY();
                        new Ext.menu.Menu({
                            items : (menuItem) ? menuItem : []
                        }).showAt(xy);
                    }
                },
                dockedItems : [{
                    xtype       : 'pagingtoolbar',
                    border      : false,
                    store       : (store) ? store : '',
                    dock        : 'bottom',
                    displayInfo : true,
                    displayMsg  : translate.global.displayMsg,
                    emptyMsg    : translate.global.emptyMsg,
                    items: toolbarButtons
                }]
            }
        );
        //BottomBar
        windowGrid.addDocked(
            {
                xtype  : 'toolbar',
                flex   : 1,
                dock   : 'bottom',
                ui     : 'footer',
                layout : {
                    pack : 'end',
                    type : 'hbox'
                }
                ,
                items : (bottomButtons) ? bottomButtons : [{xtype : 'panel', html : '<center><span>No buttons created in the toolbar</center>'}]
            }
        );
        windowGrid.doLayout();
        return windowGrid;
    },
    //
    newWindowSimpleGrid : function (groupId, titleWindow, widthWindow, heightWindow, resizableWindow, store, columns, menuItem, plugins, modalWindow, draggableWindow, topToolbar, itemsPagingToolbar) 
    {
        modalWindow = Ext.isEmpty(modalWindow)? false : modalWindow;
        draggableWindow = Ext.isEmpty(draggableWindow)? true : draggableWindow;

        itemsPagingToolbar = itemsPagingToolbar || [];
        var dockedItems = [
            {
                xtype       : 'pagingtoolbar',
                border      : false,
                store       : (store) ? store : '',
                dock        : 'bottom',
                displayInfo : true,
                displayMsg  : translate.global.displayMsg,
                emptyMsg    : translate.global.emptyMsg,
                items: itemsPagingToolbar
            }
        ];
        if(!Ext.isEmpty(topToolbar))
        {
            dockedItems.push({
                dock        : 'top',
                xtype: 'toolbar',
                items: topToolbar,
            });
        }

        var windowGrid = this.newWindow(groupId, titleWindow, widthWindow, heightWindow, resizableWindow, modalWindow, draggableWindow);
        
        //Grid Panel
        windowGrid.add(
            {
                xtype       : 'gridpanel',
                id          : (groupId) ? groupId + 'Grid' : 'GridWindow',
                border      : false,
                columns     : (columns) ? columns : [{text : 'No components created in the toolbar', width : '100%'}],
                store       : (store) ? store : '',
                loadMask    : true,
                autoHeight  : true,
                multiSelect : true,
                selType     : 'checkboxmodel',
                selModel    : {
                    checkOnly      : false,
                    injectCheckbox : 0
                },
                viewConfig: {
                    forceFit: true,
                    enableTextSelection: true,
                    listeners: 
                    {
                        refresh: function(dataview) 
                        {
                            var columns = dataview.panel.columnManager.getColumns();

                            Ext.each(
                                columns, 
                                function(column, index) 
                                {
                                    if (column.autoSizeColumn === true)
                                    {   
                                        try {
                                            column.autoSize();    
                                        } catch (error) {
                                            //console.log('Error:', error);
                                        }
                                    }
                                }
                            );
                        }
                    }
                },
                plugins     : (plugins) ? plugins : [],
                listeners   : {
                    itemcontextmenu : function (thisGrid, record, item, index, event, eOpts)
                    {
                        event.stopEvent();
                        var xy = event.getXY();
                        new Ext.menu.Menu({
                            items : (menuItem) ? menuItem : [],
                            record : record,
                        }).showAt(xy);
                    }
                },
                dockedItems : dockedItems
            }
        );
        
        windowGrid.doLayout();
        
        return windowGrid;
    },
    newWindowFormGrid : function (groupId, titleWindow, widthWindow, heightWindow, resizableWindow, toolbar, itemsForm, toolbarGrid, store, columns, menuitem, bottomButtons) {
        var windowFormGrid = this.newWindow(groupId, titleWindow, widthWindow, heightWindow, resizableWindow);
        if(groupId) var widget = 'widget.Alias' + groupId;
        //Toolbar
        windowFormGrid.addDocked(
            {
                xtype  : 'toolbar',
                flex   : 1,
                dock   : 'top',
                ui     : 'footer',
                layout : {
                    pack : 'end',
                    type : 'hbox'
                }
                ,
                items : (toolbar) ? toolbar : [{xtype : 'panel', html : '<center><span>No components created in the toolbar</center>'}]
            }
        );
        //Form Panel
        var form = windowFormGrid.add(
            {
                xtype          : 'form',
                alias          : (groupId) ? widget : 'widget.FormWindow',
                id             : (groupId) ? groupId + 'Form' : 'FormWindow',
                frame          : false,
                autoScroll     : true,
                autoHeight     : true,
                bodyPadding    : 5,
                fieldDefaults  : {
                    labelAlign : 'top',
                    msgTarget  : 'side'
                },
                items          : (itemsForm) ? itemsForm : [{xtype : 'panel', html : '<center><span>No form created</center>'}]
            }
        );
        //Grid Panel
        form.add(
            {
                xtype       : 'gridpanel',
                id          : (groupId) ? groupId + 'Grid' : 'GridWindow',
                border      : false,
                columns     : (columns) ? columns : [{text : 'No components created in the toolbar', width : '100%'}],
                store       : (store) ? store : '',
                loadMask    : true,
                height      : '100%',
                minHeight   : '100%',
                multiSelect : true,
                selType     : 'checkboxmodel',
                selModel    : {
                    checkOnly      : false,
                    injectCheckbox : 0
                },
                viewConfig  : {
                    forceFit            : true,
                    enableTextSelection : true
                },
                listeners: {
                    itemcontextmenu : function (record, item, index, e, eOpts) {
                        eOpts.stopEvent();
                        var xy = eOpts.getXY();
                        new Ext.menu.Menu({
                            items : (menuItem) ? menuItem : []
                        }).showAt(xy);
                    }
                },
                dockedItems : [{
                    xtype      : 'toolbar',
                    border     : false,
                    items      : (toolbarGrid) ? toolbarGrid : []
                }
                ,
                {
                    xtype       : 'pagingtoolbar',
                    border      : false,
                    store       : (store) ? store : '',
                    dock        : 'bottom',
                    displayInfo : true,
                    displayMsg  : translate.global.displayMsg,
                    emptyMsg    : translate.global.emptyMsg
                }]
            }
        );
        form.doLayout();
        //BottomBar
        windowFormGrid.addDocked(
            {
                xtype  : 'toolbar',
                flex   : 1,
                dock   : 'bottom',
                ui     : 'footer',
                layout : {
                    pack : 'end',
                    type : 'hbox'
                }
                ,
                items : (bottomButtons) ? bottomButtons : [{xtype : 'panel', html : '<center><span>No buttons created in the toolbar</center>'}]
            }
        );
        windowFormGrid.doLayout();
        return windowFormGrid;
    }
    ,
    /**
     * Generate a toolbar in Generic grid and push diferenti kind of buttons and menus from moduleConfig object
     * @param {String} suffix
     */
    addListButtons: function(suffix)
    {
      suffix = (Ext.isEmpty(suffix))? '' : suffix;
      
      var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });

        if(moduleConfig.grid.searchField === true)
        {
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
                {
                    xtype: 'button',
                    iconCls: 'cancel-button',
                    tooltip: 'Elimina el filtro por el texto ingresado.',
                    fieldName: moduleConfig.grid.searchId + suffix,
                    cls: 'x-btn-default-small',
                    action: 'clearFilter'
                }
            );
        }

        toolbar.add('->');

        var buttons = moduleConfig.grid.topButtons;
        Ext.each(
            buttons, 
            function(value, index) 
            {
                var subitem = [];
                if (value.submenu == true) 
                {
                    Ext.each(value.items, function(subvalue, subindex) {
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
                } 
                else 
                {
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
            }
        );
        
        //Soporte para que puedan agregar combos en el topButtons
        if(!Ext.isEmpty(moduleConfig.grid.topCombos))
        {
            Ext.each(
                moduleConfig.grid.topCombos, 
                function(value, index) 
                {
                    var item = new Ext.form.field.ComboBox(value);
                    toolbar.add(item);
                }
            );
        }
        
        if(!Ext.isEmpty(suffix))
        {
            Ext.getCmp(AppGlobals.listId + suffix).addDocked(toolbar);
        }
        else
        {
            Ext.getCmp(AppGlobals.listId).addDocked(toolbar);
        }
    },
    /**
     * Generate a toolbar in Generic grid and push diferenti kind of buttons and menus from moduleConfig object
     * @param {String} suffix
     */
    addListSubButtons: function(idList, suffix)
    {
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
      var map;
      if(suffix && suffix!=""){
          map = Ext.getCmp(AppGlobals.mapId+suffix);
      }else{
          map = Ext.getCmp(AppGlobals.mapId);
      }

      var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });
        toolbar.add();

        // style the sketch fancy
             var sketchSymbolizers = {
                 "Point": {
                     pointRadius: 4,
                     graphicName: "square",
                     fillColor: "white",
                     fillOpacity: 1,
                     strokeWidth: 1,
                     strokeOpacity: 1,
                     strokeColor: "#333333"
                 },
                 "Line": {
                     strokeWidth: 3,
                     strokeOpacity: 1,
                     strokeColor: "#666666",
                     strokeDashstyle: "dash"
                 },
                 "Polygon": {
                     strokeWidth: 2,
                     strokeOpacity: 1,
                     strokeColor: "#666666",
                     fillColor: "#848484",
                     fillOpacity: 0.3
                 }
             };
             var style = new OpenLayers.Style();
             style.addRules([
                 new OpenLayers.Rule({symbolizer: sketchSymbolizers})
             ]);
             var styleMap = new OpenLayers.StyleMap({"default": style});

            function handleMeasurements(event) {
                   var geometry = event.geometry;
                   var units = event.units;
                   var order = event.order;
                   var measure = event.measure;
                   var element = document.getElementById('output');
                   var out = "";
                   if(order == 1) {
                       out += translate.global.map.mesure + measure.toFixed(3) + " " + units;
                   } else {
                       out += translate.global.map.mesure + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
                   }
                //   element.innerHTML = out;

                   map.setTitle(moduleConfig.map.title);
                   map.setTitle(map.title+' '+out);
            };
            var ctrl, toolbarItems = [], action, actions = {};
            var layers = map.map.layers;

            // ZoomToMaxExtent control, a "button" control
            action = Ext.create('GeoExt.Action', {
                control: new OpenLayers.Control.ZoomToMaxExtent(),
                map: map.map,
                text: translate.global.map.maxExtent,
                tooltip: translate.global.map.maxExtentTooltip
            });
            actions["max_extent"] = action;
          //  toolbarItems.push(Ext.create('Ext.button.Button', action));
          //  toolbarItems.push("-");

            // Navigation control and DrawFeature controls
            // in the same toggle group
            action = Ext.create('GeoExt.Action', {
                text: translate.global.map.navigate,
                control: new OpenLayers.Control.Navigation(),
                map: map.map,
                // button options
                toggleGroup: "draw",
                allowDepress: false,
                pressed: true,
                tooltip: translate.global.map.navigateTooltip,
                // check item options
                group: "draw",
                checked: true
            });
            actions["nav"] = action;
          //  toolbarItems.push(Ext.create('Ext.button.Button', action));

            action = Ext.create('GeoExt.Action', {
                text: translate.global.map.mesureArea,
                control:  new OpenLayers.Control.Measure(
                  OpenLayers.Handler.Polygon, {
                      persist: true,
                      handlerOptions: {
                          layerOptions: {
                              styleMap: styleMap
                          }
                      }

                  }
                ),
                map: map.map,
                // button options
                toggleGroup: "draw",
                allowDepress: false,
                tooltip: translate.global.map.mesureAreaTooltip,
                // check item options
                group: "draw"
            });
            actions["draw_poly"] = action;
            action.control.events.on({
                "measure": handleMeasurements,
                "measurepartial": handleMeasurements
            });

            action = Ext.create('GeoExt.Action', {
                text: translate.global.map.mesureDistance,
                control: new OpenLayers.Control.Measure(
                    OpenLayers.Handler.Path, {
                        persist: true,
                        handlerOptions: {
                            layerOptions: {
                                styleMap: styleMap
                            }
                        }
                    }
                ),
                map: map.map,
                // button options
                toggleGroup: "draw",
                allowDepress: false,
                tooltip: translate.global.map.mesureDistanceTooltip,
                // check item options
                group: "draw"
            });
            actions["draw_line"] = action;
            action.control.events.on({
                "measure": handleMeasurements,
                "measurepartial": handleMeasurements
            });
        //    toolbarItems.push(Ext.create('Ext.button.Button', action));
          //  toolbarItems.push("-");

            // SelectFeature control, a "toggle" control
            action = Ext.create('GeoExt.Action', {
                text: translate.global.map.selectFeature,
                control: new OpenLayers.Control.SelectFeature(layers, {
                    type: OpenLayers.Control.TYPE_TOGGLE,
                    hover: true
                }),
                map: map.map,
                // button options
                enableToggle: true,
                tooltip: translate.global.map.selectFeatureTooltip
            });
            actions["select"] = action;
          //  toolbarItems.push(Ext.create('Ext.button.Button', action));
          //  toolbarItems.push("-");

            // Navigation history - two "button" controls
            ctrl = new OpenLayers.Control.NavigationHistory();
            map.map.addControl(ctrl);

            action = Ext.create('GeoExt.Action', {
                text: translate.global.map.previous,
                control: ctrl.previous,
                disabled: true,
                tooltip: translate.global.map.previousTooltip
            });
            actions["previous"] = action;
          //  toolbarItems.push(Ext.create('Ext.button.Button', action));

            action = Ext.create('GeoExt.Action', {
                text: translate.global.map.next,
                control: ctrl.next,
                disabled: true,
                tooltip: translate.global.map.nextTooltip
            });
            actions["next"] = action;
        //    toolbarItems.push(Ext.create('Ext.button.Button', action));
          //  toolbarItems.push("->");

            // Reuse the GeoExt.Action objects created above
            // as menu items
            toolbarItems.push({
                text: "Opciones del Mapa",
                menu: Ext.create('Ext.menu.Menu', {
                    items: [
                        // ZoomToMaxExtent
                        Ext.create('Ext.button.Button', actions["max_extent"]),
                        // Nav
                        Ext.create('Ext.menu.CheckItem', actions["nav"]),
                        // Draw poly
                        Ext.create('Ext.menu.CheckItem', actions["draw_poly"]),
                        // Draw line
                        Ext.create('Ext.menu.CheckItem', actions["draw_line"]),
                        // Select control
                        Ext.create('Ext.menu.CheckItem', actions["select"]),
                        // Navigation history control
                        Ext.create('Ext.button.Button', actions["previous"]),
                        Ext.create('Ext.button.Button', actions["next"])
                    ]
                }),
                handler: function(item,e){
                  map.setTitle(moduleConfig.map.title);
                }
            });

            toolbar.add(toolbarItems);
            toolbar.add('->');

            //////////////// FIN ToolbarItems

        if(typeof moduleConfig.map.toolbarField != 'undefined'){
          $.each(moduleConfig.map.toolbarField, function(index, value) {
              toolbar.add(value);
          });
        }


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
        map.addDocked(toolbar);
    },
    /**
     * Generate a toolbar in Generic map and push diferent kind of buttons and menus from moduleConfig object
     * @param {String} suffix
     */
    addMapSubButtons: function(mapId, suffix)
    {
        suffix = Ext.isEmpty(suffix)? '' : suffix;
        var map = Ext.getCmp(AppGlobals.mapId + mapId + suffix);
        var toolbar = new Ext.Toolbar({
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            defaultAlign: 'left',
        });

        var sketchSymbolizers = {
            "Point": {
                pointRadius: 4,
                graphicName: "square",
                fillColor: "white",
                fillOpacity: 1,
                strokeWidth: 1,
                strokeOpacity: 1,
                strokeColor: "#333333"
            },
            "Line": {
                strokeWidth: 3,
                strokeOpacity: 1,
                strokeColor: "#666666",
                strokeDashstyle: "dash"
            },
            "Polygon": {
                strokeWidth: 2,
                strokeOpacity: 1,
                strokeColor: "#666666",
                fillColor: "#848484",
                fillOpacity: 0.3
            }
        };
        var style = new OpenLayers.Style();
        style.addRules([
            new OpenLayers.Rule({symbolizer: sketchSymbolizers})
        ]);
        var styleMap = new OpenLayers.StyleMap({"default": style});

        function handleMeasurements(event)
        {
               var geometry = event.geometry;
               var units = event.units;
               var order = event.order;
               var measure = event.measure;
               var element = document.getElementById('output');
               var out = "";
               if(order == 1) {
                   out += translate.global.map.mesure + measure.toFixed(3) + " " + units;
               } else {
                   out += translate.global.map.mesure + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
               }
            //   element.innerHTML = out;

               map.setTitle(moduleConfig.submap[mapId].title);
               map.setTitle(map.title+' '+out);
        }

        var ctrl, toolbarItems = [], action, actions = {};
        var layers = map.map.layers;

        // ZoomToMaxExtent control, a "button" control
        action = Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map.map,
            text: translate.global.map.maxExtent,
            tooltip: translate.global.map.maxExtentTooltip
        });
        actions["max_extent"] = action;
      //  toolbarItems.push(Ext.create('Ext.button.Button', action));
      //  toolbarItems.push("-");

        // Navigation control and DrawFeature controls
        // in the same toggle group
        action = Ext.create('GeoExt.Action', {
            text: translate.global.map.navigate,
            control: new OpenLayers.Control.Navigation(),
            map: map.map,
            // button options
            toggleGroup: "draw",
            allowDepress: false,
            pressed: true,
            tooltip: translate.global.map.navigateTooltip,
            // check item options
            group: "draw",
            checked: true
        });
        actions["nav"] = action;
      //  toolbarItems.push(Ext.create('Ext.button.Button', action));

        action = Ext.create('GeoExt.Action', {
            text: translate.global.map.mesureArea,
            control:  new OpenLayers.Control.Measure(
              OpenLayers.Handler.Polygon, {
                  persist: true,
                  handlerOptions: {
                      layerOptions: {
                          styleMap: styleMap
                      }
                  }

              }
            ),
            map: map.map,
            // button options
            toggleGroup: "draw",
            allowDepress: false,
            tooltip: translate.global.map.mesureAreaTooltip,
            // check item options
            group: "draw"
        });
        actions["draw_poly"] = action;
        action.control.events.on({
            "measure": handleMeasurements,
            "measurepartial": handleMeasurements
        });

        action = Ext.create('GeoExt.Action', {
            text: translate.global.map.mesureDistance,
            control: new OpenLayers.Control.Measure(
                OpenLayers.Handler.Path, {
                    persist: true,
                    handlerOptions: {
                        layerOptions: {
                            styleMap: styleMap
                        }
                    }
                }
            ),
            map: map.map,
            // button options
            toggleGroup: "draw",
            allowDepress: false,
            tooltip: translate.global.map.mesureDistanceTooltip,
            // check item options
            group: "draw"
        });
        actions["draw_line"] = action;
        action.control.events.on({
            "measure": handleMeasurements,
            "measurepartial": handleMeasurements
        });
    //    toolbarItems.push(Ext.create('Ext.button.Button', action));
      //  toolbarItems.push("-");

        // SelectFeature control, a "toggle" control
        action = Ext.create('GeoExt.Action', {
            text: translate.global.map.selectFeature,
            control: new OpenLayers.Control.SelectFeature(layers, {
                type: OpenLayers.Control.TYPE_TOGGLE,
                hover: true
            }),
            map: map.map,
            // button options
            enableToggle: true,
            tooltip: translate.global.map.selectFeatureTooltip
        });
        actions["select"] = action;
      //  toolbarItems.push(Ext.create('Ext.button.Button', action));
      //  toolbarItems.push("-");

        // Navigation history - two "button" controls
        ctrl = new OpenLayers.Control.NavigationHistory();
        map.map.addControl(ctrl);

        action = Ext.create('GeoExt.Action', {
            text: translate.global.map.previous,
            control: ctrl.previous,
            disabled: true,
            tooltip: translate.global.map.previousTooltip
        });
        actions["previous"] = action;
      //  toolbarItems.push(Ext.create('Ext.button.Button', action));

        action = Ext.create('GeoExt.Action', {
            text: translate.global.map.next,
            control: ctrl.next,
            disabled: true,
            tooltip: translate.global.map.nextTooltip
        });
        actions["next"] = action;
    //    toolbarItems.push(Ext.create('Ext.button.Button', action));
      //  toolbarItems.push("->");

        // Reuse the GeoExt.Action objects created above
        // as menu items
        toolbarItems.push({
            text: "Opciones del Mapa",
            menu: Ext.create('Ext.menu.Menu', {
                items: [
                    // ZoomToMaxExtent
                    Ext.create('Ext.button.Button', actions["max_extent"]),
                    // Nav
                    Ext.create('Ext.menu.CheckItem', actions["nav"]),
                    // Draw poly
                    Ext.create('Ext.menu.CheckItem', actions["draw_poly"]),
                    // Draw line
                    Ext.create('Ext.menu.CheckItem', actions["draw_line"]),
                    // Select control
                    Ext.create('Ext.menu.CheckItem', actions["select"]),
                    // Navigation history control
                    Ext.create('Ext.button.Button', actions["previous"]),
                    Ext.create('Ext.button.Button', actions["next"])
                ]
            }),
            handler: function(item, e)
            {
                map.setTitle(moduleConfig.submap[mapId].title);
            }
        });
        toolbar.add(toolbarItems);
        toolbar.add('->');

        //////////////// FIN ToolbarItems

        if(typeof moduleConfig.submap[mapId].toolbarField != 'undefined'){
          $.each(moduleConfig.submap[mapId].toolbarField, function(index, value) {
              toolbar.add(value);
          });
        }


        var buttons = moduleConfig.submap[mapId].topButtons;
        $.each(
            moduleConfig.submap[mapId].topButtons, 
            function(index, value) 
            {
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
                    var confButton = {
                        text: value.text,
                        value: value.action,
                        action: value.action,
                        id: value.action + suffix,
                        iconCls: value.iconCls,
                        //handler: function(item) {}
                    };

                    if(!Ext.isEmpty(value.enableToggle))
                        confButton['enableToggle'] = value.enableToggle;

                    if(!Ext.isEmpty(value.tooltip))
                        confButton['tooltip'] = value.tooltip;
                    
                    var item = new Ext.button.Button(confButton);
                }
                toolbar.add(item);
            });
        map.addDocked(toolbar);
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
    itemClick: function (type, configIdx,view, rec, node, index, e, restricted) {
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
    },
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
    //
    multiSearch : function()
    {

    },
    //Carga los iconos a utilizar (Revisar que se pase por referencia)
    onLoadMapIcons: function(objIcons)
    {
        console.log('Generando los iconos utilizados en los marcadores');
        
        var strUrlBase = objIcons.urlBase; 

        //Estandar archivo: {URL Base}/{type}/{status}_{color}.png -- lowerCamelCase
        //Estandar propiedad icons: {type}_{status} -- lowerCamelCase
        for (var i = 0; i < globalIconsTypes.length; i++) {
            var iconType = globalIconsTypes[i];
            var url = strUrlBase + '/' + iconType + '/';

            for (var j = 0; j < globalIconsStatus.length; j++) {
                var iconStatus = globalIconsStatus[j];
                var iconColor = globalIconsColors[j];
                
                objIcons[iconType + '_' + iconStatus] = url + iconStatus + '_' + iconColor + '.png';
            }
        }

        //console.log('Todos los iconos', objIcons);
    },
    //Convierte un string a lowerCamelCase (Quita los espacios)
    utilStrLowerCamelCase: function (str)
    {
        return str.toLowerCase().replace(
                    /(?:^\w|[A-Z]|\b\w)/g, 
                    function(letter, index) {
                        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
                    }
                ).replace(/\s+/g, '');
    },
    //Aplica un Zoom Mejorado
    applyZoom: function(mapPanel, layer, bBestZoom)
    {
        mapPanel.map.zoomToExtent(layer.getDataExtent());

        //mapPanel.map.zoomToExtent(layer.getDataExtent(), true)

        if(bBestZoom)
        {
            var zoom = mapPanel.map.getZoom();
            mapPanel.map.zoomTo(zoom - 1);
        }
    },
    //Redirigue a una página dentro de la aplicación (http://stackoverflow.com/questions/381795/how-to-disable-right-click-context-menu-in-javascript)
    redirectPage: function(strModule, objGET)
    {
        var currentLocation = window.location;
        var newPage = currentLocation.origin + currentLocation.pathname;
        strModule = strModule || this.moduleDefault;

        //Agregamos el modulo
        newPage += '?m=' + strModule;

        //Agregamos los parametros gets
        if(!Ext.isEmpty(objGET))
        {
            newPage += '&' +
                       Object.keys(objGET).map(
                            function(prop) 
                            {
                                return [prop, objGET[prop]].map(encodeURIComponent).join("=");
                            }
                        ).join("&");
        }

        //Lanzamos la nueva página
        window.location.replace(newPage);
    },
    //Obtener la URL
    getURL: function()
    {
        var i = 0
        var url = window.location.origin;
        var arrPath = window.location.pathname.split('/');

        for(i=0; i<(arrPath.length-1); ++i)
        {
            url += '/' + arrPath[i];
        }

        url += '/';
        
        for(i=0; i<arguments.length; ++i)
        {
            url += arguments[i];
        }
        //console.log('window.location:', window.location);
        return url;
    },
    //Obtiene un icono normal
    urlIconNormal: function(icon)
    {
        icon = icon || globalIconDefault;
        return this.getURL(icon.normal);
    },
    //Exporta un archivo
    onExportFile: function(store, urlService)
    {
        var params = store.proxy.extraParams;
        
        console.log('Get Export - Params:', params);
        console.log('Get Export - UrlService:', urlService);

        Ext.Ajax.request({
            url      : urlService,
            method   : 'GET',
            scope    : this,
            params: params,
            success  : function(response) 
            {
                var headersResponse = response.getAllResponseHeaders();

                if(headersResponse['content-type'] != 'application/json')
                {
                    console.log('response:', response);
                    var blob = new Blob(
                        [response.responseText],
                        {
                            type: headersResponse['content-type']
                        }
                    );
                    var objectUrl = URL.createObjectURL(blob);
                    window.open(objectUrl);
                }
                else
                {
                    var objResponse = Ext.JSON.decode(response.responseText);

                    Ext.MessageBox.show({
                        title   : objResponse.error? 'ERROR' : 'RESPUESTA',
                        msg     : objResponse.msg,
                        buttons : Ext.MessageBox.OK,
                        icon    : Ext.MessageBox[objResponse.error? 'ERROR' : 'INFO']
                    });
                    return;
                }
            },
            failure  : function(response) 
            {
                var objResponse = Ext.JSON.decode(response.responseText);

                Ext.MessageBox.show({
                    title   :'ERROR',
                    msg     : objResponse.msg,
                    buttons : Ext.MessageBox.OK,
                    icon    : Ext.MessageBox['ERROR']
                });
            }
        });
    },
    //Función que permite agregar/actualizar los filtros -- OJO Mejorar pero es buena idea
    //filtros, operador que encapsula padre and/or, nive de profundidad, campo, valor, operador, mi operador padre es igual al que debo estar, si esta en el mismo nivel de profundidad actualizar
    modifyFilters: function(filters, opCapsule, levelDepth, field, value, op, equalOpCapsule)
    {
        var bUpdate = false;
        filters = (typeof filters === 'string')? Ext.JSON.decode(filters) : filters;

        for (var opCapsule in filters) 
        {   
            if (filters.hasOwnProperty(opCapsule)) 
            {
                var subFilters = filters[opCapsule];
                
                if(Array === filters.constructor && levelDepth != 0)
                {
                    //Recursividad
                    console.log('seguir iterando/Recursividad');
                }
                else
                {
                    if(levelDepth == 0 && subFilters.field == field)
                    {
                        subFilters.value = value;
                        
                        //Actualizamos el operador
                        if(!Ext.isEmpty(subFilters.comparison) && !Ext.isEmpty(op))
                        {
                            subFilters.comparison = op;
                        }
                        bUpdate = true;
                        break;
                    }
                }
            }
        }

        //Si no está toca agregarlo en la profundidad que corresponde
        if(!bUpdate)
        {

        }
    },
});
