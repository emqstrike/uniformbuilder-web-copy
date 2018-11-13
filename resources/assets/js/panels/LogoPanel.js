/**
 * LogoPanel.js
 * - handle logo behavior
 * @since November 13, 2018
 * @authors
 * - Aron Joshua Bagtas <aaron@qstrike.com>
 * Requirements:
 * - jQuery
 * - Mustache
 */

function LogoPanel(element) {
    this.panel = document.getElementById(element);
    this.bindEvents();
}

LogoPanel.prototype = {
    constructor: LogoPanel,

    init: function() {
        $(".modifier_main_container").on('click', '#primary_option_logo .logo-perspective-btn-container .logo-perspective-selector', this.onClickLogoPerspective);
    },

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML);
        return panel;
    },

    onClickLogoPerspective: function() {
        $(".logo-perspective-btn-container button").removeClass('cp-button-active');

        var view = $(this).data("perspective");
        $('a.change-view[data-view="' + view + '"]').trigger('click');

        var image = ub.getThumbnailImage(ub.active_view + "_view");

        $("#logo-preview").css({
            'background-image': "url("+ image +")"
        });

        $(this).addClass('cp-button-active');
    },

    bindEvents: function() {
        this.init();
    }
};



