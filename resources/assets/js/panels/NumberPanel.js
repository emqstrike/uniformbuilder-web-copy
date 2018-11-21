/**
 * NumberPanel.js
 * - handle Number decorations behavior
 * @since November 13, 2018
 * @authors
 * - Romack Natividad <romack@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 * - UnderscoreJS
 */

function NumberPanel(element) {
    this.panel = document.getElementById(element);
    this.items = {
        applications: this.getApplications()
    };
}

NumberPanel.prototype = {
    constructor: NumberPanel,

    bindEvents: function() {
        $('#numbers-panel .application .application-text').on('keypress', function(e) {
            var number = $(this).val();
            var application_id = $(this).data('application-id');
            var application_type = $(this).data('application-type');
            var font_id = $(this).data('font-id');
            var layer = $(this).data('application-layer');
            if (e.keyCode === 13) {
                ub.modifierController.numbers.setNumber({
                    number: number,
                    application_id: application_id,
                    application_type: application_type,
                    font_id: font_id,
                    layer: layer
                });
            }
        });
        $('#numbers-panel .application .font-style').on('change', this.setFontStyle);
    },

    getPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML, this.items);
        return rendered;
    },

    getApplications: function() {
        var applications = _.filter(ub.current_material.settings.applications, function(el){
            return (el.application_type.indexOf('number') > -1);
        });

        _.each(applications, function(appl) {
            appl.fonts = ub.data.fonts;
        });
        console.log(applications);

        return applications;
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
        console.log('layer = ' + layer);
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
        return perspective;
    },

    // Apply the changes to the stage
    applyNumberChanges: function(font_id, application_settings, layer) {
        var font = this.getFont(font_id);
        var perspective = this.configurePerspective(layer);

        var object_id = null;

        if (typeof application_settings !== 'undefined') {
            object_id = application_settings.id;
            ub.funcs.removeApplicationByID(object_id);
            application_settings.font_obj = font;
            ub.create_application(application_settings, undefined);
        } else {
            ub.utilities.error('Missing object settings. Unable to apply changes.');
        }
    },

    // Retrieve the application object by application_type
    getApplicationByType: function(application_type) {
        var application_obj = null;
        var panel = ub.modifierController.numbers;
        if (panel.items.applications.length > 0) {
            application_obj = _.find(panel.items.applications, function(application, application_type) {
                return (application.application_type = application_type)
            });
        }
        return application_obj;
    },

    // Retrieve the application object by application_id
    getApplicationById: function(application_id) {
        var application_obj = null;
        var panel = ub.modifierController.numbers;
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
        var panel = ub.modifierController.numbers;
        // change number
        var application_settings = panel.getApplicationById(config.application_id);

        if (typeof application_settings !== 'undefined') {
            application_settings.text = config.number;

            panel.handleTailsweeps(application_settings);

            panel.applyNumberChanges(config.font_id, application_settings, config.layer);
            ub.utilities.actionLog('Updated Number on ' + config.application_type + ' to ' + config.number);
        } else {
            ub.utilities.error('Missing object settings. Unable to apply changes.');
        }
    },

    setFontStyle: function() {
        var panel = ub.modifierController.numbers;
        // change font style
        var application_id = $(this).data('application-id');
        var application_type = $(this).data('application-type');
        var layer = $(this).data('application-layer');
        var font_id = $(this).val();
        var application_settings = panel.getApplicationById(application_id);

        if (typeof application_settings !== 'undefined') {
            panel.applyNumberChanges(font_id, application_settings, layer);
            ub.utilities.actionLog('Updated Font on ' + application_type + ' to ' + font_id);
        } else {
            ub.utilities.error('Missing object settings. Unable to apply changes.');
        }
    },

    setFontSize: function() {
        // change font size
        var panel = ub.modifierController.numbers;
    },

    setFontAccent: function(config) {
        // change font accent
        // var panel = ub.modifierController.numbers;
        // var application_settings = panel.getApplicationById(application_id);
        // ub.funcs.changeAccentFromPopup(config.accent_id, application_settings);
    },

    setFontAccentColor: function() {
        // change accent color
        var panel = ub.modifierController.numbers;
    },

    setPattern: function() {
        // change pattern
        var panel = ub.modifierController.numbers;
    },

    disable: function() {
        // disables panel
    },

    enable: function() {
        // enables panel
    }

}