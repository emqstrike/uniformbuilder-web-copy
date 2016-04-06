$(document).ready(function(){

    var layers_properties = {};

    $(document).on('click', '.clone-row', function() {
        $( ".layers-row:first" ).clone().appendTo( "#layers-row-container" );
        updater();
        var length = $('.layers-row').length;
        console.log("CLONE!");
    });

    updater();

    function updater(){
        $('.neck-option-name').keyup(function(){
            console.log($(this).val());
            var length = $('.layers-row').length;
            updateJSON(length);
        });
    }

    // $('.neck-option-name').keyup(function(){
    //     console.log($(this).val());
    //     var length = $('.layers-row').length;
    //     updateJSON(length);
    // });

    // TODO ADD ON/OFF TOGGLER

    $('.delete-block-pattern').on('click', function(){
        var id = $(this).data('block-pattern-id');
        modalConfirm('Remove Block Pattern', 'Are you sure you want to delete the block pattern?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/block_pattern/delete/";
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
                    $('.block-pattern-' + id).fadeOut();
                }
            }
        });
    });

    $(".neck-options-container").each(function(i) {
        var data = $(this).val();
        console.log(data);
        if( data != "" && data != null ){
            var json = JSON.parse(data);
            console.log(json);
            var container = $(this).closest('.neck-options-cell');
            var ctr = 1;
            $.each(json, function(key, value) {
                var thumbnail = value.thumbnail_path;
                var name = value.name;
                $(container).append(
                        '<div style="display: inline;">' +
                        '<img src="' + thumbnail + '" style="height: 100px; width: 120px;">' +
                        '<p style="display: inline; color: #000;">' + name + '</p>' +
                        '</div>'
                        );
            });
            // $.each(json, function(entryIndex, entry) {
            //     var thumbnail = JSON.stringify(entry['thumbnail_path']);
            //     var name = JSON.stringify(entry['name']);
            //     $.each(json, function(entryIndex, entry) {
            //         console.log("APPEND");
            //         $(container).append('<div>' +

            //             '<img src="' + thumbnail + '">' +
            //             '</div>');
            //     });
            //     ctr++;
            // });
        }
    });

    function updateJSON(length){
        console.log('Update JSON');
        layers_properties = {};
        var ctr = 1;
        $(".layers-row").each(function(i) {
            if(ctr <= length){
                var thisLayer = "layer"+ctr;

                layers_properties[ctr] = {};
                layers_properties[ctr]['name'] = {};
                layers_properties[ctr]['thumbnail_path'] = {};

                $(this).find('.neck-option-name').removeClass().addClass("neck-option-name");
                $(this).find('.neck-option-name').addClass(thisLayer);
                var name_class = ".neck-option-name.layer" + ctr;
                $(this).find(name_class).addClass('neck-option-name');

                $(this).find('.neck-option-file').removeClass().addClass("neck-option-file");
                $(this).find('.neck-option-file').addClass(thisLayer);
                var file_class = ".neck-option-file.layer" + ctr;
                $(this).find(file_class).addClass('neck-option-file');
                
                console.log('Name VAL: ' + $(this).find(name_class).val());
                layers_properties[ctr]['name'] = $(this).find(name_class).val();
                layers_properties[ctr]['thumbnail_path'] = $(this).find(file_class).val();
            }
            ctr++;
        });
        var layersProperties = JSON.stringify(layers_properties);
        // console.log(layersProperties);
        $('#neck_options').val(layersProperties);
        
    }
});
