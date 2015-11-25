@extends('administration.lte-main')
 
@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Material</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/material/add" enctype="multipart/form-data" id='create-material-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>

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
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Factory</label>
                            <div class="col-md-6">
                                <select name='factory_code' class="form-control factory-code">
                                    @foreach ($factories as $factory)
                                        @if ($color->active)
                                        <option value='{{ $factory->code }}'>{{ $factory->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>

@if (env('BUILDER_APPROACH') == '3D')
                        <div class="form-group">
                            <label class="col-md-4 control-label">Base Material File</label>
                            <div class="col-md-6 material">
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
                            <label class="col-md-4 control-label">Front View File</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control front-view-file" name="front_view_path" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Front View Shape</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control front-shape-file" name="front_view_shape" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Back View File</label>
                            <div class="col-md-6 back-view">
                                <input type="file" class="form-control back-view-file" name="back_view_path" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Back View Shape</label>
                            <div class="col-md-6 back-view">
                                <input type="file" class="form-control back-shape-file" name="back_view_shape" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Right Side View File</label>
                            <div class="col-md-6 right-side-view">
                                <input type="file" class="form-control right-side-view-file" name="right_side_view_path" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Right Side View Shape</label>
                            <div class="col-md-6 right-side-view">
                                <input type="file" class="form-control right-side-shape-file" name="right_side_view_shape" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Left Side View File</label>
                            <div class="col-md-6 left-side-view">
                                <input type="file" class="form-control left-side-view-file" name="left_side_view_shape" accept="image/*">
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