@extends('plain-page')

@section('main-content')

<div id="main_container" class="container">
    <div class="alert alert-info alert-dismissable flash-alert" style="display: none">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
            ×
        </button>
        <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
    </div>

    <div id="main-row" class="row-fluid">
        <div id="reset-password-pane"  class="col-md-4 col-md-offset-4 text-center">

            <form id="reset-password" class="reset-password pinhp-form" method="POST" novalidate="novalidate" style="display: block;">
                <input type="hidden" class='csrf-token' name="_token" value="{{ csrf_token() }}">
                <input type="hidden" class='user_id' name="_token" value="{{ $user_id }}">
                <div class='col-md-12'>
                    <label>
                        <span class="control has-icon">
                            <div class="input-group col-md-12">
                                <span class="input-group-addon">
                                    <i class="fa fa-envelope-o"></i>
                                </span>
                                <input type="email" class='form-control' value="{{ $email }}" disabled="disabled">
                            </div>
                        </span>
                    </label>
                </div>

                <div class='col-md-12'>
                    <label for="reset-password">
                        <span class="control has-icon">
                            <div class="input-group col-md-12">
                                <span class="input-group-addon">
                                    <i class="fa fa-lock"></i>
                                </span>
                                <input type="password" class='password form-control' placeholder="Enter New Password">
                            </div>
                        </span>
                    </label>
                </div>

                <div class='col-md-12'>
                    <label for="reset-password">
                        <span class="control has-icon">
                            <div class="input-group col-md-12">
                                <span class="input-group-addon">
                                    <i class="fa fa-lock"></i>
                                </span>
                                <input type="password" class='confirm-password form-control' placeholder="Confirm Password">
                            </div>
                            <span class="help-inline"><label class="error" style="display: none;"></label></span>
                        </span>
                    </label>
                </div>

                <div class='col-md-12'>
                    <div class="input-group col-md-12">
                        <button id="reset-password-submit" type="button" class="btn btn-info btn-large col-md-12" style="display: inline-block;" disabled="disabled">
                            Reset password
                            <i class="loading fa fa-spinner fa-pulse" style="display: none"></i>
                        </button>
                    </div>
                </div>

            </form>

            <div id="reset-password-sent" class="col-md-12 vert-offset-top-2" style='display: none'>
                <div class="col-md-12 alert alert-success">
                    <strong>Success!</strong> You can now login using your new password.
                </div>
            </div>

            <div id="reset-password-error" class="col-md-12 vert-offset-top-2" style='display: none'>
                <div class="col-md-12 alert alert-warning message">
                    Server error occurred. Please contact the administrator.
                </div>
            </div>

        </div>
    </div>
</div>

@endsection