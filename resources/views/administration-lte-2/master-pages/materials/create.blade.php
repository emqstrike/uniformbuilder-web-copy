@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-info">
                    @section('page-title', 'Create Material')
                    <div class="panel-heading">Create Material</div>

                    <div class="panel-body">
                        @include('administration.partials.validation-error')

                        <form class="form-horizontal" role="form" method="POST" action="/administration/v1-0/material/add" enctype="multipart/form-data" id='create-material-form'>
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">

                            <div class="form-group">
                                <label class="col-md-4 control-label">Material Name</label>
                                <div class="col-md-6">
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
                                <div class="col-md-6">
                                    <input type="text" class="form-control material-code" name="code" value="{{ old('code') }}">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Uniform Category</label>
                                <div class="col-md-6">
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
                                <label class="col-md-4 control-label">Block Pattern</label>
                                <div class="col-md-6">
                                    <select class="form-control material-block-pattern" name="block_pattern_id" id="block_pattern">
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Block Pattern Option</label>
                                <div class="col-md-6">
                                    <select class="form-control material-neck-option" name="neck_option" id="neck_option">
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Block Pattern Option 2</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="block_pattern_option_2">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Block Pattern Option 3</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control" name="block_pattern_option_3">
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
                                <div class="col-md-6">
                                    <select class="form-control material-design-type" name="design_type" id="design_type">
                                        <option value="style_sheet">Style Sheet</option>
                                        <option value="block_pattern">Block Pattern</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Asset Target</label>
                                <div class="col-md-6">
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
                                <div class="col-md-6">
                                    <input type="text" class="form-control material-price-item-code" name="price_item_code" value="">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Group</label>
                                <div class="col-md-6">
                                    <select name='sports_group_id' class="form-control uniform-category-group">
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
                                <div class="col-md-6">
                                    <select name='type' class="form-control type">
                                        <option value='upper'>Upper Body Uniform</option>
                                        <option value='lower'>Lower Body Uniform</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Gender</label>
                                <div class="col-md-6">
                                    <select name='gender' class="form-control gender">
                                        <option value='men'>Men</option>
                                        <option value='women'>Women</option>
                                        <option value='unisex'>Unisex</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Factory</label>
                                <div class="col-md-6">
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
                                        <option value='knitted'>Knitted</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">SKU</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control material-code" name="sku" value="">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Builder Customizations</label>
                                <div class="col-md-6">
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
                                    <div class="col-md-6 bump">
                                        <input type="file" class="form-control bump-map-file" name="bump_map_path" accept="image/*">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-4 control-label">Shadow File</label>
                                    <div class="col-md-6 shadow">
                                        <input type="file" class="form-control shadow-file" name="shadow_path" accept="image/*">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-4 control-label">Highlight File</label>
                                    <div class="col-md-6 highlight">
                                        <input type="file" class="form-control highlight-file" name="highlight_path" accept="image/*">
                                    </div>
                                </div>
                            @elseif (env('BUILDER_APPROACH') == '2D')
                                <div class="form-group">
                                    <label class="col-md-4 control-label">Design Sheet</label>
                                    <div class="col-md-6">
                                        <input type="file" class="form-control design-sheet-file" name="design_sheet_path"  accept="application/pdf">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-4 control-label">Front View Shape</label>
                                    <div class="col-md-6 front-view">
                                        <input type="file" class="form-control front-shape-file shape-view" data-perspective="front" name="front_view_shape" accept="image/*">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-4 control-label">Back View Shape</label>
                                    <div class="col-md-6 back-view">
                                        <input type="file" class="form-control back-shape-file" name="back_view_shape" accept="image/*">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-4 control-label">Right Side View Shape</label>
                                    <div class="col-md-6 right-side-view">
                                        <input type="file" class="form-control right-side-shape-file" name="right_side_view_shape" accept="image/*">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-4 control-label">Left Side View Shape</label>
                                    <div class="col-md-6 left-side-view">
                                        <input type="file" class="form-control left-side-shape-file" name="left_side_view_shape" accept="image/*">
                                    </div>
                                </div>
                            @endif

                            <div class="form-group">
                                <label class="col-md-4 control-label">Thumbnail File</label>
                                <div class="col-md-6">
                                    <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Thumbnail File Back</label>
                                <div class="col-md-6">
                                    <input type="file" class="form-control thumbnail-file" name="thumbnail_path_back" accept="image/*">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Thumbnail File Left</label>
                                <div class="col-md-6">
                                    <input type="file" class="form-control thumbnail-file" name="thumbnail_path_left" accept="image/*">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Thumbnail File Right</label>
                                <div class="col-md-6">
                                    <input type="file" class="form-control thumbnail-file" name="thumbnail_path_right" accept="image/*">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Description</label>
                                <div class="col-md-6">
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
                                <label class="col-md-4 control-label">Styles PDF</label>
                                <div class="col-md-4 material">
                                    <input type="file" class="form-control styles-pdf" name="styles_pdf" accept=".ai,.pdf" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label" >Customizer Available</label>
                               <div class="col-md-2">
                                    <select name="customizer_available" class="form-control">
                                            <option value="1">Yes</option>
                                            <option value="0" selected>No</option>
                                    </select>
                                </div>
                            </div>
                            <textarea id="item_sizes_string" style="display:none;"> {{$item_sizes_string}} </textarea>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Qx Sizing Config</label>
                                <div class="col-md-6">
                                    <select class="form-control qx-sizing-config" name="qx_sizing_config" id="qx_sizing_config">
                                    <option value="null"></option>
                                    @foreach ($item_sizes as $item_sizes)
                                        <option value='{{ $item_sizes->id }}'>{{ $item_sizes->description }}</option>
                                    @endforeach
                                    </select>
                                </div>
                                 <div class="col-md-4 material">
                                    <textarea class="sizing-config-prop" name="sizing_config_prop" id="sizing_config_prop" style="display:none;"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Brand</label>
                               <div class="col-md-6">
                                    <select name="brand" class="form-control">
                                        <option value="none">None</option>
                                        <option value="prolook">Prolook</option>
                                        <option value="richardson">Richardson</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Reversible Group</label>
                                <div class="col-md-6">
                                    <select name="reversible_group" class="form-control reversible-group">
                                        <option value="none">None</option>
                                        @foreach ($reversible_groups as $reversible_group)
                                            <option value='{{ $reversible_group->id }}'>{{ $reversible_group->sport }} -- {{ $reversible_group->description }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Reversible Pair ID</label>
                                <div class="col-md-6">
                                    <input type="number" class="form-control reversible-pair-id"  name="reversible_pair_id" >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Reversible Type</label>
                                <div class="col-md-6">
                                    <select name="reversible_type" class="form-control reversible-type">
                                        <option value="inner" >Inner</option>
                                        <option value="outer" >Outer</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary create-user">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Add New Material
                                    </button>
                                    <a href="{{ route('v1_materials_index') }}" class="btn btn-danger">
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
    </section>
@endsection

@section('scripts')

<script type="text/javascript" src="/js/libs/autosize.js"></script>
<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>

<script type="text/javascript">
        $(document).ready(function() {
           $('#block_patterns_data').hide();
            var block_patterns_array = $('#block_patterns_data').text();
            var z = JSON.parse(block_patterns_array);

            var sport = null;
            $(document).on('change', '.uniform-category', function() {
                sport = $('.uniform-category').val();
                var x = _.filter(z, function(e){ return e.uniform_category_id == sport; });
                $( '#block_pattern' ).html('');
                $.each(x, function(i, item) {
                    $('#block_pattern' ).append( '<option value="' + item.id + '">' + item.name + '</option>' );
                });
                $('#block_pattern').trigger('change');
            });

            $(document).on('change', '#block_pattern', function() {
                var id = $(this).val();
                $( '#neck_option' ).html('');
                var filtered_block_pattern = _.find(z, function( bp ) {
                    return bp.id == id;
                });
                var filtered_neck_options = JSON.parse(filtered_block_pattern.neck_options);
                $.each(filtered_neck_options, function(i, item) {
                     $( '#neck_option' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
                });
            });

            $('.uniform-category').trigger('change');

            tinymce.init({
                selector:'textarea.material-description'
            });

            $('.create-user').on('click', function(){
                saveEditor();
                console.log('SAVE');
            });

            function saveEditor() {
                window.mce = tinyMCE.activeEditor.getContent();
                console.log('MCE: ' + window.mce);
                $('#description').val(window.mce);
            }

            var item_size_array = $('#item_sizes_string').text();
            var size_prop = JSON.parse(item_size_array);

            $("#create-material-form").on("change", ".qx-sizing-config", function(e){
                selectedConfig();
            });

            function selectedConfig() {
                var selected_size_config = $('#qx_sizing_config option:selected').val();
                $('#sizing_config_prop').text('');
                $.each(size_prop, function(i, item) {
                    if (item.id == selected_size_config) {
                        $('#sizing_config_prop').text(item.properties);
                    }
                });
            }
        });
    </script>
@endsection
