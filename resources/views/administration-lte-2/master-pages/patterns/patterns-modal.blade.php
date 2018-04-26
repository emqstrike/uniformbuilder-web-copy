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
                    Add Pattern
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">

                <form role="form">
                  <div class="form-group">
                    <label>Brand</label>
                      <select class="form-control input-brand-id">
                        <option value="0">No Brand</option>
                        <option value="1">Prolook</option>
                        <option value="2">Richardson</option>
                      </select>
                  </div>
                  <div class="form-group">
                    <label>Name</label>
                      <input type="text" class="form-control input-name" placeholder="Fabric Name"/>
                  </div>
                  <div class="form-group">
                    <label>Uniform Category</label>
                      <input type="hidden" id="category_value" name="category_value">
                      <select name="uniform_category_id[]" class="form-control input-uniform-category-id" multiple="multiple" style="width: 100%;">
                      </select>
                  </div>
                  <div class="form-group">
                    <label>Factory</label>
                      <select class="form-control input-factory-id">
                        <option value="0">Unassigned</option>
                      </select>
                      <input type="hidden" class="input-id">
                  </div>
                  <center><button type="submit" class="btn btn-success submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
