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

    /**
    * @desc change only the material mascot preview thumbnail
    * when the @param settingObject.mascot thumbnail is empty
    * @param obj settingObject - application object configuration
    * @return thumbnail path
    */
    ub.funcs.setMascotThumbnail = function (settingObject) {
        
        var colors = settingObject.color_array;
        var mascot = settingObject.mascot;

        var thumbnail = '';

        if (typeof mascot.thumbnail === 'undefined' || mascot.thumbnail === '') {

            var i = _.size(colors);
            var layersProperties = [];

            /**
            * Iterate in each mascot layers and create a new array of object called layersProperties 
            * which contains the necessary fields needed for the image generator
            */
            _.map(mascot.layers_properties, function(layer) {

                var colorObj = colors[--i];

                if (i >= 0) {
                    layersProperties.push({
                        "default_color": colorObj.color_code,
                        "layer_number": layer.layer_number,
                        "hex_code": colorObj.hex_code,
                        "filename": layer.filename,
                        "team_color_id": layer.team_color_id
                    });
                }                    

            });

            /*
            * Setup the configuration object
            * Low resolution image will be 125x125
            * High resolution image will be 256x256
            */
            const config = {
                headers: {
                    accessKey: ub.config.ig_key
                },
                body: {
                    layers_properties: layersProperties,
                    low_res_size: {
                       w: 125,
                       h: 125
                    },
                    high_res_size: {
                       w: 256,
                       h: 256
                    }
                },
                url: ub.config.ig_url,
            }

            mascot.thumbnail = '';
            
            /**
            * Call the Image Generator Function
            * Passing the Setup Configuration Object declared above as an argument
            * Callback: display the generated image in span.accentThumb > img
            */
            ub.utilities.generateImage(config, function(response) {
                
                thumbnail = response.highres_url;

                $("span.accentThumb > img").attr("src", thumbnail);

                mascot.thumbnail = thumbnail;

            });

        }

        return mascot.thumbnail;
        
    }

    /**
    * @desc change only the material mascot preview thumbnail
    * when a color in the color picker is clicked!
    * @param obj settingObject - application object configuration
    */
    ub.funcs.setMascotThumbnailInColorPicker = function (settingObject) {

        var application = _.find(ub.current_material.settings.applications, {code: settingObject.code});

        var colors = application.color_array;
        var mascot = application.mascot;

        var i = _.size(colors);
        var layersProperties = [];

        var thumbnail = '';

        /**
        * Iterate in each mascot layers and create a new array of object called layersProperties 
        * which contains the necessary fields needed for the image generator
        */
        _.map(mascot.layers_properties, function(layer) {

            var colorObj = colors[--i];

            if (i >= 0) {
                layersProperties.push({
                    "default_color": colorObj.color_code,
                    "layer_number": layer.layer_number,
                    "hex_code": colorObj.hex_code,
                    "filename": layer.filename,
                    "team_color_id": layer.team_color_id
                });
            }                

        });

        /*
        * Setup the configuration object
        * Low resolution image will be 125x125
        * High resolution image will be 256x256
        */
        const config = {
            headers: {
                accessKey: ub.config.ig_key
            },
            body: {
                layers_properties: layersProperties,
                low_res_size: {
                   w: 125,
                   h: 125
                },
                high_res_size: {
                   w: 256,
                   h: 256
                }
            },
            url: ub.config.ig_url,
        }

        /**
        * Call the Image Generator Function
        * Passing the Setup Configuration Object declared above as an argument
        * Callback: display the generated image in span.accentThumb > img
        */   
        ub.utilities.generateImage(config, function(response) {
            
            thumbnail = response.highres_url;

            $("span.accentThumb > img").attr("src", thumbnail);

            mascot.thumbnail = thumbnail;

        });

    }

});