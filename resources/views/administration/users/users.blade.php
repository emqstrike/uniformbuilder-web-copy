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
                    <!-- <a href="#" class="btn btn-warning btn-xs view-user" data-user-id="{{ $user->id }}" role="button">
                        <li class="glyphicon glyphicon-info-sign"></li>
                        View
                    </a> -->
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

@section('custom-scripts')

$('.enable-user').on('click', function(){
    var id = $(this).data('user-id');
    var url = "//{{ $api_host }}/api/user/" + id + "/enable/";
    $.ajax({
        url: url,
        type: "GET",
        headers: {"accessToken": atob(headerValue)},
        success: function(response){
            if (response.success) {
                var elem = '.user-' + id;
                $('.flash-alert .flash-title').text(response.message);
                $('.flash-alert').addClass('alert-info').fadeIn();
                $(elem + ' .disable-user').removeAttr('disabled');
                $(elem + ' .enable-user').attr('disabled', 'disabled');
                $(elem).removeClass('inactive');
            }
        }
    });
});

$('.disable-user').on('click', function(){
    var id = $(this).data('user-id');
    var url = "//{{ $api_host }}/api/user/" + id + "/disable/";
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        headers: {"accessToken": atob(headerValue)},
        success: function(response){
            if (response.success) {
                var elem = '.user-' + id;
                $('.flash-alert .flash-title').text(response.message);
                $('.flash-alert').addClass('alert-info').fadeIn();
                $(elem + ' .enable-user').removeAttr('disabled');
                $(elem + ' .disable-user').attr('disabled', 'disabled');
                $(elem).addClass('inactive');
            }
        }
    });
});

$('.delete-user').on('click', function(){
    var id = $(this).data('user-id');
    modalConfirm('Remove user', 'Are you sure you want to delete the user?', id);
});

$('#confirmation-modal .confirm-yes').on('click', function(){
    var id = $(this).data('value');
    var url = "//{{ $api_host }}/api/user/" + id + "/delete/";
    $.ajax({
        url: url,
        type: "GET",
        headers: {"accessToken": atob(headerValue)},
        success: function(response){
            if (response.success) {
                $('#confirmation-modal').modal('hide');
                $('.user-' + id).fadeOut();
            }
        }
    });
});

function modalConfirm(title, message, value)
{
    $('#confirmation-modal .modal-title').text(title);
    $('#confirmation-modal .modal-body').text(message);
    $('#confirmation-modal .confirm-yes').data('value', value);
    $('#confirmation-modal').modal('show');
}

@endsection
