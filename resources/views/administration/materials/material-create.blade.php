@extends('administration.lte-main')
 
@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Material</div>
                <div class="panel-body col-md-8 text-center">
                    
                </div>
                <div class="panel-body col-md-4">
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

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Code</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control material-code" name="code" value="{{ old('code') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Block Pattern</label>
                            <div class="col-md-8">
                                <input type="text" class="form-control material-block-pattern" name="block_pattern" value="">
                            </div>
                        </div>

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
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection