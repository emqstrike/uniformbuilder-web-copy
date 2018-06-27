@extends('administration.lte-main')
<meta name="csrf-token" content="{{ csrf_token() }}" />

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">

    <style type="text/css">
        div#box_body {
            overflow-y: scroll;
            max-height: 500px;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h1>Menus</h1>

                        <a href="{{ route('add_new_menu') }}" class='btn btn-xs btn-success'>
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Add new menu
                        </a>
                    </div>

                    <div class="box-body">
                        @include('administration.partials.flash-message')

                        <table class="data-table table table-bordered" data-toggle="data">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Menu Text</th>
                                    <th>Route Name</th>
                                    <th>Icon</th>
                                    <th>Parent Menu</th>
                                    <th>Brand</th>
                                    <th>Remarks</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                @foreach ($menus as $menu) 
                                    @include('administration.menus.partials.menu-table')
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection