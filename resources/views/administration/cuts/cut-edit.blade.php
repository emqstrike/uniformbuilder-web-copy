@extends('administration.main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify {{ ucfirst($button_text) }}</div>
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="/administration/cut/add" enctype="multipart/form-data" id='create-cut-style-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="cut_type" value="{{ $style->cut_type }}">
                        <input type="hidden" name="cut_id" value="{{ $style->id }}">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control cut-style-name" name="name" value="{{ $style->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control cut-style-code" name="code" value="{{ $style->code }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-lg btn-primary create-cut-style">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update {{ ucfirst($button_text) }}
                                </button>
                                <a href="/administration/cuts/{{ $return_endpoint }}" class="btn btn-lg btn-danger">
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

@section('custom-scripts')

$(document).ready(function(){

    $('#create-cut-style-form').submit(function(){
        $('.flash-alert .flash-progress').show();
        $('.flash-alert .flash-title').text('Updating Cut Style');
        $('.flash-alert .flash-sub-title').text('Saving');
        $('.flash-alert .flash-message').text('Please wait while we are saving changes...');
        $('.flash-alert').addClass('alert-info');
        $('.flash-alert').show();
        $('.main-content').fadeOut('slow');
    });
});

@endsection