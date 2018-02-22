@extends('administration.lte-main')

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h2>
                        Search Result
                    </h2>
                    <center>
                        <div class="col-md-4 col-md-offset-4">
                            <table class="table table-bordered table-striped">
                                <tbody class="order-content">
                                    <tr>
                                        <td><b>Order ID</b></td>
                                        <td class="order-id">{{ $order->id }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Factory Order ID</b></td>
                                        <td>{{ $order->factory_order_id }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Order Code</b></td>
                                        <td class="order-code">{{ $order->order_id }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Client</b></td>
                                        <td>{{ $order->client }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Submitted By:</b></td>
                                        <td>[{{ $order->user_id }}] {{ $order->first_name }} {{ $order->last_name }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Origin</b></td>
                                        <td>{{ $order->origin }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Test Order</b></td>
                                        <td>
                                            @if( $order->test_order )
                                                Yes
                                            @else
                                                No
                                            @endif
                                        </td>
                                    </tr>
                                   <tr>
                                        <td><b>Design Sheet</b></td>
                                        {{-- <td><a href="//customizer.prolook.com/{{ $order->design_sheet }}" class="btn btn-primary pdf-link">Link</a></td> --}}
                                    </tr>
                                    <tr>
                                        <td colspan="2">
                                            <center>
                                                <a href="#" class="btn btn-primary view-order-items">View Order Items</a>
                                            </center>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table table-bordered table-striped">
                                <tbody class="order-items">
                                </tbody>
                            </table>
                        </div>
                    </center>
                </div>
            </div>
        </div>
    </div>
</section>
@endsection

@section('scripts')
<script type="text/javascript">
$(document).ready(function(){
// CLEAR LINE 411 orders.js
/* START OLD VARS */
window.colors = null;
window.item_sizes = null;
window.pa_id = null;
window.patterns = null;
window.post_order_url = 'http://qx.azurewebsites.net/api/Order/PostOrderDetails';
window.roster = [];
window.send_order = false;
window.test_size_data = null;

/* END OLD VARS
-----------------------------------------------------------------*/
/* START OLD FUNCS */
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

// SEND ORDER TO EDIT
$('.generate-data').on('click', function(e){

    e.preventDefault();

    window.order_parts = null;
    window.pa = null;
    window.team_colors = null;

    // console.log('send to edit');
    var rep_id = $(this).parent().siblings('td').find('.rep-id').val();
    var item_id_override = $(this).parent().siblings('td').find('.item-id-override').val();
    api_order_id = $(this).data('api-order-id');
    order_id = $(this).data('order-id');
    client = $(this).data('client');

    // ship_contact = $(this).data('ship-contact');
    // ship_address = $(this).data('ship-address');
    // ship_phone = $(this).data('ship-phone');
    // ship_city = $(this).data('ship-city');
    // ship_state = $(this).data('ship-state');
    // ship_zip = $(this).data('ship-zip');
    // ship_email = $(this).data('ship-email');

    // billing_contact = $(this).data('bill-contact');
    // billing_address = $(this).data('bill-address');
    // billing_city = $(this).data('bill-city');
    // billing_state = $(this).data('bill-state');
    // billing_zip = $(this).data('bill-zip');
    // billing_email = $(this).data('bill-email');
    // billing_phone = $(this).data('bill-phone');

    test_address = '9183 South North Ave. Spartanburg, SC 29301';
    test_contact_no = '(541) 754-1111';
    test_city = 'Spartanburg';
    test_email = 'email@email.com'
    test_state = 'SC';
    test_zip = '29301';

    ship_contact = test_contact_no;
    ship_address = test_address;
    ship_phone = test_contact_no;
    ship_city = test_city;
    ship_state = test_state;
    ship_zip = test_zip;
    ship_email = test_email;

    billing_contact = test_contact_no;
    billing_address = test_address;
    billing_city = test_city;
    billing_state = test_state;
    billing_zip = test_zip;
    billing_email = test_email;
    billing_phone = test_contact_no;

    getOrderParts(function(order_parts){ window.order_parts = order_parts; });

    window.order_parts.forEach(function(entry) {
        builder_customizations = JSON.parse(entry.builder_customizations);
        window.customizer_material_id = null;
        window.pa_id = entry.id;
        if('material_id' in builder_customizations.upper){
            window.customizer_material_id = builder_customizations.upper.material_id;
            // console.log("HAS UPPER ID");
            // console.log(builder_customizations.upper);
        } else {
            window.customizer_material_id = builder_customizations.lower.material_id;
            // console.log("HAS LOWER ID");
            // console.log(builder_customizations.upper);
        }

        var teamcolors = builder_customizations.team_colors;

        entry.orderPart = {
            "ID" : entry.id,
            "Description" : entry.description,
            "DesignSheet" : '//customizer.prolook.com' + builder_customizations.pdfOrderForm
        };

        getMaterial(function(material){ window.material = material; });

        // var error_message = validateMaterialPreReq();
        validateMaterialPreReq();
        // window.error_data = {
        //     'error_message' : error_message['data'],
        //     'order_id' : order_id,
        //     'order_code' : api_order_id,
        //     'client' : client,
        //     'material_id' : window.customizer_material_id,
        //     'type' : 'json'
        // };
        // checkErrors(error_message);

        getPAConfigs(function(parts_aliases){ window.pa = parts_aliases; });

        window.qx_item_ref = window.pa.ref_qstrike_mat_id;
        entry.orderPart.ItemID = window.material.item_id;

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

        var url = window.post_order_url;

        var order = {
            "Client": client,
            "ShippingAttention": ship_contact,
            "ShippingAddress": ship_address,
            "ShippingPhone": ship_phone,
            "ShippingCity": ship_city,
            "ShippingState": ship_state,
            "ShippingZipCode": ship_zip,
            "ShippingEmail": ship_email,
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
        // console.log(order);

        var x = _.find(window.item_sizes, function(e){ return e.id == window.material.qx_sizing_config; });
        window.test_size_data = JSON.parse(x.properties);
        // console.log('Window Test Size Data');
        // console.log(window.test_size_data);
        var order_items_split = splitRosterToQXItems();
        var order_parts_split = [];
        // console.log('ORDER ITEMS SPLIT');
        // console.log(order_items_split);
        order_items_split.forEach(function(entry, i) {
            var x = JSON.parse(JSON.stringify(window.order_parts[0]));
            x.orderPart.ItemID = entry.qx_item_id;
            if( item_id_override ){
                x.orderPart.ItemID = item_id_override;
                console.log('has item id override');
            } else {
                console.log('no item id override');
            }
            // console.log('ENTRY ROSTER');
            // console.log(entry.roster);
            var roster_sizes = _.map(entry.roster, function(e){ return e.size; });
            var roster = [];

            // console.log('ROSTER SIZES');
            // console.log(roster_sizes);

            window.roster.forEach(function(y, j) {
                if( _.contains(roster_sizes, y.Size) ){
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
                    roster.push(y);
                }
            });

            // console.log('ROSTER');
            // console.log(roster);

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
        };

    strResult = JSON.stringify(orderEntire);
    // console.log(strResult);

    // console.log(JSON.stringify(orderEntire['orderParts']));

    // SEND ORDER TO EDIT
    // if(window.send_order){
    //     if(window.material.item_id !== undefined){
    //         $.ajax({
    //             url: url,
    //             type: "POST",
    //             data: JSON.stringify(orderEntire),
    //             contentType: 'application/json;',
    //             success: function (data) {
    //                 alert('Order was sent to EDIT!');
    //                 var factory_order_id = data[0].OrderID;
    //                 var parts = [];
    //                 $.each(data, function( index, value ) {
    //                     orderEntire['orderParts'][index]['orderPart']['PID'] = value.PID;
    //                     console.log(JSON.stringify(orderEntire));
    //                     parts.push(orderEntire['orderParts'][index]['orderPart']);
    //                 });
    //                 console.log(JSON.stringify(parts));
    //                 updateFOID(order_id, factory_order_id, parts); // UNCOMMENT
    //                 // document.location.reload(); // UNCOMMENT
    //                 // console.log(data[0].OrderID);
    //             },
    //             error: function (xhr, ajaxOptions, thrownError) {
    //                 //Error Code Here
    //             }
    //         });
    //     } else {
    //         console.log('Material has no item_id')
    //     }
    // }
});

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

function checkErrors(error_message){
    if(error_message['message'] != ''){
        console.log(window.error_data);
        bootbox.confirm({
            message: '<div><h3>Errors Encountered:</h3></div><div class="text-center">'+error_message['message']+'</div>',
            buttons: {
                confirm: {
                    label: 'Send Report',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Cancel',
                    className: 'btn-danger'
                }
            },
            callback: function (result) {
                if (result) {
                    $.ajax({
                        url: 'http://api-dev.qstrike.com/api/test/slack_message/order_error',
                        type: "POST",
                        data: JSON.stringify(window.error_data),
                        contentType: 'application/json;',
                        success: function (data) {
                            bootbox.dialog({ message: 'Our backend team received the error report.' });
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            bootbox.dialog({ message: "Error in sending error report. That's a lot of error..." });
                        }
                    });
                }
            }
        });
        window.send_order = false;
        return;
    } else {
        window.send_order = true;
        bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });
    }
}

function validateMaterialPreReq(){
    var error_message = '';
    var error_message_data = '';
    if(window.material.item_id == '' || window.material.item_id == 0 || window.material.item_id == undefined){
        error_message += '<div class="alert alert-danger">Invalid Item ID.</div>';
        error_message_data += "Invalid Item ID.";
    }

    if(window.material.price_item_template_id == '' || window.material.price_item_template_id == 0 || window.material.price_item_template_id == undefined){
        error_message += '<div class="alert alert-danger">Invalid Price Item Template Used.</div>';
        error_message_data += "Invalid Price Item Template Used.";
    }

    if(window.material.qx_sizing_config == '' || window.material.qx_sizing_config == 0 || window.material.qx_sizing_config == undefined){
        error_message += '<div class="alert alert-danger">Invalid Size Configuration.</div>';
        error_message_data += "Invalid Size Configuration.";
    }

    if(window.material.parts_alias_id == '' || window.material.parts_alias_id == 0 || window.material.parts_alias_id == undefined){
        error_message += '<div class="alert alert-danger">Invalid Parts Alias Configuration.</div>';
        error_message_data += "Invalid Parts Alias Configuration.";
    }

    var error_info = {
        'message' : error_message,
        'data' : error_message_data,
    }
    // return error_info;
    window.error_data = {
        'error_message' : error_info['data'],
        'order_id' : order_id,
        'order_code' : api_order_id,
        'client' : client,
        'material_id' : window.customizer_material_id,
        'type' : 'json'
    };

    checkErrors(error_info);

}

/* END OLD FUNCS
-----------------------------------------------------------------*/
window.order_id = null;
window.order_items = null;

$('.search-button').on('click', function(e){
    var search_order = $('.search-order').val();
    console.log(search_order);
    window.open("/administration/order_search/"+search_order);
});

$('.pdf-link').on('click', function(e){
    var url = $(this).attr("href");
    e.preventDefault();
    var win = window.open(url, '_blank');
    win.focus();
});

$('.view-order-items').on('click', function(e){
    window.order_id = $('.order-code').text();
    console.log(window.order_id);

    getOrderItems(function(order_items){ window.order_items = order_items; });

    console.log(window.order_items);
    var elem = '';
    window.order_items.forEach(function(item) {
        elem += '<tr><td colspan="4"><b>Style Name</b></td><td colspan="4">'+item.description+'</td></tr>';
        elem += '<tr><td colspan="4"><b>QX Item ID</b></td><td colspan="4">'+item.item_id+'</td></tr>';
        elem += '<tr><td colspan="4"><b>FOID</b></td><td colspan="4">'+item.factory_order_id+'</td></tr>';
        elem += '<tr><td colspan="4"><b>PID</b></td><td colspan="4">'+item.pid+'</td></tr>';
        elem += '<tr><td colspan="8"><center><a href="#" class="btn btn-primary build-question-values">Build Question Values</a></center></td></tr>';
        var z = JSON.parse(item.roster);
        z.forEach(function(en) {
            ctr = parseInt(en.Quantity);
            delete en.Quantity;
            delete en.SleeveCut;
            for(i = 0; i<ctr; i++){
                window.roster.push(en);
            }
        });
        window.roster.forEach(function(i) {
            elem += '<tr><td><b>Size</b></td><td>'+i.Size+'</td>';
            elem += '<td><b>Name</b></td><td>'+i.Name+'</td>';
            elem += '<td><b>LastNameApplication</b></td><td>'+i.LastNameApplication+'</td></tr>';
        });
    });
    $('.order-items').append(elem);
});

function getOrderItems(callback){
    var order_items;
    var url = "//localhost:8888/api/v1-0/order/items/"+window.order_id;
    $.ajax({
        url: url,
        async: false,
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: function(data){
            order_items = data['order_items'];
            if(typeof callback === "function") callback(order_items);
        }
    });
}

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

        console.log(entry.input_type);

        var question_id = parseInt(entry.part_questions);
        var value = null;
        var name = null;
        var color_code = null;
        var color_name = null;
        var color = null;
        var pattern = null;
        var builder_customizations = JSON.parse(window.order_parts_b[0]['builder_customizations']);
        var data_pushed = false;
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

            if( builder_customizations['randomFeeds']['Top Welt'] != undefined ){
                console.log('==== Top Welt ====');
                var z = builder_customizations['randomFeeds']['Top Welt']['layers'];
                console.log("==== Z[0] ====");
                console.log(z[0]);
                if( z.length > 1 ){
                    var val = translateToSocksColor(z[0].colorObj.name, z[0].colorCode);
                    questions.push({
                        "QuestionID" : 403,
                        "Value" : val
                    });
                    var val2 = translateToSocksColor(z[1].colorObj.name, z[1].colorCode);
                    questions.push({
                        "QuestionID" : 433,
                        "Value" : val2
                    });
                    data_pushed = true;
                }
                console.log('==== Z ====');
                console.log(z.length);
            }

            if( builder_customizations['randomFeeds']['Arch'] != undefined ){
                var z = builder_customizations['randomFeeds']['Arch']['layers'];
                console.log('==== Arch Welt ====');
                console.log("==== Z[0] ====");
                console.log(z[0]);
                if( z.length > 1 ){
                    var val = translateToSocksColor(z[0].colorObj.name, z[0].colorCode);
                    questions.push({
                        "QuestionID" : 400,
                        "Value" : val
                    });
                    var val2 = translateToSocksColor(z[1].colorObj.name, z[1].colorCode);
                    questions.push({
                        "QuestionID" : 430,
                        "Value" : val2
                    });
                    data_pushed = true;
                }
            }

            if( builder_customizations['randomFeeds']['Toe'] != undefined ){
                var z = builder_customizations['randomFeeds']['Toe']['layers'];
                console.log('==== Toe ====');
                console.log("==== Z[0] ====");
                console.log(z[0]);
                if( z.length > 1 ){
                    var val = translateToSocksColor(z[0].colorObj.name, z[0].colorCode);
                    questions.push({
                        "QuestionID" : 399,
                        "Value" : val
                    });
                    var val2 = translateToSocksColor(z[1].colorObj.name, z[1].colorCode);
                    questions.push({
                        "QuestionID" : 429,
                        "Value" : val2
                    });
                    data_pushed = true;
                }
            }

            if( builder_customizations['randomFeeds']['Heel'] != undefined ){
                var z = builder_customizations['randomFeeds']['Heel']['layers'];
                console.log('==== Heel ====');
                console.log("==== Z[0] ====");
                console.log(z[0]);
                if( z.length > 1 ){
                    var val = translateToSocksColor(z[0].colorObj.name, z[0].colorCode);
                    questions.push({
                        "QuestionID" : 398,
                        "Value" : val
                    });
                    var val2 = translateToSocksColor(z[1].colorObj.name, z[1].colorCode);
                    questions.push({
                        "QuestionID" : 428,
                        "Value" : val2
                    });
                    data_pushed = true;
                }
            }

            if( builder_customizations['randomFeeds']['Padding'] != undefined ){
                var z = builder_customizations['randomFeeds']['Padding']['layers'];
                console.log('==== Padding ====');
                console.log("==== Z[0] ====");
                console.log(z[0]);
                if( z.length > 1 ){
                    var val = translateToSocksColor(z[0].colorObj.name, z[0].colorCode);
                    questions.push({
                        "QuestionID" : 401,
                        "Value" : val
                    });
                    var val2 = translateToSocksColor(z[1].colorObj.name, z[1].colorCode);
                    questions.push({
                        "QuestionID" : 431,
                        "Value" : val2
                    });
                    data_pushed = true;
                }
            }

            if( builder_customizations['randomFeeds']['Body'] != undefined ){
                var z = builder_customizations['randomFeeds']['Body']['layers'];
                console.log('==== Body ====');
                console.log("==== Z[0] ====");
                console.log(z[0]);
                if( z.length > 1 ){
                    var val = translateToSocksColor(z[0].colorObj.name, z[0].colorCode);
                    questions.push({
                        "QuestionID" : 402,
                        "Value" : val
                    });
                    var val2 = translateToSocksColor(z[1].colorObj.name, z[1].colorCode);
                    questions.push({
                        "QuestionID" : 432,
                        "Value" : val2
                    });
                    data_pushed = true;
                }
            }

            try {
                console.log(">>>>>>> BUILDER CUSTOMIZATIONS");
                console.log(builder_customizations['lower'][entry.part_name]);
                color_code = builder_customizations['lower'][entry.part_name]['colorObj']['color_code'];
                color_name = builder_customizations['lower'][entry.part_name]['colorObj']['name'];

                value = translateToSocksColor(color_name, color_code);

            } catch(err) {
                console.log(err.message);
            }
            
        }

        if( data_pushed == false ){
            var data = {
                "QuestionID" : question_id,
                "Value" : value
            };

            questions.push(data);
        }

    });

    console.log(questions);
    questions = _.uniq(questions, function(item, key, a) { 
        return item.QuestionID;
    });
    return questions;
}

// function drawOrderItems(){
//     elem = '';
//     window.order_items.forEach(function(entry, i) {
//         roster_elem = drawRoster(entry.roster);
//         elem += '<tr><td>Style</td><td>'+entry.description+'</td>';

//     });
// }

// function drawRoster(data){
//     elem = '';
//     roster = JSON.parse(data);
//     roster.forEach(function(entry, i) {
//         elem += '<tr><td>SIZE</td>Quantity</tr>'
//     });
// }

});
</script>
@endsection
