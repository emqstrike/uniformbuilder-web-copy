@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/spectrum/spectrum.css">
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Color</div>
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

                    <form class="form-horizontal" role="form" action="/administration/color/update" method="POST" enctype="multipart/form-data" id='edit-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="color_id" value="{{ $color->id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Color Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control color-name" name="name" value="{{ $color->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sublimation Only</label>
                            <div class="col-md-6">
                                <select class="form-control" name='sublimation_only'>
                                    <option value='0' @if ($color->sublimation_only == '0') selected @endif>No</option>
                                    <option value='1' @if ($color->sublimation_only == '1') selected @endif>Yes</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Color Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control color-code" name="color_code" value="{{ $color->color_code }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Color</label>
                            <div class="col-md-6">
                                <input id='colorpicker' />
                                <input type='hidden' name="hex_code" id="hex-code" value="#{{ $color->hex_code }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Color
                                </button>
                                <a href="/administration/colors" class="btn btn-danger">
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

<script type="text/javascript" src="/js/libs/spectrum/spectrum.js"></script>

@endsection

@section('custom-scripts')
<script type="text/javascript">
$(document).ready(function(){
    $('#colorpicker').spectrum({
        color: "#{{ $color->hex_code }}",
        preferredFormat: "hex",
        showInput: true,
        move: function(tinycolor) {
            $('#hex-code').val(tinycolor);
        },
        hide: function(tinycolor) {
            $('#hex-code').val(tinycolor);
        }
    });
});
</script>
@endsection