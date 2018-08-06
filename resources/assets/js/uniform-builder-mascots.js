$(document).ready(function() {

    ub.data.mascotsCategories = {};

    ub.funcs.transformMascots = function () {

        var _one = '1';

        ub.data.mascots = _.filter (ub.data.mascots, {active: _one});

        // Hide Richardson Mascots #Richardson #BrandSpecific
        if (!_.contains(ub.fontGuideIDs, window.ub.valid)) {
            ub.data.mascots = _.filter(ub.data.mascots, {brand: 'prolook'})
        }

        _.each(ub.data.mascots, function (mascot, index) {

            var _mascotID = mascot.mascot_category_id;

            if (_mascotID !== null) { 
                if (ub.config.toString) { _mascotID = mascot.mascot_category_id.toString(); } 
            }

            mascot.layers_properties = JSON.parse(mascot.layers_properties);

            ub.data.mascotsCategories[mascot.category] = {
                name: mascot.category,
                id: _mascotID,
            };

        });

    }

});