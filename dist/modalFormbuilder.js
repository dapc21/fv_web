$('#modalFormbuilder').on('show.bs.modal', function (event) {
	var selected = Ext.getCmp(controller+'GridSection').getSelectionModel().getSelection();
	var record = selected[0];
	var id = record.get('_id');
	var name = record.get('name');
	var id_form = record.get('id_form');
	var questions = record.get('questions');
	var parentQuestions = [];
	var childrenQuestions = [];
	var id_parent = $('#buttonModalFormbuilder').val();

	//Ciclo object para filtrar padre e hijos
	for (var a in questions) {
	    if(questions[a].id_parent) {
		    if(questions[a].id_parent == id_parent) {
		        childrenQuestions.push(questions[a]); 
		    }
	    }
	    else {
	        parentQuestions.push(questions[a]); 
	    }
	}

    fbWindow = new FormbuilderWindow({
        selector      : '#bodyModalFormbuilder',
        sections      : 1,
        bootstrapData : childrenQuestions
    });

});
