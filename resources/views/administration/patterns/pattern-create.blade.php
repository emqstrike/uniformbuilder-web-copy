@extends('administration.main')

@section('content')
<style>
select:hover {
  background-color: transparent;
}
</style>
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Pattern</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/pattern/add" enctype="multipart/form-data" id='create-pattern-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        @for ($i = 1; $i <= 4; $i++)
                        <div class="form-group">
                            <label class="col-md-4 control-label">Pattern Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control pattern-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">1</span></label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control layer-{{ $i }}-file" name="layer_{{ $i }}_path" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default colors</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_1_color" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">2</span></label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control layer-2-file" name="layer_2_path" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default colors</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_2_color" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">3</span></label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control layer-3-file" name="layer_3_path" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default colors</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_3_color" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layer <span class="badge">4</span></label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control layer-4-file" name="layer_4_path" accept="image/*">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Default colors</label>
                            <div class="col-md-6 material">
                                <select class="form-control layer-default-color" name="layer_4_color" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                @foreach ($color as $colors)
                                <option data-color="#{{ $colors->hex_code }}" style="background-color: #{{ $colors->hex_code }};" value="{{ $colors->color_code }}">{{ $colors->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>
                        @endfor

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-lg btn-primary create-pattern">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Pattern
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

@endsection

@section('custom-scripts')

$(document).ready(function(){

    $('select:not(:has(option))').attr('visible', false);c

    $('#create-pattern-form').submit(function(){
        $('.flash-alert .flash-progress').show();
        $('.flash-alert .flash-title').text('Creating New pattern');
        $('.flash-alert .flash-sub-title').text('Saving');
        $('.flash-alert .flash-message').text('Please wait while we are saving pattern...');
        $('.flash-alert').addClass('alert-info');
        $('.flash-alert').show();
        $('.main-content').fadeOut('slow');
    });

    $('.layer-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
    });
});

@endsection