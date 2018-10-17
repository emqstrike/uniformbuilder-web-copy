<div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Request a Style</h4>
            </div>

            <div class="modal-body">
                <div class="alert alert-danger" style="display: none;"></div>
                
                <form class="form-horizontal" role="form" method="POST" action="#" name="form_horizontal" enctype="multipart/form-data" id='style-request-form'>
                    <input type="hidden" class="design-sheet-path">
                    <input type="hidden" class="data-string">
                    <input type="hidden" class="id">

                    <div class="form-group">
                        <label class="col-md-4 control-label">Style Name</label>
                        <div class="col-md-6">
                            <input type="text" class="form-control name" id="name" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Sport</label>
                        <div class="col-md-6">
                            <select class="form-control sport">
                                <option value="none" data-uniform-category-id="0">Select Sport</option>
                            </select>
                        </div>
                    </div>

                    <hr>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Block Pattern</label>
                        <div class="col-md-6">
                            <!-- <input type="text" class="form-control block-pattern" required> -->
                            <select class="form-control block-pattern">
                                <option value="none" data-block-pattern-id="0">Select Block Pattern</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Custom Block Pattern</label>
                        <div class="col-md-6">
                        <input type="checkbox" class="enable_custom_bp">
                            <input type="text" class="form-control custom_block_pattern" id="custom_block_pattern" disabled="true">
                        </div>
                    </div>

                    <hr>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Block Pattern Option</label>
                        <div class="col-md-6">
                            <!-- <input type="text" class="form-control block-pattern-option" required> -->
                            <select class="form-control block-pattern-option">
                                <option value="none">Select Block Pattern Option</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Custom Block Pattern Option</label>
                        <div class="col-md-6">
                        <input type="checkbox" class="enable_custom_bpo">
                            <input type="text" class="form-control custom_option" id="custom_option" disabled="true">
                        </div>
                    </div>

                    <hr>

                    <div class="form-group">
                        <label class="col-md-4 control-label">QSTRIKE Item ID</label>
                        <div class="col-md-6">
                            <input type="number" class="form-control qstrike-item-id" id="qstrike_item_id" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Type</label>
                        <div class="col-md-6">
                            <select class="form-control type">
                                <option value="upper">Upper</option>
                                <option value="lower">Lower</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Brand</label>
                        <div class="col-md-6">
                            <select class="form-control brand">
                                <option value="none">None</option>
                                <option value="prolook">Prolook</option>
                                <option value="richardson">Richardson</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Application Type</label>
                        <div class="col-md-6">
                            <select class="form-control application_type">
                                <option value="none">None</option>
                                <option value="tackle_twill">Tackle Twill</option>
                                <option value="infused">Infused</option>
                                <option value="sublimated">Sublimated</option>
                                <option value="knitted">Knitted</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Priority</label>
                        <div class="col-md-6">
                            <select class="form-control priority">
                                <option value="low">Low</option>
                                <option value="mid">Mid</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Gender</label>
                        <div class="col-md-6">
                            <select class="form-control gender">
                                <option value="men">Men</option>
                                <option value="women">Women</option>
                                <option value="unisex">Unisex</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group" id="deadline">
                        <label class="col-md-4 control-label">Deadline</label>
                        <div class="col-md-6">
                            <!-- <input type="date" class="form-control deadline" required> -->
                            <!-- <div id="datepicker"></div> -->
                            <input type="text" id="datepicker" class="form-control">
                        </div>
                    </div>

                    <div class="form-group" id="customizer" style="display: none;">
                        <label class="col-md-4 control-label">Customizer ID</label>
                        <div class="col-md-6">
                            <input type="number" class="form-control customizer-id" id="customizer_id" required>
                        </div>
                    </div>

                    <div class="form-group" id="status_div" style="display: none;">
                        <label class="col-md-4 control-label">Status</label>
                        <div class="col-md-6">
                            <select class="form-control status">
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group" id="is_fixed_div" style="display: none;">
                        <label class="col-md-4 control-label">Is Fixed</label>
                        <div class="col-md-6">
                            <input type="checkbox" name="is_fixed" class="is_fixed">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-4 control-label">Notes</label>
                        <div class="col-md-6">
                            <textarea name="input_notes" class="form-control" id="input_notes" cols="10" rows="5"></textarea>
                        </div>
                    </div>

                    <div id="design-sheet-field" class="form-group" style="display: none;">
                        <label class="col-md-4 control-label">Design Sheet</label>
                        <div class="col-md-6">
                            <a href="" class="btn btn-success" target="_blank">View Design Sheet</a>
                        </div>
                    </div>
                </form>

                <div id="upload_design_sheet">
                    <center>
                        <h4 class="alert alert-info" style="margin-bottom: 0;">Upload Design Sheet below</h4>
                        <form action="/administration/material/insert_dz_design_sheet" class="dropzone" id="my-awesome-dropzone">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        </form>
                    </center>
                </div>

                <div class="form-group" id="save-data" style="margin-top: 30px;">
                    <center>
                        <button type="submit" class="btn btn-primary save-data">
                            Save Request
                        </button>
                    </center>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>