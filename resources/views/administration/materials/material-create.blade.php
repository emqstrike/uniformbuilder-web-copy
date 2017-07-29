@extends('administration.lte-main')
 
@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Material</div>
                <div class="panel-body col-md-8 text-center">
                    
                </div>
                <div class="panel-body col-md-8">
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/material/add" enctype="multipart/form-data" id='create-material-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Name</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control material-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Status</label>
                            <div class="col-md-6">
                                <select class="form-control material-status" name="status">
                                    <option value="none">None</option>
                                    <option value="on_progress">On Progress</option>
                                    <option value="finished">Finished</option>
                                    <option value="improvement">Improvement</option>
                                </select>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Code</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control material-code" name="code" value="{{ old('code') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-8">
                                <select class="form-control material-block-pattern" name="block_pattern_id" id="block_pattern">
                                    <option value="">None</option>
                                    @foreach ($block_patterns as $block_pattern)
                                        @if ($block_pattern->active)
                                        <option value='{{ $block_pattern->id }}'>{{ $block_pattern->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern Option</label>
                            <div class="col-md-8">
                                <select class="form-control material-neck-option" name="neck_option" id="neck_option">
                                </select>
                            </div>
                        </div>
<hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Inch in Pixels</label>
                            <div class="col-md-6">
                                <input type="number" class="form-control" step="any" name="one_inch_in_px">
                            </div>
                        </div>
<hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Debug Mode</label>
                            <div class="col-md-6">
                                <select class="form-control material-debug_mode" name="debug_mode" id="debug_mode">
                                    <option value="0">OFF</option>
                                    <option value="1">ON</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Design Type</label>
                            <div class="col-md-8">
                                <select class="form-control material-design-type" name="design_type" id="design_type">
                                    <option value="style_sheet">Style Sheet</option>
                                    <option value="block_pattern">Block Pattern</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Asset Target</label>
                            <div class="col-md-8">
                                <select class="form-control material-asset-target" name="asset_target" id="asset_target">
                                    <option value="web">Web</option>
                                    <option value="ipad">iPad</option>
                                    <option value="team_stores">Team Stores</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Style Group</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-style-group" name="style_group">
                            </div>
                        </div>
<hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Price Item Code</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control material-price-item-code" name="price_item_code" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Category</label>
                            <div class="col-md-8">
                                <select name='uniform_category_id' class="form-control uniform-category">
                                @foreach ($uniform_categories as $category)
                                    @if ($category->active)
                                    <option value='{{ $category->id }}'>{{ $category->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Group</label>
                            <div class="col-md-6">
                                <select name='sports_group_id' class="form-control uniform-category">
                                <option value="">None</option>
                                @foreach ($uniform_categories as $category)
                                    @if ($category->active)
                                    <option value='{{ $category->id }}'>{{ $category->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-8">
                                <select name='type' class="form-control type">
                                    <option value='upper'>Upper Body Uniform</option>
                                    <option value='lower'>Lower Body Uniform</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Gender</label>
                            <div class="col-md-8">
                                <select name='gender' class="form-control gender">
                                    <option value='men'>Men</option>
                                    <option value='women'>Women</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Factory</label>
                            <div class="col-md-8">
                                <select name='factory_code' class="form-control factory-code">
                                    @foreach ($factories as $factory)
                                        @if ($factory->active)
                                        <option value='{{ $factory->code }}'>{{ $factory->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Is Blank</label>
                            <div class="col-md-2">
                                <select name='is_blank' class="form-control is-blank">
                                    <option value='0'>No</option>
                                    <option value='1'>Yes</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Is Sublimated</label>
                            <div class="col-md-2">
                                <select name='is_sublimated' class="form-control is-sublimated">
                                    <option value='0'>No</option>
                                    <option value='1'>Yes</option>
                                </select>
                            </div>

                            <label class="col-md-2 control-label">Price Item Template</label>
                            <div class="col-md-3">
                                <select class="form-control material-price-item-template-id" name="sublimated_price_item_template_id" id="sublimated_price_item_template_id">
                                    <option value="">None</option>
                                @foreach ($price_item_templates as $template)
                                    <option value='{{ $template->id }}'>{{ $template->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Is Twill</label>
                            <div class="col-md-2">
                                <select name='is_twill' class="form-control is-twill">
                                    <option value='0'>No</option>
                                    <option value='1'>Yes</option>
                                </select>
                            </div>

                            <label class="col-md-2 control-label">Price Item Template</label>
                            <div class="col-md-3">
                                <select class="form-control material-price-item-template-id" name="twill_price_item_template_id" id="twill_price_item_template_id">
                                    <option value="">None</option>
                                @foreach ($price_item_templates as $template)
                                    <option value='{{ $template->id }}'>{{ $template->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Is Infused</label>
                            <div class="col-md-2">
                                <select name='is_infused' class="form-control is-twill">
                                    <option value='0'>No</option>
                                    <option value='1'>Yes</option>
                                </select>
                            </div>

                            <label class="col-md-2 control-label">Price Item Template</label>
                            <div class="col-md-3">
                                <select class="form-control material-price-item-template-id" name="infused_price_item_template_id" id="infused_price_item_template_id">
                                    <option value="">None</option>
                                @foreach ($price_item_templates as $template)
                                    <option value='{{ $template->id }}'>{{ $template->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Application Type</label>
                            <div class="col-md-6">
                                <select name='uniform_application_type' class="form-control uniform-application-type">
                                    <option value='none'>None</option>
                                    <option value='infused'>Infused</option>
                                    <option value='sublimated'>Sublimated</option>
                                    <option value='tackle_twill'>Tackle Twill</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">SKU</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control material-code" name="sku" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Builder Customizations</label>
                            <div class="col-md-8">
                                <textarea class="form-control material-builder-customizations" name="builder_customizations"></textarea>
                            </div>
                        </div>

@if (env('BUILDER_APPROACH') == '3D')
                        <div class="form-group">
                            <label class="col-md-4 control-label">Base Material File</label>
                            <div class="col-md-8 material">
                                <input type="file" class="form-control material-file" name="material_path" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Bump Map File</label>
                            <div class="col-md-8 bump">
                                <input type="file" class="form-control bump-map-file" name="bump_map_path" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Shadow File</label>
                            <div class="col-md-8 shadow">
                                <input type="file" class="form-control shadow-file" name="shadow_path" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Highlight File</label>
                            <div class="col-md-8 highlight">
                                <input type="file" class="form-control highlight-file" name="highlight_path" accept="image/*">
                            </div>
                        </div>
@elseif (env('BUILDER_APPROACH') == '2D')

                        <div class="form-group">
                            <label class="col-md-4 control-label">Design Sheet</label>
                            <div class="col-md-8">
                                <input type="file" class="form-control design-sheet-file" name="design_sheet_path"  accept="application/pdf">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Front View Shape</label>
                            <div class="col-md-8 front-view">
                                <input type="file" class="form-control front-shape-file shape-view" data-perspective="front" name="front_view_shape" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Back View Shape</label>
                            <div class="col-md-8 back-view">
                                <input type="file" class="form-control back-shape-file" name="back_view_shape" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Right Side View Shape</label>
                            <div class="col-md-8 right-side-view">
                                <input type="file" class="form-control right-side-shape-file" name="right_side_view_shape" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Left Side View Shape</label>
                            <div class="col-md-8 left-side-view">
                                <input type="file" class="form-control left-side-shape-file" name="left_side_view_shape" accept="image/*">
                            </div>
                        </div>
@endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File</label>
                            <div class="col-md-8">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File Back</label>
                            <div class="col-md-8">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path_back" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File Left</label>
                            <div class="col-md-8">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path_left" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File Right</label>
                            <div class="col-md-8">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path_right" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-8">
                                <textarea class="form-control material-description" name=""></textarea>
                                <input type="hidden" name="description" id="description">
                            </div>
                        </div>

                        <textarea id="block_patterns_data"><?php echo json_encode($block_patterns, JSON_FORCE_OBJECT);?></textarea>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Price Item Template</label>
                            <div class="col-md-6">
                                <select class="form-control material-price-item-template-id" name="price_item_template_id" id="price_item_template_id">
                                    <option value="">None</option>
                                @foreach ($price_item_templates as $template)
                                    <option value='{{ $template->id }}'>{{ $template->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Part Aliases</label>
                            <div class="col-md-6">
                                <select class="form-control part-aliases" name="part_alias_id" id="part_alias_id">
                                    <option value="null"></option>
                                @foreach ($part_aliases as $part_alias)
                                    <option value='{{ $part_alias->id }}'>{{ $part_alias->description }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>
                         <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-user">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Material
                                </button>
                                <a href="/administration/materials" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
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
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
<script>
$( document ).ready(function() {

    $('#block_patterns_data').hide();
    var block_patterns_array = $('#block_patterns_data').text();

    var z = JSON.parse(block_patterns_array);

    window.block_patterns = _.flatten(z, true);

    $(document).on('change', '#block_pattern', function() {

        var id = $(this).val();

        $( '#neck_option' ).html('');

        $.each(z, function(i, item) {
            
            if( item.id == id ){

                var optx = JSON.parse(item.neck_options);

                $.each(optx, function(i, item) {
                    $( '#neck_option' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
                });
            } else {

            }
        });

    });

    tinymce.init({ 

        selector:'textarea.material-description'

    });

    $('.create-user').on('click', function(){

        saveEditor();
        console.log('SAVE');

    });

    function saveEditor(){

        window.mce = tinyMCE.activeEditor.getContent();
        console.log('MCE: ' + window.mce);
        $('#description').val(window.mce);

    }

});
</script>
@endsection