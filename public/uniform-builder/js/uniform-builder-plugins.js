(function ($) {

    $.fn.ubColorPicker = function(options) {

        /// Setup defaults
        /// Iterate over valid colors
        /// Setup events
        /// Return colors

        var settings = $.extend({
            colors: ['black', 'white'],
            target: 'target',
        }, options);

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

                var color = _.find( ub.current_material.colors, { color_code: color_obj});
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

            var btn = el_parent.find('.btn');

            $('.btn[data-elid="' + btn_el_id + '"]').on('click', function(){

                var color  = $(this).data('color');
                $('input[data-elid="' + btn_el_id + '"]').val(color);
                $('button#update-gradient').click();
                el_parent.find('span').css('background-color', color);

            });

            $('span[data-target="' + settings.target + '"][data-type="' + settings.type + '"][data-index="' +  color_stop_index + '"]').on("click", function(){

                
                var picker_panel = $('div.options_panel_section.ubColorPicker[data-option="' + target_name + '"][data-index="' +  color_stop_index + '"]');

                if(picker_panel.css('display') === "none"){
                    picker_panel.show();
                }
                else {
                    $('div.options_panel_section.ubColorPicker[data-option="' + target_name + '"]').hide();
                }


            });

            $('div.options_panel_section.ubColorPicker[data-option="' + target_name + '"]').hide();

            /// Init Popover

        });

    };

}(jQuery));