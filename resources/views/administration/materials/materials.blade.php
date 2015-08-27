@extends('administration.main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">

@endsection

@section('content')

@if (Session::has('message'))
<div class="alert alert-info alert-dismissable flash-alert">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
        ×
    </button>
    <h4 class='flash-title'>Alert</h4>
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
    <table data-toggle='table' class='materials'>
        <thead>
            <tr>
                <th>Thumbnail</th>
                <th>Material Name</th>
                <th>Material Options</th>
                <th>Code</th>
                <th>Type</th>
                <th>Uniform Category</th>
                <th>Base Color</th>
                <th>Gender</th>
                <th>Lining Type</th>
                <th>Active Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>

        @forelse ($materials as $material)

            <tr class='material-{{ $material->id }} {{ (!$material->active) ? ' inactive' : '' }}'>
                <td>
                    @if ($material->thumbnail_path)
                    <img src="{{ $material->thumbnail_path }}" width="100px" height="100px" alt="{{ $material->slug }}">
                    @else
                    <img src="http://dummyimage.com/100" width="100px" height="100px" alt="{{ $material->slug }}">
                    @endif
                </td>
                <td>
                    {{ $material->name }}
                </td>
                <td>
                    @foreach ($material->options as $option)
                    <div style="margin-top: 3px;" class="material-option-{{ $option->id }}">
                        <a href="#" class='btn btn-xs btn-info edit-material-option'
                            data-material-option-name="{{ $option->name }}"
                            data-material-option-layer-level="{{ $option->layer_level }}"
                            data-material-option-setting-type="{{ $option->setting_type }}"
                            data-material-option-setting-code="{{ $option->setting_code }}"
                            data-material-option-path="{{ $option->material_option_path }}"
                            data-material-perspective="{{ $option->perspective }}"
                            data-material-option-id="{{ $option->id }}"
                            data-material-name="{{ $material->name }}"
                            data-material-id="{{ $material->id }}">
                            <span class="fa fa-edit"></span>
                            {{ $option->name }}
                        </a>
                        <span class="label label-default">Level: {{ $option->layer_level }} - {{ strtoupper($option->perspective) }}</span>
                        <a href="#" class="btn btn-danger pull-right btn-xs delete-material-option" data-material-option-id="{{ $option->id }}" role="button">
                            <i class="glyphicon glyphicon-trash"></i>
                        </a>
                    </div>
                    @endforeach
                    <div style="margin-top: 10px;">
                        <a href="#" class='btn btn-xs btn-success add-material-option'
                            data-material-name="{{ $material->name }}"
                            data-material-id="{{ $material->id }}">
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Add Material Option
                        </a>
                    </div>
                </td>
                <td>
                    <span class="label label-default">
                        {{ $material->code }}
                    </span>
                </td>
                <td>
                    {{ ucfirst($material->type) }}
                </td>
                <td>
                    {{ $material->uniform_category }}
                </td>
                <td>
                    {{ $material->color_name }}
                    <div style="background-color: #{{ $material->hex_code }}">&nbsp;</div>
                </td>
                <td>
                    {{ ucfirst($material->gender) }}
                </td>
                <td>
                    {{ ucfirst($material->lining_type) }}
                </td>
                <td>
                    <a href="#" class="btn btn-default btn-xs disable-material" data-material-id="{{ $material->id }}" role="button" {{ ($material->active) ? : 'disabled="disabled"' }}>
                        <i class="glyphicon glyphicon-eye-close"></i>
                        Disable
                    </a>
                    <a href="#" class="btn btn-info btn-xs enable-material" data-material-id="{{ $material->id }}" role="button" {{ ($material->active) ? 'disabled="disabled"' : '' }}>
                        <i class="glyphicon glyphicon-eye-open"></i>
                        Enable
                    </a>
                </td>
                <td>
                    <div>
                        <a href="#" class="btn btn-default btn-xs show-material" role="button"
                            data-material-name="{{ $material->name }}"
                            data-material-code="{{ $material->code }}"
                            data-material-type="{{ $material->type }}"
                            data-material-uniform-category="{{ $material->uniform_category }}"
                            data-material-base-color="{{ $material->color_name }}"
                            data-material-base-color-code="{{ $material->hex_code }}"
                            data-material-gender="{{ $material->gender }}"
                            data-material-lining-type="{{ $material->lining_type }}"
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
                </td>
            </tr>

        @empty

            <tr>
                <td colspan='4' align='center'>
                    No Materials
                </td>
            </tr>

        @endforelse

        </tbody>
    </table>

</div>

@include('administration.materials.material-view-modal')

@include('administration.materials.material-option-create-modal')

@include('administration.materials.material-option-edit-modal')

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal'])

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-material-option'])

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/materials.js"></script>
@endsection

