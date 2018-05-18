$(document).ready(function () {

	ub.r = {};
	
	ub.r.isBrandRichardson = function () {

		return ub.config.brand === ub.CONSTANTS.richardson;

	}


	ub.r.processColorPallete = function (objectName, obj) {

		ub.data.richardson.colorSet = obj;
		ub.data.richardson.colorSet.colorscolorPallete1Url = JSON.parse(ub.data.richardson.colorSet.colors);

		console.log(ub.data.richardson.colorSet);

		console.log('process Color Pallete');

		console.log(objectName);
		console.log(obj);

		console.log(ub.current_material.colorPallete2Url)
		console.log(ub.current_material.colorPallete3Url)


	}

	ub.r.disabler = function () {

		console.log('Inside Disabler...');

		console.log('Material ID: ');
		console.log(ub.config.material_id);

        if (ub.config.material_id !== -1 && ub.r.isBrandRichardson()) {

			$('nav.navbar').hide();
			$('#left-side-toolbar').hide();

		}

	};

	ub.r.initEvents = function () {

		$('div#left-view-buttons > span.toolbar-item').unbind('click');
		$('div#left-view-buttons > span.toolbar-item').on('click', function () {

			var _dataView = $(this).data('view');

			console.log('Data View: ');
			console.log(_dataView);

			$('a.change-view[data-view="' + _dataView + '"]').trigger('click');

		});

	}

	ub.r.initRUI = function () {

		console.log('Turning on top info module ...');
		$('div#mod-top-info').show();
		ub.funcs.activatePartByIndex(1);

	};

	ub.r.initUniformInfo = function (uniformType, uniformName, blockPattern, neckOption) {

		$('div#mod-top-info > div.left > h5.block-pattern-neck-option').html(blockPattern + ' / ' + neckOption);
		$('div#mod-top-info > div.left > strong.uniform-name').html(uniformName);
		$('div#mod-top-info > div.left > em.uniform-application-type').html(uniformType);

		$('div#uniform_name').hide();
		$('div#uniform-price-youth').hide();
		$('div#uniform-price-adult').hide();
		$('div#uniform-price-call-for-team-pricing').hide();
		$('div#saved_design_name').hide();
		$('div.options_panel_header').hide();
		$('div.footer_buttons_container').hide();

	}

	/* Sidebar Functions */ 

	ub.r.createScrollingColorPickerWithPatterns = function () {

		console.log('Calling this func...');

		var _teamColorObj           = ub.current_material.settings.team_colors;
        var _sortedModifierLabels   = _.sortBy(ub.data.modifierLabels, 'index');
        var _tempIndex              = 1;
        var _colorSet               = ub.funcs.getBaseColors();
        var _strBuilder             = '';

        console.log('Base Colors: ');
        console.log(_colorSet);
        console.log('Color Set: ');
        console.log(ub.data.richardson.colorSet.colors);

        _colorSetFiltered = _.filter(_colorSet, function (colorItem) {

        	var _result = _.contains(ub.data.richardson.colorSet.colors, colorItem.color_code);

        	if (!_result) {
        		console.error('Excluding: ' + colorItem.color_code);
        	} else {
        		console.log('Including: ' + colorItem.color_code);
        	}

        	return _result;

        });

        console.log('Modifier Labels: ')
        console.log(_sortedModifierLabels);

        console.log('Color Set: ');
        console.log(_colorSet);

        // Convert this to a mustache template

        console.log('Pattern Thumbs');
        console.log(ub.data.richardson.patternThumbs);
        
        _strBuilder +=  ub.utilities.buildTemplateString('#r-scrolling-color-picker', {

        	modifier: _sortedModifierLabels,
        	colorSet: _colorSet,
        	path: ub.data.richardson.patternThumbsPath,
        	patternThumbs: ub.data.richardson.patternThumbs.items,

        });

        // _.each(_sortedModifierLabels, function (modLabel) {

        // 	console.log('Modlabel: ');
        // 	console.log(modLabel);

        // 	_strBuilder += '<div>' + modLabel.name + '</div>';

        //     _.each(_colorSet, function (colorObj, index) {

        //     });

        // });

        $('div#primary_options_container > div#cw').html(_strBuilder);

	}

	/* End Sidebar Functions */

	ub.r.init = function () {

		console.error('Richardson Brand Detected: ');
		console.error('Initializing ... ');

		ub.r.disabler();
		ub.r.initRUI();
		ub.r.initEvents();

		// TS provisions
		TeamStoreToolBox.is_enabled = false;

		ub.r.initUniformInfo(ub.config.uniform_application_type, ub.config.uniform_name, ub.config.blockPattern, ub.config.option);

		console.error('Initialized ... ');

	}


	// Start All

	if (ub.r.isBrandRichardson()) { ub.r.init(); }

	// 

});