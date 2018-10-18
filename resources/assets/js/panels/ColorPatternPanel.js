/**
 * ColorPatternPanel.js
 * - handle color & pattern behavior
 * @since October 18, 2018
 * @author Romack Natividad <romack@qstrike.com>
 *
 * Requirements:
 * - jQuery
 * - Mustache
 *
 * Usage:
 *
 */

function ColorPatternPanel(element, modifier) {
    this.panel = document.getElementById(element);
    this.items = {
        modifier: modifier,
        colors: ub.data.colors,
        patterns: ub.data.patterns.items
    };
}

ColorPatternPanel.prototype = {
    constructor: ColorPatternPanel,

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