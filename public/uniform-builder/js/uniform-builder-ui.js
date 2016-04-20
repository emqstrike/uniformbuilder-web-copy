$(document).ready(function () {
    
    ub.funcs.ui.resize  = function () {

        console.clear();
        console.log('Width: ' + $(window).width());
        console.log('Height: ' + $(window).height());

        var w = window.innerWidth;
        var h = window.innerHeight;

        ub.renderer.resize(w,h);
        ub.renderer.view.style.width = w + "px";
        ub.renderer.view.style.height = h + "px";

    };

    $(window).resize(function() {

        ub.funcs.ui.resize();
          
    });

});