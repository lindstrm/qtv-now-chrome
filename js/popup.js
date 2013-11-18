var s;
Popup = {
	
	settings: {
		servers: Array()
	},

	_init: function() {

		s = this.settings;
		this.refreshStreamView();
		this.binds();

	},

	refreshStreamView: function() {
		$('.servers').html('');
		s.servers = $.localStorage('servers');

		$.each(s.servers, function(i, server) {

			$('<p>').html("<img src='levelshots/"+server.Map+".jpg' height=50>"+ server.Hostname + " - Status: " + server.Status)
			.appendTo('.servers');

		}) 

	},

	info: function(server) {

	},

	binds: function() {

		$('.refresh').on('click', function() {
			Request.send({action:'refresh'}) 
		})

	}

}

var Request =  {
    _init: function() {
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
             if(request.action == 'refreshView') {
             	setTimeout(function(){Popup.refreshStreamView()},1000);
             }
        })
    },

    send: function(msg) {

    	chrome.runtime.sendMessage(msg, function(response) {
			return response.data;
		});

    }
}

Popup._init();
Request._init();