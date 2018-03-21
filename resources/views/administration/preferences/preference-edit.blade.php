@extends('administration.lte-main')

@section('custom-styles')
@endsection

@section('content')
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Edit preference</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/preference/update" enctype="multipart/form-data" id='create-preference-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="preference_id" value="{{ $preference->id }}">
                        <input type="hidden" name="existing_colors_properties" value="{{ $preference->colors_properties }}" id="existing-colors-properties">
                        <input type="hidden" name="colors_properties" id="existing-layers-properties">
                        

                        <div class="form-group">
                            <label class="col-md-4 control-label">Logo</label>
                            <img src="{{ $preference->logo }}" style="width: 50px; height: 50px;">
                            <div class="col-md-6">
                                <input type="file" class="form-control logo-file" name="logo" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control preference-name" name="name" value="{{ $preference->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">School</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control preference-name" name="school_name" value="{{ $preference->school_name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Team</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control preference-name" name="team_name" value="{{ $preference->team_name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Mascot</label>
                            <div class="col-md-6">
                                <select class="form-control preference-mascot" id="preference_mascot">
                                </select>
                                <input type="hidden" id="mascot" name="mascot">
                                <input type="hidden" id="current_mascot" name="current_mascot" value="{{ $preference->mascot_id }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Font</label>
                            <div class="col-md-6">
                                <select name='font' class="form-control preference-font">
                                @foreach ($fonts as $font)
                                <option value='{{ $font->name }}' 
                                <?php if($font->name == $preference->font){ echo "selected"; } ?>
                                >{{ $font->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select name='uniform_category' class="form-control preference-uniform-category">
                                @foreach ($uniform_categories as $uniform_category)
                                <option value='{{ $uniform_category->id }}' style="background-image:url(male.png);" <?php if($uniform_category->id == $preference->uniform_category_id){ echo "selected"; } ?>>{{ $uniform_category->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Colors
                            <div>
                                <a class="btn btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Color</a>
                            </div>
                            </label>
                            <div class="col-md-6">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Default Color</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container" class="sortable-colors">
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-preference">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Save Preference
                                </button>
                                <a href="/administration/preferences" class="btn btn-danger">
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/ddslick.min.js"></script>
<script type="text/javascript" src="/js/administration/preferences.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    var test;
    var colors_array = $('#colors_textarea').text();
    try {
        test = JSON.parse(colors_array);
    } catch(err) {
        console.log(err.message);
    }

    buildLayers();
    function buildLayers(){
        existing_layers_properties = $('#existing-colors-properties').val();
        console.log(existing_layers_properties);
        var myJson = JSON.parse(existing_layers_properties);

        var length = Object.keys(myJson).length;
        var ctr = 1;
        while(ctr <= length) {
            console.log("LENGTH: "+length);
            var open = "<tr class=\"layers-row\">";
            var layer = "<td><select class=\"ma-layer layer"+ctr+"\"  name=\"ma_layer[]\" disabled><option value = '"+ctr+"' class=\"layer-number\">"+ctr+"</option></select></td>";

            var colors_select="";
            var select_hex_code_bg = "";
            $.each(test, function(entryIndex, entry) {
                var color = myJson[ctr]['default_color'];
                // console.log("HEX_CODE: "+entry['hex_code']);
                if(color == entry['color_code']){
                    colors_select = colors_select + "<option data-color="+entry['hex_code']+" style=\"background-color: #"+entry['hex_code']+"; text-shadow: 1px 1px #000;\" value="+entry['color_code']+" selected>"+entry['name']+"</option>";
                    select_hex_code_bg = entry['hex_code'];
                } else {
                    colors_select = colors_select + "<option data-color="+entry['hex_code']+" style=\"background-color: #"+entry['hex_code']+"; text-shadow: 1px 1px #000;\" value="+entry['color_code']+">"+entry['name']+"</option>";
                }
            });
            var colors = "<td>"
            +"<select class=\"ma-default-color layer"+ctr+"\" name=\"default_color[]\" style=\"background-color: #"+select_hex_code_bg+"; color: #fff;text-shadow: 1px 1px #000;\">"
            +colors_select
            +"</select></td>";
            var remove = "<td><a class=\"btn btn-danger btn-xs btn-remove-layer\"><i class=\"fa fa-remove\"></i> Remove</a></td>";
            var close = "<tr>";
            $('#layers-row-container').append(open+layer+colors+remove+close);
            ctr++;

            $('.ma-default-color').change(function(){
                var color = "#"+$('option:selected', this).data('color');
                $(this).css('background-color', color);

                var color = $('option:selected', this).data('color');
                $(this).css('background-color', color);
                var length = $('.layers-row').length;
                renumberRows(length);
            });
        }
    }

    $('select:not(:has(option))').attr('visible', false);

    $('.ma-default-color').change(function(){
        var color = "#"+$('option:selected', this).data('color');
        $(this).css('background-color', color);

        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
        var length = $('.layers-row').length;
        renumberRows(length);
    });

    function renumberRows(length){
        layers_properties = {};
        var ctr = 1;
        $(".layers-row").each(function(i) {
            if(ctr <= length){
                var thisLayer = "layer"+ctr;
                var layer_class = ".ma-layer.layer" + ctr;

                layers_properties[ctr] = {};
                layers_properties[ctr]['default_color'] = {};
                layers_properties[ctr]['filename'] = {};

                $(this).find('.ma-layer').removeClass().addClass("ma-layer");
                $(this).find('.ma-layer').addClass(thisLayer);
                $(this).find(layer_class).addClass('ma-layer');

                $(this).find('.ma-default-color').removeClass().addClass("ma-default-color");
                $(this).find('.ma-default-color').addClass(thisLayer);
                var default_color_class = ".ma-default-color.layer" + ctr;
                $(this).find(default_color_class).addClass('ma-default-color');

                $(this).find('.ma-options-src').removeClass().addClass("ma-options-src");
                $(this).find('.ma-options-src').addClass(thisLayer);
                var src_class = ".ma-options-src.layer" + ctr;
                $(this).find(src_class).addClass('ma-options-src');

                var hexString = $(this).find(default_color_class).val()
                
                if(hexString.replace('#','')){
                    hexString = hexString.replace('#','');
                }
                
                layers_properties[ctr]['default_color'] = hexString;
                layers_properties[ctr]['filename'] = $(this).find(src_class).val();

                $('.ma-default-color').change(function(){
                    var color = "#"+$('option:selected', this).data('color');
                    $(this).css('background-color', color);

                    var color = $('option:selected', this).data('color');
                    $(this).css('background-color', color);
                    var length = $('.layers-row').length;
                    renumberRows(length);
                });
            }
            ctr++;
        });
        var layersProperties = JSON.stringify(layers_properties);

        $('#colors_properties').val(layersProperties);
        $('#existing-layers-properties').val(layersProperties);
        
    }

    var current_mascot = $('#current_mascot').val();

    window.items = null;
    getMascots(function(items){
        console.log(items);
        window.items = items;
    });

    function getMascots(callback){
        var items;
<<<<<<< Updated upstream
        // var url = "//" + api_host + "/api/mascots";
        var url = "//api.prolook.com/api/mascots";
=======
<<<<<<< HEAD
        var url = "//" + api_host + "/api/mascots";
=======
        // var url = "//" + api_host + "/api/mascots";
        var url = "//api.prolook.com/api/mascots";
>>>>>>> c88c648330b46adcd3f1fdad8611414f33cadafe
>>>>>>> Stashed changes
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                items = data['mascots'];
                console.log("Mascots: "+items);
                if(typeof callback === "function") callback(items);
            }
        });
    }

    $.each(window.items, function(i, item) {
        item['text'] = item.name;
        item['value'] = item.id;
        if( current_mascot == item.id ){
            item['selected'] = true;
        } else {
            item['selected'] = false;
        }
        item['description'] = 'Mascot';
        item['imageSrc'] = item.icon;
    });

    var ddData = window.items;

    $('#preference_mascot').ddslick({
        data: ddData,
        width: 300,
        height: 300,
        imagePosition: "left",
        selectText: "Select Mascot",
        onSelected: function (data) {
            $('#mascot').val(data['selectedData']['value']);
        },
    });

    var length = $('.layers-row').length;
    renumberRows(length);

});
</script>
@endsection