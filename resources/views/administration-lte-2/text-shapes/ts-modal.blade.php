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
                  Add Text Shape
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form role="form" id="myForm" action="#" method="POST">
                    <input type="hidden" class="form-control input-item-id" name="id">

                    <div class="form-group">
                        <label>Code</label>
                        <input type="text" name="code" class="form-control input-code" required>
                    </div>

                    <div class="form-group">
                        <label>Alias</label>
                        <input type="text" name="alias" class="form-control input-alias" required>
                    </div>

                    <div class="form-group">
                        <label class="control-label">Thumbnail</label>
                        <input type="file" class="form-control input-thumbnail" name="thumbnail" accept="image/*">
                        <div class="thumbnail-prev">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Font Name</label>
                        <input type="text" name="font_name" class="form-control input-font-name" required>
                    </div>

                    <div class="form-group">
                        <label>Curve</label>
                        <input type="number" name="curve" class="form-control input-curve" step=1 required>
                    </div>

                    <div class="form-group">
                        <label>Offset Y</label>
                        <input type="number" name="offset_y" class="form-control input-offset-y" step=1 required>
                    </div>

                    <div class="form-group">
                        <label>Text Height</label>
                        <input type="number" name="text_height" class="form-control input-text-height" step=1 required>
                    </div>

                    <div class="form-group">
                        <label>Bottom</label>
                        <input type="number" name="bottom" class="form-control input-bottom" step=1 required>
                    </div>

                    <div class="form-group">
                        <label>Font Size</label>
                        <input type="number" name="font_size" class="form-control input-font-size" required>
                    </div>

                    <div class="form-group">
                        <label>Is Active</label>
                        <div class="onoffswitch">
                            <label class="switch">
                                <input type="checkbox" class="onoffswitch-checkbox input-is-active" name="is_active">
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Text Shapes Category</label>
                        <select name="text_shapes_category_id" class="form-control text-shapes-categories" required>
                        </select>
                    </div>
                    <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>