$(document).ready(function(){
    $('.enable-user').on('click', function(){
        var id = $(this).data('user-id');
        var url = "//" + api_host + "/api/user/enable/";
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
                    var elem = '.user-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-user').removeAttr('disabled');
                    $(elem + ' .enable-user').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-user').on('click', function(){
        var id = $(this).data('user-id');
        var url = "//" + api_host + "/api/user/disable/";
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
                    var elem = '.user-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .enable-user').removeAttr('disabled');
                    $(elem + ' .disable-user').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $('.delete-user').on('click', function(){
        var id = $(this).data('user-id');
        modalConfirm('Remove user', 'Are you sure you want to delete the user?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/user/delete/";
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
                    $('.user-' + id).fadeOut();
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