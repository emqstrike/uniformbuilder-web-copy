@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<style type="text/css">
    
li.select2-selection__choice {
    color: black !important;
}
</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Helper</div>
                <div class="panel-body">
                    @include('administration.partials.validation-error')

                    <form class="form-horizontal" role="form" method="POST" action="/administration/helper/add" enctype="multipart/form-data" id='create-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <!-- <input type="hidden" name="neck_options" id="neck_options" value=""> -->

                        <div class="form-group">
                            <label class="col-md-4 control-label">Feature Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="feature_name" value="{{ old('feature_name') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Group</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="group" value="{{ old('group') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Category</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="category" value="{{ old('category') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sports</label>
                            <div class="col-md-6">
                                <input type="hidden" class="sports-val" name="sports_value">
                                <select name="sports[]" id="users" class="form-control sports" multiple="multiple">
                                    @foreach ($sports as $sport)
                                        @if ($sport->active)
                                        <option value='{{ $sport->name }}'>
                                            {{ $sport->name }}
                                        </option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Description</label>
                            <div class="col-md-8">
                                <textarea class="form-control helper-description" name="description">{{ old('description') }}</textarea>
                                <input type="hidden" id="description" value="{{ old('description') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Related Field</label>
                            <div class="col-md-6">
                                <input type="hidden" class="related-val" name="related_value">
                                <select name="related[]" class="form-control related" multiple="multiple">
                                    @foreach ($helpers as $helper)
                                        @if ($helper->active)
                                        <option value='{{ $helper->id }}'>
                                            [{{ $helper->id }}]-{{ $helper->feature }}
                                        </option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Video URL</label>
                            <div class="col-md-6">
                                <textarea class="form-control" name="video_url"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">GIF URL</label>
                            <div class="col-md-6">
                                <textarea class="form-control" name="gif_url"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">PDF URL</label>
                            <div class="col-md-6">
                                <textarea class="form-control" name="pdf_url"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Active</label>
                            <div class="col-md-6">
                                <select name='active' class="form-control">
                                    <option value='1'>YES</option>
                                    <option value='0'>NO</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Index</label>
                            <div class="col-md-6">
                                <input type="number" step="0.001" class="form-control" name="index" value="{{ old('index') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-helper">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Help Info
                                </button>
                                <a href="/administration/helpers" class="btn btn-danger">
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

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script src="//cdn.tinymce.com/4/tinymce.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('.sports').select2({
        placeholder: "Select Sports",
        multiple: true,
        allowClear: true
    });

    $('.related').select2({
        placeholder: "Select Related Fields",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        $('.sports-val').val($(this).val());
    });

    $(".related").change(function() {
        $('.related-val').val($(this).val());
    });

    tinymce.init({ 

        selector:'textarea.helper-description'

    });

    $('.create-helper').on('click', function(){

        saveEditor();
        console.log('SAVE');

    });

    function saveEditor(){

        window.mce = tinyMCE.activeEditor.getContent();
        console.log('MCE: ' + window.mce);
        $('#description').val(window.mce);

    }
});
</script>
@endsection