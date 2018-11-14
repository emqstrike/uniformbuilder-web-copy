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
        // change number
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