App.models.LeaveRequest = Ext.regModel('LeaveRequest', {
    fields: [
        {
            name: 'id',
            type: 'int'
        }, {
            name: 'name',
            type: 'string'
        }	, {
            name: 'email',
            type: 'string'
        }	, {
		            name: 'status',
		            type: 'string'
		        }, {
            name: 'start-date',
            type: 'date'//,
			//convert: toDateFromJSON - can convert dates - see http://zianet.dk/blog/2011/06/03/dates-with-a-sencha-touch-data-model-and-a-wcf-json-service/
        }, {
	            name: 'end-date',
	            type: 'date'//,
				//convert: toDateFromJSON - can convert dates - see http://zianet.dk/blog/2011/06/03/dates-with-a-sencha-touch-data-model-and-a-wcf-json-service/
	        }
    ],

    validations: [
        {
            type: 'presence',
            name: 'name'
        }, {
            type: 'format',
            name: 'email',
            matcher: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
            message: 'must be a valid email'
        }
    ],

    proxy: {
        type: 'localstorage',
        id: 'sencha-leave-requests'
    }
});
