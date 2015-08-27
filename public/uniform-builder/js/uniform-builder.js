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


    /// NEW RENDERER ///


        window.ub                   = {};
        window.ub.objects           = {};


        /// Initialize Uniform Builder
        window.ub.initialize = function (){

            
            /// Setup Properties

                ub.container_div        = 'test_view'
                
                ub.dimensions           = {};
                ub.dimensions.width     = 447;
                ub.dimensions.height    = 496;

                ub.stage                = new PIXI.Container();

                ub.pCanvas              = document.getElementById( ub.container_div );
                ub.renderer             = PIXI.autoDetectRenderer( ub.dimensions.width, ub.dimensions.height );

                ub.renderer.backgroundColor = 0xFFFFFF;
                ub.pCanvas.appendChild( ub.renderer.view );


            /// Containers for each view

                ub.left_view            = new PIXI.Container();
                ub.front_view           = new PIXI.Container();
                ub.back_view            = new PIXI.Container();
                ub.right_view           = new PIXI.Container();

                ub.stage.addChild(ub.left_view);
                ub.stage.addChild(ub.front_view);
                ub.stage.addChild(ub.back_view);
                ub.stage.addChild(ub.right_view);

                
                // zIndex Fix
                //
                //  e.g. 
                //    
                //  -- assign zIndex first
                //
                //  base.zIndex = 1;
                //  shape.zIndex = 1;
                //  
                //  -- then add to container
                //  
                //  ub.left_view.addChild(base);
                //  ub.left_view.addChild(shape);
                //
                //  -- call updateLayers Order, passing the container
                //
                //  ub.updateLayersOrder(ub.left_view)
                // 

                ub.updateLayersOrder = function (container) {
                    
                    container.children.sort(function(a,b) {
                        a.zIndex = a.zIndex || 0;
                        b.zIndex = b.zIndex || 0;
                        return b.zIndex - a.zIndex
                    });

                };
                
            
            /// Hide other views except for the left view

                ub.left_view.visible    = true;
                
                ub.right_view.visible   = false;
                ub.front_view.visible   = false;
                ub.back_view.visible    = false;


            /// Initialize Assets

                ub.load_assets();

            
            /// Begin Rendering

                ub.setup_left_view(); 

                requestAnimationFrame( ub.render_frames );


        }


        /// Load Assets 

        ub.load_assets = function() {

            
            ub.assets                   = {};

            ub.assets.folder_name       = '/images/builder-assets/'
                
            
            /// Left View
                
            ub.assets.left_view         = {};
            ub.assets.left_view.base    = ub.assets.folder_name + 'jersey-left.png';
            ub.assets.left_view.shape   = ub.assets.folder_name + 'jersey-left-shape.png';


            /// Right View
                
            ub.assets.right_view         = {};
            ub.assets.right_view.base    = ub.assets.folder_name + 'jersey-right.png';
            ub.assets.right_view.shape   = ub.assets.folder_name + 'jersey-right-shape.png';


            /// Front View
                
            ub.assets.front_view         = {};
            ub.assets.front_view.base    = ub.assets.folder_name + 'jersey-front.png';
            ub.assets.front_view.shape   = ub.assets.folder_name + 'jersey-front-shape.png';


            /// Back View
                
            ub.assets.back_view         = {};
            ub.assets.back_view.base    = ub.assets.folder_name + 'jersey-back.png';
            ub.assets.back_view.shape   = ub.assets.folder_name + 'jersey-back-shape.png';



        }

       



        /// Process Property Changes
        window.ub.process = function(){

            

        }

        
        /// Main Render Loop
        window.ub.render_frames = function() {

            requestAnimationFrame( ub.render_frames );
            ub.renderer.render( ub.stage );

        }


        /// Render Different Views ///

            window.ub.pixi = {};  // PIXI wrapper methods

            window.ub.pixi.new_sprite = function (filename) {

                return new PIXI.Sprite( PIXI.Texture.fromImage( filename ) )

            }

            window.ub.setup_left_view = function(){

                var base        = ub.pixi.new_sprite( ub.assets.left_view.base );
                var shape       = ub.pixi.new_sprite( ub.assets.left_view.shape );

                base.blendMode  = PIXI.BLEND_MODES.MULTIPLY;

                shape.zIndex    = 1;
                base.zIndex     = 0;

                ub.left_view.addChild(base);
                ub.left_view.addChild(shape);

                ub.updateLayersOrder(ub.left_view);


            }

        /// End Render Different Views ///

        
        /// Start Everything 

        window.ub.initialize();


    /// END NEW RENDERER /// 


    /* Material Mixing Canvas */


        /// Main Proc - Color Change///

            window.two_d.compose_material = function (base, pattern_array, shape, view_canvas, obj_name) {


                var dimensions = {};

                    dimensions.width = 447;
                    dimensions.height = 496;
                
                var mixing_canvas = {};

                    mixing_canvas.objects = {};
                
                var objects = mixing_canvas.objects;
                var render_time = 0;
                

                mixing_canvas.top_layer = new fabric.Canvas('tl', { width: dimensions.width, height: dimensions.height, });
                mixing_canvas.bottom_layer = new fabric.Canvas('bl', { width: dimensions.width, height: dimensions.height, });
                mixing_canvas.destination_layer = new fabric.Canvas('dl', { width: dimensions.width, height: dimensions.height, });

                
                /// Canvas Events ///


                    mixing_canvas.bottom_layer.on('after:render', function(options) {
                        
                        render_time += 1;
                        
                        if(render_time == 2){
                            mixing_canvas.mix(view_canvas);
                        }    

                    });

                    mixing_canvas.mix = function(canvas) {


                        if( _.size(mixing_canvas.objects) !== 2 ){
                            
                            return false;

                        }

                        var a     =  mixing_canvas.top_layer.getContext('2d');
                        var b     =  mixing_canvas.bottom_layer.getContext('2d');
                        var dest  =  mixing_canvas.destination_layer.getContext('2d');

                        a.blendOnto(dest, b, 'multiply'); 
                        
                        var imgData = dest.getImageData( 0, 0, dimensions.width, dimensions.height );

                        var c = document.createElement('canvas');
                        c.setAttribute('id', '_temp_canvas');
                        c.width = dimensions.width;
                        c.height = dimensions.height;

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
                            width: dimensions.width,
                            height: dimensions.height,
                            angle: 0,
                            opacity: 1, 

                        });

                        objects['base'] = materialOption;
                        mixing_canvas.top_layer.add(materialOption).renderAll(); 
                                                    
                    });

                /// End Base

                
                /// Patterns 

                                        window.pa = pattern_array;


                /// End Patterns    

                
                /// Shape

                    fabric.util.loadImage(shape, function (image) {
                        
                        materialOption = new fabric.Image(image);

                        materialOption.set({

                            top: 0,
                            left: 0,
                            width: dimensions.width,
                            height: dimensions.height,
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
                                                    
                    });

                /// End Shape    

            };


        /// End Main Proc - Color Change ///


        /// Temp Proc - Pattern Change /// (Combine with main proc when done)

            window.two_d.compose_material_with_layers = function (base, pattern_array, shape, view_canvas, obj_name) {

                
                var dimensions              = {};
                    dimensions.width        = 447;
                    dimensions.height       = 496;
                
                var mixing_canvas           = {};
                    mixing_canvas.objects   = {};
                
                var objects                 = mixing_canvas.objects;
                var render_time             = 0;

                var pattern_render_time     = 0;
                

                mixing_canvas.top_layer         = new fabric.Canvas('tl', { width: dimensions.width, height: dimensions.height, });
                mixing_canvas.pattern_layer     = new fabric.Canvas('pl', { width: dimensions.width, height: dimensions.height, });
                mixing_canvas.bottom_layer      = new fabric.Canvas('bl', { width: dimensions.width, height: dimensions.height, });
                
                mixing_canvas.destination_layer = new fabric.Canvas('dl', { width: dimensions.width, height: dimensions.height, });

                
                /// Canvas Events ///

                function changed(changes){

                    console.log('change detected!');
                    console.log(changes);

                }

                Object.observe(objects, changed);


                    mixing_canvas.bottom_layer.on('after:render', function(options) {
                        
                        // Use this renderer for base color change

                        // render_time += 1;
                        // console.log('from shape layer: #' + render_time);

                        // if(render_time == 2){
                        //     mixing_canvas.mix(view_canvas);
                        // }    

                    });

                    mixing_canvas.bottom_layer.on('after:render', function(options) {
                        
                        // Use this renderer for pattern color change

                        pattern_render_time += 1;

                        if(pattern_render_time === 4 && _.size(objects) === 6){

                            var s = new Image();
                            s.src =  mixing_canvas.pattern_layer.toDataURL();
                            
                            objects['shape'].fill = new fabric.Pattern({
                                source: s,
                                repeat: 'no-repeat',
                            });

                            mixing_canvas.bottom_layer.renderAll(); 
                            mixing_canvas.mix(view_canvas);

                            temp = null;

                            $('#_temp_pattern_canvas').remove();


                        }    


                    });

                    mixing_canvas.mix = function(canvas) {


                        if( _.size(mixing_canvas.objects) !== 2 ){
                            
                            return false;

                        }

                        var a               =  mixing_canvas.top_layer.getContext('2d');
                        var b               =  mixing_canvas.bottom_layer.getContext('2d');
                        var dest            =  mixing_canvas.destination_layer.getContext('2d');

                        a.blendOnto(dest, b, 'multiply'); 
                        
                        var imgData = dest.getImageData( 0, 0, dimensions.width, dimensions.height );

                        var c = document.createElement('canvas');
                        c.setAttribute('id', '_temp_canvas');
                        c.width = dimensions.width;
                        c.height = dimensions.height;

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
                            width: dimensions.width,
                            height: dimensions.height,
                            angle: 0,
                            opacity: 1, 

                        });

                        objects['base'] = materialOption;
                        mixing_canvas.top_layer.add(materialOption).renderAll(); 
                                                    
                    });

                /// End Base

                
                /// Shape

                    fabric.loadSVGFromURL(shape, function (objects, options) {

                        materialOption = fabric.util.groupSVGElements(objects, options);

                        materialOption.set({

                            top: 0,
                            left: 0,
                            width: dimensions.width,
                            height: dimensions.height,

                        });

                        materialOption.paths[0].fill = base.color;
                        objects['shape'] = materialOption;

                        mixing_canvas.bottom_layer.add(materialOption); 
                                                        
                    });

                /// End Shape

                /// Patterns 

                    var ctr = 0;

                    for(ctr = 0; ctr <= _.size(pattern_array) - 1; ctr++){

                        var obj = pattern_array[ctr];

                        fabric.util.loadImage(obj.filename, function (image) {
                        
                            materialOption = new fabric.Image(image);

                            materialOption.set({

                                top: 0,
                                left: 0,
                                width: dimensions.width,
                                height: dimensions.height,
                                angle: 0,
                                opacity: 1, 

                            });

                            var filter = new fabric.Image.filters.Multiply({
                                
                                color: obj.color,

                            });

                            materialOption.filters.push(filter);
                            materialOption.applyFilters(mixing_canvas.bottom_layer.renderAll.bind(mixing_canvas.bottom_layer));

                            objects['layer_' + ctr] = materialOption;

                            mixing_canvas.pattern_layer.add(materialOption); 
                                                        
                        });

                    }

                /// End Patterns        

            };


        /// End Temp Proc - Pattern Change ///


        /// Initialize ///

            window.two_d.load_bases = function(color){

                var folder          = '/images/builder-assets/';
                var pattern_name    = 'camo/';


                var shape           = '';    
                var base            = {};
                    base.filename   = '';
                    base.color      = '';

                var pattern         = [

                    { 
                        filename:   folder + pattern_name + 'layer_1.png',
                        color:      '#dbd1c5',
                        order:      1,
                    },  

                    { 
                        filename:   folder + pattern_name + 'layer_2.png',
                        color:      '#8a8275',
                        order:      2,
                    },    

                    { 
                        filename:   folder + pattern_name + 'layer_3.png',
                        color:      '#b6b09f',
                        order:      3,
                    },    

                    { 
                        filename:   folder + pattern_name + 'layer_4.png',
                        color:      '#594e50',
                        order:      4,
                    },    

                ];


                /// FRONT
                base.filename       = folder + 'jersey-front.png';
                base.color          = color;
                shape               = folder + 'jersey-front-shape.png';

                window.two_d.compose_material(base, pattern, shape, window.two_d.canvas_front,'jersey_front');
                

                /// BACK
                base.filename       = folder + 'jersey-back.png';
                base.color          = color;
                shape               = folder + 'jersey-back-shape.png';

                window.two_d.compose_material(base, pattern, shape, window.two_d.canvas_back,'jersey_back');


                /// LEFT
                base.filename       = folder + 'jersey-left.png';
                base.color          = color;
                shape               = folder + 'jersey-left-shape.png';

                window.two_d.compose_material(base, pattern, shape, window.two_d.canvas_left,'jersey_left');


                /// RIGHT
                base.filename       = folder + 'jersey-right.png';
                base.color          = color;
                shape               = folder + 'jersey-right-shape.png';

                window.two_d.compose_material(base, pattern, shape, window.two_d.canvas_right,'jersey_right');


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

