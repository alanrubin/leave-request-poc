App.stores.leaveRequests = new Ext.data.Store({
    model: 'LeaveRequest',
	proxy: {
	            type: 'ajax',
	            url : 'leaverequests.json',
	            reader: {
	                type: 'json',
	                root: 'leaverequests'
	            }
	        },
    autoLoad: true
});
