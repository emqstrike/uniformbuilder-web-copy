@extends('administration.lte-main')

@section('custom-styles')

@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Placeholder</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/placeholder/add" enctype="multipart/form-data">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <div class="form-group">
                            <label class="col-md-5 control-label">Name</label>
                            <div class="col-md-4">
                                <input type="name" class="form-control font-name" name="name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Item ID</label>
                            <div class="col-md-4">
                                <input type="name" class="form-control font-name" name="item_id">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Type</label>
                            <div class="col-md-4">
                                <select class="form-control" name='type'>
                                    <option value='Jersey'>Jersey</option>
                                    <option value='Pant'>Pant</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Sport</label>
                            <div class="col-md-4">
                                <select class="form-control" name='sport'>
                                    @foreach( $uniform_categories as $category )
                                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Front Thumbnail</label>
                            <div class="col-md-4 material">
                                <input type="file" class="form-control" name="thumbnail_front" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Back Thumbnail</label>
                            <div class="col-md-4 material">
                                <input type="file" class="form-control" name="thumbnail_back" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Left Thumbnail</label>
                            <div class="col-md-4 material">
                                <input type="file" class="form-control" name="thumbnail_left" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Right Thumbnail</label>
                            <div class="col-md-4 material">
                                <input type="file" class="form-control" name="thumbnail_right" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-font">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Placeholder
                                </button>
                                <a href="/administration/placeholders" class="btn btn-danger">
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
