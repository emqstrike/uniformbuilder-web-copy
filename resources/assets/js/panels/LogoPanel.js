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
        logo_position: logo_positions
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

        var new_position = $(this).data("position");

        if (new_position.includes("front") || new_position.includes("chest")) {
            $('a.change-view[data-view="front"]').trigger('click');

        } else if (new_position.includes("back")) {
            $('a.change-view[data-view="back"]').trigger('click');

        } else if (new_position.includes("left") || new_position.includes("sleeve")) {
            $('a.change-view[data-view="left"]').trigger('click');

        }

        var logoObject = _.find(ub.data.logos, {position: new_position});
        var _layerCount = 0;

        if (logoObject.layer1) { _layerCount +=1 };
        if (logoObject.layer2) { _layerCount +=1 };
        if (logoObject.layer3) { _layerCount +=1 };

        var layerOneColor = _.find(ub.data.colors, {color_code: "W"});
        var layerThreeColor = _.find(ub.data.colors, {color_code: "CG"});

        data_logo = [
            {
                colorObj: layerOneColor,
                layer: 1,
                position: new_position,
            },
            {
                colorObj: layerThreeColor,
                layer: 3,
                position: new_position,
            }
        ];

        LogoPanel.process.removeLogo(current_position);
        LogoPanel.process.addLogo(logoObject, _layerCount);
        LogoPanel.process.changeColor(data_logo);
        $(this).addClass('cp-button-active');
        $(this).css('pointer-events', "none");

        $("#logo-preview").hide();
        $(".logo-image-loader").show();

        _.delay(function() {
            var image = ub.getThumbnailImage(ub.active_view + "_view");
            $("#logo-preview").css({
                'background-image': "url("+ image +")"
            });

            $("#logo-preview").show();
            $(".logo-image-loader").hide();
        }, 1500);

    },

    bindEvents: function() {
        if (LogoPanel.isBindEvents === 0) {
            this.init();
            LogoPanel.isBindEvents === 1;
        }
    }
};

LogoPanel.isBindEvents = 0;

LogoPanel.process = {
    processLogo: function(logo_data) {

        if (!util.isNullOrUndefined(logo_data))
        {
            var _logo_position = logo_data.replace(new RegExp("\\\\", "g"), "");
            _logo_position = _logo_position.slice(1, -1);
            _logo_position = JSON.parse(_logo_position);

            ub.data.logos = _logo_position;

            _.each(ub.data.logos, function(logo) {

                if (logo.position === "left_sleeve") {
                    logo.position = "bottom_sleeve";
                }

                logo.colors_array = [
                    'W',
                    'W',
                    'CG'
                ];

                logo.team_color_id_array = [
                    "3",
                    "2",
                    "1"
                ];

                var _colorArray = [];
                var _layers = [];

                logo.name = ub.utilities.titleCase(logo.position.replace("_", " "));

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

                        var _teamColorId = logo.team_color_id_array[index];

                        if (logo.enabled === 1 && _color.color_code !== "none") {
                             ub.data.colorsUsed[_color.hex_code] = {hexCode: _color.hex_code, parsedValue: _color.hex_code, teamColorID: _teamColorId};
                        }
                    });
                } else {
                    console.log('No Color Array for ' + logo.position);
                }

                var _layerCount = 0;

                if (logo.layer1) { _layerCount +=1 };
                if (logo.layer2) { _layerCount +=1 };
                if (logo.layer3) { _layerCount +=1 };

                logo.enabled = 1;

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
                    var _logoSettingsObject = LogoPanel.process.getLogoSettingsObject(logo.position);
                    var selectedColorArray = ub.current_material.settings.team_colors;

                    LogoPanel.process.initLogoColors(_logoObject, selectedColorArray[0]);
                    LogoPanel.process.renderLogo(logo, _layerCount);
                }
            });
        }
    },

    renderLogo: function(logoObject, _layerCount) {
        var _logoSettingsObject = LogoPanel.process.getLogoSettingsObject(logoObject.position);

        _.each (ub.views, function (perspective) {

            var _perspectiveString = perspective + '_view';

            var _sprites = LogoPanel.process.createLogo(logoObject, _layerCount, perspective, _logoSettingsObject);

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
            if (index + 1 > _layerCount) { return; }

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

    initLogoColors: function(logoObject, firstColor) {
        var _logoSettingsObject = LogoPanel.process.getLogoSettingsObject(logoObject.position);

        _.each(_logoSettingsObject.layers, function (layer) {

            if (typeof layer.colorObj === "undefined") {
                layer.colorCode = firstColor.color_code;
                layer.colorObj = firstColor;
            }
        });
    },

    getLogoSettingsObject: function(position) {
        if (typeof ub.current_material.settings.logos[position] === "undefined") {

            ub.current_material.settings.logos[position] = {
                position: position,
                enabled: 0,
                numberOfLayers: 0,
                layers: [
                    {
                        layer: 1,
                        status: false,
                        colorCode: '',
                    },
                    {
                        layer: 2,
                        status: false,
                        colorCode: '',
                    },
                    {
                        layer: 3,
                        status: false,
                        colorCode: '',
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

            LogoPanel.process.renderLogo(_result, logo.numberOfLayers);

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
        var selectedColorArray = ub.current_material.settings.team_colors;
        LogoPanel.process.initLogoColors(logoObject, selectedColorArray[0]);
        LogoPanel.process.renderLogo(logoObject, _layerCount);

        if (typeof(ub.current_material.settings.logos[logoObject.position]) !== "undefined") {
            ub.current_material.settings.logos[logoObject.position].enabled = 1;
            ub.current_material.settings.logos[logoObject.position].numberOfLayers = _layerCount;
        }
    },

    changeColor: function(logo_data) {
        _.each(logo_data, function(index) {
            _.each (ub.views, function (perspective) {

                var _objectReference = ub.objects[perspective + '_view'][index.position];
                var _childLayer = _.find(_objectReference.children, {ubName: 'Layer ' + index.layer});
                _childLayer.tint = parseInt(index.colorObj.hex_code, 16);

                if (index.colorObj.color_code === "none") {
                    _childLayer.alpha = 0;
                } else {
                    _childLayer.alpha = 1;
                }
            });
        });
    }
};


