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
                  Add Category with Single View Application
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form role="form" id="myForm" action="#" method="POST">
                      <input type="hidden" class="form-control input-item-id" name="id">
                  <div class="form-group">
                    <label>Category</label>
                      <select name="sport" class="form-control sport" required>
                        <option value="0">None</option>
                      </select>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Block Pattern</label>
                      <textarea class="block-pattern-val" id="block_pattern_value" name="block_pattern_value" style="display:none;"></textarea>
                      <select name="block_pattern_id[]" class="form-control block-pattern" id="block_pattern" multiple="multiple" style="width: 100%;" required>
                      </select>
                  </div>
                    <textarea name="block_patterns_data" style="display:none;" id="block_patterns_data"></textarea>
                  <div class="form-group">
                    <label class="control-label">Neck Option</label>
                      <textarea class="neck-option-val" id="neck_option_value" name="neck_option_value" style="display:none;"></textarea>
                      <select class="form-control material-neck-option" name="neck_option[]" id="neck_option" multiple="multiple" style="width: 100%;" required="true">
                      </select>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Type</label>
                      <select class="form-control input-item-type" name="type">
                        <option value="upper">Upper</option>
                        <option value="lower">Lower</option>
                      </select>
                  </div>
                  <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
