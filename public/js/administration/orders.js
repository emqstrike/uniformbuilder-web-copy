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

    $('.view-oder-details').on('click', function(){
        var orderId = $(this).data('order-id');
        var client = $(this).data('client');

        $('#view-order-modal .order-client strong').html(client);
        $('#view-order-modal .order-email strong').html($(this).data('email'));
        $('#view-order-modal .order-uniform-type strong').html($(this).data('uniform-type'));
        // Athletic Director
        $('#view-order-modal .order-director-organization strong').html($(this).data('director-organization'));
        $('#view-order-modal .order-director-contact-person strong').html($(this).data('director-contact-person'));
        // Billing Information
        $('#view-order-modal .order-bill-organization strong').html($(this).data('bill-organization'));
        $('#view-order-modal .order-bill-contact-person strong').html($(this).data('bill-contact-person'));
        $('#view-order-modal .order-bill-email strong').html($(this).data('bill-email'));
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
    });

$('.view-builder-customization').on('click', function(){
    var data = $(this).data('builder-customization');
    var builder_customization = data.replace(/\\/g, '');
    var trimmed_str = builder_customization.substring(1, builder_customization.length-1);
    var json = JSON.parse(trimmed_str);
    console.dir(json);
});

$('.send-to-factory').on('click', function(e){

    e.preventDefault();

    // PostOrder();

    data = $(this).data('order-id');
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

    // function PostOrder() {

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
            "RepID": 1355,
            "RepIDEnteredBy": 0,
            "Sport": "All"
        };

        var orderPart = {
            "ItemID": 455,
            "Description": "Arizona Jersey",
            "DesignSheet": "test.png"
        };


        var orderQuestionValue = [{
            "QuestionID": 16,
            "Value": "Dazzle"
        }];

        var orderQuestions = {
            "orderQuestion": orderQuestionValue
        };



        var orderItems = [{
            "Size": "2XL",
            "Number": "22",
            "Name": "Lee",
            "LastNameApplication": "Directly to Jersey",
            "Sample": 0
            },{
            "Size" : "1XL",
            "Number" : "21",
            "Name" : "Brown",
            "LastNameApplication": "Directly to Jersey",
            "Sample": 0     
        }];



        var orderPartsEntire = [{
            "orderPart": orderPart,
            "orderQuestions": orderQuestions,
            "orderItems": orderItems
        }];


        var orderEntire =
        {
            "Order": order,
            "orderParts": orderPartsEntire
        };


    strResult = JSON.stringify(orderEntire);

    // console.log(orderEntire);
    // $("#divResult").html(strResult);

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(orderEntire),
        contentType: 'application/json;',
        success: function (data) {
            alert('worked');
            console.log(data);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //Error Code Here
        }
    });

    // // # -----------------------------------------------

    // var url = 'http://qx.azurewebsites.net/api/Order';

    // var order = {
    //     "RepID": 1355,
    //     "RepIDEnteredBy": 0,
    //     "Sport": "All",
    //     "Gender": 0,
    //     "Client": "Jethro Test",
    //     "TeamName": "Wildcats",
    //     "HowDidTheyHearAboutProLook": "google search"
    // };

    // $.ajax({
    //     url: url,
    //     type: "POST",
    //     data: JSON.stringify(order),
    //     contentType: 'application/json;',
    //     success: function (data) {
    //         alert('worked');
    //     },
    //     error: function (xhr, ajaxOptions, thrownError) {
    //         //Error Code Here
    //     }
    // });

    // // # -----------------------------------------------

//     orderData = {};

//     data = $(this).data('order-id');
//     client = $(this).data('client');

//     ship_contact = $(this).data('ship-contact');
//     ship_address = $(this).data('ship-address');
//     ship_phone = $(this).data('ship-phone');
//     ship_city = $(this).data('ship-city');
//     ship_state = $(this).data('ship-state');
//     ship_zip = $(this).data('ship-zip');

//     billing_contact = $(this).data('bill-contact');
//     billing_address = $(this).data('bill-address');
//     billing_city = $(this).data('bill-city');
//     billing_state = $(this).data('bill-state');
//     billing_zip = $(this).data('bill-zip');
//     billing_email = $(this).data('bill-email');
//     billing_phone = $(this).data('bill-phone');

//     orderData['Client'] = client;
//     orderData['ShippingAttention'] = ship_contact;
//     orderData['ShippingAddress'] = ship_address;
//     orderData['ShippingPhone'] = ship_phone;
//     orderData['ShippingCity'] = ship_city;
//     orderData['ShippingState'] = ship_state;
//     orderData['ShippingZipCode'] = ship_zip;

//     orderData['BillingAttention'] = billing_contact;
//     orderData['BillingAddress'] = billing_address;
//     orderData['BillingCity'] = billing_city;
//     orderData['BillingState'] = billing_state;
//     orderData['BillingZipCode'] = billing_zip;
//     orderData['BillingEmail'] = billing_email;
//     orderData['BillingPhone'] = billing_phone;

//     orderData['APICode'] = 1;
//     orderData['Gender'] = 0;
//     orderData['RepID'] = 1355;
//     orderData['RepIDEnteredBy'] = 0;
//     orderData['Sport'] = "All";

//     orderParts = {};
//     orderParts['orderPart'] = {};
//     orderParts['orderPart']['ItemID'] = 455;
//     orderParts['orderPart']['Description'] = "Arizona Jersey";
//     orderParts['orderPart']['DesignSheet'] = "designsheet.jpg";

//     orderParts['orderItems'] = [];
//     orderParts['orderItems'][0] = {
//         "Size" : "2XL",
//         "Number" : "22",
//         "Name" : "Lee",
//         "LastNameApplication": "Directly to Jersey",
//         "Sample": 0     
//     };
//     orderParts['orderItems'][1] = {
//         "Size" : "XL",
//         "Number" : "21",
//         "Name" : "Brown",
//         "LastNameApplication": "Directly to Jersey",
//         "Sample": 0     
//     };

//     order = {};
//     order['order'] = orderData;
//     order['orderParts'] = {};
//     order['orderParts']['orderPart'] = orderParts['orderPart'];
//     order['orderParts']['orderItems'] = orderParts['orderItems'];
// console.log(JSON.stringify(order));
//     var url = "//qx.azurewebsites.net/api/Order/PostOrderDetails";
//     $.ajax({
//         url: url,
//         type: "POST",
//         data: JSON.stringify(order),
//         dataType: "json",
//         crossDomain: true,
//         contentType: 'application/json',
//         success: function(response){
//             if (response.success) {
//                 console.log("Order posted to Factory!");
//             }
//         }
//     });
});

});