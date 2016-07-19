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
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $('#confirmation-modal').modal('hide');
                    $('.order-' + id).fadeOut();
                }
            }
        });
    });


    $('.view-roster-details').on('click', function(){
        // console.log('Roster details');
        var item = $(this).data('item');
        var roster = $(this).data('roster');
        var rows = '<tr>'
        // console.log(roster);
        $.each(roster, function(i, item){
            rows += '<td>'+item.Size+'</td>';
            rows += '<td>'+item.Number+'</td>';
            rows += '<td>'+item.Name+'</td>';
            rows += '<td>'+item.LastNameApplication+'</td>';
            rows += '<td>'+item.SleeveCut+'</td>';
            rows += '<td>'+item.Quantity+'</td>';
            rows += '</tr>';
        });
        $('#view-roster-modal .modal-title').text(item);
        $('#roster-rows').html('');
        $('#roster-rows').append(rows);
        $('#view-roster-modal').modal('show');
    });


    $('.view-order-details').on('click', function(){
        var orderId = $(this).data('order-id');
        var client = $(this).data('client');

        $('#view-order-modal .order-client strong').html(client);
        $('#view-order-modal .order-email strong').html($(this).data('email'));
        $('#view-order-modal .order-uniform-type strong').html($(this).data('uniform-type'));
        // Athletic Director
        $('#view-order-modal .order-director-organization strong').html($(this).data('director-organization'));
        $('#view-order-modal .order-director-contact-person strong').html($(this).data('director-contact-person'));
        // Billing Information
        // $('#view-order-modal .order-bill-organization strong').html($(this).data('bill-organization'));
        // console.log($(this).data('bill-id'));
        var bill_id = $(this).data('bill-id');

        $('#view-order-modal .order-bill-organization').val( $(this).data('bill-organization') );
        $('#view-order-modal .order-bill-contact-person').val( $(this).data('bill-contact-person') );
        $('#view-order-modal .order-bill-email').val( $(this).data('bill-email') );
        $('#view-order-modal .order-bill-address').val( $(this).data('bill-address') );
        $('#view-order-modal .order-bill-city').val( $(this).data('bill-city') );
        $('#view-order-modal .order-bill-state').val( $(this).data('bill-state') );
        $('#view-order-modal .order-bill-zip').val( $(this).data('bill-zip') );
        $('#view-order-modal .order-bill-phone').val( $(this).data('bill-phone') );
        $('#view-order-modal .order-bill-fax').val( $(this).data('bill-fax') );
        // Shipping Information
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

        $('.update-order-info').on('click', function(){
            console.log('update');

            var bill_organization = $('.order-bill-organization').val();
            var bill_contact_person = $('.order-bill-contact-person').val();
            var bill_email = $('.order-bill-email').val();
            var bill_address = $('.order-bill-address').val();
            var bill_city = $('.order-bill-city').val();
            var bill_state = $('.order-bill-state').val();
            var bill_zip = $('.order-bill-zip').val();
            var bill_phone = $('.order-bill-phone').val();
            var bill_fax = $('.order-bill-fax').val();

            var data = {
                        id: bill_id,
                        organization: bill_organization,
                        contact: bill_contact_person,
                        email: bill_email,
                        address: bill_address,
                        city: bill_email,
                        state: bill_state,
                        zip: bill_zip,
                        phone: bill_phone,
                        fax: bill_fax
                    };
            console.log(data);
            $.ajax({
                url: '//' + api_host + '/api/billing_info/update',
                // url: '//localhost:8888/api/billing_info/update',
                type: "POST",
                data: JSON.stringify(data),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": atob(headerValue)},
                success: function(response){
                    if (response.success) {
                        console.log("Success! Billing Info is updated.");
                        document.location.reload();
                    }
                }
            });
        });
    });

$('.view-builder-customization').on('click', function(){
     api_order_id = $(this).data('api-order-id');
    order_id = $(this).data('order-id');
    client = $(this).data('client');

    ship_contact = $(this).data('ship-contact');
    ship_address = $(this).data('ship-address');
    ship_phone = $(this).data('ship-phone');
    ship_city = $(this).data('ship-city');
    ship_state = $(this).data('ship-state');
    ship_zip = $(this).data('ship-zip');

    billing_contact = $(this).data('bill-contact');
    billing_address = $(this).data('bill-address');
    billing_city = $(this).data('bill-city');
    billing_state = $(this).data('bill-state');
    billing_zip = $(this).data('bill-zip');
    billing_email = $(this).data('bill-email');
    billing_phone = $(this).data('bill-phone');

console.log(order_id);

    window.order_parts = null;
    getOrderParts(function(order_parts){ window.order_parts = order_parts; });



    function getOrderParts(callback){
        var order_parts;
        var url = "//api-dev.qstrike.com/api/order/items/"+api_order_id;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                order_parts = data['order'];
                if(typeof callback === "function") callback(order_parts);
            }
        });
    }

    window.order_parts.forEach(function(entry) {
        entry.orderPart = {
            "ID" : entry.id,
            "ItemID" : entry.item_id,
            "Description" : entry.description,
            "DesignSheet" : entry.design_sheet,
            "BuilderCustomizations" : JSON.stringify(entry.builder_customizations)
        };

        entry.orderQuestions = {};
        entry.orderItems = JSON.parse(entry.roster);

        delete entry.builder_customizations;
        delete entry.description;
        delete entry.factory_order_id;
        delete entry.id;
        delete entry.item_id;
        delete entry.oid;
        delete entry.roster;
        // entry.roster = 
    });
// console.log(window.order_parts);
        var url = 'http://qx.azurewebsites.net/api/Order/PostOrderDetails';

        var order = {
            "Client": client,
            "ShippingAttention": ship_contact,
            "ShippingAddress": ship_address,
            "ShippingPhone": ship_phone,
            "ShippingCity": ship_city,
            "ShippingState": ship_state,
            "ShippingZipCode": ship_zip,
            "BillingAttention": billing_contact,
            "BillingAddress": billing_address,
            "BillingCity": billing_city,
            "BillingState": billing_state,
            "BillingZipCode": billing_zip,
            "BillingEmail": billing_email,
            "BillingPhone": billing_phone,
            "APICode": 1,
            "Gender": 0,
            "RepID": 154,
            "RepIDEnteredBy": 0,
            "Sport": "All"
        };

        var orderEntire =
        {
            "Order": order,
            // "orderParts": orderPartsEntire
            "orderParts" : window.order_parts
        };

    strResult = JSON.stringify(orderEntire);
    console.log( strResult );
});

$('.factory-oid').on('click', function(e){
    e.preventDefault();
});

$('.updatePart').on('click', function(e){

    var questions = [{
            "QuestionID": 16,
            "Value": "TEST"
        }];

    var data = {
        "pid" : 68678,
        "questions" : JSON.stringify(questions)
    };

    $.ajax({
        url: '//api-dev.qstrike.com/api/order/updatePartFromFactory',
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json;',
        // headers: {"accessToken": atob(headerValue)},
        success: function (data) {
            alert('worked');
            //Success
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //Error Code Here
        }
    });
});

$('.send-to-factory').on('click', function(e){

    e.preventDefault();

    // PostOrder();
    console.log('send to edit');
    api_order_id = $(this).data('api-order-id');
    order_id = $(this).data('order-id');
    client = $(this).data('client');

    ship_contact = $(this).data('ship-contact');
    ship_address = $(this).data('ship-address');
    ship_phone = $(this).data('ship-phone');
    ship_city = $(this).data('ship-city');
    ship_state = $(this).data('ship-state');
    ship_zip = $(this).data('ship-zip');

    billing_contact = $(this).data('bill-contact');
    billing_address = $(this).data('bill-address');
    billing_city = $(this).data('bill-city');
    billing_state = $(this).data('bill-state');
    billing_zip = $(this).data('bill-zip');
    billing_email = $(this).data('bill-email');
    billing_phone = $(this).data('bill-phone');


    window.order_parts = null;
    getOrderParts(function(order_parts){ window.order_parts = order_parts; });



    function getOrderParts(callback){
        var order_parts;
        var url = "//api-dev.qstrike.com/api/order/items/"+api_order_id;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                order_parts = data['order'];
                if(typeof callback === "function") callback(order_parts);
            }
        });
    }

    window.order_parts.forEach(function(entry) {
        bcx = JSON.parse(entry.builder_customizations);
        entry.orderPart = {
            "ID" : entry.id,
            "ItemID" : entry.item_id,
            "Description" : entry.description,
            "DesignSheet" : '//customizer.prolook.com'+bcx.pdfOrderForm
        };
        console.log(entry.orderPart)
        var entryQuestions = null;
        getQuestions(function(questions){ entryQuestions = questions; });



        function getQuestions(callback){
            var questions;
            var url = "//qx.azurewebsites.net/api/itemquestion/getitemquestions/"+entry.item_id;
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    questions = data;
                    if(typeof callback === "function") callback(questions);
                }
            });
        }



        var bc = JSON.parse(entry.builder_customizations);
        var color_code = JSON.stringify(bc['upper']['Body']['colorObj']['color_code']).slice(1, -1);
        var color_name = JSON.stringify(bc['upper']['Body']['colorObj']['name']).slice(1, -1);
        var color = color_name + " " + "(" + color_code + ")";

        entry.orderQuestions = {};
        entry.orderItems = JSON.parse(entry.roster);

        delete entry.builder_customizations;
        delete entry.description;
        delete entry.factory_order_id;
        delete entry.id;
        delete entry.item_id;
        delete entry.oid;
        delete entry.roster;

    });

        var url = 'http://qx.azurewebsites.net/api/Order/PostOrderDetails';

        var order = {
            "Client": client,
            "ShippingAttention": ship_contact,
            "ShippingAddress": ship_address,
            "ShippingPhone": ship_phone,
            "ShippingCity": ship_city,
            "ShippingState": ship_state,
            "ShippingZipCode": ship_zip,
            "BillingAttention": billing_contact,
            "BillingAddress": billing_address,
            "BillingCity": billing_city,
            "BillingState": billing_state,
            "BillingZipCode": billing_zip,
            "BillingEmail": billing_email,
            "BillingPhone": billing_phone,
            "APICode": 1,
            "Gender": 0,
            "RepID": 154,
            "RepIDEnteredBy": 0,
            "Sport": "All"
        };
        
        var orderEntire = {
            "Order": order,
            "orderParts" : window.order_parts
        };

    strResult = JSON.stringify(orderEntire);
    console.log(strResult);

    // console.log(orderEntire['orderParts']);

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(orderEntire),
        contentType: 'application/json;',
        success: function (data) {
            alert('worked');
            console.log('return data: ' + JSON.stringify(data));
            var factory_order_id = data[0].OrderID;
            var parts = [];
            $.each(data, function( index, value ) {
                orderEntire['orderParts'][index]['orderPart']['PID'] = value.PID;
                console.log(JSON.stringify(orderEntire));
                parts.push(orderEntire['orderParts'][index]['orderPart']);
            });
            console.log(JSON.stringify(parts));
            updateFOID(order_id, factory_order_id, parts);
            // console.log(data[0].OrderID);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //Error Code Here
        }
    });

});

function updateFOID(id, factory_order_id, parts){
    $.ajax({
        url: '//' + api_host + '/api/order/updateFOID',
        type: "POST",
        data: JSON.stringify({id: id, factory_order_id: factory_order_id}),
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        headers: {"accessToken": atob(headerValue)},
        success: function(response){
            if (response.success) {
                $.each(parts, function( index, value ) {
                    value['factory_order_id'] = factory_order_id;
                });
                updateItemsPID(parts);
                console.log("Success! Factory ID is updated.");
                // document.location.reload();
            }
        }
    });
}

function updateItemsPID(parts){
    $.ajax({
        url: '//' + api_host + '/api/order/updatePID',
        type: "POST",
        data: JSON.stringify(parts),
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        headers: {"accessToken": atob(headerValue)},
        success: function(response){
            if (response.success) {
                console.log("Success! Items PID is updated.");
                document.location.reload();
            }
        }
    });
}

});