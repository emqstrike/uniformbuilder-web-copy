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
                    Add Price Item Template
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form role="form">
                  <div class="form-group">
                    <input type="hidden" name="size_props" id="size_property">
                    <label>Name</label>
                      <input type="hidden" class="form-control input-price-id" name="id">
                      <input type="name" class="form-control input-price-name" name="name" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Description</label>
                    <textarea name="description" class="form-control input-description autosized" required></textarea>
                  </div>
                  <div class="form-group">
                            <label class="control-label">Properties</label>
                                <a href="#" class="btn btn-success btn-xs add-property">Add Property</a>
                                <table class="table table-bordered table-striped">
                                    <tr>
                                        <thead>
                                            <th>Size</th>
                                            <th>Price Item</th>
                                            <th>Item ID</th>
                                            <th>Action</th>
                                        </thead>
                                    </tr>
                                    <tbody class="property-body">
                                        <tr class="prop-row">
                                            <td>
                                                <select class="form-control sizes">
                                                </select>
                                            </td>
                                            <td>
                                                <select class="form-control price-items">
                                                </select>
                                            </td>
                                            <td>
                                              <input type="text" class="form-control item-id">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                        </div>
                  <center><button type="submit" class="btn btn-success submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
