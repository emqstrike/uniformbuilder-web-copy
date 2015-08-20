 $( document ).ready(function() {

    switch_panel('#materials_panel');

    window.ub = {};

    /* UI Objects */

    ub.active = null;


    function switch_panel(panel){

        $('.options_panel').hide();
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
        
        ub.active.find('img').attr('src', filename);  
        ub.active.addClass('active_button');

        switch_panel('#' +  ub.active.data('filename') + '_panel');

        return false;


    }); 


    /* Popover Test */

        $(function(){

            $('[rel="popover"]').popover({
                
                container: 'body',
                html: true,
                content: function () {
                    var clone = $($(this).data('popover-content')).clone(true).removeClass('hide');
                    return clone;
                }

            }).click(function(e) {

                e.preventDefault();

            });

        });

        $('[rel="popover"]').on('shown.bs.popover', function () {

            // Adjust Arrow Position Here

            var pos = '25%';

            $('.popover > div.arrow').css('left', pos);

            console.log($(this));
            
        })


    /* End Popover Test */

        var canvas = new fabric.Canvas('front_view');

        window.objects = {};


         fabric.util.loadImage('/images/builder-assets/jersey-front.png', function (image) {
                    
            materialOption = new fabric.Image(image);

            materialOption.set({

                top: 0,
                left: 0,
                width: 447,
                height: 496,
                angle: 0,
                opacity: 1, 

            })
            window.objects['jersey_front'] = materialOption;
            canvas.add(materialOption).renderAll(); 
                                    
        });

        $('.change-color').on('click', function(e){
          
           var color = $(this).data('color');

            window.objects['jersey_front'].filters = []; 
            window.objects['jersey_front'].applyFilters(canvas.renderAll.bind(canvas));

            var filter = new fabric.Image.filters.Blend({

              mode: 'multiply',
              color: color,
              
            });

            window.objects['jersey_front'].filters.push(filter);
            window.objects['jersey_front'].applyFilters(canvas.renderAll.bind(canvas));

        }); 




 });   

