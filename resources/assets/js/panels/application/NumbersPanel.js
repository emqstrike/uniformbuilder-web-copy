/**
 * NumberPanel.js
 * - handler for the numbers panel
 * @since March 26, 2019
 * @author
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *  handle the setup of numbers panel
 */

function NumbersPanel(element) {
    this.panel = document.getElementById(element);

    this.fontAccents = [];

    // default accent
    this.setFontAccents(NumbersPanel.FRONT_TYPE);
}

NumbersPanel.prototype = {
    constructor: NumbersPanel,

    getPanel: function() {
        var items = {
            fontAccents: this.fontAccents
        };

        var rendered = Mustache.render(this.panel.innerHTML, items);
        return rendered;
    },

    setLocations: function() {

    },

    setFontAccents: function(application_type) {
        if (application_type === NumbersPanel.FRONT_TYPE ||
            application_type === NumbersPanel.BACK_TYPE ||
            application_type === NumbersPanel.SLEEVE_TYPE) {

            var applications = ub.current_material.settings.applications;

            var filter_app = _.find(applications, {'application_type': application_type});

            this.fontAccents = _.map(ub.data.accents.items, function(i) {
                return {
                    image: "/images/sidebar/" + i.thumbnail,
                    active: filter_app.accent_obj.id === i.id ? "uk-active" : ""
                };
            });
        } else {
            console.error("Error: Invalid application type");
        }
    },

    getAccents: function() {
        return this.fontAccents;
    }
};

NumbersPanel.FRONT_TYPE = "front_number";
NumbersPanel.BACK_TYPE = "back_number";
NumbersPanel.SLEEVE_TYPE = "sleeve_number";

NumbersPanel.events = {
    is_init: false,

    init: function() {
        if (!NumbersPanel.events.is_init) {
            NumbersPanel.events.is_init = true;
        }
    }
};