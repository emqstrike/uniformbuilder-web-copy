<!-- Add Material Option Modal -->
<div class="modal modal-wide fade" id="remove-color-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/material_option/purgeColor" role="form" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="form-action" id="form-action" value="">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title"><span style='color: blue'></span></h4>
            </div>
            <div class="modal-body add-color-code">
                <h4>Color Code :&nbsp;
                <input type="text" class="color-code" name="color_code">
                Confirm cleanup.
            </div>
            <div class="modal-footer">
                <input type="submit" class="btn btn-primary save-multiple" value="PROCEED">
                <button class="btn btn-danger confirm-no" data-dismiss="modal">Cancel</button>
            </div>
            </form>
        </div>
    </div>
</div>