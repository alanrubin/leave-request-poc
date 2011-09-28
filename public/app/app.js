App = new Ext.Application({
    name: "App",

    launch: function() {
        this.views.viewport = new this.views.Viewport();

        this.views.leaveRequestList = this.views.viewport.down('#leaveRequestList');
        this.views.leaveRequestForm = this.views.viewport.down('#leaveRequestForm');
		this.views.connection = this.views.viewport.down('#connection');
    }
});
