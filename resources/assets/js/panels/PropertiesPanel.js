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
    this.body_panel = document.querySelector(element);
    this.brand = brand;
    this.modifiers = [];
    this.parts = [];
    this.inserts = [];
    this.panels = {
        parts: null,
        colors: new ColorPanel(null),
        patterns: new PatternPanel(null),
        pippings: null,
        inserts: null,
        applications: null,
        logo: null
    };
    this.initModifiers();
    this.initInserts();
    this.loadTemplate();
    this.setDefaultColors();
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
        });
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
        this.panels.parts = new PartPanel('m-parts', this.parts);
        this.panels.inserts = new InsertPanel('m-inserts', this.inserts);
        var rendered = this.panels.parts.getPanel();
        rendered += this.panels.inserts.getPanel();
        this.setBodyPanel(rendered);
        this.panels.parts.setTooltips();
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

    // Pre-select default colors, add check mark and add active state class name
    setDefaultColors: function() {
        _.each(this.parts, function(part) {
            var target = document.querySelector('.color-selector-button[data-color-id="' + part.team_color_id + '"][data-modifier-category="' +  part.fullname + '"]');
            if (target !== null) {
                target.innerHTML = '<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-fc-white"></span>';
                target.classList.add('active-color');
            }
        });
    },

    panelTracker: function() {
        var _this = this;
        ub.stage.on('mousedown', _.throttle(function (mousedata) {

            if (ub.tools.activeTool.active()) {
                console.log("Active Tool");
                return;
            }

            if (ub.status.fullView.getStatus()) {

                if (ub.status.fullViewZoom.getStatus()) {
                    console.log("Full view zoom");
                    // Turn Off Full View Zoom
                    ub.funcs.resetZoom();
                    ub.status.fullViewZoom.setStatus(false, undefined);

                } else {
                    console.log("Reset Zoom");
                    // Zoom View Depending on the area that was clicked
                    ub.funcs.resetZoom();

                    var _view = ub.funcs.getZoomView(mousedata.data.global)

                    if (typeof _view !== "undefined") {
                        console.log("undefined view");
                        ub.funcs.hideViews();
                        ub.funcs.zoomView(_view);

                    }

                    ub.status.fullViewZoom.setStatus(true, _view);

                }

                console.log("Full View Status");

                return;

            }

            if (ub.zoom) {
                console.log("Zoom off");
                ub.zoom_off();
                return;

            }

            ub.funcs.hideVisiblePopups();

            if (typeof ub.activeApplication !== "undefined") {
                return;
            }

            var _sizeOfTeamColors = _.size(ub.current_material.settings.team_colors);
            var _sizeOfColorsUsed = _.size(ub.data.colorsUsed);

            if (_sizeOfTeamColors < _sizeOfColorsUsed || _sizeOfTeamColors > 8) {

                //if(_sizeOfTeamColors < _sizeOfColorsUsed){
                if (_sizeOfTeamColors < 2) {
                    ub.startModal(1);
                    return;
                }

                if (!ub.branding.useAllColors) {
                    if (_sizeOfTeamColors > 8) {
                        ub.startModal(2);
                        return;
                    }
                }

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

                if (_match.includes("insert"))
                {
                    $('#property-modifiers-menu > .group-pane').removeClass('active');
                    $('#property-modifiers-menu > .group-pane.group-3').addClass('active');
                    ub.modifierController.inserts();
                }
                else
                {
                    $('#property-modifiers-menu > .group-pane').removeClass('active');
                    $('#property-modifiers-menu > .group-pane.group-2').addClass('active');
                    ub.modifierController.parts();
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