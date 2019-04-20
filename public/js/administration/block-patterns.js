$(document).ready(function(){

    try{
        $('.autosized').autosize({append: "\n"});
    } catch(err){
        console.log(err.message);
    }

    var layers_properties = {};

    $(document).on('click', '.clone-row', function() {

            var elem = `<tr class="layers-row">
                                            <td>
                                                <input type="text" class="neck-option-name layer1" name="neck_option_name[]">
                                            </td>
                                            <td>
                                                <img class="thumb-container" data-toggle="popover" data-img="" style="width: 30px; height: 30px;">
                                            </td>
                                            <td>
                                                <input type="file" class="neck-option-file layer1" name="neck_option_image[]">
                                            </td>
                                            <td>
                                                <textarea class="neck-option-placeholder-overrides layer1" name="neck_option_placeholder_overrides"  autosized></textarea>
                                            </td>
                                            <td>
                                                <a class="btn btn-danger btn-xs btn-remove-option"><i class="fa fa-remove"></i> Remove</a>
                                            </td>
                                        </tr>`;
            $('#layers-row-container').append(elem);
            var length = $('.layers-row').length;
            updater();
            updateJSON(length, 1);
    });

    $(document).on('change', 'input', function() {
        updater();
    });

    updater();
    function updater(edit){
        $('.neck-option-name, .neck-option-placeholder-overrides').keyup(function(){
            var length = $('.layers-row').length;
            updateJSON(length, edit);
        });
    }

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

        if( data != "" && data != null ){
            try {
                var json = JSON.parse(data);

                var container = $(this).closest('.neck-options-cell');
                var ctr = 1;

                $.each(json, function(key, value) {

                    var thumbnail = value.thumbnail_path;
                    var name = value.name;
                    $(container).append(
                        '<div class="col-md-3">' +
                        '<div class="panel panel-default">' +
                        '<div class="panel-heading"><center><b>' + name + '</b></center></div>' +
                        '<div class="panel-body">' +
                        '<center><img src="' + thumbnail + '" class="img-thumbnail" style="height: 100px; width: 120px;">' +
                        '</div></div></div>'
                    );
                });
            }
            catch(err) {
                console.log('Error');
            }

        }

    });

    function updateJSON(length, edit){
        layers_properties = {};
        var ctr = 1;

        $(".layers-row").each(function(i) {
            if(ctr <= length){
                var thisLayer = "layer"+ctr;

                layers_properties[ctr] = {};
                layers_properties[ctr]['name'] = {};
                layers_properties[ctr]['thumbnail_path'] = {};
                layers_properties[ctr]['placeholder_overrides'] = {};

                $(this).find('.neck-option-name').removeClass().addClass("neck-option-name");
                $(this).find('.neck-option-name').addClass(thisLayer);
                var name_class = ".neck-option-name.layer" + ctr;
                $(this).find(name_class).addClass('neck-option-name');

                $(this).find('.neck-option-file').removeClass().addClass("neck-option-file");
                $(this).find('.neck-option-file').addClass(thisLayer);
                var file_class = ".neck-option-file.layer" + ctr;
                $(this).find(file_class).addClass('neck-option-file');

                $(this).find('.neck-option-placeholder-overrides').removeClass().addClass("neck-option-placeholder-overrides");
                $(this).find('.neck-option-placeholder-overrides').addClass(thisLayer);
                var placeholder_class = ".neck-option-placeholder-overrides.layer" + ctr;
                $(this).find(placeholder_class).addClass('neck-option-placeholder-overrides');

                $(this).find('.neck-option-existing-file').removeClass().addClass('neck-option-existing-file');
                $(this).find('.neck-option-existing-file').addClass(thisLayer);

                var existing_file_class = ".neck-option-existing-file.layer" + ctr;

                layers_properties[ctr]['name'] = $(this).find(name_class).val();
                layers_properties[ctr]['placeholder_overrides'] = $(this).find(placeholder_class).val();
                layers_properties[ctr]['thumbnail_path'] = $(this).find(existing_file_class).val();
            }
            ctr++;
            $('.btn-remove-option').on('click', function(){
                $(this).parent().parent().remove();
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });
        });

        var layersProperties = JSON.stringify(layers_properties);
        $('#neck_options').val(layersProperties);
    }


    if( $( ".layers-row" ) ){
        try{
            buildLayers();
        } catch(err){
            console.log('failed to build layers');
        }
    }

    function buildLayers() {
        neck_options = $('#neck_options').val();
        var data = JSON.parse(neck_options);

        var length = Object.keys(data).length;
        var x = 1;

        while(x <= length) {

            updater(1);

            var open            = '<tr class="layers-row">';
            var existing_file   = '<input type="hidden" name="neck_option_existing_file[]" class="neck-option-existing-file layer' + x + '" value="' + data[x].thumbnail_path + '">';
            var name            = '<td><input type="text" class="neck-option-name layer' + x + '" value="' + data[x].name + '" name="neck_option_name[]"></td>';
            var file            = '<td><input type="file" class="neck-option-file layer' + x + '" name="neck_option_image[]"></td>';
            var thumbnail       = '<td><img src="' + data[x].thumbnail_path + '" style="width: 30px; height: 30px; background-color: #e3e3e3;"><input type="hidden" name="image-existing-source" value="' + data[length]['filename'] + '"></td>';
            var placeholder     = '<td><textarea class="neck-option-placeholder-overrides layer" name="neck_option_placeholder_overrides"  autosized>'+ data[x].placeholder_overrides +'</textarea></td>';
            var remove          = '<td><a class="btn btn-danger btn-xs btn-remove-option"><i class="fa fa-remove"></i> Remove</a></td>';
            var close           = '<tr>';

            $('#layers-row-container').append( open + name + existing_file + thumbnail + file + placeholder + remove + close );
            x++;

            $('.btn-remove-option').on('click', function(){
                $(this).parent().parent().remove();
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });

            $('.neck-option-name').keyup(function() {
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });

            $('.neck-option-placeholder-overrides').keyup(function() {
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });
        }
    }

    $('.toggle-block-pattern').on('click', function() {
        var id = $(this).data('block-pattern-id');
        var url = "//" + api_host + "/api/block_pattern/toggle/";

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
                    console.log(response.message);
                }
            }
        });
    });
});
