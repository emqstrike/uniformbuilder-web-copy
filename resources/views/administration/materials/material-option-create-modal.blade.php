<!-- Add Material Option Modal -->
<div class="modal fade" id="add-material-option-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/material_option/add" role="form" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" class="material-id" name="material_id">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Add a Material Option for <span style='color: blue'></span></h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="control-label">Name:</label>
                    <input type="text" name="name" class="form-control" />
                </div>
                <div class="form-group">
                    <label class="control-label">Setting Type:</label>
                    <select name='setting_type' class='form-control setting-types'>
                        <option value='pant cut'>Pant Cut</option>
                        <option value='waist cut'>Waist Cut</option>
                        <option value='sleeve style'>Sleeve Style</option>
                        <option value='neck style'>Neck Style</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">Setting Type Item:</label>
                    <select name='setting_code' class='form-control setting-codes'>
                    </select>
                </div>
                <div class="form-group">
                    <label class="control-label">Material Option File:</label>
                    <input type="file" name="material_option_path">
                </div>
                <div class="form-group">
                    <label class="control-label">Layer Level:</label>
                    <input type="number" name="layer_level" class="form-control" />
                </div>
            </div>
            <div class="modal-footer">
                <input type="submit" class="btn btn-primary" value="Save">
                <button class="btn btn-danger confirm-no" data-dismiss="modal">Cancel</button>
            </div>
            </form>
        </div>
    </div>
</div>