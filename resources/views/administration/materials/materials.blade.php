@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">

@endsection

@section('content')

@if (Session::has('message'))
<div class="alert alert-info alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>

    <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
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
    </h1>
</div>

<div class="row-fluid col-md-12">
    <table data-toggle='table' class='data-table table table-bordered materials'>
        <thead>
            <tr class="center-table-heads">
                <th class="col-md-2">Material</th>
                <th>Material Options</th>
            </tr>
        </thead>
        <tbody>

        @forelse ($materials as $material)

            <tr class='material-{{ $material->id }} {{ (!$material->active) ? ' inactive' : '' }}'>
                <td>
                    <div>
                        <div style="float:right;">
                            <a href="#" class="btn btn-default btn-xs disable-material" data-material-id="{{ $material->id }}" role="button" {{ ($material->active) ? 'disabled="disabled"' : '' }}>
                                <i class="glyphicon glyphicon-eye-close"></i>
                                Disable
                            </a>
                            <a href="#" class="btn btn-info btn-xs enable-material" data-material-id="{{ $material->id }}" role="button" {{ ($material->active) ? 'disabled="disabled"' : '' }}>
                                <i class="glyphicon glyphicon-eye-open"></i>
                                Enable
                            </a>
                        </div>
                        <div>
                            <center>
                                <img src="{{ $material->thumbnail_path }}"
                                     width="100px"
                                     height="100px"
                                     alt="{{ $material->slug }}">
                            </center>
                        </div><hr>
                        <div>
                            <div class="col-md-6">Name: </div>
                            <div class="col-md-6"><b>{{ $material->name }}</b></div>
                            <div class="col-md-6">Code: </div>
                            <div class="col-md-6"><span class="label label-default">{{ $material->code }}</span></div>
                            <div class="col-md-6">Category: </div>
                            <div class="col-md-6"><span class="label label-default">{{ $material->uniform_category }}</span></div>
                            <div class="col-md-6">Type: </div>
                            <div class="col-md-6"><span class="label label-default">{{ $material->type }}</span></div>
                        </div>
                        <div>
                        <a href="#" class="btn btn-default btn-xs show-material" role="button"
                            data-material-name="{{ $material->name }}"
                            data-material-code="{{ $material->code }}"
                            data-material-type="{{ $material->type }}"
                            data-material-uniform-category="{{ $material->uniform_category }}"
                            data-material-gender="{{ $material->gender }}"
@if (env('BUILDER_APPROACH') == '3D')
                            data-material-path="{{ $material->material_path }}"
                            data-bump-map-path="{{ $material->bump_map_path }}"
                            data-shadow-path="{{ $material->shadow_path }}"
                            data-highlight-path="{{ $material->highlight_path }}"
@elseif (env('BUILDER_APPROACH') == '2D')
                            data-front-view-path="{{ $material->front_view_path }}"
                            data-front-view-shape="{{ $material->front_view_shape }}"
                            data-back-view-path="{{ $material->back_view_path }}"
                            data-back-view-shape="{{ $material->back_view_shape }}"
                            data-right-side-view-path="{{ $material->right_side_view_path }}"
                            data-right-side-view-shape="{{ $material->right_side_view_shape }}"
                            data-left-side-view-path="{{ $material->left_side_view_path }}"
                            data-left-side-view-shape="{{ $material->left_side_view_shape }}"
@endif
                            data-material-id="{{ $material->id }}">
                            <li class="glyphicon glyphicon-info-sign"></li>
                            View
                        </a>
                        <a href="/administration/material/edit/{{ $material->id }}" class="btn btn-primary btn-xs edit-material" role="button">
                            <i class="glyphicon glyphicon-edit"></i>
                            Edit
                        </a>
                        <a href="#" class="btn btn-danger pull-right btn-xs delete-material" data-material-id="{{ $material->id }}" role="button">
                            <i class="glyphicon glyphicon-trash"></i>
                            Remove
                        </a>
                    </div>
                    <div>
                        <a href="#" class='btn btn-xs btn-success add-material-option'
                            data-material-name="{{ $material->name }}"
                            data-material-id="{{ $material->id }}"
                            data-material-front-shape="{{ $material->front_view_shape }}"
                            data-material-back-shape="{{ $material->back_view_shape }}"
                            data-material-left-shape="{{ $material->left_side_view_shape }}"
                            data-material-right-shape="{{ $material->right_side_view_shape }}">
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Add Material Option
                        </a>
                        <a href="#" class='btn btn-xs btn-success add-multiple-material-option'
                            data-material-name="{{ $material->name }}"
                            data-material-id="{{ $material->id }}"
                            data-material-front-shape="{{ $material->front_view_shape }}"
                            data-material-back-shape="{{ $material->back_view_shape }}"
                            data-material-left-shape="{{ $material->left_side_view_shape }}"
                            data-material-right-shape="{{ $material->right_side_view_shape }}">
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Add Multiple Material Option
                        </a>
                    </div>
                    </div>
                </td>
                <td>
                    <div class="row">
                        <div class="col-md-3">
                        <span class="label label-default">FRONT</span>  
                        <center>
                            <img src="{{ $material->front_view_shape }}"
                                 width="100px"
                                 height="100px"
                                 alt="{{ $material->slug }}"
                                 style="background-color: #e3e3e3;">
                        </center>                      
                        @foreach ($material->options as $option)
                            @if ($option->perspective == "front")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                     class="material-option-{{ $option->id }}  material-option-item" 
                                     data-material-option-name="{{ $option->name }}">
                                    @if ($material->thumbnail_path)
                                        <!-- <img src="{{ $option->material_option_path }}" 
                                             class="pull-right" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}"> -->
                                    @else
                                        <!-- <img src="" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}"> -->
                                    @endif
                                    <a href="#" class="btn btn-danger btn-xs delete-material-option pull-right"
                                                data-material-option-id="{{ $option->id }}"
                                                data-material-option-name="{{ $option->name }}"
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a>
                                    <a href="#" class="btn btn-primary btn-xs edit-material-option" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                     data-placement="right"
                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                            data-material-option-applications-properties="{{ $option->applications_properties }}"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-origin="{{ $option->origin }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-default-color="{{ $option->default_color }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-name="{{ $material->name }}"
                                            data-material-id="{{ $material->id }}"
                                            data-material-front-shape="{{ $material->front_view_shape }}"
                                            data-material-back-shape="{{ $material->back_view_shape }}"
                                            data-material-left-shape="{{ $material->left_side_view_shape }}"
                                            data-material-right-shape="{{ $material->right_side_view_shape }}">{{ $option->name }}
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-default" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                </div>
                            @endif
                        @endforeach
                        </div>
                        <div class="row">
                        <div class="col-md-3">
                        <span class="label label-default">BACK</span>  
                        <center>
                            <img src="{{ $material->front_view_shape }}"
                                 width="100px"
                                 height="100px"
                                 alt="{{ $material->slug }}"
                                 style="background-color: #e3e3e3;">
                        </center>                      
                        @foreach ($material->options as $option)
                            @if ($option->perspective == "back")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                     class="material-option-{{ $option->id }}  material-option-item" 
                                     data-material-option-name="{{ $option->name }}">
                                    @if ($material->thumbnail_path)
                                        <!-- <img src="{{ $option->material_option_path }}" 
                                             class="pull-right" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}"> -->
                                    @else
                                        <!-- <img src="" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}"> -->
                                    @endif
                                    <a href="#" class="btn btn-danger btn-xs delete-material-option pull-right"
                                                data-material-option-id="{{ $option->id }}"
                                                data-material-option-name="{{ $option->name }}"
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a>
                                    <a href="#" class="btn btn-primary btn-xs edit-material-option" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                     data-placement="right"
                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                            data-material-option-applications-properties="{{ $option->applications_properties }}"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-origin="{{ $option->origin }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-default-color="{{ $option->default_color }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-name="{{ $material->name }}"
                                            data-material-id="{{ $material->id }}"
                                            data-material-front-shape="{{ $material->front_view_shape }}"
                                            data-material-back-shape="{{ $material->back_view_shape }}"
                                            data-material-left-shape="{{ $material->left_side_view_shape }}"
                                            data-material-right-shape="{{ $material->right_side_view_shape }}">{{ $option->name }}
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-default" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                </div>
                            @endif
                        @endforeach
                        </div>
                        <div class="row">
                        <div class="col-md-3">
                        <span class="label label-default">LEFT</span>  
                        <center>
                            <img src="{{ $material->front_view_shape }}"
                                 width="100px"
                                 height="100px"
                                 alt="{{ $material->slug }}"
                                 style="background-color: #e3e3e3;">
                        </center>                      
                        @foreach ($material->options as $option)
                            @if ($option->perspective == "left")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                     class="material-option-{{ $option->id }}  material-option-item" 
                                     data-material-option-name="{{ $option->name }}">
                                    @if ($material->thumbnail_path)
                                        <!-- <img src="{{ $option->material_option_path }}" 
                                             class="pull-right" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}"> -->
                                    @else
                                        <!-- <img src="" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}"> -->
                                    @endif
                                    <a href="#" class="btn btn-danger btn-xs delete-material-option pull-right"
                                                data-material-option-id="{{ $option->id }}"
                                                data-material-option-name="{{ $option->name }}"
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a>
                                    <a href="#" class="btn btn-primary btn-xs edit-material-option" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                     data-placement="right"
                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                            data-material-option-applications-properties="{{ $option->applications_properties }}"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-origin="{{ $option->origin }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-default-color="{{ $option->default_color }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-name="{{ $material->name }}"
                                            data-material-id="{{ $material->id }}"
                                            data-material-front-shape="{{ $material->front_view_shape }}"
                                            data-material-back-shape="{{ $material->back_view_shape }}"
                                            data-material-left-shape="{{ $material->left_side_view_shape }}"
                                            data-material-right-shape="{{ $material->right_side_view_shape }}">{{ $option->name }}
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-default" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                </div>
                            @endif
                        @endforeach
                        </div>
                        <div class="row">
                        <div class="col-md-3">
                        <span class="label label-default">RIGHT</span>  
                        <center>
                            <img src="{{ $material->front_view_shape }}"
                                 width="100px"
                                 height="100px"
                                 alt="{{ $material->slug }}"
                                 style="background-color: #e3e3e3;">
                        </center>                      
                        @foreach ($material->options as $option)
                            @if ($option->perspective == "right")
                                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;" 
                                     class="material-option-{{ $option->id }}  material-option-item" 
                                     data-material-option-name="{{ $option->name }}">
                                    @if ($material->thumbnail_path)
                                        <!-- <img src="{{ $option->material_option_path }}" 
                                             class="pull-right" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}"> -->
                                    @else
                                        <!-- <img src="" 
                                             width="45px" 
                                             height="45px" 
                                             alt="{{ $material->slug }}"> -->
                                    @endif
                                    <a href="#" class="btn btn-danger btn-xs delete-material-option pull-right"
                                                data-material-option-id="{{ $option->id }}"
                                                data-material-option-name="{{ $option->name }}"
                                                role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                    </a>
                                    <a href="#" class="btn btn-primary btn-xs edit-material-option" data-toggle="popover" data-img="{{ $option->material_option_path }}"
                                     data-placement="right"
                                            data-material-option-boundary-properties="{{ $option->boundary_properties }}"
                                            data-material-option-applications-properties="{{ $option->applications_properties }}"
                                            data-material-option-name="{{ $option->name }}"
                                            data-material-option-origin="{{ $option->origin }}"
                                            data-material-option-layer-level="{{ $option->layer_level }}"
                                            data-material-option-default-color="{{ $option->default_color }}"
                                            data-material-option-setting-type="{{ $option->setting_type }}"
                                            data-material-option-setting-code="{{ $option->setting_code }}"
                                            data-material-option-path="{{ $option->material_option_path }}"
                                            data-material-option-perspective="{{ $option->perspective }}"
                                            data-material-option-id="{{ $option->id }}"
                                            data-material-option-colors='{{ $option->colors }}'
                                            data-material-option-gradients='{{ $option->gradients }}'
                                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                                            data-material-name="{{ $material->name }}"
                                            data-material-id="{{ $material->id }}"
                                            data-material-front-shape="{{ $material->front_view_shape }}"
                                            data-material-back-shape="{{ $material->back_view_shape }}"
                                            data-material-left-shape="{{ $material->left_side_view_shape }}"
                                            data-material-right-shape="{{ $material->right_side_view_shape }}">{{ $option->name }}
                                            <i class="glyphicon glyphicon-edit"></i></a>
                                    <span class="label label-default" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                                </div>
                            @endif
                        @endforeach
                        </div>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan='9' align='center'>
                    No Materials
                </td>
            </tr>
        @break
        @endforelse

        </tbody>
    </table>

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