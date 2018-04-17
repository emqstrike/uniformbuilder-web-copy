@extends('administration.lte-main')

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Account Settings</div>
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

                    <form class="form-horizontal" role="form" action="/administration/account_settings/update" method="POST" id='update-user-form'>
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
                            <a href="/administration/account_settings/change_password/{{ Session::get('userId') }}" class="btn btn-default btn-flat">Change</a>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary update-user">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Update User
                                </button>
                                <a href="/administration/main" class="btn btn-danger">
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
<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
@endsection

@section('custom-scripts')
<script type="text/javascript">
$( document ).ready(function() {

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
