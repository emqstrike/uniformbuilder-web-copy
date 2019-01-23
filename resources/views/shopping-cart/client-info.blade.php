@extends('shopping-cart.layout')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="page-header">Client Info</h1>

            @include('templates.flash')
            @include('templates.error-list')

            <form role="form" method="POST" action="{{ route('shopping-cart.client-info') }}">
                {{ csrf_field() }}

                <div class="panel panel-default">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="full_name">Full Name</label>
                                    <input type="text" name="full_name" value="{{ !is_null($client_information) ? $client_information->full_name : '' }}" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="athletic_director">Athletic Director</label>
                                    <input type="text" name="athletic_director" value="{{ !is_null($client_information) ? $client_information->athletic_director : '' }}" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="text" name="email" value="{{ !is_null($client_information) ? $client_information->email : '' }}" class="form-control" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="phone_number">Phone Number</label>
                                    <input type="text" name="phone_number" value="{{ !is_null($client_information) ? $client_information->phone_number : '' }}" class="form-control" />
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="fax">Fax</label>
                                    <input type="text" name="fax" value="{{ !is_null($client_information) ? $client_information->fax : '' }}" class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <a href="{{ route('shopping-cart') }}" class="btn btn-default"><span class="glyphicon glyphicon-arrow-left"></span> Back</a>
                        <button type="submit" class="btn btn-primary">Proceed To Billing <span class="glyphicon glyphicon-arrow-right"></span></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection