$(document).ready(function() {
	
	// afterLoad function container
	ub.funcs.afterLoadFunctionList = [];

	ub.funcs.executeAfterLoadFunctionList = function () {

		ub.utilities.info('Executing Afterload Functions');
		console.log('');

	    _.each(ub.funcs.afterLoadFunctionList, function (func){
	         func();
	    });

	};

	ub.funcs.addFunctionToAfterloadList = function (func) {

		if (typeof func !== "function") {
			ub.utilities.proggError('Argument func must be of type function...');
			return;
		}

		ub.funcs.afterLoadFunctionList.push(func);

	}

	// feature flag checker
	ub.funcs.betaFeaturesChecker = function (_flag, callback, legacy) {
        var feature_flags = JSON.parse(localStorage.getItem('feature_flags'))

        var _flags = ['New PDF', 'New Filter'];
        if (_.contains(_flags, _flag)) {
            if(localStorage.getItem('beta_features') === 'true') {
                var currentFeature = feature_flags.find(function(i) {return i.name === _flag;});
                if (
                    localStorage.getItem('beta_features') === 'true' &&
                    currentFeature !== undefined &&
                    currentFeature.name === _flag &&
                    currentFeature.user_ids.includes(ub.user.id.toString())
                ) {
                    callback();
                } else {
                    legacy();
                }
            } else {
                legacy();
            }
        }

    };

    ub.funcs.removeBackMaterialOptions = function(sport) {
        var materialOptions = ub.current_material.materials_options;
        var modifierLabels  = ub.data.modifierLabels;

        if (sport === "Team Flag (Apparel)") {
            ub.current_material.materials_options = _.filter(materialOptions, function(option) {
                return option.perspective === 'front';
            });
        }
    };

});