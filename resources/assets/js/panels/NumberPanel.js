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
        applications: this.getNumberApplications()
    };
}

NumberPanel.prototype = {
    constructor: NumberPanel,

    getPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML, this.items);
        return rendered;
    },

    getNumberApplications: function() {
        var applications = _.filter(ub.current_material.settings.applications, function(el){
            return (el.application_type.indexOf('number') > -1);
        });

        return applications;
    }

}