@extends('shopping-cart.layout')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="page-header">Billing</h1>

            <form role="form">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-group">
                            <label for="full_name">Full Name</label>
                            <input type="text" name="full_name" class="form-control" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="address_1">Address 1</label>
                            <input type="text" name="address_1" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="address_2">Address 2</label>
                            <input type="text" name="address_2" class="form-control" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="state">State</label>
                            <input type="text" name="state" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="city">City</label>
                            <input type="text" name="city" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="zip_code">Zip Code</label>
                            <input type="text" name="zip_code" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="phone_number">Phone number</label>
                            <input type="text" name="phone_number" class="form-control" />
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <a href="{{ route('shopping-cart.shipping') }}" class="btn btn-primary">Proceed To Shipping</a>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection