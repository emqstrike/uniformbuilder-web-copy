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

    /* Setup Views */


        window.two_d = {};
        window.two_d.objects = {};

        window.two_d.canvas_front = new fabric.Canvas('front_view');
        window.two_d.canvas_back = new fabric.Canvas('back_view');
        window.two_d.canvas_right = new fabric.Canvas('right_view');
        window.two_d.canvas_left = new fabric.Canvas('left_view');
        
        window.two_d.load_base = function(filename, canvas, object_name){

            fabric.util.loadImage(filename, function (image) {
                    
                materialOption = new fabric.Image(image);

                materialOption.set({

                    top: 0,
                    left: 0,
                    width: 447,
                    height: 496,
                    angle: 0,
                    opacity: 1, 

                });

                window.two_d.objects[object_name] = materialOption;
                canvas.add(materialOption).renderAll(); 
                                            
            });

        }


        window.two_d.load_base('/images/builder-assets/jersey-front.png', window.two_d.canvas_front, 'jersey_front')
        window.two_d.load_base('/images/builder-assets/jersey-back.png', window.two_d.canvas_back, 'jersey_back')
        window.two_d.load_base('/images/builder-assets/jersey-right.png', window.two_d.canvas_right, 'jersey_right')
        window.two_d.load_base('/images/builder-assets/jersey-left.png', window.two_d.canvas_left, 'jersey_left');


        $('.change-color').on('click', function(e){
          

           var color = $(this).data('color');

           if(color === "#000000"){ 

                color = "#2f2f2f"; 
                /// Lighter Black, TODO: Fix this

           }

            window.two_d.apply_filters(true);

            var filter = new fabric.Image.filters.Blend({

              mode: 'multiply',
              color: color,
              
            });

            window.two_d.objects['jersey_front'].filters.push(filter);
            window.two_d.objects['jersey_back'].filters.push(filter);
            window.two_d.objects['jersey_left'].filters.push(filter);
            window.two_d.objects['jersey_right'].filters.push(filter);

            window.two_d.apply_filters();
            
        }); 


        window.two_d.apply_filters = function(clear){

            if (clear !== undefined) {

                window.two_d.objects['jersey_front'].filters = []; 
                window.two_d.objects['jersey_back'].filters = []; 
                window.two_d.objects['jersey_left'].filters = []; 
                window.two_d.objects['jersey_right'].filters = []; 

            }    

            var canvas = window.two_d.canvas_front;
            window.two_d.objects['jersey_front'].applyFilters(canvas.renderAll.bind(canvas));

            canvas = window.two_d.canvas_back;
            window.two_d.objects['jersey_back'].applyFilters(canvas.renderAll.bind(canvas));
            
            canvas = window.two_d.canvas_left;
            window.two_d.objects['jersey_left'].applyFilters(canvas.renderAll.bind(canvas));

            canvas = window.two_d.canvas_right;
            window.two_d.objects['jersey_right'].applyFilters(canvas.renderAll.bind(canvas));

            setTimeout(function(){

                window.two_d.refresh_thumbnail_views();

            }, 50);

        }


 
        window.two_d.canvas_front.on('object:added', function(options) {

            window.two_d.refresh_thumbnail_views();

        });

        window.two_d.canvas_back.on('object:added', function(options) {

            window.two_d.refresh_thumbnail_views();

        });

        window.two_d.canvas_left.on('object:added', function(options) {

            window.two_d.refresh_thumbnail_views();

        });

        window.two_d.canvas_right.on('object:added', function(options) {

            window.two_d.refresh_thumbnail_views();

        });



        /// Refresh Thumbnail Views ///

        window.two_d.refresh_thumbnail_views = function(){

            $('a#view_front > img').attr('src', window.two_d.canvas_front.toDataURL('image/png'));
            $('a#view_back > img').attr('src', window.two_d.canvas_back.toDataURL('image/png'));
            $('a#view_left > img').attr('src', window.two_d.canvas_left.toDataURL('image/png'));
            $('a#view_right > img').attr('src', window.two_d.canvas_right.toDataURL('image/png'));

        }


        /// Camera Views

            $('a.change-view').on('click', function(e){

                var view = $(this).data('view');

                $('#front_view').parent().fadeOut();
                $('#back_view').parent().fadeOut();
                $('#left_view').parent().fadeOut();
                $('#right_view').parent().fadeOut();
                
                $('#' + view + '_view').parent().fadeIn(); // fade in the parent container not the actual canvas
                

            });



        /// End Camera Views


    /* End Setup Views */    


    /* Material Composer */


        window.two_d.compose_material(base, pattern_array){


            var material_composer = {};
            var objects = {};

            var canvas_top_layer = new fabric.Canvas('top_layer');
            var canvas_bottom_layer = new fabric.Canvas('bottom_view');

            fabric.util.loadImage(base, function (image) {
                    
                materialOption = new fabric.Image(image);

                materialOption.set({

                    top: 0,
                    left: 0,
                    width: 447,
                    height: 496,
                    angle: 0,
                    opacity: 1, 

                });

                objects[object_name] = materialOption;
                canvas_top_layer.add(materialOption).renderAll(); 
                                            
            });

            for(i = 0; i <= pattern_array.length - 1; i++){

                fabric.util.loadImage(pattern_array[i], function (image) {
                    
                    materialOption = new fabric.Image(image);

                    materialOption.set({

                        top: 0,
                        left: 0,
                        width: 447,
                        height: 496,
                        angle: 0,
                        opacity: 1, 

                    });

                    objects[object_name] = materialOption;
                    canvas_bottom_layer.add(materialOption).renderAll(); 
                                            
                });

            }


        }


    /* End Material Composer */




 });   

