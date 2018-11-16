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
    },

    getPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML, this.items);
        return rendered;
    },

    getApplications: function() {
        var applications = _.filter(ub.current_material.settings.applications, function(el){
            return (el.application_type.indexOf('number') > -1);
        });

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

    setNumber: function() {
        var panel = ub.modifierController.numbers;
        // change number
        var application_type = $(this).data('application-type');
        var number = $(this).val();
        var settings = panel.getApplicationByType(application_type);

        if (typeof settings !== 'undefined') {
            settings.text = number;
            ub.funcs.changeFontFromPopup(settings.font_obj.id, settings);
            ub.utilities.actionLog('Updated Number on ' + application_type + ' to ' + number);
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

    setFontStyle: function() {
        // change font style
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