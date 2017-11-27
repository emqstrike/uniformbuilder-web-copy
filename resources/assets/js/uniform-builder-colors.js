$(document).ready(function() {

	ub.funcs.prepareColors = function () {

		ub.data.colors = _.filter(ub.data.colors, {active: "1"});

        ub.data.colors = _.map(ub.data.colors, function (color) {

            color.order = ub.data.sublimatedColorArrangement.getOrderID(color.name).order;

            return color;

        });
                
        ub.data.colors = _.sortBy(ub.data.colors, 'order');

	};

});