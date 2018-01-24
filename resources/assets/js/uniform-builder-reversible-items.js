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
				filename: "https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/cal-state-sublimated-17-jersey/options/highlights/0663b86c4c12b43a452fc412.png",
			}, 

		],

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

			console.log('Sport: ' + sport);
			console.log('Type: ' + type);
			console.log('Block Pattern: ' + blockPattern);
			console.log('Neck Option: ' + neckOption);
			console.log('');

			var _result = false;

            _result = _.find(this.blankThumbnailPaths, function (item) {

                return item.sport === sport && 
                    item.type === type && 
                    _.contains(item.blockPattern, blockPattern) && 
                    _.contains(item.neckOption, neckOption);

            });

            console.log('Result: ');
            console.log(_result);

            return (_.size(_result) > 0);

		}

	},

	ub.funcs.createPairingPopup = function () {

		

	};

	ub.funcs.initReversibleUI = function () {

		if (ub.config.blockPattern !== "Sublimated 17") { 
			console.log('Not a reversible item....');
			return;
		} else {
			// Reversible Item detected ...
			console.error('Reversible Item Detected...');
		}

		var _result = ub.data.reversible.getThumbnailPath(ub.config.sport, ub.config.type, ub.config.blockPattern, ub.config.option);
		var _sprite = undefined;

		if (typeof _result !== "undefined") {
			//_sprite = ub.pixi.new_sprite(obj.material_option_path);
		}

		$('div.reversible-thumb').fadeIn();

		console.error('Finished Initializing Reversible UI');

		// update thumbnail side-a
		var _sidea = ub.current_material.material.thumbnail_path;
		var _sideb = "https://s3-us-west-2.amazonaws.com/uniformbuilder/materials/staging/sublimated-17-jersey-blank-template_43_jersey7d29d19d8abc/thumbnail.jpg";

		$('div.side-thumb.side-a').css('background-image', 'url("' + _sidea + '")');
		$('div.side-thumb.side-b').css('background-image', 'url("' + _sideb + '")');

		// Init Events 

		$('div.side-thumb').unbind('click');
		$('div.side-thumb').on('click', function () {

			var _side = $(this).data('side');
			console.log('Side: ' + _side);

			createPairingPopup();

		});

	}

});