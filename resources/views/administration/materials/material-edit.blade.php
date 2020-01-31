@extends('administration.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Material</div>
                <div class="panel-body">
                    @include('administration.partials.validation-error')

                    <form class="form-horizontal" role="form" method="POST" action="/administration/material/update" enctype="multipart/form-data" id='edit-material-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="material_id" value="{{ $material->id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-name" name="name" value="{{ $material->name }}">
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Status</label>
                            <div class="col-md-6">
                                <select class="form-control material-status" name="status" value="{{ $material->status }}">
                                    <option value="none">None</option>
                                    <option value="on_progress" @if( $material->status == "on_progress" ) selected="selected"@endif>On Progress</option>
                                    <option value="finished" @if( $material->status == "finished" ) selected="selected"@endif>Finished</option>
                                    <option value="improvement" @if( $material->status == "improvement" ) selected="selected"@endif>Improvement</option>
                                </select>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Code</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-code" name="code" value="{{ $material->code }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Category</label>
                            <div class="col-md-6">
                                <select name='uniform_category_id' class="form-control uniform-category">
                                @foreach ($uniform_categories as $category)
                                    @if ($category->active)
                                    <option value='{{ $category->id }}'@if($material->uniform_category_id == $category->id) selected="selected"@endif>{{ $category->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-6">
                                <input type="hidden" id="existing_block_pattern" value="{{ $material->block_pattern_id }}">
                                <select class="form-control material-block-pattern" name="block_pattern_id" id="block_pattern_id">
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern Option</label>
                            <div class="col-md-6">
                            <input type="hidden" id="existing_neck_option" value="{{ $material->neck_option }}">
                                <select class="form-control material-neck-option" name="neck_option" id="neck_option">
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern Option 2</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control" name="block_pattern_option_2" value="{{ $material->block_pattern_option_2 }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern Option 3</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control" name="block_pattern_option_3" value="{{ $material->block_pattern_option_3 }}">
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Inch in Pixels</label>
                            <div class="col-md-6">
                                <input type="number" class="form-control" step="any" name="one_inch_in_px" value="{{ $material->one_inch_in_px }}">
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Debug Mode</label>
                            <div class="col-md-6">
                                <select class="form-control material-debug_mode" name="debug_mode" id="debug_mode">
                                    <option value="0" @if( $material->debug_mode == 0 ) selected="selected"@endif>OFF</option>
                                    <option value="1" @if( $material->debug_mode == 1 ) selected="selected"@endif>ON</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Design Type</label>
                            <div class="col-md-6">
                                <select class="form-control material-design-type" name="design_type" id="design_type">
                                    <option value="style_sheet" @if( $material->design_type == "style_sheet" ) selected="selected"@endif>Style Sheet</option>
                                    <option value="block_pattern" @if( $material->design_type == "block_pattern" ) selected="selected"@endif>Block Pattern</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Asset Target</label>
                            <div class="col-md-6">
                                <select class="form-control material-asset-target" name="asset_target" id="asset_target">
                                    <option value="web" @if( $material->asset_target == "web" ) selected="selected"@endif>Web</option>
                                    <option value="ipad" @if( $material->asset_target == "ipad" ) selected="selected"@endif>iPad</option>
                                    <option value="team_stores" @if( $material->asset_target == "team_stores" ) selected="selected"@endif>Team Stores</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Style Group</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-style-group" name="style_group" value="{{ $material->style_group }}">
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Item ID</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-item-id" name="item_id" value="{{ $material->item_id }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Price Item Code</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-price-item-code" name="price_item_code" value="{{ $material->price_item_code }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Group</label>
                            <div class="col-md-6">
                                <select name='sports_group_id' class="form-control uniform-category">
                                <option value="">None</option>
                                @foreach ($uniform_categories as $category)
                                    @if ($category->active)
                                    <option value='{{ $category->id }}'@if($material->sports_group_id == $category->id) selected="selected"@endif>{{ $category->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-6">
                                <select name='type' class="form-control type">
                                    <option value='upper'@if($material->type == 'upper') selected="selected"@endif>Upper Body Uniform</option>
                                    <option value='lower'@if($material->type == 'lower') selected="selected"@endif>Lower Body Uniform</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Gender</label>
                            <div class="col-md-6">
                                <select name='gender' class="form-control gender">
                                    <option value='men'@if($material->gender == 'men') selected="selected"@endif>Men</option>
                                    <option value='women'@if($material->gender == 'women') selected="selected"@endif>Women</option>
                                    <option value='unisex'@if($material->gender == 'unisex') selected="selected"@endif>Unisex</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Factory</label>
                            <div class="col-md-6">
                                <select name='factory_code' class="form-control factory-code">
                                    @foreach ($factories as $factory)
                                        @if ($factory->active)
                                            <option value='{{ $factory->code }}'@if( $material->factory_code == $factory->code ) selected @endif>{{ $factory->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Is Blank</label>
                            <div class="col-md-2">
                                <select name='is_blank' class="form-control is-blank">
                                    <option value='0' @if($material->is_blank == 0) selected="selected"@endif>No</option>
                                    <option value='1' @if($material->is_blank == 1) selected="selected"@endif>Yes</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Is Sublimated</label>
                            <div class="col-md-2">
                                <select name='is_sublimated' class="form-control is-sublimated">
                                    <option value='0' @if($material->is_sublimated == 0) selected="selected"@endif>No</option>
                                    <option value='1' @if($material->is_sublimated == 1) selected="selected"@endif>Yes</option>
                                </select>
                            </div>

                            <label class="col-md-2 control-label">Price Item Template</label>
                            <div class="col-md-3">
                                <select class="form-control material-price-item-template-id" name="sublimated_price_item_template_id" id="sublimated_price_item_template_id">
                                    <option value="">None</option>
                                @foreach ($price_item_templates as $template)
                                    <option value='{{ $template->id }}'@if($material->sublimated_price_item_template_id == $template->id) selected="selected"@endif>{{ $template->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Is Twill</label>
                            <div class="col-md-2">
                                <select name='is_twill' class="form-control is-twill">
                                    <option value='0' @if($material->is_twill == 0) selected="selected"@endif>No</option>
                                    <option value='1' @if($material->is_twill == 1) selected="selected"@endif>Yes</option>
                                </select>
                            </div>

                            <label class="col-md-2 control-label">Price Item Template</label>
                            <div class="col-md-3">
                                <select class="form-control material-price-item-template-id" name="twill_price_item_template_id" id="twill_price_item_template_id">
                                    <option value="">None</option>
                                @foreach ($price_item_templates as $template)
                                    <option value='{{ $template->id }}'@if($material->twill_price_item_template_id == $template->id) selected="selected"@endif>{{ $template->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Is Infused</label>
                            <div class="col-md-2">
                                <select name='is_infused' class="form-control is-twill">
                                    <option value='0' @if($material->is_infused == 0) selected="selected"@endif>No</option>
                                    <option value='1' @if($material->is_infused == 1) selected="selected"@endif>Yes</option>
                                </select>
                            </div>

                            <label class="col-md-2 control-label">Price Item Template</label>
                            <div class="col-md-3">
                                <select class="form-control material-price-item-template-id" name="infused_price_item_template_id" id="infused_price_item_template_id">
                                <option value="">None</option>
                                @foreach ($price_item_templates as $template)
                                    <option value='{{ $template->id }}'@if($material->infused_price_item_template_id == $template->id) selected="selected"@endif>{{ $template->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Application Type</label>
                            <div class="col-md-6">
                                <select name='uniform_application_type' class="form-control uniform-application-type">
                                    <option value='none'@if( $material->uniform_application_type == "none" ) selected @endif>None</option>
                                    <option value='infused'@if( $material->uniform_application_type == "infused" ) selected @endif>Infused</option>
                                    <option value='sublimated'@if( $material->uniform_application_type == "sublimated" ) selected @endif>Sublimated</option>
                                    <option value='tackle_twill'@if( $material->uniform_application_type == "tackle_twill" ) selected @endif>Tackle Twill</option>
                                    <option value='knitted'@if( $material->uniform_application_type == "knitted" ) selected @endif>Knitted</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">SKU</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-code" name="sku" value="{{ $material->sku }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Builder Customizations</label>
                            <div class="col-md-6">
                                <textarea class="form-control material-builder-customizations" name="builder_customizations">{{ $material->builder_customizations }}</textarea>
                            </div>
                        </div>

                        @if (env('BUILDER_APPROACH') == '3D')
                        <div class="form-group">
                            <label class="col-md-4 control-label">Base Material File</label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control material-file" name="material_path" accept="image/*">
                                <img src="{{ $material->material_path }}" width="100px" height="100px">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Bump Map File</label>
                            <div class="col-md-6 bump">
                                <input type="file" class="form-control bump-map-file" name="bump_map_path" accept="image/*">
                                <img src="{{ $material->bump_map_path }}" width="100px" height="100px">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Shadow File</label>
                            <div class="col-md-6 shadow">
                                <input type="file" class="form-control shadow-file" name="shadow_path" accept="image/*">
                                <img src="{{ $material->shadow_path }}" width="100px" height="100px">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Highlight File</label>
                            <div class="col-md-6 highlight">
                                <input type="file" class="form-control highlight-file" name="highlight_path" accept="image/*">
                                <img src="{{ $material->highlight_path }}" width="100px" height="100px">
                            </div>
                        </div>
                        @elseif (env('BUILDER_APPROACH') == '2D')
                        <div class="form-group">
                            <label class="col-md-4 control-label">Front View File</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control front-view-file" name="front_view_path" accept="image/*">
                                @if ($material->front_view_path)
                                <div class="front_view_path">
                                    <img src="{{ $material->front_view_path }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="front_view_path"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Front View Shape</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control front-shape-file" name="front_view_shape" accept="image/*">
                                @if ($material->front_view_shape)
                                <div class="front_view_shape">
                                    <img src="{{ $material->front_view_shape }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="front_view_shape"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Back View File</label>
                            <div class="col-md-6 back-view">
                                <input type="file" class="form-control back-view-file" name="back_view_path" accept="image/*">
                                @if ($material->back_view_path)
                                <div class="back_view_path">
                                    <img src="{{ $material->back_view_path }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="back_view_path"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Back View Shape</label>
                            <div class="col-md-6 back-view">
                                <input type="file" class="form-control back-shape-file" name="back_view_shape" accept="image/*">
                                @if ($material->back_view_shape)
                                <div class="back_view_shape">
                                    <img src="{{ $material->back_view_shape }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="back_view_shape"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-md-4 control-label">Right Side View File</label>
                            <div class="col-md-6 right-side-view">
                                <input type="file" class="form-control right-side-view-file" name="right_side_view_path" accept="image/*">
                                @if ($material->right_side_view_path)
                                <div class="right_side_view_path">
                                    <img src="{{ $material->right_side_view_path }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="right_side_view_path"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Right Side View Shape</label>
                            <div class="col-md-6 right-side-view">
                                <input type="file" class="form-control right-side-shape-file" name="right_side_view_shape" accept="image/*">
                                @if ($material->right_side_view_shape)
                                <div class="right_side_view_shape">
                                    <img src="{{ $material->right_side_view_shape }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="right_side_view_shape"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Left Side View File</label>
                            <div class="col-md-6 left-side-view">
                                <input type="file" class="form-control left-side-view-file" name="left_side_view_path" accept="image/*">
                                @if ($material->left_side_view_path)
                                <div class="left_side_view_path">
                                    <img src="{{ $material->left_side_view_path }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="left_side_view_path"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Left Side View Shape</label>
                            <div class="col-md-6 left-side-view">
                                <input type="file" class="form-control left-side-shape-file" name="left_side_view_shape" accept="image/*">
                                @if ($material->left_side_view_shape)
                                <div class="left_side_view_shape">
                                    <img src="{{ $material->left_side_view_shape }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="left_side_view_shape"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>
                    @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*">
                                @if ($material->thumbnail_path)
                                <div class="thumbnail_path">
                                    <img src="{{ $material->thumbnail_path }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="thumbnail_path"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail Front</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path_front" accept="image/*">
                                @if ($material->thumbnail_path_front)
                                <div class="thumbnail_path_front">
                                    <img src="{{ $material->thumbnail_path_front }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="thumbnail_path_front"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail Back</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path_back" accept="image/*">
                                @if ($material->thumbnail_path_back)
                                <div class="thumbnail_path_back">
                                    <img src="{{ $material->thumbnail_path_back }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="thumbnail_path_back"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail Left</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path_left" accept="image/*">
                                @if ($material->thumbnail_path_left)
                                <div class="thumbnail_path_left">
                                    <img src="{{ $material->thumbnail_path_left }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="thumbnail_path_left"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail Right</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path_right" accept="image/*">
                                @if ($material->thumbnail_path_right)
                                <div class="thumbnail_path_right">
                                    <img src="{{ $material->thumbnail_path_right }}" width="100px" height="100px">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-image"
                                        data-material-id="{{ $material->id }}"
                                        data-field="thumbnail_path_right"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete Image
                                    </a>
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-8">
                                <input type="hidden" name="description" id="description" value="{{ $material->description }}">
                                <textarea class="form-control material-description autosized">{{ $material->description }}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Price Item Template</label>
                            <div class="col-md-6">
                                <select class="form-control material-price-item-template-id" name="price_item_template_id" id="price_item_template_id">
                                    <option value="">None</option>
                                @foreach ($price_item_templates as $template)
                                    <option value='{{ $template->id }}'@if($material->price_item_template_id == $template->id) selected="selected"@endif>{{ $template->name }}</option>
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
                                    <option value='{{ $part_alias->id }}'@if($material->parts_alias_id == $part_alias->id) selected="selected"@endif>{{ $part_alias->description }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Styles PDF</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control styles-pdf-text" name="styles-pdf-text" value="{{ $material->styles_pdf }}">
                            </div>
                                <div class="col-md-2">

                                    <a href="{{ $material->styles_pdf }}" target="_blank" class="btn btn-xs btn-default @if(! $material->styles_pdf ) disabled @endif">
                                        <i class="fa fa-download"></i>
                                    </a>

                                    <a href="#" class="btn btn-danger btn-xs delete-styles-pdf"
                                        data-material-id="{{ $material->id }}"
                                        data-field="styles_pdf"
                                        role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Delete PDF
                                    </a>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label"></label>
                            <div class="col-md-4 material">
                                <input type="file" class="form-control styles-pdf" name="styles_pdf" accept=".ai,.pdf" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Customizer Available</label>
                           <div class="col-md-2">
                                <select name="customizer_available" class="form-control">
                                        <option value="1" @if($material->customizer_available == 1) selected="selected"@endif>Yes</option>
                                        <option value="0" @if($material->customizer_available == 0) selected="selected"@endif>No</option>
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
                                    <option value='{{ $item_sizes->id }}'@if($material->qx_sizing_config == $item_sizes->id) selected="selected"@endif>{{ $item_sizes->description }}</option>
                                @endforeach
                                </select>
                            </div>
                             <div class="col-md-4 material">
                                 <textarea class="sizing-config-prop" name="sizing_config_prop" id="sizing_config_prop" style="display:none;">{{ $material->sizing_config_prop }}</textarea>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Brand</label>
                           <div class="col-md-6">
                                <select name="brand" class="form-control">
                                        <option value="none" @if($material->brand == "none") selected="selected"@endif>None</option>
                                        <option value="prolook" @if($material->brand == "prolook") selected="selected"@endif>Prolook</option>
                                        <option value="richardson" @if($material->brand == "richardson") selected="selected"@endif>Richardson</option>
                                        <option value="riddell" @if($material->brand == 'riddell') selected="selected" @endif>Riddell</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Reversible Group</label>
                            <div class="col-md-6">
                                <select name="reversible_group" class="form-control reversible-group">
                                    <option value="none">None</option>
                                    @foreach ($reversible_groups as $reversible_group)
                                    <option value='{{ $reversible_group->id }}' @if($material->reversible_group == $reversible_group->id) selected="selected"@endif>{{ $reversible_group->sport }} -- {{ $reversible_group->description }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Reversible Pair ID</label>
                            <div class="col-md-6">
                                <input type="number" class="form-control reversible-pair-id"  name="reversible_pair_id" value={{ $material->reversible_pair_id }}>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Reversible Type</label>
                           <div class="col-md-6">
                                <select name="reversible_type" class="form-control reversible-type">
                                        <option value="inner" @if($material->reversible_type == "inner") selected="selected"@endif >Inner</option>
                                        <option value="outer" @if($material->reversible_type == "outer") selected="selected"@endif >Outer</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Model Number</label>
                            <div class="col-md-6">
                                <input type="text" name="model_number" class="form-control" value="{{ $material->model_number }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label" >Retain setting from saved design?</label>
                           <div class="col-md-2">
                                <select name="retain_settings_from_saved_design" class="form-control">
                                        <option value="1" @if($material->retain_settings_from_saved_design == 1) selected="selected"@endif>Yes</option>
                                        <option value="0" @if($material->retain_settings_from_saved_design == 0) selected="selected"@endif>No</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Model Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control model-name"  name="model_name" value="{{ $material->model_name }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Style Number</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control style-number"  name="style_number" value="{{ $material->style_number }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Rule Id</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control rule-id"  name="rule_id" value="{{ $material->rule_id }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary edit-material">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Material
                                </button>
                                <a href="/administration/materials" class="btn btn-danger" style="margin-right: 15px;">
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
</section>

@include('partials.confirmation-modal')
{{-- @include('partials.confirmation-modal', ['attributes' => ['field'], 'yes_class_name' => 'confirm-delete-field']) --}}

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/autosize.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
<script src="/underscore/underscore.js"></script>
<script type="text/javascript">
$( document ).ready(function() {
    

    $('.autosized').autosize({append: "\n"});

    window.price_items = null;
    getPriceItems(function(price_items){ window.price_items = price_items; });
    function getPriceItems(callback){
        var price_items;
        var url = "//" +api_host+ "/api/price_items";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                price_items = data['price_items'];
                if(typeof callback === "function") callback(price_items);
            }
        });
    }

    var price_items_dd = '<option value=""> - - - </option>';
    window.price_items.forEach(function(entry) {
        price_items_dd += '<option value="' + entry.price_item + '" data-msrp="' + entry.msrp + '" data-wsp="' + entry.web_price_sale + '">' + entry.price_item + '</option>';
    });

    $(".pi-dd").each(function(i) {
    });

    $(".pi-dd").change(function() {
    });

    function buildPIxSizes(){
        sizes = {};
        sizes['adult'] = [];
        sizes['youth'] = [];
        $(".a-size").each(function(i) {
            if( $(this).val() != "" ){
                data = {
                    "size" : $(this).data('size'),
                    "msrp" : parseInt($(this).find(':selected').data('msrp')),
                    "web_sale_price" : parseInt($(this).find(':selected').data('wsp')),
                    "price_item" : $(this).val()
                };
                sizes['adult'].push(data);
            }
        });
        $(".y-size").each(function(i) {
            if( $(this).val() != "" ){
                data = {
                    "size" : $(this).data('size'),
                    "msrp" : parseInt($(this).find(':selected').data('msrp')),
                    "web_sale_price" : parseInt($(this).find(':selected').data('wsp')),
                    "price_item" : $(this).val()
                };
                sizes['youth'].push(data);
            }
        });
        strResult = JSON.stringify(sizes);
        $('#sizes').val( '"' + strResult + '"' );
    }

    tinymce.init({
        selector:'textarea.material-description'
    });

    loadEditor();
    function loadEditor(){
        setTimeout(function(){
            window.mce = $('#description').val();
            tinymce.editors[0].setContent(window.mce);
            $('#description').val('');
        }, 1000);
    }

    $('.edit-material').on('click', function(){
        var rule_id =  $('.rule-id').val();
        event.preventDefault(); 

        var url = "//"+ '{{ env('QX7_HOST')  }}' +"/api/rule/" +rule_id;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                if(data['success']){
                    new PNotify({
                        title: 'VALID ID',
                        text: 'UPDATING '+ '{{ $material->name }}',
                        type: 'success',
                        hide: true
                    });
                    saveEditor();
                    $('#edit-material-form').submit();
                } else{
                    new PNotify({
                        title: 'INVALID RULE ID',
                        text: 'Failed To Update '+ '{{ $material->name }}',
                        type: 'error',
                        hide: true
                    });
                }

            }
        });

    });

    function saveEditor(){
        window.mce = tinyMCE.activeEditor.getContent();
        $('#description').val(window.mce);
    }

    window.block_patterns = null;
    getBlockPatterns(function(block_patterns){
        window.block_patterns = block_patterns;
    });

    function getBlockPatterns(callback){
        var block_patterns;
        var url = "//" +api_host+ "/api/block_patterns";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                block_patterns = data['block_patterns'];
                if(typeof callback === "function") callback(block_patterns);
            }
        });
    }

    var sport = null;
    var block_pattern_id = $('#existing_block_pattern').val();
    var existing_neck_option = $('#existing_neck_option').val();

    $(document).on('change', '.uniform-category', function() {
        sport = $('.uniform-category').val();
        var x = _.filter(window.block_patterns, function(e){ return e.uniform_category_id == sport; });
            $( '#block_pattern_id' ).html('');
            $.each(x, function(i, item) {
                if( block_pattern_id == item.id ){
                    $('#block_pattern_id' ).append( '<option value="' + item.id + '" selected>' + item.name + '</option>' );
                }
                else {
                    $('#block_pattern_id' ).append( '<option value="' + item.id + '">' + item.name + '</option>' );
                }
            });
        $('#block_pattern_id').trigger('change');
    });

    $(document).on('change', '#block_pattern_id', function() {
        var id = $(this).val();
        $( '#neck_option' ).html('');
        var filtered_block_pattern = _.find(window.block_patterns, function( bp ) {
            return bp.id == id;
        });
        var filtered_neck_options = JSON.parse(filtered_block_pattern.neck_options);
        $.each(filtered_neck_options, function(i, item) {
            if (item.name == existing_neck_option) {
                $( '#neck_option' ).append( '<option value="' + item.name + '" selected>' + item.name + '</option>' );
            } else {
                $( '#neck_option' ).append( '<option value="' + item.name + '">' + item.name + '</option>' );
            }
        });
    });

    $('.uniform-category').trigger('change');

    $('.delete-material-image').on('click', function(e){
        e.preventDefault();
        var id =  $(this).data('material-id');
        var field = $(this).data('field');
        $('#confirmation-modal .confirm-yes').data('field', field);
        modalConfirm('Remove Image', 'Are you sure you want to remove this Image?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){

        var id = $(this).data('value');
        var field = $(this).data('field');
        var url = "//" + api_host + "/api/material/deleteImage/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, field: field}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    $('.' + field).fadeOut();
                }
            }
        });
    });

    $('.delete-styles-pdf').on('click', function(e){
        e.preventDefault();
        var id =  $(this).data('material-id');
        var field = $(this).data('field');
        $('#confirmation-modal .confirm-yes').data('field', field);
        modalConfirm('Remove PDF Link', 'Are you sure you want to remove this Styles PDF?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){

        var id = $(this).data('value');
        var field = $(this).data('field');
        var url = "//" + api_host + "/api/material/deleteStylesPDF";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, field: field}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    location.reload();
                }
            }
        });
    });

    var item_size_array = $('#item_sizes_string').text();
    var size_prop = JSON.parse(item_size_array);

    $("#edit-material-form").on("change", ".qx-sizing-config", function(e){
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
