@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">

@endsection

@section('content')
<div class="col-md-12" style="margin-top: -40px;">
<input type="hidden" name="cleanup_material_id" value="{{ $material->id }}">
<input type="hidden" id="material_block_pattern" value="{{ $material->block_pattern }}">
<input type="hidden" id="material_neck_option" value="{{ $material->neck_option }}">
<a href="/administration/materials" class="btn btn-default btn-lg" role="button" style="border: 1px solid #808080; margin-top: 25px; margin-left: -15px; border-radius: 0;">
    Back
</a>
<center>
<img src="{{ $material->thumbnail_path }}"
     width="100px"
     height="100px" style="margin-bottom: 7px; margin-top: -7px; border-radius: 0px; border: 1px solid #808080;">
<h3>Material Options of: <b>{{ ucfirst($material->name) }}
    <a href="/administration/material/edit/{{ $material->id }}" class="btn btn-default btn-xs edit-material" role="button" style="border: 1px solid #808080; border-radius: 0px;">
        Edit 
    </a>
    <a href="#" class='btn btn-xs btn-default cleanup-material' data-id="{{ $material->id }}" style="border: 1px solid #808080; border-radius: 0px;">
        Reset Properties
    </a>
    <a href="#" class='btn btn-xs btn-default delete-multiple-material-option' style="border: 1px solid #808080; border-radius: 0px;">
        Delete Selected
    </a>
    <a href="#" class='btn btn-xs btn-default update-all-material-option' style="border: 1px solid #808080; border-radius: 0px;">
        Update Changes
    </a>
</b></h3>
</center>
</div>
<?php $highlight_path = null; ?>
<div class="container-fluid main-content">
    <table class="col-md-12">
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
                <a href="#" class='btn btn-xs btn-default add-multiple-material-option' style="margin-left: -50px; border-radius: 0px;" data-material-id="{{ $material->id }}" data-add-to-perspective="front"><span class="glyphicon glyphicon-plus"></span></a>
                FRONT</h3></center>
            </th>
            <th style="border: 1px solid #000; padding-bottom: 10px;">
            @foreach ($options as $option)
                @if ($option->perspective == "back")
                    @if ($option->setting_type == "highlights")
                    <img src="{{ $option->material_option_path }}" style="border: 1px solid black; padding: 5px; margin-left: 10px; margin-top: 10px; height: 50px; width: 50px; float: left; position: relative;">
                    @endif
                @endif
            @endforeach
                <center><h3>
                <a href="#" class='btn btn-xs btn-default add-multiple-material-option' style="margin-left: -50px; border-radius: 0px;" data-material-id="{{ $material->id }}" data-add-to-perspective="back"><span class="glyphicon glyphicon-plus"></span></a>
                BACK</h3></center>
            </th>
            <th style="border: 1px solid #000; padding-bottom: 10px;">
            @foreach ($options as $option)
                @if ($option->perspective == "left")
                    @if ($option->setting_type == "highlights")
                    <img src="{{ $option->material_option_path }}" style="border: 1px solid black; padding: 5px; margin-left: 10px; margin-top: 10px; height: 50px; width: 50px; float: left; position: relative;">
                    @endif
                @endif
            @endforeach
                <center><h3>
                <a href="#" class='btn btn-xs btn-default add-multiple-material-option' style="margin-left: -50px; border-radius: 0px;" data-material-id="{{ $material->id }}" data-add-to-perspective="left"><span class="glyphicon glyphicon-plus"></span></a>
                LEFT</h3></center>
            </th>
            <th style="border: 1px solid #000; padding-bottom: 10px;">
            @foreach ($options as $option)
                @if ($option->perspective == "right")
                    @if ($option->setting_type == "highlights")
                    <img src="{{ $option->material_option_path }}" style="border: 1px solid black; padding: 5px; margin-left: 10px; margin-top: 10px; height: 50px; width: 50px; float: left; position: relative;">
                    @endif
                @endif
            @endforeach
                <center><h3>
                <a href="#" class='btn btn-xs btn-default add-multiple-material-option' style="margin-left: -50px; border-radius: 0px;" data-material-id="{{ $material->id }}" data-add-to-perspective="right"><span class="glyphicon glyphicon-plus"></span></a>
                RIGHT</h3></center>
            </th>
        </thead>
        <tbody style="padding-top: 30px;" id="mo-list">
            <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;">
            @foreach ($options as $option)
                @if ($option->perspective == "front")
                    <div style="margin-top: 10px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px; margin-bottom: 10px;" 
                        class="material-option-{{ $option->id }}  material-option-item"
                        data-material-option-name="{{ $option->name }}">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ $option->layer_level}}</span>
                            <input type="text" value="{{ $option->name }}" style="width: 172px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Group ID: </span>
                            <input type="text" value='{{ ($option->group_id) ? "$option->group_id" : "" }}' size="2">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Team C. ID: </span>
                            <input type="text" value='{{ ($option->group_id) ? "$option->team_color_id" : "" }}' size="2">
                            <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                    </div>
                @endif
            @endforeach
            </td>
        </tbody>
    </table>
</div>

@endsection
@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
@endsection