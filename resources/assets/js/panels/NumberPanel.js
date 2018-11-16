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
        $('#numbers-panel .application .application-text').on('keyup', this.setNumber);
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

        console.log(application_settings);
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

    setNumber: function() {
        var panel = ub.modifierController.numbers;
        // change number
        var application_type = $(this).data('application-type');
        var font_id = $(this).data('font-id');
        var number = $(this).val();
        var layer = $(this).data('application-layer');
        var application_settings = panel.getApplicationByType(application_type);

        if (typeof application_settings !== 'undefined') {
            application_settings.text = number;
            panel.applyNumberChanges(font_id, application_settings, layer);
            ub.utilities.actionLog('Updated Number on ' + application_type + ' to ' + number);
        } else {
            ub.utilities.error('Missing object settings. Unable to apply changes.');
        }
    },

    setFontStyle: function() {
        var panel = ub.modifierController.numbers;
        // change font style
        var application_type = $(this).data('application-type');
        var layer = $(this).data('application-layer');
        var font_id = $(this).val();
        console.log('Font ID = ' + font_id);
        var application_settings = panel.getApplicationByType(application_type);

        if (typeof application_settings !== 'undefined') {
            panel.applyNumberChanges(font_id, application_settings, layer);
            ub.utilities.actionLog('Updated Font on ' + application_type + ' to ' + font_id);
        } else {
            ub.utilities.error('Missing object settings. Unable to apply changes.');
        }
    },

    setFontSize: function() {
        // change font size
    },

    setFontAccent: function() {
        // change font accent
    },

    setFontAccentColor: function() {
        // change accent color
    },

    setPattern: function() {
        // change pattern
    },

    disable: function() {
        // disables panel
    },

    enable: function() {
        // enables panel
    }

}