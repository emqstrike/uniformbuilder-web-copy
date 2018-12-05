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

GradientPanel.events = {
    is_init_events_called : 0,

    init: function() {
        if (GradientPanel.events.is_init_events_called === 0) {
            $(".gradient-container-button").on('click', '.gradient-selector-button', GradientPanel.events.onSelect);
            $(".pattern-modal-selector-container").on('click', '.edit-gradient-modal-button', GradientPanel.events.onEditGradientColor);
            $(".gradient-color-picker-1-container").on('click', '.gradient-color-main-container .gradient-color-selector-button', GradientPanel.events.onSelectColor1);

            $(".gradient-color-picker-2-container").on('click', '.gradient-color-main-container .gradient-color-selector-button', GradientPanel.events.onSelectColor2);
            GradientPanel.events.is_init_events_called = 1;
        }
    },

    onSelect: function() {
        var index = $(this).data("modifier-index");
        var modifier_category = $(this).data("modifier-category");
        var selected_pattern = $(".pattern-main-container-" + modifier_category).find('.active-pattern');

        selected_pattern.removeClass('active-pattern');
        selected_pattern.html("");

        var gradientObject = ub.data.gradients[0];

        GradientPanel.utilities.renderGradient(gradientObject, index)

        $(".edit-pattern-modal-container-"  + modifier_category).html("<button class='edit-gradient-modal-button' data-modifier-index='" + index +"' data-modifier-category='"+ modifier_category +"'>Edit Gradient Color</button>");

        $(this).html('<div class="cp-check-background cp-background-cover"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
        $(this).addClass('active-pattern');
    },

    onEditGradientColor: function () {
        var items = ub.data.gradientColorLayerFilter.getColors();
        var colors = [];

        _.each(items, function(index, el) {
            var colorObj = ub.funcs.getColorByColorCode(index.color1);
            if (typeof colorObj !== "undefined") {
                colors.push(colorObj);
            }
        });

        var gradient_color_element = document.getElementById("m-gradient-color").innerHTML;
        var render = Mustache.render(gradient_color_element, {
            colors: colors,
            layer: "Layer 1"
        });

        $("#gradient-change-color-modal #gradient-color-content .gradient-color-picker-1-container").html("");
        $("#gradient-change-color-modal #gradient-color-content .gradient-color-picker-1-container").html(render);

        $('#gradient-change-color-modal').modal('show');
    },

    onSelectColor1: function() {
        var color_code = $(this).data("color-code");
        var items = ub.data.gradientColorLayerFilter.getSecondaryColor(color_code);
        var colors = [];

        var selected_color = $(".gradient-color-picker-1-container .gradient-color-main-container").find(".active-color-1");
        selected_color.html("");
        selected_color.removeClass('active-color-1');

        _.each(items.color2, function(index, el) {
            var colorObj = ub.funcs.getColorByColorCode(index);
            if (typeof colorObj !== "undefined") {
                colors.push(colorObj);
            }
        });

        var gradient_color_element = document.getElementById("m-gradient-color").innerHTML;
        var render = Mustache.render(gradient_color_element, {
            colors: colors,
            layer: "Layer 2"
        });

        $("#gradient-change-color-modal #gradient-color-content .gradient-color-picker-2-container").html("");
        $("#gradient-change-color-modal #gradient-color-content .gradient-color-picker-2-container").html(render);

        GradientPanel.events.checkModifier($(this), color_code);
        $(this).addClass('active-color-1');
    },

    onSelectColor2: function() {
        var color_code = $(this).data("color-code");
        var color_id = $(this).data("color-id");
        var layer = $(this).data("layer-name");

        var selected_color = $(".gradient-color-picker-2-container .gradient-color-main-container").find(".active-color-2");
        selected_color.html("");
        selected_color.removeClass('active-color-2');

        GradientPanel.events.checkModifier($(this), color_code);
        $(this).addClass('active-color-2');
    },

    checkModifier: function(element, colorLabel) {
        element.html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-fc-white"></span>');

        if (colorLabel === 'W' ||
            colorLabel === 'Y' ||
            colorLabel === 'CR'||
            colorLabel === 'S' ||
            colorLabel === 'PK'||
            colorLabel === 'OP'||
            colorLabel === 'SG'
        ) {
            element.html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-colors"></span>');
        }
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
                ub.data.gradients[el].name = index.files[el].file;
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
                    "W",
                    "NB",
                    "R"
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

                if (!_hasSavedGradientData && gradient.enabled === 1) {
                    ub.current_material.settings.gradients[gradient.name] = {
                        numberOfLayers: _layerCount,
                        position: gradient.name,
                        layers: _layers
                    }

                    ub.current_material.settings.gradients[gradient.name].enabled = gradient.enabled;
                    ub.current_material.settings.gradients[gradient.name].numberOfLayers = _layerCount;

                    var gradientObject = gradient;

                    console.log(gradientObject)
                    var gradientSettingsObject = GradientPanel.utilities.getGradientSettingsObject(gradient.name);
                    if (ub.current_part === 0) {
                        ub.current_part += 1;
                    }
                    GradientPanel.utilities.renderGradient(gradient, ub.current_part);
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
        var container = ub.objects.front_view.front_body_mask;
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

    renderGradient: function(gradientObject, index) {
        var _modifier                   = ub.funcs.getModifierByIndex(index);
        var _names                      = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial      = _names[0].toTitleCase();

        _.each(_names, function (name) {

            var _settingsObject         = ub.funcs.getMaterialOptionSettingsObject(name.toTitleCase());
            var _materialOptions        = ub.funcs.getMaterialOptions(name.toTitleCase());

            materialOption              = _materialOptions[0];
            outputPatternObject         = GradientPanel.utilities.convertGradientObjectForMaterialOption(gradientObject, materialOption);
            _settingsObject.gradient     = outputPatternObject;
            e = _settingsObject;

            GradientPanel.utilities.generateGradient(e.code, e.gradient.gradient_obj, e.pattern.opacity, e.pattern.position, e.pattern.rotation, e.pattern.scale);
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
    },

    convertGradientObjectForMaterialOption: function(gradientObject, materialOption) {
        var gradientPropertiesParsed     = gradientObject;
        var _rotationAngle              = ub.funcs.translateAngle(materialOption.angle);

        if (materialOption.pattern_id === null) { return undefined; }

        var _gradientObject  = {
            gradient_id: gradientObject.name,
            scale: 0,
            rotation: ub.funcs.translateAngle(materialOption.angle),
            opacity: 0,
            position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
            gradient_obj : {
                name: gradientObject.name,
                layers: [],
                scale: 0,
                rotation: 0,
                opacity: 0,
                position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
            }
        };

        _.each(gradientObject.files[0].layers.slice(0).reverse(), function(_property, index) {
            var _layer = {
                color_code: ub.funcs.getColorByColorCode(gradientObject.colors_array[index]),
                layer_no: _property.layer.toString(),
                filename: _property.filename,
                container_position: {
                    x: 248 + ub.offset.x * 0.9,
                    y: 308 + ub.offset.y * 3.3,
                },
                container_opacity: 1,
                container_rotation: ub.funcs.translateAngle(materialOption.angle),
                container_scale: { x:1,y:1 },
            }

            _gradientObject.gradient_obj.layers.push(_layer);
        });

        return _gradientObject;
    },

    generateGradient: function(target, clone, opacity, position, rotation, scale) {
        var uniform_type = ub.current_material.material.type;
        var target_name = target.toTitleCase();
        var gradient_settings = '';
        var views = ub.data.views;
        var _rotationAngle = 0;
        var _extra         = {};
        var _positiion = position;
        target_name        = util.toTitleCase(target_name);

        gradient_settings = ub.current_material.containers[uniform_type][target_name];
        gradient_settings.containers = {};

        _.each(views, function(v) {
            var _adjustment = {x: 0, y: 0};

            _adjustment = ub.funcs.coordinateAdjustments(target_name, clone, v);

            _extra = ub.getAngleofPattern(v, target_name)
            if (typeof _extra !== 'undefined') {
                _rotationAngle = _extra.angle;    
            }
            else {
                _rotationAngle = 0;
            }

            gradient_settings.containers[v] = {};

            var namespace = gradient_settings.containers[v];
            namespace.container = new PIXI.Container();
            var container = namespace.container;
            container.sprites = {};

            _.each(clone.layers, function(layer, index) {
                var s = $('[data-index="' + index + '"][data-target="' + target + '"]');
                container.sprites[index] = ub.pixi.new_sprite(layer.filename);

                var sprite = container.sprites[index];

                sprite.zIndex = layer.layer_number * -1;
                sprite.tint = parseInt(layer.color_code.hex_code, 16);

                ///
                var _hexCode = (sprite.tint).toString(16);
                var _paddedHex = util.padHex(_hexCode, 6);

                if (typeof ub.data.colorsUsed[_paddedHex] === 'undefined') {
                    if (typeof layer.team_color_id !== "undefined") {
                        ub.data.colorsUsed[_paddedHex] = {hexCode: _paddedHex, parsedValue: util.decimalToHex(sprite.tint, 6), teamColorID: layer.team_color_id };    
                    } else {
                        ub.data.colorsUsed[_paddedHex] = {hexCode: _paddedHex, parsedValue: util.decimalToHex(sprite.tint, 6), teamColorID: ub.funcs.getMaxTeamColorID() + 1};    
                    }
                }

                sprite.anchor.set(0.5, 0.5);
                sprite.pivot.set(0.5, 0.5);

                sprite.tint = parseInt(clone.layers[index].color_code.hex_code, 16);
                container.addChild(sprite);

                var _positionAdjusted = {
                    x: 0,
                    y: 0,
                };

                container.position = _positionAdjusted;
                container.alpha = layer.container_opacity;
                container.rotation = _rotationAngle;
                container.scale = layer.container_scale;

                var s = '';
            });

            ub.updateLayersOrder(container);

            var view = v + '_view';
            var mask = ub.objects[view][target + "_mask"];

            if(typeof mask === 'undefined') {
                return;
            }

            container.mask = mask;
            container.name = 'pattern_' + target;

            if (typeof ub.objects[view]['pattern_' + target] === 'object') {
                ub[view].removeChild(ub.objects[view]['pattern_' + target]);
            }

            ub.objects[view]['pattern_' + target] = container;

            var _p = ub.objects[view]['pattern_' + target];

            ub[view].addChild(container);
            container.zIndex = mask.zIndex + (-1);

            _p.position.x += ub.dimensions.width / 2;
            _p.position.y += ub.dimensions.height / 2;

            var _soPattern = ub.funcs.getMaterialOptionSettingsObject(target_name).pattern

            if (_soPattern.dirty) {
                _p.position = position;
            }

            _p.anchor = {x: 0.5, y: 0.5};
            _p.pivot = {x: 0.5, y: 0.5};

            ub.updateLayersOrder(ub[view]);

        });
    },

    setMaterialOptionGradientColor: function(materialOption, colorObj, layerID, patternObj) {
        var _materialOption = materialOption;
        var _colorOBJ = colorOBJ;
        var _layerID = layerID;
        var _patternObj = patternObj;
        var _layerObj = _.find(_patternObj.layers, {layer_no: layerID.toString()});
        var _tintColor = ub.funcs.hexCodeToTintColor(_colorOBJ.hex_code);
        var _modifier = ub.funcs.getModifierByIndex(ub.current_part);
        var _names = ub.funcs.ui.getAllNames(_modifier.name);

        _layerObj.color = _tintColor;
        _layerObj.color_code = colorOBJ.color_code;
        _layerObj.default_color = colorOBJ.hex_code;

        _.each(_names, function (_name) {

            var titleNameFirstMaterial = _name.toTitleCase();
            var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
            var layer = _.find(_settingsObject.pattern.pattern_obj.layers, {layer_no: layerID.toString()});
            layer.color = _tintColor;
            layer.color_code = colorOBJ.color_code;
            var _materialOptions = ub.funcs.getMaterialOptions(titleNameFirstMaterial);

            _.each(_materialOptions, function (_materialOption) {

                var _materialOptionName = _materialOption.name;
                var _uniformType = ub.current_material.material.type;
                var _containers = ub.current_material.containers[_uniformType][_materialOptionName].containers;
                var views = ['front', 'back', 'left', 'right'];
                var c = ub.current_material.containers[_uniformType][_materialOptionName].containers;

                _.each(views, function (v) {
                    c[v].container.children[layerID - 1].tint = _tintColor;
                });
            });
        })
    }
}