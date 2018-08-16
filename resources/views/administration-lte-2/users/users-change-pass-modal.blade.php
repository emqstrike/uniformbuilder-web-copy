<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <button type="button" class="close"
                   data-dismiss="modal">
                       <span aria-hidden="true">&times;</span>
                       <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                    Change Password
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form id="myForm" role="form" action="#" method="POST">
                  <div class="form-group">
                    <input type="hidden" class="input-user-id" name="user_id" value="{{ $user->id }}">
                  </div>
                  <div class="form-group">
                    <label class="control-label">Old Password</label>
                    <input type="password" class="form-control input-old-password" name="old_password" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Password</label>
                    <input type="password" class="form-control input-user-password" name="password" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Confirm Password</label>
                    <input type="password" class="form-control input-confirm-password" name="confirm_password" required>
                  </div>
                  <center><button type="submit" class="btn btn-success submit-new-record">Update Password</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
