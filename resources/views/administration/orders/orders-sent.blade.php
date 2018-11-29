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
                    <table class='table table-bordered table-striped table-hover data-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Order code</th>
                            <th>Client</th>
                            <th>User ID</th>
                            <th>QX Edit Rep ID</th>
                            <th>Factory Order ID</th>
                            <th>PDF</th>
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
                                <input type="number" name="rep-id" class="form-control rep-id" value="154" disabled>
                            </td>
                            <td>
                                {{ $order->factory_order_id }}
                            </td>
                            <td>
                                @foreach( $order->items as $item )
                                <a href="#" class="btn btn-default btn-xs" style="width: 200px; text-align: left;">{{ $item->item_id }} - {{ $item->description }}</a>
                                <a href="#" class="btn btn-default btn-xs view-roster-details" data-roster="{{ $item->roster }}" data-item="{{ $item->description }}">Roster</a>
                                <a href="#" data-link="{{ $item->design_sheet }}" class="btn btn-default btn-xs pdf-link">PDF</a></br>
                                <!-- <a href="#" class="btn btn-warning bc-display" data-bc="{{ $item->builder_customizations }}">BC</a> -->
                                @endforeach
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
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/js/administration/orders.js?v={{ config('app.asset_version') }}"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false
    });
});
</script>
@endsection