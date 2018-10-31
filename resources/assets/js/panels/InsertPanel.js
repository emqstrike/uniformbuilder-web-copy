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
        colors: ub.current_material.settings.team_colors,
        patterns: _.sortBy(ub.data.patterns.items, "sortID")
    };
}

InsertPanel.prototype = {
    constructor: InsertPanel,

    getPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML, this.items);
        return rendered;
    },
}