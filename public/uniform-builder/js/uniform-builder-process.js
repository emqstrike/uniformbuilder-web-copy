$(document).ready(function() {

    ub.funcs.fadeOutCustomizer = function () {

        $('div#right-pane-column').fadeOut();        
        $('div#left-pane-column').fadeOut();

        $('div#roster-input').fadeIn();

    }

    ub.funcs.fadeInCustomizer = function () {

        $('div#roster-input').fadeOut();

        $('div#right-pane-column').fadeIn();        
        $('div#left-pane-column').fadeIn();

    }

    ub.funcs.initRoster = function () {

        ub.funcs.fadeOutCustomizer();
    
        $('span.back-to-customizer-button').on('click', function (){

            ub.funcs.fadeInCustomizer();

        });
        
    }

});