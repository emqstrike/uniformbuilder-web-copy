function MascotPanel() {
	
}

MascotPanel.init = function () {
	// clear contents
	$('#mod_primary_panel > .modifier_main_container').empty();

	// get applications and filter
	var _Applications = ub.current_material.settings.applications;
	var _filteredApplications = _.filter(_Applications, function(i) {
	    if (i.application_type === 'mascot' || i.application_type === 'embellishments') {
	        return i;
	    }
	});

	var _appData = [];

	// getting only data that i need
	_.map(_filteredApplications, function (i) {
	    if (i.application_type === 'embellishments') {
	        var objCustom = {
	            thumbnail: i.embellishment.thumbnail,
	            type: 'CUSTOM LOGO',
	            code: i.code,
	            perspective: i.application.views[0].perspective,
	            name: i.embellishment.name,
	            viewArtDetails: ub.config.host + '/utilities/previewEmbellishmentInfo/' + i.embellishment.design_id,
	            viewPrint: i.embellishment.svg_filename,
	            slider: ub.funcs.isTackleTwill() ? false : true,
	            sliderContainer: ub.funcs.sliderContainer(i.code),
	            status: (typeof i.status === "undefined" || i.status === "on" ? true : false)
	        };
	        _appData.push(objCustom);
	    } else if (i.application_type === 'mascot') {
	        var objStock = {
	            thumbnail: i.mascot.icon,
	            type: 'STOCK MASCOT',
	            code: i.code,
	            perspective: i.application.views[0].perspective,
	            name: i.mascot.name,
	            slider: ub.funcs.isTackleTwill() ? false : true,
	            sliderContainer: ub.funcs.sliderContainer(i.code),
	            colorPicker: true,
	            colorsSelection: ub.funcs.colorsSelection(i.code, 'CHOOSE STOCK MASCOT COLORS'),
	            status: (typeof i.status === "undefined" || i.status === "on" ? true : false)
	        };
	        _appData.push(objStock);
	    }
	});

	// prepare data
	var props = {
	    isTackleTwill: ub.funcs.isTackleTwill() ? 'uk-disabled bgc-light' : '',
	    title: "logo",
	    type: "mascots",
	    applications: _appData
	};

	_htmlBuilder = ub.utilities.buildTemplateString('#m-applications-mascot-uikit', props);

	// output to page
	$('.modifier_main_container').append(_htmlBuilder);

	_.map(_appData, function(application) {
	    if (application.application_type !== "free") {
	        if (application.status) {
	            $('.applicationUIBlockNew[data-application-id="'+ application.code +'"] div.hide-show-button-container .view-application').addClass('uk-active');
	            $('.applicationUIBlockNew[data-application-id="'+ application.code +'"] div.hide-show-button-container .hide-application').removeClass('uk-active');
	            $('.applicationUIBlockNew[data-application-id="'+ application.code +'"]').find('.mascot-options-container').show();
	            $('.applicationUIBlockNew[data-application-id="'+ application.code +'"]').find('button.con-img-added-mascot-logo').removeClass('uk-disabled');
	        } else {
	            $('.applicationUIBlockNew[data-application-id="'+ application.code +'"]').find("div.hide-show-button-container .hide-application").addClass('uk-active');
	            $('.applicationUIBlockNew[data-application-id="'+ application.code +'"]').find("div.hide-show-button-container .view-application").removeClass('uk-active');
	            $('.applicationUIBlockNew[data-application-id="'+ application.code +'"]').find('.mascot-options-container').hide();
	            $('.applicationUIBlockNew[data-application-id="'+ application.code +'"]').find('button.con-img-added-mascot-logo').addClass('uk-disabled');
	        }
	    }
	});

	if (ub.funcs.isTackleTwill()) {
	    ub.funcs.getFreeApplicationsContainer('mascots');
	}

	if (_appData.length === 0) {
	    $(".add-another-application-container").hide();
	}
	
	// initialize and bind events
	ub.funcs.setupApplicationSettings(_appData);
	ub.funcs.initializer();
	MascotPanel.events.init();
    NewApplicationPanel.events.init();
}

MascotPanel.events = {
	is_init: true,

	init: function() {
	    var _this = this;
	    if (MascotPanel.events.is_init) {
	        $('#primary_options_container').on('click', '.applicationUIBlockNew .flip-mascot', _this.onFlipMascot);
	        $('#primary_options_container').on('click', '.applicationUIBlockNew .view-application', _this.onShowMascot);
	        $('#primary_options_container').on('click', '.applicationUIBlockNew .hide-application', _this.onHideMascot);
	        $('#primary_options_container').on('click', '.colorItem[data-object-type="mascots"]', _this.onChangeMascotColor);
	        MascotPanel.events.is_init = false;
	    }
	},

	onFlipMascot: function() {
	    var code = $(this).data("application-code").toString();
	    var _settingsObject = _.find(ub.current_material.settings.applications, {code: code});
	    ub.funcs.flipMascot(_settingsObject);
	    $(this).toggleClass('uk-active');
	},

	onShowMascot: function() {
	    $(this).addClass('uk-active');
	    $(this).closest('.applicationUIBlockNew').find(".hide-application").removeClass('uk-active');
	    $(this).closest('.applicationUIBlockNew').find('.mascot-options-container').show();
	    // Disable image
	    $(this).closest('.applicationUIBlockNew').find('button.con-img-added-mascot-logo').removeClass('uk-disabled');
	    var application_id = $(this).closest(".applicationUIBlockNew").data('application-id');
	    ub.funcs.manipulateApplicationByStatus("on", application_id);
	},

	onHideMascot: function() {
	    $(this).addClass('uk-active');
	    $(this).closest('.applicationUIBlockNew').find(".view-application").removeClass('uk-active');
	    $(this).closest('.applicationUIBlockNew').find('.mascot-options-container').hide();
	    $(this).closest('.applicationUIBlockNew').find('button.con-img-added-mascot-logo').addClass('uk-disabled');
	    var application_id = $(this).closest(".applicationUIBlockNew").data('application-id');
	    ub.funcs.manipulateApplicationByStatus("off", application_id);
	    ub.funcs.deactivateMoveTool();
	},

	onChangeMascotColor: function() {
	    // changing active color
	    $(this).parent().parent().find('button').removeClass('activeColorItem').html('');
	    $(this).addClass('activeColorItem').html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-color-font-size"></span>');

	    // proceed
	    var dataId = $(this).attr('data-id');
	    var _settingsObject = _.find(ub.current_material.settings.applications, {code: dataId});

	    var _layer_no = $(this).data('layer-no');
	    var _color_code = $(this).data('color-code');
	    var _layer_name = $(this).data('layer-name');
	    var _temp = $(this).data('temp');
	    var _colorObj = ub.funcs.getColorByColorCode(_color_code);


	    var _oldVal = {
	        layerNo: _layer_no,
	        color: _settingsObject.color_array[_layer_no - 1],
	        applicationCode: _settingsObject.code,
	    };

	    if (_temp !== 'undo') {
	        ub.funcs.pushOldState('color change', 'application', _settingsObject, _oldVal);
	    }

	    ub.funcs.changeMascotColor(_colorObj, _layer_no, _settingsObject);
	    ub.funcs.changeActiveColorSmallColorPicker(_layer_no, _color_code, _colorObj);

	    var _processMatchingSide = true;
	    var _matchingID = undefined;
	    var _matchingSettingsObject = undefined;

	    _matchingID = ub.data.matchingIDs.getMatchingID(dataId);

	    if (typeof _matchingID !== "undefined") {
	        _matchingSettingsObject = _.find(ub.current_material.settings.applications, {code: _matchingID.toString()});
	    }

	    // On Crew Socks, only change the color of the matching side if its the same mascot id
	    if (typeof _matchingSettingsObject !== "undefined") {
	        if (_matchingSettingsObject.type !== "free" && ub.funcs.isSocks()) {
	            _processMatchingSide = false;
	        }

	        if (typeof _settingsObject.mascot === "object" && typeof _matchingSettingsObject.mascot === "object") {
	            if (_settingsObject.mascot.id === _matchingSettingsObject.mascot.id) {
	                _processMatchingSide = true;
	            }
	        }
	    }

	    if (typeof _matchingID !== "undefined") {
	        if (_processMatchingSide) {
	            ub.funcs.changeMascotColor(_colorObj, _layer_no, _matchingSettingsObject);
	        }
	    }
	}
}