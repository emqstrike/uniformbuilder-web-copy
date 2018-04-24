<!-- Modal -->
<div class="modal fade" id="myModalNorm" tabindex="-1" role="dialog" 
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
                    Add Fabric
                </h4>
            </div>
            
            <!-- Modal Body -->
            <div class="modal-body">
                
                <form role="form">
                  <div class="form-group">
                    <label>Code</label>
                      <input type="text" class="form-control input-code" placeholder="Enter code"/>
                  </div>
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
                    <label>Factory</label>
                      <select class="form-control input-factory-id">
                        <option value="0">Unassigned</option>
                        <option value="1">PMP</option>
                        <option value="2">BLB</option>
                        <option value="3">SOX</option>
                      </select>
                  </div>
                  <center><button type="submit" class="btn btn-success submit-new-record">Add Record</button></center>
                </form>

            </div>

            <!-- Modal Footer -->
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-danger"
                        data-dismiss="modal">
                            Cancel
                </button>
                <button type="button" class="btn btn-primary">
                    Save changes
                </button>
            </div> -->
        </div>
    </div>
</div>





<!-- Post Info -->
<!-- <div style='position:fixed;bottom:0;left:0; background:lightgray;width:100%;'>
    About this SO Question:
    <a href='http://stackoverflow.com/q/26562900/1366033'>
        Twitter Bootstap - form in Modal fomatting
    </a><br/>
    Fork This Skeleton Here: 
    <a href='http://jsfiddle.net/KyleMit/kcpma/'>
        Bootstrap 3 Skeleton
    </a><br/>
</div>

