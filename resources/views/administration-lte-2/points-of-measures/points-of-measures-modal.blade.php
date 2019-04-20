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
                  Add Points of Measure
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form role="form" id="myForm" action="#" method="POST">
                  <div class="form-group">
                    <label>Name</label>
                      <input type="hidden" class="form-control input-item-id" name="id">
                      <input type="text" class="form-control input-item-name" name="name" required>
                  </div>
                  <div class="form-group">
                    <label>POM Number</label>
                      <input type="number" class="form-control input-item-number" name="pom_number" required>
                  </div>
                  <div class="form-group">
                    <label>+ Tolerance</label>
                      <input type="number" class="form-control input-item-plus-tol" name="plus_tolerance" step="0.01" required>
                  </div>
                  <div class="form-group">
                    <label>- Tolerance</label>
                      <input type="number" class="form-control input-item-minus-tol" name="minus_tolerance" step="0.01" required>
                  </div>
                  <div class="form-group">
                    <label>Image</label>
                    <input type="file" class="form-control image-file" name="image_link" accept="image/*">
                      <div class="image_link">
                      </div>
                  </div>
                  <div class="form-group">
                    <label>Video</label>
                      <input type="text" class="form-control input-item-video" name="video_link">
                  </div>
                  <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
