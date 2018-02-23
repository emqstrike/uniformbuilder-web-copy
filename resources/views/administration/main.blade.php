<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Administration | {{ env('WEBSITE_NAME') }}</title>

    <link href="/css/app.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/bootstrap/css/bootstrap-theme.min.css">
    <link rel="stylesheet" type="text/css" href="/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="/datatables/media/css/jquery.dataTables.min.css">
    <link rel="stylesheet" type="text/css" href="/datatables/media/css/dataTables.bootstrap.css">

    <!-- Fonts -->
    <!-- <link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'> -->
    <link href='https://fonts.googleapis.com/css?family=Raleway' rel='stylesheet' type='text/css'>
    <style type="text/css"> body{ font-family: raleway; }</style>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    @yield('styles')

</head>
<body>
@if (Session::get('isLoggedIn'))
    <nav class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                 <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
            </button>
        <ul class="nav navbar-nav navbar-right">
            <li class="divider-vertical"></li>
            <li class="dropdown">
                 <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    Welcome
                    @if (Session::get('fullname'))
                    <strong>{{ Session::get('fullname') }}</strong> <span class="glyphicon glyphicon-user"></span>
                    @endif
                    <strong class="caret"></strong>
                </a>
                <ul class="dropdown-menu">
                    <li>
                        <a href="/administration/account_settings/{{ Session::get('userId') }}"><span class="glyphicon glyphicon-user"></span> Account Settings</a>
                    </li>
                    <li class="divider">
                    <li>
                        <a href="/administration/account_settings/change_password/{{ Session::get('userId') }}"><span class="fa fa-slack"></span> Change Password</a>
                    </li>
                    <li class="divider">
                    </li>
                    <li>
                        <a href="/administration/logout"><span class="glyphicon glyphicon-log-out"></span> Sign out</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
@endif
<div class="container-fluid">
    <div class="row-fluid">
        <div class="col-md-12">
            @if (Session::get('isLoggedIn'))
            <nav class="navbar navbar-default navbar-static-top" role="navigation">
                <div class="navbar-header">
                     
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                         <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/administration/main">
                        <img src="{{ env('LOGO_URL') }}" alt="QuickStrike" style="width: 3em; padding-right: 10px;" align="left">
                        <span>Dashboard</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="/administration/account_settings/{{ Session::get('userId') }}"><span class="glyphicon glyphicon-user"></span> Account Settings</a>
                        </li>
                        <li class="divider">
                        <li>
                            <a href="/administration/account_settings/change_password/{{ Session::get('userId') }}"><span class="fa fa-slack"></span> Change Password</a>
                        </li>
                        <li class="divider">
                        </li>
                        <li>
                            <a href="/administration/logout"><span class="glyphicon glyphicon-log-out"></span> Sign out</a>
                        </li>
                    </ul>
                </div>
            </nav>
            @endif
            <div class="alert alert-dismissable flash-alert" style="display: none;">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                    ×
                </button>
                <h4 class='flash-title'></h4>
                <img src="https://s3-us-west-2.amazonaws.com/qstrike/images/progress.gif" class='flash-progress' style="display: none;">
                <strong class='flash-sub-title'></strong><span class='flash-message'></span>
            </div>

            <div class="row">
                <div class="col-md-12">
                    @yield('content')
                </div>
            </div>

        </div>
    </div>
    <div class="row-fluid">
        <div class="col-md-12">
        </div>
    </div>
</div>

<style type="text/css">
    @yield('custom-styles')
</style>

<!-- Scripts -->
@if (Session::get('accessToken'))
<script type="text/javascript">

    window.headerValue = "{{ base64_encode(Session::get('accessToken')) }}";
    window.api_host = "{{ env('API_HOST') }}";
    @if (Session::get('isLoggedIn'))
    window.loggedInUser = {{ Session::get('userId') }};
    @endif

</script>
@endif
<script type="text/javascript" src="/jquery/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/datatables/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/datatables/media/js/dataTables.bootstrap.js"></script>



@yield('scripts')
<script type="text/javascript">
$(document).ready(function(){
@yield('custom-scripts')
});
</script>
</body>
</html>
