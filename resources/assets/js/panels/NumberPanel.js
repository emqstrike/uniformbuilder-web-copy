/**
 * NumberPanel.js
 * - handle Number decorations behavior
 * @since November 13, 2018
 * @authors
 * - Romack Natividad <romack@qstrike.com>
 * - Rodrigo Galura <rodrigo@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 * - UnderscoreJS
 */

function NumberPanel(element) {
    this.panel = document.getElementById(element);
    that = this;
    this.items = {
        applications: this.getApplications(that)
    };
}

NumberPanel.prototype = {
    constructor: NumberPanel,

    bindEvents: function() {
        // Number Value (ENTER key)
        $('#numbers-panel .application .application-text').on('keypress', function(e) {
            var number = $(this).val();
            var application_id = $(this).data('application-id');
            var application_type = $(this).data('application-type');
            var font_id = $(this).data('font-id');
            var layer = $(this).data('application-layer');

            if (e.keyCode === 13) {
                ub.modifierController.controllers.numbers.setNumber({
                    number: number,
                    application_id: application_id,
                    application_type: application_type,
                    font_id: font_id,
                    layer: layer
                });
            }
        });

        // Font Style
        $('#numbers-panel .application .font-style').on('change', this.setFontStyle);

        // Accents
        $('#numbers-panel .application .font-accent').on('click', function(e) {
            var accent_id = $(this).data('accent-id');
            var application_id = $(this).data('application-id');
            var config = {
                accent_id: accent_id,
                application_id: application_id
            }
            console.log(config);
            ub.modifierController.controllers.numbers.setFontAccent(config);
        });
    },

    getPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML, this.items);
        return rendered;
    },

    getApplications: function(_this) {
        var applications = _.filter(ub.current_material.settings.applications, function(el){
            return (el.application_type.indexOf('number') > -1);
        });

        _.each(applications, function(appl) {
            appl.fonts = _this.getFontsList();
            appl.accents = _this.getAccentsList(appl);
        });

        return applications;
    },

    getAccentsList: function(application_settings) {
        var accents = [];
        _.map(ub.data.accents.items, function (item) {
            var accent = {
                'thumbnail': '/images/sidebar/' + item.thumbnail,
                'id': item.id,
                'code': item.code,
                'active': application_settings.accent_obj.id === item.id ? 'active' : '',
                'activeCheck': application_settings.accent_obj.id === item.id ? '<i class="fa fa-check" aria-hidden="true"></i>' : ''
            }

            accents.push(accent);
        });
        return accents;
    },

    getFontsList: function() {
        var fonts = [];
        _.map(ub.data.fonts, function(font) {
            var temp = {
                type: font.type,
                fontStyle: font.name,
                fontCaption: font.caption
            }
            var temp = font;
            fonts.push(temp);
        });
        return fonts;
    },

    hasApplications: function() {
        if (this.items.applications.length) {
            console.log('Number Applications = ' + this.items.applications.length);
            return true;
        }
        return false;
    },

    setApplicationLocation: function() {
        // change application's location (front, back, left sleeve, right sleeve)
    },

    setApplicationPositionXY: function() {
        // Handler for position controls TOP, LEFT
    },

    setApplicationRotation: function() {
        // Handler for application's rotation level
    },

    getFont: function(font_id) {
        var font = _.find(ub.data.fonts, {
            id: font_id.toString()
        });
        return font;
    },

    configurePerspective: function(layer) {
        var perspective = new PerspectiveController;
        if (layer.toLowerCase().indexOf('back') > -1) {
            perspective.back();
        } else if (layer.toLowerCase().indexOf('front') > -1) {
            perspective.front();
        } else if (layer.toLowerCase().indexOf('right') > -1) {
            perspective.right();
        } else if (layer.toLowerCase().indexOf('left') > -1) {
            perspective.left();
        } else {
            ub.utilities.error('Unable to find perspective');
        }
    },

    // Apply the changes to the stage
    applyNumberChanges: function(application_settings) {
        var object_id = null;

        if (typeof application_settings !== 'undefined') {
            object_id = application_settings.id;
            ub.funcs.removeApplicationByID(object_id);
            ub.create_application(application_settings, undefined);

            // Stop changing all number applcations
            if (ub.funcs.isFreeFormToolEnabled()) return;

            _.each(ub.current_material.settings.applications, function (appl) {
                if (appl.type !== "logo" && appl.type !== "mascot") {
                    if (application_settings.type.indexOf('number') !== -1
                        && appl.type.indexOf('number') !== -1) {
                        appl.text = application_settings.text;
                        ub.create_application(appl, undefined);
                    }
                }
            });

        } else {
            ub.utilities.error('Missing object settings. Unable to apply changes.');
        }
    },

    getDefaultColorByIndex: function(index) {
        var color = false;
        if (typeof ub.current_material.settings.team_colors !== 'undefined') {
            color = ub.current_material.settings.team_colors[index].hex_code;
        }
        return color;
    },

    setDefaultAccentColors: function(accent_object) {
        var accent_model = new Accent(accent_object);
        var initial_layer_number = 1;
        var initial_layer = accent_model.getLayer(initial_layer_number);
        initial_layer.default_color = this.getDefaultColorByIndex(initial_layer_number);

        if (accent_object.layers.length >= 4) {

            var secondary_layer_number = initial_layer_number + 1;
            var secondary_layer = accent_model.getLayer(secondary_layer_number);
            var _color = ub.funcs.getColorByColorCode('B').hex_code;

            if (ub.current_material.settings.team_colors.length >= 3) {
                _color = this.getDefaultColorByIndex(secondary_layer_number);
            }

            secondary_layer.default_color = _color;

        }
        return accent_object;
    },

    applyAccentChanges: function(accent_id, application_settings) {

        var accent_model = new Accent();
        var accent_object = accent_model.find(accent_id);
        if (typeof accent_object === 'undefined') {
            console.log('Empty accent object.');
            return;
        }

        var target_application_id = application_settings.id;

        ub.funcs.removeApplicationByID(target_application_id);

        this.setDefaultAccentColors(accent_object);

        /// Process new Colors

        var _toggle = false;
        var colorArray = [];
        var colorArrayText = [];

        _.each(this.accent_object.layers, function (layer) {

            var _hexCode = layer.default_color;
            var _color = ub.funcs.getColorObjByHexCode(_hexCode);
            var _layerNo = layer.layer_no - 1;

            if (layer.name === 'Mask' || layer.name === 'Pseudo Shadow') {
                return;
            }

            if (typeof _color === 'undefined') {
                _color = settingsObj.color_array[_layerNo];
            }

            if (typeof _color === "undefined" || !ub.funcs.isInTeamColor(_color.color_code)) {

                var _index = _toggle ? 1 : 0;
                _toggle = !_toggle;

                _color = ub.current_material.settings.team_colors[_index];
                settingsObj.color_array[_layerNo] = _color;

                layer.default_color = _color.hex_code;

                if (typeof settingsObj.colorArrayText === 'undefined') {

                    settingsObj.colorArrayText = [_color.color_code];

                } else {

                    settingsObj.colorArrayText[_layerNo] = _color.color_code;

                }

            }

            colorArray.push(_color);
            colorArrayText.push(_color.color_code);

        });
    },

    // Retrieve the application object by application_type
    getApplicationByType: function(application_type) {
        var application_obj = null;
        var panel = ub.modifierController.controllers.numbers;
        if (panel.items.applications.length > 0) {
            application_obj = _.find(panel.items.applications, function(application, application_type) {
                return (application.application_type = application_type)
            });
        }
        return application_obj;
    },

    // Retrieve the application object by application_id
    getApplicationById: function(application_id) {
        console.log('getApplicationById .. ' + application_id);
        var application_obj = null;
        var panel = ub.modifierController.controllers.numbers;
        if (panel.items.applications.length > 0) {
            application_obj = _.find(ub.current_material.settings.applications, {
                code: application_id.toString()
            });
        }
        return application_obj;
    },

    handleTailsweeps: function(application_settings) {
        return true;
        // Tailsweep, is off for now
        // if (application_settings.text.length <= 5) { _length = 'short'; }
        // if (application_settings.text.length >= 6 && application_settings.text.length <= 7 ) { _length = 'medium'; }
        // if (application_settings.text.length > 7) { _length = 'long'; }

        /*
        _length = (application_settings.text.length <= 12) ? application_settings.text.length : 12;

        application_settings.tailsweep.length = _length;

        $('span.sizeItem').removeClass('active');
        $('span.sizeItem[data-size="' + application_settings.tailsweep.length + '"]').addClass('active');
        */
    },

    setNumber: function(config) {
        var panel = ub.modifierController.controllers.numbers;
        // change number
        var application_settings = panel.getApplicationById(config.application_id);

        if (typeof application_settings !== 'undefined') {

            application_settings.text = config.number;

            var font = panel.getFont(config.font_id);
            application_settings.font_obj = font;

            panel.handleTailsweeps(application_settings);
            panel.applyNumberChanges(application_settings);
        } else {
            ub.utilities.error('Missing object settings. Unable to apply changes.');
        }
    },

    setFontStyle: function() {
        var panel = ub.modifierController.controllers.numbers;
        // change font style
        var application_id = $(this).data('application-id');
        var layer = $(this).data('application-layer');

        var font_id = $(this).val();
        var font = panel.getFont(font_id);
        application_settings.font_obj = font;

        var application_settings = panel.getApplicationById(application_id);

        if (typeof application_settings !== 'undefined') {
            panel.applyNumberChanges(application_settings);
            this.configurePerspective(layer);
        } else {
            ub.utilities.error('Missing object settings. Unable to apply changes.');
        }
    },

    setFontSize: function() {
        var panel = ub.modifierController.controllers.numbers;
        var application_id = $(this).data('application-id');
        var application_settings = panel.getApplicationById(application_id);
        // change font size
        if (typeof application_settings !== 'undefined') {
            application_settings.font_size = parseFloat(size);
            application_settings.size = parseFloat(size);
            panel.applyNumberChanges(application_settings);
        } else {
            ub.utilities.error('Missing object settings. Unable to apply changes.');
        }
    },

    setFontAccent: function(config) {
        // change font accent
        var panel = ub.modifierController.controllers.numbers;
        var application_settings = panel.getApplicationById(config.application_id);
        ub.funcs.changeAccentFromPopup(config.accent_id, application_settings);
    },

    setFontAccentColor: function() {
        // change accent color
        var panel = ub.modifierController.controllers.numbers;
    },

    setPattern: function() {
        // change pattern
        var panel = ub.modifierController.controllers.numbers;
    },

    disable: function() {
        // disables panel
    },

    enable: function() {
        // enables panel
    }
};

NumberPanel.initializeUISlider = function() {
    var applications = ub.current_material.settings.applications;
    var filteredApplications = _.filter(applications, function(i) {
        if (i.application_type === 'team_name' || i.application_type === 'player_name') {
            return i;
        }
    });

    var appData = [];

    // getting only data needed
    _.map(filteredApplications, function (i) {
        var objStock = {
            type: i.application.name.toUpperCase(),
            defaultText: i.text,
            code: i.code,
            perspective: i.application.views[0].perspective,
            placeholder: 'Your ' + i.application.name.toLowerCase(),
            fonts: true,
            fontsData: ub.funcs.fontStyleSelection(i, i.application.name.toUpperCase()),
            slider: true,
            sliderContainer: ub.funcs.sliderContainer(i.code),
            colorPicker: true,
            colorsSelection: ub.funcs.colorsSelection(i.code, 'CHOOSE FONT COLOR'),
            accents: true,
            accentsData: ub.funcs.fontAccentSelection(i, 'CHOOSE FONT ACCENT')    
        };
        appData.push(objStock);
    });

    // prepare data
    var templateData = {
        applications: appData
    };

    console.log(templateData);
};