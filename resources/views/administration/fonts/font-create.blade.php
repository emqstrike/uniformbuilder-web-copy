@extends('administration.lte-main')

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
                <div class="panel-heading">Add New Font</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/font/add" enctype="multipart/form-data" id='create-font-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="font_properties" id="font_properties" value="">
                        <div class="form-group">
                            <label class="col-md-5 control-label">Font Name</label>
                            <div class="col-md-4">
                                <input type="name" class="form-control font-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-5 control-label">Tail Sweep</label>
                            <div class="col-md-4">
                                <input type="checkbox"  name="tail_sweep">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Upload Font File</label>
                            <div class="col-md-4 material">
                                <input type="file" class="form-control font-file" name="font_path" accept="font/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Font Type</label>
                            <div class="col-md-4">
                                <select class="form-control" name='type'>
                                    <option value='default'>Default</option>
                                    <option value='base'>Base (IN) --- a child of a "default"-type font</option>
                                    <option value='outline'>Outline (OUT) --- a child of a "default"-type font</option>
                                    <option value='accent'>Accent (3D) --- a child of a "default"-type font</option>
                                    <option value='tail sweeps'>Tail Sweep --- a child of a "default"-type font</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Parent Font</label>
                            <div class="col-md-4">
                                <select class="form-control" name='parent_id'>
                                    <option value='0'>---</option>
                                @foreach ($fonts as $font)
                                    <option value='{{ $font->id }}' style="font-family: '{{ $font->name }}'; font-size: 30px;">{{ $font->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-5 control-label">Sports</label>
                            <div class="col-md-4">
                                <input type="hidden" class="sports-val" name="sports_value">
                                <select name="sports[]" class="form-control sports" multiple="multiple">
                                    @foreach ($categories as $category)
                                        @if ($category->active)
                                        <option value='{{ $category->name }}'>
                                            {{ $category->name }}
                                        </option>
                                        @endif
                                    @endforeach
                                    <option value="All" selected>All</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-5 control-label">Tail Sweep Properties</label>
                            <div class="col-md-4">
                                <textarea class="form-control tail-sweep-properties animated" name="tail_sweep_properties">{{-- {{ $material->builder_customizations }} --}}</textarea>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-10 col-md-offset-1">
                                <table class="table table-bordered">
                                    <tr colspan="12"><center><h3>Font Size Table</h3></center></tr>
                                    <tr class="input-size-header">
                                    </tr>
                                    <tr class="output-size-row">
                                    </tr>
                                    <tr colspan="12"><center><h4><i>Upload Font first to see preview</i></h4></center></tr>
                                </table>
                                <input type="hidden" name="font_size_table" id="font_size_table">
                            </div>
                        </div>
                        <hr>
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
                                            <th>Upload Font File</th>
                                            <th>Font Type</th>
                                            <th>Parent Font</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container">
                                        <tr class="layers-row">
                                            <td>
                                                <select class="fo-layer layer1"  name="fo_layer[]" disabled>
                                                    <option value = '1' class="layer-number">1</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="name" class="form-control fo-name layer1" name="fo_name[]" value="">
                                            </td>
                                            <td>
                                                <input type="file" class="fo-file layer1" name="fo_file[]">
                                            </td>
                                            <td>
                                                <select class="form-control fo-type layer1" name='fo_type[]'>
                                                    <option value='default'>Default</option>
                                                    <option value='base'>Base (IN) --- a child of a "default"-type font</option>
                                                    <option value='outline'>Outline (OUT) --- a child of a "default"-type font</option>
                                                    <option value='accent'>Accent (3D) --- a child of a "default"-type font</option>
                                                    <option value='tail sweeps'>Tail Sweep --- a child of a "default"-type font</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select class="form-control fo-parent layer1" name='fo_parent[]'>
                                                    <option value='0'>---</option>
                                                @foreach ($fonts as $font)
                                                    <option value='{{ $font->id }}' style="font-family: '{{ $font->name }}'; font-size: 30px;">{{ $font->name }}</option>
                                                @endforeach
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
                                <button type="submit" class="btn btn-primary create-font">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Font
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
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/libs/autosize.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    $( "#static_row" ).hide();

    $('.sports').select2({
        placeholder: "Select Sports",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        $('.sports-val').val($(this).val());
    });

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

            $(this).find('.fo-file').removeClass().addClass("fo-file");
            $(this).find('.fo-file').addClass(thisLayer);
            var file_class = ".fo-file.layer" + length;
            $(this).find(file_class).addClass('fo-file');

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
