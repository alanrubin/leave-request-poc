App.views.Connection = Ext.extend(Ext.Panel, {
    initComponent: function(){
        var connectButton;

        connectButton = {
            itemId: 'connectButton',
            text: 'Connect & Login',
            ui: 'normal',
			xtype: 'button',
            handler: this.onConnectAction,
            scope: this
        };

        Ext.apply(this, {
            layout: {
				type: 'vbox',
				pack: 'center'
			},
            items: [connectButton]
        });

        App.views.Connection.superclass.initComponent.call(this);
    },

    onConnectAction: function() {
		Ext.dispatch({
            controller: 'LeaveRequests',
            action: 'connect'
        });
    }
});

Ext.reg('App.views.Connection', App.views.Connection);
