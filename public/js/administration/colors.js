$(document).ready(function(){
    try{
        bindTypesSelect2();    
    } catch(err){
        console.log(err.message);
    }
    

    function bindTypesSelect2()
    {
        $('.uniform-types').select2({
            placeholder: "Select uniform types",
            multiple: true,
            allowClear: true
        });
    }

    $('.enable-color').on('click', function(){
        var id = $(this).data('color-id');
        var url = "//" + api_host + "/api/color/enable/";
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
                    var elem = '.color-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-color').removeAttr('disabled');
                    $(elem + ' .enable-color').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-color').on('click', function(){
        var id = $(this).data('color-id');
        var url = "//" + api_host + "/api/color/disable/";
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
                    var elem = '.color-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-color').removeAttr('disabled');
                    $(elem + ' .disable-color').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $('.delete-color').on('click', function(){
        var id = $(this).data('color-id');
        modalConfirm('Remove color', 'Are you sure you want to delete the color?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/color/delete/";
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
                    $('.color-' + id).fadeOut();
                }
            }
        });
    });
});