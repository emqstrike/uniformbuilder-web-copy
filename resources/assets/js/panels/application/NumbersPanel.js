function NumbersPanel() {
	
}

NumbersPanel.init = function () {
	$('#mod_primary_panel > .modifier_main_container').empty();
	// Filter application with application type of numbers
	var _Applications = ub.current_material.settings.applications;
	var _filteredApplications = _.filter(_Applications, function(i) {
	    if (i.application_type === 'front_number' || i.application_type === 'back_number' || i.application_type === 'sleeve_number') {
	        return i;
	    }
	});

	var _appData = [];

	// Setup applications
	_.map(_filteredApplications, function (i) {
	    var objStock = {
	        type: i.application.name.toUpperCase(),
	        defaultText: i.text,
	        code: i.code,
	        perspective: i.application.views[0].perspective,
	        placeholder: i.text,
	        fonts: true,
	        fontsData: ub.funcs.fontStyleSelection(i, i.application.name.toUpperCase()),
	        slider: ub.funcs.isTackleTwill() ? false : true,
	        sliderContainer: ub.funcs.sliderContainer(i.code),
	        colorPicker: true,
	        colorsSelection: ub.funcs.colorsSelection(i.code, 'CHOOSE FONT COLOR'),
	        accents: true,
	        accentsData: ub.funcs.fontAccentSelection(i, 'CHOOSE FONT ACCENT'),
	        isPlayerName: false,
	        status: (typeof i.status === "undefined" || i.status === "on" ? true : false)
	    }
	    _appData.push(objStock);
	});

	// prepare data
	var templateData = {
	    title: "number",
	    type: "numbers",
	    applications: _appData,
	    isTackleTwill: ub.funcs.isTackleTwill() ? 'uk-disabled bgc-light' : ''
	};

	// send to mustache
	var _htmlBuilder = ub.utilities.buildTemplateString('#m-applications-numbers-uikit', templateData);

	// output to page
	$('.modifier_main_container').append(_htmlBuilder);

	if (ub.funcs.isTackleTwill()) {
	    ub.funcs.getFreeApplicationsContainer('numbers');
	}

	// initialize and Bind Events
	ub.funcs.setupApplicationSettings(_appData);
	ub.funcs.initializer();
	ApplicationEvent.events.init();
    NewApplicationPanel.events.init();
}