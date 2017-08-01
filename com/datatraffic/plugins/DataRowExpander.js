Ext.define('com.datatraffic.plugins.DataRowExpander', {
    extend:'Ext.grid.plugin.RowExpander',
    alias:'plugin.datarowexpander',

    
    setup: function(rows, rowValues){
        var me = this;
        me.self.prototype.setup.apply(me, arguments);
        // If we are lockable, the expander column is moved into the locked side, so we don't have to span it
        //if (!me.grid.ownerLockable) {
        //    rowValues.rowBodyColspan -= 1;
        //}    
    },
});