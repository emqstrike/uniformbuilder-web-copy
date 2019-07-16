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
                    <label class="control-label">Color Set Name</label>
                      <input type="hidden" class="form-control input-color-id" name="id">
                      <input type="text" class="form-control input-color-name" name="name" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Color Set Type</label>
                      <select class="form-control input-type" name='uniform_type'>
                          <option value="custom">Custom</option>
                          <option value="twill">Twill</option>
                          <option value="sublimated">Sublimated</option>
                      </select>
                  </div>
                  <div class="form-group">
                    <label>Colors</label>
                      <textarea class="colors-val" name="category_value" style="display: none;"></textarea>
                      <select name="colors[]" class="form-control input-colors" multiple="multiple" style="width: 100%;" required>
                      </select>
                  </div>
                  <div class="form-group">
                    <label>Brand</label>
                      <select class="form-control input-brand">
                        <option value="prolook">Prolook</option>
                        <option value="richardson">Richardson</option>
                        <option value="riddell">Riddell</option>
                      </select>
                  </div>
                  <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
