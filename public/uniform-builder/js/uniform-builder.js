 $( document ).ready(function() {


    /// NEW RENDERER ///

        /// Initialize Uniform Builder

        window.ub.initialize = function (){

            if(window.ub.config.material_id === -1) {
                
                return;
                
            }

            /// Setup Properties

                ub.ui                   = {};
                ub.modifiers            = {};
                ub.tethers              = {}; 
                ub.dimensions           = {};

                ub.active               = null;
                ub.container_div        = 'main_view';
                ub.dimensions.width     = 496;
                ub.dimensions.height    = 550;

                ub.views = ['front', 'back', 'left', 'right'];

                ub.stage                = new PIXI.Container();
                ub.stage.interactive    = true;

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

                ub.design_sets_url = window.ub.config.api_host + '/api/design_sets/';
                ub.loader(ub.design_sets_url, 'design_sets', ub.load_design_sets);

                ub.materials_url = window.ub.config.api_host + '/api/materials/';
                ub.loader(ub.materials_url, 'materials', ub.load_materials);

                ub.patterns_url = window.ub.config.api_host + '/api/patterns/';
                ub.loader(ub.patterns_url, 'patterns', ub.load_patterns);


            /// Activate Views

                $('#main_view').parent().fadeIn();
                window.ub.refresh_thumbnails();

            /// End Activate Views
            
            /// Misc Data Setup     

                ub.data = {};
                ub.data.sports = [
                    {
                        gender: 'Men',
                        sports: [
                            {
                                name: 'Baseball',
                                active: "1",
                            },
                            {
                                name: 'Basketball',
                                active: "1",
                            },
                            {
                                name: 'Football',
                                active: "1",
                            },
                            {
                                name: 'Hockey',
                                active: "1",
                            },
                            {
                                name: 'Lacrosse',
                                active: "1",
                            },
                            {
                                name: 'Soccer',
                                active: "1",
                            }, 
                        ],
                    },
                    {
                        gender: 'Women',
                        sports: [
                            {
                                name: 'Baseball',
                                active: "1",
                            },
                            {
                                name: 'Softball',
                                active: "1",
                            },
                            {
                                name: 'Hockey',
                                active: "1",
                            },
                            {
                                name: 'Lacrosse',
                                active: "1",
                            },
                            {
                                name: 'Volleyball',
                                active: "1",
                            },
                            {
                                name: 'Soccer',
                                active: "1",
                            }, 
                        ],
                    },
                    {
                        gender: 'Youth',
                        sports: [
                            {
                                name: 'Baseball',
                                active: "1",
                            },
                            {
                                name: 'Basketball',
                                active: "1",
                            },
                            {
                                name: 'Football',
                                active: "1",
                            },
                            {
                                name: 'Soccer',
                                active: "1",
                            },
                        ],
                    },

                ];

            /// End Misc Data Setup    

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

         ub.display_gender_picker = function () {

            $('#arrow_design_sets').remove();

            $('#main_view > .picker_container').hide();
            $('#main_view > .picker_container').html('');

            var str_builder = '';

            var genders = ['Men', 'Women', 'Youth'];

            _.each(genders, function(obj, index) {

                var filename = window.ub.config.thumbnails_path + obj.toLowerCase() + '.png';
                
                var element =  "<div class='gender_picker_header'>" + obj + '</div>';
                    element += '<div class="gender_picker" data-picker-type="gender" data-index = "' + index+ '" data-gender="' + obj + '" style="background-image:url(' + filename +');">' + '</span></div>';

                str_builder  += element;

            });

            $('#main_view > .picker_container').html(str_builder);
            $('#main_view > .picker_container').fadeIn();


            ub.bind_handler_design_set_picker();

        };

        
        ub.display_categories = function(gender){

            $('#arrow_design_sets').remove();

            var sports                  = _.find( ub.data.sports, {gender: gender} );
            var active_sport_categories = _.where( sports.sports, {active: "1"} );

            $('#main_view > .picker_container').hide();
            $('#main_view > .picker_container').html('');

            var elements = '';
            var gender_element = '<span>' + gender + '</span>';
            var back_element   = '<button onclick="ub.display_gender_picker()"><i class="fa fa-chevron-circle-left"></i></button>'
            var header   = '<div class="picker_header">' + gender_element + back_element + '</div>';

            elements = header;

            _.each(active_sport_categories, function(category, index){

                var filename    = window.ub.config.thumbnails_path + category.name.toLowerCase() + '.jpg';
                var element     = '<div class="sports_categories" data-gender="'+ gender + '" data-category="' + category.name + '" style="background-image:url(' + filename +');">' + '<span class="categories_label">' + category.name + '</span></div>';

                elements += element;
                
            });

            $('#main_view > .picker_container').html(elements);
            $('#main_view > .picker_container').fadeIn();

            ub.bind_handler_category_picker();

        };

        
        /// Gradients

        ub.gradients = {

            items: [

                {
                    name: "None",
                    code: "none",
                    angle: 0,

                    color_stops: [

                    ],
                },
                {
                    
                    name: "Bottom To Top",
                    code: "bottom_to_top",
                    angle: 0,

                    color_stops: [
                        {
                           id: 1,
                           value: 0,
                           color: '#ffffff',     
                        },
                        {
                           id: 2,
                           value: 0.9,
                           color: '#5e5e5e',     
                        },

                    ],
                },
                {
                    name: "Top To Bottom",
                    code: "top_to_bottom",
                    angle: 180,

                    color_stops: [

                        {
                           id: 1,
                           value: 0,
                           color: '#ffffff',     
                        },
                        {
                           id: 2,
                           value: 0.9,
                           color: '#5e5e5e',     
                        },

                    ],

                },
                {
                    
                    name: "Sharp Edge",
                    code: "sharp_edge",
                    angle: 0,

                    color_stops: [
                        {
                           id: 1,
                           value: 0,
                           color: '#5e5e5e',     
                        },
                        {
                           id: 1,
                           value: 0.9,
                           color: '#5e5e5e',     
                        },
                        {
                           id: 2,
                           value: 1,
                           color: '#ffffff',     
                        },

                    ],
                },  
                {
                    
                    name: "Radial",
                    code: "radial",
                    angle: 180,

                    color_stops: [
                        {
                           id: 1,
                           value: 0,
                           color: '#ffffff',     
                        },
                        {
                           id: 2,
                           value: 1,
                           color: '#5e5e5e',     
                        },

                    ],
                },
                {
                    name: "Diagonal 1",
                    code: "diagonal_1",
                    angle: 45,

                    color_stops: [
                        {
                           id: 1,
                           value: 0,
                           color: '#ffffff',     
                        },
                        {
                           id: 2,
                           value: 0.2,
                           color: '#5e5e5e',     
                        },
                        {
                           id: 2,
                           value: 0.3,
                           color: '#5e5e5e',     
                        },
                        {
                        id: 2,
                           value: 0.4,
                           color: '#ffffff',     
                        },
                        {
                           id: 2,
                           value: 0.8,
                           color: '#5e5e5e',     
                        },
                        {
                           id: 2,
                           value: 0.9,
                           color: '#5e5e5e',     
                        },
                        {
                        id: 2,
                           value: 1,
                           color: '#ffffff',     
                        },
                      
                    ],
                },    
              {
                    name: "Diagonal 2",
                    code: "diagonal_2",
                    angle: -45,

                    color_stops: [
                        {
                           id: 1,
                           value: 0,
                           color: '#ffffff',     
                        },
                        {
                           id: 2,
                           value: 0.2,
                           color: '#5e5e5e',     
                        },
                        {
                           id: 2,
                           value: 0.3,
                           color: '#5e5e5e',     
                        },
                        {
                        id: 2,
                           value: 0.4,
                           color: '#ffffff',     
                        },
                        {
                           id: 2,
                           value: 0.8,
                           color: '#5e5e5e',     
                        },
                        {
                           id: 2,
                           value: 0.9,
                           color: '#5e5e5e',     
                        },
                        {
                        id: 2,
                           value: 1,
                           color: '#ffffff',     
                        },
                      
                    ],
                },    
                {
                    name: "Diagonal 3",
                    code: "diagonal_3",
                    angle: 45,

                    color_stops: [
                        {
                           id: 1,
                           value: 0,
                           color: '#ffffff',     
                        },
                        {
                           id: 2,
                           value: 0.4,
                           color: '#5e5e5e',     
                        },
                        {
                           id: 2,
                           value: 0.6,
                           color: '#5e5e5e',     
                        },

                        {
                           id: 2,
                           value: 1,
                           color: '#ffffff',     
                        },

                    ],
                },       
 
            ]

        }

        /// End Gradients

        ub.display_design_sets = function (category, gender, type) {

            $('#arrow_design_sets').remove();

            $('#main_view > .picker_container').hide();
            $('#main_view > .picker_container').html('');

            var elements = '';

            var gender_element          = '<span>' + gender + '</span>';
            var back_element            = '<button onclick="ub.display_gender_picker()"><i class="fa fa-chevron-circle-left"></i></button>'
            var header                  = '<div class="picker_header">' + gender_element + back_element + '</div>';

            var category_element        = '<span>' + category + '</span>';
            var category_back_element   = '<button onclick=ub.display_categories("' + gender + '")><i class="fa fa-chevron-circle-left"></i></button>'
            var category_header         = '<div class="picker_header">' + category_element + category_back_element + '</div>';

            var group_element_1         = '<button class="button_tabs all" data-type="All" data-gender="' + gender + '" data-category="' + category + '">Jersey and Pant</button>';
            var group_element_2         = '<button class="button_tabs upper" data-type="upper" data-gender="' + gender + '" data-category="' + category + '">Jersey</button>';
            var group_element_3         = '<button class="button_tabs lower" data-type="lower" data-gender="' + gender + '" data-category="' + category + '">Pant</button>';
            var group_header            = '<div class="picker_header picker_header_tabs" style="text-align: center;">' + group_element_1 + group_element_2 + group_element_3 + '</div>';


            elements = header + category_header + group_header;

            var design_sets = _.where( ub.design_sets, { category: category, gender: gender.toLowerCase() } );

            if(type === 'All'){
            
                design_sets = _.where( ub.design_sets, { category: category, gender: gender.toLowerCase() } );
            
            } else {

                design_sets = _.where( ub.materials, { uniform_category: category, gender: gender.toLowerCase(), type: type } );

            }

            _.each(design_sets, function(obj) {

                var filename = obj.thumbnail_path;
                var element = '<div class="style_entry" data-option="' + type + '" data-picker-type="design_sets" data-id = "' + obj.id + '" data-name="' + obj.name + '" style="background-image:url(' + filename +');">' + '<span class="style_label">' + obj.name + '</span></div>';

                elements += element;
                
            });
            
            var phrase = "for <strong>" + gender + " / " + category + "</strong>.";

            if (design_sets.length === 0) {
                elements += "<div style='clear:both;'></div><div class='no_designs'>No Uniform Designs " + phrase + "</div>";
            }
            else if (design_sets.length === 1) {
                elements += "<div style='clear:both;'></div><div class='no_designs'>1 Uniform Design " + phrase + "</div>";
            }
            else {
                elements += "<div style='clear:both;'></div><div style='clear: both'></div><div><div class='no_designs' style='clear:both;'>" + design_sets.length + " Uniform Designs found " + phrase + "</div></div>";
            }

            $('#main_view > .picker_container').html(elements);
            $('#main_view > .picker_container').show();

             /// Highlight Button

                var current_button = $('.button_tabs.' + type.toLowerCase());
                var down_arrow = '<div id="arrow_design_sets" class="down_arrow">';

                $("body").append(down_arrow);

                var arrow_obj = $('#arrow_design_sets');

                var t = new Tether({
                  element: arrow_obj,
                  target: current_button,
                  attachment: 'top center',
                  targetAttachment: 'bottom center'
                });

                current_button.css('background-color', '#353536');
                current_button.css('color', '#f8f8f8');
                $('.down_arrow:not(.tether-element)').remove();

                ub.tethers['design_sets'] = t;

            /// End Highlight Button

            ub.bind_handler_design_set_picker();
            ub.bind_design_sets_tab_handlers(); 

        };

        ub.load_design_sets = function(obj, object_name){

            ub.design_sets = {};
            ub.design_sets = obj;

            ub.design_sets = _.where(ub.design_sets, { active: "1" });

        }

        ub.load_materials = function(obj, object_name){

            ub.materials = {};
            ub.materials = obj;

        }

        ub.load_patterns = function(obj, object_name){

            ub.patterns = {};
            ub.patterns = obj;

            ub.patterns = _.where(ub.patterns, {active: "1"});

        }

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
            
            var frames_to_refresh = 7 * 60; // 60 frames in one sec, average

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

                    var shape                               = ub.pixi.new_sprite( ub.assets[view_name].shape );
                    var shape_mask                          = ub.pixi.new_sprite( ub.assets[view_name].shape );

                    ub.objects[view_name]                   = {};
                    ub.objects[view_name].shape             = shape;
                    ub.objects[view_name].shape_mask        = shape_mask;

                    shape.tint                              = 0xeeeded; 
                    shape.zIndex                            = 2;
                    shape_mask.zIndex                       = 1;
           
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

                        current_object.zIndex = obj.layer_level * ( -1 );

                        if( obj.setting_type === 'highlights' ) {

                            current_object.blendMode = PIXI.BLEND_MODES.SCREEN;

                        } else if( obj.setting_type === 'shadows' ) {

                            current_object.blendMode = PIXI.BLEND_MODES.MULTIPLY;

                        } else {
                            
                            var default_color = JSON.parse(obj.colors)[0];
                            var color = _.find( ub.current_material.colors, { color_code: default_color });

                            current_object.tint = parseInt(color.hex_code, 16);

                            var modifier_label = name;

                            if ( name.search('shape') > 0 ) {

                                modifier_label = name.substr(0, name.length - 6);

                            } 

                            ub.current_material.options_distinct_names[name] = { setting_type: obj.setting_type ,'modifier_label': modifier_label, 'material_option': name, 'default_color': color.hex_code, 'available_colors': JSON.parse(obj.colors), 'layer_order': obj.layer_level, };
                        
                        }

                        ub[view + '_view'].addChild(current_object);

                       

                    });

                    ub.updateLayersOrder(ub[view + '_view']);

                });    

                /// Setup Modifiers Colors

                    var modifiers = '';

                    var sorted = _.sortBy(ub.current_material.options_distinct_names, function(o) { return o.layer_order; })

                    _.each(sorted, function(obj) {

                        // dont create modifiers if setting type is static or the layer will have to be blended with other layers

                        var no_modifiers = ['static_layer', 'highlights', 'shadows'];

                        if ( _.contains(no_modifiers, obj.setting_type) ) {
                            return;
                        }

                        var code = obj.material_option;
                        var name = obj.material_option.replace('_',' ').toUpperCase();
                        ub.modifiers[code] = name;

                        var header = '<div class="options_panel_section"><label>' + obj.material_option.replace('_',' ').toUpperCase() + '</label>  <button class="color_base modifier button_tabs" data-option="' + code + '">Color </button> </div>';
                        var str_builder = header + '<div class="options_panel_section" data-option="' + code + '" data-group="colors"><div class="color_panel_container">';
                        var color_elements = '';

                        _.each(obj.available_colors, function(color_obj) {

                            var color = _.find( ub.current_material.colors, { color_code: color_obj});

                            var element = '<div class="color_element">';
                            element = element + '<button class="btn change-color" data-panel="' + obj.material_option.split('_')[0] + '" data-target="' + code + '" data-color="#' + color.hex_code + '" style="background-color: #' + color.hex_code + '; width: 35px; height: 35px; border-radius: 8px; border: 2px solid white; padding: 0px;" data-layer="none" data-placement="bottom" title="' + color.name + '" data-selection="none"></button>';
                            element = element + '</div>';    

                            color_elements = color_elements + element;

                        });

                        str_builder = str_builder + color_elements;
                        str_builder = str_builder + '</div></div>';
                        modifiers = modifiers + str_builder;

                    });

                var color_container = $('#colors_panel').append(modifiers);

                ub.bind_handlers();
                ub.bind_left_sidebar_tab_handlers();

                /// End Setup Modifiers Colors

                /// Setup Modifiers Gradients

                    var modifiers = '';
                    var sorted = _.sortBy(ub.current_material.options_distinct_names, function(o) { return o.layer_order; })

                    _.each(sorted, function(obj){

                        // dont create modifiers if setting type is static or the layer will have to be blended with other layers

                        var no_modifiers = ['static_layer', 'highlights', 'shadows', 'piping'];

                        if ( _.contains(no_modifiers, obj.setting_type) ) {
                            return;
                        }

                        var code = obj.material_option;
                        var name = obj.material_option.replace('_',' ').toUpperCase();
                        
                        var header = '<div class="options_panel_section"><label>' + name + '</label>  <button class="gradient_base modifier button_tabs" data-option="' + code + '">Gradient </button> </div>';
                        var str_builder = header + '<div class="options_panel_section" data-option="' + code + '" data-group="gradients"><div class="gradient_panel_container">';
                        var gradient_elements = '';

                        _.each(ub.gradients.items, function(gradient_obj) {

                            var element = '<div class="gradient_element">';
                            var filename = '/images/sidebar/' + gradient_obj.code + '.png';

                            element = element + '<button class="btn change-gradient" data-panel="' + obj.material_option.split('_')[0] + '" data-target-gradient="' + code + '" data-gradient="' + gradient_obj.code + '" style="background-image: url(' + filename + '); width: 100%; height: 100%; border: 1px solid #656565; padding: 0px; background-size: cover;" data-layer="none" data-placement="bottom" title="' + gradient_obj.name + '" data-selection="none"></button>';
                            element = element + '</div>';    

                            gradient_elements = gradient_elements + element;

                        });

                        str_builder = str_builder + gradient_elements;
                        str_builder = str_builder + '</div><div class="color_stops_container">test</div></div>';
                        modifiers = modifiers + str_builder;

                    });

                    var gradient_container = $('#gradients_panel').append(modifiers);
                    ub.bind_handlers();
                    ub.bind_left_sidebar_tab_handlers();

                /// End Setup Modifiers Gradients

            };

            window.ub.setup_pattern_view = function(){


                var layer_1                         = ub.pixi.new_sprite( ub.assets.pattern.layers[0] );
                var layer_2                         = ub.pixi.new_sprite( ub.assets.pattern.layers[1] );
                var layer_3                         = ub.pixi.new_sprite( ub.assets.pattern.layers[2] );
                var layer_4                         = ub.pixi.new_sprite( ub.assets.pattern.layers[3] );

                layer_1.width = ub.dimensions.width;
                layer_1.height = ub.dimensions.height;
                layer_2.width = ub.dimensions.width;
                layer_2.height = ub.dimensions.height;
                layer_3.width = ub.dimensions.width;
                layer_3.height = ub.dimensions.height;
                layer_4.width = ub.dimensions.width;
                layer_4.height = ub.dimensions.height;

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
            $('div#right-sidebar > a.sidebar-buttons').css('background-color','#acacac');
            $(panel).fadeIn(100);

        }

        /// RIGHT SIDEBAR

            $('div#right-sidebar > a.sidebar-buttons').on('click', function(e){

                $('#arrow_design_sets').remove();

                if(ub.active !== null){

                    filename    = ub.config.host + '/images/sidebar/' + ub.active.data('filename') + '.png';
                    ub.active.css('background-image', 'url(' + filename + ')');
                    ub.active.removeClass('active_button');

                }

                ub.active       = $(this);
                filename        = ub.config.host + '/images/sidebar/' + ub.active.data('filename') + '-on' + '.png';

                ub.active.css('background-image', 'url(' + filename + ')');
                ub.active.addClass('active_button');

                switch_panel('#' +  ub.active.data('filename') + '_panel');

                return false;

            });

            $('div#right-sidebar > a.sidebar-buttons').hover(function(e){

                var s = $(e.currentTarget)
                var option = s.data('filename');
                var filename = ub.config.host + '/images/sidebar/' + option + '-on.png';

                if( s.is($('#right-sidebar > a.active_button')[0]) ) {
                    return;
                }
                
                s.css('background-color','#363636');
                s.css('background-image', 'url(' + filename + ')');
 
            }, function (e){

                var s = $(e.currentTarget);

                if( s.is($('#right-sidebar > a.active_button')[0]) ) {
                    return;
                }

                var option = s.data('filename');
                var filename = ub.config.host + '/images/sidebar/' + option + '.png';
                
                s.css('background-color','#acacac');
                s.css('background-image', 'url(' + filename + ')');                       

            });

        /// END RIGHT SIDEBAR


        /// LEFT SIDEBAR

            $('div#left-sidebar > a.sidebar-buttons').hover(function(e){

                var s = $(e.currentTarget).attr('class').split(' ')[0];
                var sidebar_classes = ['btn-new', 'btn-load', 'btn-compare', 'btn-save'];

                if ( _.contains(sidebar_classes, s) ) {

                    if(s === 'btn-new' && $('a.' + s).data('status') === 'close'){
                        return;
                    }

                    $('a.' + s).css('background-color','#363636');

                    var option = $('a.' + s).data('option');
                    var filename = ub.config.host + '/images/sidebar/' + option + '-on.png';

                    $('a.' + s).css('background-image', 'url(' + filename + ')');

                }                           

            }, function (e){

                var sidebar_classes = ['btn-new', 'btn-load', 'btn-compare', 'btn-save'];
                var s = $(e.currentTarget).attr('class').split(' ')[0];

                if ( _.contains(sidebar_classes, s) ) {

                    if($('a.' + s).data('status') === 'new' || s !== 'btn-new') {
                        
                        $('a.' + s).css('background-color','#acacac');

                        var option = $('a.' + s).data('option');
                        var filename = ub.config.host + '/images/sidebar/' + option + '.png';

                        $('a.' + s).css('background-image', 'url(' + filename + ')');

                    }    

                }                           

            });

            $('div#left-sidebar > a.sidebar-buttons').on('click', function(e){

                $('#arrow_design_sets').remove();

                var s = $(e.currentTarget).attr('class').split(' ')[0];
                
                if ( s === "btn-new" ) {

                    var status = $('a.btn-new').data('status');

                    if(status === 'new') {

                        $('#main_view > canvas').hide();
                        $('#right-main-window > .options_panel').hide();
                        $('#camera-views').hide();
                        $('#right-sidebar > a').hide();

                        var div_sports = "<div class='picker_container'></div>"
                        
                        $('#main_view').append(div_sports);
                        $('#left-main-window').css('overflow-y', 'scroll'); 

                        var filename = '/images/sidebar/' + 'close.png';
                        
                        $('a.btn-new').css('background-image', 'url(' + filename + ')');
                        $('a.btn-new').css('background-color','#363636');
                        $('#right-main-window').css('background-color','#f8f8f8');
                        $('a.btn-new').data('status','close');

                        ub.display_gender_picker();

                    }
                    else {

                        $('#main_view > canvas').fadeIn();
                        $('#right-main-window > .options_panel').fadeIn();
                        $('#camera-views').fadeIn();
                        $('#right-sidebar > a').fadeIn();

                        $('#main_view > div.picker_container').remove();
                        $('#right-main-window > div.picker_container').remove();

                        $('#left-main-window').css('overflow-y', 'hidden'); 

                        var filename = '/images/sidebar/' + 'new.png';
 
                        $('a.btn-new').css('background-image', 'url(' + filename + ')');
                        $('a.btn-new').css('background-color','#acacac');
 
                        $('#right-main-window').css('background-color','#ffffff');
                        $('#left-main-window').css('background-color','#ffffff');

                        $('a.btn-new').data('status','new');

                        switch_panel('#materials_panel');

                    }

                }

                return false;

            });

        /// END LEFT SIDEBAR

        /// Process Changes ///

        ub.bind_handler_category_picker = function() {

            $('div.sports_categories').hover(function(e){

                $('div.sports_categories').removeClass('sports_categories_highlighted');

                var el = $(e.currentTarget);
                el.addClass('sports_categories_highlighted');

            }, function (e){
                
                var el = $(e.currentTarget);
                el.removeClass('sports_categories_highlighted');

            });

            $('div.sports_categories').click(function(e){

                if( typeof( ub.ui.active_element  ) !== 'undefined'  ) {

                    ub.ui.active_element.removeClass('sports_categories_activated');

                }    

                ub.ui.active_element = $(e.currentTarget);
                ub.ui.active_element.addClass('sports_categories_activated');

                var category = ub.ui.active_element.data('category');
                var gender = ub.ui.active_element.data('gender');

                ub.display_design_sets(category, gender, 'All');

            });

        };

        ub.bind_handler_design_set_picker = function() {

            $('div.style_entry').hover(function(e){

                $('div.style_entry').removeClass('style_entry_highlighted');

                var el = $(e.currentTarget);
                el.addClass('style_entry_highlighted');

            }, function (e){
                
                var el = $(e.currentTarget);
                el.removeClass('style_entry_highlighted');

            });

            $('div.style_entry').click(function(e){

                ub.ui.active_style_element = $(e.currentTarget);

                var picker_type = ub.ui.active_style_element.data('picker-type');

                if(picker_type === 'design_sets') {

                    var id = -1;
                    var url = '';

                    var option = ub.ui.active_style_element.data('option');

                    id = ub.ui.active_style_element.data('id');

                    if ( option === 'All') {
                        url = ub.config.host + '/uniform-builder/' + id + '/set';    
                    }
                    else {
                        url = ub.config.host + '/uniform-builder/' + id + '/single';    
                    }

                    ub.ui.current_design_set = _.find(ub.design_sets, {id: id});
                    window.location = url;

                }
                else {

                    var category_name = ub.ui.active_style_element.data('category-name');
                    var gender_name = ub.ui.active_style_element.data('gender').toLowerCase();

                    ub.display_design_sets( category_name, gender_name, 'All' );

                    $('#active_sports_category').text( category_name.toUpperCase() + ' > ' + gender_name.toUpperCase() );

                }

            });


            /* Gender Picker */

                $('div.gender_picker').click(function(e){

                    var element                 = $( e.currentTarget );
                    var gender                  = element.data( 'gender' );

                    ub.display_categories( gender );

                });

                $('div.gender_picker').hover(function(e){

                    $('div.gender_picker').removeClass('gender_picker_highlighted');

                    var el = $(e.currentTarget);
                    el.addClass('gender_picker_highlighted');

                }, function (e){
                    
                    var el = $(e.currentTarget);
                    el.removeClass('gender_picker_highlighted');

                });

            /* End Gender Picker */

        };

        ub.bind_handlers = function (){

            $('.change-color').on('click', function(e){

               var color                        = $(this).data('color');
               var target                       = $(this).data('target');
               var panel                        = $(this).data('panel');
               var color_element = $(this);

               window.ce = color_element;

               var selection = $(window.ce).data('selection');

               if(selection !== 'none'){
                    $( '#' + selection ).css( 'background-color', color );
               }

               color_element.parent().data( "active_color", color );
               ub.change_color( target, color, panel );

               $("button[data-target='" + target +"']").html('');

               var path = '/images/sidebar/';
               var highlighter = '';

               if( color === "#ffffff"){
                    path = path + 'highlighter-dark.png';
               }
               else {
                    path = path + 'highlighter_1.png';
               }

               highlighter = "<img src = '" + path + "'>"
               
               $(this).html(highlighter);
                
            }); 

            
            ub.change_color = function (obj, color, panel) {

                var color_param = color;

                if(color_param === '#ffffff'){
                    color_param = "#eeeded";
                }

                var color_value = parseInt(color_param.substring(1), 16);

                if(panel === 'body'){

                    if( typeof( ub.objects.left_view['pattern'] ) !== 'undefined' ){

                        ub.objects.left_view['pattern'].visible     = false;
                        ub.objects.right_view['pattern'].visible    = false;
                        ub.objects.front_view['pattern'].visible    = false;
                        ub.objects.back_view['pattern'].visible     = false;

                    }

                    if(typeof(ub.objects.pattern_view.gradient_layer) === "object") {

                        ub.objects.left_view['gradient'].visible     = false;
                        ub.objects.right_view['gradient'].visible    = false;
                        ub.objects.front_view['gradient'].visible    = false;
                        ub.objects.back_view['gradient'].visible     = false;
                        
                    }
                    
                    ub.objects.left_view[obj].tint                  = color_value;
                    ub.objects.right_view[obj].tint                 = color_value;
                    ub.objects.front_view[obj].tint                 = color_value;
                    ub.objects.back_view[obj].tint                  = color_value;
  
                } else if (panel == 'patterns') {

                    if(typeof(ub.objects.pattern_view.gradient_layer) === "object") {

                        ub.objects.pattern_view.gradient_layer.visible = false;

                    }


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


            /// Change Gradient ///

                $('.change-gradient').on('click', function(e){

                   var gradient = $(this).data('gradient');
                   var target = $(this).data('target-gradient');
                   var panel = $(this).data('panel');
                   var gradient_element = $(this);

                   window.ce = gradient_element;

                   var selection = $(window.ce).data('selection');

                   gradient_element.parent().data( "active_gradient", gradient );
                   
                   ub.change_gradient( target, gradient, panel );

                   $("button[data-target-gradient='" + target +"']").html('');

                   var path = '/images/sidebar/';
                   var highlighter = '';

                   path = path + 'highlighter_1.png';

                   highlighter = "<img src = '" + path + "'>"
                   
                   $(this).html(highlighter);
                    
                }); 

            /// End Change Gradient ///

        };


        ub.change_gradient = function( target, gradient, panel ){

            var el = _.find(ub.gradients.items, { code: gradient });

            ub.generate_gradient(el,target);
            
            var cont = $("[data-group=gradients][data-option=" + target +  "]").find('div.color_stops_container');

            cont.html('');

            var elements = "";

            if(el.color_stops.length > 0){

                elements = "Color Stops: <br />";

            }

            _.each(el.color_stops, function(e){

                var val = e.value;
                var col = e.color;
                var el = "";

                el += "<br />Val: " + val;
                el += "<br />Col: " + col;
                el += "<br />";

                elements += el;

            });

            cont.html(elements);

        };


        ub.bind_design_sets_tab_handlers = function(){

            $('button.button_tabs').click(function(e) {

                $('button.button_tabs').css('background-color', '#f8f8f8');
                $('button.button_tabs').css('color', '#353536');

                var current_button = $(e.currentTarget);
                var category = current_button.data('category');
                var gender = current_button.data('gender');
                var type = current_button.data('type');
                
                ub.display_design_sets(category, gender, type);
    
            });

        }

        ub.bind_left_sidebar_tab_handlers = function() {

            $('.color_base').click(function (e){

                var option = $(this).data('option');

                $("div[data-group='colors']").css('display','none');
                $("div[data-option='" + option + "']").show(100);

                $('.color_base').removeClass('tether_button');

                var current_button = $(this);
                var down_arrow = '<div id="arrow_design_sets" class="down_arrow">';

                $("body").append(down_arrow);

                var arrow_obj = $('#arrow_design_sets');

                var t = new Tether({
                  element: arrow_obj,
                  target: current_button,
                  attachment: 'top center',
                  targetAttachment: 'bottom center'
                });

                current_button.addClass('tether_button');
                $('.down_arrow:not(.tether-element)').remove();

                ub.tethers['modifiers'] = t;

            });

            $("div[data-group='colors']").hide();
            $("div[data-option='body']").fadeIn('fast');


            $('.gradient_base').click(function (e){

                var option = $(this).data('option');

                $("[data-group='gradients']").css('display','none');
                $("div[data-option='" + option + "']").show(100);

                $('.gradient_base').removeClass('tether_button');

                var current_button = $(this);
                var down_arrow = '<div id="arrow_design_sets" class="down_arrow">';

                $("body").append(down_arrow);

                var arrow_obj = $('#arrow_design_sets');

                var t = new Tether({

                  element: arrow_obj,
                  target: current_button,
                  attachment: 'top center',
                  targetAttachment: 'bottom center'

                });

                current_button.addClass('tether_button');
                $('.down_arrow:not(.tether-element)').remove();

                ub.tethers['modifiers'] = t;

            });

            $("div[data-group='gradients']").hide();
            $("div[data-option='body']").fadeIn('fast');

        }

        ub.generate_gradient = function (gradient_obj, target) {

            var uniform_type = ub.current_material.material.type;
            var bounds;  

            if( uniform_type === "upper" ) {



            }

            var gradient_width  = 496;
            var gradient_height = 550;

            var canvas = document.createElement('canvas');
                
            canvas.width = ub.dimensions.width;
            canvas.height = ub.dimensions.height;

            var ctx = canvas.getContext('2d');

            var gradient;

            if (gradient_obj.code === "radial" ){

                var center_x = 250;
                var center_y = 250;

                var radius_inner_circle = 20;
                var radius_outer_circle = 100;

                var canvas_width = 496;
                var canvas_height = 550;

                var origin_x = canvas_width / 2;
                var origin_y = canvas_height / 2;

                gradient = ctx.createRadialGradient(center_x, center_y, radius_inner_circle, center_x, center_y, radius_outer_circle);

            }
            else {

                gradient = ctx.createLinearGradient(0,22,0,410);

            }
            
            _.each(gradient_obj.color_stops, function(color_stop){

                gradient.addColorStop(color_stop.value, color_stop.color);

            });

            ctx.fillStyle = gradient;

            var rotation = gradient_obj.angle;

            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(rotation*Math.PI/180);
            ctx.translate(-canvas.width/2, -canvas.height/2);

            ctx.fillRect(0,0,ub.dimensions.height,ub.dimensions.height);

            var texture = PIXI.Texture.fromCanvas(canvas);

            var pattern_front                   = new PIXI.Sprite( texture );
            var pattern_back                    = new PIXI.Sprite( texture );
            var pattern_left                    = new PIXI.Sprite( texture );
            var pattern_right                   = new PIXI.Sprite( texture );

            var gradient_layer = new PIXI.Sprite( texture );
            gradient_layer.zIndex = 1;

            if(typeof(ub.objects.pattern_view.gradient_layer) === "object") {
                ub.pattern_view.removeChild(ub.objects.pattern_view.gradient_layer);
            }

            ub.objects.pattern_view.gradient_layer = gradient_layer;
            ub.pattern_view.addChild(ub.objects.pattern_view.gradient_layer);
            ub.updateLayersOrder(ub.pattern_view);

            if(typeof(ub.objects.left_view.gradient) !== 'undefined'){
                ub.left_view.removeChild(ub.objects.left_view.gradient);    
            }
            
            pattern_left.zIndex = 1;
            pattern_left.mask = ub.objects.left_view.shape_mask;
            ub.objects.left_view.gradient = pattern_left;
            ub.left_view.addChild(pattern_left);


            if(typeof(ub.objects.right_view.pattern) !== 'undefined'){
                ub.right_view.removeChild(ub.objects.right_view.gradient);    
            }

            ub.right_view.removeChild(ub.objects.right_view.gradient);
            pattern_right.zIndex = 1;
            pattern_right.mask = ub.objects.right_view.shape_mask;
            ub.objects.right_view.gradient = pattern_right;
            ub.right_view.addChild(pattern_right);


            if(typeof(ub.objects.front_view.gradient) !== 'undefined'){
                ub.front_view.removeChild(ub.objects.front_view.gradient);    
            }

            ub.front_view.removeChild(ub.objects.front_view.gradient);
            pattern_front.zIndex = 1;
            pattern_front.mask = ub.objects.front_view.shape_mask;
            ub.objects.front_view.gradient = pattern_front;
            ub.front_view.addChild(pattern_front);

            
            if(typeof(ub.objects.back_view.pattern) !== 'undefined'){
                ub.back_view.removeChild(ub.objects.back_view.gradient);    
            }

            ub.back_view.removeChild(ub.objects.back_view.gradient);
            pattern_back.zIndex = 1;
            pattern_back.mask = ub.objects.back_view.shape_mask;
            ub.objects.back_view.gradient = pattern_back;
            ub.back_view.addChild(pattern_back);

            ub.updateLayersOrder(ub.left_view);
            ub.updateLayersOrder(ub.right_view);
            ub.updateLayersOrder(ub.front_view);
            ub.updateLayersOrder(ub.back_view);

            ub.refresh_thumbnails();

        };

        /// End Process Changes /// 

        /// Utilities ///

            $('#view_pattern').hide();

            $('button#toggle_pattern_preview').on('click', function(e) {

                $('#view_pattern').toggle();

            });

        /// End Utilities ///

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

   
    // Reposition All Tethers

        $(window).scroll( function(e) {

            _.each(ub.tethers, function(obj) {
                obj.position();
            });

        });

    /// End Reposition All Tethers


    /// Get Mouse Click Location

   


    /// End Get Mouse Click Location


 });   

