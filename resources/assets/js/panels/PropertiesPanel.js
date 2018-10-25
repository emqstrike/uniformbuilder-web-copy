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
 *  var prop = new PropertiesPanel('main-panel-id', 'ProLook Sports');
 */

function PropertiesPanel(
    element,
    brand,
    is_inserts = true
) {
    this.body_panel = document.getElementById(element);
    this.is_inserts = is_inserts;
    this.brand = brand;
    this.modifiers = [];
    this.parts = [];
    this.inserts = [];
    this.panels = {
        parts: '',
        colors: new ColorPanel('', ''),
        patterns: new PatternPanel('', ''),
        pippings: '',
        inserts: ''
    };
    this.initModifiers();
    this.initInserts();
    this.loadTemplate();
    this.bindEvents();
}

PropertiesPanel.prototype = {
    constructor: PropertiesPanel,

    initModifiers: function() {
        this.modifiers = _.sortBy(ub.data.modifierLabels, 'intGroupID');
    },

    initInserts: function() {
        if (this.is_inserts) {
            this.inserts = _.filter(this.modifiers, function (modifier) {
                return modifier.name.includes("Insert");
            });
            this.parts = _.difference(this.modifiers, this.inserts);
        } else {
            this.parts = _.filter(this.modifiers, function (modifier) {
                return modifier.name.includes("Insert");
            });
        }
    },

    getBrand: function() {
        return this.brand;
    },

    setBrand: function(brand) {
        this.brand = brand;
    },

    getModifiers: function() {
        return this.modifiers;
    },

    setModifiers: function(modifiers) {
        this.modifiers = modifiers;
    },

    setBodyPanel: function(panel_html) {
        this.clearBodyPanel();
        this.body_panel.innerHTML = panel_html;
    },

    clearBodyPanel: function() {
        this.body_panel.innerHTML = '';
    },

    loadTemplate: function() {
        this.panels.parts = new PartPanel('m-parts', this.parts);
        var rendered = this.panels.parts.getPanel();
        this.setBodyPanel(rendered);
    },

    bindEvents: function() {
        this.panels.parts.onSelect();
        this.panels.colors.onSelect();
        this.panels.patterns.onSelect();
        this.panels.patterns.onChangeColorPaternCategory();
        this.panels.patterns.onSelectColorPerCategory();
        this.panels.patterns.onOpenModalPatternModifier();
    }

}