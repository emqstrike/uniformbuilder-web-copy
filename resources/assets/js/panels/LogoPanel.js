function LogoPanel() {}

LogoPanel = {
    events: {
        is_init_events_called: 0,

        init: function() {
            if (LogoPanel.events.is_init_events_called === 0) {
                $(".modifier_main_container").on('click', '#primary_option_logo .logo-perspective-btn-container .logo-perspective-selector', LogoPanel.events.onClickLogoPerspective);
                LogoPanel.events.is_init_events_called = 1;
            }
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
        }
    }
}

LogoPanel.prototype = {
    constructor: LogoPanel,
};