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
            <!-- <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;"> -->
            @foreach ($options as $option)
                @if ($option->perspective == "front" )
                    <tr><td style="vertical-align: text-top; border: 1px solid #000;">
                    <!-- <div style="margin-top: 10px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px; margin-bottom: 10px;" 
                        class="material-option-{{ $option->id }}  material-option-item"
                        data-material-option-name="{{ $option->name }}"> -->
                            <input class="front layer" type="number" name="layer_level[]" value="{{ $option->layer_level }}" style="width: 40px;">
                            <input class="front name" type="text " name="name[]" value="{{ $option->name }}" style="width: 160px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Group ID: </span>
                            <input class="front" type="number" name="group_id[]" value='{{ ($option->group_id) ? "$option->group_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">TID: </span>
                            <input class="front" type="number" name="team_color_id[]" value='{{ ($option->group_id) ? "$option->team_color_id" : "" }}' style="width: 40px;">
                            <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                    <!-- </div> -->
                    </td></tr>
                @endif
            @endforeach
            <!-- </td> -->
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
            <!-- <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;"> -->
            @foreach ($options as $option)
                @if ($option->perspective == "back" )
                    <tr><td style="vertical-align: text-top; border: 1px solid #000;">
                    <!-- <div style="margin-top: 10px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px; margin-bottom: 10px;" 
                        class="material-option-{{ $option->id }}  material-option-item"
                        data-material-option-name="{{ $option->name }}"> -->
                            <input class="back layer" type="number" name="layer_level[]" value="{{ $option->layer_level }}" style="width: 40px;">
                            <input class="back name" type="text" name="name[]" value="{{ $option->name }}" style="width: 160px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Group ID: </span>
                            <input class="back" type="number" name="group_id[]" value='{{ ($option->group_id) ? "$option->group_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">TID: </span>
                            <input class="back" type="number" name="team_color_id[]" value='{{ ($option->group_id) ? "$option->team_color_id" : "" }}' style="width: 40px;">
                            <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                    <!-- </div> -->
                    </td></tr>
                @endif
            @endforeach
            <!-- </td> -->
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
            <!-- <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;"> -->
            @foreach ($options as $option)
                @if ($option->perspective == "left" )
                    <tr><td style="vertical-align: text-top; border: 1px solid #000;">
                    <!-- <div style="margin-top: 10px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px; margin-bottom: 10px;" 
                        class="material-option-{{ $option->id }}  material-option-item"
                        data-material-option-name="{{ $option->name }}"> -->
                            <input class="left layer" type="number" name="layer_level[]" value="{{ $option->layer_level }}" style="width: 40px;">
                            <input class="left name" type="text" name="name[]" value="{{ $option->name }}" style="width: 160px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Group ID: </span>
                            <input class="left" type="number" name="group_id[]" value='{{ ($option->group_id) ? "$option->group_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">TID: </span>
                            <input class="left" type="number" name="team_color_id[]" value='{{ ($option->group_id) ? "$option->team_color_id" : "" }}' style="width: 40px;">
                            <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                    <!-- </div> -->
                    </td></tr>
                @endif
            @endforeach
            <!-- </td> -->
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
            <!-- <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;"> -->
            @foreach ($options as $option)
                @if ($option->perspective == "right" )
                    <tr><td style="vertical-align: text-top; border: 1px solid #000;">
                    <!-- <div style="margin-top: 10px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px; margin-bottom: 10px;" 
                        class="material-option-{{ $option->id }}  material-option-item"
                        data-material-option-name="{{ $option->name }}"> -->
                            <input class="right layer" type="number" name="layer_level[]" value="{{ $option->layer_level }}" style="width: 40px;">
                            <input class="right name" type="text " name="name[]" value="{{ $option->name }}" style="width: 160px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Group ID: </span>
                            <input class="right" type="number" name="group_id[]" value='{{ ($option->group_id) ? "$option->group_id" : "" }}' style="width: 40px;">
                            <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">TID: </span>
                            <input class="right" type="number" name="team_color_id[]" value='{{ ($option->group_id) ? "$option->team_color_id" : "" }}' style="width: 40px;">
                            <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                    <!-- </div> -->
                    </td></tr>
                @endif
            @endforeach
            <!-- </td> -->
        </tbody>
    </table>
    </div>

</div>

@endsection
@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/material-options-setup.js"></script>
@endsection