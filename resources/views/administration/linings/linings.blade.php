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
        <span class="glyphicon glyphicon-th-list"></span>
        Linings
        <small>
            <a href="/administration/lining/add" class='btn btn-xs btn-success'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New Lining
            </a>
        </small>
    </h1>
</div>

<div class="row col-md-7">
<table data-toggle='table' class='data-table table table-bordered linings'>
<thead>
    <tr>
        <th>Lining Name</th>
        <th>Code</th>
        <th>Active Status</th>
        <th></th>
    </tr>
</thead>
<tbody>

@forelse ($linings as $lining)

    <tr class='lining-{{ $lining->id }} {{ (!$lining->active) ? ' inactive' : '' }}'>
        <td>
            {{ $lining->name }}
        </td>
        <td>
            <span class="badge">{{ $lining->code }}</span>
        </td>
        <td>
            <a href="#" class="btn btn-default btn-xs disable-lining" data-lining-id="{{ $lining->id }}" role="button" {{ ($lining->active) ? : 'disabled="disabled"' }}>
                <i class="glyphicon glyphicon-eye-close"></i>
                Disable
            </a>
            <a href="#" class="btn btn-info btn-xs enable-lining" data-lining-id="{{ $lining->id }}" role="button" {{ ($lining->active) ? 'disabled="disabled"' : '' }}>
                <i class="glyphicon glyphicon-eye-open"></i>
                Enable
            </a>
        </td>
        <td>
            <a href="/administration/lining/edit/{{ $lining->id }}" class="btn btn-primary btn-xs edit-lining" data-lining-id="{{ $lining->id }}" role="button">
                <i class="glyphicon glyphicon-edit"></i>
                Edit
            </a>
            <a href="#" class="btn btn-danger pull-right btn-xs delete-lining" data-lining-id="{{ $lining->id }}" role="button">
                <i class="glyphicon glyphicon-trash"></i>
                Remove
            </a>
        </td>
    </tr>

@empty

    <tr>
        <td colspan='3'>
            No Linings
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
<script type="text/javascript" src="/js/administration/linings.js"></script>
@if (Session::has('message'))
<script type="text/javascript">
$(document).ready(function(){
    flashAlertFadeOut();
});
</script>
@endif
@endsection