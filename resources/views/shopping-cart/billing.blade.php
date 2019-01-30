@extends('shopping-cart.layout')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="page-header">Billing Info</h1>

            @include('templates.flash')
            @include('templates.error-list')

            <form role="form" method="POST" action="{{ route('shopping-cart.billing') }}">
                {{ csrf_field() }}

                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h1 class="panel-title">Billing Info</h1>
                    </div>

                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <button type="button" class="btn btn-info btn-sm" data-loading-text="Fetching Client Info" id="same-as-client-info" {{ $same_as_client_info ? "disabled" : "" }}>Copy Client Info</button>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="full_name">Full Name</label>
                                    <input type="text" name="full_name" value="{{ !is_null($billing_information) ? $billing_information->full_name : '' }}" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="athletic_director">Athletic Director</label>
                                    <input type="text" name="athletic_director" value="{{ !is_null($billing_information) ? $billing_information->athletic_director : '' }}" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="text" name="email" value="{{ !is_null($billing_information) ? $billing_information->email : '' }}" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="phone_number">Phone Number</label>
                                    <input type="text" name="phone_number" value="{{ !is_null($billing_information) ? $billing_information->phone_number : '' }}" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="fax">Fax</label>
                                    <input type="text" name="fax" value="{{ !is_null($billing_information) ? $billing_information->fax : '' }}" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h1 class="panel-title">Billing Address</h1>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="address">Address</label>
                                    <input type="text" name="address" value="{{ !is_null($billing_information) ? $billing_information->address : '' }}" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="state">State</label>
                                    <input type="text" name="state" value="{{ !is_null($billing_information) ? $billing_information->state : '' }}" class="form-control" />
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input type="text" name="city" value="{{ !is_null($billing_information) ? $billing_information->city : '' }}" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="zip_code">Zip Code</label>
                                    <input type="text" name="zip_code" value="{{ !is_null($billing_information) ? $billing_information->zip : '' }}" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <a href="{{ route('shopping-cart.client-info') }}" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left"></span> Back</a>
                        <button type="submit" class="btn btn-primary">Proceed To Shipping <span class="glyphicon glyphicon-arrow-right"></span></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script type="text/javascript" src="/js/shopping-cart/billing.js"></script>
@endsection