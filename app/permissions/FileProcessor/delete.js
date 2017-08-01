//moduleConfig.grid.topButtons.push(
//    {
//        text: 'Borrar',
//        action: controller + 'ListDelete',
//        iconCls: 'remove-button',
//        submenu: false,
//        items: []
//    }
//);
moduleConfig.grid.contextualMenu.push(
    {
        text: 'Editar',
        id: controller + 'ContextualDelete',
        submenu: false,
        iconCls: 'edit-menu',
        items: []
    }
);       