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

LogoPanel.prototype = {
    constructor: LogoPanel,

    init: function() {
        $(".modifier_main_container").on('click', '#primary_option_logo .logo-perspective-btn-container .logo-perspective-selector', this.onClickLogoPerspective);
    },

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, this.data);
        return panel;
    },

    onClickLogoPerspective: function() {
        var current_active_position = $("#primary_option_logo .logo-perspective-btn-container button.cp-button-active");
        current_active_position.css('pointer-events', "auto");
        var current_position = current_active_position.data("position");
        current_active_position.removeClass('cp-button-active');
        var material_ops = null;

        var new_position = $(this).data("position");

        if (new_position.includes("front") || new_position.includes("chest")) {
            $('a.change-view[data-view="front"]').trigger('click');
            material_ops = ub.funcs.getSettingsByMaterialOptionCode("front_body")

        } else if (new_position.includes("back")) {
            $('a.change-view[data-view="back"]').trigger('click');
            material_ops = ub.funcs.getSettingsByMaterialOptionCode("back_body");

        } else if (new_position.includes("left") || new_position.includes("sleeve")) {
            $('a.change-view[data-view="left"]').trigger('click');
            material_ops = ub.funcs.getSettingsByMaterialOptionCode("left_sleeve");
        }

        var logoObject = _.find(ub.data.logos, {position: new_position});
        var logoSettingsObject = LogoPanel.utilities.getLogoSettingsObject(logoObject.position);
        var _layerCount = 0;

        if (logoObject.layer1) { _layerCount +=1 };
        if (logoObject.layer2) { _layerCount +=1 };
        if (logoObject.layer3) { _layerCount +=1 };

        LogoPanel.utilities.removeLogo(current_position);
        LogoPanel.utilities.addLogo(logoObject, _layerCount);

        $(this).addClass('cp-button-active');
        $(this).css('pointer-events', "none");

        $("#logo-preview").hide();
        $(".logo-image-loader").show();

        $("#logo-preview").css({
            'background-image': ""
        });

        _.delay(function() {
            var image = ub.getThumbnailImage(ub.active_view + "_view");
            $("#logo-preview").css({
                'background-image': "url("+ image +")"
            });

            $("#logo-preview").show();
            $(".logo-image-loader").hide();
        }, 2000);

    },

    bindEvents: function() {
        if (LogoPanel.isBindEvents === 0) {
            this.init();
            LogoPanel.isBindEvents === 1;
        }
    }
};

LogoPanel.isBindEvents = 0;

LogoPanel.excluded = ['body', 'front_body', 'back_body', 'left_body', 'right_body', 'highlights', 'shadows', 'extra', 'static'];
LogoPanel.valid_colors = ["CG", "W", "R", "RB", "NB", "G", "O", "M", "DG"];

LogoPanel.init = function () {
    if (ub.current_material.material.logo_position !== null) {

        LogoPanel.utilities.initLogoData(ub.current_material.material.logo_position);

        ub.funcs.afterLoadFunctionList.push(function() {
            LogoPanel.utilities.processLogo();
        });

        if (_.size(ub.current_material.settings.logos) > 0) {

            LogoPanel.utilities.processSavedLogo();
        }
    }
}

LogoPanel.utilities = {
    initLogoData: function (logo_data) {
        if (!util.isNullOrUndefined(logo_data)) {
            var _logo_position = logo_data.replace(new RegExp("\\\\", "g"), "");
            _logo_position = _logo_position.slice(1, -1);
            _logo_position = JSON.parse(_logo_position);

            ub.data.logos = _logo_position;
        }
    },

    processLogo: function() {

        if (!util.isNullOrUndefined(ub.data.logos))
        {
            _.each(ub.data.logos, function(logo) {

                if (logo.position === "left_sleeve") {
                    logo.position = "left_sleeve_logo";
                }

                var _layerCount = 0;

                if (logo.layer1) { _layerCount +=1 };
                if (logo.layer2) { _layerCount +=1 };
                if (logo.layer3) { _layerCount +=1 };

                var secondary_color = LogoPanel.colors.getSecondaryColor();
                logo.colors_array = [
                    "W",
                    _layerCount == 2 ? "none" : "W",
                    "CG"
                ];

                var _colorArray = [];
                var _layers = [];

                logo.name = ub.utilities.titleCase(logo.position.replace(/_/g, " ").replace("logo", ""));

                // Normalize Logo Position From source
                _.each (logo.perspectives, function (perspective) {
                    _.each(perspective.layers, function (layer) {
                        layer.position = layer.position;
                    });
                });

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

                if (_hasSavedLogoData) { return; }

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
            // if (index + 1 > _layerCount) { return; }
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
        var current_active_logo = _.find(ub.current_material.settings.logos, {enabled: 1});

        if (typeof ub.current_material.settings.logos[position] === "undefined") {

            ub.current_material.settings.logos[position] = {
                position: position,
                enabled: 0,
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

            var _result = _.find(ub.data.logos, {position: key});

            if (logo.position === "") { return; }

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
        LogoPanel.utilities.renderLogo(logoObject, _layerCount);

        if (typeof(ub.current_material.settings.logos[logoObject.position]) !== "undefined") {
            ub.current_material.settings.logos[logoObject.position].enabled = 1;
            ub.current_material.settings.logos[logoObject.position].numberOfLayers = _layerCount;
        }

        LogoPanel.utilities.reInitiateLogo();
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

        } else {
            LogoPanel.utilities.changeBackgroundColor(logoSettingsObject.position, "CG");
            LogoPanel.utilities.changeLogoColor(logoSettingsObject.position, "W");

            if (logoSettingsObject.numberOfLayers !== 2) {
                LogoPanel.utilities.changeGutterColor(logoSettingsObject.position, "W");
            }
        }
    },

    reInitiateLogo: function() {
        var secondary_color = LogoPanel.colors.getSecondaryColor();
        var current_active_logo = _.find(ub.current_material.settings.logos, {enabled: 1});
        var material_ops = null;

        if (current_active_logo.position.includes("front") || current_active_logo.position.includes("chest")) {
            material_ops = ub.funcs.getSettingsByMaterialOptionCode("front_body")
        } else if (current_active_logo.position.includes("back")) {
            material_ops = ub.funcs.getSettingsByMaterialOptionCode("back_body");
        } else if (current_active_logo.position.includes("left") || current_active_logo.position.includes("sleeve")) {
            material_ops = ub.funcs.getSettingsByMaterialOptionCode("left_sleeve");
        }

        if (typeof secondary_color !== "undefined" && _.size(secondary_color) > 0) {
            for (var i = 0; i < secondary_color.length; i++) {
                if (secondary_color[i].color_code === material_ops.colorObj.color_code) {
                    LogoPanel.utilities.initiateDefaultLogoColor(current_active_logo, material_ops.colorObj.color_code);
                    continue;
                } else {
                    LogoPanel.utilities.initiateLogoColor(current_active_logo, secondary_color[i].color_code);
                    break;
                }
            }
        } else {
            LogoPanel.utilities.initiateDefaultLogoColor(current_active_logo, material_ops.colorObj.color_code);
        }
    },
};

LogoPanel.colors = {
    getSecondaryColor: function() {
        var color_sum = [];
        var colors = [];

        var parts_color_array = LogoPanel.colors.getPartsColors();
        var pipings_color_array = LogoPanel.colors.getPipingsColors();
        var applications_color_array = LogoPanel.colors.getApplicationsColors();

        colors = parts_color_array.concat(pipings_color_array, applications_color_array);

        var secondary_colors = LogoPanel.colors.sumOfColors(colors);

        return secondary_colors;
    },

    getPartsColors: function() {
        var secondary_color = [];
        var excluded_modifier = [];
        var included_modifier = [];

        _.map(ub.current_material.settings[ub.config.type], function(mo) {
            if (typeof mo.code !== "undefined" && typeof mo.colorObj !== "undefined") {
                if (_.includes(LogoPanel.valid_colors, mo.colorObj.color_code)) {
                    if (!_.includes(LogoPanel.excluded, mo.code)) {
                        secondary_color.push(mo.colorObj.color_code);
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
                    if (index.enabled === 1) {
                        _.map(index.layers, function(index, elem) {
                            if (_.includes(LogoPanel.valid_colors, index.colorCode)) {
                                colors.push(index.colorCode);
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
                                colors.push(index.color_code);
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
        var color;
        var is_exist;

        for (var i = 0; i < colors.length; i++) {
            color = colors[i];
            is_exist = false;

            for (var j = 0; j < color_sum.length; j++) {
                if (color_sum[j].color_code === color) {
                    is_exist = true;
                    break;
                }
            }

            if (is_exist) {
                color_sum[j].count++;
            } else {
                color_sum.push({color_code: color, count: 1});
            }
        }

        return _.sortBy(color_sum, "count").reverse();
    }
}