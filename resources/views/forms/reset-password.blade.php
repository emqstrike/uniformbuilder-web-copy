<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Access-Control-Allow-Origin" content="*"/>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Uniform Builder">
<meta name="author" content="Engineering">
<title>{{ $page_title }}</title>
<link rel="icon" type="image/png" href="/images/branding/brand.png" />
<link href='http://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap-theme.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/font-awesome/css/font-awesome.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/jquery-ui/jquery-ui.min.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/uniform-builder/css/uniform-builder.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/uniform-builder/css/uniform-builder-plugins.css{{$asset_version}}">
<link rel="stylesheet" href="{{$asset_storage}}/bootstrap/css/bootstrap-3-vert-offset-shim.css{{$asset_version}}">
</head>
<body>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header" id="navbar-header">
            <a class="navbar-brand" href="/"><img src="{{ env('LOGO_URL') }}" height="50em"></a>
        </div>
        <div>
            <h1 class="text-center" id="header_text">{{ $app_title }}</h1>
        </div>
        <div class='user-profile pull-right'>
            @if (!Session::get('isLoggedIn'))
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        Login
                        <span class="caret"></span>
                    </a>
                    <ul id="login-dp" class="dropdown-menu">
                        <li>
                            <div class="row">
                                <div class="col-md-12">
                                    <form class="form" role="form" method="post" action="/login" accept-charset="UTF-8" id="login-nav">
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <div class="form-group form-group-sm input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                            <input type="email" name="email" class="form-control col-sm-2" id="login-email" placeholder="Email Address">
                                        </div>
                                        <div class="form-group form-group-sm input-group">
                                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                            <input type="password" name="password" class="form-control col-sm-3" id="login-password" placeholder="Password">
                                        </div>
                                        <div class="form-group col-md-12">
                                            <button type="submit" class="btn btn-primary btn-block">
                                                <i class="fa fa-sign-in"></i>
                                                Sign in
                                            </button>
                                            <div class="help-block text-right"><a href="/forgotPassword">Forgot your password?</a></div>
                                        </div>
                                    </form>
                                </div>
                             </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <a class="user-signup" href="#">
                        Signup
                    </a>
                </li>
            </ul>
            @else
            Welcome back <strong>{{ Session::get('first_name') }}</strong>!
            <a href="/logout" class='btn btn-xs btn-primary'><span class="glyphicon glyphicon-log-out"></span> Sign out</a>
            @endif
        </div>
    </div>
</nav>

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
                        <strong class="placeholder">Enter your email</strong>
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
                                <input type="password" class='form-control' placeholder="Enter New Password">
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
                                <input type="confirm_password" class='form-control' placeholder="Confirm Password">
                            </div>
                        </span>
                    </label>
                </div>

                <div class='col-md-12'>
                    <div class="input-group col-md-12">
                        <button id="reset-password-submit" type="button" class="btn btn-info btn-large col-md-12" style="display: inline-block;">
                            Reset password
                            <i class="loading fa fa-spinner fa-pulse" style="display: none"></i>
                        </button>
                    </div>
                </div>

            </form>

            <div id="reset-password-sent" class="col-md-12 vert-offset-top-2" style='display: none'>
                <div class="col-md-12 alert alert-success">
                    <strong>Email sent!</strong> We've sent you an email with instructions to reset your password.
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

@include('partials.signup-modal')

<!-- Third Party Scripts -->
<script src="{{$asset_storage}}/jquery/jquery-1.11.3.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/bootstrap/js/bootstrap.min.js{{$asset_version}}"></script>
<script src="{{$asset_storage}}/uniform-builder/js/users.js{{$asset_version}}"></script>
<!-- End Third Party Scripts -->

<script type="text/javascript">
$(document).ready(function () {
    window.ub = {};
@if (Session::get('isLoggedIn'))
    window.ub.user = {id: {{ Session::get('userId') }}, fullname: "{{ Session::get('fullname') }}", email: "{{ Session::get('email') }}", headerValue: "{{ base64_encode(Session::get('accessToken')) }}"};
@else
    window.ub.user = false;
@endif
@if (Session::has('message'))
    $('.flash-alert').fadeIn();
    setTimeout(function(){$('.flash-alert').fadeOut();}, 5000);
@endif
});
</script>

</body>
</html>