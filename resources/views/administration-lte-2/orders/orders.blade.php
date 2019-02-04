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

                            <button class="btn btn-success btn-sm btn-flat submit-selected-order-to-edit">Send selected orders to edit</button>
                        </div>
                    </div>

                    <div class="box-body">
                        <table data-toggle='table' class='table data-table table-bordered table-striped orders' id="orders_table">
                        <thead>
                            <tr>
                                <th></th>
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
                            <td>
                                @if (! $order->factory_order_id)
                                    <input type="checkbox" class="select-order-checkbox" disabled="disabled" data-order-id="{{ $order->id }}">
                                @endif
                            </td>

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
    <script type="text/javascript" src="/js/administration-lte-2/orders/orders.js"></script>

    <script type="text/javascript">
        window.qx_reps_url = "{{ env('QX_REPS_URL') }}";
    </script>
@endsection
