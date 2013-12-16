var s;
Background = {
    settings: {
        list: "http://qtv.atrophied.co.uk/api/qtv/activeservers",
        servers: Array(),
        interval: 60000,
        twitchUrl: 'https://api.twitch.tv/kraken/',
        streams: [],
        game: 'Quake'
    },

    _init: function() {
        s = this.settings;
        this.grab();
        this._startTimer();
    },

    _startTimer: function() {

        setInterval(function() {
            Background.grab();
        },s.interval);

    },

    grab: function() {
        Request.send({action:'showLoader'});
        Background.getStreams();
        $.ajax({
            headers: {
                accept: "Application/Json"
            },
            url: s.list,
            success: function(data){
                s.servers = new Array();
                Background.parse(data);
                Request.send({action:'refreshView'});
            }
        })
    },

    getStreams: function() {
        var streams = []
        $.getJSON(s.twitchUrl+'streams?game='+s.game, function(data){
            $.each(data.streams,function(i,stream){
                stream = {
                    name: stream.channel.name,
                    display_name: stream.channel.display_name,
                    status: stream.channel.status || 'none',
                    viewers: stream.viewers,
                    game: stream.game || 'unknown',
                    preview: stream.preview.small
                };
                streams.push(stream);
            });
            $.localStorage('streams',streams);
        });
    },

    parse: function(data) {
        $.each(data, function(i, qtvs) {
            if(qtvs.GameStates.length>0) {
                servers = qtvs.GameStates;
                $.each(servers, function(i2, server) {
                    s.servers.push(server)
                })
            }
        });
                
        $.localStorage('servers', s.servers);

        if (s.servers.length>0&&$.localStorage('hide1p')==false) {
            Background.setBadge({text: ""+s.servers.length+""});
        } else if (s.servers.length>0&&$.localStorage('hide1p')==true) {
            var server2ps = 0;
            $.each(s.servers, function(i, server){
                if(server.Players.length>1) {
                    server2ps++;
                }
            })
            if(server2ps>0)
                Background.setBadge({text: ""+server2ps+""});
            else
                Background.setBadge({text: ""});
        } else {
            Background.setBadge({text: ""});
        }

        return true;
    },

    setBadge: function(opt) {
        chrome.browserAction.setBadgeText(opt);
    }
}

var Notifier = {
    settings: {
        type: "basic",
        title: "",
        message: "",
        iconUrl: "/images/Twitch-tv-logo.png",
        buttons: [{
            title: 'View',
            iconUrl: ''
        }],
        priority: 0
    },

    display: function(msg) {
        Notifier.settings.title   = msg.title;
        Notifier.settings.message = msg.message;
        Notifier.settings.iconUrl = msg.iconUrl;

        chrome.notifications.create(msg.stream, Notifier.settings, function(){});
    },

    clear: function(title) {
        chrome.notifications.clear(title, function(){});
    }
}

var Request =  {
    _init: function() {
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
            if(request.action == 'refresh') {
                Background.grab();
                Request.send({action:'refreshView'});
            }
        })
    },

     send: function(msg) {

        chrome.runtime.sendMessage(msg, function(response) {
            if(response !== undefined && response.data !== undefined)
                return response.data;
        });

    }
}

Background._init();
Request._init();