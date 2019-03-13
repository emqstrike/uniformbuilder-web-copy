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

function PartPanel(element, parts, inserts) {
    this.panel = document.getElementById(element);
    this.parts = parts;
    this.inserts = inserts;
    this.items = {
        inserts: this.inserts,
        parts: this.parts,
        patterns: ub.funcs.getPatternList()
    };
}

PartPanel.prototype = {
    constructor: PartPanel,

    getPanel: function() {
        var rendered = Mustache.render(this.panel.innerHTML, this.items);
        return rendered;
    }
}