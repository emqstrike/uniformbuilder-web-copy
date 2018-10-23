/**
 * ColorPatternPanel.js
 * - handle color & pattern behavior
 * @since October 18, 2018
 * @authors
 * - Romack Natividad <romack@qstrike.com>
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *
 */

function ColorPatternPanel(element, modifiers) {
    this.panel = document.getElementById(element);
    this.modifiers = modifiers;
    this.items = {
        modifiers: this.modifiers,
        colors: ub.current_material.settings.team_colors,
        patterns: ub.data.patterns.items
    };
}

ColorPatternPanel.prototype = {
    constructor: ColorPatternPanel,

    getPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML, this.items);
        return rendered;
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