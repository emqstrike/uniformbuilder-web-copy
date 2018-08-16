$(document).ready(function(){
    $('#design-set-table').on('click', '.enable-design', function(e){
        e.preventDefault();
        var id = $(this).data('design-id');
        var url = "//" + api_host + "/api/design_set/enable/";
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
                    var elem = '.design-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-design').removeAttr('disabled');
                    $(elem + ' .enable-design').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                    window.location.reload();
                }
            }
        });
    });
    $('#design-set-table').on('click', '.disable-design', function(e){
        e.preventDefault();
        var id = $(this).data('design-id');
        var url = "//" + api_host + "/api/design_set/disable/";
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
                    var elem = '.design-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-design').attr('disabled', 'disabled');
                    $(elem + ' .enable-design').removeAttr('disabled');
                    $('.design-' + id).addClass('inactive');
                    window.location.reload();
                }
            }
        });
    });

    $('.delete-design-set-thumbnail-path').on('click', function(){
        var id = $(this).data('design-id');console.log(id);
        var design = $(this).data('design');console.log(design);
        $('#confirmation-modal .confirm-delete-design').data('design', design);
        modalConfirm('Remove design', 'Are you sure you want to delete the design set?', id, 'confirm-delete-design-set');
    });

    // Delete Design Set File
    $('#confirmation-modal .confirm-delete-design-set').on('click', function(){
        var id = $(this).data('value');
        var design_set = $(this).data('design-set');
        var url = "//" + api_host + "/api/design_set/deleteThumbnail/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, design_set: design_set}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    $('.thumbnail_path').fadeOut();
                }
            }
        });
    });

});
