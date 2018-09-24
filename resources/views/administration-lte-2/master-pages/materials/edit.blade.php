@extends('administration-lte-2.lte-main')

@section('content')
    <div class="container-fluid main-content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">  
                <div class="panel panel-info">
                    @section('page-title', 'Edit Material')
                    <div class="panel-heading">Edit Material</div>

                    <div class="panel-body">
                        <form class="form-horizontal" role="form" method="POST" action="/administration/v1-0/material/add" enctype="multipart/form-data" id='edit-material-form'>
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
                                <label class="col-md-4 control-label">Block Pattern</label>
                                <div class="col-md-6">
                                    <select class="form-control material-block-pattern" name="block_pattern_id" id="block_pattern_id">
                                        <option value="">None</option>
                                        @foreach ($block_patterns as $block_pattern)
                                            @if ($block_pattern->active)
                                            <option value='{{ $block_pattern->id }}' @if($block_pattern->id == $material->block_pattern_id) selected="selected"@endif>{{ $block_pattern->name }}</option>
                                            @endif
                                        @endforeach
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
                                            <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                            <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                            <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                            <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                            <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                            <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                            <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                            <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                        <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                        <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                        <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                        <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                        <a href="#" class="btn btn-danger btn-sm btn-flat delete-material-image"
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
                                <a href="#" class="btn btn-danger btn-sm btn-flat delete-styles-pdf"
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
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="submit" class="btn btn-flat btn-primary edit-material">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Update Material
                                    </button>
                                    <a href="/administration/materials" class="btn btn-flat btn-danger" style="margin-right: 15px;">
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