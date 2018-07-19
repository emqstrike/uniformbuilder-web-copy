$(document).ready(function() {

    ub.data.mascotsCategories = {};

    ub.funcs.transformMascots = function () {

        ub.data.mascots = _.filter (ub.data.mascots, {active: '1'});

        // Hide Richardson Mascots #Richardson #BrandSpecific
        if (!_.contains(ub.fontGuideIDs, window.ub.valid)) {
            ub.data.mascots = _.filter(ub.data.mascots, {brand: 'prolook'})
        }

        _.each(ub.data.mascots, function (mascot, index) {

            mascot.layers_properties = JSON.parse(mascot.layers_properties);

            ub.data.mascotsCategories[mascot.category] = {
                name: mascot.category,
                id: mascot.mascot_category_id,
            };

        });

    }

});