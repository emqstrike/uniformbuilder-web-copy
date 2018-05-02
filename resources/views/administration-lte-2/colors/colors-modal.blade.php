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
                    Add Color
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">

                <form role="form">
                  <div class="form-group">
                    <label>Color Name</label>
                      <input type="name" class="form-control input-color-name" name="name">
                  </div>
                  <div class="form-group">
                    <label class="control-label">Color Code</label>
                      <input type="name" class="form-control input-color-code" name="color_code">
                  </div>
                  <div class="form-group">
                            <label class="control-label">Color</label>
                                <input id='create_colorpicker' />
                                <input type='hidden' name="hex_code" id="create-hex-code" value="#ff0000">
                  </div>
                  <center><button type="submit" class="btn btn-success submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
