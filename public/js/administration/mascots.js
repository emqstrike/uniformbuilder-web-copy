$(document).ready(function() {

    $('.enable-mascot').on('click', function(){
        var id = $(this).data('mascot-id');
        var url = "//" + api_host + "/api/mascot/enable/";
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
                    var elem = '.mascot-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-mascot').removeAttr('disabled');
                    $(elem + ' .enable-mascot').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-mascot').on('click', function(){
        var id = $(this).data('mascot-id');
        var url = "//" + api_host + "/api/mascot/disable/";
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
                    var elem = '.mascot-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-mascot').removeAttr('disabled');
                    $(elem + ' .disable-mascot').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $('.delete-mascot').on('click', function(){
        var id = $(this).data('mascot-id');
        modalConfirm('Remove mascot', 'Are you sure you want to delete the mascot?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/mascot/delete/";
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
                    $('.mascot-' + id).fadeOut();
                }
            }
        });
    });

    $(document).on('change', function() {
        var length = $('.layers-row').length;
        renumberRows(length);
    });

    $( "tbody" ).disableSelection();
    $( "tbody" ).sortable({
        start: function( ) {
            $('.ui-sortable-placeholder').css('background-color','#e3e3e3');
        },
        stop: function( ) {
            var length = $('.layers-row').length;
            $(".layers-row").each(function(i) {
                $(this).find(".layer-number").text(length);
                $(this).find(".layer-number").val(length);
                length = length-1;
            });
            var newLength = $('.layers-row').length;
            renumberRows(newLength);
        }
    });

    var layers_properties = {};
    var existing_layers_properties = null;

    function renumberRows(length){
        layers_properties = {};
        $(".layers-row").each(function(i) {
            var thisLayer = "layer"+length;
            var layer_class = ".ma-layer.layer" + length;

            layers_properties[length] = {};
            layers_properties[length]['default_color'] = {};
            layers_properties[length]['layer_number'] = {};
            layers_properties[length]['filename'] = {};

            $(this).find('.ma-layer').removeClass().addClass("ma-layer");
            $(this).find('.ma-layer').addClass(thisLayer);
            $(this).find(layer_class).addClass('ma-layer');

            $(this).find('.ma-default-color').removeClass().addClass("ma-default-color");
            $(this).find('.ma-default-color').addClass(thisLayer);
            var default_color_class = ".ma-default-color.layer" + length;
            $(this).find(default_color_class).addClass('ma-default-color');

            $(this).find('.ma-options-src').removeClass().addClass("ma-options-src");
            $(this).find('.ma-options-src').addClass(thisLayer);
            var src_class = ".ma-options-src.layer" + length;
            $(this).find(src_class).addClass('ma-options-src');

            var hexString = $(this).find(default_color_class).val()
            
            if(hexString.replace('#','')){
                hexString = hexString.replace('#','');
            }
            
            layers_properties[length]['default_color'] = hexString;
            layers_properties[length]['layer_number'] = $(this).find(layer_class).val();
            layers_properties[length]['filename'] = $(this).find(src_class).val();

            length--;
        });
        var layersProperties = JSON.stringify(layers_properties);
        console.log(layersProperties);
        $('#layers-properties').val(layersProperties);
    }

    $(document).on("click", "a.btn-remove-layer", function(){
        
        var length = 0;
        
        $(".layers-row").each(function(i) {
            length++;
        });

        if(length > 1){
            $(this).closest('tr').remove();
            length--;
        }
        console.log('LENGTH: '+length);

        var ctr = length;

        $(".layers-row").each(function(i) {
            $(this).find(".layer-number").text(ctr);
            $(this).find(".layer-number").val(ctr);
            console.log("LAYER: "+ctr);
            ctr--;
        });

        renumberRows(length);
    });

    $(document).on('click', '.clone-row', function() {

        $( ".layers-row:first" ).clone().appendTo( "#layers-row-container" );

        var length = $('.layers-row').length;
        $(".layers-row").each(function(i) {
            $(this).find(".layer-number").text(length);
            $(this).find(".layer-number").val(length);
            length = length-1;
        });
        var newLength = $('.layers-row').length;
    });

    $(document).on('click', '.edit-clone-row', function() {

        $( "#base-row" ).clone().appendTo( "#layers-row-container" );

        var length = $('.layers-row').length;
        $(".layers-row").each(function(i) {
            $(this).find(".layer-number").text(length);
            $(this).find(".layer-number").val(length);
            length = length-1;
        });
        var newLength = $('.layers-row').length;
    });

});