 $( document ).ready(function() {


    /// NEW RENDERER ///


        window.ub                       = {};
        window.ub.objects               = {};


        /// Initialize Uniform Builder
        window.ub.initialize = function (){

            
            /// Setup Properties

                ub.active               = null;
                ub.container_div        = 'test_view'

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
                
            
            /// Hide other views except for the left view, by bringing them offscreen, still visible so we can still get the thumbnails by using renderTexture

                ub.front_view.position.x = 0;
                
                ub.right_view.position.x = ub.dimensions.width;
                ub.back_view.position.x  = ub.dimensions.width;
                ub.left_view.position.x = ub.dimensions.width;
                

            /// Initialize Assets

                ub.load_assets();


            /// Activate Views
            
                $('#front_view').parent().fadeOut();
                $('#back_view').parent().fadeOut();
                $('#left_view').parent().fadeOut();
                $('#right_view').parent().fadeOut();
                $('#test_view').parent().fadeOut();
                
                // $('#' + view + '_view').parent().fadeIn(); // fade in the parent container not the actual canvas
                $('#test_view').parent().fadeIn();

                window.ub.refresh_thumbnails();    

            
            /// Begin Rendering

                ub.setup_left_view(); 
                ub.setup_right_view(); 
                ub.setup_front_view(); 
                ub.setup_back_view(); 

                requestAnimationFrame( ub.render_frames );
                ub.pass = 0;


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


                var base                    = ub.pixi.new_sprite( ub.assets.left_view.base );
                var shape                   = ub.pixi.new_sprite( ub.assets.left_view.shape );

                
                ub.objects.left_view        = {};

                ub.objects.left_view.base   = base;
                ub.objects.left_view.shape  = shape;

                base.blendMode              = PIXI.BLEND_MODES.MULTIPLY;

                shape.zIndex                = 1;
                base.zIndex                 = 0;

                ub.left_view.addChild(base);
                ub.left_view.addChild(shape);

                ub.updateLayersOrder(ub.left_view);


            }


            window.ub.setup_right_view = function(){


                var base                    = ub.pixi.new_sprite( ub.assets.right_view.base );
                var shape                   = ub.pixi.new_sprite( ub.assets.right_view.shape );

                
                ub.objects.right_view       = {};

                ub.objects.right_view.base  = base;
                ub.objects.right_view.shape = shape;

                base.blendMode              = PIXI.BLEND_MODES.MULTIPLY;

                shape.zIndex                = 1;
                base.zIndex                 = 0;

                ub.right_view.addChild(base);
                ub.right_view.addChild(shape);

                ub.updateLayersOrder(ub.right_view);


            }

            window.ub.setup_front_view = function(){


                var base                    = ub.pixi.new_sprite( ub.assets.front_view.base );
                var shape                   = ub.pixi.new_sprite( ub.assets.front_view.shape );

                
                ub.objects.front_view       = {};

                ub.objects.front_view.base  = base;
                ub.objects.front_view.shape = shape;

                base.blendMode              = PIXI.BLEND_MODES.MULTIPLY;

                shape.zIndex                = 1;
                base.zIndex                 = 0;

                ub.front_view.addChild(base);
                ub.front_view.addChild(shape);

                ub.updateLayersOrder(ub.front_view);


            }


            window.ub.setup_back_view = function(){


                var base                    = ub.pixi.new_sprite( ub.assets.back_view.base );
                var shape                   = ub.pixi.new_sprite( ub.assets.back_view.shape );

                
                ub.objects.back_view        = {};

                ub.objects.back_view.base   = base;
                ub.objects.back_view.shape  = shape;

                base.blendMode              = PIXI.BLEND_MODES.MULTIPLY;

                shape.zIndex                = 1;
                base.zIndex                 = 0;

                ub.back_view.addChild(base);
                ub.back_view.addChild(shape);

                ub.updateLayersOrder(ub.back_view);


            }

        /// End Render Different Views ///


        /// Utilities ///

            ub.getThumbnailImage = function (view) {

                var texture                 = new PIXI.RenderTexture(ub.renderer,447,496);
                texture.render(ub[view]);

                return texture.getImage().src;

            }

            
            /// Refresh Thumbnail Views ///

            ub.refresh_thumbnails = function(){

                $('a#view_front > img').attr('src', ub.getThumbnailImage('front_view'));
                $('a#view_back > img').attr('src', ub.getThumbnailImage('back_view'));

                $('a#view_left > img').attr('src', ub.getThumbnailImage('left_view'));
                $('a#view_right > img').attr('src', ub.getThumbnailImage('right_view'));
            
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

            
            ub.change_color = function (obj, color) {

                var color_value                 = parseInt(color.substring(1), 16);

                ub.objects.left_view[obj].tint  = color_value;
                ub.objects.right_view[obj].tint = color_value;
                ub.objects.front_view[obj].tint = color_value;
                ub.objects.back_view[obj].tint  = color_value;

                ub.refresh_thumbnails();

            }

            $('.change-color').on('click', function(e){
          
               var color                        = $(this).data('color');
               var target                       = $(this).data('target');

               if(color === "#000000"){ 

                    color                       = "#222222"; 

               }

               ub.change_color( target, color );
                
            }); 


        /// End Process Changes /// 


        /// Camera Views


            $('a.change-view').on('click', function(e){

                var view = $(this).data('view');

                ub.left_view.position.x = ub.dimensions.width;
                ub.right_view.position.x = ub.dimensions.width;
                ub.front_view.position.x = ub.dimensions.width;
                ub.back_view.position.x  = ub.dimensions.width;

                ub[view + '_view'].position.x = 0;

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

