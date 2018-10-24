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
        var panel = Mustache.render(this.panel.innerHTML, this.items);
        return panel;
    },

    onSelect: function() {
        $(".pattern-container-button").on('click', '.pattern-selector-button', function(event) {
            // Get Modifier category and index
            var modifier_category = $(this).data("modifier-category");
            var modifier_index = $(this).data("modifier-index");

            // Find the selected pattern / And remove check icon and active pattern class
            var selected_pattern = $(".pattern-main-container-" + modifier_category).find('.active-pattern');
            selected_pattern.removeClass('active-pattern');
            selected_pattern.html("");

            // Empty the Edit pattern button and Show the button
            $(".edit-pattern-modal-container-"  + modifier_category).html("");
            $(".edit-pattern-modal-container-"  + modifier_category).html("<button class='edit-pattern-modal-button' data-modifier-index='" + modifier_index +"' data-modifier-category='"+ modifier_category +"'>Edit pattern color</button>");

            $(this).html('<div class="cp-check-background cp-background-cover"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
            $(this).addClass('active-pattern');
        });
    },

    onOpenModalPatternModifier: function() {
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

            $(".modal-pattern-name").text(_pattern_name);
            ub.funcs.changePatternFromPopup(ub.current_part, _id);

            // Get Pattern Object
            var _modifier = ub.funcs.getModifierByIndex(ub.current_part);
            var _names = ub.funcs.ui.getAllNames(_modifier.name);
            var titleNameFirstMaterial = _names[0].toTitleCase();
            var _settingsObject = ub.funcs.getMaterialOptionSettingsObject(titleNameFirstMaterial);

            var pattern = _settingsObject.pattern;
            var _patternObj = pattern.pattern_obj;
            var _layerCount = _.size(_patternObj.layers);

            switch (_layerCount) {
                case 1:
                    $(".pattern-color-categories .pattern-category-2").css('pointer-events', 'none');
                    $(".pattern-color-categories .pattern-category-2").parent().addClass('cp-add-cursor-no-drop');
                    $(".pattern-color-categories .pattern-category-3").css('pointer-events', 'none');
                    $(".pattern-color-categories .pattern-category-3").parent().addClass('cp-add-cursor-no-drop');
                    $(".pattern-color-categories .pattern-category-4").css('pointer-events', 'none');
                    $(".pattern-color-categories .pattern-category-4").parent().addClass('cp-add-cursor-no-drop');
                    break;
                case 2:
                    $(".pattern-color-categories .pattern-category-3").css('pointer-events', 'none');
                    $(".pattern-color-categories .pattern-category-3").parent().addClass('cp-add-cursor-no-drop');
                    $(".pattern-color-categories .pattern-category-4").css('pointer-events', 'none');
                    $(".pattern-color-categories .pattern-category-4").parent().addClass('cp-add-cursor-no-drop');
                    break;
                case 3:
                    $(".pattern-color-categories .pattern-category-4").css('pointer-events', 'none');
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
        $(".pattern-color-button-container").on('click', '.pattern-color-selector-button', function(event) {
            /* Act on the event */
            var active_pattern_color_category = $("#pattern-color-tab-content .tab-content").find('.tab-pane.active').data("pattern-category");

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

            ub.funcs.setMaterialOptionPatternColor(firstMaterialOption, _colorOBJ, layerID, _patternObj);

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
    }

}