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
                        <h1>Edit Page</h1>
                        @include('administration.partials.flash-message')
                    </div>

                    <div class="box-body">
                        <form action="{{ route('update_page', ['id' => $page->id]) }}" method="POST" class="form-horizontal">
                            {{ method_field('PATCH') }}
                            {{ csrf_field() }}

                            <input type="hidden" name="id" value="{{ $page->id }}">
                            <input type="hidden" name="brand" value="{{ env('BRAND') }}">

                            <div class="form-group">
                                <label class="col-md-4 control-label">Code</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="code" value="{{ $page->code }}" required>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Page Name</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="page_name" value="{{ $page->page_name }}" required>
                                </div>
                            </div>

                            <div class="form group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button class="btn btn-primary" type="submit">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Update Page
                                    </button>

                                    <a href="{{ route('pages') }}" class="btn btn-danger">
                                        <span class="glyphicon glyphicon-arrow-left"></span>
                                        Cancel
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection