@extends('shopping-cart.layout')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="page-header">My Cart</h1>

            <div class="row">
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-primary pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-primary pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-primary pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-primary pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-primary pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <a href="{{ route('shopping-cart.billing') }}" class="btn btn-primary">Checkout</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection