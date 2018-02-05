$(document).ready(function() {
	
	ub.data.reversible = {

		reversibleCategories: [

			{
				sport: "Football 2017",
				blockPattern: ["Sublimated 17",],
				neckOption: ["Jersey",],
				type: "upper",
			}, 

		],

		blankThumbnailPaths: [

			{
				sport: "Football 2017",
				blockPattern: ["Sublimated 17",],
				neckOption: ["Jersey",],
				type: "upper",
				filename: "https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/sublimated-17-jersey-blank-template_43_jersey7d29d19d8abc/thumbnail.jpg",
			}, 

		],

		state: {
			currentSide: 'a',
			isSideBBlank: function () {
				return this.blankSideB;
			},
			getCurrentSide: function () {
				return this.currentSide;
			},
			blankSideB: true,
		},

		getThumbnailPath: function (sport, type, blockPattern, neckOption) {

			var _result = false;

            _result = _.find(this.blankThumbnailPaths, function (item) {

                return item.sport === sport && 
                    item.type === type && 
                    _.contains(item.blockPattern, blockPattern) && 
                    _.contains(item.neckOption, neckOption);

            });

            return _result;

		},

		isReversible: function (sport, type, blockPattern, neckOption) {

			var _result = false;

            _result = _.find(this.blankThumbnailPaths, function (item) {

                return item.sport === sport && 
                    item.type === type && 
                    _.contains(item.blockPattern, blockPattern) && 
                    _.contains(item.neckOption, neckOption);

            });

            return (_.size(_result) > 0);

		}

	};

    ub.status.reversiblePopupVisible = false;
    ub.funcs.createReversiblePopup = function () {

        var data = {
           matchingStyles: ub.materials,
        }

        var template = $('#m-reversible-popup').html();
        var markup = Mustache.render(template, data);

        $('body').append(markup);

        $popup = $('div#primaryReversiblePopup');
        $popup.fadeIn();

        ub.status.reversiblePopupVisible = true;

        $('div.reversiblePopupResults > div.item').hover(
            function() {
                $( this ).find('div.name').addClass('pullUp');
            }, function() {
                $( this ).find('div.name').removeClass('pullUp');
            }
        );

        $('div.reversiblePopupResults > div.item').on('click', function () {

           var _id = $(this).data('id');
           var _name = $(this).data('name');

           // Process Here ...
                       
        });

        ub.funcs.centerPopups();

        $('div.close-popup').on('click', function () {

            $popup.remove();
            ub.status.reversiblePopupVisible = false;

        });

        $popup.bind('clickoutside', function () {

            var _status = $(this).data('status');

            if (_status === 'hidden') {

                $(this).data('status', 'visible');
                return;

            }

            $(this).data('status', 'hidden');
            $(this).hide();
            $(this).remove();

            ub.status.reversiblePopupVisible = false;

        });

    }
    
	ub.loadMatchingMaterials = function (obj, object_name) {

        ub.displayDoneAt('Styles loaded.');
        ub.materials = {};
        ub.convertToString(obj);

        ub.materials = _.filter(obj, {debug_mode: '0'});
        ub.materials = _.filter(ub.materials, {asset_target: 'web'});

        _.each (ub.materials, function (material) {

            material.calculatedPrice = ub.funcs.getPrice(material);
            ub.funcs.processMaterialPrice(material);

            _result = _.find(ub.data.tagged_styles, {uniform_id: material.id});
                    
            material.is_favorite = (typeof _result !== "undefined"); // Mark Favorite items

            if (material.thumbnail_path_left === "") {
                material.thumbnail_path_left = material.thumbnail_path;
            }

            if ((material.uniform_category === "Baseball" && material.type === "lower") || 
                (material.uniform_category === "Fastpitch" && material.type === "lower") || 
                (material.uniform_category === "Basketball" && material.type === "lower") || 
                (material.uniform_category === "Lacrosse" && material.type === "lower") || 
                (material.uniform_category === "Football" && material.type === "lower") ||
                (material.uniform_category === "Football 2017" && material.type === "lower") ||
                ub.funcs.isSocks()) {

                    material.thumbnail_path_left = material.thumbnail_path_front;

            }

            if (material.uniform_category === "Cinch Sack (Apparel)") { material.thumbnail_path_left = material.thumbnail_path_back; }

        });

        ub.funcs.createReversiblePopup();

    }

	ub.funcs.getSimilarStyles = function () {

        var _gender = ub.config.gender.toTitleCase();
        var _sport = ub.config.sport;
        var _blockPattern = ub.config.blockPattern;
        var _option = ub.config.option;
        var _type = ub.config.type
        var _url = ub.config.api_host + 'api/v1-0/getStyles/' + _gender + '/' + _sport + '/' + _blockPattern + '/' + _option + '/' + _type;

        ub.materials_url = _url;
        ub.loader(ub.materials_url, 'materials', ub.loadMatchingMaterials);

	}

	ub.funcs.loadReversiblePicker = function () {

		var template = $('#m-confirm-action').html();
        var data = { message: "Are you sure you want to add another side to this design to this uniform and convert it to a reversible style?", };
        var markup = Mustache.render(template, data);
        var dialog = "";

        dialog = bootbox.dialog({
            title: 'Add Reversible Side?',
            message: markup,
        });

        dialog.init(function() {

        	// Ok
            var _okButton = "div#confirm-action > div.footer-buttons > span.button.okButton";
            $(_okButton).unbind('click');
            $(_okButton).on('click', function () {

            	// Save Current Design, use a new UI instead of the old one? 
            	// Create Pairing Record
            	// Load Picker
            	// Get Materials
            	ub.funcs.getSimilarStyles();
            	// Set Status vars
            	// Update Pairing Record
            	// Load Reverse Side, initialize bc, update pairing info (bc field for the new side)
                dialog.modal('hide');

            });

        	// Cancel
            var _cancelButton = "div#confirm-action > div.footer-buttons > span.button.cancelButton";
            $(_cancelButton).unbind('click');
            $(_cancelButton).on('click', function () { dialog.modal('hide'); });

        });

	};

	ub.funcs.loadReversibleSide = function () {

		var template = $('#m-confirm-action').html();
        var data = { message: "Please confirm that you want to close this side and load the reverse side of this uniform?", };
        var markup = Mustache.render(template, data);
        var dialog = "";

        dialog = bootbox.dialog({
            title: 'Switch Side?',
            message: markup,
        });

        dialog.init(function() {

        	// Ok
            var _okButton = "div#confirm-action > div.footer-buttons > span.button.okButton";
            $(_okButton).unbind('click');
            $(_okButton).on('click', function () {

            	// Process Here ...
                dialog.modal('hide');

            });

        	// Cancel
            var _cancelButton = "div#confirm-action > div.footer-buttons > span.button.cancelButton";
            $(_cancelButton).unbind('click');
            $(_cancelButton).on('click', function () { dialog.modal('hide'); });

        });

	};

	ub.funcs.initReversibleUI = function () {

		var _sideb;
		var _result;
		var _sidea;
		var _isReversible = ub.data.reversible.isReversible(ub.config.sport, ub.config.type, ub.config.blockPattern, ub.config.option);

		if (!_isReversible) { return; }

		// Update Thumbnails
		_sidea = ub.current_material.material.thumbnail_path;
		_result = ub.data.reversible.getThumbnailPath(ub.config.sport, ub.config.type, ub.config.blockPattern, ub.config.option);
		if (typeof _result !== "undefined") { _sideb = _result.filename; }
		$('div.reversible-thumb').fadeIn();
		$('div.side-thumb.side-a').css('background-image', 'url("' + _sidea + '")');
		$('div.side-thumb.side-b').css('background-image', 'url("' + _sideb + '")');

		// Init Events 
		$('div.side-thumb').unbind('click');
		$('div.side-thumb').on('click', function () {

			var _side = $(this).data('side');
			var _sameSide = _side === ub.data.reversible.state.getCurrentSide();		
			var _sideBBlank = ub.data.reversible.state.isSideBBlank();

			if (_sideBBlank) {
				ub.funcs.loadReversiblePicker();
			} else {
				ub.funcs.loadReversibleSide();
			}

		});

	}

});