 $( document ).ready(function() {

    window.ub = {};

    /* UI Objects */

    ub.active = null;


    $('div#right-sidebar > a.sidebar-buttons').on('click', function(e){
       
        console.log('test');
        if(ub.active !== null){

            $(ub.active).removeClass('active_button');

        }    
        
        ub.active = $(this);
        ub.active.addClass('active_button');

        return false;

    }); 


 });   

