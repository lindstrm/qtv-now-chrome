var s;
Popup = {
	
	settings: {
		servers: Array(),
		template: $('.template')
	},

	_init: function() {

		s = this.settings;
		this.refreshServerList();
		this.binds();

	},

	refreshServerList: function() {
		$('#servers').html('');
		s.servers = $.localStorage('servers');
		
		$.each(s.servers, function(i, server) {

			var qtv = server.Link.split("/"),
				num = qtv[3].split("="),
				teams,adress;

			qtv = {host:qtv[2],num:num[1]};
			adress = server.Hostname+':'+server.Port;

			if(server.Teams.length == 2) {
				teams = (server.Teams[0].Name||'???') + ' vs '+ (server.Teams[1].Name||'???')
			}

			watch = $.localStorage('nquake') == true ? 'http://nquake.com/online/qtv/'+qtv.num+'@'+qtv.host:'http://dafaq.se/qtv.php?q='+server.Link;
			play  = $.localStorage('nquake') == true ? 'http://nquake.com/online/join'+adress:'qw://'+adress;

			template = Popup.settings.template.clone().removeClass('template').addClass('server');

			$('<img/>').attr({src:'levelshots/'+server.Map+'.jpg',height:50})
					   .appendTo(template.find('.levelshot'));


			template.find('.map').html(server.Map);
			template.find('.players').html(server.Players.length + ' | teams: ' +teams);
			template.find('.host').html(adress);
			template.find('.status').html(server.Status);

			template.find('.watch').attr('href',watch).click(function() {
				chrome.tabs.create( { url: $(this).attr('href') } );
			});
			
			template.find('.play').attr('href',play).click(function() {
				chrome.tabs.create( { url: $(this).attr('href') } );
			});

			template.attr('server',i);

			template.appendTo('#servers');

		}) 
		$('.loader').css({display:'none'})
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
             	setTimeout(function(){Popup.refreshServerList()},1000);
             }
             if(request.action == 'showLoader') {
             	$('.loader').css({display:'block'})
             }
             if(request.action == 'hideLoader') {
             	$('.loader').css({display:'none'})
             }
        })
    },

    send: function(msg) {

    	chrome.runtime.sendMessage(msg, function(response) {
			return response.data;
		});

    }
}

$(document).ready(function() {
	$.sammy(function()
	{
		this.get('#/:page(/:args)?', function()
		{
			if (this.params['args'] != '')
			{
				var queryArgs = {};

				this.params['args'].substring(1).split('&').forEach(function(key) {
					key = key.split('=');
					queryArgs[key[0]] = key[1] || '';
				});
			}

			if ($('#' + this.params['page']).length)
			{
				page = this.params['page'];
				$('.active').removeClass('active tse-content').addClass('non-active');
				$('#nav-' + page).addClass('active');
				$('#' + page).removeClass('non-active').addClass('active tse-content').appendTo('.tse-scroll-content');

			}
		});
	}).run('#/servers');
})

Popup._init();
Request._init();
$('.wrapper').TrackpadScrollEmulator();