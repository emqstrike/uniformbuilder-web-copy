@extends('administration-lte-2.lte-main')
@section('styles')

@endsection
@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            @section('page-title', 'Edit Pattern')
            <div class="panel panel-default">
                <div class="panel-heading"><b>Edit Pattern</b></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/v1-0/pattern/update" enctype="multipart/form-data" id='edit-pattern-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="base_pattern_id" value="{{ $pattern->id }}">
                        <textarea id="pattern_properties" name="pattern_properties" style="display: none;">{{ $pattern->pattern_properties }}</textarea>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Pattern Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control pattern-name" name="name" value="{{ $pattern->name }}" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sports</label>
                            <a class="btn btn-primary copy-sports btn-xs btn-flat">Copy Sports</a>
                            <a class="btn btn-success load-sports btn-xs btn-flat">Load Sports</a>
                            <div class="col-md-6">
                                <input type="hidden" class="sports-val" id="sports_value" name="sports_value" value="{{ $pattern->sports }}">
                                <input type="text" class="sports-text pull-right" id="sports_text" name="sports_text">
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
                            <a class="btn btn-primary copy-options btn-xs btn-flat">Copy Options</a>
                            <a class="btn btn-success load-options btn-xs btn-flat">Load Options</a>
                            <div class="col-md-6">
                                <input type="hidden" class="block-pattern-options-val" id="block_pattern_options_value" name="block_pattern_options_value" value="{{ $pattern->block_pattern_options }}">
                                <input type="text" class="block-pattern-options-text pull-right" id="block_pattern_options_text" name="block_pattern_options_text">
                                <select name="block_pattern_options[]" class="form-control block-pattern-options" multiple="multiple">
                                </select>

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Asset Target</label>
                            <div class="col-md-6">
                                <select class="form-control pattern-asset-target" name="asset_target" id="asset_target" required>
                                    <option value="web" @if( $pattern->asset_target == "web" ) selected="selected"@endif>Web</option>
                                    <option value="ipad" @if( $pattern->asset_target == "ipad" ) selected="selected"@endif>iPad</option>
                                    <option value="team_stores" @if( $pattern->asset_target == "team_stores" ) selected="selected"@endif>Team Stores</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Brand</label>
                            <div class="col-md-6">
                                <select name="brand" class="form-control" required>
                                        <option value="none" @if($pattern->brand == "none") selected="selected"@endif>None</option>
                                        <option value="prolook" @if($pattern->brand == "prolook") selected="selected"@endif>Prolook</option>
                                        <option value="richardson" @if($pattern->brand == "richardson") selected="selected"@endif>Richardson</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Range Position</label>
                            <div class="col-md-2">
                                <input class="form-control range-position" type="number" name="range_position" value="{{ $pattern->range_position }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail</label>
                            <div class="col-md-6">
                                @if ($pattern->thumbnail_path)
                                <div class="thumbnail_path">
                                    <img src="{{ $pattern->thumbnail_path }}" width="100px" height="100px">
                                </div>
                                @endif
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">Pattern Layers
                            <div>
                                <a class="btn btn-primary clone-row btn-xs btn-flat">Add Pattern Layer</a>
                            </div>
                            </label>
                            <div class="col-md-8">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer #</th>
                                            <th>Default Color</th>
                                            <th>Thumbnail</th>
                                            <th>New Pattern File</th>
                                            <th>LowRes Thumbnail</th>
                                            <th>New LowRes Pattern File</th>
                                            <th>Team Color ID</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container" class="layers"></tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-pattern btn-flat">
                                    Update Pattern
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

@section('scripts')
@endsection
@section('custom-scripts')
<script type="text/javascript">
$(document).ready(function(){

    window.colors = null;
    getColors(function(colors){
        window.colors = colors;
    });
    function getColors(callback){
        var colors;
        var url = "//" + api_host + "/api/colors";
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

    var colors_dropdown = generateColorsDropdown();

    function generateColorsDropdown(){
        $.each(window.colors, function( key, value ) {
            colors_dropdown += '<option value="' + value.color_code + '" data-color="#' + value.hex_code + '" style="text-shadow: 1px 2px #000; color: #fff; background-color: #' + value.hex_code + '">' + value.name + '</option>';
        });
        return colors_dropdown;
    }
    try {
        $('.layer-default-color').append(colors_dropdown);
    }
    catch(err) {
        console.log(err.message);
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
        y = "<td><a class='btn btn-danger btn-xs btn-remove-layer btn-flat'>Remove</a></td>";
        $('#layers-row-container').append(x);
        $(x).append(y);
        layerNumbers();

        $(document).on('change', '.layer-default-color', function(){
            var color = $('option:selected', this).data('color');
            $(this).css('background-color', color);
            $(this).css('color', '#fff');
            $(this).css('text-shadow', '1px 1px #000');
        });

        var length = $('.layers-row').length;

        $(".layer-default-color").each(function(i) {
            $(this).html('');
            var thisElem = $(this);
            $(this).append(colors_dropdown);
        });


    });

    for( var i = 0; i <= 10; i++ ){
        if( i== 0){
            $('#pattern_tc_id_dp').append('<option value="">None</option>');
        } else {
            $('#pattern_tc_id_dp').append('<option value="' + i + '">' + i + '</option>');
        }
    }

    window.block_patterns = null;

    getBlockPatterns(function(block_patterns){ window.block_patterns = block_patterns; });

    function bindBPOS() {
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

    $('#edit-pattern-form').submit(function(){
        new PNotify({
            title: 'Updating pattern',
            text: 'Please wait while we are saving pattern...',
            type: 'success',
            hide: true
        });
        $('.main-content').fadeOut('slow');
    });

    $('.sports').trigger('change');

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

    $('.sports').select2({
        placeholder: "Select sports",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        $('#sports_value').val($(this).val());
        bindBPOS();
        console.log('change sports binded BPOS')
    });

    $('.sports').val(sports);
    $('.sports').trigger('change');

    if($('#block_pattern_options_value').val()){
        var bpos = JSON.parse($('#block_pattern_options_value').val());
    }

    $('.block-pattern-options').select2({
        placeholder: "Select block pattern option",
        multiple: true,
        allowClear: true
    });

    $(".block-pattern-options").change(function() {
        $('#block_pattern_options_value').val($(this).val());
    });
    $('.block-pattern-options').val(bpos);
    $('.block-pattern-options').trigger('change');

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
    try {
        buildLayers();
    }
    catch(err) {
        console.log(err.message);
    }

    function buildLayers(){

        var pattern_properties = $('#pattern_properties').val();
        var data = JSON.parse(pattern_properties);

        var length = Object.keys(data).length;
        var x = 1;

        while(x <= length) {

            var team_color_id_options = '';
            for( var y = 1; y <=10; y++ ){
                var selected = '';
                if( y == data[x].team_color_id ){
                    selected = 'selected';
                }
                team_color_id_options += '<option value="' + y + '" ' + selected + '>' + y + '</option>';
            }

            var colors_dropdown = '';
            $.each(window.colors, function( key, value ) {
                var selected = '';
                if( data[x].default_color == value.color_code ){
                    selected = 'selected';
                }
                colors_dropdown += '<option value="' + value.color_code + '" data-color="#' + value.hex_code + '" style="text-shadow: 1px 2px #000; color: #fff; background-color: #' + value.hex_code + '" ' + selected + '>' + value.name + '</option>';
            });

            var open            = '<tr class="layers-row">';
            var layer           = '<td><input type="text" class="ma-layer layer' + x + '" value="' + x + '" size="3" disabled></td>';
            var default_color   = '<td><select class="layer-default-color layer' + x + '">' + colors_dropdown + '</select></td>';
            var new_file        = '<td><input type="file" class="pattern-layer-file layer' + x + '" name="pattern_layer_image[]"></td>';
            var thumbnail       = '<td><img src="' + data[x].file_path + '" style="width: 30px; height: 30px; background-color: #e3e3e3;"><input type="hidden" class="pattern-source layer' + x + '" value="' + data[x]['file_path'] + '"></td>';
            var lowres_new_file        = '<td><input type="file" class="pattern-lowres-layer-file layer' + x + '" name="pattern_lowres_layer_image[]"></td>';
            var team_color_id   =  '<td><select class="pattern-team-color-id layer' + x + '">' + team_color_id_options + '</select></td>';
            var remove          = '<td><a class="btn btn-danger btn-xs btn-remove-layer btn-flat">Remove</a></td>';
            var close           = '<tr>';

            //For Old patterns
            try {
                if(data[x].lowres_file_path) {
                    var lowres_thumbnail       = '<td><img src="' + data[x].lowres_file_path + '" style="width: 30px; height: 30px; background-color: #e3e3e3;"><input type="hidden" class="pattern-lowres-source layer' + x + '" value="' + data[x]['lowres_file_path'] + '"></td>';
                } else {
                    var lowres_thumbnail       = '<td><img src="http://dummyimage.com/100" style="width: 30px; height: 30px; background-color: #e3e3e3;"><input type="hidden" class="pattern-lowres-source layer' + x + '" value=""></td>';
                }
            } catch (err) {
                console.log(err.message);
            }
            if(x == 1) {
                $('#layers-row-container').append( open + layer + default_color + thumbnail + new_file + lowres_thumbnail + lowres_new_file + team_color_id + close );
            } else {
                $('#layers-row-container').append( open + layer + default_color + thumbnail + new_file + lowres_thumbnail + lowres_new_file + team_color_id + remove + close );
            }
            x++;

        }

    }

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
                var existing_lowres_file_class = ".pattern-lowres-source.layer" + ctr;

                pattern_properties[ctr]['default_color'] = $(this).find(default_color_class).val();
                pattern_properties[ctr]['layer'] = $(this).find(layer_class).val();
                pattern_properties[ctr]['file_path'] = $(this).find(existing_file_class).val();
                pattern_properties[ctr]['lowres_file_path'] = $(this).find(existing_lowres_file_class).val();
                pattern_properties[ctr]['team_color_id'] = $(this).find(ptid_class).val();
                ctr++;
            });

        var patternProperties = JSON.stringify(pattern_properties);
        $('#pattern_properties').val(patternProperties);
    }

    $(document).on('click', '.copy-sports', function() {
        var sport_val = $('.sports-val').val();
        var input = $('#sports_text');
        input.val(sport_val);
        input.select();
        document.execCommand("copy");
    });

    $(document).on('click', '.load-sports', function() {
        var sport_val = $('#sports_text').val();
        $('.sports-val').val(sport_val);
        var arr_sport = sport_val.split(',');
        $('.sports').val(arr_sport);
        $('.sports').trigger('change');
    });

    $(document).on('click', '.copy-options', function() {
        var option_val = $('.block-pattern-options-val').val();
        var input = $('#block_pattern_options_text');
        input.val(option_val);
        input.select();
        document.execCommand("copy");
    });

    $(document).on('click', '.load-options', function() {
        var option_val = $('#block_pattern_options_text').val();
        $('.block-pattern-options-val').val(option_val);
        var arr_option = option_val.split(',');
        $('.block-pattern-options').val(arr_option);
        $('.block-pattern-options').trigger('change');
    });

});
</script>
@endsection
