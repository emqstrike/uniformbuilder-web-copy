$(document).ready(function() {
    var neckOptionProperties = JSON.parse($('#neck_options').val());

    try {
        $('.autosized').autosize({
            append: "\n"
        });
    } catch(err) {
        console.log(err.message);
    }

    if ($('.part-and-fabrics .fabrics').length > 0) {
        $('.part-and-fabrics .fabrics').select2({
            data: JSON.parse($('#fabrics-list').val()),
            multiple: true,
            allowClear: true
        });
    }

    var layers_properties = {};

    $(document).on('click', '.clone-row', function() {
        var elem = `<tr class="layers-row">
            <td>
                <input type="text" class="neck-option-name form-control layer1" name="neck_option_name[]">
            </td>
            <td>
                <img class="thumb-container" data-toggle="popover" data-img="" style="width: 30px; height: 30px;">
            </td>
            <td>
                <input type="file" class="neck-option-file layer1" name="neck_option_image[]">
            </td>
            <td>
                <input type="text" class="neck-option-alias layer1" name="neck_option_alias[]">
            </td>
            <td>
                <textarea class="neck-option-placeholder-overrides form-control layer1" name="neck_option_placeholder_overrides"  autosized></textarea>
            </td>

            <td>
                <a class="btn btn-flat btn-danger btn-xs btn-remove-option"><i class="fa fa-remove"></i> Remove</a>
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
        $('.neck-option-name, .neck-option-placeholder-overrides, .neck-option-alias').keyup(function(){
            var length = $('.layers-row').length;
            updateJSON(length, edit);
        });
    }

    $('body').on('click', '.delete-block-pattern', function(){
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

    function updateJSON(length, edit) {
        layers_properties = {};
        var ctr = 1;

        $(".layers-row").each(function(i) {

            if(ctr <= length){
                var thisLayer = "layer"+ctr;

                layers_properties[ctr] = {};
                layers_properties[ctr]['name'] = {};
                layers_properties[ctr]['thumbnail_path'] = {};
                layers_properties[ctr]['alias'] = {};
                layers_properties[ctr]['placeholder_overrides'] = {};

                $(this).find('.neck-option-name').removeClass().addClass("neck-option-name");
                $(this).find('.neck-option-name').addClass(thisLayer);
                var name_class = ".neck-option-name.layer" + ctr;
                $(this).find(name_class).addClass('neck-option-name');

                $(this).find('.neck-option-file').removeClass().addClass("neck-option-file");
                $(this).find('.neck-option-file').addClass(thisLayer);
                var file_class = ".neck-option-file.layer" + ctr;
                $(this).find(file_class).addClass('neck-option-file');

                $(this).find('.neck-option-alias').removeClass().addClass('neck-option-alias');
                $(this).find('.neck-option-alias').addClass(thisLayer);
                var alias_class = '.neck-option-alias.layer' + ctr;
                $(this).find(alias_class).addClass('neck-option-alias');

                $(this).find('.neck-option-placeholder-overrides').removeClass().addClass("neck-option-placeholder-overrides");
                $(this).find('.neck-option-placeholder-overrides').addClass(thisLayer);
                var placeholder_class = ".neck-option-placeholder-overrides.layer" + ctr;
                $(this).find(placeholder_class).addClass('neck-option-placeholder-overrides');

                $(this).find('.neck-option-existing-file').removeClass().addClass('neck-option-existing-file');
                $(this).find('.neck-option-existing-file').addClass(thisLayer);

                var existing_file_class = ".neck-option-existing-file.layer" + ctr;

                layers_properties[ctr]['name'] = $(this).find(name_class).val();
                layers_properties[ctr]['placeholder_overrides'] = $(this).find(placeholder_class).val();
                layers_properties[ctr]['alias'] = $(this).find(alias_class).val();
                layers_properties[ctr]['thumbnail_path'] = $(this).find(existing_file_class).val();
            }
            
            ctr++;

            $('.btn-remove-option').on('click', function(){
                $(this).parent().parent().remove();
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });

            console.log(layers_properties);
        });

        var layersProperties = JSON.stringify(layers_properties);
        $('#neck_options').val(layersProperties);

        console.log(layersProperties);
    }


    if( $( ".layers-row" ) ){
        try{
            buildLayers();
        } catch(err){
            console.log('failed to build layers');
        }
    }

    function buildLayers() {
        var data = neckOptionProperties;

        var length = Object.keys(data).length;
        var x = 1;

        while(x <= length) {
            updater(1);

            var open            = '<tr class="layers-row">';
            var existing_file   = '<input type="hidden" name="neck_option_existing_file[]" class="neck-option-existing-file layer' + x + '" value="' + data[x].thumbnail_path + '">';
            var name            = '<td>' + data[x].name + '</td>';
            var thumbnail       = '<td><img src="' + data[x].thumbnail_path + '" style="width: 30px; height: 30px; background-color: #e3e3e3;"><input type="hidden" name="image-existing-source" value="' + data[length]['filename'] + '"></td>';
            var alias           = '<td>' + data[x].alias + '</td>'
            var placeholder     = '<td>' + data[x].placeholder_overrides + '</td>';

            var buttons = `
                <td>
                    <a class='btn btn-flat btn-primary btn-xs btn-edit-option'
                        data-neck-option-name='` + data[x].name + `"'
                        data-neck-option-alias='` + data[x].alias + `'
                        data-neck-option-placeholder-overrides="` + data[x].placeholder_overrides + `"
                    >
                        <i class='fa fa-edit'></i>Edit
                    </a>
                </td>
            `;

            var close = '<tr>';

            if (! data[x].thumbnail_path) {
                thumbnail = '<td><img src="https://via.placeholder.com/30x30?text=."><input type="hidden" name="image-existing-source" value="' + data[length]['filename'] + '"></td>';
            }

            $('#layers-row-container').append( open + name + existing_file + alias + placeholder + buttons + close );
            x++;

            $('.btn-remove-option').on('click', function(){
                $(this).parent().parent().remove();
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });

            $('.neck-option-name').keyup(function(){
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });

            $('.neck-option-alias').keyup(function(){
                var length = $('.layers-row').length;
                updateJSON(length, 1);
            });

            $('.neck-option-placeholder-overrides').keyup(function(){
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

    $('.clone-parts-and-fabrics').click(function(e) {
        e.preventDefault();

        $('.part-and-fabrics .fabrics').select2('destroy');

        var cloned = $('.part-and-fabrics').first().clone(true);

        cloned.find('.fabrics option').remove();
        cloned.find('.name').val('');
        cloned.find('.part-fabrics-field').val('');

        $('#part-and-fabrics-container').append(cloned);

        $('.part-and-fabrics .fabrics').each(function() {
            $(this).removeAttr('data-select2-id').select2();
        });

        if ($('.part-and-fabrics').length > 1) {
            cloned.find('.remove-parts-and-fabric').removeAttr('style');
        }

        $('.part-and-fabrics .fabrics').select2({
            data: JSON.parse($('#fabrics-list').val()),
            multiple: true,
            allowClear: true
        });
    });

    $('.remove-parts-and-fabric').click(function(e) {
        e.preventDefault();

        $(this).closest('.part-and-fabrics').remove();
    });

    $('body').on('change', '.part-and-fabrics .fabrics', function() {
        var field = $(this).prev('.part-fabrics-field');
        field.val($(this).val());
    });
});
