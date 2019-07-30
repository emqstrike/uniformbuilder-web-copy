<div id="signup">

    <span class='header'>Sign up</span>

    <div class="signup-container">

       <form class="form-horizontal" role="form" method="POST" action="/register" id='user-signup-form' data-parsley-validate>

                <div id="div-forms">
                    <form id="register-form">
                        <div class="modal-body">
                            <div id="div-register-msg">
                            </div>
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">

                            <!-- Start Row 1 -->
                            <div class="row">

                                <div class="col-md-12">

                                    <div class="col-md-3"></div>

                                    <div class="col-md-6">

                                        <h3>1. Personal Info</h3>
                                        <hr />

                                        <div class="row">
                                        
                                            <div class="col-md-6">
                                                <label for="first_name">First Name</label>
                                                <input name="first_name" class="form-control" type="text" placeholder="First Name" 
                                                data-parsley-required>                                
                                            </div>

                                            <div class="col-md-6">
                                                <label for="last_name">Last Name</label>
                                                <input name="last_name" class="form-control" type="text" placeholder="Last Name" 
                                                data-parsley-required>
                                            </div>

                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <br />
                                                <label for="email">Email</label>
                                                <input name="email" class="form-control" type="text" placeholder="E-mail" 
                                                data-parsley-required
                                                data-parsley-type="email">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <br />
                                                <label for="password">Password</label>
                                                <input name="password" id="password" class="form-control" type="password" placeholder="Password"
                                                data-parsley-required
                                                data-parsley-minlength="6">
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-12">
                                                <br />
                                                <label for="password">Retype Password</label>
                                                <input name="retype-password" id="retype-password" class="form-control" type="password" placeholder="Retype Password" 
                                                data-parsley-required
                                                data-parsley-equalto="#password">
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <!-- End Row 1 -->

                            <br />

                            <!-- Start Row 2 -->
                            <div class="row">

                                <div class="col-md-12">

                                    <div class="row">
                                        
                                        <div class="col-md-3"></div>

                                        <div class="col-md-6">

                                            <h3>2. Location and Assigned Rep</h3>
                                            <hr />

                                        </div>

                                    </div>

                                    <div class="row">

                                        <div class="col-md-3"></div>

                                        <div class="col-md-2">
                                            
                                            <p>
                                                <em>

                                                    We have representatives to help you make the most of this site, just enter your zip code and click the <strong>[Find Rep]</strong> button, and select anyone that will appear on the dropdown. 
                                                    <br /><br />

                                                    Note:
                                                    <br />

                                                    If you have worked with a Rep previously just select his name on the list. If you don't have any matching Rep's on your area we will just assign someone to work with you. It is still ok to proceed without a rep at this point and you can still use the customizer.
                                                    <br /><br />

                                                    Thank you for using PROLOOK!

                                                </em>
                                            </p>

                                        </div>

                                        <div class="col-md-4">

                                            <div class="col-md-12">

                                                <label for="state">State</label>
                                                <input name="state" class="form-control" type="text" placeholder="State" data-parsley-required>                                

                                            </div>

                                            <div class="col-md-12">

                                                <br />
                                                <label for="zip">Zip</label>
                                                <input name="zip" class="form-control" type="text" placeholder="Zip Code" data-parsley-required>                                

                                            </div>

                                             <div class="col-md-12">

                                                <br />
                                                <input name="find-rep" class="form-control btn findRep" type="button" value="Find Rep" data-parsley-required>                                
                                                <br /><br />
                                                <span class="message-rep"></span>

                                            </div>                                            

                                            <div class="col-md-12">

                                                <br />
                                                <label for="rep">Rep</label>
                                                <select class="form-control" name="rep" disabled="">
                                                </select>
                                                
                                            </div>

                                        </div>

                                    </div>

                                    <div class="row">
                                        
                                        <div class="col-md-3"></div>

                                        <div class="col-md-6">

                                            <hr />

                                        </div>

                                    </div>

                                </div>
                            </div>
                            <!-- End Row 2 -->

                            <!-- Start Submit Row -->
                            <div class="row">

                                <div class="col-md-12">

                                    <div class="submit-row">

                                        <br />

                                        <div class="g-recaptcha" data-sitekey="{{ env('RECAPTCHA_SITE_KEY') }}"></div>        
                                        <br />

                                        <input type="submit" class="btn register" value="Register">
                                        
                                    </div>
                                    <!-- End Submit Row 2 -->

                                </div>

                            </div>

                            <p><br /><br /></p>

                        </div>
                        
                    </form>
                </div>

        </form> 
        
    </div>

</div>

