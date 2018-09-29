@extends('administration.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">

    <style type="text/css">
        div#box_body {
            overflow-y: scroll;
            max-height: 500px;
        }
    
        li.select2-selection__choice {
            color: black !important;
        }
    </style>
@endsection

@section('content')
    <div class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h1>Edit Page Rule</h1>
                        @include('administration.partials.flash-message')
                        @include('administration.partials.validation-error')
                    </div>

                    <div class="box-body">
                        <form action="{{ route('update_page_rule') }}" class="form-horizontal" method="POST">
                            {{ method_field('PATCH') }}
                            {{ csrf_field() }}

                            <input type="hidden" name="brand" value="{{ env('BRAND') }}">
                            <input type="hidden" name="id" value="{{ $pageRule->id }}">

                            <div class="form-group">
                                <label class="col-md-4 control-label">Type</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="type" value="{{ ucwords($pageRule->type) }}" disabled="disabled">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Role</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="role" value="{{ $pageRule->role }}" disabled="disabled">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Allowed Pages</label>
                                <div class="col-md-6">
                                    <select name="allowed_pages[]" class="form-control pages" multiple="multiple">

                                        @foreach ($pages as $page)
                                            @if (in_array($page->code, $allowedPages))
                                                <option value="{{ $page->code }}" selected="selected">{{ $page->page_name }} ({{ $page->code }})</option>
                                            @else
                                                <option value="{{ $page->code }}">{{ $page->page_name }} ({{ $page->code }})</option>
                                            @endif
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="form group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button class="btn btn-primary" type="submit">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Update Page Rule
                                    </button>

                                    <a href="{{ route('page_rules') }}" class="btn btn-danger">
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
    </div>
@endsection

@section('scripts')
    @include('administration.partials.page-rules.scripts')
@endsection