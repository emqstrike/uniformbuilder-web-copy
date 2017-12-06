$(document).ready(function () {

	ub.dataPatches = {};
	ub.data.transferColors = ['5882',];

	// Fix save designs 4874 to 5728, pre color array fix (commit: c643b1f)
	ub.dataPatches.patch4874to5728 = function () {

		var _idsV = ["4874", "4875", "4876"]; // Volg 
		var _idsG = ["5728"]; // Goldston
		var _id5225 = ["5225"];
		var _id5679 = ["5679"];
		var _id5880 = ["5880"];
		var _id5882 = ["5882"];

		// Volg
		if (typeof ub.config.savedDesignInfo === "object" && _.contains(_idsV, ub.config.savedDesignInfo.savedDesignID)) {
			ub.current_material.settings.applications[72].color_array = ub.colorUtilities.colorCodesToColorObjArray(["B", "W"]);
			ub.current_material.settings.applications[73].color_array = ub.colorUtilities.colorCodesToColorObjArray(["B"]);
		}

		// Goldston
		if (typeof ub.config.savedDesignInfo === "object" && _.contains(_idsG, ub.config.savedDesignInfo.savedDesignID)) {
			ub.current_material.settings.applications[5].color_array = ub.colorUtilities.colorCodesToColorObjArray(["T", "B", "VG"]);
		}

		// 5225
		if (typeof ub.config.savedDesignInfo === "object" &&  _.contains(_id5225, ub.config.savedDesignInfo.savedDesignID)) {
			ub.current_material.settings.applications[1].color_array = ub.colorUtilities.colorCodesToColorObjArray(["RB",'G']);
			ub.current_material.settings.applications[26].color_array = ub.colorUtilities.colorCodesToColorObjArray(["RB",'G']);
			ub.current_material.settings.applications[5].color_array = ub.colorUtilities.colorCodesToColorObjArray(["RB",'G']);
		}

		// Dekalb Sleeves
		if (typeof ub.config.savedDesignInfo === "object" && _.contains(_id5679, ub.config.savedDesignInfo.savedDesignID)) {
			ub.current_material.settings.applications[72].status = "off";
		}

		// 5880
		if (typeof ub.config.savedDesignInfo === "object" && _.contains(_id5880, ub.config.savedDesignInfo.savedDesignID)) {
			ub.current_material.settings.applications[74].color_array = ub.colorUtilities.colorCodesToColorObjArray(["W"]);
		}

		// 5882
		if (typeof ub.config.savedDesignInfo === "object" &&  _.contains(_id5882, ub.config.savedDesignInfo.savedDesignID)) {
			ub.current_material.settings.applications[72].color_array = ub.colorUtilities.colorCodesToColorObjArray(["LG",'W']);
			ub.current_material.settings.applications[74].color_array = ub.colorUtilities.colorCodesToColorObjArray(["LG",'W']);
			ub.current_material.settings.applications[75].color_array = ub.colorUtilities.colorCodesToColorObjArray(["LG",'W']);
		}
		
	}

	ub.dataPatches.run = function () {
		ub.dataPatches.patch4874to5728();
	};

});