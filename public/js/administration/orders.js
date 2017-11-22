$(document).ready(function(){

    window.colors = null;
    window.patterns = null;
    window.pa_id = null;
    window.test_size_data = null;
    window.item_sizes = null;
    // window.test_size_data = [{
    //         "size": "XS",
    //         "qx_item_id": 3213
    //     }, {
    //         "size": "S",
    //         "qx_item_id": 3213
    //     }, {
    //         "size": "M",
    //         "qx_item_id": 3213
    //     }, {
    //         "size": "L",
    //         "qx_item_id": 3213
    //     }, {
    //         "size": "XL",
    //         "qx_item_id": 3213
    //     }, {
    //         "size": "2XL",
    //         "qx_item_id": 3214
    //     }, {
    //         "size": "3XL",
    //         "qx_item_id": 3214
    //     }, {
    //         "size": "4XL",
    //         "qx_item_id": 3214
    //     }, {
    //         "size": "5XL",
    //         "qx_item_id": 3214
    //     }];

    window.roster = null;

    function splitRosterToQXItems(){
        var grouped = _.groupBy(window.test_size_data, function(e) {
          return e.qx_item_id;
        });
        console.log('GROUPED');
        console.log(grouped);
        var items = [];
        for(var propt in grouped){
            console.log('FOR LOOP');
            items.push({
                'qx_item_id' : propt,
                'roster' : []
            });
            console.log(propt + ': ' + JSON.stringify(grouped[propt]));
        }
        window.roster.forEach(function(entry) {
            var size = entry.Size;
            var res = _.find(window.test_size_data, function(e){ return e.size == size; });
            var qx_item_id = res['qx_item_id'];
            items.forEach(function(e) {
                if(e.qx_item_id == qx_item_id){
                    e.roster.push(res);
                }
            });
        });
        console.log('ROSTER');
        console.log(window.roster);

        console.log('ITEMS');
        console.log(items);
        return items;
    }

    getColors(function(colors){ window.colors = colors; });
    getPatterns(function(patterns){ window.patterns = patterns; });
    getSizingConfig(function(item_sizes){ window.item_sizes = item_sizes; });

    function getSizingConfig(callback){
        var item_sizes;
        var url = "//api-dev.qstrike.com/api/item_sizes";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                item_sizes = data['item_sizes'];
                if(typeof callback === "function") callback(item_sizes);
            }
        });
    }

    function getColors(callback){
        var colors;
        var url = "//api-dev.qstrike.com/api/colors";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                colors = data['colors'];
                if(typeof callback === "function") callback(colors);
            }
        });
    }

    function getPatterns(callback){
        var patterns;
        var url = "//api-dev.qstrike.com/api/patterns";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                patterns = data['patterns'];
                if(typeof callback === "function") callback(patterns);
            }
        });
    }

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

    $('.delete-order').on('click', function(e){
        e.preventDefault();
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

    $('.bc-display').on('click', function(e){
        e.preventDefault();
        // console.log($(this).data('bc'));
        console.log(JSON.stringify($(this).data('bc')));
    });


    $('.view-roster-details').on('click', function(e){
        e.preventDefault()
        var item = $(this).data('item');
        var roster = $(this).data('roster');
        var rows = '<tr>'

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

        $('#view-order-modal .order-client').val( $(this).data('client') );
        $('#view-order-modal .order-email strong').html($(this).data('email'));
        $('#view-order-modal .order-uniform-type strong').html($(this).data('uniform-type'));
        // Athletic Director
        $('#view-order-modal .order-director-organization strong').html($(this).data('director-organization'));
        $('#view-order-modal .order-director-contact-person strong').html($(this).data('director-contact-person'));

        var bill_id = $(this).data('bill-id');
        var ship_id = $(this).data('ship-id');
        var order_id = $(this).data('order-id');

        $('#view-order-modal .order-bill-organization').val( $(this).data('bill-organization') );
        $('#view-order-modal .order-bill-contact-person').val( $(this).data('bill-contact-person') );
        $('#view-order-modal .order-bill-email').val( $(this).data('bill-email') );
        $('#view-order-modal .order-bill-address').val( $(this).data('bill-address') );
        $('#view-order-modal .order-bill-city').val( $(this).data('bill-city') );
        $('#view-order-modal .order-bill-state').val( $(this).data('bill-state') );
        $('#view-order-modal .order-bill-zip').val( $(this).data('bill-zip') );
        $('#view-order-modal .order-bill-phone').val( $(this).data('bill-phone') );
        $('#view-order-modal .order-bill-fax').val( $(this).data('bill-fax') );

        $('#view-order-modal .order-ship-organization').val( $(this).data('ship-organization') );
        $('#view-order-modal .order-ship-contact-person').val( $(this).data('ship-contact-person') );
        $('#view-order-modal .order-ship-address').val( $(this).data('ship-address') );
        $('#view-order-modal .order-ship-city').val( $(this).data('ship-city') );
        $('#view-order-modal .order-ship-state').val( $(this).data('ship-state') );
        $('#view-order-modal .order-ship-zip').val( $(this).data('ship-zip') );
        $('#view-order-modal .order-ship-phone').val( $(this).data('ship-phone') );
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
                type: "POST",
                data: JSON.stringify(data),
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": atob(headerValue)},
                success: function(response){
                    if (response.success) {
                        console.log("Success! Billing Info is updated.");
                        UpdateShipping(ship_id, order_id);
                    }
                }
            });

            function UpdateShipping(ship_id, order_id){
                var ship_organization = $('.order-ship-organization').val();
                var ship_contact_person = $('.order-ship-contact-person').val();
                var ship_address = $('.order-ship-address').val();
                var ship_city = $('.order-ship-city').val();
                var ship_state = $('.order-ship-state').val();
                var ship_zip = $('.order-ship-zip').val();
                var ship_phone = $('.order-ship-phone').val();

                var data = {
                            id: ship_id,
                            organization: ship_organization,
                            contact: ship_contact_person,
                            address: ship_address,
                            city: ship_city,
                            state: ship_state,
                            zip: ship_zip,
                            phone: ship_phone
                        };
                console.log('Shipping_data' + JSON.stringify(data));
                console.log('order id >>' + order_id);
                $.ajax({
                    url: '//' + api_host + '/api/shipping_info/update',
                    type: "POST",
                    data: JSON.stringify(data),
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                    headers: {"accessToken": atob(headerValue)},
                    success: function(response){
                        if (response.success) {
                            console.log("Success! Shipping Info is updated.");
                            UpdateClientInfo(order_id);
                        }
                    }
                });
            }

            function UpdateClientInfo(order_id){
                var client_name = $('.order-client').val();
                var client_email = $('.order-email').val();

                var data = {
                            id: order_id,
                            client: client_name
                        };
                console.log('Order Data - Client - ' + JSON.stringify(data));
                $.ajax({
                    url: '//' + api_host + '/api/order/update',
                    type: "POST",
                    data: JSON.stringify(data),
                    dataType: "json",
                    crossDomain: true,
                    contentType: 'application/json',
                    headers: {"accessToken": atob(headerValue)},
                    success: function(response){
                        if (response.success) {
                            console.log("Success! Order Info is updated.");
                            document.location.reload();
                        }
                    }
                });
            }
        });
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

$('.pdf-link').on('click', function(e){
    var url = $(this).data('link');
    OpenInNewTab(url);
});

function OpenInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}

$('.send-to-factory').on('click', function(e){
    window.team_colors = null;

    e.preventDefault();
    bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });
    // PostOrder();
    console.log('send to edit');
    var rep_id = $(this).parent().siblings('td').find('.rep-id').val();
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
        // console.log('***** BUILDER CUSTOMIZATIONS ****');
        // console.log(bcx.upper.material_id);
        // console.log(bcx.lower.material_id);
        // console.log(bcx.upper['Neck Trim']['colorObj']);
        window.customizer_material_id = null;
        window.pa_id = entry.id;
        // console.log(JSON.stringify(bcx.lower));
        // if(bcx.upper.material_id !== 'undefined'){
        if('material_id' in bcx.upper){
            window.customizer_material_id = bcx.upper.material_id;
            console.log("HAS UPPER ID");
            console.log(bcx.upper);
        } else {
            window.customizer_material_id = bcx.lower.material_id;
            console.log("HAS LOWER ID");
            console.log(bcx.upper);
        }

        var teamcolors = bcx.team_colors;

        // window.customizer_material_id = bcx.upper.material_id;
        entry.orderPart = {
            "ID" : entry.id,
            "Description" : entry.description,
            "DesignSheet" : '//customizer.prolook.com' + bcx.pdfOrderForm
        };

        getMaterial(function(material){ window.material = material; });
        function getMaterial(callback){
            var material;
            var url = "//api-dev.qstrike.com/api/material/"+window.customizer_material_id;
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    material = data['material'];
                    if(typeof callback === "function") callback(material);
                }
            });
        }

        window.pa = null;
        getPAConfigs(function(parts_aliases){ window.pa = parts_aliases; });

        window.qx_item_ref = window.pa.ref_qstrike_mat_id;
        // entry.orderPart.ItemID = window.qx_item_ref;
        entry.orderPart.ItemID = window.material.item_id;

        function getPAConfigs(callback){
            var parts_aliases;
            var url = "//api-dev.qstrike.com/api/parts_alias/"+window.material.parts_alias_id;
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    parts_aliases = data['part_alias'];
                    if(typeof callback === "function") callback(parts_aliases);
                }
            });
        }

        var questions_valid = applyConfigs(api_order_id);

        console.log(questions_valid);
        entry.orderQuestions = {
            "OrderQuestion": questions_valid
        };

        entry.orderItems = JSON.parse(entry.roster);
        window.roster = entry.orderItems;
        delete entry.orderItems[0].Quantity;
        delete entry.orderItems[0].SleeveCut;

        delete entry.builder_customizations;
        delete entry.description;
        delete entry.factory_order_id;
        delete entry.id;
        delete entry.item_id;
        delete entry.oid;
        delete entry.roster;

        delete entry.order_id;
        delete entry.pid;
        delete entry.questions;

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
            "BillingAddress2": "",
            "BillingCity": billing_city,
            "BillingState": billing_state,
            "BillingZipCode": billing_zip,
            "BillingEmail": billing_email,
            "BillingPhone": billing_phone,
            "APICode": 1,
            "Gender": 0,
            "RepID": rep_id,
            "RepIDEnteredBy": 0,
            "Sport": "All",
            "TeamName": "Wildcats"
        };
        console.log(order);
        // "RepID": 154, Jeremy
        // "RepID": 1148, Geeks
        // var x = _.find(window.item_sizes, function(e){ return e.id == window.material.qx_sizing_config; });
        // window.test_size_data = JSON.parse(x);
        var x = _.find(window.item_sizes, function(e){ return e.id == window.material.qx_sizing_config; });
        window.test_size_data = JSON.parse(x.properties);
        console.log('Window Test Size Data');
        console.log(window.test_size_data);
        // window.test_size_data = JSON.parse(window.material.sizing_config_prop); // uncomment this line on production
        var order_items_split = splitRosterToQXItems();
        var order_parts_split = [];
        console.log('ORDER ITEMS SPLIT');
        console.log(order_items_split);
        order_items_split.forEach(function(entry, i) {
            var x = JSON.parse(JSON.stringify(window.order_parts[0]));
            x.orderPart.ItemID = entry.qx_item_id;
            console.log('ENTRY ROSTER');
            console.log(entry.roster);
            var roster_sizes = _.map(entry.roster, function(e){ return e.size; });
            var roster = [];
            // var dupd_roster = [];
            console.log('ROSTER SIZES');
            console.log(roster_sizes);
            // x.orderItems.forEach(function(y, j) {
            window.roster.forEach(function(y, j) {
                if( _.contains(roster_sizes, y.Size) ){
                    // for(var k = 0; k < y.Quantity; k++){
                    //     dupd_roster.push(y);

                    // add size prefix for socks
                    if( y.Size == "3-5" ){
                        y.Size = "Kids (3-5)";
                    } else if( y.Size == "5-7" ){
                        y.Size = "Youth (5-7)";
                    } else if( y.Size == "8-12" ){
                        y.Size = "Adult (8-12)";
                    } else if( y.Size == "13-14" ){
                        y.Size = "XL (13-14)";
                    }


                    // }
                    // console.log('DUPD ROSTER LENGTH');
                    // console.log(dupd_roster.length);
                    roster.push(y);
                }
            });

            console.log('ROSTER');
            console.log(roster);

            if( roster.length > 0 ){
               x.orderItems = roster;
                order_parts_split.push(x); 
                console.log('HAS ROSTER');
            } else {
                console.log('NO ROSTER');
            }
        });

        var orderEntire = {
            "order": order,
            "orderParts" : order_parts_split
            // "orderParts" : window.order_parts
            // "orderParts" : xparts
        };

    strResult = JSON.stringify(orderEntire);
    console.log(strResult);

    console.log(JSON.stringify(orderEntire['orderParts']));
    // var order_items_split = splitRosterToQXItems();
    // var order_parts_split = [];
    // order_items_split.forEach(function(entry, i) {
    //     var x = window.order_parts[0];
    //     x.orderPart.ID = entry.qx_item_id;
    //     x.orderPart.roster = entry.roster;

    //     order_parts_split.push(x);
    // });
    if(window.material.item_id !== undefined){
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(orderEntire),
            contentType: 'application/json;',
            success: function (data) {
                alert('Order was sent to EDIT!');
                // console.log('return data: ' + JSON.stringify(data));
                var factory_order_id = data[0].OrderID;
                var parts = [];
                $.each(data, function( index, value ) {
                    orderEntire['orderParts'][index]['orderPart']['PID'] = value.PID;
                    console.log(JSON.stringify(orderEntire));
                    parts.push(orderEntire['orderParts'][index]['orderPart']);
                });
                console.log(JSON.stringify(parts));
                updateFOID(order_id, factory_order_id, parts); // UNCOMMENT
                // document.location.reload(); // UNCOMMENT
                // console.log(data[0].OrderID);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //Error Code Here
            }
        });
    } else {
        console.log('Material has no item_id')
    }
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

function upperOrLower(bc){
    var test;
    try { // check if the BC is upper
        test = bc['upper']['Body']['colorObj']['color_code'];
        if(test !== null){
            return 'upper'; 
        }
    }
    catch(err) {
        console.log(err.message);
    }
    return 'lower';
}

function extractPartValues(bc, position){ // get values for builder customizations

    var questionsValues;

    if(position == "upper"){
        questionsValues = extractUpper(bc);
    } else {
        questionsValues = extractLower(bc);
    }

    return questionsValues;

}

function extractUpper(bc){
    var color_code = bc['upper']['Body']['colorObj']['color_code'];
    var color_name = bc['upper']['Body']['colorObj']['name'];
    var body_color = color_name + " " + "(" + color_code + ")";

    try {
        color_code = bc['upper']['Right Sleeve Insert']['colorObj']['color_code'];
        color_name = bc['upper']['Right Sleeve Insert']['colorObj']['name'];
        var right_sleeve_color = color_name + " " + "(" + color_code + ")";
    }
    catch(err) {
        // console.log(err.message);
    }

    try {
        color_code = bc['upper']['Right Arm Trim']['colorObj']['color_code'];
        color_name = bc['upper']['Right Arm Trim']['colorObj']['name'];
        var right_arm_trim_color = color_name + " " + "(" + color_code + ")";
    }
    catch(err) {
        // console.log(err.message);
    }

    try {
        color_code = bc['upper']['Right Side Panel Insert']['colorObj']['color_code'];
        color_name = bc['upper']['Right Side Panel Insert']['colorObj']['name'];
        var right_side_panel_color = color_name + " " + "(" + color_code + ")";
    }
    catch(err) {
        // console.log(err.message);
    }

    try {
        color_code = bc['upper']['Back Body Yoke Insert']['colorObj']['color_code'];
        color_name = bc['upper']['Back Body Yoke Insert']['colorObj']['name'];
        var back_body_yoke_insert_color = color_name + " " + "(" + color_code + ")";
    }
    catch(err) {
        // console.log(err.message);
    }

    try {
        color_code = bc['upper']['Bottom Right Side Panel Insert']['colorObj']['color_code'];
        color_name = bc['upper']['Bottom Right Side Panel Insert']['colorObj']['name'];
        var bottom_right_side_panel_insert_color = color_name + " " + "(" + color_code + ")";
    }
    catch(err) {
        // console.log(err.message);
    }

    try {
        color_code = bc['upper']['Bottom Body Insert']['colorObj']['color_code'];
        color_name = bc['upper']['Bottom Body Insert']['colorObj']['name'];
        var bottom_body_insert_color = color_name + " " + "(" + color_code + ")";
    }
    catch(err) {
        // console.log(err.message);
    }

    try {
        color_code = bc['upper']['Left Sleeve Insert']['colorObj']['color_code'];
        color_name = bc['upper']['Left Sleeve Insert']['colorObj']['name'];
        var left_sleeve_color = color_name + " " + "(" + color_code + ")";
    }
    catch(err) {
        // console.log(err.message);
    }

    try {
        color_code = bc['upper']['Right Shoulder Cowl Insert']['colorObj']['color_code'];
        color_name = bc['upper']['Right Shoulder Cowl Insert']['colorObj']['name'];
        var left_shoulder_cowl_color = color_name + " " + "(" + color_code + ")";
    }
    catch(err) {
        // console.log(err.message);
    }

    try {
        color_code = bc['upper']['Left Shoulder Cowl Insert']['colorObj']['color_code'];
        color_name = bc['upper']['Left Shoulder Cowl Insert']['colorObj']['name'];
        var right_shoulder_cowl_color = color_name + " " + "(" + color_code + ")";
    }
    catch(err) {
        // console.log(err.message);
    }

    try {
        color_code = bc['upper']['Front Neck Trim']['colorObj']['color_code'];
        color_name = bc['upper']['Front Neck Trim']['colorObj']['name'];
        var front_neck_trim_color = color_name + " " + "(" + color_code + ")";
    }
    catch(err) {
        // console.log(err.message);
    }

    try {
        var body_pattern_raw = bc['upper']['Body']['pattern']['pattern_id'];
        var left_sleeve_pattern_raw = bc['upper']['Left Sleeve Insert']['pattern']['pattern_id'];
        var right_sleeve_pattern_raw = bc['upper']['Right Sleeve Insert']['pattern']['pattern_id'];
        var neck_trim_pattern_raw = bc['upper']['Front Neck Trim']['pattern']['pattern_id'];

        var body_pattern = translatePattern(body_pattern_raw);
        var left_sleeve_pattern = translatePattern(left_sleeve_pattern_raw);
        var right_sleeve_pattern = translatePattern(right_sleeve_pattern_raw);
        var neck_trim_pattern = translatePattern(neck_trim_pattern_raw);
    } catch(err) {
        // console.log(err.message);
    }
    var questionsValues = {
        "body_color" : body_color,
        "body_pattern" : body_pattern,
        "right_sleeve_color" : right_sleeve_color,
        "right_arm_trim_color" : right_arm_trim_color,
        "right_side_panel_color" : right_side_panel_color,
        "left_sleeve_color" : left_sleeve_color,
        "right_shoulder_cowl_color" : right_shoulder_cowl_color,
        "left_shoulder_cowl_color" : left_shoulder_cowl_color,
        "front_neck_trim_color" : front_neck_trim_color,
        "right_sleeve_pattern" : right_sleeve_pattern,
        "left_sleeve_pattern" : left_sleeve_pattern,
        "neck_trim_pattern" : neck_trim_pattern,
        "back_body_yoke_insert_color" : back_body_yoke_insert_color,
        "bottom_right_side_panel_insert_color" : bottom_right_side_panel_insert_color,
        "bottom_body_insert_color" : bottom_body_insert_color
    };
    // console.log(questionsValues);
    return questionsValues;
}

function extractLower(bc){

}

function buildQuestions( utpi, questionsValues ){
    var questions = [];

    if( utpi == "fbij" ){
        questions = [{
                "QuestionID": 266,
                "Value": questionsValues.body_pattern
            }, {
                "QuestionID": 267,
                "Value": questionsValues.body_color
            }, {
                "QuestionID": 272,
                "Value": questionsValues.body_pattern
            }, {
                "QuestionID": 273,
                "Value": questionsValues.body_color
            }, {
                "QuestionID": 284,
                "Value": questionsValues.left_sleeve_color
            }, {
                "QuestionID": 289,
                "Value": questionsValues.right_sleeve_color
            }, {
                "QuestionID": 312,
                "Value": questionsValues.left_shoulder_cowl_color
            }, {
                "QuestionID": 306,
                "Value": questionsValues.right_shoulder_cowl_color
            }, {
                "QuestionID": 294,
                "Value": questionsValues.front_neck_trim_color
            }, {
                "QuestionID": 278,
                "Value": questionsValues.left_sleeve_pattern
            }, {
                "QuestionID": 280,
                "Value": questionsValues.right_sleeve_pattern
            }, {
                "QuestionID": 282,
                "Value": questionsValues.neck_trim_pattern
            }];
    } else if( utpi == "fbgj" || utpi == "fbdj" || upti == "fbbj" ){
        questions = [{
                "QuestionID": 14,
                "Value": questionsValues.body_color
            }, {
                "QuestionID": 219,
                "Value": questionsValues.right_sleeve_color
            }, {
                "QuestionID": 38,
                "Value": questionsValues.right_shoulder_cowl_color
            }, {
                "QuestionID": 68,
                "Value": questionsValues.right_arm_trim_color
            }, {
                "QuestionID": 62,
                "Value": questionsValues.right_side_panel_color
            }, {
                "QuestionID": 66, // Insert and Trim Color 3
                "Value": questionsValues.back_body_yoke_insert_color
            }, {
                "QuestionID": 64, // Insert and Trim Color 2
                "Value": questionsValues.bottom_right_side_panel_insert_color
            }, {
                "QuestionID": 18, //    Base Material 2 Color 1
                "Value": questionsValues.bottom_body_insert_color
            }];
        }

    return questions;
}

// Implement Parts Aliases Configs
// window.pa_id = 16;

window.order_parts_b;

// getPAConfigs(function(parts_aliases){ window.pa = parts_aliases; });

// window.qx_item_ref = window.pa.ref_qstrike_mat_id;

function applyConfigs(api_order_id){
    getOrderParts(function(order_parts){ window.order_parts_b = order_parts; });
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
    // use the parts alias config for assign correct values to correct parts
    var sport_id = window.pa.uniform_category_id;
    var type = window.pa.type.toLowerCase();


    var properties = JSON.parse(window.pa.properties);
    var questions = [];


    properties.forEach(function(entry) {
        console.log("<<<<<< ENTRY >>>>>>");
        // console.log(entry);
        console.log(entry.input_type);

        var question_id = parseInt(entry.part_questions);
        var value = null;
        var name = null;
        var color_code = null;
        var color_name = null;
        var color = null;
        var pattern = null;
        var builder_customizations = JSON.parse(window.order_parts_b[0]['builder_customizations']);
        // RESUME HERE
        console.log(builder_customizations);

        if( entry.input_type == "Pattern" ){

            try {
                pattern = builder_customizations[type][entry.part_name]['pattern']['pattern_obj']['name'];
                value = pattern.replace(/[0-9]/g, '');
            } catch(err) {
                console.log(err.message);
            }

        } else if( entry.input_type == "Color" ){

            try {
                color_code = builder_customizations[type][entry.part_name]['colorObj']['color_code'];
                color_name = builder_customizations[type][entry.part_name]['colorObj']['name'];
                if(color_name == "Charcoal Grey"){
                    color_name = "Charcoal Gray";
                }
                value = color_name + " " + "(" + color_code + ")";
            } catch(err) {
                console.log(err.message);
            }

        } else if( entry.input_type == "Material" ){

            try {
                value = entry.edit_part_value;
            } catch(err) {
                console.log(err.message);
            }

        } else if( entry.input_type == "Team_Color" ){
            var idx = 0;

            if(entry.part_questions == "347"){
                value = getQuestionColorValue(builder_customizations, idx);
            } else if(entry.part_questions == "348"){
                idx = 1;
                value = getQuestionColorValue(builder_customizations, idx);
            } else if(entry.part_questions == "349"){
                idx = 2;
                value = getQuestionColorValue(builder_customizations, idx);
            } else if(entry.part_questions == "350"){
                idx = 3;
                value = getQuestionColorValue(builder_customizations, idx);
            } else if(entry.part_questions == "465"){
                idx = 4;
                value = getQuestionColorValue(builder_customizations, idx);
            } else if(entry.part_questions == "466"){
                idx = 5;
                value = getQuestionColorValue(builder_customizations, idx);
            }
        } else if( entry.input_type == "Sock_Color" ){
            var idx = 0;

            try {
                console.log(">>>>>>> BUILDER CUSTOMIZATIONS");
                console.log(builder_customizations['lower'][entry.part_name]);
                color_code = builder_customizations['lower'][entry.part_name]['colorObj']['color_code'];
                color_name = builder_customizations['lower'][entry.part_name]['colorObj']['name'];
                if(color_name == "Charcoal Grey"){
                    color_name = "Charcoal Gray";
                }
                value = translateToSocksColor(color_name, color_code);

            } catch(err) {
                console.log(err.message);
            }
        }

        var data = {
            "QuestionID" : question_id,
            "Value" : value
        };

        questions.push(data);

    });


    console.log(questions);
    return questions;
}

function getQuestionColorValue(builder_customizations, idx){
    try {
        color_code = builder_customizations['team_colors'][idx]['color_code'];
        
        color_name = builder_customizations['team_colors'][idx]['name'];
        if(color_name == "Charcoal Grey"){
            color_name = "Charcoal Gray";
        }
        value = color_name + " " + "(" + color_code + ")";
        return value;
    } catch(err) {
        console.log(err.message);
    }
}

$('.translate-values').on('click', function(e){
    api_order_id = $(this).data('api-order-id');
    applyConfigs(api_order_id);
});

function translateToSocksColor(color_name, color_code){
    // custom colors for crew socks only
    var value = null;
    var socks_color_code = null;

    if(color_name == "Brick Red"){

        socks_color_code = "19-1557TPX";
    } else if(color_name == "Brown"){

        socks_color_code = "18-1031TPX";

    } else if(color_name == "Cardinal"){

        socks_color_code = "19-1934TPX";

    } else if(color_name == "Carolina Blue"){

        socks_color_code = "14-4318TPX";

    } else if(color_name == "Charcoal Gray"){

        socks_color_code = "18-0601TPX";

    } else if(color_name == "Columbia Blue"){

        socks_color_code = "14-4121TPX";

    } else if(color_name == "Dark Purple"){

        socks_color_code = "19-3731TPX";

    } else if(color_name == "Dark Royal Blue"){

        socks_color_code = "19-5057TPX";

    } else if(color_name == "Forest Green"){

        socks_color_code = "19-6311TPX";

    } else if(color_name == "Gold"){

        socks_color_code = "14-0955TPX";

    } else if(color_name == "Gray"){

        socks_color_code = "16-0000TPX";

    } else if(color_name == "Kelly Green"){

        socks_color_code = "15-5534TPX";

    } else if(color_name == "Marlin Blue"){

        socks_color_code = "17-4919TPX";

    } else if(color_name == "Maroon"){

        socks_color_code = "19-1725TPX";

    } else if(color_name == "Navy Blue"){

        socks_color_code = "19-3920TPX";

    } else if(color_name == "Neon Pink"){

        socks_color_code = "17-1937TPX";

    } else if(color_name == "Orange"){

        socks_color_code = "17-1464TPX";

    } else if(color_name == "Pink"){

        socks_color_code = "15-2216TPX";

    } else if(color_name == "Purple"){

        socks_color_code = "19-3642TPX";

    } else if(color_name == "Red"){

        socks_color_code = "19-1763TPX";

    } else if(color_name == "Royal Blue"){

        socks_color_code = "18-4051TPX";

    } else if(color_name == "Seminole"){

        socks_color_code = "19-1940TPX";

    } else if(color_name == "Silver Gray"){

        socks_color_code = "14-4102TPX";

    } else if(color_name == "Tennessee Orange"){

        socks_color_code = "16-1356TPX";

    } else if(color_name == "Texas Orange"){

        socks_color_code = "16-1448TPX";

    } else if(color_name == "Vegas Gold"){

        socks_color_code = "15-1119TPX";

    } else if(color_name == "Yellow"){

        socks_color_code = "13-0858TPX";

    }

    if(socks_color_code != null){
        value = color_name + " " + "(" + color_code + ")" + " " + socks_color_code;
    } else {
        value = color_name + " " + "(" + color_code + ")";
    }
    
    return value;
}

});