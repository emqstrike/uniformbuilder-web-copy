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
                    Add Price Item
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">
                <form role="form" id="myForm" action="#" method="POST">
                  <div class="form-group">
                    <input type="hidden" name="size_props" id="size_property">
                    <label class="control-label">Name</label>
                      <input type="hidden" class="form-control input-price-id" name="id">
                      <input type="name" class="form-control input-price-name" name="name" required>
                  </div>
                  <div class="form-group">
                      <label class="control-label">Price Item ID</label>
                      <input type="number" class="form-control input-price-item-id" name="price_item_id" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Factory</label>
                    <select class="form-control input-factory" name="factory_id" required>
                            <option value="1">PMP</option>
                            <option value="2">BLB</option>
                            <option value="3">SOX</option>
                            <option value="4">XSD</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Dealer</label>
                        <select class="form-control input-dealer" name="dealer_id" required>
                            <option value="6">Pro Look Sports</option>
                        </select>
                  </div>
                  <div class="form-group">
                    <label class="col-md-4 control-label">Sport</label>
                      <select name="input_uniform_category" class="form-control input-uniform-category" required>
                      <option value="">none</option>
                      </select>
                  </div>
                  <div class="form-group">
                      <label class="col-md-4 control-label">MSRP</label>
                        <input type="number" step="any" class="form-control input-msrp" name="msrp" required>
                  </div>
                  <div class="form-group">
                      <label class="col-md-4 control-label">Web Price Sale</label>
                          <input type="number" step="any" class="form-control input-web-price-sale" name="web_price_sale" required>
                  </div>

                  <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
