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
                  Add Pipings
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form role="form" id="myForm" action="#" method="POST">
                      <input type="hidden" class="form-control input-item-id" name="id">
                  <div class="form-group">
                    <label>Sport</label>
                      <select name="sport" class="form-control sport" required>
                      </select>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Block Pattern</label>
                      <select name="block_pattern_id" class="form-control input-block-pattern" id="block_pattern" style="width: 100%;" required>
                      </select>
                  </div>
                  <textarea name="block_patterns_data" style="display:none;" id="block_patterns_data"></textarea>
                  <div class="form-group">
                    <label class="control-label">Block Pattern Option</label>
                      <select class="form-control input-option" name="neck_option" id="neck_option" style="width: 100%;" required="true">
                      </select>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Thumbnail</label>
                      <input type="file" class="form-control input-thumbnail" name="thumbnail" accept="image/*">
                      <div class="thumbnail-prev">
                      </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Piping Set</label>
                    <select name="sport" class="form-control input-piping-set" name="piping_set" required>
                      <option value="Center Piping">Center Piping</option>
                      <option value="End of Sleeve Piping">End of Sleeve Piping</option>
                      <option value="Neck Piping">Neck Piping</option>
                      <option value="Raglan Piping">Raglan Piping</option>
                      <option value="Set-in Piping">Set-in Piping</option>
                      <option value="Sleeve Piping 1 inch up">Sleeve Piping 1 inch up</option>
                      <option value="Yoke Piping">Yoke Piping</option>
                      <option value="Back Insert Piping">Back Insert Piping</option>
                      <option value="Pant Piping">Pant Piping</option>
                      <option value="Tunnel Piping">Tunnel Piping</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Alias</label>
                    <input type="text" name="alias_name" class="form-control input-alias" required>
                  </div>
                  <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
