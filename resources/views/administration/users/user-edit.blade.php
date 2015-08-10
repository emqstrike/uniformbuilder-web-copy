@extends('administration.main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/libs/spectrum/spectrum.css">

@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Modify User</div>
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

                    <form class="form-horizontal" role="form" action="/administration/user/update" method="POST" id='update-user-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="user_id" value="{{ $user->id }}">

                        @if (Session::has('flash_message'))
                        <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
                        @endif

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
                                <input type="text" class="form-control user-email" disabled="disabled" value="{{ $user->email }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Password</label>
                            <div class="col-md-6 bump">
                                <input type="password" class="form-control user-password" name="password">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Confirm Password</label>
                            <div class="col-md-6 shadow">
                                <input type="password" class="form-control user-confirm-password" name="confirm_password">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-6">
                                <select name='type' class="form-control user-type">
                                    <option value='normal' {{ ($user->type == 'normal') ? 'selected':'' }}>Normal</option>
                                    <option value='dealer' {{ ($user->type == 'dealer') ? 'selected':'' }}>Dealer</option>
                                    <option value='administrator' {{ ($user->type == 'administrator') ? 'selected':'' }}>Administrator</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-lg btn-primary update-user">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update User
                                </button>
                                <a href="/administration/users" class="btn btn-lg btn-danger">
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

@endsection

@section('scripts')

<script type="text/javascript" src="/js/libs/spectrum/spectrum.js"></script>

@endsection

@section('custom-scripts')

function isReady() {
    var firstName = $('.user-first-name');
    var lastName = $('.user-last-name');
    var password = $('.user-password');
    var confirm = $('.user-confirm-password');
    var userType = $('.user-type');
    if (firstName.val() && lastName.val()) {
        if (password.val() || confirm.val()) {
            if (password.val().length < 6) {
                showAlert('Password should at least have a minimum of 6 characters');
                return false;
            }
            if (password.val() != confirm.val()) {
                showAlert('Passwords does not match');
                return false;
            }
        }
        $('.flash-alert').fadeOut();
        return true;
    }
    return false;
}

function showAlert(msg) {
    $('.flash-alert .flash-title').text('Alert');
    $('.flash-alert .flash-sub-title').text('Error');
    $('.flash-alert .flash-message').text(msg);
    $('.flash-alert').addClass('alert-warning');
    $('.flash-alert').show();
}

$('#update-user-form input').on('change', function(){
    if (isReady()) {
        $('#update-user-form .update-user').fadeIn();
    } else {
        $('#update-user-form .update-user').fadeOut()
    }
});


$('#update-user-form').submit(function(){
    $('.flash-alert .flash-progress').show();
    $('.flash-alert .flash-title').text('Updating user');
    $('.flash-alert .flash-sub-title').text('Saving');
    $('.flash-alert .flash-message').text('Please wait while we are saving changes...');
    $('.flash-alert').addClass('alert-info');
    $('.flash-alert').show();
    $('.main-content').fadeOut('slow');
});

@endsection