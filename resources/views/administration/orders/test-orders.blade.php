@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
<section class="content">
<!-- <a href="#" class="btn btn-success update-from-factory">TEST</a> -->
<!-- <a href="#" class="btn btn-success updatePart">Update Part</a> -->
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                </div>
                <div class="box-body">
                    <table class='table table-bordered table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Order code</th>
                            <th>Client</th>
                            <th>User ID</th>
                            <th></th>
                            <th>Rep</th>
                            <th>Items</th>
                            <th>Artwork Status</th>
                            <th>Order Status</th>
                            <th>Rep ID</th>
                            <th>FOID</th>
                            <th>Date Submitted</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($orders as $order)

                        <tr class='order-{{ $order->id }} {{ (!$order->active) ? ' inactive' : '' }} '>
                            <td>
                                {{ $order->id }}
                            </td>
                            <td>
                                {{ $order->order_id }}
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
                            <td>
                                <button class='btn btn-default btn-xs btn-info view-order-details'
                                    style="color: #fff;"
                                    data-order-id="{{ $order->id }}"
                                    data-client="{{ $order->client }}"
                                    data-email="{{ $order->email }}"
                                    data-uniform-type="{{ $order->uniform_type }}"
                                    data-director-organization="{{ $order->director_organization }}"
                                    data-director-contact-person="{{ $order->director_contact_person }}"
                                    data-bill-id="{{ $order->bill_id }}"
                                    data-bill-organization="{{ $order->bill_organization }}"
                                    data-bill-contact-person="{{ $order->bill_contact_person }}"
                                    data-bill-email="{{ $order->bill_email }}"
                                    data-bill-address="{{ $order->bill_address }}"
                                    data-bill-city="{{ $order->bill_city }}"
                                    data-bill-state="{{ $order->bill_state }}"
                                    data-bill-zip="{{ $order->bill_zip }}"
                                    data-bill-phone="{{ $order->bill_phone }}"
                                    data-bill-fax="{{ $order->bill_fax }}"
                                    data-ship-id="{{ $order->ship_id }}"
                                    data-ship-organization="{{ $order->ship_organization }}"
                                    data-ship-contact-person="{{ $order->ship_contact_person }}"
                                    data-ship-address="{{ $order->ship_address }}"
                                    data-ship-city="{{ $order->ship_city }}"
                                    data-ship-state="{{ $order->ship_state }}"
                                    data-ship-zip="{{ $order->ship_zip }}"
                                    data-ship-phone="{{ $order->ship_phone }}"
                                    data-ship-email="{{ $order->ship_email }}"
                                    data-status="{{ $order->status }}"
                                    data-upper-front-view="{{ $order->upper_front_thumbnail_path }}"
                                    data-upper-back-view="{{ $order->upper_back_thumbnail_path }}"
                                    data-upper-right-view="{{ $order->upper_right_thumbnail_path }}"
                                    data-upper-left-view="{{ $order->upper_left_thumbnail_path }}">
                                    <!-- View Order Details -->
                                    Info
                                </button>
                            </td>
                            <td></td>
                            <td>
                                @foreach( $order->items as $item )
                                <a href="#" class="btn btn-default btn-xs" style="width: 200px; text-align: left;">{{ $item->item_id }} - {{ $item->description }}</a>
                                <a href="#" class="btn btn-default btn-xs view-roster-details" data-roster="{{ $item->roster }}" data-item="{{ $item->description }}">Roster</a>
                                <a href="#" data-link="{{ $item->design_sheet }}" class="btn btn-default btn-xs pdf-link">PDF</a></br>
                                <!-- <a href="#" class="btn btn-warning bc-display" data-bc="{{ $item->builder_customizations }}">BC</a> -->
                                @endforeach
                            </td>
                            <td class='{{ ($order->artwork_status)=='rejected' ? ' alert alert-danger' : '' }}'>
                                {{ $order->artwork_status }}
                            </td>
                            <td>
                                <select class="form-control change-order-status" data-order-id="{{ $order->id }}">
                                @foreach ($order_statuses as $status)
                                    <option value="{{ $status }}"@if ($status == $order->status) selected @endif>{{ ucfirst($status) }}</option>
                                @endforeach
                                </select>
                            </td>
                            <td>
                                <!-- <input type="number" name="rep-id" class="form-control rep-id" value="154"> -->
                                <select class="form-control rep-id" name="rep-id">
                                    <option value="154">Jeremy Macy (154)</option>
                                    <option value="69">Dan Mullins (69)</option>
                                    <option value="141">Jared Blanchard (141)</option>
                                    <option value="1148">Geeks (1148)</option>
                                </select>
                            </td>
                            <td>
                                {{ $order->factory_order_id }}
                            </td>
                            <td>
                                {{ $order->created_at }}
                            </td>
                            <td>
                                {{-- @if ( $order->artwork_status != "rejected" )
                                ( !isset($order->factory_order_id) ) --}}
                                @if(count($order->items) > 0)
                                <a href="#"
                                    class="btn btn-primary btn-xs send-to-factory"
                                    data-order-id="{{ $order->id }}"
                                    data-api-order-id="{{ $order->order_id }}"
                                    data-client="{{ $order->client }}"
                                    data-ship-contact="{{ $order->ship_contact }}"
                                    data-ship-address="{{ $order->ship_address }}"
                                    data-ship-city="{{ $order->ship_city }}"
                                    data-ship-state="{{ $order->ship_state }}"
                                    data-ship-zip="{{ $order->ship_zip }}"
                                    data-ship-phone="{{ $order->ship_phone }}"
                                    data-ship-email="{{ $order->ship_email }}"
                                    data-bill-contact="{{ $order->bill_contact }}"
                                    data-bill-city="{{ $order->bill_city }}"
                                    data-bill-state="{{ $order->bill_state }}"
                                    data-bill-zip="{{ $order->bill_zip }}"
                                    data-bill-email="{{ $order->bill_email }}"
                                    data-bill-phone="{{ $order->bill_phone }}"
                                    data-bill-address="{{ $order->bill_address }}"
                                    >Send to Edit</a>
                                @endif
                                <!-- <a href="#"
                                    class="btn btn-primary btn-xs translate-values"
                                    data-api-order-id="{{ $order->order_id }}"
                                    >Translate</a>
                                    {{-- @endif --}}
                                    <a href="#" class="btn btn-danger pull-right btn-xs delete-order" data-order-id="{{ $order->id }}" role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Remove
                                    </a> -->
                                {{-- @endif --}}
                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='7'>
                                No Orders
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/administration/orders.js?v={{ config('app.asset_version') }}"></script>
<script type="text/javascript">
$(document).ready(function(){
    // $('.data-table').DataTable({
    //     "paging": true,
    //     "lengthChange": false,
    //     "searching": true,
    //     "ordering": false,
    //     "info": true,
    //     "autoWidth": false
    // });
});
</script>
@endsection