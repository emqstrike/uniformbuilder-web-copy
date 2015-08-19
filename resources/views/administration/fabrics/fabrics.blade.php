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
        <span class="glyphicon glyphicon-th-list"></span>
        Fabrics
        <small>
            <a href="/administration/fabric/add" class='btn btn-xs btn-success'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New Fabric
            </a>
        </small>
    </h1>
</div>

<div class="row col-md-5">
    <table data-toggle='table' class='fabrics'>
        <thead>
            <tr>
                <th>Fabric Name</th>
                <th>Active Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>

@forelse ($fabrics as $fabric)

    <tr class='fabric-{{ $fabric->id }} {{ (!$fabric->active) ? ' inactive' : '' }}'>
        <td>
            {{ $fabric->name }}
        </td>
        <td>
            <a href="#" class="btn btn-default btn-xs disable-fabric" data-fabric-id="{{ $fabric->id }}" role="button" {{ ($fabric->active) ? : 'disabled="disabled"' }}>
                <i class="glyphicon glyphicon-eye-close"></i>
                Disable
            </a>
            <a href="#" class="btn btn-info btn-xs enable-fabric" data-fabric-id="{{ $fabric->id }}" role="button" {{ ($fabric->active) ? 'disabled="disabled"' : '' }}>
                <i class="glyphicon glyphicon-eye-open"></i>
                Enable
            </a>
        </td>
        <td>
            <a href="/administration/fabric/edit/{{ $fabric->id }}" class="btn btn-primary btn-xs edit-fabric" data-fabric-id="{{ $fabric->id }}" role="button">
                <i class="glyphicon glyphicon-edit"></i>
                Edit
            </a>
            <a href="#" class="btn btn-default btn-xs show-fabric" role="button"
                data-fabric-name="{{ $fabric->name }}"
                data-fabric-layer-four="{{ $fabric->fabric_path }}"
                data-fabric-id="{{ $fabric->id }}">
                <li class="glyphicon glyphicon-info-sign"></li>
                View
            </a>
            <a href="#" class="btn btn-danger pull-right btn-xs delete-fabric" data-fabric-id="{{ $fabric->id }}" role="button">
                <i class="glyphicon glyphicon-trash"></i>
                Remove
            </a>
        </td>
    </tr>

@empty

    <tr>
        <td colspan='3'>
            No Fabrics
        </td>
    </tr>

@endforelse

        </tbody>
    </table>
</div>

<!-- Information Modal -->
<div class="modal fade" id="view-fabric-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">
                <div class='tabbable'>
                    <ul class="nav nav-tabs">
                        <li class="tab-menu-layer-1 active"><a href="#tab-fabric-layer-1" data-toggle="tab">Layer 1</a></li>
                        <li class="tab-menu-layer-2"><a href="#tab-fabric-layer-2" data-toggle="tab">Layer 2</a></li>
                        <li class="tab-menu-layer-3"><a href="#tab-fabric-layer-3" data-toggle="tab">Layer 3</a></li>
                        <li class="tab-menu-layer-4"><a href="#tab-fabric-layer-4" data-toggle="tab">Layer 4</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-fabric-layer-1" align='center'>
                            <span class="badge fabric-layer-1-path"></span>
                            <img src="" class="fabric-layer-1" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-fabric-layer-2" align='center'>
                            <span class="badge fabric-layer-2-path"></span>
                            <img src="" class="fabric-layer-2" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-fabric-layer-3" align='center'>
                            <span class="badge fabric-layer-3-path"></span>
                            <img src="" class="fabric-layer-3" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-fabric-layer-4" align='center'>
                            <span class="badge fabric-layer-4-path"></span>
                            <img src="" class="fabric-layer-4" width="300px" height="300px">
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
<script type="text/javascript" src="/js/administration/fabrics.js"></script>
@endsection