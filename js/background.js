var s;
Background = {
    settings: {
        list: "http://qtv.atrophied.co.uk/api/qtv/activeservers",
        servers : Array()
    },

    _init: function() {
        s = this.settings;
        this.grab();
    },

    grab: function() {

        $.ajax({
            headers: {
                accept: "Application/Json"
            },
            url: s.list,
            success: function(data){
                s.servers = new Array();
                Background.parse(data);
            }
        })
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
        return true;
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
            return response.data;
        });

    }
}

Background._init();
Request._init();