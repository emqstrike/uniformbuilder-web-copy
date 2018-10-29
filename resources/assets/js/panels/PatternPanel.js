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
    this.items = {
        patterns: ub.data.patterns
    };
}

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

    onSelect: function() {
        let _this = this;
        let DEFAULTPATTERNID = 33;
        $(".pattern-container-button").on('click', '.pattern-selector-button', function(event) {
            // Get Modifier category and index
            let modifier_category = $(this).data("modifier-category");
            let modifier_index = $(this).data("modifier-index");

            // Find the selected pattern / And remove check icon and active pattern class
            let selected_pattern = $(".pattern-main-container-" + modifier_category).find('.active-pattern');

            if (selected_pattern.data('pattern-id') === $(this).data("pattern-id"))
            {
                selected_pattern.removeClass('active-pattern');
                selected_pattern.html("");

                ub.current_part = modifier_index;
                let _id = $(this).data("pattern-id");

                _this.createPatternPreviewFromPatternPicker(ub.current_part, DEFAULTPATTERNID);

                $(".edit-pattern-modal-container-"  + modifier_category).html("");
            }
            else
            {
                selected_pattern.removeClass('active-pattern');
                selected_pattern.html("");

                // Empty the Edit pattern button and Show the button
                $(".edit-pattern-modal-container-"  + modifier_category).html("");
                $(".edit-pattern-modal-container-"  + modifier_category).html("<button class='edit-pattern-modal-button' data-modifier-index='" + modifier_index +"' data-modifier-category='"+ modifier_category +"'>Edit pattern color</button>");

                $(this).html('<div class="cp-check-background cp-background-cover"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
                $(this).addClass('active-pattern');
            }

        });
    },

    onOpenModalPatternModifier: function() {
        let _this = this;
        $(".pattern-modal-selector-container").on('click', '.edit-pattern-modal-button', function(event) {
            event.preventDefault();
            // Get the current modifier index
            var _modifier_index = $(this).data('modifier-index');
            var _modifier_category = $(this).data('modifier-category');
            ub.current_part = _modifier_index;

            // Get the data of the pattern
            var selected_pattern = $(".pattern-main-container-" + _modifier_category + " .pattern-container-button").find(".active-pattern");
            var _id = selected_pattern.data("pattern-id");
            var _pattern_name = selected_pattern.data("pattern-name");

            // Append Pattern Name
            $(".modal-pattern-name").text(_pattern_name);

            // Get Pattern Object
            var _modifier = ub.funcs.getModifierByIndex(ub.current_part);
            var _names = ub.funcs.ui.getAllNames(_modifier.name);
            var titleNameFirstMaterial = _names[0].toTitleCase();
            var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
            var pattern = _settingsObject.pattern;
            var _patternObj = pattern.pattern_obj;

            // Get layers count
            var _layerCount = _.size(_patternObj.layers);
            console.log("Layers", _patternObj.layers)
            console.log(_layerCount);

            // Change current pattern in current part
            _this.changePattern(ub.current_part, _id);

            // Render Mustache
            var pattern_colors_element = document.getElementById("m-tab-patterns-colors");
            var render_pattern_colors = Mustache.render(
                pattern_colors_element.innerHTML,
                {
                    colors: ub.current_material.settings.team_colors,
                    modifier_category: _modifier_category
                }
            );

            // Render Pattern Color
            $("#pattern-color-tab-content .tab-content .tab-pane .pattern-color-button-container").html("");
            $("#pattern-color-tab-content .tab-content .tab-pane .pattern-color-button-container").html(render_pattern_colors);

            if ($(".pattern-color-categories li.active")) {
                $(".pattern-color-categories li").removeClass('active');
                $(".pattern-color-categories li a.pattern-color-selector").removeClass('cp-button-active');
                $(".pattern-color-categories li").first().addClass('active');
                $(".pattern-color-categories li").first().find(".pattern-color-selector").addClass('cp-button-active');
            }

            if ($(".pattern-color-categories li div.cp-add-cursor-no-drop").length > 0) {
                $(".pattern-color-categories li div.cp-add-cursor-no-drop").removeClass("cp-add-cursor-no-drop");
                $(".pattern-color-categories li a.pattern-color-selector").removeClass("cp-pointers-event-none")
            }

            switch (_layerCount) {
                case 1:
                    console.log("Case 1");
                    $(".pattern-color-categories .pattern-category-2").addClass('cp-pointers-event-none');
                    $(".pattern-color-categories .pattern-category-3").addClass('cp-pointers-event-none');
                    $(".pattern-color-categories .pattern-category-4").addClass('cp-pointers-event-none');
                    $(".pattern-color-categories .pattern-category-2").parent().addClass('cp-add-cursor-no-drop');
                    $(".pattern-color-categories .pattern-category-3").parent().addClass('cp-add-cursor-no-drop');
                    $(".pattern-color-categories .pattern-category-4").parent().addClass('cp-add-cursor-no-drop');
                    break;
                case 2:
                    console.log("Case 2");
                    $(".pattern-color-categories .pattern-category-3").addClass('cp-pointers-event-none');
                    $(".pattern-color-categories .pattern-category-4").addClass('cp-pointers-event-none');
                    $(".pattern-color-categories .pattern-category-3").parent().addClass('cp-add-cursor-no-drop');
                    $(".pattern-color-categories .pattern-category-4").parent().addClass('cp-add-cursor-no-drop');
                    break;
                case 3:
                    console.log("Case 3");
                    $(".pattern-color-categories .pattern-category-4").addClass('cp-pointers-event-none');
                    $(".pattern-color-categories .pattern-category-4").parent().addClass('cp-add-cursor-no-drop');
                    break;
            }

            $('#pattern-change-color').modal('show');
        });
    },

    onChangeColorPaternCategory: function() {
        $(".pattern-color-categories .pattern-color-item").on('click', '.pattern-color-selector', function(event) {
            event.preventDefault();
            /* Act on the event */
            var selected_category = $(".pattern-color-categories").find(".cp-button-active");
            selected_category.removeClass('active-color-pattern-category');
            selected_category.removeClass('cp-button-active');

            $(this).addClass('active-color-pattern-category');
            $(this).addClass('cp-button-active');

        });
    },

    onSelectColorPerCategory: function() {
        var _this = this;
        $(".pattern-color-button-container").on('click', '.pattern-color-selector-button', function(event) {
            /* Act on the event */
            var active_pattern_color_category = $("#pattern-color-tab-content .tab-content").find('.tab-pane.active').data("pattern-category");
            var category_modifier = $(this).data('modifier-category');
            var selected_color = $(".pattern-color-main-container-" + active_pattern_color_category).find('.active-pattern-color');
            selected_color.removeClass('active-pattern-color');
            selected_color.html("");

            // Get Material Option
            var _modifier = ub.funcs.getModifierByIndex(ub.current_part);
            var _names = ub.funcs.ui.getAllNames(_modifier.name);
            var titleNameFirstMaterial = _names[0].toTitleCase();
            var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);
            var _materialOptions = ub.funcs.getMaterialOptions(titleNameFirstMaterial);
            var firstMaterialOption = _materialOptions[0];

            // Get Color Object
            var _colorID = $(this).data('color-id');
            var _colorOBJ = _.find(_colorSet, {id: _colorID.toString()});

            // Layer
            var layerID = active_pattern_color_category;

            // pattern Object
            var pattern = _settingsObject.pattern;
            var _patternObj = pattern.pattern_obj;

            _this.setMaterialOptionPatternColor(firstMaterialOption, _colorOBJ, layerID, _patternObj);

            var colorLabel = $(this).data("color-label");

            $(this).html('<span class="fa fa-check fa-2x cp-margin-remove cp-padding-remove"></span>');
            $(this).addClass('active-pattern-color');

            if (colorLabel === 'W' ||
                colorLabel === 'Y' ||
                colorLabel === 'CR'||
                colorLabel === 'S' ||
                colorLabel === 'PK'||
                colorLabel === 'OP'||
                colorLabel === 'SG'
            ) {
                $(this).css('color', '#3d3d3d');
                $(this).css('text-shadow', '1px 1px #d7d7d7');
            }
        });
    },

    createPatternPreviewFromPatternPicker: function(currentPart, patternID) {
        var _patternID                  = patternID.toString();
        var _currentPart                = currentPart;
        var _patternObject              = _.find(ub.data.patterns.items, {id: _patternID.toString()});

        _.each (_patternObject.layers, function (layer) {

            var team_color = ub.funcs.getTeamColorObjByIndex(layer.team_color_id);

            if (typeof team_color !== 'undefined')
            {
                // Assign New Team Color if not just use default
                layer.default_color = team_color.hex_code;
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

        _.each (_patternObject.layers, function (layer)  {

            var team_color = ub.funcs.getTeamColorObjByIndex(layer.team_color_id);

            if (typeof team_color !== 'undefined') {
                layer.default_color = team_color.hex_code; // Assign New Team Color if not just use default
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

        ub.funcs.clearPatternUI();
        this.activatePatterns();
    },

    setMaterialOptionPatternColor: function(materialOption, colorOBJ, layerID, patternObj)
    {
        var _materialOption     = materialOption;
        var _colorOBJ           = colorOBJ;
        var _layerID            = layerID;
        var _patternObj         = patternObj;
        var _layerObj           = _.find(_patternObj.layers, {layer_no: layerID.toString()});
        var _tintColor          = ub.funcs.hexCodeToTintColor(_colorOBJ.hex_code);
        var _modifier           = ub.funcs.getModifierByIndex(ub.current_part);
        var _names              = ub.funcs.ui.getAllNames(_modifier.name);

        var canvas              = ub.data.previewCanvas;
        var oImg                = ub.data.previewContainer[_layerID];

        _layerObj.color         = _tintColor;
        _layerObj.color_code    = colorOBJ.color_code;
        _layerObj.default_color = colorOBJ.hex_code;

        delete oImg.filters[0];

        oImg.filters.push(new fabric.Image.filters.Tint({
            color: "#" + _colorOBJ.hex_code,
            opacity: 1,
        }));

        oImg.applyFilters(canvas.renderAll.bind(canvas));
        canvas.renderAll();

        setTimeout(function() {
            var _dUrl = canvas.toDataURL();

            _.each(_patternObj.layers, function (l) {
                $('svg#svg_pcw' + l.layer_no + ' > defs > pattern > image').attr('xlink:href', _dUrl);
            });
        }, 50);
    },

    activatePatterns: function()
    {
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
                ub.funcs.createPatternUI(patternObject, firstMaterialOption);

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
    }
}