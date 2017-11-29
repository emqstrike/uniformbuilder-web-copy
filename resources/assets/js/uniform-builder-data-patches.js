$(document).ready(function () {

	ub.dataPatches = {};

	ub.dataPatches.patch4874to4876 = function () {

		// Fix save designs 4874 to 4876, pre color array fix (commit: c643b1f)

		
		var _idsV = ["4874", "4875", "4876"]; // Volg 
		var _idsG = ["5728"]; // Goldstom
	
		if (
			typeof ub.config.savedDesignInfo === "object" && 
			_.contains(_idsV, ub.config.savedDesignInfo.savedDesignID)
		) {
			ub.current_material.settings.applications[72].color_array = _.map(["B", "W"], function (item) {
				return ub.funcs.getColorByColorCode(item);
			});

			ub.current_material.settings.applications[73].color_array = _.map(["B"], function (item) {
				return ub.funcs.getColorByColorCode(item);
			});
		}

		if (
			typeof ub.config.savedDesignInfo === "object" && 
			_.contains(_idsG, ub.config.savedDesignInfo.savedDesignID)
		) {

			// Goldstom
			if (_.contains(_idsG, ub.config.savedDesignInfo.savedDesignID)) {
				ub.current_material.settings.applications[5].color_array = _.map(["T", "B", "VG"], function (item) {
					return ub.funcs.getColorByColorCode(item);
				});
			}

		}
		


	}

	ub.dataPatches.run = function () {

		// This is for global execution ...

	};

	ub.dataPatches.run();

});