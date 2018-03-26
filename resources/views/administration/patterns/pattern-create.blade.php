@extends('administration.lte-main')

@section('custom-styles')
select:hover {
  background-color: transparent;
}
@endsection

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<style type="text/css">

li.select2-selection__choice {
    color: black !important;
}

.animated {
    -webkit-transition: height 0.2s;
    -moz-transition: height 0.2s;
    transition: height 0.2s;
}
</style>
@endsection

@section('content')
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Pattern</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/pattern/add" enctype="multipart/form-data" id='create-pattern-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="pattern_properties" id="pattern_properties">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Pattern Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control pattern-name" name="name" value="{{ old('name') }}" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sports</label>
                            <div class="col-md-6">

                                <input type="hidden" class="sports-val" id="sports_value" name="sports_value" >
                                <select name="sports[]" class="form-control sports" multiple="multiple">
                                    @foreach ($categories as $category)
                                        @if ($category->active)
                                        <option value='{{ $category->name }}'>
                                            {{ $category->name }}
                                        </option>
                                        @endif
                                    @endforeach
                                    <option value="All">All</option>
                                </select>

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Asset Target</label>
                            <div class="col-md-6">
                                <select class="form-control pattern-asset-target" name="asset_target" id="asset_target">
                                    <option value="web">Web</option>
                                    <option value="ipad">iPad</option>
                                    <option value="team_stores">Team Stores</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                                <label class="col-md-4 control-label">Brand</label>
                                <div class="col-md-6">
                                <select class="form-control brand" name="brand">
                                        <option value="none">None</option>
                                        <option value="prolook">Prolook</option>
                                        <option value="richardson">Richardson</option>
                                </select>
                              </div>
                        </div>

                        <!-- <div class="form-group">
                            <label class="col-md-4 control-label">Team Color ID</label>
                            <div class="col-md-6">
                                <select name='team_color_id' class="form-control pattern-team-color-id">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">1</span></label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control layer-1-file" name="layer_1_path" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default colors</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_1_color" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">2</span></label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control layer-2-file" name="layer_2_path" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default colors</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_2_color" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">3</span></label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control layer-3-file" name="layer_3_path" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default colors</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_3_color" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">4</span></label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control layer-4-file" name="layer_4_path" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default colors</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_4_color" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div> -->

                        <div class="form-group">
                            <label class="col-md-4 control-label">Pattern Layers
                            <div>
                                <a class="btn btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Pattern Layer</a>
                            </div>
                            </label>
                            <div class="col-md-8">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer #</th>
                                            <th>Default Color</th>
                                            <th>Pattern File</th>
                                            <th>Team Color ID</th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container" class="layers">
                                        <tr class="layers-row">
                                            <td>
                                                <input type="text" class="ma-layer layer1" size="3" value="1" disabled>
                                            </td>
                                            <td>
                                                <select class="layer-default-color layer1" name=""></select>
                                            </td>
                                            <td>
                                                <input type="file" class="pattern-layer-file layer1" name="pattern_layer_image[]">
                                            </td>
                                            <td>
                                                <select id="pattern_tc_id_dp" class="pattern-team-color-id" name=""></select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-pattern">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Pattern
                                </button>
                                <a href="/administration/patterns" class="btn btn-danger">
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
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/patterns.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('select:not(:has(option))').attr('visible', false);

    $('.layer-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
        $(this).css('color', '#fff');
        $(this).css('text-shadow', '1px 1px #000');
    });

        if($('#sports_value').val()){
        var sports = JSON.parse($('#sports_value').val());
    }
    // var sports = JSON.parse($('#sports_value').val());

    $('.sports').select2({
        placeholder: "Select sports",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        $('#sports_value').val($(this).val());
    });

    $('.sports').select2('val', sports);


});
</script>
@endsection
