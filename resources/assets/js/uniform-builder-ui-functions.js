$(document).ready(function() {
    ub.funcs.changeStageBackgroundColor = function(color) {
        if  (typeof color !== "undefined") {
            ub.renderer.backgroundColor = color;
        }
    },

    ub.funcs.removeApplicationHeader = function() {
        $("#navbar-header").css('display', 'none');
        $("div.user-profile").css('display', 'none');
        $("h1#header_text").css('display', 'none');
    },

    ub.funcs.disbleSidebarLeft = function() {
        $("div#left-side-toolbar").css("display", 'none');
    }
})