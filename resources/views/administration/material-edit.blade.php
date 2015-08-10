@extends('administration.main')
 
@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Mofidy Material</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/material/update" enctype="multipart/form-data" id='create-material-form'>
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

                        <div class="form-group">
                            <label class="col-md-4 control-label">Thumbnail File</label>
                            <div class="col-md-6">
                                <input type="file" class="form-control thumbnail-file" name="thumbnail_path" accept="image/*">
                                <img src="{{ $material->thumbnail_path }}" width="100px" height="100px">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Factory</label>
                            <div class="col-md-6">
                                <select name='factory_code' class="form-control factory-code">
                                    <option value='PHP'>PHP</option>
                                    <option value='MZT'>MZT</option>
                                    <option value='BLB'>BLB</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-material" style="margin-right: 15px;">
                                    Update Material
                                </button>
                                <a href="/administration/materials" class="btn btn-danger" style="margin-right: 15px;">
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
        $('.flash-alert .flash-title').text('Updating Material');
        $('.flash-alert .flash-sub-title').text('Uploading');
        $('.flash-alert .flash-message').text('Please wait while we are saving your changes...');
        $('.flash-alert').addClass('alert-info');
        $('.flash-alert').show();
        $('.main-content').fadeOut('slow');
    });
});

@endsection