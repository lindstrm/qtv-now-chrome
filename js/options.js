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

		$('input[type=text]').val(function(){
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
					if(key=='nquake') {
						Request.send({action:'refresh'});
						if($('input[data-key=copyLink]').is(':checked')) {
							$('input[data-key=copyLink]').prop('checked', false);
							$.localStorage('copyLink',false);
						}
					}
					else if(key=='copyLink') {
						if($('input[data-key=nquake]').is(':checked')) {
							$('input[data-key=nquake]').prop('checked', false);
							$.localStorage('nquake',false);
							Request.send({action:'refresh'});
						}
					}
					else if(key=='hide1p') {
						Request.send({action:'refresh'});
					}
					break;
				}

				default: {
					$.localStorage($(this).attr('data-key'),$(this).val());
				}
			}


			$.localStorage(key,val);
		})
	}

}

Options._init();