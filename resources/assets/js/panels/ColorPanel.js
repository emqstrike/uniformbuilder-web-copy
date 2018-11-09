/**
 * ColorPanel.js
 * - handle color behavior
 * @since October 17, 2018
 * @authors
 * - Romack Natividad <romack@qstrike.com>
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 */

function ColorPanel(element) {
    this.panel = document.getElementById(element);
    this.items = {
        colors: ub.current_material.settings.team_colors
    };
}

ColorPanel.prototype = {
    constructor: ColorPanel,

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, this.items);
        return panel;
    },

    onSelect: function() {
        var _this = this;
        $(".color-container-button").on('click', '.color-selector-button', function(event) {
            var colorLabel = $(this).data("color-label");
            var modifier_category = $(this).data("modifier-category");
            var _modifier_name = $(".color-main-container-" + modifier_category).data('modifier-name');

            console.log("Modifier: ", modifier_category);

            var selected_color = $(".color-main-container-" + modifier_category).find('.active-color');
            selected_color.removeClass('active-color');
            selected_color.html("");

            // Set Perspective
            var perspective = new PerspectiveController();

            if (modifier_category.includes("front") || modifier_category.includes("chest")) {

                perspective.front();

            } else if (modifier_category.includes("back")) {

                perspective.back();

            } else if (modifier_category.includes("left")) {

                if (ub.config.option !== "Long Sleeves" && ub.config.blockPattern !== "Cage Jackets") {
                    perspective.left();
                }

            } else if (modifier_category.includes("right")) {

                if (ub.config.option !== "Long Sleeves" && ub.config.blockPattern !== "Cage Jackets") {
                    perspective.right();
                }
            }

            _this.addCheckOnSelectedColor($(this), colorLabel);

            // Retrieve Color Object
            var color_id = $(this).data('color-id');
            var color = _.find(ub.funcs.getBaseColors(), {id: color_id.toString()});

            // Apply the color to the Canvas
            _this.setMaterialOptionColor(_modifier_name, color, "from color picker");
        });
    },

    // Set Color of the Actual Sprite in the stage
    setMaterialOptionColor: function (name, colorObj, source) {

        var _names = ub.funcs.ui.getAllNames(name);
        var _this = this;

        _.each(_names, function (name) {

            _this.setMaterialOptionSettingsColor(name, colorObj, source);
            _this.setMatchingColor(name, colorObj, source);

            if (ub.data.afterLoadCalled !== 1) { return; }

            ub.change_material_option_color16(name, parseInt(colorObj.hex_code, 16));

        });

    },

    // Set Color in the Settings Object
    setMaterialOptionSettingsColor: function (materialOptionCode, colorObj, source) {

        var _type                       = ub.current_material.material.type;
        var _uniformObject              = ub.current_material.settings[_type];
        var _materialOptionObject       = _.find(_uniformObject, {code: materialOptionCode});

        if (typeof _materialOptionObject !== 'undefined') {

            if (_materialOptionObject.color !== parseInt(colorObj.hex_code, 16)) {

                var _oldValue = _materialOptionObject.color;
                var _newValue = parseInt(colorObj.hex_code, 16);

                if (source !== 'from undo') {

                    if (typeof ub.funcs.pushOldState === "undefined") { return; }

                    ub.funcs.pushOldState('color change', 'material option', _materialOptionObject, _materialOptionObject.colorObj, colorObj);

                }

            }

            _materialOptionObject.color     = parseInt(colorObj.hex_code, 16);
            _materialOptionObject.colorObj  = colorObj;

        }
    },

    // Change Matching Part (e.g. for Waistband, Prolook on Compression Pants)
    setMatchingColor: function (materialOptionCode, colorObj, source) {

        var _isCoordinating = ub.data.coordinatingColors.isCoordinating(materialOptionCode.toTitleCase(),
                    ub.config.sport,
                    ub.config.blockPattern,
                    ub.config.option,
                    colorObj.color_code);

        if (_isCoordinating.result)
        {
            var _matchingPartColorObj = ub.funcs.getColorByColorCode(_isCoordinating.matchingPartColor);
            var _matchingPartCode = _isCoordinating.matchingPart.toCodeCase();

            var previousColor = $(".color-main-container-" + _matchingPartCode).find('.active-color');
            // Remove Active color
            if (previousColor.length > 0) {
                previousColor.removeClass('active-color');
                previousColor.html("");
                console.log("Remove active color");
            }

            // Get matching color button
            var matchingColorButton = $(".color-main-container-"+ _matchingPartCode +" .color-container-button .color-selector-button[data-color-id='"+ _matchingPartColorObj.id +"']");

            this.addCheckOnSelectedColor(matchingColorButton, _matchingPartColorObj.color_code)
            this.setMaterialOptionSettingsColor(_matchingPartCode, _matchingPartColorObj, source);

            if (ub.data.afterLoadCalled !== 1)
            {
                return;
            }

            ub.change_material_option_color16(_matchingPartCode, parseInt(_matchingPartColorObj.hex_code, 16));
        }

    },

    addCheckOnSelectedColor: function(element, colorLabel)
    {
        element.html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-fc-white"></span>');
        element.addClass('active-color');

        if (colorLabel === 'W'
            || colorLabel === 'Y'
            || colorLabel === 'CR'
            || colorLabel === 'S'
            || colorLabel === 'PK'
            || colorLabel === 'OP'
            || colorLabel === 'SG'
        ) {
            element.html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-check-colors"></span>');
        }
    }

}