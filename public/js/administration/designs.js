$(document).ready(function(){
    $('.enable-design').on('click', function(){
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
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-design').removeAttr('disabled');
                    $(elem + ' .enable-design').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-design').on('click', function(){
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
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    $(elem + ' .disable-design').attr('disabled', 'disabled');
                    $(elem + ' .enable-design').removeAttr('disabled');
                    $('.design-' + id).addClass('inactive');
                }
            }
        });
    });

    $('.delete-design').on('click', function(){
        var id = $(this).data('design-id');
        modalConfirm('Remove Fabric', 'Are you sure you want to delete the design?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/design_set/delete/";
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
                    $('.design-' + id).fadeOut();
                }
            }
        });
    });

    $('.delete-design-path').on('click', function(){
        var id = $(this).data('design-id');console.log(id);
        var design = $(this).data('design');console.log(design);
        $('#confirmation-modal .confirm-delete-design').data('design', design);
        modalConfirm('Remove design', 'Are you sure you want to delete the design?', id, 'confirm-delete-design');
    });

    // Delete Design Set File
    $('#confirmation-modal .confirm-delete-fabric').on('click', function(){
        var id = $(this).data('value');
        var fabric = $(this).data('fabric');
        var url = "//" + api_host + "/api/fabric/deleteFabric/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, fabric: fabric}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    $('.fabric_path').fadeOut();
                }
            }
        });
    });

});
