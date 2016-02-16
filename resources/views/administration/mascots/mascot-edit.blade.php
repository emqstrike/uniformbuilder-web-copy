@extends('administration.lte-main')

@section('content')
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
                        <input type="hidden" name="layers_properties" value="{{ $mascot->layers_properties }}" id="existing-layers-properties">
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
                                <a class="btn btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Layer</a>
                            </div>
                            </label>
                            <div class="col-md-6">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer</th>
                                            <th>New File</th>
                                            <th>Saved Thumbnail</th>
                                            <th>Default Color</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container">
                                        <!-- </tr> -->
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
</div>

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/mascots.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    buildLayers();
    function buildLayers(){
        existing_layers_properties = $('#existing-layers-properties').val();
        var myJson = JSON.parse(existing_layers_properties);

        var length = Object.keys(myJson).length;

        while(length > 0) {
            console.log("LENGTH: "+length);
            var open = "<tr class=\"layers-row\">";
            var layer = "<td><select class=\"ma-layer layer"+length+"\"  name=\"ma_layer[]\" disabled><option value = '"+length+"' class=\"layer-number\">"+length+"</option></select></td>";
            var file = "<td><input type=\"file\" class=\"ma-options-src layer"+length+"\" name=\"ma_image[]\"></td>";
            var thumbnail = "<td><img src="+myJson[length]['filename']+" style=\"width: 30px; height: 30px; background-color: #e3e3e3;\"><input type=\"hidden\" name=\"image-existing-source\" value=\""+myJson[length]['filename']+"\"></td>";
            var colors = "<td><select class=\"ma-default-color layer"+length+"\" name=\"default_color[]\"  style=\"background-color: #"+myJson[length]['default_color']+"; color: #fff;text-shadow: 1px 1px #000;\">@foreach ($colors as $color)@if ($color->active)<option data-color=\"#{{ $color->hex_code }}\" style=\"background-color: #{{ $color->hex_code }}; text-shadow: 1px 1px #000;\" value=\"{{ $color->hex_code }}\">{{ $color->name }}</option>@endif @endforeach<option value="+myJson[length]['default_color']+" style=\"background-color: #"+myJson[length]['filename']+"\" selected>{{ $color->name }}</option></select></td>";
            var remove = "<td><a class=\"btn btn-danger btn-xs btn-remove-layer\"><i class=\"fa fa-remove\"></i> Remove</a></td>";
            var close = "<tr>";
            $('#layers-row-container').append(open+layer+file+thumbnail+colors+remove+close);
            length--;
        }
    }

    $('select:not(:has(option))').attr('visible', false);

    $('.ma-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
    });
});
</script>
@endsection