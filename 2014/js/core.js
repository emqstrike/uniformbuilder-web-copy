//TODO:
//LIST TARGETABLE PANELS OF INFUSIONS AND MATERIALS

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

	var	model,
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

	createQuickStyles();
	
	setTimeout(function(){
	
		createQsThumbs();
	
	},1000);
	
	$('#basePicker input').click(function () {

		var selectedBase = $(this).attr('data-base');
		var selectedColor = window[selectedBase];
		var invoker = bldr.modalInvoker;
		var obj = invoker.attr('data-obj');
		var mode = invoker.attr('data-mode');
		var opacity;

		//set data on invoker
		invoker.attr('data-base', selectedBase);

		//fill model
		$(invoker.attr('data-target')).css(mode, selectedColor);

		//hide element if it is colorless
		if (selectedBase == 'nocolor' && mode == 'fill') {
			opacity = 0;
		} else {
			opacity = 1;
		}

		$(invoker.attr('data-target')).css('fill-opacity', opacity);

		//update this button
		invoker.css('background-color', selectedColor)

		//update style object
		obj = obj.split('.');
		prolook[obj[0]][obj[1]] = selectedColor;

		//hide modal
		miniModal('hide', '#basePicker');

		save();

	});

	$('#colorPicker input').click(function () {

		var invoker = bldr.modalInvoker;
		var selectedBase = invoker.attr('data-base');
		var selectedColor = $(this).attr('value');

		window[selectedBase] = selectedColor;

		color = selectedColor;

		//hide modal
		miniModal('hide', '#colorPicker');
		
		//update this button
		invoker.css('background-color', selectedColor);

		//write color name under the button
		invoker.siblings('.colorname').html($(this).attr('data-original-title'));
		invoker.attr('title', $(this).attr('data-original-title'));

		//update color inputs
		$('input.' + selectedBase).css('background-color', selectedColor).attr('value', selectedColor);

		//change current color button
		$('.current').css('background-color', selectedColor);

		//update models with base color
		$('.' + selectedBase).css({
			'background-color' : selectedColor,
			'fill' : selectedColor
		});

		//update infusions
		
		var index = bldr.modalInvoker.parent('div').index()-1;
		
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
			//write color name on infusion screen
			
		var colorName = $(this).attr('data-original-title');	
			s
		$('.infpicker').eq(index)
			.find('input').attr('title', colorName) //change name in title
			.siblings('.colorname').html(colorName); //change name in div
		
		var updateText = false;

		//update base selectors
		
		if( $('button[data-base='+selectedBase+']').length > 0){
		
			$('button[data-base='+selectedBase+']').css('background-color', selectedColor);

				var obj =$('button[data-base='+selectedBase+']').attr('data-base').split('.');

				prolook[obj[0]][obj[1]] = selectedColor;

				updateText = true;
		
		
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

		}else{
		
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

function changePiece(part, model) {

	if (typeof part == 'undefined') {

		part = 'jersey';

	}

	if (part != 'jersey' && part != 'pant') {

		part = 'jersey';

	}

	if (typeof model == 'undefined') {

		model = 3000;

	}

	if (model != 3000 && model != 4040) {

		model = 3000;

	}

	if (part == 'pant') {

		sides = ['front', 'side', 'back']

		var c = 0;

		for (var i in sides) {

			var str = a = '<object data="assets/img/' + part + '_' + sides[c] + '_' + model + '.svg" type="image/svg+xml" onload="extract($(this))" id="' + part + '_' + sides[c] + '_' + model + '"></object>';

			$('.option').eq(c + 2).find('svg').replaceWith(str);

			c++;

		}

	}

	if (part == 'jersey') {

		sides = ['front', 'back']

		var c = 0;

		for (var i in sides) {

			var str = a = '<object data="assets/img/' + part + '_' + sides[c] + '_' + model + '.svg" type="image/svg+xml" onload="extract($(this))" id="' + part + '_' + sides[c] + '_' + model + '"></object>';

			$('.option').eq(c).find('svg').replaceWith(str);

			c++;

		}

	}

}

prolook = {
	"base1" : "#d00000",
	"base2" : "#ffffff",
	"base3" : "#000000",
	"base4" : "#e0e0e0",
	"infbase1" : "#d00000",
	"infbase2" : "#ffffff",
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
			"fill" : "",
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
		"back_pants" : {
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
}

styles = [{
		"base1" : "#d00000",
		"base2" : "#ffffff",
		"base3" : "#000000",
		"base4" : "#e0e0e0",
		"panels" : {
			"front_jersey" : {
				"fill" : "#e0e0e0",
				"piping" : "",
				"material" : "mesh_material",
				"infusion" : ""
			},
			"base_color" : {
				"fill" : "#e0e0e0",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"back_jersey" : {
				"fill" : "#e0e0e0",
				"piping" : "",
				"material" : "mesh_material",
				"infusion" : ""
			},
			"back_panels" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#linearGradient');stroke-width:0;"
			},
			"bottom_sleeve" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "mesh_material",
				"infusion" : "fill:url('#GridInfusion');stroke-width:0;"
			},
			"side_panel" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "mesh_material",
				"infusion" : "fill:url('#GridInfusion');stroke-width:0;"
			},
			"sleeve_color" : {
				"fill" : "#e0e0e0",
				"piping" : "",
				"material" : "mesh_material",
				"infusion" : ""
			},
			"back_pant" : {
				"fill" : "",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#GridInfusion');stroke-width:0;"
			},
			"loops_tunnels" : {
				"fill" : "#e0e0e0",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"pockets" : {
				"fill" : "#d00000",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#GridInfusion');stroke-width:0;"
			},
			"back_knee" : {
				"fill" : "#e0e0e0",
				"piping" : "",
				"material" : "mesh_material",
				"infusion" : ""
			},
			"bottom_pants" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#BubblesInfusion');stroke-width:0;"
			}
		},
		"pipings" : {
			"arm_end" : {
				"stroke" : "#d00000"
			},
			"back_piping" : {
				"stroke" : ""
			},
			"belt_loop" : {
				"stroke" : "#d00000"
			},
			"center_piping" : {
				"stroke" : ""
			},
			"raglan" : {
				"stroke" : "#d00000"
			},
			"side_pant" : {
				"stroke" : ""
			},
			"side_panel_piping" : {
				"stroke" : "#d00000"
			},
			"sleeve_piping" : {
				"stroke" : "#d00000"
			},
			"back_pants" : {
				"stroke" : "#d00000"
			}
		},
		"name" : {
			"team_name" : "CHIEFS ",
			"configuration" : "straight",
			"color" : "#d00000",
			"outline_color" : "#ffffff",
			"material" : "none",
			"back_material" : "none",
			"typeface" : "1-prolook_athletic",
			"back_name" : "yes",
			"back_name_color" : "#d00000",
			"back_name_outline" : "#ffffff",
			"back_name_typeface" : "1-prolook_athletic"
		},
		"number" : {
			"positions" : "flb",
			"color" : "#ffffff",
			"outline_color" : "#d00000",
			"typeface" : "1-prolook_athletic",
			"material" : "none",
			"back_material" : "none",
			"back_name" : "yes",
			"back_color" : "#d00000",
			"back_outline" : "#ffffff"
		},
		"logo" : {
			"file" : "http://demos.marcellus.tv.s3.amazonaws.com/newbalance/baseball/logos/b8.svg",
			"position_1" : "no",
			"position_2" : "no",
			"position_3" : "no",
			"position_6" : "yes"
		},
		"team_information" : {
			"jersey_number" : "2",
			"pants_number" : "2",
			"jersey_info" : [{
					"count" : 1,
					"size" : "28",
					"number" : "24",
					"last_name" : "",
					"application" : "DIRECT TO JERSEY"
				}
			],
			"pant_info" : [{
					"count" : 1,
					"size" : "22",
					"inseam" : "24",
					"hem_style" : "elastic_cuff"
				}, {
					"size" : "24",
					"count" : 2,
					"inseam" : "23",
					"hem_style" : "elastic_cuff"
				}
			],
			"order_info" : {
				"Attn" : "Quick style # 3",
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
		},
		"orderId" : orderId,
		"infbase1" : "#d00000",
		"infbase2" : "#ffffff",
		"infbase3" : "#000000",
		"infbase4" : "#e0e0e0"
	}, {
		"base1" : "#d00000",
		"base2" : "#ffffff",
		"base3" : "#000000",
		"base4" : "#e0e0e0",
		"panels" : {
			"front_jersey" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"base_color" : {
				"fill" : "#000000",
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
				"fill" : "#000000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"side_panel" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#NewBalance_Camo');stroke-width:0;"
			},
			"sleeve_color" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#NewBalance_Camo');stroke-width:0;"
			},
			"back_pant" : {
				"fill" : "#000000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"loops_tunnels" : {
				"fill" : "#d00000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"pockets" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#NewBalance_Camo');stroke-width:0;"
			},
			"back_knee" : {
				"fill" : "#000000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"bottom_pants" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#NewBalance_Camo');stroke-width:0;"
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
			"back_pants" : {
				"stroke" : "#ffffff"
			}
		},
		"name" : {
			"team_name" : "RAVENS",
			"configuration" : "straight",
			"color" : "#d00000",
			"outline_color" : "#000000",
			"material" : "none",
			"back_material" : "none",
			"typeface" : "1-prolook_baccusexpanded",
			"back_name" : "Yes",
			"back_name_color" : "#000000",
			"back_name_outline" : "#d00000",
			"back_name_typeface" : "1-prolook_baccusexpanded"
		},
		"number" : {
			"positions" : "flb",
			"color" : "#d00000",
			"outline_color" : "#000000",
			"typeface" : "1-prolook_athletic",
			"material" : "none",
			"back_material" : "none",
			"back_name" : "yes",
			"back_color" : "#d00000",
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
					"count" : 1,
					"size" : "28",
					"number" : "21",
					"last_name" : "JOHNSON",
					"application" : "DIRECT TO JERSEY"
				}
			],
			"pant_info" : [{
					"count" : 1,
					"size" : "34",
					"inseam" : "22",
					"hem_style" : "open_cuff"
				}
			],
			"order_info" : {
				"Attn" : "Quick Style #2",
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
		},
		"orderId" : orderId,
		"infbase1" : "#d00000",
		"infbase2" : "#ffffff",
		"infbase3" : "#000000",
		"infbase4" : "#e0e0e0"
	}, {
		"base1" : "#d00000",
		"base2" : "#ffffff",
		"base3" : "#000000",
		"base4" : "#e0e0e0",
		"panels" : {
			"front_jersey" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "mesh_material",
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
				"material" : "mesh_material",
				"infusion" : ""
			},
			"back_panels" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "mesh_material",
				"infusion" : ""
			},
			"bottom_sleeve" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#NewBalance_Camo');stroke-width:0;"
			},
			"side_panel" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#NewBalance_Camo');stroke-width:0;"
			},
			"sleeve_color" : {
				"fill" : "#d00000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"back_pant" : {
				"fill" : "",
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
				"fill" : "#d00000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
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
				"infusion" : "fill:url('#NewBalance_Camo');stroke-width:0;"
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
				"stroke" : "#000000"
			},
			"center_piping" : {
				"stroke" : ""
			},
			"raglan" : {
				"stroke" : "#000000"
			},
			"side_pant" : {
				"stroke" : ""
			},
			"side_panel_piping" : {
				"stroke" : "#000000"
			},
			"sleeve_piping" : {
				"stroke" : "#000000"
			},
			"back_pants" : {
				"stroke" : ""
			}
		},
		"name" : {
			"team_name" : "HAWKS",
			"configuration" : "Straight",
			"color" : "#000000",
			"outline_color" : "#d00000",
			"material" : "none",
			"back_material" : "none",
			"typeface" : "1-prolook_spartans_0",
			"back_name" : "yes",
			"back_name_color" : "#d00000",
			"back_name_outline" : "#000000",
			"back_name_typeface" : "1-prolook_athletic"
		},
		"number" : {
			"positions" : "flb",
			"color" : "#d00000",
			"outline_color" : "#000000",
			"typeface" : "1-prolook_spartans_0",
			"material" : "none",
			"back_material" : "none",
			"back_name" : "yes",
			"back_color" : "#000000",
			"back_outline" : "#d00000"
		},
		"logo" : {
			"file" : "http://demos.marcellus.tv.s3.amazonaws.com/newbalance/baseball/logos/b17.svg",
			"position_1" : "no",
			"position_2" : "no",
			"position_3" : "no",
			"position_6" : "yes"
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
					"hem_style" : "elastic_cuff"
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
		},
		"orderId" : orderId,
		"infbase1" : "#d00000",
		"infbase2" : "#000000",
		"infbase3" : "#000000",
		"infbase4" : "#e0e0e0"
	}, {
		"base1" : "#d00000",
		"base3" : "#ffffff",
		"base2" : "#000000",
		"base4" : "#e0e0e0",
		"panels" : {
			"front_jersey" : {
				"fill" : "#000000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"base_color" : {
				"fill" : "#000000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"back_jersey" : {
				"fill" : "#d00000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"back_panels" : {
				"fill" : "#d00000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"bottom_sleeve" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#BubblesInfusion');stroke-width:0;"
			},
			"side_panel" : {
				"fill" : "#000000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"sleeve_color" : {
				"fill" : "#000000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"back_pant" : {
				"fill" : "",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"loops_tunnels" : {
				"fill" : "#000000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"pockets" : {
				"fill" : "#d00000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"back_knee" : {
				"fill" : "#000000",
				"piping" : "",
				"material" : "",
				"infusion" : ""
			},
			"bottom_pants" : {
				"fill" : "#ffffff",
				"piping" : "",
				"material" : "",
				"infusion" : "fill:url('#NewBalance_Camo');stroke-width:0;"
			}
		},
		"pipings" : {
			"arm_end" : {
				"stroke" : "#d00000"
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
				"stroke" : "#d00000"
			},
			"side_pant" : {
				"stroke" : ""
			},
			"side_panel_piping" : {
				"stroke" : "#d00000"
			},
			"sleeve_piping" : {
				"stroke" : "#d00000"
			},
			"back_pants" : {
				"stroke" : ""
			}
		},
		"name" : {
			"team_name" : "VALLEY",
			"configuration" : "Straight",
			"color" : "#d00000",
			"outline_color" : "#ffffff",
			"material" : "none",
			"back_material" : "none",
			"typeface" : "francebold",
			"back_name" : "yes",
			"back_name_color" : "#d00000",
			"back_name_outline" : "#000000",
			"back_name_typeface" : "1-prolook_athletic"
		},
		"number" : {
			"positions" : "bo",
			"color" : "#d00000",
			"outline_color" : "#000000",
			"typeface" : "1-prolook_athletic",
			"material" : "none",
			"back_material" : "none",
			"back_name" : "yes",
			"back_color" : "#d00000",
			"back_outline" : "#ffffff"
		},
		"logo" : {
			"file" : "logos/b18.svg",
			"position_1" : "no",
			"position_2" : "no",
			"position_3" : "no",
			"position_6" : "yes"
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
					"hem_style" : "elastic_cuff"
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
		},
		"orderId" : orderId,
		"infbase1" : "#d00000",
		"infbase2" : "#000000",
		"infbase3" : "#000000",
		"infbase4" : "#e0e0e0"
	}
];

//BLDR PERFORMANCE
//13/11/2014
//FIREFOX: 280MB, 
//CHROME: 107MB