<div id="delete-order-modal" class="modal fade" data-backdrop="static" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4>Delete Order</h4>
            </div>

            <div class="modal-body">
                <form>
                    <input type="hidden" id="order-id">

                    <div class="form-group">
                        <label class="control-label">Notes</label>
                        <textarea class="form-control" id="notes" style="resize: none; height: 100px;"></textarea>
                    </div>

                    <div class="form-group">
                        <button class="btn btn-success btn-flat" id="delete-order">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>