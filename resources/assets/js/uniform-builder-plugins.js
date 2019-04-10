
(function ($) {

    /// Basic Format for Plugin Definition

    // $.fn.ubImageDialog = function(options) {
    //
    //     var settings = $.extend({ application: {} }, options);
    //
    //     return this.each(function () {
    //
    //         var $container = $(this);
    //         var html_builder = '';
    //
    //         html_builder += "<hr />";
    //         html_builder += "Image Dialog from Plugin";
    //         html_builder += "<hr />";
    //
    //         $container.html(html_builder);
    //
    //     });
    //
    // };

    /// End Basic Format for Plugin Definition

    $.fn.ubTeamColorPicker =  function (options) {

        var settings = $.extend({ target: 'target' }, options);

        return this.each(function() {

            var target_name     = window.util.toTitleCase(settings.target);
            var obj_colors      = '';

            if (typeof settings.target_name === 'string') {

                target_name  = settings.target_name;

            }
            else {

                target_name = settings.target.toTitleCase();

            }

            obj_colors = settings.colorSet;

            var el                  = $(this);
            var el_parent           = el.parent();
            var color               = el_parent.find('input').val();
            var color_stop_index    = el_parent.find('input').data('index');
            var btn_el_id           = settings.type + "_" + settings.target;
            var code                = target_name;
            var name                = target_name.toTitleCase();
            var header              = '';
            var str_builder         = header + '<div class="options_panel_section ubColorPicker" data-index="' + color_stop_index + '" data-type="' + settings.type + '" data-option="' + code + '" data-group="colors"><div class="color_panel_container color_panel_container_ub_picker">';
            var color_elements      = '';
            var color 
            var width               = '35px';
            var height              = '35px';
            var sublimatedClass     = '';

            if (ub.funcs.isSublimated()) {

                height = '25px';
                width = '38px';
                sublimatedClass = ('sublimated');

                $('div#right-main-window').css('height','530px');

            }

            el_parent.hide();

            _.each(obj_colors, function (color_obj) {

                var color = color_obj;
                var background_color = color.hex_code;

                if(color.name === 'White') {
                    background_color = 'ffffff';
                }

                var cl = '';
                if (color.color_code === 'W') {
                    cl = 'whitebtn';
                }

                if (typeof color === 'undefined') {

                    util.error('Color Not Found: ' + color_obj + ", Material Option: " + name);
                    return;

                }

                var element = '<div class="color_element ' + sublimatedClass + '">';

                element = element + '<button class=" grow btn change-color ' + cl + '" data-status="unselected" data-elid="' + btn_el_id + '" data-index="' + color_stop_index + '" data-panel="' + code + '" data-target="' + code + '" data-color="#' + color.hex_code + '" data-color-id="' + color.id + '" data-color-label="' + color.color_code + '" data-color-code="' + color.hex_code + '"  data-type="' +  settings.type + '" style="background-color: #' + background_color + '; width: ' + width + '; height: ' + height + '; border-radius: 0px; border-width: thin; padding: 0px;" data-layer="none" data-placement="bottom" title="' + color.name + '" data-selection="none"></button>';
                element = element + '<span class="label">' + ub.funcs.tennGuardTemp(color.name) + '</span>';
                element = element + '</div>';    
                color_elements = color_elements + element;

            });

            str_builder = str_builder + color_elements;
            str_builder = str_builder + '</div></div>';

            var btn_el = "<div id='" + btn_el_id + "' class='btn drop-target drop-theme-hubspot-popovers' title='Color Stop: " + color_stop_index + "' rel='popover' tabindex='0' data-placement='bottom' data-popover-content='#" + settings.type + "_" + settings.target + "' data-type='" + settings.type + "' data-target='" + settings.target + "'><span data-target='" + settings.target + "' data-index='" + color_stop_index + "' data-type='" + settings.type + "' style='background-color: " + color + "'></span></div>";
            var popup_picker = "<div id='" + settings.type + "_" + settings.target + "' class='popup_picker'>" + str_builder + "</div>";

            el_parent.addClass('ubColorPicker');

            el.data('target');
            el.data('target', settings.target);
            el.data('type');
            el.data('type', settings.type);
            el_parent.append(btn_el);
            el_parent.append(popup_picker);

            var colors_btn = util.dataSelector('.btn', { 'elid': btn_el_id });

            colors_btn.on('click', function () {

                var color        = $(this).data('color');
                var colorID      = $(this).data('color-id');
                var colorStatus  = $(this).data('status');
                var colorCode    = $(this).data('color-code');
                var colorLabel   = $(this).data('color-label');
                var _colorObj    = _.find(settings.colorSet, {color_code: colorLabel});

                if (colorStatus === 'unselected') {

                    if (ub.current_material.settings.team_colors.length + 1 >= 9) {
                        //ub.startModal('Maximum # of Team Colors is 8');
                        return;

                    }

                    var _index = ub.current_material.settings.team_colors.length + 1;

                    $(this).first().data('status','selected');
                    $(this).first().html('<i class="fa fa-check" aria-hidden="true"></i>');
                    $(this).first().html(_index);

                    if (colorLabel === 'W' || colorLabel === 'Y' || colorLabel === 'CR' || colorLabel === 'S' || colorLabel === 'PK'  || colorLabel === 'OP' || colorLabel === 'SG') {
                        $(this).first().css('color', '#3d3d3d');
                        $(this).first().css('text-shadow', '1px 1px #d7d7d7');
                    }

                    ub.funcs.addColorToTeamColors(_colorObj);

                } else {

                    var _index = ub.current_material.settings.team_colors.length;

                    $(this).first().data('status','unselected');
                    $(this).first().html('');
                    ub.funcs.removeColorFromTeamColors(_colorObj);
                    var text = undefined;

                    colors_btn.each( function() {
                        if ($(this).data('status') === 'selected') {
                            var _colorID = $(this).data('color-id');
                            var color_index = ub.funcs.getTeamColorIndexByColorID(_colorID);

                            if (typeof color_index !== "undefined") {
                                text = color_index + 1;
                                $(this).first().html(text);
                            } else {
                                console.warn("Cannot find color id " + _colorID + "  in team color");
                            }
                        }
                    });
                }

                return;
            });

            var preamble = 'div.options_panel_section.ubColorPicker';
            var panels = util.dataSelector(preamble, { 'option': target_name });
            var color_stop_btn = util.dataSelector('span', { 'target': settings.target, 'type': settings.type, 'index': color_stop_index });

            el_parent.show();

        });

    };

    $.fn.ubColorPickerBasic = function (options) {

        var settings = $.extend({ target: 'target' }, options);

        return this.each(function() {

            var target_name = window.util.toTitleCase(settings.target);
            var obj_colors = ''

            if (typeof settings.target_name === 'string') {

                target_name  = settings.target_name;

            }
            else {

                target_name = settings.target.toTitleCase();

            }

            obj_colors = _.find(ub.current_material.material.options, {name: target_name });

            var el = $(this);
            var el_parent = el.parent();
            var color = el_parent.find('input').val();
            var color_stop_index = el_parent.find('input').data('index');
            var btn_el_id = settings.type + "_" + settings.target + "_" + color_stop_index;
            var code = target_name;
            var name = target_name.toTitleCase();
            var header = '';
            var str_builder = header + '<div class="options_panel_section ubColorPicker" data-index="' + color_stop_index + '" data-type="' + settings.type + '" data-option="' + code + '" data-group="colors"><div class="color_panel_container color_panel_container_ub_picker">';
            var color_elements = '';

            el_parent.hide();

            _.each(JSON.parse(obj_colors.colors), function (color_obj) {

                var color = _.find( ub.data.colors, { color_code: color_obj});

                var background_color = color.hex_code;

                if(color.name === 'White') {
                    background_color = 'ffffff';
                }

                var cl = '';
                if (color.color_code === 'W') {
                    cl = 'whitebtn';
                }

                if (typeof color === 'undefined') {

                    util.error('Color Not Found: ' + color_obj + ", Material Option: " + name);
                    return;

                }

                var element = '<div class="color_element">';

                element = element + '<button class="btn change-color ' + cl + '" data-elid="' + btn_el_id + '" data-index="' + color_stop_index + '" data-panel="' + code + '" data-target="' + code + '" data-color="#' + color.hex_code + '" data-color-code="' + color.hex_code + '"  data-type="' +  settings.type + '" style="background-color: #' + background_color + '; width: 35px; height: 35px; border-radius: 4px; border: 1px solid #eeeeee; border-width: thin; padding: 0px;" data-layer="none" data-placement="bottom" title="' + color.name + '" data-selection="none">' + color.color_code + '</button>';
                element = element + '</div>';    
                color_elements = color_elements + element;

            });

            str_builder = str_builder + color_elements;
            str_builder = str_builder + '</div></div>';

            var btn_el = "<div id='" + btn_el_id + "' class='btn drop-target drop-theme-hubspot-popovers' title='Color Stop: " + color_stop_index + "' rel='popover' tabindex='0' data-placement='bottom' data-popover-content='#" + settings.type + "_" + settings.target + "' data-type='" + settings.type + "' data-target='" + settings.target + "'><span data-target='" + settings.target + "' data-index='" + color_stop_index + "' data-type='" + settings.type + "' style='background-color: " + color + "'></span></div>";
            var popup_picker = "<div id='" + settings.type + "_" + settings.target + "' class='popup_picker'>" + str_builder + "</div>";

            el_parent.addClass('ubColorPicker');

            el.data('target');
            el.data('target', settings.target);
            el.data('type');
            el.data('type', settings.type);
            el_parent.append(btn_el);
            el_parent.append(popup_picker);

            var colors_btn = util.dataSelector('.btn', { 'elid': btn_el_id });

            colors_btn.on('click', function() {

                var color = $(this).data('color');
                
                $('input#primary_text').val(color);
                el_parent.find('span').css('background-color', color);
                el_parent.find('span').html($(this).html());
                el_parent.find('span').css('font-size', '10px');
                el_parent.find('span').css('padding-top', '2px');
                el_parent.find('span').css('color', '#eeeeee');

                if($(this).html() === 'W'){
                    el_parent.find('span').css('background-color', "#ffffff");
                    el_parent.find('span').css('color', '#eeeeee');
                }

                if($(this).html() === 'CR'){
                    el_parent.find('span').css('color', '#000000');
                }

                if (settings.type === 'single') {

                    $('button.btn.change-color[data-target="' + settings.target + '"][data-color="' + color +'"]').click();
                    
                }

                if (settings.type === 'withMatch') {

                    $('button.btn.change-color[data-target="' + settings.target + '"][data-color="' + color +'"]').click();
                    $('button.btn.change-color[data-target="' + settings.matchingSide + '"][data-color="' + color +'"]').click();

                }

            });

            var preamble = 'div.options_panel_section.ubColorPicker';
            var panels = util.dataSelector(preamble, { 'option': target_name });
            var color_stop_btn = util.dataSelector('span', { 'target': settings.target, 'type': settings.type, 'index': color_stop_index });
            
            color_stop_btn.on("click", function() {
                
                var picker_panel = util.dataSelector(preamble, { 'type': settings.type, 'option': target_name, 'index': color_stop_index });

                if (picker_panel.css('display') === "none") {
                    panels.hide();
                    picker_panel.show();
                }
                else {
                    panels.hide();
                }

            });

            panels.hide();

            el_parent.fadeIn();

        });

    };


    $.fn.ubColorPicker = function (options) {

        var settings = $.extend({ target: 'target' }, options);

        return this.each(function() {

            var target_name = window.util.toTitleCase(settings.target);
            var obj_colors = ''

            if (typeof settings.target_name === 'string') {

                target_name  = settings.target_name;

            }
            else {

                target_name = settings.target.toTitleCase();

            }

            obj_colors = _.find(ub.current_material.material.options, {name: target_name });

            var el = $(this);
            var el_parent = el.parent();
            var color = el_parent.find('input').val();
            var color_stop_index = el_parent.find('input').data('index');
            var btn_el_id = settings.type + "_" + settings.target + "_" + color_stop_index;
            var code = target_name;
            var name = target_name.toTitleCase();
            var header = '';
            var str_builder = header + '<div class="options_panel_section ubColorPicker" data-index="' + color_stop_index + '" data-type="' + settings.type + '" data-option="' + code + '" data-group="colors"><div class="color_panel_container color_panel_container_ub_picker">';
            var color_elements = '';

            _.each(JSON.parse(obj_colors.colors), function(color_obj) {

                var color = _.find( ub.data.colors, { color_code: color_obj});

                var background_color = color.hex_code;

                if(color.name === 'White') {
                    background_color = 'ffffff';
                }

                var cl = '';
                if (color.color_code === 'W') {
                    cl = 'whitebtn';
                }

                if (typeof color === 'undefined') {

                    util.error('Color Not Found: ' + color_obj + ", Material Option: " + name);
                    return;

                }

                var element = '<div class="color_element">';

                element = element + '<button class="btn change-color ' + cl + '" data-elid="' + btn_el_id + '" data-index="' + color_stop_index + '" data-panel="' + code + '" data-target="' + code + '" data-color="#' + color.hex_code + '" data-color-code="' + color.hex_code + '"  data-type="' +  settings.type + '" style="background-color: #' + background_color + '; width: 35px; height: 35px; border-radius: 4px; border: 1px solid #eeeeee; border-width: thin; padding: 0px;" data-layer="none" data-placement="bottom" title="' + color.name + '" data-selection="none">' + color.color_code + '</button>';
                element = element + '</div>';    
                color_elements = color_elements + element;

            });

            str_builder = str_builder + color_elements;
            str_builder = str_builder + '</div></div>';

            var btn_el = "<div id='" + btn_el_id + "' class='btn drop-target drop-theme-hubspot-popovers' title='Color Stop: " + color_stop_index + "' rel='popover' tabindex='0' data-placement='bottom' data-popover-content='#" + settings.type + "_" + settings.target + "' data-type='" + settings.type + "' data-target='" + settings.target + "'><span data-target='" + settings.target + "' data-index='" + color_stop_index + "' data-type='" + settings.type + "' style='background-color: " + color + "'></span></div>";
            var popup_picker = "<div id='" + settings.type + "_" + settings.target + "' class='popup_picker'>" + str_builder + "</div>";

            el_parent.addClass('ubColorPicker');

            el.data('target');
            el.data('target', settings.target);
            el.data('type');
            el.data('type', settings.type);
            el_parent.append(btn_el);
            el_parent.append(popup_picker);

            var colors_btn = util.dataSelector('.btn', { 'elid': btn_el_id });

            colors_btn.on('click', function() {

                var color = $(this).data('color');
                
                $('input[data-elid="' + btn_el_id + '"]').val(color);
                el_parent.find('span').css('background-color', color);
                el_parent.find('span').html($(this).html());
                el_parent.find('span').css('font-size', '10px');
                el_parent.find('span').css('padding-top', '2px');
                el_parent.find('span').css('color', '#eeeeee');

                if($(this).html() === 'W'){
                    el_parent.find('span').css('background-color', "#ffffff");
                    el_parent.find('span').css('color', '#eeeeee');
                }

                if($(this).html() === 'CR'){
                    el_parent.find('span').css('color', '#000000');
                }

                if (settings.type === 'gradient') {

                    $("button#update-gradient-" + settings.target).click();

                }

                if (settings.type === 'pattern') {

                    var layer_no = $(this).data('index');
                    var target = $(this).data('panel');
                    var color = parseInt($(this).data('color-code'), 16);
                    var uniform_type = ub.current_material.material.type;

                    

                    var views = ['front', 'back', 'left', 'right'];
                    var c = ub.current_material.containers[uniform_type][target].pattern_containers;

                    _.each(views, function (v){
                        c[v].container.children[layer_no].tint = color;
                    });



                    ub.refresh_thumbnails();

                    var _material_option = target.toLowerCase().replace(' ', '_');

                    ub.save_pattern_color(_material_option, layer_no, color);

                }

                if (settings.type === 'text_pattern') {

                    var pattern = ub.current_material.containers[settings.application.id].pattern;
                    var layer_no = $(this).data('index');
                    var target = $(this).data('panel');
                    var color = parseInt($(this).data('color-code'), 16);

                    _.each(pattern, function(pat){

                        pat.children[layer_no].tint = color;

                    });
                    
                    ub.refresh_thumbnails();
                    ub.save_text_pattern_color(settings.application, layer_no, color);

                }
                
                if (settings.type === 'mascot') {

                    var uniform_type = ub.current_material.material.type;
                    var mascot_collection = ub.current_material.containers[uniform_type].application_containers[settings.application.id].object.sprite;
                    var layer_no = $(this).data('index');
                    var target = $(this).data('panel');
                    var color = parseInt($(this).data('color-code'), 16);

                    _.each(mascot_collection, function(mascot){

                        mascot.children[layer_no].tint = color;

                    })

                    ub.current_material.settings.applications[settings.application.id].mascot.layers[layer_no].color = color; 
                    ub.current_material.settings.applications[settings.application.id].mascot.layers[layer_no].default_color = color.toString(16);; 
                    ub.refresh_thumbnails();

                }

            });

            var preamble = 'div.options_panel_section.ubColorPicker';
            var panels = util.dataSelector(preamble, { 'option': target_name });
            var color_stop_btn = util.dataSelector('span', { 'target': settings.target, 'type': settings.type, 'index': color_stop_index });
            
            color_stop_btn.on("click", function() {
                
                var picker_panel = util.dataSelector(preamble, { 'type': settings.type, 'option': target_name, 'index': color_stop_index });

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

    // $.fn.ubLogoDialog = function (options) {

    //     ub.funcs.removeUIHandles();

    //     var settings = $.extend({ application: {} }, options);
    //     var application = settings.application;

    //     var view_str = application.perspective + '_view';
    //     $('a#view_' + application.perspective).click();

    //     return this.each(function () { 

    //         var $container = $(this);

    //         var data = {
    //             application_id: application.id,
    //         }

    //         var template = $('#logo-dropdown').html();
    //         var markup = Mustache.render(template, data);

    //         $container.html(markup);
            
    //         var selector = 'div.logo_drop[data-id="' + application.id + '"]';
    //         var upload_template = $('#logo-upload-dialog').html();
    //         var content = Mustache.render(upload_template, data);

    //         var drop = new Drop({
    //             target: document.querySelector(selector),
    //             content: content,
    //             classes: 'drop-theme-arrows',
    //             position: 'bottom left',
    //             openOn: 'click'
    //         });

    //         ub.ui.drops[application.id] = drop;

    //         var file_change_handler = function () {

    //             var $file_input = $(this);
    //             var data_id = application.id;
    //             var files = !!this.files ? this.files : [];

    //             if (!files.length || !window.FileReader) { return; }

    //             if (/^image/.test(files[0].type)) { 

    //                 var reader = new FileReader();
    //                 reader.readAsDataURL(files[0]);

    //                 reader.onloadend = function () {

    //                     var logos = ub.current_material.containers.files.logos;
    //                     var file = files[0];
    //                     var id = new Date().getTime();

    //                     var logo = {
    //                         id: id,
    //                         filename: file.name,
    //                         dataUrl: this.result
    //                     };

    //                     logos.push(logo)

    //                     var application_id = application.id;

    //                     ub.funcs.update_logo_list();
    //                     $('a.logo_picker[data-application-id="' + application_id + '"]').click();

    //                 }
    //             }

    //         };

    //         drop.once('open', function () {

    //             var $selector = $('#file-src-' + settings.application.id);
    //             $selector.on('change', file_change_handler);

    //             ub.data.panels = {};
    //             ub.data.panels['logo_panel'] = $selector;

    //             ub.funcs.update_logo_list();

    //         });

    //         drop.open();
            
    //     });

    // };

    $.fn.ubMascotDialog = function ( options ) {

        ub.funcs.removeUIHandles();

        var settings = $.extend({ application: {} }, options);
        var application = settings.application;
        var view_str = application.perspective + '_view';

        $('a#view_' + application.perspective).click();

        return this.each(function () {

            var $container = $(this);

            var data = {
                application_id: application.id,
            }

            var template = $('#mascot-dropdown').html();
            var markup = Mustache.render(template, data);

            $container.html(markup);
            
            var selector = 'div.mascot_drop[data-id="' + application.id + '"]';
            var upload_template = $('#mascot-upload-dialog').html();
            var content = Mustache.render(upload_template, data);

            var drop = new Drop({
                target: document.querySelector(selector),
                content: content,
                classes: 'drop-theme-arrows',
                position: 'bottom left',
                openOn: 'click'
            });

            ub.ui.drops[application.id] = drop;

            var file_change_handler = function () {

                var $file_input = $(this);
                var data_id = application.id;
                var files = !!this.files ? this.files : [];

                if (!files.length || !window.FileReader) { return; }

                if (/^image/.test(files[0].type)) { 

                    var reader = new FileReader();
                    reader.readAsDataURL(files[0]);

                    reader.onloadend = function () {

                        var mascots = ub.current_material.settings.files.mascots;
                        var file = files[0];
                        var id = new Date().getTime();

                        var mascot = {
                            id: id,
                            filename: file.name,
                            dataUrl: this.result,
                        };

                        mascots.push(mascot);

                        var application_id = application.id;

                        ub.funcs.update_mascot_list();
                        $('a.mascot_picker[data-application-id="' + application_id + '"]').click();

                    }
                }

            };

            drop.once('open', function () {

                var $selector = $('#file-src-' + settings.application.id);
                $selector.on('change', file_change_handler);

                ub.data.panels = {};
                ub.data.panels['mascot_panel'] = $selector;

                ub.funcs.update_mascot_list();

            });

            drop.open();

        });

    };

    $.fn.ubPlayerNameDialog = $.fn.ubTeamNameDialog = $.fn.ubPlayerNumberDialog = function(options) {

        ub.funcs.removeUIHandles();

        var settings = $.extend({ application: {} }, options);
        var application = settings.application;
        var view_str = application.perspective + '_view';

        $('a#view_' + application.perspective).click();

        return this.each(function () {

            var $container = $(this);
            var first_font = ub.data.fonts[0];
            var sample_text = '';
            var font_size = '';
            var plugin_type = $('select.application_type_dropdown[data-id=' + application.id + ']').val();

            if (plugin_type === 'player_name') {
                sample_text = 'Player Name';
                font_size = 25;
            }

            if (plugin_type === 'team_name') {
                sample_text = 'Team Name';
                font_size = 25;
            }

            if (plugin_type === 'player_number') {
                sample_text = '23';
                font_size = 100;
            }

            var applicationType = application.type;
            var sizes = $.ub.getApplicationSizes(applicationType);

            var data = {
                sample_text: sample_text,
                application_id: settings.application.id,
                first_font_name: first_font.name,
                first_font_id: first_font.id,
                sizes: sizes,
            }

            var text_ui_template = $('#text-ui').html();
            var markup = Mustache.render(text_ui_template, data);

            $container.html(markup);

            /// Color Container Handlers

            $('div.colors_container[data-id="' + application.id + '"]').not('[data-option="colors"]').hide();
            $('div.btn.ub[data-id="' + application.id + '"]').on('click', function (e) {

                $('div.btn.ub[data-id="' + application.id + '"]').removeClass('active');
                $(this).addClass('active');
                $('div.colors_container').hide();
                $('div.colors_container[data-option="' + $(this).data('option') + '"]').fadeIn();

            });

            /// End Color Container Handlers

            var position = '';
            var scale = '';
            var rotation = '';
            var alpha = '';
            var tint = '';
            var view_objects = ub.objects[settings.application.perspective + '_view'];
            var view = ub[settings.application.perspective + '_view'];

            create_font_dropdown(settings);
            create_color_dropdown(settings);
            create_accent_dropdown(settings);
            create_gradient_dropdown(settings);
            create_pattern_dropdown(settings);

            var max_font_size = 300;
            
            $('div.font_size_slider[data-id="' + application.id + '"]').limitslider({

                values: [font_size],
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

            var $radio_class = $('input[type=radio][name=text_sizes][data-id=' + application.id + ']');

            $radio_class.change(function() {
            
                var value = 0;
                var fontID = $('div.font_style_drop[data-id="' + application.id + '"]').data('font-id');

                if (typeof fontID !== 'number') {
                    
                    fontID = 1;

                }

                value = $.ub.getFontSize({
                    size: this.value,
                    type: 'Adult',
                    factory: 'BLB',
                    applicationType: applicationType,
                    fontID: fontID,
                });

                $('.font_size_slider[data-id=' + application.id + ']').limitslider('values', [value]);

            });

            $radio_class.trigger('change');
            
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

            /// Get Primary View

            var view = "";
            view = ub.funcs.getPrimaryView(application);
            var _position = view.application.center;

            $('div.y_slider[data-id="' + application.id + '"]').limitslider({

                values: [_position.y  * ub.dimensions.height],
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

                values: [_position.x * ub.dimensions.width],
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

                var x = ub.dimensions.width * _position.x;
                var y = ub.dimensions.height * _position.y;
                var settings = ub.current_material.settings;
                var selected_font_id = $('div.font_style_drop[data-id="' + application.id + '"]').data('font-id');
                var font_id = selected_font_id;

                if (ub.config.app_env !== "local") {
                    font_id = font_id.toString();
                }
                
                var font_obj = _.find(ub.data.fonts, {id: font_id });
                var selected_color = $('div.color_drop[data-id="' + application.id + '"]').data('color');

                if (typeof font_obj === 'undefined') {
                    return;
                }

                var color_array = '';

                if(typeof settings.applications[application.id] !== 'undefined') {
                    
                    color_array = settings.applications[application.id].color_array;

                }    

                var text_input = $textbox.val();
                var accent_id = $('div.accent_drop[data-id="' + application.id + '"]').data('accent-id');
                var accent_obj = _.find(ub.data.accents.items, {id: accent_id});
                var font_size = $('div.font_size_slider[data-id="' + application.id + '"]').limitslider("values")[0];

                settings.applications[application.id] = {
                    application: application,
                    accent_obj: accent_obj,
                    font_size: font_size, 
                    text: text_input,
                    type: 'player_number',
                    color_array: {},
                    object_type: 'text object',
                    appliation_type: plugin_type,
                    code: application.id,
                    font_obj: font_obj,
                    gradient_obj: undefined,
                    gradient_settings: undefined,
                    pattern_obj: undefined,
                    pattern_settings: undefined,
                    position: undefined,
                    rotation: undefined,
                    scale: undefined,
                };

                var input_object = {
                    text_input: text_input,
                    font_name: font_obj.name,
                    application: application,
                    settingsObject: settings,
                };

                var sprite_collection = ub.funcs.renderApplication($.ub.create_text, input_object, application.id);
                var uniform_type = ub.current_material.material.type;
                var app_containers = ub.current_material.containers[uniform_type].application_containers;

                app_containers[application.id] = {};
                app_containers[application.id].object = {

                    sprite: sprite_collection, 

                };

                if (color_array !== ''){
                    settings.applications[application.id].color_array = color_array;
                }

            });

            $textbox.trigger('change');

        });
    };

    $.ub = {};

    $.ub.create_piping = function (pipingObject, colorCount, perspective, pipingSettingsObject) {

        var sprite;
        var pipingObject = pipingObject;
        var settings = ub.current_material.settings;
        var view = ub[perspective + '_view'];
        var view_objects = ub.objects[perspective + '_view'];
        var container = new PIXI.Container();
        var elements = "";
        var _frontObject = _.find(pipingObject.perspectives, {perspective: perspective});

        _.each(_frontObject.layers, function (layer, index) {
            
            if (index + 1 > colorCount) { return; }

            var _layerSettings = _.find(pipingSettingsObject.layers, {layer: layer.position});
            var pipingLayer = ub.pixi.new_sprite(layer.filename);

            pipingLayer.ubName = 'Layer ' + (index + 1);
            pipingLayer.tint = parseInt(_layerSettings.colorObj.hex_code, 16);

            if (typeof _layerSettings === "undefined" || _layerSettings.colorCode === "none") {

                pipingLayer.alpha = 0;

            } else {

                pipingLayer.alpha = 1;                
                
            }

            container.addChild(pipingLayer); 
            pipingLayer.zIndex = layer.position; 

        });

        sprite = container;

        ub.updateLayersOrder(sprite);

        var _pipingLengthBefore = _.filter(ub.current_material.settings.pipings, {enabled: 1}).length;

        ub.current_material.containers[pipingObject.name] = {};
        ub.current_material.containers[pipingObject.name].pipingObject = sprite;

        var temp                    = {};
        var layer_order             = ( ub.funcs.generateZindex('pipings') + _pipingLengthBefore + 1);

        sprite.originalZIndex       = layer_order * (-1);
        sprite.zIndex               = layer_order * (-1);

        return sprite;

    };

    $.ub.create_randomFeed = function (randomFeedObject, colorCount, perspective, randomFeedSettingsObject) {

        var sprite;
        var randomFeedObject = randomFeedObject;
        var settings = ub.current_material.settings;
        var view = ub[perspective + '_view'];
        var view_objects = ub.objects[perspective + '_view'];
        var container = new PIXI.Container();
        var elements = "";
        var _frontObject = _.find(randomFeedObject.perspectives, {perspective: perspective});

        _.each(_frontObject.layers, function (layer, index) {
            
            if (index + 1 > colorCount) { return; }

            var _layerSettings = _.find(randomFeedSettingsObject.layers, {layer: layer.position});
            var randomFeedLayer = ub.pixi.new_sprite(layer.filename);

            randomFeedLayer.ubName = 'Layer ' + (index + 1);
            randomFeedLayer.tint = parseInt(_layerSettings.colorObj.hex_code, 16);

            if (typeof _layerSettings === "undefined" || _layerSettings.colorCode === "none") {

                randomFeedLayer.alpha = 0;

            } else {

                randomFeedLayer.alpha = 1;                
                
            }

            container.addChild(randomFeedLayer); 
            randomFeedLayer.zIndex = layer.position; 

        });

        sprite = container;

        ub.updateLayersOrder(sprite);

        var _randomFeedLengthBefore = _.filter(ub.current_material.settings.randomFeeds, {enabled: 1}).length;

        ub.current_material.containers[randomFeedObject.name] = {};
        ub.current_material.containers[randomFeedObject.name].pipingObject = sprite;

        var temp                    = {};
        var layer_order             = ( ub.funcs.generateZindex('randomFeeds') + _randomFeedLengthBefore + 1 );

        sprite.originalZIndex       = layer_order * (-1);
        sprite.zIndex               = layer_order * (-1);

        return sprite;

    };


    $.ub.create_mascot = function (input_object) {

        var sprite;
        var application = input_object.application;
        var mascot = input_object.mascot;
        var settings = ub.current_material.settings;
        var application_mascot_code = application.id + '_' + mascot.id;
        var scale_settings = undefined;
        var scale_settings = {x: 0.15, y: 0.15};

        var settings_obj = settings.applications[application.id];
        var mascot_obj = mascot;
        var view = ub[application.perspective + '_view'];
        var view_objects = ub.objects[application.perspective + '_view'];
        var container = new PIXI.Container();
        var elements = "";

        var _uniformCategory = ub.current_material.material.uniform_category;

        /// Wrestling
        // if (settings_obj.size === 12)  { scale_settings = {x: 0.9, y: 0.9}; }
        // if (settings_obj.size === 10)  { scale_settings = {x: 0.83, y: 0.83}; }
        // if (settings_obj.size === 8)   { scale_settings = {x: 0.79, y: 0.79}; }
        // if (settings_obj.size === 5)   { scale_settings = {x: 0.42, y: 0.42}; }

        if (settings_obj.size === 12)  { scale_settings = {x: 0.87, y: 0.87}; }
        if (settings_obj.size === 10)  { scale_settings = {x: 0.74, y: 0.74}; }
        if (settings_obj.size === 8)   { scale_settings = {x: 0.63, y: 0.63}; }
        if (settings_obj.size === 5)   { scale_settings = {x: 0.42, y: 0.42}; }

        /// End Wrestling

        if (settings_obj.size === 4)   { scale_settings = {x: 0.24, y: 0.24}; }
        if (settings_obj.size === 3)   { scale_settings = {x: 0.19, y: 0.19}; }
        if (settings_obj.size === 2)   { scale_settings = {x: 0.14, y: 0.14}; }
        if (settings_obj.size === 1)   { scale_settings = {x: 0.08, y: 0.08}; }
        if (settings_obj.size === 0.5) { scale_settings = {x: 0.04, y: 0.04}; }

       
// //     else if (ub.funcs.isCurrentSport('Lacrosse') && ub.funcs.isCurrentType('lower')) 
// //            ((ub.funcs.isCurrentSport('Baseball') || 
// //            ub.funcs.isCurrentSport('Soccer') || 
// //            ub.funcs.isCurrentSport('Fastpitch') || 
// //            ub.funcs.isCurrentSport('Wrestling') || 
// //            ub.funcs.isCurrentSport('Volleyball') || 
// //            ub.funcs.isCurrentSport('2017 Team Short with Pockets (Apparel)') || 
// //            ub.funcs.isCurrentSport('Signature Coaches Short (Apparel)') || 
// //            ub.funcs.isCurrentSport('Basketball') || 
//            {

//             var _scaleSettings = ub.data.mascotSizesPant.getSize(_uniformCategory, settings_obj.size, ub.current_material.material.neck_option); // Refactor this

//             if (typeof _scaleSettings === "undefined") {
//                 console.warn('Scale Settings Not Found.');
//             } else {
//                 scale_settings = _scaleSettings.scale;
//         } 
        // else if (ub.funcs.isCurrentSport("Crew Socks (Apparel)")) { 

        //     _scaleSettings = ub.data.mascotSizes.getSize(_uniformCategory, settings_obj.size);
        //     scale_settings = _scaleSettings.scale;

        // }

        if (ub.styleValues.mascotScales.hasValues()) {

            var _result = ub.styleValues.mascotScales.getScale(settings_obj.size);

            if(typeof _result === "undefined") {

                // Use Defaults if theres no record 
                if (!ub.funcs.isCurrentSport('Football') && !ub.funcs.isCurrentSport('Wrestling') && ub.funcs.isCurrentType('upper')) {

                    var _scaleSettings = ub.data.mascotSizes.getSize(_uniformCategory, settings_obj.size);

                    ub.utilities.info('Scale Settings Not Found for ' +  ub.config.sport + ' / ' + ub.config.blockPattern + ' / ' +  ub.config.neckOption + ' ' + settings_obj.size + '. Using default.');    
                    scale_settings = _scaleSettings.scale;

                } 

            }

            scale_settings = _result;

        }

        _.each(mascot.layers_properties, function(layer, index) {

            var mascot_layer = ub.pixi.new_sprite(layer.filename);

            mascot_layer.tint = parseInt(layer.default_color,16);
            mascot_obj.layers_properties[index].color = mascot_layer.tint; 
            mascot_layer.anchor.set(0.5, 0.5);
            container.addChild(mascot_layer);

            var val = layer.default_color;
            var col = layer.default_color;
            var filename = layer.filename;

            if (typeof settings_obj.alpha === "number") {
                mascot_layer.alpha = settings_obj.alpha;
            }

        });
        
        container.scale = new PIXI.Point(0.15, 0.15);
        
        sprite = container;

        ub.current_material.containers[application.id] = {};
        ub.current_material.containers[application.id].mascot = sprite;

        var temp                    = {}
        var layer_order             = ( 50 + application.layer_order );

        sprite.originalZIndex       = layer_order * (-1);
        sprite.zIndex               = layer_order * (-1);
        settings_obj.layer_order    = layer_order;
        sprite.scale                = scale_settings;

        /// Set Colors

            var children = container.children;

            if(typeof settings.applications[application.id] !== 'undefined') { color_array = settings.applications[application.id].color_array; }    

            children.reverse();

            _.each(children, function (child, index) {

                if(color_array !== ''){

                    var array = ub.current_material.settings.applications[application.id].color_array;
                    var color_array_size = _.size(array);
                    var code = ub.current_material.settings.applications[application.id].color_array[index];

                    if (typeof code !== 'undefined') { 
                        child.tint = parseInt(code.hex_code, 16); 

                        ///
                        var _hexCode = (child.tint).toString(16);
                        var _paddedHex = util.padHex(_hexCode, 6);
                        if (typeof ub.data.colorsUsed[_paddedHex] === 'undefined') {
                            ub.data.colorsUsed[_paddedHex] = {hexCode: _paddedHex, parsedValue: util.decimalToHex(child.tint, 6), teamColorID: ub.funcs.getMaxTeamColorID() + 1};    
                        }
                        
                        ///

                    }

                }

            });
     
        /// End Set Colors

        return sprite;

    };

    /// Create Embelishment

        $.ub.create_embellishment = function (input_object) {
            
            var sprite;
            var application = input_object.application;
            var embellishment = input_object.embellishment;
            var settings = ub.current_material.settings;
            var application_embellishment_code = application.id + '_' + embellishment.id;
            var scale_settings = undefined;
            var scale_settings = {x: 0.15, y: 0.15};

            var settings_obj = settings.applications[application.id];
            var embellishment_obj = embellishment;
            var view = ub[application.perspective + '_view'];
            var view_objects = ub.objects[application.perspective + '_view'];
            var container = new PIXI.Container();
            var elements = "";

            // add embellishment custom scale in ub.styleValues.embellishmentScales
            if (settings_obj.application_type === 'embellishments') { ub.funcs.addAppCustomScaleOnEmbellishmentScalesArray(settings_obj, application.id); }

            var _uniformCategory = ub.current_material.material.uniform_category;

            /// Wrestling
            
            if (settings_obj.size === 12)  { scale_settings = {x: 0.87, y: 0.87}; }
            if (settings_obj.size === 10)  { scale_settings = {x: 0.74, y: 0.74}; }
            if (settings_obj.size === 8)   { scale_settings = {x: 0.63, y: 0.63}; }
            if (settings_obj.size === 5)   { scale_settings = {x: 0.42, y: 0.42}; }

            /// End Wrestling

            if (settings_obj.size === 4)   { scale_settings = {x: 0.24, y: 0.24}; }
            if (settings_obj.size === 3)   { scale_settings = {x: 0.19, y: 0.19}; }
            if (settings_obj.size === 2)   { scale_settings = {x: 0.14, y: 0.14}; }
            if (settings_obj.size === 1)   { scale_settings = {x: 0.08, y: 0.08}; }
            if (settings_obj.size === 0.5) { scale_settings = {x: 0.04, y: 0.04}; }

            if (ub.styleValues.embellishmentScales.hasValues()) {

                var _result;

                if (typeof ub.config.savedDesignInfo !== "object") { // Process Custom Scale Field only if this is not a saved design, because that one already have an override scale
                    _result = ub.funcs.processScale(settings_obj);
                } else {
                    _result = ub.styleValues.embellishmentScales.getScale(settings_obj.size);
                }
                
                if(typeof _result === "undefined") {

                    // Use Defaults if theres no record 
                    if (!ub.funcs.isCurrentSport('Football') && !ub.funcs.isCurrentSport('Wrestling') && ub.funcs.isCurrentType('upper')) {

                        // var _scaleSettings = ub.data.embellishmentSizes.getSize(_uniformCategory, settings_obj.size);

                        ub.utilities.info('Scale Settings Not Found for ' +  ub.config.sport + ' / ' + ub.config.blockPattern + ' / ' +  ub.config.neckOption + ' ' + settings_obj.size + '. Using default.');    
                        // scale_settings = _scaleSettings.scale;

                    } 

                }

                scale_settings = _result;

            } else {

                // console.log('Here at Scale Settings 1 x 1 ... ');
                scale_settings = {x: 1, y: 1};

            }

            // _.each(embellishment.layers_properties, function(layer, index) {

            //     var embellishment_layer = ub.pixi.new_sprite(layer.filename);

            //     embellishment_layer.tint = parseInt(layer.default_color,16);
            //     embellishment_obj.layers_properties[index].color = embellishment_layer.tint; 
            //     embellishment_layer.anchor.set(0.5, 0.5);
            //     container.addChild(embellishment_layer);

            //     var val = layer.default_color;
            //     var col = layer.default_color;
            //     var filename = layer.filename;

            // });


            /// Add Embellishement Sprite as a new Application Layer 

                var embellishment_layer = ub.pixi.new_sprite(embellishment_obj.png_filename);

                //embellishment_layer.tint = parseInt('ffffff',16);
                //embellishment_obj.layers_properties[index].color = embellishment_layer.tint; 
                embellishment_layer.anchor.set(0.5, 0.5);
                container.addChild(embellishment_layer);

                if (typeof settings_obj.alpha === "number") {
                    embellishment_layer.alpha = settings_obj.alpha;
                }

                // var val = layer.default_color;
                // var col = layer.default_color;
                // var filename = layer.filename;

            /// End Add Embelishment Sprite as a new Application Layer 
            
            container.scale = new PIXI.Point(1, 1);
            
            sprite = container;

            ub.current_material.containers[application.id] = {};
            ub.current_material.containers[application.id].embellishment = sprite;

            var temp                    = {}
            var layer_order             = ( 50 + application.layer_order );

            sprite.originalZIndex       = layer_order * (-1);
            sprite.zIndex               = layer_order * (-1);
            settings_obj.layer_order    = layer_order;
            sprite.scale                = scale_settings;

            /// Set Colors

                // var children = container.children;

                // if(typeof settings.applications[application.id] !== 'undefined') { color_array = settings.applications[application.id].color_array; }    

                // children.reverse();

                // _.each(children, function (child, index) {

                //     if(color_array !== ''){

                //         var array = ub.current_material.settings.applications[application.id].color_array;
                //         var color_array_size = _.size(array);
                //         var code = ub.current_material.settings.applications[application.id].color_array[index];

                //         if (typeof code !== 'undefined') { 
                //             child.tint = parseInt(code.hex_code, 16); 

                //             ///
                //             var _hexCode = (child.tint).toString(16);
                //             var _paddedHex = util.padHex(_hexCode, 6);
                //             if (typeof ub.data.colorsUsed[_paddedHex] === 'undefined') {
                //                 ub.data.colorsUsed[_paddedHex] = {hexCode: _paddedHex, parsedValue: util.decimalToHex(child.tint, 6), teamColorID: ub.funcs.getMaxTeamColorID() + 1};    
                //             }
                            
                //             ///

                //         }

                //     }

                // });
         
            /// End Set Colors

            return sprite;

        };

    // End Create Embellishment



    function vertical_text (text) {

        var _output = "";

        for (var i = 0, len = text.length; i < len; i++) {
            _output += text[i] + "\n";
        }

        return _output;

    }

    $.ub.create_text = function (input_object) {

        var _strokeInner = 11;
        var _strokeOuter = 14;

        if (input_object.fontSize < 5) {
            _strokeInner = 7;
            _strokeOuter = 14;
        }

        ub.funcs.removeUIHandles();

        if (typeof input_object.fontSize === "undefined") {

            if (input_object.application.id !== '2' || input_object.application.id !== '5') {

                input_object.fontSize = "4";

            } else {

                input_object.fontSize = "10";

            }

        }

        if (typeof input_object.text_input === "undefined") {

            input_object.text_input = window.ub.funcs.getPlayerNumber();

        }

        if (typeof input_object.text_input === "number") {

            input_object.text_input = toString(input_object.text_input);

        }
    
        var font_name = input_object.font_name;
        var application = input_object.application;
        var settings = input_object.settingsObject;
        var accent_obj = input_object.accentObj;
        var overrideSize =  input_object.overrideSize;
        var verticalText = input_object.applicationObj.verticalText;
        var text_input = '';
        var id = input_object.application.id;
        var fontObject = ub.funcs.getFontByName(font_name); // TODO: use js casing for the vars here...
        var isScriptFont = false;

        if (typeof fontObject === "undefined") { ub.utilities.error('Font ' + font_name + ' not found'); }

        isScriptFont = fontObject.script === "1";
        
        if (verticalText === 1) {

            text_input = vertical_text(input_object.text_input.toUpperCase());

        } else {

            if (!ub.funcs.isCurrentSport('Football')) {

                text_input = input_object.text_input;

            } else {

                text_input = input_object.text_input.toUpperCase();
                
            }

        }
        
        // TODO: Create text values must all come from the settings object no values must be read from the controls 

        var text_layers = {};
        var container = new PIXI.Container();
        var accent_id;
        var accent_obj;

        if(input_object.typeofWindowTemp === 'object') {

            accent_id = input_object.accentObj.id;
            accent_obj = input_object.accentObj;

        } else {

            accent_id = $('div.accent_drop[data-id="' + application.id + '"]').data('accent-id');
            accent_obj = _.find(ub.data.accents.items, {id: accent_id});

        }

        var $other_color_container = $('div.other_color_container[data-id="' + application.id + '"]');
        $other_color_container.html('');    

        /// Create Text Accents

        var _angle = "straight";
        _.each(accent_obj.layers, function (layer, index) {

            var text_layer = '';

            text_layers[layer.layer_no] = {};
            text_layer = text_layers[layer.layer_no];

            text_layer.no = layer.layer_no;
            text_layer.accent_obj = layer;

            if(typeof input_object.fontObj === 'object') {

                accent_id = input_object.applicationObj.accent_obj.id;
                accent_obj = input_object.applicationObj.accent_obj;

            }

            var font_size = $('div.font_size_slider[data-id="' + application.id + '"]').limitslider("values")[0];

            if(typeof input_object.fontSize === 'number') { font_size = input_object.fontSize; }

            ///

            var _fontSizeData           = ub.data.getPixelFontSize(input_object.applicationObj.font_obj.id, input_object.fontSize, input_object.perspective, application);
            
            container.ubFontSizeData    = _fontSizeData;

            // OverridSize var used by GA Font Tool
            
                if (typeof overrideSize !== 'undefined') { _fontSizeData.pixelFontSize = overrideSize; }
                font_size =  _fontSizeData.pixelFontSize;

            ///

            if (font_size === "0") {
    
                font_size = 100;
                ub.utilities.error('No Output Size detected for ' + input_object.fontSize + ' / ' + input_object.applicationObj.font_obj.name + ' / ' + input_object.perspective + ' using 100');

            }

            
            var style = "";
            var lineHeight = font_size;
            var _padding = 40;

            if (verticalText === 1) {

                if (layer.name === "Base Color" || layer.name === "Mask") {

                    lineHeight -= lineHeight * 0.005;

                }
                
                style = {font: font_size + "px " + font_name, fill: "white", padding: 0, lineJoin: 'miter', miterLimit: 2, lineHeight: lineHeight, align: 'center'};

            } else {

                style = {font: font_size + "px " + font_name, fill: "white", padding: 150, lineJoin: 'miter', miterLimit: 2};

                if (ub.funcs.isCurrentSport('Baseball') || ub.funcs.isCurrentSport('Fastpitch')) {

                    // Additional vertical padding so that tailsweeps wont be clipped
                    _padding = 150;

                }
                
                style = {font: font_size + "px " + font_name, fill: "white", padding: _padding, lineJoin: 'miter', miterLimit: 2};

            }

            if (layer.outline === 1) {

                style.stroke = '#ffffff';
                style.strokeThickness = _strokeInner;

            }

            if (layer.outline === 2) {

                style.stroke = '#ffffff';
                style.strokeThickness = _strokeOuter;

                if (typeof layer.type === 'string') {
                    style.stroke = '#ffffff';
                }

            }

            if (layer.type === 'middle_stroke' && layer.outline === 1) {

                style.stroke = '#ffffff';
                style.strokeThickness = _strokeInner;

            }

            if (layer.type === 'outer_stroke' && layer.outline === 2) {

                style.stroke = '#ffffff';
                
                if(input_object.fontSize > 5) {
                    style.strokeThickness = _strokeOuter + 14;
                }

            }

            if (layer.type === 'outer_stroke' && layer.outline === 1) {
                style.stroke = '#ffffff';
                style.strokeThickness = _strokeInner;
            }

            if (layer.type === 'shadow' && layer.outline > 0) {

                style.fill = '#ffffff';
                style.stroke = '#ffffff';

            }

            var _appendage;
            
            if (typeof input_object.applicationObj.tailsweep !== "undefined") {

                _appendage = ub.data.tailsweepCharacters.getCharacter(input_object.applicationObj.tailsweep.code, input_object.applicationObj.tailsweep.length);
                _angle = input_object.applicationObj.tailsweep.angle;

            }

            if (typeof _appendage === "undefined") {

                _appendage = "";
                _angle = "straight";

            }

            // Angle Override 
            _angle = input_object.applicationObj.angle;
            // End Angle Override

            if (verticalText === 1) {
                text_layer.text_sprite = new PIXI.Text(text_input, style);
            } else {

                text_layer.text_sprite = new PIXI.Text("        " + text_input + _appendage + "        ", style);


                if (typeof input_object.applicationObj.tailsweep !== "undefined") {

                    text_layer.text_sprite = new PIXI.Text("        " + text_input + _appendage + "        ", style);

                } else {

                    text_layer.text_sprite = new PIXI.Text(" " + text_input + _appendage + " ", style);

                }
                

            }

            /// Custom Properties

            text_layer.text_sprite.ubName = layer.name;
            text_layer.text_sprite.ubDefaultColor = layer.default_color;
            text_layer.text_sprite.ubLayerNo = layer.layer_no;

            var dummy = new PIXI.Text("A", style) // To get the glyph width and height 

            text_layer.text_sprite.zIndex = layer.zIndex;
            text_layer.text_sprite.x += dummy.width * layer.increment_x;
            text_layer.text_sprite.y += dummy.height * layer.increment_y;
            
            if (verticalText !== 1) {
                
                text_layer.text_sprite.anchor.set(0.5, 0.5);

            }
            else {

                text_layer.text_sprite.anchor.set(0.5, 0);   

            }

            container.addChild(text_layer.text_sprite);

            if (layer.name !== 'Base Color' && layer.name !== 'Mask') {

                if(input_object.typeofWindowTemp !== 'object') {

                    $other_color_container.append('<div><div class="ub_label">' + layer.name + '</div><div class="other_color_dropdown" data-id="' + application.id + '" data-layer-name="' + layer.name + '" data-layer-no="' + layer.layer_no + '">0</div></div>');
                    var selector = 'div.other_color_dropdown[data-id="' + application.id + '"][data-layer-no="' + layer.layer_no + '"]';
                    create_color_dropdown_other_container (application, text_layer.text_sprite, selector, layer.layer_no); 
                
                }

            }

            if (layer.name === 'Mask') {
                text_layer.text_sprite.alpha = 1;                
            }

           

        }); /// End Text Accents

        // Mask the main text to remove outline showing bug
        var text_mask = _.find(container.children, {ubName: 'Mask'});
        var main_text = _.find(container.children, {ubName: 'Base Color'});

        main_text.mask = text_mask;
        ub.updateLayersOrder(container);

        // Set Initial Colors 

        var length = container.children.length;
        var children = _.clone(container.children);
        var colors_obj = get_colors_obj(application.layer);
        var color_array = [];

        // if(typeof settings.applications[application.id] !== 'undefined') {                    
        //     color_array = settings.applications[application.id].color_array;

        //     console.error('Using this')
        // }    

        children.reverse();

        // Prepare this fix after actualy range of uniforms affected is determined
        // console.log(ub.current_material.settings.applications[application.id].colorArrayText);
        // console.log(ub.current_material.settings.applications[application.id].color_array);
        // // Color Error Discrepancies
        // if (typeof ub.config.savedDesignInfo === "object") {
        //     if(_.contains(ub.data.transferColors,ub.config.savedDesignInfo.savedDesignID)){
        //        ub.utilities.warn(ub.config.savedDesignInfo.savedDesignID + ', Fixing Colors');
        //        ub.current_material.settings.applications[application.id].color_array = ub.colorUtilities.colorCodesToColorObjArray(ub.current_material.settings.applications[application.id].colorArrayText);
        //     }
        // }
 
        _.each(children, function (child, index) {

            child.tint = parseInt(child.ubDefaultColor, 16);

            if(color_array !== ''){

                var array = ub.current_material.settings.applications[application.id].color_array;
                var color_array_size = _.size(array);
                var code = ub.current_material.settings.applications[application.id].color_array[index];

                if (typeof code !== 'undefined') {
                    child.tint = parseInt(code.hex_code, 16);
                    child.oldTint = child.tint;

                    ///
                    var _hexCode = (child.tint).toString(16);
                    var _paddedHex = util.padHex(_hexCode, 6);
                    
                    if (typeof ub.data.colorsUsed[_paddedHex] === 'undefined') {
                        ub.data.colorsUsed[_paddedHex] = {hexCode: _paddedHex, parsedValue: util.decimalToHex(child.tint, 6), teamColorID: ub.funcs.getMaxTeamColorID() + 1 };
                    }
                    ///

                }

                if (child.ubName === "Pseudo Shadow") { 

                    child.alpha = 0;                
                    child.tint = parseInt('000000', 16); 
                    //if(input_object.fontSize > 5) { child.alpha = 0; }

                }

            }

        });
 
        /// End Set First Three Colors 

        // container.zIndex = -(ub.funcs.generateZindex('applications') + parseInt(input_object.application.id));
        
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

            var els = ''; 

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
                   
                    if ($(this).data('color') === "ffffff"){
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

                    var app = ub.current_material.settings.applications[application.id];
                    
                    if ( typeof app !== 'undefined') {

                        var uniform_type = ub.current_material.material.type;
                        var app_containers = ub.current_material.containers[uniform_type].application_containers;

                        s = app_containers[application.id].object.sprite;
                        mvChangeTextColor(application.id, s, color_code, sprite.ubLayerNo);
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

                    var app = ub.current_material.settings.applications[settings.application.id];

                    if (typeof app !== 'undefined') {

                        if (app.type === 'player_number' || app.type === 'player_name' || app.type === 'team_name') {

                            var uniform_type = ub.current_material.material.type;
                            var app_containers = ub.current_material.containers[uniform_type].application_containers;

                            if (typeof app_containers[settings.application.id] !== 'undefined') {

                                s = app_containers[settings.application.id].object.sprite;
                            mvChangeTextColor(settings.application.id, s, color_code);
                            color_drop.nonce = false;

                                
                            }

                            
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

        //var text_sprite = ub.objects[application.perspective + '_view']['objects_' + application.id];

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
            $.ub.mvChangePattern(application, target, clone);
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

            //var text_sprite = ub.objects[application.perspective + '_view']['objects_' + application.id];

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

                var gradient_output = ub.recreate_gradient_obj(clone);
                //generate_gradient(gradient_output, target, text_sprite, application);

                _.each(gradient_output.color_stops, function (e, index) {

                    var s = $('[data-index="' + index + '"][data-target="' + target + '"]');
                    $("#gradient_slider_" + target).find('span:eq(' + index + ')').css('background', s.val());
                    e.color = s.val();
                    var temp = ($('#' + 'gradient_slider_' + target).limitslider("values")[index]);
                    temp = Math.floor(temp / 10);
                    temp = temp / 10;

                    e.value = temp;

                });

                gradient_output.angle = parseInt($('#' + 'angle_gradient_slider_' + target).find('span.edit').html()); 

                /// Recreate Gradient Object into new structure

                var applicationObj = ub.current_material.settings.applications[target];
                var sprite_collection = ub.current_material.containers.upper.application_containers[application.id].object.sprite;

                $.ub.mvChangeGradient(applicationObj, gradient_output, sprite_collection);

            
                //generate_gradient(gradient_output, target, text_sprite, application);

            });


            if (el.code === "custom") {

                $('#add_gradient_color_stop').on('click', function () {

                    var obj_colors = _.find(ub.current_material.material.options, { name: window.util.toTitleCase(target) });
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

        var generate_gradient = function (gradient_obj, target, text_sprite, application) {

            ub.current_material.settings.applications[application.id].gradient_obj = gradient_obj;

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

            // if (typeof(ub.objects.pattern_view.gradient_layer) === "object") {
            //     ub.pattern_view.removeChild(ub.objects.pattern_view.gradient_layer);
            // }

            // ub.objects.pattern_view.gradient_layer = gradient_layer;
            // ub.pattern_view.addChild(ub.objects.pattern_view.gradient_layer);
            // ub.updateLayersOrder(ub.pattern_view);
            
            var v = application.perspective;
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

    /// MultiView Functions 

    function mvChangeTextColor(appId, container, color_code, ubLayerNo){

        var app = ub.current_material.settings.applications[appId];
        s = container;

        _.each(s, function(text) {

            var sprite = '';
           
            if (typeof ubLayerNo !== 'undefined') {
                
                sprite = _.find(text.children, {ubLayerNo: ubLayerNo}); 
                
                if (typeof sprite === 'undefined') { // initial create, no layer yet
                    return;
                }

            }
            else {
                sprite = _.find(text.children, {ubName: 'Base Color'});   
            }

            app.color_array[0] = parseInt(color_code, 16);

            sprite.tint = parseInt(color_code, 16);    
            app.color_array[sprite.ubLayerNo] = {};
            app.color_array[sprite.ubLayerNo].layer_name = sprite.ubName;
            app.color_array[sprite.ubLayerNo].layer_no = _.first(text.children).ubLayerNo;
            app.color_array[sprite.ubLayerNo].color_code = color_code;
            sprite.tint = parseInt(color_code, 16); 

        });

    };

    function removePatternFromApplicationViewObject(applicationID, perspective) {

        var _perpectiveStr = perspective + '_view';
        var _patternStr = 'pattern_' + applicationID;

        if (typeof ub.objects[_perpectiveStr][_patternStr] === "object") {

            ub.objects[_perpectiveStr][_patternStr]
            ub[_perpectiveStr].removeChild(_patternStr);

        }

    }

    function fixLayerColor (layer) {

        if (typeof layer.default_color === "undefined" && typeof layer.color_code !== "undefined") {

            _colorObj = ub.funcs.getColorByColorCode(layer.color_code);

            if (typeof _colorObj !== "undefined") {
                layer.default_color =  _colorObj.hex_code;
                layer.color_code = _colorObj.color_code;
            } else {
                ub.utilities.warn('Color not Found ' + layer.color_code);
            }
            
        } 

        if (typeof layer.default_color === "undefined" && typeof layer.color_code === "undefined") {

            _teamColor = ub.funcs.getColorUsedByIndex(layer.team_color_id);

            if (typeof _teamColor !== 'undefined') {

                _colorObj = ub.funcs.getColorObjByHexCode(_teamColor.hexCode);

                if (typeof _colorObj !== "undefined") {
                    layer.default_color = _colorObj.hex_code;
                    layer.color_code = _colorObj.color_code;
                } else {
                    ub.utilities.warn('Color Object not found for ' + _teamColor.hexCode);
                }

            }

        }

        if (typeof layer.default_color !== "undefined" && typeof layer.color_code === "undefined") {

            var _color = ub.funcs.getColorObjByHexCode(layer.default_color);

            if (typeof _colorObj !== "undefined") {
                layer.default_color = _color.hex_code;
                layer.color_code = _color.color_code;
            } else {
                ub.utilities.warn('Color not found ' + layer.default_color);
            }

        }

    }

    $.ub.mvChangePattern = function (application, target, clone, sprite_collection){

        var _container = undefined;
        var _textSprite = undefined;
        var _maskSprite = undefined; 
        var _sprites = undefined;
        var _primaryView = undefined;
        var _applicationSettings = undefined;
        var _colorObj = undefined;
        var _teamColor = undefined;
        var _primaryViewStr = '';
        var _patternIDStr = '';        
        var _applicationViewObjects = undefined;

        _applicationSettings = ub.current_material.settings.applications[application.id];
        _applicationViewObjects = ub.funcs.getApplicationViewObjects(application.id);

        _.each(_applicationViewObjects, function (viewObject) {

            // _primaryView = ub.funcs.getPrimaryView(application);
            _primaryView = viewObject.perspective;
            _primaryViewStr = _primaryView + '_view';
            _patternIDStr = 'pattern_' + application.id;
            _sprites = ub.objects[_primaryViewStr]['objects_' + application.id];
            _textSprite = _.find(_sprites.children, {ubName: 'Base Color'});
            _maskSprite = _.find(_sprites.children, {ubName: 'Mask'});
            _maskSprite.alpha = 1;

            removePatternFromApplicationViewObject(application.id, _primaryView);

            ub.current_material.containers[application.id] = {};
            ub.objects[_primaryViewStr][_patternIDStr] = {};

            _container = new PIXI.Container();
            _container.sprites = {};
     
            _.each(clone.layers, function (layer, index) {

                var sprite = ub.pixi.new_sprite(layer.filename);            
                sprite.zIndex = layer.layer_number * -1;

                fixLayerColor(layer);

                if (clone.name !== "Flag") {
                    sprite.tint = parseInt(layer.default_color,16);    
                }
                
                if (typeof sprite_collection === 'object') {
                    val = _applicationSettings.pattern_obj.layers[0].default_color;            
                }

                sprite.anchor.set(0.5, 0.5);
                _container.addChild(sprite);

            });

            _container.alpha = 1;
            _container.scale = new PIXI.Point(1, 1);
            _container.mask = _maskSprite;
            _container.zIndex = -12;

            if(typeof _textSprite.pattern_layer === "object" ){
                _textSprite.pattern_layer.removeChildren();
                _textSprite.removeChild(_textSprite.pattern_layer);
            }

            _textSprite.pattern_layer = _container;
            _textSprite.addChild(_textSprite.pattern_layer);

            ub.updateLayersOrder(_textSprite);

            var _calibration = 0;

            if (_.contains(ub.uiData.patternSliderRange.forCalibration, _applicationSettings.pattern_obj.name)) {

                _calibration = ub.uiData.patternSliderRange.adjustedStart;

            }

            if (typeof _applicationSettings.pattern_settings !== "undefined" && _applicationSettings.pattern_settings.length > 0) {

                _container.position.y = _applicationSettings.pattern_settings.position.y + _calibration;

            } else {

                _position = {x: 0, y: 0};

                // If there's a position setting from the backend 
                if (typeof _applicationSettings.pattern_settings.position !== "undefined") {
                    _position = _applicationSettings.pattern_settings.position;
                }

                if (_.contains(ub.uiData.patternSliderRange.forCalibration, _applicationSettings.pattern_obj.name)) {
                    _position.y += _calibration;
                }

                pattern_settings = {

                    rotation: 0,
                    scale: {x: 1, y: 1},
                    position: _position,
                    opacity: 1, 

                };

                _container.position.y = _position.y;

            }

            _applicationSettings.pattern_obj = clone;
            ub.objects[_primaryViewStr][_patternIDStr] = _container;
     
        });

    };

    $.ub.mvChangeGradient = function (applicationObj, gradient_output, spriteCollection) {

        var uniform_type = ub.current_material.material.type;
        var app = ub.current_material.settings.applications[applicationObj.id];
        var app_containers = ub.current_material.containers[uniform_type].application_containers;

        s = spriteCollection;

        _.each(s, function(text) {

            generate_gradient(gradient_output, applicationObj.id, text, applicationObj.application);

        });

    }

    /// End Multiview Functions

    /// Utility Functions

    $.ub.getApplicationSizes = function (applicationType) {

        var sizes = [100,200];
        var factory_code = ub.current_material.material.factory_code;
        var _applicationSize = _.find(ub.data.applicationSizes.items, {name: applicationType});

        if(typeof _applicationSize === 'undefined') {

            sizes = [100, 200];

        } else {

            sizes = _applicationSize.sizes;

        }

        return sizes;

    };

    $.ub.getFontSize = function (inputObject) {

        // Input Object should contain:
        // 
        // applicationType
        // factory
        // type
        // inputSize

        var inputSize               = inputObject.size;
        var inputType               = inputObject.type;
        var inputFactory            = inputObject.factory;
        var inputApplicationType    = inputObject.applicationType; 
        var inputFontID             = inputObject.fontID;

        /// Todo: Fetch this from API
        
        var outputFontObj           = _.find(ub.data.fontSizes.items, { fontID: inputFontID });
        var outputSizeObject        = _.find(outputFontObj.fontSizeTable, { inputSize: inputSize });
        var returnSize              = 0;

        if (typeof outputSizeObject === 'undefined') {

            util.error('Font Size not found');
            returnSize = 100;

        }
        else {

            returnSize = outputSizeObject.outputSize;

        }

        return returnSize;

    }


    /// End Utility Functions 


}(jQuery));