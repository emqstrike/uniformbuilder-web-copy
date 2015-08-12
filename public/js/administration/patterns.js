$(document).ready(function(){
    $('.patterns').bootstrapTable();

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
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
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
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .enable-pattern').removeAttr('disabled');
                    $(elem + ' .disable-pattern').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $('.delete-pattern').on('click', function(){
        var id = $(this).data('pattern-id');
        modalConfirm('Remove Material', 'Are you sure you want to delete the Material?', id);
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
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $('#confirmation-modal').modal('hide');
                    $('.pattern-' + id).fadeOut();
                }
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