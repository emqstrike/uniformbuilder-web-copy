<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header" id="navbar-header">
            <a class="navbar-brand" href="#"><img src="{{ env('LOGO_URL') }}" height="50em"></a>
        </div>
        <div>
            <h1 class="text-center" id="header_text">{{ $app_title }}</h1>
        </div>
        <div class='user-profile pull-right'>

            <div class="activate_qa_tools">Activate QA Tools</div>

            @if (!Session::get('isLoggedIn'))
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        
                        LOGIN
                        
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
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-block">
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
                        Don't have an Account?
                    </a>
                </li>
            </ul>
            @else
            <div class = "btn-group">
               <button type = "button" class = "btn">
                    <strong>Hello {{ Session::get('first_name') }}!</strong>
               </button>

               <button type = "button" class = "btn dropdown-toggle" data-toggle = "dropdown">
                  <span class = "caret"></span>
                  <span class = "sr-only">Toggle Dropdown</span>
               </button>

               <ul class = "dropdown-menu" role = "menu">
                  <li><a href="/changePassword">Change Password</a></li>

                  <li class = "divider"></li>
                  <li><a href="/logout">Sign out</a></li>
               </ul>
            </div>
            @endif
        </div>
    </div>
</nav>