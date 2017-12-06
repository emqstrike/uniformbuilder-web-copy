$(document).ready(function() {

	ub.colorUtilities = {};

	ub.colorUtilities.colorCodesToColorObjArray = function (colorCodes) {

		var _result = false;

		if (!Array.isArray(colorCodes)) {
			ub.utilities.error('colorCode is not an Array');
			return _result;
		} 

		_result = _.map(colorCodes, function (item) { return ub.funcs.getColorByColorCode(item); });

		return _result;

	}

});