$(document).ready(function(){
    $('.fonts').bootstrapTable();

    $('.enable-font').on('click', function(){
        var id = $(this).data('font-id');
        var url = "//" + api_host + "/api/font/enable/";
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
                    var elem = '.font-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-font').removeAttr('disabled');
                    $(elem + ' .enable-font').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-font').on('click', function(){
        var id = $(this).data('font-id');
        var url = "//" + api_host + "/api/font/disable/";
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
                    var elem = '.font-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-font').removeAttr('disabled');
                    $(elem + ' .disable-font').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $('.delete-font').on('click', function(){
        var id = $(this).data('font-id');
        modalConfirm('Remove font', 'Are you sure you want to delete the font?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/font/delete/";
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
                    $('.font-' + id).fadeOut();
                }
            }
        });
    });

    // Edit Pattern Scripts
    $('#edit-font-form').submit(function(){
        new PNotify({
            title: 'Updating font',
            text: 'Please wait while we are saving font...',
            type: 'success',
            hide: true
        });
        $('.main-content').fadeOut('slow');
    });
});