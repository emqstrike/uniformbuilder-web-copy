$(document).ready(function(){

    $('.change-order-status').on('change', function(){
        var id = $(this).data('order-id');
        var status = this.value;
        var url = "//" + api_host + "/api/order/updateStatus";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, status: status}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('.flash-alert .flash-title').text(response.message);
                    $('.flash-alert').addClass('alert-info').fadeIn();
                    flashAlertFadeOut();
                }
            }
        });
    });

    $('.delete-order').on('click', function(){
        var id = $(this).data('order-id');
        modalConfirm('Remove Order', 'Are you sure you want to delete the order?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/order/delete/";
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
                    $('.order-' + id).fadeOut();
                    flashAlertFadeOut();
                }
            }
        });
    });

    $('.view-oder-details').on('click', function(){
        var orderId = $(this).data('order-id');
        var client = $(this).data('client');
        console.log('FRONT VIEW: ' + $(this).data('upper-front-view'));
        $('#view-order-modal .order-client strong').html(client);
        $('#view-order-modal .order-email strong').html($(this).data('email'));
        $('#view-order-modal .order-uniform-type strong').html($(this).data('uniform-type'));
        $('#view-order-modal .order-director-organization strong').html($(this).data('director-organization'));
        $('#view-order-modal .order-director-contact-person strong').html($(this).data('director-contact-person'));
        $('#view-order-modal .order-bill-organization strong').html($(this).data('bill-organization'));
        $('#view-order-modal .order-bill-contact-person strong').html($(this).data('bill-contact-person'));
        $('#view-order-modal .order-bill-email strong').html($(this).data('bill-email'));
        $('#view-order-modal .order-ship-organization strong').html($(this).data('ship-organization'));
        $('#view-order-modal .order-ship-contact-person strong').html($(this).data('ship-contact-person'));
        $('#view-order-modal .order-status strong').html($(this).data('status'));
        // Uniform Thumbnails
        $('#view-order-modal #tab-front-view img.upper-uniform').attr('src', $(this).data('upper-front-view'));
        $('#view-order-modal #tab-front-view img.lower-uniform').attr('src', $(this).data('lower-front-view'));
        $('#view-order-modal #tab-back-view img.upper-uniform').attr('src', $(this).data('upper-back-view'));
        $('#view-order-modal #tab-back-view img.lower-uniform').attr('src', $(this).data('lower-back-view'));
        $('#view-order-modal #tab-right-view img.upper-uniform').attr('src', $(this).data('upper-right-view'));
        $('#view-order-modal #tab-right-view img.lower-uniform').attr('src', $(this).data('lower-right-view'));
        $('#view-order-modal #tab-left-view img.upper-uniform').attr('src', $(this).data('upper-left-view'));
        $('#view-order-modal #tab-left-view img.lower-uniform').attr('src', $(this).data('lower-left-view'));
        var url = '//' + api_host + '/api/order/items/' + orderId;
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'JSON',
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#view-order-modal .order-items').html('');
                    $('#view-order-modal .order-items').append('<tr><th>Name</th><th>Number</th><th>Chest</th><th>Inseam</th><th>Waist</th></tr>');
                    $.each(response.order, function(i, item){
                        $('#view-order-modal .order-items').append('<tr><th>' + item.name + '</th><th>' + item.number + '</th><th>' + item.size_chest + '</th><th>' + item.size_inseam + '</th><th>' + item.size_waist + '</th></tr>');
                    });
                    $('#view-order-modal .modal-title').text('Order Items of ' + client);
                    $('#view-order-modal').modal('show');
                }
            }
        });
    });
});
