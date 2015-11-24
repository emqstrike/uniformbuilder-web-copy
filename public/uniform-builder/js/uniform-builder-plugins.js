
(function ($) {

    $.fn.ubColorPicker = function(options) {

        var settings = $.extend({ target: 'target' }, options);

        return this.each(function() {

            var target_name = window.util.toTitleCase(settings.target);
            var obj_colors = ''

            if (typeof settings.target_name === 'string') {
                target_name  = settings.target_name
            }
            else{

                var temp = settings.target.replace('_', ' ');
                target_name = window.util.toTitleCase(temp);

            }

            obj_colors = _.find(ub.current_material.material.options, {name: target_name });

            var el = $(this);
            var el_parent = el.parent();

            var color = el_parent.find('input').val();
            var color_stop_index = el_parent.find('input').data('index');
            var btn_el_id = settings.type + "_" + settings.target + "_" + color_stop_index;

            var code = target_name;
            var name = target_name.replace('_',' ').toUpperCase();

            var header = '';
            var str_builder = header + '<div class="options_panel_section ubColorPicker" data-index="' + color_stop_index + '" data-option="' + code + '" data-group="colors"><div class="color_panel_container color_panel_container_ub_picker">';
            var color_elements = '';

            _.each(JSON.parse(obj_colors.colors), function(color_obj) {

                var color = _.find( ub.data.colors, { color_code: color_obj});
                var element = '<div class="color_element">';

                element = element + '<button class="btn change-color" data-elid="' + btn_el_id + '" data-index="' + color_stop_index + '" data-panel="' + code + '" data-target="' + code + '" data-color="#' + color.hex_code + '" data-color-code="' + color.hex_code + '"  data-type="' +  settings.type + '" style="background-color: #' + color.hex_code + '; width: 35px; height: 35px; border-radius: 8px; border: 2px solid white; padding: 0px;" data-layer="none" data-placement="bottom" title="' + color.name + '" data-selection="none"></button>';
                element = element + '</div>';    
                color_elements = color_elements + element;

            });

            str_builder = str_builder + color_elements;
            str_builder = str_builder + '</div></div>';

            ////

            var btn_el = "<div id='" + btn_el_id + "' class='btn drop-target drop-theme-hubspot-popovers' title='Color Stop: " + color_stop_index + "' rel='popover' tabindex='0' data-placement='bottom' data-popover-content='#" + settings.type + "_" + settings.target + "' data-type='" + settings.type + "' data-target='" + settings.target + "'><span data-target='" + settings.target + "' data-index='" + color_stop_index + "' data-type='" + settings.type + "' style='background-color: " + color + "'></span></div>";
            var popup_picker = "<div id='" + settings.type + "_" + settings.target + "' class='popup_picker'>" + str_builder + "</div>";

            el_parent.addClass('ubColorPicker');

            el.data('target');
            el.data('target', settings.target);

            el.data('type');
            el.data('type', settings.type);

            el_parent.append(btn_el);
            el_parent.append(popup_picker);

            /// Handler for the color buttons
            var colors_btn = util.dataSelector('.btn', { 'elid': btn_el_id });

            colors_btn.on('click', function() {

                var color = $(this).data('color');
                $('input[data-elid="' + btn_el_id + '"]').val(color);
                el_parent.find('span').css('background-color', color);

                if (settings.type === 'gradient') {

                    $("button#update-gradient-" + settings.target).click();

                }

                if (settings.type === 'pattern') {

                    var layer_no = $(this).data('index');
                    var target = $(this).data('panel');
                    var color = parseInt($(this).data('color-code'), 16);

                    var uniform_type = 'upper'; // TODO: Parameterized this.

                    var views = ['front', 'back', 'left', 'right'];
                    var c = ub.current_material.settings[uniform_type][target].pattern.containers;

                    _.each(views, function (v){
                        c[v].container.children[layer_no].tint = color;

                    });

                    ub.refresh_thumbnails();

                }

                if (settings.type === 'text_pattern') {

                    var pattern = ub.current_material.settings.applications[settings.application.code].pattern;
                    var layer_no = $(this).data('index');
                    var target = $(this).data('panel');
                    var color = parseInt($(this).data('color-code'), 16);

                    pattern.children[layer_no].tint = color;
                    ub.refresh_thumbnails();

                }

            });

            /// Handler for the color stop button
            var preamble = 'div.options_panel_section.ubColorPicker';
            var panels = util.dataSelector(preamble, { 'option': target_name });
            var color_stop_btn = util.dataSelector('span', { 'target': settings.target, 'type': settings.type, 'index': color_stop_index });
            
            color_stop_btn.on("click", function() {
                
                var picker_panel = util.dataSelector(preamble, { 'option': target_name, 'index': color_stop_index });

                if (picker_panel.css('display') === "none") {
                    panels.hide();
                    picker_panel.show();
                }
                else {
                    panels.hide();
                }

            });

            panels.hide();

        });

    };

    
    $.fn.ubLogoDialog = function(options) {

        var settings = $.extend({ application: {} }, options);
        var application = settings.application;

        var view_str = application.perspective + '_view';
        $('a#view_' + application.perspective).click();

        return this.each(function () {

            var $container = $(this);
            var html_builder = '';

            html_builder += "<hr />";
            html_builder += "<div class='logo_drop btn' data-id='" + settings.application.id + "'>Choose a Logo: <i class='fa fa-caret-down'></i></div>";
            html_builder += "<div class='logo-controls' id='controls-" + settings.application.id + "' data-id='" + settings.application.id + "'>";
            html_builder += "<hr />";

            $container.html(html_builder);

            var selector = 'div.logo_drop[data-id="' + settings.application.id + '"]';
            var drop;
            var content = "";

            content += "<div data-id='" + settings.application.id + "' class='row logo-container' id='logo-container-" + settings.application.id + "'>";
            content += "</div>";
            content += "<hr />";
            content += "<div class='row'>";
            content +=      "<div col-md-12>";
            content +=      "<form>";
            content +=          "<input type='file' id='file-src-" + settings.application.id + "' data-id='" + settings.application.id + "' name='material_option_path'>";
            content +=      "</form>";
            content +=      "</div>";
            content += "</div>";
            content += "<hr />";

            drop = new Drop({
                target: document.querySelector(selector),
                content: content,
                classes: 'drop-theme-arrows',
                position: 'bottom left',
                openOn: 'click'
            });

            ub.ui.drops[settings.application.id] = drop;

            var file_change_handler = function () {

                var $file_input = $(this);
                var data_id = settings.application.id;
                
                var files = !!this.files ? this.files : [];
                if (!files.length || !window.FileReader) { return; } // no file selected, or no FileReader support

                if (/^image/.test(files[0].type)) { // only image file

                    var reader = new FileReader(); // instance of the FileReader
                    reader.readAsDataURL(files[0]); // read the local file

                    reader.onloadend = function() { // set image data as background of div

                        var logos = ub.current_material.settings.files.logos;
                        var file = files[0];
                        var id = new Date().getTime();

                        logos[id] = {
                            id: id,
                            filename: file.name,
                            dataUrl: this.result
                        };

                        var markup = "<tr data-id='" + id + "'>";
                        markup += "<td>" + "<img class='logo_list' src='" + this.result + "' />" + "</td>";
                        markup += "<td>" + "<a class='logo_list' data-id='" + id + "' data-action='preview'>" + file.name + "</a>" + "</td>";
                        markup += "<td>" + "<a class='logo_list' data-action='remove' data-id='" + id + "' class='btn-remove'>" + "<i class='fa fa-times'></i>" + "</td>";
                        markup += "</tr>";

                        $('table.logos').append(markup);
                        
                        /// Update Preview and Application

                        var application_id = settings.application.id;

                        ub.funcs.update_logo_list();
                        $('a.logo_picker[data-application-id="' + application_id + '"]').click();

                        /// End Update Preview and Application 

                    }
                }

            };

            drop.once('open', function () {

                var $selector = $('#file-src-' + settings.application.id);
                $selector.on('change', file_change_handler);

                ub.data.panels = {};
                ub.data.panels['logo_panel'] = $selector;

                ub.funcs.update_logo_list();

            });

            drop.open();
            
        });

    };

    $.fn.ubImageDialog = function(options) {

        var settings = $.extend({ application: {} }, options);

        return this.each(function () {

            var $container = $(this);
            var html_builder = '';

            html_builder += "<hr />";
            html_builder += "Image Dialog from Plugin";
            html_builder += "<hr />";

            $container.html(html_builder);

        });

    };

    $.fn.ubTeamNameDialog = function(options) {

        var settings = $.extend({ application: {} }, options);

        return this.each(function () {

            var $container = $(this);
            var html_builder = '';

            html_builder += "<hr />";
            html_builder += "Team Name Dialog from Plugin";
            html_builder += "<hr />";

            $container.html(html_builder);

        });

    };

    $.fn.ubPlayerNumberDialog = function(options) {

        var settings = $.extend({ application: {} }, options);
        var application = settings.application;

        var view_str = application.perspective + '_view';
        $('a#view_' + application.perspective).click();

        return this.each(function () {

            var $container = $(this);
            var first_font = ub.data.fonts[0];
            var html_builder = '';

            html_builder += "<hr />";
            html_builder += "<div class='ub_label'>Sample Text</div><input type='text' class='applications player_number' data-application-id='" + application.id + "' value='23'><br /><br />";
            html_builder += "<div class='ub_label'>Font Style</div><div class='font_style_drop' style='font-family:" + first_font.name + ";' data-id='" + settings.application.id + "' data-font-id='" + first_font.id + "' data-font-name='" + first_font.name + "'>" + first_font.name + " <i class='fa fa-caret-down'></i></div>";
            html_builder += "<div class='ub_label'>Accent</div><div class='accent_drop' data-id='" + settings.application.id + "'>Choose an Accent...<i class='fa fa-caret-down'></i></div>";

            html_builder += "<div class='tab_container_color' data-id='" + settings.application.id + "'>";
            html_builder +=     "<div class='btn ub active' data-id='" + settings.application.id + "' data-option='colors'>Colors</div><div class='btn ub' data-option='gradients' data-id='" + settings.application.id + "'>Gradients</div><div class='btn ub' data-id='" + settings.application.id + "' data-option='patterns'>Patterns</div>";

            html_builder +=     "<div class='colors_container colors' data-id='" + settings.application.id + "' data-option='colors'>";
            html_builder +=         "<div class='ub_label'>Base Color</div><div class='color_drop' data-id='" + settings.application.id + "'>Choose a Color...<i class='fa fa-caret-down'></i></div>";
            html_builder +=         "<div class='other_color_container' data-id='" + settings.application.id + "'></div>";
            html_builder +=     "</div>";

            html_builder +=     "<div class='colors_container gradients' data-id='" + settings.application.id + "' data-option='gradients'>";
            html_builder +=         "Gradients";
            html_builder +=     "</div>";

            html_builder +=     "<div class='colors_container patterns' data-id='" + settings.application.id + "' data-option='patterns'>";
            html_builder +=         "Patterns";
            html_builder +=     "</div>";

            html_builder += "</div>";

            html_builder += "<div class='row'>";
            html_builder += "</div><div class='logo_sliders' data-id='" + application.id + "'>";
            html_builder += "Font Size: <span data-target='logo' data-label='font_size' data-id='" + application.id + "'>100</span>px <div class='logo_slider font_size_slider' data-id='" + application.id + "'></div><br />";
            html_builder += "Rotation: <div class='logo_slider rotation_slider' data-id='" + application.id + "'></div><br />";
            html_builder += "Opacity: <span data-target='logo' data-label='opacity' data-id='" + application.id + "'>100</span>% <div class='logo_slider opacity_slider' data-id='" + application.id + "'></div><br />";
            html_builder += "Scale Width: <span data-target='logo' data-label='scale_x' data-id='" + application.id + "'>100</span>% <div class='logo_slider scale_slider_x' data-id='" + application.id + "'></div><br />";
            html_builder += "Scale Height: <span data-target='logo' data-label='scale_y' data-id='" + application.id + "'>100</span>% <div class='logo_slider scale_slider_y' data-id='" + application.id + "'></div><br />";
            html_builder += "X Position: <span></span> <div class='x_slider logo_slider' data-id='" + application.id + "'></div><br />";
            html_builder += "Y Position: <span></span> <div data-id='" + application.id + "' class='y_slider logo_slider'></div></div><br />";
            html_builder += "<hr />";

            $container.html(html_builder);

            /// Color Container Handlers

            $('div.colors_container[data-id="' + application.id + '"]').not('[data-option="colors"]').hide();
            $('div.btn.ub[data-id="' + application.id + '"]').on('click', function (e) {

                $('div.btn.ub[data-id="' + application.id + '"]').removeClass('active');
                $(this).addClass('active');
                $('div.colors_container').hide();
                $('div.colors_container[data-option="' + $(this).data('option') + '"]').fadeIn();

            });

            /// End Color Container Handlers
            
            create_font_dropdown(settings);
            create_color_dropdown(settings);
            create_accent_dropdown(settings);
            create_gradient_dropdown(settings);
            create_pattern_dropdown(settings);

            var max_font_size = 300;
            
            $('div.font_size_slider[data-id="' + application.id + '"]').limitslider({

                values: [70],
                min: 0,
                max: max_font_size,
                gap: 0,

                change: function(event, ui) {

                    var value = $(this).limitslider("values")[0];
                    var $textbox = $('input.applications.player_number[data-application-id="' + application.id + '"]');
                    
                    $textbox.trigger('change');
                    $('span[data-target="logo"][data-label="font_size"][data-id="' + application.id + '"]').text(value);

                }

            });
            
            var max_rotation = 620;
            var $rotation_slider = $('div.rotation_slider[data-id="' + application.id + '"]');

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
                    var object = ub.objects[view_str]['objects_' + application.id];

                    object.rotation = value / 100;
                    var rotation = ( value / max_rotation ) * 360;

                    $angle_slider_logo = $('div.rotation_slider[data-id="' + application.id + '"]');

                }

            });

            var max_scale = 200;
            
            $('div.scale_slider_x[data-id="' + application.id + '"]').limitslider({

                values: [100],
                min: 0,
                max: max_scale,
                gap: 0,

                change: function(event, ui) {

                    var value = $(this).limitslider("values")[0];
                    var object = ub.objects[view_str]['objects_' + application.id];

                    var value_x = $('div.scale_slider_x[data-id="' + application.id + '"]').limitslider("values")[0];
                    var value_y = $('div.scale_slider_y[data-id="' + application.id + '"]').limitslider("values")[0];

                    var scale = new PIXI.Point(value_x / 100, value_y / 100);
                    
                    object.scale = scale;

                    $('span[data-target="logo"][data-label="scale_x"][data-id="' + application.id + '"]').text(value);

                }

            });

            var max_scale = 200;
            
            $('div.scale_slider_y[data-id="' + application.id + '"]').limitslider({

                values: [100],
                min: 0,
                max: max_scale,
                gap: 0,

                change: function(event, ui) {

                    var value = $(this).limitslider("values")[0];
                    var object = ub.objects[view_str]['objects_' + application.id];

                    var value_x = $('div.scale_slider_x[data-id="' + application.id + '"]').limitslider("values")[0];
                    var value_y = $('div.scale_slider_y[data-id="' + application.id + '"]').limitslider("values")[0];

                    var scale = new PIXI.Point(value_x / 100, value_y / 100);
                    
                    object.scale = scale;

                    $('span[data-target="logo"][data-label="scale_y"][data-id="' + application.id + '"]').text(value);

                }

            });

            var max_opacity = 100;

            $('div.opacity_slider[data-id="' + application.id + '"]').limitslider({

                values: [100],
                min: 0,
                max: max_opacity,
                gap: 0,

                change: function(event, ui) {

                    var value = $(this).limitslider("values")[0];
                    var object = ub.objects[view_str]['objects_' + application.id];
                    object.alpha = value / max_opacity;

                    $('span[data-target="logo"][data-label="opacity"][data-id="' + application.id + '"]').text(value);

                    $angle_slider_logo = $('div.rotation_slider[data-id="' + application.id + '"]');

                    var opacity =  value / max_opacity;
                    $angle_slider_logo.find('div.rs-bg-color').css({
                        "opacity": opacity
                    });

                }

            });

            $('div.y_slider[data-id="' + application.id + '"]').limitslider({

                values: [application.position.y  * ub.dimensions.height],
                min: 0,
                max: ub.dimensions.height,
                gap: 0,

                change: function(event, ui) {

                    var value = $(this).limitslider("values")[0];
                    var object = ub.objects[view_str]['objects_' + application.id];
                    object.y = value;

                }

            });

            $('div.x_slider[data-id="' + application.id + '"]').limitslider({

                values: [application.position.x * ub.dimensions.width],
                min: 0,
                max: ub.dimensions.width,
                gap: 0,

                change: function(event, ui) {

                    var value = $(this).limitslider("values")[0];
                    var object = ub.objects[view_str]['objects_' + application.id];
                    object.x = value;

                }

            });

            var $textbox = $('input.applications.player_number[data-application-id="' + application.id + '"]');

            $textbox.on('keyup', function() {
                _.debounce(500, $textbox.trigger('change'));
            });

            $textbox.on('change', function () {

                if ($textbox.val().length === 0) { return; }

                var x = ub.dimensions.width * application.position.x;
                var y = ub.dimensions.height * application.position.y;
                var settings = ub.current_material.settings;
                var selected_font_id = $('div.font_style_drop[data-id="' + application.id + '"]').data('font-id');
                var font_obj = _.find(ub.data.fonts, {id: selected_font_id});

                var selected_color = $('div.color_drop[data-id="' + application.id + '"]').data('color');

                if (typeof font_obj === 'undefined') {
                    return;
                }

                var color_array = '';

                if(typeof settings.applications[application.code] !== 'undefined') {
                    
                    var color_array = settings.applications[application.code].color_array;

                }    

                var text_input = $textbox.val();
                var sprite = create_text(" " + text_input + " ", font_obj.name, application);

                settings.applications[application.code] = {
                    application: application,
                    text: text_input,
                    text_obj: sprite,
                    type: 'player_number',
                    color_array: {},
                };

                if (color_array !== ''){
                    settings.applications[application.code].color_array = color_array;
                }

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

                if (typeof(s) === 'object') {

                    var obj = view_objects['objects_' + application.code];
                    var color_array = settings.applications[application.code].color_array;

                    position = obj.position;
                    scale = obj.scale;
                    rotation = obj.rotation;
                    alpha = obj.alpha;
                    tint = obj.tint;

                    view.removeChild(view_objects['objects_' + application.code]);
                    delete view_objects['objects_' + application.code];

                }

                /// Set First Three Colors

                var colors_obj = get_colors_obj(application.layer);
                var length = sprite.children.length;

                var children = _.clone(sprite.children);
                children.reverse();

                _.each(children, function (child, index) {

                    child.tint = parseInt(child.ubDefaultColor,16);

                    if(color_array !== ''){

                        var array = ub.current_material.settings.applications[application.code].color_array;
                        var color_array_size = _.size(array);
                        var code = ub.current_material.settings.applications[application.code].color_array[index + 1];

                        if (typeof code !== 'undefined') {
                            
                            child.tint = parseInt(code.color_code, 16);

                        }

                    }

                });
         
                /// End Set First Three Colors 

                view_objects['objects_' + application.code] = sprite;
                view.addChild(sprite);

                sprite.position.x = x;
                sprite.position.y = y;
                sprite.rotation = application.rotation;

                if(sprite.width === 1) {

                    sprite.position.x -= (sprite.width / 2);
                    sprite.position.y -= (sprite.height / 2);

                }

               sprite.originalZIndex = -10;
               sprite.zIndex = -10;
               ub.updateLayersOrder(view);

               if(position !== ''){

                    sprite.position = position;
                    sprite.scale = scale;
                    sprite.rotation = rotation;
                    sprite.alpha = alpha;
                    sprite.tint = tint;

                }

                $('div.x_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.x]);
                $('div.y_slider[data-id="' + application.id + '"]').limitslider('values', [sprite.position.y]);

                sprite.draggable({
                    manager: ub.dragAndDropManager
                });

                sprite.mouseup = sprite.touchend = function(data) {

                    if (!sprite.snapped && $('#chkSnap').is(":checked")) {

                        sprite.position = new PIXI.Point(sprite.oldX, sprite.oldY);

                    }

                    this.data = data;
                    this.dragging = true;

                };

                sprite.mousedown = sprite.touchstart = function(data) {

                    this.data = data;

                    sprite.oldX = sprite.x;
                    sprite.oldY = sprite.y;
                    sprite.snapped = false;
                    this.dragging = true;

                };

                sprite.mousemove = sprite.mousemove = function(interactionData) {

                    this.interactionData = interactionData;

                    if (this.dragging) {

                        _.each(ub.data.applications.items, function(application) {

                            var x = application.position.x * ub.dimensions.width;
                            var y = application.position.y * ub.dimensions.height;
                            var p_app = new PIXI.Point(x, y);
                            var p_sprite = new PIXI.Point(sprite.x, sprite.y);
                            var distance = ub.funcs.lineDistance(p_app, p_sprite);

                            if ($('#chkSnap').is(":checked")) {

                                var minimum_distance_to_snap = 50;

                                if (distance < minimum_distance_to_snap) {

                                    sprite.position = new PIXI.Point(x,y);

                                    sprite.oldX = x;
                                    sprite.oldY = y;

                                    sprite.snapped = true;
                                    this.dragging = false;

                                    return false; // Exit loop if the logo snapped to an application point

                                } else {

                                    sprite.snapped = false;

                                }

                            }

                        });

                    }

                    window.data = this.interactionData.data;
                    window.sprite = sprite;

                    var point = {
                        x: window.data.global.x,
                        y: window.data.global.y
                    };

                    if (_.last(sprite.children).containsPoint(point)) {
                        sprite.zIndex = -500;
                        ub.updateLayersOrder(view);
                    } else {
                        sprite.zIndex = sprite.originalZIndex;
                        ub.updateLayersOrder(view);
                    }

                };

            });

            $textbox.trigger('change');

        });

    };

    $.fn.ubPlayerNameDialog = function(options) {

        var settings = $.extend({ application: {} }, options);

        return this.each(function () {

            var $container = $(this);
            var html_builder = '';

            html_builder += "<hr />";
            html_builder += "Player Name Dialog from Plugin";
            html_builder += "<hr />";

            $container.html(html_builder);

        });

    };

    function create_text (text_input, font_name, application) {

        var text_layers = {};
        var container = new PIXI.Container();

        var accent_id = $('div.accent_drop[data-id="' + application.id + '"]').data('accent-id');
        var accent_obj = _.find(ub.data.accents.items, {id: accent_id});

        var $other_color_container = $('div.other_color_container[data-id="' + application.id + '"]');

        $other_color_container.html('');

        _.each(accent_obj.layers, function (layer) {

            var text_layer = '';

            text_layers[layer.layer_no] = {};
            text_layer = text_layers[layer.layer_no];

            text_layer.no = layer.layer_no;
            text_layer.accent_obj = layer;

            var font_size = $('div.font_size_slider[data-id="' + application.id + '"]').limitslider("values")[0];
            var style = {font: font_size + "px " + font_name, fill: "white", padding: 10};

            if (layer.outline === 1){

                style.stroke = '#ffffff';
                style.strokeThickness = 6;

            }

            if (layer.outline === 2){

                style.stroke = '#ffffff';
                style.strokeThickness = 12;

                if (typeof layer.type === 'string') {
                    style.stroke = '#ffffff';
                }

            }

            if(layer.type === 'middle_stroke' && layer.outline === 1) {

                style.stroke = '#ffffff';
                style.strokeThickness = 6;

            }

            if(layer.type === 'outer_stroke' && layer.outline === 2) {

                style.stroke = '#ffffff';0
                style.strokeThickness = 12;

            }

            if(layer.type === 'outer_stroke' && layer.outline === 1) {
                style.stroke = '#ffffff';
                style.strokeThickness = 6;
            }

            if(layer.type === 'shadow' && layer.outline > 0) {
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

            if (layer.name !== 'Base Color') {
                
                $other_color_container.append('<div><div class="ub_label">' + layer.name + '</div><div class="other_color_dropdown" data-id="' + application.id + '" data-layer-name="' + layer.name + '" data-layer-no="' + layer.layer_no + '">0</div></div>');

                var selector = 'div.other_color_dropdown[data-id="' + application.id + '"][data-layer-no="' + layer.layer_no + '"]';
                create_color_dropdown_other_container (application, text_layer.text_sprite, selector, layer.layer_no); 

            }

        });

        ub.updateLayersOrder(container);

        return container;
        
    }

    function create_font_dropdown (settings) {

            var selector = 'div.font_style_drop[data-id="' + settings.application.id + '"]';
            var drop;

            var content = "";
            content += "<div data-id='" + settings.application.id + "' class='row font-container' id='font-container-" + settings.application.id + "'>";
            content += "</div>";
            content += "<div class='row'>";
            content +=      "<div col-md-12>";

            var els = '<a class="font-selector" data-font-id="-1" data-font-name="None" data-target="font_style_drop_element" data-id="' + settings.application.id + '">None</a><br />';

            _.each(ub.data.fonts, function (item) {
                els += '<a class="font-selector" style="font-family: ' + item.name + '" data-font-id="' + item.id + '" data-font-name="' + item.name + '" data-target="font_style_drop_element" data-id="' + settings.application.id + '">' + item.name + '</a><br />';
            });

            content += els;
            content +=      "</div>";
            content += "</div>";
            
            drop = new Drop({
                target: document.querySelector(selector),
                content: content,
                classes: 'drop-theme-arrows',
                position: 'bottom left',
                openOn: 'click'
            });

            ub.ui.drops[settings.application.id] = drop;

            // Font Style Event Handler 

            drop.once('open', function () {

                var $link_selector = $('a.font-selector[data-target="font_style_drop_element"][data-id="' + settings.application.id + '"]');
                
                $link_selector.click( function (e) {

                    var $dropdown = $('div.font_style_drop[data-id="' + settings.application.id + '"]')
                    
                    $dropdown.html($(this).html());
                    $dropdown.data('font-id');
                    $dropdown.data('font-id', $(this).data('font-id'));
                    $dropdown.data('font-name', $(this).data('font-name'));
                    $dropdown.css('font-family', $(this).html());

                    drop.close();

                    var $textbox = $('input.applications.player_number[data-application-id="' + settings.application.id + '"]');
                    $textbox.trigger('change');

                });

            });
    }

    var temp_drops = {};

    function create_color_dropdown_other_container (application, sprite, selector, layer_no) {

        /// Color Drop 

            var color_drop_selector = $(selector);
            var color_drop;

            color_content = "";

            var colors_obj = get_colors_obj(application.layer);

            var color_drop_content = "";
            
            color_drop_content += "<div data-id='" + application.id + "' class='row color-container' id='color-container-" + application.id + "'>";
            color_drop_content += "</div>";
            color_drop_content += "<div class='row'>";
            color_drop_content +=      "<div col-md-12>";

            var color_els = ''; 

            _.each(colors_obj, function (color) {

                var foreground = 'white';

                if (color.hex_code === 'ffffff') { 
                    foreground = 'black';
                }

                color_els += '<a class="other-color-selector" style="color: ' + foreground + '; background-color: #' + color.hex_code + '" data-layer-no="' + layer_no + '" data-color="' + color.hex_code + '" data-target="color_drop_element" data-id="' + application.id + '">' + color.name + '</a>';

            });

            color_drop_content += color_els;
            color_drop_content +=      "</div>";
            color_drop_content += "</div>";

            color_drop = new Drop({
                target: document.querySelector(selector),
                content: color_drop_content,
                classes: 'drop-theme-arrows',
                position: 'bottom left',
                openOn: 'click'
            });

            color_drop.nonce = true;

            temp_drops[application.id + ' ' + layer_no] = color_drop;

            color_drop.once('open', function () {

                var selector_str = 'a.other-color-selector[data-target="color_drop_element"][data-id="' + application.id + '"][data-layer-no="' + layer_no + '"]';
                var $link_selector = $(selector_str);

                $link_selector.click( function (e) {

                    var $dropdown = $(selector);

                    $dropdown.html($(this).html());

                    var foreground = '';
                   
                    if($(this).data('color') === "ffffff"){
                        foreground = '#000000';
                    } else {
                        foreground = '#ffffff';
                    }

                    $dropdown.data('color');
                    $dropdown.data('color', $(this).data('color'));

                    $dropdown.css({
                        'background-color': '#' + $(this).data('color'),
                        'color': foreground,
                        'border': 'solid 1px #3d3d3d'
                    });

                    color_code = $(this).data('color');

                    var app = ub.current_material.settings.applications[application.code];
                    
                    if( typeof app !== 'undefined') {

                        app.color_array[sprite.ubLayerNo] = {};
                        app.color_array[sprite.ubLayerNo].layer_name = sprite.ubName;
                        app.color_array[sprite.ubLayerNo].layer_no = sprite.ubLayerNo;
                        app.color_array[sprite.ubLayerNo].color_code = color_code;
                        sprite.tint = parseInt(color_code, 16);
                        color_drop.nonce = false;
                        
                    }
                    
                    color_drop.close();

                });

                var first_color = colors_obj[0];
                $(selector_str + "[data-color='" + first_color.hex_code + "']").click();

            });

            color_drop.open();
            color_drop.close();
            ub.refresh_thumbnails();

            /// End Color Drop

    } 


    function create_color_dropdown (settings) {

        /// Color Drop

            var color_drop_selector = 'div.color_drop[data-id="' + settings.application.id + '"]';
            var color_drop;

            color_content = "";

            var colors_obj = get_colors_obj(settings.application.layer);
            var color_drop_content = "";
            
            color_drop_content += "<div data-id='" + settings.application.id + "' class='row color-container' id='color-container-" + settings.application.id + "'>";
            color_drop_content += "</div>";
            color_drop_content += "<div class='row'>";
            color_drop_content +=      "<div col-md-12>";

            var color_els = ''; 

            _.each(colors_obj, function (color) {

                var foreground = 'white';

                if (color.hex_code === 'ffffff') { 
                    foreground = 'black';
                }

                color_els += '<a class="color-selector" style="color: ' + foreground + '; background-color: #' + color.hex_code + '" data-color="' + color.hex_code + '" data-target="color_drop_element" data-id="' + settings.application.id + '">' + color.name + '</a>';

            });

            color_drop_content += color_els;
            color_drop_content +=      "</div>";
            color_drop_content += "</div>";

            color_drop = new Drop({
                target: document.querySelector(color_drop_selector),
                content: color_drop_content,
                classes: 'drop-theme-arrows',
                position: 'bottom left',
                openOn: 'click'
            });

            color_drop.nonce = true;

            color_drop.once('open', function () {

                var selector_str = 'a.color-selector[data-target="color_drop_element"][data-id="' + settings.application.id + '"]';
                var $link_selector = $(selector_str);

                $link_selector.click( function (e) {

                    var $font_dropdown = $('div.font_style_drop[data-id="' + settings.application.id + '"]');
                    var $font_selectors = $('a.font-selector');
                    var font_selector_links = $('a.font-selector');

                    var $dropdown = $('div.color_drop[data-id="' + settings.application.id + '"]')

                    $dropdown.html($(this).html());

                    var foreground = '';
                   
                    if($(this).data('color') === "ffffff"){
                        foreground = '#000000';
                    } else {
                        foreground = '#ffffff';
                    }

                    $dropdown.data('color');
                    $dropdown.data('color', $(this).data('color'));

                    $dropdown.css({
                        'background-color': '#' + $(this).data('color'),
                        'color': foreground,
                        'border': 'solid 1px #3d3d3d'   
                    });

                    $font_dropdown.css('color', '#' + $(this).data('color'));
                    $font_selectors.css('color', '#' + $(this).data('color'));

                    color_code = $(this).data('color');

                    var app = ub.current_material.settings.applications[settings.application.code];

                    if (typeof app !== 'undefined') {

                        if (app.type !== 'logo') {

                            var sprite = _.last(app.text_obj.children);

                            sprite.tint = parseInt(color_code, 16);    

                            app.color_array[sprite.ubLayerNo] = {};
                            app.color_array[sprite.ubLayerNo].layer_name = sprite.ubName;
                            app.color_array[sprite.ubLayerNo].layer_no = _.first(app.text_obj.children).ubLayerNo;
                            app.color_array[sprite.ubLayerNo].color_code = color_code;
                            sprite.tint = parseInt(color_code, 16); 
                            color_drop.nonce = false;

                        }

                    }
                    
                    color_drop.close();
                    ub.refresh_thumbnails();
                    
                });

                var first_color = colors_obj[0];
                $(selector_str + "[data-color='" + first_color.hex_code + "']").click();

            });

            color_drop.open();
            color_drop.close();

            /// End Color Drop 

    } 

   function create_accent_dropdown (settings) {

        var selector = 'div.accent_drop[data-id="' + settings.application.id + '"]';
        var drop;

        var content = "";
        content += "<div data-id='" + settings.application.id + "' class='row accent-container' id='accent-container-" + settings.application.id + "'>";
        content += "</div>";
        content += "<div class='row'>";
        
        var default_accent = ub.data.accents.items[0];

        var els = ''; // '<div class="col-md-3"><a class="accent-selector" data-accent-id="' + default_accent.id + '" data-accent-name="' + default_accent.name + '" data-target="accent_drop_element" data-id="' + settings.application.id + '">' + '<img class="accent_element" src="/images/sidebar/' + default_accent.thumbnail + '">' + '</a></div>';

        _.each(ub.data.accents.items, function (item) {
            els += '<div class="col-md-3">';
            els += '<a class="accent-selector" data-accent-id="' + item.id + '" data-accent-name="' + item.name + '" data-target="accent_drop_element" data-id="' + settings.application.id + '">' + '<img class="accent_element" src="/images/sidebar/' + item.thumbnail + '">' + '</a><br />';
            els += '</div>';
        });

        content += els;
        
        content += "</div>";
        
        drop = new Drop({
            target: document.querySelector(selector),
            content: content,
            classes: 'drop-theme-arrows',
            position: 'bottom left',
            openOn: 'click'
        });

        ub.ui.drops[settings.application.id] = drop;

        // Font Style Event Handler 

        drop.once('open', function () {

            var selector_str = 'a.accent-selector[data-target="accent_drop_element"][data-id="' + settings.application.id + '"]';
            var $link_selector = $(selector_str);
            
            $link_selector.click( function (e) {

                var $dropdown = $('div.accent_drop[data-id="' + settings.application.id + '"]')
                
                $dropdown.html($(this).html());
                $dropdown.data('accent-id');
                $dropdown.data('accent-id', $(this).data('accent-id'));
                $dropdown.data('accent-name', $(this).data('accent-name'));

                var $textbox = $('input.applications.player_number[data-application-id="' + settings.application.id + '"]');
                $textbox.trigger('change');
                
                drop.close();

            });

            var default_accent = ub.data.accents.items[0];
            $(selector_str + "[data-accent-id='" + default_accent.id + "']").click();

        });

        drop.open();
        drop.close();

    } /// End Accent Drop Function   


    /// Create Pattern Dropdown




    /// End Create Pattern Dropdown

    function create_pattern_dropdown(settings) {

        var pattern_container = $('div.colors_container[data-id="' + settings.application.id + '"][data-option="patterns"]');
        var pattern_elements = '<div class="pattern_panel_container">';

        _.each(ub.data.patterns.items, function (pattern_obj) {

            var element = '<div class="pattern_element">';
            var filename = '/images/sidebar/' + pattern_obj.code + '.png';

            element = element + '<button class="btn change-text-pattern" data-application-id="' + settings.application.id + '" data-pattern="' + pattern_obj.code + '" style="background-image: url(' + filename + '); width: 100%; height: 100%; border: 1px solid #acacac; padding: 0px; background-size: cover;" data-layer="none" data-placement="bottom" title="' + pattern_obj.name + '" data-selection="none"></button>';
            element = element + '</div>';    

            pattern_elements = pattern_elements + element;

        });

        pattern_elements += "</div><div class='color_stops_container' data-option='patterns' data-id='" + settings.application.id + "'></div>";
        pattern_container.html(pattern_elements);

        $('button.change-text-pattern[data-application-id="' + settings.application.id + '"]').on('click', function (e) {

            var code = $(this).data('pattern');
            var pattern_obj = _.find(ub.data.patterns.items, {code: code});
            var id = settings.application.id;
            var $color_stops_container = $('div.color_stops_container[data-id="1"]')

            change_pattern(settings.application.id, pattern_obj, 'text', settings.application);

        });

    }

    function change_pattern(target, pattern_obj, text, application){

        target = String(target);
        var application_id = application.id;

        var text_sprite = ub.objects[application.perspective + '_view']['objects_' + application.code];

        var el = pattern_obj;
        var clone = {};
        var clone = _.clone(el);
        var cont = $('div.color_stops_container[data-id="' + application_id + '"][data-option="patterns"]')

        cont.html('');

        var elements = "";

        if (el.layers.length > 0) {
            elements = "<br />Layers<br /><br />";
        }

        _.each(el.layers, function (e, index) {

            var val = e.default_color;
            var col = e.default_color;
            var filename = e.filename;
            
            elements += ub.create_pattern_color_picker(index, val, col, application_id, el.code); 

        });

        elements += "<br />";
        elements += "Rotation: <span class='pattern_slider_label' data-target='pattern' data-layer='" + application_id + "' data-label='rotation' data-id='" + application_id + "'>100</span>%<br /><br />";
        elements += "<div id='rotation_pattern_slider_" + application_id + "' class='pattern_slider pattern_rotation_slider'></div>";

        elements += "<br />";
        elements += "Opacity: <span class='pattern_slider_label' data-target='pattern' data-layer='" + application_id + "' data-label='opacity' data-id='" + application_id + "'>100</span>%<br />";
        elements += "<div id='opacity_pattern_slider_" + application_id + "' class='pattern_slider'></div>";

        elements += "<br />";
        elements += "Scale: <span class='pattern_slider_label' data-target='pattern' data-layer='" + application_id + "' data-label='scale' data-id='" + application_id + "'>100</span>%<br />";
        elements += "<div id='scale_pattern_slider_" + application_id + "' class='pattern_slider'></div>";

        elements += "<br />";
        elements += "Position X: <span class='pattern_slider_label' data-target='pattern' data-layer='" + application_id + "' data-label='position_x' data-id='" + application_id + "'>100</span>%<br />";
        elements += "<div id='position_x_slider_" + application_id + "' class='pattern_slider'></div>";

        elements += "<br />";
        elements += "Position Y: <span class='pattern_slider_label' data-target='pattern' data-layer='" + application_id + "' data-label='position_y' data-id='" + application_id + "'>100</span>%<br />";
        elements += "<div id='position_y_slider_" + application_id + "' class='pattern_slider'></div>";

        elements += "<hr />";

        elements += "<div id='angle_pattern_slider_" + application_id + "' class='pattern_slider_angle'></div>";
        elements += "<hr />";

        elements += "<button style='width: 100%;' id='update-pattern-" + application_id + "' data-target='" + application_id + "' data-pattern='" + el.code + "'>Update Pattern</button>";

        cont.html(elements);

        $('input.pattern_' + target).ubColorPicker({
                target: String(target),
                type: 'text_pattern',
                application: application,
                target_name: application.layer,
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
                $('span[data-target="pattern"][data-label="position_x"][data-id="' + target + '"]').text(value);
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
                $('span[data-target="pattern"][data-label="position_y"][data-id="' + target + '"]').text(value);
                $("button#update-pattern-" + target).click();

            },

        });

        $("button#update-pattern-" + target).click('click', function (e) {

            var text_sprite = ub.objects[application.perspective + '_view']['objects_' + application.code];
            var main_text_obj = _.find(text_sprite.children, {ubName: 'Base Color'});  
            var uniform_type = ub.current_material.material.type;

            // Slider Values

            var val_rotation = parseInt($rotation_slider.find('span.edit').html());
            var val_opacity = $('#' + 'opacity_pattern_slider_' + target).limitslider('values')[0];
            var val_scale = $('#' + 'scale_pattern_slider_' + target).limitslider('values')[0];
            var val_x_position = $('#' + 'position_x_slider_' + target).limitslider('values')[0];
            var val_y_position = $('#' + 'position_y_slider_' + target).limitslider('values')[0];

            var target_name = target.replace('_', ' ');
            target_name = util.toTitleCase(target_name);

            var application_settings = ub.current_material.settings.applications[application.code]
            
            if(typeof application_settings.pattern === 'undefined') {

                application_settings.pattern = new PIXI.Container();

            }

            if(typeof text_sprite.pattern_layer === "object" ){

                text_sprite.pattern_layer.removeChildren();
                text_sprite.removeChild(text_sprite.pattern_layer);
                
            }

            var container = application_settings.pattern;
            var v = application.perspective;
            container.sprites = {};

            _.each(clone.layers, function (layer, index) {

                var s = $('[data-index="' + index + '"][data-target="' + target + '"]');
                container.sprites[index] = ub.pixi.new_sprite(layer.filename);

                var sprite = container.sprites[index];

                sprite.zIndex = layer.layer_number * -1;
                sprite.tint = parseInt(layer.default_color,16);
                sprite.anchor.set(0.5, 0.5);

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
            var mask = main_text_obj;

            if(typeof mask === 'undefined') {
                return;
            }

            container.mask = mask;

            container.rotation = val_rotation / 100;
            container.scale = new PIXI.Point(val_scale / 100, val_scale / 100);
            container.position = new PIXI.Point(val_x_position, val_y_position);

            var mask = main_text_obj;

            text_sprite.pattern_layer = container;
            container.mask = mask;
            container.zIndex = -11;

            ub.pl = container;

            text_sprite.addChild(text_sprite.pattern_layer);

            ub.updateLayersOrder(text_sprite);
            ub.refresh_thumbnails();

        });

        $("button#update-pattern-" + target).click();

    }
    
    ///  Create Gradient Dropdown

    function create_gradient_dropdown(settings) {

        var gradient_container = $('div.colors_container[data-id="' + settings.application.id + '"][data-option="gradients"]');
        var gradient_elements = '<div class="gradient_panel_container">';

        _.each(ub.data.gradients.items, function (gradient_obj) {

            var element = '<div class="gradient_element">';
            var filename = '/images/sidebar/' + gradient_obj.code + '.png';

            element = element + '<button class="btn change-gradient" data-application-id="' + settings.application.id + '" data-gradient="' + gradient_obj.code + '" style="background-image: url(' + filename + '); width: 100%; height: 100%; border: 1px solid #acacac; padding: 0px; background-size: cover;" data-layer="none" data-placement="bottom" title="' + gradient_obj.name + '" data-selection="none"></button>';
            element = element + '</div>';    

            gradient_elements = gradient_elements + element;

        });

        gradient_elements += "</div><div class='color_stops_container' data-option='gradients' data-id='" + settings.application.id + "'></div>";
        gradient_container.html(gradient_elements);

        $('button.change-gradient[data-application-id="' + settings.application.id + '"]').on('click', function (e) {

            var code = $(this).data('gradient');
            var gradient_obj = _.find(ub.data.gradients.items, {code: code});
            var id = settings.application.id;
            var $color_stops_container = $('div.color_stops_container[data-id="1"]')

            change_gradient(settings.application.id, gradient_obj, 'text', settings.application);

        });

    }

        /// UB Plugin Gradient Utilities 

        var change_gradient = function (target, gradient, panel, application) {

            var text_sprite = ub.objects[application.perspective + '_view']['objects_' + application.code];

            var el = gradient;
            var clone = {};
            var clone = _.clone(el);

            var cont = $('div.color_stops_container[data-id="' + target + '"][data-option="gradients"]')
            cont.html('');

            var elements = "";

            if (el.color_stops.length > 0) {
                elements = "<br />Color Stops<br /><br />";
            }

            _.each(el.color_stops, function (e, index) {

                var val = e.value;
                var col = e.color;
                
                elements += create_color_picker(index, val, col, target, el.code); 

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
                target: String(target),
                type: 'gradient',
                application: 'text',
                target_name: application.layer,
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

                    var s = $('[data-index="' + index + '"][data-target="' + target + '"]');
                    $("#gradient_slider_" + target).find('span:eq(' + index + ')').css('background',s.val());
                    e.color = s.val();
                    var temp = ($('#' + 'gradient_slider_' + target).limitslider("values")[index]);
                    temp = Math.floor(temp / 10);
                    temp = temp / 10;

                    e.value = temp;

                });

                clone.angle = parseInt($('#' + 'angle_gradient_slider_' + target).find('span.edit').html()); 
                generate_gradient(clone, target, text_sprite, application.perspective);

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

                    change_gradient(target, gradient, panel);

                });

                $('#delete_gradient_color_stop').on('click', function () {

                    if (clone.color_stops.length > 2) {

                        clone.color_stops.pop();

                        var spacing = 1 / (clone.color_stops.length - 1);
                        
                        _.each(clone.color_stops, function (color_stop, index) {
                            color_stop.value = index * spacing;
                        });

                        change_gradient(target, gradient, panel);
    
                    }
                   
                });

            }

            $("button#update-gradient-" + target + "").click();

        };

        var create_color_picker = function (index, value, color, target, gradient) {

            var element = "";
            element = "<div class='color_picker_container'><label class='color_stop_label'>" + (index + 1) + ".</label><input readonly='true' class='gradient_" + target + "' type='text' data-elid='gradient_" + target + "_" + index + "' data-index='" + index + "' data-target='" + target +"' data-value='" + value + "' data-gradient='" + gradient + "'  value='" + color + "'/></div>";

            return element;

        };

        var generate_gradient = function (gradient_obj, target, text_sprite, perspective) {

            var main_text_obj = _.find(text_sprite.children, {ubName: 'Base Color'});  
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

            if (typeof(ub.objects.pattern_view.gradient_layer) === "object") {
                ub.pattern_view.removeChild(ub.objects.pattern_view.gradient_layer);
            }

            ub.objects.pattern_view.gradient_layer = gradient_layer;
            ub.pattern_view.addChild(ub.objects.pattern_view.gradient_layer);
            ub.updateLayersOrder(ub.pattern_view);
            
            var v = perspective;
            var view = v + '_view';

            temp_pattern[v] = new PIXI.Sprite(texture);

            if(typeof text_sprite.gradient_layer === "object" ){

                text_sprite.removeChild(text_sprite.gradient_layer);

            }
            
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


        /// End UB Plugin Gradient Utilities



    /// End Create Gradient Dropdown

    /// Get Colors and Hex Codes For Given Material Option

    function get_colors_obj(layer) {

        var colors_obj = '';

        var material_option_obj = _.find(ub.current_material.materials_options, {name: window.util.toTitleCase(layer)});
        var material_colors = JSON.parse(material_option_obj.colors);

        var colors_obj = _.filter(ub.data.colors, function(color){
            
            var s = _.indexOf(material_colors, color.color_code);
            return s !== -1;

        });

        return colors_obj;

    }

    /// End Get Colors and Hex Codes For Given Material Option

}(jQuery));