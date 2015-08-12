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
        Patterns
        <small>
            <a href="/administration/pattern/add" class='btn btn-xs btn-success'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New Pattern
            </a>
        </small>
    </h1>
</div>

<div class="row col-md-5">
    <table data-toggle='table' class='patterns'>
        <thead>
            <tr>
                <th>Pattern Name</th>
                <th>Active Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>

@forelse ($patterns as $pattern)

    <tr class='pattern-{{ $pattern->id }} {{ (!$pattern->active) ? ' inactive' : '' }}'>
        <td>
            {{ $pattern->name }}
        </td>
        <td>
            <a href="#" class="btn btn-default btn-xs disable-pattern" data-pattern-id="{{ $pattern->id }}" role="button" {{ ($pattern->active) ? : 'disabled="disabled"' }}>
                <i class="glyphicon glyphicon-eye-close"></i>
                Disable
            </a>
            <a href="#" class="btn btn-info btn-xs enable-pattern" data-pattern-id="{{ $pattern->id }}" role="button" {{ ($pattern->active) ? 'disabled="disabled"' : '' }}>
                <i class="glyphicon glyphicon-eye-open"></i>
                Enable
            </a>
        </td>
        <td>
            <a href="/administration/pattern/edit/{{ $pattern->id }}" class="btn btn-primary btn-xs edit-pattern" data-pattern-id="{{ $pattern->id }}" role="button">
                <i class="glyphicon glyphicon-edit"></i>
                Edit
            </a>
            <a href="#" class="btn btn-default btn-xs show-pattern" role="button"
                data-pattern-name="{{ $pattern->name }}"
                data-pattern-layer-one="{{ $pattern->layer_1_path }}"
                data-pattern-layer-two="{{ $pattern->layer_2_path }}"
                data-pattern-layer-three="{{ $pattern->layer_3_path }}"
                data-pattern-layer-four="{{ $pattern->layer_4_path }}"
                data-pattern-id="{{ $pattern->id }}">
                <li class="glyphicon glyphicon-info-sign"></li>
                View
            </a>
            <a href="#" class="btn btn-danger pull-right btn-xs delete-pattern" data-pattern-id="{{ $pattern->id }}" role="button">
                <i class="glyphicon glyphicon-trash"></i>
                Remove
            </a>
        </td>
    </tr>

@empty

    <tr>
        <td colspan='3'>
            No Patterns
        </td>
    </tr>

@endforelse

        </tbody>
    </table>
</div>

<!-- Information Modal -->
<div class="modal fade" id="view-pattern-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">
                <div class='tabbable'>
                    <ul class="nav nav-tabs">
                        <li class="tab-menu-layer-1 active"><a href="#tab-pattern-layer-1" data-toggle="tab">Layer 1</a></li>
                        <li class="tab-menu-layer-2"><a href="#tab-pattern-layer-2" data-toggle="tab">Layer 2</a></li>
                        <li class="tab-menu-layer-3"><a href="#tab-pattern-layer-3" data-toggle="tab">Layer 3</a></li>
                        <li class="tab-menu-layer-4"><a href="#tab-pattern-layer-4" data-toggle="tab">Layer 4</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-pattern-layer-1" align='center'>
                            <span class="badge pattern-layer-1-path"></span>
                            <img src="" class="pattern-layer-1" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-pattern-layer-2" align='center'>
                            <span class="badge pattern-layer-2-path"></span>
                            <img src="" class="pattern-layer-2" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-pattern-layer-3" align='center'>
                            <span class="badge pattern-layer-3-path"></span>
                            <img src="" class="pattern-layer-3" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-pattern-layer-4" align='center'>
                            <span class="badge pattern-layer-4-path"></span>
                            <img src="" class="pattern-layer-4" width="300px" height="300px">
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
<script type="text/javascript" src="/js/administration/patterns.js"></script>
@endsection