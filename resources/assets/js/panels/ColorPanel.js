/**
 * ColorPanel.js
 * - handle color behavior
 * @since October 17, 2018
 * @author Romack Natividad <romack@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *
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
        $(".color-main-container .color-container-button").on('click', '.color-selector-button', function(event) {
            var selected_color = $(".color-main-container").find('.active-color');
            selected_color.removeClass('active-color');
            selected_color.html("");

            $(this).html('<span class="fa fa-check fa-1x cp-color-check cp-margin-remove cp-padding-remove"></span>');
            $(this).addClass('active-color');
        });
    }

}