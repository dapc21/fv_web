moduleConfig.chart.topButtons.push(
    {
        text: 'Borrar',
        action: controller + 'ListDelete',
        iconCls: 'remove-button',
        submenu: false,
        items: []
    }
);
moduleConfig.chart.contextualMenu.push(
    {
        text: 'Editar',
        id: controller + 'ContextualDelete',
        submenu: false,
        iconCls: 'edit-menu',
        items: []
    }
);       