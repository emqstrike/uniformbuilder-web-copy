@extends('administration-lte-2.lte-main')

@section('styles')
    <style>
        table .btn {
            display: block;
            margin-bottom: 5px;
            width: 100%;
        }

        #filter-container .form-group {
            display: inline-block;
            margin-right: 10px;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Orders')
                        <h1>
                            Orders
                        </h1>
                        <hr>

                        <div id="filter-container" class="pull-left">
                            <div class="form-group">
                                <input type="checkbox" id="unassigned-orders" @if (isset($filters['unassigned'])) checked="checked" @endif>
                                <label>Unassigned</label>
                            </div>

                            <div class="form-group">
                                <input type="checkbox" id="deleted-orders" @if (isset($filters['deleted'])) checked="checked" @endif>
                                <label>Deleted</label>
                            </div>

                            <div class="form-group">
                                <label>DATE RANGE -- From:</label>
                                <input type="text" id="from-date" value="{{ $from_date }}">
                                <label>To:</label>
                                <input type="text" id="to-date" value="{{ $to_date }}">
                            </div>

                            <div class="form-group">
                                <a href="#" class="btn btn-success btn-sm btn-flat date-range-filter">Go</a>
                                <a href="/administration/v1-0/ordersMinified" class="btn btn-danger btn-sm btn-flat reset-date-range-filter">Reset</a>
                            </div>
                        </div>



                        <div class="pull-right">
                            <label>Load Test Orders: </label>
                            <select id="load-test-order">
                                <option value="0" @if($test_order == 0) selected="selected"@endif>No</option>
                                <option value="1" @if($test_order == 1) selected="selected"@endif>Yes</option>
                            </select>
                        </div>
                    </div>

                    <div class="box-body">
                        <table data-toggle='table' class='table data-table table-bordered table-striped orders' id="orders_table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Order Code</th>
                                <th>Client</th>
                                <th>PDF Link</th>
                                <th>Submitted by User</th>
                                <th id="select-filter">Test Order</th>
                                <th>FOID</th>
                                <th>Assigned Sales Rep</th>
                                <th>Date Submitted</th>
                                <th class="col-md-1"></th>
                            </tr>
                        </thead>
                        <tbody>

                        @forelse ($orders as $order)

                        <tr class="tbody-row @if( $order->factory_order_id ) success @endif">
                            <td class="td-order-id">{{ $order->id }}</td>
                            <td class="td-order-code">{{ $order->order_id }}</td>
                            <td class="td-order-client">{{ $order->client }}</td>

                            <td class="td-order-pdf-link">
                                <center>
                                    <a href="#" class="btn btn-info btn-sm btn-flat view-pdf">PDF</a>
                                </center>
                            </td>

                            <td class="td-order-user-id">
                                {{ $order->first_name }} {{ $order->last_name }} &lt;{{ $order->email }}&gt;
                            </td>

                            <td class="td-order-test-order">@if( $order->test_order ) Yes @else No @endif</td>
                            <td class="td-factory-order-id">{{ $order->factory_order_id }}</td>
                            <td class="td-assigned-sales-rep">
                                @if (! $order->factory_order_id)
                                    <select class="form-control rep-id" name="rep-id">
                                        <option value="0">Select Sales Rep</option>
                                    </select>
                                @endif

                                {{ $order->rep_email or '' }}
                            </td>

                            <td class="td-order-date-submitted">{{ $order->created_at }}</td>
                            <td class="col-md-1">
                                @if (! $order->factory_order_id)
                                    @if ($order->deleted_at)
                                        <button class="btn btn-sm btn-flat btn-success view-note" data-order-note="{{ $order->notes }}">View note</button>
                                        <button class="btn btn-sm btn-flat btn-danger undelete-order" data-order-id="{{ $order->id }}">Undelete</button>
                                    @else
                                        <a href="#" class="btn btn-primary btn-sm btn-flat send-to-factory" disabled>
                                            Send to Edit
                                        </a>

                                        <button class="btn btn-sm btn-flat btn-danger delete-order" data-order-id="{{ $order->id }}">Delete</button>
                                    @endif
                                @endif
                            </td>
                        </tr>

                        @empty

                            <tr>
                                <td colspan='6'>
                                    No Orders Found
                                </td>
                            </tr>

                        @endforelse

                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>

    @include('administration-lte-2.orders.modal.delete-order')
    @include('administration-lte-2.orders.modal.note')
@endsection

@section('scripts')

<script type="text/javascript">
$(document).ready(function(){

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": true,
        drawCallback: function () {
            console.log( 'Table redrawn ' );
            $('.rep-id').html('<option value="0">Select Sales Rep</option>');
            $('.rep-id').append(window.sales_reps_dd);
        },
        initComplete: function () {
        this.api().columns('#select-filter').every( function () {
            var column = this;
            var select = $(`<select><option value=""></option></select>`)
                .appendTo( $(column.footer()).empty() )
                .on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );

                    column
                    .search( val ? '^'+val+'$' : '', true, false )
                        .draw();
                } );
            column.data().unique().sort().each( function ( d, j ) {

                select.append( `<option value="`+d+`">`+d+`</option>` );
            } );
        } );
        }
    });

    $('#to-date').datepicker({ format: 'yyyy-mm-dd'});
    $('#from-date').datepicker({ format: 'yyyy-mm-dd' });

    window.roster = [];
    window.item_sizes = null;
    window.test_size_data = null;
    window.sales_reps_dd = null;
    window.order = null;
    window.order_code = null;
    window.order_info = null;

    window.qx_reps_url = "{{ env('QX_REPS_URL') }}";

    getColors(function(colors){ window.colors = colors; });
    getPatterns(function(patterns){ window.patterns = patterns; });
    getSizingConfig(function(item_sizes){ window.item_sizes = item_sizes; });
    // getSalesReps(function(sales_reps){ window.sales_reps = sales_reps; });
    getQXSalesReps(function(sales_reps){ window.sales_reps = sales_reps; });

    var reps_elem = "";
    var active_sales_reps = _.filter(window.sales_reps , function(rep){
        return rep.IsActive == true;
    });

    var unique_active_sales_reps = _.uniq(active_sales_reps, function(x){
        if(x.DealerID === 6){
            return x.RepID;
        }
    });

    var asc_unique_active_sales_reps = _.sortBy(unique_active_sales_reps, function(o) { return o.LastName.toLowerCase(); })

    _.each(asc_unique_active_sales_reps, function(rep) {
        reps_elem +=    `<option value=`+rep.RepID+`>`+rep.LastName+`, `+rep.FirstName+` (`+rep.RepID+`) --- `+rep.UserID+`</option>`;
    });
    // var active_sales_reps = _.filter(window.sales_reps , function(rep){
    //     return rep.active == 1;
    // });

    // _.each(active_sales_reps, function(rep) {
    //     reps_elem +=    `<option value=`+rep.rep_id+`>`+rep.last_name+`, `+rep.first_name+` (`+rep.rep_id+`)</option>`;
    // });

    window.sales_reps_dd = reps_elem;

    // $('.rep-id').append(reps_elem);
    $('#orders_table .rep-id').append(reps_elem);

    console.log(window.qx_reps_url);
    console.log(window.sales_reps_dd);

    $(document).on('click', '.date-range-filter', function(e) {
        e.preventDefault();
        $from = $('#from-date').val();
        $to = $('#to-date').val();
        $test_order = $('#load-test-order').val();

        if ($('#unassigned-orders').is(":checked")) {
            var unassigned = "unassigned=true";
        } else {
            var unassigned = "";
        }

        if ($('#deleted-orders').is(":checked")) {
            var deleted = "&deleted=true";
        } else {
            var deleted = "";
        }

        window.location = "/administration/v1-0/ordersMinified/" + $from + "/" + $to + "/" + $test_order + "?" + unassigned + deleted;
    });

    $(document).on('change', '#load-test-order', function(e) {
        e.preventDefault();
        $test_order = $(this).val();
        $from = $('#from-date').val();
        $to = $('#to-date').val();
        $test_order = $('#load-test-order').val();
        window.location = "/administration/v1-0/ordersMinified/"+$from+"/"+$to+"/"+$test_order;
    });

    $(document).on('change', '.rep-id', function(e) {
        var option_selected = $(this).val();
        var ste_button = $(this).parent().parent().find('.send-to-factory');
        if(option_selected != '0'){
            ste_button.attr('disabled', false);
        } else {
            ste_button.attr("disabled", true);
        }

        console.log('OPTION SELECTED');
        console.log(option_selected);
    });


    $(document).on('click', '.view-pdf', function(e) {
        window.order_code = $(this).parent().parent().parent().find('.td-order-code').text();
        getOrderItem(function(order_info){ window.order_info = order_info; });

        if (typeof window.order_info['items'][0]['builder_customizations'] !== 'undefined') {
            var bc = JSON.parse(window.order_info['items'][0]['builder_customizations']);

            if (typeof bc.pdfOrderForm !== 'undefined') {
                OpenInNewTab(bc.pdfOrderForm);
            } else {
                alert('PDF File not found.');
            }
        } else {
            alert('Unable to find PDF file.');
        }
    });

    $(document).on('click', '.send-to-factory', function(e) {
        if (!$(this).attr('disabled')) {
            window.team_colors = null;

            e.preventDefault();

            var rep_id = parseInt($(this).parent().parent().find('.rep-id').val());
            var item_id_override = $(this).parent().siblings('td').find('.item-id-override').val();
            api_order_id = $(this).parent().parent().find('.td-order-code').text();
            client = $(this).parent().parent().find('.td-order-client').text();
            client = escapeSingleQuotes(client);
            var order_id = $(this).parent().parent().find('.td-order-id').text();

            window.order_id = order_id;
            getOrderDetails(function(order){ window.order = order; });


            ship_contact = window.order.ship_contact_person;
            ship_address = window.order.ship_address;
            ship_phone = window.order.ship_phone;
            ship_city = window.order.ship_city;
            ship_state = window.order.ship_state;
            ship_zip = window.order.ship_zip;
            ship_email = window.order.ship_email;

            billing_contact = window.order.bill_contact_person;
            billing_address = window.order.bill_address;
            billing_city = window.order.bill_city;
            billing_state = window.order.bill_state;
            billing_zip = window.order.bill_zip;
            billing_email = window.order.bill_email;
            billing_phone = window.order.bill_phone;

            console.log('WINDOW ORDER');
            console.log(window.order);


            window.order_parts = null;
            getOrderParts(function(order_parts){ window.order_parts = order_parts; });

            console.log(' ( ( ( WINDOW api_order_id ) ) ) ');
            console.log(api_order_id);

            console.log(' ( ( ( WINDOW order_parts ) ) ) ');
            console.log(window.order_parts);

            function getOrderParts(callback){
                var order_parts;
                var url = "//" +api_host+ "/api/order/items/"+api_order_id;
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
                window.customizer_material_id = null;
                window.pa_id = entry.id;

                console.log("BCX > > > ");
                console.log(bcx)

                if('material_id' in bcx.upper){
                    window.customizer_material_id = bcx.upper.material_id;

                } else {
                    window.customizer_material_id = bcx.lower.material_id;

                }

                console.log("BUILDER CUSTOMIZATION bcx");
                console.log(bcx);
                console.log("CUSTOMIZER MATERIAL ID");
                console.log(window.customizer_material_id);

                var teamcolors = bcx.team_colors;

                var pdfOrderFormValue = bcx.pdfOrderForm;
                var s3regex = 's3-us-west-2.amazonaws.com';
                var found = pdfOrderFormValue.match(s3regex);

                if (found == null) {
                    pdfOrderFormValue = customizer_host+pdfOrderFormValue;
                }

                entry.orderPart = {
                    "ID" : entry.id,
                    "Description" : entry.description,
                    "DesignSheet" : pdfOrderFormValue
                };

                getMaterial(function(material){ window.material = material; });

                function getMaterial(callback){
                    var material;
                    var url = "//" +api_host+ "/api/material/"+window.customizer_material_id;
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

                var error_message = validateMaterialPreReq();
                window.error_message = error_message['message'];


                window.error_data = {
                    'error_message' : error_message['data'],
                    'order_id' : order_id,
                    'order_code' : api_order_id,
                    'client' : client,
                    'material_id' : window.customizer_material_id,
                    'type' : 'json'
                };

                if(error_message['message'] != ''){

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
                                    url: 'http://' +api_host+ '/api/test/slack_message/order_error',
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

                window.pa = null;
                getPAConfigs(function(parts_aliases){ window.pa = parts_aliases; });
                window.qx_item_ref = window.pa.ref_qstrike_mat_id;
                entry.orderPart.ItemID = window.material.item_id;

                function getPAConfigs(callback){
                    var parts_aliases;
                    var url = "//" +api_host+ "/api/parts_alias/"+window.material.parts_alias_id;
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

                entry.orderQuestions = {
                    "OrderQuestion": questions_valid
                };

                var z = JSON.parse(entry.roster);
                console.log("Z>>>");
                console.log(z);
                    z.forEach(function(en) {
                        ctr = parseInt(en.Quantity);
                        delete en.Quantity;
                        en.Cut = en.SleeveCut;
                        delete en.SleeveCut;
                        for(i = 0; i<ctr; i++){
                            try {
                                window.roster.push(en);
                            }
                            catch(err) {
                                console.log(err.message);
                            }
                        }
                    });
                // }
                console.log('WINDOW ROSTER');
                console.log(window.roster);
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

                var url = '//qx.azurewebsites.net/api/Order/PostOrderDetails';

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

                console.log("WINDOW MATERIAL");
                console.log(window.material);
                // SAVED
                var x = _.find(window.item_sizes, function(e){ return e.id == window.material.qx_sizing_config; });
                console.log("X PROPERTIES");
                console.log(x);
                window.test_size_data = JSON.parse(x.properties);


                var order_items_split = splitRosterToQXItems();
                var order_parts_split = [];

                console.log("Window Material");
                console.log(window.material);


                order_items_split.forEach(function(entry, i) {
                    var x = JSON.parse(JSON.stringify(window.order_parts[0]));
                    x.orderPart.ItemID = entry.qx_item_id;
                    if( item_id_override ){
                        x.orderPart.ItemID = item_id_override;

                    } else {

                    }

                    var roster_sizes = _.map(entry.roster, function(e){ return e.size; });
                    var roster = [];
                    window.roster_formatted = false;

                    socks_uniform_category_ids = ["17","33"];

                    window.roster.forEach(function(y, j) {
                        if(!socks_uniform_category_ids.indexOf(window.material.uniform_category_id)){
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
                        } else {
                            if( _.contains(roster_sizes, y.Size) ){
                                ctr = roster_sizes.length;
                                console.log('Y');
                                console.log(y);
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
                        }

                    });

                    if( roster.length > 0 ){
                        x.orderItems = roster;
                        order_parts_split.push(x);

                    } else {

                    }
                });

                var orderEntire = {
                    "order": order,
                    "orderParts" : order_parts_split
                };

            strResult = JSON.stringify(orderEntire);
            console.log('orderEntire>>>');
            console.log(orderEntire);
            console.log('strResult>>>');
            console.log(strResult);



            // SEND ORDER TO EDIT
            if(window.send_order){
                console.log('window send order');
                if(window.material.item_id !== undefined){
                    console.log('window material item_id is defined');
                    $.ajax({
                        url: url,
                        type: "POST",
                        data: JSON.stringify(orderEntire),
                        contentType: 'application/json;',
                        async: false,
                        success: function (data) {
                            alert('Order was sent to EDIT!');
                            var factory_order_id = data[0].OrderID;
                            var parts = [];
                            $.each(data, function( index, value ) {
                                orderEntire['orderParts'][index]['orderPart']['PID'] = value.PID;
                                parts.push(orderEntire['orderParts'][index]['orderPart']);
                            });
                            console.log('FACTORY ORDER ID >>>>>');
                            console.log(factory_order_id);
                            console.log(JSON.stringify(parts));
                            updateFOID(order_id, factory_order_id, parts, rep_id); // UNCOMMENT
                            document.location.reload(); // UNCOMMENT
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            //Error Code Here
                        }
                    });
                } else {

                }
            }
        }
    });

    function escapeSingleQuotes(jsonString) {
        return jsonString.replace(/(['])/g, "\\$1");
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
        return error_info;
    }

    function applyConfigs(api_order_id){
        getOrderParts(function(order_parts){ window.order_parts_b = order_parts; });
        function getOrderParts(callback){
            var order_parts;
            var url = "//" +api_host+ "/api/order/items/"+api_order_id;
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
            console.log("entry part name");
            console.log(entry.part_name);

            console.log("UNIFORM TYPE >>> ");
            console.log(type);

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
            console.log("[ builder_customizations ]");
            console.log(builder_customizations);


            if( entry.input_type == "Pattern" ){

                try {
                    pattern = builder_customizations[type][entry.part_name]['pattern']['pattern_obj']['name'];
                    value = pattern.replace(/[0-9]/g, '');
                } catch(err) {

                }

            } else if( entry.input_type == "Color" ){
                console.log('Color block');
                try {
                    color_code = builder_customizations[type][entry.part_name]['colorObj']['color_code'];
                    color_name = builder_customizations[type][entry.part_name]['colorObj']['name'];
                    if(color_name == "Charcoal Grey"){
                        color_name = "Charcoal Gray";
                    }
                    value = color_name + " " + "(" + color_code + ")";
                    console.log('Color Value:');
                    console.log(value);
                } catch(err) {
                    console.log('Error in Color block !');
                    console.log(err.message);
                }

            } else if( entry.input_type == "Material" ){

                try {
                    value = entry.edit_part_value;
                } catch(err) {

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
                var no_translation = ["260", "261", "262", "406"];
                try {

                    color_code = builder_customizations['lower'][entry.part_name]['colorObj']['color_code'];
                    color_name = builder_customizations['lower'][entry.part_name]['colorObj']['name'];

                    if(!no_translation.indexOf(entry.part_questions)){
                        value = translateToSocksColor(color_name, color_code);
                    } else {
                        value = color_name + " " + "(" + color_code + ")";
                    }

                } catch(err) {

                }

            } else if( entry.input_type == "Random_Feed" ){
                var idx = 0;

                if(builder_customizations['randomFeeds'] > 0){

                    if( builder_customizations['randomFeeds']['Top Welt'] != undefined ){

                        var z = builder_customizations['randomFeeds']['Top Welt']['layers'];


                        if( z.length > 1 ){
                            var val2 = translateToSocksColor(z[1].colorObj.name, z[1].colorCode);
                            questions.push({
                                "QuestionID" : 433,
                                "Value" : val2
                            });
                            data_pushed = true;
                        }

                    }

                    if( builder_customizations['randomFeeds']['Arch'] != undefined ){
                        var z = builder_customizations['randomFeeds']['Arch']['layers'];

                        if( z.length > 1 ){
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

                        if( z.length > 1 ){
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

                        if( z.length > 1 ){
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



                        if( z.length > 1 ){
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





                        if( z.length > 1 ){
                            var val2 = translateToSocksColor(z[1].colorObj.name, z[1].colorCode);


                            questions.push({
                                "QuestionID" : 432,
                                "Value" : val2
                            });
                            data_pushed = true;
                        }
                    }
                } else {

                    blankRandomFeeds = [{
                        "QuestionID" : 428,
                        "Value" : '(Choose Color If Random Feed Is Desired)'
                    },{
                        "QuestionID" : 429,
                        "Value" : '(Choose Color If Random Feed Is Desired)'
                    },{
                        "QuestionID" : 430,
                        "Value" : '(Choose Color If Random Feed Is Desired)'
                    },{
                        "QuestionID" : 431,
                        "Value" : '(Choose Color If Random Feed Is Desired)'
                    },{
                        "QuestionID" : 432,
                        "Value" : '(Choose Color If Random Feed Is Desired)'
                    },{
                        "QuestionID" : 433,
                        "Value" : '(Choose Color If Random Feed Is Desired)'
                    }];

                    blankRandomFeeds.forEach(function(entry) {
                        questions.push(entry);
                    });




                    data_pushed = true;

                }

                try {


                    color_code = builder_customizations['lower'][entry.part_name]['colorObj']['color_code'];
                    color_name = builder_customizations['lower'][entry.part_name]['colorObj']['name'];

                    value = translateToSocksColor(color_name, color_code);

                } catch(err) {

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



        questions = _.uniq(questions, function(item, key, a) {
            return item.QuestionID;
        });


        return questions;
    }




    function splitRosterToQXItems(){
        var grouped = _.groupBy(window.test_size_data, function(e) {
          return e.qx_item_id;
        });

        var items = [];
        for(var propt in grouped){

            items.push({
                'qx_item_id' : propt,
                'roster' : []
            });

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

        return items;
    }

    function getSizingConfig(callback){
        var item_sizes;
        var url = "//" +api_host+ "/api/item_sizes";
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
        var url = "//" +api_host+ "/api/colors";
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
        var url = "//" +api_host+ "/api/patterns";
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

    function getSalesReps(callback){
        var sales_reps;
        var url = "//" + api_host +"/api/sales_reps";

        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                sales_reps = data['sales_reps'];
                if(typeof callback === "function") callback(sales_reps);
            }
        });
    }

    function getQXSalesReps(callback){
        var sales_reps;
        var url = window.qx_reps_url;

        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                sales_reps = data;
                if(typeof callback === "function") callback(sales_reps);
            }
        });
    }

    function updateFOID(id, factory_order_id, parts, rep_id){
        $.ajax({
            url: '//' + api_host + '/api/order/updateFOID',
            type: "POST",
            data: JSON.stringify({id: id, factory_order_id: factory_order_id, sent_to_rep_qx_id: rep_id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            async: false,
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    console.log('UPDATED FOID')
                    console.log(factory_order_id);
                    $.each(parts, function( index, value ) {
                        value['factory_order_id'] = factory_order_id;
                    });
                    updateItemsPID(parts);
                }
            }
        });
    }

    function getOrderDetails(id){
        var url= '//' + api_host + '/api/order/'+window.order_id;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                order = data['order'];
                if(typeof callback === "function") callback(order);
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
            async: false,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {

                    document.location.reload();
                }
            }
        });
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
        }
    }

    function OpenInNewTab(url) {
        var win = window.open(url, '_blank');
    }

    function getOrderItem(){
        var url= '//' + api_host + '/api/order/orderswItems/'+window.order_code;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                order_info = data['order_info'];
                if(typeof callback === "function") callback(order_info);
            }
        });
    }

    $(document).on('click', '.delete-order', function() {
        var orderID = $(this).data('order-id');

        $('#delete-order-modal #order-id').val(orderID);

        $('#delete-order-modal').modal('show');
    });

    $(document).on('click', '#delete-order', function(event) {
        event.preventDefault();

        var orderID = $('#delete-order-modal #order-id').val();
        var note = $('#delete-order-modal #notes').val();

        var data = {
            id: orderID,
            notes: note
        }

        var url = "//" + api_host + "/api/order/delete-with-notes";

        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response) {
                if (response.success == true) {
                    $('#delete-order-modal').modal('hide');
                    $('#delete-order-modal #order-id').val('');
                    $('#delete-order-modal #notes').val('');

                    location.reload();
                }
            }
        });
    });

    $('#delete-order-modal').on('hidden.bs.modal', function (e) {
        $('#delete-order-modal #order-id').val('');
        $('#delete-order-modal #notes').val('');
    });

    $(document).on('click', '.undelete-order', function() {
        var orderID = $(this).data('order-id');

        var url = "//" + api_host + "/api/order/undelete";

        var data = {
            id: orderID
        }

        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response) {
                if (response.success == true) {
                    location.reload();
                }
            }
        });
    });

    $(document).on('click', '.view-note', function() {
        $('#note-modal #notes').val('');
        var note = $(this).data('order-note');

        $('#note-modal #notes').val(note);
        $('#note-modal').modal('show');
    });
});
</script>
@endsection
