$(document).ready(function($) {
    ub.funcs.initHSELLogo = function() {
        if (ub.config.isFromHSEL) {
            $("#navbar-header").append('<a class="navbar-brand btn" style="padding: 21px 20px 20px 10px !important;"><img src="https://pngimage.net/wp-content/uploads/2018/06/x-image-png-4.png" style="height: 20px; width: 20px;"></a>');
            $("#navbar-header").append('<a class="navbar-brand btn" id="hsel-logo" href="javascript:void(0)"><img src="/images/hsel/logo.png" class="hsel-logo"></a>');
            $(".navbar-brand.btn.dropdown-toggle").css('min-width', '0');

            $(".main-picker-items[data-item='Men'").trigger("click");
            _.delay(function() {
                $('.main-picker-items.apparel.grow[data-item="eSports"]').trigger("click");
            }, 100)

            $('a#hsel-logo').on('click', function(event) {
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