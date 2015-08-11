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
    <table class='table table-bordered'>
    <tr>
        <th colspan='2'>
            Patterns
        </th>
    </tr>

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
            @if ($pattern->pattern_path)
            <a href="{{ $pattern->pattern_path }}" class="btn btn-default btn-xs show-pattern" role="button" target="_blank">
                <li class="glyphicon glyphicon-info-sign"></li>
                View
            </a>
            @endif
            <a href="#" class="btn btn-danger pull-right btn-xs delete-pattern" data-pattern-id="{{ $pattern->id }}" role="button">
                <i class="glyphicon glyphicon-trash"></i>
                Remove
            </a>
        </td>
    </tr>

@empty

    <tr>
        <td colspan='2'>
            No Patterns
        </td>
    </tr>

@endforelse

    </table>
</div>
@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/patterns.js"></script>
@endsection