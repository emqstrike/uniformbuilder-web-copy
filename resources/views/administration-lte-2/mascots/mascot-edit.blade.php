@extends('administration-lte-2.lte-main')

@section('styles')
    <style>
        .ma-layer-name {
            width: 200px !important;
        }
    </style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading"><b>Update mascot</b></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/v1-0/mascot/update" enctype="multipart/form-data" id='edit-mascot-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="mascot_id" value="{{ $mascot->id }}">
                        <input type="hidden" value="{{ $mascot->layers_properties }}" id="existing-layers-properties">
                        <input type="hidden" name="layers_properties" id="layers-properties">
                        <div class="form-group">
                            <label class="col-md-3 control-label">Mascot Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-name" name="name" value="{{ $mascot->name }}" required="true">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label">Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-code" name="code" value="{{ $mascot->code }}" >
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label">Alias</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-alias" name="alias" value="{{ $mascot->alias }}" >
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label">Category</label>
                            <div class="col-md-6">
                                <select name='category' class="form-control mascot-category" required="true">
                                    @foreach ($mascots_categories as $mascot_category)
                                        <option value='{{ $mascot_category }}' <?php if($mascot_category == $mascot->category){ echo "selected"; } ?>>{{ $mascot_category }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label">Sports</label>
                            <div class="col-md-6">
                                <input type="hidden" class="sports-val" id="sports_value" name="sports_value" value="{{ $mascot->sports }}">
                                <select name="sports[]" class="form-control sports" multiple="multiple" required="true">
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
                            <label class="col-md-3 control-label">Icon</label>
                            <div class="col-md-6 front-view">
                                <img src="{{ $mascot->icon }}" style="height: 100px; width: 110px;">
                                <input type="file" class="form-control icon" name="icon" accept="image/*" >
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label">File</label>
                            <div class="col-md-6 front-view">
                                <a href="{{ $mascot->ai_file }}"> {{ $mascot->ai_file }} </a>
                                <input type="file" class="form-control ai-file" name="ai_file" accept=".ai,.pdf" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-3 control-label" >Brand</label>
                           <div class="col-md-6">
                                <select name="brand" class="form-control" required="true">
                                        <option value="none" @if($mascot->brand == "none") selected="selected"@endif>None</option>
                                        <option value="prolook" @if($mascot->brand == "prolook") selected="selected"@endif>Prolook</option>
                                        <option value="richardson" @if($mascot->brand == "richardson") selected="selected"@endif>Richardson</option>
                                        <option value="riddell" @if($mascot->brand == "riddell") selected="selected"@endif>Riddell</option>
                                </select>
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-3 control-label" >Is Typographic?</label>
                           <div class="col-md-6">
                                <select name="typographic" class="form-control" required="true">
                                        <option value="0" @if($mascot->typographic == "0") selected="selected"@endif>No</option>
                                        <option value="1" @if($mascot->typographic == "1") selected="selected"@endif>Yes</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-3 control-label">Layers
                            <div>
                                <a class="btn btn-primary clone-row-mascot btn-xs btn-flat">Add Layer</a>
                            </div>
                            </label>
                            <div class="col-md-6">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer</th>
                                            <th>Layer Name</th>
                                            <th>Team Color ID</th>
                                            <th>New File</th>
                                            <th>Saved Thumbnail</th>
                                            <th>Default Color</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container">
                                        <tr id="static_row">
                                            <td>
                                                <select class="ma-layer layer1"  name="ma_layer[]" disabled>
                                                    <option value = '1' class="layer-number">1</option>
                                                </select>
                                            </td>

                                            <td>
                                                <input type="text" class="form-control ma-layer-name layer1" name="ma_layer_name[]">
                                            </td>

                                            <td>
                                                <select class="ma-team-color-id layer1" name="ma_team_color_id[]">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                            </td>

                                            <td>
                                                <input type="file" class="ma-options-src layer1" name="ma_image[]" >
                                            </td>

                                            <td>
                                                <select class="form-control ma-default-color layer1" name="default_color[]" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                                    @foreach ($colors as $color)
                                                        @if ($color->active)
                                                            <option data-color="#{{ $color->hex_code }}" style="background-color: #{{ $color->hex_code }}; text-shadow: 1px 1px #000;" value="{{ $color->color_code }}">
                                                                {{ $color->name }}
                                                            </option>
                                                        @endif
                                                    @endforeach

                                                    <option data-color="" value="" id="saved-default-color"></option>
                                                </select>
                                            </td>

                                            <td>
                                                <a class="btn btn-danger btn-xs btn-remove-layer btn-flat">Remove</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-mascot btn-flat">
                                    Update Record
                                </button>
                                <a href="/administration/v1-0/mascots" class="btn btn-danger btn-flat">
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
    <textarea id="colors_textarea"><?php echo json_encode($colors, JSON_FORCE_OBJECT);?></textarea>
</div>

@endsection

@section('custom-scripts')

<script type="text/javascript">
    $(document).ready(function() {
        $("#static_row").hide();
        $('#colors_textarea').hide();

        $("#layers-row-container").disableSelection();

        $("#layers-row-container").sortable({
            start: function() {
                $('.ui-sortable-placeholder').css('background-color','#e3e3e3');
            },
            stop: function() {
                var length = $('.layers-row').length;
                $(".layers-row").each(function(i) {
                    $(this).find(".layer-number").text(length);
                    $(this).find(".layer-number").val(length);
                    length = length-1;
                });
                var newLength = $('.layers-row').length;
                renumberRows(newLength);
            }
        });

        $(document).on('click', '.clone-row-mascot', function() {
            if ($(".layers-row").length) {
                try {
                    var x = $( ".layers-row:first" ).clone();
                    y = "<td><a class='btn btn-danger btn-xs btn-remove-layer btn-flat'>Remove</a></td>";
                    $('#layers-row-container').append(x);
                    $(x).append(y);
                } catch(err){
                    console.log(err.message);
                }
            } else {
                try{
                    $( "#static_row" ).show();
                    var elemX = $( "#static_row" ).clone()
                    elemX.addClass('layers-row').removeAttr('id').clone().appendTo( "#layers-row-container" );
                    $( "#static_row" ).remove();
                } catch(err){
                    console.log(err.message);
                }
            }

            var length = $('.layers-row').length;
            $(".layers-row").each(function(i) {
                $(this).find(".layer-number").text(length);
                $(this).find(".layer-number").val(length);
                length--;
            });

            $(document).on("change", ".ma-default-color", function() {
                var color = $('option:selected', this).data('color');
                $(this).css('background-color', color);
            });

            var length = $('.layers-row').length;
            $(".layers-row").each(function(i) {
                $(this).find(".layer-number").text(length);
                $(this).find(".layer-number").val(length);
                length--;
            });

            var newLength = $('.layers-row').length;
            renumberRows(newLength);
        });

        var test;
        var colors_array = $('#colors_textarea').text();

        try {
            test = JSON.parse(colors_array);
        } catch(err) {
            console.log(err.message);
        }

        $(document).on('change', function() {
            var length = $('.layers-row').length;
            renumberRows(length);
        });

        buildLayers();
        function buildLayers() {
            existing_layers_properties = $('#existing-layers-properties').val();

            var myJson = JSON.parse(existing_layers_properties);

            var length = Object.keys(myJson).length;
            var first_row_index = length;

            while(length > 0) {
                $(document).on('change', function() {
                    var length = $('.layers-row').length;
                    renumberRows(length);
                });

                var open = "<tr class=\"layers-row\">";
                var layer = "<td><select class=\"ma-layer layer"+length+"\"  name=\"ma_layer[]\" disabled><option value = '"+length+"' class=\"layer-number\">"+length+"</option></select></td>";

                var team_color_id_options = '';

                for(var i = 1; i <= 10; i++){
                    if( myJson[length]['team_color_id'] == i ){
                        team_color_id_options += '<option value="'+i+'" selected>'+i+'</option>';
                    } else {
                        team_color_id_options += '<option value="'+i+'">'+i+'</option>';
                    }
                }

                var team_color_id = '<td><select class="ma-team-color-id layer' + length + '" name="ma_team_color_id[]">' + team_color_id_options + '</select></td>';
                var file = "<td><input type=\"file\" class=\"ma-options-src layer"+length+"\" name=\"ma_image[]\"></td>";
                imgURL = myJson[length]['filename'].replace(" ", "%20");

                var layerName = "";

                if (myJson[length]['layer_name']) {
                    layerName = myJson[length]['layer_name'];
                }

                var layerNameCell = `
                    <td>
                        <input type="text" class="form-control ma-layer-name layer ` + length + `" name="ma_layer_name[]" value="` + layerName + `">
                    </td>
                `;

                var thumbnail = '<td><img src="'+imgURL+'" style="width: 30px; height: 30px; background-color: #000;"><input type="hidden" class="default_img" name="image-existing-source" value="'+myJson[length]['filename']+'"></td>';

                var colors_select="";
                var select_hex_code_bg = "";
                $.each(test, function(entryIndex, entry) {
                    var color = myJson[length]['default_color'];
                    if(color == entry['color_code']){
                        colors_select = colors_select + "<option data-color="+entry['hex_code']+" style=\"background-color: #"+entry['hex_code']+"; text-shadow: 1px 1px #000;\" value="+entry['color_code']+" selected>"+entry['name']+"</option>";
                        select_hex_code_bg = entry['hex_code'];
                    } else {
                        colors_select = colors_select + "<option data-color="+entry['hex_code']+" style=\"background-color: #"+entry['hex_code']+"; text-shadow: 1px 1px #000;\" value="+entry['color_code']+">"+entry['name']+"</option>";
                    }
                });

                var colors = "<td>"
                +"<select class=\"ma-default-color layer"+length+"\" name=\"default_color[]\" style=\"background-color: #"+select_hex_code_bg+"; color: #fff;text-shadow: 1px 1px #000;\">"
                +colors_select
                +"</select></td>";
                var remove = "<td><a class=\"btn btn-danger btn-xs btn-flat btn-remove-layer\">Remove</a></td>";
                var close = "<tr>";

                if(first_row_index == length) {
                    $('#layers-row-container').append(open + layer + layerNameCell + team_color_id + file + thumbnail + colors + close);
                } else {
                    $('#layers-row-container').append(open + layer + layerNameCell + team_color_id + file + thumbnail + colors + remove + close);
                }

                length--;
            }
        }

    $('select:not(:has(option))').attr('visible', false);

    $(document).on("change", ".ma-default-color", function(){
        console.log("wehiuwhekjwhekhwkje");
        var color = "#"+$('option:selected', this).data('color');
        $(this).css('background-color', color);

        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
        var length = $('.layers-row').length;
        renumberRows(length);
    });

    var length = $('.layers-row').length;
        renumberRows(length);

    function renumberRows(length){
        layers_properties = {};
        $(".layers-row").each(function(i) {
            var thisLayer = "layer"+length;
            var layer_class = ".ma-layer.layer" + length;

            layers_properties[length] = {};
            layers_properties[length]['default_color'] = {};
            layers_properties[length]['layer_number'] = {};
            layers_properties[length]['filename'] = {};
            layers_properties[length]['layer_name'] = {};

            $(this).find('.ma-layer').removeClass().addClass("ma-layer");
            $(this).find('.ma-layer').addClass(thisLayer);
            $(this).find(layer_class).addClass('ma-layer');

            $(this).find('.ma-layer-name').removeClass().addClass('ma-layer-name').addClass(thisLayer);
            var layer_name_class = ".ma-layer-name.layer" + length;
            $(this).find(layer_name_class).addClass('ma-layer-name');


            $(this).find('.ma-team-color-id').removeClass().addClass("ma-team-color-id");
            $(this).find('.ma-team-color-id').addClass(thisLayer);
            var team_color_id_class = ".ma-team-color-id.layer" + length;
            $(this).find(team_color_id_class).addClass('ma-team-color-id');

            $(this).find('.ma-default-color').removeClass().addClass("ma-default-color");
            $(this).find('.ma-default-color').addClass(thisLayer);
            var default_color_class = ".ma-default-color.layer" + length;
            $(this).find(default_color_class).addClass('ma-default-color');

            $(this).find('.ma-options-src').removeClass().addClass("ma-options-src");
            $(this).find('.ma-options-src').addClass(thisLayer);
            var src_class = ".ma-options-src.layer" + length;
            $(this).find(src_class).addClass('ma-options-src');

            var hexString = $(this).find(default_color_class).val()

            if(hexString.replace('#','')){
                hexString = hexString.replace('#','');
            }

            layers_properties[length]['default_color'] = hexString;
            layers_properties[length]['layer_number'] = $(this).find(layer_class).val();

            layers_properties[length]['filename'] = $(this).find('.default_img').val();

            if($(this).find(src_class).val()){
                layers_properties[length]['filename'] = $(this).find(src_class).val();
            }

            layers_properties[length]['layer_name'] = $(this).find(layer_name_class).val();

            layers_properties[length]['team_color_id'] = $(this).find(team_color_id_class).val();

            length--;
        });
        var layersProperties = JSON.stringify(layers_properties);
        window.lp = layersProperties;
        console.log(layersProperties);
        $('#layers-properties').val(layersProperties);
        $('#existing-colors-properties').val(layersProperties);
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
        renumberRows(length);
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
    });

    $('.sports').val(sports);
    $('.sports').trigger('change');

});
</script>
@endsection
