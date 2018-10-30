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
) {
    this.body_panel = document.getElementById(element);
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
        this.inserts = _.filter(this.modifiers, function (modifier) {
            return modifier.name.includes("Insert");
        });
        this.parts = _.difference(this.modifiers, this.inserts);
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
        this.panels.parts = new PartPanel('m-parts', this.parts, this.inserts);
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
        this.panels.patterns.onClosePatternModal();
        this.panels.patterns.onApplyChanges();
        this.panelTracker();
    },

    panelTracker: function() {
        var _this = this;
        ub.stage.on('click', _.throttle(function (mousedata) {
            var current_coodinates = mousedata.data.global;
            var results = ub.funcs.withinMaterialOption(current_coodinates);

            if (results.length > 0)
            {
                var _match = _.first(results).name.toCodeCase();
                var _result = _match.replace('right_', 'left_');
                var _obj = _.find(ub.data.modifierLabels, {fullname: _result});
                var _index = ub.funcs.getIndexByName(_result);

                if (_match.includes("insert"))
                {
                    $('#new-toolbar > .group-3').click();
                }
                else
                {
                    $('#new-toolbar > .group-2').click();
                }

                _this.activePanelbyIndex(_index);
            }
            else
            {
                ub.funcs.clickOutside();
            }
        }, 500));
    },

    activePanelbyIndex: function(index) {
        if ($("li.panel-index-" + index).length > 0)
        {
            $("#primary_options_container").scrollTo("li.panel-index-" + index, { duration: 700 });
        }
    }

}