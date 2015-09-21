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

    <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
</div>
@endif

<div class="col-md-12">
    <h1>
        <span class="fa fa-th"></span>
        {{ $title }}
        <small>
            <a href="/administration/cut/add/{{ $create_endpoint }}" class='btn btn-xs btn-success'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New {{ substr($title, 0, strlen($title) - 1) }}
            </a>
        </small>
    </h1>
</div>
<div class="row col-md-5">
    <table data-toggle='table' class='patterns'>
        <thead>
            <tr>
                <th>Cut Style Name</th>
                <th>Code</th>
                <th>Active Status</th>
                <th></th>
            </tr>
        </thead>
        <tbody>

@forelse ($cuts as $cut)

    <tr class='cut-{{ $cut->id }} {{ (!$cut->active) ? ' inactive' : '' }}'>
        <td>
            {{ $cut->name }}
        </td>
        <td>
            <span class='badge'>{{ $cut->code }}</span>
        </td>
        <td>
            <a href="#" class="btn btn-default btn-xs disable-cut" data-cut-id="{{ $cut->id }}" role="button" {{ ($cut->active) ? : 'disabled="disabled"' }}>
                <i class="glyphicon glyphicon-eye-close"></i>
                Disable
            </a>
            <a href="#" class="btn btn-info btn-xs enable-cut" data-cut-id="{{ $cut->id }}" role="button" {{ ($cut->active) ? 'disabled="disabled"' : '' }}>
                <i class="glyphicon glyphicon-eye-open"></i>
                Enable
            </a>
        </td>
        <td>
            <a href="/administration/cut/edit/{{ $cut->id }}" class="btn btn-primary btn-xs edit-cut" data-cut-id="{{ $cut->id }}" role="button">
                <i class="glyphicon glyphicon-edit"></i>
                Edit
            </a>
            <a href="#" class="btn btn-danger pull-right btn-xs delete-cut" data-cut-id="{{ $cut->id }}" role="button">
                <i class="glyphicon glyphicon-trash"></i>
                Remove
            </a>
        </td>
    </tr>

@empty

    <tr>
        <td colspan='3'>
            No {{ $title }}
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
<script type="text/javascript" src="/js/administration/cuts.js"></script>
@endsection