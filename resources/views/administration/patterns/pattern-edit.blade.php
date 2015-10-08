@extends('administration.main')

@section('content')

@if (Session::has('message'))
<div class="alert alert-info alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>

    <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Pattern</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/pattern/update" enctype="multipart/form-data" id='edit-pattern-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="base_pattern_id" value="{{ $pattern->id }}">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Pattern Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control pattern-name" name="name" value="{{ $pattern->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">1</span></label>
                            <div class="col-md-6 pattern">
                                <input type="file" class="form-control layer-1-file" name="layer_1_path" accept="image/*">
                                @if ($pattern->layer_1_path)
                                <img src="{{ $pattern->layer_1_path }}" class="layer_1_path" width="100px" height="100px">
                                <a href="#" class="btn btn-danger btn-xs delete-pattern-layer layer_1_path"
                                    data-pattern-id="{{ $pattern->id }}"
                                    data-layer="layer_1_path"
                                    role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Delete Layer
                                </a>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default color</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_1_color" style="background-color: #{{ $pattern->color_1_hex_code }}; color: #fff;text-shadow: 1px 1px #000;">
                                <option style="background-color: #{{ $pattern->color_1_hex_code }};" value="{{ $pattern->layer_1_default_color }}" selected>{{ $pattern->color_1_name }} (Default)</option>
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">2</span></label>
                            <div class="col-md-6 pattern">
                                <input type="file" class="form-control layer-2-file" name="layer_2_path" accept="image/*">
                                @if ($pattern->layer_2_path)
                                <img src="{{ $pattern->layer_2_path }}" class="layer_2_path" width="100px" height="100px">
                                <a href="#" class="btn btn-danger btn-xs delete-pattern-layer layer_2_path"
                                    data-pattern-id="{{ $pattern->id }}"
                                    data-layer="layer_2_path"
                                    role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Delete Layer
                                </a>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default color</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_2_color" style="background-color: #{{ $pattern->color_2_hex_code }}; color: #fff;text-shadow: 1px 1px #000;">
                                <option style="background-color: #{{ $pattern->color_2_hex_code }};" value="{{ $pattern->layer_2_default_color }}" selected>{{ $pattern->color_2_name }} (Default)</option>
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">3</span></label>
                            <div class="col-md-6 pattern">
                                <input type="file" class="form-control layer-3-file" name="layer_3_path" accept="image/*">
                                @if ($pattern->layer_3_path)
                                <img src="{{ $pattern->layer_3_path }}" class="layer_3_path" width="100px" height="100px">
                                <a href="#" class="btn btn-danger btn-xs delete-pattern-layer layer_3_path"
                                    data-pattern-id="{{ $pattern->id }}"
                                    data-layer="layer_3_path"
                                    role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Delete Layer
                                </a>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default color</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_3_color" style="background-color: #{{ $pattern->color_3_hex_code }}; color: #fff;text-shadow: 1px 1px #000;">
                                <option style="background-color: #{{ $pattern->color_3_hex_code }};" value="{{ $pattern->layer_3_default_color }}" selected>{{ $pattern->color_3_name }} (Default)</option>
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">4</span></label>
                            <div class="col-md-6 pattern">
                                <input type="file" class="form-control layer-4-file" name="layer_4_path" accept="image/*">
                                @if ($pattern->layer_4_path)
                                <img src="{{ $pattern->layer_4_path }}" class="layer_4_path" width="100px" height="100px">
                                <a href="#" class="btn btn-danger btn-xs delete-pattern-layer layer_4_path"
                                    data-pattern-id="{{ $pattern->id }}"
                                    data-layer="layer_4_path"
                                    role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Delete Layer
                                </a>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default color</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_4_color" style="background-color: #{{ $pattern->color_4_hex_code }}; color: #fff;text-shadow: 1px 1px #000;">
                                <option style="background-color: #{{ $pattern->color_4_hex_code }};" value="{{ $pattern->layer_4_default_color }}" selected>{{ $pattern->color_4_name }} (Default)</option>
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-lg btn-primary update-pattern">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Pattern
                                </button>
                                <a href="/administration/patterns" class="btn btn-lg btn-danger">
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
@include('partials.confirmation-modal', ['attributes' => ['layer'], 'yes_class_name' => 'confirm-delete-layer'])

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/patterns.js"></script>
@endsection
@section('custom-scripts')

$(document).ready(function(){

    $('select:not(:has(option))').attr('visible', false);

    $('.layer-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
    });
});

@endsection