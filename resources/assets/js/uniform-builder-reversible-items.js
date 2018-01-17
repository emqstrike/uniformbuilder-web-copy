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

	ub.funcs.initReversibleUI = function () {

		console.error('Initializing Reversible UI!!!!');

		var _result = ub.data.reversible.getThumbnailPath(ub.config.sport, ub.config.type, ub.config.blockPattern, ub.config.option);
		var _sprite = undefined;

		if (typeof _result !== "undefined") {
			//_sprite = ub.pixi.new_sprite(obj.material_option_path);
		}
        
	}

});