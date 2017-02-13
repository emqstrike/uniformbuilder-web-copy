$(document).ready(function(){
    $('.enable-model').on('click', function(){
        var id = $(this).data('model-id');
        var url = "//" + api_host + "/api/model/enable/";
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
                    var elem = '.model-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-model').removeAttr('disabled');
                    $(elem + ' .enable-model').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-model').on('click', function(){
        var id = $(this).data('model-id');
        var url = "//" + api_host + "/api/model/disable/";
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
                    var elem = '.model-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-model').attr('disabled', 'disabled');
                    $(elem + ' .enable-model').removeAttr('disabled');
                    $('.model-' + id).addClass('inactive');
                }
            }
        });
    });

    $('.delete-model').on('click', function(){
        var id = $(this).data('model-id');
        modalConfirm('Remove Uniform model', 'Are you sure you want to delete the base model?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/model/delete/";
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
                    $('.model-' + id).fadeOut();
                }
            }
        });
    });
});
