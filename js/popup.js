var s;
Popup = {
	
	settings: {
		servers: Array(),
		template: $('.template'),
		colors: {
			0: '#ffffff',
			1: '#CC66FF',
			2: '#9966ff',
			3: '#CCCC99',
			4: '#CD3232',
			5: '#FFCC99',
			6: '#FFCC00',
			7: '#FFCCCC',
			8: '#CC66FF',
			9: '#FF99FF',
			10: '#FFFFCC',
			11: '#00CC99',
			12: '#DFE41B',
			13: '#4559BA',
			14: '#4559BA',
			15: '#4559BA'
		}
	},

	_init: function() {

		s = this.settings;
		this.refreshServerList();
		this.refreshStreamList();
		this.binds();

	},

	_copy: function(str, mimetype) {
		document.oncopy = function(event) {
			event.clipboardData.setData(mimetype, str);
			event.preventDefault();
		};
		document.execCommand("Copy", false, null);
	},

	refreshServerList: function() {
		$.sessionStorage('test',true);
		$('#servers').html('');
		s.servers = $.localStorage('servers');
		
		$.each(s.servers, function(i, server) {

			if($.localStorage('hide1p') == true && server.Players.length > 1 || server.Players.length > 0 && $.localStorage('hide1p') == false)
			{
				var qtv = server.Link.split("/"),
					num = qtv[3].split("="),
					teams,adress,$copy = $.localStorage('copyLink');

				qtv = {host:qtv[2],num:num[1]};
				adress = server.Hostname+':'+server.Port;

				if(server.Teams.length == 2) {
					teams = (server.Teams[0].Name||'???') + ' vs '+ (server.Teams[1].Name||'???')
				}

				watch = $.localStorage('nquake') == true ? 'http://nquake.com/online/qtv/'+qtv.num+'@'+qtv.host:'http://dafaq.se/qtv.php?q='+server.Link;
				play  = $.localStorage('nquake') == true ? 'http://nquake.com/online/join/'+adress:'qw://'+adress;

				template = Popup.settings.template.clone().removeClass('template').addClass('server');

				$('<img/>').attr({src:'levelshots/'+server.Map+'.jpg',height:53,width:69})
						   .appendTo(template.find('.levelshot'));

	            $('<img/>').attr({src:'images/flags/'+server.CountryCode.toLowerCase()+'.png'})
						   .appendTo(template.find('.levelshot>.flag'));

				template.find('.map').html(server.Map);
				template.find('.players').html(server.Players.length + (server.Observers>0?" (" + server.Observers + ")":"") + (teams? ' | teams: ' +teams:''));
				template.find('.host').html(adress);
				template.find('.status').html(server.Status);

				template.find('.watch').attr({href:watch}).click(function() {
					if($.localStorage('copyLink') == true) {
						qtv = $(this).attr('href').split("/");
						num = qtv[qtv.length-1].split("=");
						Popup._copy('qtvplay '+num[1]+'@'+qtv[qtv.length-2],'text');
					}
					else {
						chrome.tabs.create( { url: $(this).attr('href') } );
					}
				});
				
				template.find('.play').attr('href',play).click(function() {
					if($.localStorage('copyLink') == true) {
						addr = $(this).attr('href').split('/');
						Popup._copy(addr[addr.length - 1],'text');
					}
					else {
						chrome.tabs.create( { url: $(this).attr('href') } );
					}
				});

				template.attr('server',i);

				template.appendTo('#servers');

				if(server.Observers>=$.localStorage('obsNotice')&&$.localStorage('obsNotice')>0)
					template.addClass('highlight');

				template.find('.levelshot').on('click', function(e) {
					var servern = $(this).parent().attr('server');
					if($('.players-big[server='+servern+']').length==0)
					{
						var playersc = $('.players-template').clone();
						playersc.removeClass('players-template').addClass('players-big').attr('server',servern);

						if(server.Status != 'Standby') {
							if(server.Players.length>2)
							{
								score = server.Teams[0].Name.replace('<','&lt;').replace('>','&gt;') + ' ' + '<strong>' +  server.Teams[0].Score  + '</strong>  vs ' +
										'<strong>' + server.Teams[1].Score + '</strong> ' + server.Teams[1].Name.replace('<','&lt;').replace('>','&gt;');
							}
							else if(server.Players.length==2) {
								score = server.Players[0].Name.replace('<','&lt;').replace('>','&gt;') + ' ' + '<strong>' + server.Players[0].Frags +'</strong> vs ' +
										'<strong>' + server.Players[1].Frags + '</strong> ' + server.Players[1].Name.replace('<','&lt;').replace('>','&gt;');
							}
							playersc.find('.score').html(score).css({display:'block'});
						}

						$.each(server.Players, function(i3, player) {
							name = player.Name.replace('<','&lt;').replace('>','&gt;');
							row = playersc.find('tbody>tr:first-child').clone();

							row.find('.pping').html(player.Ping);
							row.find('.ppl').html(player.PacketLoss);
							row.find('.pfrags').html(player.Frags)
							   .css('background','-webkit-linear-gradient(top, '+Popup.settings.colors[player.TopColour]+' 50%, '+Popup.settings.colors[player.BottomColour]+' 50%)')
							row.find('.pteam').html(player.Team);
							row.find('.pname').html(name);

							row.appendTo(playersc.find('tbody'));
						})

						playersc.insertAfter('.server[server='+servern+']');
						$('#servers').css({height:$('#servers').height()+playersc.height()})
					}
					else {
						$('#servers').css({height:$('#servers').height()-$('.players-big[server='+servern+']').height()})
						$('.players-big[server='+servern+']').remove();
					}
					$('.wrapper').TrackpadScrollEmulator('recalculate');
				});
			}
		}) 

		$('.loader').css({display:'none'});
		$('#servers').css({height:$('.server').length*65});
	},

	refreshStreamList: function() {
		$('#streams').html('');
		var streams = $.localStorage('streams');

		$.each(streams, function(i, stream) {
			var template = $('.stream-template').clone().removeClass('stream-template').addClass('stream');

			template.find('.status').html(function(){
				if(stream.status.length>35) {
					status = stream.status.substr(0,32) + "...";
					return status;
				} else {
					return stream.status;
				}
			});
			template.find('.streamer').html(stream.display_name);
			template.find('.viewers').html(stream.viewers);
			$('<img>',{src:stream.preview,class:'stream-preview'}).appendTo(template.find('.preview'));
			template.find('.preview').attr('data-image',stream.preview).css({width: 70, height:44});

			template.attr('href','http://twitch.tv/'+stream.name);

			template.appendTo('#streams');

			template.click(function() {
				chrome.tabs.create( { url: $(this).attr('href') } );
			});
		})
		if(streams.length>0)
		{
			$('.badge').html(streams.length).removeClass('non-active');
		}
		else if(streams.length==0) 
		{
			$('.badge').html('').addClass('non-active');
		}
		$('#streams').css({height:streams.length*56});
	},

	demoSearch: function(string) {

		$.get('http://qtvapi.dafaq.se/demos',{search: string},function(data) {
			$('.demo-list').html('');
			$.each(data, function(i, demo)
			{
				template = Popup.demoTemplate(demo);
				template.appendTo('.demo-list');
				$('#demos').css({height:(65*data.length)});
			});
		})		
	},

	demoTemplate: function(demo) {

		var template = $('.demo-template').clone();
		template.removeClass('demo-template');
		template.find('.type').html(demo.type);
		
		if(demo.type == 'duel') {
			preWho = 'Players: ';
		} else {
			preWho = 'Teams: ';
		}
		vs = preWho + demo.teamOne.replace('<','&lt;').replace('>','&gt;') +' vs '+ demo.teamTwo.replace('<','&lt;').replace('>','&gt;');
		template.find('.who').html(function(){
			if(vs.length>35) {
				return vs.substr(0,32) + "...";;
			} else {
				return vs;
			}
		}).attr('title',demo.teamOne +' vs '+ demo.teamTwo);

		$('<img/>').attr({src:'levelshots/'+demo.map+'.jpg',height:53,width:69}).appendTo(template.find('.levelshot'));

		watch    = "http://dafaq.se/qtv.php?q="+demo.qtv.adress+"/watch.qtv?demo="+demo.filename;
		download = demo.qtv.adress+"/dl/demos/"+demo.filename;

		template.find('.watch').attr({href:watch}).click(function() {
			chrome.tabs.create( { url: $(this).attr('href') } );
		});
		
		template.find('.download').attr('href',download).click(function() {
			chrome.tabs.create( { url: $(this).attr('href') } );
		});

		template.find('.date').html(demo.date_played);

		template.find('.map').html(demo.map);
		template.addClass('demo');

		return template;
	},

	binds: function() {

		$('.refresh').on('click', function() {
			Request.send({action:'refresh'}) 
		})

		$('a[href*=http], a[href*=mailto]').not('.watch, .play, .stream').click(function() {
			chrome.tabs.create( { url: $(this).attr('href') } );
		});

		$('#demo-search').change(function(e) {
			Popup.demoSearch($(this).val());
		})

	},

}

var Request =  {
    _init: function() {
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
             if(request.action == 'refreshView') {
             	setTimeout(function(){Popup.refreshServerList();Popup.refreshStreamList()},1000);
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

				if(page == 'demos') {
					$('#demo-search').val('');
					$('.demo-list').html('');

					$.get('http://qtvapi.dafaq.se/demos',function(data) {
						$.each(data, function(i, demo)
						{
							template = Popup.demoTemplate(demo);
							template.appendTo('.demo-list');
							$('#demos').css({height:1300});
						});
					})		
				}

				$('.active').not('[id*=nav-]').removeClass('active').addClass('non-active').appendTo('.content');
				$('.active[id*=nav]').removeClass('active');
				$('#nav-' + page).addClass('active');
				$('#' + page).removeClass('non-active').addClass('active').appendTo('.tse-content');
				$('#'+page).css({height:$('#'+page).height()});
				$('.wrapper').TrackpadScrollEmulator('recalculate');
			}
		});
	}).run('#/servers');
})

Popup._init();
Request._init();
$('.wrapper').TrackpadScrollEmulator();