/**
 *
 * @cfg translate
 * @type Object translate
 * Contains the traductions to specific language to all modules, every object property means a module
 */
var translateplanningtracking =  {};

translateplanningtracking.confirmTitle = 'Confirmar';
translateplanningtracking.confirmCancel = '\xbfDesea cancelar la tarea?<br/>';
translateplanningtracking.task = 'Tarea';

translateplanningtracking.map = {};
translateplanningtracking.map.title = 'Seguimiento de Actividades';

translateplanningtracking.grid = {};
translateplanningtracking.grid.searchTitle = 'Búsqueda';
translateplanningtracking.grid.name = 'Tareas Programadas';

translateplanningtracking.filter = {};
translateplanningtracking.filter.loadingText = 'Buscando...';
translateplanningtracking.filter.fieldLabel = {};
translateplanningtracking.filter.fieldLabel.status = 'Estado';
translateplanningtracking.filter.emptyText = {};
translateplanningtracking.filter.emptyText.status = 'Seleccione el Estado...';
translateplanningtracking.filter.tooltipButton = 'Elimina el filtro por Recurso.';

translateplanningtracking.filter.combobox = {};
translateplanningtracking.filter.combobox.status = {};
translateplanningtracking.filter.combobox.status.PENDING = 'PENDIENTE';
translateplanningtracking.filter.combobox.status.CANCELLED = 'CANCELADO';
translateplanningtracking.filter.combobox.status.DELIVERING = 'CHECKIN';
translateplanningtracking.filter.combobox.status.DELIVERED = 'CHECKOUT CON FORMULARIO';
translateplanningtracking.filter.combobox.status.DELIVEREDWITHERROR = 'CHECKOUT SIN FORMULARIO';
translateplanningtracking.filter.combobox.status.APPROVED = 'APROBADO';

translateplanningtracking.model = {};
translateplanningtracking.model.atributes = {};
translateplanningtracking.model.atributes.resource = 'Recurso';
translateplanningtracking.model.atributes.group = 'Grupo';
translateplanningtracking.model.atributes.location = 'Ubicación';

translateplanningtracking.marker = {};
translateplanningtracking.marker.code = 'Codigo: ';
translateplanningtracking.marker.status = 'Estado: ';
translateplanningtracking.marker.name = 'Nombre de tarea: ';
translateplanningtracking.marker.loadAmount = 'Carga: ';
translateplanningtracking.marker.address = 'Dirección: ';
translateplanningtracking.marker.duration = 'Duración: ';
translateplanningtracking.marker.type = 'Tipo: ';

translateplanningtracking.marker.capacity = 'Capacidad: ';

translateplanningtracking.marker.resourceInstance = {};
translateplanningtracking.marker.resourceInstance.login = 'Recurso: ';
translateplanningtracking.marker.resourceInstance.updateTime = 'Último reporte';
translateplanningtracking.marker.resourceInstance.address = 'Ubicación';


translateplanningtracking.popup = {};
translateplanningtracking.popup.detailButton = 'Ver Detalle';
translateplanningtracking.popup.viewRecord = 'Ver Registro';
translateplanningtracking.popup.cancelButton = 'Cancelar Tarea';
translateplanningtracking.popup.MsgSuccessCancel = translateplanningtracking.task+' Cancelada.<br/>';

translateplanningtracking.window = {};
translateplanningtracking.window.title = 'Detalle Tarea';

translateplanningtracking.window.MsgError = 'Ha ocurrido un error.<br/>';
translateplanningtracking.window.MsgErrorValidateAddressFirst = 'Debe validar primero la dirección.';
translateplanningtracking.window.MsgErrorAddressIsEmpty = 'Debe escribir una dirección';
translateplanningtracking.window.MsgErrorValidateAddressFirstTitle = 'Validar dirección.';

translateplanningtracking.form = {};
translateplanningtracking.form.MsgSuccessCreate = translateplanningtracking.task+' Creada.<br/>';
translateplanningtracking.form.type = {};
translateplanningtracking.form.type.dropoff = 'Entregar';
translateplanningtracking.form.type.pickup = 'Recoger';
translateplanningtracking.form.scheduleButton = 'Agendar';
translateplanningtracking.form.name = 'Nombre';
translateplanningtracking.form.nameEmptyText = 'Nombre de la tarea...';
translateplanningtracking.form.nameError = 'El campo nombre debe contener 3 caracteres como mínimo.';
translateplanningtracking.form.address = 'Dirección';
translateplanningtracking.form.addressEmptyText = 'Dirección , ciudad, pais';
translateplanningtracking.form.addressError = 'El campo nombre debe contener 3 caracteres como mínimo.';
translateplanningtracking.form.reception = 'Hora de Recepción';
translateplanningtracking.form.start = {};
translateplanningtracking.form.startEmptyText = 'Debe ingresar una hora de recepcion...';
translateplanningtracking.form.startError = 'El campo de hora de recepción debe contener la hora completa.';
translateplanningtracking.form.end = {};
translateplanningtracking.form.endEmptyText = 'Debe ingresar una hora de recepcion...';
translateplanningtracking.form.endError = 'El campo de hora de recepción debe contener la hora completa.';
translateplanningtracking.form.loadAmount = 'Carga';
translateplanningtracking.form.loadAmountEmptyText = 'Introduzca el numero de carga...';
translateplanningtracking.form.loadAmountError = 'El campo debe contener 1 numero como mínimo.';
translateplanningtracking.form.duration = 'Duración';
translateplanningtracking.form.durationEmptyText = 'Introduzca el numero de duración de la tarea...';
translateplanningtracking.form.durationError = 'El campo debe contener 1 numero como mínimo.';
translateplanningtracking.form.receiver = '\xbfQuien Recibe?';
translateplanningtracking.form.receiverEmptyText = 'Persona quien recibe...';
translateplanningtracking.form.receiverError = 'El campo debe contener 3 caracteres como mínimo.';

translateplanningtracking.form.validateButton = 'Validar';
translateplanningtracking.form.acceptButton = 'Aceptar';
translateplanningtracking.form.addressNotValid = 'No validada';
translateplanningtracking.form.addressValid = 'Valida';
translateplanningtracking.form.close = 'Cerrar';

translateplanningtracking.resourceEvents = {};
translateplanningtracking.resourceEvents.events = 'Eventos';
translateplanningtracking.resourceEvents.list = {};
translateplanningtracking.resourceEvents.list.resource = 'Recurso';
translateplanningtracking.resourceEvents.list.task = 'Tarea';
translateplanningtracking.resourceEvents.list.category = 'Categoria';
translateplanningtracking.resourceEvents.list.type = 'Tipo de Evento';
translateplanningtracking.resourceEvents.list.msg = 'Mensaje';
translateplanningtracking.resourceEvents.list.updateTime = 'Hora';

translateplanningtracking.print = {};
translateplanningtracking.print.type = 'Tipo';
translateplanningtracking.print.loadAmount = 'Carga';
translateplanningtracking.print.start = 'Inicio';
translateplanningtracking.print.end = 'Fin';
translateplanningtracking.print.duration = 'Duración';
