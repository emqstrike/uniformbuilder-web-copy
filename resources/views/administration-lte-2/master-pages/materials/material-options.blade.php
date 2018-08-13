@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/css/administration-lte-2/materials.css">
@endsection

@section('custom-styles')
    @foreach ($fonts as $font)
        @font-face { font-family: "{{ $font->name }}"; src: url("{{ $font->font_path }}"); }
    @endforeach
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <div class="row">
                            <div class="col-md-6">
                                <a href="{{ route('v1_materials_index') }}" class="btn btn-default btn-flat btn-lg" role="button">
                                    Back
                                </a>
                                <a href="{{ route('v1_materials_options_setup', ['id' => $material->id]) }}" class="btn btn-default btn-flat btn-lg" role="button">
                                    Materials Options (Minified)
                                </a>
                            </div>

                            <div class="col-md-6">
                                <div>
                                    <textarea name="material_props_data" style="display:none;" id="material_props_data"><?php echo json_encode($options, JSON_FORCE_OBJECT);?></textarea>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <label class="control-label">Export Material Properties to Block Pattern</label>
                                                </div>

                                                <div class="col-md-5">
                                                    <select name="export_block_pattern_id" class="form-control export_block_pattern_id">
                                                        @foreach($block_patterns as $block_pattern)
                                                            <option value="{{ $block_pattern->id }}">{{ $block_pattern->name }}</option>
                                                        @endforeach
                                                    </select>
                                                </div>

                                                <div class="col-md-2">
                                                    <button type="submit" class="btn btn-flat btn-default export_material_prop">
                                                        Export <i class="fa fa-arrow-circle-right" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>

                        @section('page-title', 'Material Options')

                        <h1>Material Options of: {{ ucfirst($material->name) }}</h1>

                        <a href="{{ route('v1_material_edit', ['id' => $material->id]) }}" class="btn btn-flat btn-default btn-xs edit-material" role="button">
                            Edit
                        </a>
                        <a href="#" class='btn btn-flat btn-xs btn-default cleanup-material' data-id="{{ $material->id }}">
                            Reset Properties
                        </a>
                        <a href="#" class='btn btn-flat btn-xs btn-default delete-multiple-material-option'>
                            Delete Selected
                        </a>
                    </div>

                    <div class="box-body">
                        <input type="hidden" name="cleanup_material_id" value="{{ $material->id }}">
                        <input type="hidden" id="material_block_pattern" value="{{ $material->block_pattern }}">
                        <input type="hidden" id="material_neck_option" value="{{ $material->neck_option }}">
                        <input type="hidden" id="material_uniform_category" value="{{ $material->uniform_category }}">
                        <input type="hidden" id="material_asset_target" value="{{ $material->asset_target }}">

                        <table class="col-md-12">
                            <thead>
                                <th>
                                    <h3>
                                        <a href="#" class='btn btn-flat btn-xs btn-success add-multiple-material-option' style="border-radius: 0px;" data-material-id="{{ $material->id }}" data-add-to-perspective="front">
                                            <span class="glyphicon glyphicon-plus"></span>
                                        </a>
                                        FRONT
                                    </h3>
                                    <input class="material-options-Checkbox" data-checkboxselected=".frontCb" type="checkbox" value="">
                                </th>

                                <th>
                                    <h3>
                                        <a href="#" class='btn btn-flat btn-xs btn-success add-multiple-material-option' style="border-radius: 0px;" data-material-id="{{ $material->id }}" data-add-to-perspective="back">
                                            <span class="glyphicon glyphicon-plus"></span>
                                        </a>
                                        BACK
                                    </h3>
                                    <input class="material-options-Checkbox" data-checkboxselected=".backCb" type="checkbox" value="">
                                </th>

                                <th>
                                    <h3>
                                        <a href="#" class='btn btn-flat btn-xs btn-success add-multiple-material-option' style="border-radius: 0px;" data-material-id="{{ $material->id }}" data-add-to-perspective="left">
                                            <span class="glyphicon glyphicon-plus"></span>
                                        </a>
                                        LEFT
                                    </h3>
                                    <input class="material-options-Checkbox" data-checkboxselected=".leftCb" type="checkbox" value="">
                                </th>

                                <th>
                                    <h3>
                                        <a href="#" class='btn btn-flat btn-xs btn-success add-multiple-material-option' style="border-radius: 0px;" data-material-id="{{ $material->id }}" data-add-to-perspective="right">
                                            <span class="glyphicon glyphicon-plus"></span>
                                        </a>
                                        RIGHT
                                    </h3>
                                    <input class="material-options-Checkbox" data-checkboxselected=".rightCb" type="checkbox" value="">
                                </th>
                            </thead>

                            <tbody>
                                <td>
                                    @foreach ($options as $option)
                                        @if ($option->perspective == "front")
                                            <div class="material-option-{{ $option->id }}  material-option-item"
                                                 data-material-option-name="{{ $option->name }}">
                                                <a href="#" class="btn btn-default btn-xs material-option-applications pull-right btn-flat btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-id="{{ $material->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            data-material-option-applications-properties="{{ !empty($option->applications_properties) ? $option->applications_properties : "\"{}\"" }}"
                                                            data-material-option-guide="{{ $front_guide }}"
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
                                                        data-material-uniform-category="{{ $material->uniform_category }}"
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
                                                        data-material-id="{{ $option->material_id }}"
                                                        data-pattern-id="{{ $option->pattern_id }}"
                                                        data-pattern-properties="{{ $option->pattern_properties }}"
                                                        data-default-display="{{ $option->default_display }}"
                                                        data-build-type="{{ $option->build_type }}"
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
                                            <div class="material-option-{{ $option->id }}  material-option-item"
                                                 data-material-option-name="{{ $option->name }}">
                                                <a href="#" class="btn btn-default btn-xs material-option-applications pull-right btn-flat btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-id="{{ $material->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            data-material-option-applications-properties="{{ !empty($option->applications_properties) ? $option->applications_properties : "\"{}\"" }}"
                                                            data-material-option-guide="{{ $back_guide }}"
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
                                                        data-material-uniform-category="{{ $material->uniform_category }}"
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
                                                        data-material-id="{{ $option->material_id }}"
                                                        data-pattern-id="{{ $option->pattern_id }}"
                                                        data-pattern-properties="{{ $option->pattern_properties }}"
                                                        data-default-display="{{ $option->default_display }}"
                                                        data-build-type="{{ $option->build_type }}"
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
                                            <div class="material-option-{{ $option->id }}  material-option-item"
                                                 data-material-option-name="{{ $option->name }}">
                                                <a href="#" class="btn btn-default btn-xs material-option-applications pull-right btn-flat btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-id="{{ $material->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            data-material-option-applications-properties="{{ !empty($option->applications_properties) ? $option->applications_properties : "\"{}\"" }}"
                                                            data-material-option-guide="{{ $left_guide }}"
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
                                                        data-material-uniform-category="{{ $material->uniform_category }}"
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
                                                        data-material-id="{{ $option->material_id }}"
                                                        data-pattern-id="{{ $option->pattern_id }}"
                                                        data-pattern-properties="{{ $option->pattern_properties }}"
                                                        data-default-display="{{ $option->default_display }}"
                                                        data-build-type="{{ $option->build_type }}"
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
                                            <div class="material-option-{{ $option->id }}  material-option-item"
                                                 data-material-option-name="{{ $option->name }}">
                                                <a href="#" class="btn btn-default btn-xs material-option-applications pull-right btn-flat btn-flat"
                                                            data-material-option-id="{{ $option->id }}"
                                                            data-material-id="{{ $material->id }}"
                                                            data-material-option-name="{{ $option->name }}"
                                                            data-material-option-applications-properties="{{ !empty($option->applications_properties) ? $option->applications_properties : "\"{}\"" }}"
                                                            data-material-option-guide="{{ $right_guide }}"
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
                                                        data-material-uniform-category="{{ $material->uniform_category }}"
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
                                                        data-material-id="{{ $option->material_id }}"
                                                        data-pattern-id="{{ $option->pattern_id }}"
                                                        data-pattern-properties="{{ $option->pattern_properties }}"
                                                        data-default-display="{{ $option->default_display }}"
                                                        data-build-type="{{ $option->build_type }}"
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


    @include('administration-lte-2.master-pages.materials.modal.add-multiple-options-modal')
    @include('administration-lte-2.master-pages.materials.modal.material-option-boundary-modal')
    @include('administration-lte-2.master-pages.materials.modal.material-option-applications-modal')
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
    <script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
    <script type="text/javascript" src="/fabricjs/customiseControls.js"></script>
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/ddslick.min.js"></script>
    <script type="text/javascript" src="/underscore/underscore.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/materials/materials.js"></script>
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
