@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/datatables/media/css/dataTables.bootstrap.css">
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

<section class='content'>
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
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
                <div class="box-body">
                    <table class='data-table table table-bordered table-hover users-table display' cellspacing="0">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Account Type</th>
                                <th>Email</th>
                                <th>Active Status</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                        @forelse ($users as $user)

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
                                    @if ($user->email != Session::get('email'))
                                    <a href="#" class="btn btn-danger pull-right btn-xs delete-user" data-user-id="{{ $user->id }}" role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Remove
                                    </a>
                                    @else
                                    <a href="#" class="btn btn-warning pull-right btn-xs" role="button">
                                        <i class="fa fa-diamond"></i>
                                        This is YOU
                                    </a>
                                    @endif
                                </td>
                            </tr>

                        @empty

                            <tr>
                                <td colspan='4'>
                                    No Users
                                </td>
                            </tr>

                        @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
</div>

@include('partials.confirmation-modal')

@endsection

@section('scripts')
<script type="text/javascript" src="/datatables/media/js/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/users.js"></script>
@if (Session::has('message'))
<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });
});
</script>
@endif
@endsection
