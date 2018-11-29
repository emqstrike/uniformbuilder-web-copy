<div id="edit-page-rule" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4>Edit Page Rule</h4>
            </div>

            <div class="modal-body">
                <input type="hidden" class="input-page-rule-id">
                <input type="hidden" class="input-page-rule-brand" value="{{ env('BRAND') }}">

                <div class="row">
                    <label class="col-md-4 control-label text-right">Type</label>
                    <div class="col-md-6">
                        <input type="text" class="user-type form-control" readonly="readonly">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-4 control-label text-right">Role</label>
                    <div class="col-md-6">
                        <input type="text" class="user-role form-control" readonly="readonly">
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
                        <button class="btn btn-flat btn-primary update-page-rule">
                            <span class="glyphicon glyphicon-floppy-disk"></span>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>