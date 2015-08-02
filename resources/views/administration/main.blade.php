<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>QuickStrike Uniform Builder Administration</title>

    <link href="/css/app.css" rel="stylesheet">

    <!-- Fonts -->
    <!-- <link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'> -->

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <div class="container-fluid">
        <div class="row-fluid">
            <div class="col-md-12">
                <nav class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation">
                    <div class="navbar-header">
                         
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                             <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                        </button> <a class="navbar-brand" href="#">QuickStrike</a>
                    </div>
                    
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" style='padding-right: 20px;'>
                        @include('administration.top-menu')
                        <form class="navbar-form navbar-left" role="search">
                            <div class="form-group">
                                <input type="text" class="form-control" style='width:500px'>
                            </div> 
                            <button type="" class="btn btn-default">
                                Search
                            </button>
                        </form>
                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown">
                                 <a href="#" class="dropdown-toggle" data-toggle="dropdown">Welcome [User name]<strong class="caret"></strong></a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a href="accountSettings">Account Settings</a>
                                    </li>
                                    <li class="divider">
                                    </li>
                                    <li>
                                        <a href="logout">Sign out</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    
                </nav>
                <div class="alert alert-dismissable flash-alert" style="display: none;">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                        ×
                    </button>
                    <h4 class='flash-title'></h4>
                    <img src="https://s3-us-west-2.amazonaws.com/qstrike/images/progress.gif" class='flash-progress' style="display: none;">
                    <strong class='flash-sub-title'></strong> <span class='flash-message'></span>
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
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>
    @yield('scripts')

    <script type="text/javascript">
        @yield('custom-scripts')
    </script>
</body>
</html>
