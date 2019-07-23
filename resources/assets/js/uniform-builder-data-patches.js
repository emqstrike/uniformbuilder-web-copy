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

		var _id5924 = ["5924"];
		var _id11214 = ["11214"];

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

		// 5924
		if (typeof ub.config.savedDesignInfo === "object" &&  _.contains(_id5924, ub.config.savedDesignInfo.savedDesignID)) {
			
			ub.current_material.settings.applications[78].application.layer = "Left Sleeve";
			ub.current_material.settings.applications[79].application.layer = "Left Sleeve";
			ub.current_material.settings.applications[85].status = "off";

			ub.current_material.settings.applications[80].status = "off";
			ub.current_material.settings.applications[84].status = "off";
			ub.current_material.settings.applications[79].status = "off";
			ub.current_material.settings.applications[78].status = "off";
			
		}

		// 11214
		if (typeof ub.config.savedDesignInfo === "object" &&  _.contains(_id11214, ub.config.savedDesignInfo.savedDesignID)) {
			
			console.error('---- Start Patch ----');

			_.each(ub.current_material.settings.applications, function (application, key) {

				console.log(application)
				console.log(application.application.layer);
				console.log(key);

				if (application.application.layer === "Back Insert") {
					console.log('Deleting ' + key);
					delete ub.current_material.settings.applications[key];	
				}

				if (key ===  "83") {
					console.log('Hiding 83');
					application.status = "off";
				}

				if (key === "78") {
					console.log('Hiding 78');
					application.status = "off";
				}

				if (key ===  "82") {
					console.log('Hiding 82');
					application.status = "off";
				}

				if (key === "80") {
					console.log('Hiding 80');
					application.status = "off";
				}

				if (key === "81") {
					console.log('Hiding 81');
					application.status = "off";
				}
				
			});

			console.error('---- End Patch ----');
			
		}

	}

	ub.dataPatches.patchForPerspectiveIssues = function() {
		// Add the savedDesignId and the perspective/s that will be omitted. @var _savedDesigns
		var _savedDesigns = [
			{ 
				"savedDesignID" : "43030", 
				"omitPerspectives"	: ['left', 'right'],
			}, { 
				"savedDesignID" : "44473", 
				"omitPerspectives"	: ['left', 'right'],
			},
		];

		if (typeof ub.config.savedDesignInfo === "object" &&  !_.isEmpty(ub.config.savedDesignInfo)) {
			var data = _.findWhere(_savedDesigns, {"savedDesignID" : ub.config.savedDesignInfo.savedDesignID});
			_.each(ub.current_material.settings.applications, function (application) {
				application.application.views = _.omit(application.application.views, function (app) {
					return _.contains(data.omitPerspectives, app.perspective);
				});
			});

			console.groupCollapsed('%c ----- A Patch is Detected for this Saved Design Item. -----', 'background: #222; color: #bada55');
			console.info("Design: %s is not covered with latest changes in the application, a patch for this design will be applied.", data.savedDesignID);
			console.info("Saved Design Successfully Patched!");
			console.groupEnd();
		}
	}

	ub.dataPatches.run = function () {
		ub.dataPatches.patch4874to5728();
		ub.dataPatches.patchForPerspectiveIssues();
	};

	ub.dataPatches.forRandomFeedPatching = function () {

		var _id13233 = ["13233"];
		var _ok = typeof ub.config.savedDesignInfo === "object" &&  _.contains(_id13233, ub.config.savedDesignInfo.savedDesignID);

		if (_ok) { ub.current_material.settings.randomFeeds = {}; }

		return _ok;

	}

});