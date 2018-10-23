/**
 * PerspectiveController.js
 * - Ha
 * @since October 23, 2018
 * @authors
 * - Romack Natividad <romack@qstrike.com>
 */

function PerspectiveController() {}

PerspectiveController.prototype.setPerspective = function(perspective) {
    $('a.change-view[data-view="' + perspective + '"]').trigger('click');
}

PerspectiveController.prototype.front = function() {
    this.setPerspective('front');
}

PerspectiveController.prototype.back = function() {
    this.setPerspective('back');
}

PerspectiveController.prototype.right = function() {
    this.setPerspective('right');
}

PerspectiveController.prototype.left = function() {
    this.setPerspective('left');
}