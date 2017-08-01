moduleConfig.grid.topButtons.push(
    {
        text    : translate.global.changeStatus,
        action  : controller + 'ListStatus',
        submenu : true,
        items   : [
            {
                text    : translate.global.active,
                action  : controller + 'ListActive',
                iconCls : 'unlock-menu',
                submenu : false
            },
            {
                text    : translate.global.inactive,
                action  : controller + 'ListInactive',
                iconCls : 'lock-menu',
                submenu : false
            }
        ]
    }
);


moduleConfig.grid.contextualMenu.push(
    {
        text    : translate.global.edit,
        id      : controller + 'ContextualEdit',
        submenu : false,
        iconCls : 'edit-menu'
    }
    ,
    {
        text    : translate.global.changeStatus,
        id      : controller + 'ContextualStatus',
        submenu : true,
        items   : [
            {
                text    : translate.global.active,
                id      : controller + 'ContextualActivate',
                submenu : false,
                iconCls : 'lock-menu'
            },
            {
                text    : translate.global.inactive,
                id      : controller + 'ContextualDeactivate',
                submenu : false,
                iconCls : 'unlock-menu'
            }
        ]
    }
); 