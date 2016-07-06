@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/spectrum/spectrum.css">
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Colors Set</div>
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
                            <label class="col-md-4 control-label">Color Set Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control color-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Color Set Type</label>
                            <div class="col-md-6">
                                <!-- <input type="name" class="form-control color-code" name="color_code" value="{{ old('name') }}"> -->
                                <select class="form-control" name='type'>
                                    <option value="custom">Custom</option>
                                    <option value="twill">Twill</option>
                                    <option value="sublimated">Sublimated</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Colors</label>
                            <div class="col-md-6">
                                <select class="form-control colors" name="colors[]" style="color: #000;text-shadow: 1px 1px #000;" multiple="multiple">
                                    <option>
                                        @foreach ($colors as $color)
                                            @if ($color->active)
                                            <option data-color="#{{ $color->hex_code }}" style="background-color: #{{ $color->hex_code }}; text-shadow: 1px 1px #000;" value="{{ $color->color_code }}">
                                                {{ $color->name }}
                                            </option>
                                            @endif
                                        @endforeach
                                    </option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-color">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Color
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
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
@endsection

@section('custom-scripts')
<script type="text/javascript">
$(document).ready(function(){
    bindColorsSelect2();
    function bindColorsSelect2()
    {
        $('.colors').select2();
    }
});
</script>
@endsection