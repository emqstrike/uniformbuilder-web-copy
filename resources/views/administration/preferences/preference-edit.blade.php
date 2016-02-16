@extends('administration.lte-main')

@section('custom-styles')
select:hover {
  background-color: transparent;
}
@endsection

@section('content')
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New preference</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/preferences/add" enctype="multipart/form-data" id='create-preference-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="preference_id" value="{{ $preference->id }}">
                        <input type="hidden" name="colors_properties" value="{{ $preference->colors_properties }}" id="existing-colors-properties">
                        

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
                            <label class="col-md-4 control-label">Font</label>
                            <div class="col-md-6">
                                <select name='font' class="form-control preference-font">
                                @foreach ($fonts as $font)
                                <option value='{{ $font->name }}' <?php if($font->name == $preference->font){ echo "selected"; } ?>>{{ $font->name }}</option>
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
                                    <tbody id="layers-row-container">
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-preference">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Preference
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
            $.each(test, function(entryIndex, entry) {
                var color = myJson[ctr]['default_color'];
                // console.log("HEX_CODE: "+entry['hex_code']);
                if(color == entry['color_code']){
                    colors_select = colors_select + "<option data-color="+entry['hex_code']+" style=\"background-color: #"+entry['hex_code']+"; text-shadow: 1px 1px #000;\" value="+entry['hex_code']+" selected>"+entry['name']+"</option>"
                } else {
                    colors_select = colors_select + "<option data-color="+entry['hex_code']+" style=\"background-color: #"+entry['hex_code']+"; text-shadow: 1px 1px #000;\" value="+entry['hex_code']+">"+entry['name']+"</option>"
                }
            });
            var colors = "<td>"
            +"<select class=\"ma-default-color layer"+ctr+"\" name=\"default_color[]\"  style=\"background-color: #"+myJson[ctr]['default_color']+"; color: #fff;text-shadow: 1px 1px #000;\">"
            +colors_select
            +"</select></td>";
            var remove = "<td><a class=\"btn btn-danger btn-xs btn-remove-layer\"><i class=\"fa fa-remove\"></i> Remove</a></td>";
            var close = "<tr>";
            $('#layers-row-container').append(open+layer+colors+remove+close);
            ctr++;
        }
        // console.log("Build Layers"+colors_array);
    }

    $('select:not(:has(option))').attr('visible', false);

    $('.ma-default-color').change(function(){
        var color = "#"+$('option:selected', this).data('color');
        $(this).css('background-color', color);
    });
});
</script>
@endsection