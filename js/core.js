function start() {

	//ASSIGN ORDERID TO PROLOOK OBJECT
	prolook.orderId = orderId;
	
	currentColor = '#d00000';
	$('.current').css('background-color', currentColor);

	today = new Date();
	dd = today.getDate();
	mm = today.getMonth() + 1; //January is 0!
	yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	q = 0;
	
	//CHANGE PIECE, GET PARAMS FROM URL

	var model,
		index;

	model = window.location.hash.split('#!');
	model = model[1];

	if (typeof model === 'undefined') {

		changePiece('jersey', 3000);

		changePiece('pant', 3000);

		prolook.jersey_model = 3000;
		prolook.pant_model = 3000;
		bldr.jersey_model = 3000;
		bldr.pant_model = 3000;

	} else {

		model = model.split('&');

		for (var i in model) {

			var params = model[i].split('=');
            if( model[0] === 'orderid' ) continue;			

			changePiece(params[0], params[1]);

			prolook[params[0] + '_model'] = params[1]; //save global style
			bldr[params[0] + '_model'] = params[1];

		}

	}

	//picker for base colors - name, numbers
	$('.choosebase').on('click',function (event) {

		//save invoker button
		bldr.modalInvoker = $(this);

		//show basePicker modal
		miniModal(event, '#basePicker');

	});

	//picker for all colors - base and infusion

	$('#collapseOne, #collapseInf').on('click', '.picker', function (event) {

		//save invoker button
		bldr.modalInvoker = $(this);

		//show basePicker modal
		miniModal(event, '#colorPicker');

	});

	$('#basePicker input').click(function () {
	
		var selectedBase = $(this).attr('data-base');
		var selectedColor = window[selectedBase];
		var invoker = bldr.modalInvoker;
		var obj = invoker.attr('data-obj');
		var mode = invoker.attr('data-mode');
		var opacity;
		
		color = selectedColor;
		
		//set data on invoker
		invoker.attr('data-base', selectedBase);

		//fill model
		$(invoker.attr('data-target')).css(mode, selectedColor);

		//hide element if it is colorless
		if (selectedBase == 'nocolor' && mode == 'fill')
			$(invoker.attr('data-target')).css('fill-opacity', 0);
		else if(selectedBase == 'nocolor' && mode == 'stroke')
			$(invoker.attr('data-target')).css('stroke-opacity', 0);
		else{
			$(invoker.attr('data-target'))
				.css('fill-opacity', 	1)
				.css('stroke-opacity', 	1);
		}

		//update style object
		obj = obj.split('.');
		prolook[obj[0]][obj[1]] = selectedColor;
		
		//hide modal
		miniModal('hide', '#basePicker');
		
		if(invoker.attr('data-callback') != 'undefined')
			window[invoker.attr('data-callback')]();
			
		//update this button view
		if (selectedBase == 'nocolor')
			invoker.css('background-image', 'url("assets/img/nocolor.jpg")');
		else	
			invoker.css('background', selectedColor);

		save();

	});

	$('#colorPicker input').click(function () {

		var invoker = bldr.modalInvoker;
		var selectedBase = invoker.attr('data-base');
		var selectedColor = $(this).attr('value');
		var colorName = $(this).attr('data-original-title');

		window[selectedBase] = selectedColor;

		color = selectedColor;

		//hide modal
		miniModal('hide', '#colorPicker');
		
		//update this button
		invoker.css('background-color', selectedColor);

		//update color buttons
		$('input.' + selectedBase + ', input.inf'+selectedBase).each(function() {
		
			// ... write color names
			$(this).siblings('.colorname').html(colorName);
			$(this).attr('title', colorName);
			
			// ... change background color
			
			//update color inputs
			$(this).css('background-color', selectedColor).attr('value', selectedColor);
		
		});
		
		//change 'current' color buttons
		$('.current').css('background-color', selectedColor);

		//update models with base color
		//$('.' + selectedBase).css({
		//	'background-color' : selectedColor,
		//	'fill' : selectedColor
		//});

		//update infusions
		var index = selectedBase.replace('base')-1;
		$('.inf'+selectedBase)
		.css('background-color',prolook['inf'+selectedBase])
		.css('fill',selectedColor);
		
		$('.infpicker').eq(index).val(selectedColor);

		var baseNumber = selectedBase.split('base');
		baseNumber = baseNumber[baseNumber.length-1];
		
		if (baseNumber == 1 || baseNumber == 2) {

			//STOP COLORS FOR GRADIENTS
			a = $('.infpicker .picker', '#collapseInf')[0];
			a = a.value;
			$('#gradstop1').css('stop-color', a);
			b = $('.infpicker .picker', '#collapseInf')[1];
			b = b.value;
			$('#gradstop2').css('stop-color', b);

		}
		
		var updateText = false;

		//update base selectors
		
		if( $('button[data-base='+selectedBase+']').length > 0){
		
			$('button[data-base='+selectedBase+']').css('background-color', selectedColor);
			var obj =$('button[data-base='+selectedBase+']').attr('data-base').split('.');
			prolook[obj[0]][obj[1]] = selectedColor;

			updateText = true;
		
		}
		else if(selectedBase === 'base1') { // apparently there is no button with base1 so the value does not get updated in th JSON
		    prolook['base1'] = selectedColor;
		}
		
		//update infusion base selectors
		
		$.each($('.infpicker input','#collapseInf'), function () {

			if ($(this).attr('data-base').split('inf')[1] == selectedBase) {

				$(this).css('background-color', selectedColor);
				$('.inf	'+selectedBase).css('fill',selectedColor);
				prolook['inf'+selectedBase] = selectedColor;

			}

		});

		if (updateText) {
		
			prolook.name.color = $('button[data-obj="name.color"]').css('background-color');
			prolook.name.outline_color = $('button[data-obj="name.outline_color"]').css('background-color');
			
			$("#selected,#sidebar").find('#tspan3017')
				.css('fill',prolook.name.color)
				.css('stroke',prolook.name.outline_color);
		
			refreshText();
			refreshNumber();
			refreshBackname();
			
			updateText = false;

		} else {
		
			save();
		
		}

	});

	$('.panel-heading').click(function () {

		$('#basePicker, #colorPicker').hide();

	});

	$(window).ready(function () {

		$('#welcome span,#welcome .btn').click(function () {

			started = true;

			$('#welcome').remove();
			$('.container').css('opacity', '1');

		});

	}, 1000);
	
}

prolook = {
	"base1" : "#ffffff",
	"base2" : "#d00000",
	"base3" : "#000000",
	"base4" : "#e0e0e0",
	"infbase1" : "#ffffff",
	"infbase2" : "#d00000",
	"infbase3" : "#000000",
	"infbase4" : "#e0e0e0",
	"panels" : {
		"front_jersey" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		},
		"base_color" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		},
		"back_jersey" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		},
		"back_panels" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		},
		"bottom_sleeve" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		},
		"side_panel" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		},
		"sleeve_color" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		},
		"back_pant" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		},
		"loops_tunnels" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		},
		"pockets" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		},
		"front_knee" : {
			"fill" : "#ffffff"
		},
		"back_knee" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		},
		"bottom_pants" : {
			"fill" : "#ffffff",
			"piping" : "",
			"material" : "",
			"infusion" : ""
		}
	},
	"pipings" : {
		"arm_end" : {
			"stroke" : ""
		},
		"back_piping" : {
			"stroke" : ""
		},
		"belt_loop" : {
			"stroke" : ""
		},
		"center_piping" : {
			"stroke" : ""
		},
		"raglan" : {
			"stroke" : ""
		},
		"side_pant" : {
			"stroke" : ""
		},
		"side_panel_piping" : {
			"stroke" : ""
		},
		"sleeve_piping" : {
			"stroke" : ""
		},
		"back_pant" : {
			"stroke" : ""
		},
		"bottom_pant" : {
			"stroke" : ""
		}
		
	},
	"name" : {
		"team_name" : "",
		"configuration" : "",
		"color" : "#ffffff",
		"outline_color" : "#000000",
		"outline" : "#000000",
		"material" : "",
		"back_material" : "",
		"typeface" : "1-prolook_athletic",
		"back_name" : "",
		"back_name_color" : "#ffffff",
		"back_name_outline" : "#000000",
		"back_name_typeface" : "1-prolook_athletic"
	},
	"number" : {
		"positions" : "flb",
		"color" : "#ffffff",
		"outline_color" : "#000000",
		"typeface" : "1-prolook_athletic",
		"material" : "",
		"back_material" : "",
		"back_name" : "",
		"back_color" : "#ffffff",
		"back_outline" : "#000000"
	},
	"logo" : {
		"file" : "",
		"position_1" : "no",
		"position_2" : "no",
		"position_3" : "no"
	},
	"team_information" : {
		"jersey_number" : "1",
		"pants_number" : "1",
		"jersey_info" : [{
				"count" : "1",
				"size" : "30",
				"number" : "22",
				"last_name" : "",
				"application" : "DIRECT TO JERSEY"
			}
		],
		"pant_info" : [{
				"count" : "1",
				"size" : "22",
				"inseam" : "24",
				"hem_style" : 'elastic_cuff',
			}
		],
		"order_info" : {
			"Attn" : "---",
			"Address_1" : "---",
			"Address_2" : "---",
			"City" : "---",
			"State" : "---",
			"Zip" : "---",
			"Email" : "---",
			"Special_Notes" : "---",
			"Billing_attn" : "---",
			"Billing_address_1" : "---",
			"Billing_address_2" : "---",
			"Billing_city" : "---",
			"Billing_state" : "---",
			"Billing_zip" : "---",
			"Billing_email" : "---",
			"upload" : "---"
		}
	}
};

var ordId = GetURLParameter('orderid');
if( !(ordId === undefined) ) {
    $.getJSON('http://ddweaver-host.s3.amazonaws.com/newbalance/baseball/builder/orders/'+ ordId +'/order.json', function(data) {
        prolook = data.detailedInfo;
    });
}

tooltips = {
	"colors" : "Choose up to four colors that you'd like to work with. Your choice will carry through the builder. Don't worry, you can change them at any time. ",
	"quickstyles" : "Here you may select a 'Quick Style'  from our popular styles. You may skip this step and build your uniform from scratch.",
	"panels" : "Select one of your chosen colors in the buttons below, then click on the panels that you want to change colors.",
	"pipings" : "Select one of your colors, then click on the piping area that you want to change colors.",
	"infusions" : "Select one of the infusion patterns and their colors below, then click on the panel area that you want to add the infusion to.",
	"materials" : "Choose a material below and click on what area you would like to apply it to.",
	"materials" : "Choose a material below and click on what area you would like to apply it to.",
	"name" : "Type the name of your team in the text box. You may also select the colors, typeface and the text configuration.",
	"number" : "Here you may select the numbers' positioning on your uniform, as well their typeface and colors.",
	"logo" : "You may upload an image file by clicking on the file input in the top of this section. You may also select one of the logos from our gallery. After selecting a logo, you may drag it to the highlighted areas over the uniform.",
	"teaminfo" : "Define how many jerseys and pants you need. Then, set the size of each piece and finalize your order.",
};