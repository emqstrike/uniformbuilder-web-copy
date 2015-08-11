@extends('administration.main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Pattern</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/pattern/update" enctype="multipart/form-data" id='create-pattern-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="base_pattern_id" value="{{ $pattern->id }}">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Pattern Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control base-pattern-name" name="name" value="{{ $pattern->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">
                                Pattern File (JSON File)
                                @if ($pattern->pattern_path)
                                <a href="{{ $pattern->pattern_path }}" class="btn btn-default btn-xs show-pattern" role="button" target="_blank">
                                    <li class="glyphicon glyphicon-info-sign"></li>
                                    View
                                </a>
                                @endif
                            </label>
                            
                            <div class="col-md-6 material">
                                <input type="file" class="form-control pattern-file" name="pattern_path" accept="application/json">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-lg btn-primary create-pattern">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Uniform pattern
                                </button>
                                <a href="/administration/patterns" class="btn btn-lg btn-danger">
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

    $('#create-pattern-form').submit(function(){
        $('.flash-alert .flash-progress').show();
        $('.flash-alert .flash-title').text('Creating New pattern');
        $('.flash-alert .flash-sub-title').text('Saving');
        $('.flash-alert .flash-message').text('Please wait while we are saving pattern...');
        $('.flash-alert').addClass('alert-info');
        $('.flash-alert').show();
        $('.main-content').fadeOut('slow');
    });
});

@endsection