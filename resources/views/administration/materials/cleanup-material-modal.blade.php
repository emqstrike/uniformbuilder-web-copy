<!-- Add Material Option Modal -->
<div class="modal modal-wide fade" id="cleanup-material-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/material_option/purgeColor" role="form" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="cleanup_material_id" id="cleanup_material_id">
            <input type="hidden" name="form-action" id="form-action" value="">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title"><span style='color: blue'></span></h4>
            </div>
            <div class="alert alert-danger">
                <h1><center>This will revert all bounding box and applications properties to default</center></h1>    
            </div>
            <div class="modal-footer">
                <input type="submit" class="btn btn-success save-multiple" value="PROCEED">
                <button class="btn btn-danger confirm-no" data-dismiss="modal">Cancel</button>
            </div>
            </form>
        </div>
    </div>
</div>