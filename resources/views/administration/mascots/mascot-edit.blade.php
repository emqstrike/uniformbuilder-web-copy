@extends('administration.lte-main')

@section('content')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<style type="text/css">
    
    li.select2-selection__choice {
    color: black !important;
}
</style>
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New mascot</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/mascot/update" enctype="multipart/form-data" id='edit-mascot-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="mascot_id" value="{{ $mascot->id }}">
                        <input type="hidden" value="{{ $mascot->layers_properties }}" id="existing-layers-properties">
                        <input type="hidden" name="layers_properties" id="layers-properties">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Mascot Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-name" name="name" value="{{ $mascot->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-code" name="code" value="{{ $mascot->code }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Category</label>
                            <div class="col-md-6">
                                <select name='category' class="form-control mascot-category">
                                    @foreach ($mascots_categories as $mascot_category)
                                        <option value='{{ $mascot_category }}' <?php if($mascot_category == $mascot->category){ echo "selected"; } ?>>{{ $mascot_category }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <!-- <div class="form-group">
                            <label class="col-md-4 control-label">Team Color ID</label>
                            <div class="col-md-6">
                                <select name='team_color_id' class="form-control mascot-team-color-id">
                                    <option value="1" <?php if($mascot->team_color_id == 1){ echo "selected"; } ?>>1</option>
                                    <option value="2" <?php if($mascot->team_color_id == 2){ echo "selected"; } ?>>2</option>
                                    <option value="3" <?php if($mascot->team_color_id == 3){ echo "selected"; } ?>>3</option>
                                    <option value="4" <?php if($mascot->team_color_id == 4){ echo "selected"; } ?>>4</option>
                                    <option value="5" <?php if($mascot->team_color_id == 5){ echo "selected"; } ?>>5</option>
                                    <option value="6" <?php if($mascot->team_color_id == 6){ echo "selected"; } ?>>6</option>
                                    <option value="7" <?php if($mascot->team_color_id == 7){ echo "selected"; } ?>>7</option>
                                    <option value="8" <?php if($mascot->team_color_id == 8){ echo "selected"; } ?>>8</option>
                                    <option value="9" <?php if($mascot->team_color_id == 9){ echo "selected"; } ?>>9</option>
                                    <option value="10" <?php if($mascot->team_color_id == 10){ echo "selected"; } ?>>10</option>
                                </select>
                            </div>
                        </div> -->

                        <div class="form-group">
                            <label class="col-md-4 control-label">Icon</label>
                            <div class="col-md-6 front-view">
                                <img src="{{ $mascot->icon }}">
                                <input type="file" class="form-control icon" name="icon" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layers
                            <div>
                                <a class="btn btn-primary clone-row-mascot btn-xs"><i class="fa fa-plus"></i> Add Layer</a>
                            </div>
                            </label>
                            <div class="col-md-6">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer</th>
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
                                                <input type="file" class="ma-options-src layer1" name="ma_image[]">
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
                                                <a class="btn btn-danger btn-xs btn-remove-layer"><i class="fa fa-remove"></i> Remove</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-mascot">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Mascot
                                </button>
                                <a href="/administration/mascots" class="btn btn-danger">
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

<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/mascots.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    $( "#static_row" ).hide();

    $(document).on('click', '.clone-row-mascot', function() {

        // $( ".layers-row:first" ).clone().appendTo( "#layers-row-container" );

        console.log('clone');
        if( $( ".layers-row" ).length ){
            console.log('IF');
            try{
            $( ".layers-row:first" ).clone().appendTo( "#layers-row-container" );
            } catch(err){
                console.log(err.message);
            }
        } else {
            console.log('ELSE');
            try{
                $( "#static_row" ).show();
                // var elemx = $( "#static_row" );
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

         $(document).on("change", ".ma-default-color", function(){

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
    function buildLayers(){
        existing_layers_properties = $('#existing-layers-properties').val();
        console.log($('#existing-layers-properties').val());

        var myJson = JSON.parse(existing_layers_properties);

        var length = Object.keys(myJson).length;

        while(length > 0) {
            $(document).on('change', function() {
                var length = $('.layers-row').length;
                renumberRows(length);
            });
            // console.log("LENGTH: "+length);
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
            // console.log(team_color_id_options);
            var team_color_id = '<td><select class="ma-team-color-id layer' + length + '" name="ma_team_color_id[]">' + team_color_id_options + '</select></td>';
            var file = "<td><input type=\"file\" class=\"ma-options-src layer"+length+"\" name=\"ma_image[]\"></td>";
            // var thumbnail = '<td><img src="'+myJson[length]['filename']+'" style="width: 30px; height: 30px; background-color: #e3e3e3;"><input type="hidden" name="image-existing-source" value="'+myJson[length]['filename']+'"></td>';
            // var imgURL = encodeURIComponent(myJson[length]['filename']);
            imgURL = myJson[length]['filename'].replace(" ", "%20");
            // console.log(imgURL);
            var thumbnail = '<td><img src="'+imgURL+'" style="width: 30px; height: 30px; background-color: #000;"><input type="hidden" class="default_img" name="image-existing-source" value="'+myJson[length]['filename']+'"></td>';
            
            var colors_select="";
            var select_hex_code_bg = "";
            $.each(test, function(entryIndex, entry) {
                var color = myJson[length]['default_color'];
                // console.log("HEX_CODE: "+entry['hex_code']);
                // console.log("COLOR: : "+color+" ENTRY COLOR: "+entry['color_code']);
                if(color == entry['color_code']){
                    // console.log('ENTRY_HEX: '+entry['hex_code']);
                    colors_select = colors_select + "<option data-color="+entry['hex_code']+" style=\"background-color: #"+entry['hex_code']+"; text-shadow: 1px 1px #000;\" value="+entry['color_code']+" selected>"+entry['name']+"</option>";
                    select_hex_code_bg = entry['hex_code'];
                } else {
                    colors_select = colors_select + "<option data-color="+entry['hex_code']+" style=\"background-color: #"+entry['hex_code']+"; text-shadow: 1px 1px #000;\" value="+entry['color_code']+">"+entry['name']+"</option>";
                }
            });
// console.log("SELECT HEXCODE BG: "+select_hex_code_bg);
            // var colors = "<td><select class=\"ma-default-color layer"+length+"\" name=\"default_color[]\"  style=\"background-color: #"+myJson[length]['default_color']+"; color: #fff;text-shadow: 1px 1px #000;\">@foreach ($colors as $color)@if ($color->active)<option data-color=\"#{{ $color->hex_code }}\" style=\"background-color: #{{ $color->hex_code }}; text-shadow: 1px 1px #000;\" value=\"{{ $color->hex_code }}\">{{ $color->name }}</option>@endif @endforeach<option value="+myJson[length]['default_color']+" style=\"background-color: #"+myJson[length]['filename']+"\" selected>{{ $color->name }}</option></select></td>";
            var colors = "<td>"
            +"<select class=\"ma-default-color layer"+length+"\" name=\"default_color[]\" style=\"background-color: #"+select_hex_code_bg+"; color: #fff;text-shadow: 1px 1px #000;\">"
            +colors_select
            +"</select></td>";
            var remove = "<td><a class=\"btn btn-danger btn-xs btn-remove-layer\"><i class=\"fa fa-remove\"></i> Remove</a></td>";
            var close = "<tr>";
            $('#layers-row-container').append(open+layer+team_color_id+file+thumbnail+colors+remove+close);
            length--;
        }
    }

    $('select:not(:has(option))').attr('visible', false);

    // $('.ma-default-color').change(function(){
    //     var color = $('option:selected', this).data('color');
    //     $(this).css('background-color', color);
    // });
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

            $(this).find('.ma-layer').removeClass().addClass("ma-layer");
            $(this).find('.ma-layer').addClass(thisLayer);
            $(this).find(layer_class).addClass('ma-layer');

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
            
            layers_properties[length]['team_color_id'] = $(this).find(team_color_id_class).val();

            length--;
        });
        var layersProperties = JSON.stringify(layers_properties);
        window.lp = layersProperties;
        console.log(layersProperties);
        $('#layers-properties').val(layersProperties);
        $('#existing-colors-properties').val(layersProperties);
    }
  
     
  
      // $(".mascot_tags").select2({
      //       placeholder: "Select colors",
      //       multiple: true,
      //       allowClear: true
      //   });
      // var mascotValue = $(".mascotTagsValue").val();
      // mascotValue = JSON.parse(mascotValue);
      //  $(".mascot_tags").select2().val(mascotValue).trigger("change"); 
       
          




      
});
</script>
@endsection