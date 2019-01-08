@extends('shopping-cart.layout')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="page-header">Confirm Order</h1>

            <div class="row">
                <div class="col-md-6">
                    <div class="panel panel-default">
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
                </div>
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h1 class="panel-title">Order Summary</h1>
                        </div>
                        <table class="table table-hover">
                            <tbody>
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
                    <button class="btn btn-primary">Confirm Order And Pay <span class="glyphicon glyphicon-shopping-cart"></span></button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection