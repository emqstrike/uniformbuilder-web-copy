 $( document ).ready(function() {


    /// NEW RENDERER ///

        /// Initialize Uniform Builder
        window.ub.initialize = function (){

                if(window.ub.config.material_id === -1) {

                    return;

                }
            
            /// Setup Properties

                ub.active               = null;
                ub.container_div        = 'main_view'

                ub.dimensions           = {};
                ub.dimensions.width     = 496;
                ub.dimensions.height    = 550;

                ub.views = ['front', 'back', 'left', 'right'];

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

                ub.front_view.position.x                = 0;
                
                ub.right_view.position.x                = ub.dimensions.width;
                ub.back_view.position.x                 = ub.dimensions.width;
                ub.left_view.position.x                 = ub.dimensions.width;
                ub.pattern_view.position.x              = ub.dimensions.width;


            /// Initialize Assets

                ub.current_material = {};
                ub.current_material.id = window.ub.config.material_id;


                
                ub.current_material.colors_url = window.ub.config.api_host + '/api/colors/';
                ub.current_material.material_url = window.ub.config.api_host + '/api/material/' + ub.current_material.id;
                ub.current_material.material_options_url = window.ub.config.api_host + '/api/materials_options/' + ub.current_material.id;

                ub.loader(ub.current_material.colors_url, 'colors', ub.callback);
                ub.loader(ub.current_material.material_url, 'material', ub.callback);
                ub.loader(ub.current_material.material_options_url, 'materials_options', ub.callback);


            /// Activate Views

                $('#main_view').parent().fadeIn();
                window.ub.refresh_thumbnails();    

        }


        /// Load Assets 

 
        ub.callback = function (obj, object_name) {

            ub.current_material[object_name] = obj;

            var ok = typeof(ub.current_material.material) !== 'undefined' && 
                     typeof(ub.current_material.materials_options) !== 'undefined' && 
                     typeof(ub.current_material.colors) !== 'undefined';  

            if( ok ){

                ub.load_assets();            

            }
            
        };


        ub.loader = function (url, object_name, cb) {
          
            $.ajax({
            
                url: url,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
            
                success: function(response){

                    cb(response[object_name], object_name);
            
                }
            
            });

        };

        ub.load_assets = function() {

            
            ub.assets               = {};
            ub.assets.folder_name   = '/images/builder-assets/'
            ub.assets.blank         = ub.assets.folder_name + 'blank.png';

            var material = {};
            
            material = ub.current_material.material;
            material.options = ub.current_material.materials_options;

            _.each(ub.views, function(view) {

                var v = view;

                if (v === 'left' || v === 'right') {
                    v =  v + '_side_view';
                }
                else {
                    v = v + '_view';
                }    

                var view_name = view + '_view';

                ub.assets[view_name]           = {};
                ub.assets[view_name].base      = material[v + '_path'];
                ub.assets[view_name].shape     = material[v + '_shape'];

            });

            
            /// Materials

            ub.assets.pattern               = {};
            ub.assets.pattern.layers        = [];
            
            ub.assets.pattern.layers.push( ub.assets.folder_name + 'camo/layer_1.png' );
            ub.assets.pattern.layers.push( ub.assets.folder_name + 'camo/layer_2.png' );
            ub.assets.pattern.layers.push( ub.assets.folder_name + 'camo/layer_3.png' );
            ub.assets.pattern.layers.push( ub.assets.folder_name + 'camo/layer_4.png' );



            /// Begin Rendering after assets are loaded

                ub.setup_views();

                ub.setup_material_options(); 

                ub.setup_pattern_view(); 

                requestAnimationFrame( ub.render_frames );
                ub.pass = 0;
            
        }

        
        /// Process Property Changes
        window.ub.process = function(){

            

        }

        
        /// Main Render Loop

        window.ub.render_frames = function() {

            requestAnimationFrame( ub.render_frames );
            ub.renderer.render( ub.stage );

            
            /// Refresh Thumbnail Initially only on (-10) frames after 3 seconds (3 * 60)
            
            var frames_to_refresh = 3 * 60; // 60 frames in one sec, average

            if ( ub.pass > ( frames_to_refresh - 10 ) && ( ub.pass < frames_to_refresh ) ) {

                ub.refresh_thumbnails();
                
            }   

            if( ub.pass < frames_to_refresh ) {
                
                ub.pass += 1; 

            }

        }


        /// Render Different Views ///

            window.ub.pixi = {};  // PIXI wrapper methods

            window.ub.pixi.new_sprite = function (filename) {

                return new PIXI.Sprite( PIXI.Texture.fromImage( filename + '?v=' + (new Date() / 1000)) );

            };

            window.ub.setup_views = function () {

                _.each(ub.views, function(view) {

                    var view_name = view + '_view';

                    var base                                = ub.pixi.new_sprite( ub.assets[view_name].base );
                    var shape                               = ub.pixi.new_sprite( ub.assets[view_name].shape );
                    var shape_mask                          = ub.pixi.new_sprite( ub.assets[view_name].shape );

                    ub.objects[view_name]                   = {};

                    ub.objects[view_name].base              = base;
                    ub.objects[view_name].shape             = shape;
                    ub.objects[view_name].shape_mask        = shape_mask;

                    base.blendMode                          = PIXI.BLEND_MODES.MULTIPLY;

                    shape.zIndex                            = 2;
                    shape_mask.zIndex                       = 1;
                    base.zIndex                             = 0;

                    // default colors for the base

                    ub[view_name].addChild(base);
                    ub[view_name].addChild(shape);

                    ub.updateLayersOrder(ub[view_name]);

                });

            };

            window.ub.setup_material_options = function () {
                
                ub.current_material.options_distinct_names = {};

                _.each(ub.views, function(view) {

                    var material_options = _.where(ub.current_material.material.options, {perspective: view});
                    var current_view_objects = ub.objects[view + '_view']; 

                    _.each(material_options, function(obj) {

                        var name = obj.name.toLowerCase().replace(' ', '_');

                        current_view_objects[name] = ub.pixi.new_sprite( obj.material_option_path );
                        var current_object = current_view_objects[name];

                        current_object.zIndex = obj.layer_level;

                        /// replace this with test if not tintable
                       if( parseInt(obj.is_blend) ) {

                            current_object.blendMode = PIXI.BLEND_MODES.MULTIPLY;

                        } else {
                            
                            var default_color = JSON.parse(obj.colors)[0];
                            var color = _.find( ub.current_material.colors, { color_code: default_color });

                            current_object.tint = color.hex_code;

                            var modifier_label = name;

                            if ( name.search('shape') > 0 ) {

                                modifier_label =name.substr(0, name.length - 6);

                            }

                            ub.current_material.options_distinct_names[name] = { setting_type: obj.setting_type ,'modifier_label': modifier_label, 'material_option': name, 'default_color': color.hex_code, 'available_colors': JSON.parse(obj.colors) };
                        
                        }    

                        ub[view + '_view'].addChild(current_object);

                    });

                    ub.updateLayersOrder(ub[view + '_view']);

                });    

                /// Setup Modifiers 

                        var modifiers = '';

                        _.each(ub.current_material.options_distinct_names, function(obj){

                            // dont create modifier if Shadow

                            console.log('outside: ' + obj.setting_type);
                            console.log(obj);


                            if (obj.setting_type === 'shadow') {

                                console.log('inside: ' + obj.setting_type);
                                return;

                            }   

                            var header = '<div class="options_panel_section"><label>' + obj.material_option.replace('_',' ').toUpperCase().replace('SHAPE','') + '</label></div>';

                            var str_builder = header + '<div class="options_panel_section"><div class="color_panel_container">';

                            var color_elements = '';

                            _.each(obj.available_colors, function(color_obj) {

                                var color = _.find( ub.current_material.colors, { color_code: color_obj});

                                var element = '<div class="color_element">';
                                element = element + '<button class="btn change-color" data-panel="' + obj.material_option.split('_')[0] + '" data-target="' + obj.material_option + '" data-color="#' + color.hex_code + '" style="background-color: #' + color.hex_code + '; width: 35px; height: 35px; border-radius: 8px; border: 2px solid white;" data-layer="none" data-placement="bottom" title="' + color.name + '" data-selection="none"></button>';
                                element = element + '</div>';    

                                color_elements = color_elements + element;

                            });

                            str_builder = str_builder + color_elements;

                            str_builder = str_builder + '</div></div>';

                            modifiers = modifiers + str_builder;

                        });

                        var color_container = $('#colors_panel').append(modifiers);

                    ub.bind_handlers();

                    /// End Setup Modifiers

            };

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

                // default colors

                layer_1.tint = 0xdbd1c5;
                layer_2.tint = 0x8a8275;
                layer_3.tint = 0xb6b09f;
                layer_4.tint = 0x594e50;
                

                ub.pattern_view.addChild(layer_1);
                ub.pattern_view.addChild(layer_2);
                ub.pattern_view.addChild(layer_3);
                ub.pattern_view.addChild(layer_4);

                ub.updateLayersOrder(ub.pattern_view);


            }


        /// End Render Different Views ///


        /// Utilities ///

            ub.applyMaterial = function () {

                var texture                         = new PIXI.RenderTexture(ub.renderer,ub.dimensions.width,ub.dimensions.height);
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

                var texture                         = new PIXI.RenderTexture(ub.renderer, ub.dimensions.width, ub.dimensions.height);
                texture.render(ub[view]);

                return texture.getImage().src;

            }

            
            /// Refresh Thumbnail Views ///

            ub.refresh_thumbnails = function(){

                _.each(ub.views, function(view) {

                    var view_name = view + '_view';
                    var id = 'a#' + 'view_' + view + ' > img';

                    $( id ).attr('src', ub.getThumbnailImage( view_name ) );

                });

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
                ub.active.find('img').attr('src', filename);
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


        ub.bind_handlers = function (){

            $('.change-color').on('click', function(e){

               var color                        = $(this).data('color');
               var target                       = $(this).data('target');
               var panel                        = $(this).data('panel');

               if(color === "#000000"){ 
                    color                       = "#222222"; 
               }

               var color_element = $(this);

               window.ce = color_element;

               var selection = $(window.ce).data('selection');

               if(selection !== 'none'){
                    $( '#' + selection ).css( 'background-color', color );
               }

               color_element.parent().data( "active_color", color );

               ub.change_color( target, color, panel );
                
            }); 

            
            ub.change_color = function (obj, color, panel) {

                var color_value = parseInt(color.substring(1), 16);

                if(panel === 'base'){

                    if( typeof( ub.objects.left_view['pattern'] ) !== 'undefined' ){
                        
                        ub.objects.left_view['pattern'].visible     = false;
                        ub.objects.right_view['pattern'].visible    = false;
                        ub.objects.front_view['pattern'].visible    = false;
                        ub.objects.back_view['pattern'].visible     = false;

                    }
                    
                    ub.objects.left_view[obj].tint                  = color_value;
                    ub.objects.right_view[obj].tint                 = color_value;
                    ub.objects.front_view[obj].tint                 = color_value;
                    ub.objects.back_view[obj].tint                  = color_value;
                    
                } else if (panel == 'patterns') {

                    ub.objects.pattern_view[obj].tint   = color_value;

                    ub.applyMaterial();

                    ub.objects.left_view['pattern'].visible = true;
                    ub.objects.right_view['pattern'].visible = true;
                    ub.objects.front_view['pattern'].visible = true;
                    ub.objects.back_view['pattern'].visible = true;
                      
                } else {

                    if(typeof( ub.objects.front_view[obj] ) !== 'undefined') {

                        ub.objects.front_view[obj].tint = color_value;    

                    }

                    if(typeof( ub.objects.back_view[obj] ) !== 'undefined') {

                        ub.objects.back_view[obj].tint = color_value;    

                    }

                    if(typeof( ub.objects.left_view[obj] ) !== 'undefined') {

                        ub.objects.left_view[obj].tint = color_value;    

                    }

                    if(typeof( ub.objects.right_view[obj] ) !== 'undefined') {

                        ub.objects.right_view[obj].tint = color_value;    

                    }

                   
                }

                
                ub.refresh_thumbnails();

                $('[rel="popover"]').popover("hide");


            }
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

