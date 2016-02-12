$(document).ready(function () {

    /// NEW RENDERER ///

        /// Initialize Uniform Builder

        window.ub.initialize = function () {

            if (window.ub.config.material_id === -1) {
                return;
            }

            ub.config.print_version();

            /// Initialize Assets

            ub.current_material.id = window.ub.config.material_id;
            ub.current_material.code = window.ub.config.code;
            
            ub.current_material.colors_url = window.ub.config.api_host + '/api/colors/';
            ub.current_material.fonts_url = window.ub.config.api_host + '/api/fonts/';
            // ub.current_material.patterns_url = window.ub.config.api_host + '/api/patterns/';
            ub.current_material.material_url = window.ub.config.api_host + '/api/material/' + ub.current_material.id;
            ub.current_material.material_options_url = window.ub.config.api_host + '/api/materials_options/' + ub.current_material.id;

            ub.loader(ub.current_material.colors_url, 'colors', ub.callback);
            ub.loader(ub.current_material.fonts_url, 'fonts', ub.callback);
            // ub.loader(ub.current_material.patterns_url, 'patterns', ub.callback);
            ub.loader(ub.current_material.material_url, 'material', ub.callback);
            ub.loader(ub.current_material.material_options_url, 'materials_options', ub.callback);

            ub.design_sets_url = window.ub.config.api_host + '/api/design_sets/';
            ub.loader(ub.design_sets_url, 'design_sets', ub.load_design_sets);

            ub.materials_url = window.ub.config.api_host + '/api/materials/';
            ub.loader(ub.materials_url, 'materials', ub.load_materials);

            /// Activate Views

            $('#main_view').parent().fadeIn();
            window.ub.refresh_thumbnails();

            /// End Activate Views

            ub.uniformSizes = {
                'YXS': {
                    name: 'Youth Extra Small',
                    active: false
                },
                'YS': {
                    name: 'Youth Small',
                    active: false
                },
                'YM': {
                    name: 'Youth Medium',
                    active: false
                },
                'YL': {
                    name: 'Youth Large',
                    active: false
                },
                'YXL': {
                    name: 'Youth Extra Large',
                    active: false
                },
                'Y2XL': {
                    name: 'Youth Double Extra Large',
                    active: false
                },
                'Y3XL': {
                    name: 'Youth Triple Extra Large',
                    active: false
                },
                'XS': {
                    name: 'Extra Small',
                    active: false
                },
                'S': {
                    name: 'Small',
                    active: false
                },
                'M': {
                    name: 'Medium',
                    active: false
                },
                'L': {
                    name: 'Large',
                    active: false
                },
                'XL': {
                    name: 'Extra Large',
                    active: false
                },
                '2XL': {
                    name: 'Double Extra Large',
                    active: false
                },
                '3XL': {
                    name: 'Triple Extra Large',
                    active: false
                }
            };
        };

        ub.updateLayersOrder = function (container) {
                
            container.children.sort(function (a,b) {
                a.zIndex = a.zIndex || 0;
                b.zIndex = b.zIndex || 0;
                return b.zIndex - a.zIndex
            });

        };

        /// Load Assets 
 
        ub.callback = function (obj, object_name) {

            if (object_name === 'colors' || object_name === 'patterns' || object_name === 'fonts') {
                ub.data[object_name] = obj;
            }
            else {
                ub.current_material[object_name] = obj;
            }

            var ok = typeof(ub.current_material.material) !== 'undefined' && 
                     typeof(ub.current_material.materials_options) !== 'undefined' && 
                     typeof(ub.data.colors) !== 'undefined' &&
                     typeof(ub.data.patterns) !== 'undefined' &&
                     typeof(ub.data.fonts) !== 'undefined';  

            if (ok) {
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
            
                success: function (response){
                    cb(response[object_name], object_name);
                }
            
            });

        };

        ub.saveLogo = function (dataUrl, applicationCode) {

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                data: JSON.stringify({ dataUrl: dataUrl }),
                url: ub.config.host + "/saveLogo",
                dataType: "json",
                type: "POST", 
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            
                success: function (response){
                    
                    if(response.success) {
                        ub.current_material.settings.applications[applicationCode].filename = response.filename;
                    }
                    else{
                        util.error('Logo upload not successful.');
                    }

                }
            
            });

        }

        ub.display_gender_picker = function () {

            $('#arrow_design_sets').remove();

            $('#main_view > .picker_container').hide();
            $('#main_view > .picker_container').html('');

            var str_builder = '';

            var genders = ['Men', 'Women', 'Youth'];

            _.each(genders, function (obj, index) {

                var filename = window.ub.config.thumbnails_path + obj.toLowerCase() + '.png';
                
                var element = "<div class='gender_picker_header'>" + obj + '</div>';
                    element += '<div class="gender_picker" data-picker-type="gender" data-index = "' + index+ '" data-gender="' + obj + '" style="background-image:url(' + filename +');">' + '</span></div>';

                str_builder  += element;

            });

            $('#main_view > .picker_container').html(str_builder);
            $('#main_view > .picker_container').fadeIn();

            ub.bind_handler_design_set_picker();

        };

        
        ub.display_categories = function (gender){

            $('#arrow_design_sets').remove();

            var sports = _.find(ub.data.sports, {gender: gender});
            var active_sport_categories = _.where(sports.sports, {active: "1"});

            $('#main_view > .picker_container').hide();
            $('#main_view > .picker_container').html('');

            var elements = '';
            var gender_element = '<span>' + gender + '</span>';
            var back_element = '<button onclick="ub.display_gender_picker()"><i class="fa fa-chevron-circle-left"></i></button>'
            var header = '<div class="picker_header">' + gender_element + back_element + '</div>';

            elements = header;

            _.each(active_sport_categories, function (category, index){

                var filename = window.ub.config.thumbnails_path + category.name.toLowerCase() + '.jpg';
                var element = '<div class="sports_categories" data-gender="'+ gender + '" data-category="' + category.name + '" style="background-image:url(' + filename +');">' + '<span class="categories_label">' + category.name + '</span></div>';

                elements += element;
                
            });

            $('#main_view > .picker_container').html(elements);
            $('#main_view > .picker_container').fadeIn();

            ub.bind_handler_category_picker();

        };


        ub.display_design_sets = function (category, gender, type) {

            $('#arrow_design_sets').remove();

            $('#main_view > .picker_container').hide();
            $('#main_view > .picker_container').html('');

            var elements = '';

            var gender_element = '<span>' + gender + '</span>';
            var back_element = '<button onclick="ub.display_gender_picker()"><i class="fa fa-chevron-circle-left"></i></button>'
            var header = '<div class="picker_header">' + gender_element + back_element + '</div>';
            var category_element = '<span>' + category + '</span>';
            var category_back_element = '<button onclick=ub.display_categories("' + gender + '")><i class="fa fa-chevron-circle-left"></i></button>'
            var category_header = '<div class="picker_header">' + category_element + category_back_element + '</div>';
            var group_element_0 = '<button class="button_tabs all" data-type="All" data-gender="' + gender + '" data-category="' + category + '">Jersey and Pant</button>';
            var group_element_1 = '<button class="button_tabs upper" data-type="upper" data-gender="' + gender + '" data-category="' + category + '">Jersey</button>';
            var group_element_2 = '<button class="button_tabs lower" data-type="lower" data-gender="' + gender + '" data-category="' + category + '">Pant</button>';
            var group_header = '<div class="picker_header picker_header_tabs" style="text-align: center;">' + group_element_1 + group_element_2 + '</div>';

            elements = header + category_header + group_header;

            var design_sets = _.where(ub.design_sets, { category: category, gender: gender.toLowerCase() });

            if (type === 'All') {
                design_sets = _.where(ub.design_sets, { category: category, gender: gender.toLowerCase() });
            } else {
                design_sets = _.where(ub.materials, { uniform_category: category, gender: gender.toLowerCase(), type: type.toLowerCase() });
            }

            _.each(design_sets, function (obj) {

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

        ub.load_design_sets = function (obj, object_name){

            ub.design_sets = {};
            ub.design_sets = obj;

            ub.design_sets = _.where(ub.design_sets, { active: "1" });

        }

        ub.load_materials = function (obj, object_name){

            ub.materials = {};
            ub.materials = obj;

        }

        ub.load_patterns = function (obj, object_name){

            ub.patterns = {};
            ub.patterns = obj;

            ub.patterns = _.where(ub.patterns, {active: "1"});

        }

        ub.load_assets = function () {

            ub.assets = {};
            ub.assets.folder_name = '/images/builder-assets/'
            ub.assets.blank = ub.assets.folder_name + 'blank.png';

            var material = {};
            
            material = ub.current_material.material;
            material.options = ub.current_material.materials_options;

            _.each(ub.views, function (view) {

                var v = view;

                if (v === 'left' || v === 'right') {
                    v =  v + '_side_view';
                }
                else {
                    v = v + '_view';
                }    

                var view_name = view + '_view';

                ub.assets[view_name] = {};
                ub.assets[view_name].shape = material[v + '_shape'];

            });

     
            /// Materials
            
            ub.assets.pattern = {};
            ub.assets.pattern.layers = [];
            ub.objects.pattern_view = {};
            
            ub.assets.pattern.layers.push(ub.assets.folder_name + 'camo/layer_1.png');
            ub.assets.pattern.layers.push(ub.assets.folder_name + 'camo/layer_2.png');
            ub.assets.pattern.layers.push(ub.assets.folder_name + 'camo/layer_3.png');
            ub.assets.pattern.layers.push(ub.assets.folder_name + 'camo/layer_4.png');

            /// Begin Rendering after assets are loaded

            ub.funcs.load_fonts();
            ub.setup_views();
            ub.setup_material_options(); 
            requestAnimationFrame(ub.render_frames);
            ub.pass = 0;

        }

        /// Main Render Loop

        window.ub.render_frames = function () {

            requestAnimationFrame(ub.render_frames);
            ub.renderer.render(ub.stage);

            /// Refresh Thumbnail Initially only on (-10) frames after 3 seconds (3 * 60)
            
            var frames_to_refresh = 3 * 60; // 60 frames in one sec, average

            if (ub.pass > (frames_to_refresh - 10) && (ub.pass < frames_to_refresh)) {
                ub.refresh_thumbnails();
            }   

            if (ub.pass < frames_to_refresh) {
                ub.pass += 1; 
            }

        }

        /// Render Different Views ///

            window.ub.pixi = {};  // PIXI wrapper methods

            window.ub.pixi.new_sprite = function (filename) {
                return new PIXI.Sprite(PIXI.Texture.fromImage(filename + '?v=' + (new Date() / 1000)));
            };

            window.ub.setup_views = function () {

                _.each(ub.views, function (view) {

                    var view_name = view + '_view';
                    var shape = ub.pixi.new_sprite(ub.assets[view_name].shape);
                    var shape_mask = ub.pixi.new_sprite(ub.assets[view_name].shape);

                    ub.objects[view_name] = {};
                    ub.objects[view_name].shape = shape;
                    ub.objects[view_name].shape_mask = shape_mask;

                    shape.tint = 0xeeeded; 
                    shape.zIndex = 2;
                    shape_mask.zIndex = 1;
           
                    ub[view_name].addChild(shape);
                    ub.updateLayersOrder(ub[view_name]);

                });

            };

    // Returns the uniform customization settings made by the user
    // @return JSONObject
    ub.exportSettings = function () {

        /// Save Preview
        var uniform_type = ub.current_material.material.type;
        ub.current_material.settings[uniform_type].preview = ub.getThumbnailImage('front_view');

        return ub.current_material.settings;

    }

    // Change the uniform customization settings using the passed JSONObject parameter
    // @param JSONObject settings

    ub.loadSettings = function (settings) {

        ub.current_material.settings = settings;

        _.each(ub.current_material.settings.upper, function(e){

            if(e.setting_type === 'highlights' || e.setting_type === 'shadows' || e.setting_type === 'static_layer') {

                return; 

            }

            ub.change_material_option_color16(e.code, e.color);

            if(typeof e.gradient !== 'undefined'){

                if (typeof e.gradient.gradient_obj !== 'undefined') {

                    ub.generate_gradient(e.gradient.gradient_obj, e.code);    

                }    

            }

            if(typeof e.pattern !== 'undefined'){

                if (typeof e.pattern.pattern_obj !== 'undefined') {

                    ub.generate_pattern(e.code, e.pattern.pattern_obj, e.pattern.opacity, e.pattern.position, e.pattern.rotation, e.pattern.scale);
         
                }    

            }

        });

        /// Load Applications, Text Type

        var font_families = [];

        _.each(ub.current_material.settings.applications, function (application_obj) {

            if (application_obj.type === "player_name" || application_obj.type === "player_number" || application_obj.type === "team_name") {

                WebFont.load({
                
                    custom: {
                      families: [application_obj.font_obj.name],
                    },
                    active: function() {
                        ub.create_application (application_obj);
                    },

                });

            }

            if (application_obj.type === "mascot"){

                ub.update_application_mascot(application_obj);

            }

            if (application_obj.type === "logo"){

                ub.update_application_logo(application_obj);

            }
                
        });


        // Initialize Transformed Applications

        ub.funcs.transformedApplications();
        $('.app_btn').click();

    };

    // Initialize uniform settings
    ub.init_settings_object = function () {

        ub.current_material.containers = {};

        var settings = ub.current_material.settings;

        settings.team_colors = [
            {
                color: '',
            },
            {
                color: '',
            },
            {
                color: '',
            },
            {
                color: '',
            },
        ];

        settings.upper = {};

        settings.lower = {
            preview: '',
        };

        settings.upper = {
            preview: '',
        };

        ub.current_material.containers.files = {};
        ub.current_material.containers.files.logos = [];

        settings.applications = {};

        var current_material = ub.current_material.material;
        var material_options = ub.current_material.materials_options;
        var type = current_material.type;

        settings[type].material_id = current_material.id;
        settings[type].code = current_material.code;

        ub.current_material.containers[type] = {};
        ub.current_material.containers[type].application_containers = {};

        _.each(material_options, function (material_option) {

            var name = '';
            var obj  = '';

            name = material_option.name;
            settings[type][name] = {};

            ub.current_material.containers[type][name] = {};
            ub.current_material.containers[type][name].pattern_containers = {};

            obj = settings[type][name];

            obj.setting_type = material_option.setting_type;

            obj.code = name.replace(' ', '_').toLowerCase();
            obj.color = '';
            obj.gradient_is_above_pattern = false;
            
            obj.has_gradient = false;
            obj.has_pattern = false;
            obj.pattern_containers = {};
            
            obj.gradient = {
                    gradient_obj: undefined,
                    gradient_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y: 0,
                    },
                    color_stops: [
                        {
                            value: 0,
                            color: '',
                        },
                        {
                            value: 1,
                            color: '',
                        }
                    ],

            };    

            obj.pattern = {
                pattern_id: '',
                pattern_obj: undefined,
                scale: 0,
                rotation: 0,
                opacity: 0,
                position: {
                    x: 0,
                    y:0,
                },
            };

            obj.fabric = {
                fabric_id: '',
            }

            obj.logo = {
                filename: '',
                rotation: 0,
                scale: 0,
                position_id: 0,
                position: {
                    x: 0,
                    y: 0,
                }
            }

            obj.team_name = {
                
                text: '',
                font: {
                    name: '',
                    font_size: '',
                    font_style: '',
                },

                colors: [
                    
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                ],

                rotation: 0,
                scale: 0,
                position_id: 0,
                position: {
                    x: 0,
                    y: 0,
                },

                has_texture: false,
                has_pattern: false,
                texture_is_above_pattern: false,

                gradient: {
                    gradient_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y: 0,
                    },
                    color_stops: [
                        {
                            value: 0,
                            color: '',
                        },
                        {
                            value: 1,
                            color: '',
                        }
                    ],

                },    

                pattern: {
                    pattern_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y:0,
                    },
                }

            };

            obj.number = {
                
                text: '',
                font: {
                    name: '',
                    font_size: '',
                    font_style: '',
                },

                colors: [
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                ],

                rotation: 0,
                scale: 0,
                position_id: 0,
                position: {
                    x: 0,
                    y: 0,
                },

                has_texture: false,
                has_pattern: false,
                texture_is_above_pattern: false,

                gradient: {
                    gradient_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y: 0,
                    },
                    color_stops: [
                        {
                            value: 0,
                            color: '',
                        },
                        {
                            value: 1,
                            color: '',
                        }
                    ],

                },    
                pattern: {
                    pattern_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y:0,
                    },
                }

            };

            obj.player_name = {
                
                text: '',
                font: {
                    name: '',
                    font_size: '',
                    font_style: '',
                },

                colors: [
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                    {
                        color: '',
                        opacity: '',
                        width: '',
                    },
                ],

                rotation: 0,
                scale: 0,
                position_id: 0,
                position: {
                    x: 0,
                    y: 0,
                },

                has_texture: false,
                has_pattern: false,
                texture_is_above_pattern: false,

                gradient: {
                    gradient_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y: 0,
                    },
                    color_stops: [
                        {
                            value: 0,
                            color: '',
                        },
                        {
                            value: 1,
                            color: '',
                        }
                    ],

                },    

                pattern: {
                    pattern_id: '',
                    scale: 0,
                    rotation: 0,
                    opacity: 0,
                    position: {
                        x: 0,
                        y:0,
                    },
                }

            };

            obj.team_roster = [];

        });

    };

    window.ub.setup_material_options = function () {

        ub.current_material.options_distinct_names = {};

        _.each(ub.views, function (view) {

            var material_options = _.where(ub.current_material.material.options, {perspective: view});
            var current_view_objects = ub.objects[view + '_view']; 

            _.each(material_options, function (obj, index) {

                var name = obj.name.toCodeCase();

                current_view_objects[name] = ub.pixi.new_sprite(obj.material_option_path);
                var current_object = current_view_objects[name];

                current_object.name = name;

                // Multiplied to negative one because
                // UpdateLayers order puts the least zIndex on the topmost position

                current_object.zIndex = (obj.layer_level * 2) * (-1); 
                current_object.originalZIndex = (obj.layer_level * 2) * (-1);

                if (obj.setting_type === 'highlights') {

                    current_object.blendMode = PIXI.BLEND_MODES.SCREEN;

                } else if (obj.setting_type === 'shadows') {

                    current_object.blendMode = PIXI.BLEND_MODES.MULTIPLY;

                } else {
                    
                    var default_color = '';

                    if (obj.default_color === null) {

                        default_color = "B";

                    }
                    else {

                        default_color = obj.default_color;

                        /// Trap for blank default color
                        if (default_color === '') {
                            default_color = 'B';
                        }

                    }

                    var color = _.find(ub.data.colors, { color_code: default_color });
                    var tint = parseInt(color.hex_code, 16);
                    var modifier_label = name;
    
                    // Skip creating distinct name object if name already exists
                    if (typeof ub.current_material.options_distinct_names[name] !== "object") {

                        ub.current_material.options_distinct_names[name] = { setting_type: obj.setting_type, 'modifier_label': modifier_label, 'material_option': name, 'default_color': color.hex_code, 'available_colors': JSON.parse(obj.colors), 'layer_order': obj.layer_level, };
                        ub.data.defaultUniformStyle[name] = { name: name, default_color: tint};
                    
                    }
                    
                }

                // Add a dummy material option duplicate of the layer if the layer is detected as a "Shape", 
                // dummy layer will be used as a mask for patterns and gradients

                if (obj.setting_type === 'shape') {

                    var mask =  ub.pixi.new_sprite(obj.material_option_path);
                    mask.name = name + '_mask';
                    mask.zIndex = current_object.zIndex + (-1);
                    mask.blendMode = PIXI.BLEND_MODES.MULTIPLY;

                    var mask_distinct = _.clone(ub.current_material.options_distinct_names[name]);
                    mask_distinct.setting_type = 'static_layer';

                    ub.current_material.options_distinct_names[mask.name] = mask_distinct;
                    current_view_objects[mask.name] = mask;

                    ub[view + '_view'].addChild(mask);

                }

                ub[view + '_view'].addChild(current_object);

            });

            ub.updateLayersOrder(ub[view + '_view']);

        });    


        /// Manual Color Test 

            $('#manual_change_color').on('click', function(e){

               ub.change_material_option_color($('select#parts_dropdown').val(), $('#hex_color').val().substring(1,7));

            });

            $('#hex_color').colorpicker({
                format: 'hex',
            }).on('changeColor.colorpicker', function(event){
                $('#manual_change_color').click();                
            });

            $('select#parts_dropdown').html('');
            var prev = '';

            _.each(ub.current_material.options_distinct_names, function (part){

                if(prev === part.material_option){
                    return;
                }
                
                $('select#parts_dropdown').append('<option value="' + part.material_option + '">' + part.material_option.replace('_', ' ').toUpperCase() + '</option>')
                prev = part.material_option;

            });

            $('select#parts_dropdown').val('body')


        /// End Manual Color Test    

        /// Setup Modifiers Colors

            var modifiers = '';
            var sorted = _.sortBy(ub.current_material.options_distinct_names, function (o) { return o.layer_order; })

            _.each(sorted, function (obj) {

                // dont create modifiers if setting type is static or the layer will have to be blended with other layers

                var no_modifiers = ['static_layer', 'highlights', 'shadows'];

                if (_.contains(no_modifiers, obj.setting_type)) {
                    return;
                }

                var code = obj.material_option;
                var name = obj.material_option.replace('_',' ').toUpperCase();
                ub.modifiers[code] = name;

                var header = '<div class="options_panel_section"><label>' + obj.material_option.replace('_',' ').toUpperCase() + '</label>  <button class="color_base modifier button_tabs" data-option="' + code + '">Color </button> </div>';
                var str_builder = header + '<div class="options_panel_section" data-option="' + code + '" data-group="colors"><div class="color_panel_container">';
                var color_elements = '';

                _.each(obj.available_colors, function (color_obj) {

                    var color = _.find(ub.data.colors, { color_code: color_obj});

                    if (typeof color === 'undefined') {

                        util.error('Color Not Found: ' + color_obj + ", Material Option: " + name);
                        return;

                    }

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

        /// End Setup Modifiers Colors


        /// Setup Modifiers Patterns

            var modifiers = '';
            var sorted = _.sortBy(ub.current_material.options_distinct_names, function (o) { return o.layer_order; })

            _.each(sorted, function (obj){

                // dont create modifiers if setting type is static or the layer will have to be blended with other layers

                var no_modifiers = ['static_layer', 'highlights', 'shadows', 'piping'];

                if (_.contains(no_modifiers, obj.setting_type)) {
                    return;
                }

                var code = obj.material_option;
                var name = obj.material_option.replace('_',' ').toUpperCase();
                
                var header = '<div class="options_panel_section"><label>' + name + '</label>  <button class="pattern_base modifier button_tabs" data-option="' + code + '">Pattern </button> </div>';
                var str_builder = header + '<div class="options_panel_section" data-option="' + code + '" data-group="patterns"><div class="pattern_panel_container">';
                var pattern_elements = '';

                _.each(ub.data.patterns.items, function (pattern_obj) {

                    var element = '<div class="pattern_element">';
                    var filename = pattern_obj.icon;

                    element = element + '<button class="btn change-pattern" data-panel="' + obj.material_option.split('_')[0] + '" data-target-pattern="' + code + '" data-pattern="' + pattern_obj.code + '" style="background-image: url(' + filename + '); width: 100%; height: 100%; border: 1px solid #acacac; padding: 0px; background-size: cover;" data-layer="none" data-placement="bottom" title="' + pattern_obj.name + '" data-selection="none"></button>';
                    element = element + '</div>';    

                    pattern_elements = pattern_elements + element;

                });

                str_builder = str_builder + pattern_elements;
                str_builder = str_builder + '</div><div class="layers_container"></div></div>'; 
                modifiers = modifiers + str_builder;

            });

            var pattern_container = $('#patterns_panel').append(modifiers);
            
        /// End Setup Modifiers Patterns


        /// Setup Modifiers Gradients

            var modifiers = '';
            var sorted = _.sortBy(ub.current_material.options_distinct_names, function (o) { return o.layer_order; })

            _.each(sorted, function (obj){

                // dont create modifiers if setting type is static or the layer will have to be blended with other layers

                var no_modifiers = ['static_layer', 'highlights', 'shadows', 'piping'];

                if (_.contains(no_modifiers, obj.setting_type)) {
                    return;
                }

                var code = obj.material_option;
                var name = obj.material_option.replace('_',' ').toUpperCase();
                
                var header = '<div class="options_panel_section"><label>' + name + '</label>  <button class="gradient_base modifier button_tabs" data-option="' + code + '">Gradient </button> </div>';
                var str_builder = header + '<div class="options_panel_section" data-option="' + code + '" data-group="gradients"><div class="gradient_panel_container">';
                var gradient_elements = '';

                _.each(ub.data.gradients.items, function (gradient_obj) {

                    var element = '<div class="gradient_element">';
                    var filename = '/images/sidebar/' + gradient_obj.code + '.png';

                    element = element + '<button class="btn change-gradient" data-panel="' + obj.material_option.split('_')[0] + '" data-target-gradient="' + code + '" data-gradient="' + gradient_obj.code + '" style="background-image: url(' + filename + '); width: 100%; height: 100%; border: 1px solid #acacac; padding: 0px; background-size: cover;" data-layer="none" data-placement="bottom" title="' + gradient_obj.name + '" data-selection="none"></button>';
                    element = element + '</div>';    

                    gradient_elements = gradient_elements + element;

                });

                str_builder = str_builder + gradient_elements;
                str_builder = str_builder + '</div><div class="color_stops_container"></div></div>'; 
                modifiers = modifiers + str_builder;

            });

            var gradient_container = $('#gradients_panel').append(modifiers);
            ub.bind_handlers();
            ub.bind_left_sidebar_tab_handlers();

        /// End Setup Modifiers Gradients

        /// Setup Modifiers Applications 

            var markup = '';

            _.each(ub.data.applications.items, function (application) {

                markup += application.id + ". " + application.name + "<br /><br />";
                markup += "<div data-id='" + application.id + "' class='logos_picker'></div>";

            });

            markup = '';

            _.each(ub.data.applications.items, function (application) {

                var ddowns =  '<div class="applications_dropdown" data-option="applications" data-id="' + application.id + '">';
                ddowns     +=   '<select class="application_type_dropdown" data-label="applications" data-id="' + application.id + '">';
                ddowns     +=       '<option value="none">-- Select an Application --</option>';
                ddowns     +=       '<option value="logo">Logo / Image</option>';
                ddowns     +=       '<option value="mascot">Mascot</option>';
                ddowns     +=       '<option value="player_name">Player Name</option>';
                ddowns     +=       '<option value="team_name">Team Name</option>';
                ddowns     +=       '<option value="player_number">Player Number</option>';
                ddowns     +=   '</select>&nbsp;';

                ddowns     +=   '<button data-action="identify" data-option="applications" data-id="' + application.id + '" class="btn btn-xs"><i class="fa fa-arrows"></i></button>';
                ddowns     +=   '<button data-action="bring_to_front" data-option="applications" data-id="' + application.id + '" class="btn btn-xs"><i class="fa fa-arrow-up"></i></button>';
                ddowns     +=   '<button data-action="send_to_back" data-option="applications" data-id="' + application.id + '" class="btn btn-xs"><i class="fa fa-arrow-down"></i></button>';
                
                ddowns     += '</div>';
                ddowns     += '<div class="applications_modifier_container" data-id="' + application.id + '"></div>';

                markup += "<div class='application_dropdown_label'>" + application.id + ". " + application.name + "<br /></div>" + ddowns + "<br /><br />";

            });

            markup += '<input type="checkbox" id="chkSnap" name="snap[]" value="snap"> Snap<br>';
            markup += '<div class="application_footer"><button data-action="show_all_locations" data-option="applications" class="btn btn-xs show_all_locations">Show All Locations</button></div>';

            $('div.applications').html(markup);

            // Event handler for Application Buttons and Dropdowns

                $('select.application_type_dropdown').on('change', function (e) {

                    $select = $(this);

                    var id = $select.data('id');
                    var application_type = $select.val();
                    var application = _.find(ub.data.applications.items, { id: id });

                    $container = $('div.applications_modifier_container[data-id="' + id + '"]');

                    var plugin_parameters = { application: application };

                    if (application_type === "logo") {
                        $container.ubLogoDialog(plugin_parameters);
                    }

                    if (application_type === "mascot") {
                        $container.ubMascotDialog(plugin_parameters);
                    }

                    if (application_type === "player_name") {
                        $container.ubPlayerNameDialog(plugin_parameters);
                    }

                    if (application_type === "player_number") {
                        $container.ubPlayerNumberDialog(plugin_parameters);
                    }

                    if (application_type === "team_name") {
                        $container.ubTeamNameDialog(plugin_parameters);
                    }

                    if (application_type === "none") {

                        var view_objects = ub.objects[application.perspective + '_view'];
                        var s = view_objects['objects_' + application.code];
                        var view = ub[application.perspective + '_view'];

                        if (typeof(s) === 'object') {

                            var obj = view_objects['objects_' + application.code];

                            view.removeChild(view_objects['objects_' + application.code]);
                            delete view_objects['objects_' + application.code];
                            delete ub.current_material.settings.applications[application.code];

                        }

                        $container.html('');
                    }
                    
                });

                $('button[data-option="applications"]').on('click', function(e) {

                    var $button = $(this);
                    var action = $button.data('action');
                    var data_id = $button.data("id");
                    var application = _.find(ub.data.applications.items, { id: data_id });
                    var perspective = application.perspective;
                    var view = ub[perspective + '_view'];
                    var view_objects = ub.objects[perspective + '_view'];

                    if (action === "bring_to_front") {

                        ub.funcs.rearrangeApplications(application, 'UP');

                    }

                    if (action === "send_to_back") {

                        ub.funcs.rearrangeApplications(application, 'DOWN');

                    }
                    
                    if (action === "identify") {

                         if($button.hasClass('appactive')){

                            $button.removeClass('appactive');
                            $('body').css('cursor','auto');

                            if (typeof view_objects['ui_handles'] === "object") {

                                view.removeChild(view_objects['ui_handles']);
                                delete view_objects['ui_handles'];

                            }

                            return;
                        }

                        $('button[data-option="applications"][data-action="identify"]').removeClass('appactive');

                        $button.addClass('appactive');

                        var point = ub.pixi.new_sprite('/images/misc/point.png');
                        point.anchor.set(0.5, 0.5);

                        var rotation_point = ub.pixi.new_sprite('/images/misc/point.png');
                        rotation_point.anchor.set(0.5, 0.5);

                        $('a.change-view[data-view="' + perspective + '"]').click();

                        var x = 0;
                        var y = 0;

                        var application_obj = ub.objects[application.perspective + '_view']['objects_' + application.code];

                        if (typeof application_obj === 'undefined') {
    
                            x = ub.dimensions.width * application.position.x;
                            y = ub.dimensions.height * application.position.y;
    
                        }
                        else {

                            x = application_obj.x;
                            y = application_obj.y;

                        }
                        
                        var ui_handles = new PIXI.Container();

                        point.position = new PIXI.Point(x,y);
                        rotation_point.position = new PIXI.Point(x + 100, y);

                        point.ubName = 'move_point';
                        rotation_point.ubName = 'rotation_point';

                        point.zIndex = -1000;
                        rotation_point.zIndex = -1000;

                        ui_handles.addChild(point);
                        ui_handles.addChild(rotation_point);

                        if (typeof view_objects['ui_handles'] === "object") {

                            view.removeChild(view_objects['ui_handles']);
                            delete view_objects['ui_handles'];

                        }

                        ui_handles.applicationID = application.code;

                        view_objects['ui_handles'] = ui_handles;
                        view.addChild(ui_handles);

                        ub.funcs.createInteractiveUI(point, application, 'move', ui_handles)
                        ub.funcs.createInteractiveUI(rotation_point, application, 'rotate', ui_handles)

                    }

                });

            // End Event handler for Applications Buttons

        /// End Setup Modifiers Applications

        /// Setup Settings obj, for persisting customizer selection

            ub.init_settings_object();

        /// End Setup Settings obj

        /// Load Default Style

            /// Mascot

                // $('select.application_type_dropdown[data-id="2"]').val('mascot');
                // $('select.application_type_dropdown[data-id="2"]').change();
                // $('a.mascot_picker[data-application-id="2"]').click();
                // $('div.mascot_slider.scale_slider[data-id=2]').limitslider('values',[35])

            /// End Mascot 

            ub.init_style();
        
        /// End Default Style 

    };

        /// End Render Different Views ///

        /// Utilities ///

            ub.init_style = function () {

                // Builder Customizations, from an Order is loaded on this object, see #load_order @ uniform-builder.blade.php
                if (typeof window.ub.temp !== 'undefined') {
                    
                    ub.loadSettings(window.ub.temp);

                }
                else {

                    ub.loadDefaulUniformStyle(ub.data.defaultUniformStyle);

                }

            }

            ub.loadDefaulUniformStyle = function (defaultUniformStyle) {

                // Colors ok, TODO: Patterns and Gradients

                var views = ub.views;

                _.each(defaultUniformStyle, function (style) {

                    _.each(views, function (view) {

                        var object_name = style.name;
                        var view_name = view + '_view'
                        var object = ub.objects[view_name][object_name];

                        if (typeof object !== 'undefined') {

                            object.tint = style.default_color;

                        }

                    });

                })

            }

            /// Move Utils


            /// End Move Utils

            ub.change_material_option_color = function (material_option, color) {

                var parsed_color = parseInt(color,16)

                ub.save_color(material_option, parsed_color);

                _.each(ub.views, function (v) {

                    var objects_in_view = ub.objects[v + '_view']

                    if(_.has(objects_in_view, material_option)){

                        objects_in_view[material_option].tint = parsed_color;
    
                    }
                    
                });

            }

            ub.change_material_option_color16 = function (material_option, color) {

                var parsed_color = color;

                //ub.save_color(material_option, parsed_color);

                _.each(ub.views, function (v) {

                    var objects_in_view = ub.objects[v + '_view']

                    if(_.has(objects_in_view, material_option)){

                        objects_in_view[material_option].tint = parsed_color;
    
                    }
                    
                });

            }

            ub.applyMaterial = function (target) {

                var texture = new PIXI.RenderTexture(ub.renderer,ub.dimensions.width,ub.dimensions.height);
                texture.render(ub['pattern_view']);

                /// Placeholder, change this to target
                target = 'body';

                var views = ['front', 'back', 'left', 'right'];
                var temp_pattern = {};
                
                _.each(views, function (v){

                    var view = v + '_view';

                    temp_pattern[v] = new PIXI.Sprite(texture);

                    if (typeof(ub.objects[view].pattern) !== 'undefined') {
                        ub[view].removeChild(ub.objects[view].pattern);    
                    }
                    
                    if (target === 'body') {
                        temp_pattern[v].mask = ub.objects[view].shape_mask;
                    }    
                    else {
                        var mask = ub.objects[view][target + "_mask"];
                        temp_pattern[v].mask = mask;
                        temp_pattern[v].zIndex = mask.zIndex;
                    }

                    ub.objects[view].pattern = temp_pattern[v];
                    ub[view].addChild(temp_pattern[v]);

                    ub.updateLayersOrder(ub[view]);

                });

            }


            ub.getThumbnailImage = function (view, rotate) {

                var texture = new PIXI.RenderTexture(ub.renderer, ub.dimensions.width, ub.dimensions.height);
                texture.render(ub[view]);

                return texture.getImage().src;

            }
            
            /// Refresh Thumbnail Views ///

            ub.refresh_thumbnails = function () {

                if (ub.VERSION === "Edge") {

                    _.each(ub.views, function (view) {

                        var view_name = view + '_view';
                        var id = 'a#' + 'view_' + view + ' > img';

                        $(id).attr('src', ub.getThumbnailImage(view_name));

                    });

                    $('a#view_pattern > img').attr('src', ub.getThumbnailImage('pattern_view'));

                }


            }


        /// End Utilities ///

        
        /// Start Everything 

        window.ub.initialize();


    /// END NEW RENDERER /// 

    /// UI Functions /// 
    
        switch_panel('#materials_panel');

        function switch_panel(panel){

            $('.options_panel').hide();
            var $btns = $('div#right-sidebar > a.sidebar-buttons').css('background-color','#acacac');

            $btns.removeClass('highlighter_on');
            $btns.addClass('highlighter_off');

            // $(panel).fadeIn(100);
            $(panel).show();
            
        }

        /// RIGHT SIDEBAR

            $('div#right-sidebar > a.sidebar-buttons').on('click', function (e) {

                $('#arrow_design_sets').remove();

                if (ub.active !== null) {

                    filename = ub.config.host + '/images/sidebar/' + ub.active.data('filename') + '.png';
                    ub.active.removeClass('active_button');

                }

                ub.active = $(this);
                filename = ub.config.host + '/images/sidebar/' + ub.active.data('filename') + '-on' + '.png';

                ub.active.addClass('active_button');

                switch_panel('#' +  ub.active.data('filename') + '_panel');

                return false;

            });

            $('div#right-sidebar > a.sidebar-buttons').hover(function (e) {

                var s = $(e.currentTarget);

                if (s.is($('#right-sidebar > a.active_button')[0])) {
                    return;
                }
                
                s.removeClass('highlighter_off');
                s.addClass('highlighter_on');
                
 
            }, function (e) {

                var s = $(e.currentTarget);

                if (s.is($('#right-sidebar > a.active_button')[0])) {
                    return;
                }

                s.removeClass('highlighter_on');
                s.addClass('highlighter_off');

            });

        /// END RIGHT SIDEBAR


        /// LEFT SIDEBAR

            $('div#left-sidebar > a.sidebar-buttons').hover(function (e){

                var s = $(e.currentTarget).attr('class').split(' ')[0];
                var sidebar_classes = ['btn-new', 'btn-load', 'btn-compare', 'btn-save'];

                if (_.contains(sidebar_classes, s)) {

                    if (s === 'btn-new' && $('a.' + s).data('status') === 'close') {
                        return;
                    }

                    $('a.' + s).removeClass('highlighter_off');
                    $('a.' + s).addClass('highlighter_on');

                }                           

            }, function (e){

                var sidebar_classes = ['btn-new', 'btn-load', 'btn-compare', 'btn-save'];
                var s = $(e.currentTarget).attr('class').split(' ')[0];

                if (_.contains(sidebar_classes, s)) {

                    if ($('a.' + s).data('status') === 'new' || s !== 'btn-new') {

                        $('a.' + s).removeClass('highlighter_on');
                        $('a.' + s).addClass('highlighter_off');

                    }    

                }                           

            });

            $('div#left-sidebar > a.sidebar-buttons').on('click', function (e){

                $('#arrow_design_sets').remove();

                var s = $(e.currentTarget).attr('class').split(' ')[0];
                
                if (s === "btn-new") {

                    var status = $('a.btn-new').data('status');

                    if (status === 'new') {

                        $('#main_view > canvas').hide();
                        $('#right-main-window > .options_panel').hide();
                        $('div#change-views').hide();
                        $('#right-sidebar > a').hide();

                        var div_sports = "<div class='picker_container'></div>"
                        
                        $('#main_view').append(div_sports);
                        $('#left-main-window').css('overflow-y', 'scroll'); 

                        var filename = '/images/sidebar/' + 'close.png';
                        
                        // $('a.btn-new').css('background-image', 'url(' + filename + ')');
                        
                        $('a.btn-new').removeClass('highlighter_off');
                        $('a.btn-new').addClass('highlighter_on');

                        $('#right-main-window').css('background-color','#f8f8f8');
                        $('a.btn-new').data('status','close');

                        ub.display_gender_picker();

                    }
                    else {

                        $('#main_view > canvas').fadeIn();
                        $('#right-main-window > .options_panel').fadeIn();
                        $('div#change-views').fadeIn();
                        $('#right-sidebar > a').fadeIn();

                        $('#main_view > div.picker_container').remove();
                        $('#right-main-window > div.picker_container').remove();

                        $('#left-main-window').css('overflow-y', 'hidden'); 

                        var filename = '/images/sidebar/' + 'new.png';
 
                        $('a.btn-new').removeClass('highlighter_off');
                        $('a.btn-new').addClass('highlighter_on');
 
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

        ub.bind_handler_category_picker = function () {

            $('div.sports_categories').hover(function (e) {

                $('div.sports_categories').removeClass('sports_categories_highlighted');

                var el = $(e.currentTarget);
                el.addClass('sports_categories_highlighted');

            }, function (e) {
                
                var el = $(e.currentTarget);
                el.removeClass('sports_categories_highlighted');

            });

            $('div.sports_categories').click(function (e) {

                if (typeof(ub.ui.active_element) !== 'undefined') {
                    ub.ui.active_element.removeClass('sports_categories_activated');
                }    

                ub.ui.active_element = $(e.currentTarget);
                ub.ui.active_element.addClass('sports_categories_activated');

                var category = ub.ui.active_element.data('category');
                var gender = ub.ui.active_element.data('gender');

                ub.display_design_sets(category, gender, 'Upper');

            });

        };

        ub.bind_handler_design_set_picker = function () {

            $('div.style_entry').hover(function (e){

                $('div.style_entry').removeClass('style_entry_highlighted');

                var el = $(e.currentTarget);
                el.addClass('style_entry_highlighted');

            }, function (e){
                
                var el = $(e.currentTarget);
                el.removeClass('style_entry_highlighted');

            });

            $('div.style_entry').click(function (e){

                ub.ui.active_style_element = $(e.currentTarget);
                var picker_type = ub.ui.active_style_element.data('picker-type');

                if (picker_type === 'design_sets') {

                    var id = -1;
                    var url = '';

                    var option = ub.ui.active_style_element.data('option');

                    id = ub.ui.active_style_element.data('id');

                    if (option === 'All') {
                        url = ub.config.host + '/builder/' + id;    
                    }
                    else {
                        url = ub.config.host + '/builder/0/' + id;    
                    }

                    ub.ui.current_design_set = _.find(ub.design_sets, {id: id});
                    window.location = url;

                }
                else {

                    var category_name = ub.ui.active_style_element.data('category-name');
                    var gender_name = ub.ui.active_style_element.data('gender').toLowerCase();

                    ub.display_design_sets(category_name, gender_name, 'All');

                    $('#active_sports_category').text(category_name.toUpperCase() + ' > ' + gender_name.toUpperCase());

                }

            });


            /* Gender Picker */

                $('div.gender_picker').click(function (e){

                    var element = $(e.currentTarget);
                    var gender = element.data('gender');

                    ub.display_categories(gender);

                });

                $('div.gender_picker').hover(function (e){

                    $('div.gender_picker').removeClass('gender_picker_highlighted');

                    var el = $(e.currentTarget);
                    el.addClass('gender_picker_highlighted');

                }, function (e){
                    
                    var el = $(e.currentTarget);
                    el.removeClass('gender_picker_highlighted');

                });

            /* End Gender Picker */

        };

        ub.bind_handlers = function () {

            $('.change-color').on('click', function (e){

               var color = $(this).data('color');
               var target = $(this).data('target');
               var panel = $(this).data('panel');
               var color_element = $(this);

               window.ce = color_element;

               var selection = $(window.ce).data('selection');

               if (selection !== 'none') {
                    $('#' + selection).css('background-color', color);
               }

               color_element.parent().data("active_color", color);
               ub.change_color(target, color, panel);

               $("button[data-target='" + target +"']").html('');

               var path = '/images/sidebar/';
               var highlighter = '';

               if (color === "#ffffff") {
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

                if (color_param === '#ffffff') {
                    color_param = "#ebebeb";
                }

                var color_value = parseInt(color_param.substring(1), 16);

                if (panel === 'body') {

                    ub.change_material_option_color('body', color_param.substring(1));


                    if (typeof(ub.objects.left_view['pattern']) !== 'undefined') {

                        ub.objects.front_view['pattern'].visible = false;
                        ub.objects.back_view['pattern'].visible = false;
                        ub.objects.left_view['pattern'].visible = false;
                        ub.objects.right_view['pattern'].visible = false;

                    }

                    if (typeof(ub.objects.pattern_view.gradient_layer) === "object") {

                        if (typeof ub.objects.front_view['gradient'] === "object") {
                            ub.objects.front_view['gradient'].visible = false;    
                        }
                        
                        if (typeof ub.objects.back_view['gradient'] === "object") {
                            ub.objects.back_view['gradient'].visible = false;    
                        }
                        
                        if (typeof ub.objects.left_view['gradient'] === "object") {
                            ub.objects.left_view['gradient'].visible = false;    
                        }
                        
                        if (typeof ub.objects.right_view['gradient'] === "object") {
                            ub.objects.right_view['gradient'].visible = false;    
                        }
                        
                    }
                    
                    // if (typeof(ub.objects.front_view[obj]) === "object") {
                    //     ub.objects.front_view[obj].tint = color_value;
                    // }
                    
                    // if (typeof(ub.objects.back_view[obj]) === "object") {
                    //     ub.objects.back_view[obj].tint = color_value;    
                    // }

                    // if (typeof(ub.objects.left_view[obj]) === "object") {
                    //     ub.objects.left_view[obj].tint = color_value;    
                    // }
                    
                    // if (typeof(ub.objects.right_view[obj]) === "object") {
                    //     ub.objects.right_view[obj].tint = color_value;    
                    // }
                    
  
                } else if (panel == 'patterns') {

                    if (typeof(ub.objects.pattern_view.gradient_layer) === "object") {
                        ub.objects.pattern_view.gradient_layer.visible = false;
                    }

                    ub.objects.pattern_view[obj].tint = color_value;
                    ub.applyMaterial(panel);
                    
                    ub.objects.front_view['pattern'].visible = true;
                    ub.objects.back_view['pattern'].visible = true;
                    ub.objects.left_view['pattern'].visible = true;
                    ub.objects.right_view['pattern'].visible = true;
                  
                } else {

                    // if (typeof(ub.objects.front_view[obj]) !== 'undefined') {
                    //     ub.objects.front_view[obj].tint = color_value;
                    // }

                    // if (typeof(ub.objects.back_view[obj]) !== 'undefined') {
                    //     ub.objects.back_view[obj].tint = color_value;    
                    // }

                    // if (typeof(ub.objects.left_view[obj]) !== 'undefined') {
                    //     ub.objects.left_view[obj].tint = color_value;    
                    // }

                    // if (typeof(ub.objects.right_view[obj]) !== 'undefined') {
                    //     ub.objects.right_view[obj].tint = color_value;    
                    // }

                    ub.change_material_option_color(obj, color_param.substring(1));

                }

                
                $('[rel="popover"]').popover("hide");

                ub.refresh_thumbnails();

            }

            /// Change Pattern ///

            $('.change-pattern').on('click', function (e) {

               var pattern = $(this).data('pattern');
               var target = $(this).data('target-pattern');
               var panel = $(this).data('panel');
               var pattern_element = $(this);

               window.ce = pattern_element;

               var selection = $(window.ce).data('selection');

               pattern_element.parent().data("active_pattern", pattern);
               ub.change_pattern(target, pattern, panel);

               $("button[data-target-pattern='" + target +"']").html('');

               var path = '/images/sidebar/';
               var highlighter = '';

               path = path + 'highlighter_1.png';
               highlighter = "<img src = '" + path + "'>"
               
               $(this).html(highlighter);
                
            }); 

            ub.change_pattern = function (target, pattern, panel) {

                var el = _.find(ub.data.patterns.items, { code: pattern });
                var clone = {};
                var clone = _.clone(el);
                var cont = $("[data-group=patterns][data-option=" + target + "]").find('div.layers_container');

                cont.html('');

                var elements = "";

                if (el.layers.length > 0) {
                    elements = "<br />Layers<br /><br />";
                }

                _.each(el.layers, function (e, index) {

                    var val = e.default_color;
                    var col = e.default_color;
                    var filename = e.filename;
                    
                    elements += ub.create_pattern_color_picker(index, val, col, target, el.code); 

                });

                elements += "<br />";
                elements += "Rotation: <span class='pattern_slider_label' data-target='pattern' data-layer='" + target + "' data-label='rotation' data-id='" + target + "'>100</span>%<br />";
                elements += "<div id='rotation_pattern_slider_" + target + "' class='pattern_slider pattern_rotation_slider'></div>";

                elements += "<br />";
                elements += "Opacity: <span class='pattern_slider_label' data-target='pattern' data-layer='" + target + "' data-label='opacity' data-id='" + target + "'>100</span>%<br />";
                elements += "<div id='opacity_pattern_slider_" + target + "' class='pattern_slider'></div>";

                elements += "<br />";
                elements += "Scale: <span class='pattern_slider_label' data-target='pattern' data-layer='" + target + "' data-label='scale' data-id='" + target + "'>100</span>%<br />";
                elements += "<div id='scale_pattern_slider_" + target + "' class='pattern_slider'></div>";

                elements += "<br />";
                elements += "Position X: <span class='pattern_slider_label' data-target='pattern' data-layer='" + target + "' data-label='position_x' data-id='" + target + "'>100</span>%<br />";
                elements += "<div id='position_x_slider_" + target + "' class='pattern_slider'></div>";

                elements += "<br />";
                elements += "Position Y: <span class='pattern_slider_label' data-target='pattern' data-layer='" + target + "' data-label='position_y' data-id='" + target + "'>100</span>%<br />";
                elements += "<div id='position_y_slider_" + target + "' class='pattern_slider'></div>";

                elements += "<hr />";

                elements += "<div id='angle_pattern_slider_" + target + "' class='pattern_slider_angle'></div>";
                elements += "<hr />";
                
                elements += "<button style='width: 100%;' id='update-pattern-" + target + "' data-target='" + target + "' data-pattern='" + el.code + "'>Update Pattern</button>";

                cont.html(elements);

                $('input.pattern_' + target).ubColorPicker({
                    target: target,
                    type: 'pattern',
                });

                var layers = _.pluck(clone.color_layers, 'value');
                var layers_clone = [];

                _.each(layers, function (e) {
                    layers_clone.push(e * 100);
                });

                //// Rotation 

                var max_rotation = 620;
                var $rotation_slider = $('div#rotation_pattern_slider_' + target);
                $rotation_slider.roundSlider({

                    values: [0],
                    min: 0,
                    max: max_rotation,
                    gap: 0,
                    width: 5,
                    handleSize: "+14",
                    startAngle: 90,

                    change: function(event, ui) {

                        var value = parseInt($rotation_slider.find('span.edit').html());
                        $('span[data-target="pattern"][data-label="rotation"][data-layer="' + target + '"]').text(value);
                        $("button#update-pattern-" + target).click();

                    }

                });

                //// End Rotation 

                var max_opacity = 100;
                $('#' + 'opacity_pattern_slider_' + target).limitslider({
                    
                    values: [max_opacity],
                    min: 0,
                    max: 100,
                    gap: 0,
                    change: function (event, ui) {

                        var value = $(this).limitslider("values")[0];
                        $('span[data-target="pattern"][data-label="opacity"][data-id="' + target + '"]').text(value);
                        $("button#update-pattern-" + target).click();

                    },
                });

                var max_scale = 200;
                $('#' + 'scale_pattern_slider_' + target).limitslider({
                    
                    values: [100],
                    min: 0,
                    max: max_scale,
                    gap: 0,
                    change: function (event, ui) {

                        var value = $(this).limitslider("values")[0];
                        $('span[data-target="pattern"][data-label="scale"][data-id="' + target + '"]').text(value);
                        $("button#update-pattern-" + target).click();

                    },
                });


                var max_x = 100;
                $('#' + 'position_x_slider_' + target).limitslider({
                    
                    values: [50],
                    min: 0,
                    max: 100,
                    gap: 0,
                    change: function (event, ui) {

                        var value = $(this).limitslider("values")[0];
                        $('span[data-target="pattern"][data-label="slider_x"][data-id="' + target + '"]').text(value);
                        $("button#update-pattern-" + target).click();

                    },
                 });

                var max_y = 100;
                $('#' + 'position_y_slider_' + target).limitslider({
                    
                    values: [50],
                    min: 0,
                    max: max_y,
                    gap: 0,
                    change: function (event, ui) {

                        var value = $(this).limitslider("values")[0];
                        $('span[data-target="pattern"][data-label="slider_y"][data-id="' + target + '"]').text(value);
                        $("button#update-pattern-" + target).click();

                    },
                 });

                //// End Part

                $("button#update-pattern-" + target).click('click', function (e) {

                    var uniform_type = ub.current_material.material.type;
                    var target_name = target.replace('_', ' ');
                    target_name = util.toTitleCase(target_name);

                    var pattern_settings = ub.current_material.containers[uniform_type][target_name];
                    pattern_settings.pattern_containers = {};

                    var views = ub.data.views;
                    var _container = undefined;

                    _.each(views, function (v){

                        pattern_settings.pattern_containers[v] = {};
                        
                        var namespace = pattern_settings.pattern_containers[v];
                        namespace.container = new PIXI.Container();
                        var container = namespace.container;
                        container.sprites = {};

                        /// Process Rotation

                        var $rotation_slider = $('div#rotation_pattern_slider_' + target);
                        var value = parseInt($rotation_slider.find('span.edit').html());

                        container.rotation = value / 100;
                        container_rotation = container.rotation;

                        /// End Rotation

                        /// Process Scale 

                        var $scale_slider = $('div#scale_pattern_slider_' + target);
                        var value = $scale_slider.limitslider("values")[0];
                        var scale = new PIXI.Point(value / 100, value / 100);

                        container.scale = scale
                        container_scale = container.scale;

                        /// End Process Scale

                        _.each(clone.layers, function (layer, index) {

                            var s = $('[data-index="' + index + '"][data-target="' + target + '"]');
                            container.sprites[index] = ub.pixi.new_sprite(layer.filename);

                            var sprite = container.sprites[index];

                            sprite.zIndex = layer.layer_number * -1;
                            sprite.tint = parseInt(layer.default_color,16);
                            sprite.anchor.set(0.5,0.5);

                            var $inputbox = $('input.pattern_' + target + '[data-index="' + index + '"]');
                            var val = $inputbox.val();
                            
                            if (val.length === 7) {
                                val = val.substr(1, 6);
                            }

                            sprite.tint = parseInt(val, 16);
                            container.addChild(sprite);

                            var opacity_value = $('#' + 'opacity_pattern_slider_' + target).limitslider("values")[0];
                            container.alpha = opacity_value / 100;

                            var x_value = $('#' + 'position_x_slider_' + target).limitslider("values")[0];
                            var y_value = $('#' + 'position_y_slider_' + target).limitslider("values")[0];

                            var x = ub.dimensions.width * (x_value / 100);
                            var y = ub.dimensions.height * (y_value / 100);

                            container.position = new PIXI.Point(x,y);

                            // Properties for use when loading pattern from saved designs

                            layer.color = sprite.tint;
                            layer.container_position = container.position;
                            layer.container_opacity =container.alpha;
                            layer.container_rotation = container_rotation;
                            layer.container_scale = container_scale;

                            // End Properties for use when loading pattern from saved designs

                        });

                        ub.updateLayersOrder(container);

                        var view = v + '_view';
                        var mask = ub.objects[view][target + "_mask"];

                        if(typeof mask === 'undefined') {
                            return;
                        }

                        container.mask = mask;

                        if (typeof ub.objects[view]['pattern_' + target] === 'object') {
                            ub[view].removeChild(ub.objects[view]['pattern_' + target]);
                        }

                        ub.objects[view]['pattern_' + target] = container;
                        ub[view].addChild(container);
                        container.zIndex = mask.zIndex + (-1);

                        ub.updateLayersOrder(ub[view]);
                        _container = container;

                    });

                    ub.refresh_thumbnails();
                    ub.save_pattern (target, clone, pattern);

                });

                $("button#update-pattern-" + target + "").click();

            };

            /// End Change Pattern ///

            /// Change Gradient - UI ///

                $('.change-gradient').on('click', function (e) {

                   var gradient = $(this).data('gradient');
                   var target = $(this).data('target-gradient');
                   var panel = $(this).data('panel');
                   var gradient_element = $(this);

                   window.ce = gradient_element;

                   var selection = $(window.ce).data('selection');

                   gradient_element.parent().data("active_gradient", gradient);
                   ub.change_gradient(target, gradient, panel);

                   $("button[data-target-gradient='" + target +"']").html('');

                   var path = '/images/sidebar/';
                   var highlighter = '';

                   path = path + 'highlighter_1.png';
                   highlighter = "<img src = '" + path + "'>"
                   
                   $(this).html(highlighter);
                    
                }); 

            /// End Change Gradient - UI ///

        };


        /// Change Gradient - Methods ///

        ub.change_gradient = function (target, gradient, panel) {

            var el = _.find(ub.data.gradients.items, { code: gradient });
            var clone = {};
            var clone = _.clone(el);

            var cont = $("[data-group=gradients][data-option=" + target + "]").find('div.color_stops_container');
            cont.html('');

            var elements = "";

            if (el.color_stops.length > 0) {
                elements = "<br />Color Stops<br /><br />";
            }

            _.each(el.color_stops, function (e, index) {

                var val = e.value;
                var col = e.color;
                
                elements += ub.create_color_picker(index, val, col, target, el.code); 

            });
            
            if (el.code === "custom" ) {

                var add_button = "<button id='add_gradient_color_stop'><i class='fa fa-plus-circle'></i></button>";
                var delete_button = "<button id='delete_gradient_color_stop'><i class='fa fa-minus-circle'></i></button>";

                var add_color_stop_button = "<div class='color_picker_container add_delete_color_stop'>" + add_button + "&nbsp;" + delete_button + "</div>";
                elements += "<br />";
                elements += add_color_stop_button;

            }

            elements += "<div id='gradient_slider_" + target + "' class='gradient_slider'></div>";
            elements += "<hr />";

            elements += "<div id='angle_gradient_slider_" + target + "' class='gradient_slider_angle'></div>";
            elements += "<hr />";
            
            elements += "<button style='width: 100%;' id='update-gradient-" + target + "' data-target='" + target + "' data-gradient='" + el.code + "'>Update Gradient</button>";

            cont.html(elements);

            $('input.gradient_' + target).ubColorPicker({
                target: target,
                type: 'gradient',
            });

            var stops = _.pluck(clone.color_stops, 'value');
            var stops_clone = [];

            _.each(stops, function (e) {
                stops_clone.push(e * 100);
            });

            $('#' + 'gradient_slider_' + target).limitslider({
                
                values: stops_clone,
                min: 0,
                max: 100,
                gap: 0,
                change: function (event, ui) {

                    $("button#update-gradient-" + target).click();

                },

             });

            $('#' + 'angle_gradient_slider_' + target).roundSlider({
                value: el.angle,
                min: 0,
                max: 360,
                startAngle: 90,
                width: 5,
                handleSize: "+14",
                change: function (event, ui) {
                    
                    $("button#update-gradient-" + target).click();

                },
             });

            $("button#update-gradient-" + target).click('click', function (e) {

                _.each(clone.color_stops, function (e, index) {

                    var temp_selector = 'gradient_' + target.toLowerCase() + '_' + index;
                    var $input = $('input[data-elid="' + temp_selector + '"]');
                    
                    $("#gradient_slider_" + target).find('span:eq(' + index + ')').css('background', $input.val());
                    
                    e.color = $input.val();

                    var temp = ($('#' + 'gradient_slider_' + target).limitslider("values")[index]);
                    temp = Math.floor(temp / 10);
                    temp = temp / 10;

                    e.value = temp;

                });

                clone.angle = parseInt($('#' + 'angle_gradient_slider_' + target).find('span.edit').html()); 
                ub.generate_gradient(clone, target);

            });

            if (el.code === "custom") {

                $('#add_gradient_color_stop').on('click', function () {

                    var obj_colors = _.find(ub.current_material.material.options, { name:  window.util.toTitleCase(target) });
                    var color_code = JSON.parse(obj_colors.colors)[clone.color_stops.length + 1];

                    color_obj = _.find(ub.data.colors, { color_code: color_code })

                    var new_color_stop = {

                        id: clone.color_stops.length + 1,
                        value: 0,
                        color: '#' + color_obj.hex_code,

                    };

                    clone.color_stops.push(new_color_stop);
                    var spacing = 1 / (clone.color_stops.length - 1);

                    _.each(clone.color_stops, function (color_stop, index) {
                        color_stop.value = index * spacing;
                    });

                    ub.change_gradient(target, gradient, panel);

                });

                $('#delete_gradient_color_stop').on('click', function () {

                    if (clone.color_stops.length > 2) {

                        clone.color_stops.pop();

                        var spacing = 1 / (clone.color_stops.length - 1);
                        
                        _.each(clone.color_stops, function (color_stop, index) {
                            color_stop.value = index * spacing;
                        });

                        ub.change_gradient(target, gradient, panel);
    
                    }
                   
                });

            }

            $("button#update-gradient-" + target + "").click();

        };

        /// End Change Gradient - Methods /// 



        ub.create_mascot_color_picker = function (index, value, color, target, mascot) {

            var element = "";
            element = "<div class='mascot_color_picker_container'><label class='color_stop_label'>" + (index + 1) + ".</label><input readonly='true' class='mascot_" + target + "' type='text' data-elid='mascot_" + target + "_" + index + "' data-index='" + index + "' data-target='" + target +"' data-value='" + value + "' data-mascot='" + mascot + "'  value='" + color + "'/></div>";

            return element;

        };

        ub.create_pattern_color_picker = function (index, value, color, target, pattern) {

            var element = "";
            element = "<div class='pattern_color_picker_container'><label class='color_stop_label'>" + (index + 1) + ".</label><input readonly='true' class='pattern_" + target + "' type='text' data-elid='pattern_" + target + "_" + index + "' data-index='" + index + "' data-target='" + target +"' data-value='" + value + "' data-pattern='" + pattern + "'  value='" + color + "'/></div>";

            return element;

        };

        ub.create_color_picker = function (index, value, color, target, gradient) {

            var element = "";
            element = "<div class='color_picker_container'><label class='color_stop_label'>" + (index + 1) + ".</label><input readonly='true' class='gradient_" + target + "' type='text' data-elid='gradient_" + target + "_" + index + "' data-index='" + index + "' data-target='" + target +"' data-value='" + value + "' data-gradient='" + gradient + "'  value='" + color + "'/></div>";

            return element;

        };

        ub.bind_design_sets_tab_handlers = function () {

            $('button.button_tabs').click(function (e) {

                $('button.button_tabs').css('background-color', '#f8f8f8');
                $('button.button_tabs').css('color', '#353536');

                var current_button = $(e.currentTarget);
                var category       = current_button.data('category');
                var gender         = current_button.data('gender');
                var type           = current_button.data('type');
                
                ub.display_design_sets(category, gender, type);
    
            });

        }

        ub.bind_left_sidebar_tab_handlers = function () {

            $('.color_base').click(function (e) {

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


            $('.gradient_base').click(function (e) {

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
                $('.down_arrow:not(.gra-element)').remove();

                ub.tethers['modifiers'] = t;

            });

            $("div[data-group='patterns']").hide();
            $("div[data-group='gradients']").hide();
            $("div[data-option='body']").fadeIn('fast');

            $('.pattern_base').click(function (e) {

                var option = $(this).data('option');

                $("[data-group='patterns']").css('display','none');
                $("div[data-option='" + option + "']").show(100);

                $('.pattern_base').removeClass('tether_button');

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
                $('.down_arrow:not(.pattern-element)').remove();

                ub.tethers['modifiers'] = t;

            });

            $("div[data-group='patterns']").hide();
            $("div[data-group='gradients']").hide();
            $("div[data-option='body']").fadeIn('fast');

        }

        ub.generate_gradient = function (gradient_obj, target) {

            var uniform_type = ub.current_material.material.type;
            var bounds;
            var guides;

            guides = { x1: 23, y1: 67, x2: 466, y2: 464 };

            var gradient_width  = 496;
            var gradient_height = 550;
            var canvas = document.createElement('canvas');

            canvas.width = ub.dimensions.width;
            canvas.height = ub.dimensions.height;

            var ctx = canvas.getContext('2d');

            var gradient;

            if (gradient_obj.code === "radial" ) {

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

            _.each(gradient_obj.color_stops, function (color_stop) {

                if( color_stop.color.length === 6 ){
                    color_stop.color = "#" + color_stop.color;
                }

                gradient.addColorStop(color_stop.value, color_stop.color);
              
            });

            ctx.fillStyle = gradient;

            var rotation = gradient_obj.angle;

            ctx.fillRect(0,0, ub.dimensions.height, ub.dimensions.height);
            
            var dURL = canvas.toDataURL();

            ctx.clearRect(0,0, ub.dimensions.height, ub.dimensions.height);
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(rotation*Math.PI/180);
            ctx.translate(-canvas.width/2, -canvas.height/2);
            ctx.fillRect(0,0, ub.dimensions.height, ub.dimensions.height);

            var texture = PIXI.Texture.fromCanvas(canvas);
            var temp_pattern = {};
            var gradient_layer = new PIXI.Sprite(texture);

            gradient_layer.zIndex = 1;

            if (typeof(ub.objects.pattern_view.gradient_layer) === "object") {
                ub.pattern_view.removeChild(ub.objects.pattern_view.gradient_layer);
            }

            ub.objects.pattern_view.gradient_layer = gradient_layer;
            ub.pattern_view.addChild(ub.objects.pattern_view.gradient_layer);
            ub.updateLayersOrder(ub.pattern_view);

            var views = ['front', 'back', 'left', 'right'];

            _.each(views, function (v) {

                var view = v + '_view';

                temp_pattern[v] = new PIXI.Sprite(texture);

                if (typeof(ub.objects[view]['gradient_' + target]) !== 'undefined') {
                    
                    ub[view].removeChild(ub.objects[view]['gradient_' + target]);

                }

                temp_pattern[v].zIndex = 1;

                if (target === 'body') {
                    temp_pattern[v].mask = ub.objects[view].shape_mask;
                }    
                else{

                    var mask = ub.objects[view][target + "_mask"];

                    if (typeof mask === 'undefined') {
                        return;
                    }
               
                    temp_pattern[v].mask = mask;
                    temp_pattern[v].zIndex = mask.zIndex;
                   
                }
        
                ub.objects[view]['gradient_' + target] = temp_pattern[v];
                ub[view].addChild(temp_pattern[v]);
          
                ub.updateLayersOrder(ub[view]);

            });

            ub.refresh_thumbnails();

            var data_url = 'url(' + dURL + ')';
            var $slider = $('#' + 'gradient_slider_' + target);
            var $angle_slider = $('#' + 'angle_gradient_slider_' + target);
           
            $slider.find('.range_container').remove();
            $slider.prepend('<div class="range_container"><div class="range"></div></div>').find('div.range').css('background-image', data_url);

            var rad = (90 + parseInt($angle_slider.find('span.edit').html()));
            
            $angle_slider.find('div.rs-bg-color').css({
                'background-image': data_url,
                "-webkit-transform": "rotate(" + rotation + "deg)",
            });

            ub.save_gradient(target, gradient_obj, gradient_obj.angle);

        };

        /// End Process Changes /// 

        /// Utilities ///

            $('#view_pattern').hide();

            $('button#toggle_pattern_preview').on('click', function (e) {
                $('#view_pattern').toggle();
            });

            // Save Color in Configuration Object

            // Process
            // 
            // New -> Blank UDID, Create UDID, Save Config File 
            // (this is when a design is created from a material code)
            // When loaded from UDID, the material / uniform code is loaded from the settings object
            // 
            // Load -> From UDID, doesn't need to create a new one
            // Save as Another design, Create another UDID

            ub.save_color = function (material_option, color) {

                var uniform_type = ub.current_material.material.type; // upper or lower
                var uniform = ub.current_material.settings[uniform_type];

                var object = _.find(ub.current_material.settings[uniform_type], {code: material_option});
                object.color = color;

                return object;

            };

            ub.save_gradient = function (material_option, gradient_obj, rotation) {

                var uniform_type = ub.current_material.material.type; // upper or lower
                var uniform = ub.current_material.settings[uniform_type];

                var object = _.find(ub.current_material.settings[uniform_type], {code: material_option});
                object.gradient['gradient_obj'] = gradient_obj;
                object.gradient['rotation'] = rotation;

                return object;

            }

            ub.save_pattern = function (material_option, pattern_obj, pattern_id) {

                var uniform_type = ub.current_material.material.type; // upper or lower
                var uniform = ub.current_material.settings[uniform_type];
                var object = _.find(ub.current_material.settings[uniform_type], {code: material_option});
                
                object.pattern.pattern_id = pattern_id;
                object.pattern.pattern_obj = pattern_obj;
                
            };

            ub.save_pattern_color = function (material_option, layer, color) {

                var uniform_type = ub.current_material.material.type; // upper or lower
                var uniform = ub.current_material.settings[uniform_type];
                var object = _.find(ub.current_material.settings[uniform_type], {code: material_option});
                
                object.pattern.pattern_obj.layers[layer].color = color;

            };

            ub.create_application = function (application_obj) {

                if (application_obj.text.length === 0) { return; }

                var application = application_obj.application;
                var x = application_obj.position.x;
                var y = application_obj.position.y;
                var settings = ub.current_material.settings;
                var selected_font_id = $('div.font_style_drop[data-id="' + application.id + '"]').data('font-id');
                var font_obj = application_obj.font_obj;
                var selected_color = $('div.color_drop[data-id="' + application.id + '"]').data('color');
                var color_array = application_obj.color_array;
                var text_input = application_obj.text;
                var sprite = ub.create_text(" " + text_input + " ", font_obj.name, application, application_obj.accent_obj, application_obj.font_size);
                var view = ub[application.perspective + '_view'];
                var view_objects = ub.objects[application.perspective + '_view'];
                var mask = _.find(ub.current_material.material.options, {
                    perspective: application.perspective,
                    name: application.layer
                });

                var mask = ub.pixi.new_sprite(mask.material_option_path);

                sprite.mask = mask;

                var position = '';
                var scale = '';
                var rotation = '';
                var alpha = '';
                var tint = '';

                var s = view_objects['objects_' + application.code];

                // /// Set First Three Colors

                var colors_obj = ub.get_colors_obj(application.layer);
                var length = sprite.children.length;
                var children = _.clone(sprite.children);

                children.reverse();

                _.each(children, function (child, index) {

                    child.tint = parseInt(child.ubDefaultColor, 16);

                    if(color_array !== ''){

                        var array = ub.current_material.settings.applications[application.code].color_array;
                        var color_array_size = _.size(array);
                        var code = ub.current_material.settings.applications[application.code].color_array[index + 1];

                        if (typeof code !== 'undefined') {
                            
                            child.tint = parseInt(code.color_code, 16);

                        }

                    }

                });
         
                ///// End Set First Three Colors 

                text_gradient_obj = ub.current_material.settings.applications[application.code].gradient_obj;
                
                if (typeof text_gradient_obj !== 'undefined') {

                    ub.generate_gradient_for_text(text_gradient_obj, application.code, sprite, application);    

                }

                pattern_obj = ub.current_material.settings.applications[application.code].pattern_obj;

                if (typeof pattern_obj !== 'undefined') {
                    pattern_settings = ub.current_material.settings.applications[application.code].pattern_settings;
                    ub.generate_pattern_for_text(application.code, pattern_obj, application, sprite, pattern_settings);
                }
                
                view_objects['objects_' + application.code] = sprite;
                view.addChild(sprite);

                sprite.position = application_obj.position;
                sprite.rotation = application_obj.rotation;
                sprite.alpha    = application_obj.alpha;

                var layer_order = ( 10 + application_obj.layer_order ) 

                sprite.originalZIndex = layer_order * (-1);
                sprite.zIndex = layer_order * (-1);
                settings.applications[application.code].layer_order = layer_order;

                ub.updateLayersOrder(view);

                if (position !== '') {

                    sprite.position = position;
                    sprite.scale = scale;
                    sprite.rotation = rotation;
                    sprite.alpha = alpha;
                    sprite.tint = tint;

                }

                ub.funcs.createClickable(sprite, application, view, 'application');

            };

            ub.save_text_pattern_color = function (application, layer, color) {

                ub.current_material.settings.applications[application.code].pattern_obj.layers[layer].default_color = color;

            };

            ub.generate_pattern_for_text = function (target, pattern_obj, application, text_sprite, pattern_settings){

                var main_text_obj = _.find(text_sprite.children, {ubName: 'Mask'});
                main_text_obj.alpha = 1;
                var uniform_type = ub.current_material.material.type;
                var clone = pattern_obj;
                var val_rotation = pattern_settings.rotation;
                var val_opacity = 1;
                var val_scale = pattern_settings.scale;
                var val_x_position = pattern_settings.position.x;
                var val_y_position = pattern_settings.position.y;

                var target_name = target.replace('_', ' ');
                target_name = util.toTitleCase(target_name);

                ub.current_material.containers[application.code] = {};
                var application_settings = ub.current_material.containers[application.code]
                
                if(typeof application_settings.pattern === 'undefined') {

                    application_settings.pattern = new PIXI.Container();

                }

                var container = application_settings.pattern;
                var v = application.perspective;
                container.sprites = {};

                _.each(clone.layers, function (layer, index) {

                    // var s = $('[data-index="' + index + '"][data-target="' + target + '"]');
                    container.sprites[index] = ub.pixi.new_sprite(layer.filename);

                    var sprite = container.sprites[index];

                    sprite.zIndex = layer.layer_number * -1;
                    sprite.tint = parseInt(layer.default_color,16);
                    sprite.anchor.set(0.5, 0.5);

                    // var $inputbox = $('input.pattern_' + target + '[data-index="' + index + '"]');
                    // var val = $inputbox.val();
                    
                    // if (val.length === 7) {
                    //     val = val.substr(1, 6);
                    // }

                    // sprite.tint = parseInt(val, 16);

                    container.addChild(sprite);

                    container.alpha = val_opacity;

                    var x = val_x_position;
                    var y = val_y_position;

                    container.position = new PIXI.Point(x,y);

                });

                ub.updateLayersOrder(container);

                var view = v + '_view';
                var mask = main_text_obj;

                if(typeof mask === 'undefined') {
                    return;
                }

                // container.rotation = val_rotation;
                // container.scale = new PIXI.Point(val_scale , val_scale);
                // container.position = new PIXI.Point(val_x_position, val_y_position);

                var mask = main_text_obj;

                text_sprite.pattern_layer = container;
                container.mask = mask;
                container.zIndex = -11;

                ub.pl = container;

                text_sprite.addChild(text_sprite.pattern_layer);

                ub.updateLayersOrder(text_sprite);
                ub.refresh_thumbnails();

        };

        ub.generate_gradient_for_text = function (gradient_obj, target, text_sprite, application) {

            var base_color_obj = _.find(text_sprite.children, {ubName: 'Base Color'});
            if (gradient_obj.code === "none") {
                base_color_obj.alpha = 1;                  
            }
            else {
                base_color_obj.alpha = 0;                     
            }

            var main_text_obj = _.find(text_sprite.children, {ubName: 'Mask'});
            main_text_obj.alpha = 1;
            var uniform_type = ub.current_material.material.type;
            var bounds;
            var guides;

            guides = { x1: 23, y1: 67, x2: 466, y2: 464 }; 

            var gradient_width  = 496;
            var gradient_height = 550;
            var canvas = document.createElement('canvas');
            
            canvas.width  = ub.dimensions.width;
            canvas.height = ub.dimensions.height;

            var ctx = canvas.getContext('2d');

            var gradient;

            if (gradient_obj.code === "radial" ) {

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
            
            _.each(gradient_obj.color_stops, function (color_stop) {
                gradient.addColorStop(color_stop.value, color_stop.color);
            });

            ctx.fillStyle = gradient;

            var rotation = gradient_obj.angle;
            ctx.fillRect(0,0, ub.dimensions.height, ub.dimensions.height);
            var dURL = canvas.toDataURL();

            ctx.clearRect(0,0, ub.dimensions.height, ub.dimensions.height);
            ctx.translate(canvas.width/2, canvas.height/2);
            ctx.rotate(rotation * Math.PI/180);
            ctx.translate(-canvas.width/2, -canvas.height/2);
            ctx.fillRect(0,0, ub.dimensions.height, ub.dimensions.height);

            var texture = PIXI.Texture.fromCanvas(canvas);
            var temp_pattern = {};

            var gradient_layer = new PIXI.Sprite(texture);
            gradient_layer.zIndex = 1;

            // if (typeof(ub.objects.pattern_view.gradient_layer) === "object") {
            //     ub.pattern_view.removeChild(ub.objects.pattern_view.gradient_layer);
            // }

            // ub.objects.pattern_view.gradient_layer = gradient_layer;
            // ub.pattern_view.addChild(ub.objects.pattern_view.gradient_layer);
            // ub.updateLayersOrder(ub.pattern_view);
            
            var v = application.perspective;
            var view = v + '_view';

            temp_pattern[v] = new PIXI.Sprite(texture);

            // if(typeof text_sprite.gradient_layer === "object" ){

            //     text_sprite.removeChild(text_sprite.gradient_layer);

            // }
            
            temp_pattern[v].zIndex = 1;
  
            var mask = main_text_obj;

            text_sprite.gradient_layer = temp_pattern[v];
            temp_pattern[v].anchor.set(0.5, 0.5);
            temp_pattern[v].mask = mask;
            temp_pattern[v].zIndex = -10;

            temp_pattern[v].height = main_text_obj.height;
            text_sprite.addChild(temp_pattern[v]);
      
            ub.updateLayersOrder(text_sprite);
            ub.refresh_thumbnails();

            var data_url = 'url(' + dURL + ')';
            var $slider = $('#' + 'gradient_slider_' + target);
            var $angle_slider = $('#' + 'angle_gradient_slider_' + target);
           
            $slider.find('.range_container').remove();
            $slider.prepend('<div class="range_container"><div class="range"></div></div>').find('div.range').css('background-image', data_url);

            var rad = (90 + parseInt($angle_slider.find('span.edit').html()));
            
            $angle_slider.find('div.rs-bg-color').css({
                'background-image': data_url,
                "-webkit-transform": "rotate(" + rotation + "deg)",
            });


        };

            ub.create_text = function (text_input, font_name, application, accent_obj, font_size) {

                ub.funcs.removeUIHandles();

                var text_layers = {};
                var container = new PIXI.Container();
                var accent_id = $('div.accent_drop[data-id="' + application.id + '"]').data('accent-id');
                
                _.each(accent_obj.layers, function (layer) {

                    var text_layer = '';

                    text_layers[layer.layer_no] = {};
                    text_layer = text_layers[layer.layer_no];

                    text_layer.no = layer.layer_no;
                    text_layer.accent_obj = layer;

                    var style = {font: font_size + "px " + font_name, fill: "white", padding: 10};

                    if (layer.outline === 1) {

                        style.stroke = '#ffffff';
                        style.strokeThickness = 6;

                    }

                    if (layer.outline === 2) {

                        style.stroke = '#ffffff';
                        style.strokeThickness = 12;

                        if (typeof layer.type === 'string') {
                            style.stroke = '#ffffff';
                        }

                    }

                    if (layer.type === 'middle_stroke' && layer.outline === 1) {

                        style.stroke = '#ffffff';
                        style.strokeThickness = 6;

                    }

                    if (layer.type === 'outer_stroke' && layer.outline === 2) {

                        style.stroke = '#ffffff';0
                        style.strokeThickness = 12;

                    }

                    if (layer.type === 'outer_stroke' && layer.outline === 1) {
                        style.stroke = '#ffffff';
                        style.strokeThickness = 6;
                    }

                    if (layer.type === 'shadow' && layer.outline > 0) {
                        style.fill = '#ffffff';
                        style.stroke = '#ffffff';
                    }

                    text_layer.text_sprite = new PIXI.Text(" " + text_input + " ", style);
                    
                    /// Custom Properties

                    text_layer.text_sprite.ubName = layer.name;
                    text_layer.text_sprite.ubDefaultColor = layer.default_color;
                    text_layer.text_sprite.ubLayerNo = layer.layer_no;

                    var dummy = new PIXI.Text("A", style) // To get the glyph width and height 

                    text_layer.text_sprite.zIndex = layer.zIndex;
                    text_layer.text_sprite.x += dummy.width * layer.increment_x;
                    text_layer.text_sprite.y += dummy.height * layer.increment_y;
                    text_layer.text_sprite.anchor.set(0.5, 0.5);

                    container.addChild(text_layer.text_sprite);

                    if (layer.name === 'Mask') {
                        text_layer.text_sprite.alpha = 0                
                    }

                });

                ub.updateLayersOrder(container);

                return container;
                
            }

            ub.get_colors_obj = function (layer) {

                var colors_obj = '';

                var material_option_obj = _.find(ub.current_material.materials_options, {name: window.util.toTitleCase(layer)});
                var material_colors = JSON.parse(material_option_obj.colors);

                var colors_obj = _.filter(ub.data.colors, function(color){
                    
                    var s = _.indexOf(material_colors, color.color_code);
                    return s !== -1;

                });

                return colors_obj;

            }

            ub.recreate_gradient_obj = function (gradient_obj) {

                /// Recreate Gradient Object into new structure
            
                var gradient_output = {};

                gradient_output.angle = gradient_obj.angle;
                gradient_output.code = gradient_obj.code;
                gradient_output.name = gradient_obj.name;
                gradient_output.color_stops = [];

                _.each (gradient_obj.color_stops, function (color_stop, index) {

                    var new_cs = {
                        index: color_stop.index,
                        color: color_stop.color,
                        value: color_stop.value,
                    }

                    gradient_output.color_stops.push(new_cs);

                })

                return gradient_output;

                /// End Recreate 

            }

        // load logo

            ub.update_application_logo = function(application_obj) {

            var application = application_obj.application;
            var x = ub.dimensions.width * application.position.x;
            var y = ub.dimensions.height * application.position.y;
            var settings = ub.current_material.settings;

            var filename = application_obj.filename;


            var view = ub[application.perspective + '_view'];
            var view_objects = ub.objects[application.perspective + '_view'];
            
            var sprite = PIXI.Sprite.fromImage(filename);

            var mask = _.find(ub.current_material.material.options, {
                perspective: application.perspective,
                name: application.layer
            });

            var mask = ub.pixi.new_sprite(mask.material_option_path);

            sprite.mask = mask;

            var s = view_objects['objects_' + application.code];

            view_objects['objects_' + application.code] = sprite;
            view.addChild(sprite);

            sprite.position = new PIXI.Point(x,y);
            sprite.rotation = application.rotation;

            if(sprite.width === 1) {
            
                sprite.position.x -= (sprite.width / 2);
                sprite.position.y -= (sprite.height / 2);

            }
      
            sprite.anchor.set(0.5, 0.5);

            sprite.position = application_obj.position;
            sprite.rotation = application_obj.rotation;
            sprite.scale    = application_obj.scale;
            sprite.alpha    = application_obj.alpha;

            var layer_order = ( 10 + application.layer_order ) 

            sprite.originalZIndex = layer_order * (-1);
            sprite.zIndex = layer_order * (-1);
            settings.applications[application.code].layer_order = layer_order;
        
            ub.updateLayersOrder(view);

            ub.funcs.createDraggable(sprite, application, view);
            ub.funcs.createClickable(sprite, application, view, 'application');

        };

        // end load logo

        ub.update_application_mascot = function(application_obj) {

            var application = application_obj.application;
            var mascot = application_obj.mascot;

            var x = ub.dimensions.width * application.position.x;
            var y = ub.dimensions.height * application.position.y;
            var settings = ub.current_material.settings;
            var application_mascot_code = application.code + '_' + mascot.id;
            var view = ub[application.perspective + '_view'];
            var view_objects = ub.objects[application.perspective + '_view'];
            var container = new PIXI.Container();

            var elements = "";

            _.each(mascot.layers, function(layer, index){

                var mascot_layer = PIXI.Sprite.fromImage(layer.filename);
                mascot_layer.tint = layer.color;

                mascot_layer.anchor.set(0.5, 0.5);
                container.addChild(mascot_layer);

                var val = layer.default_color;
                var col = layer.default_color;
                var filename = layer.filename;
                
                elements += ub.create_mascot_color_picker(index, val, col, application.id, mascot.code); 

            });


            container.scale = new PIXI.Point(0.5, 0.5);

            var sprite = container;
            var mask = _.find(ub.current_material.material.options, {
                
                perspective: application.perspective,
                name: application.layer

            });

            var mask = ub.pixi.new_sprite(mask.material_option_path);
            var temp = {}

            sprite.mask = mask;

            var s = view_objects['objects_' + application.code];

            var position = '';
            var scale = '';
            var rotation = '';
            var alpha = '';

            view_objects['objects_' + application.code] = sprite;
            view.addChild(sprite);

            sprite.position = application_obj.position;
            sprite.rotation = application_obj.rotation;
            sprite.scale    = application_obj.scale;
            sprite.alpha    = application_obj.alpha;

            var layer_order = ( 10 + application_obj.layer_order );

            sprite.originalZIndex = layer_order * (-1);
            sprite.zIndex = layer_order * (-1);
            settings.applications[application.code].layer_order = layer_order;
        
            ub.updateLayersOrder(view);

            ub.funcs.createClickable(sprite, application, view, 'application');

        };

        ub.save_property = function (obj) {

            if (typeof obj.application_id === 'undefined' || typeof obj.property === 'undefined' || typeof obj.value === 'undefined') {

                console.warning ('Incomplete Input');
                return;

            }

            ub.current_material.settings.applications[obj.application_id][obj.property] = obj.value;

        }

        /// End Utilities ///

        /// Camera Views
            
            $('a.change-view').on('click', function (e) {

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

        $(window).scroll(function (e) {

            _.each(ub.tethers, function (obj) {
                obj.position();
            });

        });

    /// End Reposition All Tethers

    /// Generate Pattern 

    ub.generate_pattern = function (target, clone, opacity, position, rotation, scale) {

        var uniform_type = ub.current_material.material.type;
        var target_name = target.replace('_', ' ');
        var pattern_settings = '';
        var views = ub.data.views;

        target_name = util.toTitleCase(target_name);

        pattern_settings = ub.current_material.containers[uniform_type][target_name];
        pattern_settings.containers = {};

        _.each(views, function (v){

            pattern_settings.containers[v] = {};
            
            var namespace = pattern_settings.containers[v];
            namespace.container = new PIXI.Container();
            var container = namespace.container;
            container.sprites = {};

            _.each(clone.layers, function (layer, index) {

                var s = $('[data-index="' + index + '"][data-target="' + target + '"]');
                container.sprites[index] = ub.pixi.new_sprite(layer.filename);

                var sprite = container.sprites[index];

                sprite.zIndex = layer.layer_number * -1;
                sprite.tint = parseInt(layer.default_color,16);
                sprite.anchor.set(0.5,0.5);

                sprite.tint = clone.layers[index].color

                container.addChild(sprite);

                container.position = layer.container_position;
                container.alpha = layer.container_opacity;
                container.rotation = layer.container_rotation;
                container.scale = layer.container_scale;
                
            });

            ub.updateLayersOrder(container);

            var view = v + '_view';
            var mask = ub.objects[view][target + "_mask"];

            if(typeof mask === 'undefined') {
                return;
            }

            container.mask = mask;
            
            if (typeof ub.objects[view]['pattern_' + target] === 'object') {
                ub[view].removeChild(ub.objects[view]['pattern_' + target]);
            }

            ub.objects[view]['pattern_' + target] = container;
            ub[view].addChild(container);
            container.zIndex = mask.zIndex + (-1);

            ub.updateLayersOrder(ub[view]);

        });

    }

    /// End Generate Pattern

    ub.funcs.identify = function (applicationCode) {

        $('button[data-action="identify"][data-id=' + applicationCode + ']').click();

    }


    /// Saving, Loading and Sharing /// 


    // New Design
    $('.new-design').on('click', function () {
        // To Do
    });

    // Open Design
    $('.open-design').on('click', function () {
        openSavedUniformDesigns(ub.user.id);
    });

    // Compare Designs
    $('.compare-design').on('click', function () {
        // To Do
    });

    // Save Design Modal
    $('.open-save-design-modal').on('click', function () {
        if (ub.user === false) {
            
            showSignUpModal();
            return;

        } else {

            var obj_settings = ub.exportSettings();
            obj_settings['upper']['preview'] = '';

            $('#builder_customizations').val(JSON.stringify(obj_settings));
            $('#save-design-modal').modal('show');

        }
    });

    // Remove Uniform Design Trigger
    function bindDeleteUniformDesign() {
        $('.delete-uniform-design').on('click', function() {
            var data = {
                id: $(this).data('order-id')
            };
            $.ajax({
                url: ub.config.api_host + '/api/order/delete',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(data),
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
                success: function(response) {
                    if (response.success) {
                        $('.delete-uniform-design[data-order-id="' + data.id + '"]').parents('.uniform-design-item').fadeOut();
                    }
                }
            });
        });
    }

    function openSavedUniformDesigns(userId) {
        var options = {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };
        $.ajax({
            url: ub.config.api_host + '/api/order/user/' + userId,
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) {
                if (response.success) {
                    var orders = response.orders;
                    $('#orders-list').html(''); // Clear the list
                    $.each(orders, function (i, order) {
                        var template = $('#list-saved-designs').html();
                        var date_ordered = new Date(order.created_at);
                        order.created_at = date_ordered.toLocaleTimeString("en-us", options);
                        var row = Mustache.to_html(template, order)
                        $('#orders-list').append(row);
                    });
                    $('#orders-list [data-toggle="tooltip"]').tooltip();
                    $('#open-design-modal').modal('show');
                }
                bindShareDesigns();
                bindDeleteUniformDesign();
            }
        });
    }


    function saveUniformDesign() {
        var data = {
            uniformType: $('#save-design-modal .uniform-type').val(),
            builder_customizations: ub.exportSettings(),
            athletic_director: {
                organization: $('#athletic-director .organization').val(),
                contact: $('#athletic-director .contact').val(),
                email: $('#athletic-director .email').val(),
                phone: $('#athletic-director .phone-number').val(),
                fax: $('#athletic-director .fax-number').val()
            },
            billing: {
                organization: $('#billing-information .organization').val(),
                contact: $('#billing-information .contact').val(),
                address: $('#billing-information .address').val(),
                city: $('#billing-information .city').val(),
                state: $('#billing-information .state').val(),
                zip: $('#billing-information .zip').val(),
                email: $('#billing-information .email').val(),
                phone: $('#billing-information .phone-number').val(),
                fax: $('#billing-information .fax-number').val()
            },
            shipping: {
                organization: $('#shipping-information .organization').val(),
                contact: $('#shipping-information .contact').val(),
                address: $('#shipping-information .address').val(),
                city: $('#shipping-information .city').val(),
                state: $('#shipping-information .state').val(),
                zip: $('#shipping-information .zip').val(),
                phone: $('#shipping-information .phone-number').val(),
            },
            credit_card: {
                number: $('#credit-card-information .credit-card-number').val(),
                verification: $('#credit-card-information .security-code').val(),
                card_type: $('#credit-card-information .card-type').val(),
                card_holder_name: $('#credit-card-information .billing-address-name').val(),
                expiration_date: $('#credit-card-information .expiration-month-and-year').val(),
            }
        };
        if (ub.user === false) {
            showSignUpModal();
            return;
        } else {
            data.user_id = ub.user.id;
            data.client = ub.user.fullname;
            data.email = ub.user.email;
        }
        $('#save-design-modal').modal('hide');

        // Notification Message
        $.smkAlert({text: 'Saving your order. Please wait...', type:'info', permanent: true, marginTop: '90px'});

        var endpoint = ub.config.api_host + '/api/order';
        if (typeof(ub.order) !== "undefined") {
            endpoint = ub.config.api_host + '/api/order/update';
        }

        var use_perspectives = 0;
        if (use_perspectives) {
            data.image_perspectives = {
                front: ub.getThumbnailImage('front_view'),
                back: ub.getThumbnailImage('back_view'),
                left: ub.getThumbnailImage('left_view'),
                right: ub.getThumbnailImage('right_view')
            };
        }

        $.ajax({
            url: endpoint,
            data: JSON.stringify(data),
            type: 'POST',
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) {
                if (response.success) {
                    // Notification Message
                    $.smkAlert({text: 'Finished Saving Uniform Design', type:'success', permanent: false, 'time': 10, marginTop: '90px'});
                    // Redirect to Order Page
                    location.href = location.protocol + '//' + location.host + '/order/' + response.order.order_id;
                }
                saveImagePerspectives('front_view', ub.getThumbnailImage('front_view'));
                saveImagePerspectives('front_view', ub.getThumbnailImage('back_view'));
                saveImagePerspectives('front_view', ub.getThumbnailImage('left_view'));
                saveImagePerspectives('front_view', ub.getThumbnailImage('right_view'));
            }
        });
    }

    function showSignUpModal() {
        $('#signup-modal').modal('show');
    }

    // Save Uniform Design
    $('.save-uniform-design').on('click', function() {
        // Uniform Codes
        $('#save-uniform-design-form .upper_body_uniform').val(ub.current_material.settings.upper.code);
        $('#save-uniform-design-form .lower_body_uniform').val(ub.current_material.settings.lower.code);
        // Team Roster Counts
        var countRoster = 0;
        if (typeof(ub.current_material.team_roster) !== "undefined") {
            countRoster = ub.current_material.team_roster.length;
        }
        $('#save-uniform-design-form .total_upper_uniforms').val(countRoster);
        $('#save-uniform-design-form .total_lower_uniforms').val(countRoster);
        // Perspectives: Base64 format images
        $('#save-uniform-design-form .upper_front_view').val(ub.getThumbnailImage('front_view'));
        $('#save-uniform-design-form .upper_back_view').val(ub.getThumbnailImage('back_view'));
        $('#save-uniform-design-form .upper_right_view').val(ub.getThumbnailImage('right_view'));
        $('#save-uniform-design-form .upper_left_view').val(ub.getThumbnailImage('left_view'));

        // Show spinner
        $('#save-design-modal .fa-save').removeClass('fa-save').addClass('fa-spin fa-circle-o-notch');
        $(this).attr('disabled', 'disabled');

        // disable the modal-close behaviour
        $('#save-uniform-design-form').submit();
    });

    // User Signup
    $('.user-signup').on('click', showSignUpModal);

    if (ub.user !== false) {
        // Credit Card Validator
        var creditly = Creditly.initialize(
              '.creditly-wrapper .expiration-month-and-year',
              '.creditly-wrapper .credit-card-number',
              '.creditly-wrapper .security-code',
              '.creditly-wrapper .card-type');
        $(".creditly-card-form .validate-cc").click(function (e) {
            e.preventDefault();
            var output = creditly.validate();
            if (output) {
              // Your validated credit card output
       
            }
        });
    }

    $('.open-team-roster-modal').on('click', function () {
        $('#team-roster-modal').modal('show');
    });

    $('.add-roster-record').on('click', createNewRosterRecordForm);

    function createNewRosterRecordForm() {
        var template = $('#roster-record').html();
        var item = Mustache.to_html(template, {uniformSizes: ub.uniformSizes});
        $('#team-roster-form .table-roster-list').append(item);
        bindRemoveButtonBehavior();
    }

    function refreshUniformSizesInRosterSelect() {
        $('.row-roster-size').each(function(i, item){
            $(item).html('');
            var template = $('#roster-sizes-options').html();
            var cell_content = Mustache.to_html(template, {uniformSizes: ub.uniformSizes});
            $(item).html(cell_content);
        });
    }

    $('.close-share-uniform-design-modal').on('click', function(){
        $('#open-design-modal').modal('show');
        $('#share-design-modal .team-email').val('');
    });

    $('.share-uniform-design-by-email').on('click', function(){
        var data = {
            email_list: $('#share-design-modal .team-email').val(),
            order_id: $(this).data('order-id'),
            sharer_name: ub.user.fullname
        };

        var captcha_response = $('#share-design-modal .g-recaptcha-response').val();
        if (captcha_response.length == 0) {
            $.smkAlert({text: 'Please answer the reCAPTCHA verification', type:'warning', permanent: false, time: 5, marginTop: '90px'});
            return false;
        }

        $.ajax({
            url: ub.config.api_host + '/api/order/share',
            data: JSON.stringify(data),
            type: 'POST',
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function(response) {
                $('#share-design-modal').modal('hide');
                // Notification Message
                var messageType = (response.success) ? 'success' : 'warning';
                $.smkAlert({text: response.message, type:messageType, permanent: false, time: 10, marginTop: '90px'});

                // Reload reCAPTCHA
                grecaptcha.reset();
            }
        });
    });

    function bindShareDesigns() {
        $('.share-uniform-design').on('click', function(){
            var order_id = $(this).data('order-id');
            $('#open-design-modal').modal('hide');
            $('#share-design-modal .share-uniform-design-by-email').data('order-id', order_id);
            $('#share-design-modal').modal('show');
        });
    }

    function bindRemoveButtonBehavior() {
        $('.remove-roster-record').on('click', function () {
            $(this).parents('tr').remove();
        });
    }

    $('.save-team-roster').on('click', saveTeamRoster);

    function saveTeamRoster() {
        var roster = [];
        var i = 0;
        $('.table-roster-list tr').each(function (i, row) {
            // 0th element contains the headers
            if (i > 0) {
                var number = $(row).find('td').eq(0).find('input').val();
                var name = $(row).find('td').eq(1).find('input').val();
                var application = $(row).find('td').eq(2).find('select').val();
                var size = $(row).find('td').eq(3).find('select').val();
                if ((number != "") && (name != "")) {
                    roster.push({
                        number: number,
                        name: name,
                        application: application,
                        size: size
                    });
                }
            }
        });

        $('.roster-list').html(''); // Clear current roster list
        $.each(roster, function(i, template_data){
            var template = $('#roster-list').html();
            var row = Mustache.to_html(template, template_data)
            $('.roster-list').append(row);
        });

        $('#team-roster-modal').modal('hide');

        // Notification Message
        $.smkAlert({text: 'Updated team roster list', type:'info', permanent: false, time: 5, marginTop: '90px'});
    }

    // function getUniformSuggestions(categoryId) {
    //     $.ajax({
    //         url: ub.config.api_host + '/api/materials/suggestions/' + categoryId,
    //         success: function (response) {
    //             if (response.success) {
    //                 $.each(response.materials, function (i, material){
    //                     if (material.id != ub.config.material_id) {
    //                         $('.suggestions').append('<a href="#loadMaterial' + material.id + '"><img src="' + material.thumbnail_path + '"></a>');
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // }
    // getUniformSuggestions(ub.config.category_id);

    // Uniform Sizes - Size Clicked Behavior
    $('.uniform-sizes .uniform-size').on('click', onSizeSelect);

    function onSizeSelect() {
        var isSelected = parseInt($(this).data('is-selected'));
        var size = $(this).data('size');
        // Toggle Size Selection
        if (isSelected) {
            // Turn Size Off
            $(this).removeClass('selected');
            $(this).data('is-selected', 0);
            ub.uniformSizes[size].active = false;
        } else {
            // Turn Size On
            $(this).addClass('selected');
            $(this).data('is-selected', 1);
            ub.uniformSizes[size].active = true;
        }
        refreshUniformSizesInRosterSelect();
    }

    // Initial Roster Item
    createNewRosterRecordForm();

});
