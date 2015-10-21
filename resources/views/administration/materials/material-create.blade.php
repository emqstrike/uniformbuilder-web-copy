@extends('administration.main')
 
@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Material</div>
                <div class="panel-body col-md-3 text-center">
                    <div class="row" style="border: 1px solid black">
                        <img src="http://www.icejerseys.com/images/products/33/Boston-Red-Sox-Replica-Home-MLB-Baseball-Jersey-N3127_XL.jpg" style="height: 250px; width: 250px;">
                    </div>
                    <div class="row" style="border: 1px solid black">
                        <img src="http://www.icejerseys.com/images/products/33/Boston-Red-Sox-Replica-Home-MLB-Baseball-Jersey-N3127_XL.jpg" style="height: 250px; width: 250px;">
                    </div>
                </div>
                <div class="panel-body col-md-3 text-center">
                    <div class="row" style="border: 1px solid black">
                        <img src="http://www.icejerseys.com/images/products/33/Boston-Red-Sox-Replica-Home-MLB-Baseball-Jersey-N3127_XL.jpg" style="height: 250px; width: 250px;">
                    </div>
                    <div class="row" style="border: 1px solid black">
                        <img src="http://www.icejerseys.com/images/products/33/Boston-Red-Sox-Replica-Home-MLB-Baseball-Jersey-N3127_XL.jpg" style="height: 250px; width: 250px;">
                    </div>
                </div>
                <div class="panel-body col-md-6">
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

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

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
                            <label class="col-md-4 control-label">Front View File</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control front-view-file" name="front_view_path" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Front View Shape</label>
                            <div class="col-md-8 front-view">
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
                            <div class="col-md-8 back-view">
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
                            <div class="col-md-8 right-side-view">
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
                            <div class="col-md-8 col-md-offset-4">
                                <button type="submit" class="btn btn-default btn-primary create-user">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Material
                                </button>
                                <a href="/administration/materials" class="btn btn-default btn-danger">
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

$(document).ready(function(){
    $('#create-material-form').submit(function(){
        $('.flash-alert .flash-progress').show();
        $('.flash-alert .flash-title').text('Creating New Material');
        $('.flash-alert .flash-sub-title').text('Uploading');
        $('.flash-alert .flash-message').text('Please wait while we are uploading the images...');
        $('.flash-alert').addClass('alert-info');
        $('.flash-alert').show();
        $('.main-content').fadeOut('slow');
    });
});

@endsection