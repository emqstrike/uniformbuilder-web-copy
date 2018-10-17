/**
 * PropertiesPanel.js
 * - handler for the properties panel
 * @since October 16, 2018
 * @author Romack Natividad <romack@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *  var panel = document.getElementById('main-panel');
 *  var prop = new PropertiesPanel(panel, 'ProLook Sports');
 *  prop.setBodyPanel(panel);
 */

function PropertiesPanel(
    element,
    brand
) {
    this.body_panel = document.getElementById(element);
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

    setBodyPanel: function(panel_html) {
        this.clearBodyPanel();
        this.body_panel.innerHTML = panel_html;
    },

    clearBodyPanel: function() {
        this.body_panel.innerHTML = '';
    }

}