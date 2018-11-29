<div id="add-page-rule" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4>Add New Page Rule</h4>
            </div>

            <div class="modal-body">
                <input type="hidden" class="input-page-rule-brand" value="{{ env('BRAND') }}">

                <div class="row">
                    <label class="col-md-4 control-label text-right">Type</label>
                    <div class="col-md-6">
                        <select class="user-type form-control">
                            <option value="administrator">Administrator</option>
                            <option value="normal">Normal</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-4 control-label text-right">Role</label>
                    <div class="col-md-6">
                        <select class="user-role form-control">
                        </select>
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-4 control-label text-right">Allowed Pages</label>
                    <div class="col-md-6">
                        <select class="allowed-pages form-control" multiple="multiple">
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-10 text-center">
                        <button class="btn btn-flat btn-primary save-page-rule">
                            <span class="glyphicon glyphicon-floppy-disk"></span>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>