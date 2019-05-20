/**
 * PatternPanel.js
 * - handle pattern behavior
 * @since October 17, 2018
 * @authors
 * - Romack Natividad <romack@qstrike.com>
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 */

function PatternPanel(element) {
    this.panel = document.getElementById(element);
    this.previousPattern = {};
    // this.patternColors = [];
    this.items = {
        patterns: ub.data.patterns
    };
}

PatternPanel.patternColors = [];

PatternPanel.prototype = {
    constructor: PatternPanel,

    setItems: function(items) {
        alert('setting items');
        alert(items.length);
    },

    getPanel: function() {
        let panel = Mustache.render(this.panel.innerHTML, this.items);
        return panel;
    },

    getPatternColors: function(index) {
        var patternColor =  PatternPanel.patternColors[index];

        if (typeof patternColor !== "undefined") {
            return patternColor;
        } else {
            return;
        }
    },

    setPreviousPattern: function(index, patternID) {
        var find = this.previousPattern[index];

        if (typeof find !== "undefined") {
            find.patternID = patternID;
        } else {
            this.previousPattern[index] = {
                patternID: patternID
            };
        }
    },

    getPreviousPattternByModifier: function(index) {
        return this.previousPattern[index];
    },

    setPatternColor: function(index, layerID, colorObj, patternObj, materialOption) {
        var find = PatternPanel.patternColors[index];

        if (typeof find !== "undefined") {
            var findLayer = _.find(PatternPanel.patternColors[index], {layerID: layerID});
            if (typeof findLayer !== "undefined") {
                findLayer.color = colorObj;
            } else {
                PatternPanel.patternColors[index].push({
                    layerID: layerID,
                    color: colorObj,
                    patternObj: patternObj,
                    materialOption: materialOption
                });
            }
        } else {
            PatternPanel.patternColors[index] = new Array();
            PatternPanel.patternColors[index].push({
                layerID: layerID,
                color: colorObj,
                patternObj: patternObj,
                materialOption: materialOption
            });
        }
    },

    destroyPatternColor: function(index) {
        delete PatternPanel.patternColors[index];
    },

    onSelect: function() {
        let _this = this;
        var blank = _.find(ub.data.patterns.items, {name: "Blank", brand: "richardson"});
        $(".modifier_main_container").on('click', '.parts-modifier-panel .pattern-selector-button', function(event) {
            // Get Modifier category and index
            let modifier_category = $(this).data("modifier-category");
            let modifier_index = $(this).data("modifier-index");

            // Find the selected pattern / And remove check icon and active pattern class
            let selected_pattern = $(".pattern-main-container-" + modifier_category).find('.active-pattern');

            // Get pattern ID
            ub.current_part = modifier_index;
            var _id = $(this).data("pattern-id");

            // Get Modifier Object
            var _modifier = ub.funcs.getModifierByIndex(ub.current_part);

            // Get Material Option
            var _names = ub.funcs.ui.getAllNames(_modifier.name);
            var titleNameFirstMaterial = _names[0].toTitleCase();
            var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);

            // Find if there is active gradient
            if (typeof ub.data.gradients !== "undefined" && _.size(ub.data.gradients) > 0) {
                if (_.size(ub.current_material.settings.gradients) > 0) {
                    var gradientSettings = _.find(ub.current_material.settings.gradients, {enabled: 1, name: modifier_category});
                    if (typeof gradientSettings !== "undefined") {
                        gradientSettings.enabled = 0;
                        GradientPanel.utilities.removeGradient(_settingsObject);
                    }
                }
            }


            if (selected_pattern.data('pattern-id') === $(this).data("pattern-id"))
            {
                selected_pattern.removeClass('active-pattern');
                selected_pattern.html("");

                _this.loadBlankPattern(ub.current_part);

                $(".edit-pattern-modal-container-"  + modifier_category).html("");
            }
            else
            {
                selected_pattern.removeClass('active-pattern');
                selected_pattern.html("");

                _this.createPatternPreviewFromPatternPicker(ub.current_part, _id);

                // Empty the Edit pattern button
                $(".edit-pattern-modal-container-"  + modifier_category).html("");

                if (blank.id.toString() !== _id.toString()) {
                    // Show edit pattern button
                    $(".edit-pattern-modal-container-"  + modifier_category).html("<button class='edit-pattern-modal uk-button uk-button-small uk-button-default uk-text-capitalize' data-modifier-index='" + modifier_index +"' data-modifier-category='"+ modifier_category +"'><i class='fa fa-edit'></i>&nbsp;Edit Pattern Color</button>");
                }

                $(this).html('<div class="cp-check-background cp-background-cover"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
                $(this).addClass('active-pattern');
            }

        });
    },

    onOpenModalPatternModifier: function() {
        let _this = this;
        $(".modifier_main_container").on('click', '.pattern-modal-selector-container .edit-pattern-modal', function(event) {
            event.preventDefault();
            // Get the current modifier index
            var _modifier_index = $(this).data('modifier-index');
            var _modifier_category = $(this).data('modifier-category');
            ub.current_part = _modifier_index;

            // Get the data of the pattern
            var selected_pattern = $(".pattern-main-container-" + _modifier_category + " .pattern-container-button").find(".active-pattern");
            var _id = selected_pattern.data("pattern-id");

            // Get Pattern Object
            var _patternObj = _this.getCurrentPatternObject();

            // Get Material Option
            var materialOption = _this.getCurrentMaterialOptions();

            // Get layers count
            var _layerCount = _.size(_patternObj.layers);

            var previous_pattern = _this.getPreviousPattternByModifier(_modifier_category)

            if (typeof previous_pattern !== "undefined") {
                if (previous_pattern.patternID !== _id) {
                    // Previous pattern
                    _this.setPreviousPattern(_modifier_category, _id);
                    // Destroy pattern
                    _this.destroyPatternColor(_modifier_category);
                    _this.applyTeamColorOnPattern(_modifier_category, _layerCount, _patternObj, materialOption)
                } else {
                    // Get Pattern Colors
                    var pattern_colors = _this.getPatternColors(_modifier_category);
                    // Load Set pattern color and pre selected color
                    _.map(pattern_colors, function(index) {
                        _this.setPatternColor(_modifier_category, index.layerID, index.color, index.patternObj, index.materialOption);
                        _this.loadSelectedColor(index.layerID, index.color.id, index.color.color_code);

                        _.delay(function() {
                            _this.setMaterialOptionPatternColor(index.materialOption, index.color, index.layerID, index.patternObj);
                        }, 250);
                    });
                }
            } else {
                // Save previous pattern and apply team patterns
                _this.setPreviousPattern(_modifier_category, _id);
                _this.applyTeamColorOnPattern(_modifier_category, _layerCount, _patternObj, materialOption);
            }

            // Change Pattern
            _this.changePattern(ub.current_part, _id);

            // Append Pattern Name
            $(".modal-pattern-name").text(selected_pattern.data("pattern-name"));

            // Color Palette Configuration
            var color_palette = ColorPalette.funcs.getConfigurationPerTab("pattern");

            // Render Mustache
            var pattern_colors_element = document.getElementById("m-tab-patterns-colors-uikit");
            var render_pattern_colors = Mustache.render(
                pattern_colors_element.innerHTML,
                {
                    colors: color_palette,
                    modifier_category: _modifier_category
                }
            );

            var pattern_layers_element = document.getElementById("m-tab-patterns-layers");
            var render_pattern_layers = Mustache.render(
                pattern_layers_element.innerHTML,
                {
                    layers: _patternObj.layers,
                }
            );

            $(".uk-switcher .pattern-color-button-container").html("");
            $(".uk-switcher .pattern-color-button-container").html(render_pattern_colors);

            $("ul.layer-container-pattern").html("");
            $("ul.layer-container-pattern").html(render_pattern_layers);

            $("ul.layer-container-pattern li.uk-active").removeClass("uk-active");
            $("ul.layer-container-pattern li").first().addClass("uk-active");

            $("ul.pattern-color-main-container li.uk-active").removeClass('uk-active');
            $("ul.pattern-color-main-container li").first().addClass('uk-active');

            UIkit.modal("#modal-edit-palette-pattern").show();
        });
    },

    onSelectColorPerCategory: function() {
        var _this = this;
        $(".pattern-color-button-container").on('click', '.pattern-color-selector-button', function(event) {
            /* Act on the event */
            var active_pattern_color_category = $("#modal-edit-palette-pattern ul.layer-container-pattern").find('li.uk-active').data("layer-id");
            var category_modifier = $(this).data('modifier-category');
            var selected_color = $(".pattern-color-main-container li.uk-active").find('.active-pattern-color');
            selected_color.removeClass('active-pattern-color');
            selected_color.html("");
            // Get Material Option
            var materialOption = _this.getCurrentMaterialOptions();

            // Get Color Object
            var _colorID = $(this).data('color-label');
            var _colorOBJ = ub.funcs.getColorByColorCode(_colorID);

            // Layer
            var layerID = active_pattern_color_category;

            // Pattern Object
            var _patternObj = _this.getCurrentPatternObject();

            // Save Pattern Color
            _this.setPatternColor(category_modifier, layerID, _colorOBJ, _patternObj, materialOption);
            _this.setMaterialOptionPatternColor(materialOption, _colorOBJ, layerID.toString(), _patternObj);

            var colorLabel = $(this).data("color-label");

            $(this).html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-fc-white cp-check-color-font-size"></span>');
            $(this).addClass('active-pattern-color');

            if (colorLabel === 'W' ||
                colorLabel === 'Y' ||
                colorLabel === 'CR'||
                colorLabel === 'S' ||
                colorLabel === 'PK'||
                colorLabel === 'OP'||
                colorLabel === 'SG'
            ) {
                $(this).html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-colors"></span>');
            }
        });
    },

    createPatternPreviewFromPatternPicker: function(currentPart, patternID) {
        var _patternID = patternID.toString();
        var _currentPart = currentPart;
        var _patternObject = _.find(ub.data.patterns.items, {id: _patternID.toString()});
        var color_palette = ColorPalette.funcs.getConfigurationPerTab("pattern");

        _.each (_patternObject.layers, function (layer) {

            var color = color_palette[layer.layer_no - 1];
            if (typeof color !== 'undefined')
            {
                // Assign New Team Color if not just use default
                layer.default_color = color.hex_code;
                layer.colorObj = color;
            }
        });

        var _modifier                   = ub.funcs.getModifierByIndex(ub.current_part);
        var _names                      = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial      = _names[0].toTitleCase();

        _.each(_names, function (name) {

            var _settingsObject         = ub.funcs.getMaterialOptionSettingsObject(name.toTitleCase());
            var _materialOptions        = ub.funcs.getMaterialOptions(name.toTitleCase());

            materialOption              = _materialOptions[0];
            outputPatternObject         = ub.funcs.convertPatternObjectForMaterialOption(_patternObject, materialOption);
            _settingsObject.pattern     = outputPatternObject;
            e = _settingsObject;

            ub.generate_pattern(e.code, e.pattern.pattern_obj, e.pattern.opacity, e.pattern.position, e.pattern.rotation, e.pattern.scale);
        });
    },

    changePattern: function(currentPart, patternID)
    {
        var _patternID = patternID.toString();
        var _currentPart = currentPart;
        var _patternObject = _.find(ub.data.patterns.items, {id: _patternID.toString()});
        var color_palette = ColorPalette.funcs.getConfigurationPerTab("pattern");

        _.each (_patternObject.layers, function (layer) {

            var color = color_palette[layer.layer_no - 1];

            if (typeof color !== 'undefined')
            {
                // Assign New Team Color if not just use default
                layer.default_color = color.hex_code;
            }
        });

        var _modifier                   = ub.funcs.getModifierByIndex(ub.current_part);
        var _names                      = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial      = _names[0].toTitleCase();

        _.each(_names, function (name) {

            var _settingsObject         = ub.funcs.getMaterialOptionSettingsObject(name.toTitleCase());
            var _materialOptions        = ub.funcs.getMaterialOptions(name.toTitleCase());

            materialOption              = _materialOptions[0];
            outputPatternObject         = ub.funcs.convertPatternObjectForMaterialOption(_patternObject, materialOption);
            _settingsObject.pattern     = outputPatternObject;
            e = _settingsObject;

        });

        this.clearPatternUI();
        this.activatePatterns();
    },

    setMaterialOptionPatternColor: function(materialOption, colorOBJ, layerID, patternObj)
    {
        var _materialOption = materialOption;
        var _colorOBJ = colorOBJ;
        var _layerID = layerID;
        var _patternObj = patternObj;
        var _layerObj = _.find(_patternObj.layers, {layer_no: layerID.toString()});
        var _tintColor = ub.funcs.hexCodeToTintColor(_colorOBJ.hex_code);
        var _modifier = ub.funcs.getModifierByIndex(ub.current_part);
        var _names = ub.funcs.ui.getAllNames(_modifier.name);

        var canvas = ub.data.previewCanvas;
        var oImg = ub.data.previewContainer[_layerID];

        _layerObj.color = _tintColor;
        _layerObj.color_code = colorOBJ.color_code;
        _layerObj.default_color = colorOBJ.hex_code;

        delete oImg.filters[0];

        oImg.filters.push(new fabric.Image.filters.Tint({
            color: "#" + _colorOBJ.hex_code,
            opacity: 1,
        }));

        oImg.applyFilters(canvas.renderAll.bind(canvas));
        canvas.renderAll();
    },

    activatePatterns: function() {
        var _modifier = ub.funcs.getModifierByIndex(ub.current_part);

        if (typeof _modifier === 'undefined')
        {
            return false;
        }

        ub.funcs.deactivateMoveTool();

        var _names = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial = _names[0].toTitleCase();
        var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
        var _materialOptions = ub.funcs.getMaterialOptions(titleNameFirstMaterial);

        var _returnValue = false;

        if (_settingsObject.has_pattern === 1)
        {
            ub.funcs.deActivateColorPickers ();
            ub.funcs.deActivateApplications();

            var firstMaterialOption = _materialOptions[0];
            var patternObject = _settingsObject.pattern;

            if (typeof patternObject === 'undefined')
            {
                _returnValue = false;
                return _returnValue;
            }
            else
            {
                this.createPatternUI(patternObject);
                if (patternObject.pattern_id === "blank" || patternObject.pattern_id === "none")
                {
                    return false;
                }

                return true;
            }
        }
        else
        {
            _returnValue = false;
            return _returnValue;
        }
    },

    onApplyChanges: function() {
        var _this = this;
        $(".footer-button").on('click', '.apply-pattern-color', function(event) {
            event.preventDefault();
            /* Act on the event */
            var modifierObject = _.find(ub.data.modifierLabels, {index: ub.current_part});
            _this.applyChangesInMainCanvas(modifierObject.fullname);
        });
    },

    applyChangesInMainCanvas: function(index) {
        // Get modifier Label
        var patternColors = this.getPatternColors(index)
        // Set Material Option
        if (patternColors.length > 0) {
            _.map(patternColors, function(index) {
                ub.funcs.setMaterialOptionPatternColor(index.materialOption, index.color, index.layerID, index.patternObj)
            });
        }

        if (_.size(ub.data.logos) !== 0) {
            LogoPanel.utilities.reInitiateLogo();
        }
        UIkit.modal("#modal-edit-palette-pattern").hide();
    },

    createPatternUI: function(patternObject) {
        setTimeout(this.createPatternPreview(patternObject), 1000);
    },

    clearPatternUI: function() {
        $('div#patternNewUI').remove();
    },

    createPatternPreview: function(inputPattern) {
        var _inputPattern       = inputPattern;
        var _patternObj         = inputPattern.pattern_obj;
        var _patternName        = _patternObj.name;
        var $patternContainer   = $('canvas#patternPreview');
        var canvas              = new fabric.Canvas('patternPreview');
        var context             = canvas.getContext("2d");
        ub.data.previewCanvas   = canvas;

        canvas.setHeight(150);
        canvas.setWidth(150);

        _.each(_patternObj.layers, function (layer) {

            var _layer_no       = layer.layer_no;
            var _filename       = layer.filename;
            var _defaultColor   = layer.color;
            var _color          = "#" + util.padHex((_defaultColor).toString(16),6);
            var _localName      = "/images/patterns/" + _patternName + "/" + _layer_no + ".png";

            fabric.Image.fromURL(_localName, function (oImg) {
                ub.data.previewContainer[_layer_no] = oImg;

                oImg.selectable     = true;
                oImg.lockMovementX  = true;
                oImg.lockMovementY  = true;
                oImg.hasControls    = false;

                canvas.add(oImg);

                if(_inputPattern.pattern_id !== "none" && _inputPattern.pattern_id !== "blank") {
                    oImg.filters.push(new fabric.Image.filters.Tint({
                        color: _color,
                        opacity: 1,
                    }));

                    oImg.applyFilters(canvas.renderAll.bind(canvas));
                }

                oImg.hoverCursor = 'pointer';
                canvas.renderAll();
           });
        });

        var bg = new fabric.Rect({
            fill: '#333333',
            scaleY: 0.5,
            originX: 'center',
            originY: 'center',
            rx: 5,
            ry: 5,
            width: 150,
            height: 50,
            opacity: 0.5,
        });

        var group   = new fabric.Group([bg], {
            left: 28,
            top: 254,
        });

        group.selectable    = true;
        group.hasControls   = false;
        group.lockMovementX = true;
        group.lockMovementY = true;
        group.hasBorders    = false;
        group.hoverCursor   = 'pointer';

        ub.data.patternToolTip = group;
        canvas.add(ub.data.patternToolTip);

        ub.data.patternToolTip.bringToFront();

        ub.data.currentPatternLayer = 0; // 0 is Pattern Preview
    },

    applyTeamColorOnPattern(index, layerCount, patternObj, materialOption) {
        var color_palette = ColorPalette.funcs.getConfigurationPerTab("pattern");

        for (var i = 1; i <= layerCount; i++) {
            var colorOBJ = color_palette[i - 1];
            if (typeof colorOBJ !== "undefined") {
                var color_id = colorOBJ ? colorOBJ.id : null;
                var color_label = colorOBJ ? colorOBJ.color_code : null;
                this.setPatternColor(index, i, colorOBJ, patternObj, materialOption);
                this.loadSelectedColor(i, color_id, color_label);
            }
        }
    },

    getCurrentMaterialOptions: function() {
        // Get Material Option
        var _modifier = ub.funcs.getModifierByIndex(ub.current_part);
        var _names = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial = _names[0].toTitleCase();
        var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
        var _materialOptions = ub.funcs.getMaterialOptions(titleNameFirstMaterial);
        var firstMaterialOption = _materialOptions[0];

        return firstMaterialOption;
    },

    getCurrentPatternObject: function(index = null) {

        var current_part = index ? index : ub.current_part
        var _modifier = ub.funcs.getModifierByIndex(current_part);
        var _names = ub.funcs.ui.getAllNames(_modifier.name);
        var titleNameFirstMaterial = _names[0].toTitleCase();
        var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
        var pattern = _settingsObject.pattern;
        var _patternObj = pattern.pattern_obj;

        return _patternObj;
    },

    loadSelectedColor: function(index, colorID, colorLabel) {
        _.delay(function() {
            var color = $("li.pattern-color-main-container-"+ index + " .pattern-color-button-container .pattern-color-selector-button[data-color-id='"+ colorID +"']");
            color.html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-fc-white cp-check-color-font-size"></span>');
            color.addClass('active-pattern-color');
            if (colorLabel === 'W'
                || colorLabel === 'Y'
                || colorLabel === 'CR'
                || colorLabel === 'S'
                || colorLabel === 'PK'
                || colorLabel === 'OP'
                || colorLabel === 'SG'
            ) {
                color.html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-colors"></span>');
            }

        }, 500);
    },

    loadBlankPattern: function(index) {
        var blank = _.find(ub.data.patterns.items, {name: "Blank"});
        if (typeof blank !== "undefined") {
            this.createPatternPreviewFromPatternPicker(index, blank.id);
        } else {
            console.log("Blank Pattern is undefined");
        }
    }
}