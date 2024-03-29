App.views.LeaveRequestForm = Ext.extend(Ext.form.FormPanel, {
    defaultInstructions: 'Please enter the information above.',

    initComponent: function(){
        var titlebar, cancelButton, buttonbar, saveButton, deleteButton, fields;

        cancelButton = {
            text: 'cancel',
            ui: 'back',
            handler: this.onCancelAction,
            scope: this
        };

        titlebar = {
            id: 'leaveRequestFormTitlebar',
            xtype: 'toolbar',
            title: 'Create Leave Request',
            items: [ cancelButton ]
        };

        saveButton = {
            id: 'leaveRequestFormSaveButton',
            text: 'save',
            ui: 'confirm',
            handler: this.onSaveAction,
            scope: this
        };

        deleteButton = {
            id: 'leaveRequestFormDeleteButton',
            text: 'delete',
            ui: 'decline',
            handler: this.onDeleteAction,
            scope: this
        };

        buttonbar = {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [deleteButton, {xtype: 'spacer'}, saveButton]
        };

        fields = {
            xtype: 'fieldset',
            id: 'leaveRequestFormFieldset',
            title: 'Leave Request details',
            instructions: this.defaultInstructions,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'left',
                labelWidth: '40%',
                required: false,
                useClearIcon: true,
                autoCapitalize : false
            },
            items: [
                {
                    name : 'name',
                    label: 'name',
                    autoCapitalize : true
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'name',
                },
                {
                    name: 'email',
                    label: 'email',
                    xtype: 'emailfield',
                },
                {
                    xtype: 'App.views.ErrorField',
                    fieldname: 'email',
                },
				{
                    name: 'status',
                    label: 'status'
                },
				{
                    xtype: 'App.views.ErrorField',
                    fieldname: 'status',
                },
                {
                    name: 'start-date',
                    label: 'start date',
                    xtype: 'datepickerfield'
                },
				{
                    xtype: 'App.views.ErrorField',
                    fieldname: 'start-date',
                },
				{
                    name: 'end-date',
                    label: 'end date',
                    xtype:'datepickerfield'
                },
				{
                    xtype: 'App.views.ErrorField',
                    fieldname: 'end-date',
                }
            ]
        };

        Ext.apply(this, {
            scroll: 'vertical',
            dockedItems: [ titlebar, buttonbar ],
            items: [ fields ],
            listeners: {
                beforeactivate: function() {
                    var deleteButton = this.down('#leaveRequestFormDeleteButton'),
                        saveButton = this.down('#leaveRequestFormSaveButton'),
                        titlebar = this.down('#leaveRequestFormTitlebar'),
                        model = this.getRecord();

                    if (model.phantom) {
                        titlebar.setTitle('Create Leave Request');
                        saveButton.setText('create');
                        deleteButton.hide();
                    } else {
                        titlebar.setTitle('Update Leave Request');
                        saveButton.setText('update');
                        deleteButton.show();
                    }
                },
                deactivate: function() { this.resetForm() }
            }
        });

        App.views.LeaveRequestForm.superclass.initComponent.call(this);
    },

    onCancelAction: function() {
        Ext.dispatch({
            controller: 'LeaveRequests',
            action: 'index'
        });
    },

    onSaveAction: function() {
        var model = this.getRecord();

        Ext.dispatch({
            controller: 'LeaveRequests',
            action    : (model.phantom ? 'save' : 'update'),
            data      : this.getValues(),
            record    : model,
            form      : this
        });
    },

    onDeleteAction: function() {
        Ext.Msg.confirm("Delete this leave request?", "", function(answer) {
            if (answer === "yes") {
                Ext.dispatch({
                    controller: 'LeaveRequests',
                    action    : 'remove',
                    record    : this.getRecord()
                });
            }
        }, this);
    },

    showErrors: function(errors) {
        var fieldset = this.down('#leaveRequestFormFieldset');
        this.fields.each(function(field) {
            var fieldErrors = errors.getByField(field.name);

            if (fieldErrors.length > 0) {
                var errorField = this.down('#'+field.name+'ErrorField');
                field.addCls('invalid-field');
                errorField.update(fieldErrors);
                errorField.show();
            } else {
                this.resetField(field);
            }
        }, this);
        fieldset.setInstructions("Please amend the flagged fields");
    },

    resetForm: function() {
        var fieldset = this.down('#leaveRequestFormFieldset');
        this.fields.each(function(field) {
            this.resetField(field);
        }, this);
        fieldset.setInstructions(this.defaultInstructions);
        this.reset();
    },

    resetField: function(field) {
        var errorField = this.down('#'+field.name+'ErrorField');
        errorField.hide();
        field.removeCls('invalid-field');
        return errorField;
    }
});

Ext.reg('App.views.LeaveRequestForm', App.views.LeaveRequestForm);
