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
                            <div class="orders-list">
                                <div class="item">
                                    <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                                    <div class="order-details">
                                        <h3 class="order-title">Dons Long Sleeve Crew Neck</h3>
                                        <p>Tech-Tee (Apparel)</p>
                                        <p>Jersey Name: Doe</p>
                                        <p>Jersey Number:01</p>
                                        <p>Jersey Size: XS</p>
                                        <p>Price: $ 100.00</p>
                                    </div>
                                </div>

                                <div class="item">
                                    <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                                    <div class="order-details">
                                        <h3 class="order-title">Dons Long Sleeve Crew Neck</h3>
                                        <p>Tech-Tee (Apparel)</p>
                                        <p>Jersey Name: Doe</p>
                                        <p>Jersey Number:01</p>
                                        <p>Jersey Size: XS</p>
                                        <p>Price: $ 100.00</p>
                                    </div>
                                </div>
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