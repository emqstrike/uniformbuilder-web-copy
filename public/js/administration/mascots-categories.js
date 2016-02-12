$(document).ready(function() {

	$('.delete-mascot-category').on('click', function(){
        var id = $(this).data('mascot-category-id');
        console.log("DELETE CATEGORY: "+id);
        modalConfirm('Remove mascot category', 'Are you sure you want to delete the mascot category?', id);
    });

	$('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/mascot_category/delete/";
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
                    $('.mascot-category-' + id).fadeOut();
                }
            }
        });
    });

    $('.toggle-mascot-category').on('click', function(){
        var id = $(this).data('mascot-category-id');
        var url = "//" + api_host + "/api/mascot_category/toggle/";
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
                    var elem = '.material-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                }
            }
        });
    });

});