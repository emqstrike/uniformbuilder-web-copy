<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header" id="navbar-header">
            <a class="navbar-brand" href="/"><img src="{{ env('LOGO_URL') }}" height="50em"></a>
        </div>
        <div>
            <h1 class="text-center" id="header_text">{{ $app_title }}</h1>
        </div>
        <div class='user-profile pull-right'>

            <div class="activate_qa_tools">Activate QA Tools</div>

            @if (!Session::get('isLoggedIn'))
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#" id="feedback"><i class="fa fa-comment" aria-hidden="true"></i> Have Feedback?</a> </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        
                        <i class="fa fa-unlock-alt" aria-hidden="true"></i> LOGIN
                        
                    </a>
                    <ul id="login-dp" class="dropdown-menu">
                        <li>
                            <div class="row">
                                <div class="col-md-12">
                                    <form class="form loginRest" role="form" accept-charset="UTF-8" id="login-nav">
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <div class="form-group form-group-sm input-group">
                                            <span class="input-group-addon"><i class="fa fa-envelope" aria-hidden="true"></i></span>
                                            <input type="email" name="email" class="form-control col-sm-2" id="login-email" placeholder="Email Address">
                                        </div>
                                        <div class="form-group form-group-sm input-group">
                                            <span class="input-group-addon"><i class="fa fa-key" aria-hidden="true"></i></span>
                                            <input type="password" name="password" class="form-control col-sm-3" id="login-password" placeholder="Password">
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-block loginRest">
                                                <i class="fa fa-sign-in"></i>
                                                Sign in
                                            </button>
                                            <div class="help-block text-right"><br />
                                                <a class="user-signup" href="/signup">Don't have an Account?</a> | <a href="/forgot-password">Forgot your password?</a></div>
                                        </div>
                                    </form>
                                </div>
                             </div>
                        </li>
                    </ul>
                </li>
            </ul>
            
            @else

            <a href="/messages" id="messages">

                <i class="fa fa-envelope-o" aria-hidden="true"></i> My Notifications (<span class="message-badge"></span>)

            </a>

            <a href="#" id="feedback">

                <i class="fa fa-comment" aria-hidden="true"></i> Have Feedback?

            </a>

            <div class = "btn-group">

              <button type="button" id="firstname" class="btn">
                  <i class="fa fa-user" aria-hidden="true"></i> <span class="hello">Hello {{ Session::get('firstName') }}!</span>
              </button>

              <button type = "button" class = "btn dropdown-toggle" data-toggle = "dropdown">
                  <span class = "caret"></span>
                  <span class = "sr-only">Toggle Dropdown</span>
              </button>

              <ul class = "dropdown-menu" role="menu">

                  <!-- <li><a href="#"><i class="fa fa-comments" aria-hidden="true"></i> MY MESSAGES</a></li> -->
                  <li><a href="/my-profile"><i class="fa fa-user" aria-hidden="true"></i> MY PROFILE</a></li>

                  <li class="divider"></li>
                  <li><a href="/my-orders"><i class="fa fa-list-ul" aria-hidden="true"></i> MY ORDERS</a></li>
                  <li><a href="/my-saved-designs"><i class="fa fa-folder-open-o" aria-hidden="true"></i> MY SAVED DESIGNS</a></li>
                  <li class="divider"></li>
                @if (Session::get('userHasTeamStoreAccount'))
                  <li>
                    <a href="#" id="show-team-store-toolbox">
                      <i class="fa fa-wrench" aria-hidden="true"></i> DISPLAY TEAM STORE TOOLBOX
                    </a>
                  </li>
                @else
                  <li>
                      <a href="{{ env('TEAM_STORE_REGISTRATION_URL') }}/{{ Session::get('teamstore_registration_params') }}">
                          <i class="fa fa-shopping-cart" aria-hidden="true"></i> CREATE TEAM STORE
                      </a>
                  </li>
                @endif
                  <li class="divider"></li>

                  <!-- <li><a href="/my-profile"><i class="fa fa-user" aria-hidden="true"></i> MY PROFILE</a></li> -->
                  <li><a href="/changePassword"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> CHANGE PASSWORD</a></li>
                  <li class="divider"></li>
                  <li><a href="/logout"><i class="fa fa-sign-out" aria-hidden="true"></i> LOG OUT</a></li>

              </ul>

            </div>
            @endif
        </div>
    </div>
</nav>