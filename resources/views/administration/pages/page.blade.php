@extends('administration.lte-main')

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
    <input type="hidden" name="_token" value="{{ csrf_token() }}" id="x-csrf-token">
    
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h1>Pages</h1>

                        <a href="{{ route('add_new_page') }}" class='btn btn-xs btn-success'>
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Add a page
                        </a>
                    </div>

                    <div class="box-body">
                        @include('administration.partials.flash-message')

                        <table data-toggle='table' class="data-table table table-bordered patterns">
                            <thead>
                                <tr>
                                    <th>Code</th>
                                    <th>Page Name</th>
                                    <th>Brand</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                @if ($pages)
                                    @foreach ($pages as $page)
                                        <tr>
                                            <td>{{ $page->code }}</td>
                                            <td>{{ $page->page_name }}</td>
                                            <td>{{ $page->brand }}</td>
                                            <td>
                                                <a href="{{ route('edit_page', ['id' => $page->id]) }}" class="btn btn-primary btn-xs"  role="button">
                                                    <i class="glyphicon glyphicon-edit"></i>
                                                    Edit
                                                </a>

                                                <a href="{{ route('delete_page', ['id' => $page->id]) }}" class="btn btn-danger btn-xs" role="button">
                                                    <i class="glyphicon glyphicon-trash"></i>
                                                    Remove
                                                </a>
                                            </td>
                                        </tr>
                                    @endforeach
                                @else
                                    <tr>
                                        <td colspan="3">No pages found</td>
                                    </tr>
                                @endif
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection