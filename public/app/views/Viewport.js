App.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    
    initComponent: function() {
        Ext.apply(this, {
            items: [
				{ xtype: 'App.views.Connection', id: 'connection'},
                { xtype: 'App.views.LeaveRequestList', id: 'leaveRequestList' },
                { xtype: 'App.views.LeaveRequestForm', id: 'leaveRequestForm' }
            ]
        });
        App.views.Viewport.superclass.initComponent.apply(this, arguments);
    },

    reveal: function(target) {
        var direction = (target === 'leaveRequestList') ? 'right' : 'left';
		this.setActiveItem(
            App.views[target],
            { type: 'slide', direction: direction }
        );
    }
});
