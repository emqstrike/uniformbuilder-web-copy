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

            	// Process Here ...

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