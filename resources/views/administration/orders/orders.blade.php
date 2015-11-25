@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered'>
                    <thead>
                        <tr>
                            <th>Order</th>
                            <th>Client</th>
                            <th>Uniform Type</th>
                            <th>Upper Uniform</th>
                            <th>Lower Uniform</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($orders as $order)

                        <tr class='order-{{ $order->id }} {{ (!$order->active) ? ' inactive' : '' }}'>
                            <td>
                                <img src="{{ $order->upper_front_thumbnail_path }}" height="70em" />
                                <img src="{{ $order->upper_back_thumbnail_path }}" height="70em" />
                                <br />
                                <small>
                                    ID: <strong>{{ $order->order_id }}</strong>
                                </small>
                            </td>
                            <td>
                                <div>
                                    {{ $order->client }}
                                    <small class='label label-info'>
                                        &lt;{{ $order->email }}&gt;
                                    </small>
                                </div>
                                @if ($order->director_contact_person)
                                <div class="label label-default">Director: <strong>{{ $order->director_contact_person }}</strong> @if (!is_null($order->bill_organization)) of {{ $order->bill_organization }} @endif</div><br>
                                @endif
                                @if ($order->bill_contact_person)
                                <div class="label label-primary">Billing: <strong>{{ $order->bill_contact_person }}</strong> &lt;{{ $order->bill_email }}&gt;</div><br>
                                @endif
                                @if ($order->ship_contact_person)
                                <div class="label label-success">Shipping: <strong>{{ $order->ship_contact_person }}</strong></div>
                                @endif
                            </td>
                            <td>
                                {{ $order->uniform_type }}
                            </td>
                            <td>
                                {{ $order->total_upper_uniforms }}
                            </td>
                            <td>
                                {{ $order->total_lower_uniforms }}
                            </td>
                            <td>
                                <select class="form-control change-order-status" data-order-id="{{ $order->id }}">
                                @foreach ($order_statuses as $status)
                                    <option value="{{ $status }}"@if ($status == $order->status) selected @endif>{{ ucfirst($status) }}</option>
                                @endforeach
                                </select>
                            </td>
                            <td>
                                <button class='btn btn-default btn-xs btn-primary view-oder-details'
                                    data-order-id="{{ $order->id }}"
                                    data-client="{{ $order->client }}"
                                    data-email="{{ $order->email }}"
                                    data-uniform-type="{{ $order->uniform_type }}"
                                    data-director-organization="{{ $order->director_organization }}"
                                    data-director-contact-person="{{ $order->director_contact_person }}"
                                    data-bill-organization="{{ $order->bill_organization }}"
                                    data-bill-contact-person="{{ $order->bill_contact_person }}"
                                    data-bill-email="{{ $order->bill_email }}"
                                    data-ship-organization="{{ $order->ship_organization }}"
                                    data-ship-contact-person="{{ $order->ship_contact_person }}"
                                    data-status="{{ $order->status }}"
                                    data-upper-front-view="{{ $order->upper_front_thumbnail_path }}"
                                    data-upper-back-view="{{ $order->upper_back_thumbnail_path }}"
                                    data-upper-right-view="{{ $order->upper_right_thumbnail_path }}"
                                    data-upper-left-view="{{ $order->upper_left_thumbnail_path }}">
                                    View Order Details
                                </button>
                                <a href="#" class="btn btn-danger pull-right btn-xs delete-order" data-order-id="{{ $order->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
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

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/orders.js"></script>
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