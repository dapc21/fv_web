/**
 * Xtype: website. Extend textfield.
 * 
 * @xtype Ext.form.field.Text
 * @author Daniel Peña
 */
Ext.define('LoadPrincipal.view.Generics.Website', {
	extend        : 'Ext.form.field.Text',
	alias         : 'widget.website',
	initComponent : function() {
		this.callParent(arguments);
	}
});