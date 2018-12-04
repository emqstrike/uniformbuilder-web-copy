/**
 * Accent.js
 * - Modifier switcher
 * @since November 22, 2018
 * @author Romack Natividad <romack@qstrike.com>
 *
 * Required:
 *  jQuery
 *
 * Usage:
 * accent = new Accent();
 * accent.
 */

function Accent(accent_object) {
    this.accent_object = accent_object;
}

Accent.prototype = {
    constructor: Accent,

    find: function(accent_id) {
        var accent = _.find(ub.data.accents.items, {
            id: parseInt(accent_id)
        });
        this.set_accent(accent); 
        return accent;
    },

    setAccent: function(accent) {
        this.accent_object = accent;
    },

    getLayer: function(layer_number) {
        var layer = _.find(this.accent_object, {
            layer_no: layer_number
        });
        return layer;
    }
};