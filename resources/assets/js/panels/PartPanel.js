/**
 * PartPanel.js
 * - handle color & pattern behavior
 * @since October 18, 2018
 * @authors
 * - Romack Natividad <romack@qstrike.com>
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 */

function PartPanel(element, parts) {
    this.panel = document.getElementById(element);
    this.parts = parts;
    this.colors = new ColorPanel(null),
    this.patterns = new PatternPanel(null),
    this.isBindEvents = 0;
    this.items = {
        parts: this.parts,
        patterns: _.sortBy(ub.data.patterns.items, "sortID")
    };
}

PartPanel.prototype = {
    constructor: PartPanel,

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
    },

    // Set Pattern Tooltips
    setTooltips: function() {
        if ($('.tippy-pattern-name').length) {
            // Tooltip for panels
            tippy('.tippy-pattern-name', {
                delay: 0,
                size: 'large',
                animation: 'shift-away'
            });
        }
    }
}