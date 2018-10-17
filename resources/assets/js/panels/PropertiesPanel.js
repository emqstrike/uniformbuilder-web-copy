/**
 * PropertiesPanel.js
 * - handler for the properties panel
 * @since October 16, 2018
 * @author Romack Natividad <romack@qstrike.com>
 *
 * Usage:
 *  var panel = document.getElementById('main-panel');
 *  var prop = new PropertiesPanel(panel, 'ProLook Sports');
 *  var template = document.getElementById('panel-body-template');
 *  prop.setBodyPanel(template, data);
 */

function PropertiesPanel(
    body_panel,
    brand
) {
    this.body_panel = body_panel;
    this.brand = brand;
}

PropertiesPanel.prototype = {
    constructor: PropertiesPanel,

    getBrand: function() {
        return this.brand;
    },

    setBrand: function(brand) {
        this.brand = brand;
    },

    setBodyPanel: function(html_template, data) {
        this.clearBodyPanel();
        var rendered = Mustache.render(html_template, data);
        this.body_panel.innerHTML = rendered;
    },

    clearBodyPanel: function() {
        this.body_panel.innerHTML = '';
    }

}