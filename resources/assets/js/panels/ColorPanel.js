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

    onSelectLocation: function() {
        var that = this;
        $(".modifier_main_container").on("click", "#primary_options_colors .jersey-location-buttons", function() {
            var fullname = $(this).data("modifier-fullname");
            var name = $(this).data("modifier-name");
            var modifierObject = _.find(ub.data.modifierLabels, {fullname: fullname});
            var currentMaterials = ub.current_material.settings[ub.config.type];

            ub.current_part = modifierObject.index;

            if (typeof modifierObject !== "undefined") {
                var html = ub.utilities.buildTemplateString('#m-parts-modifier', modifierObject);
                $("#primary_options_colors .parts-modifier-panel").html("");
                $("#primary_options_colors .parts-modifier-panel").html(html);

                var materialObject = _.find(currentMaterials, {code: modifierObject.fullname});
                if (typeof materialObject !== "undefined") {
                    var patternObject = materialObject.pattern;
                    var gradientObject = materialObject.gradient;
                    var color_container = $("#primary_options_colors .parts-modifier-panel .color-selector-button[data-color-label='"+ materialObject.colorObj.color_code +"']");
                    if (color_container.length > 0) {
                        that.addCheckOnSelectedColor(color_container, materialObject.colorObj.color_code);
                    }

                    if (patternObject.pattern_id !== "blank" && patternObject.pattern_id !== "") {
                        var patternButton = $("#primary_options_colors .parts-modifier-panel .pattern-selector-button[data-pattern-id='"+ patternObject.pattern_obj.pattern_id +"']");
                        $(".edit-pattern-modal-container-"  + modifierObject.fullname).html("<button class='edit-pattern-modal uk-button uk-button-small uk-button-default uk-text-capitalize' data-modifier-index='" + modifierObject.index +"' data-modifier-category='"+ modifierObject.fullname +"'><i class='fa fa-edit'></i>&nbsp;Edit Pattern Color</button>");
                        patternButton.html('<div class="cp-check-background cp-background-cover"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
                        patternButton.addClass('active-pattern');
                    }

                    if (typeof gradientObject.gradient_id !== "undefined" && gradientObject.gradient_id !== "") {
                        var gradientContainer = $("#primary_options_colors .parts-modifier-panel .gradient-selector-button[data-gradient-name='gradient']");
                        $(".edit-pattern-modal-container-"  + modifierObject.fullname).html("<button class='edit-gradient-modal uk-button-small uk-button uk-button-default uk-text-capitalize' data-modifier-index='" + modifierObject.index +"' data-modifier-category='"+ modifierObject.fullname +"'><i class='fa fa-edit'></i>&nbsp;Edit Gradient Color</button>");
                        gradientContainer.html('<div class="cp-check-background cp-background-cover"><span class="fa fa-check fa-1x cp-pattern-check-medium"></span></div>');
                        gradientContainer.addClass('active-pattern');
                    }

                    if (patternObject.pattern_id !== "blank" && patternObject.pattern_id !== "" || typeof gradientObject.gradient_id !== "undefined" && gradientObject.gradient_id !== "") {
                        UIkit.switcher(".pattern-color-switcher").show(1);
                    }

                    $("#primary_options_colors .jersey-location-buttons.uk-active").removeClass("uk-active");
                    $(this).addClass("uk-active")
                }
            }
        });
    },

    onSelect: function() {
        var _this = this;
        $(".modifier_main_container").on('click', '.parts-modifier-panel .color-selector-button', function(event) {
            var colorLabel = $(this).data("color-label");
            var modifier_category = $(this).data("modifier-category");
            var _modifier_name = $(".color-main-container-" + modifier_category).data('modifier-name');
            var modifier_index = $(".color-main-container-" + modifier_category).data("modifier_index");
            var selected_color = $(".color-main-container-" + modifier_category).find('.active-color');
            selected_color.removeClass('active-color');
            selected_color.html("");

            _this.addCheckOnSelectedColor($(this), colorLabel);

            // Retrieve Color Object
            var color_code = $(this).data('color-label');
            var color = ub.funcs.getColorByColorCode(color_code);
            // Apply the color to the Canvas
            _this.setMaterialOptionColor(_modifier_name, color, "from color picker");

            if (_.size(ub.data.logos) !== 0) {
                LogoPanel.utilities.reInitiateLogo();
            }
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
        var _type = ub.current_material.material.type;
        var _uniformObject = ub.current_material.settings[_type];
        var _materialOptionObject = _.find(_uniformObject, {code: materialOptionCode});

        if (typeof _materialOptionObject !== 'undefined') {
            if (_materialOptionObject.color !== parseInt(colorObj.hex_code, 16)) {
                var _oldValue = _materialOptionObject.color;
                var _newValue = parseInt(colorObj.hex_code, 16);

                if (source !== 'from undo') {
                    if (typeof ub.funcs.pushOldState === "undefined") { return; }
                    ub.funcs.pushOldState('color change', 'material option', _materialOptionObject, _materialOptionObject.colorObj, colorObj);
                }
            }

            _materialOptionObject.color = parseInt(colorObj.hex_code, 16);
            _materialOptionObject.colorObj = colorObj;
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
        element.html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove cp-fc-white cp-check-color-font-size"></span>');
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
    },
}