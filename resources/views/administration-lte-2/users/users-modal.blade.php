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
                    Add User
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form id="myForm" role="form" action="#" method="POST">
                  <div class="form-group">
                    <input type="hidden" name="created_by" value="{{ Session::get('userId') }}">
                    <input type="hidden" name="user_create_origin" value="administration">
                    <input type="hidden" class="form-control input-user-id" name="id">
                    <label>First Name</label>
                      <input type="name" class="form-control input-first-name" name="first_name" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Last Name</label>
                    <input type="text" class="form-control input-last-name" name="last_name" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Email Address</label>
                    <input type="text" class="form-control input-user-email" name="email" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Password</label>
                    <input type="password" class="form-control input-user-password" name="password" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Confirm Password</label>
                    <input type="password" class="form-control input-confirm-password" name="confirm_password" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Zip Code</label>
                    <input type="text" class="form-control input-user-zip" name="zip">
                  </div>
                  <div class="form-group">
                    <label class="control-label">Assigned Sales Rep</label>
                    <select name='default_rep_id' class="form-control default-rep-id">
                        <option value="">none</option>
                        </select>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Type</label>
                      <select name='type' class="form-control input-user-type">
                        <option value='normal'>Normal</option>
                        <option value='administrator'>Administrator</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="control-label">Role</label>
                      <select name='role' class="form-control input-user-role">
                          <option value="default">Default</option>
                          <option value="ga">Graphics Artist</option>
                          <option value="qa">QA</option>
                          <option value="rep">Sales Rep</option>
                          <option value="rep_manager">Manager</option>
                          <option value="dealer">Dealer</option>
                          <option value="coach">Coach</option>
                          <option value="dev">Developer</option>
                          <option value="executive">Executive</option>
                      </select>
                    </div>
                  <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
