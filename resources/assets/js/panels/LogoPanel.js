/**
 * LogoPanel.js
 * - handle logo behavior
 * @since November 13, 2018
 * @authors
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 */

function LogoPanel(element, logo_positions) {
    this.panel = document.getElementById(element);
    this.data = {
        logo_position: logo_positions,
        brand: ub.config.brand
    };
    this.bindEvents();
}

LogoPanel.isInit = true;

LogoPanel.prototype = {
    constructor: LogoPanel,

    init: function() {
        if (LogoPanel.isInit) {
            $(".modifier_main_container").on('click', '#primary_option_logo .logo-perspective-btn-container .logo-perspective-selector', this.onClickLogoPerspective);
            LogoPanel.isInit = false;
        }
    },

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, this.data);
        return panel;
    },

    onClickLogoPerspective: function() {
        var current_position_element = $("ul.logo-perspective-btn-container").find("li.uk-active");
        var current_position = current_position_element.data("position");
        current_position_element.find("a").removeClass("uk-disabled");
        current_position_element.removeClass('uk-active');

        var material_ops = null;
        var new_position = $(this).parent().data("position");
        var configuration = LogoPanel.configurations.getConfiguration(ub.config.blockPattern, new_position);
        
        $('a.change-view[data-view="'+ configuration.perspective +'"]').trigger('click');

        var logoObject = _.find(ub.data.logos, {position: new_position});
        var logoSettingsObject = LogoPanel.utilities.getLogoSettingsObject(logoObject.position);
        var _layerCount = 0;

        if (logoObject.layer1) { _layerCount +=1 };
        if (logoObject.layer2) { _layerCount +=1 };
        if (logoObject.layer3) { _layerCount +=1 };

        LogoPanel.utilities.removeLogo(current_position);
        LogoPanel.utilities.addLogo(logoObject, _layerCount);

        $(this).parent().addClass('uk-active');
        $(this).addClass('uk-disabled');

        $("#logo-preview").hide();
        $(".logo-image-loader").css('display', 'block');

        $("#logo-preview").css({
            'background-image': ""
        });

        _.delay(function() {
            var image = ub.getThumbnailImage(ub.active_view + "_view");
            $("#logo-preview").css({
                'background-image': "url("+ image +")"
            });

            if (ub.config.blockPattern === "PTS Hoodie") {
                $("#logo-preview").css({
                    'background-position': "bottom"
                });
            }

            $("#logo-preview").show();
            $(".logo-image-loader").css('display', 'none');;
        }, 2500);
    },

    bindEvents: function() {
        if (LogoPanel.isBindEvents === 0) {
            this.init();
            LogoPanel.isBindEvents === 1;
        }
    }
};

LogoPanel.isBindEvents = 0;

LogoPanel.init = function () {
    if (ub.current_material.material.logo_position !== null) {

        LogoPanel.utilities.initLogoData(ub.current_material.material.logo_position);

        if (_.size(ub.current_material.settings.logos) > 0) {
            LogoPanel.utilities.processSavedLogo();
        } else {
            ub.funcs.afterLoadFunctionList.push(function() {
                LogoPanel.utilities.processLogo();
            });
        }
    }
};

LogoPanel.utilities = {
    initLogoData: function (logo_data) {
        if (!util.isNullOrUndefined(logo_data)) {
            var _logo_position = logo_data.replace(new RegExp("\\\\", "g"), "");
            _logo_position = _logo_position.slice(1, -1);
            _logo_position = JSON.parse(_logo_position);

            ub.data.logos = _logo_position;

            _.each(ub.data.logos, function(logo) {

                if (logo.position === "left_sleeve") {
                    logo.position = "left_sleeve_logo";
                }

                // Format Logo Name Position
                logo.name = ub.utilities.titleCase(logo.position.replace(/_/g, " ").replace("logo", ""));
            });
        }
    },

    processLogo: function() {
        if (!util.isNullOrUndefined(ub.data.logos))
        {
            _.each(ub.data.logos, function(logo) {


                var _layerCount = 0;

                if (logo.layer1) { _layerCount += 1 };
                if (logo.layer2) { _layerCount += 1 };
                if (logo.layer3) { _layerCount += 1 };

                // Get secondary color
                var secondary_color = LogoPanel.colors.getSecondaryColor();
                logo.colors_array = [
                    "W",
                    _layerCount === 2 ? "none" : "W",
                    "CG"
                ];

                var _colorArray = [];
                var _layers = [];

                // Normalize Logo Position From source
                _.each (logo.perspectives, function (perspective) {
                    _.each(perspective.layers, function (layer) {
                        layer.position = layer.position;
                    });
                });

                // Process color array
                if (typeof logo.colors_array !== "undefined") {
                    _.each(logo.colors_array, function (color, index) {

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

                    console.log('No Color Array for ' + logo.position);
                }

                var _hasSavedLogoData = (typeof ub.current_material.settings.logos[logo.position] !== "undefined");

                if (_hasSavedLogoData) {
                    return;
                }

                if (!_hasSavedLogoData && logo.enabled === 1) {

                    ub.current_material.settings.logos[logo.position] = {
                        position: logo.position,
                        numberOfLayers: _layerCount,
                        layers: _layers
                    };

                    ub.current_material.settings.logos[logo.position].enabled = logo.enabled;
                    ub.current_material.settings.logos[logo.position].numberOfLayers = _layerCount;

                    var _logoObject = logo;
                    var _logoSettingsObject = LogoPanel.utilities.getLogoSettingsObject(logo.position);

                    LogoPanel.utilities.renderLogo(logo, _layerCount);
                    LogoPanel.utilities.reInitiateLogo();
                }
            });
        }
    },

    renderLogo: function(logoObject, _layerCount) {
        var _logoSettingsObject = LogoPanel.utilities.getLogoSettingsObject(logoObject.position);

        _.each (ub.views, function (perspective) {
            var _perspectiveString = perspective + '_view';
            var _sprites = LogoPanel.utilities.createLogo(logoObject, _layerCount, perspective, _logoSettingsObject);

            if (typeof ub.objects[_perspectiveString] !== "undefined") {
                if (typeof ub.objects[_perspectiveString][logoObject.position] !== "undefined") {
                    ub[_perspectiveString].removeChild(ub.objects[_perspectiveString][logoObject.position]);
                }
            }

            ub[_perspectiveString].addChild(_sprites);
            ub.objects[_perspectiveString][logoObject.position] = _sprites;
            ub.updateLayersOrder(ub[_perspectiveString]);
        });
    },

    createLogo: function(logoObject, _layerCount, perspective, logoSettingObject) {
        var sprite;
        var logoObject = logoObject;
        var settings = ub.current_material.settings;
        var view = ub[perspective + '_view'];
        var view_objects = ub.objects[perspective + '_view'];
        var container = new PIXI.Container();
        var elements = "";
        var _frontObject = _.find(logoObject.perspectives, {perspective: perspective});

        _.each(_frontObject.layers.slice(0).reverse(), function (layer, index) {
            var _layerSettings = _.find(logoSettingObject.layers, {layer: layer.layer});
            var logoLayer = ub.pixi.new_sprite(layer.filename);
            logoLayer.ubName = 'Layer ' + (index + 1);
            logoLayer.tint = parseInt(_layerSettings.colorObj.hex_code, 16);

            if (typeof _layerSettings === "undefined" || _layerSettings.colorCode === "none") {

                logoLayer.alpha = 0;

            } else {

                logoLayer.alpha = 1;
            }

            container.addChild(logoLayer);
            logoLayer.zIndex = layer.position;
        });

        sprite = container;

        ub.updateLayersOrder(sprite);

        var _logoLengthBefore = _.filter(ub.current_material.settings.logos, {enabled: 1}).length;

        ub.current_material.containers[logoObject.position] = {};
        ub.current_material.containers[logoObject.position].logoObject = sprite;

        var temp                    = {};
        var layer_order             = ( ub.funcs.generateZindex('logos') + _logoLengthBefore + 1);

        sprite.originalZIndex       = layer_order * (-1);
        sprite.zIndex               = layer_order * (-1);

        return sprite;
    },

    getLogoSettingsObject: function(position) {
        var current_active_logo = LogoPanel.utilities.getEnableLogo();

        if (typeof ub.current_material.settings.logos[position] === "undefined") {

            ub.current_material.settings.logos[position] = {
                position: position,
                enabled: 1,
                numberOfLayers: 0,
                layers: [
                    {
                        layer: 1,
                        status: false,
                        colorCode: current_active_logo.layers[0].colorCode,
                        colorObj: current_active_logo.layers[0].colorObj
                    },
                    {
                        layer: 2,
                        status: false,
                        colorCode: current_active_logo.layers[1].colorCode,
                        colorObj: current_active_logo.layers[1].colorObj
                    },
                    {
                        layer: 3,
                        status: false,
                        colorCode: current_active_logo.layers[2].colorCode,
                        colorObj: current_active_logo.layers[2].colorObj
                    }
                ]
            };
        }

        return ub.current_material.settings.logos[position];
    },

    processSavedLogo: function() {
        _.each(ub.current_material.settings.logos, function (logo, key) {

            var _result = _.find(ub.data.logos, {position: logo.position});

            if (logo.enabled === 0) {
                return;
            }

            LogoPanel.utilities.renderLogo(_result, logo.numberOfLayers);
        });
    },

    removeLogo: function(logo_position) {
        _.each(ub.views, function (view) {
            var _viewStr = view + '_view';
            if (typeof ub.objects[_viewStr][logo_position] !== 'undefined'){
                ub[_viewStr].removeChild(ub.objects[_viewStr][logo_position]);
            }
            delete ub.objects[_viewStr][logo_position];
        });

        if (typeof(ub.current_material.settings.logos[logo_position]) !== "undefined") {
            ub.current_material.settings.logos[logo_position].enabled = 0;
            ub.current_material.settings.logos[logo_position].numberOfLayers = 0;
        }
    },

    addLogo: function(logoObject, _layerCount) {
        if (typeof(ub.current_material.settings.logos[logoObject.position]) !== "undefined") {
            ub.current_material.settings.logos[logoObject.position].enabled = 1;
            ub.current_material.settings.logos[logoObject.position].numberOfLayers = _layerCount;
        }

        LogoPanel.utilities.renderLogo(logoObject, _layerCount);
        LogoPanel.utilities.reInitiateLogo();
    },

    getEnableLogo: function() {
        var active = _.find(ub.current_material.settings.logos, {enabled: 1});
        return active;
    },

    changeLogoColorByLayer: function(position, colorObj, layer_number) {
        _.each (ub.views, function (perspective) {

            var _objectReference = ub.objects[perspective + '_view'][position];
            var _childLayer = _.find(_objectReference.children, {ubName: 'Layer ' + layer_number.toString()});
            _childLayer.tint = parseInt(colorObj.hex_code, 16);
            _childLayer.alpha = 1;
        });
    },

    changeBackgroundColor: function(position, color_code) {
        // Get color object by color code
        var colorObj = ub.funcs.getColorByColorCode(color_code);
        LogoPanel.utilities.changeLogoColorByLayer(position, colorObj, 1);

        // CHANGE CURRENT CODE AND COLOR OBJ in current_materials.logos
        var logoSettings = LogoPanel.utilities.getLogoSettingsObject(position);

        logoSettings.layers[2].colorCode = colorObj.color_code;
        logoSettings.layers[2].colorObj = colorObj;
    },

    changeGutterColor: function(position, color_code) {
        // Get color object by color code
        var colorObj = ub.funcs.getColorByColorCode(color_code);
        LogoPanel.utilities.changeLogoColorByLayer(position, colorObj, 2);

        // CHANGE CURRENT CODE AND COLOR OBJ in current_materials.logos
        var logoSettings = LogoPanel.utilities.getLogoSettingsObject(position);

        logoSettings.layers[1].colorCode = colorObj.color_code;
        logoSettings.layers[1].colorObj = colorObj;
    },

    changeLogoColor: function(position, color_code) {
        // Get color object by color code
        var colorObj = ub.funcs.getColorByColorCode(color_code);
        LogoPanel.utilities.changeLogoColorByLayer(position, colorObj, 3);

        // CHANGE CURRENT CODE AND COLOR OBJ in current_materials.logos
        var logoSettings = LogoPanel.utilities.getLogoSettingsObject(position);

        logoSettings.layers[0].colorCode = colorObj.color_code;
        logoSettings.layers[0].colorObj = colorObj;
    },

    initiateLogoColor: function(logoSettingsObject, color_code) {
        if (color_code !== "W") {
            LogoPanel.utilities.changeBackgroundColor(logoSettingsObject.position, color_code);
            LogoPanel.utilities.changeLogoColor(logoSettingsObject.position, "W");
        } else {
            LogoPanel.utilities.changeBackgroundColor(logoSettingsObject.position, color_code);
            LogoPanel.utilities.changeLogoColor(logoSettingsObject.position, "CG");
        }

        if (logoSettingsObject.numberOfLayers !== 2) {
            if (color_code === "W") {
                LogoPanel.utilities.changeGutterColor(logoSettingsObject.position, "CG");
            } else {
                LogoPanel.utilities.changeGutterColor(logoSettingsObject.position, "W");
            }
        }
    },

    initiateDefaultLogoColor: function(logoSettingsObject, color_code) {
        if (color_code === "CG") {
            LogoPanel.utilities.changeBackgroundColor(logoSettingsObject.position, "W");
            LogoPanel.utilities.changeLogoColor(logoSettingsObject.position, "CG");
            if (logoSettingsObject.numberOfLayers !== 2) {
                LogoPanel.utilities.changeGutterColor(logoSettingsObject.position, "CG");
            }

        } else if (color_code === "W") {
            LogoPanel.utilities.changeBackgroundColor(logoSettingsObject.position, "CG");
            LogoPanel.utilities.changeLogoColor(logoSettingsObject.position, "W");

            if (logoSettingsObject.numberOfLayers !== 2) {
                LogoPanel.utilities.changeGutterColor(logoSettingsObject.position, "W");
            }
        } else {
            LogoPanel.utilities.changeBackgroundColor(logoSettingsObject.position, color_code);
            LogoPanel.utilities.changeLogoColor(logoSettingsObject.position, "W");

            if (logoSettingsObject.numberOfLayers !== 2) {
                LogoPanel.utilities.changeGutterColor(logoSettingsObject.position, "W");
            }
        }
    },

    defaultLogoForFabric: function(current_active_logo, colors) {
        LogoPanel.utilities.initiateDefaultLogoColor(current_active_logo, _.contains(colors, "CG") ? "CG" : "W");
        if (_.contains(colors, "CG") && _.contains(colors, "W")) {
            LogoPanel.utilities.initiateDefaultLogoColor(current_active_logo, "R");
        }
    },

    reInitiateLogo: function() {
        var secondary_color = LogoPanel.colors.getSecondaryColor();
        var current_active_logo = LogoPanel.utilities.getEnableLogo();
        var material_colors = this.fabricColors(current_active_logo.position);
        
        if (typeof material_colors !== "undefined" && _.size(material_colors) > 0) {
            if (_.contains(LogoPanel.special_block_pattern, ub.config.blockPattern)) {
                LogoPanel.utilities.initiateDefaultLogoColor(current_active_logo, "W");
                return;
            }

            if (typeof secondary_color !== "undefined" && _.size(secondary_color) > 0) {
                for (var i = 0; i < secondary_color.length; i++) {
                    if (_.contains(material_colors, secondary_color[i].color_code)) {
                        LogoPanel.utilities.defaultLogoForFabric(current_active_logo, material_colors);
                        continue;
                    } else {
                        LogoPanel.utilities.initiateLogoColor(current_active_logo, secondary_color[i].color_code);
                        break;
                    }
                }
            } else {
                LogoPanel.utilities.defaultLogoForFabric(current_active_logo, material_colors);
            }
        } else {
            LogoPanel.utilities.defaultLogoForFabric(current_active_logo, material_colors);
        }
    },

    offsetRLogo: function(size, color) {
        if (typeof ub.data.logos !== "undefined") {
            var that = this;
            var logoObject = that.getEnableLogo();

            if (logoObject.position.includes("left_sleeve")) {
                _.each (ub.views, function (perspective) {
                    var _perspectiveString = perspective + '_view';
                    if (typeof ub.objects[_perspectiveString] !== "undefined") {
                        if (typeof ub.objects[_perspectiveString][logoObject.position] !== "undefined") {
                            var logo = ub.objects[_perspectiveString][logoObject.position];

                            if (typeof logo.position !== "undefined" && typeof logo.position === "object") {
                                // Add Offset
                                logo.position.y = -(ub.current_material.material.one_inch_in_px * eval(size) * color);
                            }
                        }
                    }
                });
            }
        }
    },

    resetRLogoPosition: function() {
        if (typeof ub.data.logos !== "undefined") {
            var that = this;
            var logoObject = that.getEnableLogo();

            if (logoObject.position.includes("left_sleeve")) {
                _.each (ub.views, function (perspective) {
                    var _perspectiveString = perspective + '_view';
                    if (typeof ub.objects[_perspectiveString] !== "undefined") {
                        if (typeof ub.objects[_perspectiveString][logoObject.position] !== "undefined") {
                            var logo = ub.objects[_perspectiveString][logoObject.position];

                            if (typeof logo.position !== "undefined" && typeof logo.position === "object") {
                                // Add Offset
                                logo.position.y = 0;
                            }
                        }
                    }
                });
            }
        }
    },

    getActiveRLogo: function () {
        var logoObject = _.find(ub.current_material.settings.logos, {enabled: 1});
        if (logoObject.length !== 0) {
            return logoObject;
        } else {
            ub.utilities.error("No active R Logo");
            return logoObject;
        }
    },

    getAvailablePosition: function(filter) {
        var positions = _.filter(ub.data.logos, function(logo) {
            if (logo.position !== filter) {
                return logo;
            }
        });

        return positions;
    },

    fabricColors: function(position) {
        var color_codes = [];
        var configuration = LogoPanel.configurations.getConfiguration(ub.config.blockPattern, position);
        var logoSettings = _.find(ub.data.logos, {position: position})
        var materials = typeof logoSettings.intersecting_parts !== "undefined" && logoSettings.intersecting_parts !== null ? logoSettings.intersecting_parts : configuration.parts;

        if (typeof materials !== "undefined") {
            _.each(materials, function(material) {
                var part =  material.toLowerCase().replace(/ /g, "_")
                var material_ops = ub.funcs.getSettingsByMaterialOptionCode(part);
                if (typeof material_ops !== "undefined") {
                    if (typeof material_ops.pattern.pattern_id !== "undefined" && material_ops.pattern.pattern_id !== "blank" && material_ops.pattern.pattern_id !== "") {
                        // Get Pattern Color Code
                        var layers = material_ops.pattern.pattern_obj.layers;
                        _.each(layers, function(layer) {
                            if (_.includes(LogoPanel.valid_colors, layer.color_code)) {
                                color_codes.push(layer.color_code);
                            }
                        });
                    } else if (material_ops.gradient.gradient_id !== "" && typeof material_ops.gradient.gradient_id !== "undefined") {
                        // Get Gradient Color Code
                        var layers = material_ops.gradient.gradient_obj.layers;
                        _.each(layers, function(layer) {
                            if (layer.layer_no !== "3") {
                                if (_.includes(LogoPanel.valid_colors, layer.color_code)) {
                                    color_codes.push(layer.color_code);
                                }
                            }
                        });
                    } else {
                        if (_.includes(LogoPanel.valid_colors, material_ops.colorObj.color_code)) {
                            color_codes.push(material_ops.colorObj.color_code);
                        }
                    }
                }
            });
        } else {
            ub.utilities.info("Cannot find main fabric");
        }

        if (typeof configuration.pipings !== "undefined") {
            _.each(configuration.pipings, function(piping) {
                var pipingSettings = ub.funcs.getPipingSettingsObject(piping);
                if (typeof pipingSettings !== "undefined") {
                    if (pipingSettings.enabled === 1) {
                        _.each(pipingSettings.layers, function(layer, index) {
                            // End loop
                            if (index + 1 > pipingSettings.numberOfColors) { return; }

                            if (ub.config.option === "BSB V-Neck" && position === "back_neck" && piping === "Neck Piping") {
                                if (pipingSettings.size === "1/4" ) {
                                    if (layer.layer === 3) {
                                        if (!_.contains(color_codes, layer.colorCode)) {
                                            color_codes.push(layer.colorCode);
                                        }
                                    }
                                }
                            } else if (position === "left_sleeve_logo" && piping === "Left End of Sleeve Piping") {
                                if (pipingSettings.size === "1/2" ) {
                                    if (layer.layer === 3) {
                                        if (!_.contains(color_codes, layer.colorCode)) {
                                            color_codes.push(layer.colorCode);
                                        }
                                    }
                                }
                            } else {
                                if (layer.colorCode !== "none") {
                                    if (!_.contains(color_codes, layer.colorCode)) {
                                        color_codes.push(layer.colorCode);
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
        return color_codes;
    },
};

LogoPanel.colors = {
    getSecondaryColor: function() {
        var color_sum = [];
        var color_array = [];

        var parts_color_array = LogoPanel.colors.getPartsColors();
        var pipings_color_array = LogoPanel.colors.getPipingsColors();
        var applications_color_array = LogoPanel.colors.getApplicationsColors();

        var colors = color_array.concat(parts_color_array, applications_color_array, pipings_color_array);
        var secondary_colors = LogoPanel.colors.sumOfColors(colors);

        return secondary_colors;
    },

    getPartsColors: function() {
        var excluded_parts = ub.config.type === "upper" ? LogoPanel.excluded_upper : LogoPanel.excluded_lower;
        var secondary_color = [];

        _.map(ub.current_material.settings[ub.config.type], function(mo) {
            if (typeof mo.code !== "undefined" && typeof mo.colorObj !== "undefined") {
                if (_.includes(LogoPanel.valid_colors, mo.colorObj.color_code)) {
                    if (!_.includes(excluded_parts, mo.code)) {
                        secondary_color.push({
                            color_code: mo.colorObj.color_code,
                            code: "parts"
                        });
                    }
                }
            }
        });

        return secondary_color;
    },

    getPipingsColors: function() {
        var colors = [];
        if (typeof ub.current_material.settings.pipings !== "undefined") {
            if (!util.isNullOrUndefined(ub.current_material.settings.pipings)) {
                _.map(ub.current_material.settings.pipings, function(index, elem) {
                    var numberOfColors = index.numberOfColors;
                    if (index.enabled === 1) {
                        _.map(index.layers, function(index, elem) {
                            if (elem + 1 > numberOfColors) {
                                return;
                            }
                            if (_.includes(LogoPanel.valid_colors, index.colorCode)) {
                                colors.push({
                                    color_code: index.colorCode,
                                    code: "pipings"
                                });
                            }
                        });
                    }
                });
            }
        }

        return colors;
    },

    getApplicationsColors: function () {
        var colors = [];
        if (typeof ub.current_material.settings.applications !== "undefined") {
            if (_.size(ub.current_material.settings.applications) > 0) {
                _.map(ub.current_material.settings.applications, function(index, elem) {
                    if (typeof index.color_array !== "undefined") {
                        _.each(index.color_array, function(index, el) {
                            if (_.includes(LogoPanel.valid_colors, index.color_code)) {
                                colors.push({
                                    color_code: index.color_code,
                                    code: "applications"
                                });
                            }
                        });
                    }
                });
            }
        }

        return colors;
    },

    sumOfColors: function(colors) {
        var color_sum = [];
        var color_code;
        var is_exist;

        for (var i = 0; i < colors.length; i++) {
            color_code = colors[i].color_code;
            is_exist = false;

            for (var j = 0; j < color_sum.length; j++) {
                if (color_sum[j].color_code === color_code) {
                    is_exist = true;
                    break;
                }
            }

            var to_be_add = null;

            if (colors[i].code === "parts") {
                to_be_add = 5;
            } else if (colors[i].code === "applications") {
                to_be_add = 2;
            } else {
                to_be_add = 0.5;
            }

            if (is_exist) {
                color_sum[j].count += to_be_add;
            } else {
                color_sum.push({color_code: color_code, count: to_be_add});
            }
        }

        return _.sortBy(color_sum, "count").reverse();
    }
};

LogoPanel.excluded_upper = ['body', 'front_body', 'back_body', 'left_body', 'right_body', 'highlights', 'shadows', 'extra', 'static'];
LogoPanel.excluded_lower = ['base', 'highlights', 'shadows', ''];
LogoPanel.valid_colors = ["CG", "W", "R", "RB", "NB", "G", "O", "M", "DG"];
LogoPanel.special_block_pattern = ["PTS Select Pant"];
LogoPanel.configurations = {
    items: [
        {
            blockPattern: ["PTS Pro Select Pant", "PTS Signature Pant"],
            position: "back_center_tunnel",
            parts: ["tunnel"],
            perspective: 'back'
        },
        {
            blockPattern: ["PTS Pro Select Pant", "PTS Signature Pant"],
            position: "front_left_hip",
            parts: ["base"],
            perspective: 'front'
        },
        {
            blockPattern: ["PTS Select Pant"],
            position: "front_left_hip",
            parts: ["base"],
            perspective: 'front'
        },
        {
            blockPattern: ["PTS Pro Select Raglan", "PTS Select Set-In", "PTS Select Sleeveless", "PTS Signature Raglan", "PTS Pro Select Sleeveless"],
            position: "left_sleeve_logo",
            parts: ["right_sleeve", "right_outer_sleeve_stripe_color", "right_sleeve_panel", "right_end_of_sleeve_insert"],
            perspective: 'left',
            pipings: ["Left Sleeve Piping 1 inch Up", "Left End of Sleeve Piping"]
        },
        {
            blockPattern: ["PTS Pro Select Raglan", "PTS Select Set-In", "PTS Select Sleeveless", "PTS Signature Raglan", "PTS Pro Select Sleeveless"],
            position: "back_neck",
            parts: ["back_body"],
            perspective: 'back',
            pipings: ["Neck Piping"]
        },
        {
            blockPattern: ["PTS Hoodie"],
            position: "top_left_of_pocket",
            parts: ["pocket"],
            perspective: 'front'
        },
        {
            blockPattern: ["PTS Hoodie"],
            position: "back_neck",
            parts: ["back_upper_panel", "back_body"],
            perspective: 'back'
        },
        {
            blockPattern: ["PTS Cage Jacket"],
            position: "left_sleeve_logo",
            parts: ["right_sleeve", "right_sleeve_stripe_2", "right_sleeve_stripe_1", "right_end_of_sleeve_insert"],
            perspective: 'left'
        },
        {
            blockPattern: ["PTS Cage Jacket"],
            position: "back_neck",
            parts: ["back_jersey"],
            perspective: 'back'
        },
    ],

    getConfiguration: function(block_pattern, position) {
        var blockPatterns = _.filter(this.items, function(item) {
            if (_.contains(item.blockPattern, block_pattern)) {
                return item;
            }
        });

        var configuration = _.find(blockPatterns, {position: position});
        return configuration;
    }
}