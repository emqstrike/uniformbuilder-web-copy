@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">

    <style type="text/css">
        div#box_body {
            overflow-y: scroll;
            max-height: 500px;
        }

        .row {
            margin-bottom: 15px;
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
                        @section('page-title', 'Pages')

                        <h1>Pages</h1>

                        <button class='btn btn-flat btn-xs btn-success add-page'>
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Add a page
                        </button>
                    </div>

                    <div class="box-body">
                        @include('administration.partials.flash-message')

                        <table data-toggle='table' class="data-table table table-bordered table-hover">
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
                                            <td class="page-code">{{ $page->code }}</td>
                                            <td class="page-name">{{ $page->page_name }}</td>
                                            <td>{{ $page->brand }}</td>
                                            <td>
                                                <button class="btn btn-flat btn-primary btn-xs edit-page" data-page-id="{{ $page->id }}"  role="button">
                                                    <i class="glyphicon glyphicon-edit"></i>
                                                    Edit
                                                </button>

                                                <button class="btn btn-flat btn-danger btn-xs delete-page" data-page-id="{{ $page->id }}" role="button">
                                                    <i class="glyphicon glyphicon-trash"></i>
                                                    Remove
                                                </button>
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

    @include('administration-lte-2.pages.modal.add-edit')
@endsection

@section('scripts')
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/pages/page.js"></script>
@endsection