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
        <span class="fa fa-gradient"></span>
        Gradients
        <small>
            <a href="/administration/gradient/add" class='btn btn-xs btn-success'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New Gradient
            </a>
        </small>
    </h1>
</div>

<div class="row-fluid col-md-6">
    <table data-toggle='table' class='gradients'>
        <thead>
            <tr>
                <th>Thumbnail</th>
                <th>Gradient Name</th>
                <th>Active Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>

@forelse ($gradients as $gradient)

    <tr class='gradient-{{ $gradient->id }} {{ (!$gradient->active) ? ' inactive' : '' }}'>
        <td>
            <img src="{{ $gradient->gradient_path }}" width="100px" height="100px">
        </td>
        <td>
            {{ $gradient->name }}
        </td>
        <td>
            <a href="#" class="btn btn-default btn-xs disable-gradient" data-gradient-id="{{ $gradient->id }}" role="button" {{ ($gradient->active) ? : 'disabled="disabled"' }}>
                <i class="glyphicon glyphicon-eye-close"></i>
                Disable
            </a>
            <a href="#" class="btn btn-info btn-xs enable-gradient" data-gradient-id="{{ $gradient->id }}" role="button" {{ ($gradient->active) ? 'disabled="disabled"' : '' }}>
                <i class="glyphicon glyphicon-eye-open"></i>
                Enable
            </a>
        </td>
        <td>
            <a href="/administration/gradient/edit/{{ $gradient->id }}" class="btn btn-primary btn-xs edit-gradient" data-gradient-id="{{ $gradient->id }}" role="button">
                <i class="glyphicon glyphicon-edit"></i>
                Edit
            </a>
            <a href="#" class="btn btn-danger pull-right btn-xs delete-gradient" data-gradient-id="{{ $gradient->id }}" role="button">
                <i class="glyphicon glyphicon-trash"></i>
                Remove
            </a>
        </td>
    </tr>

@empty

    <tr>
        <td colspan='3'>
            No Gradients
        </td>
    </tr>

@endforelse

        </tbody>
    </table>
</div>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/gradients.js"></script>
@endsection