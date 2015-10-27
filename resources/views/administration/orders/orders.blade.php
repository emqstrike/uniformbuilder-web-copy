@extends('administration.main')

@section('content')

@if (Session::has('message'))
<div class="alert alert-info alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>

    <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

<div class="col-md-12">
    <h1>
        <span class="fa fa-building-o"></span>
        Orders
    </h1>
</div>

<div class="row col-md-12">
    <table class='table table-bordered'>
    <tr>
        <th>Order</th>
        <th>Client</th>
        <th>Uniform Type</th>
        <th>Upper Uniform</th>
        <th>Lower Uniform</th>
        <th>Status</th>
        <th></th>
    </tr>
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
            <button class='btn btn-default btn-xs btn-primary view-oder-items' data-order-id="{{ $order->id }}" data-client="{{ $order->client }}">View Order Items</button>
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
    </table>
</div>

@include('administration.orders.order-view-modal')

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/orders.js"></script>
@if (Session::has('message'))
<script type="text/javascript">
$(document).ready(function(){
    flashAlertFadeOut();
});
</script>
@endif
@endsection