$(document).ready(function () {
    
    ub.funcs.ui.resize  = function () {

        console.clear();
        console.log('Width: ' + $(window).width());
        console.log('Height: ' + $(window).height());

    };

    $(window).resize(function() {

        ub.funcs.ui.resize();
          
    });

});