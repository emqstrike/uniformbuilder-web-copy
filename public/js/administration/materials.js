$(document).ready(function(){
    $('.materials').bootstrapTable();

    $('.show-material').on('click', function(){
        var material = {
            id: $(this).data('material-id'),
            name: $(this).data('material-name'),
            code: $(this).data('material-code'),
            type: $(this).data('material-type'),
            uniform_category: $(this).data('material-uniform-category'),
            base_color: $(this).data('material-base-color'),
            color_code: $(this).data('material-base-color-code'),
            gender: $(this).data('material-gender'),
            lining_type: $(this).data('material-lining-type'),
            material_path: $(this).data('material-path'),
            bump_map_path: $(this).data('bump-map-path'),
            shadow_path: $(this).data('shadow-path'),
            highlight_path: $(this).data('highlight-path')
        };
        $('#view-material-modal .modal-title').text(material.name);
        $('#view-material-modal .modal-material-code').text(material.code);
        $('#view-material-modal .modal-material-type').text(material.type);
        $('#view-material-modal .modal-material-uniform-category').text(material.uniform_category);
        $('#view-material-modal .modal-material-base-color').text(material.base_color);
        $('#view-material-modal .modal-material-base-color-code').text(material.color_code);
        $('#view-material-modal .modal-material-gender').text(material.gender);
        $('#view-material-modal .modal-material-lining-type').text(material.lining_type);
        $('#view-material-modal .material-image').attr('src', material.material_path);
        $('#view-material-modal .bump-map-image').attr('src', material.bump_map_path);
        $('#view-material-modal .shadow-image').attr('src', material.shadow_path);
        $('#view-material-modal .highlight-image').attr('src', material.highlight_path);
        $('.nav-tabs').tab('show');
        $('#view-material-modal').modal('show');
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
                }
            }
        });
    });

    $('.delete-material').on('click', function(){
        var id = $(this).data('material-id');
        modalConfirm('Remove Material', 'Are you sure you want to delete the Material?', id);
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
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $('#confirmation-modal').modal('hide');
                    $('.material-' + id).fadeOut();
                }
            }
        });
    });
});