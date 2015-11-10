@extends('administration.main')

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
        <span class="fa fa-building-o"></span>
        Uniform Categories
        <small>
            <a href="/administration/category/add" class='btn btn-xs btn-success'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New Uniform Category
            </a>
        </small>
    </h1>
</div>

<div class="row-fluid col-md-5">
<table class='data-table table table-bordered'>
<thead>
    <tr>
        <th>Categories</th>
        <th>Status</th>
        <th>Actions</th>
    </tr>
</thead>
<tbody>
@forelse ($categories as $category)

    <tr class='category-{{ $category->id }} {{ (!$category->active) ? ' inactive' : '' }}'>
        <td>
            {{ $category->name }}
        </td>
        <td>
            <a href="#" class="btn btn-default btn-xs disable-category" data-category-id="{{ $category->id }}" role="button" {{ ($category->active) ? : 'disabled="disabled"' }}>
                <i class="glyphicon glyphicon-eye-close"></i>
                Disable
            </a>
            <a href="#" class="btn btn-info btn-xs enable-category" data-category-id="{{ $category->id }}" role="button" {{ ($category->active) ? 'disabled="disabled"' : '' }}>
                <i class="glyphicon glyphicon-eye-open"></i>
                Enable
            </a>
        </td>
        <td>
            <a href="/administration/category/edit/{{ $category->id }}" class="btn btn-primary btn-xs edit-category" data-category-id="{{ $category->id }}" role="button">
                <i class="glyphicon glyphicon-edit"></i>
                Edit
            </a>
            <a href="#" class="btn btn-danger pull-right btn-xs delete-category" data-category-id="{{ $category->id }}" role="button">
                <i class="glyphicon glyphicon-trash"></i>
                Remove
            </a>
        </td>
    </tr>

@empty

    <tr>
        <td colspan='2'>
            No Uniform Categories
        </td>
    </tr>

@endforelse
</tbody>
    </table>
</div>
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/categories.js"></script>
@if (Session::has('message'))
<script type="text/javascript">
$(document).ready(function(){
    flashAlertFadeOut();
});
</script>
@endif
@endsection