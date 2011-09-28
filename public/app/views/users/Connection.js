App.views.UsersConnection = Ext.extend(Ext.Panel, {
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

        App.views.UsersConnection.superclass.initComponent.call(this);
    },

    onConnectAction: function() {
		Ext.dispatch({
            controller: 'Users',
            action: 'connect'
        });
    }
});

Ext.reg('App.views.UsersConnection', App.views.UsersConnection);
