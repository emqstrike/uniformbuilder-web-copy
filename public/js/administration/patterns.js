$(document).ready(function(){
    $('.show-pattern').on('click', function(){
        var pattern = {};
        pattern.id = $(this).data('pattern-id');
        pattern.name = $(this).data('pattern-name');
        pattern.layer_1 = $(this).data('pattern-layer-one');
        pattern.layer_2 = $(this).data('pattern-layer-two');
        pattern.layer_3 = $(this).data('pattern-layer-three');
        pattern.layer_4 = $(this).data('pattern-layer-four');

        $('#view-pattern-modal .modal-title').text(pattern.name);

        $('#view-pattern-modal .pattern-layer-1').attr('src', pattern.layer_1);
        $('.pattern-layer-1-path').text(pattern.layer_1);
        if (pattern.layer_1) {
            $('.tab-menu-layer-1').show();
        } else {
            $('.tab-menu-layer-1').hide();
        }

        $('#view-pattern-modal .pattern-layer-2').attr('src', pattern.layer_2);
        $('.pattern-layer-2-path').text(pattern.layer_2);
        if (pattern.layer_2) {
            $('.tab-menu-layer-2').show();
        } else {
            $('.tab-menu-layer-2').hide();
        }

        $('#view-pattern-modal .pattern-layer-3').attr('src', pattern.layer_3);
        $('.pattern-layer-3-path').text(pattern.layer_3);
        if (pattern.layer_3) {
            $('.tab-menu-layer-3').show();
        } else {
            $('.tab-menu-layer-3').hide();
        }

        $('#view-pattern-modal .pattern-layer-4').attr('src', pattern.layer_4);
        $('.pattern-layer-4-path').text(pattern.layer_4);
        if (pattern.layer_4) {
            $('.tab-menu-layer-4').show();
        } else {
            $('.tab-menu-layer-4').hide();
        }

        $('.nav-tabs').tab('show');
        $('#view-pattern-modal').modal('show');
    });

    $('.enable-pattern').on('click', function(){
        var id = $(this).data('pattern-id');
        var url = "//" + api_host + "/api/pattern/enable/";
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
                    var elem = '.pattern-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-pattern').removeAttr('disabled');
                    $(elem + ' .enable-pattern').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-pattern').on('click', function(){
        var id = $(this).data('pattern-id');
        var url = "//" + api_host + "/api/pattern/disable/";
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
                    var elem = '.pattern-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-pattern').removeAttr('disabled');
                    $(elem + ' .disable-pattern').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $('.delete-pattern-image').on('click', function(){
        var id = $(this).data('pattern-id');
        modalConfirm('Remove pattern', 'Are you sure you want to delete the pattern?', id);
    });

    $('.delete-pattern-thumbnail').on('click', function(){
        var id = $(this).data('pattern-id');
        $('#confirmation-modal-delete-thumbnail').modal();
    });

    $('#confirmation-modal-delete-thumbnail .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/pattern/deleteThumbnail";
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
                    $('#confirm-delete-pattern-thumbnail').modal('hide');
                    $('.thumbnail_path').fadeOut();
                }
            }
        });
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/pattern/delete/";
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
                    $('.pattern-' + id).fadeOut();
                }
            }
        });
    });

    // Edit Pattern Scripts
    $('#edit-pattern-form').submit(function(){
        new PNotify({
            title: 'Updating pattern',
            text: 'Please wait while we are saving pattern...',
            type: 'success',
            hide: true
        });
        $('.main-content').fadeOut('slow');
    });

    $('.delete-pattern-layer').on('click', function(){
        var id = $(this).data('pattern-id');
        var layer = $(this).data('layer');
        $('#confirmation-modal .confirm-delete-layer').data('layer', layer);
        modalConfirm('Remove pattern', 'Are you sure you want to delete the pattern layer?', id, 'confirm-delete-layer');
    });

    // Delete Layer
    $('#confirmation-modal .confirm-delete-layer').on('click', function(){
        var id = $(this).data('value');
        var layer = $(this).data('layer');
        var url = "//" + api_host + "/api/pattern/deleteLayer/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, layer: layer}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    new PNotify({
                        title: 'Updating pattern',
                        text: 'Please wait while we are saving pattern...',
                        type: 'success',
                        hide: true
                    });
                    $('.' + layer).fadeOut();
                }
            }
        });
    });
});