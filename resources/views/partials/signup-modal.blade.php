<!-- User Signup Modal -->
<div class="modal bs-modal-sm in" id="signup-modal" aria-hidden="false">
    <div class="modal-dialog"> 
        <form class="form-horizontal" role="form" method="POST" action="/register" id='user-signup-form'>
            <div class="modal-content"> 
                <div class="modal-header" align="center">
                    <img id="img_logo" src="{{ env('LOGO_URL') }}" height='50vh'>
                    <button type="button" class="close" data-dismiss="modal">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </div> 

                <div id="div-forms">
                    <form id="register-form">
                        <div class="modal-body">
                            <div id="div-register-msg">
                                <div id="icon-register-msg" class="glyphicon glyphicon-chevron-right"></div>
                                <span id="text-register-msg">Register an account.</span>
                            </div>
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input name="first_name" class="form-control" type="text" placeholder="First Name" required>
                            <input name="last_name" class="form-control" type="text" placeholder="Last Name" required>
                            <input name="email" class="form-control" type="text" placeholder="E-Mail" required>
                            <input name="password" class="form-control" type="password" placeholder="Password" required>
                            <div class="g-recaptcha" data-sitekey="{{ env('RECAPTCHA_SITE_KEY') }}"></div>
                        </div>
                        <div class="modal-footer">
                            <div>
                                <button type="submit" class="btn btn-primary btn-lg btn-block register">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </form>
    </div>
</div>