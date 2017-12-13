$(document).ready(function() {

	ub.sportsSpecific = {};

	// Sports to skip offset settings when the free form tool is used on tackle twill
	ub.sportsSpecific.freeFromExemptions = {
		items: [
			{
				sport: 'Basketball',
				locations: ['1', '6'],
			},
			{
				sport: 'Hockey',
				locations: ['6'],
			},
			{
				sport: 'Baseball',
				locations: ['1'],
			},

		],
		isExempted: function (appID, sport, applicationType) {

			var _result = undefined;

			_result = _.filter(this.items, function (item) {
				return item.sport === sport && _.contains(item.locations, appID);
			});

			return (applicationType === "tackle_twill" && _result.length > 0);

		}
	}

});