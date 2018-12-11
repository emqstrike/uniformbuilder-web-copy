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

    this.initColorPalette();
}

PartPanel.prototype = {
    constructor: PartPanel,

    initColorPalette: function () {
        var configuration = ub.data.palleteConfiguration.getColorPaletteConfiguration(ub.config.blockPattern, ub.config.brand, ub.config.uniform_application_type, ub.config.type);
        var base = configuration.colors.base;

        switch (base) {
            case "Palette 1":
                this.items.color_palette = ub.data.firstColorPalette;
                break;
            case "Palette 2":
                this.items.color_palette = ub.data.secondaryColorPalette;
                break;
            case "Palette 3":
                this.items.color_palette = ub.data.tertiaryColorPalette;
                break;
        }
    },

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