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
                    Add Font
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                
                <form role="form">
                  <div class="form-group">
                    <label>Name</label>
                      <input type="text" class="form-control input-name" placeholder="Enter name"/>
                  </div>
                  <div class="form-group">
                    <label>Sports</label>
                      <input type="text" class="form-control input-sports" placeholder="Enter sports"/>
                      <input type="hidden" class="input-id">
                  </div>
                  <center><button type="submit" class="btn btn-success submit-new-record">Add Record</button></center>
                </form>

            </div>

        </div>
    </div>
</div>