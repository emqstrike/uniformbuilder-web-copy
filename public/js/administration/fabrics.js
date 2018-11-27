$(document).ready(function(){

         $('.delete-fabric').on('click', function(e){
            e.preventDefault();
            var id = $(this).data('fabric-id');
            modalConfirm('Remove Fabric', 'Are you sure you want to delete the fabric?', id);
        });

        $('#confirmation-modal .confirm-yes').on('click', function(){
            var id = $(this).data('value');
            console.log(id);
            //var url = "//localhost:8888/api/fabric/delete/";
            var url = "//" + api_host + "/api/fabric/delete/";
            $.ajax({
                url: url,
                type: "POST",
                data: JSON.stringify({id: id}),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                //headers: {"accessToken": atob(headerValue)},
                success: function(response){
                    if (response.success) {
                        new PNotify({
                            title: 'Success',
                            text: response.message,
                            type: 'success',
                            hide: true
                        });
                        $('#confirmation-modal').modal('hide');
                        $('.fabric-' + id).fadeOut();
                    }
                }
            });
        });

            $(document).on('click', '.delete-fabric-image', function(e){
        e.preventDefault();
        var id =  $(this).data('fabric-id');
        var field = $(this).data('field');
        var url = "//" + api_host + "/api/fabric/deleteImage";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, field: field}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    $('.' + field).fadeOut();
                }
            }
        });
    });

    // $('.enable-fabric').on('click', function(){
    //     var id = $(this).data('fabric-id');
    //     var url = "//" + api_host + "/api/fabric/enable/";
    //     $.ajax({
    //         url: url,
    //         type: "POST",
    //         data: JSON.stringify({id: id}),
    //         dataType: "json",
    //         crossDomain: true,
    //         contentType: 'application/json',
    //         headers: {"accessToken": atob(headerValue)},
    //         success: function(response){
    //             if (response.success) {
    //                 var elem = '.fabric-' + id;
    //                 new PNotify({
    //                     title: 'Success',
    //                     text: response.message,
    //                     type: 'success',
    //                     hide: true
    //                 });
    //                 $(elem + ' .disable-fabric').removeAttr('disabled');
    //                 $(elem + ' .enable-fabric').attr('disabled', 'disabled');
    //                 $(elem).removeClass('inactive');
    //             }
    //         }
    //     });
    // });

    // $('.disable-fabric').on('click', function(){
    //     var id = $(this).data('fabric-id');
    //     var url = "//" + api_host + "/api/fabric/disable/";
    //     $.ajax({
    //         url: url,
    //         type: "POST",
    //         data: JSON.stringify({id: id}),
    //         dataType: "json",
    //         crossDomain: true,
    //         contentType: 'application/json',
    //         headers: {"accessToken": atob(headerValue)},
    //         success: function(response){
    //             if (response.success) {
    //                 var elem = '.fabric-' + id;
    //                 new PNotify({
    //                     title: 'Success',
    //                     text: response.message,
    //                     type: 'success',
    //                     hide: true
    //                 });
    //                 $(elem + ' .disable-fabric').attr('disabled', 'disabled');
    //                 $(elem + ' .enable-fabric').removeAttr('disabled');
    //                 $('.fabric-' + id).addClass('inactive');
    //             }
    //         }
    //     });
    // });



    // $('.delete-fabric-path').on('click', function(){
    //     var id = $(this).data('fabric-id');console.log(id);
    //     var fabric = $(this).data('fabric');console.log(fabric);
    //     $('#confirmation-modal .confirm-delete-fabric').data('fabric', fabric);
    //     modalConfirm('Remove fabric', 'Are you sure you want to delete the fabric?', id, 'confirm-delete-fabric');
    // });

    // // Delete Fabric File
    // $('#confirmation-modal .confirm-delete-fabric').on('click', function(){
    //     var id = $(this).data('value');
    //     var fabric = $(this).data('fabric');
    //     var url = "//" + api_host + "/api/fabric/deleteFabric/";
    //     $.ajax({
    //         url: url,
    //         type: "POST",
    //         data: JSON.stringify({id: id, fabric: fabric}),
    //         dataType: "json",
    //         crossDomain: true,
    //         contentType: 'application/json',
    //         headers: {"accessToken": atob(headerValue)},
    //         success: function(response){
    //             if (response.success) {
    //                 $('#confirmation-modal').modal('hide');
    //                 $('.fabric_path').fadeOut();
    //             }
    //         }
    //     });
    // });
});
