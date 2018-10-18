/**
 * PatternPanel.js
 * - handle pattern behavior
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

function PatternPanel(element, items) {
    this.panel = document.getElementById(element);
    this.items = {
        patterns: items
    };
}

PatternPanel.prototype = {
    constructor: PatternPanel,

    setItems: function(items) {
        alert('setting items');
        alert(items.length);
    },

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, this.items);
        return panel;
    },

    onSelect: function() {
        var selected_pattern = $(".pattern");
        selected_pattern.html('<span class="fa fa-check fa-2x cp-fc-white"></span>');
    }

}