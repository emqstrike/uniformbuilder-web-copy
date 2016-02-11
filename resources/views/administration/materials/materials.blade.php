@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
<style type="text/css">
.onoffswitch {
    position: relative; width: 61px;
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
}
.onoffswitch-checkbox {
    display: none;
}
.onoffswitch-label {
    display: block; overflow: hidden; cursor: pointer;
    border: 2px solid #999999; border-radius: 9px;
}
.onoffswitch-inner {
    display: block; width: 200%; margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block; float: left; width: 50%; height: 20px; padding: 0; line-height: 20px;
    font-size: 10px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
    box-sizing: border-box;
}
.onoffswitch-inner:before {
    content: "ON";
    padding-left: 5px;
    background-color: #02C723; color: #FFFFFF;
}
.onoffswitch-inner:after {
    content: "OFF";
    padding-right: 5px;
    background-color: #BF5050; color: #FFFFFF;
    text-align: right;
}
.onoffswitch-switch {
    display: block; width: 18px; margin: 1px;
    background: #FFFFFF;
    position: absolute; top: 0; bottom: 0;
    right: 37px;
    border: 2px solid #999999; border-radius: 9px;
    transition: all 0.3s ease-in 0s; 
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px; 
}
</style>

@endsection

@section('content')

@if (Session::has('message'))
<div class="alert alert-info alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>

    <strong class='flash-sub-title'></strong><span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

<div class="col-md-12"> 
    <h1>
        <span class="fa fa-cubes"></span>
        Materials
        <small>
            <a href="/administration/material/add" class='btn btn-xs btn-success'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New Material
            </a>
        </small>
        <small>
            <a href="#" class='btn btn-xs btn-danger remove-color'>
                <span class="glyphicon glyphicon-refresh"></span>
                Cleanup
            </a>
        </small>
    </h1>
</div>
<div class="container-fluid main-content">
        @forelse ($materials as $material)
            <div class='material-{{ $material->id }} {{ (!$material->active) ? ' inactive' : '' }} col-md-3'
                 style="border: 1px solid #000; margin-right: 10px; margin-top: 10px; height: 250px; border-radius: 3px;">
                <div style="float:left; position: relative; margin-top: 5px; margin-left: -10px;">
                    <span class="label label-default" style="font-size: 14px;">{{ $material->id }}</span>
                </div>
                <div style="float:right; position: relative; margin-top: 5px; margin-right: -10px;">
                    <div class="onoffswitch">
                        <!-- <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked> -->
                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-material" id="switch-{{ $material->id }}" data-material-id="{{ $material->id }}" {{ ($material->active) ? 'checked' : '' }}>
                        <label class="onoffswitch-label" for="switch-{{ $material->id }}">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div>
                </div>
                <div class="col-md-12">
                    <center>
                        <img src="{{ $material->thumbnail_path }}"
                             width="100px"
                             height="100px"
                             alt="{{ $material->slug }}" style="margin-bottom: 7px; margin-top: -7px; border-radius: 5px;">
                    </center>
                </div><hr>
                <div class="col-md-12" style="height: 50px; background-color: #fff; margin-bottom: 7px; border-radius: 5px;"><h4>{{ $material->name }}</h4></div>
                <div class="col-md-4"><span class="label label-default" style="font-size: 11px;">{{ $material->code }}</span></div>
                <div class="col-md-4"><span class="label label-default" style="font-size: 11px;">{{ $material->uniform_category }}</span></div>
                <div class="col-md-4"><span class="label label-default" style="font-size: 11px;">{{ ucfirst($material->type) }}</span></div>
                <div class="col-md-12" style="margin-top: 7px; padding-bottom: 20px;">
                    <a href="/administration/material/view_material_options/{{ $material->id }}" class='btn btn-xs btn-primary'
                        data-material-name="{{ $material->name }}"
                        data-material-id="{{ $material->id }}"
                        data-material-thumbnail="{{ $material->thumbnail_path }}"
                        <span class="glyphicon glyphicon-eye-open"></span>
                        View Material Options
                    </a>
                    <a href="/administration/material/edit/{{ $material->id }}" style="margin-left: 10px;" class="btn btn-primary btn-xs edit-material" role="button">
                        <i class="glyphicon glyphicon-edit"></i>
                    </a>
                    <a href="#" class="btn btn-danger pull-right btn-xs delete-material" data-material-id="{{ $material->id }}" role="button">
                        <i class="glyphicon glyphicon-trash"></i>
                    </a>
                </div>
            </div>
        @empty
            <p>No Materials</p>
        @break
        @endforelse

</div>

@include('administration.materials.add-multiple-options-modal')

@include('administration.materials.material-view-modal')

@include('administration.materials.material-option-modal')

@include('administration.materials.remove-color-modal')

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal'])

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-material-option'])

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/materials.js"></script>
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
@if (Session::has('message'))
<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });
});
@endif
</script>
@endsection