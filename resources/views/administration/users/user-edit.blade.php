@extends('administration.lte-main')

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
                                    <option value='qa' {{ ($user->type == 'qa') ? 'selected':'' }}>QA</option>
                                    <option value='ga' {{ ($user->type == 'ga') ? 'selected':'' }}>GA</option>
                                    <option value='rep' {{ ($user->type == 'rep') ? 'selected':'' }}>Rep</option>
                                    <option value='dealer' {{ ($user->type == 'dealer') ? 'selected':'' }}>Dealer</option>
                                    <option value='manager' {{ ($user->type == 'manager') ? 'selected':'' }}>Manager</option>
                                    <option value='administrator' {{ ($user->type == 'administrator') ? 'selected':'' }}>Administrator</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-user">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update User
                                </button>
                                <a href="/administration/users" class="btn btn-danger">
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

@endsection

@section('custom-scripts')
<script type="text/javascript">
function isReady() {
    var firstName = $('.user-first-name');
    var lastName = $('.user-last-name');
    var password = $('.user-password');
    var confirm = $('.user-confirm-password');
    var userType = $('.user-type');
    if (firstName.val() && lastName.val()) {
        if (password.val() || confirm.val()) {
            if (password.val().length < 6) {
                new PNotify({
                    title: 'Warning',
                    text: 'Password should at least have a minimum of 6 characters',
                    type: 'warning',
                    hide: true
                });
                return false;
            }
            if (password.val() != confirm.val()) {
                new PNotify({
                    title: 'Warning',
                    text: 'Passwords does not match',
                    type: 'warning',
                    hide: true
                });
                return false;
            }
        }
        return true;
    }
    return false;
}

$('#update-user-form input').on('change', function(){
    if (isReady()) {
        $('#update-user-form .update-user').fadeIn();
    } else {
        $('#update-user-form .update-user').fadeOut()
    }
});
</script>
@endsection