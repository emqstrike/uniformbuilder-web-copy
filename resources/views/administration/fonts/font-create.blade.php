@extends('administration.main')

@section('custom-styles')

@foreach ($fonts as $font)
@font-face { font-family: "{{ $font->name }}"; src: url("{{ $font->font_path }}"); }
@endforeach

@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Font</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/font/add" enctype="multipart/form-data" id='create-font-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

                        <div class="form-group">
                            <label class="col-md-4 control-label">Font Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control font-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Upload Font File</label>
                            <div class="col-md-6 material">
                                <input type="file" class="form-control font-file" name="font_path" accept="font/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Font Type</label>
                            <div class="col-md-6">
                                <select class="form-control" name='type'>
                                    <option value='default'>Default</option>
                                    <option value='base'>Base (IN) --- a child of a "default"-type font</option>
                                    <option value='outline'>Outline (OUT) --- a child of a "default"-type font</option>
                                    <option value='accent'>Accent (3D) --- a child of a "default"-type font</option>
                                    <option value='tail sweeps'>Tail Sweep --- a child of a "default"-type font</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Parent Font</label>
                            <div class="col-md-6">
                                <select class="form-control" name='type'>
                                    <option value='0'>---</option>
                                @foreach ($fonts as $font)
                                    <option value='{{ $font->id }}' style="font-family: '{{ $font->name }}'; font-size: 30px;">{{ $font->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-lg btn-primary create-font">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Font
                                </button>
                                <a href="/administration/fonts" class="btn btn-lg btn-danger">
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

    $('#create-font-form').submit(function(){
        $('.flash-alert .flash-progress').show();
        $('.flash-alert .flash-title').text('Creating New font');
        $('.flash-alert .flash-sub-title').text('Saving');
        $('.flash-alert .flash-message').text('Please wait while we are saving font...');
        $('.flash-alert').addClass('alert-info');
        $('.flash-alert').show();
        $('.main-content').fadeOut('slow');
    });
});

@endsection