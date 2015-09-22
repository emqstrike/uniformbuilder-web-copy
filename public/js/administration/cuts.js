$(document).ready(function(){
    $('.enable-cut').on('click', function(){
        var id = $(this).data('cut-id');
        var url = "//" + api_host + "/api/cut/enable/";
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
                    var elem = '.cut-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-cut').removeAttr('disabled');
                    $(elem + ' .enable-cut').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                    flashAlertFadeOut();
                }
            }
        });
    });

    $('.disable-cut').on('click', function(){
        var id = $(this).data('cut-id');
        var url = "//" + api_host + "/api/cut/disable/";
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
                    var elem = '.cut-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .enable-cut').removeAttr('disabled');
                    $(elem + ' .disable-cut').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                    flashAlertFadeOut();
                }
            }
        });
    });

    $('.delete-cut').on('click', function(){
        var id = $(this).data('cut-id');
        modalConfirm('Remove cut', 'Are you sure you want to delete the cut?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/cut/delete/";
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
                    $('#confirmation-modal').modal('hide');
                    $('.cut-' + id).fadeOut();
                }
            }
        });
    });
});