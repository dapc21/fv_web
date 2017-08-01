/**
 * Generic grid form to be filled according data in the moduleConfig object
 *
 * @xtype Ext.grid.Panel
 * @requires LoadPrincipal.views.Templates.Grid
 */
Ext.each(moduleConfig.subform, function(value,genericIndex)
{
    var suffixName = (genericIndex > 0)? genericIndex : '' ;
    Ext.define('LoadPrincipal.view.Generics.FormMulti' + suffixName, {
        extend: 'Ext.form.Panel',
        alias: 'widget.' + AppGlobals.formAlias + genericIndex,
        id: AppGlobals.formId + genericIndex,
        border: false,
        frame: false,
        autoScroll: true,
        //bodyPadding: 5,
        fieldDefaults: {
            labelWidth: 50,
            labelAlign: 'top',
            msgTarget: 'under'
        },
        requires: [
        ],
    //    layout:'fit',
        layout: {
            type: 'column',
            align: "center",
            defaultMargins: "2px"
        },
        //Se sobre escribe la función (https://www.sencha.com/forum/archive/index.php/t-50223.html)
        errorReader: {
            read: function(response) {
                console.log('Form Response View: ', response);
                
                var objResult = Ext.JSON.decode(response.responseText);
                
                return {
                    success: !objResult.error,
                }
            }
        },
        /**
         * To specific the columns and docked items, plese verify de config file
         *
         */
        initComponent: function () 
        {
            //console.log('Cargando el Formulario Nro: ' + genericIndex);
            this.items = [
                {
                    xtype       : 'fieldset',
                    title       : (!Ext.isEmpty(moduleConfig.subform[genericIndex].title))? moduleConfig.subform[genericIndex].title : '',
                    collapsible : false,
                    collapsed   : false,
                    id          : 'messageFormFieldsetPush' + genericIndex,
                    defaultType : 'textfield',
                    bodyPadding : (moduleConfig.subform[genericIndex].bodyPadding)? moduleConfig.subform[genericIndex].bodyPadding:15,
                    border      : (moduleConfig.subform[genericIndex].border === false)?false:true,
                    columnWidth: 1,
                    fieldDefaults: {
                        labelWidth : '50%'
                    },
                    layout: {
                        type           : 'column',
                        align          : "center",
                        defaultMargins : "7px"
                    },
                    margin: '0 0 0 0',
                    padding: '0 0 0 0',
                    items: moduleConfig.subform[genericIndex].items
                }
            ];

            //Ojo con esto porque al ser vácio igual se pinta y ocupa un espacio de la interfaz
            if(!Ext.isEmpty(moduleConfig.subform[genericIndex].bottomButtons))
                this.buttons = moduleConfig.subform[genericIndex].bottomButtons;

            this.callParent();
        }
    });
});
