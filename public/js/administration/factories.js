$(document).ready(function(){
    $('.enable-factory').on('click', function(){
        var id = $(this).data('factory-id');
        var url = "//" + api_host + "/api/factory/enable/";
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
                    var elem = '.factory-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-factory').removeAttr('disabled');
                    $(elem + ' .enable-factory').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-factory').on('click', function(){
        var id = $(this).data('factory-id');
        var url = "//" + api_host + "/api/factory/disable/";
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
                    var elem = '.factory-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-factory').attr('disabled', 'disabled');
                    $(elem + ' .enable-factory').removeAttr('disabled');
                    $('.factory-' + id).addClass('inactive');
                }
            }
        });
    });

    $('.delete-factory').on('click', function(){
        var id = $(this).data('factory-id');
        modalConfirm('Remove Factory', 'Are you sure you want to delete the factory?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/factory/delete/";
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
                    $('.factory-' + id).fadeOut();
                }
            }
        });
    });
});
