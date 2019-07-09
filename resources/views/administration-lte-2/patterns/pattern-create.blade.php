@extends('administration-lte-2.lte-main')

@section('custom-styles')
select:hover {
  background-color: transparent;
}
@endsection

@section('styles')
<style type="text/css">

</style>
@endsection

@section('content')
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            @section('page-title', 'Create Pattern')
            <div class="panel panel-default">
                <div class="panel-heading"><b>Add New Pattern</b></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/v1-0/pattern/add" enctype="multipart/form-data" id='create-pattern-form'>
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
                                <select name="sports[]" class="form-control sports" multiple="multiple" required>
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
                            <label class="col-md-4 control-label">Target Block Pattern Option</label>
                            <div class="col-md-6">
                                <input type="hidden" class="block-pattern-options-val" id="block_pattern_options_value" name="block_pattern_options_value">
                                <select name="block_pattern_options[]" class="form-control block-pattern-options" multiple="multiple">
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
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*" required>
                            </div>
                        </div>
                        <div class="form-group">
                                <label class="col-md-4 control-label">Brand</label>
                                <div class="col-md-6">
                                <select class="form-control brand" name="brand" required>
                                        <option value="prolook">Prolook</option>
                                        <option value="richardson">Richardson</option>
                                        <option value="riddell">Riddell</option>
                                </select>
                              </div>
                        </div>
                        <div class="form-group">
                                <label class="col-md-4 control-label">Range Position</label>
                                <div class="col-md-2">
                                <input class="form-control range-position" type="number" name="range_position">
                                </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label">Pattern Layers
                            <div>
                                <a class="btn btn-primary clone-row btn-xs btn-flat"> Add Pattern Layer</a>
                            </div>
                            </label>
                            <div class="col-md-8">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer #</th>
                                            <th>Default Color</th>
                                            <th>Pattern File</th>
                                            <th>LowRes File</th>
                                            <th>Team Color ID</th>
                                            <th></th>
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
                                                <input type="file" class="pattern-layer-file layer1" name="pattern_layer_image[]" required>
                                            </td>
                                            <td>
                                                <input type="file" class="pattern-lowres-file lowres-layer1" name="pattern_lowres_layer_image[]" required>
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
                                <button type="submit" class="btn btn-primary create-pattern btn-flat">
                                    Add Record
                                </button>
                                <a href="/administration/v1-0/patterns" class="btn btn-danger btn-flat">
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
<script type="text/javascript">
$(document).ready(function(){

    window.colors = null;

    $(document).on('change', '.brand', function() {
        var temp_brand = $(this).val();
        getColors(temp_brand, function(colors){
        window.colors = colors;
        });
        generateColorsDropdown();
    });

    window.edit = 0;

    function getColors(brand, callback){
        var colors;
        var url = "//" + api_host + "/api/colors/" + brand;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                colors = data['colors'];
                if(typeof callback === "function") callback(colors);
            }
        });
    }

    function generateColorsDropdown(){
        $('.layer-default-color').empty();
        var colors_dropdown = '';
        $.each(window.colors, function( key, value ) {
            colors_dropdown += '<option value="' + value.color_code + '" data-color="#' + value.hex_code + '" style="text-shadow: 1px 2px #000; color: #fff; background-color: #' + value.hex_code + '">' + value.name + '</option>';
        });
        $('.layer-default-color').append(colors_dropdown);
        layerNumbers();
        $('.layer-default-color').trigger('change');
    }

    $('.brand').trigger('change');

    $(document).on('change', function() {
        var length = $('.layers-row').length;
        layerNumbers();
    });

    function layerNumbers(){
        var length = $('.layers-row').length;
        var x = 1;
        $(".layers-row").each(function(i) {
            $(this).find(".ma-layer").val(x);
            x++;
        });
        var newLength = $('.layers-row').length;
        updateJSON(newLength);
    }

    function updateJSON(length){
        pattern_properties = {};
        var ctr = 1;
            $(".layers-row").each(function(i) {
                var thisLayer = "layer"+ctr;
                var layer_class = ".ma-layer.layer" + ctr;

                pattern_properties[ctr] = {};
                pattern_properties[ctr]['default_color'] = {};
                pattern_properties[ctr]['file_path'] = {};
                pattern_properties[ctr]['lowres_file_path'] = {};
                pattern_properties[ctr]['layer'] = {};
                pattern_properties[ctr]['team_color_id'] = {};

                $(this).find('.ma-layer').removeClass().addClass("ma-layer");
                $(this).find('.ma-layer').addClass(thisLayer);
                $(this).find(layer_class).addClass('ma-layer');

                $(this).find('.layer-default-color').removeClass().addClass("layer-default-color");
                $(this).find('.layer-default-color').addClass(thisLayer);
                var default_color_class = ".layer-default-color.layer" + ctr;
                $(this).find(default_color_class).addClass('layer-default-color');

                $(this).find('.pattern-team-color-id').removeClass().addClass("pattern-team-color-id");
                $(this).find('.pattern-team-color-id').addClass(thisLayer);
                var ptid_class = ".pattern-team-color-id.layer" + ctr;
                $(this).find(ptid_class).addClass('pattern-team-color-id');
                var existing_file_class = ".pattern-source.layer" + ctr;

                pattern_properties[ctr]['default_color'] = $(this).find(default_color_class).val();
                pattern_properties[ctr]['layer'] = $(this).find(layer_class).val();
                pattern_properties[ctr]['file_path'] = null;
                pattern_properties[ctr]['lowres_file_path'] = null;
                pattern_properties[ctr]['team_color_id'] = $(this).find(ptid_class).val();
                ctr++;
            });

        var patternProperties = JSON.stringify(pattern_properties);
        console.log(patternProperties);
        $('#pattern_properties').val(patternProperties);
    }

    $(document).on("click", "a.btn-remove-layer", function(){
        var length = 0;
        $(".layers-row").each(function(i) {
            length++;
        });
        $(this).closest('tr').remove();
        length--;
        var ctr = length;
        $(".layers-row").each(function(i) {
            $(this).find(".layer-number").text(ctr);
            $(this).find(".layer-number").val(ctr);
            ctr--;
        });
        layerNumbers(length);
    });

    $(document).on('click', '.clone-row', function() {
        var x = $( ".layers-row:first" ).clone();
        x.find('.layer-default-color').removeAttr('style');

        y = "<td><a class='btn btn-danger btn-xs btn-remove-layer btn-flat'>Remove</a></td>";
        $('#layers-row-container').append(x);
        $(x).append(y);

        layerNumbers();

        $('.layer-default-color').change(function(){
            var color = $('option:selected', this).data('color');
            $(this).css('background-color', color);
            $(this).css('color', '#fff');
            $(this).css('text-shadow', '1px 1px #000');
        });

        var length = $('.layers-row').length;
    });

    for( var i = 0; i <= 10; i++ ){
        if( i== 0){
            $('#pattern_tc_id_dp').append('<option value="">None</option>');
        } else {
            $('#pattern_tc_id_dp').append('<option value="' + i + '">' + i + '</option>');
        }
    }

    $('select:not(:has(option))').attr('visible', false);

    $('.layer-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
        $(this).css('color', '#fff');
        $(this).css('text-shadow', '1px 1px #000');
    });

    window.block_patterns = null;

    getBlockPatterns(function(block_patterns){ window.block_patterns = block_patterns; });

    function getBlockPatterns(callback){
        var block_patterns;
        var url = "//" +api_host+ "/api/block_patterns";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                block_patterns = data['block_patterns'];
                if(typeof callback === "function") callback(block_patterns);
            }
        });
    }

    if($('#sports_value').val()){
        var sports = JSON.parse($('#sports_value').val());
    }

    $('.sports').select2({
        placeholder: "Category",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        $('#sports_value').val($(this).val());
        bindBPOS();
    });

    $('.sports').select2('val', sports);

    $('.block-pattern-options').select2({
        placeholder: "Select block pattern option",
        multiple: true,
        allowClear: true
    });

    function bindBPOS(){
        var sports = $('.sports-val').val().split('"').join('');
        var sports_arr = null;
        var block_pattern_options = [];
        if(sports != null){
            sports_arr = sports.split(",");
            sports_arr.forEach(function(entry) {
                var x = _.filter(window.block_patterns, function(e){ return e.uniform_category == entry; });
                x.forEach(function(entry) {
                    var y = JSON.parse(entry.neck_options);

                    var list = [];
                    _.each(y, function(item){
                        list.push(_.omit(item, 'children'));
                        list.push(_.flatten(_.pick(item, 'children')));
                    });
                    var result = _.flatten(list);
                    result.forEach(function(i) {
                        block_pattern_options.push(i.name);
                    });
                });
            });
            var z = _.sortBy(_.uniq(block_pattern_options));
            $('.block-pattern-options').html('');
            z.forEach(function(i) {
                $('.block-pattern-options').append('<option value="'+i+'">'+i+'</option>');
            });
        }
    }

    $(".block-pattern-options").change(function() {
        $('#block_pattern_options_value').val($(this).val());
    });


});
</script>
@endsection
