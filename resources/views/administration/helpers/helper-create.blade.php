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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/helper/add" enctype="multipart/form-data" id='create-color-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <!-- <input type="hidden" name="neck_options" id="neck_options" value=""> -->

                        <div class="form-group">
                            <label class="col-md-4 control-label">Feature Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="feature" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Group</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="group" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Category</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control" name="category" value="">
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
                                <input type="number" step="0.001" class="form-control" name="index" value="">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-helper">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add Feature Flag
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
<!-- <script type="text/javascript" src="/js/administration/feature-flags.js"></script> -->
<script type="text/javascript">
$(document).ready(function(){
    $('.sports').select2({
        placeholder: "Select Sports",
        multiple: true,
        allowClear: true
    });

    $(".sports").change(function() {
        $('.sports-val').val($(this).val());
    });
});
</script>
@endsection