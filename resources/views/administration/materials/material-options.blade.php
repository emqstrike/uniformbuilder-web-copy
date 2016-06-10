@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">

@endsection

@section('custom-styles')

@foreach ($fonts as $font)
@font-face { font-family: "{{ $font->name }}"; src: url("{{ $font->font_path }}"); }
@endforeach

@endsection

@section('content')
<div class="col-md-12" style="margin-top: -40px;">
<input type="hidden" name="cleanup_material_id" value="{{ $material->id }}">
<input type="hidden" id="material_block_pattern" value="{{ $material->block_pattern }}">
<input type="hidden" id="material_neck_option" value="{{ $material->neck_option }}">
<a href="/administration/materials" class="btn btn-default btn-lg" role="button" style="border: 1px solid #808080; margin-top: 25px; margin-left: -15px; border-radius: 0;">
    Back
</a>
<a href="/administration/material/materials_options_setup/{{ $material->id }}" class="btn btn-default btn-lg" role="button" style="border: 1px solid #808080; margin-top: 25px; border-radius: 0;">
    Materials Options (Minified)
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
                        <a href="#" class="btn btn-default btn-xs material-option-applications pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-id="{{ $material->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    data-material-option-applications-properties="{{ $option->applications_properties }}"
                                    data-material-option-path="{{ $option->material_option_path }}"
                                    data-material-option-perspective="{{ $option->perspective }}"
                                    <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                    role="button">
                            <i class="glyphicon glyphicon-plus-sign"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs material-option-boundary pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-id="{{ $material->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                    data-material-option-path="{{ $option->material_option_path }}"
                                    data-material-option-perspective="{{ $option->perspective }}"
                                    <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                    role="button">
                            <i class="glyphicon glyphicon-screenshot"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs cleanup-material-option pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    role="button">
                            <i class="glyphicon glyphicon-refresh"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs delete-material-option pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    role="button">
                            <i class="glyphicon glyphicon-trash"></i>
                        </a>
                        <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                        <a href="#" style="width: 180px; text-align: left; border-radius: 0px;" class="btn btn-default btn-xs edit-material-option-info" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                         data-placement="right"
                                data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                data-material-option-applications-properties="{{ $option->applications_properties }}"
                                data-material-option-name="{{ $option->name }}"
                                data-material-option-layer-level="{{ $option->layer_level }}"
                                data-material-option-default-color="{{ $option->default_color }}"
                                data-material-option-sublimated-default-color="{{ $option->sublimated_default_color }}"
                                data-material-option-default-color-name="{{ $option->default_color_name }}"
                                data-material-option-sublimated-default-color-name="{{ $option->sublimated_default_color_name }}"
                                data-material-option-setting-type="{{ $option->setting_type }}"
                                data-material-option-team-color-id="{{ $option->team_color_id }}"
                                data-material-option-group-id="{{ $option->group_id }}"
                                data-material-option-setting-code="{{ $option->setting_code }}"
                                data-material-option-path="{{ $option->material_option_path }}"
                                data-material-option-perspective="{{ $option->perspective }}"
                                data-material-option-id="{{ $option->id }}"
                                data-material-option-colors='{{ $option->colors }}'
                                data-material-option-gradients='{{ $option->gradients }}'
                                data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                data-material-option-allow-pattern='{{ ($option->allow_pattern) ? "yes" : "no" }}'
                                data-material-option-allow-gradient='{{ ($option->allow_gradient) ? "yes" : "no" }}'
                                data-material-option-allow-color='{{ ($option->allow_color) ? "yes" : "no" }}'
                                data-material-id="{{ $option->material_id }}"
                                data-pattern-id="{{ $option->pattern_id }}"
                                data-pattern-properties="{{ $option->pattern_properties }}"
                                data-default-display="{{ $option->default_display }}"
                                <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                ><b>[{{ $option->layer_level }}] {{ $option->name }}</b></a>
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->group_id) ? "$option->group_id" : "-" }}</span>
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->team_color_id) ? "$option->team_color_id" : "-" }}</span>
                        <span style="margin-top: 0; background-color: #{{ $option->default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->default_hex_code }}</span>
                    </div>
                @endif
            @endforeach
            </td>
            <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;">
            @foreach ($options as $option)
                @if ($option->perspective == "back")
                    <div style="margin-top: 10px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px; margin-bottom: 10px;" 
                         class="material-option-{{ $option->id }}  material-option-item"
                         data-material-option-name="{{ $option->name }}">
                        <a href="#" class="btn btn-default btn-xs material-option-applications pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-id="{{ $material->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    data-material-option-applications-properties="{{ $option->applications_properties }}"
                                    data-material-option-path="{{ $option->material_option_path }}"
                                    data-material-option-perspective="{{ $option->perspective }}"
                                    <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                    role="button">
                            <i class="glyphicon glyphicon-plus-sign"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs material-option-boundary pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-id="{{ $material->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                    data-material-option-path="{{ $option->material_option_path }}"
                                    data-material-option-perspective="{{ $option->perspective }}"
                                    <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                    role="button">
                            <i class="glyphicon glyphicon-screenshot"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs cleanup-material-option pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    role="button">
                            <i class="glyphicon glyphicon-refresh"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs delete-material-option pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    role="button">
                            <i class="glyphicon glyphicon-trash"></i>
                        </a>
                        <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                        <a href="#" style="width: 180px; text-align: left; border-radius: 0px;" class="btn btn-default btn-xs edit-material-option-info" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                         data-placement="right"
                                data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                data-material-option-applications-properties="{{ $option->applications_properties }}"
                                data-material-option-name="{{ $option->name }}"
                                data-material-option-layer-level="{{ $option->layer_level }}"
                                data-material-option-default-color="{{ $option->default_color }}"
                                data-material-option-sublimated-default-color="{{ $option->sublimated_default_color }}"
                                data-material-option-default-color-name="{{ $option->default_color_name }}"
                                data-material-option-sublimated-default-color-name="{{ $option->sublimated_default_color_name }}"
                                data-material-option-setting-type="{{ $option->setting_type }}"
                                data-material-option-team-color-id="{{ $option->team_color_id }}"
                                data-material-option-group-id="{{ $option->group_id }}"
                                data-material-option-setting-code="{{ $option->setting_code }}"
                                data-material-option-path="{{ $option->material_option_path }}"
                                data-material-option-perspective="{{ $option->perspective }}"
                                data-material-option-id="{{ $option->id }}"
                                data-material-option-colors='{{ $option->colors }}'
                                data-material-option-gradients='{{ $option->gradients }}'
                                data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                data-material-option-allow-pattern='{{ ($option->allow_pattern) ? "yes" : "no" }}'
                                data-material-option-allow-gradient='{{ ($option->allow_gradient) ? "yes" : "no" }}'
                                data-material-option-allow-color='{{ ($option->allow_color) ? "yes" : "no" }}'
                                data-material-id="{{ $option->material_id }}"
                                data-pattern-id="{{ $option->pattern_id }}"
                                data-pattern-properties="{{ $option->pattern_properties }}"
                                data-default-display="{{ $option->default_display }}"
                                <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                ><b>[{{ $option->layer_level }}] {{ $option->name }}</b></a>
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->group_id) ? "$option->group_id" : "-" }}</span>
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->team_color_id) ? "$option->team_color_id" : "-" }}</span>
                        <span style="margin-top: 0; background-color: #{{ $option->default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->default_hex_code }}</span>
                    </div>
                @endif
            @endforeach
            </td>
            <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;">
            @foreach ($options as $option)
                @if ($option->perspective == "left")
                    <div style="margin-top: 10px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px; margin-bottom: 10px;" 
                         class="material-option-{{ $option->id }}  material-option-item"
                         data-material-option-name="{{ $option->name }}">
                        <a href="#" class="btn btn-default btn-xs material-option-applications pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-id="{{ $material->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    data-material-option-applications-properties="{{ $option->applications_properties }}"
                                    data-material-option-path="{{ $option->material_option_path }}"
                                    data-material-option-perspective="{{ $option->perspective }}"
                                    <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                    role="button">
                            <i class="glyphicon glyphicon-plus-sign"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs material-option-boundary pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-id="{{ $material->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                    data-material-option-path="{{ $option->material_option_path }}"
                                    data-material-option-perspective="{{ $option->perspective }}"
                                    <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                    role="button">
                            <i class="glyphicon glyphicon-screenshot"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs cleanup-material-option pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    role="button">
                            <i class="glyphicon glyphicon-refresh"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs delete-material-option pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    role="button">
                            <i class="glyphicon glyphicon-trash"></i>
                        </a>
                        <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                        <a href="#" style="width: 180px; text-align: left; border-radius: 0px;" class="btn btn-default btn-xs edit-material-option-info" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                         data-placement="right"
                                data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                data-material-option-applications-properties="{{ $option->applications_properties }}"
                                data-material-option-name="{{ $option->name }}"
                                data-material-option-layer-level="{{ $option->layer_level }}"
                                data-material-option-default-color="{{ $option->default_color }}"
                                data-material-option-sublimated-default-color="{{ $option->sublimated_default_color }}"
                                data-material-option-default-color-name="{{ $option->default_color_name }}"
                                data-material-option-sublimated-default-color-name="{{ $option->sublimated_default_color_name }}"
                                data-material-option-setting-type="{{ $option->setting_type }}"
                                data-material-option-team-color-id="{{ $option->team_color_id }}"
                                data-material-option-group-id="{{ $option->group_id }}"
                                data-material-option-setting-code="{{ $option->setting_code }}"
                                data-material-option-path="{{ $option->material_option_path }}"
                                data-material-option-perspective="{{ $option->perspective }}"
                                data-material-option-id="{{ $option->id }}"
                                data-material-option-colors='{{ $option->colors }}'
                                data-material-option-gradients='{{ $option->gradients }}'
                                data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                data-material-option-allow-pattern='{{ ($option->allow_pattern) ? "yes" : "no" }}'
                                data-material-option-allow-gradient='{{ ($option->allow_gradient) ? "yes" : "no" }}'
                                data-material-option-allow-color='{{ ($option->allow_color) ? "yes" : "no" }}'
                                data-material-id="{{ $option->material_id }}"
                                data-pattern-id="{{ $option->pattern_id }}"
                                data-pattern-properties="{{ $option->pattern_properties }}"
                                data-default-display="{{ $option->default_display }}"
                                <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                ><b>[{{ $option->layer_level }}] {{ $option->name }}</b></a>
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->group_id) ? "$option->group_id" : "-" }}</span>
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->team_color_id) ? "$option->team_color_id" : "-" }}</span>
                        <span style="margin-top: 0; background-color: #{{ $option->default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->default_hex_code }}</span>
                    </div>
                @endif
            @endforeach
            </td>
            <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;">
            @foreach ($options as $option)
                @if ($option->perspective == "right")
                    <div style="margin-top: 10px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px; margin-bottom: 10px;" 
                         class="material-option-{{ $option->id }}  material-option-item"
                         data-material-option-name="{{ $option->name }}">
                        <a href="#" class="btn btn-default btn-xs material-option-applications pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-id="{{ $material->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    data-material-option-applications-properties="{{ $option->applications_properties }}"
                                    data-material-option-path="{{ $option->material_option_path }}"
                                    data-material-option-perspective="{{ $option->perspective }}"
                                    <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                    role="button">
                            <i class="glyphicon glyphicon-plus-sign"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs material-option-boundary pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-id="{{ $material->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                    data-material-option-path="{{ $option->material_option_path }}"
                                    data-material-option-perspective="{{ $option->perspective }}"
                                    <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                    role="button">
                            <i class="glyphicon glyphicon-screenshot"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs cleanup-material-option pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    role="button">
                            <i class="glyphicon glyphicon-refresh"></i>
                        </a>
                        <a href="#" class="btn btn-default btn-xs delete-material-option pull-right"
                                    data-material-option-id="{{ $option->id }}"
                                    data-material-option-name="{{ $option->name }}"
                                    role="button">
                            <i class="glyphicon glyphicon-trash"></i>
                        </a>
                        <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                        <a href="#" style="width: 180px; text-align: left; border-radius: 0px;" class="btn btn-default btn-xs edit-material-option-info" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                         data-placement="right"
                                data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                data-material-option-applications-properties="{{ $option->applications_properties }}"
                                data-material-option-name="{{ $option->name }}"
                                data-material-option-layer-level="{{ $option->layer_level }}"
                                data-material-option-default-color="{{ $option->default_color }}"
                                data-material-option-sublimated-default-color="{{ $option->sublimated_default_color }}"
                                data-material-option-default-color-name="{{ $option->default_color_name }}"
                                data-material-option-sublimated-default-color-name="{{ $option->sublimated_default_color_name }}"
                                data-material-option-setting-type="{{ $option->setting_type }}"
                                data-material-option-team-color-id="{{ $option->team_color_id }}"
                                data-material-option-group-id="{{ $option->group_id }}"
                                data-material-option-setting-code="{{ $option->setting_code }}"
                                data-material-option-path="{{ $option->material_option_path }}"
                                data-material-option-perspective="{{ $option->perspective }}"
                                data-material-option-id="{{ $option->id }}"
                                data-material-option-colors='{{ $option->colors }}'
                                data-material-option-gradients='{{ $option->gradients }}'
                                data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                data-material-option-allow-pattern='{{ ($option->allow_pattern) ? "yes" : "no" }}'
                                data-material-option-allow-gradient='{{ ($option->allow_gradient) ? "yes" : "no" }}'
                                data-material-option-allow-color='{{ ($option->allow_color) ? "yes" : "no" }}'
                                data-material-id="{{ $option->material_id }}"
                                data-pattern-id="{{ $option->pattern_id }}"
                                data-pattern-properties="{{ $option->pattern_properties }}"
                                data-default-display="{{ $option->default_display }}"
                                <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                ><b>[{{ $option->layer_level }}] {{ $option->name }}</b></a>
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->group_id) ? "$option->group_id" : "-" }}</span>
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->team_color_id) ? "$option->team_color_id" : "-" }}</span>
                        <span style="margin-top: 0; background-color: #{{ $option->default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->default_hex_code }}</span>
                    </div>
                @endif
            @endforeach
            </td>
        </tbody>
    </table>
</div>

@include('administration.materials.add-multiple-options-modal')

@include('administration.materials.material-option-boundary-modal')

@include('administration.materials.material-option-applications-modal')

@include('administration.materials.material-option-info-modal')

@include('administration.materials.material-option-modal')

@include('administration.materials.cleanup-material-modal')

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal'])

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-material-option'])

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-cleanup-material-option'])

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-multiple-material-option'])

@endsection
@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/materials.js"></script>
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
<script type="text/javascript" src="/fabricjs/customiseControls.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/ddslick.min.js"></script>
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