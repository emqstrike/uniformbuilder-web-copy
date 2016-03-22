$(document).ready(function() {

    var layers_properties = {};
    var length = $('.layers-row').length;
    renumberRows(length);

    $('#colors_textarea').hide();

    $('.ma-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
        var length = $('.layers-row').length;
        renumberRows(length);
        console.log('CHANGE COLOR');
    });

    var colors_array = $('#colors_textarea').text();
    try {
        test = JSON.parse(colors_array);
    } catch(err) {
        console.log(err.message);
    }
    

    // SHOW COLORS IN TABLE

    $(".color-prop-container").each(function(i) {
        var data = $(this).val();
        var json = JSON.parse(data);
        var container = $(this).closest('.colors-cell');
        var ctr = 1;
        $.each(json, function(entryIndex, entry) {
            var color = JSON.stringify(entry['default_color']);
            color = color.toString().replace(/"/g, "");
            $.each(test, function(entryIndex, entry) {
                if(color == entry['color_code']){
                    var color_name = entry['name'];
                    // $(container).append("<center><p style=\"background-color: #"+ entry['hex_code'] +"; margin-right: 5px; border-radius: 4px;color: #fff;text-shadow: 1px 1px #000; \">"+color_name+"</p></center>");
                    $(container).append("<center><p style=\"float: left; width: 20px; position: relative; background-color: #000; color: #fff;text-shadow: 1px 1px #000\">"+ctr+"</p><p style=\"background-color: #"+ entry['hex_code'] +"; margin-right: 5px; border-radius: 4px;color: #fff;text-shadow: 1px 1px #000; \">"+color_name+"</p></center>");
                }
            });
            ctr++;
        });
    });

    $('.toggle-preference').on('click', function(){
        var id = $(this).data('preference-id');
        var url = "//" + api_host + "/api/preference/toggle/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    var elem = '.material-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                }
            }
        });
    });

    $('.delete-preference').on('click', function(){
        var id = $(this).data('preference-id');
        var name = $(this).data('preference-name');
        modalConfirm('Remove preference', 'Are you sure you want to delete the preference '+ name +' ?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/preference/delete/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $('#confirmation-modal').modal('hide');
                    $('.preference-' + id).fadeOut();
                }
            }
        });
    });

    $( "tbody" ).disableSelection();
    $( "tbody.sortable-colors" ).sortable({
        start: function( ) {
            $('.ui-sortable-placeholder').css('background-color','#e3e3e3');
        },
        stop: function( ) {
            console.log("STOP");
            var length = $('.layers-row').length;
            var ctr = 1;
            $(".layers-row").each(function(i) {
                if(ctr <= length){
                    $(this).find(".layer-number").text(ctr);
                    $(this).find(".layer-number").val(ctr);
                }
                    ctr++;
            });
            var newLength = $('.layers-row').length;
            renumberRows(newLength);
        }
    });

    $(document).on('click', '.clone-row', function() {
        $( ".layers-row:first" ).clone().appendTo( "#layers-row-container" );

        $('.ma-default-color').change(function(){
            var color = $('option:selected', this).data('color');
            $(this).css('background-color', color);
            var length = $('.layers-row').length;
            renumberRows(length);
            // console.log('CHANGE COLOR');
        });

        var length = $('.layers-row').length;
        var ctr = 1;
        $(".layers-row").each(function(i) {
            if(ctr <= length){
                $(this).find(".layer-number").text(ctr);
                $(this).find(".layer-number").val(ctr);
            }
            ctr++;
        });
        var newLength = $('.layers-row').length;
        console.log("CLONE!");

        renumberRows(newLength);
    });

    var existing_layers_properties = null;

    function renumberRows(length){
        layers_properties = {};
        var ctr = 1;
        $(".layers-row").each(function(i) {
            if(ctr <= length){
                var thisLayer = "layer"+ctr;
                var layer_class = ".ma-layer.layer" + ctr;

                layers_properties[ctr] = {};
                layers_properties[ctr]['default_color'] = {};
                layers_properties[ctr]['filename'] = {};

                $(this).find('.ma-layer').removeClass().addClass("ma-layer");
                $(this).find('.ma-layer').addClass(thisLayer);
                $(this).find(layer_class).addClass('ma-layer');

                $(this).find('.ma-default-color').removeClass().addClass("ma-default-color");
                $(this).find('.ma-default-color').addClass(thisLayer);
                var default_color_class = ".ma-default-color.layer" + ctr;
                $(this).find(default_color_class).addClass('ma-default-color');

                $(this).find('.ma-options-src').removeClass().addClass("ma-options-src");
                $(this).find('.ma-options-src').addClass(thisLayer);
                var src_class = ".ma-options-src.layer" + ctr;
                $(this).find(src_class).addClass('ma-options-src');

                var hexString = $(this).find(default_color_class).val()
                
                if(hexString.replace('#','')){
                    hexString = hexString.replace('#','');
                }
                
                layers_properties[ctr]['default_color'] = hexString;
                layers_properties[ctr]['filename'] = $(this).find(src_class).val();
            }
            ctr++;
        });
        var layersProperties = JSON.stringify(layers_properties);
// console.log(layersProperties);
        $('#colors_properties').val(layersProperties);
        $('#existing-layers-properties').val(layersProperties);
        
    }

    $(document).on('click', '.edit-clone-row', function() {

        $( "#base-row" ).clone().appendTo( "#layers-row-container" );

        var length = $('.layers-row').length;
        var ctr = 1;
        $(".layers-row").each(function(i) {
            if(ctr <= length){
                $(this).find(".layer-number").text(ctr);
                $(this).find(".layer-number").val(ctr);
            }
            ctr++;
        });
        var newLength = $('.layers-row').length;
    });

});