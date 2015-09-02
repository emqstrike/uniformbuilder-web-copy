@extends('administration.main')
 
@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Material</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/material/update" enctype="multipart/form-data" id='edit-material-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="material_id" value="{{ $material->id }}">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control material-name" name="name" value="{{ $material->name }}">
                            </div>
                        </div>

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
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-6">
                                <select name='type' class="form-control type">
                                    <option value='jersey'@if($material->type == 'jersey') selected="selected"@endif>Jersey</option>
                                    <option value='pants'@if($material->type == 'pants') selected="selected"@endif>Pants</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Gender</label>
                            <div class="col-md-6">
                                <select name='gender' class="form-control gender">
                                    <option value='men'@if($material->gender == 'men') selected="selected"@endif>Men</option>
                                    <option value='women'@if($material->gender == 'women') selected="selected"@endif>Women</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Factory</label>
                            <div class="col-md-6">
                                <select name='factory_code' class="form-control factory-code">
                                    <option value='PHP'@if($material->factory_code == 'PHP') selected="selected"@endif>PHP</option>
                                    <option value='MZT'@if($material->factory_code == 'MZT') selected="selected"@endif>MZT</option>
                                    <option value='BLB'@if($material->factory_code == 'BLB') selected="selected"@endif>BLB</option>
                                </select>
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
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-lg btn-primary edit-material">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Material
                                </button>
                                <a href="/administration/materials" class="btn btn-lg btn-danger" style="margin-right: 15px;">
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
@include('partials.confirmation-modal', ['attributes' => ['field'], 'yes_class_name' => 'confirm-delete-field'])

@endsection

@section('custom-scripts')

$(document).ready(function(){
    $('#edit-material-form').submit(function(){
        $('.flash-alert .flash-progress').show();
        $('.flash-alert .flash-title').text('Updating Material');
        $('.flash-alert .flash-sub-title').text('Uploading');
        $('.flash-alert .flash-message').text('Please wait while we are saving your changes...');
        $('.flash-alert').addClass('alert-info');
        $('.flash-alert').show();
        $('.main-content').fadeOut('slow');
    });
});

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/materials.js"></script>
@endsection