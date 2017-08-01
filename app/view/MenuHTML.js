Ext.define('LoadPrincipal.view.MenuHTML', {
	extend   : 'Ext.container.Container',
	alias    : 'widget.AliasMenuHTML',
	id       : 'idMenuHTML',
    initComponent: function () 
    {
			var modules = Ext.decode(window.localStorage.getItem('modules'));
			var login = 'NaN';
			var i;
			var li = '';

			for(i = 0; i < modules.length; i++)
			{
				var cssSelect = '';
				
				if(controller == modules[i].name){
					cssSelect = ' fv-color-select';
				}

				switch (modules[i].name) {
					case "PlanningTracking":
						li += this.getMenuLiElement('idPlanningTracking', 'fa fa-desktop fa-2x' + cssSelect,'Monitoreo de tareas','PlanningTracking');
					break;		
					case "ResourceTracking":
						li += this.getMenuLiElement('idResourceTracking','fa fa-map-marker fa-2x' + cssSelect,'Monitoreo de recursos','ResourceTracking');
					break;
					case "Companies":
						li += this.getMenuLiElement('idCompanies','fa fa-cogs fa-2x' + cssSelect,'Empresas','Companies');
					break;
					case "Resources":
						li += this.getMenuLiElement('idResources','fa fa-truck fa-2x' + cssSelect,'Recursos','Resources');
					break;
					case "Users":
						li += this.getMenuLiElement('idUsers','fa fa-users fa-2x' + cssSelect,'Usuarios','Users');
					break;
					case "Forms":
						li += this.getMenuLiElement('idForms','fa fa-wpforms fa-2x' + cssSelect,'Formularios','Forms');
					break;	
					case "Scheduling":
						li += this.getMenuLiElement('idScheduling','fa fa-calendar fa-2x' + cssSelect,'Programacion','Scheduling');
					break;		
					case "Registers":
						li += this.getMenuLiElement('idRegisters','fa fa-sticky-note-o fa-2x' + cssSelect,'Registros','Registers');
					break;
					case "Tasks":
						li += this.getMenuLiElement('idTasks','fa fa-list fa-2x' + cssSelect,'Tareas','Tasks');
					break;				
				}
			}

			//Agregamos el login
			if(!Ext.isEmpty(window.localStorage.getItem('login'))){
				login = window.localStorage.getItem('login');
			}
			
			var finalHTML = [
				'<nav class="main-menu">',
					'<ul>',
						'<li><a><i class="fa fa-fv fa-2x"></i><span class="nav-text">FieldVision - <b style="font-size: 14px;">' + login + '</b></span></a></li>',
						li,
					'</ul>',
					'<ul class="logout">',
						'<li> <a id="idLogout" onclick="changePageMenu(\'Login\')"> <i class="fa fa-power-off fa-2x"></i> <span class="nav-text"> Cerrar Sesión </span> </a> </li>',
					'</ul>',
				'</nav>'
			].join('');

			this.html = finalHTML;

			this.callParent(arguments);
    },
		getMenuLiElement: function(idLi, css, label, url)
		{
			return '<li><a id="'+idLi+'" onclick="changePageMenu(\''+url+'\')"><i class="'+css+'"></i><span class="nav-text">'+label+'</span></a></li>';	
		}	
});


