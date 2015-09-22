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
        <th>Client</th>
        <th>Uniform Type</th>
        <th>Upper Uniform</th>
        <th>Lower Uniform</th>
        <th>Status</th>
        <th>Change Status</th>
        <th></th>
    </tr>
@forelse ($orders as $order)

    <tr class='order-{{ $order->id }} {{ (!$order->active) ? ' inactive' : '' }}'>
        <td>
            <div>{{ $order->client }}</div>
            @if ($order->bill_contact_person)
            <div class="label label-primary">Billing: <strong>{{ $order->bill_contact_person }}</strong> &lt;{{ $order->bill_email }}&gt;</div>
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
            {{ $order->status }}
        </td>
        <td>
            <select class="form-control change-order-status" data-order-id="{{ $order->id }}">
            @foreach ($order_statuses as $status)
                <option value="{{ $status }}"@if ($status == $order->status) selected @endif>{{ ucfirst($status) }}</option>
            @endforeach
            </select>
        </td>
        <td>
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