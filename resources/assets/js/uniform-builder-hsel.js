$(document).ready(function($) {
    ub.funcs.initHSELLogo = function() {
        if (ub.config.styles.isFromHSEL) {
            console.log("Render HSEL LOGO")
            $("#navbar-header").append('<a class="navbar-brand btn" href="https://www.highschoolesportsleague.com/" target="_blank"><img src="/images/hsel/logo.png" height="50em" style="background: black; width: 108px;"></a>');
            $(".main-picker-items[data-item='Men'").trigger("click");
            _.delay(function() {
                $('.main-picker-items.apparel.grow[data-item="eSports"]').trigger("click");
            }, 100)
        }
    }
});