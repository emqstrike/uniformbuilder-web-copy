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
    brand
) {
    this.body_panel = document.querySelector(element);
    this.brand = brand;
    this.modifiers = [];
    this.parts = [];
    this.inserts = [];
    this.numbers = [];
    this.isBind = true;
    this.panels = {
        parts: null,
        colors: new ColorPanel(null),
        patterns: new PatternPanel(null),
        pippings: null,
        inserts: null,
        numbers: null,
        applications: null,
        logo: null
    };
    this.initModifiers();
    this.initInserts();
    this.setDefaultColorsPatterns();
    this.bindEvents();
}

PropertiesPanel.prototype = {
    constructor: PropertiesPanel,

    initModifiers: function() {
        this.modifiers = _.sortBy(ub.data.modifierLabels, 'intGroupID');
        _.map(this.modifiers, function(modifier) {
            var _modifier = ub.funcs.getModifierByIndex(modifier.index);
            var _names = ub.funcs.ui.getAllNames(_modifier.name);
            var titleNameFirstMaterial = _names[0].toTitleCase();
            var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);

            modifier.hasPattern = (_settingsObject.has_pattern) ? true : false;

            // Check if the part has limited color set
            var _limitedColorSet = ub.data.materialOptionWithLimitedColors.getLimitedColorSet(modifier.name);
            if (typeof _limitedColorSet !== "undefined") {
                var _alternateColorSet = [];

                _alternateColorSet = _.each(_limitedColorSet.valid_colors, function (item) {
                    _alternateColorSet.push(ub.funcs.getColorByColorCode(item));
                    // Assign alternate color in colors
                    modifier.colors = _alternateColorSet;
                });

                ub.utilities.info ('Limited Color Set detected for ' + modifier.name);
            }

            if (typeof _limitedColorSet === "undefined") {
                // if dont have limited color set the team colors
                modifier.colors = ub.current_material.settings.team_colors;
            }

            // Check if uniform has gradient
            if (typeof ub.data.gradients !== "undefined" && _.size(ub.data.gradients) > 0) {
                var gradientObject = _.find(ub.data.gradients, {name: modifier.fullname});
                if (typeof gradientObject !== "undefined") {
                    modifier.hasGradient = true;
                } else {
                    modifier.hasGradient = false;
                }
            }
        });
    },

    initInserts: function() {
        var filter = ["Insert", "Panel", "Piping"];

        this.inserts = _.filter(this.modifiers, function (modifier) {
            return _.includes(modifier.name, filter);
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

    bindEvents: function() {
        this.panels.colors.onSelect();
        this.panels.patterns.onSelect();
        this.panels.patterns.onChangeColorPaternCategory();
        this.panels.patterns.onSelectColorPerCategory();
        this.panels.patterns.onOpenModalPatternModifier();
        this.panels.patterns.onClosePatternModal();
        this.panels.patterns.onApplyChanges();

        if (PropertiesPanel.is_bind_events_called === 0) {
            this.panelTracker();
            PropertiesPanel.is_bind_events_called = 1;
        }
    },

    // Pre-select default colors, add check mark and add active state class name
    setDefaultColorsPatterns: function() {
        var _this = this;
        var currentMaterials = ub.current_material.settings[ub.config.type];

        _.map(_this.modifiers, function(index) {
            var materialObject = _.find(currentMaterials, {code: index.fullname});
            var patternObject = materialObject.pattern;
            var gradientObject = materialObject.gradient;
            var modifierObject = _.find(ub.data.modifierLabels, {fullname: materialObject.code});

            if (typeof materialObject !== "undefined")
            {
                var color_container = $(".color-main-container-" + materialObject.code + " .color-container-button .color-selector-button[data-color-id='"+ materialObject.colorObj.id +"']");

                if (color_container.length > 0) {
                    _this.panels.colors.addCheckOnSelectedColor(color_container, materialObject.colorObj.color_code);
                }

                if (patternObject.pattern_id !== "blank" && patternObject.pattern_id !== "")
                {
                    // Pattern Name
                    var name = ub.utilities.underscoreToWhitespace(patternObject.pattern_id);
                    var pattern_name = ub.utilities.titleCase(name);

                    // Default Pattern Layers
                    var layers = materialObject.pattern.pattern_obj.layers;

                    // Get pattern and modifier object
                    var patternObject = _.find(ub.data.patterns.items, {name: pattern_name});

                    // Get Material Option
                    var materialOption = _this.getMaterialOptions(modifierObject.index);

                    _.map(layers, function(index) {
                        // Get Color Object
                        var pattern = _this.panels.patterns.getCurrentPatternObject(modifierObject.index);
                        var colorObject = ub.funcs.getColorByColorCode(index.color_code);
                        _this.panels.patterns.setPatternColor(modifierObject.fullname, parseInt(index.layer_no), colorObject, pattern, materialOption)
                    });

                    _this.panels.patterns.setPreviousPattern(modifierObject.fullname, parseInt(patternObject.id));

                    var pattern_container = $(".pattern-main-container-"+ materialObject.code + " .pattern-container-button .pattern-selector-button[data-pattern-id='"+ patternObject.id +"']");
                    if (pattern_container.length > 0) {
                        $(".edit-pattern-modal-container-"  + modifierObject.fullname).html("<button class='edit-pattern-modal-button' data-modifier-index='" + modifierObject.index +"' data-modifier-category='"+ modifierObject.fullname +"'>Edit Pattern Color</button>");
                        pattern_container.html('<div class="cp-check-background cp-background-cover"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
                        pattern_container.addClass('active-pattern');
                    }
                }

                if (typeof gradientObject.gradient_id !== "undefined" && gradientObject.gradient_id !== "") {
                    var gradientContainer = $(".pattern-main-container-"+ materialObject.code + " .gradient-container-button .gradient-selector-button[data-gradient-name='gradient']");
                    $(".edit-pattern-modal-container-"  + modifierObject.fullname).html("<button class='edit-gradient-modal-button' data-modifier-index='" + modifierObject.index +"' data-modifier-category='"+ modifierObject.fullname +"'>Edit Gradient Color</button>");
                    gradientContainer.html('<div class="cp-check-background cp-background-cover"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
                    gradientContainer.addClass('active-pattern');
                }
            }

        });
    },

    panelTracker: function() {
        var _this = this;
        ub.stage.on('mousedown', _.throttle(function (mousedata)
        {
            if (ub.tools.activeTool.active()) {
                return;
            }


            var current_coodinates = mousedata.data.global;
            var results = ub.funcs.withinMaterialOption(current_coodinates);

            if (results.length > 0)
            {
                ub.states.canDoubleClick = true;
                var _match = _.first(results).name.toCodeCase();
                var _result = _match.replace('right_', 'left_');
                var _obj = _.find(ub.data.modifierLabels, {fullname: _result});
                var _index = ub.funcs.getIndexByName(_result);
                ub.current_part = _index;

                if (_match.includes("insert"))
                {
                    if ($("#primary_options_container #parts-with-insert-container").length === 0) {
                        $('#property-modifiers-menu .menu-item-inserts').trigger('click');
                    }
                }
                else
                {
                    if ($("#primary_options_container .parts-container").length === 0) {
                        $('#property-modifiers-menu .menu-item-parts').trigger('click');
                    }
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
    },

    getMaterialOptions(index) {
        // Get Material Option
        var _modifier = ub.funcs.getModifierByIndex(index);
        var _names = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial = _names[0].toTitleCase();
        var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
        var _materialOptions = ub.funcs.getMaterialOptions(titleNameFirstMaterial);
        var firstMaterialOption = _materialOptions[0];

        return firstMaterialOption;
    },

}

PropertiesPanel.is_bind_events_called = 0;