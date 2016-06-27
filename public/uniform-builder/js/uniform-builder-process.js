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

        $('span.size').on('click', function () {

            var _status = $(this).data('status');
            var _size   = $(this).data('size');

            if (_status === 'off') {

                $(this).addClass('active');
                $(this).data('status', 'on');

            }
            else {

                $(this).removeClass('active');
                $(this).data('status', 'off');

            }

            console.log('Size: ');
            console.log(_size);

            console.log('Status: ');
            console.log(_status);

        });
        
    }

});