$(document).ready(function(){
    $('.enable-lining').on('click', function(){
        var id = $(this).data('lining-id');
        var url = "//" + api_host + "/api/lining/enable/";
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
                    var elem = '.lining-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-lining').removeAttr('disabled');
                    $(elem + ' .enable-lining').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-lining').on('click', function(){
        var id = $(this).data('lining-id');
        var url = "//" + api_host + "/api/lining/disable/";
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
                    var elem = '.lining-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-lining').attr('disabled', 'disabled');
                    $(elem + ' .enable-lining').removeAttr('disabled');
                    $('.lining-' + id).addClass('inactive');
                }
            }
        });
    });

    $('.delete-lining').on('click', function(){
        var id = $(this).data('lining-id');
        modalConfirm('Remove Lining', 'Are you sure you want to delete the lining?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/lining/delete/";
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
                    $('.lining-' + id).fadeOut();
                }
            }
        });
    });

    $('.delete-lining-path').on('click', function(){
        var id = $(this).data('lining-id');console.log(id);
        var lining = $(this).data('lining');console.log(lining);
        $('#confirmation-modal .confirm-delete-lining').data('lining', lining);
        modalConfirm('Remove lining', 'Are you sure you want to delete the lining?', id, 'confirm-delete-lining');
    });

    // Delete Lining File
    $('#confirmation-modal .confirm-delete-lining').on('click', function(){
        var id = $(this).data('value');
        var lining = $(this).data('lining');
        var url = "//" + api_host + "/api/lining/deleteLining/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, lining: lining}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    $('.lining_path').fadeOut();
                }
            }
        });
    });
});
