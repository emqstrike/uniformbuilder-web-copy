@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">

@endsection

@section('content')
<div class="col-md-12" style="margin-top: -40px;">
<center><h3>Material Options of: <b>{{ ucfirst($material->name) }}</b></h3>
<img src="{{ $material->thumbnail_path }}"
     width="100px"
     height="100px" style="margin-bottom: 7px; margin-top: -7px; border-radius: 5px;"
>
</center>
</div>
<div class="container-fluid main-content">
    <!-- <div class="row">
        <div class="col-md-12"> -->
                <table class="col-md-12">
                    <thead style="background-color: #fff;">
                        <th style="border: 1px solid #000;">
                            <center><h3>
                            <a href="#" class='btn btn-xs btn-success add-multiple-material-option' data-material-id="{{ $material->id }}" data-add-to-perspective="front"><span class="glyphicon glyphicon-plus"></span></a>
                            FRONT</h3></center>
                        </th>
                        <th style="border: 1px solid #000;">
                            <center><h3>
                            <a href="#" class='btn btn-xs btn-success add-multiple-material-option' data-material-id="{{ $material->id }}" data-add-to-perspective="back"><span class="glyphicon glyphicon-plus"></span></a>
                            BACK</h3></center>
                        </th>
                        <th style="border: 1px solid #000;">
                            <center><h3>
                            <a href="#" class='btn btn-xs btn-success add-multiple-material-option' data-material-id="{{ $material->id }}" data-add-to-perspective="left"><span class="glyphicon glyphicon-plus"></span></a>
                            LEFT</h3></center>
                        </th>
                        <th style="border: 1px solid #000;">
                            <center><h3>
                            <a href="#" class='btn btn-xs btn-success add-multiple-material-option' data-material-id="{{ $material->id }}" data-add-to-perspective="right"><span class="glyphicon glyphicon-plus"></span></a>
                            RIGHT</h3></center>
                        </th>
                    </thead>
                    <tbody style="padding-top: 30px;">
                        <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;">
                        @foreach ($options as $option)
                            @if ($option->perspective == "front")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                     class="material-option-{{ $option->id }}  material-option-item" 
                                     data-material-option-name="{{ $option->name }}">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-option pull-right"
                                                data-material-option-id="{{ $option->id }}"
                                                data-material-option-name="{{ $option->name }}"
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a>
                                    <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                                    <a href="#" style="width: 100px; text-align: left;" class="btn btn-primary btn-xs edit-material-option" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                     data-placement="right"
                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                            data-material-option-applications-properties="{{ $option->applications_properties }}"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-origin="{{ $option->origin }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-default-color="{{ $option->default_color }}"
                                            data-material-option-sublimated-default-color="{{ $option->sublimated_default_color }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-id="{{ $option->material_id }}"
                                            >{{ $option->name }}
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-default" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                    <span style="margin-top: 0; background-color: #{{ $option->default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->default_hex_code }}</span>
                                    <span style="margin-top: 0; background-color: #{{ $option->sublimated_default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->sublimated_default_hex_code }}</span>
                                </div>
                            @endif
                        @endforeach
                        </td>
                        <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;">
                        @foreach ($options as $option)
                            @if ($option->perspective == "back")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                     class="material-option-{{ $option->id }}  material-option-item" 
                                     data-material-option-name="{{ $option->name }}">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-option pull-right"
                                                data-material-option-id="{{ $option->id }}"
                                                data-material-option-name="{{ $option->name }}"
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a>
                                    <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                                    <a href="#" style="width: 100px; text-align: left;" class="btn btn-primary btn-xs edit-material-option" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                     data-placement="right"
                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                            data-material-option-applications-properties="{{ $option->applications_properties }}"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-origin="{{ $option->origin }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-default-color="{{ $option->default_color }}"
                                            data-material-option-sublimated-default-color="{{ $option->sublimated_default_color }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-id="{{ $option->material_id }}"
                                            >{{ $option->name }}
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-default" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                    <span style="margin-top: 0; background-color: #{{ $option->default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->default_hex_code }}</span>
                                    <span style="margin-top: 0; background-color: #{{ $option->sublimated_default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->sublimated_default_hex_code }}</span>
                                </div>
                            @endif
                        @endforeach
                        </td>
                        <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;">
                        @foreach ($options as $option)
                            @if ($option->perspective == "left")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                     class="material-option-{{ $option->id }}  material-option-item" 
                                     data-material-option-name="{{ $option->name }}">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-option pull-right"
                                                data-material-option-id="{{ $option->id }}"
                                                data-material-option-name="{{ $option->name }}"
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a>
                                    <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                                    <a href="#" style="width: 100px; text-align: left;" class="btn btn-primary btn-xs edit-material-option" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                     data-placement="right"
                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                            data-material-option-applications-properties="{{ $option->applications_properties }}"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-origin="{{ $option->origin }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-default-color="{{ $option->default_color }}"
                                            data-material-option-sublimated-default-color="{{ $option->sublimated_default_color }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-id="{{ $option->material_id }}"
                                            >{{ $option->name }}
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-default" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                    <span style="margin-top: 0; background-color: #{{ $option->default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->default_hex_code }}</span>
                                    <span style="margin-top: 0; background-color: #{{ $option->sublimated_default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->sublimated_default_hex_code }}</span>
                                </div>
                            @endif
                        @endforeach
                        </td>
                        <td class="col-md-3" style="vertical-align: text-top; border: 1px solid #000;">
                        @foreach ($options as $option)
                            @if ($option->perspective == "right")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                     class="material-option-{{ $option->id }}  material-option-item" 
                                     data-material-option-name="{{ $option->name }}">
                                    <a href="#" class="btn btn-danger btn-xs delete-material-option pull-right"
                                                data-material-option-id="{{ $option->id }}"
                                                data-material-option-name="{{ $option->name }}"
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a>
                                    <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                                    <a href="#" style="width: 100px; text-align: left;" class="btn btn-primary btn-xs edit-material-option" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                     data-placement="right"
                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                            data-material-option-applications-properties="{{ $option->applications_properties }}"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-origin="{{ $option->origin }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-default-color="{{ $option->default_color }}"
                                            data-material-option-sublimated-default-color="{{ $option->sublimated_default_color }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-id="{{ $option->material_id }}"
                                            >{{ $option->name }}
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-default" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                    <span style="margin-top: 0; background-color: #{{ $option->default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->default_hex_code }}</span>
                                    <span style="margin-top: 0; background-color: #{{ $option->sublimated_default_hex_code }}; color: #fff; text-shadow: 1px 1px 1px #000; padding: 3px; border-radius: 2px;">#{{ $option->sublimated_default_hex_code }}</span>
                                </div>
                            @endif
                        @endforeach
                        </td>
                    </tbody>
                </table>
        <!-- </div>
    </div> -->
</div>

@include('administration.materials.add-multiple-options-modal')

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