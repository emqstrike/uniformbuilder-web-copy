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
                    Add Master Color
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">

                <form id="myForm" role="form" action="#" method="POST">
                  <div class="form-group">
                    <input type="hidden" class="input-id">
                    <label>Name</label>
                      <input type="text" class="form-control input-name" placeholder="Color Name" required>
                  </div>
                  <div class="form-group">
                    <label>Color Code</label>
                      <input type="text" class="form-control input-color-code" placeholder="Color Code" required>
                  </div>
                  <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
