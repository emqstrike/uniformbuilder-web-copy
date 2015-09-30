$(document).ready(function(){

    window.materialOptionSettings = null;
    var url = "//" + api_host + "/api/cuts/settings";
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(response){
            window.materialOptionSettings = response;
            var type = 'pant cut';
            var items = materialOptionSettings[type];
        }
    });

    $('.materials').bootstrapTable();

    $('.show-material').on('click', function(){
        var material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name'),
            code: $(this).data('material-code'),
            type: $(this).data('material-type'),
            uniform_category: $(this).data('material-uniform-category'),
            gender: $(this).data('material-gender'),
            v3d: {
                material_path: $(this).data('material-path'),
                bump_map_path: $(this).data('bump-map-path'),
                shadow_path: $(this).data('shadow-path'),
                highlight_path: $(this).data('highlight-path'),
            },
            v2d: {
                front: {
                    view_path: $(this).data('front-view-path'),
                    shape_path: $(this).data('front-view-shape')
                },
                back: {
                    view_path: $(this).data('back-view-path'),
                    shape_path: $(this).data('back-view-shape')
                },
                right_side: {
                    view_path: $(this).data('right-side-view-path'),
                    shape_path: $(this).data('right-side-view-shape')
                },
                left_side: {
                    view_path: $(this).data('left-side-view-path'),
                    shape_path: $(this).data('left-side-view-shape')
                }
            }
        };

        $('#view-material-modal .modal-title').text(material.name);
        $('#view-material-modal .modal-material-code').text(material.code);
        $('#view-material-modal .modal-material-type').text(material.type);
        $('#view-material-modal .modal-material-uniform-category').text(material.uniform_category);
        $('#view-material-modal .modal-material-gender').text(material.gender);
        $('#view-material-modal .material-image').attr('src', material.material_path);
        $('#view-material-modal .bump-map-image').attr('src', material.bump_map_path);
        $('#view-material-modal .shadow-image').attr('src', material.shadow_path);
        $('#view-material-modal .highlight-image').attr('src', material.highlight_path);
        $('#view-material-modal .front-view-image').attr('src', material.v2d.front.view_path);
        $('#view-material-modal .front-view-shape').attr('src', material.v2d.front.shape_path);
        $('#view-material-modal .back-view-image').attr('src', material.v2d.back.view_path);
        $('#view-material-modal .back-view-shape').attr('src', material.v2d.back.shape_path);
        $('#view-material-modal .right-side-view-image').attr('src', material.v2d.right_side.view_path);
        $('#view-material-modal .right-side-view-shape').attr('src', material.v2d.right_side.shape_path);
        $('#view-material-modal .left-side-view-image').attr('src', material.v2d.left_side.view_path);
        $('#view-material-modal .left-side-view-shape').attr('src', material.v2d.left_side.shape_path);
        $('.nav-tabs').tab('show');
        $('#view-material-modal').modal('show');
    });

    $('.add-material-option').on('click', function(){
        var material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name')
        };
        $('#add-material-option-modal .material-id').val(material.id);
        $('#add-material-option-modal .modal-title span').html(material.name);
        $('#add-material-option-modal').modal('show');
    });

    $('.edit-material-option').on('click', function(){
        var material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name'),
            option: {
                id: $(this).data('material-option-id'),
                name: $(this).data('material-option-name'),
                layer_level: $(this).data('material-option-layer-level'),
                type: $(this).data('material-option-setting-type'),
                code: $(this).data('material-option-setting-code'),
                path: $(this).data('material-option-path'),
                perspective: $(this).data('material-option-perspective'),
                colors: $(this).data('material-option-colors'),
                gradients: $(this).data('material-option-gradients'),
                blend: ($(this).data('material-option-blend') == 'yes') ? true : false,
            }
        };

        var select_options = materialOptionSettings[material.option.type];
        $('#edit-material-option-modal .setting-types option[value="' + material.option.type + '"]').attr("selected","selected");
        $('#edit-material-option-modal .setting-codes option[value="' + material.option.code + '"]').attr("selected","selected");
        $('#edit-material-option-modal .perspective option[value="' + material.option.perspective + '"]').attr("selected","selected");
        if (material.option.colors.length)
        {
            material.option.colors.forEach(function(item){
                $('#edit-material-option-modal .colors option[value="' + item + '"]').attr("selected","selected");
            });
        }
        bindColorsSelect2();

        if (material.option.gradients.length) {
            material.option.gradients.forEach(function(item){
                $('#edit-material-option-modal .gradients option[value="' + item + '"]').attr("selected","selected");
            });    
        }

        bindGradientsSelect2();

        $('#edit-material-option-modal .material-id').val(material.id);
        $('#edit-material-option-modal .material-option-id').val(material.option.id);
        $('#edit-material-option-modal .modal-title span').html(material.name);
        $('#edit-material-option-modal .option-name').val(material.option.name);
        $('#edit-material-option-modal .layer-level').val(material.option.layer_level);
        if (material.option.path.length) {
            $('#edit-material-option-modal .material-option-path').attr('src', material.option.path);
            $('#edit-material-option-modal .material-option-path').show();
        } else {
            $('#edit-material-option-modal .material-option-path').hide();
        }
        if (material.option.blend) {
            $('#edit-material-option-modal .is-blend').attr('checked', 'checked');
        } else {
            $('#edit-material-option-modal .is-blend').removeAttr('checked');
        }
        $('#edit-material-option-modal').modal('show');
        $('.modal-dialog').draggable({ handle: ".modal-header" });
    });

    $('.enable-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//" + api_host + "/api/material/enable/";
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
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-material').removeAttr('disabled');
                    $(elem + ' .enable-material').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                    flashAlertFadeOut();
                }
            }
        });
    });

    $('.disable-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//" + api_host + "/api/material/disable/";
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
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .enable-material').removeAttr('disabled');
                    $(elem + ' .disable-material').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                    flashAlertFadeOut();
                }
            }
        });
    });

    // DELETE MATERIAL
    $('.delete-material').on('click', function(){
        var id = $(this).data('material-id');
        modalConfirm(
            'Remove Material',
            'Are you sure you want to delete the Material?',
            id
        );
    });

    // DELETE MATERIAL OPTION
    $('.delete-material-option').on('click', function(){
        var id = $(this).data('material-option-id');
        modalConfirm(
            'Remove Material Option',
            'Are you sure you want to delete the Material Option?',
            id,
            'confirm-yes',
            'confirmation-modal-material-option'
        );
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/material/delete/";
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
                    $('.flash-alert').hide();
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $('#confirmation-modal').modal('hide');
                    $('.material-' + id).fadeOut();
                    flashAlertFadeOut();
                }
            }
        });
    });

    $('#confirmation-modal-material-option .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/material_option/delete/";
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
                    $('.flash-alert').hide();
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $('#confirmation-modal-material-option').modal('hide');
                    $('.material-option-' + id).fadeOut();
                    flashAlertFadeOut();
                }
            }
        });
    });

    $('#add-material-option-modal .setting-types').on('change', function(){
        var key = $(this).val();
        var items = materialOptionSettings[key];
    });

    $('#edit-material-option-modal .setting-types').on('change', function(){
        var key = $(this).val();
        var items = materialOptionSettings[key];
    });

    function loadItemsToSettingCodes(items, action) {
        if (typeof action == 'undefined') action = 'add';
        $('#' + action + '-material-option-modal .setting-codes').empty(); // clear
        if (items) {
            if (items.length > 0) {
                $.each(items, function(index, item){
                    $('#' + action + '-material-option-modal .setting-codes')
                        .append(
                            $('<option></option>').val(item.code).html(item.value)
                        );
                });
            }
        }
    }

    // Delete Material Image
    $('.delete-material-image').on('click', function(){
        var id = $(this).data('material-id');console.log(id);
        var field = $(this).data('field');console.log(field);
        $('#confirmation-modal .confirm-delete-field').data('field', field);
        modalConfirm('Remove pattern', 'Are you sure you want to delete this image?', id, 'confirm-delete-field');
    });

    // Delete Layer
    $('#confirmation-modal .confirm-delete-field').on('click', function(){
        var id = $(this).data('value');
        var field = $(this).data('field');
        var url = "//" + api_host + "/api/material/deleteImage/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, field: field}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    $('.' + field).fadeOut();
                }
            }
        });
    });

    function bindColorsSelect2()
    {
        $('.colors').select2({
            placeholder: "Select colors",
            multiple: true,
            allowClear: true
        });
    }

    function bindGradientsSelect2()
    {
        $('.gradients').select2({
            placeholder: "Select gradients",
            multiple: true,
            allowClear: true
        });
    }

    bindColorsSelect2();
    bindGradientsSelect2();
});