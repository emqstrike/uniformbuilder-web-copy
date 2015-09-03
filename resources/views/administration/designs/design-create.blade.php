@extends('administration.main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Design Set</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/design_set/add" enctype="multipart/form-data" id='create-design-set-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control design-set-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control design-set-code" name="code" value="{{ old('code') }}">
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
                            <label class="col-md-4 control-label">Upper Body Uniform</label>
                            <div class="col-md-6">
                                <select name='upper_body_uniform' class="form-control upper-body-uniform">
                                @foreach ($upper_uniforms as $uniform)
                                    @if ($uniform->active)
                                    <option data-description="{{ $uniform->name }}" data-imagesrc="{{ $uniform->thumbnail_path }}" value='{{ $uniform->code }}'>{{ $uniform->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Lower Body Uniform</label>
                            <div class="col-md-6">
                                <select name='lower_body_uniform' class="form-control lower-body-uniform">
                                @foreach ($lower_uniforms as $uniform)
                                    @if ($uniform->active)
                                    <option data-description="{{ $uniform->name }}" data-imagesrc="{{ $uniform->thumbnail_path }}" value='{{ $uniform->code }}'>{{ $uniform->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Color</label>
                            <div class="col-md-6">
                                <select name='base_color_code' class="form-control">
                                @foreach ($colors as $color)
                                    @if ($color->active)
                                    <option value='{{ $color->color_code }}' style="background-color: #{{ $color->hex_code }}">{{ $color->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Fabric</label>
                            <div class="col-md-6">
                                <select name='base_fabric_code' class="form-control">
                                @foreach ($fabrics as $fabric)
                                    @if ($fabric->active)
                                    <option data-description="{{ $fabric->name }}" data-imagesrc="{{ $fabric->fabric_path }}"  value='{{ $fabric->code }}'>{{ $fabric->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Lining</label>
                            <div class="col-md-6">
                                <select name='lining_code' class="form-control">
                                @foreach ($linings as $lining)
                                    @if ($lining->active)
                                    <option data-description="{{ $lining->name }}" value='{{ $lining->code }}'>{{ $lining->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail Image</label>
                            <div class="col-md-6 design-set">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-lg btn-primary create-design-set">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Design Set
                                </button>
                                <a href="/administration/design_sets" class="btn btn-lg btn-danger">
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

    $('#create-design-set-form').submit(function(){
        $('.flash-alert .flash-progress').show();
        $('.flash-alert .flash-title').text('Creating New Design Set');
        $('.flash-alert .flash-sub-title').text('Saving');
        $('.flash-alert .flash-message').text('Please wait while we are saving design set...');
        $('.flash-alert').addClass('alert-info');
        $('.flash-alert').show();
        $('.main-content').fadeOut('slow');
    });
});

@endsection