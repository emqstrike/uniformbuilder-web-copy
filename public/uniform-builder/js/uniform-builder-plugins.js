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

            console.log('Application ID: ');
            console.log(settings.application.id);

            var $container = $(this);

            var html_builder = '';

            html_builder += "<hr />";
            html_builder += "<div class='logo_drop' data-id='" + settings.application.id + "'>Choose a Logo <i class='fa fa-caret-down'></i></div>";
            html_builder += "<img class='logo-preview' id='preview-" + settings.application.id + "' data-id='" + settings.application.id + "'>";
            html_builder += "<div class='logo-controls' id='controls-" + settings.application.id + "' data-id='" + settings.application.id + "'>";
            html_builder += "<hr />";

            $container.html(html_builder);

            var selector = 'div.logo_drop[data-id="' + settings.application.id + '"]';
            
            var drop;
            console.log('FS');
            var content = "";
            content += "<div class='row logo-container' id='logo-container-" + settings.application.id + "'>";
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
                        $('.file_upload.logo > .image_preview').css("background-image", "url(" + this.result + ")");
                        
                        /// Update Preview and Application

                            $('img#preview-' + settings.application.id).css("background-image", "url(" + this.result + ")");
                            drop.close();

                            $a = $(this);

                            var application_id = settings.application.id;
                            var logo_id = id;

                            var logo = _.find(logos, {
                                id: logo_id
                            });

                            var application = _.find(ub.data.applications.items, {
                                id: application_id
                            });

                            ub.funcs.update_application(application, logo);

                            $angle_slider_logo = $('div.rotation_slider[data-id="' + application_id + '"]');

                            $angle_slider_logo.find('div.rs-bg-color').css({
                                'background-image': 'url(' + logo.dataUrl + ')',
                                'background-size': '80%',
                                'background-position': 'center center',
                                'background-repeat': 'no-repeat',
                            });

                        /// End Update Preview and Application 

                        ub.funcs.update_logos_picker_2(settings.application.id);

                        $('a.logo_list').on('click', function() {

                            var action = $(this).data('action');
                            var id = $(this).data('id');
                            var logos = ub.current_material.settings.files.logos;

                            if (action === 'remove') {

                                $('tr[data-id="' + id + '"]').remove();
                                logos[id] = null;
                                delete logos[id];

                                $('.file_upload.logo > .image_preview').css("background-image", "none");
                                $selector.val('');

                                ub.funcs.update_logos_picker();

                            } else if (action === 'preview') {

                                $('.file_upload.logo > .image_preview').css('background-image', "url(" + logos[id].dataUrl + ")");

                            }

                        });

                    }
                }


            };

            drop.once('open', function () {

                var $selector = $('#file-src-' + settings.application.id);
                $selector.on('change', file_change_handler);

                ub.data.panels = {};
                ub.data.panels['logo_panel'] = $selector;

                var $logo_container = $('div.logo-container');
                var logos = ub.current_material.settings.files.logos;

                var logo_list = "";

                _.each(logos, function(logo) {
                    logo_list += "<div class='col-md-4'>";
                    logo_list += "<a class='thumbnail logo_picker' data-id='" + logo.id + "'>" + "<img class = 'logo_picker' src='" + logo.dataUrl + "'>" + "</a>";
                    logo_list += "</div>";
                });

                $logo_container.html(logo_list);

            });
            
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

        return this.each(function () {

            var $container = $(this);

            var html_builder = '';

            html_builder += "<hr />";
            html_builder += "Player Number Dialog from Plugin";
            html_builder += "<hr />";

            $container.html(html_builder);

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



}(jQuery));