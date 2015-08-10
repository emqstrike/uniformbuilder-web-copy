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
        <span class="glyphicon glyphicon-user"></span>
        Users
        <small>
            <a href="/administration/user/add" class='btn btn-xs btn-success'>
                <span class="glyphicon glyphicon-plus-sign"></span>
                Add New User
            </a>
        </small>
    </h1>
</div>

<div class="row-fluid col-md-9">
    <table class='table table-bordered users-table display' cellspacing="0">
        <thead>
            <tr>
                <th>Name</th>
                <th>Account Type</th>
                <th>Email</th>
                <th>Active Status</th>
                <th></th>
            </tr>
        </thead>

        @forelse ($users as $user)

        <tbody>
            <tr class='user-{{ $user->id }} {{ (!$user->active) ? ' inactive' : '' }}'>
                <td>
                    {{ $user->first_name }} {{ $user->last_name }}
                </td>
                <td>
                    <span class="label label-{{ ($user->type == 'administrator') ? 'danger' : 'info' }}">{{ ucfirst($user->type) }}</span>
                </td>
                <td>
                    <span class="label label-primary">{{ $user->email }}</span>
                </td>
                <td>
                    <a href="#" class="btn btn-default btn-xs disable-user" data-user-id="{{ $user->id }}" role="button" {{ ($user->active) ? : 'disabled="disabled"' }}>
                        <i class="glyphicon glyphicon-eye-close"></i>
                        Disable
                    </a>
                    <a href="#" class="btn btn-info btn-xs enable-user" data-user-id="{{ $user->id }}" role="button" {{ ($user->active) ? 'disabled="disabled"' : '' }}>
                        <i class="glyphicon glyphicon-eye-open"></i>
                        Enable
                    </a>
                </td>
                <td>
                    <a href="/administration/user/edit/{{ $user->id }}" class="btn btn-primary btn-xs edit-user" data-user-id="{{ $user->id }}" role="button">
                        <i class="glyphicon glyphicon-edit"></i>
                        Edit
                    </a>
                    <a href="#" class="btn btn-danger pull-right btn-xs delete-user" data-user-id="{{ $user->id }}" role="button">
                        <i class="glyphicon glyphicon-trash"></i>
                        Remove
                    </a>
                </td>
            </tr>
        </tbody>

        @empty

            <tr>
                <td colspan='4'>
                    No Users
                </td>
            </tr>

        @endforelse
    </table>
</div>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/users.js"></script>
@endsection
