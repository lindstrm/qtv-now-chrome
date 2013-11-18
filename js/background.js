var s;
Background = {
    settings: {
        list: "http://qtv.atrophied.co.uk/api/qtv/activeservers",
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
                $.each(data, function(i, server) {
                    console.log(server.Hostname + '- players: ' + server.GameStates[0].Players.length||'0')
                })
            }
        })
    },

    parse: function(data) {
        console.log(data);
    }
}

Background._init();
