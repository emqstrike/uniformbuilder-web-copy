$(document).ready(function(){
    $('.enable-category').on('click', function(){
        var id = $(this).data('category-id');
        var url = "//" + api_host + "/api/category/enable/";
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
                    var elem = '.category-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-category').removeAttr('disabled');
                    $(elem + ' .enable-category').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-category').on('click', function(){
        var id = $(this).data('category-id');
        var url = "//" + api_host + "/api/category/disable/";
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
                    var elem = '.category-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-category').attr('disabled', 'disabled');
                    $(elem + ' .enable-category').removeAttr('disabled');
                    $('.category-' + id).addClass('inactive');
                }
            }
        });
    });

    $('.delete-category').on('click', function(){
        var id = $(this).data('category-id');
        modalConfirm('Remove Uniform Category', 'Are you sure you want to delete the uniform category?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/category/delete/";
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
                    $('.category-' + id).fadeOut();
                }
            }
        });
    });
});
