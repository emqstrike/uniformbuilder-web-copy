$(document).ready(function($) {
    ub.funcs.initHSELLogo = function() {
        if (ub.config.styles.isFromHSEL) {
            $("#navbar-header").append('<a class="navbar-brand btn hsel-logo" href="javascript:void(0)"><img src="/images/hsel/logo.png" class="hsel-logo"></a>');
            $(".main-picker-items[data-item='Men'").trigger("click");
            _.delay(function() {
                $('.main-picker-items.apparel.grow[data-item="eSports"]').trigger("click");
            }, 100)

            $('a.hsel-logo').on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                $(".main-picker-items[data-item='Men'").trigger("click");

                _.delay(function() {
                    $('.main-picker-items.apparel.grow[data-item="eSports"]').trigger("click");
                }, 50);
            });
        }
    }
});