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
    this.locations = [];

    this.setLocations();
}

NumbersPanel.prototype = {
    constructor: NumbersPanel,

    getPanel: function() {
        var items = {
            fontAccents: this.fontAccents,
            locations: this.locations
        };

        var rendered = Mustache.render(this.panel.innerHTML, items);
        return rendered;
    },

    setLocations: function() {
        var application_types = _.pluck(ub.current_material.settings.applications, "application_type");

        if (_.contains(application_types, NumbersPanel.FRONT_TYPE)) {
            this.locations.push({
                location: NumbersPanel.FRONT_LOCATION,
                type: NumbersPanel.FRONT_TYPE
            });
        }

        if (_.contains(application_types, NumbersPanel.BACK_TYPE)) {
            this.locations.push({
                location: NumbersPanel.BACK_LOCATION,
                type: NumbersPanel.BACK_TYPE
            });
        }

        if (_.contains(application_types, NumbersPanel.SLEEVE_TYPE)) {
            this.locations.push({
                location: NumbersPanel.SLEEVE_LOCATION,
                type: NumbersPanel.SLEEVE_TYPE
            });
        }
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
    }
};

NumbersPanel.FRONT_TYPE = "front_number";
NumbersPanel.BACK_TYPE = "back_number";
NumbersPanel.SLEEVE_TYPE = "sleeve_number";

NumbersPanel.FRONT_LOCATION = "Front";
NumbersPanel.BACK_LOCATION = "Back";
NumbersPanel.SLEEVE_LOCATION = "Sleeve";

NumbersPanel.events = {
    is_init: false,

    init: function() {
        if (!NumbersPanel.events.is_init) {
            var numbers_el = $('.richardson-numbers-container');

            $('.location-buttons button', numbers_el).click(NumbersPanel.events.onLocationChange);

            NumbersPanel.events.is_init = true;
        }
    },

    onLocationChange: function() {
        var type = $(this).data('type');
    }
};