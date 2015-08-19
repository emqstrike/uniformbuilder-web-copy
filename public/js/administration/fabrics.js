$(document).ready(function(){
    $('.enable-fabric').on('click', function(){
        var id = $(this).data('fabric-id');
        var url = "//" + api_host + "/api/fabric/enable/";
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
                    var elem = '.fabric-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-fabric').removeAttr('disabled');
                    $(elem + ' .enable-fabric').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-fabric').on('click', function(){
        var id = $(this).data('fabric-id');
        var url = "//" + api_host + "/api/fabric/disable/";
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
                    var elem = '.fabric-' + id;
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-fabric').attr('disabled', 'disabled');
                    $(elem + ' .enable-fabric').removeAttr('disabled');
                    $('.fabric-' + id).addClass('inactive');
                }
            }
        });
    });

    $('.delete-fabric').on('click', function(){
        var id = $(this).data('fabric-id');
        modalConfirm('Remove Fabric', 'Are you sure you want to delete the base fabric?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/fabric/delete/";
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
                    $('.fabric-' + id).fadeOut();
                }
            }
        });
    });
});
