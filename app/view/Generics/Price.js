/**
 * Xtype: website. Extend numberfield.
 * 
 * @xtype Ext.form.field.Number
 * @author Daniel Peña
 */
Ext.define('LoadPrincipal.view.Generics.Price', {
	extend        : 'Ext.form.field.Number',
	alias         : 'widget.price',
	initComponent : function() {
		this.callParent(arguments);
	}
});