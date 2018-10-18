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
    this.modifiers = _.sortBy(ub.data.modifierLabels, 'index');
    this.panels = [];
}

PropertiesPanel.prototype = {
    constructor: PropertiesPanel,

    getBrand: function() {
        return this.brand;
    },

    setBrand: function(brand) {
        this.brand = brand;
    },

    getModifiers: function() {
        return this.modifiers;
    },

    setBodyPanel: function(panel_html) {
        this.clearBodyPanel();
        this.body_panel.innerHTML = panel_html;
    },

    clearBodyPanel: function() {
        this.body_panel.innerHTML = '';
    },

    loadTemplate: function() {
        var template = document.getElementById('m-colors-patterns');
        var rendered = Mustache.render(template.innerHTML, {
            modifiers: this.modifiers,
            colors: ub.data.colors,
            patterns: ub.data.patterns.items
        });
        this.setBodyPanel(rendered);
    }

}