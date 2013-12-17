var s;
Background = {
    settings: {
        list: "http://qtv.atrophied.co.uk/api/qtv/activeservers",
        servers: Array(),
        interval: 60000,
        twitchUrl: 'https://api.twitch.tv/kraken/',
        streams: [],
        game: 'Quake',
        obsNotice: 0
    },

    _init: function() {
        s = this.settings;
        this.grab();
        this._startTimer();
        $.localStorage('obsNoticed',new Array());

        if($.localStorage('hide1p') == undefined) {
            $.localStorage('hide1p', false);
        }

        if($.localStorage('nquake') == undefined) {
            $.localStorage('nquake', false);
        }

        if($.localStorage('copyLink') == undefined) {
            $.localStorage('copyLink', false);
        }

         if($.localStorage('obsNotice') == undefined) {
            $.localStorage('obsNotice', '0');
        }

    },

    _startTimer: function() {

        setInterval(function() {
            Background.grab();
        },s.interval);

    },

    grab: function() {
        if($.localStorage('obsNotice') !== undefined) {
            s.obsNotice = $.localStorage('obsNotice');
            s.obsNoticed = $.localStorage('obsNoticed');
        }

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
        var badge, alert = false, activeServers = new Object();

        $.each(data, function(i, qtvs) {
            if(qtvs.GameStates.length>0) {
                servers = qtvs.GameStates;
                $.each(servers, function(i2, server) {
                    var hostname = server.Hostname+':'+server.Port;
                    s.servers.push(server);
                    activeServers[hostname] = {
                        hostname: hostname,
                        observers: server.Observers
                    };

                    if(s.obsNotice>0&&server.Observers>=s.obsNotice&&$.inArray(server.Hostname+':'+server.Port,s.obsNoticed) == "-1") {

                        Notifier.display({
                            title: 'Observer notice on '+hostname,
                            message: hostname+' has reached '+server.Observers+' observers.',
                            iconUrl: '/levelshots/'+server.Map+'.jpg',
                            server: hostname
                        });
                        s.obsNoticed.push(hostname);
                    }

                    if(s.obsNotice>0&&server.Observers>=s.obsNotice) {
                        alert = true;
                    }
                })
            }
        });
    
        $.each(s.obsNoticed, function(i, server){
            var found = false;
            $.each(activeServers, function(i2, asrv){
                if(asrv.hostname == server && asrv.observers>=s.obsNotice)
                    found = true;
            });
            if(found==true){
                // console.log(server+' is still active');
            }
            else {
                s.obsNoticed.splice(i);
                Notifier.clear(server);
            }
        })

        $.localStorage('servers', s.servers);
        $.localStorage('obsNoticed',s.obsNoticed);
        $.localStorage('activeServers',activeServers);

        
        Background.setBadge((function(){return Background.getBadge(alert)})());

        return true;
    },

    getBadge: function(alert) {
        if (s.servers.length>0&&$.localStorage('hide1p')==false) {
            badge = s.servers.length;
        } else if (s.servers.length>0&&$.localStorage('hide1p')==true) {
            var server2ps = 0;
            $.each(s.servers, function(i, server){
                if(server.Players.length>1) {
                    server2ps++;
                }
            })
            if(server2ps>0)
                badge = server2ps;
            else
                badge = "";
        } else {
            badge = "";
        }

        if(alert==true) {
            badge = "!"+ badge +"!";
        }

        return {text:""+badge+""};
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
        iconUrl: "/levelshots/_notfound.jpg",
        priority: 0
    },

    display: function(msg) {
        Notifier.settings.title   = msg.title;
        Notifier.settings.message = msg.message;
        Notifier.settings.iconUrl = msg.iconUrl;

        chrome.notifications.create(msg.server, Notifier.settings, function(){});
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