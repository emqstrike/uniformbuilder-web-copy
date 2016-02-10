@extends('administration.lte-main')

@section('custom-styles')

@foreach ($fonts as $fontItem)
@font-face { font-family: "{{ $fontItem->name }}"; src: url("{{ $fontItem->font_path }}"); }
@endforeach

@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Font</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/font/update" enctype="multipart/form-data" id='edit-font-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="font_id" value="{{ $font->id }}">

                        <div class="form-group">
                            <div class="colr-md-6" align="center">
                                @if ($font->font_path)
                                <span style="font-family: '{{ $font->name }}'; font-size: 30px;">
                                    {{ $font->name }}<br>
                                    ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
                                </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Font Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control base-font-name" name="name" value="{{ $font->name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">
                                Font File
                            </label>
                            
                            <div class="col-md-6">
                                <input type="file" class="form-control font-file" name="font_path" accept="font/*">
                            </div>
                        </div>

                    @if ($font->type != 'default')
                        <div class="form-group">
                            <label class="col-md-4 control-label">Font Type</label>
                            <div class="col-md-6">
                                <select class="form-control" name='type'>
                                    <option value='base' @if ($font->type == 'base') selected @endif>Base (IN) --- a child of a "default"-type font</option>
                                    <option value='outline' @if ($font->type == 'outline') selected @endif>Outline (OUT) --- a child of a "default"-type font</option>
                                    <option value='accent' @if ($font->type == 'accent') selected @endif>Accent (3D) --- a child of a "default"-type font</option>
                                    <option value='tail sweeps' @if ($font->type == 'tail sweeps') selected @endif>Tail Sweep --- a child of a "default"-type font</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Parent Font</label>
                            <div class="col-md-6">
                                <select class="form-control" name='parent_id'>
                                    <option value='0'>---</option>
                                @foreach ($fonts as $fontItem)
                                    <option value='{{ $fontItem->id }}' style="font-family: '{{ $fontItem->name }}'; font-size: 30px;" @if ($font->parent_id == $fontItem->id) selected @endif>{{ $fontItem->name }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>
                    @endif

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-font">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Uniform font
                                </button>
                                <a href="/administration/fonts" class="btn btn-danger">
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
