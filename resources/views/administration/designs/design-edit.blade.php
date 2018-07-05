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
                <div class="panel-heading">Modify Design Set</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/design_set/update" enctype="multipart/form-data" id='edit-design-set-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="uniform_design_set_id" value="{{ $design->id }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control design-set-name" name="name" value="{{ $design->name }}" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Gender</label>
                            <div class="col-md-6">
                                <select name='gender' class="form-control gender">
                                    <option value='men'@if ($design->gender == "men") selected="selected"@endif>Men</option>
                                    <option value='women'@if ($design->gender == "women") selected="selected"@endif>Women</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Uniform Category</label>
                            <div class="col-md-6">
                                <select name='uniform_category_id' class="form-control uniform-category">
                                @foreach ($uniform_categories as $category)
                                    @if ($category->active)
                                    <option value='{{ $category->id }}'@if ($design->uniform_category_id == $category->id) selected="selected"@endif>{{ $category->name }}</option>
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
                                    <option data-description="{{ $uniform->name }}" data-imagesrc="{{ $uniform->thumbnail_path }}" value='{{ $uniform->name }}'@if ($design->upper_body_uniform == $uniform->name) selected="selected"@endif>{{ $uniform->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Lower Body Uniform</label>
                            <div class="col-md-6">
                                <input type="hidden" name="lower_body_uniform" id="lower_body_uniform">
                                <input type="hidden" name="lower_body_uniforms" id="lower_body_uniforms" value="{{ $design->lower_body_uniform }}">
                                <select name="lower_designs[]" class="form-control lower-designs" multiple="multiple">
                                @foreach ($lower_uniforms as $uniform)
                                    @if ($uniform->active)
                                    <option data-description="{{ $uniform->name }}" data-imagesrc="{{ $uniform->thumbnail_path }}" value='{{ $uniform->name }}'@if ($design->lower_body_uniform == $uniform->name) selected="selected"@endif>{{ $uniform->name }}</option>
                                    @endif
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-design-set">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Save Design Set
                                </button>
                                <a href="/administration/design_sets" class="btn btn-danger">
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

@include('partials.confirmation-modal', ['attributes' => ['design-set'], 'yes_class_name' => 'confirm-delete-design-set'])

@endsection

@section('custom-scripts')

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/designs.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script>
$(document).ready(function(){
    var pants = JSON.parse($('#lower_body_uniforms').val());
    console.log(pants);

    $('.lower-designs').select2({
        placeholder: "Select pants",
        multiple: true,
        allowClear: true
    });

    $(".lower-designs").change(function() {
        console.log($(this).val());
        $('#lower_body_uniform').val($(this).val());
    });

    $('.lower-designs').select2('val', pants);
});
</script>
@endsection
