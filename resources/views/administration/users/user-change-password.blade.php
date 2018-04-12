@extends('administration.lte-main')

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

                    <form class="form-horizontal" id="change-password-form" role="form" action="/administration/account_settings/change_password" method="POST" id='update-user-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="user_id" value="{{ $user->id }}">

                        <div class="form-group"></br >
                            <label class="col-md-4 control-label">Old Password</label>
                            <div class="col-md-6 shadow">
                                <input type="password" class="form-control user-old-password" name="old_password" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">New Password</label>
                            <div class="col-md-6 bump">
                                <input type="password" class="form-control user-new-password new-password" name="new_password" required>
                            </div>
                            <div class="col-md-1 bump">
                                <p class="message"></p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Confirm New Password</label>
                            <div class="col-md-6 shadow">
                                <input type="password" class="form-control user-confirm-new-password new-password" name="confirm_new_password" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-user">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update Password
                                </button>
                                <a href="/administration/account_settings/{{ Session::get('userId') }}" class="btn btn-danger">
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

@section('custom-scripts')
<script type="text/javascript">
$( document ).ready(function() {
    var isReady = 0;

    document.getElementById('change-password-form').onsubmit = function() {
        confirmPassword();
    };

    function confirmPassword(){
        var newPassword = $('.user-new-password').val();
        var newConfirm = $('.user-confirm-new-password').val();
        if (newPassword != newConfirm) {
            new PNotify({
                title: 'Warning',
                text: 'Passwords does not match',
                type: 'warning',
                hide: true
            });
            return false;
        } else {
            new PNotify({
                title: 'Success',
                text: 'Passwords matched',
                type: 'success',
                hide: true
            });
            return true;
        }
    }

});
</script>
@endsection
