var s;
var Options = {

	settings: {

	},

	_init: function() {
		s = this.settings;
		this.setBinds();
		this.setValues();
	},

	setValues: function() {
		var key,val;

		$('input[type=checkbox]').prop('checked', function(){
			val = $.localStorage($(this).attr('data-key'));
			return val;
		})

	},

	setBinds: function() {
		$('input').on('change', function(e) {
			var key = $(this).attr('data-key'), val;
			switch($(this).attr('type')) {
				case "checkbox": {
					val = $(this).is(':checked') ? true:false;
					if(key=='nquake')
						Request.send({action:'refresh'});
					break;
				}
			}


			$.localStorage(key,val);
		})
	}

}

Options._init();