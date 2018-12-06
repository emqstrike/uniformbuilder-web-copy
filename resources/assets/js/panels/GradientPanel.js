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
            $(".modifier_main_container").on('click', '.gradient-container-button .gradient-selector-button', GradientPanel.events.onSelect);
            $(".modifier_main_container").on('click', '.pattern-modal-selector-container .edit-gradient-modal-button', GradientPanel.events.onEditGradientColor);
            $(".gradient-color-picker-1-container").on('click', '.gradient-color-main-container .gradient-color-selector-button', GradientPanel.events.onSelectColor1);
            $(".gradient-color-picker-2-container").on('click', '.gradient-color-main-container .gradient-color-selector-button', GradientPanel.events.onSelectColor2);
            GradientPanel.events.is_init_events_called = 1;
        }
    },

    onSelect: function() {
        var index = $(this).data("modifier-index");
        var modifier_category = $(this).data("modifier-category");
        var modifier_index = $(this).data("modifier-index");
        var selected_pattern = $(".pattern-main-container-" + modifier_category).find('.active-pattern');

        selected_pattern.removeClass('active-pattern');
        selected_pattern.html("");

        var modifier = ub.utilities.underscoreToWhitespace(modifier_category);
        var modifierTitle = ub.utilities.titleCase(modifier)


        var gradientObjectSettings = GradientPanel.utilities.getGradientSettingsObject(modifierTitle);

        if (typeof gradientObjectSettings !== "undefined") {
            gradientObjectSettings.enabled = 1;
            GradientPanel.utilities.renderGradient(gradientObjectSettings, modifier_index);
        }

        $(".edit-pattern-modal-container-"  + modifier_category).html("<button class='edit-gradient-modal-button' data-modifier-index='" + index +"' data-modifier-category='"+ modifier_category +"'>Edit Gradient Color</button>");
        $(this).html('<div class="cp-check-background cp-background-cover"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
        $(this).addClass('active-pattern');
    },

    onEditGradientColor: function () {
        var modifier_category = $(this).data("modifier-category");
        var modifier = ub.utilities.underscoreToWhitespace(modifier_category);
        var modifierTitle = ub.utilities.titleCase(modifier);
        var items = ub.data.gradientColorLayerFilter.getColors();
        var gradientObjectSettings = GradientPanel.utilities.getGradientSettingsObject(modifierTitle);
        var colors = [];
        var colors2 = [];

        var firstLayer = _.find(gradientObjectSettings.layers, {layer: 1});
        var secondLayer = _.find(gradientObjectSettings.layers, {layer: 2});

        var items2 = ub.data.gradientColorLayerFilter.getSecondaryColor(firstLayer.colorCode);

        _.each(items, function(index, el) {
            var colorObj = ub.funcs.getColorByColorCode(index.color1);
            if (typeof colorObj !== "undefined") {
                colors.push(colorObj);
            }
        });

        _.each(items2.color2, function(index, el) {
            var colorObj = ub.funcs.getColorByColorCode(index);
            if (typeof colorObj !== "undefined") {
                colors2.push(colorObj);
            }
        });

        var gradient_color_element = document.getElementById("m-gradient-color").innerHTML;
        var renderLayer1 = Mustache.render(gradient_color_element, {
            colors: colors,
            layer: "Layer 1",
            modifier: modifierTitle
        });

        var renderLayer2 = Mustache.render(gradient_color_element, {
            colors: colors2,
            layer: "Layer 2",
            modifier: modifierTitle
        });

        $("#gradient-change-color-modal #gradient-color-content .gradient-color-picker-1-container").html("");
        $("#gradient-change-color-modal #gradient-color-content .gradient-color-picker-2-container").html("");
        $("#gradient-change-color-modal #gradient-color-content .gradient-color-picker-1-container").html(renderLayer1);
        $("#gradient-change-color-modal #gradient-color-content .gradient-color-picker-2-container").html(renderLayer2);

        _.delay(function() {
            var firstLayerContainer = $(".gradient-color-picker-1-container .gradient-color-main-container .gradient-color-container-button .gradient-color-selector-button[data-color-code='"+ firstLayer.colorCode +"']");
            var secondLayerContainer = $(".gradient-color-picker-2-container .gradient-color-main-container .gradient-color-container-button .gradient-color-selector-button[data-color-code='"+ secondLayer.colorCode +"']");
            GradientPanel.events.checkModifier(firstLayerContainer, firstLayer.colorCode);
            firstLayerContainer.addClass('active-color-1');
            GradientPanel.events.checkModifier(secondLayerContainer, secondLayer.colorCode);
            secondLayerContainer.addClass('active-color-2');
        }, 500)

        $('#gradient-change-color-modal').modal('show');
    },

    onSelectColor1: function() {
        var layerID = 1;
        var color_code = $(this).data("color-code");
        var modifier = $(this).data("modifier");
        var items = ub.data.gradientColorLayerFilter.getSecondaryColor(color_code);
        var colors = [];
        var gradientObjectSettings = GradientPanel.utilities.getGradientSettingsObject(modifier);
        var modifierObject = _.find(ub.data.modifierLabels, {fullname: gradientObjectSettings.name});

        _.each(items.color2, function(index, el) {
            var colorObj = ub.funcs.getColorByColorCode(index);
            if (typeof colorObj !== "undefined") {
                colors.push(colorObj);
            }
        });

        var gradient_color_element = document.getElementById("m-gradient-color").innerHTML;
        var render = Mustache.render(gradient_color_element, {
            colors: colors,
            layer: "Layer 2",
            modifier: modifier
        });

        var selected_color = $(".gradient-color-picker-1-container .gradient-color-main-container").find(".active-color-1");
        selected_color.html("");
        selected_color.removeClass('active-color-1');

        $("#gradient-change-color-modal #gradient-color-content .gradient-color-picker-2-container").html("");
        $("#gradient-change-color-modal #gradient-color-content .gradient-color-picker-2-container").html(render);

        GradientPanel.utilities.changeGradientColor(gradientObjectSettings, 1, color_code, modifierObject.index);

        GradientPanel.events.checkModifier($(this), color_code);
        $(this).addClass('active-color-1');
    },

    onSelectColor2: function() {
        var color_code = $(this).data("color-code");
        var color_id = $(this).data("color-id");
        var layer = $(this).data("layer-name");
        var modifier = $(this).data("modifier");

        var gradientObjectSettings = GradientPanel.utilities.getGradientSettingsObject(modifier);
        var modifierObject = _.find(ub.data.modifierLabels, {fullname: gradientObjectSettings.name})
        GradientPanel.utilities.changeGradientColor(gradientObjectSettings, 2, color_code, modifierObject.index);

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

            _.map(ub.data.gradients, function(gradient, index){
                var underscore = gradient.position.replace(/ /g, "_");
                ub.data.gradients[index].name = underscore.toLowerCase();
            });
        }
    },

    processGradientColor: function(gradients) {
        if (!util.isNullOrUndefined(gradients)) {
            _.each(gradients, function(gradient) {
                var _colorArray = [];
                var _layers = [];

                // Normalize Piping Position From source
                _.each (gradient.perspectives, function (perspective) {
                    _.each(perspective.layers, function (layer) {
                        layer.position = layer.position;
                    });
                });

                // Manage Color Array
                if (typeof gradient.colors_array !== "undefined") {
                    _.each(gradient.colors_array, function (color, index) {
                        var _color = ub.funcs.getColorByColorCode(color);
                        _colorArray.push(_color);
                        _layers.push({
                            colorCode: color,
                            colorObj: _color,
                            layer: index + 1,
                            status: false,
                            filename: gradient.perspectives[0].layers[index].filename
                        });
                    });
                } else {
                    console.warn('No Color Array for ' + gradient.position);
                }

                var _hasSavedGradientData = (typeof ub.current_material.settings.gradients[gradient.position] !== "undefined");

                if (_hasSavedGradientData) {
                    return;
                }

                if (!_hasSavedGradientData && gradient.enabled === 1) {
                    ub.current_material.settings.gradients[gradient.position] = {
                        name: gradient.name,
                        position: gradient.position,
                        layers: _layers,
                    }

                    ub.current_material.settings.gradients[gradient.position].enabled = gradient.enabled;
                    var gradientObject = gradient;
                    var gradientObjectSettings = GradientPanel.utilities.getGradientSettingsObject(gradientObject.position)
                    var modifier = _.find(ub.data.modifierLabels, {fullname: gradient.name});

                    if (typeof modifier !== "undefined") {
                        GradientPanel.utilities.renderGradient(gradientObjectSettings, modifier.index);
                    }
                }
            });
        } else {
            ub.utilities.info('This uniform has no Gradient.');
        }
    },

    getGradientSettingsObject: function(position) {
        if (typeof ub.current_material.settings.gradients[position] === "undefined") {
            var _layers = [];
            var gradientObject = _.find(ub.data.gradients, {position: position})

            if (typeof gradientObject.colors_array !== "undefined") {
                _.each(gradientObject.colors_array, function (color, index) {
                    var _color = ub.funcs.getColorByColorCode(color);
                    _layers.push({
                        colorCode: color,
                        colorObj: _color,
                        layer: index + 1,
                        status: false,
                        filename: gradientObject.perspectives[0].layers[index].filename
                    });
                });
            } else {
                console.warn('No Color Array for ' + gradient.position);
            }

            ub.current_material.settings.gradients[position] = {
                name: gradientObject.name,
                position: position,
                layers: _layers,
                enabled: 0
            };

        }

        return ub.current_material.settings.gradients[position];
    },

    renderGradient: function(gradientObjectSettings, index) {
        var _modifier = ub.funcs.getModifierByIndex(index);
        var _names = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial = _names[0].toTitleCase();

        _.each(_names, function (name) {

            var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(name.toTitleCase());
            var _materialOptions = ub.funcs.getMaterialOptions(name.toTitleCase());

            materialOption = _materialOptions[0];
            outputPatternObject = GradientPanel.utilities.convertGradientObjectForMaterialOption(gradientObjectSettings, materialOption);
            _settingsObject.gradient = outputPatternObject;
            e = _settingsObject;

            GradientPanel.utilities.generateGradient(e.code, e.gradient.gradient_obj, e.pattern.opacity, e.pattern.position, e.pattern.rotation, e.pattern.scale);
        });
    },

    convertGradientObjectForMaterialOption: function(gradientObjectSettings, materialOption) {
        var gradientPropertiesParsed     = gradientObjectSettings;
        var _rotationAngle              = ub.funcs.translateAngle(materialOption.angle);

        if (materialOption.gradient_id === null) { return undefined; }

        var _gradientObject  = {
            gradient_id: gradientObjectSettings.position,
            scale: 0,
            rotation: ub.funcs.translateAngle(materialOption.angle),
            opacity: 0,
            position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
            gradient_obj : {
                name: gradientObjectSettings.position,
                layers: [],
                scale: 0,
                rotation: 0,
                opacity: 0,
                position: {x: 0 + ub.offset.x, y: 0 + ub.offset.y},
            }
        };

        _.each(gradientObjectSettings.layers.slice(0).reverse(), function(_property, index) {
            var _layer = {
                color_code: _property.colorObj,
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

    setMaterialOptionGradientColor: function(materialOption, colorObj, layerID,  ) {
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
    },

    changeGradientColor: function(gradientObjectSettings, layerID, color_code, index) {
        var colorOBJ = ub.funcs.getColorByColorCode(color_code);
        var layerSetting = _.find(gradientObjectSettings.layers, {layer: layerID});

        if (layerID === 1) {
            var secondLayer = _.find(gradientObjectSettings.layers, {layer: 2});
            var secondColor = ub.data.gradientColorLayerFilter.getSecondaryColor(color_code);
            var colorObj = ub.funcs.getColorByColorCode(secondColor.color2[0]);
            if (typeof secondLayer !== "undefined") {
                secondLayer.colorCode = secondColor.color2[0];
                secondLayer.colorObj = colorObj;
            }
            var secondLayerContainer = $(".gradient-color-picker-2-container .gradient-color-main-container .gradient-color-container-button .gradient-color-selector-button[data-color-code='"+ secondColor.color2[0] +"']");
            GradientPanel.events.checkModifier(secondLayerContainer, secondColor.color2[0]);
            secondLayerContainer.addClass('active-color-2');
        }

        if (typeof layerSetting !== "undefined") {
            layerSetting.colorCode = color_code;
            layerSetting.colorObj = colorOBJ;
        }

        GradientPanel.utilities.renderGradient(gradientObjectSettings, index);
    }
}