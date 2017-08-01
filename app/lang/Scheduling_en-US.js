/**
 *
 * @cfg translate
 * @type Object translate
 * Contains the traductions to specific language to all modules, every object property means a module
 */
var scheduling =  {};

scheduling.yes = 'Yes';
scheduling.no = 'No';
scheduling.marker = {};
scheduling.marker.name = 'Task Name: ';
scheduling.marker.loadAmount = 'Load Amount: ';
scheduling.marker.address = 'Address: ';
scheduling.marker.duration = 'Time: ';
scheduling.marker.type = 'Type: ';

scheduling.marker.capacity = 'Capacity: ';

scheduling.marker.resource = {};
scheduling.marker.resource.login = 'Resource: ';
scheduling.marker.resource.updateTime = 'Last report';
scheduling.marker.resource.address = 'Address';

scheduling.form = {};
scheduling.form.title = 'Programming';
scheduling.form.file = 'File';
scheduling.form.upload = 'Load';
scheduling.form.resourceType = 'R. Type to schedule';
scheduling.form.resourceGroup = 'R. Group to schedule';
scheduling.form.resourceEdit = 'Edit R.<br/> to Schedule';
scheduling.form.resourceForm = 'Form. programming';
scheduling.form.downloadExample = 'Download Example';
scheduling.form.configureButton = 'Configure';
scheduling.form.progress = 'File Loading ...';
scheduling.form.targetDate = 'Date';

scheduling.form.resourceSelect = {};
scheduling.form.resourceSelect.title = 'Select Resources';
scheduling.form.resourceSelect.search = 'Search';
scheduling.form.resourceSelect.searchEmpty = 'Enter the name of a resource';
scheduling.form.resourceSelect.searchCancelTooltip = 'Filter removes the entered text.';
scheduling.form.resourceSelect.exclude = 'Exclude filter';
scheduling.form.resourceSelect.include = 'Include filter';
scheduling.form.resourceSelect.save = 'Save';
scheduling.form.resourceSelect.close = 'Close';

scheduling.form.resourceSelect.columns = {};
scheduling.form.resourceSelect.columns.name = 'Name';
scheduling.form.resourceSelect.columns.group = 'Group';
scheduling.form.resourceSelect.columns.status = 'Status';

scheduling.listTemporalTask = {};
scheduling.listTemporalTask.exportErrors = 'Download Errors';
scheduling.listTemporalTask.columns = {};
scheduling.listTemporalTask.columns.error = 'Error';
scheduling.listTemporalTask.columns.visit = 'Visit';
scheduling.listTemporalTask.columns.loadAmount = 'Load';
scheduling.listTemporalTask.columns.priority = 'Priority';
scheduling.listTemporalTask.columns.distance = 'D.R.';
scheduling.listTemporalTask.columns.address = 'Address';
scheduling.listTemporalTask.columns.startHour = 'Start Time';
scheduling.listTemporalTask.columns.endHour = 'End time';
scheduling.listTemporalTask.columns.duration = 'Delivery time';
scheduling.listTemporalTask.columns.general = 'General Data';
scheduling.listTemporalTask.columns.restriction = 'Restriction';
scheduling.listTemporalTask.columns.trackId = 'Track Id';
scheduling.listTemporalTask.columns.address_fixed = 'Address Fixed';

scheduling.form.configure = {}
scheduling.form.configure.title = 'Configure';
scheduling.form.configure.save = 'Save';
scheduling.form.configure.close = 'Close';

scheduling.form.configure.tabs = {};

scheduling.form.configure.tabs.IniEndPoint = {};
scheduling.form.configure.tabs.IniEndPoint.title = 'Punto de Inicio/Fin';
scheduling.form.configure.tabs.IniEndPoint.tooltip = 'Configurar el punto de inicio/fin';

scheduling.form.configure.tabs.format = {};
scheduling.form.configure.tabs.format.title = 'Format Load';
scheduling.form.configure.tabs.format.separator = 'Separator';
scheduling.form.configure.tabs.format.textDelimiter = 'Qualifier Text';
scheduling.form.configure.tabs.format.encoding = 'encoding';
scheduling.form.configure.tabs.format.hourFormat = 'Time Format';
scheduling.form.configure.tabs.format.dateFormat = 'Date Format';

scheduling.form.configure.tabs.planning = {};
scheduling.form.configure.tabs.planning.title = 'Planning';
scheduling.form.configure.tabs.planning.tooltip = 'About planning';
scheduling.form.configure.tabs.planning.minimumResource = 'Minimal resources';
scheduling.form.configure.tabs.planning.minimumVisits = 'Minimum number of visits';
scheduling.form.configure.tabs.planning.traffic = 'Traffic';
scheduling.form.configure.tabs.planning.shortDistance = 'Short Distance';
scheduling.form.configure.tabs.planning.resourceBalancer = 'Balancing Resources';
scheduling.form.configure.tabs.planning.withHeaders = 'File with Headers';

scheduling.form.configure.tabs.states = {};
scheduling.form.configure.tabs.states.title = 'States';
scheduling.form.configure.tabs.states.tooltip = 'Manage states';
scheduling.form.configure.tabs.states.form = 'Form';
scheduling.form.configure.tabs.states.status = 'State';
scheduling.form.configure.tabs.states.properties = 'Properties';
scheduling.form.configure.tabs.states.mobile = 'MOBILE';
scheduling.form.configure.tabs.states.substatus = 'Sub-States';
scheduling.form.configure.tabs.states.action = 'Action';
scheduling.form.configure.tabs.states.options = 'Options';
scheduling.form.configure.tabs.states.takePhoto = 'Take picture';
scheduling.form.configure.tabs.states.types = 'Types';

scheduling.map = {};
scheduling.map.layerName = 'main Layer';

scheduling.form.secondstep = {};
scheduling.form.secondstep.searchTask = 'Search Task';
scheduling.form.secondstep.uncheduledTasks = 'View Scheduled Tasks No';
scheduling.form.secondstep.reload = 'Reload';
scheduling.form.secondstep.acceptAndAsign = 'OK Assign';
scheduling.form.secondstep.search = 'Search';
scheduling.form.secondstep.resource = 'Resource';

scheduling.marker = {};
scheduling.marker.name = 'Task name: ';
scheduling.marker.loadAmount = 'Load Amount: ';
scheduling.marker.address = 'Address: ';
scheduling.marker.duration = 'Duration: ';
scheduling.marker.type = 'Type: ';
scheduling.marker.resource = 'Resource: ';
scheduling.marker.capacity = 'Capacity: ';
scheduling.marker.status = 'Status: ';
scheduling.marker.code = 'Code: ';

scheduling.marker.resource = {};
scheduling.marker.resource.login = 'Recurso: ';
scheduling.marker.resource.updateTime = 'Último reporte';
scheduling.marker.resource.address = 'Ubicación';