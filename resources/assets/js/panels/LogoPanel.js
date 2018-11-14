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

function LogoPanel(element) {
    this.panel = document.getElementById(element);
    this.bindEvents();
}

LogoPanel.prototype = {
    constructor: LogoPanel,

    init: function() {
        $(".modifier_main_container").on('click', '#primary_option_logo .logo-perspective-btn-container .logo-perspective-selector', this.onClickLogoPerspective);
    },

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML);
        return panel;
    },

    onClickLogoPerspective: function() {
        $(".logo-perspective-btn-container button").removeClass('cp-button-active');

        var view = $(this).data("perspective");
        $('a.change-view[data-view="' + view + '"]').trigger('click');

        var image = ub.getThumbnailImage(ub.active_view + "_view");

        $("#logo-preview").css({
            'background-image': "url("+ image +")"
        });

        $(this).addClass('cp-button-active');
    },

    bindEvents: function() {
        this.init();
    }
};


LogoPanel.process = {
    processLogo: function(logo_data) {

        if (!util.isNullOrUndefined(logo_data))
        {
            var _logo_position = logo_data.replace(new RegExp("\\\\", "g"), "");
            _logo_position = _logo_position.slice(1, -1);
            _logo_position = JSON.parse(_logo_position);

            ub.data.logos = _logo_position;

            _.each(ub.data.logos, function(logo) {
                var _colorArray = [];
                var _layers = [];

                // Normalize Logo Position From source

                _.each (logo.perspectives, function (perspective) {

                    _.each(perspective.layers, function (layer) {

                        layer.position = layer.position;

                    });
                });

                // Try without the process of colors

                var _layerCount = 0;

                if (logo.layer1) { _layerCount +=1 };
                if (logo.layer1) { _layerCount +=1 };
                if (logo.layer1) { _layerCount +=1 };

                var _hasSavedLogoData = (typeof ub.current_material.settings.logos[logo.position] !== "undefined");

                if (_hasSavedLogoData) { return; }

                if (!_hasSavedLogoData && logo.enabled === 1) {

                    ub.current_material.settings.logos[logo.position] = {
                        position: logo.position,
                        numberOfLayers: _layerCount,
                    };

                    ub.current_material.settings.logos[logo.position].enabled = 1;
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

        _.each(_frontObject.layers, function (layer, index) {

            if (index + 1 > _layerCount) { return; }

            var _layerSettings = _.find(logoSettingObject.layers, {layer: layer.position});
            var logoLayer = ub.pixi.new_sprite(layer.filename);

            logoLayer.ubName = 'Layer ' + (index + 1);
            logoLayer.tint = parseInt('e6e6e6', 16);

            // if (typeof _layerSettings === "undefined" || _layerSettings.colorCode === "none") {

                logoLayer.alpha = 666;

            // } else {

                // logoLayer.alpha = 1;

            // }

            container.addChild(logoLayer);
            logoLayer.zIndex = layer.position;

        });

        sprite = container;

        ub.updateLayersOrder(sprite);

        var _logoLengthBefore = _.filter(ub.current_material.settings.pipings, {enabled: 1}).length;

        ub.current_material.containers[logoObject.position] = {};
        ub.current_material.containers[logoObject.position].pipingObject = sprite;

        var temp                    = {};
        var layer_order             = ( ub.funcs.generateZindex('pipings') + _logoLengthBefore + 1);

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
    }
};


