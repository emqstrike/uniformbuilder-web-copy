/**
 * InsertPanel.js
 * - handle color & pattern behavior
 * @since October 31, 2018
 * @authors
 * - Romack Natividad <romack@qstrike.com>
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 */

function InsertPanel(element, inserts) {
    this.panel = document.getElementById(element);
    this.inserts = inserts;
    this.items = {
        inserts: this.inserts,
        patterns: _.sortBy(ub.data.patterns.items, "sortID")
    };

    this.initColorPalette();
}

InsertPanel.prototype = {
    constructor: InsertPanel,

    initColorPalette: function () {
        var configuration = ub.data.palleteConfiguration.getColorPaletteConfiguration(ub.config.blockPattern, ub.config.brand, ub.config.uniform_application_type, ub.config.type);
        var insert = configuration.colors.insert;

        switch (insert) {
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
    }
}
