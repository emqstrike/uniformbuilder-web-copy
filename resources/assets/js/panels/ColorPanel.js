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
        $(".color-container-button").on('click', '.color-selector-button', function(event) {
            var colorLabel = $(this).data("color-label");
            var modifier_category = $(this).data("modifier-category");
            var _modifier_name = $(".color-main-container-" + modifier_category).data('modifier-name');

            var selected_color = $(".color-main-container-" + modifier_category).find('.active-color');
            selected_color.removeClass('active-color');
            selected_color.html("");

            $(this).html('<span class="fa fa-check fa-1x cp-margin-remove cp-padding-remove"></span>');
            $(this).addClass('active-color');

            if (colorLabel === 'W'
                || colorLabel === 'Y'
                || colorLabel === 'CR'
                || colorLabel === 'S'
                || colorLabel === 'PK'
                || colorLabel === 'OP'
                || colorLabel === 'SG'
            ) {
                $(this).css('color', '#3d3d3d');
                $(this).css('text-shadow', '1px 1px #d7d7d7');
            }

            // Retrieve Color Object
            var color_id = $(this).data('color-id');
            var color = _.find(ub.funcs.getBaseColors(), {id: color_id.toString()});

            // Apply the color to the Canvas
            ub.funcs.ui.setMaterialOptionColor(_modifier_name, color);
        });
    }

}