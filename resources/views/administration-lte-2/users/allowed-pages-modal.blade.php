<div id="allowedPagesModal" class="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>

                <h4 class="modal-title" id="myModalLabel">
                    Add allowed pages
                </h4>
            </div>

            <div class="modal-body">
                <form action="#" id="allowedPagesForm">
                    <input id="user_id" type="hidden" name="id" >

                    <div class="form-group">
                        <label class="control-label">First Name</label>
                        <input id="first_name" type="text" class="form-control" disabled="disabled">
                    </div>

                    <div class="form-group">
                        <label class="control-label">Last Name</label>
                        <input id="last_name" type="text" class="form-control" disabled="disabled">
                    </div>

                    <div class="form-group">
                        <label class="control-label">Type</label>
                        <input id="type" type="text" class="form-control" disabled="disabled">
                    </div>

                    <div class="form-group">
                        <label class="control-label">Role</label>
                        <input id="role" type="text" class="form-control" disabled="disabled">
                    </div>

                    <div class="form-group">
                        <label class="control-label">Default Allowed Pages</label>
                        <select name="default_allowed_pages[]" id="default_allowed_pages" class="form-control" multiple="multiple" disabled="disabled">
                        </select>
                    </div> 

                    <div class="form-group">
                        <label class="control-label">Allowed Pages</label>
                        <select name="allowed_pages[]" id="allowed_pages" class="form-control" multiple="multiple">
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="control-label">Limited Access</label>
                        <select name="limited_access[]" id="limited_access" class="form-control" multiple="multiple">
                        </select>
                    </div>

                    <button type="submit" class="btn btn-success btn-flat save-allowed-pages">Save</button>
                </form>
            </div>
        </div>
    </div>
</div>