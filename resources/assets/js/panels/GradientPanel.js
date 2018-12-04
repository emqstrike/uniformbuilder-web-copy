/**
 * GradientPanel.js
 * - handle gradient behavior
 * @since December 03, 2018
 * @authors
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 */

function GradientPanel() {

}

GradientPanel.init = function() {
    if (ub.current_material.material.gradient !== null) {
        GradientPanel.utilities.initGradientLogo(ub.current_material.material.gradient)
        ub.funcs.afterLoadFunctionList.push(function() {
            GradientPanel.utilities.processGradientColor(ub.data.gradients)
        });
    }
}

GradientPanel.utilities = {
    initGradientLogo: function(gradient_data) {
        if (!util.isNullOrUndefined(gradient_data)) {
            var gradient = gradient_data.replace(new RegExp("\\\\", "g"), "");
            gradient = gradient.slice(1, -1);
            gradient = JSON.parse(gradient);

            ub.data.gradients = gradient;

            _.each(ub.data.gradients, function(index, el) {
                ub.data.gradients[el].name = "front_body_mask";
            });
        }
    },

    processGradientColor: function(gradients) {
        if (!util.isNullOrUndefined(gradients)) {
            _.each(gradients, function(gradient) {
                var _layerCount = 0;

                if (gradient.layer1) { _layerCount += 1 };
                if (gradient.layer2) { _layerCount += 1 };
                if (gradient.layer3) { _layerCount += 1 };

                gradient.colors_array = [
                    "B",
                    "R",
                    "W"
                ];

                var _colorArray = [];
                var _layers = [];

                // Normalize Logo Position From source
                // _.each (logo.perspectives, function (perspective) {
                //     _.each(perspective.layers, function (layer) {
                //         layer.position = layer.position;
                //     });
                // });

                // Process color array
                if (typeof gradient.colors_array !== "undefined") {
                    _.each(gradient.colors_array, function (color, index) {

                        var _color = ub.funcs.getColorByColorCode(color);
                        _colorArray.push(_color);
                        _layers.push({
                            colorCode: color,
                            colorObj: _color,
                            layer: index + 1,
                            status: false,
                        });
                    });

                } else {

                    console.log('No Color Array for ' + gradient.name);
                }

                var _hasSavedGradientData = (typeof ub.current_material.settings.gradients[gradient.name] !== "undefined");

                if (_hasSavedGradientData) {
                    return;
                }
                gradient.enabled = 1;
                if (!_hasSavedGradientData && gradient.enabled === 1) {
                    ub.current_material.settings.gradients[gradient.name] = {
                        numberOfLayers: _layerCount,
                        position: gradient.name,
                        layers: _layers
                    }

                    ub.current_material.settings.gradients[gradient.name].enabled = gradient.enabled;
                    ub.current_material.settings.gradients[gradient.name].numberOfLayers = _layerCount;

                    var gradientObject = gradient;
                    var gradientSettingsObject = GradientPanel.utilities.getGradientSettingsObject(gradient.name);

                    GradientPanel.utilities.renderGradient(gradient, _layerCount);
                }
            });

        } else {

            ub.utilities.info('This uniform has no Gradient.');

        }
    },

    applyGradientColor: function(gradientObject, _layerCount, perspective, gradientSettingsObject) {
        var sprite;
        var gradientObject = gradientObject;
        var settings = ub.current_material.settings;
        var view = ub[perspective + '_view'];
        var view_objects = ub.objects[perspective + '_view'];
        var container = new PIXI.Container();
        var elements = "";
        var _frontObject = _.find(gradientObject.files, {file: perspective});

        if (typeof _frontObject !== "undefined") {
            _.each(_frontObject.layers.slice(0).reverse(), function(layer, index) {
                var _layerSettings = _.find(gradientSettingsObject.layers, {layer: layer.layer});
                var gradientLayer = ub.pixi.new_sprite(layer.filename);
                gradientLayer.ubName = 'Layer ' + (index + 1);
                gradientLayer.tint = parseInt(_layerSettings.colorObj.hex_code, 16);

                if (typeof _layerSettings === "undefined" || _layerSettings.colorCode === "none") {

                    gradientLayer.alpha = 0;

                } else {

                    gradientLayer.alpha = 1;
                }

                container.addChild(gradientLayer);
                gradientLayer.zIndex = layer.position;
            });
        } else {
            return;
        }

        sprite = container;

        ub.updateLayersOrder(sprite);

        var _gradientLengthBefore = _.filter(ub.current_material.settings.gradients, {enabled: 1}).length;

        ub.current_material.containers[gradientObject.name] = {};
        ub.current_material.containers[gradientObject.name].gradientObject = sprite;

        var temp                    = {};
        var layer_order             = ( ub.funcs.generateZindex('gradients') + _gradientLengthBefore + 1);

        sprite.originalZIndex       = layer_order * (-1);
        sprite.zIndex               = layer_order * (-1);

        return sprite;
    },

    renderGradient: function(gradientObject, _layerCount) {
        var gradientSettingsObject = GradientPanel.utilities.getGradientSettingsObject(gradientObject.name);

        _.each(ub.views, function(perspective) {
            var _perspectiveString = perspective + '_view';
            var _sprites = GradientPanel.utilities.applyGradientColor(gradientObject, _layerCount, perspective, gradientSettingsObject);

            if (typeof _sprites !== "undefined") {
                if (typeof ub.objects[_perspectiveString] !== "undefined") {

                    if (typeof ub.objects[_perspectiveString][gradientObject.name] !== "undefined") {

                        ub[_perspectiveString].removeChild(ub.objects[_perspectiveString][gradientObject.name]);

                    }
                }

                ub[_perspectiveString].addChild(_sprites);
                ub.objects[_perspectiveString][gradientObject.name] = _sprites;

                ub.updateLayersOrder(ub[_perspectiveString]);
            } else {
                return;
            }
        });
    },

    getGradientSettingsObject: function(name) {
        if (typeof ub.current_material.settings.gradients[name] === "undefined") {
            ub.current_material.settings.gradients[name] = {
                enabled: 0,
                numberOfLayers: 0,
                layers: [
                    {
                        layer: 1,
                        status: false,
                        colorCode: ''
                    },
                    {
                        layer: 1,
                        status: false,
                        colorCode: ''
                    },
                    {
                        layer: 1,
                        status: false,
                        colorCode: ''
                    }
                ]
            };
        }

        return ub.current_material.settings.gradients[name];
    }
}