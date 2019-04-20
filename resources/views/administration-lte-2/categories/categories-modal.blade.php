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
                  Add Uniform Category
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form role="form" id="myForm" action="#" method="POST">
                  <div class="form-group">
                    <label>Name</label>
                      <input type="hidden" class="form-control input-category-id" name="id">
                      <input type="text" class="form-control input-category-name" name="name" required>
                  </div>
                  <div class="form-group">
                    <label>Alias</label>
                    <input type="text" class="form-control input-category-alias">
                  </div>
                  <div class="form-group">
                    <label>Code</label>
                    <input type="text" class="form-control input-category-code">
                  </div>
                  <div class="form-group">
                    <label class="control-label">Type</label>
                      <select class="form-control input-category-type" name="type" required>
                        <option value="sports">Sports</option>
                        <option value="apparel">Apparel</option>
                        <option value="esports">eSports</option>
                      </select>
                  </div>
                   <div class="form-group">
                    <label class="control-label">Active Type</label>
                      <select class="form-control input-active-type" name="type" required>
                        <option value="active">Active</option>
                        <option value="temp">Temporary</option>
                      </select>
                  </div>
                  <hr>
                  <div class="form-group">
                    <label>Male Thumbnail File</label>
                    <input type="file" class="form-control male-thumbnail-file" name="thumbnail_male" accept="image/*">
                      <div class="thumbnail_male">
                      </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Sort Order Male</label>
                        <input type="number" class="form-control sort-order-male" name="sort_order_male" >
                  </div>
                  <hr>
                  <div class="form-group">
                    <label>Female Thumbnail File</label>
                    <input type="file" class="form-control female-thumbnail-file" name="thumbnail_female" accept="image/*">
                      <div class="thumbnail_female">
                      </div>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Sort Order Female</label>
                        <input type="number" class="form-control sort-order-female" name="sort_order_female" >
                  </div>
                  <div class="form-group">
                    <center>
                      <button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button>
                    </center>
                  </div>
                </form>
            </div>
        </div>
    </div>
</div>
