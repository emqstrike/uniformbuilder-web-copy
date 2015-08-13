@extends('administration.main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">

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
                <th>Code</th>
                <th>Type</th>
                <th>Uniform Category</th>
                <th>Base Color</th>
                <th>Gender</th>
                <th>Sleeve Type</th>
                <th>Lining Type</th>
                <th>Active Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>

        @forelse ($materials as $material)

            <tr class='material-{{ $material->id }} {{ (!$material->active) ? ' inactive' : '' }}'>
                <td>
                    <img src="{{ $material->thumbnail_path }}" width="100px" height="100px" alt="{{ $material->slug }}">
                </td>
                <td>
                    {{ $material->name }}
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
                    <a href="#" class="btn btn-default btn-xs show-material" role="button"
                        data-material-name="{{ $material->name }}"
                        data-material-code="{{ $material->code }}"
                        data-material-path="{{ $material->material_path }}"
                        data-bump-map-path="{{ $material->bump_map_path }}"
                        data-shadow-path="{{ $material->shadow_path }}"
                        data-highlight-path="{{ $material->highlight_path }}"
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

<!-- Information Modal -->
<div class="modal fade" id="view-material-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">
                <div class='tabbable'>
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#tab-material-image" data-toggle="tab">Base Material</a></li>
                        <li><a href="#tab-bump-map-image" data-toggle="tab">Bump Map</a></li>
                        <li><a href="#tab-shadow-image" data-toggle="tab">Shadow</a></li>
                        <li><a href="#tab-highlight-image" data-toggle="tab">Highlight</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-material-image" align='center'>
                            <img src="" class="material-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-bump-map-image" align='center'>
                            <img src="" class="bump-map-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-shadow-image" align='center'>
                            <img src="" class="shadow-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-highlight-image" align='center'>
                            <img src="" class="highlight-image" width="300px" height="300px">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default confirm-no" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/materials.js"></script>
@endsection