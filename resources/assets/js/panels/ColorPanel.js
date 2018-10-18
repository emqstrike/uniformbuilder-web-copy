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

    getTeamColor: function() {
        return this.team_colors;
    },

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, this.items);
        return panel;
    },

    onSelect: function() {
        $(".color-main-container .color-container-button").on('click', '.color-selector-button', function(event) {
            var color = $(this).data('color-name');

            $(this).html('<span class="fa fa-check fa-2x cp-fc-black"></span>');
            $(this).addClass('active-color');
            console.log(color)
        });
    }

}