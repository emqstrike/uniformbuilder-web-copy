$(document).ready(function(){



    var layers_properties = {};



    $(document).on('click', '.clone-row', function() {

        $( ".layers-row:first" ).clone().appendTo( "#layers-row-container" );
        updater();
        var length = $('.layers-row').length;

    });



    updater();
    function updater(edit){

        $('.neck-option-name').keyup(function(){

            console.log($(this).val());
            var length = $('.layers-row').length;
            updateJSON(length, edit);

        });

    }

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
                        '<div class="col-md-3">' +
                        '<div class="panel panel-default">' +
                        '<div class="panel-heading"><center><b>' + name + '</b></center></div>' +
                        '<div class="panel-body">' +
                        '<center><img src="' + thumbnail + '" class="img-thumbnail" style="height: 100px; width: 120px;">' +
                        '</div></div></div>'
                        );
            });

        }

    });



    function updateJSON(length, edit){

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

                var existing_file_class = ".neck-option-existing-file.layer" + ctr;
                
                console.log('Name VAL: ' + $(this).find(name_class).val());
                layers_properties[ctr]['name'] = $(this).find(name_class).val();

                if( edit == 1 ){

                    layers_properties[ctr]['thumbnail_path'] = $(this).find(existing_file_class).val();

                } else {

                    layers_properties[ctr]['thumbnail_path'] = $(this).find(file_class).val();

                }
            }
            ctr++;

        });

        var layersProperties = JSON.stringify(layers_properties);
        console.log(layersProperties);
        $('#neck_options').val(layersProperties);

    }



    buildLayers();
    function buildLayers(){

        neck_options = $('#neck_options').val();
        var data = JSON.parse(neck_options);

        var length = Object.keys(data).length;
        var x = 1;

        while(x <= length) {

            updater(1);

            var open            = '<tr class="layers-row">';
            var existing_file   = '<input type="hidden" class="neck-option-existing-file layer' + x + '" value="' + data[x].thumbnail_path + '">';
            var name            = '<td><input type="text" class="neck-option-name layer' + x + '" value="' + data[x].name + '" name="neck_option_name[]"></td>';
            var file            = '<td><input type="file" class="neck-option-file layer' + x + '" name="neck_option_image[]"></td>';
            var thumbnail       = '<td><img src="' + data[x].thumbnail_path + '" style="width: 30px; height: 30px; background-color: #e3e3e3;"><input type="hidden" name="image-existing-source" value="' + data[length]['filename'] + '"></td>';
            var remove          = '<td><a class="btn btn-danger btn-xs btn-remove-layer"><i class="fa fa-remove"></i> Remove</a></td>';
            var close           = '<tr>';

            $('#layers-row-container').append( open + name + existing_file + thumbnail + file + remove + close );
            x++;

        }

    }


});
