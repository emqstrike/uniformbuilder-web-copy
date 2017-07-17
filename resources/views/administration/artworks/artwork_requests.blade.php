@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
<section class="content">
<!-- <a href="#" class="btn btn-success update-from-factory">TEST</a> -->
<!-- <a href="#" class="btn btn-success updatePart">Update Part</a> -->
<div><h1 style="display: inline;">New Artwork Requests</h1><a href="artwork_requests/processing" class="btn btn-primary pull-right">View "Processing" Artworks</a>
</div>
    <div class="row">
        <input type="hidden" class="a-type" value="{{ $account_type }}">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Order code</th>
                            <th>Client</th>
                            <th>User ID</th>
                            <th>Rep</th>
                            <th>Items</th>
                            <th>Notes</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($orders as $order)
                        <tr class='order-{{ $order->id }} {{ (!$order->active) ? ' inactive' : '' }} {{ ($order->artwork_status) == 'rejected' ? ' alert alert-danger' : '' }}'>
                            <td>
                                <!-- <img src="{{ $order->upper_front_thumbnail_path }}" height="70em" />
                                <img src="{{ $order->upper_back_thumbnail_path }}" height="70em" /> -->
                                <!-- <br /> -->
                                <p style="font-size: 17px">{{ $order->order_id }}</p>
                            </td>
                            <td>
                                <div>
                                    {{ $order->client }}
                                </div>
                            </td>
                            <td>
                                <div>
                                    {{ $order->first_name }} {{ $order->last_name }}[{{ $order->user_id }}]
                                </div>
                            </td>
                            <td></td>
                            <td>
                            <table class="table table-striped">
                                <tbody>
                                @if ( isset($order->artworks) )
                                    @foreach( $order->artworks as $art )
                                        <tr>
                                            <td>
                                            Application #{{ $art['code'] }}
                                                <img src="{{ $art['file'] }}" style="height: 30px; width: 30px;">
                                                <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $art['file'] }}">Link</a>
                                            </td>
                                        </tr>
                                    @endforeach
                                @endif
                                </tbody>
                            </table>
                                {{-- @foreach( $order->items as $item )
                                <a href="#" class="btn btn-default btn-xs" style="width: 200px; text-align: left;">{{ $item->item_id }} - {{ $item->description }}</a>
                                <a href="#" class="btn btn-default btn-xs view-roster-details" data-roster="{{ $item->roster }}" data-item="{{ $item->description }}">Roster</a>
                                <a href="#" data-link="{{ $item->design_sheet }}" class="btn btn-default btn-xs pdf-link">PDF</a></br>
                                <!-- <a href="#" class="btn btn-warning bc-display" data-bc="{{ $item->builder_customizations }}">BC</a> -->
                                @endforeach --}}
                            </td>
                            <td>
                            <table class="table table-striped">
                                <tbody>
                                @if ( isset($order->artworks) )
                                    @foreach( $order->artworks as $art )
                                    <tr>
                                        <td>
                                            {{ $art['notes'] }}
                                        </td>
                                    </tr>
                                    @endforeach
                                @endif
                                </tbody>
                            </table>
                            </td>
                            <td>
                                {{ $order->artwork_status }}
                            </td>
                            <td>
                                {{-- @if ( !isset($order->factory_order_id) ) --}}
                                @if ( $order->artwork_status == 'pending' )
                                <a href="#"
                                   class="btn btn-primary btn-xs assign-artwork"
                                   data-order-id="{{ $order->id }}"
                                   data-order-code="{{ $order->order_id }}"
                                   data-client="{{ $order->client }}"
                                   data-ship-contact="{{ $order->ship_contact }}"
                                   data-ship-address="{{ $order->ship_address }}"
                                   data-ship-city="{{ $order->ship_city }}"
                                   data-ship-state="{{ $order->ship_state }}"
                                   data-ship-zip="{{ $order->ship_zip }}"
                                   data-ship-phone="{{ $order->ship_phone }}"
                                   data-bill-contact="{{ $order->bill_contact }}"
                                   data-bill-city="{{ $order->bill_city }}"
                                   data-bill-state="{{ $order->bill_state }}"
                                   data-bill-zip="{{ $order->bill_zip }}"
                                   data-bill-email="{{ $order->bill_email }}"
                                   data-bill-phone="{{ $order->bill_phone }}"
                                   data-bill-address="{{ $order->bill_address }}"
                                   data-artwork-json="{{-- {{ json_encode($order->artworks) }} --}}"
                                   data-user-id="{{ $user_id }}"
                                   >Assign</a>
                                @endif
                                <a href="#" class="btn btn-danger btn-xs reject-artwork" data-user-id="{{ $order->user_id }}" data-order-code="{{ $order->order_id }}">Reject</a>
                                {{-- @endif --}}
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='7'>
                                No New Artwork Requests
                            </td>
                        </tr>

                    @endforelse

                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

@include('administration.orders.order-view-modal')

@include('administration.orders.roster-view-modal')

@include('administration.orders.order-view-json-modal')

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<!-- <script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script> -->
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/js/administration/artworks.js"></script>
<script type="text/javascript">
$(document).ready(function(){

$('.reject-artwork').on('click', function(e){
    e.preventDefault();

    var data = {};
    data.subject = "This order was rejected because of the following reasons: ";
    data.order_code = $(this).data('order-code');
    data.status = "rejected";
    data.type = "ORDERS";
    data.sender_id = "0";
    data.recipient_id = $(this).data('user-id').toString();

    // console.log(data);

    bootbox.prompt({ 
        size: "medium",
        title: "Reject artwork? Enter note.",
        message: "Reject artwork?", 
        buttons: {
            'cancel': {
                label: 'Cancel'
                // className: 'btn-default pull-left'
            },
            'confirm': {
                label: 'Reject Artwork',
                className: 'btn-danger pull-right'
            }
        },
        callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/ 
            if(result){
                bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });
                var order_link = 'http://customizer.prolook.com/order/'+data.order_code;
                var message = "Please edit the order and submit it again using this link: "+order_link;
                data.content = result+". "+message; // message content
                console.log(data);
                insertMessage(data);
            } else {
                console.log('Canceled.');
            }
        }
    });
});

function insertMessage(data){
    var order_code = data.order_code;
    $.ajax({
        url: '//api-dev.qstrike.com/api/message',
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json;',
        success: function (data) {
            // alert(data);
            rejectArtwork(order_code)
            // window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}

function rejectArtwork(order_code){
    var data = {};
    data.order_code = order_code;
    $.ajax({
        url: '//api-dev.qstrike.com/api/artwork_request/reject',
        type: "POST",
        data: JSON.stringify(data),
        contentType: 'application/json;',
        success: function (data) {
            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}


});
</script>
@endsection