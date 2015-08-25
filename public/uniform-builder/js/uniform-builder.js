 $( document ).ready(function() {

    switch_panel('#materials_panel');

    window.ub = {};

    /* UI Objects */

    ub.active = null;


    function switch_panel(panel){

        $('.options_panel').hide();
        $(panel).fadeIn(100);

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


        // window.two_d.load_base('/images/builder-assets/jersey-front.png', window.two_d.canvas_front, 'jersey_front')
        // window.two_d.load_base('/images/builder-assets/jersey-back.png', window.two_d.canvas_back, 'jersey_back')
        // window.two_d.load_base('/images/builder-assets/jersey-right.png', window.two_d.canvas_right, 'jersey_right')
        // window.two_d.load_base('/images/builder-assets/jersey-left.png', window.two_d.canvas_left, 'jersey_left');


        $('.change-color').on('click', function(e){
          

           var color = $(this).data('color');

           if(color === "#000000"){ 

                color = "#2f2f2f"; 
                /// Lighter Black, TODO: Fix this

           }

           window.two_d.load_bases(color);
            
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


    /* Material Mixing Canvas */




        window.two_d.compose_material = function (base, pattern_array, shape, view_canvas, obj_name) {

            var mixing_canvas = {};
            mixing_canvas.objects = {};
            var objects = mixing_canvas.objects;

            mixing_canvas.top_layer = new fabric.Canvas('tl', { width: 447, height: 496, });
            mixing_canvas.bottom_layer = new fabric.Canvas('bl', { width: 447, height: 496, });
            mixing_canvas.destination_layer = new fabric.Canvas('dl', { width: 447, height: 496, });

            
            /// Canvas Events ///

                mixing_canvas.top_layer.on('after:render', function(options) {
                   
                    mixing_canvas.mix(view_canvas);
                    

                });


                mixing_canvas.bottom_layer.on('after:render', function(options) {
                
                    mixing_canvas.mix(view_canvas);
                    

                });


                mixing_canvas.mix = function(canvas) {


                    if( _.size(mixing_canvas.objects) !== 2 ){
                        
                        return false;

                    }

                    var a     =  mixing_canvas.top_layer.getContext('2d');
                    var b     =  mixing_canvas.bottom_layer.getContext('2d');
                    var dest  =  mixing_canvas.destination_layer.getContext('2d');

                    a.blendOnto(dest, b, 'multiply'); 
                    
                    var imgData = dest.getImageData( 0, 0, 447, 496 );

                    var c = document.createElement('canvas');
                    c.setAttribute('id', '_temp_canvas');
                    c.width = 447;
                    c.height = 496;

                    c.getContext('2d').putImageData(imgData, 0, 0);

                    fabric.Image.fromURL(c.toDataURL(), function(img) {

                        canvas.remove(two_d.objects[obj_name]);
                        two_d.objects[obj_name] = img;

                        img.left = 0;
                        img.top = 0;
                        canvas.add(img);
                        img.bringToFront();
                        canvas.renderAll();

                        c = null;
                        $('#_temp_canvas').remove();

                    })

                    return true;

                }


            /// End Canvas Events ///


            /// Base 


            fabric.util.loadImage(base.filename, function (image) {
                    
                materialOption = new fabric.Image(image);

                materialOption.set({

                    top: 0,
                    left: 0,
                    width: 447,
                    height: 496,
                    angle: 0,
                    opacity: 1, 

                });

                objects['base'] = materialOption;
                mixing_canvas.top_layer.add(materialOption).renderAll(); 
                                            
            });

            
            /// Shape

                fabric.util.loadImage(shape, function (image) {
                    
                    materialOption = new fabric.Image(image);

                    materialOption.set({

                        top: 0,
                        left: 0,
                        width: 447,
                        height: 496,
                        angle: 0,
                        opacity: 1, 

                    });

                    
                    var filter = new fabric.Image.filters.Multiply({
                      color: base.color,
                    });

                    materialOption.filters.push(filter);
                    materialOption.applyFilters(mixing_canvas.bottom_layer.renderAll.bind(mixing_canvas.bottom_layer));

                    objects['shape'] = materialOption;

                    mixing_canvas.bottom_layer.add(materialOption); 
                //mixing_canvas.bottom_layer.renderAll();
                                                
                });

        };


        /// Initialize ///

            window.two_d.load_bases = function(color){

                var start = new Date().getTime();

                var base            = {};
                    base.filename   = '';
                    base.color      = '';

                var pattern         = [];
                var shape           = '';


                /// FRONT
                base.filename       = '/images/builder-assets/jersey-front.png';
                base.color          = color;
                pattern             = [];
                shape               = '/images/builder-assets/jersey-front-shape.png';

                window.two_d.compose_material(base, pattern, shape, window.two_d.canvas_front,'jersey_front');
                

                /// BACK
                base.filename       = '/images/builder-assets/jersey-back.png';
                base.color          = color;
                pattern             = [];
                shape               = '/images/builder-assets/jersey-back-shape.png';

                window.two_d.compose_material(base, pattern, shape, window.two_d.canvas_back,'jersey_back');


                /// LEFT
                base.filename       = '/images/builder-assets/jersey-left.png';
                base.color          = color;
                shape               = '/images/builder-assets/jersey-left-shape.png';

                window.two_d.compose_material(base, pattern, shape, window.two_d.canvas_left,'jersey_left');


                /// RIGHT
                base.filename       = '/images/builder-assets/jersey-right.png';
                base.color          = color;
                pattern             = [];
                shape               = '/images/builder-assets/jersey-right-shape.png';

                window.two_d.compose_material(base, pattern, shape, window.two_d.canvas_right,'jersey_right');


                var end = new Date().getTime();
                var time = end - start;
                console.log('time',time);


            }

            window.two_d.load_bases('#8c2332');

        /// End Initialize ///


        /// Utilities 

            $('button#btnDebugPanel').on('click', function(e){
           
                var mc = $('div#mixing-canvas');
            
                if( mc.css('display') === "none" ) {

                    mc.fadeIn();
                    
                    var offset = mc.offset();

                    offset.left -= 20;
                    offset.top -= 20;

                    $('html, body').animate({
                        scrollTop: offset.top,
                        scrollLeft: offset.left
                    });

                }
                else {

                    mc.slideUp();

                }                


            }); 

        /// End Utilities    



    /* End Material Mixing Canvas */




 });   

