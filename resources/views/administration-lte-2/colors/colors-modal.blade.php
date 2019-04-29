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

                <form id="myForm" role="form" action="#" method="POST">
                  <div class="form-group">
                    <label>Color Name</label>
                      <input type="text" class="form-control input-color-name" name="name" required>
                  </div>
                  <div class="form-group">
                    <label>Color Alias</label>
                      <input type="text" class="form-control input-color-alias" name="alias" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Color Code</label>
                      <input type="text" class="form-control input-color-code" name="color_code" maxlength="10" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Color Code Alias</label>
                      <input type="text" class="form-control input-color-code-alias" name="color_code_alias" maxlength="10" required>
                  </div>
                  <div class="form-group">
                            <label class="control-label">Color</label>
                                <input id='create-colorpicker' type="hidden" class="form-control">
                                <input type='hidden' name="hex_code" id="create-hex-code" value="#ff0000">
                  </div>
                  <div class="form-group">
                    <label>Brand</label>
                      <select class="form-control input-brand">
                        <option value="prolook">Prolook</option>
                        <option value="richardson">Richardson</option>
                      </select>
                  </div>
                  <div class="form-group">
                  <label class="control-label">Master Color ID</label>
                      <input type="number" class="form-control input-master-color" name="master_color">
                  </div>
                  <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
