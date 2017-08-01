Ext.define('LoadPrincipal.model.Forms.ListSection', {
    extend     : 'Ext.data.Model',
    fields     : [ 
		{name : '_id', type: 'string'},
		{name : 'name', type: 'string'},
		{name : 'id_form', type: 'string'},
		{name : 'status', type: 'string'},
		{name : 'questions', mapping:'questions', type : 'auto'}
	],
    idProperty : '_id'
});