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
                <div class="panel-heading">Edit Helper</div>
                <div class="panel-body">
                    @include('administration.partials.validation-error')

                    <form class="form-horizontal" role="form" method="POST" action="/administration/helper/update" enctype="multipart/form-data" id='create-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="helper_id" value="{{ $helper->id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Feature Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="feature_name" value="{{ $helper->feature }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Group</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="group" value="{{ $helper->group }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Category</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="category" value="{{ $helper->category }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sports</label>
                            <div class="col-md-6">
                                <input type="hidden" class="sports-val" id="sports_value" name="sports_value" value="{{ $helper->sports }}">
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
                                <textarea class="form-control helper-description" name="description"></textarea>
                                <input type="hidden" id="description" value="{{ $helper->description }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Related Field</label>
                            <div class="col-md-6">
                                <input type="hidden" class="related-val" id="related_value" name="related_value" value="{{ $helper->related_fields }}">
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
                                <textarea class="form-control" name="video_url">{{ $helper->video_url }}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">GIF URL</label>
                            <div class="col-md-6">
                                <textarea class="form-control" name="gif_url">{{ $helper->gif_url }}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">PDF URL</label>
                            <div class="col-md-6">
                                <textarea class="form-control" name="pdf_url">{{ $helper->pdf_url }}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Active</label>
                            <div class="col-md-6">
                                <select name='active' class="form-control">
                                    <option value='1' @if ($helper->active == "1") selected="selected"@endif>YES</option>
                                    <option value='0' @if ($helper->active == "0") selected="selected"@endif>NO</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Index</label>
                            <div class="col-md-6">
                                <input type="number" step="0.001" class="form-control" name="index" value="{{ $helper->index }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-helper">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Helper
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
    var sports = JSON.parse($('#sports_value').val());
    var related = JSON.parse($('#related_value').val());
console.log(related);
    $('.sports').select2({
        placeholder: "Select sports",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        // console.log($(this).val());
        $('#sports_value').val($(this).val());
    });

    $('.sports').select2('val', sports);

    $('.related').select2({
        placeholder: "Select related fields",
        multiple: true,
        allowClear: true
    });

    $(".related").change(function() {
        // console.log($(this).val());
        $('#related_value').val($(this).val());
    });

    $('.related').select2('val', related);

    tinymce.init({ 
        selector:'textarea.helper-description'
    });

    loadEditor();
    function loadEditor(){
        setTimeout(function(){
            window.mce = $('#description').val();
            tinymce.editors[0].setContent(window.mce);
            $('#description').val('');
        }, 1000);
    }

    $('.update-helper').on('click', function(){
        saveEditor();
    });

    function saveEditor(){
        window.mce = tinyMCE.activeEditor.getContent();
        console.log('MCE: ' + window.mce);
        $('#description').val(window.mce);
    }

});
</script>
@endsection