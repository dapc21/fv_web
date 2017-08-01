/**
 *
 * @cfg translate
 * @type Object translate
 * Contains the traductions to specific language to all modules, every object property means a module
 */
var scheduling =  {};

scheduling.yes = 'Si';
scheduling.no = 'No';
scheduling.marker = {};
scheduling.marker.name = 'Nombre de tarea: ';
scheduling.marker.loadAmount = 'Carga: ';
scheduling.marker.address = 'Dirección: ';
scheduling.marker.duration = 'Duración: ';
scheduling.marker.type = 'Tipo: ';
scheduling.task = 'Tarea';

scheduling.marker.capacity = 'Capacidad: ';

scheduling.marker.resource = {};
scheduling.marker.resource.login = 'Recurso: ';
scheduling.marker.resource.updateTime = 'Último reporte';
scheduling.marker.resource.address = 'Ubicación';

scheduling.form = {};
scheduling.form.title = 'Programación';
scheduling.form.file = 'Archivo';
scheduling.form.upload = 'Cargar';
scheduling.form.resourceType = 'Tipo R. a programar';
scheduling.form.resourceGroup = 'Grupo de R. a programar';
scheduling.form.resourceEdit = 'Editar R. a<br/> Programar';
scheduling.form.resourceForm = 'Form. a programar';
scheduling.form.downloadExample = 'Descargar Ejemplo';
scheduling.form.configureButton = 'Configurar';
scheduling.form.progress = 'Cargando Archivo...';
scheduling.form.targetDate = 'Fecha';
scheduling.form.LengthResources = 'Cantidad de Recursos:';

scheduling.form.resourceSelect = {};
scheduling.form.resourceSelect.title = 'Selección de Recursos';
scheduling.form.resourceSelect.search = 'Buscar';
scheduling.form.resourceSelect.searchEmpty = 'Escribe el nombre de un recurso';
scheduling.form.resourceSelect.searchCancelTooltip = 'Elimina el filtro por el texto ingresado.';
scheduling.form.resourceSelect.exclude = 'Excluir Filtro';
scheduling.form.resourceSelect.include = 'Incluir Filtro';
scheduling.form.resourceSelect.excludeView = 'Ver Excluido';
scheduling.form.resourceSelect.includeView = 'Ver Incluido';
scheduling.form.resourceSelect.save = 'Guardar';
scheduling.form.resourceSelect.close = 'Cerrar';

scheduling.form.resourceSelect.columns = {};
scheduling.form.resourceSelect.columns.name = 'Nombre';
scheduling.form.resourceSelect.columns.group = 'Grupo';
scheduling.form.resourceSelect.columns.status = 'Estatus';

scheduling.listTemporalTask = {};
scheduling.listTemporalTask.exportErrors = 'Descargar Errores';
scheduling.listTemporalTask.columns = {};
scheduling.listTemporalTask.columns.error = 'Error';
scheduling.listTemporalTask.columns.visit = 'Visita';
scheduling.listTemporalTask.columns.loadAmount = 'Carga';
scheduling.listTemporalTask.columns.priority = 'Prioridad';
scheduling.listTemporalTask.columns.distance = 'D.R.';
scheduling.listTemporalTask.columns.address = 'Dirección';
scheduling.listTemporalTask.columns.startHour = 'Hora inicio';
scheduling.listTemporalTask.columns.endHour = 'Hora fin';
scheduling.listTemporalTask.columns.duration = 'Tiempo de Entrega';
scheduling.listTemporalTask.columns.general = 'Datos Generales';
scheduling.listTemporalTask.columns.restriction = 'Restricción';
scheduling.listTemporalTask.columns.trackId = 'Track Id';
scheduling.listTemporalTask.columns.address_fixed = 'Dirección Propuesta';

scheduling.form.configure = {}
scheduling.form.configure.title = 'Configurar';
scheduling.form.configure.save = 'Guardar';
scheduling.form.configure.close = 'Cancelar';
scheduling.form.configure.tabs = {};

scheduling.form.configure.tabs.IniEndPoint = {};
scheduling.form.configure.tabs.IniEndPoint.title = 'Punto de Inicio/Fin';
scheduling.form.configure.tabs.IniEndPoint.tooltip = 'Configurar el punto de inicio/fin';

scheduling.form.configure.tabs.format = {};
scheduling.form.configure.tabs.format.title = 'Formato de Carga';
scheduling.form.configure.tabs.format.separator = 'Separador';
scheduling.form.configure.tabs.format.textDelimiter = 'Calificador Texto';
scheduling.form.configure.tabs.format.encoding = 'Codificación';
scheduling.form.configure.tabs.format.hourFormat = 'Formato de Hora';
scheduling.form.configure.tabs.format.dateFormat = 'Formato de Fecha';

scheduling.form.configure.tabs.planning = {};
scheduling.form.configure.tabs.planning.title = 'Planeación';
scheduling.form.configure.tabs.planning.tooltip = 'Sobre la planeación';
scheduling.form.configure.tabs.planning.minimumResource = 'Utilizar el Mínimo Nro de Recursos';
scheduling.form.configure.tabs.planning.minimumVisits = 'Numero Mínimo de Visitas';
scheduling.form.configure.tabs.planning.traffic = 'Tráfico';
scheduling.form.configure.tabs.planning.shortDistance = 'Distancia Corta';
scheduling.form.configure.tabs.planning.resourceBalancer = 'Balanceo de Recursos';
scheduling.form.configure.tabs.planning.withHeaders = 'Archivo con cabeceras';

scheduling.form.configure.tabs.states = {};
scheduling.form.configure.tabs.states.title = 'Estados';
scheduling.form.configure.tabs.states.tooltip = 'Manejar estados';
scheduling.form.configure.tabs.states.form = 'Formulario';
scheduling.form.configure.tabs.states.status = 'Estado';
scheduling.form.configure.tabs.states.properties = 'Propiedades';
scheduling.form.configure.tabs.states.mobile = 'MOVIL';
scheduling.form.configure.tabs.states.substatus = 'Sub-Estados';
scheduling.form.configure.tabs.states.action = 'Acción';
scheduling.form.configure.tabs.states.options = 'Opciones';
scheduling.form.configure.tabs.states.takePhoto = 'Tomar foto';
scheduling.form.configure.tabs.states.types = 'Tipos';

scheduling.map = {};
scheduling.map.layerName = 'Capa principal';

scheduling.form.secondstep = {};
scheduling.form.secondstep.searchTask = 'Buscar Tarea';
scheduling.form.secondstep.uncheduledTasks = 'Ver Tareas No Programadas';
scheduling.form.secondstep.reload = 'Volver A Cargar';
scheduling.form.secondstep.acceptAndAsign = 'Aceptar y Asignar';
scheduling.form.secondstep.search = 'Búsqueda';
scheduling.form.secondstep.resource = 'Recurso';

scheduling.marker = {};
scheduling.marker.name = 'Nombre de tarea: ';
scheduling.marker.loadAmount = 'Carga: ';
scheduling.marker.address = 'Dirección: ';
scheduling.marker.duration = 'Duración: ';
scheduling.marker.type = 'Tipo: ';
scheduling.marker.capacity = 'Capacidad: ';
scheduling.marker.status = 'Estado: ';
scheduling.marker.code = 'Código: ';

scheduling.marker.resource = {};
scheduling.marker.resource.login = 'Recurso: ';
scheduling.marker.resource.updateTime = 'Último reporte';
scheduling.marker.resource.address = 'Ubicación';
