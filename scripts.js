//THESE LINES MUST BE UNCOMMENTED IN ORDER TO ALLOW PROPER LOADING ON IE
// if (!("console" in window) || !("firebug" in console)) {
	// var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
	// window.console = {};
	// for (var i = 0, len = names.length; i < len; ++i) {
		// window.console[names[i]] = function () {};
	// }
// }

bldr = {}; 

bldr.panels = {
	"front_jersey" 	: ['#path3217','#path3217'],
	
	"front_knee"	: ["#knees_front_front","#knees_front_side"],
	"back_knee" 	: ['#path334961','#path3341'],
	
	"bottom_sleeve" : ['#path3317','#path3309'],
	"sleeve_color" 	: ['#path3325','#path3333'],
	"base_color" 	: ['#path4065','#path3935','#path3545-2'],
	
	"back_jersey" 	: ['#back_jersey_inner','#path3281'],//3281 -> only in 4040
	"side_panel" 	: ['#path3301','#path3293'],
	
	"back_panels"	: ['#path3285'],
	"loops_tunnels" : ['#path4088','#path3221','#path321341','#path3213-4'],
	"pockets" 	: ['#path41169','#path318921','#path3189-2'],
	"back_knee" 	: ['#path3341','#path334961'],
	"back_pant" : ['#g4453','#path32655','#path3273','#path3269'],
	"bottom_pants" 	: ['#path3181','#path31771'],
};

bldr.pipings = {
	"arm_end" 		: ['#path3087','#path3095'],
	"back_piping" 		: ['#path3115'],
	"center_piping" 	: ['#path3136','#path3116'],
	"raglan" 		: ['#path3121','#path3138'],
	"side_panel_piping" 	: ['#path3159','#path3142'],
	"sleeve_piping" 	: ['#path3163','#path3180'],
	
	
	"side_pant" 	: ['#side_pant_side','#side_pant_front'],
    // "side_pant" 	: ['#path3193', '#path4279','#path4299', '#path4355', '#path4371'],
	"bottom_pant" 	: ['#bottom_pant'],
	"back_pant" 	: ['#path3875-3','#path3270', '#path3187', '#path4411', '#path4419', '#back_pant_front'],
	"belt_loop" 	: ['#path3189', '#belt_loop_back', '#belt_loop_front'],
	
	
};

bldr.infusions = {
	"sleeve_color" 	: ['#path3325','#path3333', '#path3333inf'],
    "bottom_sleeve" :['#path3309','#path3317'],
	"back_panels"	: ['#path3285'],
	"side_panel" 	: ['#path3301','#path3293'],
	"back_pant" : ['#g4453','#path32655','#path3273','#path3269'],
    "bottom_pant" : ['#path31771', '#path3181']
};

bldr.materials = {
		"back_knee" :['#path334961','#path3341'],
	"back_pant" : ['#g4453','#path32655','#path3273','#path3269'],
	
	"front_jersey" : ['#path3217','#path3217'],
	"side_panel" : ['#path3301','#path3293'],
	"bottom_sleeve" : ['#path3317','#path3309'],
	"sleeve_color" : ['#path3325','#path3333'],
	// "base_color" : ['#path4065','#side_pant_front','#path3545-2'],
	"back_jersey" : ['#back_jersey_inner', '#path3281'],
    	"back_panels"	: ['#path3285']

};

bldr.colors = {
	'black':'#000000',
	'white':'#ffffff', 
	'red':'#d00000', 
	'cardinal':'#a00000', 
	'maroon':'#680000', 
	'purple':'#492f91', 
	'navy_blue':'#002D62', 
	'royal_blue':'#005CA9', 
	'columbia_blue':'8fc6e6', 
	'turquoise ':'39bad9', 
	'kelly_green':'008000', 
	'forest_green':'005200', 
	'yellow':'FFFF00', 
	'gold':'FFD900', 
	'old_gold':'DAA520', 
	'vegas_gold':'D2B48C', 
	'silver_grey':'e0e0e0', 
	'grey':'A8A8A8', 
	'charcoal_grey':'585858', 
	'brown':'4d2d01', 
	'orange':'F58300', 
	'texas_orange':'d17307', 
	'tennesse_orange':'FCAB35'
};
 
baseHost = 'http://ddweaver-host.s3.amazonaws.com/';
baseUrl = 'http://ddweaver-host.s3.amazonaws.com/newbalance/baseball';
bucket = 'ddweaver-host';

base1 = "#ffffff";
base2 = "#d00000";
base3 = "#000000";
base4 = "#e0e0e0";

infbase1 = "#ffffff";
infbase2 = "#d00000";
infbase3 = "#000000";
infbase4 = "#e0e0e0";

started = false;
parts = 0;

recent = ['', '', '', '', ''];
repeated = 0;
infusion = '';
recentAmount = 5;
fontColor = '#eb2323';
backColor = '#000';
factor = 1.5;
color = "";
zoomLevel = 5;
nocolor = "";


AWS.config.update({accessKeyId:'AKIAJYPPZOTE3N7J7XBA',secretAccessKey: '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'});

/*Added by Song Oct 23 2014
 * Get the parameter value from URL
*/
function GetURLParameter(sParam){
	var sPageURL = window.location.href;
	
	/*Added by Leo Nov 14 2014
		* Return if no parameter
	*/
	if(sPageURL.split('#!').length < 2)
		return;
	
	var sURLVariables = sPageURL.split('#!');
    var sURLParams = sURLVariables[1].split('&');
    for (var i = 0; i < sURLParams.length; i++) 
    {
        var sParameterName = sURLParams[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function extract(obj,count) {

	myid = obj.attr('id');
	var svg = document.getElementById(myid);
	var svg = svg.contentDocument;
	var svg = svg.documentElement;

	$('#' + myid).replaceWith(svg);
	
	if(typeof count != 'undefined' && count == false){
	
		q++;
		return;
		}else{
			partsLoaded();
		}
		
		
	
}

function partsLoaded(){

		parts++;
		
		// console.log('loaded '+parts+'/'+'13');
		
		if(parts != 13)
			return;

		init();
		
}

function refreshBackname() {

	var fillOpacity, strokeOpacity = 1;

	if(!started)
		return;

	var typeFace = prolook.name.back_name_typeface;

	$("#backname").css('font-size', '20px');
	
	typeFace = typeFace.replace("'", '').replace('"', '').replace("'", '').replace('"', '');
	
	if (typeFace == "1-prolook_upright") {
		$("#backname").css('font-size', '12px');
	} else if (typeFace == '1-prolook_skyline') {
		$("#backname").css('font-size', '17px');
	} else if (typeFace == '1-prolook_spartans_0') {
		$("#backname").css('font-size', '16px');
	} else if (typeFace == 'francebold') {
		$("#backname").css('font-size', '18px');
	} else if (typeFace == '1-prolook_brushscript') {
		$("#backname").css('font-size', '15px');
	}
	
	$('#backname').css('font-family', '"' + typeFace + '"');

	
	$('#backnamestyle').html("<style>@font-face {	font-family: '" + typeFace + "';	src: local('?'), url('assets/fonts/" + typeFace + ".woff') format('woff'), url('assets/fonts/" + typeFace + ".svg') format('svg');	font-weight: normal;	font-style: normal;}</style>");

	$("#backname").css({
		'fill'		:	prolook.name.back_name_color,
		'stroke'	:	prolook.name.back_name_outline
	});
	
	if(prolook.name.back_name_color == '')
		fillOpacity = 0;
	if(prolook.name.back_name_outline == '')	
		strokeOpacity = 0;
		
	$('#backname').css({
		'fill-opacity' : fillOpacity,
		'stroke-opacity' : strokeOpacity
	});	
	
	save();
}

function createQuickStyles(){

	var o = ''; //output
	var n = 0; //piece number

	for (i = 1; i < 5; i++) {

		o = o + '<object id="qssvg'+i+'" data="assets/img/jersey_front_' + bldr.jersey_model + '.svg" type="image/svg+xml" onload="extract($(this),false);"></object>';
		
		$('#jsonpieces svg:last').attr('data-style',i).attr('id','jsonpiece'+i);
		
		n++;

	}

	$('#jsonpieces').html(o);
	
	$('#jsonpieces').on('click','svg',function(){
		
			var n = $(this).index();
			
			applyStyle(styles[n],n);
			
		
	});

}

bldr.tag = function(tgt){
	$('.tgt').attr('class', '');
	
	for(var i in bldr[tgt]){
		for(var p in bldr[tgt][i]){
			$('#selected '+bldr[tgt][i][p]+',.option '+bldr[tgt][i][p]).attr('class',i+' tgt');
		}
	}
	
	highlightTargets();
};

function init(){

	loaded = false;

	selection($('.selected svg'));
	
	painting();

	$('.option').click(function () {

		selection($(this).children('.selector'));

		highlightTargets();

	});

	$('.panel-title').click(function () {

		$('body').removeClass('bucket');

	});

	$('.colors').click(function () {

		section = '';
		$('body').removeClass('bucket');
		$('.tgt').attr('class', '');

	});

	$('.panels').click(function () {

		section = "panels";
		
		bldr.tag(section);
	
		$('body').addClass('bucket');
		$('#selected').removeClass('eraser');

	});

	$('.pipings').click(function () {

		$('.tgt').attr('class', '');
		section = "pipings";
		if (typeof color == "undefined") {
			color = selectedColor;
		}

		bldr.tag(section);

		$.each($('.tgt'), function () {
			section = "pipings";
			if ($(this).css('fill') == 'none') {

				$(this).css('stroke-width', '0');
				$(this).css('fill', 'white'); // SAFARI (NEEDS TO HAVE FILL TO BE HOVERABLE
				$(this).css('fill-opacity', '0'); //SAFARI

			}

		});

		$('body').addClass('bucket');
		$('#selected').removeClass('eraser');

	});

	$('#collapseInf').on('shown.bs.collapse', function () {

		infusion = 'fill:url("#camoInfusion")';
		section = "infusions";
		bldr.tag(section); 

		changeSection('infusions');

		$('.picked').attr('class', '');
		$('.tgt').attr('class', '');
		$('#selected').removeClass('eraser');
		
		$('.infusions svg').click(function () {
			
			infusion = $(this).find('rect').attr('style');

			$('.picked').removeClass('picked');
			$('.infusions svg').attr('class', '');
			$(this).attr('class', 'picked');

			bldr.tag(section);

			$('body').addClass('bucket');
			$('#selected').removeClass('eraser');

			// $('#currentInf').html($(this).clone().attr('id','usedInf'));
			//HIDE ADDITIONAL COLORS
			if (infusion.indexOf('linearGradient') > -1 || infusion.indexOf('halftone_fade') > -1 ||  infusion.indexOf('Grid') > -1) {
			
				a = $('.infpicker')[2];
				a = $(a).find('.picker, .colorname');
				$(a).css('opacity', '0');

				b = $('.infpicker')[3];
				b = $(b).find('.picker, .colorname');
				$(b).css('opacity', '0');

				if (!infusion == 'gridInfusion') {

					c = $('.infpicker')[1];
					c = $(c).find('.picker, .colorname');
					$(c).css('opacity', '0');

				}


			} else {

				$('.infpicker .picker, .infpicker .colorname').css('opacity', '1');

			}

		});

		$(this).children('.panel-body').css('opacity', '1');

	});
	

	$('#collapseMat').on('shown.bs.collapse', function () {

		section = 'materials';
		
		$('.picked').attr('class', '');
		$('#selected').removeClass('eraser');
		$(this).children('.panel-body').css('opacity', '1');

		$('.materials svg').click(function () {
			
			material = $(this).attr('data-material');
			
			$('.picked').attr('class', '');
			
			$(this).attr('class', 'picked');

			if ($('#namemat').length < 1) {

				$('#namereceiver').after($('#namereceiver').clone().attr('id', 'namemat'));

			}

			bldr.tag('materials');
			
			$('#namemat tspan').attr('class', 'teamname tgt');
			$('#backnumbermat').attr('class', 'backnumber tgt');
			$('#backnamemat').attr('class', 'backname tgt');
			$('#tnleftmat,#tnrightmat').attr('class', 'number tgt');

			highlightTargets();

			$('body').addClass('bucket');
			$('#selected').removeClass('eraser');

		});
		
	});

	$('#eraser span').click(function () {
		$('.tgt').attr('class', '');
		if (section != "eraser")
			document.target = section;
		
		bldr.tag(document.target);

		$('.tgt').css('stroke-width', '0');

		section = 'eraser';
		$('body').removeClass('bucket');
		$('#selected').addClass('eraser');

	});

	$('#help').click(function () {
		$('body').chardinJs('start')
		$('.colors .panel-body').tooltip('hide');
		$('.logobleed').css('fill', '#333');

		$('.chardinjs-overlay').click(function () {

			$('.logobleed').css('fill', '#fff');
			$('.selected .logobleed').css('fill', '#C6E1EC');

		});

	});

	$('.colorsel input').click(function () {

		$('.picked').removeClass('picked');
		$(this).addClass('picked');

		color = $(this).val();
		currentColor = $(this).attr('data-base');
		$('.current').css('background-color', color).attr('value', color); ;

	});

	$('#zoomin').click(function () {

		$('body').removeClass('bucket');

		a = zoom[$("#selected svg").attr('id')] * 2;
		$("#selected svg").attr('width', a);
		$("#selected svg").attr('height', 500 * 2);

		// $('#selected svg').css('zoom','200%');
		$('#selected svg').draggable(); //MAKE IT DRAGGABLE
		
		reRenderLogos();

	});

	$('#zoomout').click(function () {

		$('body').removeClass('bucket');
		a = zoom[$("#selected svg").attr('id')];
		$("#selected svg").attr('width', a);
		$("#selected svg").attr('height', 500);
		$('#selected svg').css('top', '0px').css('left', '0px');
		$('#selected svg').draggable("destroy");
		
		reRenderLogos();
		
	});

	//FORM CONTROLS

	$('#nameinput').blur(function () {

		prolook.name.team_name = $(this).val();
		
		refreshText();

	});

	$('#fontcfg').change(function () {

		prolook.name.typeface = $('#fontcfg').val();
		
		refreshText();

	});

	$('#numberinput').blur(function () {
		$('#teamnumber').html($(this).val());
	});

	$('#namecfg').change(function () {

		$('#nameloader').html('<object id="svgname" data="assets/img/' + $(this).val() + '.svg" type="image/svg+xml" onload="extract($(this));loadText();"></object>');

		refreshText();

		prolook.name.configuration = $(this).val();
	});
	
	$('#fontfill input').click(function () {
		prolook.name.color = $(this).val();
	});

	$('#fontoutline input').click(function () {
		prolook.name.outline_color = $(this).val();
	});

	$('#numberfrontfill input').click(function () {
		prolook.number.color = $(this).val();
	});

	$('#numberfrontoutline input').click(function () {
		prolook.number.outline_color = $(this).val();
	});

	$('#numberbackfill input').click(function () {
		prolook.number.back_color = $(this).val();
	});

	$('#numberbackoutline input').click(function () {
		prolook.number.back_outline = $(this).val();
	});

	// $('#tnleft').css('opacity', '0').css('display', 'none');
	$('#tnright').css('opacity', '1').css('display', 'block');

	$('#numberlocation').change(function () {

		prolook.number.positions = $(this).val();

		if ($(this).val() === 'all') {
			$('.teamnumber, #backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
		}
		if ($(this).val() === 'frb') {
			$('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
			$('#tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
		}
		if ($(this).val() === 'flb') {
			$('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
			$('#tnleft, #tnleftmat, #backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
		}
		if ($(this).val() === 'bo') {
			$('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
			$('#backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
		}
		if ($(this).val() === 'fo') {
			$('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
			$('.teamnumber').css('opacity', '1').css('display', 'block');
		}

	});

	$('#numbercfg').change(function () {
		refreshNumber();
	}).ready(function () {
		refreshNumber();
	});

	$('#backnamecfg').change(function () {
	
		prolook.name.back_name_typeface	=	$('#backnamecfg').val();
	
		refreshBackname();
		
	}).ready(function () {
	
		refreshBackname();
		
	});

	$(window).bind("load", function () {
		$('#selected #tspan3017').addClass('shown');
	});

	$('#sameship').change(function () {

		if ($('#sameship').is(':checked')) {

			i = 1;

			$.each($('#yourmodal fieldset:nth-child(1) input'), function () {
				a = $(this).val();
				b = $('#yourmodal fieldset:nth-child(2) input')[i];
				
				tgt = $(b).attr('data-tgt');

				setKey(tgt, a, prolook.team_information.order_info);

				$(b).attr('value', a);
				i++;
			});

		} else {

			$('#yourmodal fieldset:nth-child(2) input').attr('value', '');

		}

	});

	$('select').selectpicker({
		style : 'btn-info',
		size : 4,
		container : '.container'
	});

	//AJAX FORM IN TEAMINFO

	$('#hmjerseys').change(function () {
	
		prolook.team_information.jersey_number = $(this).val();

		tlength = $('#jerseyinfo .teamdata').rowCount();

		if (tlength < $(this).val()) { //ADDING LINES

			i = $(this).val() - tlength; //HOW MANY LINES TO ADD

			for (i = tlength + 1; i <= $(this).val(); i++) {

				row = $('#jerseyinfo .teamdata tbody tr')[1];
				row = $(row).clone();
				$(row).find('.btn-group.select').remove();
				$(row).find('td:first').text(i);
				$(row).find('td:last select').attr('id', 'app' + i);

				$('#jerseyinfo .teamdata tbody').append(row);
				$(row).find('select').selectpicker();
				$(row).find('.dropdown-toggle').addClass('btn-info');

			}

		}

		if (tlength > $(this).val()) { //REMOVING LINES

			i = $(this).val() - tlength; //HOW MANY LINES TO REMOVE

			for (i = tlength; i > $(this).val(); i--) {

				$('#jerseyinfo .teamdata tbody tr')[i].remove();

			}

		}

		//JERSEY INFORMATION
		$('#jerseyinfo .teamdata input').unbind('blur');
		$('#jerseyinfo .teamdata a').unbind('click');
		//    $('#jerseyinfo .teamdata input, #jerseyinfo .teamdata select').unbind('blur');
		$('#jerseyinfo .teamdata input').blur(function () {
			tgt = $(this).attr('data-tgt');
			val = $(this).val();
			index = $(this).parent('td').siblings('td:first');
			index = $(index).html() - 1;

			if (typeof prolook.team_information.jersey_info[index] == 'undefined') {
				prolook.team_information.jersey_info[index] = {};
				a = $(this).parents('tr')
					$(a).find('input, select').blur();
			}
			prolook.team_information.jersey_info[index].application = "DIRECT TO JERSEY";
			setKey(tgt, val, prolook.team_information.jersey_info[index]);
			prolook.team_information.jersey_info[index].count = index + 1;

		});
		$('#jerseyinfo .teamdata a').click(function () {
			// tgt = $(this).parent('div').attr('data-tgt');
			//   val = $(this).find('input').val();
			tgt = $(this).attr('data-tgt');
			val = $(this).text();
			index = $(this).parent('li').parent('ul').parent('div').parent('td').siblings('td:first');
			index = $(index).html() - 1;
			if (typeof prolook.team_information.jersey_info[index] == 'undefined') {
				prolook.team_information.jersey_info[index] = {};
				a = $(this).parents('tr')
					$(a).find('input, select').blur();
			}
			prolook.team_information.jersey_info[index].application = val;
			setKey(tgt, val, prolook.team_information.jersey_info[index]);
			prolook.team_information.jersey_info[index].count = index + 1;

		});
		
		teamInfoValidation($('.jerseynumber'),54)
		
	});

	$('#hmpants').change(function () {

		prolook.team_information.pants_number = $(this).val();

		tlength = $('#pantinfo .teamdata').rowCount();

		if (tlength < $(this).val()) { //ADDING LINES

			i = $(this).val() - tlength; //HOW MANY LINES TO ADD

			for (i = tlength + 1; i <= $(this).val(); i++) {

				row = $('#pantinfo .teamdata tbody tr')[1];
				row = $(row).clone();

				$(row).find('td:first').text(i);

				$('#pantinfo .teamdata tbody').append(row);

			}

		}

		if (tlength > $(this).val()) { //REMOVING LINES

			i = $(this).val() - tlength; //HOW MANY LINES TO REMOVE

			for (i = tlength; i > $(this).val(); i--) {

				$('#pantinfo .teamdata tbody tr')[i].remove();

			}

		}

		$('#pantinfo .teamdata input').unbind('blur');
		$('#pantinfo .teamdata label').unbind('click');
		setTimeout(function () {

			$('#pantinfo .teamdata input').blur(function () {

				tgt = $(this).attr('data-tgt');
				val = $(this).val();

				if (tgt == undefined) {
					return;
				}

				index = $(this).parent('td').siblings('td:first');
				index = $(index).html() - 1;

				if (typeof prolook.team_information.pant_info[index] == 'undefined') {
					prolook.team_information.pant_info[index] = {};
					a = $(this).parents('tr');
					$(a).find('input, select').blur();
				}

				setKey(tgt, val, prolook.team_information.pant_info[index]);

				prolook.team_information.pant_info[index].count = index + 1;
			});
			$('#pantinfo .teamdata label').click(function () {
				//console.log($(this));

				tgt = $(this).parent('div').attr('data-tgt');
				val = $(this).find('input').val();
				index = $(this).parent('div').parent('td').siblings('td:first');
				index = $(index).html() - 1;
				if (typeof prolook.team_information.pant_info[index] == 'undefined') {
					prolook.team_information.pant_info[index] = {};
					a = $(this).parents('tr');
					$(a).find('input, select').blur();
				}
				prolook.team_information.pant_info[index].hem_style = val;
				setKey(tgt, val, prolook.team_information.pant_info[index]);

				prolook.team_information.pant_info[index].count = index + 1;

				//console.log(val);

			});

		}, 200);
		
		teamInfoValidation($('.pantnumber'),54);

	});
	
	function teamInfoValidation(obj,limit){
	
		obj.change(function(){

			if($(this).val() % 2 != 0){

				$(this).tooltip({trigger:'manual hover',title:'The size must be an even number.'});
			
				setTimeout(function(){
					$(this).tooltip('show');
				},200);

				$(this).addClass('error');

			}
			else if($(this).val() > limit){
			
				$(this).tooltip('destroy');
			
				$(this).tooltip({trigger:'manual hover',title:'Must size must be '+limit+' or smaller.'});
			
			}
			
			else{

				$(this).removeClass('error');
				
				$(this).tooltip('destroy');

			}


		});
	
	}

	$('#lastnameyn').change(function () {

		tlength = $('#pantinfo table').rowCount();

		prolook.name.back_name = $(this).val();

		if ($(this).val() == 'Yes') {
			$('#backname').css('fill-opacity', '1').css('display', 'block');
			$('.backnameoptions').css('height', 'auto').css('overflow', 'visible');

		} else {
			$('#backname').css('fill-opacity', '0').css('display', 'none');
			$('.backnameoptions').css('height', '0').css('overflow', 'hidden');

		}
		
	});

	//FILL COLOR SELECTION
	$.each($('.colors input, .infpicker input'), function () {
		$(this).css('background-color', $(this).val());
	});

	$.each($('.toggler'), function () {
		$(this).siblings('.colorname').html($(this).attr('title'));
	});

	$('.colors .picker').click(function () {

		setTimeout(function () {

			$('#collapseOne .helptip').tooltip('show').tooltip('hide'); // SAFARI - ALLOWS DROPDOWN TO APPEAR

		}, 200);

	});

	//TOOLTIPS

	$.each($('.helptip'), function () {

		$(this).tooltip({
			animation : 'true',
			placement : 'bottom',
			container : 'body',
			title : tooltips[$(this).attr('data-section')]
		});

	});

	setTimeout(function () {

		$('.colors .panel-body').tooltip({
			trigger : 'click',
			animation : 'true',
			placement : 'right',
			title : 'Building your own uniform is easy. Start here.'
		});
		$('.cpicker, .infpicker').css('opacity', '1');
		$('.colors .panel-body').tooltip('show');

		$('.panel-title, .colors input').click(function () {

			$('.colors .panel-body').tooltip('destroy');

		});

		$('#collapsePanels').on('shown.bs.collapse', function () {

			section = 'panels';

			// color = $('#collapsePanels .current').val();

		});

		$('#collapsePipings').on('shown.bs.collapse', function () {

			section = 'pipings';

		});

		$('#collapseInf').on('shown.bs.collapse', function () {

			section = 'infusions';

		});
	
		$('#collapseLogo').on('shown.bs.collapse', function () {

			section = "logo";

			$('#collapseLogo .panel-body').tooltip({
				trigger : 'manual',
				animation : 'true',
				placement : 'right',
				title : 'Upload a JPEG, GIF or PNG image and place and place it in your uniform. You may also choose one logo from our gallery. After selecting an image, drag it to the hotspots in your jersey or in the front pant.'
			});
			
			$('#collapseLogo .panel-body').tooltip('show');
			
			$('#collapseLogo .panel-body').click(function(){
				
				$('#collapseLogo .panel-body').tooltip('destroy');
			
			});
			
			$('.quickstyles svg defs').remove(); // DELETE DEFS ON QUICKSTYLES TO ALLOW LOGO CROPPING ON MOZILLA

		});

	}, 500);

	$('#eraser').tooltip({
		container : 'body'
	});

	$('#eraser').hover(function () {
	
		if(typeof section === 'undefined')
			return;

		if (section == "pipings") {

			$(this)
			.attr('data-original-title', 'Erase Pipings')
			.tooltip('fixTitle');

		}
		if (section == "panels") {

			$(this)
			.attr('data-original-title', 'Erase Panels')
			.tooltip('fixTitle');

		}
		if (section == "infusions") {

			$(this)
			.attr('data-original-title', 'Erase Infusions')
			.tooltip('fixTitle');

		}
		if (section == "materials") {

			$(this)
			.attr('data-original-title', 'Erase Materials')
			.tooltip('fixTitle');

		}
		if (section == "logo") {

			$(this)
			.attr('data-original-title', 'Erase Logos')
			.tooltip('fixTitle');

		}

		$(this).tooltip('show');

	}, function () {});

	$('#pantsmodal').on('show.bs.modal', function () {
		pantsModal();
	});

	$('#myImage').change(function () {
		$('#btnSave').removeClass('disabled');

		readURL(this);
		
	});

	//CREATE MODAL LOGOS
	modalLogos = $('#logosmodal .modal-body');

	for (i = 1; i < 19; i++) {

		modalLogos.append(

			'<div class="thumb"><img src="logos/b' + i + '.svg" width="50"></div>');

	}
	//MAKE MODAL LOGOS CLICKABLE
	$('#logosmodal img').click(function () {

		$('#imagePreview').css('display', 'inline').attr('src', $(this).attr('src'));

		$('#logosmodal').modal('hide');
		logoDrag();

	});
	
	$.each($('#logosmodal img'),function(){
	
		href = baseUrl+$(this).attr('href');
		
		$(this).attr('href',href);
	
	
	});

	$('body').addClass('ready');

	tagClass('selected');
	tagClass('sidebar');

	$('#welcome').on('click','.bordered',function(){
	
		$('.selected').removeClass('selected');
		$(this).addClass('selected');
	
	});
	
	//DISPLAY UI

	firstVisit();
	
	$('#loading').hide();

	setTimeout(function(){
		
		//Apply default font to the back name
		refreshBackname();
	
	},500);
	
    $(document).on('click', '#saveLater', function() {
        $('#saveForLater').val(0);
        $('#saveStyle').trigger('submit');
    }).on('click', '#saveToLocker', function() {
        $('#saveForLater').val(1);
        $('#saveStyle').trigger('submit');
    });

	$('#saveStyle').submit(function(event) {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;

		$('.modal').slideUp();
		$('#processing').show();

		// styleUpload();
		setTimeout(function() {
			htmlUpload();
			if( $('#saveForLater').val() == 1 ) notifyOrder(orderId, baseUrl+'/builder/orders/' + orderId + '/' + 'order.html');
		}, 500);
	});

	if (typeof InstallTrigger !== 'undefined') { //IF FIREFOX...

		$('#hmjerseys,#hmpants').spinner();

	}

	$('#btnSave').click(function () {
		$('#btnSave').toggleClass('disabled');
	});

	//TEAM INFORMATION
	$('.teaminfo .fifty-p input').change(function () {

		tgt = $(this).attr('data-tgt');
		val = $(this).val();

		setKey(tgt, val, prolook.team_information);

	});

	//TEAM INFORMATION - ORDER INFO
	$('#yourmodal input, #yourmodal textarea').change(function () {

		tgt = $(this).attr('data-tgt');
		val = $(this).val();

		setKey(tgt, val, prolook.team_information.order_info);

	});

	$('#tnrightmat').css('opacity', '1'); //DEFAULT VALUE ON CUSTOMIZER
	
	$('#switch_pants').click(function(){
	
		$('#switch_modal').modal('show');
	
	
	});
	
	//APPLY DEFAULT STYLE
	applyStyle(prolook,-1);
	
	started = true;
}		
	

$.fn.rowCount = function () {
	a = $('tr', $(this).find('tbody')).length;
	a = a - 1;
	return a;
};

function selection(el) {

	zoom = {

		"jersey_front" : 499,
		"jersey_back" : 499,
		"pant_side" : 141,
		"pant_front" : 211,
		"pant_back" : 211

	};

	console.log('Running function "selection(el)"');

	$('.selected').toggleClass('selected');

	$('.logobleed').css('fill', '#fff');
	$('.chardinjs-overlay .logobleed').css('fill', '#333');
	$('.selected .logobleed').css('fill', '#C6E1EC');

	el.parent('.option').addClass('selected');

	$('#selected').html('');
	$('#selected').append($('.selected svg').clone());

	$("#selected .selector").remove(); // THE MAIN PIECE DOES NOT NEED A SELECTOR

	a = zoom[$("#selected svg").attr('id')];
	$("#selected svg").attr('width', a);

	$('#selected svg').css('top', '0px').css('left', '0px');

}

function setKey(key, value, targetObject) {
	if(!key)
		return false;
	var keys = key.split('.'),
	obj = targetObject || window,
	keyPart;
	while ((keyPart = keys.shift()) && keys.length) {
		obj = obj[keyPart];
	}
	if(typeof obj[keyPart] === 'undefined'){
	
		obj[keyPart] = '';
	
	}
	else
	obj[keyPart] = value;
}

function transColor(rgb) {

	//TRANSLATE COLOR
	if (rgb == 'white') {
		return 'White';
	}

	if (rgb == '' || rgb == 'none') {
		return 'none';
	}

	colors = {
		'#000000' : 'Black',
		'#ffffff' : 'White',
		'#d00000' : 'Red',
		'#a00000' : 'Cardinal',
		'#680000' : 'Maroon',
		'#492f91' : 'Purple',
		'#002D62' : 'Navy Blue',
		'#005CA9' : 'Royal Blue',
		'#8fc6e6' : 'Columbia Blue',
		'#39bad9' : 'Turquoise ',
		'#008000' : 'Kelly Green',
		'#005200' : 'Forest Green',
		'#FFFF00' : 'Yellow',
		'#FFD900' : 'Gold',
		'#DAA520' : 'Old Gold',
		'#D2B48C' : 'Vegas Gold',
		'#e0e0e0' : 'Silver Grey',
		'#A8A8A8' : 'Grey',
		'#585858' : 'Charcoal Grey',
		'#4d2d01' : 'Brown',
		'#F58300' : 'Orange',
		'#d17307' : 'Texas Orange',
		'#FCAB35' : 'Tennesse Orange'
	};

	for (color in colors) {

		if (color == rgb) {
			colorName = colors[color];
			break;
		}

	}

	if (typeof colorName == 'undefined') {
		colorName = '';
	}

	return colorName;

}

function translate(p) {

	t = {};
	t.detailedInfo = p;

	t[154] = p.order;
	t[202] = p.order;
	t[154] = transColor(p.panels.front_jersey.fill);
	t[155] = p.panels.front_jersey.material;
	t[136] = transColor(p.panels.back_jersey.fill);
	t[137] = p.panels.back_jersey.material;
	t[7] = transColor(p.number.back_color);
	t[8] = transColor(p.number.outline_color);
	t[12] = transColor(p.pipings.back_piping.stroke);
	t[98] = transColor(p.name.back_name_color);
	t[99] = transColor(p.name.back_name_outline);
	t[101] = p.name.back_name_typeface;
	t[105] = p.name.configuration;
	t[135] = p.name.typeface;
	t[131] = transColor(p.name.color);
	t[132] = transColor(p.name.outline_color);
	t[142] = transColor(p.panels.back_panels.fill);
	t[143] = p.panels.back_panels.material;
	t[147] = transColor(p.panels.bottom_sleeve.fill);
	t[148] = p.panels.bottom_sleeve.material;
	t[149] = transColor(p.pipings.center_piping.stroke);
	t[153] = transColor(p.pipings.arm_end.stroke);
	t[161] = transColor(p.panels.side_panel.fill);
	t[162] = p.panels.side_panel.material;
	t[163] = transColor(p.panels.sleeve_color.fill);
	t[164] = p.panels.sleeve_color.material;
	t[165] = transColor(p.pipings.sleeve_piping.stroke);
	t[173] = transColor(p.number.color);
	t[174] = transColor(p.number.outline_color);
	t[177] = p.number.typeface;
	t[178] = p.number.positions;
	t[200] = transColor(p.pipings.raglan.stroke);
	t[218] = transColor(p.pipings.side_panel_piping.stroke);
	t[246] = p.name.team_name;
	t[127] = transColor(p.panels.loops_tunnels.fill);
	t[138] = transColor(p.panels.back_knee.fill);
	t[138] = transColor(p.panels.back_knee.material);
	t[140] = transColor(p.panels.back_pant.fill);
	t[141] = transColor(p.panels.back_pant.material);
	t[144] = transColor(p.pipings.belt_loop.stroke);
	t[145] = transColor(p.panels.bottom_pants.fill);
	t[146] = p.panels.bottom_pants.material;
	t[157] = transColor(p.panels.base_color.fill);
	t[158] = p.panels.base_color.material;
	t[159] = transColor(p.panels.pockets.fill);
	t[160] = transColor(p.pipings.side_pant.stroke);
	t[11] = transColor(p.pipings.back_pant.stroke); //Back of Pant Piping

	return t;

}

function highlightTargets() {

	$("#selected .tgt").hover(
		function () {
		var a = $(this).attr('class'); //DISPLAY OUTLINE
		a = a.replace(' hoverpath', '');
		a = a + ' hoverpath';
		$(this).attr('class', a);
	}, function () {
		var a = $(this).attr('class'); //DISPLAY OUTLINE
		a = a.replace(' hoverpath', '');
		$(this).attr('class', a);
	});
	
	$('#selected .tgt').each(function(){
	
		if($(this).attr('class').indexOf('hoverpath') < 0)
			$(this).attr('class',$(this).attr('class')+' hoverpath');
	});
	
}

function pantsModal() {
	$('.pantnumber').change(function () {

		inseam = $(this).val();

		inseam = parseInt(inseam, 10);

		if (inseam <= 30) {
			inseam = inseam + 2;
		} else if (inseam == 32 || inseam == 34) {
			inseam = 34;
		} else if (inseam >= 36) {
			inseam = 36;
		}

		//$(this).parent().siblings('td:last').find('input').val(inseam);

		//REFRESH VALUES IN PROLOOK OBJECT
		a = $(this).parents('tr')
			$(a).find('input, select').blur();

	});

	//for(var i = 0; i < prolook.team_information.pant_info.length; i++)
	window.pants_idx = 0;
	window.inter =
		setInterval(function () {
			$("input[value='elastic_cuff']").parent().click();
			window.pants_idx++;
			if (pants_idx / 3 > prolook.team_information.pant_info.length) {
				clearInterval(window.inter);
			}
		}, 100);

}

function logoColor(tgt) {

	lightColors = ['#ffffff', '#8fc6e6', '#39bad9', '#FFFF00', '#FFD900', '#e0e0e0', '#F58300', '#FCAB35'];

	if (tgt == 'shirt') {

		$('#selected #path5863, .option #path5863').css('fill', 'white');

		for (i in lightColors) {

			if (color == lightColors[i]) {
				$('#selected #path5863, .option #path5863').css('fill', 'black');
			}

		}

	}

	if (tgt == 'pant') {

		$('#selected #path5867-0, .option #path5867-0,#selected #path5871, .option #path5871').css('fill', 'white');

		for (i in lightColors) {

			if (color == lightColors[i]) {
				$('#selected #path5867-0, .option #path5867-0,#selected #path5871, .option #path5871').css('fill', 'black');
			}

		}

	}

}

function logoDrag() {

	$("#imagePreview").draggable({
		scroll : false,
		// helper : 'clone',
		start : function () {

			if ($("#selected #tspan3017").length > 0) {

				console.log('dragging');

				$('#selected').append('<div class="logodrop tl1" data-target="#tl1"></div>');
				$('#selected').append('<div class="logodrop tl2" data-target="#tl3"></div>');
				$('#selected').append('<div class="logodrop tl3" data-target="#tl2"></div>');
				$('#selected').append('<div class="logodrop tl4" data-target="#tl4"></div>');
				$('.logodrop').droppable({
					drop : function () {

						console.log('dropping');

						// $(this).html('');

						tgt = $(this).attr('data-target');

						console.log('tgt');
						console.log(tgt);

						imgLink = $('#imagePreview').attr('src');
						$("#selected " + tgt)
						.attr('xlink:href', imgLink)
						.attr('width', '30')
						.attr('height', '30');

						console.log('$("#selected " + tgt)');
						console.log($("#selected " + tgt));

						prolook.logo.file = imgLink;

						if (tgt == '#tl1') {
							prolook.logo.position_1 = "yes";
							$("#sidebar #tl5")
							.attr('xlink:href', imgLink)
							.attr('width', '30')
							.attr('height', '30');
						} else if (tgt == '#tl2') {
							prolook.logo.position_2 = "yes";
						} else if (tgt == '#tl3') {
							prolook.logo.position_3 = "yes";
							$("#sidebar #tl8")
							.attr('xlink:href', imgLink)
							.attr('width', '30')
							.attr('height', '30');
						} else if (tgt == '#tl4') {
							prolook.logo.position_4 = "yes";

						}
						reRenderLogos();
						console.log('SAVING: logodrag');
						save();

						selection($('.selected svg'));

					}
				});

			} else if ($('#selected #backname').length > 0) {

				$('#selected').append('<div class="logodrop tl5" data-target="#tl5"></div>');
				$('#selected').append('<div class="logodrop tl6" data-target="#tl6"></div>');
				$('#selected').append('<div class="logodrop tl8" data-target="#tl8"></div>');
				$('.logodrop').droppable({
					drop : function () {

						tgt = $(this).attr('data-target');

						imgLink = $('#imagePreview').attr('src');
						$($(this).attr('data-target'))
						.attr('xlink:href', imgLink)
						.attr('width', '30')
						.attr('height', '30');

						if (tgt == '#tl5') {
							$("#sidebar #tl1")
							.attr('xlink:href', imgLink)
							.attr('width', '30')
							.attr('height', '30');
							prolook.logo.position_5 = "yes";
						} else if (tgt == '#tl6') {
							prolook.logo.position_6 = "yes";
						} else if (tgt == '#tl8') {
							$("#sidebar #tl3")
							.attr('xlink:href', imgLink)
							.attr('width', '30')
							.attr('height', '30');
							prolook.logo.position_8 = "yes";
						}
						reRenderLogos();
						prolook.logo.file = imgLink;
						console.log('SAVING: logodrag2');
						save();

					}
				});

			} else if ($('#selected #logopant').length > 0) {

				$('#selected').append('<div class="logodrop logopant" data-target="#logopant"></div>');
				$('.logodrop').droppable({
					drop : function () {

						tgt = $(this).attr('data-target');

						imgLink = $('#imagePreview').attr('src');
						$($(this).attr('data-target'))
						.attr('xlink:href', imgLink)
						.attr('width', '30')
						.attr('height', '30');

						prolook.logo.pant = "yes";
						reRenderLogos();

						prolook.logo.file = imgLink;
						console.log('SAVING: logodrag3');
						save();

					}
				});

			}

		},
		stop : function () {

			$("#imagePreview").animate({
				top : 0,
				left : 0
			});

			$('.logodrop').remove();
		}
	});

}

function painting() {

	console.log('Running function "painting"');

	$('#selected').on('click','path, image, tspan, text', function () {
		console.log('Running function "painting" method "click"');
		if (typeof $(this).attr('class') != "undefined" && $(this).attr('class').indexOf('tgt') > -1) {

			console.log('Path clicked has classes and amongst them, the "tgt" one"');

			myId = $(this).attr('id');
			targetClass = $(this).attr('class');
			targetClass = targetClass.split(' ');
			targetClass = '.' + targetClass[0];
			targetClass = '#selected ' + targetClass + ', .option ' + targetClass;

			if (color == "") {
				color = base1;
			}

			piece = $(this).attr('class').replace(' tgt','').replace(' hoverpath','');

			if (section == 'panels') { //IF IT IS A SOLID COLOR...

				$.each($(targetClass), function () {

					a = '#' + $(this).attr('id') + 'back';

					$('#selected ' + a + ', .option ' + a).css('fill', color).css('background-color', color);
					$('#selected ' + a + ', .option ' + a).attr('class', currentColor);

				});

				setKey(piece + ".fill", color, prolook.panels);

				//ADJUST NEWBALANCE LOGO COLOR
				if (myId == 'path3217') {

					logoColor('shirt');

				}
				if (myId == 'path3545-2' || myId == 'path3935' || myId == 'path4065') {

					logoColor('pant');

				}

			} else if (section == 'pipings') {

				$.each($(targetClass), function () {
					a = "#selected #" + $(this).attr('id') + ', .option #' + $(this).attr('id');
					console.log('Applying change to:' + a);
					myClasses = $(this).attr('class');
					myClasses = myClasses.replace(' base1', '').replace(' base2', '').replace(' base3', '').replace(' base4', '')
						myClasses = myClasses + ' ' + currentColor;
					$(a).attr('class', myClasses);
					$(a).css('fill', color).css('fill-opacity', '1'); ;
				});

				setKey(piece + ".stroke", color, prolook.pipings);

			} else if (section == 'infusions') { //IF IT IS AN INFUSION...
				$.each($(targetClass), function () {
					
					a = '#' + $(this).attr('id') + 'inf';
					
					console.log('Applying change to:' + a);
					
					$('#selected ' + a + ', .option ' + a).attr('style', infusion + ';opacity:1'); //STYLE WITH ID INFO

				});

				setKey(piece + ".infusion", infusion, prolook.panels);

			} else if (section == 'materials') { //IF IT IS A MATERIAL...
			
				materialName = material;
			
				if (myId == 'tspanmat' || myId == 'backnumbermat' || myId == 'backnamemat' || myId == 'tnleftmat' || myId == 'tnrightmat') { //MATERIAL ON NUMBERS / TEXT

					console.log('Material on numbers, text');
					
					Utils.fillMaterial($('#' + myId), materialName);

						if (myId == 'tspanmat') {
							prolook.name.material = materialName;
						} else if (myId == 'backnumbermat') {
							prolook.number.back_material = materialName;
						} else if (myId == 'backnamemat') {
							prolook.name.back_material = materialName;
						} else if (myId == 'tnleft' || myId == 'tnright') {
							prolook.number.material = materialName;
						}

					} else { //MATERIAL ON PANELS
					
						console.log('Material on panels');

						$.each($(targetClass), function () {

							var thisId = $(this).attr('id');

							//USING THE CSS FUNCTION ON SAFARI TO UPDATE THE FILL WILL PRODUCE 'FILL: #MESH_MATERIAL', WITHOUT THE URL PARAMETER
							Utils.fillMaterial($('#selected #' + thisId + ', #sidebar #' + thisId), materialName);
							
						});

						setKey(piece + ".material", materialName, prolook.panels);

					}

				} else if (section == 'eraser') { //ERASER
					console.log('starting ERASER');
					if (typeof $(this).attr('xlink:href') != 'undefined') {

						id = $(this).attr('id');

						$(this).attr('xlink:href', '')
						.attr('width', '0')
						.attr('width', '0');

						$('#sidebar #' + id).attr('xlink:href', '')
						.attr('width', '0')
						.attr('width', '0');

						if (id == "tl1") {

							$('#sidebar #tl5').attr('xlink:href', '')
							.attr('width', '0')
							.attr('width', '0');

						}
						if (id == "tl5") {

							$('#sidebar #tl1').attr('xlink:href', '')
							.attr('width', '0')
							.attr('width', '0');

						}
						if (id == "tl3") {

							$('#sidebar #tl8').attr('xlink:href', '')
							.attr('width', '0')
							.attr('width', '0');

						}
						if (id == "tl8") {

							$('#sidebar #tl3').attr('xlink:href', '')
							.attr('width', '0')
							.attr('width', '0');

						}

					}

					$.each($(targetClass), function () {
						a = "#" + $(this).attr('id');

						//debugger;
						if (document.target == 'materials') {
							$('#selected ' + a + ', .option ' + a).css('fill', '#fff').css('fill-opacity', '1'); // IT NEEDS TO HAVE A COLOR, OR THE PANEL IS UNSELECTABLE
						} else if (document.target == 'infusions') {
							$('#selected ' + a + 'inf, .option ' + a + 'inf').attr('style', 'fill: none; fill-opacity:0');
						} else if (document.target == 'panels') {
							$('#selected ' + a + 'back, .option ' + a + 'back').css('fill', 'white');
						} else if (document.target == 'pipings') {
							$('#selected ' + a + ', .option ' + a).css('fill', '#000').css('fill-opacity', '0');
						}
						myClasses = $(a + 'back').attr('class');
						if (typeof myClasses != 'undefined') {
							myClasses = myClasses.replace(' base1', '').replace(' base2', '').replace(' base3', '').replace(' base4', '');
							$(this).attr('class', myClasses);
						}
					});
				}

				a = $(this).attr('class'); //REMOVE 'HOVERPATH' CLASS
				a = a.replace(' hoverpath', '');
				$(this).attr('class', a);
				console.log('SAVING: painting');
				save();

			} else {

				console.log('Clicked spot did not met requirements (have a class, and the tgt one amongst them)');

			}

		});
	}

	function deepFind(obj, path) {
		var paths = path.split('.'),
		current = obj,
		i;

		for (i = 0; i < paths.length; ++i) {
			if (current[paths[i]] == undefined) {
				return undefined;
			} else {
				current = current[paths[i]];
			}
		}
		return current;
	}

	function tagClass(parent) {

		p = parent;
		
		for(var i in bldr.panels){
			$(bldr.panels[i]).attr('class',i);
		}
		for(var i in bldr.pipings){
			$(bldr.pipings[i]).attr('class',i);
		}

	}

function applyJson(model, parent) {

		tagClass(parent);

		for (i in model.panels) {

			id = $('#' + parent + ' .' + i).attr('id');
			infusion = deepFind(model, 'panels.' + i + '.infusion');
			material = deepFind(model, 'panels.' + i + '.material');

			$('#' + parent + ' #' + id + 'back').css('fill', deepFind(model, 'panels.' + i + '.fill')).css('fill-opacity', '1');

			if (infusion.length > 0) {
				$('#' + parent + ' #' + id + 'inf').attr('style', infusion + ';opacity: 1;');
			}

			if (material.length > 0) {
				//chris
				// Utils.fillMaterial($('#' + parent + ' #' + id), material);
				$('#' + parent + ' #' + id).attr('style', 'fill: url(#' + material + ');fill-opacity: 1;');
			}

		}
		for (i in model.pipings) {

			id = $('#' + parent + ' .' + i).attr('id');

			$('#' + parent + ' #' + id).css('fill', deepFind(model, 'pipings.' + i + '.stroke'));

			if (deepFind(model, 'pipings.' + i + '.stroke') == '') {

				$('#' + parent + ' #' + id).css('fill', 'none');

			}

		}
		
		teamName = model.name.team_name;
		typeface = model.name.typeface;
		fontCfg = model.name.configuration;
		numberTypeface = model.number.typeface;
		nameColor = model.name.color;
		nameOutiline = model.name.outline_color;
		
		// $('#thumbnameloader').append('<object id="svgname" data="assets/img/' + fontCfg + '.svg" type="image/svg+xml" onload="extract($(this));loadThumbText(\'#'+parent+'\',\''+teamName+'\',\''+nameColor+'\',\''+typeface+'\',\''+nameOutiline+'\');"></object>');
		
		
		
		$('#' + parent + ' #tspan3017').text(teamName);
		$('#' + parent + ' #tspan3017').css('fill',nameColor);
		$('#' + parent + ' #tspan3017').css('stroke',nameOutiline);
		$('#' + parent+ ' #tspan3017').css('font-family',typeface);
		$('#' + parent + ' #tspan3017').css('font-size','26px');
		
		
		$('#' + parent).append("<style>@font-face {font-family: '" + typeface + "'; src: local('?'), url('assets/fonts/" + typeface + ".woff') format('woff'), url('assets/fonts/" + typeface + ".svg') format('svg');	font-weight: normal; font-style: normal;}</style>");
		
		$('#' + parent).append("<style>@font-face {font-family: '" + numberTypeface + "'; src: local('?'), url('assets/fonts/" + numberTypeface + ".woff') format('woff'), url('assets/fonts/" + numberTypeface + ".svg') format('svg');	font-weight: normal; font-style: normal;}</style>");
		
		if(model.number.positions == 'flb'){
		
			$('#' + parent + ' #tnleft').css('opacity','1').css('display','block');
			$('#' + parent + ' #tnright').css('opacity','0').css('display','none');
		
		}else if(model.number.positions == 'frb'){
		
			$('#' + parent + ' #tnleft').css('opacity','0').css('display','none');
			$('#' + parent + ' #tnright').css('opacity','1').css('display','block');
		
		}else if(model.number.positions == 'bo'){
		
			$('#' + parent + ' #tnleft').css('opacity','0').css('display','none');
			$('#' + parent + ' #tnright').css('opacity','0').css('display','none');
		
		}
		
		$('#' + parent +' #tnright, #' + parent +' #tnleft').css('fill',model.number.color);
	

}
function refreshNumberPosition(number) {
	if (number.positions == 'Right & Front & Back')
		number.positions = 'frb';

	if (number.positions === 'all') {
		$('.teamnumber, #backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
	}
	if (number.positions === 'frb') {
		$('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
		$('#tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
	}
	if (number.positions === 'flb') {
		$('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
		$('#tnleft, #tnleftmat, #backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
	}
	if (number.positions === 'bo') {
		$('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
		$('#backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
	}
	if (number.positions === 'fo') {
		$('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
		$('.teamnumber').css('opacity', '1').css('display', 'block');
	}

	$('#tnleft,#tnright,#backnumber,#backnumbermat,#tnleftmat,#tnrightmat').css('font-family', '"' + number.typeface + '"');
	$.each($('.number .choosebase'), function () {

		target = $(this).attr('data-target');
		mode = $(this).attr('data-mode');

		baseClass = $(this).find('button').attr('data-base');
		baseColor = window[baseClass];

		$(this).parent('.dropdown-menu').siblings('button').css('background-color', baseColor);

		$(target).css(mode, baseColor);
		$(target).attr('class', baseClass);

	});

	
	$('#selected #tnright').css('font-size', "35px");
	$('#selected #tnleft').css('font-size', "35px");
	$('#backnumbermat, #backnumber').css('font-size', '58px');
	var typeFace = number.typeface;
	typeFace = typeFace.replace("'", '').replace('"', '').replace("'", '').replace('"', '');

	if (typeFace == '1-prolook_upright') {
		$('#backnumbermat, #backnumber').css('font-size', '48px');
		$('#selected #tnright').css('font-size', "28px");
		$('#selected #tnleft').css('font-size', "28px");
	}
	$('#numberstyles').html("<style>@font-face {font-family: '" + number.typeface + "'; src: local('?'), url('assets/fonts/" + number.typeface + ".woff') format('woff'), url('assets/fonts/" + number.typeface + ".svg') format('svg');	font-weight: normal;	font-style: normal;}</style>");

}
function getIdFromBaseArr(selectedStyle, data) {
	base1 = selectedStyle.base1;
	base2 = selectedStyle.base2;
	base3 = selectedStyle.base3;
	base4 = selectedStyle.base4;
	if (base1 == data)
		return 1;
	else if (base2 == data)
		return 2;
	else if (base3 == data)
		return 3;
	else if (base4 == data)
		return 4;

}
function findColorIndex(color) {
	var result = -1;
	$.each($('.dropdown-menu').eq(0).find('input'), function (i) {
		if ($(this).attr('value') == color)
			result = i;
	});
	return result;
}
function findPiece(id) {

	//PANELS
	if (id == 'path3217') {

		return "front_jersey";

	} else if (id == 'path4065' || id == 'path3935' || id == 'path5108' || id == 'path3545-2') {

		return "base_color";

	} 
	// else if (id == 'path3281') {

		// return "back_jersey";

	// }
	else if (id == 'path3285') {

		return "back_panels";

	} else if (id == 'path3317' || id == 'path3309') {

		return "bottom_sleeve";

	} else if (id == 'path3293' || id == 'path3301' || id=="back_jersey_inner") {

		return "back_jersey";

	} else if (id == 'path3325' || id == 'path3333') {

		return "sleeve_color";

	} else if (id == 'back_jersey_inner') {
		return 'back_jersey';
	} else if (id == 'g4453' || id == 'path32655') {

		return "back_pant";

	} else if (id == 'path4088' || id == 'path3221' || id == 'path321341' || id == 'path3213-4') {

		return "loops_tunnels";

	} else if (id == 'path41169' || id == 'path318921' || id == 'path3189-2') {

		return "pockets";

	} else if (id == 'path3341' || id == 'path334961') {

		return "back_knee";

	} else if (id == 'path3269' || id == 'path3273') {

		return "back_pant";

	} else if (id == 'path3181' || id == 'path31771') {

		return "bottom_pants";

	}
	//PIPINGS
	else if (id == 'path3087' || id == 'path3095') {

		return "arm_end";

	} else if (id == 'path3115') {

		return "back_piping";

	} else if (id == 'path3189' || id == 'path3272' || id == 'path3266') {

		return "belt_loop";

	} else if (id == 'path3136' || id == 'path3116') {

		return "center_piping";

	} else if (id == 'path3121' || id == 'path3138') {

		return "raglan";

	} else if (id == 'path3193' || id == 'path3287' || id == 'path3191') {

		return "side_pant";

	} else if (id == 'path3159' || id == 'path3142') {

		return "side_panel_piping";

	} else if (id == 'path3163' || id == 'path3180') {

		return "sleeve_piping";

	} else if (id == 'path3271' || id == 'path3200' || id == 'path3274') {

		return "back_pant";

	}

	//TEAM NAME
	else if (id == 'tspanmat') {

		return "team_name";

	}

}

function loadText() {

	$('#selected #namereceiver').replaceWith($('#nameloader #namereceiver'));
	
	refreshText();
	console.log('SAVING: loadtext');
	save();
}

function refreshText() {

	var fontColor = prolook.name.color;
	var fontOutlineColor = prolook.name.outline;
	var fontName = prolook.name.typeface;
	var fontSize = fontSizeMe(fontName);
	var teamName = prolook.name.team_name;
	var fillOpacity, strokeOpacity = 1;

	$('#selected').find('#tspan3017, #tspanmat')
		.text(teamName);
	
	//CONVERT TEXT INTO UPPERCASE
	if (factor = $('#fontcfg option:selected').attr('data-uppercase') == 'true')
		ulcase = "uppercase";
	else 
		ulcase = "none";
		
	//IF NO FILL IS SET, MAKE IT TRANSPARENT
	if(fontColor == '')
		fillOpacity = 0;
	
	
	//IF NO FILL IS SET, MAKE IT TRANSPARENT	
	if(fontOutlineColor == '')
		strokeOpacity = 0;
	
	$('#selected').find('#tspan3017')
	.attr('style', 'stroke:' + fontOutlineColor + ';font-family:"' + fontName + '";font-size:' + fontSize + 'px;text-align: left; text-anchor: middle; fill: ' + fontColor + ';text-transform:' + ulcase+';fill-opacity:'+fillOpacity+';stroke-opacity:'+strokeOpacity);

	$('#fontstyles').html("<style>@font-face {	font-family: '" + fontName + "';src: url(assets/fonts/" + fontName + ".eot);src: local('?'), url('assets/fonts/" + fontName + ".woff') format('woff'), url('assets/fonts/" + fontName + ".ttf') format('truetype');}</style>");

	$('#selected path, #selected image,#selected tspan').unbind('click');

	$('#selected .tgt').unbind('hover');
	
	highlightTargets();
	
	save();
}

function refreshNumber() {

	prolook.number.typeface = $('#numbercfg').val();

	var fontName = prolook.number.typeface;
	var fillOpacity, strokeOpacity = 1;

	$('#tnleft, #tnright, #backnumber').css('font-family', '"' + fontName + '"');

	$.each($('.number .choosebase'), function () {

		var target = $(this).attr('data-target');
		var mode = $(this).attr('data-mode');

		var baseClass = $(this).attr('data-base');
		var baseColor = window[baseClass];

		$(this).parent('.dropdown-menu').siblings('button').css('background-color', baseColor);

		$(target).css(mode, baseColor);
		$(target).attr('class', baseClass);

	});

	$('#tnright, #tnleft').css('font-size', "35px");
	
	$('#backnumber').css('font-size', '58px');
	
	if (fontName == '1-prolook_upright') {
		$('#backnumber').css('font-size', '48px');
		$('#tnright, #tnleft').css('font-size', "28px");
		
	}
	
	
	//FRONT NUMBER
	//IF NO FILL IS SET, MAKE IT TRANSPARENT
	if(prolook.number.color == '')
		fillOpacity = 0;
	
	//IF NO FILL IS SET, MAKE IT TRANSPARENT	
	if(prolook.number.outline == '')
		strokeOpacity = 0;
		
	$('#tnright, #tnleft').css({
		'fill-opacity': fillOpacity,
		'stroke-opacity' : strokeOpacity
		});
		
	//BACK NUMBER
	//IF NO FILL IS SET, MAKE IT TRANSPARENT
	if(prolook.number.back_color == '')
		fillOpacity = 0;
	else
		fillOpacity = 1;
	
	//IF NO FILL IS SET, MAKE IT TRANSPARENT	
	if(prolook.number.back_outline == '')
		strokeOpacity = 0;
	else
		strokeOpacity = 1;
		
	$('#backnumber').css({
		'fill-opacity': fillOpacity,
		'stroke-opacity' : strokeOpacity
		});

	
	
	$('#numberstyles').html("<style>@font-face {font-family: '" + fontName + "'; src: local('?'), url('assets/fonts/" + fontName + ".woff') format('woff'), url('assets/fonts/" + fontName + ".svg') format('svg');	font-weight: normal;	font-style: normal;}</style>");
}
function fontSizeMe(fontName) {

	var chars = prolook.name.team_name.length;

	var dec = 1;
	// var typeFace = prolook.name.typeface;
	// typeFace = typeFace.replace("'" , '').replace('"', '').replace("'" , '').replace('"' , '');
	//
	// if(typeFace == "1-prolook_spartans_0"){
	// dec = 0.9
	// }

	factor = $('#fontcfg option:selected').attr('data-factor');
	area = 130;
	min = 10;
	max = 50;

	fontSize = area / chars;
	fontSize = fontSize * factor;

	if (fontSize < min) {
		fontSize = min;
	} //VERIFY MIN
	if (fontSize > max) {
		fontSize = max;
	} //VERIFY MAX
	return fontSize;

}

function fontSizeNumber(fontName) {

	chars = 2;

	factor = $('#numbercfg option:selected').attr('data-factor');
	area = 80;
	min = 10;
	max = 80;

	fontSize = area / chars;
	fontSize = fontSize * factor;

	if (fontSize < min) {
		fontSize = min;
	} //VERIFY MIN
	if (fontSize > max) {
		fontSize = max;
	} //VERIFY MAX

	return fontSize;

}

function save() {

	if(!started)
		return;
	
	var content = $('#selected svg').clone();
	$('.selected svg').replaceWith(content);
}

function getTextColor(c) {
	color = c;
	if (color == 'White' || color == 'white')
		color = '#ffffff';
	else if (color == 'Black' || color == 'black')
		color = '#000000';
	color = color.replace('#', '0x');
	return (0xffffff - color).toString(16);
}
function createHTML() {
	html = new EJS({
			url : 'email/template.ejs'
		}).render(prolook);
	return html;
}

successes = 0;

function dataURItoBlob(dataURI) {
	var binary = atob(dataURI.split(',')[1]);
	var array = [];
	for(var i = 0; i < binary.length; i++) {
		 array.push(binary.charCodeAt(i));
	}
	return new Blob([new Uint8Array(array)], {type: 'image/png'});
}

function htmlUpload() {

	setTimeout(function () {

		bucket = 'ddweaver-host';
		folder = 'newbalance/baseball/builder/orders/' + orderId + '/';
		
		filename = 'order.json';

		//TRANSLATE PROLOOK

		orderJSON = translate(prolook);
		console.log(orderJSON);

		// send data to db
		$.ajax({
			type : "POST",
			url : 'http://marcellus.tv/pls/addOrder.php',
			data: $.param({ orderid: orderId, userid: GetURLParameter('userid'), state: $('#saveForLater').val(), jersey: GetURLParameter('jersey'), pant: GetURLParameter('pant') }),
			crossDomain: true,
			error:function(xhr, status, errorThrown) {
				console.log(errorThrown+'\n'+status+'\n'+xhr.statusText);
			},
			success:function(callback) {
				console.log("Order saved");
			}
		});

		var s3 = new AWS.S3();

		var params = {
		  Bucket: bucket, // required
		  Key: folder + filename, // required
		  ACL: 'public-read',
		  Body: JSON.stringify(orderJSON),
		  ContentEncoding : 'application/json',
		  ContentType : 'text/html'
		  //dataType : 'application/json; charset=UTF-8'
		};

		s3.putObject(params, function(err, data) {
		  if (err) console.log(err, err.stack); // an error occurred
		  else     console.log(data);           // successful response
		});
				

		//UPLOAD HTML

		setTimeout(function () {

			filename = 'order.html';

			folder = 'newbalance/baseball/builder/orders/' + orderId + '/';
			
			html = createHTML();

			setTimeout(function () {

				var s3 = new AWS.S3();

				var params = {
				  Bucket: bucket, // required
				  Key: folder + filename, // required
				  ACL: 'public-read',
				  Body: html,
				  ContentEncoding : 'UTF-8',
				  ContentType : 'text/html'
				  //dataType : 'text/html; charset=UTF-8'
				};

				s3.putObject(params, function(err, data) {
				  if (err){
				  
					console.log(err, err.stack); // an error occurred
				  
					$('#saveStyle img').replaceWith('<div style="color:white;" class="btn btn-danger form-control">An error has ocurred. Please try again.</div>');
					
					setTimeout(function(){
					
						$('#saveStyle .btn-danger').fadeOut(1000);
						
						setTimeout(function(){
						
							$('#saveStyle .btn-danger').remove();
						
						},1100);
						
					},2000);
				  
				  }else{
				  
					console.log(data);           // successful response
				  
					$('#saveStyle img').remove();
    
                    var svgImage = document.querySelector('#jersey_front'),
                        newImg = new Image();
                        svgStr = (new XMLSerializer).serializeToString(svgImage);
                        newImg.src = "data:image/svg+xml;base64," + encodeURIComponent(svgStr);
    
                    mycanvas = document.createElement('canvas');
                    mycanvas.width = 499;
                    mycanvas.height = 500;
                    ctx = mycanvas.getContext("2d");
                    ctx.drawImage(newImg, 0, 0);
    
                    var file = mycanvas.toDataURL("image/png");
    
                    file = dataURItoBlob(file);
    
                    var params = {
                      Bucket: bucket, // required
                      Key: folder + 'png.png', // required
                      ACL: 'public-read',
                      Body: file
                    };
    
                    s3.putObject(params, function(err, data) {
                        if(err) console.log(err);
                    });
					
					$('#processing, .modal-backdrop').remove();
					$('#endmodal').modal('show');
				  
				  } 
				});

			}, 500);

		}, 700);

	}, 400);

}

function notifyOrder(orderId, finalUrl) {

	setTimeout(function(){
        var message={
        	text : 'You have a new order (ID ' + orderId + '). <br/> <a href="' + finalUrl + '">Check order details.</a>',
        	id : GetURLParameter('clientid')
        };
        
	$.support.cors = true;
	$.ajax({
		type : "POST",
		url : 'http://marcellus.tv/lib/mail.php',
		data : $.param(message),
		crossDomain: true,
		error:function(xhr, status, errorThrown) {
			console.log(errorThrown+'\n'+status+'\n'+xhr.statusText);
		},
		success:function(callback) {
			console.log("Message sent");
		}
	});

	},500);
}

function styleUpload() {
	
		bucket = 'ddweaver-host';
		folder = 'newbalance/baseball/builder/';
	
		filename = 'styles.json';

		var s3 = new AWS.S3();

		var params = {
		  Bucket: bucket, // required
		  Key: folder + filename, // required
		  ACL: 'public-read',
		  Body: JSON.stringify(prolook),
		  
		};

		s3.putObject(params, function(err, data) {
		  if (err) console.log(err, err.stack); // an error occurred
		  else     console.log(data);           // successful response
		});

}

function readURL(input) {
	
		$('#imagePreview').attr('src', 'assets/img/loading.gif');
	
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
			
				folder = 'newbalance/baseball/builder/orders/' + orderId + '/logos/';
	
				ts = +new Date;
				
				var img;

				var s3 = new AWS.S3();
				
				if(e.target.result.match('image/png')){
				
					filename = ts + '.png';
					
					img = e.target.result.replace('image/png','application/octet-stream');

				}else if(e.target.result.match('image/jpg')){
				
					filename = ts + '.jpg';
					
					img = e.target.result.replace('image/jpg','image/octet-stream');
				
				}else{
				
					filename = ts + '.jpg';
					
					img = e.target.result.replace('image/jpg','image/octet-stream');
				
				};
				
				var params = {
				  Bucket: bucket, // required
				  Key: folder + filename, // required
				  ACL: 'public-read',
				  Body: img
				};
				
				s3.putObject(params, function(err, data) {
				  if(err){
					console.log(err, err.stack); // an error occurred
				  }
				  else{
				  
					$('#imagePreview')
						.attr('src', img)
						.css('display', 'inline');
						
					logoDrag();
				  
				  }
	
				});
		
			};
            
            reader.readAsDataURL(input.files[0]);
        }
    }

function changeSection(str) {

	// alert('changing section = '+str);
	
	section = str;

}

function changeCursor(str) {

	$('#selected').removeClass('bucket eraser');

	$('#selected').addClass(str);

}

//CHECK FOR FIRST VISIT ON PAGE
function fv(nmb) {
	var tC = document.cookie.split('; ');
	for (var i = tC.length - 1; i >= 0; i--) {
		var x = tC[i].split('=');
		if (nmb == x[0])
			return unescape(x[1]);
	}
	return '~';
}
function wC(nmb, val) {
	document.cookie = nmb + '=' + escape(val);
}
function lC(nmb, pg) {
	var val = fv(nmb);
	if (val.indexOf('~' + pg + '~') != -1)
		return false;
	val += pg + '~';
	wC(nmb, val);
	return true;
}
function firstTime(cN) {
	return lC('pWrD4jBo', cN);
}
function thisPage() {
	var page = location.href.substring(location.href.lastIndexOf('\/') + 1);
	pos = page.indexOf('.');
	if (pos > -1) {
		page = page.substr(0, pos);
	}
	return page;
}

function firstVisit() {
	if (firstTime(thisPage())) {

		$('.container').css('opacity', '0.3');
		$('#welcome').css('opacity', '1');

	} else {
		$('#welcome').hide();
		$('.container').css('opacity', '1');
	}

}

//OLD BROWSER DETECTION (AS IE8- DOES NOT SUPPORT CANVAS, THIS IS AN IDEAL FEATURE TO BE DETECTED)
function supports_canvas() {
	return !!document.createElement('canvas').getContext;
}

function listFonts(prefix, extension, target) {

	new AWS.S3().listObjects({
		Bucket : bucket,
		Prefix : prefix
	}, function (error, data) {
		if (error) {
			console.log(error); // an error occurred
		} else {

			response = data.Contents;

			for (i in response) {

				a = response[i].Key;
				b = a.split('.');

				if (b[b.length - 1] == extension) {

					filename = response[i].Key.split('fonts/')[1].split('.')[0]
						//.replace('-','').replace('_','')
				;

					$(target).append('<option value="' + filename + '" data-factor="1.5">' + filename + '</option>');

				}

			}

			//console.log(data); // request succeeded
		}
	});

}

function reRenderLogos(){

	$.each($('svg image'),function(){

		$(this).replaceWith($(this).clone());

	});

}

function miniModal(e,id){

	if(!started)
		return;

	if(e == 'hide'){
	
		$(id).hide();
		
		return;
	
	}
	
	//click position
	var x = e.pageX;
	var y = e.pageY;
	
	$(id)
		.css({
			'display'	:	'block',
			'top'		:	y+20,
			'left'		:	x-90
		});

}

function applyStyle(curr_style,index){

	var tempStyle = JSON.stringify(curr_style);

		// console.log(curr_style.base1+' // xb1'+base1);
		// console.log(curr_style.base2+' // xb2'+base2);
		// console.log(curr_style.base3+' // xb3'+base3);
		// console.log(curr_style.base4+' // xb4'+base4);
	
	tempStyle = tempStyle
					.replace(/#ffffff/g,'xb1'+base1)
					.replace(/#d00000/g,'xb2'+base2)
					.replace(/#000000/g,'xb3'+base3)
					.replace(/#e0e0e0/g,'xb4'+base4)
					.replace(/xb1/g,'')
					.replace(/xb2/g,'')
					.replace(/xb3/g,'')
					.replace(/xb4/g,'')
					;
					
	prolook = JSON.parse(tempStyle);
	curr_style = prolook;
	
	var bases = [base1,base2,base3,base4];
	
	//UPDATE BASES
	
	for(i=1;i<5;i++){
	    console.log('base'+i+': ' + prolook['base'+1] );
		$('.base'+i)
			.css('background-color',prolook['base'+i])
			.css('fill',prolook['base'+i]);
			
		$('input.base'+i)
			.attr('value',prolook['base'+i]);
	
		$('.cpicker .base'+i).siblings('.colorname').html(transColor(prolook['base'+i]));
	
	}
	
	//SELECTORS
	
	$.each($('.choosebase'),function(){
	
		$(this).css('background-color',
		
			window[ $(this).attr('data-base') ]
		
		);
	
	});
	
	//APPLY PANELS
	for (var i in bldr.panels){
	
		if(typeof i == 'undefined') break;
	
		for(var p in bldr.panels[i]){
		
			if(typeof curr_style.panels[i]  === 'undefined')
					
				console.log('undefined style: ',i );
						
			else
			
				$('#selected '+bldr.panels[i][p]+'back, #sidebar '+bldr.panels[i][p]+'back').css({
					
						'fill'	:	curr_style.panels[i].fill
					
				});
				
			for(var b in bases){
			
				if(curr_style.panels[i].fill == bases[b]){
					
					var index = bases.indexOf(bases[b])+1;
					
					$('#selected '+bldr.panels[i][p]+'back, #sidebar '+bldr.panels[i][p]+'back')
					.attr('class','base'+index);
					
				}
					
				}
			
		}
	
	}
	
	//APPLY PIPINGS
	for (var i in bldr.pipings){
	
		if(typeof i == 'undefined') break;
		
		if(typeof curr_style.pipings[i] === 'undefined'){
			curr_style.pipings[i]  =  {};
			curr_style.pipings[i].stroke  =  "";
		}
		
	
		//IF EMPTY, DON'T PAINT
		if(curr_style.pipings[i].stroke == ""){
			
			var opacity = 0;
			
		}else{
		
			var opacity = 1;
		
		}
	
		for(var s in bldr.pipings[i]){
		
			$('#selected '+bldr.pipings[i][s]+', #sidebar '+bldr.pipings[i][s]).css({
					
					'fill'			:	curr_style.pipings[i].stroke,
					'fill-opacity'	:	opacity
			
			});
			
			for(var b in bases){
			
				if(curr_style.pipings[i].stroke == bases[b]){
					
					var index = bases.indexOf(bases[b])+1;
					
					$('#selected '+bldr.pipings[i][s]+', #sidebar '+bldr.pipings[i][s])
					.attr('class','base'+index);
					
				}
				
			}
			
		
		}
	
	}
	
	//APPLY NAME
	
	$('#nameinput').val(curr_style.name.team_name);
	$('#fontcfg').selectpicker('val',curr_style.name.typeface);
	
	//APPLY NAME COLORS
	
	$('#selected #tspan3017').css({
		'fill'		:	curr_style.name.color,
		'stroke'	:	curr_style.name.outline_color
		});
		
	//INFUSIONS
	for(i=1;i<5;i++){
		
		$('.infbase'+i)
			.css('background-color', prolook['infbase'+i])
			.css('fill', prolook['base'+i]);
	
		// infusion - color names
		$('.infpicker .infbase'+i).siblings('.colorname').html(transColor(prolook['base'+i]));
	
	}

	$('#selected #gradstop1').css('stop-color', prolook.infbase1);
	$('#selected #gradstop1').css('stop-color', prolook.infbase2);

	
	//NUMBER POSITIONS
	
	var positions  = curr_style.number.positions;
	
	if (positions === 'all') {
		$('.teamnumber, #backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
	}
	if (positions === 'frb') {
		$('#selected').find('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
		$('#selected').find('#tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
	}
	if (positions === 'flb') {
		$('#selected').find('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
		$('#selected').find('#tnleft, #tnleftmat, #backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
	}
	if (positions === 'bo') {
		$('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
		$('#backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
	}
	if (positions === 'fo') {
		$('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
		$('.teamnumber').css('opacity', '1').css('display', 'block');
	}
	
	//NUMBER COLORS
	$('#selected').find('#tnleft, #tnright').css('fill',curr_style.number.color);
	$('#backnumber').css('fill',curr_style.number.back_color);
	
	//APPLY INFUSION
	
	if(curr_style.panels.sleeve_color.infusion != ''){
		
		$('#selected').find('#path3333inf, #path3325inf').attr("style", curr_style.panels.sleeve_color.infusion+"opacity:1");
	
	} else {
	
		$('#selected').find('#path3333inf, #path3325inf').attr("style","fill:#ffffff;fill-opacity:0;fill-rule:nonzero;stroke:none");
	
	}
	
	
	save();
	
}

function applyStyleToThumb(curr_style,index){

	var bases = [base1,base2,base3,base4];
	
	var currPiece = $('#jsonpieces svg').eq(index);
	
	//APPLY PANELS
	for (var i in bldr.panels){
	
		if(typeof i == 'undefined') break;
	
			for(var p in bldr.panels[i]){
			
				currPiece.find(bldr.panels[i][p]+'back').css({
				
					'fill'	:	curr_style.panels[i].fill

				});
				
				for(var b in bases){
			
					if(curr_style.panels[i].fill == bases[b]){
				
						var len = currPiece.find(bldr.panels[i][p]+'back').length;
						
						// if(bldr.panels[i][p]+'back' == '#path3325back')					
							// console.log('>>>'+bldr.panels[i][p]+'back'+' >>> '+len);
						
						var index = bases.indexOf(bases[b])+1;
						
						currPiece.find(bldr.panels[i][p]+'back')
						.attr('class','base'+index);
						
					}
				
				}
				
			}
		
			
	
	}
	
	//APPLY PIPINGS
	for (var i in bldr.pipings){
	
		if(typeof i == 'undefined') break;
	
		//IF EMPTY, DON'T PAINT
		if(curr_style.pipings[i].stroke == ""){
			
			var opacity = 0;
			
		}else{
		
			var opacity = 1;
		
		}
	
		for(var s in bldr.pipings[i]){
		
			currPiece.find(bldr.pipings[i][s]).css({
					
					'fill'			:	curr_style.pipings[i].stroke,
					'fill-opacity'	:	opacity
			
			});
			
			for(var b in bases){
			
				if(curr_style.pipings[i].stroke == bases[b]){
					
					var index = bases.indexOf(bases[b])+1;
					
					currPiece.find(bldr.pipings[i][s])
					.attr('class','base'+index);
					
				}
				
			}
		
		}
	
	}
	
	
	//APPLY NAME COLORS
	
	currPiece.find('#tspan3017').css({
		'fill'		:	curr_style.name.color,
		'stroke'	:	curr_style.name.outline_color
		});
		
	//INFUSIONS
	for(i=1;i<5;i++){
		
		currPiece.find('.infbase'+i)
			.css('background-color',curr_style['infbase'+i])
			.css('fill',curr_style['base'+i]);
	
		currPiece.find('.infpicker .infbase'+i).siblings('.colorname').html(transColor(curr_style['base'+i]));
	
	}

	currPiece.find('#gradstop1').css('stop-color', curr_style.infbase1);
	currPiece.find('#gradstop1').css('stop-color', curr_style.infbase2);

	
	//NUMBER POSITIONS
	
	var positions  = curr_style.number.positions;
	
	if (positions === 'frb') {
		currPiece.find('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
		currPiece.find('#tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
	}
	if (positions === 'flb') {
		currPiece.find('#tnleft,#tnleftmat, #tnright,#tnrightmat, #backnumber,#backnumbermat').css('opacity', '0').css('display', 'none');
		currPiece.find('#tnleft, #tnleftmat, #backnumber,#backnumbermat').css('opacity', '1').css('display', 'block');
	}
	
	//NUMBER COLORS
	currPiece.find('#tnleft, #tnright').css('fill',curr_style.number.color);
	
	//APPLY INFUSION
	
	if(curr_style.panels.sleeve_color.infusion != ''){
		
		currPiece.find('#path3333inf, #path3325inf').attr("style","fill:url('#camoInfusion'); stroke-width:0;;opacity:1");
	
	}else{
	
		currPiece.find('#path3333inf, #path3325inf').attr("style","fill:#ffffff;fill-opacity:0;fill-rule:nonzero;stroke:none");
	
	}
	
	currPiece.find('#tspan3017, #tspanmat')
		.text(curr_style.name.team_name);
	
	var fontColor = curr_style.name.color;

	var fontOutlineColor = curr_style.name.outline;

	var fontName = curr_style.name.typeface;
	
	var fontSize = fontSizeMe(fontName);
	
	if (factor = $('#fontcfg option:selected').attr('data-uppercase') == 'true') {

		ulcase = "uppercase";

	} else {

		ulcase = "none";

	}

	currPiece.find('#tspan3017')
	.attr('style', 'stroke:' + fontOutlineColor + ';font-family:"' + fontName + '";font-size:' + fontSize + 'px;text-align: left; text-anchor: middle; fill: ' + fontColor + ';text-transform:' + ulcase);

		for(var b in bases){
			
				if(fontColor == bases[b]){
					
					var index = bases.indexOf(bases[b])+1;
					
					currPiece.find('#tspan3017')
					.attr('class','base'+index);
					
					break;
					
				}
				
			}
	
	
	$('#jsonpieces').append("<style>@font-face {	font-family: '" + fontName + "';src: url(assets/fonts/" + fontName + ".eot);src: local('?'), url('assets/fonts/" + fontName + ".woff') format('woff'), url('assets/fonts/" + fontName + ".ttf') format('truetype');}</style>");
	
	
}

function fill(el,color){
	
	//el ->jQuery object
	//color -> hex (with '#')
	
	el.css({
		'fill': color,
		'fill-opacity' :1
		});
	
}

function changePiece(part, model) {

	if (typeof part == 'undefined') 
		part = 'jersey';

	if (part != 'jersey' && part != 'pant')
		part = 'jersey';

	if (typeof model == 'undefined')
		model = 3000;

	if (model != 3000 && model != 4040)
		model = 3000;

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

			var str = a = '<object data="assets/img/' + part + '_' + sides[c] + '_' + model + '.svg?v=2" type="image/svg+xml" onload="extract($(this))" id="' + part + '_' + sides[c] + '_' + model + '"></object>';

			$('.option').eq(c).find('svg').replaceWith(str);

			c++;

		}

	}

}