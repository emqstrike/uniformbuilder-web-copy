@extends('shopping-cart.layout')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="page-header">Confirm Order</h1>

            @include('templates.flash')

            <div class="row">
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td colspan="2" class="bg-info text-info">Client Information</td>
                                </tr>
                                <tr>
                                    <td>Full name</td>
                                    <td>{{ $client_information->full_name }}</td>
                                </tr>
                                <tr>
                                    <td>Athletic Director</td>
                                    <td>{{ $client_information->athletic_director }}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{{ $client_information->email }}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td>{{ $client_information->phone_number }}</td>
                                </tr>
                                <tr>
                                    <td>Fax</td>
                                    <td>{{ $client_information->fax }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="panel panel-default">
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td colspan="2" class="bg-info text-info">Billing Information</td>
                                </tr>
                                <tr>
                                    <td>Full name</td>
                                    <td>{{ $billing_information->full_name }}</td>
                                </tr>
                                <tr>
                                    <td>Athletic Director</td>
                                    <td>{{ $billing_information->athletic_director }}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{{ $billing_information->email }}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td>{{ $billing_information->phone_number }}</td>
                                </tr>
                                <tr>
                                    <td>Fax</td>
                                    <td>{{ $billing_information->fax }}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="bg-info text-info">Billing Address</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{{ $billing_information->address }}</td>
                                </tr>
                                <tr>
                                    <td>State</td>
                                    <td>{{ $billing_information->state }}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{{ $billing_information->city }}</td>
                                </tr>
                                <tr>
                                    <td>Zip Code</td>
                                    <td>{{ $billing_information->zip }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="panel panel-default">
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td colspan="2" class="bg-info text-info">Shipping Information</td>
                                </tr>
                                <tr>
                                    <td>Full name</td>
                                    <td>{{ $shipping_information->full_name }}</td>
                                </tr>
                                <tr>
                                    <td>Athletic Director</td>
                                    <td>{{ $shipping_information->athletic_director }}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{{ $shipping_information->email }}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td>{{ $shipping_information->phone_number }}</td>
                                </tr>
                                <tr>
                                    <td>Fax</td>
                                    <td>{{ $shipping_information->fax }}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="bg-info text-info">Shipping Address</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{{ $shipping_information->address }}</td>
                                </tr>
                                <tr>
                                    <td>State</td>
                                    <td>{{ $shipping_information->state }}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{{ $shipping_information->city }}</td>
                                </tr>
                                <tr>
                                    <td>Zip Code</td>
                                    <td>{{ $shipping_information->zip }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h1 class="panel-title">Orders</h1>
                        </div>
                        <div class="panel-body">
                            <div class="orders-list" id="order-list">
                                {{-- to be load of js --}}
                            </div>
                        </div>
                    </div>

                    <div class="panel panel-default">
                        <table class="table table-striped">
                            <tbody>
                                <tr>
                                    <td colspan="2" class="bg-info text-info">Order Summary</td>
                                </tr>
                                <tr>
                                    <td>Total Items Fee</td>
                                    <td>$ 105.40</td>
                                </tr>
                                <tr>
                                    <td>Shipping Fee</td>
                                    <td>$ 10.00</td>
                                </tr>
                                <tr>
                                    <td>Total Amount</td>
                                    <td>$ 115.40</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <a href="{{ route('shopping-cart.shipping') }}" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left"></span> Back</a>
                    <a href="javascript:void()" onclick="document.getElementById('confirm-order-form').submit()" class="btn btn-primary">Confirm Order And Pay <span class="glyphicon glyphicon-shopping-cart"></span></a>
                </div>
            </div>
        </div>
    </div>
</div>

<form method="POST" action="{{ route('shopping-cart.confirm-order') }}" id="confirm-order-form" cloak hidden>
    {{ csrf_field() }}
</form>
@endsection

@section('scripts')
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script type="text/javascript" src="/bootbox/bootbox.min.js"></script>

<script type="text/template" id="all-items-tmpl">
    <% if (!_.isEmpty(all_items)) { %>
        <div role="tabpanel">
            <ul class="nav nav-tabs" role="tablist">
                <% _.each(all_items, function(size) { %>
                    <li role="presentation" class="<%= all_items[0] == size ? 'active' : '' %>">
                        <a href="#size-<%= size %>" aria-controls="tab" role="tab" data-toggle="tab"><%= size %></a>
                    </li>
                <% }); %>
            </ul>

            <br />

            <div class="tab-content">
                <% _.each(all_items, function(size) { %>
                    <div role="tabpanel" class="tab-pane fade <%= all_items[0] == size ? 'in active' : '' %>" id="size-<%= size %>">
                        <table class="table table-hover table-bordered player-list">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Last Name</th>
                                    <th>Number</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                <% var selected_players = _.filter(players, {size: size}) %>
                                <% _.each(selected_players, function(player, n) { %>
                                    <tr>
                                        <td><%= n+1 %></td>
                                        <td><%= player.last_name %></td>
                                        <td><%= player.number %></td>
                                        <td><%= player.quantity %></td>
                                    </tr>
                                <% }); %>
                            </tbody>
                        </table>
                    </div>
                <% }); %>
            </div>
        </div>
    <% } else { %>
        <p>No players available</p>
    <% } %>
</script>

<script type="text/template" id="order-list-tmpl">
    <% if (!_.isEmpty(orders)) { %>
        <% _.each(orders, function(order) { %>
            <div class="item">
                <img src="<%= order.images.front_image %>" class="img-responsive" alt="" />
                <div class="order-details">
                    <h3 class="order-title"><%= order.name %></h3>
                    <p>Material ID: <span class="badge"><%= order.material_id %></span></p>
                    <a href="javascript:void(0)" class="btn btn-info btn-sm view-all-items" data-cart-item-id="<%= order.cart_item_id %>">View all items</a>
                </div>
            </div>
        <% }); %>
    <% } else { %>
        <div class="alert alert-info">
            <p>No Orders found.</p>
        </div>
    <% } %>
</script>

<script type="text/javascript">
</script>
<script type="text/javascript" src="/js/shopping-cart/confirm-order.js"></script>
@endsection