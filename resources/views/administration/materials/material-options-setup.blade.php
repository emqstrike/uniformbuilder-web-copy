@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">

@endsection

@section('content')
<div class="col-md-12" style="margin-top: -40px;">
@if (Session::has('message'))
<div class="alert alert-info alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>

    <strong class='flash-sub-title'></strong><span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif
<form action="/administration/material_option/saveUpdates" role="form" method="POST" enctype="multipart/form-data">
<input type="hidden" name="_token" value="{{ csrf_token() }}">
<input type="hidden" name="cleanup_material_id" id="material_id" value="{{ $material->id }}">

<input type="hidden" id="material_block_pattern" value="{{ $material->block_pattern }}">
<input type="hidden" id="material_neck_option" value="{{ $material->neck_option }}">
<a href="/administration/materials" class="btn btn-default btn-lg" role="button" style="border: 1px solid #808080; margin-top: 25px; margin-left: -15px; border-radius: 0;">
    Back
</a>
<a href="/administration/material/view_material_options/{{ $material->id }}" class="btn btn-default btn-lg" role="button" style="border: 1px solid #808080; margin-top: 25px; border-radius: 0;">
    Materials Options
</a>
<center>
<img src="{{ $material->thumbnail_path }}"
     width="100px"
     height="100px" style="margin-bottom: 7px; margin-top: -7px; border-radius: 0px; border: 1px solid #808080;">
<h3>Material Options of: <b>{{ ucfirst($material->name) }}
    <a href="/administration/material/edit/{{ $material->id }}" class="btn btn-default btn-xs edit-material" role="button" style="border: 1px solid #808080; border-radius: 0px;">
        Edit
    </a>
    <a href="#" class='btn btn-xs btn-default delete-multiple-material-option' style="border: 1px solid #808080; border-radius: 0px;">
        Delete Selected
    </a>
    <input type="submit" class='btn btn-xs btn-default update-all-material-option' style="border: 1px solid #808080; border-radius: 0px;" value="Update Changes">
    <a href="#" class='btn btn-xs btn-default format-names' style="border: 1px solid #808080; border-radius: 0px;">
        Format Names
    </a>
</b></h3>
</center>
</div>
<?php $highlight_path = null; ?>
<div class="container-fluid main-content" style="display: inline;">

    <div style="display: inline;" class="col-md-3">
        <table class="table table-bordered" style="display: inline;">
        <thead style="background-color: #fff;">
            <th style="border: 1px solid #000; padding-bottom: 10px;">
            @foreach ($options as $option)
                @if ($option->perspective == "front")
                    @if ($option->setting_type == "highlights")
                    <img src="{{ $option->material_option_path }}" style="border: 1px solid black; padding: 5px; margin-left: 10px; margin-top: 10px; height: 50px; width: 50px; float: left; position: relative;">
                    @endif
                @endif
            @endforeach
                <center><h3>
                FRONT</h3></center>
            </th>
        </thead>
        <tbody style="padding-top: 30px;" class="sortable-items">
            @foreach ($options as $option)
                @if ($option->perspective == "front" )
                    <tr><td style="vertical-align: text-top; border: 1px solid #000;">
                            <input type="hidden" name="option_id[]" value="{{ $option->id }}">
                            <input class="front layer" type="number" name="layer_level[]" value="{{ $option->layer_level }}" style="width: 40px;">
                            <input class="front name" data-perspective="front" type="text " name="name[]" value="{{ $option->name }}" style="width: 160px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Group ID: </span>
                            <input class="front group-id" data-name="{{ $option->name }}" data-perspective="front" data-perspective="front" type="number" name="group_id[]" value='{{ ($option->group_id) ? "$option->group_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">TID: </span>
                            <input class="front tcid" data-name="{{ $option->name }}" data-perspective="front" type="number" name="team_color_id[]" value='{{ ($option->group_id) ? "$option->team_color_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Color: </span>
                            <input class="front default-color" data-name="{{ $option->name }}" data-perspective="front" type="text" name="default_color[]" value='{{ ($option->default_color) }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Allow Pattern: </span>
                            <input class="front allow-pattern" data-name="{{ $option->name }}" data-perspective="front" type="text" name="allow_pattern[]" value='{{ ($option->allow_pattern) }}' style="width: 40px;">
                            <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                    </td></tr>
                @endif
            @endforeach
        </tbody>
    </table>
    </div>

    <div style="display: inline;" class="col-md-3">
        <table class="table table-bordered" style="display: inline;">
        <thead style="background-color: #fff;">
            <th style="border: 1px solid #000; padding-bottom: 10px;">
            @foreach ($options as $option)
                @if ($option->perspective == "back")
                    @if ($option->setting_type == "highlights")
                    <img src="{{ $option->material_option_path }}" style="border: 1px solid black; padding: 5px; margin-left: 10px; margin-top: 10px; height: 50px; width: 50px; float: left; position: relative;">
                    @endif
                @endif
            @endforeach
                <center><h3>
                BACK</h3></center>
            </th>
        </thead>
        <tbody style="padding-top: 30px;" class="sortable-items">
            @foreach ($options as $option)
                @if ($option->perspective == "back" )
                    <tr><td style="vertical-align: text-top; border: 1px solid #000;">
                            <input type="hidden" name="option_id[]" value="{{ $option->id }}">
                            <input class="back layer" type="number" name="layer_level[]" value="{{ $option->layer_level }}" style="width: 40px;">
                            <input class="back name" data-perspective="back" type="text" name="name[]" value="{{ $option->name }}" style="width: 160px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Group ID: </span>
                            <input class="back group-id" data-name="{{ $option->name }}" data-perspective="back" type="number" name="group_id[]" value='{{ ($option->group_id) ? "$option->group_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">TID: </span>
                            <input class="back tcid" data-name="{{ $option->name }}" data-perspective="back" type="number" name="team_color_id[]" value='{{ ($option->group_id) ? "$option->team_color_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Color: </span>
                            <input class="back default-color" data-name="{{ $option->name }}" data-perspective="back" type="text" name="default_color[]" value='{{ ($option->default_color) }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Allow Pattern: </span>
                            <input class="front allow-pattern" data-name="{{ $option->name }}" data-perspective="back" type="text" name="allow_pattern[]" value='{{ ($option->allow_pattern) }}' style="width: 40px;">
                            <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                    </td></tr>
                @endif
            @endforeach
        </tbody>
    </table>
    </div>

    <div style="display: inline;" class="col-md-3">
        <table class="table table-bordered" style="display: inline;">
        <thead style="background-color: #fff;">
            <th style="border: 1px solid #000; padding-bottom: 10px;">
            @foreach ($options as $option)
                @if ($option->perspective == "left")
                    @if ($option->setting_type == "highlights")
                    <img src="{{ $option->material_option_path }}" style="border: 1px solid black; padding: 5px; margin-left: 10px; margin-top: 10px; height: 50px; width: 50px; float: left; position: relative;">
                    @endif
                @endif
            @endforeach
                <center><h3>
                LEFT</h3></center>
            </th>
        </thead>
        <tbody style="padding-top: 30px;" class="sortable-items">
            @foreach ($options as $option)
                @if ($option->perspective == "left" )
                    <tr><td style="vertical-align: text-top; border: 1px solid #000;">
                            <input type="hidden" name="option_id[]" value="{{ $option->id }}">
                            <input class="left layer" type="number" name="layer_level[]" value="{{ $option->layer_level }}" style="width: 40px;">
                            <input class="left name" data-perspective="left" type="text" name="name[]" value="{{ $option->name }}" style="width: 160px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Group ID: </span>
                            <input class="left group-id" data-name="{{ $option->name }}" data-perspective="left" type="number" name="group_id[]" value='{{ ($option->group_id) ? "$option->group_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">TID: </span>
                            <input class="left tcid" data-name="{{ $option->name }}" data-perspective="left" type="number" name="team_color_id[]" value='{{ ($option->group_id) ? "$option->team_color_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Color: </span>
                            <input class="left default-color" data-name="{{ $option->name }}" data-perspective="left" type="text" name="default_color[]" value='{{ ($option->default_color) }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Allow Pattern: </span>
                            <input class="front allow-pattern" data-name="{{ $option->name }}" data-perspective="left" type="text" name="allow_pattern[]" value='{{ ($option->allow_pattern) }}' style="width: 40px;">
                            <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                    </td></tr>
                @endif
            @endforeach
        </tbody>
    </table>
    </div>

    <div style="display: inline; margin-top: -20px;" class="col-md-3">
        <table class="table table-bordered" style="display: inline;">
        <thead style="background-color: #fff;">
            <th style="border: 1px solid #000; padding-bottom: 10px;">
            @foreach ($options as $option)
                @if ($option->perspective == "right")
                    @if ($option->setting_type == "highlights")
                    <img src="{{ $option->material_option_path }}" style="border: 1px solid black; padding: 5px; margin-left: 10px; margin-top: 10px; height: 50px; width: 50px; float: left; position: relative;">
                    @endif
                @endif
            @endforeach
                <center><h3>
                RIGHT</h3></center>
            </th>
        </thead>
        <tbody style="padding-top: 30px;" class="sortable-items">
            @foreach ($options as $option)
                @if ($option->perspective == "right" )
                    <tr><td style="vertical-align: text-top; border: 1px solid #000;">
                            <input type="hidden" name="option_id[]" value="{{ $option->id }}">
                            <input class="right layer" type="number" name="layer_level[]" value="{{ $option->layer_level }}" style="width: 40px;">
                            <input class="right name"  data-perspective="right" type="text " name="name[]" value="{{ $option->name }}" style="width: 160px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Group ID: </span>
                            <input class="right group-id" data-name="{{ $option->name }}" data-perspective="right" type="number" name="group_id[]" value='{{ ($option->group_id) ? "$option->group_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">TID: </span>
                            <input class="right tcid" data-name="{{ $option->name }}" data-perspective="right" type="number" name="team_color_id[]" value='{{ ($option->group_id) ? "$option->team_color_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Color: </span>
                            <input class="right default-color" data-name="{{ $option->name }}" data-perspective="right" type="text" name="default_color[]" value='{{ ($option->default_color) }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Allow Pattern: </span>
                            <input class="front allow-pattern" data-name="{{ $option->name }}" data-perspective="right" type="text" name="allow_pattern[]" value='{{ ($option->allow_pattern) }}' style="width: 40px;">
                            <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                    </td></tr>
                @endif
            @endforeach
        </tbody>
    </table>
    </div>

</div>
</form>

@endsection
@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/material-options-setup.js"></script>
@endsection