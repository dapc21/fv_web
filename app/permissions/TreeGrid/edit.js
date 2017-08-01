moduleConfig.grid.topButtons.push(
    {
        text: 'Cambiar estados',
        action: controller + 'ListStatus',
        submenu: true,
        items: [
            {
                text: 'Activar',
                action: controller + 'ListPublish',
                iconCls: 'unlock-menu',
                submenu: false,
                items: []
            },
            {
                text: 'Desactivar',
                action: controller + 'ListUnpublish',
                iconCls: 'lock-menu',
                submenu: false,
                items: []
            },
            {
                text: 'Fuera de servicio',
                action: controller + 'ListOffline',
                iconCls: 'shutdown-menu',
                submenu: false,
                items: []
            },
            {
                text: 'Mantenimiento',
                action: controller + 'ListMaintenance',
                iconCls: 'maintenance-menu',
                submenu: false,
                items: []
            }
        ]
    }
);
moduleConfig.grid.contextualMenu.push(
     {
        text: 'Editar',
        id: controller + 'ContextualEdit',
        submenu: false,
        iconCls: 'edit-menu',
        items: []
    },
    {
        text: 'Cambiar estados',
        id: controller + 'ContextualStatus',
        submenu: true,
        iconCls: 'status-menu',
        items: [
            {
                text: 'Activar',
                id: controller + 'ContextualActivate',
                iconCls: 'unlock-menu',
                submenu: false,
                items: []
            },
            {
                text: 'Desactivar',
                id: controller + 'ContextualInactivate',
                submenu: false,
                iconCls: 'lock-menu',
                items: []
            },
            {
                text: 'Fuera de servicio',
                id: controller + 'ContextualOffline',
                submenu: false,
                iconCls: 'shutdown-menu',
                items: []
            },
            {
                text: 'Mantenimiento',
                id: controller + 'ContextualMaintenance',
                submenu: false,
                iconCls: 'maintenance-menu',
                items: []
            }
        ]
    },
    {
        text: 'Horarios',
        id: controller + 'ContextualSchedule',
        submenu: false,
        allowMassive: false,
        iconCls: 'schedule-menu',
        items: []
    },
    {
        text: 'Propietario',
        id: controller + 'ContextualOwner',
        submenu: false,
        iconCls: 'owner-menu',
        items: []
    },
    {
        text: 'Administrador',
        id: controller + 'ContextualAdministrator',
        submenu: false,
        iconCls: 'owner-menu',
        items: []
    },
    {
        text: 'Codensa',
        id: controller + 'ContextualCodensa',
        submenu: false,
        iconCls: 'codensa-menu',
        allowMassive: true,
        items: []
    }   
);
moduleConfig.tree.contextualMenu.push(
     {
        text: 'Crear Hijo',
        id: controller + 'ContextualTreeAddChild',
        submenu: false,
        iconCls: 'edit-menu',
        items: []
    },
    {
        text: 'Editar',
        id: controller + 'ContextualTreeEdit',
        submenu: false,
        iconCls: 'owner-menu',
        items: []
    },
    {
        text: 'Delete',
        id: controller + 'ContextualTreeDelete',
        submenu: false,
        iconCls: 'codensa-menu',
        allowMassive: true,
        items: []
    }   
);