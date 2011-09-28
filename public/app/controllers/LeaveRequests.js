Ext.regController('LeaveRequests', {
    store: App.stores.leaveRequests,

	connect: function() {
		// TODO Invoke connection to system via PhoneGap - in return callback call the line below ('reveal of view')
		// TODO Maybe add some wait animated gif
		
		// Redirect to leave request list
        App.views.viewport.reveal('leaveRequestList');
    },

    index: function() {
        App.views.viewport.reveal('leaveRequestList');
    },

    newForm: function() {
        var model = new App.models.LeaveRequest()
        App.views.leaveRequestForm.load(model);
        App.views.viewport.reveal('leaveRequestForm');
    },

    editForm: function(params) {
        var model = this.store.getAt(params.index);
        App.views.leaveRequestForm.load(model);
        App.views.viewport.reveal('leaveRequestForm');
    },

    save: function(params) {
        params.record.set(params.data);
        var errors = params.record.validate();

        if (errors.isValid()) {
            this.store.create(params.data);
            this.index();
        } else {
            params.form.showErrors(errors);
        }
    },

    update: function(params) {
        var tmpRequest = new App.models.LeaveRequest(params.data),
            errors = tmpRequest.validate()

        if (errors.isValid()) {
            params.record.set(params.data);
            params.record.save();
            this.index();
        } else {
            params.form.showErrors(errors);
        }
    },

    remove: function(params) {
        this.store.remove(params.record);
        this.store.sync();
        this.index();
    }

});
