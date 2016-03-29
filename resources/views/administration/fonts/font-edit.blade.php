@extends('administration.lte-main')

@section('custom-styles')

@foreach ($fonts as $fontItem)
@font-face { font-family: "{{ $fontItem->name }}"; src: url("{{ $fontItem->font_path }}"); }
@endforeach

@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Font</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/font/update" enctype="multipart/form-data" id='edit-font-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="font_id" value="{{ $font->id }}">
                        <input type="hidden" id="existing-fonts-properties" value="{{ $font->font_properties }}">
                        <input type="hidden" name="font_properties" id="font_properties" value="">
                        <input type="hidden" name="old_font_path" id="old_font_path" value="{{ $font->font_path }}">

                        <div class="form-group">
                            <div class="colr-md-6" align="center">
                                @if ($font->font_path)
                                <span style="font-family: '{{ $font->name }}'; font-size: 30px;">
                                    {{ $font->name }}<br>
                                    ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
                                </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Font Name</label>
                            <div class="col-md-4">
                                <input type="name" class="form-control base-font-name" name="name" value="{{ $font->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">
                                Font File
                            </label>
                            
                            <div class="col-md-4">
                                <input type="file" class="form-control font-file" name="font_path" accept="font/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Font Type</label>
                            <div class="col-md-4">
                                <select class="form-control" name='type'>
                                    <option value='default' @if ($font->type == 'default') selected @endif>Default</option>
                                    <option value='base' @if ($font->type == 'base') selected @endif>Base (IN) --- a child of a "default"-type font</option>
                                    <option value='outline' @if ($font->type == 'outline') selected @endif>Outline (OUT) --- a child of a "default"-type font</option>
                                    <option value='accent' @if ($font->type == 'accent') selected @endif>Accent (3D) --- a child of a "default"-type font</option>
                                    <option value='tail sweeps' @if ($font->type == 'tail sweeps') selected @endif>Tail Sweep --- a child of a "default"-type font</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Parent Font</label>
                            <div class="col-md-4">
                                <select class="form-control" name='parent_id'>
                                    <option value='0'>---</option>
                                @foreach ($fonts as $fontItem)
                                    <option value='{{ $fontItem->id }}' style="font-family: '{{ $fontItem->name }}'; font-size: 30px;" @if ($font->parent_id == $fontItem->id) selected @endif>{{ $fontItem->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-2 control-label">Layers
                            <div>
                                <a class="btn btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Layer</a>
                            </div>
                            </label>
                            <div class="col-md-10">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer #</th>
                                            <th>Font Name</th>
                                            <th>Upload New Font File</th>
                                            <th>Font Type</th>
                                            <th>Parent Font</th>
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
                                <button type="submit" class="btn btn-primary create-font">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Uniform font
                                </button>
                                <a href="/administration/fonts" class="btn btn-danger">
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
<script type="text/javascript" src="/js/administration/fonts.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    $(document).on('change', 'input, select', function() {
        var newLength = $('.layers-row').length;
        renumberRows(newLength);
    });

    $( "tbody" ).disableSelection();
    $( "tbody" ).sortable({
        start: function( ) {
            $('.ui-sortable-placeholder').css('background-color','#e3e3e3');
        },
        stop: function( ) {
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

    $(document).on('click', '.clone-row', function() {
        console.log('clone');
        $( ".layers-row:first" ).clone().appendTo( "#layers-row-container" );

        var length = $('.layers-row').length;
        $(".layers-row").each(function(i) {
            $(this).find(".layer-number").text(length);
            $(this).find(".layer-number").val(length);
            length--;
        });

        $(document).on('change', 'input, select', function() {
            var newLength = $('.layers-row').length;
            renumberRows(newLength);
        });

        var newLength = $('.layers-row').length;
    });

    buildLayers();
    function buildLayers(){
        existing_fonts_properties = $('#existing-fonts-properties').val();
        var myJson = JSON.parse(existing_fonts_properties);
        var length = Object.keys(myJson).length;

        // console.log(myJson[0].name);
        var length = Object.keys(myJson).length - 1;
        // console.log(length);

        window.fonts = null;
        getFonts(function(fonts){
            window.fonts = fonts;
        });

        function getFonts(callback){
            var mascots;
            var url = "//api-dev.qstrike.com/api/fonts";
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    fonts = data['fonts'];
                    if(typeof callback === "function") callback(fonts);
                }
            });
        }

        // console.log(window.fonts[0]);

        while(length > 0) {
            $(document).on('change', function() {
                var length = $('.layers-row').length;
                renumberRows(length);
            });
            // console.log("LENGTH: "+length);
            var open = "<tr class=\"layers-row\">";
            var layer = "<td><select class=\"fo-layer layer"+length+"\"  name=\"fo_layer[]\" disabled><option value = '"+length+"' class=\"layer-number\">"+length+"</option></select></td>";
            
            var type_options = '';
            var fonts_options = '';

            var typeValues = ["default", "base", "outline", "accent", "tail"];
            var typeTexts = [
                    "Default",
                    "Base (IN) --- a child of a 'default'-type font",
                    "Outline (OUT) --- a child of a 'default'-type font",
                    "Accent (3D) --- a child of a 'default'-type font",
                    "Tail Sweep --- a child of a 'default'-type font"
                ];

            $.each(typeValues, function(entryIndex, entry) {
                if(entry == myJson[length].type){
                    type_options += '<option value="' + typeValues[entryIndex] + '" selected>' + typeTexts[entryIndex] + '</option>'
                } else {
                    type_options += '<option value="' + typeValues[entryIndex] + '">' + typeTexts[entryIndex] + '</option>'
                }
            });

            $.each(window.fonts, function(i, item) {
                if(item.id == myJson[length].parent_id){
                    fonts_options += '<option value="' + item.id + '" style="font-family: ' + item.name + '; font-size: 30px;" selected>' + item.name + '</option>'
                } else {
                    fonts_options += '<option value="' + item.id + '" style="font-family: ' + item.name + '; font-size: 30px;">' + item.name + '</option>'
                }
            });

            var name = '<td><input type="text" class="fo-name layer' + length + '" name="fo_name[]" value="' + myJson[length].name + '"></td>';
            var file = '<td><input type="file" class="fo-file layer"' + length + '" name="fo_file[]"></td>';
            var file_ref = '<input type="hidden" class="fo-file-ref layer' + length + '" value="' + myJson[length].font_path + '">';
            var type = '<td><select name="fo_type[]" class="fo-type layer"' + length + '">"' + type_options + '"</select></td>';
            var parent_font = '<td><select name="fo_parent[]" class="fo-parent layer"' + length + '">"' + fonts_options + '"</select></td>';

            var remove = "<td><a class=\"btn btn-danger btn-xs btn-remove-layer\"><i class=\"fa fa-remove\"></i> Remove</a></td>";
            var close = "<tr>";
            $('#layers-row-container').append(open+layer+name+file+file_ref+type+parent_font+remove+close);
            length--;
        }
    }

    function renumberRows(length){
        layers_properties = {};
        $(".layers-row").each(function(i) {
            var thisLayer = "layer"+length;
            var layer_class = ".fo-layer.layer" + length;

            layers_properties[length] = {};
            layers_properties[length]['name'] = {};
            layers_properties[length]['font_path'] = {};
            layers_properties[length]['type'] = {};
            layers_properties[length]['parent_id'] = {};

            $(this).find('.fo-layer').removeClass().addClass("fo-layer");
            $(this).find('.fo-layer').addClass(thisLayer);
            $(this).find(layer_class).addClass('fo-layer');

            $(this).find('.fo-name').removeClass().addClass("fo-name");
            $(this).find('.fo-name').addClass(thisLayer);
            var name_class = ".fo-name.layer" + length;
            $(this).find(name_class).addClass('fo-name');

            $(this).find('.fo-file-ref').removeClass().addClass("fo-file-ref");
            $(this).find('.fo-file-ref').addClass(thisLayer);
            var file_class = ".fo-file-ref.layer" + length;
            $(this).find(file_class).addClass('fo-file-ref');

            $(this).find('.fo-type').removeClass().addClass("fo-type");
            $(this).find('.fo-type').addClass(thisLayer);
            var type_class = ".fo-type.layer" + length;
            $(this).find(type_class).addClass('fo-type');

            $(this).find('.fo-parent').removeClass().addClass("fo-parent");
            $(this).find('.fo-parent').addClass(thisLayer);
            var parent_class = ".fo-parent.layer" + length;
            $(this).find(parent_class).addClass('fo-parent');

            layers_properties[length]['name'] = $(this).find(name_class).val();
            layers_properties[length]['font_path'] = $(this).find(file_class).val();
            layers_properties[length]['type'] = $(this).find(type_class).val();
            layers_properties[length]['parent_id'] = $(this).find(parent_class).val();

            length--;
        });
        var layersProperties = JSON.stringify(layers_properties);
        console.log('Font PROP >> '+layersProperties);
        window.lp = layersProperties;
        $('#font_properties').val(layersProperties);
    }
});
</script>
@endsection
