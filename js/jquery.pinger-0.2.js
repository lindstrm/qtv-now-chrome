/**
 * $.pinger
 * 
 * If your page runs into an iframe hosted by another domain, you may want to keep the session open.
 * This plugin automates the "ping URL" process and provides some options.
 * 
 * The pinger will ask the given URL every 'interval' minutes if it detects
 * some activity by listening to the events listed in 'listen' parameter.
 * 
 * Have a look to the 'defaults' variable below for further details about available parameters and default values.
 * 
 * Example:
 * Ping Google Logo every 5 minutes and launch the first ping right now:
 * 	$.pinger({
 * 		interval: 5
 * 		url: "http://www.google.co.uk/images/logos/ps_logo2.png",
 * 		pingNow: true
 * 	});
 * 
 * Initialize pinger without listening to events. Update activity on demand.
 * 	$.pinger({
 * 		url: "http://www.google.co.uk/images/logos/ps_logo2.png",
 * 		listen: null
 * 	});
 * 	...
 * 	$.pinger.now('manual ping');
 */
(function($){

	var defaults = {
		interval: 10,					// pings the given URL every 'interval' MINUTES. Set to 0 for manual ping only
		url: null,						// the URL to ping
		listen: ["click", "keydown"],	// events to listen for updating activity
		pingNow: false,					// If true, sends a ping request just after init
		beforeSend: null,				// Callback function, called before ping (should return true. false will cancels ping query)
		callback: false					// Callback function, called after ping query callback received
	};
	
	var options = {};
	var lastUpdate, checkInterval, iTime, pingImg, _pingerLogs = true;
	
	/* Public methods */
	var methods = {
		init: function( settings ) {
			options = $.extend(true, defaults, settings);

			if (!options.url) {
				$.error( 'jQuery.pinger: url parameter is mandatory');
				return;
			}
			
			log("$.pinger.init:", options);
			if ( options.interval > 0 ) {
				
				lastUpdate = 0;
				iTime = (options.interval * 60 * 1000);
				
				checkInterval = setInterval( function(){

					log("$.pinger: Should I ping? (", ((new Date()).getTime() - lastUpdate), ">", iTime, "?)");
					if ( ( (new Date()).getTime() - lastUpdate) > iTime ) {
						stop('timeout');
					}
					else {
						ping('interval');
					}
				}, iTime);
				
				if (options.listen && $.isArray(options.listen) && options.listen.length > 0) {

					$(document).bind(options.listen.join('.pinger '), function(event) {
						update(event.type);
					});	
				}
				
				if (options.pingNow) {
					ping('init');
				}
			}
		},
		/*
		 * $.pinger.now(param)
		 * Manual activity update
		 * param : some message to log
		 */
		now: function (param) {
			( options.interval && options.interval > 0 ) ? update(param) : ping(param);
		},
		/*
		 * $.pinger.destroy();
		 * destroy pinger
		 */
		destroy: function() {

			stop('destroy');
		}
	};

	/* Private Methods */
	function update(param) {
		log("$.pinger: activity update -",param);
		lastUpdate = (new Date()).getTime();
	}
	
	function ping(param) {
		log("$.pinger: Ping to", options.url, "(", param, ")");
		if (!options.beforeSend || options.beforeSend.apply(this, arguments)) {
			
			if (!pingImg) {
				// In FF or Chrome, we could use a GET xhr but IE blocks due to cross-domain policy
				// Image object looks fine for that ping job
				pingImg = new Image();
				pingImg.onload = function() {
					//Success callback
					log("$.pinger: Ping callback", arguments);
					if (options.callback) {
						options.callback.apply(this, arguments);
					}
				}
			}
			pingImg.src = options.url + "?" + (new Date().getTime());
		}
	}
	
	function stop(param) {
		log("$.pinger: Stopped -",param);
		if (options.listen && $.isArray(options.listen) && options.listen.length > 0) {
			$(document).unbind(options.listen.join('.pinger '));
		}
		clearInterval(checkInterval);
	}
	
	function log() {
		if (_pingerLogs && console && console.log) {
			if (console.log.apply) {
				console.log.apply(console, arguments);
			}
			else {
				// console.log doesn't seem to be a "real" function in IE so apply can't be used 
				console.log((Array.prototype.slice.call(arguments)).join(" "));
			}
		}
	}

	/* Plugin entry point */
	$.pinger = function( method ) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call(arguments, 1));
		} else if ( typeof method === 'object' || !method ) {
			return methods.init.apply(this, arguments );
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.pinger');
			return this;
		}
	};
})(jQuery);