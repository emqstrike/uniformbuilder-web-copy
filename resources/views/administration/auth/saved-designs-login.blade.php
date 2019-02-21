<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Login | {{ env('APP_TITLE') }}</title>
<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<!-- Bootstrap 3.3.5 -->
<link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
<!-- Font Awesome -->
<link rel="stylesheet" type="text/css" href="/font-awesome/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="/dist/css/AdminLTE.min.css">
<!-- iCheck -->
<link rel="stylesheet" href="/plugins/iCheck/square/blue.css">

</head>
<body class="hold-transition login-page">

    <div class="login-box">
        <div class="login-logo">
            <img src="{{ env('LOGO_URL') }}" style='height: 10vh; padding: 20px; margin-top: 50px;'>
        </div>
        <div class="login-box-body">
            <p class="login-box-msg">Sign in to start your session</p>
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
            @if (Session::has('flash_message'))
            <div class="alert alert-error">{{ Session::get('flash_message') }}</div>
            @endif
            <form method="POST" action="/saved_design/login">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <div class="form-group has-feedback">
                    <input type="password" name="password" class="form-control" placeholder="Password">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                </div>
                <div class="row">
                    <div class="col-xs-8"></div>
                    <div class="col-xs-4">
                        <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

<script src="/plugins/jQuery/jQuery-2.1.4.min.js"></script>
<script src="/bootstrap/js/bootstrap.min.js"></script>
</body>
</html>
