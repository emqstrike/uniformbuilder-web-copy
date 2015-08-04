@extends('administration.main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/spectrum/spectrum.css">

@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div align='center'>
            <img src="https://s3-us-west-2.amazonaws.com/qstrike/images/Qx.png" style='height: 10vh'>
        </div>
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Color</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/color/add" enctype="multipart/form-data" id='create-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Color Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control color-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Color Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control color-code" name="color_code" value="{{ old('name') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Color</label>
                            <div class="col-md-6">
                                <input id='colorpicker' />
                                <input type='hidden' name="hex_code" id="hex-code" value="#ff0000">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color" style="margin-right: 15px;">
                                    Add New Color
                                </button>
                                <a href="/administration/colors" class="btn btn-danger" style="margin-right: 15px;">
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

<script type="text/javascript" src="/js/libs/spectrum/spectrum.js"></script>

@endsection

@section('custom-scripts')

$(document).ready(function(){
    $('#colorpicker').spectrum({
        color: "#ff0000",
        preferredFormat: "hex",
        showInput: true,
        move: function(tinycolor) {
            $('#hex-code').val(tinycolor);
        }
    });

    $('#create-color-form').submit(function(){
        $('.flash-alert .flash-progress').show();
        $('.flash-alert .flash-title').text('Creating New color');
        $('.flash-alert .flash-sub-title').text('Saving');
        $('.flash-alert .flash-message').text('Please wait while we are saving color...');
        $('.flash-alert').addClass('alert-info');
        $('.flash-alert').show();
        $('.main-content').fadeOut('slow');
    });
});

@endsection