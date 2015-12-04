$(document).ready(function () {

    /// NEW RENDERER ///

        /// Initialize Uniform Builder

        window.ub.initialize = function () {

            if (window.ub.config.material_id === -1) {
                return;
            }


            ub.funcs.print_version();

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

            var group_element_1 = '<button class="button_tabs all" data-type="All" data-gender="' + gender + '" data-category="' + category + '">Jersey and Pant</button>';
            var group_element_2 = '<button class="button_tabs upper" data-type="upper" data-gender="' + gender + '" data-category="' + category + '">Jersey</button>';
            var group_element_3 = '<button class="button_tabs lower" data-type="lower" data-gender="' + gender + '" data-category="' + category + '">Pant</button>';
            var group_header = '<div class="picker_header picker_header_tabs" style="text-align: center;">' + group_element_1 + group_element_2 + group_element_3 + '</div>';

            elements = header + category_header + group_header;

            var design_sets = _.where(ub.design_sets, { category: category, gender: gender.toLowerCase() });

            if (type === 'All') {
                design_sets = _.where(ub.design_sets, { category: category, gender: gender.toLowerCase() });
            } else {
                design_sets = _.where(ub.materials, { uniform_category: category, gender: gender.toLowerCase(), type: type });
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
        // ToDo: Redraw the canvas ~ Arthur's part here
    };

    // Initialize uniform settings
    ub.init = function () {

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

        settings.files = {};

        settings.files.logos = [];
        settings.applications = {};

        var current_material = ub.current_material.material;
        var material_options = ub.current_material.materials_options;
        var type = current_material.type;

        settings[type].material_id = current_material.id;
        settings[type].code = current_material.code;

        _.each(material_options, function (material_option) {

            var name = '';
            var obj  = '';

            name = material_option.name;
            settings[type][name] = {};

            obj = settings[type][name];

            obj.code = name.replace(' ', '_').toLowerCase();
            obj.color = '';
            obj.gradient_is_above_pattern = false;
            
            obj.has_gradient = false;
            obj.has_pattern = false;
            
            obj.gradient = {
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

                var name = obj.name.toLowerCase().replace(' ', '_');

                // Skip creating object if name already exists
                if (typeof ub.current_material.options_distinct_names[name] === "object") { return; }

                current_view_objects[name] = ub.pixi.new_sprite(obj.material_option_path);
                var current_object = current_view_objects[name];

                current_object.name = name;
                current_object.zIndex = (obj.layer_level * 2) * (-1);
                current_object.originalZIndex = (obj.layer_level * 2) * (-1);

                if (obj.setting_type === 'highlights') {
                    current_object.blendMode = PIXI.BLEND_MODES.SCREEN;
                } else if (obj.setting_type === 'shadows') {
                    current_object.blendMode = PIXI.BLEND_MODES.MULTIPLY;
                } else {
                    
                    var default_color = JSON.parse(obj.colors)[0];
                    var color = _.find(ub.data.colors, { color_code: default_color });

                    current_object.tint = parseInt(color.hex_code, 16);

                    var modifier_label = name;
                    ub.current_material.options_distinct_names[name] = { setting_type: obj.setting_type, 'modifier_label': modifier_label, 'material_option': name, 'default_color': color.hex_code, 'available_colors': JSON.parse(obj.colors), 'layer_order': obj.layer_level, };
                    
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

            //$('div.applications_container').html(markup);

            markup = '';

            _.each(ub.data.applications.items, function (application) {

                var ddowns =  '<div class="applications_dropdown" data-option="applications" data-id="' + application.id + '">';
                ddowns     +=   '<select class="application_type_dropdown" data-label="applications" data-id="' + application.id + '">';
                ddowns     +=       '<option value="none">-- Select an Application --</option>';
                ddowns     +=       '<option value="logo">Logo</option>';
                ddowns     +=       '<option value="mascot">Mascot</option>';
                ddowns     +=       '<option value="player_number">Player Number</option>';
                ddowns     +=       '<option value="player_name">Player Name</option>';
                ddowns     +=       '<option value="team_name">Team Name</option>';
                ddowns     +=       '<option value="image">Image</option>';
                ddowns     +=   '</select>&nbsp;';
                ddowns     +=   '<button data-action="edit" data-option="applications" data-id="' + application.id + '" class="btn btn-xs">Edit</button>&nbsp;';
                ddowns     +=   '<button data-action="identify" data-option="applications" data-id="' + application.id + '" class="btn btn-xs">Identify</button>';
                ddowns     += '</div>';
                ddowns     += '<div class="applications_modifier_container" data-id="' + application.id + '"></div>';

                markup += application.id + ". " + application.name + ":<br />" + ddowns + "<br /><br />";

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

                    if (application_type === "logo") {
                        $container.ubLogoDialog({ application: application });
                    }

                    if (application_type === "image") {
                        $container.ubImageDialog({ application: application });
                    }

                    if (application_type === "mascot") {
                        $container.ubMascotDialog({ application: application });
                    }

                    if (application_type === "player_name") {
                        $container.ubPlayerNameDialog({ application: application });
                    }

                    if (application_type === "player_number") {
                        $container.ubPlayerNumberDialog({ application: application });
                    }

                    if (application_type === "team_name") {
                        $container.ubTeamNameDialog({ application: application });
                    }

                    if (application_type === "none") {
                        $container.html('');
                    }
                    
                });

                $('button[data-option="applications"]').on('click', function(e) {

                    var $button = $(this);
                    var action = $button.data('action');
                    
                    if (action === "identify") {

                        var data_id = $button.data("id");
                        var application = _.find(ub.data.applications.items, { id: data_id });
                        var perspective = application.perspective;
                        var view = ub[perspective + '_view'];
                        var view_objects = ub.objects[perspective + '_view'];

                        if($button.hasClass('appactive')){

                            $button.html('Identify');

                            $button.removeClass('appactive');
                            if (typeof view_objects['point'] === "object") {

                                view.removeChild(view_objects['point']);
                                delete view_objects['point'];

                            }

                            return;
                        }

                        $('button[data-option="applications"][data-action="identify"]').removeClass('appactive');
                        $('button[data-option="applications"][data-action="identify"]').html('Identify');

                        $button.addClass('appactive');
                        $button.html('Hide');

                        var point = ub.pixi.new_sprite('/images/misc/point.png');
                        point.anchor.set(0.5, 0.5);

                        $('a.change-view[data-view="' + perspective + '"]').click();

                        var x = ub.dimensions.width * application.position.x;
                        var y = ub.dimensions.height * application.position.y;

                        point.position.x = x;
                        point.position.y = y;

                        if (typeof view_objects['point'] === "object") {

                            view.removeChild(view_objects['point']);
                            delete view_objects['point'];

                        }

                        view_objects['point'] = point;
                        view.addChild(point);

                    }

                });

            // End Event handler for Applications Buttons

        /// End Setup Modifiers Applications

        /// Setup Settings obj, for persisting customizer selection

            ub.init();

        /// End Setup Settings obj

    };

        /// End Render Different Views ///

        /// Utilities ///

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
            $('div#right-sidebar > a.sidebar-buttons').css('background-color','#acacac');
            $(panel).fadeIn(100);

        }

        /// RIGHT SIDEBAR

            $('div#right-sidebar > a.sidebar-buttons').on('click', function (e) {

                $('#arrow_design_sets').remove();

                if (ub.active !== null) {

                    filename = ub.config.host + '/images/sidebar/' + ub.active.data('filename') + '.png';
                    ub.active.css('background-image', 'url(' + filename + ')');
                    ub.active.removeClass('active_button');

                }

                ub.active = $(this);
                filename = ub.config.host + '/images/sidebar/' + ub.active.data('filename') + '-on' + '.png';

                ub.active.css('background-image', 'url(' + filename + ')');
                ub.active.addClass('active_button');

                switch_panel('#' +  ub.active.data('filename') + '_panel');

                return false;

            });

            $('div#right-sidebar > a.sidebar-buttons').hover(function (e) {

                var s = $(e.currentTarget)
                var option = s.data('filename');
                var filename = ub.config.host + '/images/sidebar/' + option + '-on.png';

                if (s.is($('#right-sidebar > a.active_button')[0])) {
                    return;
                }
                
                s.css('background-color','#363636');
                s.css('background-image', 'url(' + filename + ')');
 
            }, function (e) {

                var s = $(e.currentTarget);

                if (s.is($('#right-sidebar > a.active_button')[0])) {
                    return;
                }

                var option = s.data('filename');
                var filename = ub.config.host + '/images/sidebar/' + option + '.png';
                
                s.css('background-color','#acacac');
                s.css('background-image', 'url(' + filename + ')');                       

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

                    $('a.' + s).css('background-color','#363636');

                    var option = $('a.' + s).data('option');
                    var filename = ub.config.host + '/images/sidebar/' + option + '-on.png';

                    $('a.' + s).css('background-image', 'url(' + filename + ')');

                }                           

            }, function (e){

                var sidebar_classes = ['btn-new', 'btn-load', 'btn-compare', 'btn-save'];
                var s = $(e.currentTarget).attr('class').split(' ')[0];

                if (_.contains(sidebar_classes, s)) {

                    if ($('a.' + s).data('status') === 'new' || s !== 'btn-new') {
                        
                        $('a.' + s).css('background-color','#acacac');

                        var option = $('a.' + s).data('option');
                        var filename = ub.config.host + '/images/sidebar/' + option + '.png';

                        $('a.' + s).css('background-image', 'url(' + filename + ')');

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

                ub.display_design_sets(category, gender, 'All');

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
                    color_param = "#eeeded";
                }

                var color_value = parseInt(color_param.substring(1), 16);

                if (panel === 'body') {

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
                    
                    if (typeof(ub.objects.front_view[obj]) === "object") {
                        ub.objects.front_view[obj].tint = color_value;
                    }
                    
                    if (typeof(ub.objects.back_view[obj]) === "object") {
                        ub.objects.back_view[obj].tint = color_value;    
                    }

                    if (typeof(ub.objects.left_view[obj]) === "object") {
                        ub.objects.left_view[obj].tint = color_value;    
                    }
                    
                    if (typeof(ub.objects.right_view[obj]) === "object") {
                        ub.objects.right_view[obj].tint = color_value;    
                    }
                    
  
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

                    if (typeof(ub.objects.front_view[obj]) !== 'undefined') {
                        ub.objects.front_view[obj].tint = color_value;
                    }

                    if (typeof(ub.objects.back_view[obj]) !== 'undefined') {
                        ub.objects.back_view[obj].tint = color_value;    
                    }

                    if (typeof(ub.objects.left_view[obj]) !== 'undefined') {
                        ub.objects.left_view[obj].tint = color_value;    
                    }

                    if (typeof(ub.objects.right_view[obj]) !== 'undefined') {
                        ub.objects.right_view[obj].tint = color_value;    
                    }

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

                    var pattern_settings = ub.current_material.settings[uniform_type][target_name].pattern;
                    pattern_settings.containers = {};

                    var views = ub.data.views;
                    
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

                        });

                        ub.updateLayersOrder(container);

                        var view = v + '_view';
                        var mask = ub.objects[view][target + "_mask"];

                        if(typeof mask === 'undefined') {
                            return;
                        }

                        container.mask = mask;

                        /// Process Rotation

                        var $rotation_slider = $('div#rotation_pattern_slider_' + target);
                        var value = parseInt($rotation_slider.find('span.edit').html());

                        container.rotation = value / 100

                        /// End Rotation

                        /// Process Scale 

                        var $scale_slider = $('div#scale_pattern_slider_' + target);
                        var value = $scale_slider.limitslider("values")[0];
                        var scale = new PIXI.Point(value / 100, value / 100);

                        container.scale = scale

                        /// End Process Scale

                        if (typeof ub.objects[view]['pattern_' + target] === 'object') {
                            ub[view].removeChild(ub.objects[view]['pattern_' + target]);
                        }

                        ub.objects[view]['pattern_' + target] = container;
                        ub[view].addChild(container);
                        container.zIndex = mask.zIndex + (-1);

                        ub.updateLayersOrder(ub[view]);

                    });

                    ub.refresh_thumbnails();

                });

                $("button#update-pattern-" + target + "").click();

            };

            /// End Change Pattern ///

            /// Change Gradient ///

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

            /// End Change Gradient ///

        };

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

            if (uniform_type === "upper") {

                guides = { x1: 23, y1: 67, x2: 466, y2: 464 };

            }
            else {

                guides = { x1: 148, y1: 58, x2: 347, y2: 488 };

            }

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

        };

        /// End Process Changes /// 

        /// Utilities ///

            $('#view_pattern').hide();

            $('button#toggle_pattern_preview').on('click', function (e) {
                $('#view_pattern').toggle();
            });

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
        ub.current_material.team_roster = roster;

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

    function getUniformSuggestions(categoryId) {
        $.ajax({
            url: ub.config.api_host + '/api/materials/suggestions/' + categoryId,
            success: function (response) {
                if (response.success) {
                    $.each(response.materials, function (i, material){
                        if (material.id != ub.config.material_id) {
                            $('.suggestions').append('<a href="#loadMaterial' + material.id + '"><img src="' + material.thumbnail_path + '"></a>');
                        }
                    });
                }
            }
        });
    }

    getUniformSuggestions(ub.config.category_id);

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
