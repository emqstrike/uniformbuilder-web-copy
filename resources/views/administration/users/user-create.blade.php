@extends('administration.lte-main')
 
@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New User</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/user/add" id='create-user-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="user_create_origin" value="administration">
                        <input type="hidden" name="created_by" value="{{ Session::get('userId') }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">First Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control user-first-name" name="first_name" value="{{ old('first_name') }}" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Last Name</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control user-last-name" name="last_name" value="{{ old('last_name') }}" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Email Address</label>
                            <div class="col-md-6 user">
                                <input type="text" class="form-control user-email" name="email" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Password</label>
                            <div class="col-md-6 bump">
                                <input type="password" class="form-control user-password" name="password" required>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Confirm Password</label>
                            <div class="col-md-6 shadow">
                                <input type="password" class="form-control user-confirm-password" name="confirm_password" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="col-md-4 control-label">Brand</label>
                            <div class="col-md-6">
                                <select name="brand_id" class="form-control">
                                    @foreach ($brands as $brand)
                                        <option value="{{ $brand->id }}">{{ $brand->site_name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>

                         <div class="form-group">
                            <label class="col-md-4 control-label">Zip Code</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control zip" name="zip">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Assigned Sales Rep</label>
                            <div class="col-md-6">
                                <select name='default_rep_id' class="form-control default-rep-id">
                                    <option value="">none</option>
                                    @foreach($sales_reps as $rep)
                                        <option value="{{ $rep->id }}">{{ $rep->last_name }}, {{ $rep->first_name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Type</label>
                            <div class="col-md-6">
                                <select name='type' class="form-control user-type">
                                    <option value='normal'>Normal</option>
                                    <option value='administrator'>Administrator</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Role</label>
                            <div class="col-md-6">
                                <select name='role' class="form-control user-role">
                                    <option value="default">Default</option>
                                    <option value="ga">Graphics Artist</option>
                                    <option value="qa">QA</option>
                                    <option value="rep">Sales Rep</option>
                                    <option value="rep_manager">Manager</option>
                                    <option value="dealer">Dealer</option>
                                    <option value="coach">Coach</option>
                                    <option value="dev">Developer</option>
                                    <option value="executive">Executive</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Dealer</label>
                            <div class="col-md-6">
                                <select name='dealership_id' class="form-control user-type">                                   
                                <option value="">none</option>
                                    @foreach($dealers as $dealer)
                                        <option value="{{ $dealer->id }}">{{ $dealer->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-user">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New User
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

@section('custom-scripts')
<script type="text/javascript">
function isReady() {
    var firstName = $('.user-first-name');
    var lastName = $('.user-last-name');
    var email = $('.user-email');
    var password = $('.user-password');
    var confirm = $('.user-confirm-password');
    var userType = $('.user-type');
    if (firstName.val() && lastName.val() && email.val() && password.val()) {
        if (!(email.val().indexOf('@') > 0 && email.val().indexOf('.') > 0)) {
            new PNotify({
                title: 'Warning',
                text: 'Please enter a valid email address',
                type: 'warning',
                hide: true
            });
            return false;
        }
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
        else if (password.val() == confirm.val()) {
            new PNotify({
                title: 'Success',
                text: 'Passwords matched',
                type: 'success',
                hide: true
            });
            return true;
        }
        //return true;
    }
    return false;
}

$('#create-user-form input').on('change', function(){
    if (isReady()) {
        $('#create-user-form .create-user').fadeIn();
    } else {
        $('#create-user-form .create-user').fadeOut()
    }
});

</script>
@endsection