@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/css/administration-lte-2/materials.css">

    <style>
        .material-option-item:nth-child(odd) {
            background: #d3ccd0;
        }
    </style>
@endsection

@section('custom-styles')

    @foreach ($fonts as $font)
        @font-face { font-family: "{{ $font->name }}"; src: url("{{ $font->font_path }}"); }
    @endforeach
@endsection

@section('content')
    <?php $highlight_path = null; ?>

    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <div class="row">
                            <div class="col-md-6">
                                <a href="{{ route('v1_qx7_style_requests') }}" class="btn btn-default btn-flat btn-lg" role="button">
                                    Back
                                </a>
                                <a href="{{ route('v1_qx7_style_options_setup', ['id' => $style->id]) }}" class="btn btn-default btn-flat btn-lg" role="button">
                                    Options (Minified)
                                </a>
                            </div>
                        </div>

                        @section('page-title', 'Style Options')

                        <h1>Style Options of: {{ $style->name }}</h1>

                        <a href="#" class='btn btn-flat btn-xs btn-default cleanup-material' data-id="{{ $style->id }}">
                            Reset Properties
                        </a>
                        <a href="#" class='btn btn-flat btn-xs btn-default delete-multiple-material-option'>
                            Delete Selected
                        </a>
                    </div>

                    <div class="box-body">
                        <input type="hidden" name="cleanup_material_id" value="{{ $style->id }}">
                        <input type="hidden" id="material_block_pattern" value="test">
                        <input type="hidden" id="material_neck_option" value="test">
                        <input type="hidden" id="material_uniform_category" value="Football">
                        <input type="hidden" id="material_asset_target" value="Web">
                        <input type="hidden" id="material_brand" value="riddell">
                        <input type="hidden" id="rule_id" value="{{ $style->rule_id }}">


                        <div style="margin: 50px 0;">
                            @if (Session::has('message'))
                                <div class="alert alert-success" role="alert">
                                    {{ Session::get('message') }}
                                </div>
                            @endif

                            <div class="row">
                                <div class="col-md-6">
                                    <form action="{{ route('v1_import_bounding_box') }}" class="form-inline" method="POST">

                                        {{ csrf_field() }}

                                        <select name="type" class="form-control">
                                            <option value="material">Material ID</option>
                                            <option value="style">Style ID</option>
                                        </select>

                                        <input type="number" class="form-control" name="id">
                                        <input type="hidden" name="style_id" value="{{ $style->id }}">

                                        <select name="import_type" class="form-control">
                                            <option value="bounding_box">Import Bounding Box</option>
                                            <option value="applications_properties">Import Application</option>
                                        </select>

                                        <button type="submit" class="btn btn-flat btn-success">Submit</button>
                                    </form>
                                </div>

                                <div class="col-md-6">
                                    <a href="{{ route('v1_qx7_edit_rule_part_names', ['styleId' => $style->id]) }}" class="btn btn-flat btn-primary pull-right" style="margin-left: 15px;">Edit Rule Part Names</a>

                                    <form action="{{ route('v1_match_rule_part_name') }}" class="form-inline" method="POST">
                                        {{ csrf_field() }}
                                        <input type="hidden" name="style_id" value="{{ $style->id }}">

                                        <button type="submit" class="btn btn-flat btn-success pull-right">Match rule part name</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <table class="col-md-12">
                            <thead>
                                <th>
                                    <h3>
                                        FRONT
                                    </h3>
                                    <input class="material-options-Checkbox" data-checkboxselected=".frontCb" type="checkbox" value="">
                                </th>

                                <th>
                                    <h3>
                                        BACK
                                    </h3>
                                    <input class="material-options-Checkbox" data-checkboxselected=".backCb" type="checkbox" value="">
                                </th>

                                <th>
                                    <h3>
                                        LEFT
                                    </h3>
                                    <input class="material-options-Checkbox" data-checkboxselected=".leftCb" type="checkbox" value="">
                                </th>

                                <th>
                                    <h3>
                                        RIGHT
                                    </h3>
                                    <input class="material-options-Checkbox" data-checkboxselected=".rightCb" type="checkbox" value="">
                                </th>
                            </thead>

                            <tbody>
                                <td>
                                    @foreach ($options as $option)
                                        @if ($option->perspective == "front")
                                            <div class="material-option-{{ $option->id }}  material-option-item" data-material-option-name="{{ $option->name }}">
                                                <a href="{{ route('v1_qx7_style_application', ['id' => $option->id]) }}" class="btn btn-default btn-xs pull-right btn-flat btn-flat">
                                                    <i class="glyphicon glyphicon-plus-sign"></i>
                                                </a>

                                                <a href="#" class="btn btn-default btn-xs material-option-boundary pull-right"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-id="{{ $style->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                                            data-material-option-path="{{ $option->material_option_path }}"
                                                            data-material-option-perspective="{{ $option->perspective }}"
                                                            <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                                        data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-screenshot"></i>
                                                </a>
                                                <a href="#" class="btn btn-default btn-xs cleanup-material-option pull-right btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-refresh"></i>
                                                </a>
                                                <a href="#" class="btn btn-default btn-xs delete-material-option pull-right btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-trash"></i>
                                                </a>
                                                <input class="delete-multiple-material-options frontCb" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                                                <a href="#" style="width: 180px; text-align: left; border-radius: 0px;" class="btn btn-default btn-xs edit-material-option-info" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                                 data-placement="right"
                                                        data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                                        data-material-uniform-category="Football"
                                                        data-material-option-applications-properties="{{ $option->applications_properties }}"
                                                        data-material-option-name="{{ $option->name }}"
                                                        data-material-option-part-type="{{ $option->part_type }}"
                                                        data-material-option-layer-level="{{ $option->layer_level }}"
                                                        data-material-option-default-color="{{ !empty($option->default_color) ? $option->default_color : "B" }}"
                                                        data-material-option-sublimated-default-color="{{ !empty($option->sublimated_default_color) ? $option->sublimated_default_color : "B" }}"
                                                        data-material-option-default-color-name=""
                                                        data-material-option-sublimated-default-color-name=""
                                                        data-material-option-setting-type="{{ $option->setting_type }}"
                                                        data-material-option-team-color-id="{{ $option->team_color_id }}"
                                                        data-material-option-group-id="{{ $option->group_id }}"
                                                        data-material-option-setting-code="{{ $option->setting_code }}"
                                                        data-material-option-path="{{ $option->material_option_path }}"
                                                        data-material-option-perspective="{{ $option->perspective }}"
                                                        data-material-option-id="{{ $option->id }}"
                                                        data-material-option-colors='{{ $option->colors }}'
                                                        data-material-option-asset-target='{{ $option->asset_target }}'
                                                        data-material-option-gradients='{{ $option->gradients }}'
                                                        data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                                        data-material-option-allow-pattern='{{ ($option->allow_pattern) ? "yes" : "no" }}'
                                                        data-material-option-allow-gradient='{{ ($option->allow_gradient) ? "yes" : "no" }}'
                                                        data-material-option-allow-color='{{ ($option->allow_color) ? "yes" : "no" }}'
                                                        data-material-option-default-asset='{{ ($option->default_asset) ? "yes" : "no" }}'
                                                        data-material-id="{{ $option->style_id }}"
                                                        data-pattern-id="{{ $option->pattern_id }}"
                                                        data-pattern-properties="{{ $option->pattern_properties }}"
                                                        data-default-display="{{ $option->default_display }}"
                                                        data-build-type="{{ $option->build_type }}"
                                                        data-pattern-opacity="{{ $option->pattern_opacity }}"
                                                        data-default-fabric="{{ $option->fabric_id }}"
                                                        data-default-base-fabric="{{ $option->base_fabric }}"
                                                        data-default-insert-fabric="{{ $option->insert_fabric }}"
                                                        data-default-sleeve-fabric="{{ $option->sleeve_fabric }}"
                                                        data-material-brand="riddell"
                                                        <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                                        data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                                        ><b>[{{ $option->layer_level }}] {{ $option->name }}</b></a>
                                                <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->group_id) ? "$option->group_id" : "-" }}</span>
                                                <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->team_color_id) ? "$option->team_color_id" : "-" }}</span>
                                                <span class="color-preview-pill" style="margin-top: 0; background-color: #fff; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;"></span>
                                            </div>
                                        @endif
                                    @endforeach
                                </td>

                                <td>
                                    @foreach ($options as $option)
                                        @if ($option->perspective == "back")
                                            <div class="material-option-{{ $option->id }}  material-option-item" data-material-option-name="{{ $option->name }}">
                                                <a href="{{ route('v1_qx7_style_application', ['id' => $option->id]) }}" class="btn btn-default btn-xs pull-right btn-flat btn-flat">
                                                    <i class="glyphicon glyphicon-plus-sign"></i>
                                                </a>
                                                <a href="#" class="btn btn-default btn-xs material-option-boundary pull-right"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-id="{{ $style->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                                            data-material-option-path="{{ $option->material_option_path }}"
                                                            data-material-option-perspective="{{ $option->perspective }}"
                                                            <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                                        data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-screenshot"></i>
                                                </a>
                                                <a href="#" class="btn btn-default btn-xs cleanup-material-option pull-right btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-refresh"></i>
                                                </a>
                                                <a href="#" class="btn btn-default btn-xs delete-material-option pull-right btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-trash"></i>
                                                </a>
                                                <input class="delete-multiple-material-options backCb" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                                                <a href="#" style="width: 180px; text-align: left; border-radius: 0px;" class="btn btn-default btn-xs edit-material-option-info" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                                 data-placement="right"
                                                        data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                                        data-material-uniform-category="Football"
                                                        data-material-option-applications-properties="{{ $option->applications_properties }}"
                                                        data-material-option-name="{{ $option->name }}"
                                                        data-material-option-part-type="{{ $option->part_type }}"
                                                        data-material-option-layer-level="{{ $option->layer_level }}"
                                                        data-material-option-default-color="{{ !empty($option->default_color) ? $option->default_color : "B" }}"
                                                        data-material-option-sublimated-default-color="{{ !empty($option->sublimated_default_color) ? $option->sublimated_default_color : "B" }}"
                                                        data-material-option-default-color-name=""
                                                        data-material-option-sublimated-default-color-name=""
                                                        data-material-option-setting-type="{{ $option->setting_type }}"
                                                        data-material-option-team-color-id="{{ $option->team_color_id }}"
                                                        data-material-option-group-id="{{ $option->group_id }}"
                                                        data-material-option-setting-code="{{ $option->setting_code }}"
                                                        data-material-option-path="{{ $option->material_option_path }}"
                                                        data-material-option-perspective="{{ $option->perspective }}"
                                                        data-material-option-id="{{ $option->id }}"
                                                        data-material-option-colors='{{ $option->colors }}'
                                                        data-material-option-asset-target='{{ $option->asset_target }}'
                                                        data-material-option-gradients='{{ $option->gradients }}'
                                                        data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                                        data-material-option-allow-pattern='{{ ($option->allow_pattern) ? "yes" : "no" }}'
                                                        data-material-option-allow-gradient='{{ ($option->allow_gradient) ? "yes" : "no" }}'
                                                        data-material-option-allow-color='{{ ($option->allow_color) ? "yes" : "no" }}'
                                                        data-material-option-default-asset='{{ ($option->default_asset) ? "yes" : "no" }}'
                                                        data-material-id="{{ $option->style_id }}"
                                                        data-pattern-id="{{ $option->pattern_id }}"
                                                        data-pattern-properties="{{ $option->pattern_properties }}"
                                                        data-default-display="{{ $option->default_display }}"
                                                        data-build-type="{{ $option->build_type }}"
                                                        data-pattern-opacity="{{ $option->pattern_opacity }}"
                                                        data-default-fabric="{{ $option->fabric_id }}"
                                                        data-material-brand="prolook"
                                                        <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                                        data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                                        ><b>[{{ $option->layer_level }}] {{ $option->name }}</b></a>
                                                <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->group_id) ? "$option->group_id" : "-" }}</span>
                                                <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->team_color_id) ? "$option->team_color_id" : "-" }}</span>
                                                <span class="color-preview-pill" style="margin-top: 0; background-color: #fff; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;"></span>
                                            </div>
                                        @endif
                                    @endforeach
                                </td>

                                <td>
                                    @foreach ($options as $option)
                                        @if ($option->perspective == "left")
                                            <div class="material-option-{{ $option->id }}  material-option-item" data-material-option-name="{{ $option->name }}">
                                                <a href="{{ route('v1_qx7_style_application', ['id' => $option->id]) }}" class="btn btn-default btn-xs pull-right btn-flat btn-flat">
                                                    <i class="glyphicon glyphicon-plus-sign"></i>
                                                </a>
                                                <a href="#" class="btn btn-default btn-xs material-option-boundary pull-right"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-id="{{ $style->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                                            data-material-option-path="{{ $option->material_option_path }}"
                                                            data-material-option-perspective="{{ $option->perspective }}"
                                                            <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                                        data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-screenshot"></i>
                                                </a>
                                                <a href="#" class="btn btn-default btn-xs cleanup-material-option pull-right btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-refresh"></i>
                                                </a>
                                                <a href="#" class="btn btn-default btn-xs delete-material-option pull-right btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-trash"></i>
                                                </a>
                                                <input class="delete-multiple-material-options leftCb" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                                                <a href="#" style="width: 180px; text-align: left; border-radius: 0px;" class="btn btn-default btn-xs edit-material-option-info" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                                 data-placement="right"
                                                        data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                                        data-material-uniform-category="Football"
                                                        data-material-option-applications-properties="{{ $option->applications_properties }}"
                                                        data-material-option-name="{{ $option->name }}"
                                                        data-material-option-part-type="{{ $option->part_type }}"
                                                        data-material-option-layer-level="{{ $option->layer_level }}"
                                                        data-material-option-default-color="{{ !empty($option->default_color) ? $option->default_color : "B" }}"
                                                        data-material-option-sublimated-default-color="{{ !empty($option->sublimated_default_color) ? $option->sublimated_default_color : "B" }}"
                                                        data-material-option-default-color-name=""
                                                        data-material-option-sublimated-default-color-name=""
                                                        data-material-option-setting-type="{{ $option->setting_type }}"
                                                        data-material-option-team-color-id="{{ $option->team_color_id }}"
                                                        data-material-option-group-id="{{ $option->group_id }}"
                                                        data-material-option-setting-code="{{ $option->setting_code }}"
                                                        data-material-option-path="{{ $option->material_option_path }}"
                                                        data-material-option-perspective="{{ $option->perspective }}"
                                                        data-material-option-id="{{ $option->id }}"
                                                        data-material-option-colors='{{ $option->colors }}'
                                                        data-material-option-asset-target='{{ $option->asset_target }}'
                                                        data-material-option-gradients='{{ $option->gradients }}'
                                                        data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                                        data-material-option-allow-pattern='{{ ($option->allow_pattern) ? "yes" : "no" }}'
                                                        data-material-option-allow-gradient='{{ ($option->allow_gradient) ? "yes" : "no" }}'
                                                        data-material-option-allow-color='{{ ($option->allow_color) ? "yes" : "no" }}'
                                                        data-material-option-default-asset='{{ ($option->default_asset) ? "yes" : "no" }}'
                                                        data-material-id="{{ $option->style_id }}"
                                                        data-pattern-id="{{ $option->pattern_id }}"
                                                        data-pattern-properties="{{ $option->pattern_properties }}"
                                                        data-default-display="{{ $option->default_display }}"
                                                        data-build-type="{{ $option->build_type }}"
                                                        data-pattern-opacity="{{ $option->pattern_opacity }}"
                                                        data-default-fabric="{{ $option->fabric_id }}"
                                                        data-material-brand="prolook"
                                                        <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                                        data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                                        ><b>[{{ $option->layer_level }}] {{ $option->name }}</b></a>
                                                <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->group_id) ? "$option->group_id" : "-" }}</span>
                                                <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->team_color_id) ? "$option->team_color_id" : "-" }}</span>
                                                <span class="color-preview-pill" style="margin-top: 0; background-color: #fff; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;"></span>
                                            </div>
                                        @endif
                                    @endforeach
                                </td>

                                <td>
                                    @foreach ($options as $option)
                                        @if ($option->perspective == "right")
                                            <div class="material-option-{{ $option->id }}  material-option-item" data-material-option-name="{{ $option->name }}">
                                                <a href="{{ route('v1_qx7_style_application', ['id' => $option->id]) }}" class="btn btn-default btn-xs pull-right btn-flat btn-flat">
                                                    <i class="glyphicon glyphicon-plus-sign"></i>
                                                </a>
                                                <a href="#" class="btn btn-default btn-xs material-option-boundary pull-right"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-id="{{ $style->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                                            data-material-option-path="{{ $option->material_option_path }}"
                                                            data-material-option-perspective="{{ $option->perspective }}"
                                                            <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                                        data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-screenshot"></i>
                                                </a>
                                                <a href="#" class="btn btn-default btn-xs cleanup-material-option pull-right btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-refresh"></i>
                                                </a>
                                                <a href="#" class="btn btn-default btn-xs delete-material-option pull-right btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            role="button">
                                                    <i class="glyphicon glyphicon-trash"></i>
                                                </a>
                                                <input class="delete-multiple-material-options rightCb" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                                                <a href="#" style="width: 180px; text-align: left; border-radius: 0px;" class="btn btn-default btn-xs edit-material-option-info" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                                 data-placement="right"
                                                        data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                                        data-material-uniform-category="Football"
                                                        data-material-option-applications-properties="{{ $option->applications_properties }}"
                                                        data-material-option-name="{{ $option->name }}"
                                                        data-material-option-part-type="{{ $option->part_type }}"
                                                        data-material-option-layer-level="{{ $option->layer_level }}"
                                                        data-material-option-default-color="{{ !empty($option->default_color) ? $option->default_color : "B" }}"
                                                        data-material-option-sublimated-default-color="{{ !empty($option->sublimated_default_color) ? $option->sublimated_default_color : "B" }}"
                                                        data-material-option-default-color-name=""
                                                        data-material-option-sublimated-default-color-name=""
                                                        data-material-option-setting-type="{{ $option->setting_type }}"
                                                        data-material-option-team-color-id="{{ $option->team_color_id }}"
                                                        data-material-option-group-id="{{ $option->group_id }}"
                                                        data-material-option-setting-code="{{ $option->setting_code }}"
                                                        data-material-option-path="{{ $option->material_option_path }}"
                                                        data-material-option-perspective="{{ $option->perspective }}"
                                                        data-material-option-id="{{ $option->id }}"
                                                        data-material-option-colors='{{ $option->colors }}'
                                                        data-material-option-asset-target='{{ $option->asset_target }}'
                                                        data-material-option-gradients='{{ $option->gradients }}'
                                                        data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                                        data-material-option-allow-pattern='{{ ($option->allow_pattern) ? "yes" : "no" }}'
                                                        data-material-option-allow-gradient='{{ ($option->allow_gradient) ? "yes" : "no" }}'
                                                        data-material-option-allow-color='{{ ($option->allow_color) ? "yes" : "no" }}'
                                                        data-material-option-default-asset='{{ ($option->default_asset) ? "yes" : "no" }}'
                                                        data-material-id="{{ $option->style_id }}"
                                                        data-pattern-id="{{ $option->pattern_id }}"
                                                        data-pattern-properties="{{ $option->pattern_properties }}"
                                                        data-default-display="{{ $option->default_display }}"
                                                        data-build-type="{{ $option->build_type }}"
                                                        data-pattern-opacity="{{ $option->pattern_opacity }}"
                                                        data-default-fabric="{{ $option->fabric_id }}"
                                                        data-material-brand="prolook"
                                                        <?php if($option->setting_type == "highlights") $highlight_path = $option->material_option_path ?>
                                                        data-material-highlights-path="<?php if($highlight_path != null){ echo $highlight_path; } ?>"
                                                        ><b>[{{ $option->layer_level }}] {{ $option->name }}</b></a>
                                                <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->group_id) ? "$option->group_id" : "-" }}</span>
                                                <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">{{ ($option->team_color_id) ? "$option->team_color_id" : "-" }}</span>
                                                <span class="color-preview-pill" style="margin-top: 0; background-color: #fff; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;"></span>
                                            </div>
                                        @endif
                                    @endforeach
                                </td>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>


    @include('administration-lte-2.qx7-style-requests.modal.add-multiple-options-modal')
    @include('administration-lte-2.master-pages.materials.modal.style-option-boundary-modal')
    @include('administration-lte-2.master-pages.materials.modal.material-option-applications-modal')
    @include('administration-lte-2.qx7-style-requests.modal.style-option-info-modal')
    @include('administration-lte-2.qx7-style-requests.modal.material-option-modal')
    @include('administration.materials.cleanup-style-modal')
    @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal'])
    @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-material-option'])
    @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-cleanup-material-option'])
    @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-multiple-material-option'])
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
    <script type="text/javascript" src="/fabricjs/customiseControls.js"></script>
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/ddslick.min.js"></script>
    <script type="text/javascript" src="/underscore/underscore.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/materials/styles.js"></script>
    @if (Session::has('message'))
        <script type="text/javascript">
            $(document).ready(function(){
                try {
                    $('.data-table').DataTable({
                        "paging": true,
                        "lengthChange": false,
                        "searching": false,
                        "ordering": true,
                        "info": true,
                        "autoWidth": false
                    });
                } catch(e) {
                    console.log(e);
                }
            });
        </script>
    @endif

<script>
$(document).ready(function() {
    $('#applications_table_container').scroll(function() {
        var tableHeaderPosition = "translate(0," + $(this).scrollTop() + "px)";
        var tableHeaderColumnPosition = "translate(" + $(this).scrollLeft() + "px, " + $(this).scrollTop() + "px)";
        var tableColumnPosition = "translate(" + $(this).scrollLeft() + "px, 0)";

        var secondColumnPosition = $(this).scrollLeft() + 218;
        secondColumnPosition = "translate(" + secondColumnPosition  + "px, 0)";

        $('#applications_table_container th:first-child').css('transform', tableColumnPosition);
        $('#applications_table_container th:nth-child(2)').css('transform', tableColumnPosition);

        $('#applications_table_container td:first-child').css('transform', tableColumnPosition);
        $('#applications_table_container td:nth-child(2)').css('transform', tableColumnPosition);
    });
});


</script>
@endsection
