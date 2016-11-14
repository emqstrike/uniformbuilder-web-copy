@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
<section class="content">
<!-- <a href="#" class="btn btn-success update-from-factory">TEST</a> -->
<!-- <a href="#" class="btn btn-success updatePart">Update Part</a> -->
<div><h1 style="display: inline;">"On Process" Artwork Requests</h1><a href="../artwork_requests" class="btn btn-primary pull-right">View "New" Artworks</a>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($orders as $order)
                        <tr class='order-{{ $order->id }} {{ (!$order->active) ? ' inactive' : '' }}'>
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
                                @if ( isset($order->artworks) )
                                    @foreach( $order->artworks as $art )
                                        <div>Application #{{ $art['code'] }}
                                            <img src="{{ $art['file'] }}" style="height: 30px; width: 30px;">
                                            <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $art['file'] }}">Link</a>
                                            <a href="#" class="upload-mascot">Upload Mascot</a>
                                        </div><br>
                                    @endforeach
                                @endif
                                {{-- @foreach( $order->items as $item )
                                <a href="#" class="btn btn-default btn-xs" style="width: 200px; text-align: left;">{{ $item->item_id }} - {{ $item->description }}</a>
                                <a href="#" class="btn btn-default btn-xs view-roster-details" data-roster="{{ $item->roster }}" data-item="{{ $item->description }}">Roster</a>
                                <a href="#" data-link="{{ $item->design_sheet }}" class="btn btn-default btn-xs pdf-link">PDF</a></br>
                                <!-- <a href="#" class="btn btn-warning bc-display" data-bc="{{ $item->builder_customizations }}">BC</a> -->
                                @endforeach --}}
                            </td>
                            <td>
                                {{-- @if ( !isset($order->factory_order_id) ) --}}
                                @if ( !isset($order->artwork_status) )
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
                                   data-artwork-json="{{ json_encode($order->artworks) }}"
                                   data-user-id="{{ $user_id }}"
                                   >Assign</a>
                                @else
                                <p>Assigned to:</p>
                                @endif
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
<script type="text/javascript" src="/js/administration/artworks.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });
});
</script>
@endsection