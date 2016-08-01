<div id="forgot-password">

    <span class='header'>Forgot Password</span>

    <div class="forgot-password-container">
        <div class="alert alert-info alert-dismissable flash-alert" style="display: none">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
            ×
        </button>
        <strong class='flash-sub-title'></strong> <span class='flash-message'>{{ Session::get('message') }}</span>
    </div>

    <br /><br />
    <form id="forgot-password" class="forgot-password pinhp-form" novalidate="novalidate" style="display: block;">
        <input type="hidden" class='csrf-token' name="_token" value="{{ csrf_token() }}">

        <div class="row">

            <div class="col-md-3"></div>
            
            <div class='col-md-6'>
                <label for="signup-email">
                    <strong class="placeholder">Enter your email</strong>
                    <span class="control has-icon">
                        <div class="input-group col-md-12">
                            <span class="input-group-addon">
                                <i class="fa fa-envelope-o"></i>
                            </span>
                            <input type="email" name="email" id="forgot-password-email" placeholder="Enter your email" class='form-control' required>
                        </div>
                    </span>
                    <span class="help-inline"><label for="inputEmail" class="error" style="display: none;">Please enter a valid email address</label></span>
                    <span id="forgot-password-error" class="help-block error" style="display: none;"></span>
                    <div id="forgot-password-server-error" class="error" style="display: none;">
                        Server error occurred. Please contact the administrator.
                    </div>
                </label>
            </div>

        </div>

        <div class="row">

            <div class="col-md-3"></div>
            <div class='col-md-6'>
                <div class="input-group col-md-12 submit-row">

                    <br /><br />

                    <div class="g-recaptcha" data-sitekey="{{ env('RECAPTCHA_SITE_KEY') }}"></div>        
                    <br />

                    <button id="forgot-password-submit" type="submit" class="btn" style="display: inline-block;">
                        Retrieve password
                        <i class="loading fa fa-spinner fa-pulse" style="display: none"></i>
                    </button>
                </div>
            </div>

        </div>

    </form>

    <div id="forgot-password-sent" class="col-md-12 vert-offset-top-2" style='display: none'>
        <div class="col-md-12 alert alert-success">
            <strong>Email sent!</strong> We've sent you an email with instructions to reset your password.
        </div>
    </div>

    <div id="forgot-password-error" class="col-md-12 vert-offset-top-2" style='display: none'>
        <div class="col-md-12 alert alert-warning message">
            Server error occurred. Please contact the administrator.
        </div>
    </div>

</div>
    
    
</div>

