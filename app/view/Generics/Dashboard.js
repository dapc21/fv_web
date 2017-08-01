var icons = [];
Ext.each(moduleConfig.dashboard.tab, function(icon,idx){
    icons.push(
        {
            id: 'dashboard-'+idx,
            html: ' <a href='+icon.url+'>\n\
                    <div class="image">\n\
                    <img src="images/'+icon.image+'.png" />\n\
                    </div>\n\
                    <div class="title">\n\
                    <span>'+icon.name+'</span>\n\
                    </div></a>'
        }
    )
})
Ext.define('LoadPrincipal.view.Generics.Dashboard', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + AppGlobals.dashboardAlias,
    
    id: AppGlobals.dashboardId,
    height: '100%',
    margin: '0, 5, 0, 5',
    layout: {
        type: 'table',
        columns: 3,
        tdAttrs: { style: 'padding: 25px;' }
    },
    defaults: {
        xtype: 'panel',
        cls: 'dashboard-panel',
        width: '100%',
        height: '100%',
        align: 'center',
        bodyPadding: 0
    },
    items:icons,
    dockedItems: [
        
    ]
        
});