<div id="signup">

    <span class='header'>Signup</span>

    <div class="signup-container">

       <form class="form-horizontal" role="form" method="POST" action="/register" id='user-signup-form'>

                <div id="div-forms">
                    <form id="register-form">
                        <div class="modal-body">
                            <div id="div-register-msg">
                            </div>
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">

                            <div class="row">

                                <div class="col-md-3"></div>

                                <div class="col-md-6">

                                    <div class="row">
                                    
                                        <div class="col-md-6">
                                            <label for="first_name">First Name</label>
                                            <input name="first_name" class="form-control" type="text" placeholder="First Name" required>                                
                                        </div>

                                        <div class="col-md-6">
                                            <label for="last_name">Last Name</label>
                                            <input name="last_name" class="form-control" type="text" placeholder="Last Name" required>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <br />
                                            <label for="email">Email</label>
                                            <input name="email" class="form-control" type="text" placeholder="E-Mail" required>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <br />
                                            <label for="password">Password</label>
                                            <input name="password" id="password" class="form-control" type="password" placeholder="Password" required>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-12">
                                            <br />
                                            <label for="password">Retype Password</label>
                                            <input name="retype-password" id="retype-password" class="form-control" type="password" placeholder="Retype Password" required>
                                        </div>
                                    </div>

                                    <div class="submit-row">

                                        <br /><br /><br />

                                        <div class="g-recaptcha" data-sitekey="{{ env('RECAPTCHA_SITE_KEY') }}"></div>        
                                        <br />

                                        <input type="submit" class="btn register" value="Register">
                                        
                                    </div>

                                </div>

                            </div>
                            
                        </div>
                        
                    </form>
                </div>

        </form> 
        
    </div>

</div>

