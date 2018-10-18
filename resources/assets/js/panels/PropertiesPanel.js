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
    _.each(this.modifiers, function (modifier) {
        modifier.colors_patterns_panel = new ColorPatternPanel('m-colors-patterns', modifier);
    });
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

    pushOptionPanel: function(modifier) {
        // this.panels.push(new ColorPanel('m-colors'))
    },

    loadTemplate: function() {
        var template = document.getElementById('m-new-color-pattern-picker');
        this.setBodyPanel(template.innerHTML)
    }

}