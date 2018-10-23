<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" id="modal-dialog-spec">
        <div class="modal-content" id="modal-content-lg">
            <!-- Modal Header -->
            <div class="modal-header">
                <button type="button" class="close"
                   data-dismiss="modal">
                       <span aria-hidden="true">&times;</span>
                       <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">
                  Add Spec Sheet
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form role="form" id="myForm" action="#" method="POST">
                  <div class="form-group">
                    <input type="hidden" name="poms" id="poms">
                    <label>Name of Spec Sheet</label>
                      <input type="hidden" class="form-control input-item-id" name="id">
                      <input type="text" class="form-control input-item-name" name="name" required>
                      <input type="hidden" class="form-control input-uniform-category" name="uniform_category" >
                  </div>
                  <div class="form-group">
                    <label>Sport</label>
                      <select name="sport" class="form-control sport" required>
                        <option value="0">None</option>
                      </select>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Factory</label>
                      <select class="form-control input-factory">
                        <option value="pmp">PMP</option>
                        <option value="blb">Billerby</option>
                        <option value="sox">SOX</option>
                      </select>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Sizing Type : </label><br>
                        <input type="radio" name="sizing_type" value="alpha" required> Alpha
                        <input type="radio" name="sizing_type" value="numeric" required> Numeric
                  </div>
                  <div class="form-group">
                    <label class="control-label">Sizes : </label>
                        <input type="hidden" name="sizes" id="sizes">
                        <div class="youthSizes">
                            Youth<br>
                        </div>
                        <div class="adultSizes">
                            Adult<br>
                        </div>
                  </div>
                  <hr>
                  <br>
                  <div class="form-group">
                    <select class="col-md-3 input-poms" required>
                    </select>&nbsp;&nbsp;
                    <input type="hidden" class="input-poms-props">
                    <a href="#" class="btn btn-success btn-xs btn-flat add-poms">Add P.O.M.</a>
                      <table class="table table-bordered table-hover">
                          <tr>
                              <thead>
                                <th width="2%">QC</th>
                                <th width="10%">Item</th>
                                <th width="2%">Image</th>
                                <th width="5%">+ Tol.</th>
                                <th width="5%">- Tol.</th>
                                <th width="75%"><div class="col-md-12 sizes-header"></div></th>
                                <th width="1%"></th>
                              </thead>
                          </tr>
                          <tbody class="properties-content">
                          </tbody>
                      </table>
                  </div>
                      <hr>
                    <div class="form-group notes-div row">
                      <div class="col-sm-1">
                        <label class="control-label">Note/Comment</label>
                      </div>
                      <div class="col-md-6">
                        <textarea name="input_notes" class="form-control" id="input-notes" cols="5" rows="2"></textarea>
                      </div>
                      <div class="col-md-2">
                        <input type="text" id="input-updated-by" title="Updated By" disabled>
                      </div>
                    </div>
                  <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
