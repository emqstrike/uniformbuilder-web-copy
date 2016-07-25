@extends('uniform-builder')

@section('change-password')

<div id="main_container" class="container">

    <div class="alert alert-info alert-dismissable flash-alert" style="display: none">
        
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
            ×
        </button>
        <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>

    </div>

        <div id="change-password-pane">

            <span class='header'>Change Password</span>

            <form id="change-password" class="change-password pinhp-form" method="POST" novalidate="novalidate" style="display: block;">
                <input type="hidden" class='csrf-token' name="_token" value="{{ csrf_token() }}">
                <input type="hidden" class='user_id' name="user_id" value="{{ Session::get('userId') }}">
                <div class='col-md-12'>

                    <label for="signup-email">

                        <span class="control has-icon">

                        <div class="row">
                            <div class="col-md-4"></div>
                            <div class="input-group col-md-4">
                                <span class="input-group-addon">
                                    <i class="fa fa-lock"></i>
                                </span>
                                <input type="password" name="old_password" id="old-password" placeholder="Current password" class='form-control'>
                            </div>
                        </div>

                        </span>
                        <br />

                        <span class="control has-icon">

                            <div class="row">
                                <div class="col-md-4"></div>
                                <div class="input-group col-md-4">
                                    <span class="input-group-addon">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                    <input type="password" name="password" id="new-password" placeholder="New password" class='form-control'>
                                </div>

                            </div>

                        </span>

                        <span class="control has-icon">

                            <div class="row">

                                <div class="col-md-4"></div>
                                <div class="input-group col-md-4">
                                    <span class="input-group-addon">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                    <input type="password" name="confirm_password" id="confirm-password" placeholder="Confirm password" class='form-control'>
                                </div>

                            </div>

                        </span>
                    </label>

                </div>

                <div class="row">
                    <div class='col-md-4'></div>
                    <div class='col-md-4 submit-row'>
                        <div class="input-group col-md-12">
                            
                            <br />
                            <button id="change-password-submit" type="button" class="btn" style="display: inline-block;">
                                Change Password
                                <i class="loading fa fa-spinner fa-pulse" style="display: none"></i>
                            </button>

                        </div>
                    </div>
                </div>

            </form>

            <div id="change-password-complete" class="col-md-12 vert-offset-top-2" style='display: none'>
                <div class="col-md-12 alert alert-success">
                    <strong>Success!</strong> Your password was changed, you will be logged out in a moment.
                </div>
            </div>

            <div id="change-password-error" class="col-md-12 vert-offset-top-2" style='display: none'>
                <div class="col-md-12 alert alert-warning message">
                    Server error occurred. Please contact the administrator.
                </div>
            </div>

        </div>

</div>

@endsection