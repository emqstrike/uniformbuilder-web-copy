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
            }

            if (typeof _limitedColorSet === "undefined") {
                // if dont have limited color set the team colors
                var color_palette = null;
                if (modifier.name.includes("Panel") || modifier.name.includes("Piping") || modifier.name.includes("Insert")) {
                    color_palette = ColorPalette.funcs.getConfigurationPerTab("insert");
                } else {
                    color_palette = ColorPalette.funcs.getConfigurationPerTab("base");
                }

                modifier.colors = color_palette;
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
        this.inserts = _.filter(this.modifiers, function (modifier) {
            return modifier.name.includes("Panel") ||
                modifier.name.includes("Piping") ||
                modifier.name.includes("Insert")
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
        if (PropertiesPanel.is_bind_events_called === 0) {
            this.panelTracker();
            this.panels.patterns.onOpenModalPatternModifier();
            this.panels.patterns.onSelectColorPerCategory();
            this.panels.patterns.onApplyChanges();
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
                    var _patternObject = _.find(ub.data.patterns.items, {id: patternObject.pattern_obj.pattern_id});
                    var modifierObject = _.find(ub.data.modifierLabels, {fullname: materialObject.code});

                    // Get Material Option
                    var materialOption = _this.getMaterialOptions(modifierObject.index);

                    _.map(layers, function(index) {
                        // Get Color Object
                        var pattern = _this.panels.patterns.getCurrentPatternObject(modifierObject.index);
                        var colorObject = ub.funcs.getColorByColorCode(index.color_code);
                        _this.panels.patterns.setPatternColor(modifierObject.fullname, parseInt(index.layer_no), colorObject, pattern, materialOption)
                    });

                    _this.panels.patterns.setPreviousPattern(modifierObject.fullname, parseInt(_patternObject.id));

                    var pattern_container = $(".pattern-main-container-"+ materialObject.code + " .pattern-container-button .pattern-selector-button[data-pattern-id='"+ _patternObject.id +"']");
                    if (pattern_container.length > 0) {
                        $(".edit-pattern-modal-container-"  + modifierObject.fullname).html("<button class='edit-pattern-modal uk-button uk-button-default uk-text-capitalize' data-modifier-index='" + modifierObject.index +"' data-modifier-category='"+ modifierObject.fullname +"'><i class='fa fa-edit'></i>&nbsp;Edit Pattern Color</button>");
                        pattern_container.html('<div class="cp-check-background cp-background-cover"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
                        pattern_container.addClass('active-pattern');
                    }
                }

                if (typeof gradientObject.gradient_id !== "undefined" && gradientObject.gradient_id !== "") {
                    var gradientContainer = $(".pattern-main-container-"+ materialObject.code + " .gradient-container-button .gradient-selector-button[data-gradient-name='gradient']");
                    $(".edit-pattern-modal-container-"  + modifierObject.fullname).html("<button class='edit-gradient-modal uk-button uk-button-default uk-text-capitalize' data-modifier-index='" + modifierObject.index +"' data-modifier-category='"+ modifierObject.fullname +"'><i class='fa fa-edit'></i>&nbsp;Edit Gradient Color</button>");
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

            if (ub.status.fullView.getStatus()) {
                if (ub.status.fullViewZoom.getStatus()) {
                    // Turn Off Full View Zoom
                    ub.funcs.resetZoom();
                    ub.status.fullViewZoom.setStatus(false, undefined);
                } else {
                    // Zoom View Depending on the area that was clicked
                    ub.funcs.resetZoom();
                    var _view = ub.funcs.getZoomView(mousedata.data.global)

                    if (typeof _view !== "undefined") {
                        ub.funcs.hideViews();
                        ub.funcs.zoomView(_view);
                    }
                    ub.status.fullViewZoom.setStatus(true, _view);
                }
                return;
            }

            if (ub.zoom) {
                ub.zoom_off();
                return;
            }

            ub.funcs.hideVisiblePopups();

            if (typeof ub.activeApplication !== "undefined") {
                return;
            }


            var current_coodinates = mousedata.data.global;
            var results = ub.funcs.withinMaterialOption(current_coodinates);

            if (results.length > 0)
            {
                ub.states.canDoubleClick = true;
                var _match = _.first(results).name.toCodeCase();
                var _result = _match.replace('right_', 'left_');
                var _obj = _.find(ub.data.modifierLabels, {fullname: _result.toString()});
                var _index = ub.funcs.getIndexByName(_result);
                ub.current_part = _index;

                if ($("#primary_options_container ul.parts-container").length === 0) {
                    $('#property-modifiers-menu .menu-item-parts').trigger('click');
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