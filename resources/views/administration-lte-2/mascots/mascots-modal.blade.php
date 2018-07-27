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
                    Add Mascot
                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">

                <form id="myForm" role="form" action="#" method="POST">
                  <div class="form-group">
                    <label>Mascot Name</label>
                      <input type="text" class="form-control input-mascot-name" name="name" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Code</label>
                      <input type="text" class="form-control input-mascot-code" name="mascot_code" required>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Mascot Category</label>
                      <select name='category' class="form-control input-mascot-category" required="true">
                      </select>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Uniform Category</label>
                      <select name='uniform_category' class="form-control input-uniform-category" required="true">
                      </select>
                  </div>
                  <div class="form-group file">
                    <input type="file" class="form-control input-icon" name="icon"  accept="image/*" required>
                    <label for="file" >Icon</label>
                  </div>
                  <div class="form-group file">
                    <input type="file" class="form-control input-ai-file" name="ai_file"  accept=".ai,.pdf" required>
                    <label for="file" >File</label>
                  </div>
                  <div class="form-group">
                    <label>Brand</label>
                      <select class="form-control input-brand">
                        <option value="prolook">Prolook</option>
                        <option value="richardson">Richardson</option>
                      </select>
                  </div>
                  <div class="form-group">
                    <label class="control-label">Layers  </label>
                      <a class="btn btn-primary clone-row btn-xs btn-flat"><i class="fa fa-plus"></i> Add Layer</a>
                      <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer</th>
                                            <th>Team Color ID</th>
                                            <th>File</th>
                                            <th>Default Color</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container">
                                        <tr class="layers-row">
                                            <td>
                                                <select class="ma-layer layer1"  name="ma_layer[]" disabled>
                                                    <option value = '1' class="layer-number">1</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select class="ma-team-color-id layer1" name="ma_team_color_id[]">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                            </td>
                                            <td class="file">
                                                <input type="file" class="ma-options-src layer1" name="ma_image[]" required="true">
                                                <label for="file" >File</label>
                                            </td>
                                            <td>
                                                <select class="form-control ma-default-color layer1" name="default_color[]" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                                <option data-color="" value="" id="saved-default-color"></option>
                                                </select>
                                            </td>
                                            <td>
                                                <a class="btn btn-danger btn-flat btn-xs btn-remove-layer"><i class="fa fa-remove"></i> Remove</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                  </div>
                  <center><button type="submit" class="btn btn-success btn-flat submit-new-record">Add Record</button></center>
                </form>
            </div>
        </div>
    </div>
</div>
