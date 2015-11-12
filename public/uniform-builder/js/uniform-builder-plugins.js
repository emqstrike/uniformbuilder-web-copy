
(function ($) {

    $.fn.ubColorPicker = function(options) {

        var settings = $.extend({ target: 'target' }, options);

        return this.each(function() {

            var target_name = window.util.toTitleCase(settings.target);
            var obj_colors = _.find(ub.current_material.material.options, {name: target_name });

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

                element = element + '<button class="btn change-color" data-elid="' + btn_el_id + '" data-index="' + color_stop_index + '" data-panel="' + code + '" data-target="' + code + '" data-color="#' + color.hex_code + '" style="background-color: #' + color.hex_code + '; width: 35px; height: 35px; border-radius: 8px; border: 2px solid white; padding: 0px;" data-layer="none" data-placement="bottom" title="' + color.name + '" data-selection="none"></button>';
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

                var color  = $(this).data('color');
                $('input[data-elid="' + btn_el_id + '"]').val(color);
                $("button#update-gradient-" + settings.target).click();
                el_parent.find('span').css('background-color', color);

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

        return this.each(function () {

            var $container = $(this);
            var first_font = ub.data.fonts.items[0];
            var html_builder = '';

            html_builder += "<hr />";
            html_builder += "<div class='ub_label'>Sample Text</div><input type='text' class='applications player_number' data-application-id='" + application.id + "' value='23'><br /><br />";
            html_builder += "<div class='ub_label'>Font Style</div><div class='font_style_drop' style='font-family:" + first_font.name + ";' data-id='" + settings.application.id + "' data-font-id='" + first_font.id + "' data-font-name='" + first_font.name + "'>" + first_font.name + " <i class='fa fa-caret-down'></i></div>";
            html_builder += "<div class='ub_label'>Color</div><div class='color_drop' data-id='" + settings.application.id + "'>Choose a Color...<i class='fa fa-caret-down'></i></div>";
            html_builder += "<div class='ub_label'>Accent</div><div class='accent_drop' data-id='" + settings.application.id + "'>Choose an Accent...<i class='fa fa-caret-down'></i></div>";
            html_builder += "<div class='row'>";
            html_builder += "</div><div class='logo_sliders' data-id='" + application.id + "'>";
            html_builder += "Rotation: <div class='logo_slider rotation_slider' data-id='" + application.id + "'></div><br />";
            html_builder += "Opacity: <span data-target='logo' data-label='opacity' data-id='" + application.id + "'>100</span>% <div class='logo_slider opacity_slider' data-id='" + application.id + "'></div><br />";
            html_builder += "Scale: <span data-target='logo' data-label='scale' data-id='" + application.id + "'>100</span>% <div class='logo_slider scale_slider' data-id='" + application.id + "'></div><br />";
            html_builder += "X Position: <span></span> <div class='x_slider logo_slider' data-id='" + application.id + "'></div><br />";
            html_builder += "Y Position: <span></span> <div data-id='" + application.id + "' class='y_slider logo_slider'></div></div><br />";
            html_builder += "<hr />";

            $container.html(html_builder);
            create_font_dropdown(settings);
            create_color_dropdown(settings);
            create_accent_dropdown(settings);

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
                    var object = ub.objects.front_view['objects_0' + application.id];

                    object.rotation = value / 100;
                    var rotation = ( value / max_rotation ) * 360;

                    $angle_slider_logo = $('div.rotation_slider[data-id="' + application.id + '"]');

                }

            });

            var max_scale = 200;
            
            $('div.scale_slider[data-id="' + application.id + '"]').limitslider({

                values: [100],
                min: 0,
                max: max_scale,
                gap: 0,

                change: function(event, ui) {

                    var value = $(this).limitslider("values")[0];
                    var object = ub.objects.front_view['objects_0' + application.id];
                    var scale = new PIXI.Point(value / 100, value / 100);
                    
                    object.scale = scale;

                    $('span[data-target="logo"][data-label="scale"][data-id="' + application.id + '"]').text(value);

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
                    var object = ub.objects.front_view['objects_0' + application.id];
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
                    var object = ub.objects.front_view['objects_0' + application.id];
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
                    var object = ub.objects.front_view['objects_0' + application.id];
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
                var font_obj = _.find(ub.data.fonts.items, {id: selected_font_id});

                var selected_color = $('div.color_drop[data-id="' + application.id + '"]').data('color');

                if (typeof font_obj === 'undefined') {
                    return;
                }

                var text_input = $textbox.val();
                var sprite = create_text(text_input, font_obj.name, application);

                /// Set First Three Colors

                var colors_obj = get_colors_obj(application.layer);

                _.each(sprite.children, function (child, index) {

                    child.tint = '0x' + colors_obj[index + 1].hex_code;

                })

                _.last(sprite.children).tint = '0x' + selected_color;

                /// End Set First Three Colors 
                
                settings.applications[application.code] = {
                    application: application,
                    text: text_input,
                    text_obj: sprite
                };

                var view = ub[application.perspective + '_view'];
                var view_objects = ub.objects[application.perspective + '_view'];
                var mask = _.find(ub.current_material.material.options, {
                    perspective: application.perspective,
                    name: 'Body'
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

                    position = obj.position;
                    scale = obj.scale;
                    rotation = obj.rotation;
                    alpha = obj.alpha;
                    tint = obj.tint;

                    view.removeChild(view_objects['objects_' + application.code]);
                    delete view_objects['objects_' + application.code];

                }

                view_objects['objects_' + application.code] = sprite;
                view.addChild(sprite);

                ub.updateLayersOrder(view);

                sprite.position.x = x;
                sprite.position.y = y;

                if(sprite.width === 1) {

                    sprite.position.x -= (sprite.width / 2);
                    sprite.position.y -= (sprite.height / 2);

                }

               sprite.zIndex = -51;

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

                        sprite.x = sprite.oldX;
                        sprite.y = sprite.oldY;

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

                                    sprite.x = x;
                                    sprite.y = y;
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

        _.each(accent_obj.layers, function (layer){

            var text_layer = '';

            text_layers[layer.layer_no] = {};
            text_layer = text_layers[layer.layer_no];

            text_layer.no = layer.layer_no;
            text_layer.accent_obj = layer;

            var style = {font:"70px " + font_name, fill: "white"};

            if (layer.outline === 1){
                style.stroke = '#3d3d3d';
                style.strokeThickness = 7;
            }

            if (layer.outline === 2){
                style.stroke = '#acacac';
                style.strokeThickness = 10;

                if (typeof layer.type === 'string') {

                    style.stroke = '#ffffff';

                }


            }

            text_layer.text_sprite = new PIXI.Text(text_input, style);

            text_layer.text_sprite.zIndex = layer.zIndex;
            text_layer.text_sprite.x += text_layer.text_sprite.width * layer.increment_x;
            text_layer.text_sprite.y += text_layer.text_sprite.height * layer.increment_y;
            text_layer.text_sprite.anchor.set(0.5, 0.5);

            container.addChild(text_layer.text_sprite);

        });

        ub.updateLayersOrder(container);

        return container;
        //return new PIXI.Text(text_input, {font:"70px " + font_name, fill: "white"});

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

            _.each(ub.data.fonts.items, function (item) {
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

                    color_code =  $(this).data('color');

                    var app = ub.current_material.settings.applications[settings.application.code];
                    
                    if( typeof app !== 'undefined') {
                        _.last(app.text_obj.children).tint = parseInt(color_code, 16);    
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