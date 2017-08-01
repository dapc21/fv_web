moduleConfig.grid.topButtons.push(
    {
        text    : translate.global.delete,
        action  : controller + 'ListDelete',
        iconCls : 'remove-button',
        submenu : false,
        items   : []
    }
);

moduleConfig.grid.contextualMenu.push(
	{
	    text    : translate.global.delete,
	    id      : controller + 'ContextualDelete',
        submenu : false,
	    iconCls : 'delete-menu'
	}
); 