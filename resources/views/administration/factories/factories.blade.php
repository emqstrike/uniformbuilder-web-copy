@extends('administration.main')

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
        <span class="fa fa-building"></span>
        Factories
        <small>
            <a href="/administration/factory/add" class='btn btn-xs btn-success'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New Factory
            </a>
        </small>
    </h1>
</div>

<div class="row col-md-5">
    <table class='table table-bordered'>
    <tr>
        <th colspan='2'>
            Factories
        </th>
    </tr>
@forelse ($factories as $factory)

    <tr class='factory-{{ $factory->id }} {{ (!$factory->active) ? ' inactive' : '' }}'>
        <td>
            {{ $factory->name }}
        </td>
        <td>
            <a href="#" class="btn btn-default btn-xs disable-factory" data-factory-id="{{ $factory->id }}" role="button" {{ ($factory->active) ? : 'disabled="disabled"' }}>
                <i class="glyphicon glyphicon-eye-close"></i>
                Disable
            </a>
            <a href="#" class="btn btn-info btn-xs enable-factory" data-factory-id="{{ $factory->id }}" role="button" {{ ($factory->active) ? 'disabled="disabled"' : '' }}>
                <i class="glyphicon glyphicon-eye-open"></i>
                Enable
            </a>
        </td>
        <td>
            <a href="/administration/factory/edit/{{ $factory->id }}" class="btn btn-primary btn-xs edit-factory" data-factory-id="{{ $factory->id }}" role="button">
                <i class="glyphicon glyphicon-edit"></i>
                Edit
            </a>
            <a href="#" class="btn btn-danger pull-right btn-xs delete-factory" data-factory-id="{{ $factory->id }}" role="button">
                <i class="glyphicon glyphicon-trash"></i>
                Remove
            </a>
        </td>
    </tr>

@empty

    <tr>
        <td colspan='2'>
            No Factories
        </td>
    </tr>

@endforelse
    </table>
</div>
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/factories.js"></script>
@endsection