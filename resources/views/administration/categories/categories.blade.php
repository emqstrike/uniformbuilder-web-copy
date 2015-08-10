@extends('administration.main')

@section('content')

<div class="col-md-12">
    <h1>
        Uniform Categories
        <small>
            <a href="/administration/category/add" class='btn btn-xs btn-success'>Add New Uniform Category</a>
        </small>
    </h1>
</div>

<div class="row col-md-5">
    <table class='table table-bordered'>
    <tr>
        <th colspan='2'>
            Categories
        </th>
    </tr>
@forelse ($categories as $category)

    <tr class='category-{{ $category->id }} {{ (!$category->active) ? ' inactive' : '' }}'>
        <td>
            {{ $category->name }}
        </td>
        <td>
            <a href="#" class="btn btn-default btn-xs disable-category" data-category-id="{{ $category->id }}" role="button" {{ ($category->active) ? : 'disabled="disabled"' }}>Disable</a>
            <a href="#" class="btn btn-info btn-xs enable-category" data-category-id="{{ $category->id }}" role="button" {{ ($category->active) ? 'disabled="disabled"' : '' }}>Enable</a>
            <a href="#" class="btn btn-danger pull-right btn-xs delete-category" data-category-id="{{ $category->id }}" role="button">Remove</a>
        </td>
    </tr>

@empty

    <tr>
        <td colspan='2'>
            No Uniform Categories
        </td>
    </tr>

@endforelse
    </table>
</div>
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/categories.js"></script>
@endsection