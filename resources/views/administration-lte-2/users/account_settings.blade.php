@extends('administration-lte-2.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Profile Settings</div>
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" action="/administration/v1-0/account_settings/update" method="POST" id='update-user-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="user_id" value="{{ Session::get('userId') }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">First Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control user-first-name" name="first_name" value="{{ $user->first_name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Last Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control user-last-name" name="last_name" value="{{ $user->last_name }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Email Address</label>
                            <div class="col-md-6 user">
                                <input type="text" class="form-control" disabled="disabled" value="{{ $user->email }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-6">
                                <label class="control-label"> {{ ucfirst($user->type) }} </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Password</label>
                            <div class="col-md-6">
                            <a href="#" class="btn btn-default btn-sm btn-flat change-password" data-target="#myModal" data-toggle="modal">Change</a>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary btn-flat update-user">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Info
                                </button>
                                <a href="/administration/main" class="btn btn-flat btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@include('administration-lte-2.users.users-change-pass-modal')
@endsection

@section('scripts')
<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
@endsection

@section('custom-scripts')
<script type="text/javascript">
$( document ).ready(function() {

    $("#myModal").on("hidden.bs.modal", function(e) {
        e.preventDefault();
        $('.input-old-password').val('');
        $('.input-user-password').val('');
        $('.input-confirm-password').val('');
    });

    $('.update-user').click(function(e) {
            e.preventDefault();
            var firstName = $('.user-first-name').val();
            var lastName = $('.user-last-name').val();
            if (firstName && lastName ) {
                $('#update-user-form').submit();
            }
            else {
                new PNotify({
                    title: 'Warning',
                    text: 'First and Last name are required.',
                    type: 'warning',
                    hide: true
                });
            }
    });

    $("#myForm").submit(function(e){
        e.preventDefault();
        var data = {};
        data.user_id = $('.input-user-id').val();
        data.old_password = $('.input-old-password').val();
        var newPassword = $('.input-user-password').val();
        var newConfirm = $('.input-confirm-password').val();
        var url = "//" + api_host +"/api/user/change_password";

        if(newPassword != "") {
            data.new_password = newPassword;
        }
        if (newPassword != newConfirm) {
            new PNotify({
                title: 'Warning',
                text: 'Passwords does not match',
                type: 'warning',
                hide: true
            });
        } else {
            addUpdateRecord(data, url);
        }
    });

    function addUpdateRecord(data, url){
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json;',
            headers: {"accessToken": atob(headerValue)},
            success: function (data) {
                if(data.success){
                    window.location.reload();
                    new PNotify({
                        title: 'Success',
                        text: data.message,
                        type: 'success',
                        hide: true
                    });
                } else {
                    new PNotify({
                        title: 'Error',
                        text: data.message,
                        type: 'error',
                        hide: true
                    });
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    };
    @if(Session::has('message'))
         new PNotify({
            title: 'Success',
            text: "{{ Session::get('message') }}",
            type: 'success',
            hide: true
        });
    @endif
});

</script>
@endsection
