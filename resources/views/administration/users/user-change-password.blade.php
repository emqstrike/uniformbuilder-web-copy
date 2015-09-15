@extends('administration.main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Change Password</div>
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

                    <form class="form-horizontal" role="form" action="/administration/account_settings/change_password" method="POST" id='update-user-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="user_id" value="{{ $user->id }}">

                        @if (Session::has('message'))
                        <div class="alert alert-error">{{ Session::get('message') }}</div>
                        @endif

                        <div class="form-group"></br >
                            <label class="col-md-4 control-label">Old Password</label>tor
                            <div class="col-md-6 shadow">
                                <input type="password" class="form-control user-old-password" name="old_password" >
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">New Password</label>
                            <div class="col-md-6 bump">
                                <input type="password" class="form-control user-new-password new-password" name="new_password">
                            </div>
                            <div class="col-md-1 bump">
                                <p class="message"></p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Confirm New Password</label>
                            <div class="col-md-6 shadow">
                                <input type="password" class="form-control user-confirm-new-password new-password" name="confirm_new_password">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-lg btn-primary update-user" disabled>
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update User
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom-scripts')

$( document ).ready(function() {
    
    var isReady = 0;

    $( ".new-password" ).keyup(function() {

        var newPassword = $('.user-new-password');
        var newConfirm = $('.user-confirm-new-password');
        
        console.log(newPassword.val());
        console.log(newConfirm.val());

        if ( newPassword.val() != newConfirm.val() ) {
            showError('Passwords does not match');
            $('.update-user').prop('disabled', true);
        }
        else{
            showSuccess('Passwords match!');
            $('.update-user').prop('disabled', false);
        }
    });  

    function showError(msg) {
        $('.flash-alert .flash-title').text('Error');
        $('.flash-alert .flash-message').text(msg);
        $('.flash-alert').removeClass('alert-success');
        $('.flash-alert').addClass('alert-warning');
        $('.flash-alert').show();
    }

    function showSuccess(msg) {
        $('.flash-alert .flash-title').text('Success! ');
        $('.flash-alert .flash-message').text(msg);
        $('.flash-alert').removeClass('alert-warning');
        $('.flash-alert').addClass('alert-success');
        $('.flash-alert').show();
    }

});


@endsection