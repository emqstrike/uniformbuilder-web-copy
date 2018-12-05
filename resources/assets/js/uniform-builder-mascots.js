$(document).ready(function() {

    ub.data.mascotsCategories = {};

    ub.funcs.transformMascots = function () {

        var _one = '1';

        ub.data.mascots = _.filter (ub.data.mascots, {active: _one});

        // Hide Richardson Mascots #Richardson #BrandSpecific

        if (ub.config.brand.toLowerCase() === "prolook") {

            if (!_.contains(ub.fontGuideIDs, window.ub.valid)) {
            
                ub.data.mascots = _.filter(ub.data.mascots, function (mascot) {
                    
                    // return all prolook mascots together with other mascots which brand set to none
                    if (mascot.brand === 'prolook' || mascot.brand === null) {
                        return mascot;
                    }

                });

            }

        } else {

            ub.data.mascots = _.filter(ub.data.mascots, function (mascot) {
                if (mascot.brand === ub.config.brand.toLowerCase()) { return mascot; }
            });

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