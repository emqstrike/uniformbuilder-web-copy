<div id="add-edit-page" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4></h4>
            </div>

            <div class="modal-body">
                <input type="hidden" class="input-page-id">
                <input type="hidden" class="input-page-brand" value="{{ env('BRAND') }}">

                <div class="alert alert-danger" role="alert" style="display: none;">
                </div>

                <div class="row">
                    <label class="col-md-4 control-label text-right">Code</label>
                    <div class="col-md-6">
                        <input type="text" class="input-page-code form-control">
                    </div>
                </div>

                <div class="row">
                    <label class="col-md-4 control-label text-right">Name</label>
                    <div class="col-md-6">
                        <input type="text" class="input-page-name form-control">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-10 text-center">
                        <button class="btn btn-flat btn-primary">
                            <span class="glyphicon glyphicon-floppy-disk"></span>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>