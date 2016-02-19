@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
<style type="text/css">
.onoffswitch {
    position: relative; width: 63px;
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
}
.onoffswitch-checkbox {
    display: none;
}
.onoffswitch-label {
    display: block; overflow: hidden; cursor: pointer;
    border: 2px solid #999999; border-radius: 7px;
}
.onoffswitch-inner {
    display: block; width: 200%; margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block; float: left; width: 50%; height: 21px; padding: 0; line-height: 21px;
    font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
    box-sizing: border-box;
}
.onoffswitch-inner:before {
    content: "ON";
    padding-left: 10px;
    background-color: #FFFFFF; color: #000000;
}
.onoffswitch-inner:after {
    content: "OFF";
    padding-right: 10px;
    background-color: #6B6B6B; color: #FFFFFF;
    text-align: right;
}
.onoffswitch-switch {
    display: block; width: 15px; margin: 3px;
    background: #FFFFFF;
    position: absolute; top: 0; bottom: 0;
    right: 38px;
    border: 2px solid #999999; border-radius: 7px;
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
            <a href="/administration/material/add" class='btn btn-md btn-default'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New Material
            </a>
        </small>
    </h1>
</div>
<div class="container-fluid main-content">
        @forelse ($materials as $material)
            <div class='material-{{ $material->id }} {{ (!$material->active) ? ' inactive' : '' }} col-md-3'
                 style="border: 1px solid #000; margin-right: 10px; margin-top: 10px; height: 250px; border-radius: 3px;">
                <div style="float:left; position: relative; margin-top: 7px; margin-left: -10px;">
                    <span class="label" style="font-size: 14px; background-color: #808080;">{{ $material->id }}</span>
                </div>
                <div style="float:right; position: relative; margin-top: 5px; margin-right: -10px;">
                    <div class="onoffswitch">
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
                <div style="display: inline;"><span class="label label-default" style="font-size: 11px;">{{ $material->code }}</span></div>
                <div style="display: inline;"><span class="label label-default" style="font-size: 11px;">{{ $material->uniform_category }}</span></div>
                <div style="display: inline;"><span class="label label-default" style="font-size: 11px;">{{ ucfirst($material->type) }}</span></div>
                <div class="col-md-12" style="  margin-top: 7px;
                                                height: 50px;
                                                background-color: #fff;
                                                border-radius: 5px;
                                                margin-bottom: 7px;"><center><h4 style="transform : scale(1,1.3);
                                                                                        -webkit-transform:scale(1,1.3); /* Safari and Chrome */
                                                                                        -moz-transform:scale(1,1.3); /* Firefox */
                                                                                        -ms-transform:scale(1,1.3); /* IE 9+ */
                                                                                        -o-transform:scale(1,1.3); /* Opera */"
                                                
                                                                                >{{ $material->name }}</h4></center></div>
                <div style="margin-top: 7px; padding-bottom: 20px;">
                    <a href="/administration/material/edit/{{ $material->id }}" class="btn btn-default btn-xs edit-material" role="button" style="border: 1px solid #808080;">
                        Edit Material
                    </a>
                    <a href="/administration/material/view_material_options/{{ $material->id }}" class='btn btn-xs btn-default'
                        data-material-name="{{ $material->name }}"
                        data-material-id="{{ $material->id }}"
                        data-material-thumbnail="{{ $material->thumbnail_path }}"
                        style="border: 1px solid #808080;">
                        View / Edit Material Options
                    </a>
                    <a href="#" class="btn btn-default pull-right btn-xs delete-material" data-material-id="{{ $material->id }}" role="button">
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