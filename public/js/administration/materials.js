
$(document).ready(function(){
    $('.materials').bootstrapTable();

    $('.show-material').on('click', function(){
        var material = {};
        material.id = $(this).data('material-id');
        material.name = $(this).data('material-name');
        material.material_path = $(this).data('material-path');
        material.bump_map_path = $(this).data('bump-map-path');
        material.shadow_path = $(this).data('shadow-path');
        material.highlight_path = $(this).data('highlight-path');
        $('#view-material-modal .modal-title').text(material.name);
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
        $.getJSON(url, function(response){
            if (response.success) {
                var elem = '.material-' + id;
                $('.flash-alert .flash-title').text(response.message);
                $('.flash-alert').addClass('alert-info').fadeIn();
                $(elem + ' .disable-material').removeAttr('disabled');
                $(elem + ' .enable-material').attr('disabled', 'disabled');
                $(elem).removeClass('inactive');
            }
        });
    });

    $('.disable-material').on('click', function(){
        var id = $(this).data('material-id');
        var url = "//" + api_host + "/api/material/disable/";
        $.getJSON(url, function(response){
            if (response.success) {
                var elem = '.material-' + id;
                $('.flash-alert .flash-title').text(response.message);
                $('.flash-alert').addClass('alert-info').fadeIn();
                $(elem + ' .enable-material').removeAttr('disabled');
                $(elem + ' .disable-material').attr('disabled', 'disabled');
                $(elem).addClass('inactive');
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
        $.getJSON(url, function(response){
            if (response.success) {
                $('#confirmation-modal').modal('hide');
                $('.material-' + id).fadeOut();
            }
        });
    });

    function modalConfirm(title, message, value)
    {
        $('#confirmation-modal .modal-title').text(title);
        $('#confirmation-modal .modal-body').text(message);
        $('#confirmation-modal .confirm-yes').data('value', value);
        $('#confirmation-modal').modal('show');
    }
});