@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<style type="text/css">

    li.select2-selection__choice {
    color: black !important;
}
</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading"><b>Add New Colors Set</b></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/v1-0/colors_set/add" enctype="multipart/form-data" id='create-color-form'>
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
                                <select class="form-control" name='uniform_type'>
                                    <option value="custom">Custom</option>
                                    <option value="twill">Twill</option>
                                    <option value="sublimated">Sublimated</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Colors</label>
                            <div class="col-md-6">
                                <textarea class="colors-val" name="colors_value" style="display:none;"></textarea>
                                <select name="colors[]" class="form-control colors" multiple="multiple">
                                    @foreach ($colors as $color)
                                        @if ($color->active)
                                        <option value='{{ $color->color_code }}'>
                                            @if ($color->sublimation_only)
                                                *
                                            @endif
                                            {{ $color->name }}
                                        </option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary btn-flat create-color">
                                    Add Record
                                </button>
                                <a href="/administration/colors_sets" class="btn btn-flat btn-danger">
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
    $('.colors').select2({
        placeholder: "Select colors",
        multiple: true,
        allowClear: true
    });
    var colors_val = $(".colors-val").val();
    colors_val = JSON.parse(colors_val);
    $(".colors").select2().val(colors_val).trigger("change");
});
</script>
@endsection
