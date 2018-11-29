<!-- Modal -->
<div class="modal fade" id="SpecSheetModal" tabindex="-1" role="dialog"
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
                <h3 class="modal-title" id="myModalLabel">
                  View Sizing Spec Sheet
                </h3>
            </div>
            <!-- Modal Body -->
            <div class="modal-body">
                <form role="form" id="myForm" action="#" method="POST">
                  <div class="form-group row">
                    <div class="col-sm-2">
                    <label class="control-label">Date Created</label>
                    </div>
                    <div class="col-md-3">
                      <input type="text" class="form-control item-date-created" name="name" disabled>
                    </div>
                  </div>
                  <br>
                  <div class="form-group row">
                    <div class="col-sm-2">
                    <label>Date Edited</label>
                    </div>
                      <div class="col-md-3">
                        <input type="text" class="form-control item-date-updated" name="name" disabled>
                      </div>
                  </div>
                  <hr>
                  <br>
                  <div class="form-group">
                              <input type="hidden" class="poms-props">
                                <table class="table table-bordered table-hover">
                                    <tr>
                                        <thead>
                                          <th width="2%">QC</th>
                                          <th width="10%">Item</th>
                                          <th width="3%">Image</th>
                                          <th width="5%">+ Tol.</th>
                                          <th width="5%">- Tol.</th>
                                          <th width="75%"><div class="col-md-12 view-sizes-header"></div></th>
                                        </thead>
                                    </tr>
                                    <tbody class="view-properties-content">
                                    </tbody>
                                </table>
                  </div>
                  <div class="form-group notes-div row">
                    <div class="col-sm-1">
                      <label class="control-label">Note/Comment</label>
                    </div>
                    <div class="col-md-6">
                      <pre id="notes_text" ></pre>
                    </div>
                    <div class="col-md-2">
                      <input type="text" title="Updated By" disabled>
                    </div>
                  </div>

                </form>
            </div>
        </div>
    </div>
</div>
