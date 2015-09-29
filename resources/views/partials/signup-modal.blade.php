<!-- User Signup Modal -->
<div class="modal bs-modal-sm in" id="signup-modal" aria-hidden="false">
    <div class="modal-dialog"> 
        <form class="form-horizontal" role="form" method="POST" action="/register" id='user-signup-form'>
            <div class="modal-content"> 
                <div class="modal-header"> 
                    <button type="button" class="close" data-dismiss="modal">×</button> 
                    <h4 class="modal-title">Sign up</h4> 
                </div> 
                <div class="modal-body">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">

                    <div class="form-group form-group-sm">
                        <label class="col-md-6 control-label">First Name</label>
                        <div class="col-md-10">
                            <input type="text" class="form-control user-first-name" name="first_name" value="{{ old('first_name') }}">
                        </div>
                    </div>

                    <div class="form-group form-group-sm">
                        <label class="col-md-6 control-label">Last Name</label>
                        <div class="col-md-10">
                            <input type="text" class="form-control user-last-name" name="last_name" value="{{ old('last_name') }}">
                        </div>
                    </div>

                    <div class="form-group form-group-sm">
                        <label class="col-md-6 control-label">Email Address</label>
                        <div class="col-md-10">
                            <input type="text" class="form-control user-email" name="email">
                        </div>
                    </div>

                    <div class="form-group form-group-sm">
                        <label class="col-md-6 control-label">Password</label>
                        <div class="col-md-10">
                            <input type="password" class="form-control user-password" name="password">
                        </div>
                    </div>

                    <div class="form-group form-group-sm">
                        <label class="col-md-6 control-label">Confirm Password</label>
                        <div class="col-md-10">
                            <input type="password" class="form-control user-confirm-password" name="confirm_password">
                        </div>
                    </div>
                </div> 
                <div class="modal-footer">
                    <button type="submit" class="btn btn-small btn-primary create-user">Signup</button>
                    <button class="btn btn-default confirm-no" data-dismiss="modal">Close</button>
                </div>
            </div>
        </form>
    </div>
</div>