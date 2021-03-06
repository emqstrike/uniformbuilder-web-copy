$(document).ready(function(){
    $('.gradients').bootstrapTable();

    $('.enable-gradient').on('click', function(){
        var id = $(this).data('gradient-id');
        var url = "//" + api_host + "/api/gradient/enable/";
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
                    var elem = '.gradient-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-gradient').removeAttr('disabled');
                    $(elem + ' .enable-gradient').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-gradient').on('click', function(){
        var id = $(this).data('gradient-id');
        var url = "//" + api_host + "/api/gradient/disable/";
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
                    var elem = '.gradient-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-gradient').removeAttr('disabled');
                    $(elem + ' .disable-gradient').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $('.delete-gradient').on('click', function(){
        var id = $(this).data('gradient-id');
        modalConfirm('Remove gradient', 'Are you sure you want to delete the gradient?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/gradient/delete/";
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
                    $('.gradient-' + id).fadeOut();
                }
            }
        });
    });

    // Edit Pattern Scripts
    $('#edit-gradient-form').submit(function(){
        new PNotify({
            title: 'Updating gradient',
            text: 'Please wait while we are saving gradient...',
            type: 'success',
            hide: true
        });
        $('.main-content').fadeOut('slow');
    });
});