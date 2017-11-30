$(document).ready(function () {

	ub.dataPatches = {};

	// Fix save designs 4874 to 5728, pre color array fix (commit: c643b1f)
	ub.dataPatches.patch4874to5728 = function () {

		var _idsV = ["4874", "4875", "4876"]; // Volg 
		var _idsG = ["5728"]; // Goldston

		var _id5225 = ["5225"];
	
		if (
			typeof ub.config.savedDesignInfo === "object" && 
			_.contains(_idsV, ub.config.savedDesignInfo.savedDesignID)
		) {
			ub.current_material.settings.applications[72].color_array = ub.colorUtilities.colorCodesToColorObjArray(["B", "W"]);
			ub.current_material.settings.applications[73].color_array = ub.colorUtilities.colorCodesToColorObjArray(["B"]);
		}

		if (
			typeof ub.config.savedDesignInfo === "object" && 
			_.contains(_idsG, ub.config.savedDesignInfo.savedDesignID)
		) {

			// Goldston
			if (_.contains(_idsG, ub.config.savedDesignInfo.savedDesignID)) {
				ub.current_material.settings.applications[5].color_array = ub.colorUtilities.colorCodesToColorObjArray(["T", "B", "VG"]);
			}

		}

		if (
			typeof ub.config.savedDesignInfo === "object" && 
			_.contains(_id5225, ub.config.savedDesignInfo.savedDesignID)
		) {

			if (_.contains(_id5225, ub.config.savedDesignInfo.savedDesignID)) {
				ub.current_material.settings.applications[1].color_array = ub.colorUtilities.colorCodesToColorObjArray(["RB",'G']);
			}

			if (_.contains(_id5225, ub.config.savedDesignInfo.savedDesignID)) {
				ub.current_material.settings.applications[26].color_array = ub.colorUtilities.colorCodesToColorObjArray(["RB",'G']);
			}

			if (_.contains(_id5225, ub.config.savedDesignInfo.savedDesignID)) {
				ub.current_material.settings.applications[5].color_array = ub.colorUtilities.colorCodesToColorObjArray(["RB",'G']);
			}

		}
		
	}

	ub.dataPatches.run = function () {
		ub.dataPatches.patch4874to5728();
	};

});