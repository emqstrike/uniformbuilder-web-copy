 $( document ).ready(function() {


    /// NEW RENDERER ///


        window.ub                       = {};
        window.ub.objects               = {};


        /// Initialize Uniform Builder
        window.ub.initialize = function (){

            
            /// Setup Properties

                ub.active               = null;
                ub.container_div        = 'main_view'

                ub.dimensions           = {};
                ub.dimensions.width     = 447;
                ub.dimensions.height    = 496;

                ub.stage                = new PIXI.Container();

                ub.pCanvas              = document.getElementById( ub.container_div );
                ub.renderer             = PIXI.autoDetectRenderer( ub.dimensions.width, ub.dimensions.height );

                ub.renderer.backgroundColor = 0xffffff;
                ub.pCanvas.appendChild( ub.renderer.view );


            /// Containers for each view

                ub.left_view            = new PIXI.Container();
                ub.front_view           = new PIXI.Container();
                ub.back_view            = new PIXI.Container();
                ub.right_view           = new PIXI.Container();
                ub.pattern_view         = new PIXI.Container();

                ub.stage.addChild(ub.left_view);
                ub.stage.addChild(ub.front_view);
                ub.stage.addChild(ub.back_view);
                ub.stage.addChild(ub.right_view);
                ub.stage.addChild(ub.pattern_view);

                
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
                
            
            /// Hide other views except for the left view, by bringing them offscreen, still visible so we can still get the thumbnails by using renderTexture

                ub.front_view.position.x    = 0;
                
                ub.right_view.position.x    = ub.dimensions.width;
                ub.back_view.position.x     = ub.dimensions.width;
                ub.left_view.position.x     = ub.dimensions.width;
                ub.pattern_view.position.x  = ub.dimensions.width;


            /// Initialize Assets

                ub.load_assets();


            /// Activate Views
            
                // $('#front_view').parent().fadeOut();
                // $('#back_view').parent().fadeOut();
                // $('#left_view').parent().fadeOut();
                // $('#right_view').parent().fadeOut();
                // $('#main_view').parent().fadeOut();
                
                // $('#' + view + '_view').parent().fadeIn(); // fade in the parent container not the actual canvas
                $('#main_view').parent().fadeIn();

                window.ub.refresh_thumbnails();    

            
            /// Begin Rendering

                ub.setup_left_view(); 
                ub.setup_right_view(); 
                ub.setup_front_view(); 
                ub.setup_back_view(); 

                ub.setup_pattern_view(); 

                requestAnimationFrame( ub.render_frames );
                ub.pass = 0;


        }


        /// Load Assets 

        ub.load_assets = function() {

            
            ub.assets                   = {};

            ub.assets.folder_name       = '/images/builder-assets/'

            ub.assets.blank             = ub.assets.folder_name + 'blank.png';
                
            
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



            /// Materials

            ub.assets.pattern          = {};
            ub.assets.pattern.layers   = [];
            
            ub.assets.pattern.layers.push( ub.assets.folder_name + 'camo/layer_1.png' );
            ub.assets.pattern.layers.push( ub.assets.folder_name + 'camo/layer_2.png' );
            ub.assets.pattern.layers.push( ub.assets.folder_name + 'camo/layer_3.png' );
            ub.assets.pattern.layers.push( ub.assets.folder_name + 'camo/layer_4.png' );
            
        }

       
        /// Process Property Changes
        window.ub.process = function(){

            

        }

        
        /// Main Render Loop

        window.ub.render_frames = function() {

            requestAnimationFrame( ub.render_frames );
            ub.renderer.render( ub.stage );

            /// Refresh Thumbnail on the initial 4 passes
            
            if(ub.pass < 4){

                ub.refresh_thumbnails();
                ub.pass += 1;

            }    

        }


        /// Render Different Views ///

            window.ub.pixi = {};  // PIXI wrapper methods

            window.ub.pixi.new_sprite = function (filename) {

                return new PIXI.Sprite( PIXI.Texture.fromImage( filename ) )

            }

            window.ub.setup_left_view = function(){


                var base                        = ub.pixi.new_sprite( ub.assets.left_view.base );
                var shape                       = ub.pixi.new_sprite( ub.assets.left_view.shape );
                var shape_mask                  = ub.pixi.new_sprite( ub.assets.left_view.shape );

                
                ub.objects.left_view            = {};

                ub.objects.left_view.base       = base;
                ub.objects.left_view.shape      = shape;
                ub.objects.left_view.shape_mask = shape_mask;

                base.blendMode                  = PIXI.BLEND_MODES.MULTIPLY;

                shape.zIndex                    = 2;
                shape_mask.zIndex               = 1;
                base.zIndex                     = 0;

                ub.left_view.addChild(base);
                ub.left_view.addChild(shape);

                ub.updateLayersOrder(ub.left_view);


            }


            window.ub.setup_right_view = function(){


                var base                            = ub.pixi.new_sprite( ub.assets.right_view.base );
                var shape                           = ub.pixi.new_sprite( ub.assets.right_view.shape );
                var shape_mask                      = ub.pixi.new_sprite( ub.assets.right_view.shape );

                
                ub.objects.right_view               = {};

                ub.objects.right_view.base          = base;
                ub.objects.right_view.shape         = shape;
                ub.objects.right_view.shape_mask    = shape_mask;

                base.blendMode                      = PIXI.BLEND_MODES.MULTIPLY;

                shape.zIndex                        = 2;
                shape_mask.zIndex                   = 1;
                base.zIndex                         = 0;

                ub.right_view.addChild(base);
                ub.right_view.addChild(shape);

                ub.updateLayersOrder(ub.right_view);


            }

            window.ub.setup_front_view = function(){


                var base                            = ub.pixi.new_sprite( ub.assets.front_view.base );
                var shape                           = ub.pixi.new_sprite( ub.assets.front_view.shape );
                var shape_mask                      = ub.pixi.new_sprite( ub.assets.front_view.shape );

                ub.objects.front_view               = {};

                ub.objects.front_view.base          = base;
                ub.objects.front_view.shape         = shape;
                ub.objects.front_view.shape_mask    = shape_mask;

                base.blendMode                      = PIXI.BLEND_MODES.MULTIPLY;

                shape.zIndex                        = 2;
                shape_mask.zIndex                   = 1;
                base.zIndex                         = 0;

                ub.front_view.addChild(base);
                ub.front_view.addChild(shape);

                ub.updateLayersOrder(ub.front_view);


            }


            window.ub.setup_back_view = function(){


                var base                            = ub.pixi.new_sprite( ub.assets.back_view.base );
                var shape                           = ub.pixi.new_sprite( ub.assets.back_view.shape );
                var shape_mask                      = ub.pixi.new_sprite( ub.assets.back_view.shape );

                ub.objects.back_view                = {};

                ub.objects.back_view.base           = base;
                ub.objects.back_view.shape          = shape;
                ub.objects.back_view.shape_mask     = shape_mask;

                base.blendMode                      = PIXI.BLEND_MODES.MULTIPLY;

                shape.zIndex                        = 2;
                shape_mask.zIndex                   = 1;
                base.zIndex                         = 0;

                ub.back_view.addChild(base);
                ub.back_view.addChild(shape);

                ub.updateLayersOrder(ub.back_view);


            }


            window.ub.setup_pattern_view = function(){


                var layer_1                         = ub.pixi.new_sprite( ub.assets.pattern.layers[0] );
                var layer_2                         = ub.pixi.new_sprite( ub.assets.pattern.layers[1] );
                var layer_3                         = ub.pixi.new_sprite( ub.assets.pattern.layers[2] );
                var layer_4                         = ub.pixi.new_sprite( ub.assets.pattern.layers[3] );

                ub.objects.pattern_view             = {};

                ub.objects.pattern_view.layer_1     = layer_1;
                ub.objects.pattern_view.layer_2     = layer_2;
                ub.objects.pattern_view.layer_3     = layer_3;
                ub.objects.pattern_view.layer_4     = layer_4;
                
                layer_1.zIndex                      = 1;
                layer_2.zIndex                      = 2;
                layer_3.zIndex                      = 3;
                layer_4.zIndex                      = 4;

                ub.pattern_view.addChild(layer_1);
                ub.pattern_view.addChild(layer_2);
                ub.pattern_view.addChild(layer_3);
                ub.pattern_view.addChild(layer_4);

                ub.updateLayersOrder(ub.pattern_view);


            }


        /// End Render Different Views ///


        /// Utilities ///

            ub.applyMaterial = function () {

                var texture                         = new PIXI.RenderTexture(ub.renderer,447,496);
                texture.render(ub['pattern_view']);

                var pattern_front                   = new PIXI.Sprite( texture );
                var pattern_back                    = new PIXI.Sprite( texture );
                var pattern_left                    = new PIXI.Sprite( texture );
                var pattern_right                   = new PIXI.Sprite( texture );


                if(typeof(ub.objects.left_view.pattern) !== 'undefined'){
                    ub.left_view.removeChild(ub.objects.left_view.pattern);    
                }
                
                pattern_left.zIndex = 1;
                pattern_left.mask = ub.objects.left_view.shape_mask;
                ub.objects.left_view.pattern = pattern_left;
                ub.left_view.addChild(pattern_left);


                if(typeof(ub.objects.right_view.pattern) !== 'undefined'){
                    ub.right_view.removeChild(ub.objects.right_view.pattern);    
                }

                ub.right_view.removeChild(ub.objects.right_view.pattern);
                pattern_right.zIndex = 1;
                pattern_right.mask = ub.objects.right_view.shape_mask;
                ub.objects.right_view.pattern = pattern_right;
                ub.right_view.addChild(pattern_right);


                if(typeof(ub.objects.front_view.pattern) !== 'undefined'){
                    ub.front_view.removeChild(ub.objects.front_view.pattern);    
                }

                ub.front_view.removeChild(ub.objects.front_view.pattern);
                pattern_front.zIndex = 1;
                pattern_front.mask = ub.objects.front_view.shape_mask;
                ub.objects.front_view.pattern = pattern_front;
                ub.front_view.addChild(pattern_front);

                
                if(typeof(ub.objects.back_view.pattern) !== 'undefined'){
                    ub.back_view.removeChild(ub.objects.back_view.pattern);    
                }

                ub.back_view.removeChild(ub.objects.back_view.pattern);
                pattern_back.zIndex = 1;
                pattern_back.mask = ub.objects.back_view.shape_mask;
                ub.objects.back_view.pattern = pattern_back;
                ub.back_view.addChild(pattern_back);


                ub.updateLayersOrder(ub.left_view);
                ub.updateLayersOrder(ub.right_view);
                ub.updateLayersOrder(ub.front_view);
                ub.updateLayersOrder(ub.back_view);


            }


            ub.getThumbnailImage = function (view) {

                var texture                         = new PIXI.RenderTexture(ub.renderer,447,496);
                texture.render(ub[view]);

                return texture.getImage().src;

            }

            
            /// Refresh Thumbnail Views ///

            ub.refresh_thumbnails = function(){

                $('a#view_front > img').attr('src', ub.getThumbnailImage('front_view'));
                $('a#view_back > img').attr('src', ub.getThumbnailImage('back_view'));
                $('a#view_left > img').attr('src', ub.getThumbnailImage('left_view'));
                $('a#view_right > img').attr('src', ub.getThumbnailImage('right_view'));

                $('a#view_pattern > img').attr('src', ub.getThumbnailImage('pattern_view'));
            
            }


        /// End Utilities ///

        
        /// Start Everything 

        window.ub.initialize();


    /// END NEW RENDERER /// 

    /// UI Functions /// 

    
        switch_panel('#materials_panel');


        function switch_panel(panel){

            $('.options_panel').hide();
            $(panel).fadeIn(100);

        }


        $('div#right-sidebar > a.sidebar-buttons').on('click', function(e){
           

            if(ub.active !== null){

                filename    = '/images/sidebar/' + ub.active.data('filename') + '.png';
                ub.active.find('img').attr('src', filename)
                ub.active.removeClass('active_button');

            }    
            
            ub.active       = $(this);
            filename        = '/images/sidebar/' + ub.active.data('filename') + '-on' + '.png';
            
            ub.active.find('img').attr('src', filename);  
            ub.active.addClass('active_button');

            switch_panel('#' +  ub.active.data('filename') + '_panel');

            return false;


        });


        /// Process Changes ///

            $('.change-color').on('click', function(e){
          
               var color                        = $(this).data('color');
               var target                       = $(this).data('target');
               var panel                        = $(this).data('panel');

               if(color === "#000000"){ 

                    color                       = "#222222"; 

               }

               ub.change_color( target, color, panel );
                
            }); 

            
            ub.change_color = function (obj, color, panel) {

                var color_value                         = parseInt(color.substring(1), 16);

                if(panel === 'base'){


                    if( typeof( ub.objects.left_view['pattern'] ) !== 'undefined' ){
                        
                        ub.objects.left_view['pattern'].visible = false;
                        ub.objects.right_view['pattern'].visible = false;
                        ub.objects.front_view['pattern'].visible = false;
                        ub.objects.back_view['pattern'].visible = false;
                        
                    }
                    
                    ub.objects.left_view[obj].tint      = color_value;
                    ub.objects.right_view[obj].tint     = color_value;
                    ub.objects.front_view[obj].tint     = color_value;
                    ub.objects.back_view[obj].tint      = color_value;
                    
                }

                if(panel === 'patterns'){



                    ub.objects.pattern_view[obj].tint   = color_value;
                    ub.applyMaterial();

                    ub.objects.left_view['pattern'].visible = true;
                    ub.objects.right_view['pattern'].visible = true;
                    ub.objects.front_view['pattern'].visible = true;
                    ub.objects.back_view['pattern'].visible = true;
                      
                }

                ub.refresh_thumbnails();

            }

        /// End Process Changes /// 


        /// Camera Views
            
    
            $('a.change-view').on('click', function(e){

                $('#main_view').hide();

                var view = $(this).data('view');

                ub.left_view.position.x = ub.dimensions.width;
                ub.right_view.position.x = ub.dimensions.width;
                ub.front_view.position.x = ub.dimensions.width;
                ub.back_view.position.x  = ub.dimensions.width;
                ub.pattern_view.position.x  = ub.dimensions.width;

                ub[view + '_view'].position.x = 0;

                $('#main_view').fadeIn();

            });


        /// End Camera Views



    /// UI Functions ///


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


 });   

