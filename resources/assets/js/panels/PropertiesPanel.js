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
    this.panels = {
        colors_patterns: '',
        colors: new ColorPanel('', ''),
        patterns: new PatternPanel('', ''),
        pippings: '',
        inserts: ''
    };

    this.loadTemplate();
    this.bindEvents();
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
        this.panels.colors_patterns = new ColorPatternPanel('m-colors-patterns', this.modifiers);
        var rendered = this.panels.colors_patterns.getPanel();
        this.setBodyPanel(rendered);
    },

    bindEvents: function() {
        this.panels.colors_patterns.onSelect();
        this.panels.colors.onSelect();
        this.panels.patterns.onSelect();
        this.panels.patterns.onChangeColorPaternCategory();
        this.panels.patterns.onSelectColorPerCategory();
    }

}