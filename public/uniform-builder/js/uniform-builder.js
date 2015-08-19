 $( document ).ready(function() {

    window.ub = {};

    /* UI Objects */

    ub.active = null;


    function switch_panel(panel){

        $('.option_panel').hide();
        $(panel).fadeIn();

    }

    $('div#right-sidebar > a.sidebar-buttons').on('click', function(e){
       
        
        if(ub.active !== null){

            filename = '/images/sidebar/' + ub.active.data('filename') + '.png';
            ub.active.find('img').attr('src', filename)
            ub.active.removeClass('active_button');

        }    
        
        ub.active = $(this);
        filename = '/images/sidebar/' + ub.active.data('filename') + '-on' + '.png';
        
        ub.active.find('img').attr('src', filename)
        ub.active.addClass('active_button');

        return false;

    }); 


 });   

