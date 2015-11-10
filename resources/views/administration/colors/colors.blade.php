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
        <span class="fa fa-th"></span>
        Colors
        <small>
            <a href="/administration/color/add" class='btn btn-xs btn-success'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New Color
            </a>
        </small>
    </h1>
</div>

<div class="row-fluid col-md-9">
<table class='data-table table table-bordered'>
<thead>
    <tr>
        <th>Color</th>
        <th>Edit</th>
        <th>Actions</th>
    </tr>
</thead>
<tbody>
@forelse ($colors as $color)
    <tr class='color-{{ $color->id }} {{ (!$color->active) ? ' inactive' : '' }}'>
        <td>
            {{ $color->name }}
        </td>
        <td style='background-color: #{{ $color->hex_code }}; width: 300px; height: 30px; border: 1px solid #ddd;'>
            <span class='badge'>{{ $color->color_code }}</span>
            <a href="/administration/color/edit/{{ $color->id }}" class="btn btn-primary pull-right btn-xs edit-color" data-color-id="{{ $color->id }}" role="button">
                <i class="glyphicon glyphicon-edit"></i>
                Edit
            </a>
        </td>
        <td>
            <a href="#" class="btn btn-default btn-xs disable-color" data-color-id="{{ $color->id }}" role="button" {{ ($color->active) ? : 'disabled="disabled"' }}>
                <i class="glyphicon glyphicon-eye-close"></i>
                Disable
            </a>
            <a href="#" class="btn btn-info btn-xs enable-color" data-color-id="{{ $color->id }}" role="button" {{ ($color->active) ? 'disabled="disabled"' : '' }}>
                <i class="glyphicon glyphicon-eye-open"></i>
                Enable
            </a>
            <a href="#" class="btn btn-danger pull-right btn-xs delete-color" data-color-id="{{ $color->id }}" role="button">
                <i class="glyphicon glyphicon-trash"></i>
                Remove
            </a>
        </td>
    </tr>

@empty

    <tr>
        <td colspan='3'>
            No Colors
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
<script type="text/javascript" src="/js/administration/colors.js"></script>
@if (Session::has('message'))
<script type="text/javascript">
$(document).ready(function(){
    flashAlertFadeOut();
});
</script>
@endif
@endsection