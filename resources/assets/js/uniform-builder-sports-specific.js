$(document).ready(function() {

	ub.sportsSpecific = {};

	// Sports to skip offset settings when the free form tool is used on tackle twill
	ub.sportsSpecific.freeFromExemptions = {
		items: [],
		isExempted: function (appID, sport, applicationType) {

			var _result = undefined;

			_result = _.filter(this.items, function (item) {
				return item.sport === sport;
			});

			return (_result.length > 0);

		}
	}

});