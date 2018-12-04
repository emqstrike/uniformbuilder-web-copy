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
                  Add Mascot Category
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form role="form" id="myForm" action="#" method="POST">
                      <input type="hidden" class="form-control input-item-id" name="id">
                  <div class="form-group">
                    <label>Name</label>
                      <input type="name" class="form-control input-item-name" name="name" required>
                  </div>
                  <div class="form-group">
                    <label>Mascot Group</label>
                      <select name="group_category" class="form-control mascot-group-category" required>
                      </select>
                  </div>
                  <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
